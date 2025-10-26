<!--
@component ArtworkFilter
@description Compact filter component with nested collapsible menu system
Follows mobile-first design system with glass morphism and gradient accents
@example
  <ArtworkFilter />
-->

<script lang="ts">
	import { Filter, RotateCcw, ArrowUpDown, SlidersHorizontal, ChevronDown } from 'lucide-svelte';
	import { t } from 'svelte-i18n';
	import { getGalleryState, type SortOption } from '$lib/GalleryState.svelte';
	import { Collapsible, ToggleGroup } from 'bits-ui';

	// Get gallery state
	const galleryState = getGalleryState();

	// Collapsible states
	let optionsOpen = $state(false);
	let filterOpen = $state(false);
	let sortOpen = $state(false);

	// Toggle Group value (array of selected categories)
	let selectedValue = $derived(galleryState.selectedCategories);

	// Sort value
	let sortValue = $derived(galleryState.sortBy);

	// Sort options configuration
	const sortOptions: { value: SortOption; labelKey: string }[] = [
		{ value: 'name-asc', labelKey: 'sort.nameAsc' },
		{ value: 'name-desc', labelKey: 'sort.nameDesc' },
		{ value: 'category', labelKey: 'sort.category' }
	];

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
		if (!value) return;
		const newSort = value as SortOption;
		galleryState.setSortBy(newSort);
	}

	function clearFilters() {
		galleryState.clearFilters();
	}

	function toggleAvailability() {
		galleryState.setShowOnlyAvailable(!galleryState.showOnlyAvailable);
	}
</script>

