const { ipcRenderer } = require('electron');

ipcRenderer.send('getExtensionStates');

ipcRenderer.on('extensionStatesReply', (event, payload) => {
	console.log(payload);
	if (payload.scrollHelp) {
		createOverlay();
	} else {
		deleteOverlay();
	}

	if (payload.scrollHelpPosition && container) {
		container.style.left = payload.scrollHelpPosition.left;
		container.style.top = payload.scrollHelpPosition.top;
	}

	if (payload.scrollSpeed) scrollSpeed = payload.scrollSpeed;
});

const overlay = `
<div class="wh-overlay" draggable="true" style="cursor: pointer; z-index: 999; background-color: white; border: solid #205493 2px; display: flex; flex-direction: column; gap: 1rem; justify-content: center; align-items:center; padding: .8rem; border-radius: .5rem; width:90px; height:200px">
   <div class="wh-up" style="background-color: white; filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.1));  width: 50px; height: 50px; display: flex; justify-content: center; align-items:center; border-radius: 999px">
      <div>
         <svg width="37" height="22" viewBox="0 0 37 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.2315 8.21516C19.2641 7.28622 17.7359 7.28622 16.7685 8.21516L4.04892 20.4284C3.13439 21.3065 1.68986 21.3065 0.775332 20.4284V20.4284C-0.193275 19.4983 -0.193275 17.9491 0.775331 17.0191L16.7685 1.66258C17.7359 0.73364 19.2641 0.73364 20.2315 1.66258L36.2247 17.0191C37.1933 17.9491 37.1933 19.4983 36.2247 20.4284V20.4284C35.3101 21.3065 33.8656 21.3065 32.9511 20.4284L20.2315 8.21516Z" fill="#343A44"/>
         </svg>
      </div>
   </div>
   <div style="display: flex; justify-content: center; align-items: center"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6.5 8a.5.5 0 00-.5-.5H1.5a.5.5 0 000 1H6a.5.5 0 00.5-.5z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M3.854 5.646a.5.5 0 00-.708 0l-2 2a.5.5 0 000 .708l2 2a.5.5 0 00.708-.708L2.207 8l1.647-1.646a.5.5 0 000-.708zM9.5 8a.5.5 0 01.5-.5h4.5a.5.5 0 010 1H10a.5.5 0 01-.5-.5z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M12.146 5.646a.5.5 0 01.708 0l2 2a.5.5 0 010 .708l-2 2a.5.5 0 01-.708-.708L13.793 8l-1.647-1.646a.5.5 0 010-.708zM8 9.5a.5.5 0 00-.5.5v4.5a.5.5 0 001 0V10a.5.5 0 00-.5-.5z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M5.646 12.146a.5.5 0 000 .708l2 2a.5.5 0 00.708 0l2-2a.5.5 0 00-.708-.708L8 13.793l-1.646-1.647a.5.5 0 00-.708 0zM8 6.5a.5.5 0 01-.5-.5V1.5a.5.5 0 011 0V6a.5.5 0 01-.5.5z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M5.646 3.854a.5.5 0 010-.708l2-2a.5.5 0 01.708 0l2 2a.5.5 0 01-.708.708L8 2.207 6.354 3.854a.5.5 0 01-.708 0z" clip-rule="evenodd"></path></svg></div>
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
let scrollSpeed;
let container;

const menuHeight = 200;
const menuWidth = 90;

const handleOnMouseEnter = (scrollDir) => {
	console.log('enter');
	interval = setInterval(() => {
		window.scrollBy(0, scrollDir);
	}, 10);
};

const handleOnMouseLeave = () => {
	console.log('leave');
	clearInterval(interval);
};

const calculatePercentage = (mousePos, menuSize, windowSize) => {
	return `${(((mousePos - menuSize / 2) / windowSize) * 100).toFixed(0)}%`;
};
let bool;
const registerListerners = () => {
	if (bool) return;
	bool = true;
	const up = document.querySelector('.wh-up');
	const down = document.querySelector('.wh-down');

	container.addEventListener('mouseenter', () => {
		container.style.opacity = '1';
	});
	container.addEventListener('mouseleave', () => {
		container.style.opacity = '.7';
	});

	up.addEventListener('mouseenter', () => handleOnMouseEnter(-scrollSpeed));

	up.addEventListener('mouseleave', handleOnMouseLeave);

	document.addEventListener('dragover', (e) => e.preventDefault());

	document.addEventListener('drop', (e) => {
		e.preventDefault();
		container.style.opacity = '1';

		const { clientX: mouseX, clientY: mouseY } = e;
		const { innerWidth: windowWidth, innerHeight: windowHeight } = window;

		if (windowWidth - mouseX < menuWidth) {
			container.style.left = '90%';
		} else if (mouseX < menuWidth) {
			container.style.left = '2%';
		} else {
			container.style.left = calculatePercentage(mouseX, menuWidth, windowWidth);
		}

		if (windowHeight - mouseY < menuHeight) {
			container.style.top = '68%';
		} else if (mouseY < menuHeight) {
			container.style.top = '2%';
		} else {
			container.style.top = calculatePercentage(mouseY, menuHeight, windowHeight);
		}

		// // Send data to React
		const top = container.style.top;
		const left = container.style.left;

		ipcRenderer.send('setLatestOverlayLocation', top, left);
	});

	down.addEventListener('mouseenter', () => handleOnMouseEnter(scrollSpeed));

	down.addEventListener('mouseleave', handleOnMouseLeave);
};

const createOverlay = () => {
	if (!document.getElementById('scrollhelp-overlay')) {
		container = document.createElement('div');
		container.innerHTML = overlay;
		container.id = 'scrollhelp-overlay';
		container.style.position = 'fixed';
		container.style.opacity = '.8';
		container.style.zIndex = '999';

		// if (document.readyState === 'complete') {
		// 	document.body.appendChild(container);
		// 	registerListerners();
		// }

		window.addEventListener('DOMContentLoaded', () => {
			console.log('loaded');
			document.body.appendChild(container);
			registerListerners();
		});
		//  else {
		// 	// Wait for dom to be ready for injection
		// 	window.addEventListener('DOMContentLoaded', () => {
		// 		document.body.appendChild(container);
		// 		registerListerners();
		// 	});
		// }
	}
};

const deleteOverlay = () => {
	const overlay = document.getElementById('scrollhelp-overlay');
	if (overlay) {
		// document.removeEventListener('mouseenter', registerListerners());
		// document.removeEventListener('mouseleave', registerListerners());
		overlay.remove();
	}
};
