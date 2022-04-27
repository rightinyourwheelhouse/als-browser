import React from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import Dashboard from './components/Dashboard/Dashboard';

import { Routes, Route } from 'react-router-dom';
import Settings from './components/Settings/Settings';

const App = () => {
	return (
		<>
			<div className="grid h-full grid-rows-[max-content,1fr]">
				<Toolbar />
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="settings/*" element={<Settings />}></Route>
				</Routes>
			</div>
		</>
	);
};

export default App;
