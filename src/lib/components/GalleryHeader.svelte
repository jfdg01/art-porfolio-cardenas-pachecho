<!--
@component GalleryHeader
@description Responsive header component with navigation and language selection
@example
  <GalleryHeader />
-->

<script lang="ts">
	import { Mail, Home, ArrowUp, GraduationCap } from 'lucide-svelte';
	import { t } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import LanguageSelector from './LanguageSelector.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import { page } from '$app/stores';

	let showScrollToTop = $state(false);

	// Check if a path is active
	function isActivePath(path: string): boolean {
		if (path === '/') {
			// For home, only match exact path or artwork detail pages
			return $page.url.pathname === '/' || $page.url.pathname.startsWith('/artwork/');
		}
		return $page.url.pathname === path;
	}

	// Scroll to top functionality
	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}

	// Handle scroll events to show/hide scroll to top button (30% of viewport height)
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

<header
	class="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
>
	<div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
		<!-- Main Header Content - Mobile First -->
		<div class="flex items-center justify-between gap-3 py-3 md:gap-4 md:py-4 lg:gap-6 lg:py-6">
			<!-- Logo/Title - Mobile First -->
			<div class="shrink-0">
				<a
					href="/"
					data-sveltekit-preload-data="hover"
					class="text-lg xs:text-xl md:text-2xl lg:text-3xl font-semibold montserrat-semibold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent hover:from-primary hover:to-primary transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg px-2 py-1 -mx-2 -my-1 inline-block"
					aria-label="Go to home page"
				>
					Carmen Cárdenas Pacheco
				</a>
			</div>

			<!-- Desktop Navigation and Controls -->
			<div class="hidden min-[850px]:flex items-center gap-3 lg:gap-4">
				<!-- Navigation Buttons - Desktop -->
				<div class="flex items-center gap-1 lg:gap-2">
					<a
						href="/"
						data-sveltekit-preload-data="hover"
						class="px-4 py-2 text-sm font-medium montserrat-medium rounded-lg transition-all duration-200 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[44px] min-w-[44px] {isActivePath(
							'/'
						)
							? 'text-primary bg-accent'
							: 'text-foreground hover:text-primary hover:bg-accent'}"
						aria-label="View artworks"
						aria-current={isActivePath('/') ? 'page' : undefined}
					>
						<Home class="size-4" />
						<span>{$t('artworks')}</span>
					</a>
					<a
						href="/clases-online"
						data-sveltekit-preload-data="hover"
						class="px-4 py-2 text-sm font-medium montserrat-medium rounded-lg transition-all duration-200 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[44px] min-w-[44px] {isActivePath(
							'/clases-online'
						)
							? 'text-primary bg-accent'
							: 'text-foreground hover:text-primary hover:bg-accent'}"
						aria-label="Online classes"
						aria-current={isActivePath('/clases-online') ? 'page' : undefined}
					>
						<GraduationCap class="size-4" />
						<span>{$t('onlineClassesPage')}</span>
					</a>
					<a
						href="/contact"
						data-sveltekit-preload-data="hover"
						class="px-4 py-2 text-sm font-medium montserrat-medium rounded-lg transition-all duration-200 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[44px] min-w-[44px] {isActivePath(
							'/contact'
						)
							? 'text-primary bg-accent'
							: 'text-foreground hover:text-primary hover:bg-accent'}"
						aria-label="Contact information"
						aria-current={isActivePath('/contact') ? 'page' : undefined}
					>
						<Mail class="size-4" />
						<span>{$t('contact')}</span>
					</a>
				</div>

				<!-- Theme Toggle - Desktop -->
				<ThemeToggle />

				<!-- Language Selector - Desktop -->
				<LanguageSelector />
			</div>

			<!-- Mobile Controls -->
			<div class="flex min-[850px]:hidden items-center gap-2">
				<!-- Dark Theme Toggle - Mobile -->
				<ThemeToggle />

				<!-- Language Selector - Mobile -->
				<LanguageSelector />
			</div>
		</div>
	</div>
</header>

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
