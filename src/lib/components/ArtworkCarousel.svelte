<!--
@component ArtworkCarousel
@description Horizontal scroll-snap strip of all artworks; highlights and centers the current one.
ponytail: plain scroll strip, no infinite-loop illusion — re-add triple-render trick only if users miss wraparound.
-->

<script lang="ts">
	import { getGalleryState } from '$lib/GalleryState.svelte';
	import { imageMapCarousel } from '$lib/data/imageImportsDetail';
	import Img from '@zerodevx/svelte-img';
	import { t } from 'svelte-i18n';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	let { currentArtworkId }: { currentArtworkId?: string } = $props();

	const galleryState = getGalleryState();
	let artworks = $derived(galleryState.artworks);

	let scrollContainer = $state<HTMLDivElement>();

	function scrollBy(direction: 1 | -1) {
		scrollContainer?.scrollBy({ left: direction * 320, behavior: 'smooth' });
	}

	// Center the current artwork whenever it changes
	$effect(() => {
		if (!currentArtworkId || !scrollContainer) return;
		const el = scrollContainer.querySelector(`[data-artwork-id="${currentArtworkId}"]`);
		el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
	});
</script>

<div class="group relative w-full">
	<button
		onclick={() => scrollBy(-1)}
		class="absolute top-1/2 left-1 z-10 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm transition-opacity duration-200 hover:bg-background min-[850px]:flex"
		aria-label="Scroll left"
	>
		<ChevronLeft class="size-5" />
	</button>
	<button
		onclick={() => scrollBy(1)}
		class="absolute top-1/2 right-1 z-10 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm transition-opacity duration-200 hover:bg-background min-[850px]:flex"
		aria-label="Scroll right"
	>
		<ChevronRight class="size-5" />
	</button>

	<div
		class="w-full snap-x scroll-px-4 overflow-x-auto scrollbar-hide"
		bind:this={scrollContainer}
	>
		<div class="flex gap-3 px-4 py-2">
			{#each artworks as artwork (artwork.id)}
				{@const imageSrc = artwork.images?.[0]?.src}
				{@const imageName = imageSrc?.split('/').pop()?.replace('.webp', '')}
				{@const optimizedImage = imageName ? imageMapCarousel[imageName] : undefined}
				{@const isCurrent = artwork.id === currentArtworkId}

				{#if imageSrc}
					<a
						href="/artwork/{artwork.id}"
						data-artwork-id={artwork.id}
						data-sveltekit-noscroll
						class="shrink-0 snap-center overflow-hidden rounded-md border-2 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none {isCurrent
							? 'border-primary opacity-100'
							: 'border-transparent opacity-70 hover:opacity-100'}"
						aria-label={$t('viewDetailsFor', { values: { title: artwork.title } })}
						aria-current={isCurrent ? 'true' : undefined}
						title={artwork.title}
					>
						{#if optimizedImage}
							<Img
								src={optimizedImage}
								alt={$t('artworkAlt', { values: { title: artwork.title } })}
								class="h-[100px] w-auto"
								sizes="100px"
							/>
						{:else}
							<img
								src={imageSrc}
								alt={$t('artworkAlt', { values: { title: artwork.title } })}
								class="h-[100px] w-auto"
								loading="lazy"
							/>
						{/if}
					</a>
				{/if}
			{/each}
		</div>
	</div>
</div>

<style>
	.scrollbar-hide {
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
</style>
