<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.ico';
	import { setGalleryState } from '$lib/GalleryState.svelte';
	import '$lib/i18n';
	import { locale } from 'svelte-i18n';

	let { children, data } = $props();

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

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
	{@render children?.()}
</div>
