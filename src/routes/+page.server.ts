import { rooms } from '$lib/artworks';

// A random Artwork stands for each Room in the Room strip, a different one per Room where the
// Room allows it. A server load runs once, when the page is prerendered, and the page hydrates
// with its data, so the browser shows the same faces the HTML has.
export const load = () => {
	const used = new Set<string>();
	return {
		faces: rooms.map(({ artworks }) => {
			const free = artworks.filter(({ id }) => !used.has(id));
			const pool = free.length ? free : artworks;
			const { id } = pool[Math.floor(Math.random() * pool.length)];
			used.add(id);
			return id;
		})
	};
};
