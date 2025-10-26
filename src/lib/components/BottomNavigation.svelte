<!--
@component BottomNavigation
@description Fixed bottom navigation bar for mobile with three main navigation items
@example
  <BottomNavigation />
-->

<script lang="ts">
	import { Palette, GraduationCap, Mail } from 'lucide-svelte';
	import { t } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { isActivePath } from '$lib/utils/navigation';

	// Check if a path is active using shared utility
	function checkActivePath(path: string): boolean {
		return isActivePath($page.url.pathname, path);
	}
</script>

<!-- Bottom Navigation Bar - Mobile Only -->
<nav
	class="min-[850px]:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-border shadow-lg"
	aria-label="Main navigation"
>
	<div class="flex items-center justify-around px-4 pb-[env(safe-area-inset-bottom,0.5rem)] py-1">
		<!-- Portfolio / Artworks -->
		<a
			href="/"
			data-sveltekit-preload-data="hover"
			class="flex flex-col items-center justify-center gap-1 px-3 py-2 transition-all duration-200 min-h-[44px] min-w-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 {checkActivePath(
				'/'
			)
				? 'text-primary'
				: 'text-muted-foreground hover:text-primary'}"
			aria-label={$t('artworks')}
			aria-current={checkActivePath('/') ? 'page' : undefined}
		>
			<Palette class="size-5" />
			<span class="text-xs font-medium montserrat-medium">{$t('artworks')}</span>
		</a>

		<!-- Online Classes -->
		<a
			href="/clases-online"
			data-sveltekit-preload-data="hover"
			class="flex flex-col items-center justify-center gap-1 px-3 py-2 transition-all duration-200 min-h-[44px] min-w-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 {checkActivePath(
				'/clases-online'
			)
				? 'text-primary'
				: 'text-muted-foreground hover:text-primary'}"
			aria-label={$t('onlineClassesPage')}
			aria-current={checkActivePath('/clases-online') ? 'page' : undefined}
		>
			<GraduationCap class="size-5" />
			<span class="text-xs font-medium montserrat-medium">{$t('onlineClassesPage')}</span>
		</a>

		<!-- Contact -->
		<a
			href="/contact"
			data-sveltekit-preload-data="hover"
			class="flex flex-col items-center justify-center gap-1 px-3 py-2 transition-all duration-200 min-h-[44px] min-w-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 {checkActivePath(
				'/contact'
			)
				? 'text-primary'
				: 'text-muted-foreground hover:text-primary'}"
			aria-label={$t('contact')}
			aria-current={checkActivePath('/contact') ? 'page' : undefined}
		>
			<Mail class="size-5" />
			<span class="text-xs font-medium montserrat-medium">{$t('contact')}</span>
		</a>
	</div>
</nav>
