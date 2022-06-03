import { useEffect } from 'react';
import { db } from './FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

import { useAuth } from '../contexts/AuthContextProvider';

export const useHistory = () => {
	const { user } = useAuth();

	useEffect(() => {
		if (!user) return;
		window.api.recieve('historyReply', async (historyItem) => {
			const historyRef = collection(db, `users/${user.uid}/history/`);
			if (typeof historyItem[0] !== 'string') await addDoc(historyRef, historyItem[0]);
		});
		return () => window.api.removeAllListeners('historyReply');
	}, [user]);
};
