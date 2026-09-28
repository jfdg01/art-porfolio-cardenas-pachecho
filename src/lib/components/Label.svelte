<!--
@component Label
@description The museum Label of an Artwork: Title, year, Tags, dimensions, and Sold in words.
The short Label, under a small work, shows the Title and Sold only; the image alt names the work.
On the Artwork page the Title is the page heading, and the children follow the facts.
-->

<script lang="ts">
	import type { Artwork } from '$lib/artworks';
	import type { Snippet } from 'svelte';
	import { m } from '$lib/paraglide/messages';

	let {
		artwork,
		short = false,
		heading = false,
		children
	}: { artwork: Artwork; short?: boolean; heading?: boolean; children?: Snippet } = $props();
	const d = $derived(artwork.dimensions);
</script>

<svelte:element this={short ? 'span' : 'figcaption'} class={['label', short && 'short']}>
	<svelte:element this={heading ? 'h1' : 'span'} class="title" aria-hidden={short || undefined}
		>{artwork.title}</svelte:element
	>
	{#if !short}
		<span class="facts">
			{#if artwork.year}<span>{artwork.year}</span>{/if}
			<span>{artwork.tags.map((tag) => m[`tag_${tag}`]()).join(', ')}</span>
			{#if d}<span>{d.width} × {d.height} {d.unit}</span>{/if}
		</span>
	{/if}
	{#if artwork.sold}<span class="sold">{m.sold()}</span>{/if}
	{@render children?.()}
</svelte:element>

<style>
	.label {
		display: flex;
		flex-direction: column;
		font: 0.9375rem/1.45 var(--font-sans);
	}
	.title {
		font: 1.1875rem/1.3 var(--font-serif);
		color: var(--color-foreground);
	}
	.short {
		color: var(--color-muted-foreground);
	}
	.short .title {
		font-size: 1rem;
	}
	.facts {
		display: contents;
	}
	.sold {
		margin-top: 0.25rem;
		color: var(--color-foreground);
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		font-size: 0.8125rem;
	}
	.sold::before {
		content: '';
		display: inline-block;
		width: 0.6em;
		height: 0.6em;
		margin-right: 0.4em;
		background: #d2493c;
	}
	/* The full Label is a museum plaque: a small light card on the dark wall.
	   The Title #1b1a18 on #efeae0 is 15:1, the facts #4a463f are 8.3:1. */
	figcaption {
		padding: 0.75rem 1rem;
		background: #efeae0;
		color: #4a463f;
		box-shadow: 0 1px 3px rgb(0 0 0 / 0.6);
	}
	figcaption .title,
	figcaption .sold {
		color: #1b1a18;
	}
	/* Phone: under the work, the Title and Sold on one line and the facts on the next */
	@media (max-width: 700px), (max-height: 500px) {
		figcaption {
			display: grid;
			grid-template-columns: 1fr auto;
			column-gap: 1rem;
			align-items: baseline;
		}
		figcaption .sold {
			grid-area: 1 / 2;
			margin: 0;
		}
		.facts {
			display: block;
			grid-column: 1 / -1;
			font-size: 0.875rem;
		}
		.facts span + span::before {
			content: ' · ';
		}
	}
</style>
