<!--
@component ArtworkGrid
@description Grid layout component for displaying artworks in a responsive grid
@example
  <ArtworkGrid artworks={filteredArtworks} on:artworkClick={handleArtworkClick} />
-->

<script lang="ts">
	import type { Artwork } from '$lib/artworks';
	import ArtworkCard from './ArtworkCard.svelte';
	import { m } from '$lib/paraglide/messages';

	/**
	 * @prop {Artwork[]} artworks - Array of artworks to display
	 */
	let {
		artworks
	}: {
		artworks: Artwork[];
	} = $props();
</script>

<!-- Masonry Layout using CSS Columns -->
<div class="artwork-grid masonry-columns">
	{#each artworks as artwork, index (artwork.id)}
		<!-- Prioritize first 6 images (above-the-fold) for LCP optimization -->
		<ArtworkCard {artwork} isPriority={index < 6} eager={true} />
	{/each}
</div>

<!-- Results Count -->
<div class="mt-8 text-center">
	<p class="text-sm text-muted-foreground">
		{m.showingCount({ count: artworks.length })}
	</p>
</div>

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
