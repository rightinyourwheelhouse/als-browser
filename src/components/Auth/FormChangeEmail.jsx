import React, { useState } from 'react';
import { updateEmail, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import * as Yup from 'yup';
import { Formik, Field } from 'formik';

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

const validationSchema = Yup.object().shape({
	email: Yup.string().required().email().label('Email'),
	password: Yup.string().required().min(6).label('Password'),
});

const FormChangeEmail = ({ user, setToast }) => {
	const [error, setError] = useState('');
	const [reAuthEmail, setReAuthEmail] = useState(false);

	const handleSubmit = async (values, { setSubmitting }) => {
		// To change email, we need to reauthenticate the user

		try {
			setToast(false);
			setError('');
			setSubmitting(true);

			//re-authenticate the user by getting new sign-in credentials from the user and passing the credentials to reauthenticateWithCredential
			const credential = EmailAuthProvider.credential(user.email, values.password);
			await reauthenticateWithCredential(user, credential);

			try {
				setToast(true);
				setTimeout(() => {
					setToast(false);
				}, 5000);

				await updateEmail(user, values.email);
				window.scrollTo(0, 0);
			} catch (error) {
				const errorHandling = ErrorHandling(error);
				setError(errorHandling);
			}

			setReAuthEmail(false);
			setSubmitting(false);
		} catch (error) {
			setError('Er is een fout opgetreden.');
		}
	};

	const emailChange = (e) => {
		setReAuthEmail(true);

		if (e.target.value === user.email) {
			setReAuthEmail(false);
		}
	};

	return (
		<div className="mt-6">
			<div className="">
				<h3 className="mb-2 text-lg font-bold">E-mailadres bijwerken</h3>
				<Formik
					initialValues={{
						email: user.email,
					}}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({ handleSubmit, isSubmitting }) => (
						<form onSubmit={handleSubmit} onChange={emailChange} className="w-full rounded-md bg-slate-200 p-4">
							{error && <ErrorBanner error={error} />}
							<div className={`${reAuthEmail ? 'mb-2' : 'mb-8'} mt-4`}>
								<Field type="input" as={TextInputGroup} name="email" placeholder="E-mail" label="E-mailadres" />
							</div>

							{reAuthEmail && (
								<div className="mb-8">
									<Field
										type="password"
										as={TextInputGroup}
										name="password"
										placeholder="Wachtwoord"
										label="Wachtwoord (bij verandering van e-mail)"
									/>
								</div>
							)}

							<button
								className="mt-2 h-10 rounded-lg bg-dark-blue px-6 text-white"
								disabled={!reAuthEmail ? true : isSubmitting}
							>
								Bijwerking opslaan
							</button>
						</form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default FormChangeEmail;
