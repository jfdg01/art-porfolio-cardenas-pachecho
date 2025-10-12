<!--
@component ArtworkPage
@description Dedicated page for displaying detailed artwork information
-->

<script lang="ts">
	import type { PageData } from './$types';
	import { Euro, Calendar, Ruler, Tag, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-svelte';
	import { t } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import GalleryHeader from '$lib/components/GalleryHeader.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import Img from '@zerodevx/svelte-img';
	import { getGalleryState } from '$lib/GalleryState.svelte';

	// Import all images with optimization for detail pages
	const imageImports = import.meta.glob('$lib/assets/images/*.webp', {
		import: 'default',
		eager: true,
		query: { format: 'jpg;webp', as: 'run' }
	});

	// Create a mapping from filename to optimized image
	const imageMap: Record<string, unknown> = {};
	Object.entries(imageImports).forEach(([path, image]) => {
		const filename = path.split('/').pop()?.replace('.webp', '') || '';
		imageMap[filename] = image;
	});

	// Get artwork data from load function
	let { data }: { data: PageData } = $props();

	// Make artwork reactive to data changes
	let artwork = $derived(data.artwork);

	// Get gallery state for calculating next/prev
	const galleryState = getGalleryState();

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
</script>

<SEO seo={data.seo} />

<div
	class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-x-hidden"
	data-artwork-page
>
	<!-- Header -->
	<GalleryHeader />

	<!-- Go Back Button -->
	<div class="bg-white/80 backdrop-blur-md border-b border-gray-200/50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="py-3 md:py-4">
				<button
					onclick={goBack}
					class="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium montserrat-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200 min-h-[44px] md:px-4 md:text-base"
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
			class="bg-white/80 backdrop-blur-xl rounded-xl md:rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden w-full"
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
								{@const optimizedImage = imageName ? imageMap[imageName] : undefined}
								{#if optimizedImage}
									<Img
										src={optimizedImage}
										alt={$t('artworkAlt', { values: { title: artwork.title } })}
										class="w-full h-auto rounded-lg shadow-md"
										sizes="(max-width: 320px) 254px, (max-width: 425px) 360px, (max-width: 768px) 670px, (max-width: 1024px) 423px, (max-width: 1440px) 551px, 551px"
									/>
								{:else}
									<!-- Fallback for images not found in the mapping -->
									<img
										src={imageSrc}
										alt={$t('artworkAlt', { values: { title: artwork.title } })}
										class="w-full h-auto rounded-lg shadow-md"
										loading="lazy"
									/>
								{/if}
							{:else}
								<div class="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
									<p class="text-gray-500">No image available</p>
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
									class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
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
				<div class="p-4 md:p-6 lg:p-8 bg-gray-50/50">
					<div class="space-y-4 md:space-y-6">
						<!-- Title -->
						<div>
							<h1
								class="text-xl md:text-2xl lg:text-3xl font-bold montserrat-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
							>
								{artwork.title}
							</h1>
						</div>
						<!-- Price -->
						{#if artwork.price && artwork.currency}
							<div class="flex items-start gap-3">
								<Euro class="w-5 h-5 text-gray-400 mt-1" />
								<div class="flex-1">
									<p class="text-xs md:text-sm font-medium text-gray-700 mb-1">
										{$t('priceLabel')}
									</p>
									<p class="text-lg md:text-2xl font-bold text-gray-900">
										{artwork.price}
										{artwork.currency}
									</p>
								</div>
							</div>
						{/if}

						<!-- Dimensions -->
						{#if artwork.dimensions}
							<div class="flex items-start gap-3">
								<Ruler class="w-5 h-5 text-gray-400 mt-1" />
								<div class="flex-1">
									<p class="text-xs md:text-sm font-medium text-gray-700 mb-1">
										{$t('dimensionsLabel')}
									</p>
									<p class="text-base md:text-lg font-semibold text-gray-900">
										{artwork.dimensions.width} × {artwork.dimensions.height}
										{artwork.dimensions.unit}
									</p>
								</div>
							</div>
						{/if}

						<!-- Year -->
						{#if artwork.year}
							<div class="flex items-start gap-3">
								<Calendar class="w-5 h-5 text-gray-400 mt-1" />
								<div class="flex-1">
									<p class="text-xs md:text-sm font-medium text-gray-700 mb-1">{$t('yearLabel')}</p>
									<p class="text-base md:text-lg font-semibold text-gray-900">{artwork.year}</p>
								</div>
							</div>
						{/if}

						<!-- Category -->
						<div class="flex items-start gap-3">
							<Tag class="w-5 h-5 text-gray-400 mt-1" />
							<div class="flex-1">
								<p class="text-xs md:text-sm font-medium text-gray-700 mb-2">{$t('tagsLabel')}</p>
								<div class="flex flex-wrap gap-2">
									{#if Array.isArray(artwork.category)}
										{#each artwork.category as category (category)}
											<span
												class="inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium bg-blue-100 text-blue-800"
											>
												{$t('categories.' + category)}
											</span>
										{/each}
									{:else}
										<span
											class="inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium bg-blue-100 text-blue-800"
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
								<p class="text-xs md:text-sm font-medium text-gray-700 mb-2">
									{$t('descriptionLabel')}
								</p>
								<p class="text-sm md:text-base text-gray-600 leading-relaxed max-w-prose">
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
								<p class="text-green-700 text-xs md:text-sm mb-4 leading-relaxed">
									{$t('availableInfo')}
								</p>
								<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
								<a
									href="/contact"
									data-sveltekit-preload-data="hover"
									class="inline-flex items-center justify-center px-4 py-3 md:px-6 md:py-3 text-sm md:text-base font-semibold rounded-lg min-h-[44px] min-w-[44px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
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
									<p class="text-blue-700 text-xs md:text-sm leading-relaxed">
										{$t('soldInfo')}
									</p>
									<div class="pt-2 flex justify-center">
										<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
										<a
											href="/contact"
											data-sveltekit-preload-data="hover"
											class="inline-flex items-center justify-center px-4 py-3 md:px-6 md:py-3 text-sm md:text-base font-semibold rounded-lg min-h-[44px] min-w-[44px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
										>
											{$t('contactArtist')}
										</a>
									</div>
								</div>
							</div>
						{/if}

						<!-- Artwork Navigation Controls -->
						<div class="pt-4 md:pt-6 border-t border-gray-200/50">
							<div class="flex items-center justify-between gap-3 md:gap-4">
								<!-- Previous Artwork Button -->
								<button
									onclick={() => navigateToArtwork(navigation.prevId)}
									disabled={!navigation.prevId || isNavigating}
									class="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium montserrat-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 min-h-[44px] min-w-[44px] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent md:px-4 md:text-base"
									aria-label={$t('previousArtwork')}
									title={$t('previousArtwork')}
								>
									<ChevronLeft class="w-5 h-5" />
									<span class="hidden sm:inline">{$t('previousArtwork')}</span>
								</button>

								<!-- Go Back to Gallery Button -->
								<button
									onclick={goBack}
									class="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold montserrat-semibold rounded-lg min-h-[44px] min-w-[44px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 md:px-6 md:text-base"
									aria-label={$t('goBack')}
								>
									<ArrowLeft class="w-4 h-4 md:w-5 md:h-5" />
									<span class="whitespace-nowrap">{$t('goBack')}</span>
								</button>

								<!-- Next Artwork Button -->
								<button
									onclick={() => navigateToArtwork(navigation.nextId)}
									disabled={!navigation.nextId || isNavigating}
									class="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium montserrat-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 min-h-[44px] min-w-[44px] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent md:px-4 md:text-base"
									aria-label={$t('nextArtwork')}
									title={$t('nextArtwork')}
								>
									<span class="hidden sm:inline">{$t('nextArtwork')}</span>
									<ChevronRight class="w-5 h-5" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>
