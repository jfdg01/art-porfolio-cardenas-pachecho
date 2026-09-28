import { createServer } from 'node:http';
import { expect, test, type Page } from '@playwright/test';
import es from '../messages/es.json' with { type: 'json' };

// The preview server sends each Enquiry to this stub, not to Resend (playwright.config.ts).
// A deployed site would send real email, so these tests run only against the preview server.
test.skip(!!process.env.BASE_URL, 'a deployed site sends real email');

type Email = { from: string; to: string[]; reply_to: string; subject: string; text: string };
const outbox: Email[] = [];
let resendStatus = 200;
const resend = createServer((request, response) => {
	let body = '';
	request.on('data', (chunk) => (body += chunk));
	request.on('end', () => {
		if (request.url === '/emails' && request.headers.authorization === 'Bearer test')
			outbox.push(JSON.parse(body));
		response.writeHead(resendStatus, { 'content-type': 'application/json' }).end('{}');
	});
});
test.beforeAll(() => new Promise<void>((resolve) => resend.listen(4174, resolve)));
test.afterAll(() => new Promise((resolve) => resend.close(resolve)));
test.beforeEach(() => {
	outbox.length = 0;
	resendStatus = 200;
});

const ana = {
	name: 'Ana Pérez',
	email: 'ana@example.com',
	subject: 'Retrato de mi madre',
	message: 'Hola Carmen, ¿haces encargos?'
};

async function fill(page: Page, values: Partial<typeof ana>) {
	for (const [field, value] of Object.entries(values))
		await page.getByLabel(es[field as keyof typeof ana], { exact: false }).fill(value);
}

test.describe('without JavaScript', () => {
	test.use({ javaScriptEnabled: false });

	test('the form names each problem in plain words and keeps the typed text', async ({ page }) => {
		await page.goto('/contacto');
		await fill(page, { name: ana.name, email: 'ana@' });
		await page.getByRole('button', { name: es.sendMessage }).click();
		await expect(page.getByText(es.emailInvalid)).toBeVisible();
		await expect(page.getByText(es.messageRequired)).toBeVisible();
		await expect(page.getByLabel(es.name)).toHaveValue(ana.name);
		await expect(page.getByLabel(es.email)).toHaveValue('ana@');
		expect(outbox).toEqual([]);
	});

	test('the form sends a valid Enquiry', async ({ page }) => {
		await page.goto('/contacto');
		await fill(page, ana);
		await page.getByRole('button', { name: es.sendMessage }).click();
		await expect(page.getByText(es.enquirySent)).toBeVisible();
		expect(outbox).toHaveLength(1);
	});
});

test('the form sends the Enquiry to the Artist, with the sender as reply-to', async ({ page }) => {
	await page.goto('/contacto');
	await fill(page, ana);
	await page.getByRole('button', { name: es.sendMessage }).click();
	await expect(page.getByText(es.enquirySent)).toBeVisible();
	expect(outbox).toEqual([
		expect.objectContaining({
			to: ['cardenaspachecocarmenalejandra@gmail.com'],
			reply_to: ana.email,
			subject: expect.stringContaining(ana.subject),
			text: expect.stringContaining(ana.message)
		})
	]);
	expect(outbox[0].text).toContain(ana.name);
	// The typed text goes, so a second tap does not send the Enquiry again
	await expect(page.getByLabel(es.message)).toHaveValue('');
});

test('a failed send says so, offers the other Contact Channels and keeps the typed text', async ({
	page
}) => {
	resendStatus = 500;
	await page.goto('/contacto');
	await fill(page, ana);
	await page.getByRole('button', { name: es.sendMessage }).click();
	await expect(page.getByText(es.enquiryFailed)).toBeVisible();
	await expect(page.getByLabel(es.message)).toHaveValue(ana.message);
});

test('a filled honeypot field sends nothing', async ({ page }) => {
	await page.goto('/contacto');
	await fill(page, ana);
	await page.locator('input[name="website"]').evaluate((input: HTMLInputElement) => {
		input.value = 'https://spam.example';
	});
	await page.getByRole('button', { name: es.sendMessage }).click();
	await expect(page.getByText(es.enquirySent)).toBeVisible();
	expect(outbox).toEqual([]);
});

test('the page offers email, WhatsApp and Instagram', async ({ page }) => {
	await page.goto('/contacto');
	const main = page.getByRole('main');
	await expect(
		main.locator('a[href="mailto:cardenaspachecocarmenalejandra@gmail.com"]')
	).toBeVisible();
	await expect(main.locator('a[href="https://wa.me/34628672368"]')).toBeVisible();
	await expect(main.locator('a[href="https://instagram.com/cardenas.pacheco"]')).toBeVisible();
});
