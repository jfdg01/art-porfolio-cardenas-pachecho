<!--
@component GalleryHeader
@description Responsive header component with navigation and language selection
@example
  <GalleryHeader />
-->

<script lang="ts">
	import { Mail, Home, ArrowUp, GraduationCap, Moon } from 'lucide-svelte';
	import { t } from 'svelte-i18n';
	import LanguageSelector from './LanguageSelector.svelte';
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

	// Handle scroll events to show/hide scroll to top button
	function handleScroll() {
		showScrollToTop = window.scrollY > 700;
	}
</script>

<svelte:window onscroll={handleScroll} />

<header
	class="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm"
>
	<div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
		<!-- Main Header Content - Mobile First -->
		<div class="flex items-center justify-between gap-3 py-3 md:gap-4 md:py-4 lg:gap-6 lg:py-6">
			<!-- Logo/Title - Mobile First -->
			<div class="shrink-0">
				<a
					href="/"
					data-sveltekit-preload-data="hover"
					class="text-lg xs:text-xl md:text-2xl lg:text-3xl font-semibold montserrat-semibold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg px-2 py-1 -mx-2 -my-1 inline-block"
					aria-label="Go to home page"
				>
					Carmen Cárdenas Pacheco
				</a>
			</div>

			<!-- Desktop Navigation and Controls -->
			<div class="hidden md:flex items-center gap-3 lg:gap-4">
				<!-- Navigation Buttons - Desktop -->
				<div class="flex items-center gap-1 lg:gap-2">
					<a
						href="/"
						data-sveltekit-preload-data="hover"
						class="px-4 py-2 text-sm font-medium montserrat-medium rounded-lg transition-all duration-200 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 min-h-[44px] min-w-[44px] {isActivePath(
							'/'
						)
							? 'text-blue-600 bg-blue-50'
							: 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}"
						aria-label="View artworks"
						aria-current={isActivePath('/') ? 'page' : undefined}
					>
						<Home class="size-4" />
						<span class="hidden lg:inline">{$t('artworks')}</span>
					</a>
					<a
						href="/clases-online"
						data-sveltekit-preload-data="hover"
						class="px-4 py-2 text-sm font-medium montserrat-medium rounded-lg transition-all duration-200 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 min-h-[44px] min-w-[44px] {isActivePath(
							'/clases-online'
						)
							? 'text-blue-600 bg-blue-50'
							: 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}"
						aria-label="Online classes"
						aria-current={isActivePath('/clases-online') ? 'page' : undefined}
					>
						<GraduationCap class="size-4" />
						<span class="hidden lg:inline">{$t('onlineClassesPage')}</span>
					</a>
					<a
						href="/contact"
						data-sveltekit-preload-data="hover"
						class="px-4 py-2 text-sm font-medium montserrat-medium rounded-lg transition-all duration-200 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 min-h-[44px] min-w-[44px] {isActivePath(
							'/contact'
						)
							? 'text-blue-600 bg-blue-50'
							: 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}"
						aria-label="Contact information"
						aria-current={isActivePath('/contact') ? 'page' : undefined}
					>
						<Mail class="size-4" />
						<span class="hidden lg:inline">{$t('contact')}</span>
					</a>
				</div>

				<!-- Language Selector - Desktop -->
				<LanguageSelector />
			</div>

			<!-- Mobile Controls -->
			<div class="flex md:hidden items-center gap-2">
				<!-- Dark Theme Toggle - Mobile (Placeholder) -->
				<button
					disabled
					class="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white/80 min-h-[44px] min-w-[44px] text-gray-700 opacity-50 cursor-not-allowed"
					aria-label={$t('toggleDarkTheme')}
					title={$t('comingSoon')}
				>
					<Moon class="size-5" />
				</button>

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
	class="fixed bottom-20 md:bottom-4 right-4 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full p-3 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 min-h-[48px] min-w-[48px] flex items-center justify-center group {showScrollToTop
		? 'opacity-100 translate-y-0'
		: 'opacity-0 translate-y-2 pointer-events-none'}"
>
	<ArrowUp class="size-5 group-hover:scale-110 transition-transform duration-300" />
</button>
