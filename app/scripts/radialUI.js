const { ipcRenderer } = require('electron');

ipcRenderer.send('getExtensionStates');

const data = [
	{
		id: 1,
		id_name: 'radial-ui-goback',
		name: 'Terug',
		icon: '<svg class="radial-ui-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>',
	},
	{
		id: 2,
		id_name: 'radial-ui-forward',
		name: 'Volgende',
		icon: '<svg class="radial-ui-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>',
	},
	{
		id: 3,
		id_name: 'radial-ui-bookmark',
		name: 'Bladwijzer',
		icon: '<svg class="radial-ui-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>',
	},
	{
		id: 4,
		id_name: 'radial-ui-dashboard',
		name: 'Dashboard',
		icon: '<svg class="radial-ui-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/><path d="M0 0h24v24H0z" fill="none"/></svg>',
	},
	{
		id: 5,
		id_name: 'radial-ui-searchbar',
		name: 'Zoeken',
		icon: '<svg class="radial-ui-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/><path d="M0 0h24v24H0z" fill="none"/></svg>',
	},
	{
		id: 6,
		id_name: 'radial-ui-extension',
		name: 'Brainweb',
		icon: '<svg class="radial-ui-icon" width="51" height="42" viewBox="0 0 51 42" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M43.055 20.4885c2.3704.4815 4.2778 1.6111 5.7223 3.3889 1.4815 1.7778 2.2222 3.8519 2.2222 6.2223 0 3.2593-1.0926 5.8519-3.2778 7.7779-2.1852 1.8889-5.3519 2.8333-9.5001 2.8333H22.6104V1.48828h15.3335c3.9259 0 6.926.8889 9 2.66669 2.1112 1.74077 3.1667 4.1482 3.1667 7.22233 0 2.4815-.6481 4.5-1.9444 6.0556-1.2963 1.5185-3.0001 2.5371-5.1112 3.0556Zm-14.1112-2.1111h7.8334c2.2222 0 3.9074-.5186 5.0556-1.5556 1.1852-1.0371 1.7778-2.4815 1.7778-4.3334 0-1.8148-.5926-3.24078-1.7778-4.27783C40.6846 7.17353 38.9253 6.655 36.5549 6.655h-7.6111v11.7224Zm8 17.1112c2.4075 0 4.2593-.537 5.5557-1.6111 1.3333-1.1111 2-2.6482 2-4.6111 0-1.963-.6667-3.5001-2-4.6112-1.3334-1.1111-3.2038-1.6667-5.6112-1.6667h-7.9445v12.5001h8Z" fill="#fff"/><path d="M18.1596 41.8025c-1.2097 0-2.7302-.1383-4.0066-.686-1.9042-.8176-3.1502-2.4777-3.7108-3.3674-1.25847-.2998-3.91311-1.1753-5.06817-3.3891-1.05985-2.0315-.64199-4.9034-.32099-6.365C3.57911 26.7768.502467 23.8571.596849 20.7829c.093673-3.0514 3.277471-5.6607 4.850381-6.7668-.29-1.4695-.64565-4.26194.30823-6.19429 1.03181-2.09037 3.41017-2.90007 4.62994-3.18605.5365-1.00438 1.7458-2.83998 3.7665-3.709528C16.7736-.20186 20.4337.426174 20.8424.501514c.3459.063843.6524.26241.852.552066.1996.28966.276.64672.2125.9927-.0636.34621-.2619.65304-.5515.85311-.2896.20008-.6468.27703-.9931.21395-.8943-.16274-3.565-.43453-5.1609.25216-1.772.76251-2.6678 2.91639-2.6764 2.93791l-.2888.7275-.7806.1003c-.712.09142-2.69659.60485-3.31859 1.86576-.62567 1.26753-.27605 3.90713.09119 5.27333l.25807.9602-.84944.5204c-1.11792.6824-4.32324 3.0869-4.38546 5.1137-.06268 2.043 3.00415 4.7561 4.0828 5.5453l.75328.5509-.26268.8978c-.26599.9053-.85571 3.8171-.09639 5.2724.71378 1.3681 3.01592 2.0074 3.76582 2.1235l.6736.1042.3102.6125c.0099.0197 1.0135 1.9705 2.7229 2.7046 1.5076.6475 3.8991.4785 4.6933.3587.3482-.0532.7033.0341.9871.2427.2838.2086.4731.5214.5263.8696.0532.3481-.0341.7032-.2426.987-.2086.2838-.5214.4732-.8696.5264-.7077.0971-1.4214.1447-2.1358.1423Z" fill="#D49F90"/><path d="M19.0504 36.4703c-.2348 0-.4599-.0933-.6259-.2593-.166-.166-.2593-.3911-.2593-.6259v-.9648l-.6287-.9156h-5.9587l-.2462-.2052c-.3015-.2593-.58-.5442-.8324-.8516-.60813-.7399-.91658-1.4525-.91658-2.1176 0-.6845.31933-1.3778.94998-2.0607.2602-.2819.5476-.5373.8581-.7625l.2286-.1601h6.0556c.19-.1705.3704-.3514.5405-.5418.4552-.5136.6168-.888.6168-1.0526 0-.1357-.1369-.3976-.5204-.7258-.171-.1445-.3529-.2754-.5441-.3916H7.10254l-.26505-.3116c-.11922-.14-1.16464-1.4104-1.16464-2.8622 0-1.4325 1.02531-2.7813 1.14228-2.9303l.26589-.3389H17.6926c.4476-.3812 1.0923-1.063 1.1434-1.5849.0459-.4686-.3917-1.1148-.7343-1.5078h-6.4932l-.2337-.1714c-.1834-.1345-1.79218-1.359-1.79218-2.9072 0-.6785.30467-1.4085.90558-2.1697.2507-.31792.5285-.61349.8303-.88337l.2496-.2162h6.645c.1856-.13399.3389-.30775.4487-.50858.1039-.2162.0274-.72371-.0448-.94701-.0357-.11063-.0493-.22721-.0399-.34308.0093-.11588.0414-.22878.0943-.33226.053-.10348.1259-.19551.2144-.27084.0885-.07533.191-.13248.3017-.16819.2234-.07212.4663-.05253.6753.05444.209.10698.3669.29258.4391.51599.0721.23693.1232.47979.1525.72573.0719.59538.0056 1.11106-.1973 1.5327-.4209.87527-1.2604 1.35197-1.3547 1.40347l-.1982.1082h-6.4535c-.4209.4306-.8977 1.0785-.8977 1.4989 0 .4093.4825.9731.8591 1.3082h6.6145l.2549.2372c.1717.1599 1.6738 1.6086 1.5164 3.2139-.1538 1.5647-1.8775 2.8685-2.0735 3.012l-.2334.171H7.97752c-.24163.3934-.53471.9907-.53471 1.4988 0 .4947.28386 1.0477.51579 1.4036h10.2569l.1905.098c.3637.1946.7064.4261 1.0226.6909.7785.6545 1.1732 1.3607 1.1732 2.099 0 .6889-.3643 1.4459-1.0829 2.2498-.2983.3321-.6218.6408-.9676.9231l-.2415.1914h-6.1091c-.4046.3416-.8477.8652-.8477 1.2127 0 .0865.0371.414.5139.9935.1183.1431.2439.28.3764.41h6.2239l1.4686 2.1362v1.5147c0 .1163-.0229.2314-.0674.3388s-.1097.205-.1919.2872c-.0823.0822-.1799.1474-.2873.1919-.1074.0445-.2225.0673-.3388.0673Z" fill="#D49F90"/></svg>',
	},

	{
		id: 7,
		id_name: 'radial-ui-paste',
		name: 'Plakken',
		icon: '<svg class="radial-ui-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/></svg>',
	},
	{
		id: 8,
		id_name: 'radial-ui-copy',
		name: 'Kopiëren',
		icon: '<svg class="radial-ui-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>',
	},
];

