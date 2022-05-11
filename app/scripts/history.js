const { ipcRenderer } = require('electron');

var url = window.location;

var historyItem = {
  url: url.href,
  hostname: url.hostname,
  pathname: url.pathname,
  search: url.search,
  now: Date.now()/1000,
}

ipcRenderer.send('history', (historyItem));