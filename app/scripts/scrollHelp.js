const { ipcRenderer } = require('electron');

ipcRenderer.send('getExtensionStates');

const overlay = `
<div class="wh-overlay" draggable="true" style="opacity: .7;cursor: pointer; position: fixed; right: 2rem; bottom: 2rem; z-index: 999; background-color: white; border: solid #205493 2px; display: flex; flex-direction: column; gap: 1rem; justify-content: center; align-items:center; padding: .8rem; border-radius: .5rem; width:90px; height:200px">
   <div class="wh-up" style="background-color: white; filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.1));  width: 50px; height: 50px; display: flex; justify-content: center; align-items:center; border-radius: 999px">
      <div>
         <svg width="37" height="22" viewBox="0 0 37 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.2315 8.21516C19.2641 7.28622 17.7359 7.28622 16.7685 8.21516L4.04892 20.4284C3.13439 21.3065 1.68986 21.3065 0.775332 20.4284V20.4284C-0.193275 19.4983 -0.193275 17.9491 0.775331 17.0191L16.7685 1.66258C17.7359 0.73364 19.2641 0.73364 20.2315 1.66258L36.2247 17.0191C37.1933 17.9491 37.1933 19.4983 36.2247 20.4284V20.4284C35.3101 21.3065 33.8656 21.3065 32.9511 20.4284L20.2315 8.21516Z" fill="#343A44"/>
         </svg>
      </div>
   </div>
   <div style="width:1.5rem; height:1.5rem;" ><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6.5 8a.5.5 0 00-.5-.5H1.5a.5.5 0 000 1H6a.5.5 0 00.5-.5z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M3.854 5.646a.5.5 0 00-.708 0l-2 2a.5.5 0 000 .708l2 2a.5.5 0 00.708-.708L2.207 8l1.647-1.646a.5.5 0 000-.708zM9.5 8a.5.5 0 01.5-.5h4.5a.5.5 0 010 1H10a.5.5 0 01-.5-.5z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M12.146 5.646a.5.5 0 01.708 0l2 2a.5.5 0 010 .708l-2 2a.5.5 0 01-.708-.708L13.793 8l-1.647-1.646a.5.5 0 010-.708zM8 9.5a.5.5 0 00-.5.5v4.5a.5.5 0 001 0V10a.5.5 0 00-.5-.5z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M5.646 12.146a.5.5 0 000 .708l2 2a.5.5 0 00.708 0l2-2a.5.5 0 00-.708-.708L8 13.793l-1.646-1.647a.5.5 0 00-.708 0zM8 6.5a.5.5 0 01-.5-.5V1.5a.5.5 0 011 0V6a.5.5 0 01-.5.5z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M5.646 3.854a.5.5 0 010-.708l2-2a.5.5 0 01.708 0l2 2a.5.5 0 01-.708.708L8 2.207 6.354 3.854a.5.5 0 01-.708 0z" clip-rule="evenodd"></path></svg></div>
   <div class="wh-down" style="cursor: pointer; background-color: white; filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.1));  width: 50px; height: 50px; display: flex; justify-content: center; align-items:center; border-radius: 999px">
      <div
         style="display: flex; align-items: center;">
         <svg width="37" height="22" viewBox="0 0 37 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.7685 13.7848C17.7359 14.7138 19.2641 14.7138 20.2315 13.7848L32.9511 1.57163C33.8656 0.693509 35.3101 0.69351 36.2247 1.57163V1.57163C37.1933 2.50168 37.1933 4.0509 36.2247 4.98095L20.2315 20.3374C19.2641 21.2664 17.7359 21.2664 16.7685 20.3374L0.775332 4.98095C-0.193275 4.0509 -0.193275 2.50168 0.775331 1.57163V1.57163C1.68986 0.69351 3.13439 0.69351 4.04892 1.57163L16.7685 13.7848Z" fill="#343A44"/>
         </svg>
      </div>
   </div>
</div>
`;

let interval;
let dragged;

let scrollHelpPosX;
let scrollHelpPosY;

const handleSetInterval = (scrollDir) => {
	interval = setInterval(() => {
		window.scrollBy(0, scrollDir);
	}, 10);
};

const handleOnMouseLeave = () => {
	clearInterval(interval);
};

const registerListerners = () => {
	const up = document.querySelector('.wh-up');
	const overlay = document.querySelector('.wh-overlay');
	const down = document.querySelector('.wh-down');

	if (scrollHelpPosX && scrollHelpPosY) {
		overlay.style.top = scrollHelpPosY;
		overlay.style.left = scrollHelpPosX;
	}

	overlay.addEventListener('mouseenter', () => {
		overlay.style.opacity = '1';
	});
	overlay.addEventListener('mouseleave', () => {
		overlay.style.opacity = '.7';
	});

	up.addEventListener('mouseenter', () => {
		handleSetInterval(-10);
	});

	up.addEventListener('mouseleave', () => {
		handleOnMouseLeave();
	});

	document.addEventListener('dragstart', (e) => (dragged = e.target));
	document.addEventListener('dragover', (e) => e.preventDefault());

	document.addEventListener('drop', (e) => {
		e.preventDefault();
		dragged.style.opacity = '1';

		const { clientX: mouseX, clientY: mouseY } = e;
		const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
		const menuHeight = 200;
		const menuWidth = 90;

		if (windowWidth - mouseX < menuWidth) {
			dragged.style.left = windowWidth - (menuWidth + 10) + 'px';
		} else if (mouseX < menuWidth) {
			dragged.style.left = '10px';
		} else {
			dragged.style.left = mouseX - menuWidth / 2 + 'px';
		}

		if (windowHeight - mouseY < menuHeight) {
			dragged.style.top = windowHeight - (menuHeight + 10) + 'px';
		} else if (mouseY < menuHeight) {
			dragged.style.top = '10px';
		} else {
			dragged.style.top = mouseY - menuHeight / 2 + 'px';
		}

		// Send data to React
		const top = dragged.style.top;
		const left = dragged.style.left;
		ipcRenderer.send('setLatestOverlayLocation', top, left);
	});

	down.addEventListener('mouseenter', () => {
		handleSetInterval(10);
	});

	down.addEventListener('mouseleave', () => {
		handleOnMouseLeave();
	});
};

ipcRenderer.on('extensionStatesReply', (event, payload) => {
	if (payload.scrollHelp) {
		createOverlay();
	} else {
		deleteOverlay();
	}

	if (payload.scrollHelpPosition) {
		scrollHelpPosX = payload.scrollHelpPosition.left;
		scrollHelpPosY = payload.scrollHelpPosition.top;
	}
});

const createOverlay = () => {
	if (!document.getElementById('scrollhelp-overlay')) {
		const container = document.createElement('div');
		container.id = 'scrollhelp-overlay';
		container.innerHTML = overlay;
		// This needs some delay to prevent error
		setTimeout(() => {
			document.body.appendChild(container);
			registerListerners();
		}, 500);
	}
};

const deleteOverlay = () => {
	const overlay = document.getElementById('scrollhelp-overlay');
	if (overlay) {
		document.removeEventListener('mouseenter', registerListerners());
		document.removeEventListener('mouseleave', registerListerners());
		overlay.remove();
	}
};
