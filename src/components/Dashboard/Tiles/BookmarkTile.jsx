import { TrashIcon } from '@heroicons/react/outline';
import React, { forwardRef } from 'react';
import TileImage from './TileImage';
import classNames from 'classnames';

const BookmarkTile = forwardRef(function BookmarkTile(
	{ title, img, url, showDeleteBookmark, handleDeleteBookmark },
	ref,
) {
	const handleChangeUrl = () => {
		window.api.send('searchURL', url);
	};

	const className = classNames('drop-shadow-browser flex h-20 w-20 items-center justify-center rounded-2xl', {
		'bg-white': !showDeleteBookmark,
		'bg-red-400': showDeleteBookmark,
	});

	return (
		<button
			ref={ref}
			onClick={showDeleteBookmark ? () => handleDeleteBookmark(title) : handleChangeUrl}
			className="mb-8 flex w-32 flex-col items-center justify-center gap-2 drop-shadow-light transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-hover"
		>
			<div className={className}>
				{showDeleteBookmark ? (
					<TrashIcon className="h-10 w-10 text-white" />
				) : (
					<TileImage size="w-12 h-12" title={title} src={img} />
				)}
			</div>

			<h2 className="truncate font-mulish text-base font-medium">
				{title.length >= 16 ? `${title.substring(0, 16)} ...` : title}
			</h2>
		</button>
	);
});

export default BookmarkTile;
