const data = [
	{
		id: 1,
		id_name: 'radial-ui-goback',
		name: 'Go Back',
		icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>',
	},
	{
		id: 2,
		id_name: 'radial-ui-forward',
		name: 'Go Forward',
		icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>',
	},
	{
		id: 3,
		id_name: 'radial-ui-bookmark',
		name: 'Bookmark',
		icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>',
	},
	{
		id: 4,
		id_name: 'radial-ui-settings',
		name: 'Settings',
		icon: '<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.039 9.94527L19.3038 10.853L20.237 11.0055L22.5 11.3754V12.5926L20.2212 12.9927L19.2996 13.1545L19.0396 14.0534C18.8911 14.5669 18.6875 15.0604 18.4316 15.5264L17.9758 16.3565L18.5292 17.125L19.8686 18.9847L19.0087 19.8453L17.1218 18.5216L16.3524 17.9818L15.5311 18.4388C15.065 18.6981 14.5681 18.906 14.047 19.0594L13.156 19.3217L12.9937 20.2363L12.5917 22.5021H11.3715L10.9985 20.2623L10.8433 19.3302L9.93545 19.0677C9.41696 18.9179 8.91702 18.7114 8.44411 18.4513L7.62576 18.0013L6.86083 18.5371L4.99236 19.8458L4.12991 18.9827L5.44355 17.1453L5.99395 16.3754L5.53608 15.5472C5.27302 15.0713 5.06451 14.5698 4.9136 14.0496L4.65363 13.1535L3.7349 12.9906L1.5 12.5942V11.3732L3.72513 11.0027L4.65543 10.8478L4.91898 9.94226C5.07116 9.41936 5.27999 8.91733 5.54199 8.44312L5.99416 7.62474L5.45852 6.85839L4.15469 4.99298L5.01679 4.13088L6.86308 5.44966L7.6293 5.99697L8.45525 5.54479C8.92321 5.2886 9.42161 5.08374 9.94277 4.93391L10.8556 4.67146L11.0087 3.73406L11.3735 1.5H12.5901L12.9864 3.76206L13.1476 4.68257L14.0449 4.94357C14.5608 5.09361 15.0579 5.30025 15.5289 5.56062L16.3595 6.01975L17.1301 5.46586L18.9827 4.13426L19.843 4.99409L18.5149 6.88695L17.9785 7.65135L18.4277 8.47002C18.6842 8.93761 18.8891 9.43139 19.039 9.94527ZM23.3211 11.5096C23.3207 11.5096 23.3203 11.5095 23.32 11.5094L23.3208 11.5096L23.3211 11.5096ZM3.64857 19.6559C3.64833 19.6563 3.64808 19.6566 3.64784 19.657L3.64809 19.6566L3.64857 19.6559ZM24 13.414V10.5442L19.7464 16.2484C20.0558 15.6848 20.3016 15.089 20.4806 14.4701L23.5685 13.928C23.8184 13.8842 24 13.6671 24 13.414ZM6.84751 12.001C6.84751 14.8467 9.15435 17.1535 12 17.1535C14.8456 17.1535 17.1525 14.8467 17.1525 12.001C17.1525 9.1554 14.8456 6.84855 12 6.84855C9.15435 6.84855 6.84751 9.1554 6.84751 12.001Z" stroke="white" stroke-width="3"/></svg>',
	},
	{
		id: 5,
		id_name: 'radial-ui-text-size-up',
		name: 'text size up',
		icon: '<span>T+</span>',
	},
	{
		id: 6,
		id_name: 'radial-ui-text-size-down',
		name: 'text size down',
		icon: '<span>T-</span>',
	},

	{
		id: 7,
		id_name: 'radial-ui-paste',
		name: 'Paste',
		icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/></svg>',
	},
	{
		id: 8,
		id_name: 'radial-ui-copy',
		name: 'Copy',
		icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>',
	},
];

const menuSize = 300;

