<!--
@component ArtworkCard
@description Displays an individual artwork with image and title
@example
  <ArtworkCard {artwork} />
-->

<script lang="ts">
	import type { Artwork } from '$lib/artworks';
	import { Eye } from 'lucide-svelte';
	import { m } from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime';

	/**
	 * @prop {Artwork} artwork - The artwork object to display
	 * @prop {boolean} isPriority - Whether this is an above-the-fold image that should be prioritized
	 * @prop {boolean} eager - Whether to disable lazy loading for this image
	 */
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

<!-- The image and the Title, as one real link, so the prerender crawler finds the Artwork page -->
<div class="artwork-container">
	<a
		href={localizeHref(`/artwork/${artwork.id}`)}
		data-sveltekit-noscroll
		class="artwork-card block group rounded-xl overflow-hidden shadow-lg shadow-stone-800/20 hover:shadow-xl hover:shadow-stone-900/40 transition-all duration-300 hover:-translate-y-1 bg-card"
		aria-label={m.viewDetailsFor({ title: artwork.title })}
	>
		<!-- Image -->
		<div class="relative overflow-hidden">
			<enhanced:img
				src={artwork.images[0]}
				alt={artwork.title}
				class="w-full h-auto transition-transform duration-300 group-hover:scale-105"
				sizes="(min-width: 1540px) 175px, (min-width: 1280px) 221px, (min-width: 1040px) calc(25vw - 33px), (min-width: 520px) calc(32.2vw - 20px), (min-width: 360px) calc(50vw - 24px), calc(100vw - 32px)"
				fetchpriority={isPriority ? 'high' : undefined}
				loading={eager ? 'eager' : 'lazy'}
			/>

			<!-- Overlay on hover -->
			<div
				class="absolute inset-0 pointer-events-none bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center"
			>
				<Eye
					class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
				/>
			</div>
		</div>

		<!-- Title with availability indicator -->
		<div class="px-3 py-2 border-t border-border">
			<div class="flex items-center justify-center gap-2">
				<h3
					class="font-semibold montserrat-semibold text-card-foreground text-sm leading-tight text-center"
				>
					{artwork.title}
				</h3>
				{#if !artwork.sold}
					<span
						class="relative w-3 h-3 rounded-full flex-shrink-0 animate-pulse"
						style="background-color: var(--color-success)"
						aria-label={m.available()}
					>
						<!-- Animated glow ring -->
						<span
							class="absolute inset-0 rounded-full animate-ping opacity-90"
							style="background-color: var(--color-success)"
						></span>
					</span>
				{/if}
			</div>
		</div>
	</a>
</div>
