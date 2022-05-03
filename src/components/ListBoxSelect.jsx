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
				className={`${
					errorText ? 'border-2 border-red-600' : 'border-0'
				} focus:ring-skin-accent placeholder:text-md mt-2 mb-4 h-10 w-full rounded-md border-2 py-0 px-4 text-sm font-medium hover:border hover:border-dark-blue hover:shadow-[0px_0px_0px_4px_#4c7bea4c] hover:transition-all focus:outline-none focus:ring-2 focus:ring-offset-2`}
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
					<option hidden={item.hidden} key={item.id} value={item.value} className=" my-1 text-sm font-semibold">
						{item.label}
					</option>
				))}
			</select>

			{errorText && <ErrorMessage errorText={errorText} />}
		</div>
	);
};

export default ListBoxSelect;
