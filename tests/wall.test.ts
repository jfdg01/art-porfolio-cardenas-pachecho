import { expect, test, type Page } from '@playwright/test';
import artworks from '../src/lib/artworks.json' with { type: 'json' };
import es from '../messages/es.json' with { type: 'json' };
import en from '../messages/en.json' with { type: 'json' };

// The Wall (issue #9): Rooms in a curated order, two views, a Label beside each Artwork.
const ORDER = [
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
];
type Messages = typeof es;
const text = (messages: Messages, key: string) => messages[key as keyof Messages] as string;
const roomName = (tag: string, messages: Messages = es) => text(messages, `room_${tag}`);
const inRoom = (tag: string) => artworks.filter((artwork) => artwork.tags.includes(tag));
const phone = { width: 360, height: 740 };

const walk = (page: Page) => page.getByRole('main');
const strip = (page: Page) => page.getByRole('navigation', { name: es.rooms });
/** Every copy of an Artwork on the walk: one per Room it hangs in. */
const works = (page: Page, title: string) =>
	walk(page)
		.getByRole('figure')
		.filter({ has: page.getByText(title, { exact: true }) });

test('the Rooms hang in the curated order, and each holds every Artwork with its Tag', async ({
	page
}) => {
	await page.goto('/?vista=todas');
	await expect(walk(page).getByRole('heading', { level: 2 })).toHaveText(
		ORDER.map((t) => roomName(t))
	);
	for (const tag of ORDER) {
		const room = walk(page).getByRole('region', { name: roomName(tag) });
		const titles = await room
			.getByRole('img')
			.evaluateAll((imgs) => imgs.map((img) => img.getAttribute('alt')));
		expect(titles).toEqual(inRoom(tag).map((artwork) => artwork.title));
	}
});

test('the walk passes the Room doors in the curated order', async ({ page }) => {
	await page.goto('/');
	await expect(walk(page).getByRole('heading', { level: 2 })).toHaveText(
		ORDER.map((t) => roomName(t))
	);
});

test('an Artwork with two Tags hangs in both Rooms', async ({ page }) => {
	const artwork = artworks.find((artwork) => artwork.tags.length > 1)!;
	await page.goto('/?vista=todas');
	for (const tag of artwork.tags) {
		const room = walk(page).getByRole('region', { name: roomName(tag) });
		await expect(room.getByRole('img', { name: artwork.title, exact: true })).toHaveCount(1);
	}
});

for (const [path, messages] of [
	['/', es],
	['/en', en]
] as const) {
	test(`${path}#sala-paisaje opens the Room of landscapes and marks it in the strip`, async ({
		page
	}) => {
		await page.goto(`${path}#sala-paisaje`);
		await expect(
			walk(page).getByRole('heading', { name: roomName('paisaje', messages) })
		).toBeInViewport();
		const rooms = page.getByRole('navigation', { name: messages.rooms });
		await expect(rooms.getByRole('link', { name: roomName('paisaje', messages) })).toHaveAttribute(
			'aria-current',
			'true'
		);
	});
}

test('the strip shows every Room, and a tap moves to it and names it in the URL', async ({
	page
}) => {
	await page.goto('/');
	await expect(strip(page).getByRole('link')).toHaveText(ORDER.map((t) => roomName(t)));
	await strip(page)
		.getByRole('link', { name: roomName('animal') })
		.click();
	await expect(page).toHaveURL('/#sala-animal');
	await expect(walk(page).getByRole('heading', { name: roomName('animal') })).toBeInViewport();
});

test('a change of view keeps the view in the URL and the current Room on screen', async ({
	page
}) => {
	await page.goto('/#sala-animal');
	await page.getByRole('button', { name: es.viewAll }).click();
	await expect(page).toHaveURL('/?vista=todas#sala-animal');
	const todas = walk(page).getByRole('region', { name: roomName('animal') });
	await expect(todas.getByRole('heading')).toBeInViewport();
	await page.reload();
	await expect(todas.getByRole('heading')).toBeInViewport();
	await page.getByRole('button', { name: es.viewWalk }).click();
	await expect(page).toHaveURL('/#sala-animal');
	await expect(walk(page).getByRole('heading', { name: roomName('animal') })).toBeInViewport();
});

test('a tap on a work in Todas opens it in the walk, in the same Room', async ({ page }) => {
	const [artwork] = inRoom('pintura');
	await page.goto('/?vista=todas');
	await walk(page)
		.getByRole('region', { name: roomName('pintura') })
		.getByRole('img', { name: artwork.title, exact: true })
		.click();
	await expect(page).toHaveURL('/#sala-pintura');
	// The work hangs once per Tag; the copy in the Room of paintings follows the earlier Rooms.
	const earlier = ORDER.slice(0, ORDER.indexOf('pintura')).filter((t) => artwork.tags.includes(t));
	const work = works(page, artwork.title);
	await expect(work.nth(earlier.length)).toBeInViewport();
});

