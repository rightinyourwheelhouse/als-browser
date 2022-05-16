import React, { useEffect, useState } from 'react';
import BigTile from './Tiles/BigTile';
import Title from '../Typography/Title';
import Clock from '../Clock';
import Fuse from 'fuse.js';
import { useAuth } from '../../contexts/AuthContextProvider';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../utils/FirebaseConfig';

const options = {
	isCaseSensitive: false,
	// includeScore: true,
	shouldSort: true,
	// includeMatches: false,
	findAllMatches: true,
	minMatchCharLength: 2,
	// location: 0,
	threshold: 0.49,
	// distance: 100,
	// useExtendedSearch: false,
	// ignoreLocation: false,
	// ignoreFieldNorm: false,
	// fieldNormWeight: 1,
	keys: ['websiteName', 'hostname'],
};

const OnType = ({ params }) => {
	const { user } = useAuth();
	const [suggestions, setSuggestions] = useState([]);
	const [userHistory, setUserHistory] = useState([]);

	const fuseSearch = (list, input) => {
		const fuse = new Fuse(list, options);
		const result = fuse.search(input);
		setSuggestions(result);
	};

	useEffect(() => {
		if (!user) return;
		// Get user data
		const fetchData = async () => {
			const q = query(collection(db, `users/${user.uid}`, 'history'));
			const querySnapshot = await getDocs(q);

			const data = [];
			querySnapshot.forEach((doc) => {
				// Check if the hostname is already in the list
				const hostname = doc.data().hostname;
				const isInList = data.some((item) => item.hostname === hostname);
				if (!isInList) data.push(doc.data());
			});
			setUserHistory(data);
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
				{suggestions.map((suggestion, index) => {
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
