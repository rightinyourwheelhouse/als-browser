// electron/electron.js
const path = require('path');
const { app, BrowserWindow, BrowserView, ipcMain } = require('electron');

const isDev = require('electron-is-dev');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) app.quit();

let view;

function createWindow() {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		nodeIntegration: true,
		enableRemoteModule: true,
		webPreferences: {
			webviewTag: true,
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	mainWindow.maximize();

	view = new BrowserView();

	// Open the DevTools.
	if (isDev) {
		mainWindow.loadURL('http://localhost:3000');
		mainWindow.webContents.openDevTools({ mode: 'detach' });
	} else {
		mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));
	}

	mainWindow.setBrowserView(view);
	view.setBounds({ x: 0, y: 80, width: mainWindow.getBounds().width, height: mainWindow.getBounds().height - 108 });
	view.webContents.loadURL('https://google.com');

	// Events
	mainWindow.on('resize', function () {
		const size = mainWindow.getSize();

		view.setBounds({ x: 0, y: 80, width: size[0], height: size[1] - 85 });
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
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

ipcMain.on('toMain', (event, args) => {
	view.webContents.loadURL(`https://www.google.com/search?q=${args}`);
});
