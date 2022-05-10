/* global chrome */
import React, { useState } from 'react';
import { deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { deleteDoc, doc } from 'firebase/firestore';
import * as Yup from 'yup';
import { Formik, Field } from 'formik';

import { db } from '../../utils/FirebaseConfig';
import TextInputGroup from '../TextInputGroup';
import ErrorHandling from '../../utils/ErrorHandeling';
import ErrorBanner from './ErrorBanner';

Yup.setLocale({
	mixed: {
		required: 'Dit veld is verplicht.',
	},
	string: {
		min: 'Het wachtwoord moet minimaal 6 tekens zijn.',
	},
});

const validationSchema = Yup.object().shape({
	password: Yup.string().required().label('Current Password'),
});

const DeleteAccount = ({ user }) => {
	const [deleteModal, setDeleteModal] = useState(false);
	const [error, setError] = useState('');

	const handleDelete = async (values, { setSubmitting }) => {
		try {
			setError('');
			setSubmitting(true);

			const credential = EmailAuthProvider.credential(user.email, values.password);
			await reauthenticateWithCredential(user, credential);

			try {
				// delete user from firestore db
				await deleteDoc(doc(db, 'users', user.uid));

				// delete user from auth
				await deleteUser(user);
			} catch (error) {
				const errorHandling = ErrorHandling(error);
				setError(errorHandling);
			}
		} catch (error) {
			const errorHandling = ErrorHandling(error);
			setError(errorHandling);
		}
	};

	return (
		<div className="mt-6">
			<h3 className="mb-2 text-lg font-bold">Verwijder account</h3>
			{deleteModal ? (
				<div className="">
					<Formik initialValues={{ password: '' }} validationSchema={validationSchema} onSubmit={handleDelete}>
						{({ handleSubmit, isSubmitting }) => (
							<form onSubmit={handleSubmit} className="w-full rounded-md border-2 border-red-600 bg-slate-200 p-4">
								<h3 className="h3-danger">Weet je zeker dat je je account wilt verwijderen?</h3>
								<p>Vul je wachtwoord in om te bevestigen.</p>
								{error && <ErrorBanner error={error} />}
								<div className="mb-2 mt-4">
									<Field
										type="password"
										as={TextInputGroup}
										name="password"
										placeholder="wachtwoord"
										label="wachtwoord"
									/>
								</div>

								<div className="flex flex-col sm:flex-row">
									<button
										className="mr-4 mt-2 h-10 rounded-lg bg-red-500 px-6 text-white"
										type="delete"
										disabled={isSubmitting}
									>
										Verwijder
									</button>
									<button
										className="mt-2 h-10 rounded-lg bg-dark-blue px-6 text-white"
										onClick={() => setDeleteModal(false)}
									>
										Annuleer
									</button>
								</div>
							</form>
						)}
					</Formik>
				</div>
			) : (
				<div className="mt-2 rounded-md border border-red-600 bg-slate-200 p-4 ">
					<div>
						<p className="mt-2 text-base">Bij het verwijderen van je account zal alle data ook verwijderd worden.</p>
					</div>
					<button className="mt-4 h-10 rounded-lg bg-red-500 px-6 text-white" onClick={() => setDeleteModal(true)}>
						Verwijder Account
					</button>
				</div>
			)}
		</div>
	);
};

export default DeleteAccount;
