import { useField } from 'formik';
import React, { useState } from 'react';

import ErrorMessage from '../components/Auth/ErrorMessage';

const ListBoxSelect = ({ label, name, value = '', type, onChange, onBlur, options }) => {
	const [currentValue, setCurrentValue] = useState(value);
	const [field, meta] = useField({
		type,
		name,
		value,
		onChange,
		onBlur,
		options,
	});
	const errorText = meta.error && meta.touched ? meta.error : '';

	return (
		<div className="mb-4">
			<label htmlFor={name} className="text-base font-bold">
				{label}
			</label>

			<select
				{...field}
				className={`${errorText ? 'border-skin-error border-2' : 'border-0'} select-input`}
				type={type}
				name={name}
				value={currentValue}
				onChange={(e) => {
					if (onChange) onChange(e);
					setCurrentValue(e.currentTarget.value);
				}}
				onBlur={onBlur}
			>
				{options.map((item) => (
					<option
						hidden={item.hidden}
						key={item.id}
						value={item.value}
						className="text-skin-darker my-1 text-sm font-semibold"
					>
						{item.label}
					</option>
				))}
			</select>

			{errorText && <ErrorMessage errorText={errorText} />}
		</div>
	);
};

export default ListBoxSelect;
