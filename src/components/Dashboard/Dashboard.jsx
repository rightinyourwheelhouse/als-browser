import React, { useEffect } from 'react';
import SmallTile from './Tiles/SmallTile';
import MediumTile from './Tiles/MediumTile';
import Title from '../Typography/Title';
import OnType from './OnType';
import Clock from '../Clock';

import { useNavigate, useLocation } from 'react-router-dom';

import { PlusIcon } from '@heroicons/react/outline';

const Dashboard = () => {
	const navigate = useNavigate();
	const location = useLocation();

	let params = new URLSearchParams(location.search);

	const handleSettings = () => {
		navigate('/settings/feedback');
	};

	useEffect(() => {
		window.api.recieve('update_available', () => {
			console.log('A new update is available. Downloading now...');
		});
		window.api.recieve('update_downloaded', () => {
			console.log('Update Downloaded. It will be installed on restart. Restart now?');
		});
	});

	const restartApp = () => {
		window.api.send('restart_app');
	};

	return !params.get('search') ? (
		<div className="select-none">
			<div className="m-center">
				<p className="text-center">Version 1.0.0</p>
				<button onClick={restartApp}>Restart app</button>
			</div>

			<Clock />
			<button
				onClick={handleSettings}
				className="absolute right-8 top-28 flex flex-col items-center justify-center gap-2 drop-shadow-light transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-hover"
			>
				<img className="h-14 w-14 rounded-full" src="https://i.imgur.com/jcuurYi.png" alt="" />
				<h2 className="font-light">Instellingen</h2>
			</button>
			<div className="m-center mt-20 w-3/4">
				<Title>Suggesties</Title>
				<div className="mt-6 flex cursor-pointer flex-row gap-10">
					<MediumTile title="Het Nieuwsblad" img="https://i.imgur.com/a2jzYU6.png" url="www.nieuwsblad.be" />
					<MediumTile title="Het Nieuwsblad" img="https://i.imgur.com/a2jzYU6.png" url="www.nieuwsblad.be" />
					<MediumTile title="Het Nieuwsblad" img="https://i.imgur.com/a2jzYU6.png" url="www.nieuwsblad.be" />
				</div>
			</div>
			<div className="m-center mt-20 w-3/4">
				<Title>Meest bezocht</Title>
				<div className="mt-6 flex cursor-pointer flex-row gap-10">
					<SmallTile title="Het Nieuwsblad" img="https://i.imgur.com/a2jzYU6.png" url="www.nieuwsblad.be" />
					<SmallTile title="Het Nieuwsblad" img="https://i.imgur.com/a2jzYU6.png" url="www.nieuwsblad.be" />
					<SmallTile title="Het Nieuwsblad" img="https://i.imgur.com/a2jzYU6.png" url="www.nieuwsblad.be" />
					<SmallTile title="Het Nieuwsblad" img="https://i.imgur.com/a2jzYU6.png" url="www.nieuwsblad.be" />
					<SmallTile title="Het Nieuwsblad" img="https://i.imgur.com/a2jzYU6.png" url="www.nieuwsblad.be" />
					<SmallTile title="Het Nieuwsblad" img="https://i.imgur.com/a2jzYU6.png" url="www.nieuwsblad.be" />

					<button className="flex flex-col items-center justify-center gap-2 drop-shadow-light transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-hover">
						<div className="drop-shadow-browser flex h-20 w-20  items-center justify-center rounded-2xl bg-white">
							<PlusIcon className="h-10 w-10" />
						</div>
						<h2 className="font-mulish text-base font-medium">Toevoegen</h2>
					</button>
				</div>
			</div>
		</div>
	) : (
		<OnType />
	);
};

export default Dashboard;
