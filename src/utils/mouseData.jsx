export const mouseData = () => {
	window.api.recieve('cursorDataReply', (data) => {
		console.log(data);
	});
};
