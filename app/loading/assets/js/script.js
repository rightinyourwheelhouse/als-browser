const feedbackText = document.querySelector('.feedback-text');

window.api.recieve('message', (text) => {
	console.log(text);
	feedbackText.innerHTML = text;
});
