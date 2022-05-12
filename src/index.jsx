import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { HashRouter } from 'react-router-dom';

import AuthContextProvider from './contexts/AuthContextProvider';

import './css/index.css';

ReactDOM.render(
	<React.StrictMode>
		<HashRouter>
			<AuthContextProvider>
				<App />
			</AuthContextProvider>
		</HashRouter>
	</React.StrictMode>,
	document.getElementById('root'),
);
