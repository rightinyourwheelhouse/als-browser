function createRadialUiHtml() {
	const radialMenu = document.createElement('div');
	radialMenu.id = 'radial-ui';
	document.body.appendChild(radialMenu);

	// add html to radial menu
	const radialMenuHTML = `
      <button id='radial-ui-goback' class="radial-ui-container" style="background: red; height: 5rem; width: 5rem; position: fixed; top: 0; left: 0; z-index: 999;">
      Go back
      </button>
      <button id='radial-ui-forward' class="radial-ui-container" style="background: red; height: 5rem; width: 5rem; position: fixed; top: 0; left: 5.5rem; z-index: 999;">
      Go forward
      </button>
       <button id='radial-ui-copy' class="radial-ui-container" style="background: red; height: 5rem; width: 5rem; position: fixed; top: 5.5rem; left: 0rem; z-index: 999;">
      Copy
      </button>
       <button id='radial-ui-paste' class="radial-ui-container" style="background: red; height: 5rem; width: 5rem; position: fixed; top: 5.5rem; left: 5.5rem; z-index: 999;">
      Paste
      </button>

    `;

	radialMenu.innerHTML = radialMenuHTML;

	const back = document.getElementById('radial-ui-goback');

	back.addEventListener('click', () => {
		history.back();
	});

	const forward = document.getElementById('radial-ui-forward');
	forward.addEventListener('click', () => {
		history.forward();
	});

	let text = getSelectionText();
	if (text.length > 0) {
		// add to clipboard
		const copy = document.getElementById('radial-ui-copy');
		copy.addEventListener('click', () => {
			navigator.clipboard.writeText(text);
		});
	}

	const paste = document.getElementById('radial-ui-paste');
	paste.addEventListener('click', () => {
		navigator.clipboard.readText().then((clipText) => {
			document.execCommand('insertText', false, clipText);
		});
	});
}

function removeRadialUiHtml() {
	const container = document.getElementById('radial-ui');
	container.remove();
}

function getSelectionText() {
	let text = '';
	if (window.getSelection) {
		text = window.getSelection().toString();
	} else if (document.selection && document.selection.type != 'Control') {
		text = document.selection.createRange().text;
	}
	return text;
}

window.addEventListener('contextmenu', (e) => {
	if (!document.getElementById('radial-ui')) {
		createRadialUiHtml();
	} else {
		removeRadialUiHtml();
	}
});
