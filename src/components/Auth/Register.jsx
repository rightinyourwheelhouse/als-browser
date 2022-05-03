import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Field } from 'formik';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, Timestamp } from 'firebase/firestore';

import { useAuth } from '../../contexts/AuthContextProvider';
import TextInputGroup from '../TextInputGroup';
import { db } from '../../utils/FirebaseConfig';
import ErrorHandling from '../../utils/ErrorHandeling';
import ErrorBanner from './ErrorBanner';
import CheckboxInputGroup from '../CheckboxInputGroup';
import ListBoxSelect from '../ListBoxSelect';

import DeviceData from '../../data/DeviceData.json';

Yup.setLocale({
	mixed: {
		required: 'Dit veld is verplicht.',
	},
	string: {
		email: 'Dit moet een geldig emailadres zijn.',
		min: 'Het wachtwoord moet minimaal 6 tekens zijn.',
	},
});

const Register = ({ setLoginActive }) => {
	const [hasDeviceSpecification, setHasDeviceSpecification] = useState(false);
	const [error, setError] = useState('');
	const { auth } = useAuth();

	const validationSwitch = () => {
		if (hasDeviceSpecification) {
			return Yup.object().shape({
				email: Yup.string().required().email().label('Email'),
				password: Yup.string().required().min(6).label('Password'),
				passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Wachtwoorden moeten overeenkomen'),
				device_specification: Yup.string().required('Dit veld is verplicht'),
				acceptTerms: Yup.bool().oneOf([true], 'Accepteer de voorwaarden'),
			});
		} else {
			return Yup.object().shape({
				email: Yup.string().required().email().label('Email'),
				password: Yup.string().required().min(6).label('Password'),
				passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Wachtwoorden moeten overeenkomen'),
				device: Yup.string().required('Selecteer een apparaat.'),
				acceptTerms: Yup.bool().oneOf([true], 'Accepteer de voorwaarden'),
			});
		}
	};

	const handleSubmit = async (values, { setSubmitting }) => {
		try {
			setSubmitting(true);
			await createUserWithEmailAndPassword(auth, values.email, values.password);

			// Signed in
			const user = auth.currentUser;

			// Create user ID in Firestore

			if (!hasDeviceSpecification) {
				const docData = {
					createdAt: Timestamp.fromDate(new Date()),
					scrollSpeed: 10,
					lastLogin: Timestamp.fromDate(new Date()),
					device: values.device,
				};
				await setDoc(doc(db, 'users', user.uid), docData);
			} else if (hasDeviceSpecification) {
				const docData = {
					createdAt: Timestamp.fromDate(new Date()),
					scrollSpeed: 10,
					lastLogin: Timestamp.fromDate(new Date()),
					device: 'Andere',
					deviceSpecification: values.device_specification,
				};
				await setDoc(doc(db, 'users', user.uid), docData);
			}
		} catch (error) {
			const errorHandling = ErrorHandling(error);
			setError(errorHandling);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className=" absolute top-0 left-0 flex h-screen w-screen items-center justify-center">
			<div className="bg-skin-white flex h-auto max-w-md flex-col items-center justify-center rounded-sm p-10">
				<Formik
					initialValues={{
						email: '',
						password: '',
						passwordConfirmation: '',
						device: '',
						device_specification: '',
						acceptTerms: false,
					}}
					validationSchema={validationSwitch}
					onSubmit={handleSubmit}
				>
					{({ handleSubmit, isSubmitting }) => (
						<form onSubmit={handleSubmit} className="my-0 mx-auto flex flex-col ">
							<h1 className="h1 mb-4">Registreren</h1>

							{error && <ErrorBanner error={error} />}
							<div className="mb-4">
								<Field type="input" as={TextInputGroup} name="email" placeholder="E-mail" label="E-mailadres" />
								<Field type="password" as={TextInputGroup} name="password" placeholder="Password" label="Wachtwoord" />

								<Field
									type="password"
									as={TextInputGroup}
									name="passwordConfirmation"
									placeholder="Herhaal Password"
									label="Herhaal passwoord"
								/>

								{!hasDeviceSpecification && (
									<Field
										type="select"
										as={ListBoxSelect}
										name="device"
										label="Selecteer een apparaat"
										options={DeviceData}
									/>
								)}

								{hasDeviceSpecification && (
									<div className="mt-4 mb-8">
										<Field
											type="text"
											name="device_specification"
											label="Ander apparaat invullen"
											placeholder="Ander apparaat"
											as={TextInputGroup}
										/>
									</div>
								)}

								<div className="mt-4 mb-8">
									<div className="flex flex-row items-center gap-2">
										<input
											className="h-5 w-5"
											checked={hasDeviceSpecification}
											type="checkbox"
											name="other_device"
											id="other_device"
											onChange={() => {
												setHasDeviceSpecification(!hasDeviceSpecification);
											}}
										/>
										<label htmlFor="other_device" className="select-none text-sm font-medium">
											Ik heb een ander apparaat
										</label>
									</div>
								</div>

								<Field
									type="checkbox"
									as={CheckboxInputGroup}
									name="acceptTerms"
									label="Ik accepteer de algemene voorwaarden"
								/>
							</div>

							<button disabled={isSubmitting}>Registreren</button>
						</form>
					)}
				</Formik>

				<div className="mt-5">
					<p className="text-skin-dark">
						Heeft u al een account?{' '}
						<button className="text-dark-blue underline" onClick={() => setLoginActive(true)}>
							Login
						</button>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;
