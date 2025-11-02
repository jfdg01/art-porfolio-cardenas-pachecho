<!--
@component ArtworkPage
@description Dedicated page for displaying detailed artwork information
-->

<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import type { PageData } from './$types';

	import { t } from 'svelte-i18n';

	// import ArtworkDetails from '$lib/components/ArtworkDetails.svelte';

	import Img from '@zerodevx/svelte-img';
	import { imageMapDetail } from '$lib/data/imageImports';
	import BiggerPicture from 'bigger-picture';

	import { getGalleryState } from '$lib/GalleryState.svelte';

	import { ChevronLeft, ChevronRight, ArrowLeft, Eye } from 'lucide-svelte';

	import { Label, Button } from 'bits-ui';

	let { data }: { data: PageData } = $props();

	// Make artwork reactive to data changes
	let artwork = $derived(data.artwork);

	// Get gallery state for calculating next/prev
	const galleryState = getGalleryState();

	// BiggerPicture lightbox instance
	let bp: ReturnType<typeof BiggerPicture> | null = null;

	// Calculate next/prev based on current filter state
	// let navigation = $derived(galleryState.getArtworkNavigation(artwork.id));

	// Navigation state
	// let isNavigating = $state(false);

	// Computed values
	let currentImage = $derived(artwork?.images?.[galleryState.currentImageIndex] || null);
	let hasMultipleImages = $derived(artwork && artwork.images ? artwork.images.length > 1 : false);

	function goBack() {
		goto('/', { noScroll: true });
	}

	// function navigateToArtwork(artworkId: string | null) {
	// 	if (!artworkId || isNavigating) return;
	// 	isNavigating = true;
	// 	goto(`/artwork/${artworkId}`, { replaceState: false, noScroll: true });
	// }

	function nextImage() {
		if (artwork && artwork.images) {
			galleryState.nextImage(artwork.images.length);
		}
	}

	function previousImage() {
		if (artwork && artwork.images) {
			galleryState.prevImage(artwork.images.length);
		}
	}

	async function openLightbox() {
		if (!bp) return;

		// Type for the optimized image object from @zerodevx/svelte-img
		type OptimizedImage = {
			img: string | { src: string; w: number; h: number; lqip?: string };
			sources?: {
				webp?: string;
				jpg?: string;
			};
		};

		// Load images to get their actual dimensions
		const items = await Promise.all(
			artwork.images.map(
				(image): Promise<{ img: string; alt: string; width: number; height: number }> => {
					return new Promise((resolve) => {
						const img = new Image();
						// Extract image name
						const imageName = image.src.split('/').pop()?.replace('.webp', '') || '';
						const optimizedSrcObj = imageMapDetail[imageName];

						// Extract the largest image URL from the srcset object or use original
						let imageSrc: string;
						if (optimizedSrcObj && typeof optimizedSrcObj === 'object') {
							// @zerodevx/svelte-img returns an object with img and sources
							// Use the largest resolution from sources or fallback to img
							const sources = (optimizedSrcObj as OptimizedImage).sources;

							if (sources?.webp) {
								// Get the last (largest) image from the srcset
								const srcsetParts = sources.webp.split(',').map((s: string) => s.trim());
								const largestSrc = srcsetParts[srcsetParts.length - 1].split(' ')[0];
								imageSrc = largestSrc;
							} else {
								// img can be either a string or an object with src property
								const imgProp = (optimizedSrcObj as OptimizedImage).img;
								if (typeof imgProp === 'object' && imgProp.src) {
									imageSrc = imgProp.src;
								} else if (typeof imgProp === 'string') {
									imageSrc = imgProp;
								} else {
									imageSrc = image.src;
								}
							}
						} else if (typeof optimizedSrcObj === 'string') {
							imageSrc = optimizedSrcObj;
						} else {
							imageSrc = image.src;
						}

						img.onload = () => {
							resolve({
								img: imageSrc,
								alt: image.alt || $t('artworkAlt', { values: { title: artwork.title } }),
								width: img.naturalWidth,
								height: img.naturalHeight
							});
						};
						img.onerror = () => {
							// Fallback if image fails to load
							resolve({
								img: imageSrc,
								alt: image.alt || $t('artworkAlt', { values: { title: artwork.title } }),
								width: 1920,
								height: 1080
							});
						};

						img.src = imageSrc;
					});
				}
			)
		);

		bp.open({
			items,
			position: galleryState.currentImageIndex
		});
	}

	// Reset image index when artwork changes
	$effect(() => {
		if (artwork) {
			galleryState.resetImageIndex();
			// isNavigating = false;
		}
	});

	// Initialize BiggerPicture lightbox
	onMount(() => {
		bp = BiggerPicture({
			target: document.body
		});

		// Cleanup on unmount
		return () => {
			if (bp) {
				try {
					// Only close if the instance is still valid and has the close method
					if (typeof bp.close === 'function') {
						bp.close();
					}
				} catch {
					// Ignore errors during cleanup - BiggerPicture may have already cleaned up
					// This can happen during navigation when the component is being destroyed
				}
				bp = null;
			}
		};
	});
