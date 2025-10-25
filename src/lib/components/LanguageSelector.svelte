<!--
@component LanguageSelector
@description Language selection dropdown component with all supported languages using Bits UI
@example
  <LanguageSelector />
-->

<script lang="ts">
	import { Languages, Check } from 'lucide-svelte';
	import { locale, t } from 'svelte-i18n';
	import { Select } from 'bits-ui';

	// Define all supported languages with their display names and flags
	const languages = [
		{ code: 'es', name: 'Español', flag: '🇪🇸' },
		{ code: 'en', name: 'English', flag: '🇬🇧' },
		{ code: 'fr', name: 'Français', flag: '🇫🇷' },
		{ code: 'de', name: 'Deutsch', flag: '🇩🇪' },
		{ code: 'it', name: 'Italiano', flag: '🇮🇹' },
		{ code: 'ru', name: 'Русский', flag: '🇷🇺' },
		{ code: 'pt', name: 'Português', flag: '🇵🇹' },
		{ code: 'cn', name: '中文', flag: '🇨🇳' },
		{ code: 'jp', name: '日本語', flag: '🇯🇵' },
		{ code: 'kr', name: '한국어', flag: '🇰🇷' },
		{ code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
		{ code: 'he', name: 'עברית', flag: '🇮🇱' }
	] as const;

	type LanguageCode = (typeof languages)[number]['code'];

	function switchLang(code: LanguageCode) {
		locale.set(code);
		try {
			localStorage.setItem('lang', code);
		} catch (e) {
			console.error('Failed to set language in localStorage:', e);
		}
	}

	const selectOptions = languages.map((lang) => ({
		value: lang.code,
		label: lang.name,
		flag: lang.flag
	}));
</script>

<div class="relative">
	<Select.Root
		type="single"
		value={$locale || 'es'}
		onValueChange={(value: string | undefined) => {
			if (value) {
				switchLang(value as LanguageCode);
			}
		}}
		items={selectOptions}
	>
		<Select.Trigger
			class="inline-flex items-center justify-center rounded-lg border border-border bg-card hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-200 min-h-[44px] min-w-[44px] text-foreground"
			aria-label={$t('selectLanguage')}
		>
			<Languages class="size-5" />
		</Select.Trigger>

		<Select.Content
			class="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-card/95 backdrop-blur-md shadow-lg z-50 max-h-80 overflow-y-auto p-2"
		>
			<div
				class="text-xs font-semibold montserrat-semibold text-muted-foreground uppercase tracking-wide mb-2 px-2 py-1"
			>
				{$t('selectLanguage')}
			</div>

			{#each selectOptions as option (option.value)}
				<Select.Item
					value={option.value}
					class="flex items-center gap-3 px-3 py-2.5 text-sm montserrat-medium hover:bg-muted text-left rounded cursor-pointer focus:bg-muted focus:outline-none data-[highlighted]:bg-muted"
				>
					{#snippet children({ selected })}
						<span class="text-base">{option.flag}</span>
						<span class="flex-1">{option.label}</span>
						{#if selected}
							<Check class="size-4 text-primary" />
						{/if}
					{/snippet}
				</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
</div>
