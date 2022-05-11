import { useEffect } from 'react';
import { db } from './FirebaseConfig';
import { collection, updateDoc, addDoc, doc, where, query, getDocs } from 'firebase/firestore';

import { useAuth } from '../contexts/AuthContextProvider';

export const useHistory = () => {
	const { user } = useAuth();

	useEffect(() => {
		if (!user) return;
		window.api.recieve('historyReply', async (historyItem) => {
			// check if history item already exists
			if (collection(db, `users/${user.uid}/history`)) {
				const q = await getDocs(query(collection(db, `users/${user.uid}/history/`), where('url', '==', historyItem[0].url)));
				if (!q.empty) {
					// history item already exists
					// update visit time
          var docId = q.docs[0].id;
					await updateDoc(doc(db, `users/${user.uid}/history/${docId}`), { visitTime: new Date().getTime() });
				} else {
					// history item does not exist
					// add history item to firebase db collection
					var historyRef = collection(db, `users/${user.uid}/history/`);
					await addDoc(historyRef, historyItem[0]);
				}
			}
		});
	}, [user]);
};
