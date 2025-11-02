import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const seo = {
		title: 'Test - Carmen Cárdenas Pacheco',
		description: 'Test page for testing imports and components.',
		image: '/web-app-manifest-512x512.png',
		type: 'website',
		url: url.href
	};

	return {
		seo
	};
};
