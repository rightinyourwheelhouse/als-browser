import React, { createContext, useContext, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const userContext = createContext();

export const useUser = () => {
	return useContext(userContext);
};

const UserContextProvider = ({ children }) => {
	const [user, setUser] = useState(undefined);

	const auth = getAuth();

	onAuthStateChanged(auth, (user) => {
		if (user) {
			setUser(user);

			window.api.send('sendAuthToBrowserView', user.uid);
		} else {
			setUser(undefined);

			window.api.send('sendAuthToBrowserView', null);
		}
	});

	return <userContext.Provider value={{ user: user, auth: auth }}>{children}</userContext.Provider>;
};

export default UserContextProvider;
