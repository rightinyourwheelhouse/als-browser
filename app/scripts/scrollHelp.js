const { ipcRenderer } = require('electron');

const overlay = `

<div style="position: fixed; right: 2rem; bottom: 2rem; z-index: 999; background-color: white; border: solid #205493 2px; display: flex; flex-direction: column; gap: 1rem; justify-content: center; align-items:center; padding: .8rem; border-radius: .5rem;">
   <div class="wh-up" style="background-color: white; filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.1));  width: 50px; height: 50px; display: flex; justify-content: center; align-items:center; border-radius: 999px">
      <div>
         <svg width="37" height="22" viewBox="0 0 37 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.2315 8.21516C19.2641 7.28622 17.7359 7.28622 16.7685 8.21516L4.04892 20.4284C3.13439 21.3065 1.68986 21.3065 0.775332 20.4284V20.4284C-0.193275 19.4983 -0.193275 17.9491 0.775331 17.0191L16.7685 1.66258C17.7359 0.73364 19.2641 0.73364 20.2315 1.66258L36.2247 17.0191C37.1933 17.9491 37.1933 19.4983 36.2247 20.4284V20.4284C35.3101 21.3065 33.8656 21.3065 32.9511 20.4284L20.2315 8.21516Z" fill="#343A44"/>
         </svg>
      </div>
   </div>
   <div class="wh-down" style="background-color: white; filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.1));  width: 50px; height: 50px; display: flex; justify-content: center; align-items:center; border-radius: 999px">
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
	const down = document.querySelector('.wh-down');

	up.addEventListener('mouseenter', () => {
		handleSetInterval(-10);
	});

	up.addEventListener('mouseleave', () => {
		handleOnMouseLeave();
	});

	down.addEventListener('mouseenter', () => {
		handleSetInterval(10);
	});

	down.addEventListener('mouseleave', () => {
		handleOnMouseLeave();
	});
};

ipcRenderer.on('extensionStatesReply', (event, payload) => {
	if (payload.state && payload.name === 'scrollHelp') {
		createOverlay();
	} else {
		deleteOverlay();
	}
});

const createOverlay = () => {
	const container = document.createElement('div');
	container.id = 'scrollhelp-overlay';
	container.innerHTML = overlay;
	document.body.appendChild(container);

	registerListerners();
};

const deleteOverlay = () => {
	const overlay = document.getElementById('scrollhelp-overlay');
	overlay.remove();
};

// const initOverlay = () => {
// 	document.addEventListener('DOMContentLoaded', () => {
// 		registerListerners();
// 	});
// };
