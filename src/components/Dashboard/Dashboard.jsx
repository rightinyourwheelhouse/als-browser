import React, { useEffect, useState } from 'react';
import BookmarkTile from './Tiles/BookmarkTile ';
import MediumTile from './Tiles/MediumTile';
import Title from '../Typography/Title';
import OnType from './OnType';
import Clock from '../Clock';

import { useNavigate, useLocation } from 'react-router-dom';
import useLocalStorageState from '../../hooks/useLocalStorageState';

import { PlusIcon } from '@heroicons/react/outline';
import { CogIcon } from '@heroicons/react/outline';

import { useAuth } from '../../contexts/AuthContextProvider';
import { query, collection, limit, doc, setDoc, onSnapshot, orderBy, deleteDoc } from 'firebase/firestore';
import { db } from '../../utils/FirebaseConfig';
import AddBookmark from './AddBookmark';
import useImmutableCallback from '../../hooks/useImmutableCallback';

const Dashboard = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { user } = useAuth();

	const [showDeleteBookmark, setShowDeleteBookmark] = useState(false);
	const [showAddBookmarkModal, setShowAddBookmarkModal] = useState(false);
	const [bookmarks, setBookmarks] = useLocalStorageState('bookmarks', []);

	let params = new URLSearchParams(location.search);

	const handleSettings = () => {
		navigate('/settings/feedback');
	};

	const deleteBookmark = (title) => {
		const newBookmarks = bookmarks.filter((bookmark) => bookmark.title !== title);
		setBookmarks(newBookmarks);
		if (!user) return;

		deleteDoc(doc(db, `users/${user.uid}/bookmarks/${title}`));
	};

	const addBookmark = useImmutableCallback((bookmark) => {
		const existingBookmark = bookmarks.find((b) => b.title === bookmark.title);

		if (bookmarks.length >= 10) {
			window.api.send('alert-message-bookmark', {
				message: 'U hebt het maximum aantal bladwijzers bereikt',
				type: 'warning',
			});
		} else if (existingBookmark) {
			window.api.send('alert-message-bookmark', {
				message: 'Deze bladwijzer is al toegevoegd',
				type: 'warning',
			});
		} else {
			setBookmarks([bookmark, ...bookmarks]);
			window.api.send('alert-message-bookmark', {
				message: 'Bladwijzer toegevoegd',
				type: 'success',
			});
		}
	});

	useEffect(() => {
		if (!user) return;
		const queryRef = query(collection(db, 'users', `${user.uid}/bookmarks`), limit(10), orderBy('createdAt', 'desc'));

		const unsubscribe = onSnapshot(queryRef, (snapshot) => {
			let bookmarkArray = [];
			snapshot.forEach((doc) => {
				const bookmarkData = {
					id: doc.id,
					url: doc.data().url,
					title: doc.data().title,
					favicon: doc.data().favicon,
				};
				bookmarkArray.push(bookmarkData);
			});
			setBookmarks(bookmarkArray);
		});

		return () => unsubscribe();
	}, [user, addBookmark, setBookmarks]);

	useEffect(() => {
		window.api.recieve('bookmarkReply', (bookmarkData) => {
			bookmarkData = bookmarkData[0];
			addBookmark(bookmarkData);

			if (!user) return;

			const bookmarkRef = doc(db, `users/${user.uid}/bookmarks/${bookmarkData.title}`);
			setDoc(bookmarkRef, bookmarkData);
		});

		return () => {
			window.api.removeAllListeners('bookmarkReply');
		};
	}, [user, addBookmark]);

	return !params.get('search') ? (
		<>
			{showAddBookmarkModal && <AddBookmark setAddBookmark={setShowAddBookmarkModal} />}
			<div className="select-none overflow-y-auto">
				<Clock className="mt-8 h-10 text-center" />

				<button
					onClick={handleSettings}
					className="absolute right-8 top-28 flex flex-col items-center justify-center gap-2 drop-shadow-light transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-hover"
				>
					<CogIcon className="h-12 w-12 rounded-full" />

					<h2 className="font-light">Instellingen</h2>
				</button>
				<div className="m-center mt-8 w-3/4">
					<div className="mb-10">
						<Title>Suggesties</Title>
					</div>
					<div className="flex cursor-pointer flex-row gap-10">
						<MediumTile title="Het Nieuwsblad" img="https://i.imgur.com/a2jzYU6.png" url="www.nieuwsblad.be" />
						<MediumTile title="Het Nieuwsblad" img="https://i.imgur.com/a2jzYU6.png" url="www.nieuwsblad.be" />
						<MediumTile title="Het Nieuwsblad" img="https://i.imgur.com/a2jzYU6.png" url="www.nieuwsblad.be" />
					</div>
				</div>
				<div className="m-center mt-16 mb-16 w-3/4">
					<div className="mb-10 flex items-center justify-between">
						<Title>Bladwijzers</Title>
						{bookmarks.length > 0 && (
							<button
								onClick={() => setShowDeleteBookmark(!showDeleteBookmark)}
								className={`h-10 rounded-lg  px-4 text-white ${showDeleteBookmark ? 'bg-slate-500' : 'bg-red-500'}`}
							>
								{showDeleteBookmark ? 'Annuleer' : 'Verwijder'}
							</button>
						)}
					</div>
					<div className="flex cursor-pointer flex-row flex-wrap justify-start ">
						{bookmarks.map((bookmark, index) => (
							<BookmarkTile
								key={index}
								title={bookmark.title}
								img={bookmark?.favicon}
								url={bookmark.url}
								setShowDeleteBookmark={showDeleteBookmark}
								handleDeleteBookmark={deleteBookmark}
							/>
						))}

						{bookmarks.length < 10 && (
							<button
								onClick={() => {
									setShowAddBookmarkModal(true);
								}}
								className="flex flex-col items-center gap-2 drop-shadow-light transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-hover"
							>
								<div className="drop-shadow-browser flex h-20 w-20  items-center justify-center rounded-2xl bg-white">
									<PlusIcon className="h-10 w-10" />
								</div>
								<h2 className="truncate font-mulish text-base font-medium">Toevoegen</h2>
							</button>
						)}
					</div>
				</div>
			</div>
		</>
	) : (
		<OnType />
	);
};

export default Dashboard;
