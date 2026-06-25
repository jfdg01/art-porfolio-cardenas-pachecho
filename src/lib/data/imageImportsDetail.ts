/**
 * Detail/carousel image imports — used ONLY by the /artwork/[id] route and its
 * child components (ArtworkCarousel, ThumbnailCarousel, the detail page).
 *
 * Kept separate from imageImports.ts so the gallery bundle doesn't ship the
 * larger detail/carousel srcsets.
 *
 * Usage:
 * import { imageMapDetail, imageMapCarousel } from '$lib/data/imageImportsDetail';
 */

const imageImportsDetail = import.meta.glob('$lib/assets/images/*.webp', {
	import: 'default',
	eager: true,
	query: { as: 'detail' }
});

const imageImportsCarousel = import.meta.glob('$lib/assets/images/*.webp', {
	import: 'default',
	eager: true,
	query: { as: 'carousel' }
});

export const imageMapDetail: Record<string, string> = {};
export const imageMapCarousel: Record<string, string> = {};

Object.entries(imageImportsDetail).forEach(([path, image]) => {
	const filename = path.split('/').pop()?.replace('.webp', '') || '';
	imageMapDetail[filename] = image as string;
});

Object.entries(imageImportsCarousel).forEach(([path, image]) => {
	const filename = path.split('/').pop()?.replace('.webp', '') || '';
	imageMapCarousel[filename] = image as string;
});
