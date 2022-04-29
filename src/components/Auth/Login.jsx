import React from 'react';

import { Formik, Field } from 'formik';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { setDoc, doc, Timestamp } from 'firebase/firestore';

import { useUser } from '../../contexts/UserContext';

import TextInputGroup from '../TextInputGroup';
import { db } from '../../utils/FirebaseConfig';

const Login = () => {
	const auth = useUser();

	const handleSubmit = async (values, { setSubmitting }) => {
		try {
			setSubmitting(true);
			await signInWithEmailAndPassword(auth.auth, values.email, values.password);

			const user = auth.auth.currentUser;

			// Create user ID in Firestore
			const docData = {
				lastLogin: Timestamp.fromDate(new Date()),
			};
			setDoc(doc(db, 'users', user.uid), docData, { merge: true });
		} catch (error) {
			return;
		}
	};

	const logout = async () => {
		try {
			await signOut(auth.auth);
		} catch (error) {
			return;
		}
	};

	return (
		<div className="flex h-auto max-w-md flex-col items-center justify-center rounded-sm bg-white p-10">
			<Formik
				initialValues={{
					email: '',
					password: '',
				}}
				onSubmit={handleSubmit}
			>
				{({ handleSubmit, isSubmitting }) => (
					<form onSubmit={handleSubmit} className="my-0 flex flex-col ">
						<h1 className="my-4 text-center text-xl font-bold">Meld je aan</h1>
						<div className="mb-4">
							<Field type="input" as={TextInputGroup} name="email" placeholder="E-mail" label="E-mailadres" />
							<Field type="password" as={TextInputGroup} name="password" placeholder="Password" label="Wachtwoord" />
						</div>

						<button disabled={isSubmitting}>Aanmelden</button>
					</form>
				)}
			</Formik>

			<button onClick={logout}>Uitloggen</button>
		</div>
	);
};

export default Login;
