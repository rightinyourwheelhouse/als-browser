import { TrashIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';

import { useAuth } from '../../../contexts/AuthContextProvider';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../utils/FirebaseConfig';

const BookmarkTile = ({ title, img, url, deleteBookmark }) => {
	const [fallback, setFallback] = useState(false);
	const { user } = useAuth();
	const handleChangeUrl = () => {
		window.api.send('searchURL', url);
	};

	const handleDeleteBookmark = () => {
		deleteDoc(doc(db, `users/${user.uid}/bookmarks/${title}`));
	};

	return (
		<div className="group relative">
			{deleteBookmark ? (
				<button
					onClick={() => {
						handleDeleteBookmark();
					}}
					className="mx-4 mb-8 flex w-32 flex-col items-center justify-center gap-2 drop-shadow-light transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-hover"
				>
					<div className="drop-shadow-browser flex h-20 w-20  items-center justify-center rounded-2xl bg-red-500">
						<TrashIcon className="h-10 w-10 text-white" />
					</div>

					<h2 className=" w-32 truncate font-mulish text-base font-medium">{title}</h2>
				</button>
			) : (
				<button
					onClick={handleChangeUrl}
					className="mx-4 mb-8 flex w-32 flex-col items-center justify-center gap-2 drop-shadow-light transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-hover"
				>
					<div className="drop-shadow-browser flex h-20 w-20  items-center justify-center rounded-2xl bg-white">
						{img && !fallback ? (
							<img
								onError={() => {
									setFallback(true);

									return;
								}}
								className="h-14 w-14 bg-white p-2"
								src={img}
							/>
						) : (
							<div>
								<span className="h-14 w-14 rounded-md bg-slate-500 p-4 text-lg font-bold text-white">
									{title.split(' ').slice(0, 2).join(' ').substring(0, 2)}
								</span>
							</div>
						)}
					</div>

					<h2 className=" w-32 truncate font-mulish text-base font-medium">{title}</h2>
				</button>
			)}
		</div>
	);
};

export default BookmarkTile;
