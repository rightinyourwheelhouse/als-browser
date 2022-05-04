import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Field } from 'formik';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

import TextInputGroup from '../TextInputGroup';
import ErrorBanner from './ErrorBanner';
import ErrorHandling from '../../utils/ErrorHandeling';

Yup.setLocale({
	mixed: {
		required: 'Dit veld is verplicht.',
	},
	string: {
		email: 'Dit moet een geldig emailadres zijn.',
		min: 'Het wachtwoord moet minimaal 6 tekens zijn.',
	},
});

const validationSchemaPasswordChange = Yup.object().shape({
	current_password: Yup.string().required().label('Current Password'),
	new_password: Yup.string().required().min(6).label('New Password'),
});

const FormChangePassword = ({ user, setToast }) => {
	const [error, setError] = useState('');

	const handleSubmitPasswordChange = async (values, { setSubmitting }) => {
		// To change password we need to reauthenticate the user

		try {
			setToast(false);
			setError('');
			setSubmitting(true);

			//re-authenticate the user by getting new sign-in credentials from the user and passing the credentials to reauthenticateWithCredential
			const credential = EmailAuthProvider.credential(user.email, values.current_password);
			await reauthenticateWithCredential(user, credential);

			try {
				await updatePassword(user, values.new_password);

				setToast(true);
				setTimeout(() => {
					setToast(false);
				}, 5000);
			} catch (error) {
				const errorHandling = ErrorHandling(error);
				setError(errorHandling);
			}

			setSubmitting(false);
		} catch (error) {
			const errorHandling = ErrorHandling(error);
			setError(errorHandling);
		}
	};

	return (
		<div className="mt-6">
			<h3 className="mb-2 text-lg font-bold">Wachtwoord bijwerken</h3>
			<Formik
				initialValues={{ current_password: '', new_password: '' }}
				validationSchema={validationSchemaPasswordChange}
				onSubmit={handleSubmitPasswordChange}
			>
				{({ handleSubmit, isSubmitting }) => (
					<form onSubmit={handleSubmit} className="w-full rounded-md bg-slate-200 p-4">
						{error && <ErrorBanner error={error} />}
						<div className="mb-2 mt-4">
							<Field
								type="password"
								as={TextInputGroup}
								name="current_password"
								placeholder="Oud wachtwoord"
								label="Oud wachtwoord"
							/>
						</div>

						<div className="mb-8">
							<Field
								type="password"
								as={TextInputGroup}
								name="new_password"
								placeholder="Nieuw wachtwoord"
								label="Nieuw wachtwoord"
							/>
						</div>

						<button className="mt-2 h-10 rounded-lg bg-dark-blue px-6 text-white" disabled={isSubmitting}>
							Bijwerking opslaan
						</button>
					</form>
				)}
			</Formik>
		</div>
	);
};

export default FormChangePassword;
