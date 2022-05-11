import React, { useEffect } from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import Dashboard from './components/Dashboard/Dashboard';

import { Routes, Route, useNavigate } from 'react-router-dom';
import Settings from './components/Settings/Settings';

import { useAuth } from './contexts/AuthContextProvider';
import { db } from './utils/FirebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { useHistory } from './utils/useHistory';

const App = () => {
	const { user } = useAuth();

	let navigate = useNavigate();

  useHistory();

	useEffect(() => {
		window.api.recieve('toggleExtensionRadialReply', () => {
			navigate('/settings/extension');
			window.api.send('toggleExtension');
		});
	}, [navigate]);

	useEffect(() => {
		if (!user) return;
		// recieve bookmark from radial
		window.api.recieve('bookmarkReply', ([bookmarkData]) => {
			// add bookmark to firebase db collection
			const bookmarkRef = doc(db, `users/${user.uid}/bookmarks/${bookmarkData.title}`);
			// check if bookmark already exists
			getDoc(bookmarkRef).then((docSnap) => {
				if (docSnap.exists) {
					// collection already exists
					if (docSnap.data()) {
						// bookmark already exists
						window.api.send('alert-message-bookmark', true);
					} else {
						// bookmark does not exist
						// add bookmark to collection
						setDoc(bookmarkRef, bookmarkData).then(() => {
							window.api.send('alert-message-bookmark', false);
						});
					}
				} else {
					// collection does not exist
					setDoc(bookmarkRef, bookmarkData);
				}
			});
		});
	}, [user]);

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
