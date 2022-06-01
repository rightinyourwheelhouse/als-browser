import { useField } from 'formik';
import React from 'react';
import ErrorMessage from '../components/Auth/ErrorMessage';

const CheckboxInputGroup = ({ label, name, value, type, onChange, checked }) => {
	const [field, meta] = useField({
		type,
		name,
		value,
		onChange,
		checked,
	});

	const errorText = meta.error && meta.touched ? meta.error : '';
	return (
		<>
			<div className="mb-4">
				<div className="flex flex-row items-center gap-2">
					<input id={name} className="h-5 w-5" {...field} type={type} name={name} checked={value} />
					<label htmlFor={name} className="select-none text-sm font-medium">
						{label}
					</label>
				</div>

				{errorText && <ErrorMessage errorText={errorText} />}
			</div>
		</>
	);
};

export default CheckboxInputGroup;
