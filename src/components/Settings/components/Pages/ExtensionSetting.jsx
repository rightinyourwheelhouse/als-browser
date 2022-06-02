import React, { useEffect } from 'react';
import Title from '../../../Typography/Title';
import CustomSwitch from '../CustomSwitch';
import SettingTile from '../SettingTile';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../utils/FirebaseConfig';

import { useAuth } from '../../../../contexts/AuthContextProvider';

import { MinusIcon } from '@heroicons/react/outline';
import { PlusIcon } from '@heroicons/react/outline';
import { useExtensionStates } from '../../../../contexts/ExtensionStatesContextProvider';

const ExtensionSetting = () => {
	const { user } = useAuth();
	const [extensionStates, setExtensionStates] = useExtensionStates();

	useEffect(() => {
		if (!user) return;
	}, [user, extensionStates]);

	const incrementScrollSpeed = async () => {
		if (extensionStates.scrollSpeed >= 10) return;
		const previousState = { ...extensionStates };
		const scrollSpeed = extensionStates.scrollSpeed + 1;
		try {
			setExtensionStates({ ...extensionStates, scrollSpeed: scrollSpeed });
			handleOnChange('scrollSpeed', scrollSpeed);
		} catch (error) {
			setExtensionStates(previousState);
		}
	};

	const decrementScrollSpeed = async () => {
		if (extensionStates.scrollSpeed <= 1) return;
		const previousState = { ...extensionStates };
		const scrollSpeed = extensionStates.scrollSpeed - 1;
		try {
			setExtensionStates({ ...extensionStates, scrollSpeed: scrollSpeed });
			handleOnChange('scrollSpeed', scrollSpeed);
		} catch (error) {
			setExtensionStates(previousState);
		}
	};

	const incrementMagnetStrength = async () => {
		if (extensionStates.magnetStrength >= 10) return;
		const previousState = { ...extensionStates };
		const magnetStrength = extensionStates.magnetStrength + 1;
		// console.log(extensionStates.magnetStrength);
		try {
			setExtensionStates({ ...extensionStates, magnetStrength: magnetStrength });
			handleOnChange('magnetStrength', magnetStrength);
		} catch (error) {
			setExtensionStates(previousState);
		}
	};

	const decrementMagnetStrength = async () => {
		if (extensionStates.magnetStrength <= 1) return;
		const previousState = { ...extensionStates };
		const magnetStrength = extensionStates.magnetStrength - 1;
		try {
			setExtensionStates({ ...extensionStates, magnetStrength: magnetStrength });
			handleOnChange('magnetStrength', magnetStrength);
		} catch (error) {
			setExtensionStates(previousState);
		}
	};

	const handleOnChange = async (name, state) => {
		const previousState = { ...extensionStates };
		try {
			setExtensionStates({ ...extensionStates, [name]: state });
			await sendToDatabase(name, state);
			window.api.send('extensionStates', { ...extensionStates, [name]: state });
		} catch (error) {
			setExtensionStates(previousState);
		}
	};

	const sendToDatabase = async (key, value) => {
		if (user?.uid) {
			const docRef = doc(db, 'users', user.uid);
			await setDoc(docRef, { extensionStates: { [key]: value } }, { merge: true });
		}
	};

	return (
		<div className="mx-10 ">
			<Title className="mt-8">Toegankelijkheid</Title>

			{/* <SettingTile infoText="Schakel alle functies aan of uit.">
				<CustomSwitch
					title="Volledige extensie"
					name="extension"
					state={extensionStates.extension}
					handleOnChange={handleOnChange}
				/>
			</SettingTile> */}

			<SettingTile infoText="Deze tool helpt je om te scrollen doorheen webpagina’s. Stel de snelheid in van het scrollen of kies waar de scrollhulp gepositioneerd staat op je webpagina.">
				<div className="flex w-full flex-col">
					<div className="my-2 flex items-center justify-between">
						<CustomSwitch
							title="Scrollhulp"
							name="scrollHelp"
							state={extensionStates.scrollHelp}
							handleOnChange={handleOnChange}
						/>
					</div>

					<div className="my-2 flex w-full items-center justify-between">
						<p className="text-lg font-bold">Scroll snelheid</p>
						<div className="flex ">
							<MinusIcon
								onClick={decrementScrollSpeed}
								className="h-10 w-10 rounded-full bg-white p-2 drop-shadow-light transition duration-300 ease-in-out hover:drop-shadow-hover"
							/>
							<input
								disabled={true}
								className="border-1 mx-4 w-12 cursor-default select-none border-dark-blue bg-white pl-3"
								value={extensionStates.scrollSpeed || 0}
								onChange={(e) => (e.target.value = extensionStates.scrollSpeed)}
								min="1"
								max="5"
								type="number"
							/>
							<PlusIcon
								onClick={incrementScrollSpeed}
								className="h-10 w-10 rounded-full bg-white p-2 drop-shadow-light transition duration-300 ease-in-out hover:drop-shadow-hover"
							/>
						</div>
					</div>
				</div>
			</SettingTile>

			<SettingTile infoText="Schakel radial ui aan of uit.">
				<CustomSwitch
					title="Radial UI"
					name="radialUI"
					state={extensionStates.radialUI}
					handleOnChange={handleOnChange}
				/>
			</SettingTile>

			<SettingTile disabled={user ? false : true} infoText="Schakel muis traceren aan of uit.">
				<CustomSwitch
					disabled={user ? false : true}
					title="Muis traceren"
					name="mouseTracking"
					state={user ? extensionStates.mouseTracking : false}
					handleOnChange={handleOnChange}
				/>
			</SettingTile>

			<SettingTile infoText="Schakel muispredictie aan of uit.">
				<CustomSwitch
					title="Muis predictie"
					name="mousePrediction"
					state={extensionStates.mousePrediction}
					handleOnChange={handleOnChange}
				/>
			</SettingTile>
			<SettingTile infoText="Schakel adblocker aan of uit.">
				<CustomSwitch
					title="Adblocker"
					name="adBlocker"
					state={extensionStates.adBlocker}
					handleOnChange={handleOnChange}
				/>
			</SettingTile>

			<SettingTile infoText="Wanneer je in de buurt komt van een knop, zal je muiscursor naar de knop toegetrokken worden.">
				<div className="flex w-full flex-col">
					<div className="my-2 flex items-center justify-between">
						<CustomSwitch
							title="Magnetische knoppen"
							name="gravityWell"
							state={extensionStates.gravityWell}
							handleOnChange={handleOnChange}
						/>
					</div>

					<div className="my-2 flex w-full items-center justify-between">
						<p className="text-lg font-bold">Magneet Sterkte</p>
						<div className="flex ">
							<MinusIcon
								onClick={decrementMagnetStrength}
								className="h-10 w-10 rounded-full bg-white p-2 drop-shadow-light transition duration-300 ease-in-out hover:drop-shadow-hover"
							/>
							<input
								disabled={true}
								className="border-1 mx-4 w-12 cursor-default select-none border-dark-blue bg-white pl-3"
								value={extensionStates.magnetStrength || 2}
								onChange={(e) => (e.target.value = extensionStates.magnetStrength)}
								min="1"
								max="10"
								type="number"
							/>
							<PlusIcon
								onClick={incrementMagnetStrength}
								className="h-10 w-10 rounded-full bg-white p-2 drop-shadow-light transition duration-300 ease-in-out hover:drop-shadow-hover"
							/>
						</div>
					</div>
				</div>
			</SettingTile>

			<SettingTile infoText="Wanneer je beweegt naar een knop, zal deze knop op je cursor tevoorschijn komen.">
				<CustomSwitch
					title="Shortcut knop"
					name="shortcut"
					state={extensionStates.shortcut}
					handleOnChange={handleOnChange}
				/>
			</SettingTile>

			{/* <SettingTile infoText="Schakel achtervolgende knoppen aan of uit.">
				<CustomSwitch
					title="Achtervolgende knoppen"
					name="snappingButtons"
					state={extensionStates.snappingButtons}
					handleOnChange={handleOnChange}
				/>
			</SettingTile> */}
		</div>
	);
};

export default ExtensionSetting;
