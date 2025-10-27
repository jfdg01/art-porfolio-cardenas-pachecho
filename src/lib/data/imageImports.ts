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

// Toggle this to switch between dev and production image loading
const dev = false;

// Import all images with specific query parameters for different contexts
const imageImportsDetail = import.meta.glob('$lib/assets/images/*.webp', {
	import: 'default',
	eager: true,
	query: { as: 'detail' }
});

const imageImportsGallery = import.meta.glob('$lib/assets/images/*.webp', {
	import: 'default',
	eager: true,
	query: { as: 'gallery' }
});

const imageImportsDev = import.meta.glob('$lib/assets/images/*.webp', {
	import: 'default',
	eager: true,
	query: { as: 'dev' }
});

const imageImportsCarousel = import.meta.glob('$lib/assets/images/*.webp', {
	import: 'default',
	eager: true,
	query: { as: 'carousel' }
});

// Create filename-keyed maps for easy access
export const imageMapDetail: Record<string, string> = {};
export const imageMapGallery: Record<string, string> = {};
export const imageMapCarousel: Record<string, string> = {};

// Populate maps based on dev mode
if (dev) {
	// In dev mode, use dev images for both detail and gallery
	Object.entries(imageImportsDev).forEach(([path, image]) => {
		const filename = path.split('/').pop()?.replace('.webp', '') || '';
		imageMapDetail[filename] = image as string;
		imageMapGallery[filename] = image as string;
		imageMapCarousel[filename] = image as string;
	});
} else {
	// In production mode, use optimized images for each context
	Object.entries(imageImportsDetail).forEach(([path, image]) => {
		const filename = path.split('/').pop()?.replace('.webp', '') || '';
		imageMapDetail[filename] = image as string;
	});

	Object.entries(imageImportsGallery).forEach(([path, image]) => {
		const filename = path.split('/').pop()?.replace('.webp', '') || '';
		imageMapGallery[filename] = image as string;
	});

	Object.entries(imageImportsCarousel).forEach(([path, image]) => {
		const filename = path.split('/').pop()?.replace('.webp', '') || '';
		imageMapCarousel[filename] = image as string;
	});
}
