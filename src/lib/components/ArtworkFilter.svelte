<!--
@component ArtworkFilter
@description Robust filter component for artwork categories and sorting with tag-based filtering
@example
  <ArtworkFilter />
-->

<script lang="ts">
	import { X, Filter, RotateCcw, ArrowUpDown } from 'lucide-svelte';
	import { t } from 'svelte-i18n';
	import { getGalleryState, type SortOption } from '$lib/GalleryState.svelte';
	import { Collapsible, ToggleGroup } from 'bits-ui';

	// Get gallery state
	const galleryState = getGalleryState();

	// Collapsible states for mobile panels
	let mobileFilterOpen = $state(false);
	let mobileSortOpen = $state(false);

	// Toggle Group value (array of selected categories)
	let selectedValue = $derived(galleryState.selectedCategories);

	// Sort value
	let sortValue = $derived(galleryState.sortBy);

	// Sort options configuration
	const sortOptions: { value: SortOption; labelKey: string }[] = [
		{ value: 'random', labelKey: 'sort.random' },
		{ value: 'name-asc', labelKey: 'sort.nameAsc' },
		{ value: 'name-desc', labelKey: 'sort.nameDesc' },
		{ value: 'category', labelKey: 'sort.category' }
		// Hidden for now:
		// { value: 'year-newest', labelKey: 'sort.yearNewest' },
		// { value: 'year-oldest', labelKey: 'sort.yearOldest' },
		// { value: 'availability', labelKey: 'sort.availability' }
	];

	// Get friendly sort label for display
	function getSortLabel(sortBy: SortOption): string {
		const option = sortOptions.find((opt) => opt.value === sortBy);
		return option ? $t(option.labelKey) : $t('sort.random');
	}

	// Count artworks per category
	const categoryCounts = $derived.by(() => {
		const counts: Record<string, number> = {};
		galleryState.artworks.forEach((artwork) => {
			const categories = Array.isArray(artwork.category) ? artwork.category : [artwork.category];
			categories.forEach((cat) => {
				counts[cat] = (counts[cat] || 0) + 1;
			});
		});
		return counts;
	});

	function handleValueChange(value: string[]) {
		galleryState.setCategoryFilter(value);
	}

	function handleSortChange(value: string) {
		// Ensure a sort option is always selected (prevent deselection)
		if (!value) {
			// If trying to deselect, keep current or default to random
			return;
		}
		const newSort = value as SortOption;
		galleryState.setSortBy(newSort);
	}

	function clearFilters() {
		galleryState.clearFilters();
	}
</script>

