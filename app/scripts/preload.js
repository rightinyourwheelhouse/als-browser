const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
	require('./mouseTracking');
	require('./radialUI');
	require('./scrollHelp.js');
	require('./history.js');
	require('./AlertMessageBookmark');

	ipcRenderer.send('getExtensionStates');
});
