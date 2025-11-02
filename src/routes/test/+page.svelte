<!--
@component TestPage
@description Test page for testing imports and components
-->

<script lang="ts">
	import Img from '@zerodevx/svelte-img';
	import GalleryHeader from '$lib/components/GalleryHeader.svelte';

	const modules = import.meta.glob('$lib/assets/imagesRaw/*', {
		import: 'default',
		eager: true,
		query: { as: 'detail', aspect: '1:1', format: 'webp' }
	});

	let name = 'albor';

	// Filter based on the file path keys that contain 'notional'
	const images = Object.entries(modules)
		.filter(([path]) => path.toLowerCase().includes(name))
		.map(([, img]) => img);
</script>

<GalleryHeader />

<main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
	<h1 class="text-3xl font-bold mb-4">Test Page</h1>
	<!-- Example usage of Img component -->
	<div class="mt-6">
		<div class="grid grid-cols-3">
			{#each images as src, index (index)}
				<Img class="w-[100px]" {src} alt="Mi apunte" sizes="100px" />
			{/each}
		</div>
	</div>
</main>
