/**
 * Artwork metadata
 * This file contains artwork metadata that can be manually edited
 * Images are automatically loaded from artworkImages.ts via the factory function
 */

import type { Artwork } from '$lib/types/artwork';
import { createArtwork } from './artworkFactory';

export const artworkData: Artwork[] = [
	createArtwork({
		id: 'albor',
		title: 'Albor',
		description: 'Esto es un cuadro de un pajaro asbtracto', // TODO: Add description
		year: 2020,
		category: ['pintura'],
		isAvailable: false
	}),
	createArtwork({
		id: 'alcon-collage',
		title: 'Alcon Collage',
		description: '', // TODO: Add description
		category: ['pintura'],
		isAvailable: true,
		price: 350
	}),
	createArtwork({
		id: 'apunte-abstracto-1',
		title: 'Apunte Abstracto 1',
		description: '', // TODO: Add description
		category: ['apunte', 'pintura'],
		isAvailable: false
	}),
	createArtwork({
		id: 'apunte-abstracto-2',
		title: 'Apunte Abstracto 2',
		description: '', // TODO: Add description
		category: ['apunte', 'pintura'],
		isAvailable: true,
		price: 30
	}),
	createArtwork({
		id: 'apunte-abstracto-3',
		title: 'Apunte Abstracto 3',
		description: '', // TODO: Add description
		category: ['apunte', 'pintura'],
		isAvailable: true,
		price: 30
	}),
	createArtwork({
		id: 'apunte-acrilico-1',
		title: 'Apunte Acrilico 1',
		description: '', // TODO: Add description
		category: ['apunte', 'pintura'],
		isAvailable: true,
		price: 120
	}),
	createArtwork({
		id: 'apunte-acrilico-2',
		title: 'Apunte Acrilico 2',
		description: '', // TODO: Add description
		category: ['apunte', 'pintura'],
		isAvailable: true,
		price: 120
	}),
	createArtwork({
		id: 'apunte-acrilico-3',
		title: 'Apunte Acrilico 3',
		description: '', // TODO: Add description
		category: ['apunte', 'pintura'],
		isAvailable: false
	}),
	createArtwork({
		id: 'apunte-acrilico-4',
		title: 'Apunte Acrilico 4',
		description: '', // TODO: Add description
		category: ['apunte', 'pintura'],
		isAvailable: true,
		price: 120
	}),
	createArtwork({
		id: 'apunte-acuarela-paloma',
		title: 'Apunte Acuarela Paloma',
		description: '', // TODO: Add description
		category: ['apunte', 'acuarela'],
		isAvailable: false
	}),
	createArtwork({
		id: 'apunte-baeza-acuerela',
		title: 'Apunte Baeza Acuerela',
		description: '', // TODO: Add description
		category: ['apunte', 'acuarela'],
		isAvailable: false
	}),
	createArtwork({
		id: 'apunte-grafito',
		title: 'Apunte Grafito',
		description: '', // TODO: Add description
		category: ['apunte', 'dibujo'],
		isAvailable: false
	}),
	createArtwork({
		id: 'apunte-paisaje-acuarela-1',
		title: 'Apunte Paisaje Acuarela 1',
		description: '', // TODO: Add description
		category: ['apunte', 'acuarela'],
		isAvailable: false
	}),
	createArtwork({
		id: 'apunte-paisaje-acuarela-3',
		title: 'Apunte Paisaje Acuarela 3',
		description: '', // TODO: Add description
		category: ['apunte', 'acuarela'],
		isAvailable: false
	}),
	createArtwork({
		id: 'apunte-paisaje-acuarela-4',
		title: 'Apunte Paisaje Acuarela 4',
		description: '', // TODO: Add description
		category: ['apunte', 'acuarela'],
		isAvailable: false
	}),
	createArtwork({
		id: 'apunte-paisaje-acuarela-5',
		title: 'Apunte Paisaje Acuarela 5',
		description: '', // TODO: Add description
		category: ['apunte', 'acuarela'],
		isAvailable: false
	}),
	createArtwork({
		id: 'apunte-paisaje-collage-1',
		title: 'Apunte Paisaje Collage 1',
		description: '', // TODO: Add description
		category: ['apunte', 'pintura'],
		isAvailable: true,
		price: 40
	}),
	createArtwork({
		id: 'apunte-paisaje-collage-2',
		title: 'Apunte Paisaje Collage 2',
		description: '', // TODO: Add description
		category: ['apunte', 'pintura'],
		isAvailable: true,
		price: 40
	}),
	createArtwork({
		id: 'belong',
		title: 'Belong',
		description: '', // TODO: Add description
		category: ['acuarela'],
		isAvailable: false
	}),
	createArtwork({
		id: 'celebes-sea',
		title: 'Celebes Sea',
		description: '', // TODO: Add description
		category: ['acuarela'],
		isAvailable: false
	}),
	createArtwork({
		id: 'dama-acuarela',
		title: 'Dama Acuarela',
		description: '', // TODO: Add description
		category: ['acuarela'],
		isAvailable: false
	}),
	createArtwork({
		id: 'dama',
		title: 'Dama',
		description: '', // TODO: Add description
		category: ['dibujo'],
		isAvailable: true,
		price: 350
	}),
	createArtwork({
		id: 'estudio-anatomia',
		title: 'Estudio Anatomia',
		description: '', // TODO: Add description
		category: ['dibujo', 'apunte'],
		isAvailable: true,
		price: 350
	}),
	createArtwork({
		id: 'estudio-retrato-1',
		title: 'Estudio Retrato 1',
		description: '', // TODO: Add description
		category: ['acuarela', 'apunte'],
		isAvailable: true,
		price: 120
	}),
	createArtwork({
		id: 'estudio-retrato-2',
		title: 'Estudio Retrato 2',
		description: '', // TODO: Add description
		category: ['acuarela', 'apunte'],
		isAvailable: true,
		price: 120
	}),
	createArtwork({
		id: 'grafito-catedral',
		title: 'Grafito Catedral',
		description: '', // TODO: Add description
		category: ['dibujo'],
		isAvailable: false
	}),
	createArtwork({
		id: 'hombre-con-barba',
		title: 'Hombre Con Barba',
		description: '', // TODO: Add description
		category: ['acuarela'],
		isAvailable: true,
		price: 370
	}),
	createArtwork({
		id: 'inherente',
		title: 'Inherente',
		description: '', // TODO: Add description
		category: ['dibujo'],
		isAvailable: true,
		price: 470
	}),
	createArtwork({
		id: 'lechera',
		title: 'Lechera',
		description: '', // TODO: Add description
		category: ['pintura'],
		isAvailable: false
	}),
	createArtwork({
		id: 'notional',
		title: 'Notional',
		description: '', // TODO: Add description
		category: ['pintura'],
		isAvailable: false
	}),
	createArtwork({
		id: 'nuevos-acercamientos',
		title: 'Nuevos Acercamientos',
		description: '', // TODO: Add description
		category: ['acuarela'],
		isAvailable: false
	}),
	createArtwork({
		id: 'perpetuidad',
		title: 'Perpetuidad',
		description: '', // TODO: Add description
		category: ['acuarela'],
		isAvailable: false
	}),
	createArtwork({
		id: 'provecto',
		title: 'Provecto',
		description: '', // TODO: Add description
		category: ['acuarela'],
		isAvailable: true,
		price: 370
	}),
	createArtwork({
		id: 'retrato-del-fayum',
		title: 'Retrato Del Fayum',
		description: '', // TODO: Add description
		category: ['grabado'],
		isAvailable: true,
		price: 60
	}),
	createArtwork({
		id: 'retrato-sanguina',
		title: 'Retrato Sanguina',
		description: '', // TODO: Add description
		category: ['dibujo'],
		isAvailable: false
	}),
	createArtwork({
		id: 'summary',
		title: 'Summary',
		description: '', // TODO: Add description
		category: ['dibujo', 'pintura'],
		isAvailable: false
	}),
	createArtwork({
		id: 'the-joke',
		title: 'The Joke',
		description: '', // TODO: Add description
		category: ['pintura'],
		isAvailable: false
	}),
	createArtwork({
		id: 'the-rockero',
		title: 'The Rockero',
		description: '', // TODO: Add description
		category: ['pintura'],
		isAvailable: false
	}),
	createArtwork({
		id: 'theophany',
		title: 'Theophany',
		description: '', // TODO: Add description
		category: ['acuarela'],
		isAvailable: true,
		price: 430
	}),
	createArtwork({
		id: 'time-after-time',
		title: 'Time After Time',
		description: '', // TODO: Add description
		category: ['dibujo'],
		isAvailable: false
	}),
	createArtwork({
		id: 'tragaluz',
		title: 'Tragaluz',
		description: '', // TODO: Add description
		category: ['pintura'],
		isAvailable: true,
		price: 350
	}),
	createArtwork({
		id: 'vetusto',
		title: 'Vetusto',
		description: '', // TODO: Add description
		category: ['dibujo'],
		isAvailable: false
	}),
	createArtwork({
		id: 'xauen',
		title: 'Xauen',
		description: '', // TODO: Add description
		category: ['acuarela'],
		isAvailable: false
	}),
	createArtwork({
		id: 'zalema',
		title: 'Zalema',
		description: '', // TODO: Add description
		category: ['pintura'],
		isAvailable: false
	})
];
