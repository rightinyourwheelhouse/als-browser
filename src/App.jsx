import React from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import Dashboard from './components/Dashboard/Dashboard';

import { Routes, Route } from 'react-router-dom';
import Settings from './components/Settings/Settings';

import AuthContextProvider from './contexts/AuthContextProvider';

const App = () => {
	window.api.recieve('update_available', () => {
		console.log('update available');
	});

	return (
		<AuthContextProvider>
			<div className="grid h-full grid-rows-[max-content,1fr]">
				<Toolbar />
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="settings/*" element={<Settings />}></Route>
				</Routes>

				{/* <div id="notification" className="fixed bottom-8 left-8 hidden w-80 bg-white p-8">
					<p id="message"></p>
					<button id="close-button" onClick="closeNotification()">
						Close
					</button>
					<button id="restart-button" onClick="restartApp()" className="hidden">
						Restart
					</button>
				</div> */}
			</div>
		</AuthContextProvider>
	);
};

export default App;
