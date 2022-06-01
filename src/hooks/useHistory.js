import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContextProvider';
import useLocalStorageState from './useLocalStorageState';
import { db } from '../utils/FirebaseConfig';
import { query, collection, onSnapshot, orderBy } from 'firebase/firestore';

export default function useHistory() {
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

	return history;
}
