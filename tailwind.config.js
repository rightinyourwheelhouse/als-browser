module.exports = {
	content: ['./src/**/*'],
	theme: {
		extend: {
			colors: {
				'dark-gray': '#343A44',
				'dark-blue': '#205493',
			},
			fontFamily: {
				mulish: ['Mulish', 'sans-serif'],
			},
			margin: {
				center: '0 auto',
			},
			dropShadow: {
				light: '0px 0px 5px rgba(0, 0, 0, 0.1)',
				hover: '0px 0px 15px rgba(0, 0, 0, 0.25)',
			},
			textColor: {
				skin: {
					white: 'var(--color-white)',
					error: 'var(--color-error)',
				},
			},
			backgroundColor: {
				skin: {
					medium: 'var(--color-medium)',
					dark: 'var(--color-dark)',
					error: 'var(--color-error)',
				},
			},
		},
	},
};
