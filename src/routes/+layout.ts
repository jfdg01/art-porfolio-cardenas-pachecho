import { waitLocale } from 'svelte-i18n';
import { browser } from '$app/environment';
import { artworkData } from '$lib/data/artworkData';
import type { Artwork } from '$lib/types/artwork';

// Define all supported language codes
type SupportedLocale =
	| 'en'
	| 'es'
	| 'fr'
	| 'de'
	| 'it'
	| 'ru'
	| 'pt'
	| 'cn'
	| 'jp'
	| 'kr'
	| 'hi'
	| 'he';

const supportedLocales: SupportedLocale[] = [
	'en',
	'es',
	'fr',
	'de',
	'it',
	'ru',
	'pt',
	'cn',
	'jp',
	'kr',
	'hi',
	'he'
];

function isValidLocale(locale: string): locale is SupportedLocale {
	return supportedLocales.includes(locale as SupportedLocale);
}

/**
 * Simple deterministic hash function for pseudo-random sorting
 * This ensures the same "random" order across server and client renders
 */
function simpleHash(str: string): number {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash = hash & hash; // Convert to 32-bit integer
	}
	return hash;
}

/**
 * Stable deterministic sort for artworks
 * Uses a pseudo-random hash based on artwork ID to create a consistent "random" order
 * This prevents hydration errors by ensuring server and client see the same order
 */
function stableSortArtworks(artworks: Artwork[]): Artwork[] {
	return [...artworks].sort((a, b) => {
		const hashA = simpleHash(a.id);
		const hashB = simpleHash(b.id);
		return hashA - hashB;
	});
}

export async function load({ url }) {
	// Determine the locale from URL params, localStorage, or default to 'es'
	let locale: SupportedLocale = 'es'; // Default locale

	if (browser) {
		// In browser, check URL params and localStorage
		const fromUrl = url.searchParams.get('lang');
		const fromStorage = localStorage.getItem('lang');
		const fallback = (navigator.language || 'es').slice(0, 2);

		const candidate = fromUrl || fromStorage || fallback;
		if (isValidLocale(candidate)) {
			locale = candidate;
		}
	} else {
		// During SSR, use URL params or default
		const candidate = url.searchParams.get('lang') || 'es';
		if (isValidLocale(candidate)) {
			locale = candidate;
		}
	}

	// Wait for the locale to be loaded before proceeding
	await waitLocale(locale);

	// Apply stable deterministic sorting to prevent hydration errors
	// This ensures server and client have the same initial order
	const sortedArtworkData = stableSortArtworks(artworkData);

	return {
		locale,
		artworkData: sortedArtworkData
	};
}
