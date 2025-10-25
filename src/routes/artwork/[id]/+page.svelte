<!--
@component ArtworkPage
@description Dedicated page for displaying detailed artwork information
-->

<script lang="ts">
	import type { PageData } from './$types';
	import { Euro, Calendar, Ruler, Tag, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-svelte';
	import { t } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import GalleryHeader from '$lib/components/GalleryHeader.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import Img from '@zerodevx/svelte-img';
	import { getGalleryState } from '$lib/GalleryState.svelte';
	import BiggerPicture from 'bigger-picture';
	import { imageMapDetail } from '$lib/data/imageImports';

	// Get artwork data from load function
	let { data }: { data: PageData } = $props();

	// Make artwork reactive to data changes
	let artwork = $derived(data.artwork);

	// Get gallery state for calculating next/prev
	const galleryState = getGalleryState();

	// BiggerPicture lightbox instance
	let bp: ReturnType<typeof BiggerPicture> | null = null;

	// Calculate next/prev based on current filter state
	let navigation = $derived.by(() => {
		const filteredArtworks = galleryState.filteredArtworks;
		const currentIndex = filteredArtworks.findIndex((art) => art.id === artwork.id);

		if (currentIndex === -1) {
			return { nextId: null, prevId: null };
		}

		const nextIndex = currentIndex === filteredArtworks.length - 1 ? 0 : currentIndex + 1;
		const prevIndex = currentIndex === 0 ? filteredArtworks.length - 1 : currentIndex - 1;

		return {
			nextId: filteredArtworks[nextIndex]?.id || null,
			prevId: filteredArtworks[prevIndex]?.id || null
		};
	});

	// Current image index for cycling through variants
	let currentImageIndex = $state(0);

	// Navigation state
	let isNavigating = $state(false);

	// Computed values
	let currentImage = $derived(artwork?.images?.[currentImageIndex] || null);
	let hasMultipleImages = $derived(artwork && artwork.images ? artwork.images.length > 1 : false);

	function goBack() {
		goto('/');
	}

	function navigateToArtwork(artworkId: string | null) {
		if (!artworkId || isNavigating) return;
		isNavigating = true;
		goto(`/artwork/${artworkId}`, { replaceState: false });
	}

	function handleKeydown(event: KeyboardEvent) {
		// Ctrl+Arrow for artwork navigation
		if (event.ctrlKey && event.key === 'ArrowLeft') {
			event.preventDefault();
			navigateToArtwork(navigation.prevId);
		} else if (event.ctrlKey && event.key === 'ArrowRight') {
			event.preventDefault();
			navigateToArtwork(navigation.nextId);
		}
		// Plain arrow keys for image cycling (only if multiple images)
		else if (event.key === 'ArrowLeft' && hasMultipleImages) {
			event.preventDefault();
			previousImage();
		} else if (event.key === 'ArrowRight' && hasMultipleImages) {
			event.preventDefault();
			nextImage();
		}
	}

	function nextImage() {
		if (artwork && artwork.images && hasMultipleImages) {
			currentImageIndex = (currentImageIndex + 1) % artwork.images.length;
		}
	}

	function previousImage() {
		if (artwork && artwork.images && hasMultipleImages) {
			currentImageIndex =
				currentImageIndex === 0 ? artwork.images.length - 1 : currentImageIndex - 1;
		}
	}

	function openLightbox() {
		if (!bp) return;

		bp.open({
			items: artwork.images.map((image) => {
				// Extract the filename without extension to look up in imageMapDetail
				const imageName = image.src.split('/').pop()?.replace('.webp', '');
				const optimizedImage = imageName ? imageMapDetail[imageName] : undefined;

				// If we have an optimized image, extract the fallback URL from it
				// The optimizedImage.img.src contains the actual built URL
				// @ts-expect-error - optimized image structure from vite-imagetools
				const imgUrl = optimizedImage?.img?.src || image.src;

				return {
					img: imgUrl,
					alt: image.alt || $t('artworkAlt', { values: { title: artwork.title } }),
					// @ts-expect-error - optimized image structure from vite-imagetools
					width: optimizedImage?.img?.w || 1920,
					// @ts-expect-error - optimized image structure from vite-imagetools
					height: optimizedImage?.img?.h || 1080
				};
			}),
			position: currentImageIndex
		});
	}

	// Reset image index and navigation state when artwork changes
	$effect(() => {
		if (artwork) {
			currentImageIndex = 0;
			isNavigating = false;
		}
	});

	// Helper function to create range for navigation dots
	function range(length: number): number[] {
		return Array.from({ length }, (_, i) => i);
	}

	// Focus management
	$effect(() => {
		if (artwork) {
			// Focus the main element when it loads
			const mainElement = document.querySelector('main') as HTMLElement;
			if (mainElement) {
				mainElement.focus();
			}
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

<SEO seo={data.seo} />

<!-- Header -->
<GalleryHeader />

<!-- Go Back Button -->
<div class="bg-background/80 backdrop-blur-md border-b border-border">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="py-3 md:py-4">
			<button
				onclick={goBack}
				class="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium montserrat-medium text-primary hover:text-primary hover:bg-accent rounded-lg transition-all duration-200 min-h-[44px] md:px-4 md:text-base"
				aria-label={$t('goBack')}
			>
				<ArrowLeft class="w-4 h-4 md:w-5 md:h-5" />
				<span>{$t('goBack')}</span>
			</button>
		</div>
	</div>
</div>

<!-- Main Content -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<main
	class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-12 focus:outline-none"
	onkeydown={handleKeydown}
	tabindex="-1"
>
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
								{#if optimizedImage}
									<Img
										src={optimizedImage}
										alt={$t('artworkAlt', { values: { title: artwork.title } })}
										class="w-full h-auto rounded-lg shadow-md"
										sizes="(min-width: 1360px) 551px, (min-width: 1040px) 40vw, calc(95.56vw - 53px)"
									/>
								{:else}
									<!-- Fallback for images not found in the mapping -->
									<img
										src={imageSrc}
										alt={$t('artworkAlt', { values: { title: artwork.title } })}
										class="w-full h-auto rounded-lg shadow-md"
										loading="lazy"
										sizes="(min-width: 1360px) 551px, (min-width: 1040px) 40vw, calc(95.56vw - 53px)"
									/>
								{/if}
							</div>
						{:else}
							<div class="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
								<p class="text-muted-foreground">No image available</p>
							</div>
						{/if}

						<!-- Navigation Controls -->
						{#if hasMultipleImages}
							<button
								onclick={previousImage}
								class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
								aria-label="Previous image"
							>
								<ChevronLeft class="w-6 h-6" />
							</button>

							<button
								onclick={nextImage}
								class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
								aria-label="Next image"
							>
								<ChevronRight class="w-6 h-6" />
							</button>
						{/if}

						{#if !artwork.isAvailable}
							<div
								class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold montserrat-semibold"
							>
								{$t('sold')}
							</div>
						{/if}
					</div>

					<!-- Image Navigation Dots -->
					{#if hasMultipleImages && artwork.images}
						<div class="flex justify-center space-x-2">
							{#each range(artwork.images.length) as index (index)}
								<button
									onclick={() => (currentImageIndex = index)}
									class="w-3 h-3 rounded-full transition-all duration-200 {currentImageIndex ===
									index
										? 'bg-blue-600'
										: 'bg-gray-300 hover:bg-gray-400'}"
									aria-label="View image {index + 1}"
								></button>
							{/each}
						</div>
					{/if}
				</div>
			</div>

			<!-- Details Section -->
			<div class="p-4 md:p-6 lg:p-8 bg-muted/50">
				<div class="space-y-4 md:space-y-6">
					<!-- Title -->
					<div>
						<h1
							class="text-xl md:text-2xl lg:text-3xl font-bold montserrat-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent"
						>
							{artwork.title}
						</h1>
					</div>
					<!-- Price -->
					{#if artwork.price}
						<div class="flex items-start gap-3">
							<Euro class="w-5 h-5 text-muted-foreground mt-1" />
							<div class="flex-1">
								<p
									class="text-xs md:text-sm font-medium montserrat-medium text-muted-foreground mb-1"
								>
									{$t('priceLabel')}
								</p>
								<p class="text-lg md:text-2xl font-bold montserrat-bold text-foreground">
									{artwork.price}
									{artwork.currency || 'EUR'}
								</p>
							</div>
						</div>
					{/if}

					<!-- Dimensions -->
					{#if artwork.dimensions}
						<div class="flex items-start gap-3">
							<Ruler class="w-5 h-5 text-muted-foreground mt-1" />
							<div class="flex-1">
								<p
									class="text-xs md:text-sm font-medium montserrat-medium text-muted-foreground mb-1"
								>
									{$t('dimensionsLabel')}
								</p>
								<p class="text-base md:text-lg font-semibold montserrat-semibold text-foreground">
									{artwork.dimensions.width} × {artwork.dimensions.height}
									{artwork.dimensions.unit}
								</p>
							</div>
						</div>
					{/if}

					<!-- Year -->
					{#if artwork.year}
						<div class="flex items-start gap-3">
							<Calendar class="w-5 h-5 text-muted-foreground mt-1" />
							<div class="flex-1">
								<p
									class="text-xs md:text-sm font-medium montserrat-medium text-muted-foreground mb-1"
								>
									{$t('yearLabel')}
								</p>
								<p class="text-base md:text-lg font-semibold montserrat-semibold text-foreground">
									{artwork.year}
								</p>
							</div>
						</div>
					{/if}

					<!-- Category -->
					<div class="flex items-start gap-3">
						<Tag class="w-5 h-5 text-muted-foreground mt-1" />
						<div class="flex-1">
							<p
								class="text-xs md:text-sm font-medium montserrat-medium text-muted-foreground mb-2"
							>
								{$t('tagsLabel')}
							</p>
							<div class="flex flex-wrap gap-2">
								{#if Array.isArray(artwork.category)}
									{#each artwork.category as category (category)}
										<span
											class="inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium montserrat-medium bg-accent text-accent-foreground"
										>
											{$t('categories.' + category)}
										</span>
									{/each}
								{:else}
									<span
										class="inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium montserrat-medium bg-blue-100 text-blue-800"
									>
										{$t('categories.' + artwork.category)}
									</span>
								{/if}
							</div>
						</div>
					</div>

					<!-- Description -->
					{#if artwork.description}
						<div>
							<p
								class="text-xs md:text-sm font-medium montserrat-medium text-muted-foreground mb-2"
							>
								{$t('descriptionLabel')}
							</p>
							<p
								class="text-sm md:text-base montserrat-medium text-muted-foreground leading-relaxed max-w-prose"
							>
								{artwork.description}
							</p>
						</div>
					{/if}

					<!-- Contact Information -->
					{#if artwork.isAvailable}
						<div class="bg-green-50 border border-green-200 rounded-xl p-4 md:p-6">
							<h3
								class="text-base md:text-lg font-semibold montserrat-semibold text-green-800 mb-2"
							>
								{$t('interestedHeading')}
							</h3>
							<p class="text-green-700 text-xs md:text-sm montserrat-medium mb-4 leading-relaxed">
								{$t('availableInfo')}
							</p>
							<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
							<a
								href="/contact"
								data-sveltekit-preload-data="hover"
								class="inline-flex items-center justify-center px-4 py-3 md:px-6 md:py-3 text-sm md:text-base font-semibold montserrat-semibold rounded-lg min-h-[44px] min-w-[44px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
							>
								{$t('contactArtist')}
							</a>
						</div>
					{:else}
						<div class="bg-blue-50 border border-blue-200 rounded-xl p-4 md:p-6">
							<div class="space-y-3">
								<h3 class="text-base md:text-lg font-semibold montserrat-semibold text-blue-800">
									{$t('soldHeading')}
								</h3>
								<p class="text-blue-700 text-xs md:text-sm montserrat-medium leading-relaxed">
									{$t('soldInfo')}
								</p>
								<div class="pt-2 flex justify-center">
									<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
									<a
										href="/contact"
										data-sveltekit-preload-data="hover"
										class="inline-flex items-center justify-center px-4 py-3 md:px-6 md:py-3 text-sm md:text-base font-semibold montserrat-semibold rounded-lg min-h-[44px] min-w-[44px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
									>
										{$t('contactArtist')}
									</a>
								</div>
							</div>
						</div>
					{/if}

					<!-- Artwork Navigation Controls -->
					<div class="pt-4 md:pt-6 border-t border-border">
						<div class="flex items-center justify-between gap-2 md:gap-3 lg:gap-4">
							<!-- Previous Artwork Button -->
							<button
								onclick={() => navigateToArtwork(navigation.prevId)}
								disabled={!navigation.prevId || isNavigating}
								class="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium montserrat-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all duration-200 min-h-[44px] min-w-[44px] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent md:px-4 md:text-base"
								aria-label={$t('previousArtwork')}
								title={$t('previousArtwork')}
							>
								<ChevronLeft class="w-5 h-5" />
								<span class="hidden lg:inline">{$t('previousArtwork')}</span>
							</button>

							<!-- Go Back to Gallery Button -->
							<button
								onclick={goBack}
								class="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold montserrat-semibold rounded-lg min-h-[44px] bg-gradient-to-r from-primary to-primary hover:from-primary/90 hover:to-primary/90 text-primary-foreground transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 md:px-6 md:text-base"
								aria-label={$t('goBack')}
							>
								<ArrowLeft class="w-4 h-4 md:w-5 md:h-5" />
								<span class="whitespace-nowrap">{$t('goBack')}</span>
							</button>

							<!-- Next Artwork Button -->
							<button
								onclick={() => navigateToArtwork(navigation.nextId)}
								disabled={!navigation.nextId || isNavigating}
								class="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium montserrat-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all duration-200 min-h-[44px] min-w-[44px] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent md:px-4 md:text-base"
								aria-label={$t('nextArtwork')}
								title={$t('nextArtwork')}
							>
								<span class="hidden lg:inline">{$t('nextArtwork')}</span>
								<ChevronRight class="w-5 h-5" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>
