//import statement for tensorflow
const tf = require('@tensorflow/tfjs');
const tfnode = require('@tensorflow/tfjs-node');
const { mouse, Point, straightTo } = require('@nut-tree/nut-js');
const {ipcRenderer} = require("electron")

// decides the strength at which te cursor is pulled towards buttons
let magnetstrength = 3;

ipcRenderer.on('extensionStatesReply', (event, payload) => {
	if (payload.magnetstrength) magnetstrength = payload.magnetstrength;
});

/**
 * BUGS/PROBLEMS
 * everything is in this file, meaning the model needs to be loaded again on every page, needs to be refactored to background workers.
 * curretly an old lstm model is used, needs to be updated, is done in 5 min
 */

//get all the buttons and links of the current document/page
let clickableItems;
let elements = [];
let clickableItemsFiltered = [];
//enabled is hardcoded, need to be option
let enabled = true;
//variable to save the last element that was closest to the prediction
let previousClosestElement = null;
let foundCloseElement = false;

// array for saving a [windowsize, features] array with the last mouse positions
let queue = [];

//are used for drawing the squares that show current work
let lastInput = [];
let lastPrediction = [];

// the last recorded X and Y positions of the cursor
let clientX;
let clientY;
//the current width and height of the browser window(not the full window but the Class window)
let pageX;
let pageY;
// the current location of the window viewport, needed for moving the canvas otherwise it does not follow the scrolling of the page and is stuck up top.
let windowX;
let windowY;
//used in the mousetracking
let interval;

// we only send the queue with x and y coordinates every "PredictionInterval" to the service_worker
// this to limit load + making predictions every 0.003 seconds is useless+ might give lot's of false positives with slow mouse movements
// features => X,Y + possible other features, model dependant
let PredictionInterval = 2;
let PredictionIntervalCounter = 0;
let windowSize = 10;

let timeOut;
let working = false;
let mouseTrackingActive = true;
let visualsation = false;

//Canvas used for drawing input and prediction squares
let drawingCanvas;

const registerListeners = () => {
	// start interval when mouse moves in the window
	window.addEventListener('mousemove', handleMouseMove);

	// clear interval if mouse leaves window
	document.addEventListener('mouseleave', handleMouseLeave);
	// Update the top and left when scrolling so it according to viewport width & height
	window.addEventListener('scroll', getAllClickableItems);

	// Doesnt work all the time, should not be needed in this use case
	//window.addEventListener('beforeunload', handleBeforeUnload);
};
/**
 * register mouse movement in intervals and save it
 * also saves windowdimensions
 * if the window dimensions change, the canvas is deleted and redrawn
 */
const handleMouseMove = (e) => {
	if (pageX != window.innerWidth || pageY != window.innerHeight) {
		pageX = window.innerWidth;
		pageY = window.innerHeight;
		if (drawingCanvas) {
			drawingCanvas.remove();
		}
		createCanvas();
	}
	clientX = e.clientX;
	clientY = e.clientY;
	pageX = window.innerWidth;
	pageY = window.innerHeight;
	clearTimeout(timeOut);

	if (mouseTrackingActive) {
		timeOut = setTimeout(() => {
			working = false;
			clearInterval(interval);
		}, 40);

		if (working === false) {
			startInterval(interval);
			working = true;
		}
	}
};

const handleMouseLeave = () => {
	working = false;
	clearInterval(interval);
};

/**
 * return an object with the current mouse information
 * simplified compared to cursor.js version because the model ony needs x,y coordinates
 * @returns an array with the percentage X and Y coordinates
 */
const getCursorData = () => {
	const x = clientX / pageX;
	const y = clientY / pageY;
	return [x, y];
};

/**
 * every 0.003 seconds the x and y position is added to the queue
 * the queue is fifo by using shift and push, so only the last 'windowsize' coordinates are added
 *
 * if the queue ==  windowsize (the needed windowsize is dependent on the used model, not matching this will crash the model)
 * 		and enough timesteps have passed(PredictionInterval)
 * 		then sendMessage(queue) is used to send an array with X and Y coordinates to the service_worker who will send a prediction back
 * 		the prediction is received by a event listener further below
 */
