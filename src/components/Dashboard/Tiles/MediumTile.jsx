import React from 'react';

const MediumTile = ({ title, img, url }) => {
	const handleChangeUrl = () => {
		window.api.send('searchURL', url);
	};
	return (
		<button
			onClick={handleChangeUrl}
			className="mb-4 w-60 flex min-w-max items-center justify-start gap-4 rounded-2xl bg-white pr-4 drop-shadow-light transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-hover"
		>
			<img className="h-20 w-20 rounded-2xl bg-gray-50" src={img} alt={`${title}'s favicon`} />
			<h2 className="font-mulish text-base font-medium">{title}</h2>
		</button>
	);
};

export default MediumTile;
