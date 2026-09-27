import { expect, test } from '@playwright/test';
import artworks from '../src/lib/artworks.json' with { type: 'json' };
import es from '../src/lib/locales/es.json' with { type: 'json' };

test('the Wall lists every Artwork', async ({ page }) => {
	await page.goto('/');
	const wall = page.getByRole('main');
	for (const artwork of artworks) {
		await expect(wall.getByText(artwork.title, { exact: true })).toBeVisible();
	}
});

for (const artwork of artworks) {
	test(`the Artwork page of ${artwork.id} shows its Title and facts and no price`, async ({
		page
	}) => {
		await page.goto(`/artwork/${artwork.id}`);
		const main = page.getByRole('main');
		await expect(page.getByRole('heading', { level: 1 })).toHaveText(artwork.title);
		if ('year' in artwork) await expect(main).toContainText(String(artwork.year));
		if ('dimensions' in artwork) {
			const { width, height } = artwork.dimensions as { width: number; height: number };
			await expect(main).toContainText(`${width} × ${height}`);
		}
		for (const tag of artwork.tags) {
			await expect(main).toContainText(es.tags[tag as keyof typeof es.tags]);
		}
		if (artwork.sold) await expect(main).toContainText(es.sold);
		else await expect(main).not.toContainText(es.sold);
		await expect(page.locator('body')).not.toContainText(/€|\beur\b|precio|price/i);
	});
}

test('previous and next walk the Wall order and wrap at its ends', async ({ page }) => {
	const [first, second] = artworks;
	const last = artworks.at(-1)!;
	await page.goto(`/artwork/${first.id}`);
	await page.getByRole('button', { name: es.nextArtwork }).click();
	await expect(page).toHaveURL(`/artwork/${second.id}`);
	await page.goto(`/artwork/${first.id}`);
	await page.getByRole('button', { name: es.previousArtwork }).click();
	await expect(page).toHaveURL(`/artwork/${last.id}`);
});
