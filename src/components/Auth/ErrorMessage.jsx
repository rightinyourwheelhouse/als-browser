import React from 'react';
import { BiErrorAlt } from 'react-icons/bi';

const ErrorMessage = ({ errorText }) => {
	return (
		<div className="mt-2 flex items-center">
			<span className="mr-2 flex items-center justify-center text-red-600">
				<BiErrorAlt />
			</span>
			<span className="text-sm font-semibold text-red-600">{errorText}</span>
		</div>
	);
};

export default ErrorMessage;
