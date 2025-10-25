<!--
@component Footer
@description Footer component with copyright disclaimer
@example
  <Footer />
-->

<script lang="ts">
	import { t } from 'svelte-i18n';

	// Get current year
	const currentYear = new Date().getFullYear();
</script>

<!-- Footer with extra padding on mobile to avoid overlap with BottomNavigation -->
<footer
	class="border-t border-gray-200/50 bg-white/80 backdrop-blur-xl text-gray-600 text-sm pb-20 md:pb-0"
>
	<div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6">
		<div class="text-center">
			<p>
				© {currentYear}
				<span class="font-semibold montserrat-semibold">Carmen Cárdenas Pacheco</span><br>
				<span class="text-gray-500"> {$t('copyrightNotice') || 'All rights reserved.'}</span>
			</p>
		</div>
	</div>
</footer>
