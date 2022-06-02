const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
	require('./mouseTracking');
	require('./radialUI');
	require('./scrollHelp.js');
	require('./history.js');
	require('./AlertMessageBookmark')

	ipcRenderer.on('extensionStatesReply', (event, payload) => {
	if (payload.gravityWell) require('./gravityWells');
	if (payload.shortcut) require('./cursorPrediction');
});

	ipcRenderer.send('getExtensionStates');
});
