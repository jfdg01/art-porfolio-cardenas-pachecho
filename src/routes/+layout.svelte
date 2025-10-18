<script lang="ts">
	import type { LayoutData } from './$types';
	import '../app.css';
	import { setGalleryState } from '$lib/GalleryState.svelte';
	import '$lib/i18n';
	import { locale } from 'svelte-i18n';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';

	// Initialize Vercel Speed Insights and Analytics
	injectSpeedInsights();
	injectAnalytics();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let { children, data }: { children: any; data: LayoutData } = $props();

	// Set up global gallery state (artworks are already loaded from static data)
	setGalleryState();

	// Set locale from load function data
	locale.set(data.locale);

	// Handle language changes in browser
	$effect.pre(() => {
		if (typeof window !== 'undefined') {
			try {
				// Save current locale to localStorage
				localStorage.setItem('lang', data.locale);
			} catch {
				// no-op in case of errors
			}
		}
	});
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
	{@render children?.()}
</div>
