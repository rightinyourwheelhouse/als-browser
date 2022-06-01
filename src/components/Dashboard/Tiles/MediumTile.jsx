import React from 'react';
import TileImage from './TileImage';

const MediumTile = ({ title, img, url }) => {
	const handleChangeUrl = () => {
		window.api.send('searchURL', url);
	};
	return (
		<button
			onClick={handleChangeUrl}
			className="w-90 flex h-20 items-center justify-start gap-2 rounded-2xl bg-white pr-4 drop-shadow-light transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-hover"
		>
			<div className="ml-4">
				<TileImage size="h-12 w-12" src={img} title={title} alt={`${title}'s favicon`} />
			</div>

			<h2 className="font-mulish text-base font-medium">
				{title.length >= 24 ? `${title.substring(0, 24)} ...` : title}
			</h2>
		</button>
	);
};

export default MediumTile;
