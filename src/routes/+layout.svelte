<script lang="ts">
	import '../app.css';
	import '@fontsource-variable/source-serif-4';
	import '@fontsource-variable/space-grotesk';
	// import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	// import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import Footer from '$lib/components/Footer.svelte';

	// Initialize Vercel Speed Insights and Analytics
	// injectSpeedInsights();
	// injectAnalytics();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let { children }: { children: any } = $props();
</script>

<div class="min-h-screen flex flex-col">
	<SiteHeader />
	<div class="flex-1">
		{@render children?.()}
	</div>
	<Footer />
</div>
