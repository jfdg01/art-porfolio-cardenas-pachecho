<!--
@component ContactPage
@description The contact page: every Contact Channel. The form works without JavaScript;
the server checks it, sends the Enquiry, and keeps the typed text on a problem.
-->

<script lang="ts">
	import { enhance } from '$app/forms';
	import { m } from '$lib/paraglide/messages';
	import ContactCard from '$lib/components/ContactCard.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { ARTIST, CHANNELS } from '$lib';

	let { data, form } = $props();
	let sending = $state(false);

	const description =
		'Contacta con Carmen Cárdenas Pacheco para consultas sobre su portfolio artístico, compras y colaboraciones.';

	const fields = [
		{ name: 'name', label: m.name, type: 'text', autocomplete: 'name', required: true },
		{ name: 'email', label: m.email, type: 'email', autocomplete: 'email', required: true },
		{ name: 'subject', label: m.subject, type: 'text', autocomplete: 'off', required: false },
		{ name: 'message', label: m.message, type: 'textarea', autocomplete: 'off', required: true }
	] as const;
</script>

<SEO
	title="Contacto - Carmen Cárdenas Pacheco"
	{description}
	structuredData={{
		'@type': 'ContactPage',
		name: 'Contacto - Carmen Cárdenas Pacheco',
		description,
		mainEntity: {
			...ARTIST,
			email: CHANNELS.email,
			jobTitle: 'Artista',
			description: 'Artista contemporánea especializada en pintura y técnicas mixtas'
		}
	}}
/>

<main class="page">
	<h1>{m.contact()}</h1>
	<p class="intro">{m.contactIntro()}</p>

	<div class="columns">
		<form
			method="POST"
			novalidate
			use:enhance={() => {
				sending = true;
				return async ({ update }) => {
					await update();
					sending = false;
				};
			}}
		>
			{#if form?.sent}
				<p class="note" role="status">{m.enquirySent()}</p>
			{:else if form?.failed}
				<p class="note error" role="alert">{m.enquiryFailed()}</p>
			{/if}

			{#each fields as { name, label, type, autocomplete, required } (name)}
				{@const error = form?.errors?.[name]}
				{@const value = form?.values?.[name] ?? (name === 'subject' ? data.subject : '')}
				<div class="field">
					<label for={name}>
						{label()}
						{#if !required}<span class="optional">{m.optional()}</span>{/if}
					</label>
					{#if type === 'textarea'}
						<textarea
							id={name}
							{name}
							{required}
							rows="8"
							{value}
							aria-invalid={!!error}
							aria-describedby={error && `${name}-error`}
						></textarea>
					{:else}
						<input
							id={name}
							{name}
							{type}
							{required}
							{autocomplete}
							{value}
							aria-invalid={!!error}
							aria-describedby={error && `${name}-error`}
						/>
					{/if}
					{#if error}<p id="{name}-error" class="error">{error}</p>{/if}
				</div>
			{/each}

			<!-- The honeypot: off the screen and out of the tab order, so only a bot fills it -->
			<div class="honeypot" aria-hidden="true">
				<label for="website">{m.honeypot()}</label>
				<input id="website" name="website" tabindex="-1" autocomplete="off" />
			</div>

			<button type="submit" disabled={sending}>{sending ? m.sending() : m.sendMessage()}</button>
		</form>

		<ContactCard />
	</div>
</main>

<style>
	.page {
		max-width: 64rem;
		margin: 0 auto;
		padding: 1rem clamp(1rem, 4vw, 3rem) 4rem;
		font-family: var(--font-sans);
	}
	h1 {
		margin: 0;
		font: 400 2.25rem/1.2 var(--font-serif);
	}
	.intro {
		max-width: 60ch;
		margin: 0.75rem 0 2rem;
		font-size: 1.125rem;
		line-height: 1.5;
		color: var(--color-muted-foreground);
	}
	.columns {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 22rem;
		gap: clamp(2rem, 5vw, 4rem);
		align-items: start;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}
	.field {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}
	label {
		font-size: 1.0625rem;
		font-weight: 600;
	}
	.optional {
		font-weight: 400;
		color: var(--color-muted-foreground);
	}
	input,
	textarea {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid var(--color-muted-foreground);
		background: var(--color-muted);
		color: var(--color-foreground);
		font: inherit;
		font-size: 1.125rem;
	}
	textarea {
		resize: vertical;
	}
	[aria-invalid='true'] {
		border: 2px solid var(--color-destructive);
	}
	.error {
		margin: 0;
		color: var(--color-destructive);
	}
	.note {
		margin: 0;
		padding: 1rem;
		border: 2px solid var(--color-foreground);
		font-size: 1.125rem;
		line-height: 1.45;
	}
	.note.error {
		border-color: var(--color-destructive);
	}
	.honeypot {
		position: absolute;
		left: -10000px;
	}
	button {
		align-self: start;
		min-height: 48px;
		padding: 0 2rem;
		border: 0;
		background: var(--color-primary);
		color: var(--color-primary-foreground);
		font: inherit;
		font-size: 1.125rem;
		font-weight: 600;
		cursor: pointer;
	}
	button:hover {
		text-decoration: underline;
	}
	button:disabled {
		cursor: wait;
	}
	@media (max-width: 900px) {
		.columns {
			grid-template-columns: 1fr;
		}
	}
</style>
