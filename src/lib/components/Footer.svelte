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
	class="bg-background/80 backdrop-blur-xl text-muted-foreground text-sm pb-20 min-[850px]:pb-4"
>
	<div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-6">
		<div class="text-center">
			<p>
				© {currentYear}
				<span class="font-semibold montserrat-semibold">Carmen Cárdenas Pacheco</span><br />
				<span class="text-muted-foreground">
					{$t('copyrightNotice') || 'All rights reserved.'}</span
				>
			</p>
		</div>
	</div>
</footer>
