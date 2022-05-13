const { ipcRenderer } = require('electron');

const interval = 30;
let previousTimestamp = new Date().getTime();

let currentWebPageURL = window.location.href;
let currentWebPageTitle;
let currentWebPageTime = new Date();

const registerListeners = () => {
	// start interval when mouse moves in the window
	window.addEventListener('mousemove', handleMouseMove);

	// Handle the clicks for database
	window.addEventListener('click', handleClick);

	// Doesnt work all the time
	window.addEventListener('beforeunload', handleBeforeUnload);

	// Get the current web page title
	window.addEventListener('load', () => {
		if (!document.title) {
			let webPageData;

			setTimeout(() => {
				currentWebPageTitle = document.title.replaceAll('/', '-');

				webPageData = {
					url: currentWebPageURL,
					title: currentWebPageTitle,
					lastVisit: currentWebPageTime,
				};

				ipcRenderer.send('webPageData', webPageData);
			}, 1000);
		} else {
			currentWebPageTitle = document.title.replaceAll('/', '-');
			const webPageData = {
				url: currentWebPageURL,
				title: currentWebPageTitle,
				lastVisit: currentWebPageTime,
			};

			// send webPageData to mainbrowser
			ipcRenderer.send('webPageData', webPageData);
		}
	});
};

const handleBeforeUnload = () => {
	// send message to mainbrowser
	ipcRenderer.send('beforeunload');
};

const handleClick = (e) => {
	const timestamp = new Date().getTime();
	const clientX = e.clientX;
	const clientY = e.clientY;
	const pageX = window.innerWidth;
	const pageY = window.innerHeight;
	const element = e.srcElement.outerHTML;

	setCursorData(timestamp, clientX, clientY, true, pageX, pageY, element);
};

const handleMouseMove = (e) => {
	const timestamp = new Date().getTime();
	if (timestamp >= previousTimestamp + interval) {
		const clientX = e.clientX;
		const clientY = e.clientY;
		const pageX = window.innerWidth;
		const pageY = window.innerHeight;

		setCursorData(timestamp, clientX, clientY, false, pageX, pageY, null);
		previousTimestamp = timestamp;
	}
};

const setCursorData = (timestamp, clientX, clientY, isClick, pageX, pageY, element) => {
	const cursorData = {
		timestamp,
		clientX,
		clientY,
		isClick,
		pageX,
		pageY,
		element,
		currentWebPageTitle: document.title.replaceAll('/', '-'),
	};

	// send cursorData to mainbrowser
	ipcRenderer.send('cursorData', cursorData);
};

const init = () => {
	registerListeners();
};

init();
