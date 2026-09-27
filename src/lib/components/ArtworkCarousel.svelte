<!--
@component ArtworkCarousel
@description Horizontal scrollable carousel showing all artworks as thumbnails
-->

<script lang="ts">
	import { goto } from '$app/navigation';
	import { artworks } from '$lib/artworks';
	import { m } from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { onMount } from 'svelte';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	interface Props {
		currentArtworkId?: string;
	}

	let { currentArtworkId }: Props = $props();

	// Reference to the scroll container
	let scrollContainer: HTMLDivElement;

	// Track if content overflows container
	let isScrollable = $state(false);

	// Number of instances to render for circular effect (enough to allow smooth scrolling)
	const INSTANCE_COUNT = 5;

	// Generate enough indices to create circular effect
	let indices = $derived.by(() => {
		if (artworks.length === 0) return [];
		const total = artworks.length * INSTANCE_COUNT;
		return Array.from({ length: total }, (_, i) => i);
	});

	// Get the actual artwork using modulo for circular access
	function getArtwork(index: number) {
		return artworks[index % artworks.length];
	}

	// Check if content is scrollable
	function checkScrollable() {
		if (!scrollContainer) {
			isScrollable = false;
			return;
		}

		// Check if scrollWidth exceeds clientWidth (with a small threshold)
		isScrollable = scrollContainer.scrollWidth > scrollContainer.clientWidth + 5;
	}

	// Handle infinite scroll loop
	let isScrolling = false;
	function handleScroll() {
		if (!scrollContainer || isScrolling || artworks.length === 0) return;

		const scrollLeft = scrollContainer.scrollLeft;
		const scrollWidth = scrollContainer.scrollWidth;
		const clientWidth = scrollContainer.clientWidth;

		// Calculate width for one set of artworks
		const singleSetWidth = scrollWidth / INSTANCE_COUNT;

		// If scrolled to near the beginning, jump to the middle set
		if (scrollLeft < singleSetWidth) {
			isScrolling = true;
			scrollContainer.scrollLeft += singleSetWidth * 2; // Jump to middle set
			setTimeout(() => {
				isScrolling = false;
			}, 0);
		}
		// If scrolled to near the end, jump back to middle set
		else if (scrollLeft > scrollWidth - 2 * clientWidth) {
			isScrolling = true;
			scrollContainer.scrollLeft -= singleSetWidth * 2; // Jump back
			setTimeout(() => {
				isScrolling = false;
			}, 0);
		}
	}

	function navigateToArtwork(artworkId: string) {
		goto(localizeHref(`/artwork/${artworkId}`), { noScroll: true });
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

	// Scroll to current artwork when it changes
	function scrollToCurrent() {
		if (!scrollContainer || !currentArtworkId || artworks.length === 0) return;

		// Find the index of the current artwork
		const currentIndex = artworks.findIndex((art) => art.id === currentArtworkId);
		if (currentIndex === -1) return;

		// Get all instances of this artwork across all sets
		const thumbnails = scrollContainer.querySelectorAll('.artwork-item');

		let closestThumbnail: Element | null = null;
		let minDistance = Infinity;

		// Find all instances of the current artwork
		for (let setIndex = 0; setIndex < INSTANCE_COUNT; setIndex++) {
			const instanceIndex = setIndex * artworks.length + currentIndex;
			const thumbnail = thumbnails[instanceIndex];

			if (thumbnail) {
				const containerRect = scrollContainer.getBoundingClientRect();

				// Calculate position relative to container
				const thumbnailLeft = thumbnail.getBoundingClientRect().left;
				const thumbnailRight = thumbnail.getBoundingClientRect().right;
				const containerLeft = containerRect.left;
				const containerRight = containerRect.right;

				// Calculate center position of thumbnail relative to container
				const thumbnailCenter = (thumbnailLeft + thumbnailRight) / 2;
				const containerCenter = (containerLeft + containerRight) / 2;

				// Distance from current view position to thumbnail center
				const distance = Math.abs(thumbnailCenter - containerCenter);

				// If this thumbnail is closer, update closest
				if (distance < minDistance) {
					minDistance = distance;
					closestThumbnail = thumbnail;
				}
			}
		}

		// Scroll to the closest instance
		if (closestThumbnail) {
			closestThumbnail.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'center'
			});
		}
	}

	// Check if content is scrollable when artworks change
	$effect(() => {
		if (artworks.length > 0) {
			setTimeout(() => {
				checkScrollable();
			}, 100);
		}
	});

	// Scroll to current artwork when it changes
	$effect(() => {
		if (currentArtworkId && scrollContainer) {
			setTimeout(() => {
				scrollToCurrent();
			}, 150);
		}
	});

	// Initialize scroll position to the middle section
	onMount(() => {
		if (scrollContainer && artworks.length > 0) {
			// Calculate the width of a single set to scroll to the middle
			const scrollWidth = scrollContainer.scrollWidth;
			const singleSetWidth = scrollWidth / INSTANCE_COUNT;

			// Start at the middle set (index 2, which is the 3rd instance)
			const middleSetPosition = singleSetWidth * 2;

			setTimeout(() => {
				scrollContainer.scrollLeft = middleSetPosition;
			}, 0);
		}

		// Check scrollable after mount
		setTimeout(() => {
			checkScrollable();
			// Scroll to current artwork if specified
			if (currentArtworkId) {
				scrollToCurrent();
			}
		}, 200);

		// Check scrollable on window resize
		const handleResize = () => {
			checkScrollable();
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<!-- Carousel Container with Buttons -->
<div class="relative w-full group">
	<!-- Scroll Buttons - Desktop Only with gradient overlay (shown only if content is scrollable) -->
	{#if isScrollable}
		<button
			type="button"
			onclick={scrollLeft}
			class="hidden min-[850px]:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-14 h-14 bg-gradient-to-r from-background/95 via-background/80 to-transparent hover:from-background hover:via-background/90 transition-all duration-200"
			aria-label="Scroll left"
		>
			<ChevronLeft class="size-7 text-foreground" />
		</button>

		<button
			type="button"
			onclick={scrollRight}
			class="hidden min-[850px]:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-14 h-14 bg-gradient-to-l from-background/95 via-background/80 to-transparent hover:from-background hover:via-background/90 transition-all duration-200"
			aria-label="Scroll right"
		>
			<ChevronRight class="size-7 text-foreground" />
		</button>
	{/if}

	<!-- Carousel Container -->
	<div
		class="w-full overflow-x-auto scrollbar-hide"
		bind:this={scrollContainer}
		onscroll={handleScroll}
		onwheel={handleWheel}
	>
		<!-- Scrollable content - circular scroll illusion -->
		<div class="flex gap-3 py-2 px-4">
			{#each indices as index (index)}
				{@const artwork = getArtwork(index)}
				{@const isCurrentArtwork = artwork.id === currentArtworkId}

				<button
					type="button"
					title={artwork.title}
					onclick={() => navigateToArtwork(artwork.id)}
					onkeydown={(e: KeyboardEvent) => handleKeydown(e, artwork.id)}
					class="artwork-item flex-shrink-0 cursor-pointer transition-all duration-200 hover:scale-105 overflow-hidden bg-muted border-2 {isCurrentArtwork
						? 'border-primary scale-105'
						: 'border-transparent hover:border-muted-foreground/30'}"
					aria-label={m.viewDetailsFor({ title: artwork.title })}
					aria-pressed={isCurrentArtwork}
					tabindex={0}
				>
					<enhanced:img
						src={artwork.images[0]}
						alt={artwork.title}
						class="h-[120px] w-auto"
						sizes="100px"
					/>
				</button>
			{/each}
		</div>
	</div>
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
