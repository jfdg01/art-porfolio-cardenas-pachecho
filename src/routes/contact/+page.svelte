<!--
@component ContactPage
@description Contact page with form and contact information
@example
  <ContactPage />
-->

<script lang="ts">
	import type { PageData } from './$types';
	import { t } from 'svelte-i18n';
	import { Send } from 'lucide-svelte';
	import { Label, Button, Progress, AlertDialog, Separator } from 'bits-ui';
	import GalleryHeader from '$lib/components/GalleryHeader.svelte';
	import ContactCard from '$lib/components/ContactCard.svelte';
	import SEO from '$lib/components/SEO.svelte';

	// Get page data from server-side load function
	let { data }: { data: PageData } = $props();

	let formData = $state({
		name: '',
		email: '',
		subject: '',
		message: ''
	});

	let isSubmitting = $state(false);
	let submitMessage = $state('');
	let formErrors = $state<Record<string, string>>({});
	let showConfirmationDialog = $state(false);
	let submissionProgress = $state(0);

	// Validation function
	function validateForm() {
		const errors: Record<string, string> = {};

		if (!formData.name.trim()) {
			errors.name = $t('nameRequired') || 'Name is required';
		}

		if (!formData.email.trim()) {
			errors.email = $t('emailRequired') || 'Email is required';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			errors.email = $t('emailInvalid') || 'Please enter a valid email address';
		}

		if (!formData.subject.trim()) {
			errors.subject = $t('subjectRequired') || 'Subject is required';
		}

		if (!formData.message.trim()) {
			errors.message = $t('messageRequired') || 'Message is required';
		}

		return errors;
	}

	function showConfirmation() {
		showConfirmationDialog = true;
	}

	function confirmSubmission() {
		showConfirmationDialog = false;
		handleFormSubmission();
	}

	function cancelSubmission() {
		showConfirmationDialog = false;
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

		// Show confirmation dialog
		showConfirmation();
	}

	async function handleFormSubmission() {
		isSubmitting = true;
		submissionProgress = 0;

		// Simulate progress
		const progressInterval = setInterval(() => {
			submissionProgress += 20;
			if (submissionProgress >= 100) {
				clearInterval(progressInterval);
			}
		}, 200);

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

			submitMessage = $t('emailClientOpened');
		} catch (error) {
			console.error('Error opening email client:', error);
			submitMessage = $t('emailClientError');
		} finally {
			isSubmitting = false;
		}
	}
</script>

<SEO seo={data.seo} />

<GalleryHeader />

