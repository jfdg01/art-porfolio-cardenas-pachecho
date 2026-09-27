import { expect, test } from '@playwright/test';
import { artworkData } from '../src/lib/data/artworkData';
import es from '../src/lib/locales/es.json' with { type: 'json' };

test('the Wall lists every Artwork', async ({ page }) => {
	await page.goto('/');
	const wall = page.getByRole('main');
	for (const artwork of artworkData) {
		await expect(wall.getByText(artwork.title, { exact: true })).toBeVisible();
	}
});

for (const artwork of artworkData) {
	test(`the Artwork page of ${artwork.id} shows its Title and facts and no price`, async ({
		page
	}) => {
		await page.goto(`/artwork/${artwork.id}`);
		const main = page.getByRole('main');
		await expect(page.getByRole('heading', { level: 1 })).toHaveText(artwork.title);
		if (artwork.year) await expect(main).toContainText(String(artwork.year));
		if (artwork.dimensions) {
			const { width, height } = artwork.dimensions;
			await expect(main).toContainText(`${width} × ${height}`);
		}
		for (const tag of artwork.tags) {
			await expect(main).toContainText(es.tags[tag as keyof typeof es.tags]);
		}
		if (artwork.isAvailable) await expect(main).not.toContainText(es.sold);
		else await expect(main).toContainText(es.sold);
		await expect(page.locator('body')).not.toContainText(/€|\beur\b|precio|price/i);
	});
}
