/**
 * Gallery state management using modern Svelte 5 classes paradigm
 * This file implements the state management for the gallery application
 * using classes with runes and context API for global state sharing.
 */

import { getContext, setContext } from 'svelte';
import { SvelteSet } from 'svelte/reactivity';
import type { Artwork } from '$lib/types/artwork';
import { getOptimizedImage } from '$lib/data/imageImports';

const GALLERY_KEY = Symbol('gallery_state');

export type SortOption =
	| 'name-asc'
	| 'name-desc'
	| 'year-newest'
	| 'year-oldest'
	| 'category'
	| 'availability'
	| 'random';

/**
 * Gallery state management class using modern Svelte 5 classes paradigm
 * Encapsulates all gallery-related state and methods using runes
 */
export class GalleryStateClass {
	// Reactive properties using $state rune
	artworks = $state<Artwork[]>([]);
	selectedCategories = $state<string[]>([]);
	sortBy = $state<SortOption>('random');
	showOnlyAvailable = $state<boolean>(false);
	currentImageIndex = $state<number>(0);

	// Computed properties using $derived
	filteredArtworks = $derived.by(() => {
		// First apply category filtering
		let filtered: Artwork[];
		if (this.selectedCategories.length === 0) {
			filtered = [...this.artworks];
		} else {
			filtered = this.artworks.filter((artwork) => {
				const artworkCategories = Array.isArray(artwork.category)
					? artwork.category
					: [artwork.category];
				// Check if artwork has ANY of the selected categories
				return artworkCategories.some((cat) => this.selectedCategories.includes(cat));
			});
		}

		// Then apply availability filtering
		if (this.showOnlyAvailable) {
			filtered = filtered.filter((artwork) => artwork.isAvailable);
		}

		// Then apply sorting
		return this.sortArtworks(filtered);
	});

	availableCategories = $derived.by(() => {
		const categories = new SvelteSet<string>();
		this.artworks.forEach((artwork) => {
			if (Array.isArray(artwork.category)) {
				artwork.category.forEach((cat) => categories.add(cat));
			} else {
				categories.add(artwork.category);
			}
		});
		return Array.from(categories).sort();
	});

	constructor(artworkData: Artwork[]) {
		this.artworks = artworkData;
	}

	/**
	 * Sort artworks based on current sortBy state
	 */
	private sortArtworks(artworks: Artwork[]): Artwork[] {
		const sorted = [...artworks];

		switch (this.sortBy) {
			case 'name-asc':
				return sorted.sort((a, b) => {
					const comparison = a.title.localeCompare(b.title);
					// Use ID as tie-breaker for stability
					return comparison !== 0 ? comparison : a.id.localeCompare(b.id);
				});

			case 'name-desc':
				return sorted.sort((a, b) => {
					const comparison = b.title.localeCompare(a.title);
					// Use ID as tie-breaker for stability
					return comparison !== 0 ? comparison : a.id.localeCompare(b.id);
				});

			case 'year-newest':
				return sorted.sort((a, b) => {
					// Handle missing years - place at end
					if (!a.year && !b.year) return a.id.localeCompare(b.id);
					if (!a.year) return 1;
					if (!b.year) return -1;
					const yearComparison = b.year - a.year;
					// Use ID as tie-breaker for stability
					return yearComparison !== 0 ? yearComparison : a.id.localeCompare(b.id);
				});

			case 'year-oldest':
				return sorted.sort((a, b) => {
					// Handle missing years - place at end
					if (!a.year && !b.year) return a.id.localeCompare(b.id);
					if (!a.year) return 1;
					if (!b.year) return -1;
					const yearComparison = a.year - b.year;
					// Use ID as tie-breaker for stability
					return yearComparison !== 0 ? yearComparison : a.id.localeCompare(b.id);
				});

			case 'category':
				return sorted.sort((a, b) => {
					const catA = Array.isArray(a.category) ? a.category[0] : a.category;
					const catB = Array.isArray(b.category) ? b.category[0] : b.category;
					const categoryComparison = catA.localeCompare(catB);
					// Use ID as tie-breaker for stability
					return categoryComparison !== 0 ? categoryComparison : a.id.localeCompare(b.id);
				});

			case 'availability':
				return sorted.sort((a, b) => {
					// Available items first
					if (a.isAvailable && !b.isAvailable) return -1;
					if (!a.isAvailable && b.isAvailable) return 1;
					// Use ID as tie-breaker for stability when availability is the same
					return a.id.localeCompare(b.id);
				});

			case 'random':
				// Deterministic pseudo-random shuffle using ID as seed
				// This ensures the same "random" order on both server and client
				return sorted.sort((a, b) => {
					// Create a deterministic hash from IDs
					const hashA = this.simpleHash(a.id);
					const hashB = this.simpleHash(b.id);
					return hashA - hashB;
				});

			default:
				return sorted;
		}
	}

