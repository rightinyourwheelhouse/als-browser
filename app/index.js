// electron/electron.js
const path = require('path');
const { app, BrowserWindow, BrowserView, ipcMain, nativeTheme } = require('electron');
const { autoUpdater } = require('electron-updater');

const isDev = require('electron-is-dev');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) app.quit();

let loadingScreen;
let mainWindow;
let view;

function sendLoadingStatusToWindow(text) {
	loadingScreen.webContents.send('message', text);
}

const createLoadingScreen = () => {
	loadingScreen = new BrowserWindow({
		width: 300,
		height: 350,
		frame: false,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
	});
	loadingScreen.setResizable(false);
	loadingScreen.loadURL('file://' + __dirname + '/loading/loading.html');
	loadingScreen.on('closed', () => (loadingScreen = null));

	loadingScreen.once('ready-to-show', () => {
		autoUpdater.checkForUpdatesAndNotify();
	});

	autoUpdater.on('checking-for-update', () => {
		sendLoadingStatusToWindow('Controleren op update...');
	});

	autoUpdater.on('update-available', () => {
		sendLoadingStatusToWindow('Update gevonden, bezig met downloaden...');
	});

	autoUpdater.on('update-not-available', () => {
		sendLoadingStatusToWindow('Applicatie starten...');
		loadingScreen.close();
		if (!mainWindow) createWindow();
	});

	autoUpdater.on('error', () => {
		sendLoadingStatusToWindow('Er is iets fout gelopen...');
		loadingScreen.close();
		if (!mainWindow) createWindow();
	});

	autoUpdater.on('download-progress', (progressObj) => {
		const message = progressObj.percent.toFixed(2) + '% gedownload';
		sendLoadingStatusToWindow(message);
	});

	autoUpdater.on('update-downloaded', () => {
		sendLoadingStatusToWindow('Update gedownload, herstarten...');
		autoUpdater.quitAndInstall();
	});
};

const createWindow = () => {
	// Always set the theme to light
	nativeTheme.themeSource = 'light';

	mainWindow = new BrowserWindow({
		nodeIntegration: true,
		enableRemoteModule: true,
		frame: false,
		minWidth: 1200,
		minHeight: 750,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	mainWindow.maximize();

	createBrowserView();

	if (isDev) {
		mainWindow.loadURL('http://localhost:3000');
		mainWindow.webContents.openDevTools();
	} else {
		mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));
	}

	mainWindow.on('resize', function () {
		const size = mainWindow.getSize();
		if (view.getBounds().width === 0 && view.getBounds().height === 0) {
			return;
		} else {
			if (view) view.setBounds({ x: 0, y: 80, width: size[0], height: size[1] - 80 });
		}
	});
};

function createBrowserView() {
	view = new BrowserView({
		nodeIntegration: true,
		webPreferences: {
			preload: path.join(__dirname, 'scripts/preload.js'),
		},
	});

	view.setBackgroundColor('#fff');
	mainWindow.setBrowserView(view);
	view.setBounds({ x: 0, y: 0, width: 0, height: 0 });

	// view.setBounds({ x: 0, y: 80, width: mainWindow.getBounds().width, height: mainWindow.getBounds().height - 80 });
	view.webContents.loadURL('https://google.com');
	if (isDev) view.webContents.openDevTools();

	view.webContents.setWindowOpenHandler(({ url }) => {
		view.webContents.loadURL(url);
		return { action: 'deny' };
	});
}

