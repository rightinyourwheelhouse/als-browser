import React, { useState } from 'react';
import Toolbar from './components/View/Toolbar/Toolbar';
import Dashboard from './components/Dashboard';
import OnFocus from './components/OnFocus';

const App = () => {
	const [focus, setFocus] = useState();
	console.log(focus);

	const handleFocusChange = (value) => {
		setFocus(value);
	};

	return (
		<>
			<Toolbar onFocusChange={handleFocusChange} />
			{focus ? <OnFocus /> : <Dashboard />}
		</>
	);
};

export default App;
