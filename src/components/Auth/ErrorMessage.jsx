import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/outline';


const ErrorMessage = ({ errorText }) => {
	return (
		<div className="mt-2 flex items-center">
			<span className="mr-2 flex items-center justify-center text-red-600">
				<ExclamationCircleIcon className='h-4 w-4' />
			</span>
			<span className="text-sm font-semibold text-red-600">{errorText}</span>
		</div>
	);
};

export default ErrorMessage;
