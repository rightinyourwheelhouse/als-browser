import { useEffect } from 'react';
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
	}, []);

	// This loop gives a score to each title based on visittime, visitcount, ...
	const scoreArray = [];
	for (let key in groupedHistory) {
		const pageScore = groupedHistory[key].reduce((score, visitTime) => {
			let date = new Date(visitTime);
			let partOfDay = getPartOfDay(date);
			let partOfWeek = getPartOfWeek(date);

			switch ((date, partOfDay, partOfWeek)) {
				case partOfDay == partOfDayNow:
					score + 100;
					break;
				case partOfWeek == partOfWeekNow:
					score + 50;
					break;
				case visitTime >= now - day:
					score + 80;
					break;
				case visitTime >= now - 7 * day:
					score + 60;
					break;
				case visitTime >= now - 14 * day:
					score + 40;
					break;
				case visitTime >= now - 21 * day:
					score + 20;
					break;
			}
			return score;
		}, 0);
		scoreArray.push([key, pageScore]);
	}

	const sortedScoreArray = scoreArray.sort((a, b) => {
		return b[1] - a[1];
	});

	const scoreObject = sortedScoreArray.slice(0, 3).reduce((acc, cur) => ({ ...acc, [cur[0]]: cur[1] }), {});

	const suggestionArray = [];

	// There are multiple historyItems with the same title. If you use the return false, this will stop searching on this key. With the return true, the every function will continue.
	for (let key in scoreObject) {
		history.every((historyItem) => {
			if (key == historyItem.title) {
				suggestionArray.push(historyItem);
				return false;
			}
			return true;
		});
	}

	return suggestionArray;
}
