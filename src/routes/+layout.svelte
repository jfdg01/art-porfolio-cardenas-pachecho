<script lang="ts">
	import '../app.css';
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

<div class="min-h-screen bg-background flex flex-col">
	<div class="flex-1">
		{@render children?.()}
	</div>
	<Footer />
	<BottomNavigation />
</div>
