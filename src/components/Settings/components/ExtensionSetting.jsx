import React from 'react';
import Title from '../../Typography/Title';
import CustomSwitch from './CustomSwitch';

const ExtensionSettings = () => {
	return (
		<>
			<div className="m-center h-full w-11/12">
				<Title className="mt-8">Extensie</Title>

				<div className="my-5 flex h-24 w-96 flex-row  rounded-lg bg-white drop-shadow-light ">
					<div className="m-center flex w-11/12 items-center justify-between">
						<p className="text-lg font-bold">Volledige extensie</p>
						<CustomSwitch />
					</div>
				</div>

				<div className="min-h-content my-5 flex w-96 flex-col  rounded-lg bg-white drop-shadow-light ">
					<div className="m-center flex w-11/12 flex-col items-center justify-between">
						<div className="my-2 flex w-full justify-between">
							<p className="text-lg font-bold">Scrollhulp</p>
							<CustomSwitch />
						</div>

						<div className="my-2 flex w-full justify-between">
							<p className="text-lg font-bold">Scroll snelheid</p>
							<div>
								<span>-</span>
								<input min="1" max="5" type="number" />
								<span>+</span>
							</div>
						</div>

						<div className="my-2 flex w-full justify-between">
							<p className="text-lg font-bold">Uitlijning</p>
							<div></div>
						</div>
					</div>
				</div>

				<div className="my-5 flex h-24 w-96 flex-row  rounded-lg bg-white drop-shadow-light ">
					<div className="m-center flex w-11/12 items-center justify-between">
						<p className="text-lg font-bold">Mouse tracking</p>
						<CustomSwitch />
					</div>
				</div>

				<div className="my-5 flex h-24 w-96 flex-row  rounded-lg bg-white drop-shadow-light ">
					<div className="m-center flex w-11/12 items-center justify-between">
						<p className="text-lg font-bold">Achtervolgende knoppen</p>
						<CustomSwitch />
					</div>
				</div>
			</div>
		</>
	);
};

export default ExtensionSettings;
