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
		} else {
			setUser(undefined);
		}
	});

	return <authContext.Provider value={{ user: user, auth: auth }}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
