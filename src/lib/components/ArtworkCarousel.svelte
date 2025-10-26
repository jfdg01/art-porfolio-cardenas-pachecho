<!--
@component ArtworkCarousel
@description Horizontal scrollable carousel showing all artworks as thumbnails
-->

<script lang="ts">
	import { goto } from '$app/navigation';
	import { getGalleryState } from '$lib/GalleryState.svelte';
	import { imageMapDetail } from '$lib/data/imageImports';
	import Img from '@zerodevx/svelte-img';
	import { t } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { Button, Tooltip } from 'bits-ui';

	// Get gallery state to access all artworks
	const galleryState = getGalleryState();

	// Get all artworks from the gallery state (not filtered)
	let artworks = $derived(galleryState.artworks);

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

	// Scroll functions for buttons
	function scrollLeft() {
		if (!scrollContainer || isScrolling) return;
		scrollContainer.scrollBy({ left: -300, behavior: 'smooth' });
	}

	function scrollRight() {
		if (!scrollContainer || isScrolling) return;
		scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
	}

	// Handle mouse wheel scroll
	function handleWheel(event: WheelEvent) {
		if (!scrollContainer) return;

		// Prevent default vertical scroll
		event.preventDefault();

		// Convert vertical scroll to horizontal scroll
		const delta = event.deltaY;
		scrollContainer.scrollLeft += delta;
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

<!-- Carousel Container with Buttons -->
<div class="relative w-full group">
	<!-- Scroll Buttons - Desktop Only with gradient overlay -->
	<Button.Root
		onclick={scrollLeft}
		class="hidden min-[850px]:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-background/95 via-background/80 to-transparent hover:from-background hover:via-background/90 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
		aria-label="Scroll left"
	>
		<ChevronLeft class="size-7 text-foreground drop-shadow-lg" />
	</Button.Root>

	<Button.Root
		onclick={scrollRight}
		class="hidden min-[850px]:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-14 h-14 rounded-full bg-gradient-to-l from-background/95 via-background/80 to-transparent hover:from-background hover:via-background/90 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
		aria-label="Scroll right"
	>
		<ChevronRight class="size-7 text-foreground drop-shadow-lg" />
	</Button.Root>

	<!-- Carousel Container -->
	<Tooltip.Provider>
		<div
			class="w-full overflow-x-auto scrollbar-hide"
			bind:this={scrollContainer}
			onscroll={handleScroll}
			onwheel={handleWheel}
		>
			<!-- Scrollable content - circular scroll illusion -->
			<div class="flex gap-3 py-2 px-4">
				{#each circularArtworks as artwork, index (artwork.id + '-' + index)}
					{@const imageSrc = artwork.images?.[0]?.src}
					{@const imageName = imageSrc?.split('/').pop()?.replace('.webp', '')}
					{@const optimizedImage = imageName ? imageMapDetail[imageName] : undefined}

					{#if imageSrc}
						<Tooltip.Root>
							<Tooltip.Trigger>
								{#snippet child({ props })}
									<Button.Root
										{...props}
										onclick={() => navigateToArtwork(artwork.id)}
										onkeydown={(e: KeyboardEvent) => handleKeydown(e, artwork.id)}
										class="flex-shrink-0 cursor-pointer transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg overflow-hidden bg-muted"
										aria-label={$t('viewDetailsFor', { values: { title: artwork.title } })}
										tabindex={0}
									>
										{#if optimizedImage}
											<Img
												src={optimizedImage}
												alt={$t('artworkAlt', { values: { title: artwork.title } })}
												class="h-[100px] w-auto rounded-lg"
												sizes="100px"
											/>
										{:else}
											<img
												src={imageSrc}
												alt={$t('artworkAlt', { values: { title: artwork.title } })}
												class="h-[100px] w-auto rounded-lg"
												loading="lazy"
											/>
										{/if}
									</Button.Root>
								{/snippet}
							</Tooltip.Trigger>
							<Tooltip.Portal>
								<Tooltip.Content
									sideOffset={8}
									class="rounded-md bg-popover text-popover-foreground px-3 py-1.5 text-sm shadow-md"
								>
									{artwork.title}
								</Tooltip.Content>
							</Tooltip.Portal>
						</Tooltip.Root>
					{/if}
				{/each}
			</div>
		</div>
	</Tooltip.Provider>
</div>

<style>
	/* Hide scrollbar completely */
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
