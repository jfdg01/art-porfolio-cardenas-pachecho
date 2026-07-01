<!--
@component ContactPage
@description Contact info and a form that opens the visitor's email client (mailto).
-->

<script lang="ts">
	import type { PageData } from './$types';
	import { t } from 'svelte-i18n';
	import { Send } from 'lucide-svelte';
	import GalleryHeader from '$lib/components/GalleryHeader.svelte';
	import ContactCard from '$lib/components/ContactCard.svelte';
	import SEO from '$lib/components/SEO.svelte';

	let { data }: { data: PageData } = $props();

	let submitMessage = $state('');

	// Native `required` / `type=email` validation runs before submit fires
	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		const fields = Object.fromEntries(new FormData(form)) as Record<string, string>;

		const subject = encodeURIComponent(`Contact Form: ${fields.subject}`);
		const body = encodeURIComponent(
			`Name: ${fields.name}\nEmail: ${fields.email}\nSubject: ${fields.subject}\n\nMessage:\n${fields.message}`
		);
		window.open(
			`mailto:cardenaspachecocarmenalejandra@gmail.com?subject=${subject}&body=${body}`,
			'_blank'
		);

		form.reset();
		submitMessage = $t('emailClientOpened');
	}

	const inputClass =
		'w-full rounded-lg border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:ring-primary transition-colors duration-200';
</script>

<SEO seo={data.seo} />

<GalleryHeader />

<main class="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-16 lg:px-8">
	<div class="mb-10 md:mb-14">
		<h1 class="font-serif text-3xl font-light text-foreground sm:text-4xl lg:text-5xl">
			{$t('contactPage')}
		</h1>
		<p class="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
			{$t('contactDescription')}
		</p>
	</div>

	<div class="grid w-full grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
		<ContactCard />

		<div class="rounded-2xl border border-border bg-card p-6 md:p-8">
			<h2 class="mb-6 font-serif text-xl text-card-foreground">{$t('getInTouch')}</h2>

			<form onsubmit={handleSubmit} class="space-y-5">
				<div>
					<label for="name" class="mb-2 block text-sm font-medium text-muted-foreground">
						{$t('name')}
					</label>
					<input type="text" id="name" name="name" required class={inputClass} />
				</div>

				<div>
					<label for="email" class="mb-2 block text-sm font-medium text-muted-foreground">
						{$t('email')}
					</label>
					<input type="email" id="email" name="email" required class={inputClass} />
				</div>

				<div>
					<label for="subject" class="mb-2 block text-sm font-medium text-muted-foreground">
						{$t('subject')}
					</label>
					<input type="text" id="subject" name="subject" required class={inputClass} />
				</div>

				<div>
					<label for="message" class="mb-2 block text-sm font-medium text-muted-foreground">
						{$t('message')}
					</label>
					<textarea id="message" name="message" rows="6" required class="{inputClass} resize-y"
					></textarea>
				</div>

				<button
					type="submit"
					class="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
				>
					<Send class="size-5" />
					{$t('sendMessage')}
				</button>

				{#if submitMessage}
					<p
						class="rounded-lg border border-success/40 bg-success/10 p-4 text-sm text-foreground"
						role="status"
					>
						{submitMessage}
					</p>
				{/if}
			</form>
		</div>
	</div>
</main>
