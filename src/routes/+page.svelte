<!--
@component GalleryPage
@description Main gallery page displaying every Artwork in Wall order
-->

<script lang="ts">
	import type { PageData } from './$types';
	import { artworks } from '$lib/artworks';
	import GalleryHeader from '$lib/components/GalleryHeader.svelte';
	import ArtworkGrid from '$lib/components/ArtworkGrid.svelte';
	import SEO from '$lib/components/SEO.svelte';

	// Get page data from server-side load function
	let { data }: { data: PageData } = $props();
</script>

<SEO seo={data.seo} />

<!-- Header -->
<GalleryHeader />

<!-- Main Content - Mobile First -->
<main class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6 md:py-8 lg:py-12">
	<ArtworkGrid {artworks} />
</main>