<main class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 sm:py-12 lg:py-16">
	<!-- Page Header -->
	<div class="text-center mb-8 sm:mb-12 lg:mb-16">
		<h1
			class="text-2xl sm:text-3xl lg:text-4xl font-bold montserrat-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-4"
		>
			{$t('contactPage')}
		</h1>
		<p
			class="text-sm sm:text-base lg:text-lg font-medium montserrat-medium text-muted-foreground max-w-[70ch] mx-auto"
		>
			{$t('contactDescription')}
		</p>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 w-full">
		<!-- Contact Information -->
		<div class="space-y-6 lg:space-y-8">
			<ContactCard />
		</div>

		<!-- Contact Form -->
		<div
			class="bg-card/80 backdrop-blur-xl rounded-2xl shadow-lg border border-border p-6 md:p-8 w-full"
		>
			<h2 class="text-lg md:text-xl font-semibold montserrat-semibold text-card-foreground mb-6">
				{$t('getInTouch')}
			</h2>

			<form onsubmit={handleSubmit} class="space-y-6">
				<fieldset class="space-y-6">
					<legend class="sr-only">
						{$t('getInTouch')}
					</legend>

					<!-- Name Field -->
					<div>
						<Label.Root
							for="name"
							class="block text-sm font-medium text-muted-foreground montserrat-medium mb-2"
						>
							{$t('name')}
						</Label.Root>
						<input
							type="text"
							id="name"
							bind:value={formData.name}
							class="w-full bg-card border {formErrors.name
								? 'border-destructive'
								: 'border-border'} rounded-lg px-4 py-3 focus:ring-2 focus:ring-ring focus:border-ring transition-all duration-200 montserrat-medium"
							placeholder={$t('name')}
						/>
						{#if formErrors.name}
							<p class="mt-1 text-sm text-destructive montserrat-medium">{formErrors.name}</p>
						{/if}
					</div>

					<!-- Email Field -->
					<div>
						<Label.Root
							for="email"
							class="block text-sm font-medium text-muted-foreground montserrat-medium mb-2"
						>
							{$t('email')}
						</Label.Root>
						<input
							type="email"
							id="email"
							bind:value={formData.email}
							class="w-full bg-card border {formErrors.email
								? 'border-destructive'
								: 'border-border'} rounded-lg px-4 py-3 focus:ring-2 focus:ring-ring focus:border-ring transition-all duration-200 montserrat-medium"
							placeholder={$t('email')}
						/>
						{#if formErrors.email}
							<p class="mt-1 text-sm text-destructive montserrat-medium">{formErrors.email}</p>
						{/if}
					</div>

					<!-- Subject Field -->
					<div>
						<Label.Root
							for="subject"
							class="block text-sm font-medium text-muted-foreground montserrat-medium mb-2"
						>
							{$t('subject')}
						</Label.Root>
						<input
							type="text"
							id="subject"
							bind:value={formData.subject}
							class="w-full bg-card border {formErrors.subject
								? 'border-destructive'
								: 'border-border'} rounded-lg px-4 py-3 focus:ring-2 focus:ring-ring focus:border-ring transition-all duration-200 montserrat-medium"
							placeholder={$t('subject')}
						/>
						{#if formErrors.subject}
							<p class="mt-1 text-sm text-destructive montserrat-medium">{formErrors.subject}</p>
						{/if}
					</div>

					<!-- Message Field -->
					<div>
						<Label.Root
							for="message"
							class="block text-sm font-medium text-muted-foreground montserrat-medium mb-2"
						>
							{$t('message')}
						</Label.Root>
						<textarea
							id="message"
							bind:value={formData.message}
							rows="6"
							class="w-full bg-card border {formErrors.message
								? 'border-destructive'
								: 'border-border'} rounded-lg px-4 py-3 focus:ring-2 focus:ring-ring focus:border-ring transition-all duration-200 resize-vertical montserrat-medium"
							placeholder={$t('message')}
						></textarea>
						{#if formErrors.message}
							<p class="mt-1 text-sm text-destructive montserrat-medium">{formErrors.message}</p>
						{/if}
					</div>
				</fieldset>

				<!-- Separator -->
				<Separator.Root class="my-6" />

				<!-- Progress Indicator -->
				{#if isSubmitting}
					<div class="mb-4">
						<div class="flex justify-between text-sm text-muted-foreground mb-2 montserrat-medium">
							<span>{$t('sendingMessage') || 'Sending message...'}</span>
							<span>{submissionProgress}%</span>
						</div>
						<Progress.Root
							value={submissionProgress}
							max={100}
							class="w-full h-2 bg-muted rounded-full overflow-hidden relative"
							aria-labelledby="progress-label"
						>
							<div
								class="h-full bg-gradient-to-r from-primary to-primary transition-all duration-300 ease-out rounded-full"
								style={`transform: translateX(-${100 - (100 * (submissionProgress ?? 0)) / 100}%)`}
							></div>
						</Progress.Root>
					</div>
				{/if}

				<!-- Submit Button -->
				<Button.Root
					type="submit"
					disabled={isSubmitting}
					class="w-full px-6 py-3 bg-gradient-to-r from-primary to-primary hover:from-primary/90 hover:to-primary/90 text-primary-foreground font-semibold rounded-lg transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 montserrat-semibold"
				>
					{#if isSubmitting}
						<div
							class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
						></div>
						{$t('sending')}
					{:else}
						<Send class="w-5 h-5" />
						{$t('sendMessage')}
					{/if}
				</Button.Root>

				<!-- Submit Message -->
				{#if submitMessage}
					{@const isSuccess = submitMessage === $t('emailClientOpened')}
					<div
						class="p-4 rounded-lg {isSuccess
							? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 border border-green-300 shadow-sm'
							: 'bg-red-50 text-red-800 border border-red-200'}"
					>
						<div class="flex items-start gap-3">
							{#if isSuccess}
								<!-- Success Icon -->
								<div class="flex-shrink-0 w-5 h-5 mt-0.5">
									<svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
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
									<svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
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
									<h4 class="text-sm font-semibold text-green-800 mb-1 montserrat-semibold">
										{$t('success')}
									</h4>
								{/if}
								<p
									class="text-sm leading-relaxed {isSuccess
										? 'text-green-700'
										: 'text-red-700'} montserrat-medium"
								>
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

<!-- Confirmation Dialog -->
<AlertDialog.Root bind:open={showConfirmationDialog}>
	<AlertDialog.Portal>
		<AlertDialog.Overlay
			class="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
		/>
		<AlertDialog.Content
			class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-card p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg"
		>
			<div class="flex flex-col space-y-2 text-center sm:text-left">
				<AlertDialog.Title class="text-lg font-semibold text-card-foreground montserrat-semibold">
					{$t('confirmSubmission') || 'Confirm Submission'}
				</AlertDialog.Title>
				<AlertDialog.Description class="text-sm text-muted-foreground montserrat-medium">
					{$t('confirmSubmissionMessage') ||
						'Are you sure you want to send this message? Your default email client will open with the message prepared.'}
				</AlertDialog.Description>
			</div>

			<div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
				<AlertDialog.Cancel
					onclick={cancelSubmission}
					class="mt-2 inline-flex h-10 items-center justify-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-card-foreground ring-offset-background transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:mt-0 montserrat-medium"
				>
					{$t('cancel') || 'Cancel'}
				</AlertDialog.Cancel>
				<AlertDialog.Action
					onclick={confirmSubmission}
					class="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 montserrat-medium"
				>
					{$t('confirm') || 'Confirm'}
				</AlertDialog.Action>
			</div>
		</AlertDialog.Content>
	</AlertDialog.Portal>
</AlertDialog.Root>
