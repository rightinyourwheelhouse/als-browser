import { TrashIcon } from '@heroicons/react/outline';
import React, { useState, forwardRef } from 'react';

const BookmarkTile = forwardRef(function BookmarkTile(
	{ title, img, url, setShowDeleteBookmark, handleDeleteBookmark },
	ref,
) {
	const [fallback, setFallback] = useState(false);

	const handleChangeUrl = () => {
		window.api.send('searchURL', url);
	};

	return (
		<div ref={ref} className="group relative">
			<button
				onClick={!setShowDeleteBookmark ? handleChangeUrl : undefined}
				className="mb-8 flex w-32 flex-col items-center justify-center gap-2 drop-shadow-light transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-hover"
			>
				<div className="drop-shadow-browser relative flex h-20 w-20  items-center justify-center rounded-2xl bg-white">
					{setShowDeleteBookmark && (
						<div
							onClick={() => handleDeleteBookmark(title)}
							className="drop-shadow-browser absolute flex h-full w-full items-center justify-center rounded-2xl bg-red-400"
						>
							<TrashIcon className="h-10 w-10 text-white" />
						</div>
					)}

					{img && !fallback ? (
						<img
							onError={() => setFallback(true)}
							className="h-14 w-14 bg-white p-2"
							src={img}
							alt={`${title}'s favicon`}
						/>
					) : (
						<div>
							<span className="flex h-11 w-11 items-center justify-center rounded-md bg-slate-500 text-3xl font-bold text-white">
								{title.substring(0, 1)}
							</span>
						</div>
					)}
				</div>

				<h2 className="truncate font-mulish text-base font-medium">
					{title.length >= 16 ? `${title.substring(0, 16)} ...` : title}
				</h2>
			</button>
		</div>
	);
});

export default BookmarkTile;
