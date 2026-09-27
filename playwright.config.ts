import { defineConfig } from '@playwright/test';

// BASE_URL points the tests at a deployed site, such as a Vercel preview.
// Without it, the tests build the site and serve it with the preview server.
const baseURL = process.env.BASE_URL;

export default defineConfig({
	testDir: 'tests',
	use: { baseURL: baseURL ?? 'http://localhost:4173', locale: 'es-ES' },
	webServer: baseURL
		? undefined
		: { command: 'npm run build && npm run preview', port: 4173, timeout: 180_000 }
});
