// The public origin of the site. Absolute links use it, not the request origin,
// which is a preview host on Vercel and a placeholder when SvelteKit prerenders.
export const SITE_URL = 'https://cardenaspacheco.com';

/** Carmen, the Artist, as a schema.org Person. */
export const ARTIST = { '@type': 'Person', name: 'Carmen Cárdenas Pacheco', url: SITE_URL };
