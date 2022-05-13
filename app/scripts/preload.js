const { ipcRenderer } = require('electron');

require('./mouseTracking');
require('./radialUI');
require('./scrollHelp.js');
require('./AlertMessageBookmark');

window.addEventListener('DOMContentLoaded', () => {
	ipcRenderer.send('getExtensionStates');
});

