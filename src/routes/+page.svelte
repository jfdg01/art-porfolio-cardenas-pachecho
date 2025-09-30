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

	// Get page data from server-side load function
	let { data }: { data: PageData } = $props();

	// Get shared gallery state
	const galleryState = getGalleryState();
</script>

<SEO seo={data.seo} />

<div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
	<!-- Header -->
	<GalleryHeader />

	<!-- Main Content - Mobile First -->
	<main
		class="mx-auto px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 max-w-full md:max-w-2xl lg:max-w-4xl xl:max-w-7xl 2xl:max-w-[1400px] py-6 md:py-8 lg:py-12"
	>
		<!-- Filter Section - Mobile First -->
		<div class="mb-6 md:mb-8 lg:mb-12">
			<ArtworkFilter />
		</div>

		<!-- Gallery Content -->
		<div class="w-full">
			<ArtworkGrid artworks={galleryState.filteredArtworks} />
		</div>
	</main>
</div>
