const { ipcRenderer } = require('electron');

let url = window.location;
console.log(document.title);

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
	console.log('GethistoryReply');
	ipcRenderer.send('history', historyItem);
});
