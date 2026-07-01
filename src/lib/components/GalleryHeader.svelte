<!--
@component GalleryHeader
@description Minimal sticky header: serif wordmark, text navigation, theme + language controls.
-->

<script lang="ts">
	import { t } from 'svelte-i18n';
	import LanguageSelector from './LanguageSelector.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import ScrollToTop from './ScrollToTop.svelte';
	import { page } from '$app/stores';
	import { isActivePath } from '$lib/utils/navigation';

	const links = [
		{ path: '/', labelKey: 'artworks' },
		{ path: '/clases-online', labelKey: 'onlineClassesPage' },
		{ path: '/contact', labelKey: 'contact' }
	];
</script>

<header class="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
	<div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
		<a
			href="/"
			data-sveltekit-preload-data="hover"
			data-sveltekit-noscroll
			class="font-serif text-xl font-medium tracking-tight text-foreground transition-colors duration-200 hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none md:text-2xl"
			aria-label="Carmen Cárdenas Pacheco — home"
		>
			Carmen Cárdenas <span class="italic text-primary">Pacheco</span>
		</a>

		<div class="flex items-center gap-2 lg:gap-6">
			<!-- Desktop nav; mobile uses BottomNavigation -->
			<nav class="hidden items-center gap-6 min-[850px]:flex" aria-label="Main navigation">
				{#each links as link (link.path)}
					{@const active = isActivePath($page.url.pathname, link.path)}
					<a
						href={link.path}
						data-sveltekit-preload-data="hover"
						data-sveltekit-noscroll
						class="text-sm tracking-wide uppercase transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none {active
							? 'font-semibold text-primary underline decoration-2 underline-offset-8'
							: 'font-medium text-muted-foreground hover:text-foreground'}"
						aria-current={active ? 'page' : undefined}
					>
						{$t(link.labelKey)}
					</a>
				{/each}
			</nav>

			<div class="flex items-center gap-2">
				<ThemeToggle />
				<LanguageSelector />
			</div>
		</div>
	</div>
</header>

<ScrollToTop />