const startInterval = () => {
	// if mouse tracking is active, start interval
	if (mouseTrackingActive && pageX != undefined && pageY != undefined) {
		interval = setInterval(async () => {
			if (queue.length >= windowSize) {
				queue.shift();
			}
			const cursor = getCursorData();
			queue.push(cursor);
			PredictionIntervalCounter += 1;
			if (PredictionIntervalCounter >= PredictionInterval && queue.length == windowSize) {
				const output = pointerPredictor.makePrediction(queue);
				lastInput = queue;
				lastPrediction = output;
				drawprediction(lastInput, lastPrediction);
				checkCloseElements(lastPrediction);
				PredictionIntervalCounter = 0;
			}
		}, 30);
	}
};

/**
 * Create a canvas for visualising the predictions
 * this canvas is also deleted and recreated at the current scroll position when a user scrolls on the page
 * otherwise the visualisations is borked/wrong(stuck up top at 0PX)
 */
function createCanvas() {
	const bodyElement = document.getElementsByTagName('body')[0];

	windowX = window.scrollX;
	windowY = window.scrollY;
	drawingCanvas = document.createElement('canvas');
	drawingCanvas.id = 'my-canvas';
	drawingCanvas.width = window.innerWidth;
	drawingCanvas.height = window.innerHeight;
	drawingCanvas.style.top = windowY + 'px';
	drawingCanvas.style.left = windowX + 'px';
	drawingCanvas.style.position = 'absolute';
	drawingCanvas.style.zIndex = 99990;
	drawingCanvas.style.pointerEvents = 'none';

	bodyElement.appendChild(drawingCanvas);
}

/**
 *
 * @param {[windowSize,features]} inputs the inputs used for the prediction
 * @param {[windowSize,features]} predictions the prediction made by the model
 * function loops over predictions and inputs and draws them on the canvas
 * Predictions are nested 1 layer deeper so predictions[0] contains the [windowsize,feature] array of predictions
 * input is coloured green, predictions are coloured red
 * canvas is made empty when a new set of input-prediction is given
 */
function drawprediction(inputs, predictions) {
	if (visualsation === true) {
		let canvasContext = drawingCanvas.getContext('2d');
		canvasContext.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
		inputs.forEach((input) => {
			point(input[0], input[1], canvasContext, false);
		});
		predictions[0].forEach((singlePred) => {
			point(singlePred[0], singlePred[1], canvasContext, true);
		});
	}
}
/**
 *
 * @param {float} x_co  containing x coordinate
 * @param {float} y_co  containing y coordinate
 * @param {context} cont the context of the canvas not sure why this works this way but it does, is supposedly the context
 * @param {Boolean} predBool denotes if the current values are a prediction or the input associated with it
 * the Model uses values betwoon 0 and 1 denoting the percentage of the screen
 * after inference these are multiplied with the Page X and y to return actual pixel values
 *
 */
function point(x_co, y_co, cont, predBool) {
	x_co = x_co * window.innerWidth;
	y_co = y_co * window.innerHeight;
	if (predBool == true) {
		cont.fillStyle = '#FF0000';
	} else {
		cont.fillStyle = '#00FF00';
	}
	cont.fillRect(x_co, y_co, 9, 9);
	cont.stroke();
}

const getAllClickableItems = () => {
	if (drawingCanvas) {
		drawingCanvas.remove();
	}
	createCanvas();
	elements = [];
	for (let i = 0; i < clickableItems.length; i++) {
		const item = clickableItems[i];
		const rect = item.getBoundingClientRect();
		const elementObj = {
			tag: item,
			left: rect.left,
			top: rect.top,
			className: item.className,
			width: rect.width,
			height: rect.height,
			title: item.textContent,
			href: item.href,
		};
		if (elementObj.left != 0 && elementObj.top != 0) {
			elements.push(elementObj);
			clickableItemsFiltered.push(clickableItems[i]);
		}
	}
};

