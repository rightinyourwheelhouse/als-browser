const { ipcRenderer } = require('electron');

const init = () => {
	const url = window.location;

	const favicon =
		document.querySelector('link[rel="icon"]')?.href ||
		document.querySelector('link[rel="shortcut icon"]')?.href ||
		document.querySelector('link[rel="apple-touch-icon"]')?.href ||
		'';

	const title = document.title;
	const description = document.querySelector('meta[name="description"]').content;

	const historyItem = {
		url: url.href,
		hostname: url.hostname,
		pathname: url.pathname,
		search: url.search,
		favicon: favicon,
		title: title,
		description: description,
		visitTime: new Date().getTime(),
	};

	ipcRenderer.send('history', historyItem);
};

window.addEventListener('DOMContentLoaded', init);
