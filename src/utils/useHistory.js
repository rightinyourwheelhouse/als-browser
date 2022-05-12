import { useEffect } from 'react';
import { db } from './FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

import { useAuth } from '../contexts/AuthContextProvider';

export const useHistory = () => {
	const { user } = useAuth();

	useEffect(() => {
		if (!user) return;
		window.api.recieve('historyReply', async (historyItem) => {
			var historyRef = collection(db, `users/${user.uid}/history/`);
			await addDoc(historyRef, historyItem[0]);
		});
	}, [user]);
};
