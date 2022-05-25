import React, { useState } from 'react';

const Tutorial = () => {
	const [step, setStep] = useState(1);
	const content = [
		{
			step: 1,
			imgLink: '/assets/img/logo-brainweb.png',
			text: ['Welkom in de Brainhouse browser!'],
		},
		{
			step: 2,
			imgLink: '/assets/img/tutorial/tut-1.png',
			text: [
				`Hier staat de navigatie in het rood omkaderd. Dit is net hetzelfde als in andere browsers.
        Je kunt terug en vooruit navigeren door op de pijlen te klikken.
        Je kan ook de pagina herladen door op het icoontje met de ronde pijlen te klikken.
        Naast de pijlen en herlaadknop, staat de thuisknop. Dit is om terug te keren naar het
        Dashboard die je ziet wanneer de browser opent. `,
				`In het midden zie je de zoekbalk, daar kan je zoeken naar websites. `,
				`Rechts van de zoekbalk, staat het Brainweb-logo. Als je hierop klikt, wordt je naar de 
        instellingen van de Brainweb-hulpfuncties gebracht. Meer hierover in volgende stap van de gebruiksaanwijzing.`,
				`Volledig rechts vind je de knoppen om de browser te minimaliseren, full-screen te zetten en te sluiten.`,
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
				`De scrollhulp biedt hulp op de pagina's die je bezoekt. Als je deze functie aanzet en je opent een webpagina, 
        zal er rechts onderaan het scherm een vierkantje verschijnen met 2 pijlen en een sleep-symbool in het midden.
        Als je over 1 van deze pijlen zweeft met je muis, zal de pagina omhoog of omlaag worden gescrolld. Als je klikt, zal 
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
				`De scrollhulp biedt hulp op de pagina's die je bezoekt. Als je deze functie aanzet en je opent een webpagina, 
        zal er rechts onderaan het scherm een vierkantje verschijnen met 2 pijlen en een sleep-symbool in het midden.
        Als je over 1 van deze pijlen zweeft met je muis, zal de pagina omhoog of omlaag worden gescrolld. Als je klikt, zal 
        de pagina wat sneller scrollen. `,
			],
		},
		{
			step: 7,
			imgLink: '/assets/img/tutorial/predictions.png',
			text: [
				`De scrollhulp biedt hulp op de pagina's die je bezoekt. Als je deze functie aanzet en je opent een webpagina, 
        zal er rechts onderaan het scherm een vierkantje verschijnen met 2 pijlen en een sleep-symbool in het midden.
        Als je over 1 van deze pijlen zweeft met je muis, zal de pagina omhoog of omlaag worden gescrolld. Als je klikt, zal 
        de pagina wat sneller scrollen. `,
			],
		},
	];

	return (
		<div
			id="tutor"
			className="absolute left-0 right-0 top-0 bottom-0 z-[999] m-auto flex h-[45rem] w-[35rem] flex-col rounded-xl bg-skin-dark p-5 pb-7"
		>
			<div className="flex flex-grow flex-col">
				<div className="h-[20rem]">
					<img src={`${content[step - 1].imgLink}`} className="mx-auto object-cover pb-10" />
				</div>
				{/* {content[step - 1].text.forEach((par) => {
          return (<p className="text-[#cbd5e1]">{par}</p>);
        })} */}
				<p className="text-[#cbd5e1]">{content[step - 1].text}</p>
			</div>
			<div className="relative flex justify-center">
				{step > 1 ? (
					<button
						className="absolute left-0 -top-4 rounded-md bg-skin-medium p-2 px-4"
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
					{content.map((item) => {
						return (
							// eslint-disable-next-line react/jsx-key
							<div
								className={`h-3 w-3 transition duration-300 ease-in-out ${
									item.step == step ? 'bg-skin-medium' : 'bg-black opacity-[0.22]'
								} mx-0.5 rounded-full`}
							></div>
						);
					})}
				</div>
				{step < content.length ? (
					<button
						className="absolute right-0 -top-4 rounded-md bg-skin-medium p-2 px-4"
						onClick={() => {
							setStep(step + 1);
						}}
					>
						Volgende
					</button>
				) : (
					<button
						className="absolute right-0 -top-4 rounded-md bg-skin-medium p-2 px-4"
						onClick={() => {
							document.getElementById('tutor').classList.add('hidden');
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
