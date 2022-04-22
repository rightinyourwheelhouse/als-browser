import React from 'react';
import RecentSearchTile from './Tiles/RecentSearchTile';
import SmallTile from './Tiles/SmallTile';

const OnFocus = () => {
	return (
		<div>
			<div className="m-center mt-20 w-3/4">
				<h1 className="font-mulish text-3xl font-bold">Suggesties</h1>
				<div className="mt-6 flex flex-row gap-8">
					<SmallTile title="Het Nieuwsblad" img="https://i.imgur.com/a2jzYU6.png" />
					<SmallTile title="Het Nieuwsblad" img="https://i.imgur.com/a2jzYU6.png" />
					<SmallTile title="Het Nieuwsblad" img="https://i.imgur.com/a2jzYU6.png" />
				</div>
			</div>

			<div className="m-center mt-20 w-3/4">
				<h1 className="font-mulish text-3xl font-bold">Recente zoekopdrachten</h1>
				<h2 className="mt-1 font-mulish text-lg font-medium">Vandaag - vrijdag 8 april, 2022</h2>

				<RecentSearchTile title="VRT" img="https://i.imgur.com/bPfHmNc.png" url="www.vrt.be" />

				<h2 className="mt-6 font-mulish text-lg font-medium">Gisteren - donderdag 7 april, 2022</h2>

				<RecentSearchTile title="VRT" img="https://i.imgur.com/bPfHmNc.png" url="www.vrt.be" />
				<RecentSearchTile title="VRT" img="https://i.imgur.com/bPfHmNc.png" url="www.vrt.be" />
			</div>
		</div>
	);
};

export default OnFocus;
