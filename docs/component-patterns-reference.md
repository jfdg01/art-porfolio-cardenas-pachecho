# Component Patterns Quick Reference

## 📋 Purpose

This is a copy-paste ready reference for all UI components in the Portal Artistas design system. Each pattern includes complete, production-ready code that follows our mobile-first, accessible design standards.

---

## 🎯 Buttons

### Primary Button (Gradient)

```html
<button
	class="px-4 py-3 text-sm font-semibold rounded-xl min-h-[44px]
         bg-gradient-to-r from-blue-600 to-indigo-600 text-white
         hover:from-blue-700 hover:to-indigo-700
         transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
         disabled:opacity-50 disabled:cursor-not-allowed
         montserrat-semibold md:px-6 md:text-base"
>
	Primary Action
</button>
```

### Primary Button with Icon

```html
<button
	class="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl min-h-[44px]
         bg-gradient-to-r from-blue-600 to-indigo-600 text-white
         hover:from-blue-700 hover:to-indigo-700
         transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
         montserrat-semibold md:px-6 md:text-base"
>
	<Send class="w-5 h-5" />
	<span>Send Message</span>
</button>
```

### Secondary Button

```html
<button
	class="px-4 py-3 text-sm font-medium rounded-xl min-h-[44px]
         bg-gray-100 hover:bg-gray-200 text-gray-700
         transition-all duration-200 hover:shadow-md
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
         montserrat-medium md:px-6 md:text-base"
>
	Secondary Action
</button>
```

### Success/Active Button (Green)

```html
<button
	class="px-4 py-3 text-sm font-semibold rounded-xl min-h-[44px]
         bg-gradient-to-r from-green-500 to-emerald-500 text-white border-transparent shadow-md
         hover:shadow-lg transform hover:-translate-y-0.5
         transition-all duration-200
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2
         montserrat-semibold md:px-6 md:text-base"
>
	Available
</button>
```

### Icon-Only Button

```html
<button
	class="inline-flex items-center justify-center rounded-lg
         border border-gray-300 bg-white/80 hover:bg-gray-50
         min-h-[44px] min-w-[44px] text-gray-700
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
         transition-all duration-200"
	aria-label="Menu"
>
	<menu class="size-5" />
</button>
```

### Text/Link Button

```html
<button
	class="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium
         text-blue-600 hover:text-blue-700 hover:bg-blue-50
         rounded-lg transition-all duration-200 min-h-[44px]
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
         montserrat-medium md:px-4 md:text-base"
>
	<ArrowLeft class="size-4 md:size-5" />
	<span>Go Back</span>
</button>
```

### Danger Button

```html
<button
	class="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium
         rounded-lg min-h-[44px]
         text-red-600 hover:text-red-700 hover:bg-red-50
         transition-all duration-200
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2
         montserrat-medium md:text-base"
>
	<RotateCcw class="size-4" />
	<span>Clear Filters</span>
</button>
```

---

## 📦 Cards

### Glass Card (Standard)

```html
<div
	class="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 p-6 md:p-8"
>
	<h2 class="text-xl font-semibold montserrat-semibold text-gray-900 mb-4">Card Title</h2>
	<p class="text-gray-600">Card content goes here.</p>
</div>
```

### Interactive Glass Card

```html
<div
	class="group cursor-pointer
         bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200/50 p-6
         hover:shadow-xl hover:-translate-y-1
         transition-all duration-300
         focus-within:ring-2 focus-within:ring-blue-500"
	tabindex="0"
	role="button"
>
	<h3 class="text-lg font-semibold text-gray-900 mb-2">Interactive Card</h3>
	<p class="text-gray-600">Click me!</p>
</div>
```

### Artwork Card Pattern

