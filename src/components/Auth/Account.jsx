import React, { useState } from 'react';

import Toast from '../Toast';
import DeleteAccount from './DeleteAccount';
import FormChangeDevice from './FormChangeDevice';
import FormChangeEmail from './FormChangeEmail';
import FormChangePassword from './FromChangePassword';

const Account = ({ user, device, deviceSpecification, hasDeviceSpecification, setHasDeviceSpecification }) => {
	const [toast, setToast] = useState(false);

	return (
		<div>
			{toast && <Toast message="De aanpassingen zijn opgeslagen" setToast={setToast} />}

			<FormChangeEmail user={user} setToast={setToast} />

			<FormChangePassword user={user} setToast={setToast} />

			<FormChangeDevice
				user={user}
				setToast={setToast}
				device={device}
				deviceSpecification={deviceSpecification}
				hasDeviceSpecification={hasDeviceSpecification}
				setHasDeviceSpecification={setHasDeviceSpecification}
			/>

			<DeleteAccount user={user} />
		</div>
	);
};

export default Account;
