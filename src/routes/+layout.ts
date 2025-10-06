import { waitLocale } from 'svelte-i18n';
import { browser } from '$app/environment';

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

	return {
		locale
	};
}
