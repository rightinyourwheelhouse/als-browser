import React, { useState } from 'react';

const BigTile = ({ title, src, size }) => {
	const [fallback, setFallback] = useState(false);

	return (
		<div>
			{src && !fallback ? (
				<img onError={() => setFallback(true)} className={`${size} bg-white`} src={src} />
			) : (
				<div>
					<span className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-500 text-xl font-bold text-white">
						{title?.substring(0, 1)}
					</span>
				</div>
			)}
		</div>
	);
};

export default BigTile;
