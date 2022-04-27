import React from 'react';

const MediumTile = ({ title, img, url }) => {
	const handleChangeUrl = () => {
		window.api.send('changeURL', url);
	};
	return (
		<button
			onClick={handleChangeUrl}
			className="flex h-20 w-64 items-center justify-start gap-4 rounded-2xl bg-white drop-shadow-light transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-hover"
		>
			<img className="h-20 w-20 rounded-2xl bg-gray-50" src={img} alt="" />
			<h2 className="font-mulish text-base font-medium">{title}</h2>
		</button>
	);
};

export default MediumTile;