```html
<div
	class="group cursor-pointer rounded-xl overflow-hidden
         shadow-lg shadow-stone-800/20
         hover:shadow-xl hover:shadow-stone-900/40
         transition-all duration-300 hover:-translate-y-1
         bg-white"
>
	<!-- Image -->
	<div class="relative">
		<img
			src="/image.webp"
			alt="Artwork title"
			class="w-full h-auto transition-transform duration-300 group-hover:scale-105"
		/>
		<!-- Hover overlay -->
		<div
			class="absolute inset-0 pointer-events-none
             bg-black/0 group-hover:bg-black/30
             transition-all duration-300
             flex items-center justify-center"
		>
			<Eye
				class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
			/>
		</div>
	</div>
	<!-- Title -->
	<div class="px-3 py-2 border-t border-gray-200/50">
		<h3 class="font-semibold text-gray-900 text-sm text-center">Artwork Title</h3>
	</div>
</div>
```

### Success/Info Card

```html
<!-- Success -->
<div class="bg-green-50 border border-green-200 rounded-xl p-4 md:p-6">
	<h3 class="text-base md:text-lg font-semibold montserrat-semibold text-green-800 mb-2">
		Success!
	</h3>
	<p class="text-green-700 text-xs md:text-sm">Your action was successful.</p>
</div>

<!-- Info -->
<div class="bg-blue-50 border border-blue-200 rounded-xl p-4 md:p-6">
	<h3 class="text-base md:text-lg font-semibold montserrat-semibold text-blue-800 mb-2">
		Information
	</h3>
	<p class="text-blue-700 text-xs md:text-sm">Here's some helpful information.</p>
</div>
```

---

## 📝 Forms

### Text Input

```html
<div>
	<label for="name" class="block text-sm font-medium text-gray-700 montserrat-medium mb-2">
		Name
	</label>
	<input
		type="text"
		id="name"
		class="w-full bg-white border border-gray-200 rounded-lg px-4 py-3
           focus:ring-2 focus:ring-blue-500 focus:border-blue-500
           transition-all duration-200 montserrat-medium"
		placeholder="Enter your name"
	/>
</div>
```

### Text Input with Error

```html
<div>
	<label for="email" class="block text-sm font-medium text-gray-700 montserrat-medium mb-2">
		Email
	</label>
	<input
		type="email"
		id="email"
		class="w-full bg-white border border-red-500 rounded-lg px-4 py-3
           focus:ring-2 focus:ring-red-500 focus:border-red-500
           transition-all duration-200 montserrat-medium"
		placeholder="Enter your email"
	/>
	<p class="mt-1 text-sm text-red-600 montserrat-medium">Please enter a valid email address.</p>
</div>
```

### Textarea

```html
<div>
	<label for="message" class="block text-sm font-medium text-gray-700 montserrat-medium mb-2">
		Message
	</label>
	<textarea
		id="message"
		rows="6"
		class="w-full bg-white border border-gray-200 rounded-lg px-4 py-3
           focus:ring-2 focus:ring-blue-500 focus:border-blue-500
           transition-all duration-200 resize-vertical montserrat-medium"
		placeholder="Enter your message..."
	></textarea>
</div>
```

---

## 📋 Dropdowns (Bits UI Select)

### Select Component (Complete Example)

