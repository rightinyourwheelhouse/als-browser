import React from 'react';
import Login from '../../../Auth/Login';

import { useAuth } from '../../../../contexts/AuthContextProvider';
import { signOut } from 'firebase/auth';

const AccountSetting = () => {
	const { user, auth } = useAuth();

	const logout = async () => {
		try {
			await signOut(auth);
		} catch (error) {
			return;
		}
	};

	return user ? (
		<div>
			<p>Je bent ingelogd</p> <button onClick={logout}>Uitloggen</button>
		</div>
	) : (
		<Login />
	);
};

export default AccountSetting;
