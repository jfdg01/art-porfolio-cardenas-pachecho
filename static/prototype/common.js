// Throwaway prototype helpers (issue #4). Plain ES modules, served as static files.
import { ARTWORKS, ROOMS } from './data.js';
export { ARTWORKS, ROOMS };

// Made-up facts: the data has no sizes and one year. Each gap gets a value seeded by the id,
// so it stays the same on every load. ponytail: delete this loop once the real facts exist.
const seed = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
for (const a of ARTWORKS) {
	const h = seed(a.id);
	a.year ??= 1998 + (h % 27);
	if (a.dimensions) continue;
	const long = 30 + ((h >>> 5) % 91); // 30 to 120 cm on the long side, in the image's ratio
	const r = a.w / a.h;
	const [width, height] = r >= 1 ? [long, long / r] : [long * r, long];
	a.dimensions = { width: Math.round(width), height: Math.round(height), unit: 'cm' };
}

export const inRoom = (tag) => ARTWORKS.filter((a) => a.tags.includes(tag));
// A phone, held either way. The same query sits in common.css; keep the two equal.
export const PHONE = matchMedia('(max-width: 700px), (max-height: 500px)');
export const esc = (s) => String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);

// The museum Label.
export function label(a) {
	const d = a.dimensions;
	return `<figcaption class="label">
		<span class="title">${esc(a.title)}</span>
		<span class="facts"><span>${a.year}</span><span>${a.tags.join(', ')}</span><span>${d.width} × ${d.height} ${d.unit}</span></span>
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
// The 2.5D depth is always on, except under reduced motion (decided on #4: no toggle).
export function siteHeader(note) {
	document.documentElement.classList.toggle('depth', !matchMedia('(prefers-reduced-motion: reduce)').matches);
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
			<a href="/prototype/index.html">Prototipos</a>
		</div>`;
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
		if (walk.hidden || performance.now() < busyUntil) return;
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
