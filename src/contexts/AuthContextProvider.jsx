import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../utils/FirebaseConfig';

const authContext = createContext();

export const useAuth = () => {
	return useContext(authContext);
};

const AuthContextProvider = ({ children }) => {
	const auth = getAuth();

	const [user, setUser] = useState(undefined);

	useEffect(() => {
		if (!user) return;
		const fetchData = async () => {
			const docRef = doc(db, 'users', user.uid);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				const data = docSnap.data();
				if (data.extensionStates) {
					// Get the init state for webview
					window.api.send('extensionStates', data.extensionStates);
				}
			}
		};

		window.api.recieve('getExtensionStatesReply', () => {
			fetchData();
		});

		window.api.recieve('setLatestOverlayLocationReply', (...payload) => {
			const docRef = doc(db, 'users', user.uid);
			setDoc(
				docRef,
				{ extensionStates: { scrollHelpPosition: { top: payload[0][0], left: payload[0][1] } } },
				{ merge: true },
			);
		});
		fetchData();
	}, [user]);

	onAuthStateChanged(auth, (user) => {
		if (user) {
			setUser(user);
		} else {
			setUser(undefined);
		}
	});

	return <authContext.Provider value={{ user: user, auth: auth }}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
