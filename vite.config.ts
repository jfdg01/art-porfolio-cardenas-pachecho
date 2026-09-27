import tailwindcss from '@tailwindcss/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import paraglide from './paraglide.config.js';

export default defineConfig({
	plugins: [tailwindcss(), enhancedImages(), paraglideVitePlugin(paraglide), sveltekit()]
});
