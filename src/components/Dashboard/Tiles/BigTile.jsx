import React from 'react';

const BigTile = ({ title, img, description, url }) => {
	const handleChangeUrl = () => {
		window.api.send('searchURL', url);
	};

	return (
		<button
			onClick={handleChangeUrl}
			className="mt-6 w-2/4 cursor-pointer select-none rounded-2xl bg-white p-6 drop-shadow-light transition duration-300 ease-in-out hover:drop-shadow-hover"
		>
			<div className="flex flex-row gap-8">
				<div className="flex items-center justify-start gap-4">
					<div>
						<img className="h-7 w-7" src={img} alt={`${title}'s favicon`} />
					</div>
					<div className="text-left">
						<a className="text-sm font-light underline underline-offset-1">{url}</a>
						<h2 className="text-lg font-semibold">{title}</h2>
					</div>
				</div>
			</div>

			<p className="mt-2 text-left text-base font-light">{description}</p>
		</button>
	);
};

export default BigTile;
