import React, { useEffect, useState } from 'react';
import BigTile from './Tiles/BigTile';
import Title from '../Typography/Title';
import Clock from '../Clock';
import Fuse from 'fuse.js';
import { useAuth } from '../../contexts/AuthContextProvider';
import { collection, query, where, getDocs } from "firebase/firestore";

let websiteList = [
	{
		websiteName: 'VRT nieuws',
		website: {
			shortUrl: 'vrt.be/vrtnws/',
			url: 'https://www.vrt.be/vrtnws/',
		},
	},
	{
		websiteName: 'Google',
		website: {
			shortUrl: 'Google.com',
			url: 'https://www.Google.com',
		},
	},
	{
		websiteName: 'Youtube',
		website: {
			shortUrl: 'YouTube.com',
			url: 'https://www.youtube.com',
		},
	},
	{
		websiteName: 'Facebook',
		website: {
			shortUrl: ' Facebook.com',
			url: 'https://www.facebook.com',
		},
	},
	{
		websiteName: 'Wikipedia',
		website: {
			shortUrl: 'Wikipedia.org',
			url: 'https://www.Wikipedia.org',
		},
	},
	{
		websiteName: 'Amazon',
		website: {
			shortUrl: 'Amazon.nl',
			url: 'https://www.Amazon.nl',
		},
	},
	{
		websiteName: 'Reddit',
		website: {
			shortUrl: ' Reddit.com',
			url: 'https://www.reddit.com',
		},
	},
	{
		websiteName: 'Het Laatste Nieuws',
		website: {
			shortUrl: 'HLN.be',
			url: 'https://www.HLN.be',
		},
	},
	{
		websiteName: 'Instagram',
		website: {
			shortUrl: 'Instagram.com',
			url: 'https://Instagram.com',
		},
	},
	{
		websiteName: 'Yahoo',
		website: {
			shortUrl: 'Yahoo.com',
			url: 'https://Yahoo.com',
		},
	},
	{
		websiteName: 'Meteo',
		website: {
			shortUrl: 'meteo.be/',
			url: 'https://www.meteo.be/en/belgium',
		},
	},
	{
		websiteName: 'KMI',
		website: {
			shortUrl: 'meteo.be/',
			url: 'https://www.meteo.be/en/belgium',
		},
	},
	{
		websiteName: 'De Standaard',
		website: {
			shortUrl: 'standaard.be/',
			url: 'https://www.standaard.be/',
		},
	},
	{
		websiteName: 'Het NieuwsBlad',
		website: {
			shortUrl: 'nieuwsblad.be/',
			url: 'https://www.nieuwsblad.be/',
		},
	},
	{
		websiteName: 'Gazet van Antwerpen',
		website: {
			shortUrl: 'gva.be',
			url: 'https://www.gva.be/',
		},
	},
	{
		websiteName: 'Les sports+',
		website: {
			shortUrl: 'dhnet.be/',
			url: 'https://www.dhnet.be/',
		},
	},
	{
		websiteName: 'VTM nieuws',
		website: {
			shortUrl: 'www.hln.be/vtm-nieuws',
			url: 'https://www.hln.be/vtm-nieuws',
		},
	},
	{
		websiteName: 'Het Belang Van limburg',
		website: {
			shortUrl: 'hbvl.be/',
			url: 'https://www.hbvl.be/',
		},
	},
	{
		websiteName: 'De Morgen',
		website: {
			shortUrl: 'demorgen.be',
			url: 'https://www.demorgen.be',
		},
	},
	{
		websiteName: 'De Tijd',
		website: {
			shortUrl: 'tijd.be',
			url: 'https://www.tijd.be/',
		},
	},
	{
		websiteName: 'Krant van West-Vlaanderen',
		website: {
			shortUrl: 'kw.be',
			url: 'https://kw.be/',
		},
	},
	{
		websiteName: 'Metro',
		website: {
			shortUrl: 'metro.be',
			url: 'https://nl.metrotime.be/',
		},
	},
	{
		websiteName: 'Knack',
		website: {
			shortUrl: 'knack.be',
			url: 'https://www.knack.be/',
		},
	},
	{
		websiteName: 'ALS liga Belgie',
		website: {
			shortUrl: 'als.be',
			url: 'https://www.als.be/',
		},
	},
	{
		websiteName: 'Brainjar',
		website: {
			shortUrl: 'brainjar.ai',
			url: 'https://brainjar.ai',
		},
	},
	{
		websiteName: 'Wheelhouse',
		website: {
			shortUrl: 'wheelhouse.be',
			url: 'https://www.wheelhouse.be/',
		},
	},
	{
		websiteName: 'TPO agency',
		website: {
			shortUrl: 'tpoagency.be',
			url: 'https://tpoagency.be/',
		},
	},
	{
		websiteName: 'Raccoons',
		website: {
			shortUrl: 'raccoons.be',
			url: 'https://www.raccoons.be/',
		},
	},
	{
		websiteName: 'Twitter',
		website: {
			shortUrl: 'twitter.com',
			url: 'https://twitter.com/',
		},
	},
	{
		websiteName: 'Telenet',
		website: {
			shortUrl: 'telenet.be/residential/nl',
			url: 'https://www2.telenet.be/residential/nl',
		},
	},
	{
		websiteName: 'Netflix',
		website: {
			shortUrl: 'netflix.com',
			url: 'https://www.netflix.com/',
		},
	},
	{
		websiteName: 'Sudinfo',
		website: {
			shortUrl: 'sudinfo.be',
			url: 'https://www.sudinfo.be/',
		},
	},
	{
		websiteName: 'RTBF',
		website: {
			shortUrl: 'rtbf.be',
			url: 'https://www.rtbf.be/',
		},
	},
	{
		websiteName: 'Bol',
		website: {
			shortUrl: 'bol.com',
			url: 'https://www.bol.com/be/nl/',
		},
	},
	{
		websiteName: 'Sporza',
		website: {
			shortUrl: 'sporza.be',
			url: 'https://sporza.be/nl/',
		},
	},
	{
		websiteName: 'Microsoft Office',
		website: {
			shortUrl: 'office.com',
			url: 'https://www.office.com/',
		},
	},
	{
		websiteName: 'Linkedin',
		website: {
			shortUrl: 'linkedin.com',
			url: 'https://www.linkedin.com/',
		},
	},
	{
		websiteName: '2dehands',
		website: {
			shortUrl: '2dehands.be',
			url: 'https://www.2dehands.be/',
		},
	},
	{
		websiteName: 'Belgium',
		website: {
			shortUrl: 'belgium.be',
			url: 'https://www.belgium.be/nl',
		},
	},
	{
		websiteName: 'Proximus',
		website: {
			shortUrl: 'proximus.be',
			url: 'https://www.proximus.be',
		},
	},
	{
		websiteName: 'Zalando',
		website: {
			shortUrl: 'zalando.be',
			url: 'https://www.zalando.be/',
		},
	},
	{
		websiteName: 'Messenger',
		website: {
			shortUrl: 'messenger.com',
			url: 'https://www.messenger.com/',
		},
	},
	{
		websiteName: 'Booking',
		website: {
			shortUrl: 'booking.com',
			url: 'https://www.booking.com',
		},
	},
];

