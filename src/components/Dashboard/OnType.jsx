import React, { useEffect, useState } from 'react';
import BigTile from './Tiles/BigTile';
import Title from '../Typography/Title';
import Clock from '../Clock';
import Fuse from 'fuse.js';
import { useAuth } from '../../contexts/AuthContextProvider';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../utils/FirebaseConfig';

import websiteList from '../../data/WebsiteList.json';

const options = {
	isCaseSensitive: false,
	findAllMatches: true,
	shouldSort: true,
	minMatchCharLength: 1,
	threshold: 0.2,
	keys: ['hostname', 'title'],
};

const fuseSearch = (list, input) => {
	const fuse = new Fuse(list, options);
	return fuse.search(input);
};

const googleSearch = async (list, searchInput) => {
	const brainhouseProxy = `https://brainhouse-proxy.herokuapp.com/http://suggestqueries.google.com/complete/search?client=chrome&hl=nl&gl=be&q=${searchInput}`;
	const response = await fetch(brainhouseProxy);
	const data = await response.json();

	const googleSearchItems = [];
	for (let i = 0; i < data.length; i++) {
		let title = data[1][i];
		let url = data[2][i];

		// When a title and url exists, the title is the URL and the url is the title, so we need to swap them....
		if (title.length > 0 && url.length > 0) {
			const baseurl = title.split('/').slice(2)[0];
			const favicon = `https://s2.googleusercontent.com/s2/favicons?sz=128&domain=${baseurl}`;

			// This prevents that two hostnames with the same URL are displayed
			const isInList = list.some((item) => item.hostname === baseurl);
			if (!isInList) googleSearchItems.push({ url: baseurl, title: url, favicon: favicon });
		} else {
			googleSearchItems.push({ title, url });
		}
	}
	return googleSearchItems;
};
const combinedSearch = async (list, searchInput) => {
	const fuseResult = fuseSearch(list, searchInput);
	const googleSearchResult = await googleSearch(list, searchInput);

	const combinedResult = fuseResult.concat(googleSearchResult);

	return combinedResult;
};

const OnType = ({ params }) => {
	const { user } = useAuth();
	const [suggestions, setSuggestions] = useState([]);
	const [userHistory, setUserHistory] = useState(websiteList);

	useEffect(() => {
		if (!user) return;

		const fetchData = async () => {
			const q = query(collection(db, `users/${user.uid}`, 'history'));
			const historySnapshot = await getDocs(q);

			let history = [];
			historySnapshot.forEach((doc) => {
				// Check if the hostname is already in the list
				const isInList =
					history.some((item) => item.hostname === doc.data().hostname) ||
					websiteList.some((item) => item.hostname === doc.data().hostname);

				if (!isInList) history.push(doc.data());
			});

			history = history.concat(websiteList);
			setUserHistory(history);
		};

		fetchData();
	}, [user]);

	useEffect(() => {
		let isCancelled = false;
		const searchInput = params.get('search');

		const fetchSearch = async () => {
			const result = await combinedSearch(userHistory, searchInput);
			if (!isCancelled) setSuggestions(result);
		};

		fetchSearch();

		return () => {
			isCancelled = true;
		};
	}, [params, userHistory]);

	return (
		<div>
			<Clock className="mt-8 h-10 text-center" />

			<div className="m-center mt-10 flex w-3/4 flex-col">
				<Title>Zoeken</Title>
				{suggestions.slice(0, 3).map((suggestion, index) => {
					console.log();
					return (
						<BigTile
							key={index}
							size="w-7 h-7"
							title={suggestion?.item?.title || suggestion.title}
							img={suggestion?.item?.favicon || suggestion.favicon || 'https://www.google.com/favicon.ico'}
							description={suggestion?.item?.description || ''}
							url={suggestion?.item?.hostname || suggestion.url}
							hiddenUrl={suggestion.title || suggestion.url}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default OnType;