test('the arrow keys and the buttons walk from one stop to the next', async ({ page }) => {
	await page.goto('/');
	const where = page.getByRole('status');
	const [first, second] = inRoom('retrato');
	await page.keyboard.press('ArrowRight');
	await expect(works(page, first.title).first()).toBeInViewport();
	await page.getByRole('button', { name: es.nextStop }).click();
	await expect(works(page, second.title).first()).toBeInViewport();
	await expect(where).toContainText(roomName('retrato'));
});

test('each Label shows the Title, year, Tags, dimensions and Sold in words', async ({ page }) => {
	for (const [path, messages] of [
		['/', es],
		['/en', en]
	] as const) {
		await page.goto(path);
		for (const artwork of artworks) {
			const label = works(page, artwork.title).first().locator('figcaption');
			await expect(label).toContainText(artwork.title);
			if ('year' in artwork) await expect(label).toContainText(String(artwork.year));
			if ('dimensions' in artwork) {
				const { width, height } = artwork.dimensions as { width: number; height: number };
				await expect(label).toContainText(`${width} × ${height}`);
			}
			for (const tag of artwork.tags)
				await expect(label).toContainText(text(messages, `tag_${tag}`));
			if (artwork.sold) await expect(label).toContainText(messages.sold);
			else await expect(label).not.toContainText(messages.sold);
		}
	}
});

test('on a phone the name, the view switch and the Room strip stay on top, and a button leads back up', async ({
	page
}) => {
	await page.setViewportSize(phone);
	await page.goto('/');
	await page.mouse.wheel(0, 3000);
	await expect(
		page.getByRole('link', { name: 'Carmen Cárdenas Pacheco' }).first()
	).toBeInViewport();
	await expect(page.getByRole('button', { name: es.viewAllShort })).toBeInViewport();
	await expect(strip(page)).toBeInViewport();
	const up = page.getByRole('button', { name: es.backToTop });
	await expect(up).toBeInViewport();
	await up.click();
	await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
});

test('on a phone the walk goes down, with the Label under each work', async ({ page }) => {
	await page.setViewportSize(phone);
	await page.goto('/');
	const work = walk(page).getByRole('figure').first();
	const canvas = await work.getByRole('link').boundingBox();
	const label = await work.locator('figcaption').boundingBox();
	expect(label!.y).toBeGreaterThanOrEqual(canvas!.y + canvas!.height);
	await expect(page.getByRole('button', { name: es.nextStop })).toBeHidden();
});

// The 2.5D edges and the motion: always on, and off under reduced motion.
for (const reducedMotion of ['no-preference', 'reduce'] as const) {
	const on = reducedMotion === 'no-preference';
	test(`with reduced motion ${reducedMotion}, the canvas edges ${on ? 'show' : 'hide'}`, async ({
		page
	}) => {
		await page.emulateMedia({ reducedMotion });
		for (const viewport of [phone, { width: 1280, height: 800 }]) {
			await page.setViewportSize(viewport);
			await page.goto('/');
			const edge = walk(page).getByRole('figure').first().locator('.edge').first();
			await expect(edge).toHaveCSS('display', on ? 'block' : 'none');
		}
	});

	test(`with reduced motion ${reducedMotion}, a Room tap and a change of view ${on ? 'animate' : 'do not animate'}`, async ({
		page
	}) => {
		await page.emulateMedia({ reducedMotion });
		await page.goto('/');
		// The animations of the page itself, not the transitions of the controls.
		const moving = () =>
			page.evaluate(
				() => document.getAnimations().filter((a) => !(a instanceof CSSTransition)).length
			);
		for (const act of [
			() =>
				strip(page)
					.getByRole('link', { name: roomName('animal') })
					.click(),
			() => page.getByRole('button', { name: es.viewAll }).click(),
			() => page.getByRole('button', { name: es.viewWalk }).click()
		]) {
			await act();
			// A View Transition starts a frame after the tap.
			if (on) await expect.poll(moving, { timeout: 1000 }).toBeGreaterThan(0);
			else {
				await page.waitForTimeout(200);
				expect(await moving()).toBe(0);
			}
			await page.waitForTimeout(1500);
		}
	});
}

for (const viewport of [phone, { width: 800, height: 400 }, { width: 1280, height: 800 }]) {
	test(`at ${viewport.width} × ${viewport.height} px the Wall shows one language link`, async ({
		page
	}) => {
		await page.setViewportSize(viewport);
		await page.goto('/');
		await expect(page.getByRole('link', { name: es.otherLanguage })).toHaveCount(1);
	});
}
