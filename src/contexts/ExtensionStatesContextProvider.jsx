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
		scrollHelpPosition: { top: '68%', left: '90%' },
	});

	useEffect(() => {
		window.api.recieve('getExtensionStatesReply', () => {
			if (!user) {
				window.api.send('extensionStates', extensionStates);
			} else {
				fetchData();
			}
		});

		window.api.recieve('setLatestOverlayLocationReply', (...payload) => {
			if (!user) {
				setExtensionStates((prevExtensionStates) => ({
					...prevExtensionStates,
					scrollHelpPosition: { top: payload[0][0], left: payload[0][1] },
				}));
			} else {
				const docRef = doc(db, 'users', user.uid);
				setDoc(
					docRef,
					{ extensionStates: { scrollHelpPosition: { top: payload[0][0], left: payload[0][1] } } },
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
					// Get the init state for webview
					setExtensionStates(data.extensionStates);
					window.api.send('extensionStates', data.extensionStates);
				}
			}
		};

		fetchData();

		return () => {
			window.api.removeAllListeners('getExtensionStatesReply');
			window.api.removeAllListeners('setLatestOverlayLocationReply');
		};
	}, [user]);

	return (
		<extensionStatesContext.Provider
			value={{ extensionStates: extensionStates, setExtensionStates: setExtensionStates }}
		>
			{children}
		</extensionStatesContext.Provider>
	);
};

export default ExtensionStatesContextProvider;
