import React from 'react';

import { useAuth } from '../../../../contexts/AuthContextProvider';
import { db } from '../../../../utils/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

import HistoryTile from '../HistoryTile';

const HistorySetting = () => {
	var history = GetHistory();
	// var historyItems = document.createElement('div');

	history.then((history) => {
		history.forEach((doc) => {
			// console.log(`${new Date(doc.data().visitTime).getHours()}:${new Date(doc.data().visitTime).getMinutes()}`);
      return <HistoryTile historyItem={doc.data()} />
		});
	});

	return (
		<HistoryTile
			historyItem={{
				visitTime: 1652262152564,
			}}
		/>
	);
};

const GetHistory = async () => {
	const { user } = useAuth();
	if (!user) return;
	const historyRef = collection(db, `users/${user.uid}/history/`);
	const history = await getDocs(historyRef);
	return history;
};

export default HistorySetting;
