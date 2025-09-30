<script lang="ts">
	import { page } from '$app/state';

	interface SEOData {
		title: string;
		description: string;
		image: string;
		type: string;
		url: string;
		structuredData?: Record<string, unknown>;
	}

	interface SEOProps {
		seo?: SEOData;
		noIndex?: boolean;
	}

	let { seo, noIndex = false }: SEOProps = $props();

	const SITE_URL = 'https://www.cardenaspacheco.es';

	// Default SEO data
	const defaultSEO: SEOData = {
		title: 'Carmen Cárdenas Pacheco',
		description: 'Galería de arte de Carmen Cárdenas Pacheco',
		image: '/web-app-manifest-512x512.png',
		type: 'website',
		url: `${SITE_URL}${page.url.pathname}`
	};

	// Use provided SEO data or fallback to defaults
	const currentSEO = seo || defaultSEO;

	// Ensure image URL is absolute
	const absoluteImageUrl = currentSEO.image.startsWith('http')
		? currentSEO.image
		: `${SITE_URL}${currentSEO.image}`;

	// Generate structured data
	const generateStructuredData = () => {
		// If custom structured data is provided, use it
		if (currentSEO.structuredData) {
			return currentSEO.structuredData;
		}

		// Default structured data based on page type
		if (currentSEO.type === 'article') {
			// VisualArtwork schema for artwork pages
			return {
				'@context': 'https://schema.org',
				'@type': 'VisualArtwork',
				name: currentSEO.title,
				description: currentSEO.description,
				image: absoluteImageUrl,
				url: currentSEO.url,
				creator: {
					'@type': 'Person',
					name: 'Carmen Cárdenas Pacheco'
				},
				dateCreated: new Date().toISOString(),
				artform: 'Painting',
				artMedium: 'Mixed Media'
			};
		} else {
			// WebSite schema for main pages
			return {
				'@context': 'https://schema.org',
				'@type': 'WebSite',
				name: 'Carmen Cárdenas Pacheco',
				description: 'Galería de arte de Carmen Cárdenas Pacheco',
				url: SITE_URL,
				author: {
					'@type': 'Person',
					name: 'Carmen Cárdenas Pacheco'
				},
				publisher: {
					'@type': 'Person',
					name: 'Carmen Cárdenas Pacheco'
				},
				potentialAction: {
					'@type': 'SearchAction',
					target: `${SITE_URL}/?q={search_term_string}`,
					'query-input': 'required name=search_term_string'
				}
			};
		}
	};

	const structuredData = generateStructuredData();

	// Create JSON-LD script content
	const jsonLdContent = JSON.stringify(structuredData, null, 2);
</script>

<svelte:head>
	{#key page.url.pathname}
		<!-- Canonical URL -->
		<link rel="canonical" href={currentSEO.url} />

		<!-- Basic Meta Tags -->
		<title>{currentSEO.title}</title>
		<meta name="description" content={currentSEO.description} />

		<!-- Open Graph -->
		<meta property="og:url" content={currentSEO.url} />
		<meta property="og:type" content={currentSEO.type} />
		<meta property="og:title" content={currentSEO.title} />
		<meta property="og:description" content={currentSEO.description} />
		<meta property="og:image" content={absoluteImageUrl} />
		<meta property="og:site_name" content="Carmen Cárdenas Pacheco" />

		<!-- Twitter Card -->
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content={currentSEO.title} />
		<meta name="twitter:description" content={currentSEO.description} />
		<meta name="twitter:image" content={absoluteImageUrl} />

		<!-- Favicon -->
		<link rel="icon" type="image/x-icon" href="/favicon.ico" />
		<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
		<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
		<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
		<link rel="manifest" href="/site.webmanifest" />

		<!-- Additional SEO Meta Tags -->
		<meta name="author" content="Carmen Cárdenas Pacheco" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta charset="utf-8" />

		<!-- Robots -->
		{#if noIndex}
			<meta name="robots" content="noindex, nofollow" />
		{:else}
			<meta name="robots" content="index, follow" />
		{/if}

		<!-- Language -->
		<meta name="language" content="es" />
		<meta name="geo.region" content="ES" />
		<meta name="geo.country" content="Spain" />

		<!-- JSON-LD Structured Data -->
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html '<script type="application/ld+json">' + jsonLdContent + '<' + '/script>'}
	{/key}
</svelte:head>