<div class="w-full">
	<!-- Desktop Filter & Sort - Separate Cards -->
	<div class="hidden md:block">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
			<!-- Filter Card -->
			<div
				class="bg-white/80 backdrop-blur-xl rounded-xl border border-gray-200/50 shadow-sm p-4 lg:p-6"
			>
				<div class="flex items-center justify-between mb-4">
					<div class="flex items-center gap-2">
						<Filter class="size-5 text-blue-600" />
						<h3 class="text-base font-semibold text-gray-900 montserrat-semibold">
							{$t('filterByCategory')}
							{#if galleryState.selectedCategories.length > 0}
								<span class="text-sm font-normal text-blue-600">
									({galleryState.selectedCategories.length})
								</span>
							{/if}
						</h3>
					</div>
					<button
						onclick={clearFilters}
						disabled={galleryState.selectedCategories.length === 0}
						class="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:opacity-0 disabled:pointer-events-none"
						aria-label={$t('clearFilters')}
					>
						<RotateCcw class="size-4" />
						<span class="hidden lg:inline">{$t('clear')}</span>
					</button>
				</div>

				<ToggleGroup.Root
					type="multiple"
					value={selectedValue}
					onValueChange={handleValueChange}
					class="flex flex-wrap gap-2 lg:gap-3"
				>
					{#each galleryState.availableCategories as category (category)}
						<ToggleGroup.Item
							value={category}
							class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 data-[state=on]:bg-gradient-to-r data-[state=on]:from-blue-600 data-[state=on]:to-indigo-600 data-[state=on]:text-white data-[state=on]:border-transparent data-[state=on]:shadow-md hover:data-[state=on]:shadow-lg data-[state=on]:transform data-[state=on]:hover:-translate-y-0.5 data-[state=off]:bg-white data-[state=off]:text-gray-700 data-[state=off]:border-gray-300 data-[state=off]:hover:bg-gray-50 data-[state=off]:hover:border-gray-400"
							aria-label={$t('filterBy', { values: { category: $t(`categories.${category}`) } })}
						>
							<span>{$t(`categories.${category}`)} ({categoryCounts[category] || 0})</span>
						</ToggleGroup.Item>
					{/each}
				</ToggleGroup.Root>
			</div>

			<!-- Sort Card -->
			<div
				class="bg-white/80 backdrop-blur-xl rounded-xl border border-gray-200/50 shadow-sm p-4 lg:p-6"
			>
				<div class="flex items-center gap-2 mb-4">
					<ArrowUpDown class="size-5 text-blue-600" />
					<h3 class="text-base font-semibold text-gray-900 montserrat-semibold">
						{$t('sort.label')}...
					</h3>
				</div>

				<ToggleGroup.Root
					type="single"
					value={sortValue}
					onValueChange={handleSortChange}
					class="flex flex-wrap gap-2 lg:gap-3"
				>
					{#each sortOptions as option (option.value)}
						<ToggleGroup.Item
							value={option.value}
							class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 data-[state=on]:bg-gradient-to-r data-[state=on]:from-blue-600 data-[state=on]:to-indigo-600 data-[state=on]:text-white data-[state=on]:border-transparent data-[state=on]:shadow-md hover:data-[state=on]:shadow-lg data-[state=on]:transform data-[state=on]:hover:-translate-y-0.5 data-[state=off]:bg-white data-[state=off]:text-gray-700 data-[state=off]:border-gray-300 data-[state=off]:hover:bg-gray-50 data-[state=off]:hover:border-gray-400"
							aria-label={$t(option.labelKey)}
						>
							<span>{$t(option.labelKey)}</span>
						</ToggleGroup.Item>
					{/each}
				</ToggleGroup.Root>
			</div>
		</div>

		<!-- Results Count -->
		<div class="mt-4 lg:mt-6">
			<p class="text-sm text-gray-600 text-center">
				<span class="font-medium text-gray-900">{galleryState.filteredArtworks.length}</span>
				{$t('artworksFound')}
				{#if galleryState.selectedCategories.length > 0}
					<span class="text-blue-600">
						{$t('in')}
						{galleryState.selectedCategories.map((cat) => $t(`categories.${cat}`)).join(', ')}
					</span>
				{/if}
			</p>
		</div>
	</div>

	<!-- Mobile Filter & Sort - Separate Buttons -->
	<div class="md:hidden space-y-3">
		<!-- Filter Collapsible -->
		<Collapsible.Root bind:open={mobileFilterOpen}>
			<Collapsible.Trigger
				class="w-full flex items-center justify-between p-3 bg-white/80 backdrop-blur-xl rounded-xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
				aria-label={$t('filterByCategory')}
			>
				<div class="flex items-center gap-3">
					<Filter class="size-5 text-blue-600" />
					<div class="text-left">
						<div class="text-sm font-medium text-gray-900">
							{$t('filterByCategory')}
						</div>
						<div class="text-xs text-gray-500">
							{#if galleryState.selectedCategories.length > 0}
								{galleryState.selectedCategories.length}
								{$t('selected')}
							{:else}
								{$t('allCategoriesLabel')}
							{/if}
						</div>
					</div>
				</div>
				<div class="flex items-center gap-2">
					<button
						onclick={(e) => {
							e.stopPropagation();
							clearFilters();
						}}
						disabled={galleryState.selectedCategories.length === 0}
						class="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-all duration-200 disabled:opacity-0 disabled:pointer-events-none"
						aria-label={$t('clearFilters')}
					>
						<X class="size-4" />
					</button>
					<div class="text-gray-400">
						<svg
							class="size-4 transform transition-transform duration-200 data-[state=open]:rotate-180"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 9l-7 7-7-7"
							></path>
						</svg>
					</div>
				</div>
			</Collapsible.Trigger>

			<Collapsible.Content
				class="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden"
			>
				<div
					class="mt-3 bg-white/95 backdrop-blur-xl rounded-xl border border-gray-200/50 shadow-lg p-4"
				>
					<ToggleGroup.Root
						type="multiple"
						value={selectedValue}
						onValueChange={handleValueChange}
						class="space-y-2"
					>
						{#each galleryState.availableCategories as category (category)}
							<ToggleGroup.Item
								value={category}
								class="w-full flex items-center justify-between gap-3 px-4 py-3 text-sm font-medium rounded-lg border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 data-[state=on]:bg-gradient-to-r data-[state=on]:from-blue-600 data-[state=on]:to-indigo-600 data-[state=on]:text-white data-[state=on]:border-transparent data-[state=on]:shadow-md data-[state=off]:bg-white data-[state=off]:text-gray-700 data-[state=off]:border-gray-300 data-[state=off]:hover:bg-gray-50"
								aria-label={$t('filterBy', {
									values: { category: $t(`categories.${category}`) }
								})}
							>
								<span>{$t(`categories.${category}`)}</span>
								<span class="text-xs opacity-75">({categoryCounts[category] || 0})</span>
							</ToggleGroup.Item>
						{/each}
					</ToggleGroup.Root>
				</div>
			</Collapsible.Content>
		</Collapsible.Root>

		<!-- Sort Collapsible -->
		<Collapsible.Root bind:open={mobileSortOpen}>
			<Collapsible.Trigger
				class="w-full flex items-center justify-between p-3 bg-white/80 backdrop-blur-xl rounded-xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
				aria-label={$t('sort.label')}
			>
				<div class="flex items-center gap-3">
					<ArrowUpDown class="size-5 text-blue-600" />
					<div class="text-left">
						<div class="text-sm font-medium text-gray-900">{$t('sort.label')}...</div>
						<div class="text-xs text-gray-500">
							{getSortLabel(galleryState.sortBy)}
						</div>
					</div>
				</div>
				<div class="text-gray-400">
					<svg
						class="size-4 transform transition-transform duration-200 data-[state=open]:rotate-180"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
						></path>
					</svg>
				</div>
			</Collapsible.Trigger>

			<Collapsible.Content
				class="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden"
			>
				<div
					class="mt-3 bg-white/95 backdrop-blur-xl rounded-xl border border-gray-200/50 shadow-lg p-4"
				>
					<ToggleGroup.Root
						type="single"
						value={sortValue}
						onValueChange={handleSortChange}
						class="space-y-2"
					>
						{#each sortOptions as option (option.value)}
							<ToggleGroup.Item
								value={option.value}
								class="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 data-[state=on]:bg-gradient-to-r data-[state=on]:from-blue-600 data-[state=on]:to-indigo-600 data-[state=on]:text-white data-[state=on]:border-transparent data-[state=on]:shadow-md data-[state=off]:bg-white data-[state=off]:text-gray-700 data-[state=off]:border-gray-300 data-[state=off]:hover:bg-gray-50"
								aria-label={$t(option.labelKey)}
							>
								<span>{$t(option.labelKey)}</span>
							</ToggleGroup.Item>
						{/each}
					</ToggleGroup.Root>
				</div>
			</Collapsible.Content>
		</Collapsible.Root>

		<!-- Results Count -->
		<div class="mt-4">
			<p class="text-sm text-gray-600 text-center">
				<span class="font-medium text-gray-900">{galleryState.filteredArtworks.length}</span>
				{$t('artworksFound')}
				{#if galleryState.selectedCategories.length > 0}
					<span class="text-blue-600">
						{$t('in')}
						{galleryState.selectedCategories.map((cat) => $t(`categories.${cat}`)).join(', ')}
					</span>
				{/if}
			</p>
		</div>
	</div>
</div>
