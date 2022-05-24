import React from 'react';

const MediumTile = ({ title, img, url }) => {
	const handleChangeUrl = () => {
		window.api.send('searchURL', url);
	};
	return (
		<button
			onClick={handleChangeUrl}
			className="mb-4 flex h-20 w-60 min-w-max items-center justify-start gap-4 rounded-2xl bg-white pr-4 drop-shadow-light transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-hover"
		>
			<img className="ml-4 h-12 w-12 bg-gray-50" src={img} alt={`${title}'s favicon`} />
			<h2 className="font-mulish text-base font-medium">
			
				{title.length >= 24 ? `${title.substring(0, 24)} ...` : title}
			</h2>
		</button>
	);
};

export default MediumTile;
