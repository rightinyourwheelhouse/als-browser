import React, { useEffect } from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import Dashboard from './components/Dashboard/Dashboard';

import { Routes, Route, useNavigate } from 'react-router-dom';
import Settings from './components/Settings/Settings';
import { useHistory } from './utils/useHistory';
import { useMouseTracking } from './utils/useMouseTracking';

const App = () => {
	useMouseTracking();
	useHistory();
	const navigate = useNavigate();

	useEffect(() => {
		window.api.recieve('toggleExtensionRadialReply', () => {
			navigate('/settings/extension');
			window.api.send('toggleWebview', true);
		});

		window.api.send('tutorial');
		return () => window.api.removeAllListeners('toggleExtensionRadialReply');
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
