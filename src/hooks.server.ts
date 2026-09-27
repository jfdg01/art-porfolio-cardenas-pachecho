import type { Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';

/**
 * Server-side hooks. Paraglide reads the Locale from the URL, and the page
 * renders in that Locale. This runs when the pages are prerendered, and at
 * request time only for a path with no prerendered file. The headers live in vercel.json.
 */
export const handle: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;
		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%lang%', locale)
		});
	});
