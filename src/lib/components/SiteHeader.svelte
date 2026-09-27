<!--
@component SiteHeader
@description The Artist's name, the one navigation list and the language link.
On a phone the links row scrolls away and the name stays on top.
-->

<script lang="ts">
	import { page } from '$app/state';
	import { m } from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { isActivePath } from '$lib/utils/navigation';
	import LanguageLink from './LanguageLink.svelte';
	import ScrollToTop from './ScrollToTop.svelte';

	const links = [
		{ path: '/', label: m.artworks },
		{ path: '/classes', label: m.onlineClassesPage },
		{ path: '/contact', label: m.contact }
	];
</script>

<header>
	<a class="name" href={localizeHref('/')}>Carmen Cárdenas Pacheco</a>
	<nav aria-label={m.mainNavigation()}>
		<ul>
			{#each links as { path, label } (path)}
				<li>
					<a
						href={localizeHref(path)}
						aria-current={isActivePath(page.url.pathname, path) ? 'page' : undefined}
					>
						{label()}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
	<LanguageLink />
</header>

<ScrollToTop />

<style>
	header {
		/* The links row, one tap target high: the phone header hides exactly this much */
		--links-h: 2.75rem;
		--gap: 0.625rem;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.25rem 2.5rem;
		padding: 0.75rem clamp(1rem, 4vw, 3rem);
		border-bottom: 1px solid var(--color-border);
		background: var(--color-background);
	}
	.name {
		font: 500 1.5rem/1.2 var(--font-serif);
		text-decoration: none;
	}
	ul {
		display: flex;
		gap: 0 1.75rem;
	}
	nav a {
		display: flex;
		align-items: center;
		height: var(--links-h);
		text-decoration: none;
	}
	nav a[aria-current],
	nav a:hover {
		text-decoration: underline;
		text-underline-offset: 0.35em;
	}
	/* Phone: the links on the first row, the name and the language link on the second.
	   The header is sticky with a negative top that equals the links row, so only the
	   second row stays. */
	@media (max-width: 700px) {
		header {
			position: sticky;
			top: calc(-1 * (0.75rem + var(--links-h) + var(--gap)));
			z-index: 50;
			display: grid;
			grid-template-columns: 1fr auto;
			gap: var(--gap) 1rem;
			padding-bottom: var(--gap);
		}
		nav {
			grid-column: 1 / -1;
			grid-row: 1;
		}
		ul {
			justify-content: space-between;
			gap: 0 1rem;
		}
		.name {
			font-weight: 600;
			font-size: clamp(1.125rem, 5.4vw, 1.5rem); /* one line down to 360 px */
			white-space: nowrap;
		}
	}
</style>
