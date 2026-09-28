import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import artworks from '../src/lib/artworks.json' with { type: 'json' };
import es from '../messages/es.json' with { type: 'json' };

// The visual foundation (issue #8): one dark wall, sharp shapes, self-hosted fonts.
const paths = ['/', `/obra/${artworks[0].id}`, '/clases', '/contacto', '/sobre-mi'];
const phone = { width: 360, height: 740 };

for (const path of paths) {
	for (const viewport of [phone, { width: 1280, height: 800 }]) {
		test(`${path} at ${viewport.width} px passes WCAG AA contrast and has no round corners`, async ({
			page
		}) => {
			await page.setViewportSize(viewport);
			await page.goto(path);
			await expect(page.getByRole('banner')).toBeInViewport();
			const { violations } = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze();
			expect(violations.flatMap((v) => v.nodes.map((n) => n.target.join(' ')))).toEqual([]);
			const round = await page
				.locator('body *')
				.evaluateAll((els) =>
					els
						.filter((el) => getComputedStyle(el).borderTopLeftRadius !== '0px')
						.map((el) => el.outerHTML.slice(0, 80))
				);
			expect(round).toEqual([]);
		});
	}
}

test('the fonts load from the site itself', async ({ page }) => {
	const fontHosts = new Set<string>();
	page.on('request', (request) => {
		if (request.resourceType() === 'font') fontHosts.add(new URL(request.url()).host);
	});
	await page.goto('/');
	const families = await page.evaluate(async () => {
		await document.fonts.ready;
		return [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family);
	});
	expect(families).toEqual(
		expect.arrayContaining(['Source Serif 4 Variable', 'Space Grotesk Variable'])
	);
	expect([...fontHosts]).toEqual([new URL(page.url()).host]);
});

test('the site has no theme toggle', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('button', { name: /tema|theme/i })).toHaveCount(0);
});

test('on a phone the site links scroll away and the name stays on top, on one line', async ({
	page
}) => {
	await page.setViewportSize(phone);
	await page.goto('/clases');
	const nav = page.getByRole('navigation', { name: es.mainNavigation });
	const name = page.getByRole('link', { name: 'Carmen Cárdenas Pacheco' }).first();
	for (const label of [es.artworks, es.about, es.onlineClassesPage, es.contact]) {
		await expect(nav.getByRole('link', { name: label })).toBeInViewport();
	}
	await page.mouse.wheel(0, 2000);
	await expect(nav).not.toBeInViewport();
	await expect(name).toBeInViewport();
	// The name and each link take one line: the header hides exactly one row of links
	for (const el of [name, ...(await nav.getByRole('link').all())]) {
		const lines = await el.evaluate((el) => {
			const range = document.createRange();
			range.selectNodeContents(el);
			return new Set([...range.getClientRects()].map((r) => Math.round(r.top))).size;
		});
		expect(lines, await el.innerText()).toBe(1);
	}
});
