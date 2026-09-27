import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getArtwork } from '$lib/artworks';

export const load: PageServerLoad = async ({ params, url }) => {
	const artwork = getArtwork(params.id);

	if (!artwork) error(404, 'Artwork not found');

	const image = artwork.images[0].img.src;

	// Generate SEO metadata on the server
	const seo = {
		title: `${artwork.title} - Carmen Cárdenas Pacheco`,
		description: `View ${artwork.title} by Carmen Cárdenas Pacheco.`,
		image,
		type: 'article',
		url: url.href,
		structuredData: {
			'@context': 'https://schema.org',
			'@type': 'VisualArtwork',
			name: artwork.title,
			description: `View ${artwork.title} by Carmen Cárdenas Pacheco`,
			image: `https://cardenaspacheco.com${image}`,
			url: url.href,
			creator: {
				'@type': 'Person',
				name: 'Carmen Cárdenas Pacheco',
				url: 'https://cardenaspacheco.com'
			},
			dateCreated: artwork.year ? `${artwork.year}-01-01` : new Date().toISOString(),
			artform: 'Painting',
			artMedium: 'Mixed Media',
			artworkSurface: artwork.dimensions
				? `${artwork.dimensions.width}x${artwork.dimensions.height} ${artwork.dimensions.unit}`
				: undefined,
			genre: artwork.tags.join(', '),
			keywords: artwork.tags.join(', ')
		}
	};

	return {
		artwork,
		seo
	};
};
