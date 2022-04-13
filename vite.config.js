import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	build: {
		outDir: 'app/build',
	},
	plugins: [react()],
	esbuild: {
		loader: 'jsx',
	},
	optimizeDeps: {
		esbuildOptions: {
			loader: {
				'.js': 'jsx',
			},
		},
	},
	// esbuild: {
	// 	jsxInject: `import React from 'react'`,
	// },
});
