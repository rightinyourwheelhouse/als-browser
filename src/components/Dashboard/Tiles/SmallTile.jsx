import React from 'react';

const SmallTile = ({ title, img, url }) => {
	const handleChangeUrl = () => {
		window.api.send('searchURL', url);
	};

	return (
		<button
			onClick={handleChangeUrl}
			className="mx-4 mb-8 flex w-32 flex-col items-center justify-center gap-2 drop-shadow-light transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-hover"
		>
			<div className="drop-shadow-browser flex h-20 w-20  items-center justify-center rounded-2xl bg-white">
				<img className="h-14 w-14 bg-white p-2" src={img} alt="" />
			</div>

			<h2 className=" w-32 truncate font-mulish text-base font-medium">{title}</h2>
		</button>
	);
};

export default SmallTile;
