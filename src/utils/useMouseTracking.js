import { useState, useEffect, useCallback, useRef } from 'react';
import { db } from './FirebaseConfig';
import { arrayUnion, doc, getDoc, setDoc, writeBatch, onSnapshot } from 'firebase/firestore';

import { useAuth } from '../contexts/AuthContextProvider';

export const useMouseTracking = () => {
	const { user } = useAuth();
	const [currentWebPageTitle, setCurrentWebPageTitle] = useState('');
	const [mouseTrackingActive, setMouseTrackingActive] = useState(false);

	const deviceRef = useRef();
	const queueRef = useRef([]);
	const batchSnapRef = useRef();
	const batchReferenceRef = useRef();

	const MAX_QUEUE_SIZE = 250;

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

	const getUserDevice = useCallback(async () => {
		if (!user) return;

		if (deviceRef.current) return deviceRef.current;

		let deviceReference = doc(db, `users/${user.uid}`);
		let userSnap = await getDoc(deviceReference);

		// Return empty device when no device is set
		return userSnap.data()?.device ?? '';
	}, [user, deviceRef]);

	const sendBatch = useCallback(
		async (batch) => {
			if (!user) return;
			console.log('sendBatch', batch);
			queueRef.current = [];

			await batch.commit();
		},
		[user, queueRef],
	);

	useEffect(() => {
		if (!user) return;

		window.api.recieve('cursorDataReply', async ([data]) => {
			if (data.currentWebPageTitle == currentWebPageTitle) {
				if (mouseTrackingActive && data.pageX != undefined && data.pageY != undefined) {
					deviceRef.current = await getUserDevice();

					batchReferenceRef.current = doc(
						db,
						`users/${user.uid}/visitedPages/${data.currentWebPageTitle}/mouseTracking`,
						'mouseData',
					);

					batchSnapRef.current = await getDoc(batchReferenceRef.current);
					if (!batchSnapRef.current.exists()) {
						await setDoc(batchReferenceRef.current, {
							values: [],
						});
					}

					queueRef.current.push(
						arrayUnion({
							mouse: {
								clientX: data.clientX,
								clientY: data.clientY,
								click: data.isClick,
							},
							pageX: data.pageX,
							pageY: data.pageY,
							device: deviceRef.current,
							timestamp: data.timestamp,
							htmlElement: data.element || null,
						}),
					);

					if (queueRef.current.length >= MAX_QUEUE_SIZE) {
						let batch = writeBatch(db);
						queueRef.current.forEach((event) => {
							batch.update(batchReferenceRef.current, 'values', event);
						});

						await sendBatch(batch);
					}
				}
			}
		});
	}, [user, currentWebPageTitle, getUserDevice, sendBatch, mouseTrackingActive]);

	useEffect(() => {
		if (!user) return;

		window.api.recieve('beforeunloadReply', async () => {
			if (!queueRef.current.length) return;

			let batch = writeBatch(db);

			queueRef.current.forEach((queueItem) => {
				batch.update(batchReferenceRef.current, 'values', queueItem);
			});

			await sendBatch(batch);

			batchReferenceRef.current = null;
		});
	}, [user, queueRef, sendBatch, batchReferenceRef]);
};
