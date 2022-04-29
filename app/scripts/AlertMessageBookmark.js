const { ipcRenderer } = require('electron');

ipcRenderer.on('alert-message-bookmarkReply', (event, arg) => {
	creatHTMLAlertMessage(arg);
});

const creatHTMLAlertMessage = (arg) => {
	const font = document.createElement('link');
	font.setAttribute('rel', 'stylesheet');
	font.setAttribute('type', 'text/css');
	font.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;700&display=swap');
	document.head.appendChild(font);

	const alertMessage = document.createElement('div');

	const defaultStyleAlertMessage = `position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    z-index: 99999 !important;
    width: 100% !important;
    height: 50px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px !important;
    font-family: Mulish !important;
    `;

	alertMessage.style.cssText = defaultStyleAlertMessage;

	if (arg == true) {
		alertMessage.style.backgroundColor = '#ff4081';
	} else if (arg == false) {
		alertMessage.style.backgroundColor = '#59ff92';
	}

	const alertMessageText = document.createElement('p');
	if (arg == true) {
		alertMessageText.innerHTML = 'Bladwijzer bestaat al';
		alertMessageText.style.color = '#fff';
	} else if (arg == false) {
		alertMessageText.innerHTML = 'Bladwijzer is toegevoegd';
		alertMessageText.style.color = '#000';
	}

	alertMessage.appendChild(alertMessageText);
	document.body.appendChild(alertMessage);

	setTimeout(() => {
		alertMessage.remove();
	}, 4000);
};
