import type { PageServerLoad } from './$types';
import { artworkData } from '$lib/data/artworkData';

export const load: PageServerLoad = async ({ url }) => {
	// Create ImageGallery structured data for better SEO
	const imageObjects = artworkData
		.slice(0, 10)
		.map((artwork) => {
			const image = artwork.images?.[0];
			if (!image) return null;

			return {
				'@type': 'ImageObject',
				name: artwork.title,
				contentUrl: `${url.origin}${image.src}`,
				description: artwork.description || `${artwork.title} by Carmen Cárdenas Pacheco`,
				author: {
					'@type': 'Person',
					name: 'Carmen Cárdenas Pacheco'
				},
				copyrightHolder: {
					'@type': 'Person',
					name: 'Carmen Cárdenas Pacheco'
				},
				dateCreated: artwork.year?.toString()
			};
		})
		.filter(Boolean);

	const seo = {
		title: 'Carmen Cárdenas Pacheco - Portfolio de Arte',
		description:
			'Bienvenid@ al portfolio de arte de Carmen Cárdenas Pacheco. Ponte en contacto conmigo y mis clases online.',
		image: '/web-app-manifest-512x512.png',
		type: 'website',
		url: url.href,
		structuredData: {
			'@context': 'https://schema.org',
			'@type': 'ImageGallery',
			name: 'Carmen Cárdenas Pacheco - Art Portfolio',
			description: 'Portfolio de arte de Carmen Cárdenas Pacheco',
			url: url.href,
			author: {
				'@type': 'Person',
				name: 'Carmen Cárdenas Pacheco',
				url: 'https://cardenaspacheco.es'
			},
			publisher: {
				'@type': 'Person',
				name: 'Carmen Cárdenas Pacheco'
			},
			image: imageObjects
		}
	};

	return {
		seo
	};
};
