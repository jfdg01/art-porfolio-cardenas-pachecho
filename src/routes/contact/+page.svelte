<!--
@component ContactPage
@description Contact page with form and contact information
@example
  <ContactPage />
-->

<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { Send } from 'lucide-svelte';
	import ContactCard from '$lib/components/ContactCard.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { ARTIST } from '$lib';

	const description =
		'Contacta con Carmen Cárdenas Pacheco para consultas sobre su portfolio artístico, compras y colaboraciones.';

	let formData = $state({
		name: '',
		email: '',
		subject: '',
		message: ''
	});

	let isSubmitting = $state(false);
	let submitMessage = $state('');
	let formErrors = $state<Record<string, string>>({});

	// Validation function
	function validateForm() {
		const errors: Record<string, string> = {};

		if (!formData.name.trim()) {
			errors.name = m.nameRequired();
		}

		if (!formData.email.trim()) {
			errors.email = m.emailRequired();
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			errors.email = m.emailInvalid();
		}

		if (!formData.subject.trim()) {
			errors.subject = m.subjectRequired();
		}

		if (!formData.message.trim()) {
			errors.message = m.messageRequired();
		}

		return errors;
	}

	async function handleSubmit(event: Event) {
		event.preventDefault();
		if (isSubmitting) return;

		// Clear previous errors and messages
		formErrors = {};
		submitMessage = '';

		// Validate form
		const validationErrors = validateForm();
		if (Object.keys(validationErrors).length > 0) {
			formErrors = validationErrors;
			return;
		}

		if (confirm(m.confirmSubmissionMessage())) handleFormSubmission();
	}

	async function handleFormSubmission() {
		isSubmitting = true;
		try {
			// Create mailto link with form data
			const subject = encodeURIComponent(`Contact Form: ${formData.subject}`);
			const body = encodeURIComponent(
				`Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`
			);
			const mailtoLink = `mailto:cardenaspachecocarmenalejandra@gmail.com?subject=${subject}&body=${body}`;

			// Open default email client
			window.open(mailtoLink, '_blank');

			// Reset form
			formData = {
				name: '',
				email: '',
				subject: '',
				message: ''
			};

			submitMessage = m.emailClientOpened();
		} catch (error) {
			console.error('Error opening email client:', error);
			submitMessage = m.emailClientError();
		} finally {
			isSubmitting = false;
		}
	}
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
			email: 'cardenaspachecocarmenalejandra@gmail.com',
			jobTitle: 'Artista',
			description: 'Artista contemporánea especializada en pintura y técnicas mixtas'
		}
	}}
/>

<main class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 sm:py-12 lg:py-16">
	<!-- Page Header -->
	<div class="text-center mb-8 sm:mb-12 lg:mb-16">
		<h1
			class="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-4"
		>
			{m.contactPage()}
		</h1>
		<p
			class="text-sm sm:text-base lg:text-lg font-medium text-muted-foreground max-w-[70ch] mx-auto"
		>
			{m.contactDescription()}
		</p>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 w-full">
		<!-- Contact Information -->
		<div class="space-y-6 lg:space-y-8">
			<ContactCard />
		</div>

		<!-- Contact Form -->
		<div class="bg-card/80 border border-border p-6 md:p-8 w-full">
			<h2 class="text-lg md:text-xl font-semibold text-card-foreground mb-6">
				{m.getInTouch()}
			</h2>

			<form onsubmit={handleSubmit} class="space-y-6">
				<fieldset class="space-y-6">
					<legend class="sr-only">
						{m.getInTouch()}
					</legend>

					<!-- Name Field -->
					<div>
						<label for="name" class="block text-sm font-medium text-muted-foreground mb-2">
							{m.name()}
						</label>
						<input
							type="text"
							id="name"
							bind:value={formData.name}
							class="w-full bg-card border {formErrors.name
								? 'border-destructive'
								: 'border-border'} px-4 py-3 transition-all duration-200"
							placeholder={m.name()}
						/>
						{#if formErrors.name}
							<p class="mt-1 text-sm text-destructive">{formErrors.name}</p>
						{/if}
					</div>

					<!-- Email Field -->
					<div>
						<label for="email" class="block text-sm font-medium text-muted-foreground mb-2">
							{m.email()}
						</label>
						<input
							type="email"
							id="email"
							bind:value={formData.email}
							class="w-full bg-card border {formErrors.email
								? 'border-destructive'
								: 'border-border'} px-4 py-3 transition-all duration-200"
							placeholder={m.email()}
						/>
						{#if formErrors.email}
							<p class="mt-1 text-sm text-destructive">{formErrors.email}</p>
						{/if}
					</div>

					<!-- Subject Field -->
					<div>
						<label for="subject" class="block text-sm font-medium text-muted-foreground mb-2">
							{m.subject()}
						</label>
						<input
							type="text"
							id="subject"
							bind:value={formData.subject}
							class="w-full bg-card border {formErrors.subject
								? 'border-destructive'
								: 'border-border'} px-4 py-3 transition-all duration-200"
							placeholder={m.subject()}
						/>
						{#if formErrors.subject}
							<p class="mt-1 text-sm text-destructive">{formErrors.subject}</p>
						{/if}
					</div>

					<!-- Message Field -->
					<div>
						<label for="message" class="block text-sm font-medium text-muted-foreground mb-2">
							{m.message()}
						</label>
						<textarea
							id="message"
							bind:value={formData.message}
							rows="6"
							class="w-full bg-card border {formErrors.message
								? 'border-destructive'
								: 'border-border'} px-4 py-3 transition-all duration-200 resize-vertical"
							placeholder={m.message()}
						></textarea>
						{#if formErrors.message}
							<p class="mt-1 text-sm text-destructive">{formErrors.message}</p>
						{/if}
					</div>
				</fieldset>

				<!-- Separator -->
				<hr class="my-6 border-border" />

				<!-- Submit Button -->
				<button
					type="submit"
					disabled={isSubmitting}
					class="w-full px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
				>
					{#if isSubmitting}
						<div class="w-5 h-5 border-2 border-white border-t-transparent animate-spin"></div>
						{m.sending()}
					{:else}
						<Send class="w-5 h-5" />
						{m.sendMessage()}
					{/if}
				</button>

				<!-- Submit Message -->
				{#if submitMessage}
					{@const isSuccess = submitMessage === m.emailClientOpened()}
					<div
						class="p-4 {isSuccess
							? 'border border-foreground text-foreground'
							: 'border border-destructive text-destructive'}"
					>
						<div class="flex items-start gap-3">
							{#if isSuccess}
								<!-- Success Icon -->
								<div class="flex-shrink-0 w-5 h-5 mt-0.5">
									<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
										<path
											fill-rule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
											clip-rule="evenodd"
										/>
									</svg>
								</div>
							{:else}
								<!-- Error Icon -->
								<div class="flex-shrink-0 w-5 h-5 mt-0.5">
									<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
										<path
											fill-rule="evenodd"
											d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
											clip-rule="evenodd"
										/>
									</svg>
								</div>
							{/if}
							<div class="flex-1">
								{#if isSuccess}
									<h4 class="text-sm font-semibold mb-1">
										{m.success()}
									</h4>
								{/if}
								<p class="text-sm leading-relaxed">
									{submitMessage}
								</p>
							</div>
						</div>
					</div>
				{/if}
			</form>
		</div>
	</div>
</main>
