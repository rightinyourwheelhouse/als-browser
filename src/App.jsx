import React from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import Dashboard from './components/Dashboard/Dashboard';

import { Routes, Route } from 'react-router-dom';
import Settings from './components/Settings/Settings';

import UserContextProvider from './contexts/UserContext';

const App = () => {
	return (
		<UserContextProvider>
			<div className="grid h-full grid-rows-[max-content,1fr]">
				<Toolbar />
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="settings/*" element={<Settings />}></Route>
				</Routes>
			</div>
		</UserContextProvider>
	);
};

export default App;
