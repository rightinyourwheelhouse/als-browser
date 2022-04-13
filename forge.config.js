module.exports = {
	makers: [
		{
			name: '@electron-forge/maker-dmg',
			config: {
				icon: 'public/icons/mac/icon.icns',
				format: 'ULFO',
			},
		},
	],
};