app.whenReady().then(() => {
	app.on('activate', function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});

	if (isDev) {
		createWindow();
	} else {
		createLoadingScreen();
	}
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	app.quit();
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

ipcMain.on('app_version', (event) => {
	event.sender.send('app_version', { version: app.getVersion() });
});

ipcMain.on('goBack', () => {
	view.webContents.goBack();
});

ipcMain.on('goForward', () => {
	view.webContents.goForward();
});

ipcMain.on('searchURL', (event, url) => {
	// eslint-disable-next-line no-useless-escape
	const exp =
		/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;

	const regex = new RegExp(exp);

	if (regex.test(url)) {
		const newUrl = url.replace('https://', '').replace('http://', '').replace('www.', '');
		url = `https://www.${newUrl}`;
	} else {
		url = 'https://www.google.com/search?q=' + url;
	}

	view.webContents.loadURL(url);

	// When dashboard is loaded, set the browserView back
	if (view.getBounds().width === 0 && view.getBounds().height === 0)
		view.setBounds({ x: 0, y: 80, width: mainWindow.getBounds().width, height: mainWindow.getBounds().height - 80 });
});

ipcMain.on('refresh', () => {
	view.webContents.reload();
});

ipcMain.on('minimize', () => {
	mainWindow.minimize();
});

ipcMain.on('adjustSize', () => {
	mainWindow.isFullScreen() ? mainWindow.setFullScreen(false) : mainWindow.setFullScreen(true);
});

ipcMain.on('close', () => {
	mainWindow.close();
});

ipcMain.on('toggleDashboard', (event, arg) => {
	// view.getBounds().width === 0 && view.getBounds().height === 0;
	const viewOpen = view.getBounds().width > 0 && view.getBounds().height > 0;
	const viewClosed = view.getBounds().width === 0 && view.getBounds().height === 0;

	if (viewOpen) {
		view.setBounds({ x: 0, y: 0, width: 0, height: 0 });
	} else if (viewClosed && arg) {
		view.setBounds({ x: 0, y: 80, width: mainWindow.getBounds().width, height: mainWindow.getBounds().height - 80 });
	}
});

ipcMain.on('toggleExtension', () => {
	const viewOpen = view.getBounds().width > 0 && view.getBounds().height > 0;

	if (viewOpen) {
		view.setBounds({ x: 0, y: 0, width: 0, height: 0 });
	}
});

ipcMain.on('focusSearchBarRadialUi', (event, arg) => {
	mainWindow.webContents.focus();
	mainWindow.webContents.send('focusSearchBarRadialUiReply', arg);
});

ipcMain.on('toggleExtensionRadial', (event, arg) => {
	mainWindow.webContents.send('toggleExtensionRadialReply', arg);
});

ipcMain.on('searchBarFocus', (event, bool) => {
	bool
		? view.setBounds({ x: 0, y: 0, width: 0, height: 0 })
		: view.setBounds({ x: 0, y: 80, width: mainWindow.getBounds().width, height: mainWindow.getBounds().height - 80 });
});

ipcMain.on('cursorData', (event, arg) => {
	mainWindow.webContents.send('cursorDataReply', arg);
});

ipcMain.on('webPageData', (event, arg) => {
	mainWindow.webContents.send('webPageDataReply', arg);
});

ipcMain.on('beforeunload', () => {
	mainWindow.webContents.send('beforeunloadReply');
});

ipcMain.on('extensionStates', (event, payload) => {
	view.webContents.send('extensionStatesReply', payload);
});

ipcMain.on('getExtensionStates', () => {
	mainWindow.webContents.send('getExtensionStatesReply');
});

ipcMain.on('getLatestOverlayLocation', () => {
	mainWindow.webContents.send('getLatestOverlayLocationReply');
});

ipcMain.on('setLatestOverlayLocation', (event, payload) => {
	mainWindow.webContents.send('setLatestOverlayLocationReply', payload);
});

ipcMain.on('bookmark', (event, arg) => {
	mainWindow.webContents.send('bookmarkReply', arg);
});

ipcMain.on('alert-message-bookmark', (event, arg) => {
	view.webContents.send('alert-message-bookmarkReply', arg);
});

ipcMain.on('getHistory', () => {
	console.log('getHistory');
	view.webContents.send('getHistoryReply');
});

ipcMain.on('history', (event, historyItem) => {
	mainWindow.webContents.send('historyReply', historyItem);
});

ipcMain.on('alert-message-history', (event, arg) => {
	view.webContents.send('alert-message-historyReply', arg);
});
