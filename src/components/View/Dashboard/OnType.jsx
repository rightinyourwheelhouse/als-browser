import React from 'react';

const OnType = () => {
	const handleChangeUrl = (url) => {
		window.api.send('changeURL', url);
	};

	return (
		<div>
			<div className="m-center mt-20 w-3/4">
				<h1 className="font-mulish text-3xl font-bold">Zoeken</h1>

				<div
					onClick={() => handleChangeUrl('www.vrt.be')}
					className="mt-6 w-3/4 cursor-pointer select-none rounded-2xl bg-white p-6 drop-shadow-light transition duration-300 ease-in-out hover:drop-shadow-hover"
				>
					<div className="flex flex-row gap-8">
						<div className="flex items-center gap-4">
							<div>
								<img className="h-7 w-7" src="https://i.imgur.com/bPfHmNc.png" alt="" />
							</div>
							<div>
								<a className="text-sm font-light underline underline-offset-1">www.vrt.be</a>
								<h2 className="text-lg font-semibold">VRT.be: Home</h2>
							</div>
						</div>
					</div>

					<p className="mt-2  text-base font-light">
						Schrijf u hier in op onze VRT Nieuwsbrief op maat, zo wordt u maandelijks op de hoogte gehouden van het
						belangrijkste nieuws over de VRT. Deze nieuwsbrief is ...
					</p>
				</div>

				<div
					onClick={() => handleChangeUrl('www.pcmag.com/picks/the-best-vr-headsets')}
					className="mt-6 w-3/4 cursor-pointer select-none rounded-2xl bg-white p-6 drop-shadow-light transition duration-300 ease-in-out hover:drop-shadow-hover"
				>
					<div>
						<div className="flex flex-row gap-8">
							<div className="flex min-w-fit items-center gap-4">
								<div>
									<img className="h-7 w-7" src="https://i.imgur.com/uCRV1XB.png" alt="" />
								</div>
								<div className="">
									<p className="w-fit text-sm font-light underline underline-offset-1">
										www.pcmag.com/picks/the-best-vr-headsets
									</p>
									<h2 className="w-fit text-lg font-semibold">The Best VR Headsets for 2022 | PCMag</h2>
								</div>
							</div>
						</div>

						<p className="mt-2 text-base font-light">
							There are a handful of quality virtual reality headset options, whether youre looking for a standalone
							model or one that tethers to your PC or console.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OnType;