const options = {
	isCaseSensitive: false,
	// includeScore: true,
	shouldSort: true,
	// includeMatches: false,
	findAllMatches: true,
	minMatchCharLength: 2,
	// location: 0,
	threshold: 0.49,
	// distance: 100,
	// useExtendedSearch: false,
	// ignoreLocation: false,
	// ignoreFieldNorm: false,
	// fieldNormWeight: 1,
	keys: ['websiteName', 'website.shortUrl'],
};

const OnType = ({ params }) => {
	const { user } = useAuth();
	const [suggestions, setSuggestions] = useState([]);

	const fuseSearch = (list, input) => {
		const fuse = new Fuse(list, options);
		const result = fuse.search(input);
		console.log(result);
		setSuggestions(result);
	};

	useEffect(() => {
		const searchInput = params.get('search');

		// Get user data


		fuseSearch(websiteList, searchInput);
	}, [params]);

	return (
		<div>
			<Clock className="mt-8 h-10 text-center" />

			<div className="m-center mt-20 flex w-3/4 flex-col">
				<Title>Zoeken</Title>
				{suggestions.map((suggestion, index) => {
					return (
						<BigTile
							key={index}
							title={suggestion.item.websiteName}
							img="https://i.imgur.com/bPfHmNc.png"
							description="Schrijf u hier in op onze VRT Nieuwsbrief op maat, zo wordt u maandelijks op de hoogte gehouden van het
				belangrijkste nieuws over de VRT. Deze nieuwsbrief is ..."
							url={suggestion.item.website.shortUrl}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default OnType;
