import React from 'react';

const SmallTile = ({ title, img }) => {
	return (
		<div className="flex flex-col items-center justify-center gap-2 drop-shadow-light transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-hover">
			<div className="drop-shadow-browser flex h-20 w-20  items-center justify-center rounded-2xl bg-white">
				<img className="h-14 w-14 bg-white p-2" src={img} alt="" />
			</div>

			<h2 className="font-mulish text-base font-medium">{title}</h2>
		</div>
	);
};

export default SmallTile;
