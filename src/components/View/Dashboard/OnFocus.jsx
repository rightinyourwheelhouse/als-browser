import React from 'react';

const OnFocus = () => {
	return (
		<div>
			<div className="m-center mt-20 w-3/4">
				<h1 className="font-mulish text-3xl font-bold">Suggesties</h1>
				<div className="mt-6 flex flex-row gap-8">
					<div className="flex h-20 w-64 cursor-pointer items-center justify-start gap-4 rounded-2xl bg-white drop-shadow-light  transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-hover">
						<img className="h-20 w-20 rounded-2xl bg-gray-50" src="https://i.imgur.com/a2jzYU6.png" alt="" />
						<h2 className="font-mulish text-base font-medium">Het Nieuwsblad</h2>
					</div>
					<div className="flex h-20 w-64  cursor-pointer items-center justify-start gap-4 rounded-2xl bg-white drop-shadow-light  transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-hover">
						<img className="h-20 w-20 rounded-2xl bg-gray-50" src="https://i.imgur.com/a2jzYU6.png" alt="" />
						<h2 className="font-mulish text-base font-medium">Het Nieuwsblad</h2>
					</div>
					<div className="flex h-20 w-64  cursor-pointer items-center justify-start gap-4 rounded-2xl bg-white drop-shadow-light  transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-hover">
						<img className="h-20 w-20 rounded-2xl bg-gray-50" src="https://i.imgur.com/a2jzYU6.png" alt="" />
						<h2 className="font-mulish text-base font-medium">Het Nieuwsblad</h2>
					</div>
				</div>
			</div>

			<div className="m-center mt-20 w-3/4">
				<h1 className="font-mulish text-3xl font-bold">Recente zoekopdrachten</h1>
				<h2 className="mt-1 font-mulish text-lg font-medium">Vandaag - vrijdag 8 april, 2022</h2>

				<div className="my-2 flex  h-14 w-full cursor-pointer items-center gap-6 rounded-full bg-white drop-shadow-light transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-hover">
					<div className="ml-6 flex items-center gap-4">
						<input className="h-5 w-5" type="checkbox" />
						<p>9:05</p>
					</div>

					<div className="flex items-center gap-2">
						<img className="h-8 w-8" src="https://i.imgur.com/bPfHmNc.png" alt="" />
						<p>VRT</p>
						<p>www.vrt.be</p>
					</div>
				</div>
				<div className="my-2 flex  h-14 w-full cursor-pointer items-center gap-6 rounded-full bg-white drop-shadow-light transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-hover">
					<div className="ml-6 flex items-center gap-4">
						<input className="h-5 w-5" type="checkbox" />
						<p>9:05</p>
					</div>

					<div className="flex items-center gap-2">
						<img className="h-8 w-8" src="https://i.imgur.com/bPfHmNc.png" alt="" />
						<p>VRT</p>
						<p>www.vrt.be</p>
					</div>
				</div>

				<h2 className="mt-6 font-mulish text-lg font-medium">Gisteren - donderdag 7 april, 2022</h2>

				<div className="my-2 flex  h-14 w-full cursor-pointer items-center gap-6 rounded-full bg-white drop-shadow-light transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-hover">
					<div className="ml-6 flex items-center gap-4">
						<input className="h-5 w-5" type="checkbox" />
						<p>9:05</p>
					</div>

					<div className="flex items-center gap-2">
						<img className="h-8 w-8" src="https://i.imgur.com/bPfHmNc.png" alt="" />
						<p>VRT</p>
						<p>www.vrt.be</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OnFocus;
