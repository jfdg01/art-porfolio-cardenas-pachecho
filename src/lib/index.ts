// The public origin of the site. Absolute links use it, not the request origin,
// which is a preview host on Vercel and a placeholder when SvelteKit prerenders.
export const SITE_URL = 'https://cardenaspacheco.com';

/** Carmen, the Artist, as a schema.org Person. */
export const ARTIST = { '@type': 'Person', name: 'Carmen Cárdenas Pacheco', url: SITE_URL };

/** The Contact Channels besides the form (CONTEXT.md). The form sends to this email too. */
export const CHANNELS = {
	email: 'cardenaspachecocarmenalejandra@gmail.com',
	phone: '+34 628 672 368',
	whatsapp: 'https://wa.me/34628672368',
	instagram: 'cardenas.pacheco'
};
