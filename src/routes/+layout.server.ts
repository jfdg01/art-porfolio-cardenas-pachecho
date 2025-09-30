import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url, request }) => {
	// Get locale from URL or default to 'es'
	const locale = url.searchParams.get('lang') || 'es';

	// Get user agent for better SEO handling
	const userAgent = request.headers.get('user-agent') || '';

	return {
		locale,
		url: url.href,
		pathname: url.pathname,
		userAgent
	};
};
