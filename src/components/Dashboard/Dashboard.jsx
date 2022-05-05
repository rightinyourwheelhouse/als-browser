import React, { useEffect, useState } from 'react';
import SmallTile from './Tiles/SmallTile';
import MediumTile from './Tiles/MediumTile';
import Title from '../Typography/Title';
import OnType from './OnType';
import Clock from '../Clock';

import { useNavigate, useLocation } from 'react-router-dom';

import { PlusIcon } from '@heroicons/react/outline';

import { useAuth } from '../../contexts/AuthContextProvider';
import { getDocs, query, collection, deleteDoc, doc, limit, startAfter } from 'firebase/firestore';
import { db } from '../../utils/FirebaseConfig';

const Dashboard = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { user } = useAuth();
	const [bookmarks, setBookmarks] = useState([]);

	let params = new URLSearchParams(location.search);

	const handleSettings = () => {
		navigate('/settings/feedback');
	};

	useEffect(() => {
		const fetchData = async () => {
			let bookmarksArray = [];

			const queryRef = await query(collection(db, 'users', `${user.uid}/bookmarks`), limit(9));

			const querySnapshot = await getDocs(queryRef);
			querySnapshot.forEach((doc) => {
				const data = doc.data();

				const pushed = {
					id: doc.id,
					url: data.url,
					title: data.title,
					favicon: data.favicon,
				};
				bookmarksArray.push(pushed);
			});

			setBookmarks(bookmarksArray);
		};

		if (user) fetchData();
	}, [user]);

	return !params.get('search') ? (
		<div className="select-none">
			<Clock />
			<button
				onClick={handleSettings}
				className="absolute right-8 top-28 flex flex-col items-center justify-center gap-2 drop-shadow-light transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-hover"
			>
				<img className="h-14 w-14 rounded-full" src="https://i.imgur.com/jcuurYi.png" alt="" />
				<h2 className="font-light">Instellingen</h2>
			</button>
			<div className="m-center mt-20 w-3/4">
				<div className="mb-10">
					<Title>Suggesties</Title>
				</div>
				<div className="flex cursor-pointer flex-row gap-10">
					<MediumTile title="Het Nieuwsblad" img="https://i.imgur.com/a2jzYU6.png" url="www.nieuwsblad.be" />
					<MediumTile title="Het Nieuwsblad" img="https://i.imgur.com/a2jzYU6.png" url="www.nieuwsblad.be" />
					<MediumTile title="Het Nieuwsblad" img="https://i.imgur.com/a2jzYU6.png" url="www.nieuwsblad.be" />
				</div>
			</div>
			<div className="m-center mt-20 mb-16 w-3/4">
				<div className="mb-10 flex items-center justify-between">
					<Title>Bladwijzers</Title>
					<button>Alle bladwijzers</button>
				</div>
				<div className="flex cursor-pointer flex-row flex-wrap justify-center ">
					{bookmarks.map((bookmark) => (
						<SmallTile key={bookmark.id} title={bookmark.title} img={bookmark.favicon} url={bookmark.url} />
					))}

					<button className="mx-4 flex w-32 flex-col items-center gap-2 drop-shadow-light transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-hover">
						<div className="drop-shadow-browser flex h-20 w-20  items-center justify-center rounded-2xl bg-white">
							<PlusIcon className="h-10 w-10" />
						</div>
						<h2 className="w-32 truncate font-mulish text-base font-medium">Toevoegen</h2>
					</button>
				</div>
			</div>
		</div>
	) : (
		<OnType />
	);
};

export default Dashboard;
