// Throwaway prototype helpers (issue #4). Plain ES modules, served as static files.
import { ARTWORKS, ROOMS } from './data.js';
export { ARTWORKS, ROOMS };

export const inRoom = (tag) => ARTWORKS.filter((a) => a.tags.includes(tag));
// A phone, held either way. The same query sits in common.css; keep the two equal.
export const PHONE = matchMedia('(max-width: 700px), (max-height: 500px)');
export const esc = (s) => String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);

// The museum Label. Missing facts show as a dash, so the gaps in the data stay visible.
export function label(a) {
	const d = a.dimensions;
	return `<figcaption class="label">
		<span class="title">${esc(a.title)}</span>
		<span class="facts"><span>${a.year ?? '—'}</span><span>${a.tags.join(', ')}</span><span>${d ? `${d.width} × ${d.height} ${d.unit}` : '— × — cm'}</span></span>
		${a.sold ? '<span class="sold">Vendida</span>' : ''}
	</figcaption>`;
}

// One Artwork: the canvas (image plus four edge faces for the 2.5D look) and its Label.
export function work(a) {
	const src = `/images/${a.id}.webp`;
	return `<figure class="work" style="--r:${a.w / a.h}">
		<a class="canvas" href="/artwork/${a.id}" style="--img:url(${src})">
			<img src="${src}" alt="${esc(a.title)}" width="${a.w}" height="${a.h}" loading="lazy" decoding="async">
			<i class="edge l"></i><i class="edge r"></i><i class="edge t"></i><i class="edge b"></i>
		</a>
		${label(a)}
	</figure>`;
}

// The site header: name, the one navigation list, and the prototype controls.
export function siteHeader(note) {
	const on = !matchMedia('(prefers-reduced-motion: reduce)').matches;
	document.documentElement.classList.toggle('depth', on);
	document.querySelector('#site').innerHTML = `
		<a class="name" href="/prototype/index.html">Carmen Cárdenas Pacheco</a>
		<nav aria-label="Principal"><ul>
			<li><a href="" aria-current="page">Obra</a></li>
			<li><a href="#">Clases</a></li>
			<li><a href="#">Contacto</a></li>
			<li><a href="#">Sobre mí</a></li>
		</ul></nav>
		<a class="lang" href="#" lang="en">English</a>
		<div class="proto">
			<span>${note}</span>
			<button type="button" aria-pressed="${on}">Profundidad</button>
			<a href="/prototype/index.html">Prototipos</a>
		</div>`;
	const b = document.querySelector('#site button');
	b.onclick = () => b.setAttribute('aria-pressed', document.documentElement.classList.toggle('depth'));
}

// A corridor: a row of stops (Artworks and Room doors). On a large screen it scrolls
// sideways, with visible previous/next buttons. On a phone the whole page scrolls down.
export function corridor(walk, onStop) {
	const stops = [...walk.children];
	const phone = PHONE;
	const scroller = () => (phone.matches ? document.body : walk);
	let current = -1;
	let busyUntil = 0; // a button scroll is under way; its scroll events must not reset `current`
	const center = (r) => (phone.matches ? r.top + r.height / 2 : r.left + r.width / 2);
	const find = () => {
		if (performance.now() < busyUntil) return;
		const mid = center(scroller().getBoundingClientRect());
		let best = 0;
		stops.forEach((s, i) => {
			if (Math.abs(center(s.getBoundingClientRect()) - mid) < Math.abs(center(stops[best].getBoundingClientRect()) - mid)) best = i;
		});
		if (best === current) return;
		current = best;
		stopped();
	};
	const stopped = () => {
		prev.disabled = current === 0;
		next.disabled = current === stops.length - 1;
		onStop(stops[current], current, stops);
	};
	let frame = 0;
	for (const el of [walk, document.body])
		el.addEventListener('scroll', () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(find);
		});
	// A mouse wheel scrolls down; in a sideways corridor that means "walk on".
	walk.addEventListener(
		'wheel',
		(e) => {
			if (phone.matches || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
			walk.scrollLeft += e.deltaY;
			e.preventDefault();
		},
		{ passive: false }
	);
	// Move at once, so a quick second click goes one stop further, not to the same stop.
	// ponytail: fixed 700 ms guard; use the scrollend event once Safari has it.
	const go = (i) => {
		current = Math.max(0, Math.min(stops.length - 1, i));
		busyUntil = performance.now() + 700;
		stopped();
		stops[current].scrollIntoView({ inline: 'center', block: phone.matches ? 'start' : 'center' });
	};
	const [prev, next] = [document.querySelector('#prev'), document.querySelector('#next')];
	prev.onclick = () => go(current - 1);
	next.onclick = () => go(current + 1);
	addEventListener('keydown', (e) => {
		if (walk.hidden || e.target.closest?.('select, input, textarea')) return;
		const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
		if (!step) return;
		e.preventDefault();
		go(current + step);
	});
	requestAnimationFrame(find);
	return { go, stops };
}