```html
<script lang="ts">
	import { Select } from 'bits-ui';
	import { Languages, Check } from 'lucide-svelte';

	const options = [
		{ value: 'option1', label: 'Option 1' },
		{ value: 'option2', label: 'Option 2' },
		{ value: 'option3', label: 'Option 3' }
	];

	let selectedValue = $state('option1');
</script>

<div class="relative">
	<Select.Root type="single" value="{selectedValue}" onValueChange="{(value)" ="">
		{ selectedValue = value }} items={options} >
		<Select.Trigger
			class="inline-flex items-center justify-center rounded-lg
             border border-gray-300 bg-white/80 hover:bg-gray-50
             px-4 py-2.5 text-sm font-medium text-gray-700
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
             transition-all duration-200 min-h-[44px] min-w-[44px]"
			aria-label="Select option"
		>
			<Languages class="size-5" />
		</Select.Trigger>

		<Select.Content
			class="absolute right-0 mt-2 w-48 rounded-lg
             border border-gray-200 bg-white/95 backdrop-blur-md shadow-lg
             z-50 max-h-80 overflow-y-auto p-2"
		>
			<div class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2 py-1">
				Select an option
			</div>

			{#each options as option (option.value)}
			<Select.Item
				value="{option.value}"
				class="flex items-center gap-3 px-3 py-2.5 text-sm
                 hover:bg-gray-50 text-left rounded cursor-pointer
                 focus:bg-gray-50 focus:outline-none
                 data-[highlighted]:bg-gray-50"
			>
				{#snippet children({ selected })}
				<span class="flex-1">{option.label}</span>
				{#if selected}
				<Check class="size-4 text-blue-600" />
				{/if} {/snippet}
			</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
</div>
```

---

## 🎚️ Collapsibles (Bits UI)

### Basic Collapsible

```html
<script lang="ts">
	import { Collapsible } from 'bits-ui';
	import { ChevronDown } from 'lucide-svelte';

	let isOpen = $state(false);
</script>

<Collapsible.Root bind:open="{isOpen}">
	<!-- Trigger -->
	<button onclick="{()" ="">
		(isOpen = !isOpen)} class="w-full flex items-center justify-between px-4 py-3 text-sm
		font-medium rounded-lg border-2 transition-all duration-200 focus-visible:outline-none
		focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 min-h-[44px]
		montserrat-medium {isOpen ? 'bg-blue-50 text-blue-900 border-blue-300' : 'bg-white text-gray-700
		border-gray-300 hover:bg-gray-50'} md:text-base" aria-label="Toggle section"
		aria-expanded={isOpen} >
		<span>Section Title</span>
		<ChevronDown class="size-5 transition-transform duration-200 {isOpen ? 'rotate-180' : ''}" />
	</button>

	<!-- Content -->
	<Collapsible.Content
		class="data-[state=open]:animate-collapsible-down
           data-[state=closed]:animate-collapsible-up
           overflow-hidden"
	>
		<div class="mt-3 p-4 bg-white/80 backdrop-blur-xl rounded-xl border border-gray-200/50">
			<p>Collapsible content goes here.</p>
		</div>
	</Collapsible.Content>
</Collapsible.Root>
```

---

## 🔘 Toggle Groups (Bits UI)

### Multiple Selection (Checkboxes)

```html
<script lang="ts">
	import { ToggleGroup } from 'bits-ui';

	const categories = ['Category 1', 'Category 2', 'Category 3'];
	let selectedCategories = $state<string[]>([]);
</script>

<ToggleGroup.Root type="multiple" value="{selectedCategories}" onValueChange="{(value)" ="">
	{ selectedCategories = value }} class="space-y-2" > {#each categories as category (category)}
	<ToggleGroup.Item
		value="{category}"
		class="w-full flex items-center justify-between gap-3 px-4 py-3 text-sm font-medium
             rounded-lg border transition-all duration-200
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1
             min-h-[44px] montserrat-medium
             data-[state=on]:bg-gradient-to-r data-[state=on]:from-blue-600 data-[state=on]:to-indigo-600
             data-[state=on]:text-white data-[state=on]:border-transparent data-[state=on]:shadow-md
             hover:data-[state=on]:shadow-lg data-[state=on]:transform data-[state=on]:hover:-translate-y-0.5
             data-[state=off]:bg-white data-[state=off]:text-gray-700 data-[state=off]:border-gray-300
             data-[state=off]:hover:bg-gray-50
             md:text-base"
	>
		<span>{category}</span>
		<span class="text-xs opacity-75">(12)</span>
	</ToggleGroup.Item>
	{/each}
</ToggleGroup.Root>
```

### Single Selection (Radio)

