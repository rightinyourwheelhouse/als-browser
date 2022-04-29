import { useField } from 'formik';
import React, { useState } from 'react';

const TextInputGroup = ({ label, name, value = '', placeholder, type, onChange, onBlur }) => {
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
			<label htmlFor={name} className="text-base font-bold">
				{label}
			</label>

			<input
				{...field}
				className={`${errorText ? 'border-skin-error border-2' : 'border-0'} text-input ml-6`}
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
		</div>
	);
};

export default TextInputGroup;
