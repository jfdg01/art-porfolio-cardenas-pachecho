/**
 * Artwork metadata
 * This file contains artwork metadata that can be manually edited
 * Images are automatically loaded from artworkImages.ts
 */

import type { Artwork } from '$lib/types/artwork';
import { artworkImages } from './artworkImages';

export const artworkData: Artwork[] = [
	{
		id: 'albor',
		title: 'Albor',
		description: 'Esto es un cuadro de un pajaro asbtracto', // TODO: Add description
		images: artworkImages['albor'],
		year: 2020,
		category: ['pintura'],
		isAvailable: false
	},
	{
		id: 'alcon-collage',
		title: 'Alcon Collage',
		description: '', // TODO: Add description
		images: artworkImages['alcon-collage'],
		category: ['pintura'],
		isAvailable: false
	},
	{
		id: 'apunte-abstracto-1',
		title: 'Apunte Abstracto 1',
		description: '', // TODO: Add description
		images: artworkImages['apunte-abstracto-1'],
		category: ['apunte', 'pintura'],
		isAvailable: false
	},
	{
		id: 'apunte-abstracto-2',
		title: 'Apunte Abstracto 2',
		description: '', // TODO: Add description
		images: artworkImages['apunte-abstracto-2'],
		category: ['apunte', 'pintura'],
		isAvailable: false
	},
	{
		id: 'apunte-abstracto-3',
		title: 'Apunte Abstracto 3',
		description: '', // TODO: Add description
		images: artworkImages['apunte-abstracto-3'],
		category: ['apunte', 'pintura'],
		isAvailable: false
	},
	{
		id: 'apunte-acrilico-1',
		title: 'Apunte Acrilico 1',
		description: '', // TODO: Add description
		images: artworkImages['apunte-acrilico-1'],
		category: ['apunte', 'pintura'],
		isAvailable: false
	},
	{
		id: 'apunte-acrilico-2',
		title: 'Apunte Acrilico 2',
		description: '', // TODO: Add description
		images: artworkImages['apunte-acrilico-2'],
		category: ['apunte', 'pintura'],
		isAvailable: false
	},
	{
		id: 'apunte-acrilico-3',
		title: 'Apunte Acrilico 3',
		description: '', // TODO: Add description
		images: artworkImages['apunte-acrilico-3'],
		category: ['apunte', 'pintura'],
		isAvailable: false
	},
	{
		id: 'apunte-acrilico-4',
		title: 'Apunte Acrilico 4',
		description: '', // TODO: Add description
		images: artworkImages['apunte-acrilico-4'],
		category: ['apunte', 'pintura'],
		isAvailable: false
	},
	{
		id: 'apunte-acuarela-paloma',
		title: 'Apunte Acuarela Paloma',
		description: '', // TODO: Add description
		images: artworkImages['apunte-acuarela-paloma'],
		category: ['apunte', 'acuarela'],
		isAvailable: false
	},
	{
		id: 'apunte-baeza-acuerela',
		title: 'Apunte Baeza Acuerela',
		description: '', // TODO: Add description
		images: artworkImages['apunte-baeza-acuerela'],
		category: ['apunte', 'acuarela'],
		isAvailable: false
	},
	{
		id: 'apunte-grafito',
		title: 'Apunte Grafito',
		description: '', // TODO: Add description
		images: artworkImages['apunte-grafito'],
		category: ['apunte', 'dibujo'],
		isAvailable: false
	},
	{
		id: 'apunte-paisaje-acuarela-1',
		title: 'Apunte Paisaje Acuarela 1',
		description: '', // TODO: Add description
		images: artworkImages['apunte-paisaje-acuarela-1'],
		category: ['apunte', 'acuarela'],
		isAvailable: false
	},
	{
		id: 'apunte-paisaje-acuarela-3',
		title: 'Apunte Paisaje Acuarela 3',
		description: '', // TODO: Add description
		images: artworkImages['apunte-paisaje-acuarela-3'],
		category: ['apunte', 'acuarela'],
		isAvailable: false
	},
	{
		id: 'apunte-paisaje-acuarela-4',
		title: 'Apunte Paisaje Acuarela 4',
		description: '', // TODO: Add description
		images: artworkImages['apunte-paisaje-acuarela-4'],
		category: ['apunte', 'acuarela'],
		isAvailable: false
	},
	{
		id: 'apunte-paisaje-acuarela-5',
		title: 'Apunte Paisaje Acuarela 5',
		description: '', // TODO: Add description
		images: artworkImages['apunte-paisaje-acuarela-5'],
		category: ['apunte', 'acuarela'],
		isAvailable: false
	},
	{
		id: 'apunte-paisaje-collage-1',
		title: 'Apunte Paisaje Collage 1',
		description: '', // TODO: Add description
		images: artworkImages['apunte-paisaje-collage-1'],
		category: ['apunte', 'pintura'],
		isAvailable: false
	},
	{
		id: 'apunte-paisaje-collage-2',
		title: 'Apunte Paisaje Collage 2',
		description: '', // TODO: Add description
		images: artworkImages['apunte-paisaje-collage-2'],
		category: ['apunte', 'pintura'],
		isAvailable: false
	},
	{
		id: 'belong',
		title: 'Belong',
		description: '', // TODO: Add description
		images: artworkImages['belong'],
		category: ['acuarela'],
		isAvailable: false
	},
	{
		id: 'celebes-sea',
		title: 'Celebes Sea',
		description: '', // TODO: Add description
		images: artworkImages['celebes-sea'],
		category: ['acuarela'],
		isAvailable: false
	},
	{
		id: 'dama-acuarela',
		title: 'Dama Acuarela',
		description: '', // TODO: Add description
		images: artworkImages['dama-acuarela'],
		category: ['acuarela'],
		isAvailable: false
	},
	{
		id: 'dama',
		title: 'Dama',
		description: '', // TODO: Add description
		images: artworkImages['dama'],
		category: ['dibujo'],
		isAvailable: false
	},
	{
		id: 'estudio-anatomia',
		title: 'Estudio Anatomia',
		description: '', // TODO: Add description
		images: artworkImages['estudio-anatomia'],
		category: ['dibujo', 'apunte'],
		isAvailable: false
	},
	{
		id: 'estudio-retrato-1',
		title: 'Estudio Retrato 1',
		description: '', // TODO: Add description
		images: artworkImages['estudio-retrato-1'],
		category: ['acuarela', 'apunte'],
		isAvailable: false
	},
	{
		id: 'estudio-retrato-2',
		title: 'Estudio Retrato 2',
		description: '', // TODO: Add description
		images: artworkImages['estudio-retrato-2'],
		category: ['acuarela', 'apunte'],
		isAvailable: false
	},
	{
		id: 'grafito-catedral',
		title: 'Grafito Catedral',
		description: '', // TODO: Add description
		images: artworkImages['grafito-catedral'],
		category: ['dibujo'],
		isAvailable: false
	},
	{
		id: 'hombre-con-barba',
		title: 'Hombre Con Barba',
		description: '', // TODO: Add description
		images: artworkImages['hombre-con-barba'],
		category: ['acuarela'],
		isAvailable: false
	},
	{
		id: 'inherente',
		title: 'Inherente',
		description: '', // TODO: Add description
		images: artworkImages['inherente'],
		category: ['dibujo'],
		isAvailable: false
	},
	{
		id: 'lechera',
		title: 'Lechera',
		description: '', // TODO: Add description
		images: artworkImages['lechera'],
		category: ['pintura'],
		isAvailable: false
	},
	{
		id: 'notional',
		title: 'Notional',
		description: '', // TODO: Add description
		images: artworkImages['notional'],
		category: ['pintura'],
		isAvailable: false
	},
	{
		id: 'nuevos-acercamientos',
		title: 'Nuevos Acercamientos',
		description: '', // TODO: Add description
		images: artworkImages['nuevos-acercamientos'],
		category: ['acuarela'],
		isAvailable: false
	},
	{
		id: 'perpetuidad',
		title: 'Perpetuidad',
		description: '', // TODO: Add description
		images: artworkImages['perpetuidad'],
		category: ['acuarela'],
		isAvailable: false
	},
	{
		id: 'provecto',
		title: 'Provecto',
		description: '', // TODO: Add description
		images: artworkImages['provecto'],
		category: ['acuarela'],
		isAvailable: false
	},
	{
		id: 'retrato-del-fayum',
		title: 'Retrato Del Fayum',
		description: '', // TODO: Add description
		images: artworkImages['retrato-del-fayum'],
		category: ['grabado'],
		isAvailable: false
	},
	{
		id: 'retrato-sanguina',
		title: 'Retrato Sanguina',
		description: '', // TODO: Add description
		images: artworkImages['retrato-sanguina'],
		category: ['dibujo'],
		isAvailable: false
	},
	{
		id: 'summary',
		title: 'Summary',
		description: '', // TODO: Add description
		images: artworkImages['summary'],
		category: ['dibujo', 'pintura'],
		isAvailable: false
	},
	{
		id: 'the-joke',
		title: 'The Joke',
		description: '', // TODO: Add description
		images: artworkImages['the-joke'],
		category: ['pintura'],
		isAvailable: false
	},
	{
		id: 'the-rockero',
		title: 'The Rockero',
		description: '', // TODO: Add description
		images: artworkImages['the-rockero'],
		category: ['pintura'],
		isAvailable: false
	},
	{
		id: 'theophany',
		title: 'Theophany',
		description: '', // TODO: Add description
		images: artworkImages['theophany'],
		category: ['acuarela'],
		isAvailable: false
	},
	{
		id: 'time-after-time',
		title: 'Time After Time',
		description: '', // TODO: Add description
		images: artworkImages['time-after-time'],
		category: ['dibujo'],
		isAvailable: false
	},
	{
		id: 'tragaluz',
		title: 'Tragaluz',
		description: '', // TODO: Add description
		images: artworkImages['tragaluz'],
		category: ['pintura'],
		isAvailable: false
	},
	{
		id: 'vetusto',
		title: 'Vetusto',
		description: '', // TODO: Add description
		images: artworkImages['vetusto'],
		category: ['dibujo'],
		isAvailable: false
	},
	{
		id: 'xauen',
		title: 'Xauen',
		description: '', // TODO: Add description
		images: artworkImages['xauen'],
		category: ['acuarela'],
		isAvailable: false
	},
	{
		id: 'zalema',
		title: 'Zalema',
		description: '', // TODO: Add description
		images: artworkImages['zalema'],
		category: ['pintura'],
		isAvailable: false
	}
];
