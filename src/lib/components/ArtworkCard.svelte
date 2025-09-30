<!--
@component ArtworkCard
@description Displays an individual artwork with image, title, and price
@example
  <ArtworkCard {artwork} on:click={handleArtworkClick} />
-->

<script lang="ts">
	import type { Artwork } from '$lib/types/artwork';
	import { Eye } from 'lucide-svelte';
	import { t } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import Img from '@zerodevx/svelte-img';

	// Import all images with optimization for gallery cards
	const imageImports = import.meta.glob('$lib/assets/images/*.webp', {
		import: 'default',
		eager: true,
		query: { w: '250;350;500', format: 'webp;jpg', as: 'run' }
	});

	// Create a mapping from filename to optimized image
	const imageMap: Record<string, unknown> = {};
	Object.entries(imageImports).forEach(([path, image]) => {
		const filename = path.split('/').pop()?.replace('.webp', '') || '';
		imageMap[filename] = image;
	});

	/**
	 * @prop {Artwork} artwork - The artwork object to display
	 */
	let {
		artwork
	}: {
		artwork: Artwork;
	} = $props();

	// Simple image-only approach

	function handleClick() {
		goto(`/artwork/${artwork.id}`);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleClick();
		}
	}
</script>

<!-- Single seamless card with image and title -->
<div class="artwork-container">
	<div
		class="artwork-card group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
		onclick={handleClick}
		onkeydown={handleKeydown}
		tabindex="0"
		role="button"
		aria-label={$t('viewDetailsFor', { values: { title: artwork.title } })}
	>
		<!-- Image -->
		<div class="relative">
			{#if artwork.images && artwork.images.length > 0}
				{@const imageSrc = artwork.images[0].src}
				{@const imageName = imageSrc.split('/').pop()?.replace('.webp', '')}
				{@const optimizedImage = imageName ? imageMap[imageName] : undefined}
				{#if optimizedImage}
					<Img
						src={optimizedImage}
						alt={$t('artworkAlt', { values: { title: artwork.title } })}
						class="w-full h-auto transition-transform duration-300 group-hover:scale-105"
						sizes="(max-width: 320px) 288px, (max-width: 768px) 192px, (max-width: 1024px) 187px, (max-width: 1440px) 288px, 300px"
					/>
				{:else}
					<!-- Fallback for images not found in the mapping -->
					<img
						src={imageSrc}
						alt={$t('artworkAlt', { values: { title: artwork.title } })}
						class="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
						loading="lazy"
					/>
				{/if}
			{:else}
				<div class="w-full h-48 bg-gray-200 flex items-center justify-center">
					<p class="text-gray-500">No image available</p>
				</div>
			{/if}

			<!-- Overlay on hover -->
			<div
				class="absolute inset-0 pointer-events-none bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center"
			>
				<Eye
					class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
				/>
			</div>
		</div>

		<!-- Title - integrated into the same card -->
		<div class="px-3 py-2 border-t border-gray-200/50">
			<h3 class="font-semibold text-gray-900 text-sm leading-tight text-center">
				{artwork.title}
			</h3>
		</div>
	</div>
</div>
