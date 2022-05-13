import React, { useEffect, useState, useRef } from 'react';
import BookmarkTile from './Tiles/BookmarkTile ';
import MediumTile from './Tiles/MediumTile';
import Title from '../Typography/Title';
import OnType from './OnType';
import Clock from '../Clock';

import { useNavigate, useLocation } from 'react-router-dom';

import { PlusIcon } from '@heroicons/react/outline';
import { CogIcon } from '@heroicons/react/outline';

import { useAuth } from '../../contexts/AuthContextProvider';
import { query, collection, limit, doc, getDoc, setDoc, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../../utils/FirebaseConfig';
import AddBookmark from './AddBookmark';

const Dashboard = () => {
	const [deleteBookmark, setDeleteBookmark] = useState(false);
	const [addBookmark, setAddBookmark] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const { user } = useAuth();
	const [bookmarks, setBookmarks] = useState([]);
	const localBookmarks = localStorage.getItem('bookmarks');

	const bookmarkCountRef = useRef();

	let params = new URLSearchParams(location.search);

	const handleSettings = () => {
		navigate('/settings/feedback');
	};

	useEffect(() => {
		if (!user) {
			// setBookmarks to local storage

			if (localBookmarks) {
				setBookmarks(JSON.parse(localBookmarks));
			}
			return;
		}

		const queryRef = query(collection(db, 'users', `${user.uid}/bookmarks`), limit(10), orderBy('createdAt', 'desc'));

		const unsubscribe = onSnapshot(queryRef, (snapshot) => {
			let bookmarksArray = [];
			snapshot.forEach((doc) => {
				const bookmarkData = {
					id: doc.id,
					url: doc.data().url,
					title: doc.data().title,
					favicon: doc.data().favicon,
				};

				bookmarksArray.push(bookmarkData);
			});
			setBookmarks(bookmarksArray);
		});

		return () => {
			unsubscribe();
		};
	}, [localBookmarks, user]);

	useEffect(() => {
		// recieve bookmark from radial
		window.api.recieve('bookmarkReply', ([bookmarkData]) => {
			if (!user) {
				//save bookmark to local storage
				const localBookmarks = JSON.parse(localStorage.getItem('bookmarks'));

				// if bookmarks is not empty then push bookmark to bookmarks array
				if (localBookmarks) {
					// check if bookmark array is less than 10
					if (localBookmarks.length >= 10) {
						window.api.send('alert-message-bookmark', {
							message: 'U hebt het maximum aantal bladwijzers bereikt',
							type: 'warning',
						});
					} else {
						// bookmark does not exist
						localBookmarks.push(bookmarkData);
						localStorage.setItem('bookmarks', JSON.stringify(localBookmarks));
						window.api.send('alert-message-bookmark', {
							message: 'Bladwijzer toegevoegd',
							type: 'success',
						});
					}
				} else {
					// if bookmarks is empty then create new array and push bookmark to it
					const newBookmarks = [bookmarkData];
					localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
				}

				return;
			}

			const queryRefLength = query(collection(db, 'users', `${user.uid}/bookmarks`));
			onSnapshot(queryRefLength, (snapshot) => {
				bookmarkCountRef.current = snapshot.size;
			});

			// add bookmark to firebase db collection
			const bookmarkRef = doc(db, `users/${user.uid}/bookmarks/${bookmarkData.title}`);
			// check if bookmark already exists
			getDoc(bookmarkRef).then((docSnap) => {
				if (docSnap.exists) {
					// collection already exists
					if (docSnap.data()) {
						// bookmark already exists
						window.api.send('alert-message-bookmark', {
							message: 'Bladwijzer bestaat al',
							type: 'warning',
						});
					} else {
						if (bookmarkCountRef.current >= 10) {
							window.api.send('alert-message-bookmark', {
								message: 'U hebt het maximum aantal bladwijzers bereikt',
								type: 'warning',
							});
						} else if (bookmarkCountRef.current < 10) {
							// bookmark does not exist
							// add bookmark to collection
							setDoc(bookmarkRef, bookmarkData).then(() => {
								window.api.send('alert-message-bookmark', {
									message: 'Bladwijzer toegevoegd',
									type: 'success',
								});
							});
						}
					}
				} else {
					// collection does not exist
					setDoc(bookmarkRef, bookmarkData);
				}
			});
		});
	}, [user]);

	return !params.get('search') ? (
		<>
			{addBookmark && <AddBookmark setAddBookmark={setAddBookmark} user={user} />}
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
						<button
							onClick={() => setDeleteBookmark(!deleteBookmark)}
							className={`h-10 rounded-lg  px-4 text-white ${deleteBookmark ? 'bg-slate-500' : 'bg-red-500'}`}
						>
							{deleteBookmark ? 'Annuleer' : 'Verwijder'}
						</button>
					</div>
					<div className="flex cursor-pointer flex-row flex-wrap justify-center ">
						{bookmarks.map((bookmark) => (
							<BookmarkTile
								key={bookmark.title}
								title={bookmark.title}
								img={bookmark?.favicon}
								url={bookmark.url}
								deleteBookmark={deleteBookmark}
							/>
						))}

						{bookmarks.length < 10 && (
							<button
								onClick={() => {
									setAddBookmark(true);
								}}
								className="mx-4 flex w-32 flex-col items-center gap-2 drop-shadow-light transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-hover"
							>
								<div className="drop-shadow-browser flex h-20 w-20  items-center justify-center rounded-2xl bg-white">
									<PlusIcon className="h-10 w-10" />
								</div>
								<h2 className="w-32 truncate font-mulish text-base font-medium">Toevoegen</h2>
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
