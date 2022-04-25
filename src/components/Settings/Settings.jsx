import React from 'react';
// import { Link } from 'react-router-dom';
import { Routes, Route, Link } from 'react-router-dom';
import ExtensionSettings from './components/ExtensionSetting';
import FeedbackSetting from './components/FeedbackSetting';
import PasswordSetting from './components/PasswordSetting';

const Settings = () => {
	return (
		<>
			<nav>
				<Link to="feedback">Feedback</Link>
				<Link to="extension">Extension</Link>
				<Link to="passwords">Wachtwoorden</Link>
			</nav>
			<Routes>
				<Route path="feedback" element={<FeedbackSetting />} />
				<Route path="extension" element={<ExtensionSettings />} />
				<Route path="passwords" element={<PasswordSetting />} />
			</Routes>
		</>
	);
};

export default Settings;
