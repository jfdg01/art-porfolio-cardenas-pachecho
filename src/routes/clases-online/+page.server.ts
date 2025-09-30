import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const seo = {
		title: 'Clases Online - Carmen Cárdenas Pacheco',
		description:
			'Descubre las clases de arte online de Carmen Cárdenas Pacheco. Aprende técnicas artísticas desde casa.',
		image: '/web-app-manifest-512x512.png',
		type: 'website',
		url: url.href,
		structuredData: {
			'@context': 'https://schema.org',
			'@type': 'Course',
			name: 'Clases Online de Arte',
			description: 'Clases de arte online impartidas por Carmen Cárdenas Pacheco',
			url: url.href,
			provider: {
				'@type': 'Person',
				name: 'Carmen Cárdenas Pacheco',
				url: 'https://www.cardenaspacheco.es'
			},
			instructor: {
				'@type': 'Person',
				name: 'Carmen Cárdenas Pacheco',
				jobTitle: 'Artista y Profesora de Arte'
			},
			courseMode: 'online',
			educationalLevel: 'beginner',
			teaches: ['Pintura', 'Técnicas Artísticas', 'Arte Contemporáneo'],
			audience: {
				'@type': 'Audience',
				audienceType: 'Estudiantes de arte'
			}
		}
	};

	return {
		seo
	};
};
