<!--
@component LanguageLink
@description Plain-text link to the same page in the other Locale
-->

<script lang="ts">
	import { page } from '$app/state';
	import { getLocale, localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages';

	const otherLocale = getLocale() === 'es' ? 'en' : 'es';
</script>

<!-- A full reload renders the other Locale on the server (see hooks.server.ts). -->
<a
	href={localizeHref(page.url.pathname, { locale: otherLocale })}
	hreflang={otherLocale}
	lang={otherLocale}
	data-sveltekit-reload
	class="ml-auto inline-flex items-center min-h-[44px] underline underline-offset-4"
>
	{m.otherLanguage()}
</a>
