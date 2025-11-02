/**
 * Centralized image imports using Vite's import.meta.glob
 * This provides optimized image loading across the application
 *
 * Separate profiles for different use cases:
 * - Gallery: optimized for thumbnail display (147px-318px) - EAGER loaded for gallery
 * - Detail: optimized for detail page and lightbox (423px-926px+) - LAZY loaded on demand
 * - Carousel: optimized for carousel display - LAZY loaded on demand
 *
 * The 'sizes' attribute in components tells the browser which width to select
 *
 * Usage:
 * import { getOptimizedImage, imageMapGallery } from '$lib/data/imageImports';
 */

// Toggle this to switch between dev and production image loading
const dev = false;

// LAZY imports - only loaded when actually requested via getOptimizedImage()
const imageImportsDetail = import.meta.glob('$lib/assets/images/*.webp', {
	import: 'default',
	eager: false, // Lazy load - only when needed
	query: { as: 'detail' }
});

const imageImportsDev = import.meta.glob('$lib/assets/images/*.webp', {
	import: 'default',
	eager: false, // Lazy load - only when needed
	query: { as: 'dev' }
});

// EAGER imports - these are needed for components that display multiple images
const imageImportsGallery = import.meta.glob('$lib/assets/images/*.webp', {
	import: 'default',
	eager: true, // Eager load for gallery thumbnails
	query: { as: 'gallery' }
});

const imageImportsCarousel = import.meta.glob('$lib/assets/images/*.webp', {
	import: 'default',
	eager: true, // Eager load for carousel (shows all artworks)
	query: { as: 'carousel' }
});

// Create filename-keyed maps for eager-loaded images
export const imageMapGallery: Record<string, string> = {};
export const imageMapCarousel: Record<string, string> = {};
export const imageMapDetail: Record<string, string> = {};

// Populate maps
Object.entries(imageImportsGallery).forEach(([path, image]) => {
	const filename = path.split('/').pop()?.replace('.webp', '') || '';
	imageMapGallery[filename] = image as string;
});

Object.entries(imageImportsCarousel).forEach(([path, image]) => {
	const filename = path.split('/').pop()?.replace('.webp', '') || '';
	imageMapCarousel[filename] = image as string;
});

// Note: imageMapDetail is exported for backward compatibility but is empty
// Use getOptimizedImage() for lazy loading detail images instead

/**
 * Lazy load an optimized image for a specific context
 * Only loads the image when called, not at bundle time
 * @param filename - The image filename without extension (e.g., "artwork-1")
 * @param context - The context for optimization (detail, carousel, gallery, dev)
 * @returns Promise that resolves to the optimized image source
 */
export async function getOptimizedImage(
	filename: string,
	context: 'detail' | 'carousel' | 'gallery' | 'dev' = 'detail'
): Promise<string> {
	// Handle eager-loaded contexts first
	if (context === 'gallery') {
		return imageMapGallery[filename] || '';
	}

	if (context === 'carousel') {
		return imageMapCarousel[filename] || '';
	}

	// Determine which lazy import map to use
	const importMap: Record<string, () => Promise<unknown>> = dev
		? imageImportsDev
		: imageImportsDetail;

	// Find the matching import function
	const importPath = Object.keys(importMap).find((path) => path.includes(`/${filename}.webp`));

	if (!importPath) {
		console.warn(`Image not found: ${filename}`);
		return '';
	}

	// Dynamically import the image
	const imageModule = await importMap[importPath]();
	return imageModule as string;
}
