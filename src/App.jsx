import React, { useState } from 'react';
import Toolbar from './components/View/Toolbar/Toolbar';
import Dashboard from './components/View/Dashboard/Dashboard';

const App = () => {
	const [focus, setFocus] = useState(Dashboard);

	const handleFocusChange = (component) => {
		setFocus(component);
	};

	return (
		<>
			<Toolbar onFocusChange={handleFocusChange} />
			{focus}
		</>
	);
};

export default App;
