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
				gallery: new URLSearchParams('w=350&format=webp;jpg'),
				detail: new URLSearchParams('w=800;1200&format=webp;jpg'),
				dev: new URLSearchParams('w=100&format=webp'),
				carousel: new URLSearchParams('w=100;200&format=webp;jpg')
			}
		})
	]
});
