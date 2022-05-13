const { ipcRenderer } = require('electron');

const url = window.location;

const favicon =
	document.querySelector('link[rel="icon"]')?.href ||
	document.querySelector('link[rel="shortcut icon"]')?.href ||
	document.querySelector('link[rel="apple-touch-icon"]')?.href ||
	'';

const historyItem = {
	url: url.href,
	hostname: url.hostname,
	pathname: url.pathname,
	search: url.search,
	favicon: favicon,
	title: document.title,
	visitTime: new Date().getTime(),
};

ipcRenderer.send('history', historyItem);
