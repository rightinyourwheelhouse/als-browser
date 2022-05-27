import React from 'react';

const ToolbarIcon = ({ children, onClick, onMouseEnter, onMouseLeave }) => {
	return (
		<button
			onClick={onClick}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			className="group flex h-14 w-14  items-center justify-center rounded-full bg-white drop-shadow-light transition duration-300 ease-in-out hover:bg-dark-gray"
		>
			<span className="flex h-9 w-9 items-center justify-center group-hover:text-white">{children}</span>
		</button>
	);
};

export default ToolbarIcon;
