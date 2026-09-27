import type { PageServerLoad } from './$types';
import { artworks } from '$lib/artworks';

export const load: PageServerLoad = async ({ url }) => {
	// Create ImageGallery structured data for better SEO
	const imageObjects = artworks.slice(0, 10).map((artwork) => {
		return {
			'@type': 'ImageObject',
			name: artwork.title,
			contentUrl: `${url.origin}${artwork.images[0].img.src}`,
			description: `${artwork.title} by Carmen Cárdenas Pacheco`,
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
	});

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
				url: 'https://cardenaspacheco.com'
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
