const { ipcRenderer } = require('electron');

let url = window.location;

let historyItem = {
  url: url.href,
  hostname: url.hostname,
  pathname: url.pathname,
  search: url.search,
  visitTime: new Date().getTime(),
}

ipcRenderer.send('history', (historyItem));