import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { HashRouter } from 'react-router-dom';

import AuthContextProvider from './contexts/AuthContextProvider';

import './css/index.css';
import ExtensionStatesContextProvider from './contexts/ExtensionStatesContextProvider';

ReactDOM.render(
	<React.StrictMode>
		<HashRouter>
			<AuthContextProvider>
				<ExtensionStatesContextProvider>
					<App />
				</ExtensionStatesContextProvider>
			</AuthContextProvider>
		</HashRouter>
	</React.StrictMode>,
	document.getElementById('root'),
);
