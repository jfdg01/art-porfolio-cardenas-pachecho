<!--
@component AboutPage
@description The Artist for a Buyer: a photo, a biography and the exhibitions.
Each place holds dummy content, marked as such, until the Artist sends the real one.
-->

<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import SEO from '$lib/components/SEO.svelte';
	import { ARTIST } from '$lib';

	// Dummy entries. Exhibition names are proper names, so they stay untranslated.
	const exhibitions = [
		{ year: 2025, title: 'Luz y carbón', place: 'Galería de ejemplo, Madrid' },
		{ year: 2023, title: 'Retratos', place: 'Sala de ejemplo, Sevilla' },
		{ year: 2021, title: 'Acuarelas del sur', place: 'Casa de la Cultura de ejemplo, Málaga' }
	];
</script>

<SEO
	title="{m.about()} - Carmen Cárdenas Pacheco"
	description="Conoce a Carmen Cárdenas Pacheco, artista: su biografía y sus exposiciones."
	structuredData={{
		'@type': 'AboutPage',
		name: `${m.about()} - Carmen Cárdenas Pacheco`,
		mainEntity: { ...ARTIST, jobTitle: 'Artista' }
	}}
/>

<main class="page">
	<h1>{m.about()}</h1>

	<div class="columns">
		<figure>
			<div class="photo" role="img" aria-label={m.artistPhoto()}></div>
			<figcaption class="placeholder">{m.placeholder()}</figcaption>
		</figure>

		<div>
			<section>
				<h2>{m.biography()}</h2>
				<p class="placeholder">{m.placeholder()}</p>
				<p class="bio">{m.aboutBio()}</p>
			</section>

			<section>
				<h2>{m.exhibitions()}</h2>
				<p class="placeholder">{m.placeholder()}</p>
				<ul>
					{#each exhibitions as { year, title, place } (title)}
						<li><span class="year">{year}</span> <cite>{title}</cite>, {place}</li>
					{/each}
				</ul>
			</section>
		</div>
	</div>
</main>

<style>
	.page {
		max-width: 64rem;
		margin: 0 auto;
		padding: 1rem clamp(1rem, 4vw, 3rem) 4rem;
		font-family: var(--font-sans);
	}
	h1 {
		margin: 0 0 2rem;
		font: 400 2.25rem/1.2 var(--font-serif);
	}
	h2 {
		margin: 0;
		font: 400 1.5rem/1.3 var(--font-serif);
	}
	.columns {
		display: grid;
		grid-template-columns: 20rem minmax(0, 1fr);
		gap: clamp(2rem, 5vw, 4rem);
		align-items: start;
	}
	figure {
		margin: 0;
	}
	.photo {
		aspect-ratio: 4 / 5;
		border: 1px dashed var(--color-muted-foreground);
		background: var(--color-muted);
	}
	section + section {
		margin-top: 2.5rem;
	}
	/* The mark on each place that still holds dummy content */
	.placeholder {
		margin: 0.5rem 0 0;
		color: var(--color-muted-foreground);
		font-size: 0.9375rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}
	.bio {
		max-width: 60ch;
		margin: 0.75rem 0 0;
		font-size: 1.125rem;
		line-height: 1.6;
	}
	ul {
		margin: 0.75rem 0 0;
		font-size: 1.125rem;
		line-height: 1.5;
	}
	li + li {
		margin-top: 0.5rem;
	}
	.year {
		font-variant-numeric: tabular-nums;
		color: var(--color-muted-foreground);
	}
	@media (max-width: 700px) {
		.columns {
			grid-template-columns: 1fr;
		}
		figure {
			max-width: 16rem;
		}
	}
</style>
