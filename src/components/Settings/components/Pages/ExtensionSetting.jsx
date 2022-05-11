import React, { useEffect, useState } from 'react';
import Title from '../../../Typography/Title';
import CustomSwitch from '../CustomSwitch';
import SettingTile from '../SettingTile';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../../utils/FirebaseConfig';

import { useAuth } from '../../../../contexts/AuthContextProvider';

import { MinusIcon } from '@heroicons/react/outline';
import { PlusIcon } from '@heroicons/react/outline';

const ExtensionSettings = () => {
	const { user } = useAuth();
	const [extensionStates, setExtensionStates] = useState({});

	useEffect(() => {
		if (!user) return;
		const fetchData = async () => {
			const docRef = doc(db, 'users', user.uid);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				const data = docSnap.data();
				if (data.extensionStates) {
					setExtensionStates(data.extensionStates);
				}
			}
		};
		fetchData();
	}, [user]);

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
			<Title className="mt-8">Extensie</Title>

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
								className="border-1 mx-4 w-12 border-dark-blue bg-white pl-3"
								value={extensionStates.scrollSpeed || 2}
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
					{/* <div className="my-2 mt-4 flex w-full items-center justify-between">
						<p className="text-lg font-bold">Uitlijning</p>
						<div className="grid grid-cols-2 grid-rows-2 gap-2">
							<div className="rounded-full bg-white p-2 drop-shadow-light transition duration-300 ease-in-out hover:drop-shadow-hover">
								<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M22.7886 1.97462C22.7886 2.92009 22.0221 3.68654 21.0766 3.68654L3.9574 3.68654L3.9574 20.8058C3.9574 21.7513 3.19095 22.5177 2.24548 22.5177C1.30001 22.5177 0.533552 21.7513 0.533552 20.8058L0.533552 1.97462C0.533552 1.02915 1.30001 0.262695 2.24548 0.262695L21.0766 0.262695C22.0221 0.262695 22.7886 1.02915 22.7886 1.97462Z"
										fill="#343A44"
									/>
								</svg>
							</div>
							<div className="rounded-full bg-white p-2 drop-shadow-light transition duration-300 ease-in-out hover:drop-shadow-hover">
								<svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M21.2949 22.5188C20.3494 22.5188 19.583 21.7523 19.583 20.8069L19.583 3.68762L2.46374 3.68762C1.51827 3.68762 0.751812 2.92117 0.751812 1.9757C0.751812 1.03023 1.51827 0.263775 2.46374 0.263775L21.2949 0.263775C22.2404 0.263775 23.0068 1.03023 23.0068 1.9757L23.0068 20.8069C23.0068 21.7523 22.2404 22.5188 21.2949 22.5188Z"
										fill="#343A44"
									/>
								</svg>
							</div>
							<div className="rounded-full bg-white p-2 drop-shadow-light transition duration-300 ease-in-out hover:drop-shadow-hover">
								<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M2.24562 0.481445C3.19109 0.481445 3.95754 1.2479 3.95754 2.19337V19.3126H21.0768C22.0223 19.3126 22.7887 20.0791 22.7887 21.0245C22.7887 21.97 22.0223 22.7365 21.0768 22.7365H2.24562C1.30015 22.7365 0.533691 21.97 0.533691 21.0245V2.19337C0.533691 1.2479 1.30015 0.481445 2.24562 0.481445Z"
										fill="#343A44"
									/>
								</svg>
							</div>
							<div className="rounded-full bg-white p-2 drop-shadow-light transition duration-300 ease-in-out hover:drop-shadow-hover">
								<svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M0.751953 21.0244C0.751953 20.0789 1.51841 19.3125 2.46388 19.3125H19.5831V2.19323C19.5831 1.24776 20.3496 0.481304 21.2951 0.481304C22.2405 0.481304 23.007 1.24776 23.007 2.19323V21.0244C23.007 21.9699 22.2405 22.7363 21.2951 22.7363H2.46388C1.51841 22.7363 0.751953 21.9699 0.751953 21.0244Z"
										fill="#343A44"
									/>
								</svg>
							</div>
						</div>
					</div> */}
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

			<SettingTile infoText="Schakel muis traceren aan of uit.">
				<CustomSwitch
					title="Muis traceren"
					name="mouseTracking"
					state={extensionStates.mouseTracking}
					handleOnChange={handleOnChange}
				/>
			</SettingTile>

			<SettingTile infoText="Schakel muis predictie aan of uit.">
				<CustomSwitch
					title="Muis predictie"
					name="mousePrediction"
					state={extensionStates.mousePrediction}
					handleOnChange={handleOnChange}
				/>
			</SettingTile>

			<SettingTile infoText="Schakel achtervolgende knoppen aan of uit.">
				<CustomSwitch
					title="Achtervolgende knoppen"
					name="snappingButtons"
					state={extensionStates.snappingButtons}
					handleOnChange={handleOnChange}
				/>
			</SettingTile>
		</div>
	);
};

export default ExtensionSettings;
