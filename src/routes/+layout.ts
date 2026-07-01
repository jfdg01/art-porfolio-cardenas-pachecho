import { waitLocale } from 'svelte-i18n';
import { browser } from '$app/environment';
import { artworkData } from '$lib/data/artworkData';
import { stableShuffle } from '$lib/GalleryState.svelte';

const supportedLocales = ['es', 'en'] as const;
type SupportedLocale = (typeof supportedLocales)[number];

function isValidLocale(locale: string): locale is SupportedLocale {
	return (supportedLocales as readonly string[]).includes(locale);
}

export async function load({ url }) {
	let locale: SupportedLocale = 'es';

	const fromUrl = url.searchParams.get('lang');
	const fromStorage = browser ? localStorage.getItem('lang') : null;
	const fallback = browser ? (navigator.language || 'es').slice(0, 2) : 'es';

	const candidate = fromUrl || fromStorage || fallback;
	if (isValidLocale(candidate)) {
		locale = candidate;
	}

	await waitLocale(locale);

	// Deterministic shuffle so server and client render the same order
	return {
		locale,
		artworkData: stableShuffle(artworkData)
	};
}