/**
 *
 * @param {[windowSize,features] } prediction contains the mouse cursor prediction made by the aiModel
 * checks which clickable html elements lies closest to the end point of the prediction(windowsize - 1)
 */
const checkCloseElements = async (prediction) => {
	let xPosPredictionEndPoint = prediction[0][windowSize - 1][0] * window.innerWidth;
	let yPosPredictionEndPoint = prediction[0][windowSize - 1][1] * window.innerHeight;
	if (visualsation === true) {
		let canvasContext = drawingCanvas.getContext('2d');
		canvasContext.fillStyle = '#0000FF';
		canvasContext.fillRect(xPosPredictionEndPoint, yPosPredictionEndPoint, 9, 9);
		canvasContext.stroke();
	}

	let closestDistance;
	let closestElement;

	if (previousClosestElement)
		removeProperties(previousClosestElement, 'background-color', 'color', 'transform', 'z-index');
	foundCloseElement = false;
	for (let i = 0; i < elements.length; i++) {
		let element = elements[i];
		let elementPoints = [];

		const elementPosMiddle = [element.left + element.width / 2, element.top + element.height / 2];
		const elementTopLeft = [element.left, element.top];
		const elementBottomLeft = [element.left, element.bottom];
		const elementTopRight = [element.right, element.top];
		const elementBottomRight = [element.right, element.bottom];
		elementPoints.push(elementPosMiddle, elementTopLeft, elementBottomLeft, elementTopRight, elementBottomRight);

		for (let j = 0; j < elementPoints.length; j++) {
			const position = elementPoints[0];
			let distance = Math.sqrt(
				Math.pow(xPosPredictionEndPoint - position[0], 2) + Math.pow(yPosPredictionEndPoint - position[1], 2),
			);
			if (!closestElement) closestElement = element;
			if (!closestDistance) closestDistance = distance;
			if (!previousClosestElement) previousClosestElement = element;
			// Update everything when condition is met
			if (distance < closestDistance && distance < 100 && enabled) {
				foundCloseElement = true;
				closestDistance = distance;
				closestElement = element;
			}
		}
	}

	if (closestElement.tag && foundCloseElement) {
		if (visualsation === true) {
			closestElement.tag.style.cssText = `
			background-color:#52C287;
			color:white;
			z-index: 99999;
			`;
		}
		previousClosestElement = closestElement;
		await makeGravityWell();
	} else {
		removeProperties(closestElement, 'background-color', 'color', 'transform', 'z-index');
	}
	if (!enabled) removeProperties(closestElement, 'background-color', 'color', 'transform', 'z-index');
};

/**
 * this function creates a gravity well around the element that is closest to the endpoint of the prediction
 * it slows/ moves the cursor based on the distance to the object=> farther away greater gravity, closer lower gravity/ smaller mouse translations
 * the global variabel magnetstrength increases or decrease the strength of the magnetic / gravitywell effect
 * if the mouse is on top of the button(aka not in any of the checked zones around it), nothing happens
 */

