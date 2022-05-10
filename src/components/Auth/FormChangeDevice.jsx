import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Field } from 'formik';
import { doc, updateDoc } from 'firebase/firestore';

import ErrorBanner from './ErrorBanner';
import ErrorHandling from '../../utils/ErrorHandeling';
import { db } from '../../utils/FirebaseConfig';
import ListBoxSelect from '../ListBoxSelect';

import DeviceData from '../../data/DeviceData.json';
import TextInputGroup from '../TextInputGroup';

const FormChangeDevice = ({
	user,
	setToast,
	device,
	deviceSpecification,
	hasDeviceSpecification,
	setHasDeviceSpecification,
}) => {
	const validationSwitch = () => {
		if (hasDeviceSpecification) {
			return Yup.object().shape({
				device_specification: Yup.string().required('Dit veld is verplicht'),
			});
		} else {
			return Yup.object().shape({
				device: Yup.string().required('Dit veld is verplicht'),
			});
		}
	};

	const [error, setError] = useState('');
	const userDoc = doc(db, 'users', user.uid);

	const handleSubmit = async (values, { setSubmitting }) => {
		try {
			setToast(false);
			setError('');
			setSubmitting(true);

			const docData = {
				device: values.device,
				deviceSpecification: '',
			};
			updateDoc(userDoc, docData);

			if (hasDeviceSpecification) {
				const deviceSpecificationData = {
					device: 'Andere',
					deviceSpecification: values.device_specification,
				};
				updateDoc(userDoc, deviceSpecificationData);
			} else if (!hasDeviceSpecification) {
				const deviceSpecificationData = {
					deviceSpecification: '',
				};
				updateDoc(userDoc, deviceSpecificationData);
			}

			setToast(true);
			setTimeout(() => {
				setToast(false);
			}, 5000);
			setSubmitting(false);
		} catch (error) {
			const errorHandling = ErrorHandling(error);
			setError(errorHandling);
		}
	};

	return (
		<div className="mt-6">
			<div>
				<h3 className="mb-2 text-lg font-bold">Apparaat bijwerken</h3>

				<Formik
					initialValues={{
						device: device === 'Andere' ? '' : device,
						other_device: hasDeviceSpecification,
						device_specification: deviceSpecification || '',
					}}
					validationSchema={validationSwitch}
					onSubmit={handleSubmit}
					enableReinitialize={true}
				>
					{({ handleSubmit, isSubmitting }) => (
						<form onSubmit={handleSubmit} className="w-full rounded-md bg-slate-200 p-4">
							{error && <ErrorBanner error={error} />}

							{!hasDeviceSpecification && (
								<div className="mt-4 mb-8">
									<Field
										type="select"
										as={ListBoxSelect}
										name="device"
										label="Selecteer een apparaat"
										options={DeviceData}
									/>
								</div>
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
										id="other_device"
										className="h-5 w-5"
										checked={hasDeviceSpecification}
										type="checkbox"
										name="other_device"
										onChange={() => {
											setHasDeviceSpecification(!hasDeviceSpecification);
										}}
									/>
									<label htmlFor="other_device" className="select-none text-sm font-medium">
										Ik heb een ander apparaat
									</label>
								</div>
							</div>

							<button className="mt-2 h-10 rounded-lg bg-dark-blue px-6 text-white" disabled={isSubmitting}>
								Bijwerking opslaan
							</button>
						</form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default FormChangeDevice;
