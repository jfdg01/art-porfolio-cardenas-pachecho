<!--
@component Footer
@description Footer component with copyright disclaimer
@example
  <Footer />
-->

<script lang="ts">
	import { m } from '$lib/paraglide/messages';

	// Get current year
	const currentYear = new Date().getFullYear();
</script>

<footer class="text-muted-foreground text-sm pb-4">
	<div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-6">
		<div class="text-center">
			<p>
				© {currentYear}
				<span class="font-semibold">Carmen Cárdenas Pacheco</span><br />
				<span class="text-muted-foreground"> {m.copyrightNotice()}</span>
			</p>
		</div>
	</div>
</footer>
