<!--
@component ThemeToggle
@description Toggle component for switching between light and dark themes
@example
  <ThemeToggle />
-->

<script lang="ts">
	import { Moon, Sun } from 'lucide-svelte';
	import { themeStore } from '$lib/stores/theme.svelte';
	import { t } from 'svelte-i18n';

	function handleToggle() {
		themeStore.toggle();
	}
</script>

<button
	onclick={handleToggle}
	class="inline-flex items-center justify-center rounded-lg border border-border bg-card min-h-[44px] min-w-[44px] text-foreground hover:bg-muted transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
	aria-label={$t('toggleDarkTheme')}
	title={$t('toggleDarkTheme')}
>
	{#if themeStore.resolvedTheme === 'dark'}
		<Moon class="size-5" />
	{:else}
		<Sun class="size-5" />
	{/if}
</button>