	/**
	 * Simple deterministic hash function for pseudo-random sorting
	 * This ensures the same "random" order across server and client renders
	 */
	private simpleHash(str: string): number {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			const char = str.charCodeAt(i);
			hash = (hash << 5) - hash + char;
			hash = hash & hash; // Convert to 32-bit integer
		}
		return hash;
	}

	// Actions
	setArtworks(artworks: Artwork[]) {
		this.artworks = artworks;
	}

	setCategoryFilter(categories: string[]) {
		this.selectedCategories = categories;
	}

	setSortBy(sortBy: SortOption) {
		this.sortBy = sortBy;
	}

	setShowOnlyAvailable(showOnlyAvailable: boolean) {
		this.showOnlyAvailable = showOnlyAvailable;
	}

	clearFilters() {
		this.selectedCategories = [];
		this.showOnlyAvailable = false;
	}

	setCurrentImageIndex(index: number) {
		this.currentImageIndex = index;
	}

	nextImage(totalImages: number) {
		if (totalImages > 1) {
			this.currentImageIndex = (this.currentImageIndex + 1) % totalImages;
		}
	}

	prevImage(totalImages: number) {
		if (totalImages > 1) {
			this.currentImageIndex =
				this.currentImageIndex === 0 ? totalImages - 1 : this.currentImageIndex - 1;
		}
	}

	resetImageIndex() {
		this.currentImageIndex = 0;
	}

	// Legacy computed property for backward compatibility (if needed)
	selectedCategory = $derived(
		this.selectedCategories.length === 1 ? this.selectedCategories[0] : ''
	);

	// Utility methods
	getArtworkById(id: string): Artwork | undefined {
		return this.artworks.find((artwork) => artwork.id === id);
	}

	/**
	 * Get a random assortment of artworks
	 * Uses deterministic pseudo-random ordering for SSR consistency
	 * @param count - Number of artworks to return (defaults to max)
	 * @returns Random array of artworks
	 */
	getRandomArtworks(count: number = 999): Artwork[] {
		const shuffled = [...this.artworks].sort((a, b) => {
			const hashA = this.simpleHash(a.id);
			const hashB = this.simpleHash(b.id);
			return hashA - hashB;
		});
		return shuffled.slice(0, Math.min(count, this.artworks.length));
	}

	/**
	 * Get random artworks from filtered results
	 * Respects current filters and returns a random selection
	 * Uses deterministic pseudo-random ordering for SSR consistency
	 * @param count - Number of artworks to return (defaults to max)
	 * @returns Random array of filtered artworks
	 */
	getRandomFilteredArtworks(count: number = 999): Artwork[] {
		const shuffled = [...this.filteredArtworks].sort((a, b) => {
			const hashA = this.simpleHash(a.id);
			const hashB = this.simpleHash(b.id);
			return hashA - hashB;
		});
		return shuffled.slice(0, Math.min(count, this.filteredArtworks.length));
	}

	/**
	 * Get optimized image for a specific image source
	 * Lazy loads the image on-demand, only loading what's needed
	 * @param imageSrc - The image source path (e.g., "/images/artwork-1.webp")
	 * @param context - The optimization context (detail, carousel, gallery)
	 * @returns Promise that resolves to the optimized image source
	 */
	async getOptimizedImageForSrc(
		imageSrc: string,
		context: 'detail' | 'carousel' | 'gallery' = 'detail'
	): Promise<string> {
		// Extract filename from path
		const filename = imageSrc.split('/').pop()?.replace('.webp', '');

		if (!filename) {
			console.warn('Invalid image source:', imageSrc);
			return imageSrc;
		}

		try {
			const optimizedImage = await getOptimizedImage(filename, context);
			return optimizedImage || imageSrc;
		} catch (error) {
			console.error('Error loading optimized image:', error);
			return imageSrc;
		}
	}

	/**
	 * Get navigation information for an artwork (next/previous IDs)
	 * Calculates based on current filter state and wraps around at edges
	 * @param artworkId - ID of the current artwork
	 * @returns Object with nextId and prevId (null if artwork not found in filtered results)
	 */
	getArtworkNavigation(artworkId: string): { nextId: string | null; prevId: string | null } {
		const currentIndex = this.filteredArtworks.findIndex((art) => art.id === artworkId);

		if (currentIndex === -1) {
			return { nextId: null, prevId: null };
		}

		const nextIndex = currentIndex === this.filteredArtworks.length - 1 ? 0 : currentIndex + 1;
		const prevIndex = currentIndex === 0 ? this.filteredArtworks.length - 1 : currentIndex - 1;

		return {
			nextId: this.filteredArtworks[nextIndex]?.id || null,
			prevId: this.filteredArtworks[prevIndex]?.id || null
		};
	}
}

/**
 * Set gallery state in context (call in +layout.svelte)
 * Creates a new instance of GalleryStateClass with server data and makes it available to all child components
 * Uses a guard to prevent multiple instances in the same component tree
 * @param artworkData - Artwork data from server load function
 */
export function setGalleryState(artworkData: Artwork[]) {
	// Check if gallery state already exists in context
	// This prevents creating multiple instances during re-renders
	// getContext returns undefined if the key doesn't exist in context
	let galleryState = getContext<GalleryStateClass | undefined>(GALLERY_KEY);

	// Only create new instance if it doesn't exist
	if (!galleryState) {
		galleryState = new GalleryStateClass(artworkData);
		setContext(GALLERY_KEY, galleryState);
	}

	return galleryState;
}

/**
 * Get gallery state from context (call in components)
 * Retrieves the shared gallery state instance from the context
 * Throws an error if called outside of the component tree where setGalleryState was called
 */
export function getGalleryState() {
	const galleryState = getContext<GalleryStateClass | undefined>(GALLERY_KEY);

	if (!galleryState) {
		throw new Error(
			'GalleryState not found in context. ' +
				'Make sure setGalleryState() is called in +layout.svelte before using getGalleryState().'
		);
	}

	return galleryState;
}
