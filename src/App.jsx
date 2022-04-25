import React from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import Dashboard from './components/Dashboard/Dashboard';
import OnType from './components/Dashboard/OnType';
import { Routes, Route } from 'react-router-dom';
import Settings from './components/Settings/Settings';

const App = () => {
	return (
		<>
			<Toolbar />
			<Routes>
				<Route path="/" index element={<Dashboard />} />
				<Route path="settings/*" element={<Settings />}></Route>
				<Route path="on-type" element={<OnType />} />
			</Routes>
		</>
	);
};

export default App;
