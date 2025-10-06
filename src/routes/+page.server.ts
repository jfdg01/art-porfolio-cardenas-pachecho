import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const seo = {
		title: 'Carmen Cárdenas Pacheco - Galería de Arte',
		description:
			'Bienvenid@ a la galería de arte de Carmen Cárdenas Pacheco. Explora una colección única de obras artísticas contemporáneas.',
		image: '/web-app-manifest-512x512.png',
		type: 'website',
		url: url.href,
		structuredData: {
			'@context': 'https://schema.org',
			'@type': 'WebSite',
			name: 'Carmen Cárdenas Pacheco',
			description: 'Galería de arte de Carmen Cárdenas Pacheco',
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
			potentialAction: {
				'@type': 'SearchAction',
				target: 'https://cardenaspacheco.es/?q={search_term_string}',
				'query-input': 'required name=search_term_string'
			},
			mainEntity: {
				'@type': 'ItemList',
				name: 'Artworks by Carmen Cárdenas Pacheco',
				description: 'Collection of contemporary artworks'
			}
		}
	};

	return {
		seo
	};
};
