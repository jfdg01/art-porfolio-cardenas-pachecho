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
				gallery: new URLSearchParams('w=200;300;550&format=webp;jpg'),
				artwork: new URLSearchParams('w=400;700&format=webp;jpg')
			}
		})
	]
});
