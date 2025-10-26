/**
 * TypeScript interfaces for the Gallery application
 */

export interface ImageVariant {
	name: string; // e.g., "main", "zoom-1", "zoom-2"
	src: string; // Image source URL
	alt?: string; // Alt text for accessibility
}

export interface Artwork {
	id: string;
	title: string;
	description?: string;
	price?: number;
	currency?: string; // 'EUR', 'USD', etc.
	images: ImageVariant[]; // All available image variants
	year?: number;
	dimensions?: {
		width: number;
		height: number;
		unit: string; // 'cm', 'in'
	};
	category: string | string[];
	isAvailable: boolean;
}

export interface GalleryState {
	artworks: Artwork[];
	selectedArtwork: Artwork | null;
}

/**
 * Artwork metadata interface for factory input
 * Excludes the images field which will be automatically fetched by ID
 */
export interface ArtworkMetadata {
	id: string;
	title: string;
	description?: string;
	year?: number;
	category: string | string[];
	isAvailable: boolean;
	price?: number;
	currency?: string;
	dimensions?: {
		width: number;
		height: number;
		unit: string;
	};
}
