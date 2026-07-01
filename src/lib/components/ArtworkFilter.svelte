<!--
@component ArtworkFilter
@description Flat filter bar: category pills, availability toggle, native sort select.
-->

<script lang="ts">
	import { X } from 'lucide-svelte';
	import { t } from 'svelte-i18n';
	import { getGalleryState, type SortOption } from '$lib/GalleryState.svelte';

	const galleryState = getGalleryState();

	const sortOptions: { value: SortOption; labelKey: string }[] = [
		{ value: 'random', labelKey: 'sort.random' },
		{ value: 'name-asc', labelKey: 'sort.nameAsc' },
		{ value: 'name-desc', labelKey: 'sort.nameDesc' },
		{ value: 'category', labelKey: 'sort.category' }
	];

	const categoryCounts = $derived.by(() => {
		const counts: Record<string, number> = {};
		galleryState.artworks.forEach((artwork) => {
			const cats = Array.isArray(artwork.category) ? artwork.category : [artwork.category];
			cats.forEach((cat) => {
				counts[cat] = (counts[cat] || 0) + 1;
			});
		});
		return counts;
	});

	const hasActiveFilters = $derived(
		galleryState.selectedCategories.length > 0 || galleryState.showOnlyAvailable
	);

	function toggleCategory(category: string) {
		const selected = galleryState.selectedCategories;
		galleryState.setCategoryFilter(
			selected.includes(category)
				? selected.filter((c) => c !== category)
				: [...selected, category]
		);
	}
</script>

<div class="space-y-4">
	<!-- Category pills + availability -->
	<div class="flex flex-wrap items-center gap-2" role="group" aria-label={$t('filterByCategory')}>
		{#each galleryState.availableCategories as category (category)}
			{@const active = galleryState.selectedCategories.includes(category)}
			<button
				onclick={() => toggleCategory(category)}
				class="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none {active
					? 'border-primary bg-primary text-primary-foreground'
					: 'border-border bg-transparent text-muted-foreground hover:border-primary hover:text-foreground'}"
				aria-pressed={active}
			>
				{$t(`categories.${category}`)}
				<span class="text-xs opacity-60">{categoryCounts[category] || 0}</span>
			</button>
		{/each}

		<span class="mx-1 hidden h-5 w-px bg-border sm:block" aria-hidden="true"></span>

		<button
			onclick={() => galleryState.setShowOnlyAvailable(!galleryState.showOnlyAvailable)}
			class="inline-flex min-h-[40px] items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none {galleryState.showOnlyAvailable
				? 'border-success bg-success text-success-foreground'
				: 'border-border bg-transparent text-muted-foreground hover:border-success hover:text-foreground'}"
			aria-pressed={galleryState.showOnlyAvailable}
		>
			<span
				class="size-2 rounded-full {galleryState.showOnlyAvailable
					? 'bg-success-foreground'
					: 'bg-success'}"
				aria-hidden="true"
			></span>
			{$t('showOnlyAvailable')}
		</button>

		{#if hasActiveFilters}
			<button
				onclick={() => galleryState.clearFilters()}
				class="inline-flex min-h-[40px] items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-destructive focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
				aria-label={$t('clearFilters')}
			>
				<X class="size-4" />
				{$t('clearFilters')}
			</button>
		{/if}
	</div>

	<!-- Results count + sort -->
	<div class="flex items-center justify-between gap-4">
		<p class="text-sm text-muted-foreground">
			{$t('showingCount', { values: { count: galleryState.filteredArtworks.length } })}
		</p>

		<label class="flex items-center gap-2 text-sm text-muted-foreground">
			<span class="hidden sm:inline">{$t('sort.label')}</span>
			<select
				value={galleryState.sortBy}
				onchange={(e) => galleryState.setSortBy(e.currentTarget.value as SortOption)}
				class="rounded-lg border-border bg-transparent py-1.5 pr-8 pl-3 text-sm text-foreground focus:border-primary focus:ring-primary"
			>
				{#each sortOptions as option (option.value)}
					<option value={option.value}>{$t(option.labelKey)}</option>
				{/each}
			</select>
		</label>
	</div>
</div>
