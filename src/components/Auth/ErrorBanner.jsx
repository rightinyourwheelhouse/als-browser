import React from 'react';
import { BiErrorAlt } from 'react-icons/bi';

const ErrorBanner = ({ error }) => {
	return (
		<div className="bg-skin-error mb-4 flex items-center rounded-md py-2 px-4">
			<span className="text-skin-white mr-2 flex items-center justify-center text-lg">
				<BiErrorAlt />
			</span>
			<p className="text-skin-white font-bold">{error}</p>
		</div>
	);
};

export default ErrorBanner;
