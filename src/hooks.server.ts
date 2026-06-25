import type { Handle } from '@sveltejs/kit';

/**
 * Server-side hooks. Security and asset-cache headers live in vercel.json;
 * this only sets HTML cache-control, which vercel.json doesn't cover.
 */
export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	// Add cache control for HTML pages
	if (event.url.pathname === '/' || event.url.pathname.startsWith('/artwork/')) {
		response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400');
	}

	return response;
};
