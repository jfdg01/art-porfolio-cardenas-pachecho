<!--
@component ArtworkPage
@description One Artwork as a museum shows it: the main image large, the Label beside it,
the detail images below, and links to the previous and next Artwork on the Wall.
-->

<script lang="ts">
	import type { PageData } from './$types';
	import { getNeighbours } from '$lib/artworks';
	import { m } from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { beforeNavigate } from '$app/navigation';
	import SEO from '$lib/components/SEO.svelte';
	import Label from '$lib/components/Label.svelte';
	import { ARTIST, SITE_URL } from '$lib';
	import BiggerPicture from 'bigger-picture';

	let { data }: { data: PageData } = $props();
	let artwork = $derived(data.artwork);
	let neighbours = $derived(getNeighbours(artwork.id));

	// ponytail: the lightbox shows the display copies; the Full View from R2 (#13) replaces them.
	// One lightbox, made on the first click. Its close() throws when it is not open.
	let bp: ReturnType<typeof BiggerPicture> | undefined;
	let open = false;
	beforeNavigate(() => open && bp!.close());

	function enlarge(position: number) {
		bp ??= BiggerPicture({ target: document.body });
		bp.open({
			items: artwork.images.map(({ img }) => ({
				img: img.src,
				alt: artwork.title,
				width: img.w,
				height: img.h
			})),
			position,
			onOpen: () => (open = true),
			onClosed: () => (open = false)
		});
	}
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

<main class="page">
	<nav aria-label={m.otherArtworks()}>
		<a href={localizeHref(`/artwork/${neighbours.previous.id}`)} rel="prev">
			<span class="way"><span aria-hidden="true">←</span> {m.previousArtwork()}</span>
			<span class="to">{neighbours.previous.title}</span>
		</a>
		<a class="wall" href={localizeHref('/')}>{m.goBack()}</a>
		<a href={localizeHref(`/artwork/${neighbours.next.id}`)} rel="next">
			<span class="way">{m.nextArtwork()} <span aria-hidden="true">→</span></span>
			<span class="to">{neighbours.next.title}</span>
		</a>
	</nav>

	<figure>
		<Label {artwork} heading>
			<p class="info">{artwork.sold ? m.soldInfo() : m.availableInfo()}</p>
			<a class="ask" href={localizeHref(`/contact?artwork=${artwork.id}`)}>{m.askAboutArtwork()}</a>
		</Label>
		<div class="images">
			{#each artwork.images as picture, i (picture)}
				<button
					type="button"
					class={i ? 'detail' : 'main'}
					aria-label={m.expandImage({ n: i + 1, total: artwork.images.length })}
					onclick={() => enlarge(i)}
				>
					<enhanced:img
						src={picture}
						alt={artwork.title}
						sizes={i ? '(max-width: 900px) 50vw, 15vw' : '(max-width: 900px) 100vw, 65vw'}
						loading={i ? 'lazy' : 'eager'}
					/>
				</button>
				{#if !i}<p class="hint">{m.enlargeHint()}</p>{/if}
			{/each}
		</div>
	</figure>
</main>

<style>
	.page {
		max-width: 90rem;
		margin: 0 auto;
		padding: 1rem clamp(1rem, 4vw, 3rem) 4rem;
	}
	nav {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		gap: 1rem;
		align-items: center;
		padding-bottom: 1.5rem;
		font: 0.9375rem/1.4 var(--font-sans);
	}
	nav a {
		display: flex;
		flex-direction: column;
		min-height: 44px;
		justify-content: center;
		color: var(--color-foreground);
		text-decoration: none;
	}
	nav a:hover .way,
	.wall:hover {
		text-decoration: underline;
	}
	[rel='next'] {
		text-align: right;
	}
	.to {
		color: var(--color-muted-foreground);
		font-family: var(--font-serif);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.wall {
		text-align: center;
	}
	figure {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 20rem;
		gap: clamp(1.5rem, 3vw, 3rem);
		align-items: start;
		margin: 0;
	}
	.images {
		grid-area: 1 / 1;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
		gap: 1rem;
	}
	.images button {
		display: block;
		padding: 0;
		border: 0;
		background: none;
		cursor: zoom-in;
	}
	.main {
		grid-column: 1 / -1;
		justify-self: center;
	}
	/* The whole work fits the screen, so a tall portrait is not cut */
	.main :global(img) {
		display: block;
		max-width: 100%;
		max-height: calc(100svh - 13rem);
		width: auto;
		height: auto;
		box-shadow: 0 1px 3px rgb(0 0 0 / 0.6);
	}
	.hint {
		grid-column: 1 / -1;
		margin: -0.25rem 0 0;
		text-align: center;
		color: var(--color-muted-foreground);
		font: 0.9375rem/1.4 var(--font-sans);
	}
	.detail :global(img) {
		display: block;
		width: 100%;
		aspect-ratio: 1;
		object-fit: cover;
	}
	figure :global(figcaption) {
		grid-area: 1 / 2;
		position: sticky;
		top: 5rem;
	}
	figure :global(.title) {
		margin: 0;
		font-size: 1.75rem;
		font-weight: 400;
	}
	.info {
		margin: 1rem 0;
		line-height: 1.45;
	}
	/* Dark on the light Label: 15:1 */
	.ask {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		padding: 0 1.25rem;
		background: #1b1a18;
		color: #efeae0;
		font-weight: 600;
		text-decoration: none;
		align-self: start;
	}
	.ask:hover {
		text-decoration: underline;
	}
	.ask:focus-visible {
		outline-color: #1b1a18;
	}
	/* Phone: the main image, then the Label, then the detail images two by two */
	@media (max-width: 900px) {
		figure {
			grid-template-columns: 1fr 1fr;
			gap: 1rem;
		}
		.images {
			display: contents;
		}
		.main,
		.hint {
			order: -1;
		}
		figure :global(figcaption) {
			grid-area: auto / 1 / auto / -1;
			position: static;
		}
		.info,
		.ask {
			grid-column: 1 / -1;
		}
		.main :global(img) {
			max-height: 75svh;
		}
	}
	@media (max-width: 600px) {
		nav {
			grid-template-columns: 1fr 1fr;
		}
		.wall {
			grid-column: 1 / -1;
			grid-row: 2;
		}
	}
</style>
