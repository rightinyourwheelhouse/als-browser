import React from 'react';
import { Switch } from '@headlessui/react';

const CustomSwitch = ({ title, name, state, handleOnChange, disabled }) => {
	const handleChange = async (checked) => {
		handleOnChange(name, checked);
	};

	return (
		<Switch.Group>
			<Switch.Label className="text-lg font-bold">{title}</Switch.Label>

			<Switch
				checked={state}
				onChange={handleChange}
				disabled={disabled}
				className={`${state ? 'bg-dark-blue' : 'bg-dark-blue opacity-20'} ${disabled ? 'opacity-4 cursor-default' : ''}
          relative inline-flex h-[38px] w-[74px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
			>
				<span
					aria-hidden="true"
					className={`${state ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
				/>
			</Switch>
		</Switch.Group>
	);
};

export default CustomSwitch;
