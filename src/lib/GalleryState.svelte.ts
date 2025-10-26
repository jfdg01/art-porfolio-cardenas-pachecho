/**
 * Gallery state management using modern Svelte 5 classes paradigm
 * This file implements the state management for the gallery application
 * using classes with runes and context API for global state sharing.
 */

import { getContext, setContext } from 'svelte';
import { SvelteSet } from 'svelte/reactivity';
import type { Artwork } from '$lib/types/artwork';
import { artworkData } from '$lib/data/artworkData';

const GALLERY_KEY = Symbol('gallery_state');

export type SortOption =
	| 'name-asc'
	| 'name-desc'
	| 'year-newest'
	| 'year-oldest'
	| 'category'
	| 'availability';

/**
 * Gallery state management class using modern Svelte 5 classes paradigm
 * Encapsulates all gallery-related state and methods using runes
 */
export class GalleryStateClass {
	// Reactive properties using $state rune
	artworks = $state<Artwork[]>(artworkData);
	selectedCategories = $state<string[]>([]);
	sortBy = $state<SortOption>('name-asc');
	showOnlyAvailable = $state<boolean>(false);

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
}

/**
 * Set gallery state in context (call in +layout.svelte)
 * Creates a new instance of GalleryStateClass and makes it available to all child components
 */
export function setGalleryState() {
	const galleryState = new GalleryStateClass();
	setContext(GALLERY_KEY, galleryState);
	return galleryState;
}

/**
 * Get gallery state from context (call in components)
 * Retrieves the shared gallery state instance from the context
 */
export function getGalleryState() {
	return getContext<GalleryStateClass>(GALLERY_KEY);
}
