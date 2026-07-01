import { register, init } from 'svelte-i18n';

register('es', () => import('./locales/es.json'));
register('en', () => import('./locales/en.json'));

init({
	fallbackLocale: 'es',
	initialLocale: 'es'
});
