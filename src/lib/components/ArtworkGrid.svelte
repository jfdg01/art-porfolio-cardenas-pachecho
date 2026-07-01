<!--
@component ArtworkGrid
@description Responsive masonry layout (CSS columns) for artwork cards.
-->

<script lang="ts">
	import type { Artwork } from '$lib/types/artwork';
	import ArtworkCard from './ArtworkCard.svelte';
	import { ImageOff } from 'lucide-svelte';
	import { t } from 'svelte-i18n';

	let { artworks }: { artworks: Artwork[] } = $props();
</script>

{#if artworks.length === 0}
	<div class="py-20 text-center">
		<ImageOff class="mx-auto mb-4 size-10 text-muted-foreground" aria-hidden="true" />
		<h3 class="mb-1 font-serif text-lg text-foreground">{$t('noArtworksTitle')}</h3>
		<p class="text-sm text-muted-foreground">{$t('noArtworksHint')}</p>
	</div>
{:else}
	<div class="masonry-columns">
		{#each artworks as artwork, index (artwork.id)}
			<!-- First 6 are above the fold: prioritize for LCP -->
			<ArtworkCard {artwork} isPriority={index < 6} eager={index < 6} />
		{/each}
	</div>
{/if}

<style>
	.masonry-columns {
		column-count: 1;
		column-gap: 1.25rem;
	}

	@media (min-width: 350px) {
		.masonry-columns {
			column-count: 2;
		}
	}

	@media (min-width: 640px) {
		.masonry-columns {
			column-count: 3;
		}
	}

	@media (min-width: 1024px) {
		.masonry-columns {
			column-count: 4;
			column-gap: 1.5rem;
		}
	}

	@media (min-width: 1440px) {
		.masonry-columns {
			column-count: 5;
			column-gap: 1.75rem;
		}
	}

	:global(.artwork-container) {
		break-inside: avoid;
		margin-bottom: 1.5rem;
	}
</style>
