import React, { useState } from 'react';
import Login from '../../../Auth/Login';
import Register from '../../../Auth/Register';

import { useAuth } from '../../../../contexts/AuthContextProvider';
import { signOut } from 'firebase/auth';

const AccountSetting = () => {
	const { user, auth } = useAuth();
	const [loginActive, setLoginActive] = useState(true);

	const logout = async () => {
		try {
			await signOut(auth);
		} catch (error) {
			return;
		}
	};

	return (
		<>
			{user && (
				<div className="mt-4 text-center">
					<p className="text-2xl font-bold">Je bent ingelogd</p>
					<button className="mt-10 h-10 w-32 rounded-xl bg-red-500 text-white" onClick={logout}>
						Uitloggen
					</button>
				</div>
			)}

			{!user &&
				(loginActive ? <Login setLoginActive={setLoginActive} /> : <Register setLoginActive={setLoginActive} />)}
		</>
	);
};

export default AccountSetting;
