import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { CHANNELS } from '$lib';
import { getArtwork } from '$lib/artworks';
import { m } from '$lib/paraglide/messages';
import type { Actions, PageServerLoad } from './$types';

// The form action and the prefill need a request, so this page is not prerendered.
export const prerender = false;

// "Ask about this Artwork" links here with the Artwork ID. The subject names its Title.
export const load: PageServerLoad = ({ url }) => ({
	subject: getArtwork(url.searchParams.get('artwork') ?? '')?.title ?? ''
});

const LIMITS = { name: 200, email: 254, subject: 200, message: 5000 };
type Field = keyof typeof LIMITS;
const FIELDS = Object.keys(LIMITS) as Field[];

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		// A person never sees the honeypot field, so only a bot fills it. The bot sees success.
		if (form.get('website')) return { sent: true };

		const values = Object.fromEntries(
			FIELDS.map((field) => [field, String(form.get(field) ?? '').trim()])
		) as Record<Field, string>;
		const errors: Partial<Record<Field, string>> = {};
		if (!values.name) errors.name = m.nameRequired();
		if (!values.email) errors.email = m.emailRequired();
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = m.emailInvalid();
		if (!values.message) errors.message = m.messageRequired();
		for (const field of FIELDS)
			if (values[field].length > LIMITS[field])
				errors[field] = m.fieldTooLong({ max: LIMITS[field] });
		if (Object.keys(errors).length) return fail(400, { values, errors });

		// The Resend API, without its SDK: one request. The tests point RESEND_API_URL at a stub.
		try {
			const response = await fetch(`${env.RESEND_API_URL ?? 'https://api.resend.com'}/emails`, {
				method: 'POST',
				headers: {
					authorization: `Bearer ${env.RESEND_API_KEY}`,
					'content-type': 'application/json'
				},
				body: JSON.stringify({
					from: 'Web de Carmen Cárdenas Pacheco <web@cardenaspacheco.com>',
					to: [CHANNELS.email],
					reply_to: values.email,
					subject: `Consulta web: ${values.subject || values.name}`,
					text: `${values.name} <${values.email}> escribe desde cardenaspacheco.com:\n\n${values.message}`
				})
			});
			if (!response.ok) throw new Error(`${response.status} ${await response.text()}`);
		} catch (error) {
			console.error('Resend did not send the Enquiry:', error);
			return fail(502, { values, failed: true });
		}
		return { sent: true };
	}
};
