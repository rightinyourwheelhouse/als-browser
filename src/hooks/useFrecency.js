import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContextProvider';
import useLocalStorageState from './useLocalStorageState';
import { db } from '../utils/FirebaseConfig';
import { query, collection, onSnapshot, orderBy } from 'firebase/firestore';

const getPartOfDay = (now) => {
	const hours = now.getHours();
	let result;
	switch (hours) {
		case hours >= 0 && hours <= 5:
			result = 'night';
			break;
		case hours >= 6 && hours <= 11:
			result = 'morning';
			break;
		case hours >= 12 && hours <= 17:
			result = 'afternoon';
			break;
		case hours >= 18 && hours <= 23:
			result = 'evening';
			break;
	}

	return result;
};

const getPartOfWeek = (now) => {
	const days = now.getDay();
	if (days == 0 || days == 6) return 'weekend';
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
					id: doc.id,
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

		const filteredHistory = [];

		history.forEach((item) => {
			if (
				!item.title?.includes('Google Zoeken') ||
				(!item.title?.includes('Google Search') && item.visitTime >= now - 30 * day)
			) {
				filteredHistory.push(item);
			}
		});

		const sortedHistory = filteredHistory.sort(function (a, b) {
			if (a.title < b.title) {
				return -1;
			}
			if (a.title > b.title) {
				return 1;
			}
			return 0;
		});

		let splitHistory = sortedHistory.reduce((acc, cur) => {
			acc[cur.title] = acc[cur.title] || [];
			acc[cur.title].push(cur);
			return acc;
		}, []);

		let scoreArray = [];
		for (let key in splitHistory) {
			scoreArray.push([
				key,
				splitHistory[key].reduce(function (score, visitTime) {
					let date = new Date(visitTime);
					let partOfDay = getPartOfDay(date);
					let partOfWeek = getPartOfWeek(date);

					if (partOfDay == partOfDayNow) return score + 100;
					if (partOfWeek == partOfWeekNow) return score + 50;

					if (visitTime >= now - day) return score + 80;
					if (visitTime >= now - 7 * day) return score + 60;
					if (visitTime >= now - 14 * day) return score + 40;
					if (visitTime >= now - 21 * day) return score + 20;
					return score;
				}, 0),
			]);
		}

		const sortedScoreArray = scoreArray.sort(function (a, b) {
			return b[1] - a[1];
		});

		const numOfScores = 3;
		const scoreObject = sortedScoreArray.slice(0, numOfScores).reduce((acc, cur) => ({ ...acc, [cur[0]]: cur[1] }), {});

		const suggestionArray = [];

		for (let key in scoreObject) {
			history.find((item) => {
				if (item.title == key && !suggestionArray.includes(key)) {
					suggestionArray.push(item);
					return true;
				}
			});
		}

		setSuggestions(suggestionArray);
	}, [history]);

	return suggestions;
}