ipcRenderer.on('extensionStatesReply', (event, payload) => {
	if (payload.radialUI) {
		contextListener();
	} else {
		window.removeEventListener('contextmenu', contextMenuHandler);
	}
});

const font = document.createElement('link');

const createRadialUiHtml = (e) => {
	const menuSize = 300;
	const $items = data.length;
	const $size = 150;
	const $bgcolor = 'rgb(52 58 68 / 50%)';
	const $bgColorClose = '#343A44';
	const $deg = 360 / $items;
	let $unrotate = (90 - $deg) / 2;
	const $skew = 90 - $deg;
	const { clientX: mouseX, clientY: mouseY } = e;
	const { innerWidth: windowWidth, innerHeight: windowHeight } = window;

	font.setAttribute('rel', 'stylesheet');
	font.setAttribute('type', 'text/css');
	font.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;700&display=swap');
	document.head.appendChild(font);

	const radialMenu = document.createElement('div');
	radialMenu.id = 'radial-ui';
	radialMenu.style.position = 'fixed';
	radialMenu.style.fontFamily = 'Mulish';
	radialMenu.style.zIndex = '9999';
	radialMenu.style.overflow = 'hidden';
	radialMenu.style.width = menuSize + 'px';
	radialMenu.style.height = menuSize + 'px';
	radialMenu.style.borderRadius = '50%';
	radialMenu.addEventListener('mouseleave', () => {
		$closeIcon.innerHTML = closeIconSVG;
	});

	if (windowWidth - mouseX < menuSize) {
		radialMenu.style.left = windowWidth - (menuSize + 20) + 'px';
	} else if (mouseX < menuSize) {
		radialMenu.style.left = '20px';
	} else {
		radialMenu.style.left = mouseX - menuSize / 2 + 'px';
	}

	if (windowHeight - mouseY < menuSize) {
		radialMenu.style.top = windowHeight - (menuSize + 20) + 'px';
	} else if (mouseY < menuSize) {
		radialMenu.style.top = '20px';
	} else {
		radialMenu.style.top = mouseY - menuSize / 2 + 'px';
	}
	document.body.appendChild(radialMenu);

	const defaultStyleMask = `position: absolute;
  width: ${$size}px;height: ${$size}px;
  -webkit-transform-origin: 100% 100%;
  border: 1.5px solid transparent;
  overflow: hidden;
  box-sizing: border-box;
  font-family: Mulish;
  display: none;`;

	const defaultStyleButton = `fill: white;
  font-family: Mulish;
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
  font-family: Mulish;
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
			$closeIcon.innerHTML = item.name;
		});

		$button.addEventListener('mouseleave', () => {
			$button.style.background = $bgcolor;
			$button.style.border = '2px solid white';
		});

		$mask.appendChild($button);
		$div.appendChild($mask);
	});

	const defaultStyleClose = `"${defaultStyleMask} width: 100px;
  font-family: Mulish;
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
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  background: ${$bgColorClose};
  justify-content: center;`;

	const $close = document.createElement('button');
	$close.id = 'radial-ui-close';
	$close.style.cssText = defaultStyleClose;
	$close.addEventListener('mouseenter', () => {
		$close.style.transform = 'translate(-50%, -50%) scale(1.2)';
		$close.style.border = '5px solid #205493';
		$closeIcon.innerHTML = closeIconSVG;
	});
	$close.addEventListener('mouseleave', () => {
		$close.style.transform = 'translate(-50%, -50%) scale(1)';
		$close.style.border = '3px solid white';
		$closeIcon.innerHTML = closeIconSVG;
	});
	$div.appendChild($close);

	// Close icon
	const $closeIcon = document.createElement('div');
	const closeIconSVG =
		'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';
	$closeIcon.innerHTML = closeIconSVG;
	$closeIcon.style.fill = 'white';
	$closeIcon.style.fontSize = '16px';
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
	if (font) font.remove();
	if (container) container.remove();
};

const contextListener = () => {
	window.addEventListener('contextmenu', contextMenuHandler);
};

const contextMenuHandler = (e) => {
	e.preventDefault();

	const menu = document.getElementById('radial-ui');
	if (!menu) {
		createRadialUiHtml(e);
	} else {
		removeRadialUiHtml();
	}
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
		const title = document.title.replaceAll('/', '-');

		const rootUrl = window.location.origin;
		const favicon = rootUrl + '/favicon.ico';

		const bookmark = {
			url,
			title,
			favicon,
		};

		ipcRenderer.send('bookmark', bookmark);
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
		ipcRenderer.send('toggleExtensionRadial');
	});
};

const search = () => {
	const search = document.getElementById('radial-ui-searchbar');
	search.addEventListener('click', () => {
		ipcRenderer.send('focusSearchBarRadialUi');
	});
};

const dashboard = () => {
	const dashboard = document.getElementById('radial-ui-dashboard');
	dashboard.addEventListener('click', () => {
		ipcRenderer.send('toggleDashboard');
	});
};

const resizeListener = () => {
	window.addEventListener('resize', () => {
		if (document.getElementById('radial-ui')) {
			removeRadialUiHtml();
		}
	});
};