```html
<script lang="ts">
	import { ToggleGroup } from 'bits-ui';

	const sortOptions = [
		{ value: 'name-asc', label: 'Name (A-Z)' },
		{ value: 'name-desc', label: 'Name (Z-A)' },
		{ value: 'date', label: 'Date' }
	];
	let sortBy = $state('name-asc');
</script>

<ToggleGroup.Root type="single" value="{sortBy}" onValueChange="{(value)" ="">
	{ if (value) sortBy = value }} class="space-y-2" > {#each sortOptions as option (option.value)}
	<ToggleGroup.Item
		value="{option.value}"
		class="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium
             rounded-lg border transition-all duration-200
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1
             min-h-[44px] montserrat-medium
             data-[state=on]:bg-gradient-to-r data-[state=on]:from-blue-600 data-[state=on]:to-indigo-600
             data-[state=on]:text-white data-[state=on]:border-transparent data-[state=on]:shadow-md
             hover:data-[state=on]:shadow-lg data-[state=on]:transform data-[state=on]:hover:-translate-y-0.5
             data-[state=off]:bg-white data-[state=off]:text-gray-700 data-[state=off]:border-gray-300
             data-[state=off]:hover:bg-gray-50
             md:text-base"
	>
		<span>{option.label}</span>
	</ToggleGroup.Item>
	{/each}
</ToggleGroup.Root>
```

---

## 🏷️ Badges & Tags

### Category Tag

```html
<span
	class="inline-flex items-center px-2 md:px-3 py-1 rounded-full
             text-xs md:text-sm font-medium
             bg-blue-100 text-blue-800"
>
	Category
</span>
```

### Color Variants

```html
<!-- Blue (Info/Default) -->
<span class="bg-blue-100 text-blue-800">Info</span>

<!-- Green (Success) -->
<span class="bg-green-100 text-green-800">Success</span>

<!-- Yellow (Warning) -->
<span class="bg-yellow-100 text-yellow-800">Warning</span>

<!-- Red (Error) -->
<span class="bg-red-100 text-red-800">Error</span>
```

### Count Badge

```html
<span
	class="inline-flex items-center justify-center
             min-w-[20px] h-5 px-1.5 rounded-full
             text-xs font-semibold montserrat-semibold
             bg-blue-600 text-white"
>
	3
</span>
```

### Status Indicator (Animated Green Dot)

```html
<span
	class="relative w-3 h-3 bg-green-600 rounded-full flex-shrink-0 animate-pulse"
	aria-label="Available"
>
	<!-- Animated glow ring -->
	<span class="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-90"></span>
</span>
```

### Sold Badge

```html
<div
	class="absolute top-4 right-4
            bg-red-500 text-white px-3 py-1 rounded-full
            text-sm font-semibold"
>
	Sold
</div>
```

---

## 🗨️ Modals (Bits UI AlertDialog)

### Complete Modal Example

