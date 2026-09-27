<!--
@component ContactCard
@description Reusable contact information card with hover effects
@example
  <ContactCard />
-->

<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { Mail, Phone, Instagram, MessageCircle } from 'lucide-svelte';

	export let showWhatsApp = true;
	export let showInstagram = true;
	export let showEmail = true;
	export let showPhone = true;
</script>

<div class="bg-card/80 border border-border p-6 md:p-8">
	<h2 class="text-lg md:text-xl font-semibold text-card-foreground mb-6 text-center">
		{m.contactInfo()}
	</h2>

	<div class="space-y-6">
		<!-- Email -->
		{#if showEmail}
			<div class="flex items-start gap-4 group">
				<div
					class="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
				>
					<Mail class="w-6 h-6 text-white" />
				</div>
				<div class="min-w-0 flex-1">
					<h3 class="text-sm font-medium text-muted-foreground">
						{m.emailLabel()}
					</h3>
					<a
						href="mailto:cardenaspachecocarmenalejandra@gmail.com"
						class="text-card-foreground font-medium break-all hover:text-primary transition-colors duration-200"
					>
						{m.emailAddress()}
					</a>
				</div>
			</div>
		{/if}

		<!-- Phone -->
		{#if showPhone}
			<div class="flex items-start gap-4 group">
				<div
					class="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
				>
					<Phone class="w-6 h-6 text-white" />
				</div>
				<div class="min-w-0 flex-1">
					<h3 class="text-sm font-medium text-muted-foreground">
						{m.phoneNumberLabel()}
					</h3>
					<a
						href="https://wa.me/34628672368"
						target="_blank"
						rel="noopener noreferrer"
						class="text-card-foreground font-medium break-all hover:text-green-600 transition-colors duration-200"
					>
						{m.phoneNumber()}
					</a>
				</div>
			</div>
		{/if}

		<!-- WhatsApp -->
		{#if showWhatsApp}
			<div class="flex items-start gap-4 group">
				<div
					class="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
				>
					<MessageCircle class="w-6 h-6 text-white" />
				</div>
				<div class="min-w-0 flex-1">
					<h3 class="text-sm font-medium text-muted-foreground">
						{m.whatsapp()}
					</h3>
					<a
						href="https://wa.me/34628672368"
						target="_blank"
						rel="noopener noreferrer"
						class="text-card-foreground font-medium break-all hover:text-green-600 transition-colors duration-200"
					>
						{m.phoneNumber()}
					</a>
				</div>
			</div>
		{/if}

		<!-- Instagram -->
		{#if showInstagram}
			<div class="flex items-start gap-4 group">
				<div
					class="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
				>
					<Instagram class="w-6 h-6 text-white" />
				</div>
				<div class="min-w-0 flex-1">
					<h3 class="text-sm font-medium text-muted-foreground">Instagram</h3>
					<a
						href="https://instagram.com/cardenas.pacheco"
						target="_blank"
						rel="noopener noreferrer"
						class="text-card-foreground font-medium break-all hover:text-pink-600 transition-colors duration-200"
					>
						{m.instagram()}
					</a>
				</div>
			</div>
		{/if}
	</div>
</div>
