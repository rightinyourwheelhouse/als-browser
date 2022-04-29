import React, { createContext, useContext, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const authContext = createContext();

export const useAuth = () => {
	return useContext(authContext);
};

const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(undefined);

	const auth = getAuth();

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
