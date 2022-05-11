import React from 'react';

const SettingTile = ({ children, infoText, disabled }) => {
	return (
		<div className="w-92 mt-4 flex items-start gap-6">
			<div
				className={`${
					disabled ? 'blur-xs' : ''
				} min-h-content mb-4 flex w-96 select-none flex-col rounded-lg bg-white py-5 drop-shadow-light `}
			>
				<div className="m-center flex w-11/12 items-center justify-between">{children}</div>
			</div>
			<p className="max-w-[22rem] text-base font-light">
				{disabled ? 'Log in om deze functie te gebruiken' : infoText}
			</p>
		</div>
	);
};

export default SettingTile;
