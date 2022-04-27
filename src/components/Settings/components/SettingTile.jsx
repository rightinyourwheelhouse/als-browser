import React from 'react';

const SettingTile = ({ children }) => {
	return (
		<>
			<div className="min-h-content my-5 flex w-96 select-none flex-col rounded-lg  bg-white py-5 drop-shadow-light ">
				<div className="m-center flex w-11/12 items-center justify-between">{children}</div>
			</div>
		</>
	);
};

export default SettingTile;
