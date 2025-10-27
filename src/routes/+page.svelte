<!--
@component GalleryPage
@description Main gallery page displaying artworks with integrated filtering
-->

<script lang="ts">
	import type { PageData } from './$types';
	import { getGalleryState } from '$lib/GalleryState.svelte';
	import GalleryHeader from '$lib/components/GalleryHeader.svelte';
	import ArtworkFilter from '$lib/components/ArtworkFilter.svelte';
	import ArtworkGrid from '$lib/components/ArtworkGrid.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { imageMapGallery } from '$lib/data/imageImports';

	// Get page data from server-side load function
	let { data }: { data: PageData } = $props();

	// Get shared gallery state
	const galleryState = getGalleryState();

	// Get LCP image for preloading (first filtered artwork)
	let lcpImage = $derived.by(() => {
		const firstArtwork = galleryState.filteredArtworks[0];
		if (!firstArtwork?.images?.[0]?.src) return null;

		const imageSrc = firstArtwork.images[0].src;
		const imageName = imageSrc.split('/').pop()?.replace('.webp', '');
		return imageName ? imageMapGallery[imageName] : null;
	});
</script>

<!-- Preload LCP image for faster loading -->
<svelte:head>
	{#if lcpImage}
		<link rel="preload" as="image" href={lcpImage} fetchpriority="high" />
	{/if}
</svelte:head>

<SEO seo={data.seo} />

<!-- Header -->
<GalleryHeader />

<!-- Main Content - Mobile First -->
<main class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6 md:py-8 lg:py-12">
	<!-- Filter Section - Mobile First -->
	<div class="mb-6 md:mb-8 lg:mb-12">
		<ArtworkFilter />
	</div>

	<!-- Gallery Content -->
	<div class="w-full">
		<ArtworkGrid artworks={galleryState.filteredArtworks} />
	</div>
</main>
