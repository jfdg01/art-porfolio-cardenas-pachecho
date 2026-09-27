/**
 * The one owner of the Artwork model. The facts come from the hand-edited `artworks.json`,
 * in Wall order. The images come from `assets/images`, named by Artwork ID: `<id>.webp` is
 * the main image and `<id>-zoom-<n>.webp` are the detail images. A bad entry or a stray
 * image stops the build with a message that names the Artwork.
 */
import type { Picture } from '@sveltejs/enhanced-img';
import entries from './artworks.json';

/** The Tag vocabulary. Each Tag is a Room; this is also the Room order. */
export const TAGS = [
	'retrato',
	'figura',
	'paisaje',
	'arquitectura',
	'animal',
	'abstracto',
	'acuarela',
	'pintura',
	'dibujo',
	'grabado',
	'collage',
	'apunte'
] as const;
export type Tag = (typeof TAGS)[number];

export interface Artwork {
	id: string;
	title: string;
	year?: number;
	tags: Tag[];
	dimensions?: { width: number; height: number; unit: 'cm' | 'in' };
	sold: boolean;
	/** The main image first, then the detail images in order. */
	images: [Picture, ...Picture[]];
}

const files = import.meta.glob<Picture>('./assets/images/*.{avif,jpg,jpeg,png,webp}', {
	eager: true,
	import: 'default',
	query: { enhanced: true, w: '1600;800;400;200', format: 'avif;webp' }
});

function fail(id: string, problem: string): never {
	throw new Error(`src/lib/artworks.json: Artwork "${id}": ${problem}`);
}

const isNumber = (value: unknown) => typeof value === 'number' && value > 0;
const FIELDS = ['id', 'title', 'year', 'tags', 'dimensions', 'sold'];

const main = new Map<string, Picture>();
const details = new Map<string, [number, Picture][]>();
for (const [path, picture] of Object.entries(files)) {
	const name = path.split('/').pop()!;
	const [, id, n] = name.match(/^(.+?)(?:-zoom-(\d+))?\.\w+$/)!;
	if (n) details.set(id, [...(details.get(id) ?? []), [Number(n), picture]]);
	else main.set(id, picture);
}

const seen = new Set<string>();
export const artworks: Artwork[] = (entries as Record<string, unknown>[]).map((entry) => {
	const { id, title, year, tags, dimensions: d, sold } = entry;
	const name = typeof id === 'string' ? id : JSON.stringify(entry);
	if (typeof id !== 'string' || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id))
		fail(name, 'the ID must be a lowercase slug');
	if (seen.has(id)) fail(id, 'the ID appears twice');
	seen.add(id);
	const extra = Object.keys(entry).filter((key) => !FIELDS.includes(key));
	if (extra.length) fail(id, `unknown field ${extra.join(', ')}`);
	if (typeof title !== 'string' || !title.trim()) fail(id, 'the Title is missing');
	if (year !== undefined && !(Number.isInteger(year) && isNumber(year)))
		fail(id, 'the year must be a whole number');
	if (!Array.isArray(tags) || !tags.length) fail(id, 'it needs one Tag or more');
	for (const tag of tags)
		if (!(TAGS as readonly string[]).includes(tag)) fail(id, `unknown Tag "${tag}"`);
	if (
		d !== undefined &&
		!(
			typeof d === 'object' &&
			d &&
			'width' in d &&
			isNumber(d.width) &&
			'height' in d &&
			isNumber(d.height) &&
			'unit' in d &&
			(d.unit === 'cm' || d.unit === 'in')
		)
	)
		fail(id, 'the dimensions need a width, a height and a unit (cm or in)');
	if (typeof sold !== 'boolean') fail(id, 'Sold must be true or false');
	const image = main.get(id) ?? fail(id, `no main image ${id}.webp in src/lib/assets/images`);
	const zooms = (details.get(id) ?? []).sort(([a], [b]) => a - b).map(([, picture]) => picture);
	return { ...(entry as Omit<Artwork, 'images'>), images: [image, ...zooms] };
});

for (const id of new Set([...main.keys(), ...details.keys()]))
	if (!seen.has(id)) fail(id, 'it has images but no entry');

export function getArtwork(id: string): Artwork | undefined {
	return artworks.find((artwork) => artwork.id === id);
}

/** The Artworks before and after this one on the Wall. The Wall wraps at its ends. */
export function getNeighbours(id: string): { previous: Artwork; next: Artwork } {
	const i = artworks.findIndex((artwork) => artwork.id === id);
	const n = artworks.length;
	return { previous: artworks[(i - 1 + n) % n], next: artworks[(i + 1) % n] };
}
