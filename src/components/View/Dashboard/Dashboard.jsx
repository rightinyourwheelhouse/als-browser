import React from 'react';
import ReactDOM from 'react-dom';
import SmallTile from './Tiles/SmallTile';
import MediumTile from './Tiles/MediumTile';
import { PlusIcon } from '@heroicons/react/outline';

const Dashboard = () => {
	function getDateTime() {
		const options = {
			weekday: 'long',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
		};
		const currentDate = new Date().toLocaleDateString('nl-BE', options);
		const element = <p className="text-center font-light">{currentDate}</p>;

		if (document.getElementById('clock')) {
			ReactDOM.render(element, document.getElementById('clock'));
		}
	}

	setInterval(getDateTime, 1000);

	return (
		<div className="select-none">
			<div className="mt-4 h-10" id="clock"></div>
			<div className="absolute right-8 top-28 flex flex-col items-center justify-center gap-2 drop-shadow-light transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-hover">
				<img className="h-14 w-14 rounded-full" src="https://i.imgur.com/jcuurYi.png" alt="" />
				<h2 className="font-light">Instellingen</h2>
			</div>
			<div className="m-center mt-20 w-3/4">
				<h1 className="font-mulish text-3xl font-bold">Suggesties</h1>
				<div className="mt-6 flex flex-row gap-8">
					<MediumTile title="Het Nieuwsblad" img="https://i.imgur.com/a2jzYU6.png" />
					<MediumTile title="Het Nieuwsblad" img="https://i.imgur.com/a2jzYU6.png" />
					<MediumTile title="Het Nieuwsblad" img="https://i.imgur.com/a2jzYU6.png" />
				</div>
			</div>

			<div className="m-center mt-20 w-3/4">
				<h1 className="font-mulish text-3xl font-bold">Meest bezocht</h1>
				<div className="mt-6 flex flex-wrap gap-20">
					<SmallTile title="Het Nieuwsblad" img="https://i.imgur.com/a2jzYU6.png" />
					<SmallTile title="Het Nieuwsblad" img="https://i.imgur.com/a2jzYU6.png" />
					<SmallTile title="Het Nieuwsblad" img="https://i.imgur.com/a2jzYU6.png" />
					<SmallTile title="Het Nieuwsblad" img="https://i.imgur.com/a2jzYU6.png" />
					<SmallTile title="Het Nieuwsblad" img="https://i.imgur.com/a2jzYU6.png" />
					<SmallTile title="Het Nieuwsblad" img="https://i.imgur.com/a2jzYU6.png" />

					<div className="flex flex-col items-center justify-center gap-2 drop-shadow-light transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-hover">
						<div className="drop-shadow-browser flex h-20 w-20  items-center justify-center rounded-2xl bg-white">
							<PlusIcon className="h-10 w-10" />
						</div>
						<h2 className="font-mulish text-base font-medium">Toevoegen</h2>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
