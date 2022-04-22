const menuSize = 400;

function createRadialUiHtml(mouseX, mouseY, windowWidth, windowHeight) {
	const radialMenu = document.createElement('div');
	radialMenu.id = 'radial-ui';
	radialMenu.style.position = 'absolute';
	radialMenu.style.zIndex = '9999';

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

	radialMenu.style.overflow = 'hidden';

	radialMenu.style.width = menuSize + 'px';
	radialMenu.style.height = menuSize + 'px';
	radialMenu.style.background = 'white';
	radialMenu.style.borderRadius = '50%';
	document.body.appendChild(radialMenu);

	const $items = 8;
	const $size = 200;
	const $bgcolor = '#343A44';

	const $deg = 360 / $items;
	const $unrotate = -(90 - $deg) / 2;
	const $skew = 90 - $deg;

	const defaultStyleLi = `position: absolute;
    width: ${$size}px;height: ${$size}px;
    -webkit-transform-origin: 100% 100%;
    border: 1.5px solid transparent;
    overflow: hidden;
    box-sizing: border-box;
    display: none;`;

	const defaultStyleA = `color: white;
      display: block;
      width: ${$size * 2}px;height: ${$size * 2}px;
      border-radius:50%;
      text-align: center;
      background: ${$bgcolor};
      font-size: 25px;`;

	// add html to radial menu
	const radialMenuHTML = `
    
     
<div 
  list-style-type: none;
  margin: 0 !important;
  padding: 0 !important;
  position: relative;
  display: inline-block;
  width: ${$size * 2}px;
  height: ${$size * 2}px;">
  
  <li style="${defaultStyleLi} display: block; 
	 transform: rotate(45deg) skew(45deg);">
    <a id="radial-ui-goback" href="#" style="${defaultStyleA} line-height: 50px; 
	 transform: skew(-45deg) rotate(-67.5deg); ">
      Back
    </a>
  </li>

  <li style="${defaultStyleLi} display: block; 
	 transform: rotate(90deg) skew(45deg);">
    <a id="radial-ui-forward" href="#" style="${defaultStyleA} line-height: 50px;
	 transform: skew(-45deg) rotate(-67.5deg);">
      Forward
    </a>
  </li>
  <li style="${defaultStyleLi} display: block;
	 transform: rotate(135deg) skew(45deg);">
    <a id="radial-ui-bookmark" href="#" style="${defaultStyleA} line-height: 50px; 
	 transform: skew(-45deg) rotate(-67.5deg);">
      Bookmark
    </a>
  </li>
  <li style="${defaultStyleLi} display: block;
	 transform: rotate(180deg) skew(45deg);">
    <a href="#" style="${defaultStyleA} line-height: 50px; 
	 transform: skew(-45deg) rotate(-67.5deg);">
      Settings
    </a>
  </li>
  <li style="${defaultStyleLi} display: block;
	 transform: rotate(225deg) skew(45deg);">
    <a href="#" style="${defaultStyleA} line-height: 50px; 
	 transform: skew(-45deg) rotate(-67.5deg);">
      Text Size +
    </a>
  </li>
  <li style="${defaultStyleLi} display: block;
	 transform: rotate(270deg) skew(45deg);">
    <a href="#" style="${defaultStyleA} line-height: 50px;
	 transform: skew(-45deg) rotate(-67.5deg);">
      Text Size -
    </a>
  </li>
   <li style="${defaultStyleLi} display: block;
	 transform: rotate(315deg) skew(45deg);">
    <a id="radial-ui-paste" href="#" style="${defaultStyleA} line-height: 50px;
	 transform: skew(-45deg) rotate(-67.5deg);">
      Paste
    </a>
  </li>
   <li style="${defaultStyleLi} display: block;
	 transform: rotate(360deg) skew(45deg);">
    <a id="radial-ui-copy" href="#" style="${defaultStyleA} line-height: 50px;
	 transform: skew(-45deg) rotate(-67.5deg);">
     Copy
    </a>
  </li>
  <li id="radial-ui-close" class="close" style="${defaultStyleLi} width: 175px;
      border: 5px solid white;
      height: 175px;
      background: ${$bgcolor};
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: block;
      -webkit-transform-origin: 50% 50%; display: flex;
    align-items: center;
    justify-content: center;">
    <a href="#" style="background: ${$bgcolor};
      font-size: 25px; color: white">
      Close
    </a>
  </li>
  
</ul>


    `;

	radialMenu.innerHTML = radialMenuHTML;

	goBack();
	goForward();
	bookmark();
	copy();
	paste();
	closeRadial();
	resizeListener();
}

function removeRadialUiHtml() {
	const container = document.getElementById('radial-ui');
	container.remove();
}

window.addEventListener('contextmenu', (e) => {
	const menu = document.getElementById('radial-ui');
	if (!menu) {
		const mouseX = e.pageX;
		const mouseY = e.pageY;
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;
		createRadialUiHtml(mouseX, mouseY, windowWidth, windowHeight);
	} else {
		removeRadialUiHtml();
	}
});

function goBack() {
	const back = document.getElementById('radial-ui-goback');
	back.addEventListener('click', () => {
		history.back();
	});
}

function goForward() {
	const forward = document.getElementById('radial-ui-forward');
	forward.addEventListener('click', () => {
		history.forward();
	});
}

function bookmark() {
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
}

function copy() {
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
}

function paste() {
	const paste = document.getElementById('radial-ui-paste');
	paste.addEventListener('click', () => {
		navigator.clipboard.readText().then((clipText) => {
			document.execCommand('insertText', false, clipText);
		});
	});
}

function closeRadial() {
	const exit = document.getElementById('radial-ui-close');
	exit.addEventListener('click', () => {
		removeRadialUiHtml();
	});
}

function resizeListener() {
	window.addEventListener('resize', () => {
		if (document.getElementById('radial-ui')) {
			removeRadialUiHtml();
		}
	});
}
