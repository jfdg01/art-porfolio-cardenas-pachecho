/**
 * Artwork metadata
 * This file contains artwork metadata that can be manually edited
 * Images are automatically loaded from artworkImages.ts via the factory function
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
function createArtwork(metadata: ArtworkMetadata): Artwork {
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

/**
 * Artwork metadata array
 * Images are automatically loaded via the createArtwork factory function
 */
const artworkMetadata: ArtworkMetadata[] = [
	{
		id: 'albor',
		title: 'Albor',
		description: 'Esto es un cuadro de un pajaro asbtracto', // TODO: Add description
		year: 2020,
		tags: ['pintura'],
		isAvailable: false
	},
	{
		id: 'alcon-collage',
		title: 'Alcon Collage',
		description: '', // TODO: Add description
		tags: ['pintura'],
		isAvailable: true
	},
	{
		id: 'apunte-abstracto-1',
		title: 'Apunte Abstracto 1',
		description: '', // TODO: Add description
		tags: ['apunte', 'pintura'],
		isAvailable: false
	},
	{
		id: 'apunte-abstracto-2',
		title: 'Apunte Abstracto 2',
		description: '', // TODO: Add description
		tags: ['apunte', 'pintura'],
		isAvailable: true
	},
	{
		id: 'apunte-abstracto-3',
		title: 'Apunte Abstracto 3',
		description: '', // TODO: Add description
		tags: ['apunte', 'pintura'],
		isAvailable: true
	},
	{
		id: 'apunte-acrilico-1',
		title: 'Apunte Acrilico 1',
		description: '', // TODO: Add description
		tags: ['apunte', 'pintura'],
		isAvailable: true
	},
	{
		id: 'apunte-acrilico-2',
		title: 'Apunte Acrilico 2',
		description: '', // TODO: Add description
		tags: ['apunte', 'pintura'],
		isAvailable: true
	},
	{
		id: 'apunte-acrilico-3',
		title: 'Apunte Acrilico 3',
		description: '', // TODO: Add description
		tags: ['apunte', 'pintura'],
		isAvailable: false
	},
	{
		id: 'apunte-acrilico-4',
		title: 'Apunte Acrilico 4',
		description: '', // TODO: Add description
		tags: ['apunte', 'pintura'],
		isAvailable: true
	},
	{
		id: 'apunte-acuarela-paloma',
		title: 'Apunte Acuarela Paloma',
		description: '', // TODO: Add description
		tags: ['apunte', 'acuarela'],
		isAvailable: false
	},
	{
		id: 'apunte-baeza-acuerela',
		title: 'Apunte Baeza Acuerela',
		description: '', // TODO: Add description
		tags: ['apunte', 'acuarela'],
		isAvailable: false
	},
	{
		id: 'apunte-grafito',
		title: 'Apunte Grafito',
		description: '', // TODO: Add description
		tags: ['apunte', 'dibujo'],
		isAvailable: false
	},
	{
		id: 'apunte-paisaje-acuarela-1',
		title: 'Apunte Paisaje Acuarela 1',
		description: '', // TODO: Add description
		tags: ['apunte', 'acuarela'],
		isAvailable: false
	},
	{
		id: 'apunte-paisaje-acuarela-3',
		title: 'Apunte Paisaje Acuarela 3',
		description: '', // TODO: Add description
		tags: ['apunte', 'acuarela'],
		isAvailable: false
	},
	{
		id: 'apunte-paisaje-acuarela-4',
		title: 'Apunte Paisaje Acuarela 4',
		description: '', // TODO: Add description
		tags: ['apunte', 'acuarela'],
		isAvailable: false
	},
	{
		id: 'apunte-paisaje-acuarela-5',
		title: 'Apunte Paisaje Acuarela 5',
		description: '', // TODO: Add description
		tags: ['apunte', 'acuarela'],
		isAvailable: false
	},
	{
		id: 'apunte-paisaje-collage-1',
		title: 'Apunte Paisaje Collage 1',
		description: '', // TODO: Add description
		tags: ['apunte', 'pintura'],
		isAvailable: true
	},
	{
		id: 'apunte-paisaje-collage-2',
		title: 'Apunte Paisaje Collage 2',
		description: '', // TODO: Add description
		tags: ['apunte', 'pintura'],
		isAvailable: true
	},
	{
		id: 'belong',
		title: 'Belong',
		description: '', // TODO: Add description
		tags: ['acuarela'],
		isAvailable: false
	},
	{
		id: 'celebes-sea',
		title: 'Celebes Sea',
		description: '', // TODO: Add description
		tags: ['acuarela'],
		isAvailable: false
	},
	{
		id: 'dama-acuarela',
		title: 'Dama Acuarela',
		description: '', // TODO: Add description
		tags: ['acuarela'],
		isAvailable: false
	},
	{
		id: 'dama',
		title: 'Dama',
		description: '', // TODO: Add description
		tags: ['dibujo'],
		isAvailable: true
	},
	{
		id: 'estudio-anatomia',
		title: 'Estudio Anatomia',
		description: '', // TODO: Add description
		tags: ['dibujo', 'apunte'],
		isAvailable: true
	},
	{
		id: 'estudio-retrato-1',
		title: 'Estudio Retrato 1',
		description: '', // TODO: Add description
		tags: ['acuarela', 'apunte'],
		isAvailable: true
	},
	{
		id: 'estudio-retrato-2',
		title: 'Estudio Retrato 2',
		description: '', // TODO: Add description
		tags: ['acuarela', 'apunte'],
		isAvailable: true
	},
	{
		id: 'grafito-catedral',
		title: 'Grafito Catedral',
		description: '', // TODO: Add description
		tags: ['dibujo'],
		isAvailable: false
	},
	{
		id: 'hombre-con-barba',
		title: 'Hombre Con Barba',
		description: '', // TODO: Add description
		tags: ['acuarela'],
		isAvailable: true
	},
	{
		id: 'inherente',
		title: 'Inherente',
		description: '', // TODO: Add description
		tags: ['dibujo'],
		isAvailable: true
	},
	{
		id: 'lechera',
		title: 'Lechera',
		description: '', // TODO: Add description
		tags: ['pintura'],
		isAvailable: false
	},
	{
		id: 'notional',
		title: 'Notional',
		description: '', // TODO: Add description
		tags: ['pintura'],
		isAvailable: false
	},
	{
		id: 'nuevos-acercamientos',
		title: 'Nuevos Acercamientos',
		description: '', // TODO: Add description
		tags: ['acuarela'],
		isAvailable: false
	},
	{
		id: 'perpetuidad',
		title: 'Perpetuidad',
		description: '', // TODO: Add description
		tags: ['acuarela'],
		isAvailable: false
	},
	{
		id: 'provecto',
		title: 'Provecto',
		description: '', // TODO: Add description
		tags: ['acuarela'],
		isAvailable: true
	},
	{
		id: 'retrato-del-fayum',
		title: 'Retrato Del Fayum',
		description: '', // TODO: Add description
		tags: ['grabado'],
		isAvailable: true
	},
	{
		id: 'retrato-sanguina',
		title: 'Retrato Sanguina',
		description: '', // TODO: Add description
		tags: ['dibujo'],
		isAvailable: false
	},
	{
		id: 'summary',
		title: 'Summary',
		description: '', // TODO: Add description
		tags: ['dibujo', 'pintura'],
		isAvailable: false
	},
	{
		id: 'the-joke',
		title: 'The Joke',
		description: '', // TODO: Add description
		tags: ['pintura'],
		isAvailable: false
	},
	{
		id: 'the-rockero',
		title: 'The Rockero',
		description: '', // TODO: Add description
		tags: ['pintura'],
		isAvailable: false
	},
	{
		id: 'theophany',
		title: 'Theophany',
		description: '', // TODO: Add description
		tags: ['acuarela'],
		isAvailable: true
	},
	{
		id: 'time-after-time',
		title: 'Time After Time',
		description: '', // TODO: Add description
		tags: ['dibujo'],
		isAvailable: false
	},
	{
		id: 'tragaluz',
		title: 'Tragaluz',
		description: '', // TODO: Add description
		tags: ['pintura'],
		isAvailable: true
	},
	{
		id: 'vetusto',
		title: 'Vetusto',
		description: '', // TODO: Add description
		tags: ['dibujo'],
		isAvailable: false
	},
	{
		id: 'xauen',
		title: 'Xauen',
		description: '', // TODO: Add description
		tags: ['acuarela'],
		isAvailable: false
	},
	{
		id: 'zalema',
		title: 'Zalema',
		description: '', // TODO: Add description
		tags: ['pintura'],
		isAvailable: false
	}
];

// Create complete artwork objects by mapping metadata with images
export const artworkData: Artwork[] = artworkMetadata.map(createArtwork);
