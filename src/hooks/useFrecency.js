import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContextProvider';
import useLocalStorageState from './useLocalStorageState';
import { db } from '../utils/FirebaseConfig';
import { query, collection, onSnapshot, orderBy } from 'firebase/firestore';

const getPartOfDay = (now) => {
	const hours = now.getHours();

	if (hours >= 0 && hours <= 5) {
		return 'night';
	} else if (hours >= 6 && hours <= 11) {
		return 'morning';
	} else if (hours >= 12 && hours <= 17) {
		return 'afternoon';
	} else {
		return 'evening';
	}
};

const getPartOfWeek = (now) => {
	const days = now.getDay();
	if (days === 0 || days === 6) return 'weekend';
	return 'weekday';
};

export default function useFrecency() {
	const { user } = useAuth();
	const [history, setHistory] = useLocalStorageState('history', []);
	const [suggestions, setSuggestions] = useState([]);

	useEffect(() => {
		if (!user) return;

		const queryRef = query(collection(db, 'users', `${user.uid}/history`), orderBy('visitTime', 'desc'));

		const unsubscribe = onSnapshot(queryRef, (snapshot) => {
			let historyArray = [];
			snapshot.forEach((doc) => {
				const data = doc.data();
				const historyData = {
					visitTime: data.visitTime,
					title: data.title,
					url: data.url,
					favicon: data.favicon,
				};
				historyArray.push(historyData);
			});
			setHistory(historyArray);
		});
		return () => unsubscribe();
	}, [user, setHistory]);

	useEffect(() => {
		let now = new Date();
		const partOfDayNow = getPartOfDay(now);
		const partOfWeekNow = getPartOfWeek(now);

		now = now.getTime();
		const hour = 1000 * 60 * 60;
		const day = 24 * hour;

		// This groupes all the documents by title
		const groupedHistory = history.reduce((acc, cur) => {
			acc[cur.title] = acc[cur.title] || [];
			acc[cur.title].push(cur);
			return acc;
		}, {});

		// This loop gives a score to each title based on visittime, visitcount, ...
		const scoreArray = [];
		for (let key in groupedHistory) {
			let score = 0;

			groupedHistory[key].forEach((history) => {
				const { visitTime } = history;
				let date = new Date(visitTime);
				let partOfDay = getPartOfDay(date);
				let partOfWeek = getPartOfWeek(date);

				if (partOfDay === partOfDayNow) {
					score += 100;
				} else if (partOfWeek === partOfWeekNow) {
					score += 50;
				} else if (visitTime >= now - day) {
					score += 80;
				} else if (visitTime >= now - 7 * day) {
					score += 60;
				} else if (visitTime >= now - 14 * day) {
					score += 40;
				} else if (visitTime >= now - 21 * day) {
					score += 20;
				}
			});

			scoreArray.push([key, score]);
		}

		const sortedScoreArray = scoreArray.sort((a, b) => {
			return b[1] - a[1];
		});

		const scoreObject = sortedScoreArray.slice(0, 3).reduce((acc, cur) => ({ ...acc, [cur[0]]: cur[1] }), {});

		const suggestionArray = [];

		// There are multiple historyItems with the same title. If you use the return false, this will stop searching on this key. With the return true, the every function will continue.
		for (let key in scoreObject) {
			history.every((historyItem) => {
				if (key === historyItem.title) {
					suggestionArray.push(historyItem);
					return false;
				}
				return true;
			});
		}
		setSuggestions(suggestionArray);
	}, [history]);

	return suggestions;
}
