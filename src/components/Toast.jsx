import React from 'react';

const Toast = ({ message, setToast }) => {
	return (
		<div
			className="w absolute top-24 right-10 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700 duration-300 ease-in-out"
			role="alert"
		>
			<strong className="mr-4 font-bold">Success</strong>
			<span className="mr-10 block sm:inline">{message}</span>
			<button
				onClick={() => setToast(false)}
				className="absolute top-0 bottom-0 right-0 flex items-center justify-center border-none px-4 py-3"
			>
				<div className="h-px w-6 translate-x-6 rotate-45 rounded border border-green-800 bg-green-800"></div>
				<div className="h-px w-6 -rotate-45 rounded border border-green-800 bg-green-800"></div>
			</button>
		</div>
	);
};

export default Toast;
