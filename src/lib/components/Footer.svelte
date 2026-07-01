<!--
@component Footer
@description Minimal footer: name, copyright, Instagram.
-->

<script lang="ts">
	import { t } from 'svelte-i18n';
	import { Instagram } from 'lucide-svelte';

	const currentYear = new Date().getFullYear();
</script>

<!-- Extra bottom padding on mobile clears the fixed BottomNavigation -->
<footer class="border-t border-border pb-24 min-[850px]:pb-8">
	<div
		class="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 pt-8 text-center text-sm text-muted-foreground sm:px-6 lg:px-8"
	>
		<a
			href="https://instagram.com/cardenas.pacheco"
			target="_blank"
			rel="noopener noreferrer"
			class="flex items-center gap-2 transition-colors duration-200 hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
			aria-label="Instagram"
		>
			<Instagram class="size-4" />
			@cardenas.pacheco
		</a>
		<p>
			© {currentYear} <span class="font-serif text-foreground">Carmen Cárdenas Pacheco</span>
			· {$t('copyrightNotice')}
		</p>
	</div>
</footer>
