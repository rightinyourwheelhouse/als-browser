const { ipcRenderer } = require('electron');

var url = window.location;

var historyItem = {
  url: url.href,
  hostname: url.hostname,
  pathname: url.pathname,
  search: url.search,
  visitTime: new Date().getTime(),
}

ipcRenderer.send('history', (historyItem));