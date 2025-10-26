/**
 * Artwork Factory Module
 * This module provides a factory function to create artwork objects
 * with explicit validation to ensure images are correctly matched to their IDs
 */

import type { Artwork, ArtworkMetadata } from '$lib/types/artwork';
import { artworkImages } from './artworkImages';

/**
 * Factory function to create artwork objects
 * Explicitly fetches images based on the artwork ID and validates they exist
 * @param metadata - The artwork metadata (without images)
 * @returns Complete Artwork object with images
 * @throws Error if images are missing for the given ID
 */
export function createArtwork(metadata: ArtworkMetadata): Artwork {
	const images = artworkImages[metadata.id as keyof typeof artworkImages];

	if (!images || images.length === 0) {
		throw new Error(
			`Missing images for artwork: ${metadata.id}. ` +
				`Please ensure images exist in artworkImages.ts for this ID.`
		);
	}

	return {
		...metadata,
		images
	};
}
