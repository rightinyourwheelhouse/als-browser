import React, { useState } from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import Dashboard from './components/Dashboard/Dashboard';
import OnType from './components/Dashboard/OnType';

const App = () => {
	const [searchBarStatus, setSearchBarStatus] = useState('Dashboard');

	const handleFocusChange = (component) => {
		component === 'OnType' ? setSearchBarStatus('OnType') : setSearchBarStatus('Dashboard');
	};

	return (
		<>
			<Toolbar onFocusChange={handleFocusChange} />
			{searchBarStatus === 'OnType' ? <OnType /> : <Dashboard />}
		</>
	);
};

export default App;
