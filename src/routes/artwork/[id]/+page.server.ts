import type { PageServerLoad } from './$types';
import { artworkData } from '$lib/data/artworkData';

export const load: PageServerLoad = async ({ params, url }) => {
	const artwork = artworkData.find((artwork) => artwork.id === params.id);

	if (!artwork) {
		throw new Error('Artwork not found');
	}

	// Generate SEO metadata on the server
	const seo = {
		title: `${artwork.title} - Carmen Cárdenas Pacheco`,
		description: `View ${artwork.title} by Carmen Cárdenas Pacheco. ${artwork.description || 'Explore this beautiful artwork in the gallery.'}`,
		image:
			typeof artwork.images[0] === 'string'
				? artwork.images[0]
				: artwork.images[0]?.src || '/images/default.webp',
		type: 'article',
		url: url.href,
		structuredData: {
			'@context': 'https://schema.org',
			'@type': 'VisualArtwork',
			name: artwork.title,
			description: artwork.description || `View ${artwork.title} by Carmen Cárdenas Pacheco`,
			image: `https://www.cardenaspacheco.es${typeof artwork.images[0] === 'string' ? artwork.images[0] : artwork.images[0]?.src || '/images/default.webp'}`,
			url: url.href,
			creator: {
				'@type': 'Person',
				name: 'Carmen Cárdenas Pacheco',
				url: 'https://www.cardenaspacheco.es'
			},
			dateCreated: artwork.year ? `${artwork.year}-01-01` : new Date().toISOString(),
			artform: 'Painting',
			artMedium: 'Mixed Media',
			artworkSurface: artwork.dimensions
				? `${artwork.dimensions.width}x${artwork.dimensions.height} ${artwork.dimensions.unit}`
				: undefined,
			genre: Array.isArray(artwork.category) ? artwork.category.join(', ') : artwork.category,
			keywords: Array.isArray(artwork.category) ? artwork.category.join(', ') : artwork.category
		}
	};

	return {
		artwork,
		seo
	};
};
