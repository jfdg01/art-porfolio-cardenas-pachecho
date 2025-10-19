<!--
@component ArtworkGrid
@description Grid layout component for displaying artworks in a responsive grid
@example
  <ArtworkGrid artworks={filteredArtworks} on:artworkClick={handleArtworkClick} />
-->

<script lang="ts">
	import type { Artwork } from '$lib/types/artwork';
	import ArtworkCard from './ArtworkCard.svelte';
	import { t } from 'svelte-i18n';

	/**
	 * @prop {Artwork[]} artworks - Array of artworks to display
	 */
	let {
		artworks
	}: {
		artworks: Artwork[];
	} = $props();
</script>

{#if artworks.length === 0}
	<!-- Empty State -->
	<div class="text-center py-12">
		<div class="mx-auto h-24 w-24 text-gray-400 mb-4">
			<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1"
					d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
				></path>
			</svg>
		</div>
		<h3 class="text-lg font-medium montserrat-medium text-gray-900 mb-2">
			{$t('noArtworksTitle')}
		</h3>
		<p class="text-gray-500 montserrat-medium">{$t('noArtworksHint')}</p>
	</div>
{:else}
	<!-- Masonry Layout using CSS Columns -->
	<div class="artwork-grid masonry-columns">
		{#each artworks as artwork (artwork.id)}
			<ArtworkCard {artwork} />
		{/each}
	</div>

	<!-- Results Count -->
	<div class="mt-8 text-center">
		<p class="text-sm text-gray-500 montserrat-medium">
			{$t('showingCount', { values: { count: artworks.length } })}
		</p>
	</div>
{/if}

<style>
	.masonry-columns {
		/* CSS Columns masonry layout */
		column-count: 1;
		column-gap: 1rem;
		break-inside: avoid;
	}

	/* Responsive breakpoints for column count */
	@media (min-width: 350px) {
		.masonry-columns {
			column-count: 2;
			column-gap: 1rem;
		}
	}

	@media (min-width: 520px) {
		.masonry-columns {
			column-count: 3;
			column-gap: 1.5rem;
		}
	}

	@media (min-width: 1024px) {
		.masonry-columns {
			column-count: 4;
			column-gap: 1.75rem;
		}
	}

	@media (min-width: 1280px) {
		.masonry-columns {
			column-count: 5;
			column-gap: 2rem;
		}
	}

	@media (min-width: 1536px) {
		.masonry-columns {
			column-count: 6;
			column-gap: 2.25rem;
		}
	}

	/* Ensure artwork containers don't break across columns */
	:global(.artwork-container) {
		break-inside: avoid;
		page-break-inside: avoid;
		margin-bottom: 1rem;
	}
</style>
