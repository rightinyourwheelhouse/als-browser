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

// let previousTimestamp = Timestamp.now().toMillis();

let mouseTrackingActive = false;

let currentWebPageURL = window.location.href;
let currentWebPageTitle;
let currentWebPageTime = new Date();

// chrome.storage.local.get(['user'], (result) => {
// 	if (result) user = result.user;
// });

// chrome.storage.local.get(['EN_mtr'], (result) => {
// 	mouseTrackingActive = result.EN_mtr;
// 	if (mouseTrackingActive) saveCurrentURLToDb();
// });

// // get chrome storage data on change
// chrome.storage.local.onChanged.addListener((changes) => {
// 	for (let [key, { newValue }] of Object.entries(changes)) {
// 		if (key === 'user') user = newValue;
// 		if (key === 'EN_mtr') {
// 			// send last batch when disabling the extension
// 			if (!newValue) sendbatch();
// 			mouseTrackingActive = newValue;
// 			if (mouseTrackingActive) saveCurrentURLToDb();
// 		}
// 	}
// });

// const saveCurrentURLToDb = async () => {
// 	await setDoc(doc(db, `users/${user}/visitedPages`, currentWebPageTitle), {
// 		url: currentWebPageURL,
// 		title: currentWebPageTitle,
// 		lastVisit: currentWebPageTime,
// 	});
// };

const registerListeners = () => {
	// start interval when mouse moves in the window
	window.addEventListener('mousemove', handleMouseMove);

	// Handle the clicks for database
	window.addEventListener('click', (e) => {
		console.log('click', user);
	});

	// Doesnt work all the time
	//window.addEventListener('beforeunload', handleBeforeUnload);

	// Get the current web page title
	document.addEventListener('DOMContentLoaded', () => {
		currentWebPageTitle = document.title.replaceAll('/', '-');
	});
};

// const handleBeforeUnload = async () => {
// 	if (!queue.length) return;

// 	let batch = writeBatch(db);
// 	queue.forEach((queueItem) => {
// 		batch.update(batchRef, 'values', queueItem);
// 	});

// 	await sendbatch(batch);
// };

const handleClick = async (e) => {
	// if (!user) return;

	// const timestamp = Timestamp.now().toMillis();
	const clientX = e.clientX;
	const clientY = e.clientY;
	const pageX = window.innerWidth;
	const pageY = window.innerHeight;
	const element = e.srcElement.outerHTML;

	// console.log('click', clientX, clientY, pageX, pageY, element);

	// await setCursorData(timestamp, clientX, clientY, true, pageX, pageY, element);
};

const handleMouseMove = async (e) => {
	// const timestamp = Timestamp.now().toMillis();
	// if (timestamp >= previousTimestamp + interval) {
	const clientX = e.clientX;
	const clientY = e.clientY;
	const pageX = window.innerWidth;
	const pageY = window.innerHeight;

	// console.log(clientX, clientY, pageX, pageY);

	// 	await setCursorData(timestamp, clientX, clientY, false, pageX, pageY, null);
	// 	previousTimestamp = timestamp;
	// }
};

// const sendbatch = async (batch) => {
// 	if (!user) return;
// 	queue = [];

// 	await batch.commit();
// };

// const getUserDevice = async () => {
// 	if (!user) return;
// 	if (device) return device;

// 	let deviceRef = doc(db, `users/${user}`);
// 	let userSnap = await getDoc(deviceRef);

// 	// Return empty device when no device is set
// 	return userSnap.data()?.device ?? '';
// };

// const setCursorData = async (timestamp, clientX, clientY, mouseClick, pageX, pageY, htmlElement) => {
// 	if (!user) return;

// 	if (mouseTrackingActive && pageX != undefined && pageY != undefined) {
// 		device = await getUserDevice();

// 		if (!batchRef) {
// 			batchRef = doc(db, `users/${user}/visitedPages/${currentWebPageTitle}/mouseTracking`, 'mouseData');
// 		}
// 		if (!batchSnap) {
// 			batchSnap = await getDoc(batchRef);
// 			if (!batchSnap.exists()) {
// 				await setDoc(batchRef, {
// 					values: [],
// 				});
// 			}
// 		}

// 		queue.push(
// 			arrayUnion({
// 				mouse: {
// 					clientX: clientX,
// 					clientY: clientY,
// 					click: mouseClick,
// 				},
// 				pageX: pageX,
// 				pageY: pageY,
// 				device: device,
// 				timestamp: timestamp,
// 				htmlElement: htmlElement || null,
// 			}),
// 		);

// 		if (queue.length >= MAX_QUEUE_SIZE) {
// 			let batch = writeBatch(db);
// 			queue.forEach((event) => {
// 				batch.update(batchRef, 'values', event);
// 			});

// 			await sendbatch(batch);
// 		}
// 	}
// };

const init = () => {
	// registerListeners(device, batchRef);
	registerListeners();
};

init();
