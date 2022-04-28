import React, { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../utils/FirebaseConfig';

const CustomSwitch = ({ state }) => {
	const [enabled, setEnabled] = useState(false);

	useEffect(() => {
		setEnabled(state);
	}, [state]);

	const handleChange = () => {
		setEnabled(!enabled);
	};

	return (
		<>
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
		</>
	);
};

export default CustomSwitch;
