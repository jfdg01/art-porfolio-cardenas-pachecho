import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const seo = {
		title: 'Contacto - Carmen Cárdenas Pacheco',
		description:
			'Contacta con Carmen Cárdenas Pacheco para consultas sobre su obra artística, compras y colaboraciones.',
		image: '/web-app-manifest-512x512.png',
		type: 'website',
		url: url.href,
		structuredData: {
			'@context': 'https://schema.org',
			'@type': 'ContactPage',
			name: 'Contacto - Carmen Cárdenas Pacheco',
			description:
				'Contacta con Carmen Cárdenas Pacheco para consultas sobre su obra artística, compras y colaboraciones.',
			url: url.href,
			mainEntity: {
				'@type': 'Person',
				name: 'Carmen Cárdenas Pacheco',
				email: 'cardenaspachecocarmenalejandra@gmail.com',
				url: 'https://cardenaspacheco.es',
				jobTitle: 'Artista',
				description: 'Artista contemporánea especializada en pintura y técnicas mixtas'
			}
		}
	};

	return {
		seo
	};
};