const createRadialUiHtml = (mouseX, mouseY, windowWidth, windowHeight, e) => {
	// const scope = document.body;
	// const { left: scopeOffsetX, top: scopeOffsetY } = scope.getBoundingClientRect();

	// const scopeX = mouseX - scopeOffsetX;
	// const scopeY = mouseY - scopeOffsetY;

	// // check if the element will go out of bounds
	// const outOfBoundsOnX = scopeX + menuSize > scope.clientWidth;
	// const outOfBoundsOnY = scopeY + menuSize > scope.clientHeight;

	// let normalizedX = mouseX;
	// let normalizedY = mouseY;

	// if (outOfBoundsOnX) {
	// 	normalizedX = scopeOffsetX + scope.clientWidth - menuSize;
	// }

	// if (outOfBoundsOnY) {
	// 	normalizedY = scopeOffsetY + scope.clientHeight - (menuSize + 15);
	// 	console.log(normalizedY);
	// }

	const radialMenu = document.createElement('div');
	radialMenu.id = 'radial-ui';
	radialMenu.style.position = 'fixed';
	radialMenu.style.zIndex = '9999';

	if (windowWidth - mouseX < menuSize) {
		radialMenu.style.left = windowWidth - (menuSize + 20) + 'px';
	} else {
		radialMenu.style.left = mouseX + 'px';
	}

	if (windowHeight - mouseY < menuSize) {
		radialMenu.style.top = windowHeight - (menuSize + 20) + 'px';

		// if (e.pageY > e.clientY) {
		// 	radialMenu.style.top = mouseY - menuSize + 'px';

		// 	if (e.pageY + 400 > document.body.getBoundingClientRect().height) {
		// 		radialMenu.style.top = e.pageY - 300 + 'px';
		// 	}
		// }
	} else {
		radialMenu.style.top = mouseY + 'px';
	}

	radialMenu.style.overflow = 'hidden';
	radialMenu.style.width = menuSize + 'px';
	radialMenu.style.height = menuSize + 'px';
	radialMenu.style.background = 'white';
	radialMenu.style.borderRadius = '50%';
	// radialMenu.style.left = normalizedX + 'px';
	// radialMenu.style.top = normalizedY + 'px';
	document.body.appendChild(radialMenu);

	const $items = data.length;
	const $size = 150;
	const $bgcolor = '#343A44';

	const $deg = 360 / $items;
	const $unrotate = -(90 - $deg) / 2;
	const $skew = 90 - $deg;

	const defaultStyleMask = `position: absolute;
  width: ${$size}px;height: ${$size}px;
  -webkit-transform-origin: 100% 100%;
  border: 1.5px solid transparent;
  overflow: hidden;
  box-sizing: border-box;
  display: none;`;

	const defaultStyleButton = `fill: white;
  color: white;
  padding: 0;
  padding-top: 10px;
  margin: 0;
  border: none;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: ${$size * 2}px;height: ${$size * 2}px;
  border-radius:50%;
  text-align: center;
  background: ${$bgcolor};
  font-size: 25px;
  cursor: pointer;
  transform: skew(${-$skew}deg) rotate(${-67.5}deg);`;

	const defaultStyleDiv = `
  margin: 0 !important;
  padding: 0 !important;
  position: relative;
  display: inline-block;
  width: ${$size * 2}px;
  height: ${$size * 2}px;">`;

	const $div = document.createElement('div');
	$div.style.cssText = defaultStyleDiv;
	radialMenu.appendChild($div);

	data.map((item, index) => {
		const $mask = document.createElement('div');
		$mask.style.cssText = defaultStyleMask;
		$mask.style.transform = `rotate(${$deg + 45 * index}deg) skew(${$skew}deg)`;
		$mask.style.display = 'block';

		const $button = document.createElement('button');
		$button.style.cssText = defaultStyleButton;
		$button.style.lineHeight = `50px`;
		$button.id = item.id_name;
		$button.innerHTML = item.icon;

		$mask.appendChild($button);
		$div.appendChild($mask);
	});

	const defaultStyleClose = `"${defaultStyleMask} width: 100px;
  border: 5px solid white;
  color: white;
  cursor: pointer;
  height: 100px;
  background: ${$bgcolor};
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: block;
  -webkit-transform-origin: 50% 50%; display: flex;
  align-items: center;
  justify-content: center;`;

	const $close = document.createElement('div');
	$close.id = 'radial-ui-close';
	$close.innerHTML = 'close';
	$close.style.cssText = defaultStyleClose;
	$div.appendChild($close);

	goBack();
	goForward();
	bookmark();
	copy();
	paste();
	closeRadial();
	textSizeDown();
	textSizeUp();
	settings();

	resizeListener();
};

