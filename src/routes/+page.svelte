<!--
@component GalleryPage
@description Main gallery page displaying every Artwork in Wall order
-->

<script lang="ts">
	import { artworks } from '$lib/artworks';
	import GalleryHeader from '$lib/components/GalleryHeader.svelte';
	import ArtworkGrid from '$lib/components/ArtworkGrid.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { ARTIST, SITE_URL } from '$lib';
</script>

<SEO
	title="Carmen Cárdenas Pacheco - Portfolio de Arte"
	description="Bienvenid@ al portfolio de arte de Carmen Cárdenas Pacheco. Ponte en contacto conmigo y mis clases online."
	structuredData={{
		'@type': 'ImageGallery',
		name: 'Carmen Cárdenas Pacheco - Art Portfolio',
		description: 'Portfolio de arte de Carmen Cárdenas Pacheco',
		author: ARTIST,
		image: artworks.slice(0, 10).map((artwork) => ({
			'@type': 'ImageObject',
			name: artwork.title,
			contentUrl: SITE_URL + artwork.images[0].img.src,
			description: `${artwork.title} by Carmen Cárdenas Pacheco`,
			author: ARTIST,
			copyrightHolder: ARTIST,
			dateCreated: artwork.year?.toString()
		}))
	}}
/>

<!-- Header -->
<GalleryHeader />

<!-- Main Content - Mobile First -->
<main class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6 md:py-8 lg:py-12">
	<ArtworkGrid {artworks} />
</main>
