import React from 'react';
import classNames from 'classnames';

const Button = ({ children, onClick, type, className = '' }) => {
	const btnClass = classNames(
		'flex px-2 items-center justify-center text-base p-1 transition-all rounded-md text-skin-white whitespace-nowrap h-10 bg-skin-dark hover:bg-skin-medium hover:text-skin-dark',
		className,
    {
      "bg-skin-error hover:text-skin-error": type === 'delete',
    },
	);

	return (
		<button className={btnClass} onClick={onClick}>
			<span className="text-base font-bold">{children}</span>
		</button>
	);
};

export default Button;
