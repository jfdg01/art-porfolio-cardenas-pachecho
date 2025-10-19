import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { imagetools } from '@zerodevx/svelte-img/vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		imagetools({
			profiles: {
				gallery: new URLSearchParams('w=318&format=webp;jpg'),
				detail: new URLSearchParams('w=1536&format=webp;jpg')
			}
		})
	],
	server: {
		host: true, // Listen on all addresses including LAN
		port: 5173
	}
});