</script>

<!-- <SEO seo={data.seo} />
 -->
<!-- Header -->
<!-- <GalleryHeader />
 -->
<!-- Go Back Button -->
<div class="bg-background/80 backdrop-blur-md">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="py-3 md:py-4">
			<Button.Root
				onclick={goBack}
				class="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium montserrat-medium text-primary hover:text-primary hover:bg-accent rounded-lg transition-all duration-200 min-h-[44px] md:px-4 md:text-base"
				aria-label={$t('goBack')}
			>
				<ArrowLeft class="w-4 h-4 md:w-5 md:h-5" />
				<span>{$t('goBack')}</span>
			</Button.Root>
		</div>
	</div>
</div>

<!-- Main Content -->
<main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
	<!-- Artwork Carousel - Full width, flush with screen edges -->
	<div class="-mx-4 sm:-mx-6 lg:-mx-8 mb-4">
		<!-- 		<ArtworkCarousel currentArtworkId={artwork?.id} />
 -->
	</div>

	<div
		class="bg-card/80 backdrop-blur-xl rounded-xl md:rounded-2xl shadow-lg border border-border overflow-hidden w-full"
	>
		<!-- Content Grid -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-0 w-full">
			<!-- Image Section -->
			<div class="p-4 md:p-6 lg:p-8">
				<div class="space-y-4">
					<div class="relative">
						{#if currentImage && currentImage.src}
							{@const imageSrc = currentImage.src}
							{@const imageName = imageSrc.split('/').pop()?.replace('.webp', '')}
							{@const optimizedImage = imageName ? imageMapDetail[imageName] : undefined}
							<div
								onclick={openLightbox}
								onkeydown={(e) => e.key === 'Enter' && openLightbox()}
								class="cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
								role="button"
								tabindex="0"
								aria-label={$t('expandImage', { default: 'Expand image' })}
							>
								<!-- Always render the same element on both SSR and client to avoid hydration mismatch -->
								<Img
									src={optimizedImage ?? imageSrc}
									alt={$t('artworkAlt', { values: { title: artwork.title } })}
									class="w-full h-auto rounded-lg shadow-md"
									sizes="(min-width: 1360px) 551px, (min-width: 1040px) 40vw, calc(95.56vw - 53px)"
									fetchpriority={galleryState.currentImageIndex === 0 ? 'high' : undefined}
									loading="eager"
								/>
							</div>
						{:else}
							<div class="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
								<p class="text-muted-foreground">No image available</p>
							</div>
						{/if}

						<!-- Navigation Controls -->
						{#if hasMultipleImages}
							<Button.Root
								onclick={previousImage}
								class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
								aria-label="Previous image"
							>
								<ChevronLeft class="w-6 h-6" />
							</Button.Root>

							<Button.Root
								onclick={nextImage}
								class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
								aria-label="Next image"
							>
								<ChevronRight class="w-6 h-6" />
							</Button.Root>
						{/if}

						{#if !artwork.isAvailable}
							<div
								class="absolute top-4 right-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-semibold montserrat-semibold"
							>
								{$t('sold')}
							</div>
						{/if}
					</div>

					<!-- Thumbnail Carousel for Image Navigation -->
					{#if hasMultipleImages && artwork.images}
						<!-- <ThumbnailCarousel
							images={artwork.images}
							selectedIndex={galleryState.currentImageIndex}
							onImageSelect={(index) => galleryState.setCurrentImageIndex(index)}
						/> -->
					{/if}

					<!-- Click to enlarge label -->
					<div class="text-center">
						<Label.Root
							onclick={openLightbox}
							onkeydown={(e) => e.key === 'Enter' && openLightbox()}
							class="inline-flex items-center gap-2 text-xs md:text-sm text-muted-foreground montserrat-medium cursor-pointer hover:text-primary transition-colors duration-200"
							role="button"
							tabindex={0}
							aria-label={$t('clickToEnlarge')}
						>
							<Eye class="w-4 h-4 md:w-5 md:h-5" />
							<span>{$t('clickToEnlarge')}</span>
						</Label.Root>
					</div>
				</div>
			</div>

			<!-- Details Section -->
			<!-- <ArtworkDetails
				{artwork}
				{navigation}
				{isNavigating}
				onGoBack={goBack}
				onNavigateToArtwork={navigateToArtwork}
			/> -->
		</div>
	</div>
</main>
