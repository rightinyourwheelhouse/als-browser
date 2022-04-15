module.exports = {
	content: ['./src/**/*'],
	theme: {
		extend: {
			colors: {
				'dark-gray': '#343A44',
			},
			fontFamily: {
				mulish: ['Mulish', 'sans-serif'],
			},
			dropShadow: {
				browser: '0px 0px 15px rgba(0, 0, 0, 0.2)',
				light: '0px 0px 5px rgba(0, 0, 0, 0.1)',
				hover: '0px 0px 15px rgba(0, 0, 0, 0.25)',
			},
		},
	},
};
