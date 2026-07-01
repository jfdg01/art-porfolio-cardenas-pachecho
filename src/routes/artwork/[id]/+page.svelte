<!--
@component ArtworkPage
@description Artwork detail: large image with lightbox, thumbnails, metadata, prev/next navigation.
-->

<script lang="ts">
	import { browser } from '$app/environment';
	import type { PageData } from './$types';
	import type { Artwork } from '$lib/types/artwork';
	import { Euro, Calendar, Ruler, Tag, ChevronLeft, ChevronRight, ArrowLeft, Eye } from 'lucide-svelte';
	import { t } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import GalleryHeader from '$lib/components/GalleryHeader.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import Img from '@zerodevx/svelte-img';
	import { getGalleryState } from '$lib/GalleryState.svelte';
	import BiggerPicture from 'bigger-picture';
	import { imageMapDetail } from '$lib/data/imageImportsDetail';
	import ArtworkCarousel from '$lib/components/ArtworkCarousel.svelte';
	import ThumbnailCarousel from '$lib/components/ThumbnailCarousel.svelte';

	let { data }: { data: PageData } = $props();

	// Avoid hydration mismatch: optimized <Img> renders client-side only
	let mounted = $state(false);

	let artwork = $derived(data.artwork);

	const galleryState = getGalleryState();

	let bp: ReturnType<typeof BiggerPicture> | null = null;

	// Prev/next respect the current gallery filters
	let navigation = $derived.by(() => {
		const filteredArtworks = galleryState.filteredArtworks;
		const currentIndex = filteredArtworks.findIndex((art: Artwork) => art.id === artwork.id);
		if (currentIndex === -1) return { nextId: null, prevId: null };
		const nextIndex = (currentIndex + 1) % filteredArtworks.length;
		const prevIndex = (currentIndex - 1 + filteredArtworks.length) % filteredArtworks.length;
		return {
			nextId: filteredArtworks[nextIndex]?.id || null,
			prevId: filteredArtworks[prevIndex]?.id || null
		};
	});

	let currentImageIndex = $state(0);
	let isNavigating = $state(false);

	let currentImage = $derived(artwork?.images?.[currentImageIndex] || null);
	let hasMultipleImages = $derived(artwork && artwork.images ? artwork.images.length > 1 : false);

	function goBack() {
		goto('/', { noScroll: true });
	}

	function navigateToArtwork(artworkId: string | null) {
		if (!artworkId || isNavigating) return;
		isNavigating = true;
		goto(`/artwork/${artworkId}`, { replaceState: false, noScroll: true });
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.ctrlKey && event.key === 'ArrowLeft') {
			event.preventDefault();
			navigateToArtwork(navigation.prevId);
		} else if (event.ctrlKey && event.key === 'ArrowRight') {
			event.preventDefault();
			navigateToArtwork(navigation.nextId);
		} else if (event.key === 'ArrowLeft' && hasMultipleImages) {
			event.preventDefault();
			previousImage();
		} else if (event.key === 'ArrowRight' && hasMultipleImages) {
			event.preventDefault();
			nextImage();
		}
	}

	function nextImage() {
		if (hasMultipleImages && artwork.images) {
			currentImageIndex = (currentImageIndex + 1) % artwork.images.length;
		}
	}

	function previousImage() {
		if (hasMultipleImages && artwork.images) {
			currentImageIndex =
				(currentImageIndex - 1 + artwork.images.length) % artwork.images.length;
		}
	}

	function openLightbox() {
		if (!bp) return;
		// Dimensions are precomputed at build time (generate-artwork-images.mjs)
		const items = artwork.images.map((image) => ({
			img: image.src,
			alt: image.alt || $t('artworkAlt', { values: { title: artwork.title } }),
			width: image.width ?? 1920,
			height: image.height ?? 1080
		}));
		bp.open({ items, position: currentImageIndex });
	}

	// Reset image index when navigating between artworks
	$effect(() => {
		if (artwork) {
			currentImageIndex = 0;
			isNavigating = false;
		}
	});

	onMount(() => {
		mounted = true;
		bp = BiggerPicture({ target: document.body });
		return () => {
			try {
				bp?.close?.();
			} catch {
				// BiggerPicture may have already cleaned up during navigation
			}
			bp = null;
		};
	});
