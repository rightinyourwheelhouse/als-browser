import React, { useEffect } from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import Dashboard from './components/Dashboard/Dashboard';

import { Routes, Route, useNavigate } from 'react-router-dom';
import Settings from './components/Settings/Settings';

import { useUser } from './contexts/UserContext';
import { db } from './utils/FirebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const App = () => {
	const auth = useUser();

	let navigate = useNavigate();

	useEffect(() => {
		window.api.recieve('toggleExtensionRadialReply', () => {
			navigate('/settings/extension');
			window.api.send('toggleExtension');
		});
	}, [navigate]);

	useEffect(() => {
		// recieve bookmark from radial
		// om één of andere reden steekt de recieve de data in een array
		window.api.recieve('bookmarkReply', ([bookmarkData]) => {
			// add bookmark to firebase db collection
			const bookmarkRef = doc(db, `users/${auth.auth.currentUser.uid}/bookmarks/${bookmarkData.title}`);

			// check if bookmark already exists
			getDoc(bookmarkRef).then((docSnap) => {
				if (docSnap.exists) {
					// collection already exists

					if (docSnap.data()) {
						// bookmark already exists
						alert('Bookmark already exists');
					} else {
						// bookmark does not exist
						// add bookmark to collection
						setDoc(bookmarkRef, bookmarkData).then(() => {
							alert('Bookmark added');
						});
					}
				} else {
					// collection does not exist
					setDoc(bookmarkRef, bookmarkData);
				}
			});
		});

		// auth.auth.currentUser.uid als depencency veroorzaakt dat deze effect niet wordt uitgevoerd en heel de pagina niet wordt geladen.
	}, []);

	return (
		<div className="grid h-full grid-rows-[max-content,1fr]">
			<Toolbar />
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="settings/*" element={<Settings />}></Route>
			</Routes>
		</div>
	);
};

export default App;
