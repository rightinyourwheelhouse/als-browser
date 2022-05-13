import { useField } from 'formik';
import React, { useState } from 'react';
import ErrorMessage from './Auth/ErrorMessage';

const TextInputGroup = ({
	label,
	name,
	value = '',
	placeholder,
	type,
	onChange,
	onBlur,
	textColor = 'text-slate-800',
}) => {
	const [currentValue, setCurrentValue] = useState(value);
	const [field, meta] = useField({
		type,
		name,
		value,
		placeholder,
		onChange,
		onBlur,
	});
	const errorText = meta.error && meta.touched ? meta.error : '';
	return (
		<div className="mb-4">
			<label htmlFor={name} className={`mb-2 block text-base font-bold ${textColor}`}>
				{label}
			</label>

			<input
				{...field}
				className={`${
					errorText ? ' border-red-600' : 'border-gray-500'
				}   focus:ring-skin-accent h-10 w-full max-w-lg rounded-md border-2 py-2.5 px-4 text-base placeholder:text-sm hover:border hover:border-dark-blue hover:shadow-[0px_0px_0px_4px_#4c7bea4c] hover:transition-all focus:outline-none focus:ring-2 focus:ring-offset-2`}
				type={type}
				name={name}
				placeholder={placeholder}
				value={currentValue}
				onChange={(e) => {
					if (onChange) onChange(e);
					setCurrentValue(e.currentTarget.value);
				}}
				onBlur={onBlur}
				autoComplete="off"
			/>

			{errorText && <ErrorMessage errorText={errorText} />}
		</div>
	);
};

export default TextInputGroup;