<div class="w-full space-y-3 md:space-y-4">
	<!-- Top Level: Availability Toggle & Options Button -->
	<div class="flex items-center gap-3 md:gap-4">
		<!-- Availability Toggle - Always Visible (Mobile-First, Touch-Friendly) -->
		<button
			onclick={toggleAvailability}
			class="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 min-h-[44px] montserrat-semibold {galleryState.showOnlyAvailable
				? 'bg-gradient-to-r from-primary to-primary text-primary-foreground border-transparent shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus-visible:ring-ring'
				: 'bg-card text-card-foreground border-border hover:bg-muted hover:border-border focus-visible:ring-ring'} md:text-base md:gap-3"
			aria-label={$t('showOnlyAvailable')}
		>
			<span class="text-base md:text-lg">{galleryState.showOnlyAvailable ? '✓' : '○'}</span>
			<span>{$t('showOnlyAvailable')}</span>
		</button>

		<!-- Options Toggle Button (Touch-Friendly) -->
		<button
			onclick={() => (optionsOpen = !optionsOpen)}
			class="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[44px] min-w-[44px] montserrat-semibold {optionsOpen
				? 'bg-gradient-to-r from-primary to-primary text-primary-foreground border-transparent shadow-md'
				: 'bg-card text-card-foreground border-border hover:bg-muted hover:border-border'} md:text-base md:px-6"
			aria-label={$t('options')}
			aria-expanded={optionsOpen}
		>
			<SlidersHorizontal class="size-5" />
			<span class="hidden sm:inline">{$t('options')}</span>
		</button>
	</div>

	<!-- Level 2: Options Menu (Filter & Sort Buttons) -->
	<Collapsible.Root bind:open={optionsOpen}>
		<Collapsible.Content
			class="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden"
		>
			<div
				class="space-y-3 bg-card/80 backdrop-blur-xl rounded-xl border border-border shadow-sm p-3 md:p-4"
			>
				<!-- Filter Button -->
				<button
					onclick={() => (filterOpen = !filterOpen)}
					class="w-full flex items-center justify-between px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[44px] montserrat-medium {filterOpen
						? 'bg-accent text-accent-foreground border-border'
						: 'bg-card text-card-foreground border-border hover:bg-muted'} md:text-base"
					aria-label={$t('filterByCategory')}
					aria-expanded={filterOpen}
				>
					<div class="flex items-center gap-2 md:gap-3">
						<Filter class="size-5 {filterOpen ? 'text-primary' : 'text-muted-foreground'}" />
						<span>{$t('filterByCategory')}</span>
						{#if galleryState.selectedCategories.length > 0}
							<span
								class="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground montserrat-semibold"
							>
								{galleryState.selectedCategories.length}
							</span>
						{/if}
					</div>
					<ChevronDown
						class="size-5 transition-transform duration-200 {filterOpen ? 'rotate-180' : ''}"
					/>
				</button>

				<!-- Level 3: Filter Options -->
				<Collapsible.Root bind:open={filterOpen}>
					<Collapsible.Content
						class="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden"
					>
						<div class="pl-1 pr-1 pb-2 space-y-3 md:pl-2 md:pr-2">
							<!-- Clear Button -->
							{#if galleryState.selectedCategories.length > 0}
								<button
									onclick={clearFilters}
									class="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-destructive hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 min-h-[44px] montserrat-medium md:text-base"
									aria-label={$t('clearFilters')}
								>
									<RotateCcw class="size-4" />
									<span>{$t('clearFilters')}</span>
								</button>
							{/if}

							<!-- Category Toggles -->
							<ToggleGroup.Root
								type="multiple"
								value={selectedValue}
								onValueChange={handleValueChange}
								class="space-y-2"
							>
								{#each galleryState.availableCategories as category (category)}
									<ToggleGroup.Item
										value={category}
										class="w-full flex items-center justify-between gap-3 px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 min-h-[44px] montserrat-medium data-[state=on]:bg-gradient-to-r data-[state=on]:from-primary data-[state=on]:to-primary data-[state=on]:text-primary-foreground data-[state=on]:border-transparent data-[state=on]:shadow-md hover:data-[state=on]:shadow-lg data-[state=on]:transform data-[state=on]:hover:-translate-y-0.5 data-[state=off]:bg-card data-[state=off]:text-card-foreground data-[state=off]:border-border data-[state=off]:hover:bg-muted md:text-base"
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

				<!-- Sort Button -->
				<button
					onclick={() => (sortOpen = !sortOpen)}
					class="w-full flex items-center justify-between px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[44px] montserrat-medium {sortOpen
						? 'bg-accent text-accent-foreground border-border'
						: 'bg-card text-card-foreground border-border hover:bg-muted'} md:text-base"
					aria-label={$t('sort.label')}
					aria-expanded={sortOpen}
				>
					<div class="flex items-center gap-2 md:gap-3">
						<ArrowUpDown class="size-5 {sortOpen ? 'text-primary' : 'text-muted-foreground'}" />
						<span>{$t('sort.label')}</span>
					</div>
					<ChevronDown
						class="size-5 transition-transform duration-200 {sortOpen ? 'rotate-180' : ''}"
					/>
				</button>

				<!-- Level 3: Sort Options -->
				<Collapsible.Root bind:open={sortOpen}>
					<Collapsible.Content
						class="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden"
					>
						<div class="pl-1 pr-1 pb-2 md:pl-2 md:pr-2">
							<ToggleGroup.Root
								type="single"
								value={sortValue}
								onValueChange={handleSortChange}
								class="space-y-2"
							>
								{#each sortOptions as option (option.value)}
									<ToggleGroup.Item
										value={option.value}
										class="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 min-h-[44px] montserrat-medium data-[state=on]:bg-gradient-to-r data-[state=on]:from-primary data-[state=on]:to-primary data-[state=on]:text-primary-foreground data-[state=on]:border-transparent data-[state=on]:shadow-md hover:data-[state=on]:shadow-lg data-[state=on]:transform data-[state=on]:hover:-translate-y-0.5 data-[state=off]:bg-card data-[state=off]:text-card-foreground data-[state=off]:border-border data-[state=off]:hover:bg-muted md:text-base"
										aria-label={$t(option.labelKey)}
									>
										<span>{$t(option.labelKey)}</span>
									</ToggleGroup.Item>
								{/each}
							</ToggleGroup.Root>
						</div>
					</Collapsible.Content>
				</Collapsible.Root>
			</div>
		</Collapsible.Content>
	</Collapsible.Root>

	<!-- Results Count -->
	<div class="mt-2">
		<p class="text-sm text-muted-foreground text-center md:text-base montserrat-medium">
			{$t('showingCount', { values: { count: galleryState.filteredArtworks.length } })}
			{#if galleryState.selectedCategories.length > 0}
				<span class="text-primary font-medium montserrat-medium">
					{$t('in')}
					{galleryState.selectedCategories.map((cat) => $t(`categories.${cat}`)).join(', ')}
				</span>
			{/if}
		</p>
	</div>
</div>
