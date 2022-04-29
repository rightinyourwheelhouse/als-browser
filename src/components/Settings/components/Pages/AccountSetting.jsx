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
		<div className="mt-4 text-center">
			<p className="text-2xl font-bold">Je bent ingelogd</p>
			<button className="mt-10 h-10 w-32 rounded-xl bg-red-500 text-white" onClick={logout}>
				Uitloggen
			</button>
		</div>
	) : (
		<Login />
	);
};

export default AccountSetting;
