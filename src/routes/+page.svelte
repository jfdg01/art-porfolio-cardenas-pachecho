<!--
@component WallPage
@description The Wall: the Artworks hang in Rooms, one Room per Tag, each with its Label.
Two views: "Paseo", a walk through the Rooms (sideways on a computer, down on a phone),
and "Todas", every Room at once. The URL keeps the view (`?vista=todas`) and the
current Room (`#sala-<tag>`).
-->

<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { prefersReducedMotion } from 'svelte/motion';
	import { MediaQuery } from 'svelte/reactivity';
	import { replaceState } from '$app/navigation';
	import { page } from '$app/state';
	import { artworks, getArtwork, rooms, type Artwork, type Room, type Tag } from '$lib/artworks';
	import Label from '$lib/components/Label.svelte';
	import LanguageLink from '$lib/components/LanguageLink.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { m } from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { LINKS } from '$lib/utils/navigation';
	import { deal, gather } from '$lib/wall-motion';
	import { ARTIST, SITE_URL } from '$lib';

	let { data } = $props();

	// A phone, held either way. The same query sits in the styles below; keep the two equal.
	const phone = new MediaQuery('(max-width: 700px), (max-height: 500px)');
	const roomName = (tag: Tag) => m[`room_${tag}`]();
	const faces = $derived(data.faces.map((id) => getArtwork(id)!));

	// The walk is a row of stops: a door before each Room, then the Room's Artworks.
	type Stop = { room: Room; artwork?: Artwork; n: number };
	const stops: Stop[] = rooms.flatMap((room) => [
		{ room, n: 0 },
		...room.artworks.map((artwork, i) => ({ room, artwork, n: i + 1 }))
	]);

	let view = $state<'paseo' | 'todas'>('paseo');
	let current = $state<Tag>(rooms[0].tag);
	let stop = $state(0);
	let ready = $state(false);
	let walk: HTMLElement;
	let mass: HTMLElement;
	let strip: HTMLElement;
	const stopEls: HTMLElement[] = [];

	const where = $derived.by(() => {
		const { room, n } = stops[stop];
		const name = roomName(room.tag);
		return n ? m.walkWork({ room: name, n, count: room.artworks.length }) : name;
	});

	// The URL keeps the view and the current Room, and the strip keeps the current Room in view.
	$effect(() => {
		const url = `${view === 'todas' ? '?vista=todas' : location.pathname}#sala-${current}`;
		if (ready && location.search + location.hash !== url.replace(location.pathname, ''))
			replaceState(url, page.state);
		const chip = strip.querySelector<HTMLElement>(`[data-room="${current}"]`)!.parentElement!;
		const list = chip.parentElement!;
		if (
			chip.offsetLeft < list.scrollLeft ||
			chip.offsetLeft + chip.offsetWidth > list.scrollLeft + list.clientWidth
		)
			list.scrollLeft = chip.offsetLeft - 16;
	});

	// The stop nearest the middle of the walk is the current stop.
	let busyUntil = 0; // a walk step is under way; its scroll events must not reset the stop
	let frame = 0;
	function find() {
		if (view !== 'paseo' || performance.now() < busyUntil) return;
		const box = walk.getBoundingClientRect();
		const mid = phone.current ? innerHeight / 2 : box.left + box.width / 2;
		const offset = (el: HTMLElement) => {
			const r = el.getBoundingClientRect();
			return Math.abs((phone.current ? r.top + r.height / 2 : r.left + r.width / 2) - mid);
		};
		stop = stopEls.reduce((best, el, i) => (offset(el) < offset(stopEls[best]) ? i : best), 0);
		current = stops[stop].room.tag;
	}
	function onScroll() {
		cancelAnimationFrame(frame);
		frame = requestAnimationFrame(view === 'paseo' ? find : follow);
	}

	// Move at once, so a quick second step goes one stop further, not to the same stop.
	// ponytail: a fixed 700 ms guard; use the scrollend event once Safari has it.
	function go(i: number, behavior: ScrollBehavior = 'smooth') {
		stop = Math.max(0, Math.min(stops.length - 1, i));
		current = stops[stop].room.tag;
		busyUntil = performance.now() + 700;
		stopEls[stop].scrollIntoView({
			inline: 'center',
			block: phone.current ? 'start' : 'center',
			behavior: prefersReducedMotion.current ? 'instant' : behavior
		});
	}

	// In Todas, the Room under the strip is the current Room.
	function follow() {
		if (view !== 'todas') return;
		const line = strip.getBoundingClientRect().bottom + 80;
		const passed = [...mass.children].filter((s) => s.getBoundingClientRect().top <= line);
		current = ((passed.at(-1) ?? mass.firstElementChild) as HTMLElement).dataset.room as Tag;
	}

	function open(tag: Tag) {
		current = tag;
		if (view === 'todas') document.getElementById(`todas-${tag}`)!.scrollIntoView();
		else
			go(
				stops.findIndex((s) => s.room.tag === tag && !s.n),
				'instant'
			);
	}

	// A Room tap slides the old Room out and the new one in, the way the walk goes: sideways
	// on the computer walk, up or down elsewhere. The header, the strip and the bars stay.
	function travel(tag: Tag) {
		if (prefersReducedMotion.current || !document.startViewTransition) return open(tag);
		const at = (t: Tag) => rooms.findIndex((room) => room.tag === t);
		const way = Math.sign(at(tag) - at(current));
		const sideways = view === 'paseo' && !phone.current;
		const html = document.documentElement.style;
		html.setProperty('--vt-x', sideways ? `${way * 12}vw` : '0px');
		html.setProperty('--vt-y', sideways ? '0px' : `${way * 12}vh`);
		document.startViewTransition(async () => {
			open(tag);
			await tick();
		});
	}

	// A change of view keeps the current Room on screen, and the works fly to their new places.
	function setView(next: 'paseo' | 'todas', move = () => open(current)) {
		if (next === view) return;
		const show = async () => {
			view = next;
			await tick();
			move();
		};
		if (prefersReducedMotion.current) show();
		else (next === 'todas' ? deal : gather)(walk, mass, show);
	}

	// A tap on a small work in Todas opens it in the walk, in the same Room.
	function openInWalk(tag: Tag, id: string) {
		const i = stops.findIndex((s) => s.room.tag === tag && s.artwork?.id === id);
		setView('paseo', () => go(i, 'instant'));
	}

	// The side edges of a canvas show the edges of its image, the copy the browser picked.
	function edges(e: Event) {
		const img = e.currentTarget as HTMLImageElement;
		img.closest<HTMLElement>('.canvas')!.style.setProperty('--img', `url("${img.currentSrc}")`);
	}

	function onKey(e: KeyboardEvent) {
		const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
		if (!step || view !== 'paseo' || (e.target as Element).closest('input, select, textarea'))
			return;
		e.preventDefault();
		go(stop + step);
	}

	// A mouse wheel scrolls down; in a sideways walk that means "walk on".
	function onWheel(e: WheelEvent) {
		if (phone.current || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
		walk.scrollLeft += e.deltaY;
		e.preventDefault();
	}

	onMount(() => {
		if (new URLSearchParams(location.search).get('vista') === 'todas') view = 'todas';
		const tag = location.hash.slice('#sala-'.length);
		// A link to a Room opens it, once the fonts have set the height of the header.
		document.fonts.ready.then(async () => {
			await tick();
			if (rooms.some((room) => room.tag === tag)) open(tag as Tag);
			else find();
			ready = true;
		});
	});
</script>

<svelte:window onkeydown={onKey} onscroll={phone.current ? onScroll : undefined} />

<SEO
	title="Carmen Cárdenas Pacheco - Portfolio de Arte"
	description="Bienvenid@ al portfolio de arte de Carmen Cárdenas Pacheco. Ponte en contacto conmigo y mis clases online."
	structuredData={{
		'@type': 'ImageGallery',
		name: 'Carmen Cárdenas Pacheco - Art Portfolio',
		description: 'Portfolio de arte de Carmen Cárdenas Pacheco',
		author: ARTIST,
		image: artworks.slice(0, 10).map((artwork) => ({
			'@type': 'ImageObject',
			name: artwork.title,
			contentUrl: SITE_URL + artwork.images[0].img.src,
			description: `${artwork.title} by Carmen Cárdenas Pacheco`,
			author: ARTIST,
			copyrightHolder: ARTIST,
			dateCreated: artwork.year?.toString()
		}))
	}}
/>

{#snippet views(short: boolean)}
	<div class="views" role="group" aria-label={m.views()}>
		<button type="button" aria-pressed={view === 'paseo'} onclick={() => setView('paseo')}>
			{m.viewWalk()}
		</button>
		<button type="button" aria-pressed={view === 'todas'} onclick={() => setView('todas')}>
			{short ? m.viewAllShort() : m.viewAll()}
		</button>
	</div>
{/snippet}

<div class="wall">
	<nav class="rooms" aria-label={m.rooms()} bind:this={strip}>
		<span class="caption">{m.rooms()}:</span>
		<span class="lang"><LanguageLink /></span>
		<ul>
			{#each rooms as room, i (room.tag)}
				<li>
					<a
						href="#sala-{room.tag}"
						data-room={room.tag}
						aria-current={room.tag === current || undefined}
						onclick={(e) => {
							e.preventDefault();
							travel(room.tag);
						}}
					>
						<enhanced:img src={faces[i].images[0]} alt="" sizes="72px" />
						<span>{roomName(room.tag)}</span>
					</a>
				</li>
			{/each}
		</ul>
		{@render views(true)}
	</nav>

	<main
		class="corridor"
		hidden={view !== 'paseo'}
		tabindex="-1"
		bind:this={walk}
		onscroll={onScroll}
		onwheel={onWheel}
	>
		{#each stops as { room, artwork }, i (i)}
			{#if artwork}
				<figure
					class="work"
					data-room={room.tag}
					data-id={artwork.id}
					style:--r={artwork.images[0].img.w / artwork.images[0].img.h}
					bind:this={stopEls[i]}
				>
					<a
						class="canvas"
						href={localizeHref(`/artwork/${artwork.id}`)}
						aria-label={artwork.title}
					>
						<enhanced:img
							src={artwork.images[0]}
							alt={artwork.title}
							sizes="(max-width: 700px) 100vw, 40vw"
							loading={i < 4 ? 'eager' : 'lazy'}
							onload={edges}
						/>
						<i class="edge l"></i><i class="edge r"></i><i class="edge t"></i><i class="edge b"></i>
					</a>
					<Label {artwork} />
				</figure>
			{:else}
				{@const r = rooms.indexOf(room)}
				{@const next = rooms[r + 1]}
				{@const after = next ? ` · ${m.nextRoom({ room: roomName(next.tag) })}` : ''}
				<section class="door" id="sala-{room.tag}" data-room={room.tag} bind:this={stopEls[i]}>
					<p>{m.roomOf({ n: r + 1, total: rooms.length })}</p>
					<h2>{roomName(room.tag)}</h2>
					<p>
						{m.workCount({ count: room.artworks.length })}{after}
					</p>
				</section>
			{/if}
		{/each}
	</main>

	<main class="mass" hidden={view !== 'todas'} bind:this={mass} onscroll={onScroll}>
		{#each rooms as room (room.tag)}
			<section id="todas-{room.tag}" data-room={room.tag} aria-labelledby="todas-{room.tag}-name">
				<header>
					<h2 id="todas-{room.tag}-name">{roomName(room.tag)}</h2>
					<p>{m.workCount({ count: room.artworks.length })}</p>
				</header>
				<ul>
					{#each room.artworks as artwork (artwork.id)}
						<li>
							<a
								href="#sala-{room.tag}"
								data-room={room.tag}
								data-id={artwork.id}
								onclick={(e) => {
									e.preventDefault();
									openInWalk(room.tag, artwork.id);
								}}
							>
								<enhanced:img
									src={artwork.images[0]}
									alt={artwork.title}
									sizes="(max-width: 700px) 33vw, 15vw"
									loading="lazy"
								/>
								<Label {artwork} short />
							</a>
						</li>
					{/each}
				</ul>
			</section>
		{/each}
	</main>

	<!-- The site links again, at the end of the phone walk -->
	<nav class="end" aria-label={m.mainNavigation()}>
		<ul>
			{#each LINKS as { path, label } (path)}
				<li><a href={localizeHref(path)}>{label()}</a></li>
			{/each}
		</ul>
	</nav>

	<div class="controls">
		<div class="walking" hidden={view !== 'paseo'}>
			<button type="button" disabled={stop === 0} onclick={() => go(stop - 1)}>
				<span aria-hidden="true">←</span>
				{m.previousStop()}
			</button>
			<output aria-live="polite">{where}</output>
			<button type="button" disabled={stop === stops.length - 1} onclick={() => go(stop + 1)}>
				{m.nextStop()}
				<span aria-hidden="true">→</span>
			</button>
		</div>
		{@render views(false)}
	</div>
</div>

<style>
	/* A computer: the Wall fills the screen under the header, and the page does not scroll. */
	@media (min-width: 701px) and (min-height: 501px) {
		:global(.site:has(.wall)) {
			height: 100dvh;
		}
		/* A flex item grows to its content unless its min-height is 0, and the page scrolls */
		:global(.site > :has(> .wall)) {
			min-height: 0;
		}
		:global(.site:has(.wall) > footer) {
			display: none;
		}
		.wall {
			height: 100%;
			display: flex;
			flex-direction: column;
		}
	}
	button {
		min-height: 48px;
		padding: 0.5rem 1rem;
		border: 1px solid var(--color-muted-foreground);
	}
	button[aria-pressed='true'] {
		background: var(--color-foreground);
		color: var(--color-background);
	}
	button:disabled {
		opacity: 0.4;
	}

	/* The Room strip: each Room shows one of its works above its name */
	.rooms {
		display: flex;
		align-items: center;
		gap: 0.25rem 1.5rem;
		padding: 0.5rem clamp(1rem, 4vw, 3rem);
		border-bottom: 1px solid var(--color-border);
	}
	.rooms ul {
		position: relative; /* the offsetLeft of a Room counts from the list */
		flex: 1;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(5rem, 1fr));
		gap: 0.25rem 0.5rem;
		font-size: 0.9375rem;
	}
	.rooms a {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.35rem;
		padding: 0.35rem 0;
		text-decoration: none;
		color: var(--color-muted-foreground);
	}
	.rooms :global(img) {
		width: min(4.5rem, 100%);
		height: 3.25rem;
		object-fit: cover;
		opacity: 0.75;
	}
	.rooms a:hover :global(img),
	.rooms a[aria-current] :global(img) {
		opacity: 1;
	}
	.rooms a[aria-current] :global(img) {
		outline: 2px solid var(--color-foreground);
		outline-offset: 2px;
	}
	.rooms a[aria-current] {
		color: var(--color-foreground);
	}
	.rooms a[aria-current] span {
		text-decoration: underline;
		text-underline-offset: 0.35em;
	}
	.rooms .lang,
	.rooms .views,
	.end {
		display: none;
	}

	/* The walk: sideways on a computer, one stop in the middle of the screen */
	.corridor {
		flex: 1;
		display: flex;
		align-items: center;
		gap: 14vw;
		padding: 0 calc(50vw - 12rem);
		overflow: auto hidden;
		scroll-snap-type: x proximity;
		container-type: size; /* cqh: a work fits the walk height, whatever the header takes */
	}
	.corridor > * {
		flex: none;
		scroll-snap-align: center;
	}
	/* A Room door: the name of the Room, big, on the wall of the walk */
	.door {
		width: 22rem;
		border-left: 1px solid var(--color-muted-foreground);
		padding: 2rem 0 2rem 2rem;
		color: var(--color-muted-foreground);
	}
	.door h2 {
		font: italic 400 clamp(2.5rem, 6vw, 4.5rem) / 1 var(--font-serif);
		margin: 0.5rem 0 1rem;
		color: var(--color-foreground);
	}
	.work {
		display: flex;
		align-items: flex-end;
		gap: 1.75rem;
	}
	.canvas {
		position: relative;
		display: block;
		width: min(calc(72cqh * var(--r)), 62vw);
		aspect-ratio: var(--r);
	}
	.canvas :global(picture),
	.canvas :global(img) {
		display: block;
		width: 100%;
		height: 100%;
	}
	.work :global(.label) {
		width: 12rem;
	}

	/* Todas: every Room at once, small uncropped works in masonry columns, each with a short Label */
	.mass {
		flex: 1;
		min-height: 0;
		overflow: hidden auto;
		padding: 1.5rem clamp(1rem, 4vw, 3rem) 4rem;
	}
	.mass section + section {
		margin-top: 3.5rem;
	}
	.mass header {
		display: flex;
		align-items: baseline;
		gap: 0.75rem;
		margin-bottom: 1.25rem;
		color: var(--color-muted-foreground);
	}
	.mass h2 {
		font: italic 400 2.25rem/1.1 var(--font-serif);
		color: var(--color-foreground);
	}
	.mass ul {
		columns: 6 11rem;
		column-gap: 1.75rem;
	}
	.mass li {
		break-inside: avoid;
		margin-bottom: 2rem;
	}
	.mass a {
		display: block;
		text-decoration: none;
	}
	.mass :global(img) {
		display: block;
		width: 100%;
		height: auto;
	}
	.mass a:hover :global(img),
	.mass a:focus-visible :global(img) {
		outline: 2px solid var(--color-foreground);
		outline-offset: 3px;
	}
	.mass a:hover :global(.title) {
		text-decoration: underline;
	}
	.mass :global(.label) {
		margin-top: 0.5rem;
	}

	/* The bottom bar: the walk buttons in the middle, the view switch at the side */
	.controls {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		padding: 0.75rem;
		border-top: 1px solid var(--color-border);
	}
	.walking {
		grid-column: 2;
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}
	.walking output {
		min-width: 14rem;
		text-align: center;
		color: var(--color-muted-foreground);
	}
	.views {
		grid-column: 3; /* the same place in both views */
		justify-self: end;
		display: flex;
	}
	.views button + button {
		border-left: 0;
	}

	/* A phone: one walk down the page. The site links scroll away with the header (see
	   SiteHeader.svelte); the name, the view switch and the Room strip stay on top. */
	@media (max-width: 700px), (max-height: 500px) {
		.controls {
			display: none;
		}
		.rooms {
			position: sticky;
			top: 0;
			z-index: 51; /* above the header, for the view switch */
			gap: 0;
			padding: 0.375rem 0;
			background: var(--color-background);
		}
		.rooms .caption {
			display: none;
		}
		/* The header's own language link keeps its place, so the header keeps its height,
		   but hides: the language link is in the strip. */
		:global(.site:has(.wall) > header [hreflang]) {
			visibility: hidden;
		}
		/* The language link sits first in the strip */
		.rooms .lang {
			display: flex;
			flex: none;
			height: 2.75rem;
			margin-left: 1rem;
			padding-right: 1rem;
			border-right: 1px solid var(--color-border);
		}
		.rooms ul {
			display: flex;
			gap: 0.5rem;
			min-width: 0;
			overflow-x: auto;
			padding: 0 1rem;
			scrollbar-width: none;
		}
		.rooms li {
			flex: none;
		}
		.rooms a {
			flex-direction: row;
			gap: 0.6rem;
			height: 2.75rem;
			padding: 0 0.8rem 0 0;
			border: 1px solid var(--color-border);
		}
		.rooms :global(img) {
			width: 2.75rem;
			height: 100%;
		}
		.rooms a[aria-current] {
			border-color: var(--color-foreground);
		}
		.rooms a[aria-current] :global(img) {
			outline: none;
		}
		.rooms a[aria-current] span {
			text-decoration: none;
		}
		/* The view switch shows only the other view. Both buttons share one cell, so the
		   switch keeps one width. */
		.rooms .views {
			display: grid;
			flex: none;
			margin-right: 1rem;
		}
		.rooms .views button {
			grid-area: 1 / 1;
			height: 2.75rem;
			min-height: 0;
			padding: 0 0.75rem;
			font-size: 0.9375rem;
			background: var(--color-foreground);
			color: var(--color-background);
		}
		.rooms .views [aria-pressed='true'] {
			visibility: hidden;
		}
		.corridor {
			display: block;
			overflow: visible;
			container-type: normal;
			padding: 0 1rem 3rem;
		}
		.corridor > * {
			margin-top: 3rem;
			scroll-margin-top: 8rem; /* under the name and the strip */
		}
		.door {
			width: auto;
			border: 0;
			padding: 0;
		}
		.door h2 {
			font-size: 2.5rem;
			margin: 0.25rem 0 0.5rem;
		}
		.work {
			flex-direction: column;
			align-items: center;
			gap: 0.6rem;
		}
		.canvas,
		.work :global(.label) {
			width: min(100%, calc(68svh * var(--r)));
		}
		.work :global(.label) {
			min-width: min(100%, 16rem);
		}
		/* Todas on a phone: the page scrolls, three columns, no Labels */
		.mass {
			overflow: visible;
			padding: 0 1rem 3rem;
		}
		.mass section {
			scroll-margin-top: 8rem;
		}
		.mass section + section {
			margin-top: 2.5rem;
		}
		.mass header {
			margin: 1.5rem 0 0.75rem;
		}
		.mass h2 {
			font-size: 1.75rem;
		}
		.mass ul {
			columns: 3;
			column-gap: 0.25rem;
		}
		.mass li {
			margin-bottom: 0.25rem;
		}
		.mass :global(.label) {
			display: none;
		}
		.end {
			display: block;
			padding: 2rem 1rem 1rem;
			border-top: 1px solid var(--color-border);
		}
		.end ul {
			display: flex;
			flex-wrap: wrap;
			gap: 0.25rem 1.5rem;
		}
		.end a {
			display: inline-block;
			padding: 0.5rem 0;
		}
	}
	/* A phone held upright: the header keeps its name row on top (SiteHeader.svelte), so the
	   strip sticks under that row, and the view switch sits in it, beside the name. */
	@media (max-width: 700px) {
		.rooms {
			top: calc(2.75rem + 0.625rem); /* the name row and the gap under it */
		}
		.rooms .views {
			position: absolute;
			right: 0;
			bottom: calc(100% + 0.625rem + 1px);
		}
	}

	/* The 2.5D canvas: four side faces show the image edges, like a canvas 2-3 cm deep seen at
	   an angle. The walk holds the perspective, so each work shows the sides that face the
	   middle of the view, and the sides change as the visitor walks past. Off under reduced motion. */
	.edge {
		display: none;
		position: absolute;
		background-image: var(--img);
		filter: brightness(0.5);
	}
	.edge.l,
	.edge.r {
		top: 0;
		bottom: 0;
		width: 18px; /* the canvas side, at the scale of the display */
		background-size: auto 100%;
	}
	.edge.t,
	.edge.b {
		left: 0;
		right: 0;
		height: 18px;
		background-size: 100% auto;
	}
	.edge.l {
		right: 100%;
		background-position: left;
		transform-origin: right;
		transform: rotateY(-90deg);
	}
	.edge.r {
		left: 100%;
		background-position: right;
		transform-origin: left;
		transform: rotateY(90deg);
	}
	.edge.t {
		bottom: 100%;
		background-position: top;
		transform-origin: bottom;
		transform: rotateX(90deg);
	}
	.edge.b {
		top: 100%;
		background-position: bottom;
		transform-origin: top;
		transform: rotateX(-90deg);
		filter: brightness(0.3);
	}
	@media (prefers-reduced-motion: no-preference) {
		.corridor {
			perspective: 900px;
			scroll-behavior: smooth;
		}
		.corridor :global(*) {
			transform-style: preserve-3d;
		}
		.edge {
			display: block;
		}
		.canvas {
			box-shadow: 0 1.75rem 3rem -1.25rem rgb(0 0 0 / 0.8);
		}
	}
	/* The phone walk scrolls the page, and a perspective on the page would not follow the
	   screen. So each work holds its own, and a view timeline moves its origin with the middle
	   of the screen: 50vh above the work as it comes in at the bottom, 50vh below it as it
	   leaves at the top. The works then show their top and bottom edges as they pass. */
	@media ((max-width: 700px) or (max-height: 500px)) and (prefers-reduced-motion: no-preference) {
		.corridor {
			perspective: none;
		}
		@supports (animation-timeline: view()) {
			.work {
				perspective: 600px;
				animation: eye linear both;
				animation-timeline: view();
			}
		}
	}
	@keyframes eye {
		from {
			perspective-origin: 50% -50vh;
		}
		to {
			perspective-origin: 50% calc(100% + 50vh);
		}
	}

	/* A Room tap (View Transitions): the header, the strip and the bars stay, and the rest
	   slides by --vt-x / --vt-y, set from the way the walk goes. The old Room is gone before
	   the new one shows, so the two never read over each other. */
	:global(.site:has(.wall) > header) {
		view-transition-name: site;
	}
	.rooms {
		view-transition-name: rooms;
	}
	.controls {
		view-transition-name: controls;
	}
	:global(::view-transition-old(root)) {
		animation: 0.45s cubic-bezier(0.2, 0.7, 0.2, 1) both vt-out;
	}
	:global(::view-transition-new(root)) {
		animation: 0.45s cubic-bezier(0.2, 0.7, 0.2, 1) both vt-in;
	}
	@keyframes -global-vt-out {
		50%,
		to {
			opacity: 0;
		}
		to {
			transform: translate(calc(-1 * var(--vt-x, 0px)), calc(-1 * var(--vt-y, 0px)));
		}
	}
	@keyframes -global-vt-in {
		from,
		40% {
			opacity: 0;
		}
		from {
			transform: translate(var(--vt-x, 0px), var(--vt-y, 0px));
		}
	}
</style>
