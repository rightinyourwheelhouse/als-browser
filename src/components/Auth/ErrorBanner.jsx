import React from 'react';
import { BiErrorAlt } from 'react-icons/bi';

const ErrorBanner = ({ error }) => {
	return (
		<div className="mb-4 flex items-center rounded-md bg-red-500 py-2 px-4">
			<span className="mr-2 flex items-center justify-center text-lg text-white">
				<BiErrorAlt />
			</span>
			<p className="font-bold text-white">{error}</p>
		</div>
	);
};

export default ErrorBanner;
