const feedbackText = document.querySelector('.feedback-text');

console.log('Hello world');

window.api.recieve('message', (text) => {
	console.log(text);
	feedbackText.innerHTML = text;
});
