const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
	send: (channel, data) => ipcRenderer.send(channel, data),
	recieve: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(args)),
	removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel),
});
