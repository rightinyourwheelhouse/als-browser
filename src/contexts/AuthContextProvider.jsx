import React, { createContext, useContext, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import '../utils/FirebaseConfig';

const authContext = createContext();

export const useAuth = () => {
	return useContext(authContext);
};

const AuthContextProvider = ({ children }) => {
	const auth = getAuth();

	const [user, setUser] = useState(undefined);

	onAuthStateChanged(auth, (user) => {
		if (user) {
			setUser(user);

			window.api.send('sendAuthToBrowserView', user.uid);
		} else {
			setUser(undefined);

			window.api.send('sendAuthToBrowserView', null);
		}
	});

	return <authContext.Provider value={{ user, auth }}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
