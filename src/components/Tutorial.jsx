import React, { useState } from 'react';
import { XIcon } from '@heroicons/react/outline';

const Tutorial = ({ setTutorial }) => {
	const [step, setStep] = useState(1);
	const content = [
		{
			step: 1,
			imgLink: '/assets/img/tutorial/tut-loc.png',
			title: 'Welkom in de Brainhouse browser!',
			text: [
				`Dit venster zal je een rondleiding geven in de basiswerking van onze browser.`,
				`Je kan onderaan op de knoppen klikken om van stap te veranderen. Je kan ook op de bollen klikken om stappen 
        over te slaan of om terug te keren naar een specifieke stap.`,
				`Bovenaan staat een kruisje zodat je het venster gewoon kan sluiten als je deze rondleiding niet nodig hebt. 
        Als je de rondleiding opnieuw wilt doorlopen, kan je hier in de instellingen een knop voor vinden (zie afbeelding).`,
			],
		},
		{
			step: 2,
			imgLink: '/assets/img/tutorial/tut-1.png',
			text: [
				`Hier staat de navigatie in het rood omkaderd. Dit is net hetzelfde als in andere browsers.`,
				`(1) Je kan terug en vooruit navigeren door op de pijlen te klikken.`,
				`(2) Je kan ook de pagina herladen door op het icoontje met de ronde pijlen te klikken (herlaadknop).`,
				`(3) Naast de herlaadknop, staat de thuisknop. Als je aan het surfen bent, zal dit je naar het Dashboard
        brengen. Als je op het Dashboard zit, zal dit je naar de website brengen die open staat.`,
				`(4) In het midden zie je de zoekbalk, daar kan je zoeken naar websites.`,
				`(5) Rechts van de zoekbalk, staat het Brainweb-logo. Als je hierop klikt, wordt je naar de 
        instellingen van de Brainweb-hulpfuncties gebracht. Meer hierover in volgende stap van de gebruiksaanwijzing.`,
				`(6) Volledig rechts vind je de knoppen om de browser te minimaliseren, full-screen te zetten en te sluiten.`,
			],
		},
		{
			step: 3,
			imgLink: '/assets/img/tutorial/tut-2.png',
			text: [
				`Dit zijn de instellingen van de Brainweb-hulpfuncties. `,
				`Hier kan je de functies gebruiken die wij speciaal voor jou hebben gemaakt. `,
				`Om bepaalde functies te gebruiken, moet je eerst inloggen met je Brainweb-account. `,
			],
		},
		{
			step: 4,
			imgLink: '/assets/img/tutorial/scrollhulp.png',
			text: [
				`De scrollhulp biedt hulp op de pagina's die je bezoekt.`,
				`Als je deze functie aanzet en je opent een webpagina, zal er rechts onderaan het scherm een vierkantje verschijnen 
        met 2 pijlen en een sleep-symbool in het midden.`,
        `Je kan de scrollsnelheid ook aanpassen door op de plus -en minknop te klikken.`,
				`Als je over 1 van deze pijlen zweeft met je muis, zal de pagina omhoog of omlaag worden gescrolld. Als je klikt, zal 
        de pagina wat sneller scrollen. `,
			],
		},
		{
			step: 5,
			imgLink: '/assets/img/tutorial/radial-ui.png',
			text: [
				`De radial-ui zal ervoor zorgen dat als je rechts klikt op je muis, een cirkelvormig menu verschijnt met een aantal 
        opties.`,
			],
		},
		{
			step: 6,
			imgLink: '/assets/img/tutorial/tracking.png',
			text: [
				`De muis-tracking zal muisgegevens verzamelen op websites die je bezoekt.`,
				`Deze gegevens worden gebruikt om voorspellingen te maken over waar je naartoe zou willen met je muis. In de volgende stap 
        lees je meer over de voorspellingen.`,
        `Zoals er naast de knop staat, moet je wel inloggen om dit te kunnen gebruiken. Dit omdat we de gegevens moeten opslaan 
        in onze database en je hier een account voor nodig hebt.`,
			],
		},
		{
			step: 7,
			imgLink: '/assets/img/tutorial/predictions.png',
			text: [
				`Zoals in vorige stap werd gezegd, kan je hier de voorspellingen aan of uit zetten. Er wordt voorspeld waar je naartoe
        zou willen gaan met je muis en dan worden bepaalde elementen dichter bij de muis getrokken of vergroot.`,
			],
		},
    {
      step: 8,
      imgLink: '/assets/img/logo-brainweb.png',
      text: [
        `Tot zo ver de rondleiding. Aarzel niet om ons feedback te geven in de instellingen van de browser!`,
        `Wij hopen alvast dat je de browser nuttig vindt en dat het je kan helpen bij het surfen op het web.`,
        `Tot slot, bedankt voor je interesse in onze browser!`,
      ],
    },
	];

	return (
		<div
			id="tutor"
			className="absolute left-0 right-0 top-0 bottom-0 z-[999] m-auto flex h-[48rem] w-[35rem] flex-col rounded-xl bg-skin-dark p-5 pb-7"
		>
			<div className="flex flex-grow flex-col">
				<div className="w-full">
					<XIcon
						className="float-right w-8 cursor-pointer text-[#cbd5e1]"
						onClick={() => {
							setTutorial(false);
						}}
					/>
				</div>
				<div className="h-[17rem] mb-2">
					<img src={`${content[step - 1].imgLink}`} className="mx-auto object-cover" />
				</div>
				<h2 className={`${content[step - 1].title ? 'block' : 'hidden'} text-xl font-bold text-[#cbd5e1] mb-5`}>
					{content[step - 1].title}
				</h2>
				{content[step - 1].text.map((par, index) => {
					return (
						<p key={index} className="mb-1 text-[#cbd5e1]">
							{par}
						</p>
					);
				})}
			</div>
			<div className="relative flex justify-center">
				{step > 1 ? (
					<button
						className="absolute left-0 -top-2 rounded-md bg-skin-medium p-2 px-4"
						onClick={() => {
							setStep(step - 1);
						}}
					>
						Vorige
					</button>
				) : (
					<></>
				)}
				<div className="flex flex-grow items-center justify-center">
					{content.map((item, index) => {
						return (
							// eslint-disable-next-line react/jsx-key
							<div key={index}
								className={`flex h-5 w-5 cursor-pointer items-center justify-center transition duration-300 ease-in-out ${
									item.step == step ? 'bg-skin-medium' : 'bg-black opacity-[0.22]'
								} mx-0.5 rounded-full`}
								onClick={() => {
									setStep(item.step);
								}}
							>
								<p key={index} className={`text-xs ${item.step == step ? 'text-black' : 'text-white'}`}>{item.step}</p>
							</div>
						);
					})}
				</div>
				{step < content.length ? (
					<button
						className="absolute right-0 -top-2 rounded-md bg-skin-medium p-2 px-4"
						onClick={() => {
							setStep(step + 1);
						}}
					>
						Volgende
					</button>
				) : (
					<button
						className="absolute right-0 -top-2 rounded-md bg-skin-medium p-2 px-4"
						onClick={() => {
							setTutorial(false);
						}}
					>
						Sluiten
					</button>
				)}
			</div>
		</div>
	);
};

export default Tutorial;
