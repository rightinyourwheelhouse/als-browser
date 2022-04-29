const { ipcRenderer } = require('electron');
// const { arrayUnion, doc, getDoc, setDoc, writeBatch, Timestamp } = require('firebase/firestore');

// const { db } = require('../utils/firebaseConfig');

let user;

ipcRenderer.on('auth', (event, userUID) => {
	if (userUID) {
		user = userUID;
	}
});

const MAX_QUEUE_SIZE = 250;
const interval = 30;
let queue = [];

let device;
let batchRef;
let batchSnap;

let previousTimestamp = new Date().getTime();

let mouseTrackingActive = false;

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
	document.addEventListener('DOMContentLoaded', () => {
		currentWebPageTitle = document.title.replaceAll('/', '-');

		const webPageData = {
			url: currentWebPageURL,
			title: currentWebPageTitle,
			lastVisit: currentWebPageTime,
		};

		// send webPageData to mainbrowser
		ipcRenderer.send('webPageData', webPageData);
	});
};

const handleBeforeUnload = () => {
	// send message to mainbrowser
	console.log('beforeunload');
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
	};

	// send cursorData to mainbrowser
	ipcRenderer.send('cursorData', cursorData);
};

const init = () => {
	registerListeners();
};

init();
