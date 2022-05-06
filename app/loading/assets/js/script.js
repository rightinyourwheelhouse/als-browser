const feedbackText = document.querySelector('.feedback-text');

window.api.recieve('message', (text) => {
	feedbackText.innerHTML = text;
});
