/**
 * The motion between the two views of the Wall (FLIP: measure, switch, animate back from the
 * old place). It is mechanical: straight lines, a firm start and stop, no overshoot. Each work
 * carries `data-room` and `data-id`. The caller skips all of it under reduced motion.
 */
const machine = 'cubic-bezier(0.7, 0, 0.2, 1)';
const inView = (r: DOMRect) =>
	r.width > 0 && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth;
const centre = (r: DOMRect) => [r.left + r.width / 2, r.top + r.height / 2];

/** Paseo to Todas: the works in view shrink into their places in the grid, and the rest of the
 * Room moves out from behind them, one after the other. */
export async function deal(walk: HTMLElement, mass: HTMLElement, show: () => Promise<void>) {
	const seen = new Map<string, DOMRect>(); // Artwork ID → where its canvas was in Paseo
	for (const work of walk.querySelectorAll<HTMLElement>('.work')) {
		const r = work.querySelector('img')!.getBoundingClientRect();
		if (inView(r)) seen.set(work.dataset.id!, r);
	}
	// The pile sits behind the work nearest the middle of the screen.
	const mid = [innerWidth / 2, innerHeight / 2];
	const distance = (r: DOMRect) => Math.hypot(centre(r)[0] - mid[0], centre(r)[1] - mid[1]);
	const nearest = [...seen.values()].sort((a, b) => distance(a) - distance(b))[0];
	const pile = nearest ? centre(nearest) : mid;
	await show();
	let n = 0;
	for (const img of mass.querySelectorAll('img')) {
		const to = img.getBoundingClientRect();
		if (!inView(to)) continue;
		img.loading = 'eager';
		const link = img.closest('a')!;
		const from = seen.get(link.dataset.id!);
		seen.delete(link.dataset.id!); // a work in two Rooms flies to one place only
		const [x, y] = centre(to);
		const delay = from ? 0 : Math.min(150 + n++ * 30, 750);
		const start = from
			? `translate(${centre(from)[0] - x}px, ${centre(from)[1] - y}px) scale(${from.width / to.width})`
			: `translate(${pile[0] - x}px, ${pile[1] - y}px) scale(0.8)`;
		// The works from Paseo fly above the pile, but under the sticky header and strip.
		if (from) img.style.cssText = 'position: relative; z-index: 1';
		img
			.animate(
				[
					{ transform: start, opacity: from ? 1 : 0 },
					{ transform: 'none', opacity: 1 }
				],
				{
					duration: from ? 650 : 700,
					delay,
					easing: machine,
					fill: 'backwards'
				}
			)
			.finished.then(() => img.removeAttribute('style'));
		link.querySelector('.label')?.animate([{ opacity: 0 }, { opacity: 1 }], {
			duration: 300,
			delay: delay + 500,
			fill: 'backwards'
		});
	}
	for (const h of mass.querySelectorAll('h2'))
		if (inView(h.getBoundingClientRect()))
			h.animate(
				[
					{ opacity: 0, transform: 'translateY(0.5rem)' },
					{ opacity: 1, transform: 'none' }
				],
				{ duration: 400, delay: 250, easing: 'ease-out', fill: 'backwards' }
			);
}

/** Todas to Paseo, the same machine in reverse: each work in view grows out of its thumbnail
 * (same Room, same Artwork) when that thumbnail was in view. The other stops fade in. */
export async function gather(walk: HTMLElement, mass: HTMLElement, show: () => Promise<void>) {
	const seen = new Map<string, DOMRect>(); // "room/id" → where the thumbnail was in Todas
	for (const link of mass.querySelectorAll<HTMLElement>('a[data-id]')) {
		const r = link.querySelector('img')!.getBoundingClientRect();
		if (inView(r)) seen.set(`${link.dataset.room}/${link.dataset.id}`, r);
	}
	await show();
	for (const stop of walk.children as HTMLCollectionOf<HTMLElement>) {
		if (!inView(stop.getBoundingClientRect())) continue; // a Label can show without its canvas
		const el = stop.querySelector<HTMLElement>('.canvas') ?? stop; // a door moves whole
		const img = el.querySelector('img');
		if (img) img.loading = 'eager';
		const from = seen.get(`${stop.dataset.room}/${stop.dataset.id}`);
		if (from) {
			const to = el.getBoundingClientRect();
			const [x, y] = centre(to);
			el.style.zIndex = '1'; // above its neighbours, under the sticky header and strip
			el.animate(
				[
					{
						transform: `translate(${centre(from)[0] - x}px, ${centre(from)[1] - y}px) scale(${from.width / to.width})`
					},
					{ transform: 'none' }
				],
				{ duration: 650, easing: machine, fill: 'backwards' }
			).finished.then(() => el.style.removeProperty('z-index'));
		} else
			el.animate(
				[
					{ opacity: 0, transform: 'scale(0.96)' },
					{ opacity: 1, transform: 'none' }
				],
				{ duration: 500, delay: 250, easing: machine, fill: 'backwards' }
			);
		stop.querySelector('.label')?.animate([{ opacity: 0 }, { opacity: 1 }], {
			duration: 300,
			delay: 550,
			fill: 'backwards'
		});
	}
}
