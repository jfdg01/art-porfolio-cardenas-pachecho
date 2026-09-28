import { defineConfig } from '@playwright/test';

// BASE_URL points the tests at a deployed site, such as a Vercel preview.
// Without it, the tests build the site and serve it with the preview server.
const baseURL = process.env.BASE_URL;

export default defineConfig({
	testDir: 'tests',
	use: { baseURL: baseURL ?? 'http://localhost:4173', locale: 'es-ES' },
	webServer: baseURL
		? undefined
		: {
				command: 'npm run build && npm run preview',
				port: 4173,
				timeout: 180_000,
				// The contact form sends each Enquiry to a stub in tests/contact.test.ts, not to Resend.
				env: { RESEND_API_URL: 'http://localhost:4174', RESEND_API_KEY: 'test' }
			}
});
