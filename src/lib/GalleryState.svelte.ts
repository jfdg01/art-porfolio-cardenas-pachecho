/**
 * Gallery state shared via Svelte context: filtering, sorting, categories.
 */

import { getContext, setContext } from 'svelte';
import { SvelteSet } from 'svelte/reactivity';
import type { Artwork } from '$lib/types/artwork';

const GALLERY_KEY = Symbol('gallery_state');

export type SortOption = 'name-asc' | 'name-desc' | 'category' | 'random';

/**
 * Deterministic hash so "random" order is identical on server and client
 * (a real shuffle would cause hydration mismatches).
 */
function simpleHash(str: string): number {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = (hash << 5) - hash + str.charCodeAt(i);
		hash = hash & hash;
	}
	return hash;
}

/** Deterministic pseudo-random ordering, stable across SSR and client. */
export function stableShuffle(artworks: Artwork[]): Artwork[] {
	return [...artworks].sort((a, b) => simpleHash(a.id) - simpleHash(b.id));
}

export class GalleryStateClass {
	artworks = $state<Artwork[]>([]);
	selectedCategories = $state<string[]>([]);
	sortBy = $state<SortOption>('random');
	showOnlyAvailable = $state<boolean>(false);

	constructor(artworkData: Artwork[]) {
		this.artworks = artworkData;
	}

	filteredArtworks = $derived.by(() => {
		let filtered = this.artworks;

		if (this.selectedCategories.length > 0) {
			filtered = filtered.filter((artwork) => {
				const cats = Array.isArray(artwork.category) ? artwork.category : [artwork.category];
				return cats.some((cat) => this.selectedCategories.includes(cat));
			});
		}

		if (this.showOnlyAvailable) {
			filtered = filtered.filter((artwork) => artwork.isAvailable);
		}

		return this.sortArtworks(filtered);
	});

	private sortArtworks(artworks: Artwork[]): Artwork[] {
		const sorted = [...artworks];

		switch (this.sortBy) {
			case 'name-asc':
				return sorted.sort(
					(a, b) => a.title.localeCompare(b.title) || a.id.localeCompare(b.id)
				);

			case 'name-desc':
				return sorted.sort(
					(a, b) => b.title.localeCompare(a.title) || a.id.localeCompare(b.id)
				);

			case 'category':
				return sorted.sort((a, b) => {
					const catA = Array.isArray(a.category) ? a.category[0] : a.category;
					const catB = Array.isArray(b.category) ? b.category[0] : b.category;
					return catA.localeCompare(catB) || a.id.localeCompare(b.id);
				});

			case 'random':
			default:
				return stableShuffle(sorted);
		}
	}

	availableCategories = $derived.by(() => {
		const categories = new SvelteSet<string>();
		this.artworks.forEach((artwork) => {
			const cats = Array.isArray(artwork.category) ? artwork.category : [artwork.category];
			cats.forEach((cat) => categories.add(cat));
		});
		return Array.from(categories).sort();
	});

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
}

/** Create the gallery state once (in +layout.svelte) and share it via context. */
export function setGalleryState(artworkData: Artwork[]) {
	let galleryState = getContext<GalleryStateClass | undefined>(GALLERY_KEY);
	if (!galleryState) {
		galleryState = new GalleryStateClass(artworkData);
		setContext(GALLERY_KEY, galleryState);
	}
	return galleryState;
}

export function getGalleryState() {
	const galleryState = getContext<GalleryStateClass | undefined>(GALLERY_KEY);
	if (!galleryState) {
		throw new Error('GalleryState not found in context. Call setGalleryState() in +layout.svelte first.');
	}
	return galleryState;
}
