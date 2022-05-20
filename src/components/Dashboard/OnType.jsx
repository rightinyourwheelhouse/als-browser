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
	threshold: 0.49,
	keys: ['hostname', 'title'],
};

const OnType = ({ params }) => {
	const { user } = useAuth();
	const [suggestions, setSuggestions] = useState([]);
	const [userHistory, setUserHistory] = useState(websiteList);

	const fuseSearch = (list, input) => {
		const fuse = new Fuse(list, options);
		const result = fuse.search(input);
		setSuggestions(result);
	};

	useEffect(() => {
		if (!user) return;

		const fetchData = async () => {
			const q = query(collection(db, `users/${user.uid}`, 'history'));
			const querySnapshot = await getDocs(q);

			let history = [];
			querySnapshot.forEach((doc) => {
				// Check if the hostname is already in the list
				const isInList = history.some((item) => item.hostname === doc.data().hostname);
				if (!isInList) history.push(doc.data());
			});

			let websiteListFiltered = [];
			websiteList.forEach((obj) => {
				const isInList = history.some((item) => item.hostname === obj.hostname);
				if (!isInList) websiteListFiltered.push(obj);
			});

			history = history.concat(websiteListFiltered);
			setUserHistory(history);
		};

		fetchData();
	}, [user]);

	useEffect(() => {
		const searchInput = params.get('search');
		fuseSearch(userHistory, searchInput);
	}, [params, userHistory]);

	return (
		<div>
			<Clock className="mt-8 h-10 text-center" />

			<div className="m-center mt-20 flex w-3/4 flex-col">
				<Title>Zoeken</Title>
				{suggestions.slice(0, 3).map((suggestion, index) => {
					return (
						<BigTile
							key={index}
							title={suggestion.item.title}
							img={suggestion.item.favicon}
							description={suggestion.item.description}
							url={suggestion.item.hostname}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default OnType;
