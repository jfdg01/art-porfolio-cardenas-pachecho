import { readdirSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import artworks from '../src/lib/artworks.json' with { type: 'json' };
import es from '../messages/es.json' with { type: 'json' };
import en from '../messages/en.json' with { type: 'json' };

// Each Locale with its messages and the paths of its pages (ADR 0002).
const siteByLocale = [
	{
		locale: 'es',
		messages: es,
		wall: '/',
		artwork: (id: string) => `/obra/${id}`,
		classes: '/clases',
		contact: '/contacto'
	},
	{
		locale: 'en',
		messages: en,
		wall: '/en',
		artwork: (id: string) => `/en/artwork/${id}`,
		classes: '/en/classes',
		contact: '/en/contact'
	}
] as const;
const [spanish, english] = siteByLocale;

test('the Wall lists every Artwork', async ({ page }) => {
	await page.goto('/');
	const wall = page.getByRole('main');
	for (const artwork of artworks) {
		// An Artwork hangs once in each Room its Tags name.
		await expect(wall.getByText(artwork.title, { exact: true }).first()).toBeVisible();
	}
});

// The detail images of each Artwork, from the image file names: `<id>-zoom-<n>.webp`.
const images = readdirSync('src/lib/assets/images');
const detailCount = (id: string) => images.filter((name) => name.startsWith(`${id}-zoom-`)).length;

for (const { locale, messages, artwork: path, contact } of siteByLocale) {
	for (const artwork of artworks) {
		test(`the ${locale} Artwork page of ${artwork.id} shows its images, its Label and no price`, async ({
			page
		}) => {
			await page.goto(path(artwork.id));
			await expect(page.locator('html')).toHaveAttribute('lang', locale);
			const main = page.getByRole('main');
			const label = main.locator('figcaption');
			await expect(label.getByRole('heading', { level: 1 })).toHaveText(artwork.title);
			if ('year' in artwork) await expect(label).toContainText(String(artwork.year));
			if ('dimensions' in artwork) {
				const { width, height } = artwork.dimensions as { width: number; height: number };
				await expect(label).toContainText(`${width} × ${height}`);
			}
			for (const tag of artwork.tags) {
				await expect(label).toContainText(
					messages[`tag_${tag}` as keyof typeof messages] as string
				);
			}
			if (artwork.sold) await expect(label).toContainText(messages.sold);
			else await expect(label).not.toContainText(messages.sold);
			// The main image, then one image for each detail image
			await expect(main.locator(`img[alt="${artwork.title}"]`)).toHaveCount(
				1 + detailCount(artwork.id)
			);
			// A visible line tells the Buyer that a tap or a click enlarges an image
			await expect(main.getByText(messages.enlargeHint)).toBeVisible();
			await expect(page.locator('body')).not.toContainText(/€|\beur\b|precio|price/i);
		});
	}

	test(`the ${locale} ask link leads to the contact page with the Artwork ID`, async ({ page }) => {
		const { id } = artworks[0];
		await page.goto(path(id));
		await page.getByRole('link', { name: messages.askAboutArtwork }).click();
		await expect(page).toHaveURL(`${contact}?artwork=${id}`);
	});
}

test('previous and next walk the Wall order and wrap at its ends', async ({ page }) => {
	const [first, second] = artworks;
	const last = artworks.at(-1)!;
	for (const [name, neighbour] of [
		[es.nextArtwork, second],
		[es.previousArtwork, last]
	] as const) {
		await page.goto(spanish.artwork(first.id));
		const link = page.getByRole('link', { name });
		// The link names the neighbour, so a Buyer knows where it goes
		await expect(link).toContainText(neighbour.title);
		await link.click();
		await expect(page).toHaveURL(spanish.artwork(neighbour.id));
		await expect(page.getByRole('heading', { level: 1 })).toHaveText(neighbour.title);
	}
});

// Each page as a pair of paths: the Spanish one and the English one.
const pages = [
	[spanish.wall, english.wall],
	[spanish.artwork(artworks[0].id), english.artwork(artworks[0].id)],
	[spanish.classes, english.classes],
	[spanish.contact, english.contact]
];

for (const [esPath, enPath] of pages) {
	test(`the language link on ${esPath} leads to ${enPath} and back`, async ({ page }) => {
		await page.goto(esPath);
		await page.getByRole('link', { name: es.otherLanguage }).click();
		await expect(page).toHaveURL(enPath);
		await expect(page.locator('html')).toHaveAttribute('lang', 'en');
		await expect(page.locator('body')).toContainText(en.copyrightNotice);
		await page.getByRole('link', { name: en.otherLanguage }).click();
		await expect(page).toHaveURL(esPath);
		await expect(page.locator('html')).toHaveAttribute('lang', 'es');
		await expect(page.locator('body')).toContainText(es.copyrightNotice);
	});

	test(`${esPath} and ${enPath} name each other as hreflang alternates`, async ({ page }) => {
		for (const path of [esPath, enPath]) {
			await page.goto(path);
			for (const [locale, alternate] of [
				['es', esPath],
				['en', enPath]
			]) {
				const href = await page
					.locator(`link[rel="alternate"][hreflang="${locale}"]`)
					.getAttribute('href');
				expect(href).toBe(`https://cardenaspacheco.com${alternate}`);
			}
		}
	});
	for (const path of [esPath, enPath]) {
		test(`${path} names its own URL in its metadata and structured data`, async ({ page }) => {
			await page.goto(path);
			const url = `https://cardenaspacheco.com${path}`;
			await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', url);
			await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', url);
			const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
			expect(JSON.parse(jsonLd!)).toMatchObject({ '@context': 'https://schema.org', url });
		});
	}
}

test('the sitemap lists every page in both Locales', async ({ request }) => {
	const sitemap = await (await request.get('/sitemap.xml')).text();
	const paths = [...sitemap.matchAll(/<loc>https:\/\/cardenaspacheco\.com(.*?)<\/loc>/g)];
	const expected = siteByLocale.flatMap((site) => [
		site.wall,
		site.classes,
		site.contact,
		...artworks.map(({ id }) => site.artwork(id))
	]);
	expect(paths.map(([, path]) => path).sort()).toEqual(expected.sort());
});

test('the old paths redirect for good to the Spanish paths', async ({ request }) => {
	const home = await request.get('/');
	test.skip(
		!home.headers()['x-vercel-id'],
		'the redirects live in vercel.json: only Vercel serves them'
	);
	const { id } = artworks[0];
	for (const [old, path] of [
		[`/artwork/${id}`, `/obra/${id}`],
		['/clases-online', '/clases'],
		['/contact', '/contacto']
	]) {
		const response = await request.get(old, { maxRedirects: 0 });
		expect(response.status()).toBe(301);
		expect(new URL(response.headers().location, response.url()).pathname).toBe(path);
	}
});