```html
<script lang="ts">
	import { AlertDialog } from 'bits-ui';

	let showModal = $state(false);

	function handleConfirm() {
		// Handle confirmation
		showModal = false;
	}
</script>

<AlertDialog.Root bind:open="{showModal}">
	<AlertDialog.Portal>
		<!-- Overlay -->
		<AlertDialog.Overlay
			class="fixed inset-0 z-50 bg-black/80
             data-[state=open]:animate-in data-[state=closed]:animate-out
             data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
		/>

		<!-- Content -->
		<AlertDialog.Content
			class="fixed left-[50%] top-[50%] z-50
             grid w-full max-w-md translate-x-[-50%] translate-y-[-50%]
             gap-4 border bg-white p-6 shadow-lg duration-200
             data-[state=open]:animate-in data-[state=closed]:animate-out
             data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
             data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
             sm:rounded-lg"
		>
			<!-- Title -->
			<AlertDialog.Title class="text-lg font-semibold text-gray-900 montserrat-semibold">
				Confirm Action
			</AlertDialog.Title>

			<!-- Description -->
			<AlertDialog.Description class="text-sm text-gray-600 montserrat-medium">
				Are you sure you want to proceed? This action cannot be undone.
			</AlertDialog.Description>

			<!-- Actions -->
			<div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
				<!-- Cancel -->
				<AlertDialog.Cancel
					class="mt-2 inline-flex h-10 items-center justify-center rounded-md
                 border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900
                 ring-offset-white transition-colors hover:bg-gray-100
                 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2
                 disabled:cursor-not-allowed disabled:opacity-50 sm:mt-0 montserrat-medium"
				>
					Cancel
				</AlertDialog.Cancel>

				<!-- Confirm -->
				<AlertDialog.Action
					onclick="{handleConfirm}"
					class="inline-flex h-10 items-center justify-center rounded-md
                 bg-blue-600 px-4 py-2 text-sm font-medium text-white
                 ring-offset-white transition-colors hover:bg-blue-700
                 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2
                 disabled:cursor-not-allowed disabled:opacity-50 montserrat-medium"
				>
					Confirm
				</AlertDialog.Action>
			</div>
		</AlertDialog.Content>
	</AlertDialog.Portal>
</AlertDialog.Root>
```

---

## 📊 Progress Bar

```html
<script lang="ts">
import { Progress } from 'bits-ui';

let progress = $state(45);
</script>

<div class="mb-4">
  <!-- Label -->
  <div class="flex justify-between text-sm text-gray-600 mb-2 montserrat-medium">
    <span>Loading...</span>
    <span>{progress}%</span>
  </div>

  <!-- Progress Bar -->
  <Progress.Root
    value={progress}
    max={100}
    class="w-full h-2 bg-gray-200 rounded-full overflow-hidden relative"
    aria-labelledby="progress-label"
  >
    <div
      class="h-full bg-gradient-to-r from-blue-500 to-indigo-500
             transition-all duration-300 ease-out rounded-full"
      style={`transform: translateX(-${100 - (100 * progress) / 100}%)`}
    ></div>
  </Progress.Root>
</div>
```

---

## 🎨 Icon Containers

### Standard Icon Container (Large)

```html
<div
	class="flex-shrink-0 w-12 h-12
            bg-gradient-to-r from-blue-500 to-indigo-600
            rounded-xl flex items-center justify-center
            group-hover:scale-110 transition-transform duration-300"
>
	<Mail class="w-6 h-6 text-white" />
</div>
```

### Color Variants

```html
<!-- Blue/Indigo (Default) -->
<div class="bg-gradient-to-r from-blue-500 to-indigo-600">
	<Icon class="w-6 h-6 text-white" />
</div>

<!-- Green (Phone, WhatsApp) -->
<div class="bg-gradient-to-r from-green-500 to-green-600">
	<Phone class="w-6 h-6 text-white" />
</div>

<!-- Pink (Instagram) -->
<div class="bg-gradient-to-r from-pink-500 to-pink-600">
	<Instagram class="w-6 h-6 text-white" />
</div>

<!-- Red (Error, Delete) -->
<div class="bg-gradient-to-r from-red-600 to-red-700">
	<Trash class="w-6 h-6 text-white" />
</div>
```

### Size Variants

```html
<!-- Small (32px) -->
<div
	class="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center"
>
	<Icon class="w-4 h-4 text-white" />
</div>

<!-- Medium (40px) -->
<div
	class="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center"
>
	<Icon class="w-5 h-5 text-white" />
</div>

<!-- Large (48px - Standard) -->
<div
	class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center"
>
	<Icon class="w-6 h-6 text-white" />
</div>
```

---

## 🧭 Navigation

### Sticky Header

