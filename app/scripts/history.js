const { ipcRenderer } = require('electron');

let url = window.location;

let historyItem = {
	title: document.title,
	url: url.href,
	hostname: url.hostname,
	pathname: url.pathname,
	search: url.search,
	visitTime: new Date().getTime(),
};

ipcRenderer.send('history', historyItem);

ipcRenderer.on('getHistoryReply', () => {
	ipcRenderer.send('history', historyItem);
});
