// electron/electron.js
const path = require('path');
const { app, BrowserWindow, BrowserView, ipcMain, nativeTheme } = require('electron');

const isDev = require('electron-is-dev');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) app.quit();

let mainWindow;
let view;

function createWindow() {
	// Always set the theme to light
	nativeTheme.themeSource = 'light';

	mainWindow = new BrowserWindow({
		nodeIntegration: true,
		enableRemoteModule: true,
		frame: false,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	mainWindow.maximize();

	createBrowserView();

	// Open the DevTools.
	if (isDev) {
		mainWindow.loadURL('http://localhost:3000');
		mainWindow.webContents.openDevTools({ mode: 'detach' });
	} else {
		mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));
	}

	// Events
	mainWindow.on('resize', function () {
		const size = mainWindow.getSize();
		if (view) view.setBounds({ x: 0, y: 80, width: size[0], height: size[1] - 80 });
	});
}

function createBrowserView() {
	view = new BrowserView({
		nodeIntegration: true,
		enableRemoteModule: true,
		webPreferences: {
			preload: path.join(__dirname, 'scripts/preload.js'),
		},
	});
	mainWindow.setBrowserView(view);
	view.setBounds({ x: 0, y: 0, width: 0, height: 0 });

	// view.setBounds({ x: 0, y: 80, width: mainWindow.getBounds().width, height: mainWindow.getBounds().height - 80 });
	view.webContents.loadURL('https://google.com');
	if (isDev) view.webContents.openDevTools();
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
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

ipcMain.on('goBack', () => {
	view.webContents.goBack();
});

ipcMain.on('goForward', () => {
	view.webContents.goForward();
});

ipcMain.on('searchURL', (event, args) => {
	view.webContents.loadURL(`https://www.google.com/search?q=${args}`);

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

ipcMain.on('toggleDashboard', () => {
	view.getBounds().width === 0 && view.getBounds().height === 0
		? view.setBounds({ x: 0, y: 80, width: mainWindow.getBounds().width, height: mainWindow.getBounds().height - 80 })
		: view.setBounds({ x: 0, y: 0, width: 0, height: 0 });
});
