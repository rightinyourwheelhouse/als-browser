import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/outline';

const ErrorBanner = ({ error }) => {
	return (
		<div className="mb-4 flex items-center rounded-md bg-red-500 py-2 px-4">
			<span className="mr-2 flex items-center justify-center text-lg text-white">
				<ExclamationCircleIcon className="h-6 w-6" />
			</span>
			<p className="font-bold text-white">{error}</p>
		</div>
	);
};

export default ErrorBanner;
