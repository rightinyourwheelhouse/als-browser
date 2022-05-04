import React, { useState, useEffect } from 'react';
import { db } from './FirebaseConfig';
import { arrayUnion, doc, getDoc, setDoc, writeBatch, onSnapshot } from 'firebase/firestore';

import { useAuth } from '../contexts/AuthContextProvider';

export const MouseData = () => {
	const { user } = useAuth();
	const [currentWebPageTitle, setCurrentWebPageTitle] = useState('');
	const [mouseTrackingActive, setMouseTrackingActive] = useState(false);

	const MAX_QUEUE_SIZE = 250;
	let queue = [];

	let device;
	let batchRef;
	let batchSnap;

	useEffect(() => {
		if (!user) return;

		const unsub = onSnapshot(doc(db, 'users', user.uid), (snap) => {
			if (snap.exists()) {
				const data = snap.data();
				if (data.extensionStates) setMouseTrackingActive(data.extensionStates.mouseTracking);
			}
		});
		return () => {
			unsub();
		};
	}, [user]);

	useEffect(() => {
		if (!user) return;

		window.api.recieve('webPageDataReply', ([data]) => {
			setCurrentWebPageTitle(data.title);
			setDoc(doc(db, `users/${user.uid}/visitedPages`, data.title), {
				url: data.url,
				title: data.title,
				lastVisit: data.lastVisit,
			});
		});
	}, [user]);

	useEffect(() => {
		if (!user) return;

		window.api.recieve('cursorDataReply', async ([data]) => {
			if (data.currentWebPageTitle == currentWebPageTitle) {
				if (mouseTrackingActive && data.pageX != undefined && data.pageY != undefined) {
					device = await getUserDevice();

					if (!batchRef) {
						batchRef = doc(db, `users/${user.uid}/visitedPages/${data.currentWebPageTitle}/mouseTracking`, 'mouseData');
					}

					if (!batchSnap) {
						batchSnap = await getDoc(batchRef);
						if (!batchSnap.exists()) {
							await setDoc(batchRef, {
								values: [],
							});
						}
					}

					queue.push(
						arrayUnion({
							mouse: {
								clientX: data.clientX,
								clientY: data.clientY,
								click: data.isClick,
							},
							pageX: data.pageX,
							pageY: data.pageY,
							device: device,
							timestamp: data.timestamp,
							htmlElement: data.element || null,
						}),
					);

					if (queue.length >= MAX_QUEUE_SIZE) {
						let batch = writeBatch(db);
						queue.forEach((event) => {
							batch.update(batchRef, 'values', event);
						});

						await sendbatch(batch);
					}
				}
			}
		});
	}, [currentWebPageTitle]);

	const getUserDevice = async () => {
		if (!user) return;

		if (device) return device;

		let deviceRef = doc(db, `users/${user.uid}`);
		let userSnap = await getDoc(deviceRef);

		// Return empty device when no device is set
		return userSnap.data()?.device ?? '';
	};

	const sendbatch = async (batch) => {
		if (!user) return;
		queue = [];

		await batch.commit();
	};

	useEffect(() => {
		if (!user) return;

		window.api.recieve('beforeunloadReply', async () => {
			if (!queue.length) return;

			let batch = writeBatch(db);

			queue.forEach((queueItem) => {
				batch.update(batchRef, 'values', queueItem);
			});

			await sendbatch(batch);

			batchRef = null;
		});
	}, [user, queue, sendbatch, batchRef]);
};
