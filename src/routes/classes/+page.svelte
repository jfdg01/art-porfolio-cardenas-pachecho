<!--
@component OnlineClassesPage
@description Online classes page with coming soon message and contact information
@example
  <OnlineClassesPage />
-->

<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { ArrowRight } from 'lucide-svelte';
	import ContactCard from '$lib/components/ContactCard.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { ARTIST } from '$lib';
</script>

<SEO
	title="Clases Online - Carmen Cárdenas Pacheco"
	description="Descubre las clases de arte online de Carmen Cárdenas Pacheco. Aprende técnicas artísticas desde casa."
	structuredData={{
		'@type': 'Course',
		name: 'Clases Online de Arte',
		description: 'Clases de arte online impartidas por Carmen Cárdenas Pacheco',
		provider: ARTIST,
		instructor: { ...ARTIST, jobTitle: 'Artista y Profesora de Arte' },
		courseMode: 'online',
		educationalLevel: 'beginner',
		teaches: ['Pintura', 'Técnicas Artísticas', 'Arte Contemporáneo'],
		audience: { '@type': 'Audience', audienceType: 'Estudiantes de arte' }
	}}
/>

<main class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 sm:py-12 lg:py-16">
	<!-- Page Header -->
	<div class="text-center mb-8 sm:mb-12 lg:mb-16">
		<h1
			class="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-4"
		>
			{m.onlineClassesPage()}
		</h1>
	</div>

	<!-- Main Coming Soon Content -->
	<div class="text-center mb-8 sm:mb-12 lg:mb-16">
		<!-- Icon and Title -->
		<div
			class="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-r from-blue-500 to-indigo-600 mb-6 sm:mb-8"
		>
			<span class="text-white font-bold text-3xl sm:text-4xl lg:text-5xl"> 🎨 </span>
		</div>
		<h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6 sm:mb-8">
			{m.comingSoon()}
		</h2>
		<p
			class="text-lg sm:text-xl lg:text-2xl font-medium text-muted-foreground leading-relaxed max-w-[70ch] mx-auto mb-8 sm:mb-12"
		>
			{m.onlineClassesInterest()}
		</p>

		<!-- Contact Button -->
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a
			href={localizeHref('/contact')}
			data-sveltekit-preload-data="hover"
			class="inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 text-lg sm:text-xl font-semibold min-h-[44px] min-w-[44px] bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 transform hover:-translate-y-1"
		>
			{m.contactForPreRegistration()}
			<ArrowRight class="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
		</a>
	</div>

	<!-- Contact Information Box -->
	<div class="max-w-2xl mx-auto">
		<ContactCard />
	</div>
</main>
