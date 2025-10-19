import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const seo = {
		title: 'Carmen Cárdenas Pacheco - Portfolio de Arte',
		description:
			'Bienvenid@ al portfolio de arte de Carmen Cárdenas Pacheco. Ponte en contacto conmigo y mis clases online.',
		image: '/web-app-manifest-512x512.png',
		type: 'website',
		url: url.href,
		structuredData: {
			'@context': 'https://schema.org',
			'@type': 'WebSite',
			name: 'Carmen Cárdenas Pacheco',
			description: 'Portfolio de arte de Carmen Cárdenas Pacheco',
			url: 'https://cardenaspacheco.es',
			author: {
				'@type': 'Person',
				name: 'Carmen Cárdenas Pacheco',
				url: 'https://cardenaspacheco.es'
			},
			publisher: {
				'@type': 'Person',
				name: 'Carmen Cárdenas Pacheco'
			},
			mainEntity: {
				'@type': 'ItemList',
				name: 'Portfolio by Carmen Cárdenas Pacheco',
				description: 'Collection of contemporary art'
			}
		}
	};

	return {
		seo
	};
};
