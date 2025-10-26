<!--
@component ArtworkCarousel
@description Horizontal scrollable carousel showing all artworks as thumbnails
-->

<script lang="ts">
	import { goto } from '$app/navigation';
	import { getGalleryState } from '$lib/GalleryState.svelte';
	import { imageMapGallery } from '$lib/data/imageImports';
	import Img from '@zerodevx/svelte-img';
	import { t } from 'svelte-i18n';
	import { onMount } from 'svelte';

	// Get gallery state to access all artworks
	const galleryState = getGalleryState();

	// Shuffle function using Fisher-Yates algorithm
	function shuffleArray<T>(array: T[]): T[] {
		const shuffled = [...array];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		return shuffled;
	}

	// Get all artworks from the gallery state (not filtered) and shuffle them
	let artworks = $derived.by(() => {
		console.log('-- Before shuffle --');
		galleryState.artworks.forEach((artwork, idx) => {
			console.log(`${idx}: ${artwork.title}`);
		});
		const shuffled = shuffleArray(galleryState.artworks);
		console.log('-- After shuffle --');
		shuffled.forEach((artwork, idx) => {
			console.log(`${idx}: ${artwork.title}`);
		});
		return galleryState.artworks;
	});

	// Create circular scroll illusion by duplicating artworks
	let circularArtworks = $derived([...artworks, ...artworks, ...artworks]);

	// Reference to the scroll container
	let scrollContainer: HTMLDivElement;

	// Handle infinite scroll loop
	let isScrolling = false;
	function handleScroll() {
		if (!scrollContainer || isScrolling) return;

		const scrollLeft = scrollContainer.scrollLeft;
		const scrollWidth = scrollContainer.scrollWidth;
		const clientWidth = scrollContainer.clientWidth;

		// Calculate approximate width for each set of artworks
		const artworkCount = artworks.length;
		const estimatedWidth = artworkCount * 120; // Approximate width per item (100px + 20px gaps/margins)

		// If scrolled to near the beginning, jump to the middle section
		if (scrollLeft < clientWidth) {
			isScrolling = true;
			scrollContainer.scrollLeft += estimatedWidth;
			setTimeout(() => {
				isScrolling = false;
			}, 0);
		}
		// If scrolled to near the end, jump to the middle section
		else if (scrollLeft > scrollWidth - 2 * clientWidth) {
			isScrolling = true;
			scrollContainer.scrollLeft -= estimatedWidth;
			setTimeout(() => {
				isScrolling = false;
			}, 0);
		}
	}

	function navigateToArtwork(artworkId: string) {
		goto(`/artwork/${artworkId}`);
	}

	function handleKeydown(event: KeyboardEvent, artworkId: string) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			navigateToArtwork(artworkId);
		}
	}

	// Initialize scroll position to the middle section
	onMount(() => {
		if (scrollContainer && artworks.length > 0) {
			// Start at the middle section to allow scrolling in both directions
			const estimatedWidth = artworks.length * 120; // Approximate width per item
			setTimeout(() => {
				scrollContainer.scrollLeft = estimatedWidth;
			}, 0);
		}
	});
</script>

<!-- Carousel Container -->
<div
	class="w-full overflow-x-auto scrollbar-hide"
	bind:this={scrollContainer}
	onscroll={handleScroll}
>
	<!-- Scrollable content - circular scroll illusion -->
	<div class="flex gap-3 px-4 py-2 sm:px-6 lg:px-8 justify-center">
		{#each circularArtworks as artwork, index (artwork.id + '-' + index)}
			{@const imageSrc = artwork.images?.[0]?.src}
			{@const imageName = imageSrc?.split('/').pop()?.replace('.webp', '')}
			{@const optimizedImage = imageName ? imageMapGallery[imageName] : undefined}

			{#if imageSrc}
				<button
					onclick={() => navigateToArtwork(artwork.id)}
					onkeydown={(e) => handleKeydown(e, artwork.id)}
					class="flex-shrink-0 cursor-pointer transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg overflow-hidden bg-muted"
					aria-label={$t('viewDetailsFor', { values: { title: artwork.title } })}
					tabindex="0"
				>
					{#if optimizedImage}
						<Img
							src={optimizedImage}
							alt={$t('artworkAlt', { values: { title: artwork.title } })}
							class="h-[100px] w-auto rounded-lg"
							sizes="(max-width: 768px) 100px, 150px"
						/>
					{:else}
						<img
							src={imageSrc}
							alt={$t('artworkAlt', { values: { title: artwork.title } })}
							class="h-[100px] w-auto rounded-lg"
							loading="lazy"
						/>
					{/if}
				</button>
			{/if}
		{/each}
	</div>
</div>

<style>
	.scrollbar-hide {
		/* Firefox - hide scrollbar */
		scrollbar-width: none;
		/* IE and Edge - hide scrollbar */
		-ms-overflow-style: none;
	}

	/* Chrome, Safari, Edge - hide scrollbar */
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
</style>
