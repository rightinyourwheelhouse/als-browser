import React from 'react';

const SettingTile = ({ children, infoText }) => {
	return (
		<>
			<div className="mt-4 flex w-92 items-start gap-6">
				<div className="min-h-content mb-4flex w-96 select-none flex-col rounded-lg bg-white py-5 drop-shadow-light ">
					<div className="m-center flex w-11/12 items-center justify-between">{children}</div>
				</div>
				<p className="max-w-[22rem] text-base font-light">{infoText}</p>
			</div>
		</>
	);
};

export default SettingTile;
