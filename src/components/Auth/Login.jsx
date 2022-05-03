import React from 'react';

import { Formik, Field } from 'formik';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, Timestamp } from 'firebase/firestore';

import { useAuth } from '../../contexts/AuthContextProvider';

import TextInputGroup from '../TextInputGroup';
import { db } from '../../utils/FirebaseConfig';

const Login = () => {
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
			return;
		}
	};

	return (
		<div className="flex-colitems-center m-center flex max-w-md justify-center bg-white p-10">
			<Formik
				initialValues={{
					email: '',
					password: '',
				}}
				onSubmit={handleSubmit}
			>
				{({ handleSubmit, isSubmitting }) => (
					<form onSubmit={handleSubmit} className="my-0 flex flex-col items-center">
						<h1 className="my-4 text-center text-xl font-bold">Meld je aan</h1>
						<div className="mb-4">
							<Field type="input" as={TextInputGroup} name="email" placeholder="E-mail" label="E-mailadres" />
							<Field type="password" as={TextInputGroup} name="password" placeholder="Password" label="Wachtwoord" />
						</div>

						<button className="h-10 w-32 rounded-xl bg-dark-blue text-white" disabled={isSubmitting}>
							Aanmelden
						</button>
					</form>
				)}
			</Formik>
		</div>
	);
};

export default Login;
