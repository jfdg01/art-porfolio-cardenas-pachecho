<!--
@component LanguageSelector
@description Toggles between Spanish and English.
-->

<script lang="ts">
	import { locale, t } from 'svelte-i18n';

	function toggleLang() {
		const next = $locale === 'es' ? 'en' : 'es';
		locale.set(next);
		try {
			localStorage.setItem('lang', next);
		} catch {
			// localStorage unavailable (private mode) — language still switches for this visit
		}
	}
</script>

<button
	onclick={toggleLang}
	class="inline-flex items-center justify-center rounded-full border border-border bg-transparent px-3 text-sm font-medium tracking-wide text-muted-foreground uppercase transition-colors duration-200 hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none min-h-[40px] min-w-[48px]"
	aria-label={$t('selectLanguage')}
	title={$t('selectLanguage')}
>
	{$locale === 'es' ? 'EN' : 'ES'}
</button>
