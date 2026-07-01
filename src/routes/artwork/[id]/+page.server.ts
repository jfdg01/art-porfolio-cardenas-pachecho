import type { PageServerLoad } from './$types';
import { artworkData } from '$lib/data/artworkData';
import { imageMapFull } from '$lib/data/imageImportsDetail';

// artwork.images[].src is a virtual /images/<name>.webp key; resolve it to the
// real hashed asset URL
function assetUrl(src: string | undefined): string {
	const name = src?.split('/').pop()?.replace('.webp', '');
	return (name && imageMapFull[name]) || '/web-app-manifest-512x512.png';
}

export const load: PageServerLoad = async ({ params, url }) => {
	const artwork = artworkData.find((artwork) => artwork.id === params.id);

	if (!artwork) {
		throw new Error('Artwork not found');
	}

	// Generate SEO metadata on the server
	const seo = {
		title: `${artwork.title} - Carmen Cárdenas Pacheco`,
		description: `View ${artwork.title} by Carmen Cárdenas Pacheco. ${artwork.description || 'Explore this beautiful artwork in the portfolio.'}`,
		image: assetUrl(typeof artwork.images[0] === 'string' ? artwork.images[0] : artwork.images[0]?.src),
		type: 'article',
		url: url.href,
		structuredData: {
			'@context': 'https://schema.org',
			'@type': 'VisualArtwork',
			name: artwork.title,
			description: artwork.description || `View ${artwork.title} by Carmen Cárdenas Pacheco`,
			image: `https://cardenaspacheco.es${assetUrl(typeof artwork.images[0] === 'string' ? artwork.images[0] : artwork.images[0]?.src)}`,
			url: url.href,
			creator: {
				'@type': 'Person',
				name: 'Carmen Cárdenas Pacheco',
				url: 'https://cardenaspacheco.es'
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
