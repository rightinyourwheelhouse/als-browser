import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../utils/FirebaseConfig';

const authContext = createContext();

export const useAuth = () => {
	return useContext(authContext);
};

const AuthContextProvider = ({ children }) => {
	const auth = getAuth();

	const [user, setUser] = useState(undefined);
	const [extensionStates, setExtensionStates] = useState(undefined);

	useEffect(() => {
		const fetchData = async () => {
			const docRef = doc(db, 'users', user.uid);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				const data = docSnap.data();
				if (data.extensionStates) {
					setExtensionStates(data.extensionStates);
				}
			}
		};

		if (user) fetchData();
	}, [user]);

	onAuthStateChanged(auth, (user) => {
		if (user) {
			setUser(user);
			// Get the init state for webview
			window.api.send('extensionStates', extensionStates);
		} else {
			setUser(undefined);
		}
	});

	return <authContext.Provider value={{ user: user, auth: auth }}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
