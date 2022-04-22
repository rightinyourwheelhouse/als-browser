import React from 'react';

const RecentSearchTile = ({ title, img, url }) => {
	return (
		<button className="my-2 flex  h-14 w-full cursor-pointer items-center gap-6 rounded-full bg-white drop-shadow-light transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-hover">
			<div className="ml-6 flex items-center gap-4">
				<input className="h-5 w-5" type="checkbox" />
				<p>9:05</p>
			</div>

			<div className="flex items-center gap-2">
				<img className="h-8 w-8" src={img} alt="" />
				<p>{title}</p>
				<p>{url}</p>
			</div>
		</button>
	);
};

export default RecentSearchTile;
