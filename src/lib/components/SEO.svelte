<!--
@component SEO
@description The one SEO helper: the page metadata and its schema.org structured data.
It names the page by its public URL, so the metadata is the same on Vercel, in a preview
and in a prerendered file.
-->

<script lang="ts">
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import { ARTIST, SITE_URL } from '$lib';

	interface Props {
		title: string;
		description: string;
		/** A path on this site or an absolute URL. */
		image?: string;
		type?: 'website' | 'article';
		/** The page's schema.org object; this adds its `@context` and `url`. */
		structuredData: Record<string, unknown>;
	}

	let {
		title,
		description,
		image = '/web-app-manifest-512x512.png',
		type = 'website',
		structuredData
	}: Props = $props();

	let url = $derived(SITE_URL + page.url.pathname);
	let imageUrl = $derived(image.startsWith('http') ? image : SITE_URL + image);
	let jsonLd = $derived(
		JSON.stringify({ '@context': 'https://schema.org', ...structuredData, url })
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content={ARTIST.name} />
	<link rel="canonical" href={url} />
	{#each locales as locale (locale)}
		<link
			rel="alternate"
			hreflang={locale}
			href={SITE_URL + localizeHref(page.url.pathname, { locale })}
		/>
	{/each}

	<meta property="og:url" content={url} />
	<meta property="og:type" content={type} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:site_name" content={ARTIST.name} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />

	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html '<script type="application/ld+json">' + jsonLd + '<' + '/script>'}
</svelte:head>
