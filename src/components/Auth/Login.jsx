import React, { useState } from 'react';

import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, Timestamp } from 'firebase/firestore';

import { useAuth } from '../../contexts/AuthContextProvider';

import TextInputGroup from '../TextInputGroup';
import { db } from '../../utils/FirebaseConfig';
import ErrorHandling from '../../utils/ErrorHandeling';
import ErrorBanner from './ErrorBanner';

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

const Login = ({ setLoginActive }) => {
	const [error, setError] = useState('');
	const { auth } = useAuth();

	const handleSubmit = async (values, { setSubmitting }) => {
		try {
			setSubmitting(true);
			await signInWithEmailAndPassword(auth, values.email, values.password);

			const user = auth.currentUser;

			// Create user ID in Firestore
			const docData = {
				lastLogin: Timestamp.fromDate(new Date()),
			};
			setDoc(doc(db, 'users', user.uid), docData, { merge: true });
		} catch (error) {
			const errorHandling = ErrorHandling(error);
			setError(errorHandling);
		}
	};

	return (
		<div>
			<div className="mt-8 flex flex-col items-center">
				<Formik
					initialValues={{
						email: '',
						password: '',
					}}
					onSubmit={handleSubmit}
					validationSchema={validationSchema}
				>
					{({ handleSubmit, isSubmitting }) => (
						<form onSubmit={handleSubmit} className="w-96 rounded-md border-2 border-slate-500 bg-slate-200 p-8">
							<h1 className="mb-8 text-xl font-bold">Meld je aan</h1>
							{error && <ErrorBanner error={error} />}
							<div className="mb-4">
								<Field type="input" as={TextInputGroup} name="email" placeholder="E-mail" label="E-mailadres" />
								<Field
									type="password"
									as={TextInputGroup}
									name="password"
									placeholder="Wachtwoord"
									label="Wachtwoord"
								/>
							</div>

							<button
								type="submit"
								className="mt-8 h-10 w-full rounded-lg bg-dark-blue text-white"
								disabled={isSubmitting}
							>
								Aanmelden
							</button>
						</form>
					)}
				</Formik>
			</div>
			<div className="mt-5 flex flex-col items-center">
				<p className="">
					Nog geen account?{' '}
					<button className="text-dark-blue underline" onClick={() => setLoginActive(false)}>
						Registreer
					</button>
				</p>
			</div>
		</div>
	);
};

export default Login;
