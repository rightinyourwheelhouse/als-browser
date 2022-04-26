const data = [
	{
		id: 1,
		id_name: 'radial-ui-goback',
		name: 'Go Back',
		icon: '<svg class="radial-ui-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>',
	},
	{
		id: 2,
		id_name: 'radial-ui-forward',
		name: 'Go Forward',
		icon: '<svg class="radial-ui-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>',
	},
	{
		id: 3,
		id_name: 'radial-ui-bookmark',
		name: 'Bookmark',
		icon: '<svg class="radial-ui-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>',
	},
	{
		id: 4,
		id_name: 'radial-ui-dashboard',
		name: 'Dashboard',
		icon: '<svg class="radial-ui-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>',
	},
	{
		id: 5,
		id_name: 'radial-ui-searchbar',
		name: 'Search Bar',
		icon: '<svg class="radial-ui-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/><path d="M0 0h24v24H0z" fill="none"/></svg>',
	},
	{
		id: 6,
		id_name: 'radial-ui-extension',
		name: 'Extension',
		icon: '<svg class="radial-ui-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',
	},

	{
		id: 7,
		id_name: 'radial-ui-paste',
		name: 'Paste',
		icon: '<svg class="radial-ui-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/></svg>',
	},
	{
		id: 8,
		id_name: 'radial-ui-copy',
		name: 'Copy',
		icon: '<svg class="radial-ui-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>',
	},
];

const menuSize = 300;

const createRadialUiHtml = (e) => {
	const { clientX: mouseX, clientY: mouseY } = e;
	const { innerWidth: windowWidth, innerHeight: windowHeight } = window;

	const radialMenu = document.createElement('div');
	radialMenu.id = 'radial-ui';
	radialMenu.style.position = 'fixed';
	radialMenu.style.zIndex = '9999';
	radialMenu.style.overflow = 'hidden';
	radialMenu.style.width = menuSize + 'px';
	radialMenu.style.height = menuSize + 'px';
	radialMenu.style.borderRadius = '50%';

	if (windowWidth - mouseX < menuSize) {
		radialMenu.style.left = windowWidth - (menuSize + 20) + 'px';
	} else {
		radialMenu.style.left = mouseX + 'px';
	}

	if (windowHeight - mouseY < menuSize) {
		radialMenu.style.top = windowHeight - (menuSize + 20) + 'px';
	} else {
		radialMenu.style.top = mouseY + 'px';
	}

	document.body.appendChild(radialMenu);

	const $items = data.length;
	const $size = 150;
	const $bgcolor = 'rgb(52 58 68 / 50%)';
	const $bgColorClose = '#343A44';

	const $deg = 360 / $items;
	let $unrotate = (90 - $deg) / 2;
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
  border: 2px solid white;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: ${$size * 2}px;
  height: ${$size * 2}px;
  border-radius:50%;
  text-align: center;
  background: ${$bgcolor};
  font-size: 25px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
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
		$button.id = item.id_name;
		$button.innerHTML = item.icon;

		// $button hover
		$button.addEventListener('mouseenter', () => {
			$button.style.background = '#343A44';
			$button.style.border = '2px solid #205493';
		});

		$button.addEventListener('mouseleave', () => {
			$button.style.background = $bgcolor;
			$button.style.border = '2px solid white';
		});

		$mask.appendChild($button);
		$div.appendChild($mask);
	});

	const defaultStyleClose = `"${defaultStyleMask} width: 100px;
  border: 3px solid white;
  color: white;
  cursor: pointer;
  height: 100px;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: block;
  -webkit-transform-origin: 50% 50%; display: flex;
  align-items: center;
  transition: all 0.2s ease-in-out;
  background: ${$bgColorClose};
  justify-content: center;`;

	const $close = document.createElement('button');
	$close.id = 'radial-ui-close';
	$close.style.color = 'white';
	$close.style.cssText = defaultStyleClose;
	$close.addEventListener('mouseenter', () => {
		$close.style.transform = 'translate(-50%, -50%) scale(1.2)';
		$close.style.border = '5px solid #205493';
	});
	$close.addEventListener('mouseleave', () => {
		$close.style.transform = 'translate(-50%, -50%) scale(1)';
		$close.style.border = '3px solid white';
	});
	$div.appendChild($close);

	const $closeIcon = document.createElement('div');
	$closeIcon.innerHTML = '&times;';
	$closeIcon.style.fontSize = '50px';
	$closeIcon.style.fontWeight = 'light';
	$closeIcon.style.color = 'white';
	$close.appendChild($closeIcon);

	const $radialUiIcon = document.querySelectorAll('.radial-ui-icon');
	$radialUiIcon.forEach((item) => {
		item.style.height = '24px';
		item.style.width = '24px';
		item.style.transform = `rotate(${$unrotate}deg)`;
		$unrotate += -$deg;
	});

	goBack();
	goForward();
	bookmark();
	copy();
	paste();
	closeRadial();
	extension();
	search();
	dashboard();
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
			createRadialUiHtml(e);
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

const extension = () => {
	const extension = document.getElementById('radial-ui-extension');
	extension.addEventListener('click', () => {
		console.log('extension');
	});
};

const search = () => {
	const search = document.getElementById('radial-ui-searchbar');
	search.addEventListener('click', () => {
		console.log('search');
	});
};

const dashboard = () => {
	const dashboard = document.getElementById('radial-ui-dashboard');
	dashboard.addEventListener('click', () => {
		console.log('dashboard');
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
