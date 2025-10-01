<!--
@component ArtworkFilter
@description Robust filter component for artwork categories with tag-based filtering
@example
  <ArtworkFilter />
-->

<script lang="ts">
	import { X, Filter, RotateCcw } from 'lucide-svelte';
	import { t } from 'svelte-i18n';
	import { getGalleryState } from '$lib/GalleryState.svelte';
	import { Collapsible, ToggleGroup } from 'bits-ui';

	// Get gallery state
	const galleryState = getGalleryState();

	// Collapsible state for mobile filter panel
	let mobileFilterOpen = $state(false);

	// Toggle Group value (array of selected categories)
	let selectedValue = $derived(galleryState.selectedCategories);

	function handleValueChange(value: string[]) {
		galleryState.setCategoryFilter(value);
	}

	function clearFilters() {
		galleryState.clearFilters();
	}
</script>

<div class="w-full">
	<!-- Desktop Filter - Mobile First -->
	<div class="hidden md:block">
		<div
			class="bg-white/80 backdrop-blur-xl rounded-xl border border-gray-200/50 shadow-sm p-4 lg:p-6"
		>
			<!-- Filter Header -->
			<div class="flex items-center justify-between mb-4 lg:mb-6">
				<div class="flex items-center gap-2 lg:gap-3">
					<Filter class="size-5 text-blue-600" />
					<h3 class="text-lg font-semibold text-gray-900 montserrat-semibold">
						{$t('filterByCategory')}
						{#if galleryState.selectedCategories.length > 0}
							<span class="text-sm font-normal text-blue-600">
								({galleryState.selectedCategories.length}
								{$t('selected')})
							</span>
						{/if}
					</h3>
				</div>
				{#if galleryState.selectedCategories.length > 0}
					<button
						onclick={clearFilters}
						class="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
						aria-label={$t('clearFilters')}
					>
						<RotateCcw class="size-4" />
						<span class="hidden lg:inline">{$t('clear')}</span>
					</button>
				{/if}
			</div>

			<!-- Category Toggle Group (Multiple Selection) -->
			<ToggleGroup.Root
				type="multiple"
				value={selectedValue}
				onValueChange={handleValueChange}
				class="flex flex-wrap gap-2 lg:gap-3"
			>
				<!-- Category Toggles -->
				{#each galleryState.availableCategories as category (category)}
					<ToggleGroup.Item
						value={category}
						class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 data-[state=on]:bg-gradient-to-r data-[state=on]:from-blue-600 data-[state=on]:to-indigo-600 data-[state=on]:text-white data-[state=on]:border-transparent data-[state=on]:shadow-md hover:data-[state=on]:shadow-lg data-[state=on]:transform data-[state=on]:hover:-translate-y-0.5 data-[state=off]:bg-white data-[state=off]:text-gray-700 data-[state=off]:border-gray-300 data-[state=off]:hover:bg-gray-50 data-[state=off]:hover:border-gray-400"
						aria-label={$t('filterBy', { values: { category: $t(`categories.${category}`) } })}
					>
						<span>{$t(`categories.${category}`)}</span>
					</ToggleGroup.Item>
				{/each}
			</ToggleGroup.Root>

			<!-- Results Count -->
			<div class="mt-4 lg:mt-6 pt-4 lg:pt-6 border-t border-gray-200">
				<p class="text-sm text-gray-600">
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

	<!-- Mobile Filter with Collapsible -->
	<div class="md:hidden">
		<Collapsible.Root bind:open={mobileFilterOpen}>
			<Collapsible.Trigger
				class="w-full flex items-center justify-between p-4 bg-white/80 backdrop-blur-xl rounded-xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
				aria-label={$t('openFilterMenu')}
			>
				<div class="flex items-center gap-3">
					<Filter class="size-5 text-blue-600" />
					<div class="text-left">
						<div class="text-sm font-medium text-gray-900">
							{$t('filterByCategory')}
						</div>
						<div class="text-xs text-gray-500">
							{#if galleryState.selectedCategories.length > 0}
								{galleryState.selectedCategories.length} {$t('selected')}
							{:else}
								{$t('allCategoriesLabel')}
							{/if}
						</div>
					</div>
				</div>
				<div class="flex items-center gap-2">
					{#if galleryState.selectedCategories.length > 0}
						<button
							onclick={(e) => {
								e.stopPropagation();
								clearFilters();
							}}
							class="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors duration-200"
							aria-label={$t('clearFilters')}
						>
							<X class="size-4" />
						</button>
					{/if}
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
					<!-- Mobile Filter Header -->
					<div class="flex items-center justify-between mb-4">
						<h3 class="text-base font-semibold text-gray-900 montserrat-semibold">
							{$t('filterByCategory')}
						</h3>
						<button
							onclick={() => (mobileFilterOpen = false)}
							class="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors duration-200"
							aria-label={$t('closeFilterMenu')}
						>
							<X class="size-5" />
						</button>
					</div>

					<!-- Mobile Category Toggle Group (Multiple Selection) -->
					<ToggleGroup.Root
						type="multiple"
						value={selectedValue}
						onValueChange={handleValueChange}
						class="space-y-2"
					>
						<!-- Category Options - Mobile -->
						{#each galleryState.availableCategories as category (category)}
							<ToggleGroup.Item
								value={category}
								class="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 data-[state=on]:bg-gradient-to-r data-[state=on]:from-blue-600 data-[state=on]:to-indigo-600 data-[state=on]:text-white data-[state=on]:border-transparent data-[state=on]:shadow-md data-[state=off]:bg-white data-[state=off]:text-gray-700 data-[state=off]:border-gray-300 data-[state=off]:hover:bg-gray-50"
								aria-label={$t('filterBy', { values: { category: $t(`categories.${category}`) } })}
							>
								<span>{$t(`categories.${category}`)}</span>
							</ToggleGroup.Item>
						{/each}
					</ToggleGroup.Root>

					<!-- Mobile Results Count -->
					<div class="mt-4 pt-4 border-t border-gray-200">
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
			</Collapsible.Content>
		</Collapsible.Root>
	</div>
</div>
