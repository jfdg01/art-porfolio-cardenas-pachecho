<!--
@component ThumbnailCarousel
@description Horizontal scrollable carousel showing thumbnail images for a single artwork
-->

<script lang="ts">
	import Img from '@zerodevx/svelte-img';
	import { t } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { Button } from 'bits-ui';
	import { getGalleryState } from '$lib/GalleryState.svelte';

	interface Props {
		images: Array<{ src: string; alt?: string }>;
		selectedIndex?: number;
		onImageSelect?: (index: number) => void;
	}

	let { images, selectedIndex = 0, onImageSelect }: Props = $props();

	// Get gallery state for lazy image loading
	const galleryState = getGalleryState();

	// Cache for loaded optimized images
	let optimizedImages = $state<Record<number, string>>({});

	// Load optimized images for visible thumbnails
	async function loadOptimizedImage(index: number, src: string) {
		if (!optimizedImages[index]) {
			const optimized = await galleryState.getOptimizedImageForSrc(src, 'detail');
			optimizedImages[index] = optimized;
		}
	}

	// Preload images when component mounts or images change
	$effect(() => {
		images.forEach((image, index) => {
			loadOptimizedImage(index, image.src);
		});
	});

	// Reference to the scroll container
	let scrollContainer: HTMLDivElement;

	// Track if content overflows container
	let isScrollable = $state(false);

	// Check if content is scrollable
	function checkScrollable() {
		if (!scrollContainer) {
			isScrollable = false;
			return;
		}

		// Check if scrollWidth exceeds clientWidth (with a small threshold)
		isScrollable = scrollContainer.scrollWidth > scrollContainer.clientWidth + 5;
	}

	// Calculate position to center selected thumbnail
	function scrollToSelected() {
		if (!scrollContainer) return;

		const thumbnails = scrollContainer.querySelectorAll('.thumbnail-item');
		const selectedThumbnail = thumbnails[selectedIndex];

		if (selectedThumbnail) {
			selectedThumbnail.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'center'
			});
		}
	}

	// Scroll functions for buttons
	function scrollLeft() {
		if (!scrollContainer) return;
		scrollContainer.scrollBy({ left: -150, behavior: 'smooth' });
	}

	function scrollRight() {
		if (!scrollContainer) return;
		scrollContainer.scrollBy({ left: 150, behavior: 'smooth' });
	}

	// Handle image click
	function handleImageClick(index: number) {
		onImageSelect?.(index);
	}

	// Scroll to selected image when it changes
	$effect(() => {
		if (selectedIndex !== undefined) {
			scrollToSelected();
		}
	});

	// Check if content is scrollable when images change or on resize
	$effect(() => {
		if (images.length > 0) {
			// Use a small delay to ensure DOM has updated
			setTimeout(() => {
				checkScrollable();
			}, 100);
		}
	});

	// Initialize scroll position and check scrollable
	onMount(() => {
		scrollToSelected();

		// Check scrollable after mount
		setTimeout(() => {
			checkScrollable();
		}, 100);

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

<!-- Thumbnail Carousel Container -->
<div class="relative w-full">
	<!-- Scroll Buttons - Desktop Only (shown only if content is scrollable) -->
	{#if isScrollable}
		<Button.Root
			onclick={scrollLeft}
			class="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-10 h-10 rounded-full bg-background/90 hover:bg-background shadow-md hover:shadow-lg transition-all duration-200"
			aria-label="Scroll left"
		>
			<ChevronLeft class="w-5 h-5 text-foreground" />
		</Button.Root>

		<Button.Root
			onclick={scrollRight}
			class="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-10 h-10 rounded-full bg-background/90 hover:bg-background shadow-md hover:shadow-lg transition-all duration-200"
			aria-label="Scroll right"
		>
			<ChevronRight class="w-5 h-5 text-foreground" />
		</Button.Root>
	{/if}

	<!-- Scrollable Container -->
	<div class="w-full overflow-x-auto scrollbar-hide" bind:this={scrollContainer}>
		<!-- Thumbnail Content -->
		<div class="flex gap-2 py-2 px-4 justify-center">
			{#each images as image, index (index)}
				<Button.Root
					onclick={() => handleImageClick(index)}
					class="thumbnail-item flex-shrink-0 transition-all duration-200 overflow-hidden rounded-lg bg-muted border-2 {selectedIndex ===
					index
						? 'border-primary shadow-lg scale-105'
						: 'border-transparent hover:border-muted-foreground/30'}"
					aria-label={$t('viewImage', { values: { num: index + 1 } })}
					aria-pressed={selectedIndex === index}
				>
					{#if optimizedImages[index]}
						<Img
							src={optimizedImages[index]}
							alt={image.alt || $t('artworkAlt', { values: { title: index + 1 } })}
							class="h-20 w-auto rounded"
							sizes="80px"
						/>
					{:else}
						<img
							src={image.src}
							alt={image.alt || $t('artworkAlt', { values: { title: index + 1 } })}
							class="h-20 w-auto rounded"
							loading="lazy"
						/>
					{/if}
				</Button.Root>
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
