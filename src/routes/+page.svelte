<!--
@component GalleryPage
@description Home: hero intro + filterable artwork gallery.
-->

<script lang="ts">
	import type { PageData } from './$types';
	import { t } from 'svelte-i18n';
	import { getGalleryState } from '$lib/GalleryState.svelte';
	import GalleryHeader from '$lib/components/GalleryHeader.svelte';
	import ArtworkFilter from '$lib/components/ArtworkFilter.svelte';
	import ArtworkGrid from '$lib/components/ArtworkGrid.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { imageMapGallery } from '$lib/data/imageImports';

	let { data }: { data: PageData } = $props();

	const galleryState = getGalleryState();

	// Preload the LCP image (first artwork in the grid)
	let lcpImage = $derived.by(() => {
		const firstArtwork = galleryState.filteredArtworks[0];
		if (!firstArtwork?.images?.[0]?.src) return null;
		const imageName = firstArtwork.images[0].src.split('/').pop()?.replace('.webp', '');
		return imageName ? imageMapGallery[imageName] : null;
	});
</script>

<svelte:head>
	{#if lcpImage}
		<link rel="preload" as="image" href={lcpImage} fetchpriority="high" />
	{/if}
</svelte:head>

<SEO seo={data.seo} />

<GalleryHeader />

<main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
	<!-- Hero -->
	<section class="py-10 md:py-16 lg:py-20">
		<h1 class="max-w-3xl font-serif text-4xl leading-tight font-light text-foreground sm:text-5xl lg:text-6xl">
			{$t('heroTitle')}
		</h1>
		<p class="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
			{$t('heroSubtitle')}
		</p>
	</section>

	<!-- Filters + gallery -->
	<div class="mb-8">
		<ArtworkFilter />
	</div>

	<div class="pb-16">
		<ArtworkGrid artworks={galleryState.filteredArtworks} />
	</div>
</main>
