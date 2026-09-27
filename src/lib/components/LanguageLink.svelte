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
	class="inline-flex items-center justify-center min-h-[44px] px-2 text-sm font-medium montserrat-medium text-foreground underline underline-offset-4 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
>
	{m.otherLanguage()}
</a>
