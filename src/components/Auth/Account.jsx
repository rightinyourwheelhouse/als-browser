import React, { useState } from 'react';
import Toast from '../Toast';
import FormChangeEmail from './FormChangeEmail';
import FormChangePassword from './FromChangePassword';

const Account = ({ user, logout }) => {
	const [toast, setToast] = useState(false);

	return (
		<div>
			{toast && <Toast message="De aanpassingen zijn opgeslagen" setToast={setToast} />}

			<FormChangeEmail user={user} toast={toast} setToast={setToast} />

			<FormChangePassword user={user} toast={toast} setToast={setToast} />

			<button className="mt-10 h-10 w-32 rounded-xl bg-red-500 text-white" onClick={logout}>
				Uitloggen
			</button>
		</div>
	);
};

export default Account;