```html
<header
	class="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm"
>
	<div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
		<div class="flex items-center justify-between gap-3 py-3 md:gap-4 md:py-4 lg:gap-6 lg:py-6">
			<!-- Header content -->
			<h1 class="text-lg md:text-xl lg:text-2xl font-semibold">Site Title</h1>
			<nav><!-- Navigation items --></nav>
		</div>
	</div>
</header>
```

### Navigation Link (Active/Inactive)

```html
<a
  href="/page"
  class="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
         flex items-center gap-2
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
         min-h-[44px] min-w-[44px]
         {isActive
           ? 'text-blue-600 bg-blue-50'
           : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}"
  aria-label="Page name"
  aria-current={isActive ? 'page' : undefined}
>
  <Home class="size-4" />
  <span class="hidden lg:inline">Home</span>
</a>
```

### Back Button

```html
<button
	onclick="{goBack}"
	class="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium montserrat-medium
         text-blue-600 hover:text-blue-700 hover:bg-blue-50
         rounded-lg transition-all duration-200 min-h-[44px]
         md:px-4 md:text-base"
	aria-label="Go back"
>
	<ArrowLeft class="w-4 h-4 md:w-5 md:h-5" />
	<span>Go Back</span>
</button>
```

### Scroll to Top Button

```html
<button
	onclick="{scrollToTop}"
	aria-label="Scroll to top"
	class="fixed bottom-4 right-4 z-50
         bg-gradient-to-r from-blue-600 to-indigo-600
         hover:from-blue-700 hover:to-indigo-700
         text-white rounded-full p-3 shadow-lg hover:shadow-2xl
         transition-all duration-300 transform hover:-translate-y-1
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
         min-h-[48px] min-w-[48px] flex items-center justify-center
         group
         {showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}"
>
	<ArrowUp class="size-5 group-hover:scale-110 transition-transform duration-300" />
</button>
```

---

## 🎭 Loading States

### Spinner

```html
<div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
```

### Spinner in Button

```html
<button class="px-6 py-3 bg-blue-600 text-white rounded-xl flex items-center gap-2" disabled>
	<div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
	<span>Loading...</span>
</button>
```

### Skeleton Loader

```html
<div class="animate-pulse bg-gray-200 rounded h-4 w-full"></div>
```

---

## 📐 Layout Patterns

### Page Container (Safe Padding)

```html
<main class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 sm:py-12 lg:py-16">
	<!-- Page content -->
</main>
```

### Card Grid (Responsive)

```html
<div
	class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
            gap-4 md:gap-6 lg:gap-8 w-full"
>
	<!-- Grid items -->
</div>
```

### Two Column Layout

```html
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 w-full">
	<!-- Left column -->
	<div>Content 1</div>

	<!-- Right column -->
	<div>Content 2</div>
</div>
```

### Section with Vertical Spacing

```html
<div class="space-y-4 md:space-y-6 lg:space-y-8">
	<div>Section 1</div>
	<div>Section 2</div>
	<div>Section 3</div>
</div>
```

---

## ✅ Component Checklist

Before using any component, verify:

- ✅ Mobile-first responsive classes (start with base, add `md:`, `lg:`)
- ✅ Touch-friendly sizing (`min-h-[44px] min-w-[44px]`)
- ✅ Focus states (`focus-visible:ring-2`)
- ✅ Proper ARIA labels (`aria-label`, `aria-current`, `aria-expanded`)
- ✅ Smooth transitions (`transition-all duration-200`)
- ✅ Montserrat font weights (`montserrat-medium`, `montserrat-semibold`, `montserrat-bold`)
- ✅ Consistent borders, shadows, and spacing
- ✅ Keyboard navigation support

---

## 📚 Related Documentation

- **Complete Design System**: `docs/tailwind-color-and-style-guide.md`
- **Responsive Guide**: `docs/tailwind-responsive-guide.md`
- **Svelte 5 Patterns**: `docs/svelte5classesparadigm.md`

---

_Last Updated: Design System Consolidation 2025 - All patterns verified against production codebase_
