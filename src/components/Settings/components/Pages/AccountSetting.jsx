import React, { useState } from 'react';
import Login from '../../../Auth/Login';
import Register from '../../../Auth/Register';

import { useAuth } from '../../../../contexts/AuthContextProvider';
import { signOut } from 'firebase/auth';
import Title from '../../../Typography/Title';

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
		<div className="h-[calc(100vh-80px)] overflow-y-scroll px-10 pb-16">
			<Title className="mt-8">Account</Title>
			<div className="p-4">
				{user && (
					<>
						<p className="text-2xl font-bold">Je bent ingelogd</p>
						<button className="mt-10 h-10 w-32 rounded-xl bg-red-500 text-white" onClick={logout}>
							Uitloggen
						</button>
					</>
				)}

				{!user &&
					(loginActive ? <Login setLoginActive={setLoginActive} /> : <Register setLoginActive={setLoginActive} />)}
			</div>
		</div>
	);
};

export default AccountSetting;
