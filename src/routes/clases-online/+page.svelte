<!--
@component OnlineClassesPage
@description Online classes page with coming soon message and contact information
-->

<script lang="ts">
	import type { PageData } from './$types';
	import { t } from 'svelte-i18n';
	import { ArrowRight, GraduationCap } from 'lucide-svelte';
	import GalleryHeader from '$lib/components/GalleryHeader.svelte';
	import ContactCard from '$lib/components/ContactCard.svelte';
	import SEO from '$lib/components/SEO.svelte';

	let { data }: { data: PageData } = $props();
</script>

<SEO seo={data.seo} />

<GalleryHeader />

<main class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
	<div class="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
		<div
			class="mb-8 inline-flex size-16 items-center justify-center rounded-full border border-primary/30 bg-primary/5 text-primary"
		>
			<GraduationCap class="size-8" aria-hidden="true" />
		</div>

		<h1 class="mb-4 font-serif text-4xl leading-tight font-light text-foreground sm:text-5xl">
			{$t('onlineClassesPage')}
		</h1>
		<p class="mb-2 text-sm font-medium tracking-widest text-primary uppercase">
			{$t('comingSoon')}
		</p>
		<p class="mx-auto mb-10 max-w-prose leading-relaxed text-muted-foreground sm:text-lg">
			{$t('onlineClassesInterest')}
		</p>

		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a
			href="/contact"
			data-sveltekit-preload-data="hover"
			class="group inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-primary px-7 py-3 font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
		>
			{$t('contactForPreRegistration')}
			<ArrowRight class="size-5 transition-transform duration-200 group-hover:translate-x-1" />
		</a>
	</div>

	<div class="mx-auto max-w-2xl">
		<ContactCard />
	</div>
</main>
