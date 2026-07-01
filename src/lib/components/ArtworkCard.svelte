<!--
@component ArtworkCard
@description Artwork image with a quiet caption: title, year, availability dot.
-->

<script lang="ts">
	import type { Artwork } from '$lib/types/artwork';
	import { t } from 'svelte-i18n';
	import Img from '@zerodevx/svelte-img';
	import { imageMapGallery } from '$lib/data/imageImports';

	let {
		artwork,
		isPriority = false,
		eager = false
	}: {
		artwork: Artwork;
		isPriority?: boolean;
		eager?: boolean;
	} = $props();
</script>

<div class="artwork-container">
	<a
		href="/artwork/{artwork.id}"
		data-sveltekit-preload-data="hover"
		data-sveltekit-noscroll
		class="group block focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:outline-none"
		aria-label={$t('viewDetailsFor', { values: { title: artwork.title } })}
	>
		<div class="overflow-hidden rounded-lg bg-muted shadow-sm transition-shadow duration-300 group-hover:shadow-lg">
			{#if artwork.images && artwork.images.length > 0}
				{@const imageSrc = artwork.images[0].src}
				{@const imageName = imageSrc.split('/').pop()?.replace('.webp', '')}
				{@const optimizedImage = imageName ? imageMapGallery[imageName] : undefined}

				<Img
					src={optimizedImage ?? imageSrc}
					alt={$t('artworkAlt', { values: { title: artwork.title } })}
					class="w-full h-auto transition-transform duration-500 ease-out group-hover:scale-[1.03]"
					sizes="(min-width: 1540px) 175px, (min-width: 1280px) 221px, (min-width: 1040px) calc(25vw - 33px), (min-width: 520px) calc(32.2vw - 20px), (min-width: 360px) calc(50vw - 24px), calc(100vw - 32px)"
					fetchpriority={isPriority ? 'high' : undefined}
					loading={eager ? 'eager' : 'lazy'}
				/>
			{:else}
				<div class="flex h-48 w-full items-center justify-center">
					<p class="text-muted-foreground">No image available</p>
				</div>
			{/if}
		</div>

		<div class="flex items-baseline justify-between gap-2 px-1 pt-2">
			<h3 class="font-serif text-sm leading-snug text-foreground transition-colors duration-200 group-hover:text-primary">
				{artwork.title}
			</h3>
			<span class="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
				{#if artwork.year}{artwork.year}{/if}
				{#if artwork.isAvailable}
					<span
						class="size-2 rounded-full bg-success"
						role="img"
						aria-label={$t('available', { default: 'Available' })}
						title={$t('available', { default: 'Available' })}
					></span>
				{/if}
			</span>
		</div>
	</a>
</div>
