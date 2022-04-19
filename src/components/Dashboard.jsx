import React from 'react';
import ReactDOM from 'react-dom';
// import styles from './dashboard.module.css';

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
		const element = <p className="text-center mt-6 font-light">{currentDate}</p>;

		ReactDOM.render(element, document.getElementById('clock'));
	}

	setInterval(getDateTime, 1000);

	return (
		<div className="select-none">
			<div id="clock"></div>
			<div className="flex flex-col gap-2 justify-center items-center absolute right-8 top-28 drop-shadow-light hover:scale-105 transition duration-300 ease-in-out hover:drop-shadow-hover;">
				<img className="w-14 h-14 rounded-full" src="https://i.imgur.com/jcuurYi.png" alt="" />
				<h2 className="font-light">Instellingen</h2>
			</div>
			<div className="w-3/4 mt-20 m-center">
				<h1 className="font-mulish text-3xl font-bold">Suggesties</h1>
				<div className="flex flex-row gap-8 mt-6">
					<div className="w-64 h-20 bg-white drop-shadow-browser rounded-2xl flex justify-start items-center gap-4  hover:scale-105 transition duration-300 ease-in-out hover:drop-shadow-hover;">
						<img className="w-20 h-20 bg-gray-50 rounded-2xl" src="https://i.imgur.com/a2jzYU6.png" alt="" />
						<h2 className="font-mulish text-base font-medium">Het Nieuwsblad</h2>
					</div>
					<div className="w-64 h-20 bg-white drop-shadow-browser rounded-2xl flex justify-start items-center gap-4  hover:scale-105 transition duration-300 ease-in-out hover:drop-shadow-hover;">
						<img className="w-20 h-20 bg-gray-50 rounded-2xl" src="https://i.imgur.com/a2jzYU6.png" alt="" />
						<h2 className="font-mulish text-base font-medium">Het Nieuwsblad</h2>
					</div>
					<div className="w-64 h-20 bg-white drop-shadow-browser rounded-2xl flex justify-start items-center gap-4  hover:scale-105 transition duration-300 ease-in-out hover:drop-shadow-hover;">
						<img className="w-20 h-20 bg-gray-50 rounded-2xl" src="https://i.imgur.com/a2jzYU6.png" alt="" />
						<h2 className="font-mulish text-base font-medium">Het Nieuwsblad</h2>
					</div>
				</div>
			</div>

			<div className="w-3/4 mt-20 m-center">
				<h1 className="font-mulish text-3xl font-bold">Meest bezocht</h1>
				<div className="flex flex-wrap gap-20 mt-6">
					<div className="flex flex-col justify-center items-center gap-2 hover:scale-105 transition duration-300 ease-in-out hover:drop-shadow-hover">
						<div className="bg-white drop-shadow-browser w-20 h-20  rounded-2xl flex justify-center items-center">
							<img className='w-14 h-14 bg-white p-2' src="https://i.imgur.com/a2jzYU6.png" alt="" />
						</div>

						<h2 className="font-mulish text-base font-medium">Het Nieuwsblad</h2>
					</div>
					<div className="flex flex-col justify-center items-center gap-2 hover:scale-105 transition duration-300 ease-in-out hover:drop-shadow-hover">
						<div className="bg-white drop-shadow-browser w-20 h-20  rounded-2xl flex justify-center items-center">
							<img className='w-14 h-14 bg-white p-2' src="https://i.imgur.com/a2jzYU6.png" alt="" />
						</div>

						<h2 className="font-mulish text-base font-medium">Het Nieuwsblad</h2>
					</div>
					<div className="flex flex-col justify-center items-center gap-2 hover:scale-105 transition duration-300 ease-in-out hover:drop-shadow-hover">
						<div className="bg-white drop-shadow-browser w-20 h-20  rounded-2xl flex justify-center items-center">
							<img className='w-14 h-14 bg-white p-2' src="https://i.imgur.com/a2jzYU6.png" alt="" />
						</div>

						<h2 className="font-mulish text-base font-medium">Het Nieuwsblad</h2>
					</div>
					<div className="flex flex-col justify-center items-center gap-2 hover:scale-105 transition duration-300 ease-in-out hover:drop-shadow-hover">
						<div className="bg-white drop-shadow-browser w-20 h-20  rounded-2xl flex justify-center items-center">
							<img className='w-14 h-14 bg-white p-2' src="https://i.imgur.com/a2jzYU6.png" alt="" />
						</div>

						<h2>Het Nieuwsblad</h2>
					</div>
					<div className="flex flex-col justify-center items-center gap-2 hover:scale-105 transition duration-300 ease-in-out hover:drop-shadow-hover">
						<div className="bg-white drop-shadow-browser w-20 h-20  rounded-2xl flex justify-center items-center">
							<img className='w-14 h-14 bg-white p-2' src="https://i.imgur.com/a2jzYU6.png" alt="" />
						</div>

						<h2>Het Nieuwsblad</h2>
					</div>
					<div className="flex flex-col justify-center items-center gap-2 hover:scale-105 transition duration-300 ease-in-out hover:drop-shadow-hover">
						<div className="bg-white drop-shadow-browser w-20 h-20  rounded-2xl flex justify-center items-center">
							<svg width="39" height="38" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M21.6685 21.1057L36.1351 21.196C37.263 21.203 38.1792 20.2868 38.1722 19.1589V19.1589C38.1653 18.0506 37.2686 17.154 36.1603 17.147L21.6432 17.0565L21.5526 2.53935C21.5457 1.43112 20.649 0.534428 19.5408 0.527515V0.527515C18.4129 0.520479 17.4967 1.43665 17.5037 2.5646L17.594 17.0312L2.82261 16.9391C1.69465 16.9321 0.778483 17.8482 0.785519 18.9762V18.9762C0.792432 20.0844 1.68912 20.9811 2.79735 20.988L17.6192 21.0805L17.7117 35.9023C17.7186 37.0106 18.6153 37.9072 19.7235 37.9142V37.9142C20.8515 37.9212 21.7676 37.005 21.7606 35.8771L21.6685 21.1057Z"
									fill="#343A44"
								/>
							</svg>
						</div>

						<h2>Toevoegen</h2>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
