/**
 * Centralized image imports using Vite's import.meta.glob
 * This provides optimized image loading across the application
 *
 * Separate profiles for different use cases:
 * - Gallery: optimized for thumbnail display (147px-318px)
 * - Detail: optimized for detail page and lightbox (423px-926px+)
 *
 * The 'sizes' attribute in components tells the browser which width to select
 *
 * Usage:
 * import { imageMapGallery, imageMapDetail } from '$lib/data/imageImports';
 */

// Import all images with specific query parameters for different contexts
export const imageImportsDetail = import.meta.glob('$lib/assets/images/*.webp', {
	import: 'default',
	eager: true,
	// query: { as: 'dev' }
	query: { as: 'detail' }
});

export const imageImportsGallery = import.meta.glob('$lib/assets/images/*.webp', {
	import: 'default',
	eager: true,
	// query: { as: 'dev' }
	query: { as: 'gallery' }
});

// Create filename-keyed maps for easy access
export const imageMapDetail: Record<string, string> = {};
export const imageMapGallery: Record<string, string> = {};

// Populate detail image map
Object.entries(imageImportsDetail).forEach(([path, image]) => {
	const filename = path.split('/').pop()?.replace('.webp', '') || '';
	imageMapDetail[filename] = image as string;
});

// Populate gallery image map
Object.entries(imageImportsGallery).forEach(([path, image]) => {
	const filename = path.split('/').pop()?.replace('.webp', '') || '';
	imageMapGallery[filename] = image as string;
});
