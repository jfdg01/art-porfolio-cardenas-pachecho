<!--
@component ScrollToTop
@description Scroll to top button that appears after scrolling down
@example
  <ScrollToTop />
-->

<script lang="ts">
	import { ArrowUp } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let showScrollToTop = $state(false);

	// Scroll to top functionality
	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}

	// Handle scroll events to show/hide scroll to top button
	function handleScroll() {
		const scrollThreshold = window.innerHeight * 0.5;
		showScrollToTop = window.scrollY > scrollThreshold;
	}

	// Check initial scroll position on mount
	onMount(() => {
		handleScroll();
	});
</script>

<svelte:window onscroll={handleScroll} />

<!-- Scroll to Top Button -->
<button
	onclick={scrollToTop}
	aria-label="Scroll to top"
	class="fixed bottom-20 min-[850px]:bottom-4 right-4 z-50 bg-gradient-to-r from-primary to-primary hover:from-primary/90 hover:to-primary/90 text-primary-foreground rounded-full p-3 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[48px] min-w-[48px] flex items-center justify-center group {showScrollToTop
		? 'opacity-100 translate-y-0 pointer-events-auto'
		: 'opacity-0 translate-y-2 pointer-events-none'}"
>
	<ArrowUp class="size-5 group-hover:scale-110 transition-transform duration-300" />
</button>
