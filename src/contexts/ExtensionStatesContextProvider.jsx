import React, { createContext, useContext, useEffect } from 'react';
import useLocalStorageState from '../hooks/useLocalStorageState';
import { useAuth } from './AuthContextProvider';

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../utils/FirebaseConfig';

const extensionStatesContext = createContext();

export const useExtensionStates = () => {
	return useContext(extensionStatesContext);
};

const ExtensionStatesContextProvider = ({ children }) => {
	const { user } = useAuth();

	const [extensionStates, setExtensionStates] = useLocalStorageState('extensionStates', {
		scrollSpeed: 3,
		radialUI: true,
		mousePrediction: true,
		scrollHelp: true,
		mouseTracking: true,
		scrollHelpPosition: { top: '68%', left: '90%' },
	});

	useEffect(() => {
		window.api.recieve('getExtensionStatesReply', () => {
			window.api.send('extensionStates', extensionStates);
		});

		return () => window.api.removeAllListeners('getExtensionStatesReply');
	}, [extensionStates]);

	useEffect(() => {
		window.api.recieve('setLatestOverlayLocationReply', (payload) => {
			setExtensionStates((previousState) => ({
				...previousState,
				scrollHelpPosition: { top: payload[0].top, left: payload[0].left },
			}));

			if (user) {
				const docRef = doc(db, 'users', user.uid);
				setDoc(
					docRef,
					{ extensionStates: { scrollHelpPosition: { top: payload[0].top, left: payload[0].left } } },
					{ merge: true },
				);
			}
		});

		// Stop function when no user
		if (!user) return;
		const fetchData = async () => {
			const docRef = doc(db, 'users', user.uid);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				const data = docSnap.data();
				if (data.extensionStates) {
					setExtensionStates(data.extensionStates);
					window.api.send('extensionStates', data.extensionStates);
				}
			}
		};

		fetchData();

		return () => window.api.removeAllListeners('setLatestOverlayLocationReply');
	}, [user, setExtensionStates]);

	return (
		<extensionStatesContext.Provider value={[extensionStates, setExtensionStates]}>
			{children}
		</extensionStatesContext.Provider>
	);
};

export default ExtensionStatesContextProvider;
