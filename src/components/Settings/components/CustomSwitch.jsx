import React, { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';

const CustomSwitch = ({ title, name, state, handleOnChange }) => {
	const [enabled, setEnabled] = useState(false);

	useEffect(() => {
		// Update the state when changes are happening
		setEnabled(state);
	}, [state]);

	const handleChange = async () => {
		setEnabled(!enabled);
		handleOnChange(name, !enabled);
	};

	return (
		<Switch.Group>
			<Switch.Label className="text-lg font-bold">{title}</Switch.Label>

			<Switch
				checked={enabled}
				onChange={handleChange}
				className={`${enabled ? 'bg-dark-blue' : 'bg-dark-blue opacity-20'}
          relative inline-flex h-[38px] w-[74px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
			>
				<span
					aria-hidden="true"
					className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
				/>
			</Switch>
		</Switch.Group>
	);
};

export default CustomSwitch;
