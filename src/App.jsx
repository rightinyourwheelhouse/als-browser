import React, { useState } from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import Dashboard from './components/Dashboard/Dashboard';
import OnType from './components/Dashboard/OnType';
import { Routes, Route } from 'react-router-dom';
import Settings from './components/Settings/Settings';

const App = () => {
	// const [searchBarStatus, setSearchBarStatus] = useState('Dashboard');

	// const handleFocusChange = (component) => {
	// 	component === 'OnType' ? setSearchBarStatus('OnType') : setSearchBarStatus('Dashboard');
	// };

	return (
		<>
			<Toolbar  />
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="settings" element={<Settings />} />
				<Route path="on-type" element={<OnType />} />
			</Routes>
			{/* {searchBarStatus === 'OnType' ? <OnType /> : <Dashboard />} */}
		</>
	);
};

export default App;