</script>

<SEO seo={data.seo} />

<GalleryHeader />

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<main
	class="mx-auto max-w-7xl px-4 focus:outline-none sm:px-6 lg:px-8"
	onkeydown={handleKeydown}
	tabindex="-1"
>
	<div class="py-3 md:py-4">
		<button
			onclick={goBack}
			class="inline-flex min-h-[44px] items-center gap-2 rounded-lg px-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
			aria-label={$t('goBack')}
		>
			<ArrowLeft class="size-4" />
			<span>{$t('goBack')}</span>
		</button>
	</div>

	<!-- All-artworks strip, flush with screen edges -->
	<div class="-mx-4 mb-6 sm:-mx-6 lg:-mx-8">
		<ArtworkCarousel currentArtworkId={artwork?.id} />
	</div>

	<div class="grid w-full grid-cols-1 gap-10 pb-16 lg:grid-cols-2 lg:gap-14">
		<!-- Image column -->
		<div class="space-y-4">
			<div class="relative">
				{#if currentImage && currentImage.src}
					{@const imageSrc = currentImage.src}
					{@const imageName = imageSrc.split('/').pop()?.replace('.webp', '')}
					{@const optimizedImage = imageName ? imageMapDetail[imageName] : undefined}
					<div
						onclick={openLightbox}
						onkeydown={(e) => e.key === 'Enter' && openLightbox()}
						class="cursor-zoom-in rounded-lg focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none"
						role="button"
						tabindex="0"
						aria-label={$t('expandImage', { default: 'Expand image' })}
					>
						{#if mounted && optimizedImage && browser}
							<Img
								src={optimizedImage}
								alt={$t('artworkAlt', { values: { title: artwork.title } })}
								class="w-full h-auto rounded-lg shadow-md"
								sizes="(min-width: 1360px) 551px, (min-width: 1040px) 40vw, calc(95.56vw - 53px)"
							/>
						{:else}
							<img
								src={imageSrc}
								alt={$t('artworkAlt', { values: { title: artwork.title } })}
								class="h-auto w-full rounded-lg shadow-md"
								loading="lazy"
								sizes="(min-width: 1360px) 551px, (min-width: 1040px) 40vw, calc(95.56vw - 53px)"
							/>
						{/if}
					</div>
				{:else}
					<div class="flex h-64 w-full items-center justify-center rounded-lg bg-muted">
						<p class="text-muted-foreground">No image available</p>
					</div>
				{/if}

				{#if hasMultipleImages}
					<button
						onclick={previousImage}
						class="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors duration-200 hover:bg-black/70"
						aria-label="Previous image"
					>
						<ChevronLeft class="size-6" />
					</button>
					<button
						onclick={nextImage}
						class="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors duration-200 hover:bg-black/70"
						aria-label="Next image"
					>
						<ChevronRight class="size-6" />
					</button>
				{/if}

				{#if !artwork.isAvailable}
					<div
						class="absolute top-4 right-4 rounded-full bg-foreground/80 px-3 py-1 text-sm font-medium text-background backdrop-blur-sm"
					>
						{$t('sold')}
					</div>
				{/if}
			</div>

			{#if hasMultipleImages && artwork.images}
				<ThumbnailCarousel
					images={artwork.images}
					selectedIndex={currentImageIndex}
					onImageSelect={(index) => (currentImageIndex = index)}
				/>
			{/if}

			<div class="text-center">
				<button
					onclick={openLightbox}
					class="inline-flex cursor-zoom-in items-center gap-2 text-xs text-muted-foreground transition-colors duration-200 hover:text-primary md:text-sm"
					aria-label={$t('clickToEnlarge')}
				>
					<Eye class="size-4" />
					<span>{$t('clickToEnlarge')}</span>
				</button>
			</div>
		</div>

		<!-- Details column -->
		<div class="space-y-6">
			<h1 class="font-serif text-3xl leading-tight font-light text-foreground md:text-4xl">
				{artwork.title}
			</h1>

			<dl class="space-y-4 border-y border-border py-6">
				{#if artwork.price}
					<div class="flex items-center gap-3">
						<Euro class="size-4 shrink-0 text-primary" aria-hidden="true" />
						<dt class="w-28 text-sm text-muted-foreground">{$t('priceLabel')}</dt>
						<dd class="font-medium text-foreground">
							{artwork.price} {artwork.currency || 'EUR'}
						</dd>
					</div>
				{/if}

				{#if artwork.dimensions}
					<div class="flex items-center gap-3">
						<Ruler class="size-4 shrink-0 text-primary" aria-hidden="true" />
						<dt class="w-28 text-sm text-muted-foreground">{$t('dimensionsLabel')}</dt>
						<dd class="font-medium text-foreground">
							{artwork.dimensions.width} × {artwork.dimensions.height}
							{artwork.dimensions.unit}
						</dd>
					</div>
				{/if}

				{#if artwork.year}
					<div class="flex items-center gap-3">
						<Calendar class="size-4 shrink-0 text-primary" aria-hidden="true" />
						<dt class="w-28 text-sm text-muted-foreground">{$t('yearLabel')}</dt>
						<dd class="font-medium text-foreground">{artwork.year}</dd>
					</div>
				{/if}

				<div class="flex items-center gap-3">
					<Tag class="size-4 shrink-0 text-primary" aria-hidden="true" />
					<dt class="w-28 text-sm text-muted-foreground">{$t('tagsLabel')}</dt>
					<dd class="flex flex-wrap gap-2">
						{#each Array.isArray(artwork.category) ? artwork.category : [artwork.category] as category (category)}
							<span
								class="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground"
							>
								{$t('categories.' + category)}
							</span>
						{/each}
					</dd>
				</div>
			</dl>

			{#if artwork.description}
				<p class="max-w-prose text-sm leading-relaxed text-muted-foreground md:text-base">
					{artwork.description}
				</p>
			{/if}

			{#if artwork.isAvailable}
				<div class="rounded-xl border border-primary/30 bg-primary/5 p-5 md:p-6">
					<h3 class="mb-1 font-serif text-lg text-foreground">{$t('interestedHeading')}</h3>
					<p class="mb-4 text-sm leading-relaxed text-muted-foreground">{$t('availableInfo')}</p>
					<a
						href="/contact"
						data-sveltekit-preload-data="hover"
						data-sveltekit-noscroll
						class="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-primary px-6 py-2.5 font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
					>
						{$t('contactArtist')}
					</a>
				</div>
			{:else}
				<div class="rounded-xl border border-border bg-muted/50 p-5 md:p-6">
					<h3 class="mb-1 font-serif text-lg text-muted-foreground">{$t('soldHeading')}</h3>
					<p class="mb-4 text-sm leading-relaxed text-muted-foreground">{$t('soldInfo')}</p>
					<a
						href="/contact"
						data-sveltekit-preload-data="hover"
						data-sveltekit-noscroll
						class="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-border px-6 py-2.5 font-medium text-foreground transition-colors duration-200 hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
					>
						{$t('contactArtist')}
					</a>
				</div>
			{/if}

			<!-- Prev / back / next -->
			<div class="flex items-center justify-between gap-2 pt-2">
				<button
					onclick={() => navigateToArtwork(navigation.prevId)}
					disabled={!navigation.prevId || isNavigating}
					class="inline-flex min-h-[44px] items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
					aria-label={$t('previousArtwork')}
				>
					<ChevronLeft class="size-5" />
					<span class="hidden lg:inline">{$t('previousArtwork')}</span>
				</button>

				<button
					onclick={goBack}
					class="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-border px-5 py-2 text-sm font-medium text-foreground transition-colors duration-200 hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
					aria-label={$t('goBack')}
				>
					{$t('goBack')}
				</button>

				<button
					onclick={() => navigateToArtwork(navigation.nextId)}
					disabled={!navigation.nextId || isNavigating}
					class="inline-flex min-h-[44px] items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
					aria-label={$t('nextArtwork')}
				>
					<span class="hidden lg:inline">{$t('nextArtwork')}</span>
					<ChevronRight class="size-5" />
				</button>
			</div>
		</div>
	</div>
</main>
