<!--
@component TestPage
@description Test page for testing imports and components
-->

<script lang="ts">
	import Img from '@zerodevx/svelte-img';
	import apunteAcrilico1 from '$lib/assets/images/apunte-acrilico-1.webp?as=run';
	import apunteAcrilico2 from '$lib/assets/images/apunte-acrilico-2.webp?as=run';
	import apunteAcrilico3 from '$lib/assets/images/apunte-acrilico-3.webp?as=run';


    let type = 'run';
	// Batch load apunte images using vite glob
	const modules = import.meta.glob('$lib/assets/images/apunte-acrilico-*.webp', {
		import: 'default',
		eager: true,
		query: { as: 'run', aspect: '1:1', format: 'webp' }
	});
	const allImages = Object.values(modules);
	const images = allImages.filter((_, index) => index !== 1 && index !== allImages.length - 1);

	// Direct imports for apunte-acrilico 1, 2, and 3
	const directImages = [apunteAcrilico1, apunteAcrilico2, apunteAcrilico3];

    let sizes = 1000;
</script>

<main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
	<h1 class="text-3xl font-bold mb-4">Test Page</h1>
	<!-- Example usage of Img component -->
	<div class="mt-6">
		<div class="flex flex-row gap-4 items-center">
			{#each images as src, index (index)}
				<Img class="w-100" {src} alt="Mi apunte" sizes={`${sizes}px`} />
			{/each}
		</div>
	</div>
	<!-- Direct imports for apunte-acrilico 1, 2, and 3 -->
	<div class="mt-6">
		<div class="flex flex-row gap-4 items-center">
			{#each directImages as src, index (index)}
				<Img class="w-100" {src} alt="Mi apunte" sizes={`${sizes}px`} />
			{/each}
		</div>
	</div>
</main>
