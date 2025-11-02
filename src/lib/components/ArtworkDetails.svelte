<!--
@component ArtworkDetails
@description Details panel for artwork information including price, dimensions, year, category, description and navigation
-->

<script lang="ts">
	import type { Artwork } from '$lib/types/artwork';
	import { getGalleryState } from '$lib/GalleryState.svelte';
	import { goto } from '$app/navigation';
	import { t } from 'svelte-i18n';
	import { Euro, Calendar, Ruler, Tag, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { Button } from 'bits-ui';

	interface Props {
		artwork: Artwork;
	}

	let { artwork }: Props = $props();

	// Get gallery state from context
	const galleryState = getGalleryState();

	// Derive navigation from gallery state
	const navigation = $derived(galleryState.getArtworkNavigation(artwork.id));

	// Navigation state
	let isNavigating = $state(false);

	// Navigation functions
	function goBack() {
		goto('/', { noScroll: true });
	}

	function navigateToArtwork(artworkId: string | null) {
		if (!artworkId || isNavigating) return;
		isNavigating = true;
		goto(`/artwork/${artworkId}`, { replaceState: false, noScroll: true });
	}

	// Reset navigating state when artwork changes
	$effect(() => {
		if (artwork) {
			isNavigating = false;
		}
	});
</script>

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
					<p class="text-xs md:text-sm font-medium montserrat-medium text-muted-foreground mb-1">
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
					<p class="text-xs md:text-sm font-medium montserrat-medium text-muted-foreground mb-1">
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
					<p class="text-xs md:text-sm font-medium montserrat-medium text-muted-foreground mb-1">
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
				<p class="text-xs md:text-sm font-medium montserrat-medium text-muted-foreground mb-2">
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
							class="inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium montserrat-medium bg-primary/10 text-primary"
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
				<p class="text-xs md:text-sm font-medium montserrat-medium text-muted-foreground mb-2">
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
			<div class="bg-primary/5 border border-primary/20 rounded-xl p-4 md:p-6">
				<h3 class="text-base md:text-lg font-semibold montserrat-semibold text-primary mb-2">
					{$t('interestedHeading')}
				</h3>
				<p class="text-muted-foreground text-xs md:text-sm montserrat-medium mb-4 leading-relaxed">
					{$t('availableInfo')}
				</p>
				<Button.Root
					href="/contact"
					data-sveltekit-preload-data="hover"
					data-sveltekit-noscroll
					class="inline-flex items-center justify-center px-4 py-3 md:px-6 md:py-3 text-sm md:text-base font-semibold montserrat-semibold rounded-lg min-h-[44px] min-w-[44px] bg-gradient-to-r from-primary to-primary hover:from-primary/90 hover:to-primary/90 text-primary-foreground transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
				>
					{$t('contactArtist')}
				</Button.Root>
			</div>
		{:else}
			<div class="bg-muted/50 border border-border rounded-xl p-4 md:p-6">
				<div class="space-y-3">
					<h3 class="text-base md:text-lg font-semibold montserrat-semibold text-muted-foreground">
						{$t('soldHeading')}
					</h3>
					<p class="text-muted-foreground text-xs md:text-sm montserrat-medium leading-relaxed">
						{$t('soldInfo')}
					</p>
					<div class="pt-2 flex justify-center">
						<Button.Root
							href="/contact"
							data-sveltekit-preload-data="hover"
							data-sveltekit-noscroll
							class="inline-flex items-center justify-center px-4 py-3 md:px-6 md:py-3 text-sm md:text-base font-semibold montserrat-semibold rounded-lg min-h-[44px] min-w-[44px] bg-gradient-to-r from-primary to-primary hover:from-primary/90 hover:to-primary/90 text-primary-foreground transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
						>
							{$t('contactArtist')}
						</Button.Root>
					</div>
				</div>
			</div>
		{/if}

		<!-- Artwork Navigation Controls -->
		<div class="pt-2">
			<div class="flex items-center justify-between gap-2 md:gap-3 lg:gap-4">
				<!-- Previous Artwork Button -->
				<Button.Root
					onclick={() => navigateToArtwork(navigation.prevId)}
					disabled={!navigation.prevId || isNavigating}
					class="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium montserrat-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all duration-200 min-h-[44px] min-w-[44px] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent md:px-4 md:text-base"
					aria-label={$t('previousArtwork')}
					title={$t('previousArtwork')}
				>
					<ChevronLeft class="w-5 h-5" />
					<span class="hidden lg:inline">{$t('previousArtwork')}</span>
				</Button.Root>

				<!-- Go Back to Gallery Button -->
				<Button.Root
					onclick={goBack}
					class="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold montserrat-semibold rounded-lg min-h-[44px] bg-gradient-to-r from-primary to-primary hover:from-primary/90 hover:to-primary/90 text-primary-foreground transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 md:px-6 md:text-base"
					aria-label={$t('goBack')}
				>
					<span class="whitespace-nowrap">{$t('goBack')}</span>
				</Button.Root>

				<!-- Next Artwork Button -->
				<Button.Root
					onclick={() => navigateToArtwork(navigation.nextId)}
					disabled={!navigation.nextId || isNavigating}
					class="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium montserrat-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all duration-200 min-h-[44px] min-w-[44px] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent md:px-4 md:text-base"
					aria-label={$t('nextArtwork')}
					title={$t('nextArtwork')}
				>
					<span class="hidden lg:inline">{$t('nextArtwork')}</span>
					<ChevronRight class="w-5 h-5" />
				</Button.Root>
			</div>
		</div>
	</div>
</div>
