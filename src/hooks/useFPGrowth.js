import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContextProvider';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../utils/FirebaseConfig';
import { FPGrowth } from 'node-fpgrowth';

const segmentHistory = (history) => {
	let sequence = [];
	let overArchingList = [];

	for (let i = 0; i < history.length; i++) {
		const title = history[i].title;
		sequence.push(title);
		if (i + 1 < history.length) {
			if (history[i].visitTime - history[i + 1].visitTime > 3600) {
				overArchingList.push(sequence);
				sequence = [];
			}
		}
	}
	return overArchingList;
};

const filterFrequentItemSets = (frequentItemSets, history) => {
	let itemSets = [];
	const now = new Date().getTime();
	const latestHistory = history.filter((item) => now - item.visitTime < 1200000);

	frequentItemSets.forEach((itemSet) => {
		const items = itemSet.items;
		for (let i = 0; i < items.length; i++) {
			latestHistory.forEach((element) => {
				if (element.title === items[i]) {
					const isInList = itemSets.some((element) => element.suggestedSite.title === items[i]);
					if (!isInList) itemSets.push({ suggestedSite: element, support: itemSet.support });
				}
			});
		}
	});

	const sortedItemSets = itemSets.sort((a, b) => {
		return b.support - a.support;
	});
	return sortedItemSets.map((itemSet) => itemSet.suggestedSite);
};

export default function useFPGrowth() {
	const { user } = useAuth();

	const [fpGrowthSuggestion, setFpGrowthSuggestion] = useState([]);

	useEffect(() => {
		if (!user) return;

		const fpGrowthInit = async (history) => {
			let fpGrowth = new FPGrowth(0.1);
			const itemSet = await fpGrowth.exec(segmentHistory(history));
			const suggestedNodes = filterFrequentItemSets(itemSet, history);

			setFpGrowthSuggestion(suggestedNodes);
		};

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
			fpGrowthInit(historyArray);
		});
		return () => unsubscribe();
	}, [user]);

	return fpGrowthSuggestion;
}
