<!--
@component NavigationSelect
@description Navigation menu using Bits UI Select for better accessibility
@example
  <NavigationSelect />
-->

<script lang="ts">
	import { Menu, Home, Mail, GraduationCap, Check } from 'lucide-svelte';
	import { t } from 'svelte-i18n';
	import { Select } from 'bits-ui';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	// Define navigation options with reactive labels
	const navigationOptions = $derived([
		{
			value: 'home',
			label: $t('artworks'),
			icon: Home,
			path: '/'
		},
		{
			value: 'classes',
			label: $t('onlineClassesPage'),
			icon: GraduationCap,
			path: '/clases-online'
		},
		{
			value: 'contact',
			label: $t('contact'),
			icon: Mail,
			path: '/contact'
		}
	]);

	// Create items array for Select component
	const selectItems = $derived(
		navigationOptions.map((option) => ({
			value: option.value,
			label: option.label
		}))
	);

	type NavigationValue = (typeof navigationOptions)[number]['value'];

	let selectedValue = $state<NavigationValue | undefined>(undefined);

	// Check if a path is active
	function isActivePath(path: string): boolean {
		if (path === '/') {
			// For home, only match exact path or artwork detail pages
			return $page.url.pathname === '/' || $page.url.pathname.startsWith('/artwork/');
		}
		return $page.url.pathname === path;
	}

	function handleNavigation(value: string | undefined) {
		if (!value) return;

		const option = navigationOptions.find((opt) => opt.value === value);
		if (option) {
			goto(option.path);
			selectedValue = undefined; // Reset selection after navigation
		}
	}
</script>

<div class="relative">
	<Select.Root
		type="single"
		value={selectedValue}
		onValueChange={handleNavigation}
		items={selectItems}
		allowDeselect={true}
	>
		<Select.Trigger
			class="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white/80 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200 min-h-[44px] min-w-[44px] text-gray-700"
			aria-label={$t('openNavigationMenu')}
		>
			<Menu class="size-5" />
		</Select.Trigger>

		<Select.Portal>
			<Select.Content
				class="absolute right-0 mt-2 w-56 rounded-lg border border-gray-200 bg-white/95 backdrop-blur-md shadow-lg z-50 max-h-80 overflow-y-auto p-2"
				sideOffset={8}
			>
				<div class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2 py-1">
					{$t('navigation')}
				</div>

				<Select.Viewport class="p-1">
					{#each navigationOptions as option (option.value)}
						{@const isActive = isActivePath(option.path)}
						<Select.Item
							value={option.value}
							class="flex items-center gap-3 px-3 py-2.5 text-sm text-left rounded cursor-pointer focus:outline-none {isActive
								? 'bg-blue-50 hover:bg-blue-100 data-[highlighted]:bg-blue-100'
								: 'hover:bg-gray-50 data-[highlighted]:bg-gray-50 focus:bg-gray-50'}"
							aria-current={isActive ? 'page' : undefined}
						>
							{#if option.value === 'home'}
								<Home class="size-4 {isActive ? 'text-blue-600' : 'text-gray-600'}" />
							{:else if option.value === 'classes'}
								<GraduationCap class="size-4 {isActive ? 'text-blue-600' : 'text-gray-600'}" />
							{:else if option.value === 'contact'}
								<Mail class="size-4 {isActive ? 'text-blue-600' : 'text-gray-600'}" />
							{/if}
							<span class="flex-1 font-medium {isActive ? 'text-blue-600' : ''}"
								>{option.label}</span
							>
							{#if isActive}
								<Check class="size-4 text-blue-600" />
							{/if}
						</Select.Item>
					{/each}
				</Select.Viewport>
			</Select.Content>
		</Select.Portal>
	</Select.Root>
</div>
