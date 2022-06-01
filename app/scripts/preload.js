const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
	require('./mouseTracking');
	require('./radialUI');
	require('./scrollHelp.js');
	require('./history.js');
	require('./AlertMessageBookmark');
	require('./gravityWells.js');

	ipcRenderer.send('getExtensionStates');
});
