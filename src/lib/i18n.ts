// src/lib/i18n.ts
import { register, init } from 'svelte-i18n';

register('en', () => import('./locales/en.json'));
register('es', () => import('./locales/es.json'));

// Initialize with proper SSR handling
init({
	fallbackLocale: 'es',
	initialLocale: 'es'
});
