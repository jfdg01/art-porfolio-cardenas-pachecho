// src/lib/i18n.ts
import { register, init } from 'svelte-i18n';

register('en', () => import('./locales/en.json'));
register('es', () => import('./locales/es.json'));
register('fr', () => import('./locales/fr.json'));
register('de', () => import('./locales/de.json'));
register('it', () => import('./locales/it.json'));
register('ru', () => import('./locales/ru.json'));
register('pt', () => import('./locales/pt.json'));
register('cn', () => import('./locales/cn.json'));
register('jp', () => import('./locales/jp.json'));
register('kr', () => import('./locales/kr.json'));
register('hi', () => import('./locales/hi.json'));
register('he', () => import('./locales/he.json'));

// Initialize with proper SSR handling
init({
	fallbackLocale: 'es',
	initialLocale: 'es'
});
