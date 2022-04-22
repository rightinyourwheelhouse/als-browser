import React from 'react';

const ToolbarIcon = ({ children, onClick }) => {
	return (
		<div
			onClick={onClick}
			className="group flex h-14 w-14  items-center justify-center rounded-full bg-white drop-shadow-light transition duration-300 ease-in-out hover:bg-dark-gray"
		>
			<span className="h-9 w-9 group-hover:text-white">{children}</span>
		</div>
	);
};

export default ToolbarIcon;
