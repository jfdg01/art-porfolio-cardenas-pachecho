/**
 * Gallery state management using modern Svelte 5 classes paradigm
 * This file implements the state management for the gallery application
 * using classes with runes and context API for global state sharing.
 */

import { getContext, setContext } from 'svelte';
import { SvelteSet } from 'svelte/reactivity';
import type { Artwork } from '$lib/types/artwork';

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

	constructor(artworkData: Artwork[]) {
		this.artworks = artworkData;
	}

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

	/**
	 * Sort artworks based on current sortBy state
	 */
	private sortArtworks(artworks: Artwork[]): Artwork[] {
		const sorted = [...artworks];

		switch (this.sortBy) {
			case 'name-asc':
				return sorted.sort((a, b) => a.title.localeCompare(b.title));

			case 'name-desc':
				return sorted.sort((a, b) => b.title.localeCompare(a.title));

			case 'year-newest':
				return sorted.sort((a, b) => {
					// Handle missing years - place at end
					if (!a.year && !b.year) return 0;
					if (!a.year) return 1;
					if (!b.year) return -1;
					return b.year - a.year;
				});

			case 'year-oldest':
				return sorted.sort((a, b) => {
					// Handle missing years - place at end
					if (!a.year && !b.year) return 0;
					if (!a.year) return 1;
					if (!b.year) return -1;
					return a.year - b.year;
				});

			case 'category':
				return sorted.sort((a, b) => {
					const catA = Array.isArray(a.category) ? a.category[0] : a.category;
					const catB = Array.isArray(b.category) ? b.category[0] : b.category;
					return catA.localeCompare(catB);
				});

			case 'availability':
				return sorted.sort((a, b) => {
					// Available items first
					if (a.isAvailable && !b.isAvailable) return -1;
					if (!a.isAvailable && b.isAvailable) return 1;
					return 0;
				});

			case 'random':
				// Shuffle the array randomly
				return sorted.sort(() => Math.random() - 0.5);

			default:
				return sorted;
		}
	}

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
	 * @param count - Number of artworks to return (defaults to 6)
	 * @returns Random array of artworks
	 */
	getRandomArtworks(count: number = 6): Artwork[] {
		const shuffled = [...this.artworks].sort(() => Math.random() - 0.5);
		return shuffled.slice(0, Math.min(count, this.artworks.length));
	}

	/**
	 * Get random artworks from filtered results
	 * Respects current filters and returns a random selection
	 * @param count - Number of artworks to return (defaults to 6)
	 * @returns Random array of filtered artworks
	 */
	getRandomFilteredArtworks(count: number = 6): Artwork[] {
		const shuffled = [...this.filteredArtworks].sort(() => Math.random() - 0.5);
		return shuffled.slice(0, Math.min(count, this.filteredArtworks.length));
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