async function makeGravityWell() {
	let element = previousClosestElement;
	const elementPosMiddle = [element.left + element.width / 2, element.top + element.height / 2];
	let distance = Math.sqrt(Math.pow(clientX - elementPosMiddle[0], 2) + Math.pow(clientY - elementPosMiddle[1], 2));
	let target_X = undefined;
	let target_Y = undefined;
	let heightOffset = window.outerHeight - window.innerHeight + 16;
	let diffX = Math.min(10, 0 + 1 * (Math.abs(elementPosMiddle[0] - clientX) / 100));
	let diffY = Math.min(10, 0 + 1 * (Math.abs(elementPosMiddle[1] - clientY) / 100));
	if (distance < 100) {
		if (clientX > element.left + element.width && clientY > element.top + element.height) {
			target_X = clientX - magnetstrength * (1 + diffX);
			target_Y = clientY + heightOffset - magnetstrength * (1 + diffY);
			//console.log("bottom right")
		} else if (clientX < element.left && clientY > element.top + element.height) {
			target_X = clientX + magnetstrength * (1 + diffX);
			target_Y = clientY + heightOffset - magnetstrength * (1 + diffY);
			//console.log("bottom left")
		} else if (clientX < element.left && clientY < element.top) {
			target_X = clientX + magnetstrength * (1 + diffX);
			target_Y = clientY + heightOffset + magnetstrength * (1 + diffY);
			//console.log("top left")
		} else if (clientX > element.left + element.width && clientY < element.top) {
			target_X = clientX - magnetstrength * (1 + diffX);
			target_Y = clientY + heightOffset + magnetstrength * (1 + diffY);
			//console.log("top right")
		} else if (clientX < element.left + element.width && clientY < element.top) {
			target_X = clientX;
			target_Y = clientY + heightOffset + magnetstrength * (1 + diffY);
			//console.log("top middle")
		} else if (clientX < element.left + element.width && clientY > element.top + element.height) {
			target_X = clientX;
			target_Y = clientY + heightOffset - magnetstrength * (1 + diffY);
			//console.log("bottom middle")
		} else if (clientX < element.left && clientY > element.top && clientY < element.top + element.height) {
			target_X = clientX + magnetstrength * (1 + diffX);
			target_Y = clientY + heightOffset;
			//console.log("left middle")
		} else if (
			clientX > element.left + element.width &&
			clientY > element.top &&
			clientY < element.top + element.height
		) {
			target_X = clientX - magnetstrength * (1 + diffX);
			target_Y = clientY + heightOffset;
			//console.log("right middle")
		}

		if (target_X != undefined && target_Y != undefined) {
			const target = new Point(target_X, target_Y);
			mouse.config.mouseSpeed = 2000000000;
			await mouse.move(straightTo(target));
		} else {
			//console.log('ontop of button')
		}
	}
}

const removeProperties = (element, ...properties) => {
	properties.forEach((property) => element.tag.style.removeProperty(property));
};

/**
 * Class used for generating pointer predictions
 * constructor is empty
 */
class PointerPredictor {
	// AI model used for predictions, is loaded by get model in contructor
	model;
	windowSize = 10;
	features = 2;
	//The model Must be saved on a server it seems, this is the url to it's location
	//thx ewout for your hosting services/ deprecated when used inside browser
	//inside the browser files can be used instead of hosting
	//modelUrl = "https://ewoutverhamme.be/aimodel/model.json"

	//dummy data used for debugging purposes
	dummyArray = [
		[0.235, 0.7322222],
		[0.235, 0.7322222],
		[0.236875, 0.7188889],
		[0.244375, 0.68666667],
		[0.25625, 0.6422222],
		[0.271875, 0.58444446],
		[0.29625, 0.5144445],
		[0.324375, 0.43222222],
		[0.3525, 0.35222223],
		[0.385625, 0.28111112],
	];
	constructor() {
		this.getModel();
	}
	/**tries to get model from the files
	 * uses the dummy data to check if it is working properly
	 */
	async getModel() {
		try {
			const handler = tfnode.io.fileSystem('app/scripts/gravityWell_1dcnn_bidirectional_small/model.json');
			this.model = await tf.loadLayersModel(handler);
		} catch (e) {
			throw new Error(e);
		}
	}
	/**
	 * @param {[windowSize,features] } coordinates A set of XY coordinates (and possibly features) in a [windowsize,features] array
	 * makes a tensor of the coordinates and makes a prediction
	 * sends prediction to sendPrediction Function
	 */
	makePrediction(coordinates) {
		const input = tf.expandDims(tf.tensor(coordinates, [this.windowSize, this.features]));
		if (!this.model) {
			this.getModel();
		}
		const prediction = this.model.predict(input).arraySync();
		return prediction;
	}
}

const init = () => {
	clickableItems = document.querySelectorAll('button ,a ,g-menu');
	registerListeners();
	startInterval();
	createCanvas();
	getAllClickableItems();
};
const pointerPredictor = new PointerPredictor();

init();
