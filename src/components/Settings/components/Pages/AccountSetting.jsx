import React from 'react';
import Login from '../../../Auth/Login';

import { useUser } from '../../../../contexts/UserContext';
import { signOut } from 'firebase/auth';

const AccountSetting = () => {
	const user = useUser();

	const logout = async () => {
		try {
			await signOut(user.auth);
		} catch (error) {
			return;
		}
	};

	return user.user ? (
		<div>
			<p>Je bent ingelogd</p> <button onClick={logout}>Uitloggen</button>
		</div>
	) : (
		<Login />
	);
};

export default AccountSetting;
