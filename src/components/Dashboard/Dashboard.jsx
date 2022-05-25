import React, { useEffect, useState } from 'react';
import BookmarkTile from './Tiles/BookmarkTile';
import MediumTile from './Tiles/MediumTile';
import Title from '../Typography/Title';
import OnType from './OnType';
import Clock from '../Clock';

import { useNavigate, useLocation, Link } from 'react-router-dom';
import useLocalStorageState from '../../hooks/useLocalStorageState';

import { PlusIcon } from '@heroicons/react/outline';
import { CogIcon } from '@heroicons/react/outline';

import { useAuth } from '../../contexts/AuthContextProvider';
import { query, collection, limit, doc, setDoc, onSnapshot, orderBy, deleteDoc } from 'firebase/firestore';
import { db } from '../../utils/FirebaseConfig';
import AddBookmarkModal from './AddBookmarkModal';
import useImmutableCallback from '../../hooks/useImmutableCallback';
import useFPGrowth from '../../hooks/useFPGrowth';

const Dashboard = ({ frecency }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const { user } = useAuth();

	const FPGrowth = useFPGrowth();

	const [showDeleteBookmark, setShowDeleteBookmark] = useState(false);
	const [showAddBookmarkModal, setShowAddBookmarkModal] = useState(false);
	const [currentBookmark, setCurrentBookmark] = useState([]);
	const [bookmarks, setBookmarks] = useLocalStorageState('bookmarks', []);

	let params = new URLSearchParams(location.search);

	const handleSettings = () => {
		navigate('/settings/feedback');
	};

	const addBookmark = useImmutableCallback((bookmark) => {
		const existingBookmark = bookmarks.find((b) => b.title === bookmark.title);

		if (bookmarks.length >= 10) {
			return {
				message: 'U hebt het maximum aantal bladwijzers bereikt',
				type: 'warning',
			};
		} else if (existingBookmark) {
			return {
				message: 'Deze bladwijzer bestaat al',
				type: 'warning',
			};
		} else {
			setBookmarks([bookmark, ...bookmarks]);

			if (user) {
				const bookmarkRef = doc(db, `users/${user.uid}/bookmarks/${bookmark.title}`);
				setDoc(bookmarkRef, bookmark);
			}
			return {
				message: 'Bladwijzer toegevoegd',
				type: 'success',
			};
		}
	});

	const deleteBookmark = (title) => {
		const newBookmarks = bookmarks.filter((bookmark) => bookmark.title !== title);
		setBookmarks(newBookmarks);
		if (newBookmarks.length === 0) setShowDeleteBookmark(false);
		if (!user) return;

		deleteDoc(doc(db, `users/${user.uid}/bookmarks/${title}`));
	};

	const handleClickOutside = (e) => {
		const closestBookmark = e.target.closest('#bookmark');

		if (!closestBookmark && e.target.id !== 'delete') {
			setShowDeleteBookmark(false);
		}
	};

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
	}, [user, setBookmarks]);

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);
		window.api.send('getCurrentBookmark');

		window.api.recieve('setCurrentBookmarkReply', (bookmarkData) => {
			setCurrentBookmark(bookmarkData[0]);
		});

		return () => {
			window.api.removeAllListeners('setCurrentBookmarkReply');
			document.removeEventListener('click', handleClickOutside);
		};
	}, [showAddBookmarkModal]);

	useEffect(() => {
		window.api.recieve('bookmarkReply', (bookmarkData) => {
			window.api.send('alert-message-bookmark', addBookmark(...bookmarkData));
		});

		return () => window.api.removeAllListeners('bookmarkReply');
	}, [user, addBookmark]);

	return !params.get('search') ? (
		<>
			{showAddBookmarkModal && (
				<AddBookmarkModal
					handleAddBookmark={(bookmark) => addBookmark(bookmark)}
					currentBookmark={currentBookmark}
					setAddBookmark={setShowAddBookmarkModal}
				/>
			)}
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
						{user ? (
							frecency.length === 0 ? (
								<p className="text-lg font-thin">
									Begin met <strong>zoeken op het internet</strong> en je suggesties zullen hier verschijnen.
								</p>
							) : (
								frecency.map(({ title, favicon, url }, index) => (
									<MediumTile key={index} title={title} img={favicon} url={url} />
								))
							)
						) : (
							<p className="text-lg font-thin">
								Gelieve te{' '}
								<Link className="font-bold text-dark-blue" to="/settings/account">
									registreren
								</Link>{' '}
								of{' '}
								<Link className="font-bold text-dark-blue" to="/settings/account">
									in te loggen
								</Link>{' '}
								om deze feature te gebruiken...
							</p>
						)}
					</div>
				</div>
				<div className="m-center mt-16 mb-16 w-3/4">
					<div className="mb-10 flex items-center justify-between">
						<Title>Bladwijzers</Title>
						{bookmarks.length > 0 && (
							<button
								id="delete"
								onClick={() => setShowDeleteBookmark(!showDeleteBookmark)}
								className={`h-10 rounded-lg  px-4 text-white ${showDeleteBookmark ? 'bg-slate-500' : 'bg-red-500'}`}
							>
								{showDeleteBookmark ? 'Annuleer' : 'Verwijder'}
							</button>
						)}
					</div>
					<div className="grid grid-cols-5 gap-4">
						{bookmarks.map(({ title, favicon, url }, index) => (
							<BookmarkTile
								key={index}
								title={title}
								img={favicon}
								url={url}
								showDeleteBookmark={showDeleteBookmark}
								handleDeleteBookmark={deleteBookmark}
							/>
						))}

						{bookmarks.length < 10 && (
							<button
								onClick={() => setShowAddBookmarkModal(true)}
								className="flex w-32 flex-col items-center gap-2 drop-shadow-light transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-hover"
							>
								<div className="drop-shadow-browser flex h-20 w-20 items-center justify-center rounded-2xl bg-white">
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
		<OnType params={params} />
	);
};

export default Dashboard;
