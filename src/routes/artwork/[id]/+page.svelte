<!--
@component ArtworkPage
@description Dedicated page for displaying detailed artwork information
-->

<script lang="ts">
	import type { PageData } from './$types';
	import { getNeighbours } from '$lib/artworks';
	import { Calendar, Ruler, Tag, ChevronLeft, ChevronRight, ArrowLeft, Eye } from 'lucide-svelte';
	import { m } from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { ARTIST, SITE_URL } from '$lib';
	import BiggerPicture from 'bigger-picture';
	import ArtworkCarousel from '$lib/components/ArtworkCarousel.svelte';
	import ThumbnailCarousel from '$lib/components/ThumbnailCarousel.svelte';

	// Get artwork data from load function
	let { data }: { data: PageData } = $props();

	// Make artwork reactive to data changes
	let artwork = $derived(data.artwork);

	// BiggerPicture lightbox instance
	let bp: ReturnType<typeof BiggerPicture> | null = null;

	// The neighbours on the Wall, for previous/next
	let neighbours = $derived(getNeighbours(artwork.id));

	// Current image index for cycling through variants
	let currentImageIndex = $state(0);

	// Navigation state
	let isNavigating = $state(false);

	// Computed values
	let currentImage = $derived(artwork.images[currentImageIndex]);
	let hasMultipleImages = $derived(artwork.images.length > 1);

	function goBack() {
		goto(localizeHref('/'), { noScroll: true });
	}

	function navigateToArtwork(artworkId: string) {
		if (isNavigating) return;
		isNavigating = true;
		goto(localizeHref(`/artwork/${artworkId}`), { replaceState: false, noScroll: true });
	}

	function handleKeydown(event: KeyboardEvent) {
		// Ctrl+Arrow for artwork navigation
		if (event.ctrlKey && event.key === 'ArrowLeft') {
			event.preventDefault();
			navigateToArtwork(neighbours.previous.id);
		} else if (event.ctrlKey && event.key === 'ArrowRight') {
			event.preventDefault();
			navigateToArtwork(neighbours.next.id);
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
		if (hasMultipleImages) {
			currentImageIndex = (currentImageIndex + 1) % artwork.images.length;
		}
	}

	function previousImage() {
		if (hasMultipleImages) {
			currentImageIndex =
				currentImageIndex === 0 ? artwork.images.length - 1 : currentImageIndex - 1;
		}
	}

	function openLightbox() {
		bp?.open({
			items: artwork.images.map(({ img }) => ({
				img: img.src,
				alt: artwork.title,
				width: img.w,
				height: img.h
			})),
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

	// Focus management
	$effect(() => {
		if (artwork) {
			// Focus the main element when it loads
			const mainElement = document.querySelector('main') as HTMLElement;
			if (mainElement) {
				mainElement.focus({ preventScroll: true });
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

<SEO
	title="{artwork.title} - Carmen Cárdenas Pacheco"
	description="View {artwork.title} by Carmen Cárdenas Pacheco."
	image={artwork.images[0].img.src}
	type="article"
	structuredData={{
		'@type': 'VisualArtwork',
		name: artwork.title,
		description: `View ${artwork.title} by Carmen Cárdenas Pacheco`,
		image: SITE_URL + artwork.images[0].img.src,
		creator: ARTIST,
		dateCreated: artwork.year?.toString(),
		artform: 'Painting',
		artMedium: 'Mixed Media',
		artworkSurface: artwork.dimensions
			? `${artwork.dimensions.width}x${artwork.dimensions.height} ${artwork.dimensions.unit}`
			: undefined,
		genre: artwork.tags.join(', '),
		keywords: artwork.tags.join(', ')
	}}
/>

<!-- Go Back Button -->
<div class="bg-background/80">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="py-3 md:py-4">
			<button
				type="button"
				onclick={goBack}
				class="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary hover:text-primary hover:bg-accent transition-all duration-200 min-h-[44px] md:px-4 md:text-base"
				aria-label={m.goBack()}
			>
				<ArrowLeft class="w-4 h-4 md:w-5 md:h-5" />
				<span>{m.goBack()}</span>
			</button>
		</div>
	</div>
</div>

<!-- Main Content -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" onkeydown={handleKeydown} tabindex="-1">
	<!-- Artwork Carousel - Full width, flush with screen edges -->
	<div class="-mx-4 sm:-mx-6 lg:-mx-8 mb-4">
		<ArtworkCarousel currentArtworkId={artwork?.id} />
	</div>

	<div class="bg-card/80 border border-border overflow-hidden w-full">
		<!-- Content Grid -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-0 w-full">
			<!-- Image Section -->
			<div class="p-4 md:p-6 lg:p-8">
				<div class="space-y-4">
					<div class="relative">
						<div
							onclick={openLightbox}
							onkeydown={(e) => e.key === 'Enter' && openLightbox()}
							class="cursor-pointer"
							role="button"
							tabindex="0"
							aria-label={m.expandImage()}
						>
							<enhanced:img
								src={currentImage}
								alt={artwork.title}
								class="w-full h-auto"
								sizes="(min-width: 1360px) 551px, (min-width: 1040px) 40vw, calc(95.56vw - 53px)"
							/>
						</div>

						<!-- Navigation Controls -->
						{#if hasMultipleImages}
							<button
								type="button"
								onclick={previousImage}
								class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 transition-all duration-200"
								aria-label="Previous image"
							>
								<ChevronLeft class="w-6 h-6" />
							</button>

							<button
								type="button"
								onclick={nextImage}
								class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 transition-all duration-200"
								aria-label="Next image"
							>
								<ChevronRight class="w-6 h-6" />
							</button>
						{/if}

						{#if artwork.sold}
							<div
								class="absolute top-4 right-4 bg-destructive text-destructive-foreground px-3 py-1 text-sm font-semibold"
							>
								{m.sold()}
							</div>
						{/if}
					</div>

					<!-- Thumbnail Carousel for Image Navigation -->
					{#if hasMultipleImages}
						<ThumbnailCarousel
							images={artwork.images}
							selectedIndex={currentImageIndex}
							onImageSelect={(index) => (currentImageIndex = index)}
						/>
					{/if}

					<!-- Click to enlarge label -->
					<div class="text-center">
						<button
							type="button"
							onclick={openLightbox}
							class="inline-flex items-center gap-2 text-xs md:text-sm text-muted-foreground cursor-pointer hover:text-primary transition-colors duration-200"
							aria-label={m.clickToEnlarge()}
						>
							<Eye class="w-4 h-4 md:w-5 md:h-5" />
							<span>{m.clickToEnlarge()}</span>
						</button>
					</div>
				</div>
			</div>

			<!-- Details Section -->
			<div class="p-4 md:p-6 lg:p-8 bg-muted/50">
				<div class="space-y-4 md:space-y-6">
					<!-- Title -->
					<div>
						<h1
							class="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent"
						>
							{artwork.title}
						</h1>
					</div>
					<!-- Dimensions -->
					{#if artwork.dimensions}
						<div class="flex items-start gap-3">
							<Ruler class="w-5 h-5 text-muted-foreground mt-1" />
							<div class="flex-1">
								<p class="text-xs md:text-sm font-medium text-muted-foreground mb-1">
									{m.dimensionsLabel()}
								</p>
								<p class="text-base md:text-lg font-semibold text-foreground">
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
								<p class="text-xs md:text-sm font-medium text-muted-foreground mb-1">
									{m.yearLabel()}
								</p>
								<p class="text-base md:text-lg font-semibold text-foreground">
									{artwork.year}
								</p>
							</div>
						</div>
					{/if}

					<!-- Tags -->
					<div class="flex items-start gap-3">
						<Tag class="w-5 h-5 text-muted-foreground mt-1" />
						<div class="flex-1">
							<p class="text-xs md:text-sm font-medium text-muted-foreground mb-2">
								{m.tagsLabel()}
							</p>
							<div class="flex flex-wrap gap-2">
								{#each artwork.tags as tag (tag)}
									<span
										class="inline-flex items-center px-2 md:px-3 py-1 text-xs md:text-sm font-medium bg-accent text-accent-foreground"
									>
										{m[`tag_${tag}`]()}
									</span>
								{/each}
							</div>
						</div>
					</div>

					<!-- Contact Information -->
					{#if !artwork.sold}
						<div class="bg-primary/5 border border-primary/20 p-4 md:p-6">
							<h3 class="text-base md:text-lg font-semibold text-primary mb-2">
								{m.interestedHeading()}
							</h3>
							<p class="text-muted-foreground text-xs md:text-sm mb-4 leading-relaxed">
								{m.availableInfo()}
							</p>
							<a
								href={localizeHref('/contact')}
								data-sveltekit-preload-data="hover"
								data-sveltekit-noscroll
								class="inline-flex items-center justify-center px-4 py-3 md:px-6 md:py-3 text-sm md:text-base font-semibold min-h-[44px] min-w-[44px] bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 transform hover:-translate-y-0.5"
							>
								{m.contactArtist()}
							</a>
						</div>
					{:else}
						<div class="bg-muted/50 border border-border p-4 md:p-6">
							<div class="space-y-3">
								<h3 class="text-base md:text-lg font-semibold text-muted-foreground">
									{m.soldHeading()}
								</h3>
								<p class="text-muted-foreground text-xs md:text-sm leading-relaxed">
									{m.soldInfo()}
								</p>
								<div class="pt-2 flex justify-center">
									<a
										href={localizeHref('/contact')}
										data-sveltekit-preload-data="hover"
										data-sveltekit-noscroll
										class="inline-flex items-center justify-center px-4 py-3 md:px-6 md:py-3 text-sm md:text-base font-semibold min-h-[44px] min-w-[44px] bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 transform hover:-translate-y-0.5"
									>
										{m.contactArtist()}
									</a>
								</div>
							</div>
						</div>
					{/if}

					<!-- Artwork Navigation Controls -->
					<div class="pt-2">
						<div class="flex items-center justify-between gap-2 md:gap-3 lg:gap-4">
							<!-- Previous Artwork Button -->
							<button
								type="button"
								onclick={() => navigateToArtwork(neighbours.previous.id)}
								disabled={isNavigating}
								class="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 min-h-[44px] min-w-[44px] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent md:px-4 md:text-base"
								aria-label={m.previousArtwork()}
								title={m.previousArtwork()}
							>
								<ChevronLeft class="w-5 h-5" />
								<span class="hidden lg:inline">{m.previousArtwork()}</span>
							</button>

							<!-- Go Back to Gallery Button -->
							<button
								type="button"
								onclick={goBack}
								class="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold min-h-[44px] bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 transform hover:-translate-y-0.5 md:px-6 md:text-base"
								aria-label={m.goBack()}
							>
								<span class="whitespace-nowrap">{m.goBack()}</span>
							</button>

							<!-- Next Artwork Button -->
							<button
								type="button"
								onclick={() => navigateToArtwork(neighbours.next.id)}
								disabled={isNavigating}
								class="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 min-h-[44px] min-w-[44px] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent md:px-4 md:text-base"
								aria-label={m.nextArtwork()}
								title={m.nextArtwork()}
							>
								<span class="hidden lg:inline">{m.nextArtwork()}</span>
								<ChevronRight class="w-5 h-5" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>
