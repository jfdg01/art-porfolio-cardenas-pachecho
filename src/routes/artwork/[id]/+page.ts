import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getArtwork } from '$lib/artworks';

export const load: PageLoad = ({ params }) => {
	const artwork = getArtwork(params.id);
	if (!artwork) error(404, 'Artwork not found');
	return { artwork };
};
