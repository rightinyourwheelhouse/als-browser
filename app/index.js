// electron/electron.js
const path = require('path');
const { app, BrowserWindow, BrowserView, ipcMain } = require('electron');

const isDev = require('electron-is-dev');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) app.quit();

let mainWindow;
let view;

function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		nodeIntegration: true,
		enableRemoteModule: true,
		frame: false,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	mainWindow.maximize();

	view = new BrowserView({
		nodeIntegration: true,
		enableRemoteModule: true,
		webPreferences: {
			preload: path.join(__dirname, 'scripts/preload.js'),
		},
	});

	// Open the DevTools.
	if (isDev) {
		mainWindow.loadURL('http://localhost:3000');
		mainWindow.webContents.openDevTools({ mode: 'detach' });
	} else {
		mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));
	}

	mainWindow.setBrowserView(view);
	view.setBounds({ x: 0, y: 80, width: mainWindow.getBounds().width, height: mainWindow.getBounds().height - 80 });
	view.webContents.loadURL('https://google.com');
	view.webContents.openDevTools();

	// Events
	mainWindow.on('resize', function () {
		const size = mainWindow.getSize();
		view.setBounds({ x: 0, y: 80, width: size[0], height: size[1] - 80 });
	});
}

app.whenReady().then(() => {
	createWindow();
	app.on('activate', function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	app.quit();
	// if (process.platform !== 'darwin') {
	// 	app.quit();
	// }
});

ipcMain.on('goBack', () => {
	view.webContents.goBack();
});

ipcMain.on('goForward', () => {
	view.webContents.goForward();
});

ipcMain.on('toMain', (event, args) => {
	view.webContents.loadURL(`https://www.google.com/search?q=${args}`);
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

ipcMain.on('dashboard', () => {
	mainWindow.getBrowserView() ? mainWindow.setBrowserView(null) : mainWindow.setBrowserView(view);
});
