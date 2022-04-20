import React, { useState } from 'react';
import Toolbar from './components/View/Toolbar/Toolbar';
import Dashboard from './components/View/Dashboard/Dashboard';

const App = () => {
	const [dashboardComponent, setDashboardComponent] = useState(Dashboard);

	const handleFocusChange = (component) => {
		setDashboardComponent(component);
	};

	return (
		<>
			<Toolbar onFocusChange={handleFocusChange} />
			{dashboardComponent}
		</>
	);
};

export default App;
