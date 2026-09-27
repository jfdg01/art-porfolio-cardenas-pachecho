import type { Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';

/**
 * Server-side hooks. Paraglide reads the Locale from the URL, and the page
 * renders in that Locale. Security and asset-cache headers live in
 * vercel.json; this only sets HTML cache-control, which vercel.json doesn't cover.
 */
export const handle: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, async ({ request, locale }) => {
		event.request = request;
		const response = await resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%lang%', locale)
		});

		// Add cache control for HTML pages
		if (event.route.id === '/' || event.route.id === '/artwork/[id]') {
			response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400');
		}

		return response;
	});
