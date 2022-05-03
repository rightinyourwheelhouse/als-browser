import React from 'react';
import { BiErrorAlt } from 'react-icons/bi';

const ErrorMessage = ({ errorText }) => {
	return (
		<div className="mt-2 flex items-center">
			<span className="text-skin-error mr-2 flex items-center justify-center">
				<BiErrorAlt />
			</span>
			<span className="text-skin-error text-xs font-semibold">{errorText}</span>
		</div>
	);
};

export default ErrorMessage;
