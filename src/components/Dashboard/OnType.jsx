import React from 'react';
import BigTile from './Tiles/BigTile';
import Title from '../Typography/Title';

const OnType = () => {
	return (
		<div>
			<div className="m-center mt-20 w-3/4">
				<Title>Zoeken</Title>
				<BigTile
					title="VRT.be: Home"
					img="https://i.imgur.com/bPfHmNc.png"
					description="Schrijf u hier in op onze VRT Nieuwsbrief op maat, zo wordt u maandelijks op de hoogte gehouden van het
				belangrijkste nieuws over de VRT. Deze nieuwsbrief is ..."
					url="www.vrt.be"
				/>
				<BigTile
					title="VRT.be: Home"
					img="https://i.imgur.com/bPfHmNc.png"
					description="Schrijf u hier in op onze VRT Nieuwsbrief op maat, zo wordt u maandelijks op de hoogte gehouden van het
				belangrijkste nieuws over de VRT. Deze nieuwsbrief is ..."
					url="www.vrt.be"
				/>
			</div>
		</div>
	);
};

export default OnType;
