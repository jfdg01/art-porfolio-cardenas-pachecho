// The Paraglide options, shared by vite.config.ts and `npm run check`.
// `node paraglide.config.js` compiles the messages without Vite, for svelte-check.
// The routes live under English names, as the rest of the code (CONTEXT.md).
// Each pattern maps a route to its path in each Locale (ADR 0002). The first
// match wins, so the root and the translated paths come before the wildcard.

/** @param {string} route @param {string} es @param {string} en @returns {{ pattern: string, localized: Array<[string, string]> }} */
const translate = (route, es, en) => ({
	pattern: route,
	localized: [
		['en', en],
		['es', es]
	]
});

/** @type {import('@inlang/paraglide-js').CompilerOptions} */
const config = {
	project: './project.inlang',
	outdir: './src/lib/paraglide',
	emitTsDeclarations: true,
	strategy: ['url', 'baseLocale'],
	urlPatterns: [
		translate('/', '/', '/en'),
		translate('/artwork/:id', '/obra/:id', '/en/artwork/:id'),
		translate('/classes', '/clases', '/en/classes'),
		translate('/contact', '/contacto', '/en/contact'),
		translate('/:path(.*)?', '/:path(.*)?', '/en/:path(.*)?')
	]
};

export default config;

if (import.meta.main) await (await import('@inlang/paraglide-js')).compile(config);
