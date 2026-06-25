/**
 * Gallery image imports using Vite's import.meta.glob — optimized for thumbnail
 * display (147px-318px). Imported by the gallery route and ArtworkCard.
 *
 * Detail/carousel maps live in imageImportsDetail.ts so the gallery bundle
 * doesn't ship those larger srcsets.
 *
 * The 'sizes' attribute in components tells the browser which width to select.
 *
 * Usage:
 * import { imageMapGallery } from '$lib/data/imageImports';
 */

const imageImportsGallery = import.meta.glob('$lib/assets/images/*.webp', {
	import: 'default',
	eager: true,
	query: { as: 'gallery' }
});

export const imageMapGallery: Record<string, string> = {};

Object.entries(imageImportsGallery).forEach(([path, image]) => {
	const filename = path.split('/').pop()?.replace('.webp', '') || '';
	imageMapGallery[filename] = image as string;
});
