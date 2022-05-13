import React, { useState } from 'react';
import Login from '../../../Auth/Login';
import Register from '../../../Auth/Register';

import { useAuth } from '../../../../contexts/AuthContextProvider';
import Title from '../../../Typography/Title';
import Account from '../../../Auth/Account';

const AccountSetting = ({ device, deviceSpecification, hasDeviceSpecification, setHasDeviceSpecification }) => {
	const { user } = useAuth();
	const [loginActive, setLoginActive] = useState(true);

	return (
		<div id="account_overflow" className="h-[calc(100vh-80px)] overflow-y-scroll px-10 pb-16">
			<Title className="mt-8">Account</Title>
			<div className="">
				{user && (
					<Account
						user={user}
						device={device}
						deviceSpecification={deviceSpecification}
						hasDeviceSpecification={hasDeviceSpecification}
						setHasDeviceSpecification={setHasDeviceSpecification}
					/>
				)}

				{!user &&
					(loginActive ? <Login setLoginActive={setLoginActive} /> : <Register setLoginActive={setLoginActive} />)}
			</div>
		</div>
	);
};

export default AccountSetting;
