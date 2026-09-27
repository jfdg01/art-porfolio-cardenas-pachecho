<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import { SITE_URL } from '$lib';
	// import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	// import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import BottomNavigation from '$lib/components/BottomNavigation.svelte';
	import Footer from '$lib/components/Footer.svelte';

	// Initialize Vercel Speed Insights and Analytics
	// injectSpeedInsights();
	// injectAnalytics();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let { children }: { children: any } = $props();
</script>

<svelte:head>
	{#each locales as locale (locale)}
		<link
			rel="alternate"
			hreflang={locale}
			href={SITE_URL + localizeHref(page.url.pathname, { locale })}
		/>
	{/each}
</svelte:head>

<div class="min-h-screen bg-background flex flex-col">
	<div class="flex-1">
		{@render children?.()}
	</div>
	<Footer />
	<BottomNavigation />
</div>
