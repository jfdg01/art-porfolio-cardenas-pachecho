<!--
@component GalleryHeader
@description Responsive header component with navigation and language selection
@example
  <GalleryHeader />
-->

<script lang="ts">
	import { Mail, Home, GraduationCap } from 'lucide-svelte';
	import { t } from 'svelte-i18n';
	import LanguageSelector from './LanguageSelector.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import ScrollToTop from './ScrollToTop.svelte';
	import { page } from '$app/stores';
	import { isActivePath } from '$lib/utils/navigation';

	// Check if a path is active using shared utility
	function checkActivePath(path: string): boolean {
		return isActivePath($page.url.pathname, path);
	}
</script>

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
						class="px-4 py-2 text-sm font-medium montserrat-medium rounded-lg transition-all duration-200 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[44px] min-w-[44px] {checkActivePath(
							'/'
						)
							? 'text-primary bg-accent'
							: 'text-foreground hover:text-primary hover:bg-accent'}"
						aria-label="View artworks"
						aria-current={checkActivePath('/') ? 'page' : undefined}
					>
						<Home class="size-4" />
						<span>{$t('artworks')}</span>
					</a>
					<a
						href="/clases-online"
						data-sveltekit-preload-data="hover"
						class="px-4 py-2 text-sm font-medium montserrat-medium rounded-lg transition-all duration-200 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[44px] min-w-[44px] {checkActivePath(
							'/clases-online'
						)
							? 'text-primary bg-accent'
							: 'text-foreground hover:text-primary hover:bg-accent'}"
						aria-label="Online classes"
						aria-current={checkActivePath('/clases-online') ? 'page' : undefined}
					>
						<GraduationCap class="size-4" />
						<span>{$t('onlineClassesPage')}</span>
					</a>
					<a
						href="/contact"
						data-sveltekit-preload-data="hover"
						class="px-4 py-2 text-sm font-medium montserrat-medium rounded-lg transition-all duration-200 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[44px] min-w-[44px] {checkActivePath(
							'/contact'
						)
							? 'text-primary bg-accent'
							: 'text-foreground hover:text-primary hover:bg-accent'}"
						aria-label="Contact information"
						aria-current={checkActivePath('/contact') ? 'page' : undefined}
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
<ScrollToTop />