const removeRadialUiHtml = () => {
	const container = document.getElementById('radial-ui');
	container.remove();
};

const contextListener = () => {
	window.addEventListener('contextmenu', (e) => {
		e.preventDefault();

		const menu = document.getElementById('radial-ui');
		if (!menu) {
			const mouseX = e.clientX;
			const mouseY = e.clientY;
			const windowWidth = window.innerWidth;
			const windowHeight = window.innerHeight;
			createRadialUiHtml(mouseX, mouseY, windowWidth, windowHeight, e);
		} else {
			removeRadialUiHtml();
		}
	});
};

const goBack = () => {
	const back = document.getElementById('radial-ui-goback');
	back.addEventListener('click', () => {
		history.back();
	});
};

const goForward = () => {
	const forward = document.getElementById('radial-ui-forward');
	forward.addEventListener('click', () => {
		history.forward();
	});
};

const bookmark = () => {
	const bookmark = document.getElementById('radial-ui-bookmark');
	bookmark.addEventListener('click', () => {
		const url = window.location.href;
		const title = document.title;
		// const favicon = document.querySelector('link[rel="shortcut icon"]').getAttribute('href');

		const bookmark = {
			url,
			title,
			// favicon,
		};

		// sent to database
		console.log(bookmark);
	});
};

const copy = () => {
	let text = '';

	if (window.getSelection) {
		text = window.getSelection().toString();
	} else if (document.selection && document.selection.type != 'Control') {
		text = document.selection.createRange().text;
	}

	if (text.length > 0) {
		const copy = document.getElementById('radial-ui-copy');
		copy.addEventListener('click', () => {
			navigator.clipboard.writeText(text);
			console.log('copy');
		});
	}
};

const paste = () => {
	const paste = document.getElementById('radial-ui-paste');
	paste.addEventListener('click', () => {
		navigator.clipboard.readText().then((clipText) => {
			document.execCommand('insertText', false, clipText);
		});
	});
};

const closeRadial = () => {
	const exit = document.getElementById('radial-ui-close');
	exit.addEventListener('click', () => {
		removeRadialUiHtml();
	});
};

const textSizeDown = () => {
	const textSizeDown = document.getElementById('radial-ui-text-size-down');
	textSizeDown.addEventListener('click', () => {
		const textSize = document.getElementsByTagName('body')[0].style.fontSize;
		const newTextSize = parseInt(textSize) - 2;
		document.getElementsByTagName('body')[0].style.fontSize = `${newTextSize}px`;
	});
};

const textSizeUp = () => {
	const textSizeUp = document.getElementById('radial-ui-text-size-up');
	textSizeUp.addEventListener('click', () => {
		const textSize = document.getElementsByTagName('body')[0].style.fontSize;
		const newTextSize = parseInt(textSize) + 2;
		document.getElementsByTagName('body')[0].style.fontSize = `${newTextSize}px`;
	});
};

const settings = () => {
	const settings = document.getElementById('radial-ui-settings');
	settings.addEventListener('click', () => {
		console.log('settings');
	});
};

const resizeListener = () => {
	window.addEventListener('resize', () => {
		if (document.getElementById('radial-ui')) {
			removeRadialUiHtml();
		}
	});
};

const init = () => {
	contextListener();
};

init();
