import React from 'react';
import classNames from 'classnames';

const Button = ({ children, onClick, disabled, type, className = '' }) => {
	const btnClass = classNames('button', className, {
		'button-disabled': disabled,
		'button-delete': type === 'delete',
	});

	return (
		<button className={btnClass} onClick={onClick}>
			<span className="text-base font-bold">{children}</span>
		</button>
	);
};

export default Button;
