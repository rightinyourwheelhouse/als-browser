import React, { useState, useEffect } from 'react';
import { db } from './FirebaseConfig';
import { arrayUnion, doc, getDoc, setDoc, writeBatch, Timestamp } from 'firebase/firestore';

import { useAuth } from '../contexts/AuthContextProvider';

export const MouseData = () => {
	const { user } = useAuth();
	console.log(user);

	const MAX_QUEUE_SIZE = 250;
	let queue = [];

	let device;
	let batchRef;
	let batchSnap;

	useEffect(() => {
		if (!user) return;

		window.api.recieve('webPageDataReply', ([data]) => {
			console.log('webPageDataReply', data);
			setDoc(doc(db, `users/${user.uid}/visitedPages`, data.title), {
				url: data.url,
				title: data.title,
				lastVisit: data.lastVisit,
			});
		});
	}, [user]);
};
