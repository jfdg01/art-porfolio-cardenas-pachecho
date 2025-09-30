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

	async function handleSubmit(event: Event) {
		event.preventDefault();
		if (isSubmitting) return;

		isSubmitting = true;
		submitMessage = '';

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

<div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-x-hidden">
	<GalleryHeader />

	<main class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 sm:py-12 lg:py-16">
		<!-- Page Header -->
		<div class="text-center mb-8 sm:mb-12 lg:mb-16">
			<h1
				class="text-2xl sm:text-3xl lg:text-4xl font-bold montserrat-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4"
			>
				{$t('contactPage')}
			</h1>
			<p class="text-sm sm:text-base lg:text-lg font-medium text-gray-600 max-w-[70ch] mx-auto">
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
				class="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 p-6 sm:p-8 w-full"
			>
				<h2 class="text-xl font-semibold montserrat-semibold text-gray-900 mb-6">
					{$t('getInTouch')}
				</h2>

				<form onsubmit={handleSubmit} class="space-y-6">
					<!-- Name Field -->
					<div>
						<label
							for="name"
							class="block text-sm font-medium text-gray-700 montserrat-medium mb-2"
						>
							{$t('name')} *
						</label>
						<input
							type="text"
							id="name"
							bind:value={formData.name}
							required
							class="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 montserrat-medium"
							placeholder={$t('name')}
						/>
					</div>

					<!-- Email Field -->
					<div>
						<label
							for="email"
							class="block text-sm font-medium text-gray-700 montserrat-medium mb-2"
						>
							{$t('email')} *
						</label>
						<input
							type="email"
							id="email"
							bind:value={formData.email}
							required
							class="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 montserrat-medium"
							placeholder={$t('email')}
						/>
					</div>

					<!-- Subject Field -->
					<div>
						<label
							for="subject"
							class="block text-sm font-medium text-gray-700 montserrat-medium mb-2"
						>
							{$t('subject')} *
						</label>
						<input
							type="text"
							id="subject"
							bind:value={formData.subject}
							required
							class="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 montserrat-medium"
							placeholder={$t('subject')}
						/>
					</div>

					<!-- Message Field -->
					<div>
						<label
							for="message"
							class="block text-sm font-medium text-gray-700 montserrat-medium mb-2"
						>
							{$t('message')} *
						</label>
						<textarea
							id="message"
							bind:value={formData.message}
							required
							rows="6"
							class="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-vertical montserrat-medium"
							placeholder={$t('message')}
						></textarea>
					</div>

					<!-- Submit Button -->
					<button
						type="submit"
						disabled={isSubmitting}
						class="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 montserrat-semibold"
					>
						{#if isSubmitting}
							<div
								class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
							></div>
							Sending...
						{:else}
							<Send class="w-5 h-5" />
							{$t('sendMessage')}
						{/if}
					</button>

					<!-- Submit Message -->
					{#if submitMessage}
						<div
							class="p-4 rounded-lg {submitMessage.includes('successfully')
								? 'bg-green-50 text-green-800 border border-green-200'
								: 'bg-red-50 text-red-800 border border-red-200'}"
						>
							{submitMessage}
						</div>
					{/if}
				</form>
			</div>
		</div>
	</main>
</div>
