import React, { useEffect } from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import Dashboard from './components/Dashboard/Dashboard';

import { Routes, Route, useNavigate } from 'react-router-dom';
import Settings from './components/Settings/Settings';


import { useAuth } from './contexts/AuthContextProvider';
import { db } from './utils/FirebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { useMouseTracking } from './utils/useMouseTracking';

const App = () => {
  
	const { user } = useAuth();
	useMouseTracking();

	let navigate = useNavigate();

	useEffect(() => { // TODO: CLEAN UP 
		window.api.recieve('toggleExtensionRadialReply', () => {
			navigate('/settings/extension');
			window.api.send('toggleExtension');
		});
	}, [navigate]);

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
