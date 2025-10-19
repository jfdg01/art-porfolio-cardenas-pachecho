# Portal Artistas - Complete Design System Guide

## 🎨 Design Philosophy

Modern, accessible, and consistent design with **glass morphism**, **gradient accents**, and **smooth animations**. Built for artistic excellence with a mobile-first approach.

## 🎯 Core Principles

- **Mobile-First**: Start with mobile design (320px+), enhance progressively for larger screens
- **Glass Morphism**: Semi-transparent backgrounds with backdrop blur
- **Gradient Accents**: Blue to indigo gradients for primary actions
- **Smooth Animations**: 200-300ms transitions with hover effects
- **Touch-Friendly**: 44px minimum touch targets for all interactive elements
- **Accessibility**: High contrast, clear visual hierarchy, keyboard navigation
- **Consistency**: Standardized design tokens across all components

---

## 🔧 Design Tokens

### Border Radius System

Consistent corner rounding for visual hierarchy:

```css
/* Small Elements (badges, tags, inputs) */
.rounded-lg /* 8px - badges, inputs, small buttons */

/* Medium Elements (buttons, cards, most UI) */
.rounded-xl /* 12px - buttons, cards, icon containers */

/* Large Containers (modals, page cards) */
.rounded-2xl /* 16px - large cards, modals, main containers */

/* Circular Elements (icons, dots, avatars) */
.rounded-full /* Perfect circles - icon buttons, status indicators */
```

**Usage Guidelines:**

- Use `rounded-lg` for compact elements and form inputs
- Use `rounded-xl` for most interactive elements and cards
- Use `rounded-2xl` for large page-level containers
- Use `rounded-full` for icons, avatars, and status indicators

### Shadow Hierarchy

Progressive depth for visual elevation:

```css
/* Subtle Shadow - Minimal elevation */
.shadow-md /* For subtle separation, disabled states */

/* Resting State - Standard elevation */
.shadow-lg /* Default for cards, dropdowns, modals */

/* Hover State - Enhanced elevation */
.shadow-xl /* Hover state for interactive cards */

/* Active/Focus State - Maximum elevation */
.shadow-2xl /* Active states, elevated modals, important highlights */

/* Context-specific Shadows */
.shadow-lg.shadow-stone-800/20 /* Artwork cards at rest */
.shadow-xl.shadow-stone-900/40 /* Artwork cards on hover */
```

**Usage Guidelines:**

- Start with `shadow-lg` for resting states
- Transition to `shadow-xl` on hover for interactive elements
- Use `shadow-2xl` for dialogs and important elevated content
- Add color/opacity modifiers for context-specific shadows

### Spacing Scale (Mobile-First)

Consistent spacing progression across breakpoints:

```css
/* Mobile (320px+) - Compact */
p-3 gap-3 space-y-3 /* Tight spacing for small screens */
p-4 gap-4 space-y-4 /* Standard mobile spacing */

/* Tablet (768px+) - Enhanced */
md:p-6 md:gap-6 md:space-y-6 /* Comfortable spacing */

/* Desktop (1024px+) - Spacious */
lg:p-8 lg:gap-8 lg:space-y-8 /* Generous spacing */

/* Large Desktop (1280px+) - Premium */
xl:p-10 xl:gap-10 xl:space-y-10 /* Maximum spacing (use cautiously) */
```

**Usage Guidelines:**

- Start with `p-4`/`gap-4` for mobile base
- Scale up progressively with breakpoints
- Avoid jumping more than 2 units between breakpoints
- Use `p-3`/`gap-3` only for very compact mobile UIs

### Border Standards

Consistent border styling for different contexts:

```css
/* Glass Morphism Borders (primary style) */
.border.border-gray-200/50 /* Semi-transparent for glass effect */

/* Standard Borders (solid backgrounds) */
.border.border-gray-200 /* Clean, subtle separation */

/* Interactive Borders (emphasis) */
.border-2.border-gray-300 /* Thicker for form inputs, buttons */

/* Focus/Active Borders */
.border-2.border-blue-500 /* Blue for focus states */
.border-2.border-blue-300 /* Lighter blue for hover pre-focus */

/* Error Borders */
.border-2.border-red-500 /* Error states in forms */

/* Success Borders */
.border-2.border-green-500 /* Success/confirmation states */
```

**Usage Guidelines:**

- Use `border-gray-200/50` with glass morphism (`bg-white/80`)
- Use `border-gray-200` with solid backgrounds (`bg-white`)
- Use `border-2` for interactive elements requiring emphasis
- Always provide focus states with `focus:ring-2` and `focus-visible:ring-2`

### Icon Sizing

Standardized icon dimensions for consistency:

```css
/* Inline Icons (within text/labels) */
.size-4 /* 16px - tight inline, badges */
.size-5 /* 20px - standard inline, buttons */

/* Icon Buttons (clickable icons) */
.size-5 /* 20px - compact icon buttons */
.size-6 /* 24px - standard icon buttons */

/* Icon Containers (decorative backgrounds) */
.w-8.h-8 /* 32px - small icon containers */
.w-10.h-10 /* 40px - medium icon containers */
.w-12.h-12 /* 48px - large icon containers (most common) */

/* Hero/Display Icons */
.w-16.h-16 /* 64px - hero sections */
.w-20.h-20 /* 80px - large hero icons */
.w-24.h-24 /* 96px - extra large display */
```

**Usage Guidelines:**

- Use `size-5` for icons in buttons and labels
- Use `w-12 h-12` for icon containers (ContactCard, etc.)
- Scale icon and container together (e.g., `size-6` icon in `w-12 h-12` container)
- Always maintain aspect ratio with `w-X h-X` pattern

### Z-Index Hierarchy

Layering system for overlays and fixed elements:

```css
/* Base Content */
.z-0 /* Default layer */

/* Sticky Elements */
.z-40 /* Sticky sidebars, filters */

/* Fixed Navigation */
.z-50 /* Sticky header, scroll-to-top button */

/* Dropdowns/Popovers */
.z-50 /* Select dropdowns, tooltips */

/* Modal Overlays */
.z-50 /* Modal backdrops */

/* Modal Content */
.z-50 /* Modal panels (same as overlay, positioned above via DOM order) */
```

**Usage Guidelines:**

- Use `z-40` for sticky in-page elements
- Use `z-50` for navigation and overlays
- Avoid arbitrary z-index values
- Rely on DOM order when elements share z-index

---

## 🎨 Color Palette

### Primary Colors (Brand)

```css
/* Blue-Indigo Gradient (Primary Actions) */
bg-gradient-to-r from-blue-600 to-indigo-600 /* Standard */
bg-gradient-to-r from-blue-500 to-indigo-500 /* Lighter variant */
bg-gradient-to-r from-blue-700 to-indigo-700 /* Darker variant */

/* Hover States */
hover:from-blue-700 hover:to-indigo-700 /* Darken on hover */

/* Focus States */
focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
```

### Success/Active Colors

```css
/* Green Gradient (Active, Available, Success) */
bg-gradient-to-r from-green-500 to-emerald-500 /* Active toggle */
bg-gradient-to-r from-green-500 to-green-600 /* Icon containers */

/* Solid Success Colors */
bg-green-50 border-green-200 text-green-800 /* Success messages */
bg-green-600 /* Status dots */
```

### Semantic Colors

```css
/* Info (Blue) */
bg-blue-50 border-blue-200 text-blue-800
bg-blue-100 text-blue-800 /* Badges */

/* Success (Green) */
bg-green-50 border-green-200 text-green-800
text-green-600 /* Links, status */

/* Warning (Yellow) */
bg-yellow-50 border-yellow-200 text-yellow-800

/* Error (Red) */
bg-red-50 border-red-200 text-red-800
border-red-500 /* Form errors */
bg-red-500 text-white /* Error badges */

/* Social Media Colors */
bg-gradient-to-r from-pink-500 to-pink-600 /* Instagram */
```

### Neutral Colors

```css
/* Backgrounds */
bg-white /* Solid backgrounds */
bg-white/80 backdrop-blur-xl /* Glass morphism (primary) */
bg-white/95 backdrop-blur-md /* Glass morphism (dropdowns) */
bg-gray-50 /* Subtle background sections */
bg-gray-100 /* Secondary buttons */

/* Borders */
border-gray-200/50 /* Glass morphism borders */
border-gray-200 /* Standard borders */
border-gray-300 /* Interactive borders */

/* Text */
text-gray-900 /* Primary text (headings, important) */
text-gray-700 /* Secondary text (body, labels) */
text-gray-600 /* Tertiary text (descriptions, metadata) */
text-gray-500 /* Disabled text, placeholders */

/* Gradients for Text */
bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent
```

---

## 📝 Typography

### Font Family

All text uses **Montserrat** with specific weight utilities:

```css
.montserrat-thin {
	font-weight: 100;
}
.montserrat-light {
	font-weight: 300;
}
.montserrat-regular {
	font-weight: 400;
}
.montserrat-medium {
	font-weight: 500;
} /* Body text, labels */
.montserrat-semibold {
	font-weight: 600;
} /* Subheadings, buttons */
.montserrat-bold {
	font-weight: 700;
} /* Headings */
.montserrat-black {
	font-weight: 900;
} /* Hero text */
```

### Text Hierarchy (Mobile-First)

```css
/* Page Titles (H1) */
text-xl font-bold montserrat-bold /* Mobile: 320px+ */
md:text-2xl lg:text-3xl /* Tablet/Desktop: 768px+ */
xl:text-4xl /* Large Desktop: 1280px+ */

/* Example: Contact Page Title */
text-2xl sm:text-3xl lg:text-4xl font-bold montserrat-bold

/* Section Titles (H2) */
text-lg font-bold montserrat-bold /* Mobile */
md:text-xl lg:text-2xl /* Tablet/Desktop */
xl:text-3xl /* Large Desktop */

/* Example: "Online Classes" title */
text-3xl sm:text-4xl lg:text-5xl font-bold montserrat-bold

/* Subsection Titles (H3) */
text-base font-semibold montserrat-semibold /* Mobile */
md:text-lg lg:text-xl /* Tablet/Desktop */

/* Small Headings (H4) */
text-sm font-semibold montserrat-semibold /* Mobile */
md:text-base lg:text-lg /* Tablet/Desktop */

/* Body Text */
text-sm font-medium montserrat-medium /* Mobile standard */
text-base font-medium montserrat-medium /* Desktop standard */
md:text-base lg:text-lg /* Larger body text */

/* Small Text (metadata, labels) */
text-xs font-medium montserrat-medium /* Mobile */
md:text-sm /* Tablet+ */

/* Gradient Text (Hero titles) */
bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent
```

**Usage Guidelines:**

- Use `montserrat-bold` for H1/H2 headings
- Use `montserrat-semibold` for H3/H4, buttons, emphasized text
- Use `montserrat-medium` for body text, labels, standard UI
- Always start mobile-first, scale up with breakpoints
- Maintain readable line heights with `leading-relaxed` for body text

---

## 🎯 Component Patterns

### Buttons

#### 1. Primary Button (Gradient)

**Usage:** Main CTAs, form submits, primary actions

```html
<button
	class="px-4 py-3 text-sm font-semibold rounded-xl min-h-[44px] min-w-[44px]
bg-gradient-to-r from-blue-600 to-indigo-600 text-white
hover:from-blue-700 hover:to-indigo-700
transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
         disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
         montserrat-semibold
         md:px-6 md:text-base"
>
	Primary Action
</button>
```

**Variants:**

- Icon + Text: Add `flex items-center justify-center gap-2`
- Full Width: Add `w-full`
- Large: Use `py-4 px-8 text-base md:text-lg`

#### 2. Secondary Button (Gray)

**Usage:** Secondary actions, cancel buttons, less emphasis

```html
<button
	class="px-4 py-3 text-sm font-medium rounded-xl min-h-[44px] min-w-[44px]
bg-gray-100 hover:bg-gray-200 text-gray-700
transition-all duration-200 hover:shadow-md
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
         montserrat-medium
         md:px-6 md:text-base"
>
	Secondary Action
</button>
```

#### 3. Active/Success Button (Green Gradient)

**Usage:** Active states, available items, success confirmations

```html
<button
	class="px-4 py-3 text-sm font-semibold rounded-xl min-h-[44px] min-w-[44px]
         bg-gradient-to-r from-green-500 to-emerald-500 text-white border-transparent shadow-md
         hover:shadow-lg transform hover:-translate-y-0.5
         transition-all duration-200
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2
         montserrat-semibold
         md:px-6 md:text-base"
>
	Active / Available
</button>
```

#### 4. Icon-Only Button

**Usage:** Language selector, menu toggle, icon actions

```html
<button
	class="inline-flex items-center justify-center rounded-lg
         border border-gray-300 bg-white/80 hover:bg-gray-50
         min-h-[44px] min-w-[44px] text-gray-700
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
         transition-all duration-200"
	aria-label="Button description"
>
	<IconComponent class="size-5" />
</button>
```

#### 5. Text/Link Button

**Usage:** Navigation items, back buttons, inline actions

```html
<button
	class="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium
         text-blue-600 hover:text-blue-700 hover:bg-blue-50
         rounded-lg transition-all duration-200 min-h-[44px]
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
         montserrat-medium
         md:px-4 md:text-base"
>
	<Icon class="size-4 md:size-5" />
	<span>Text Action</span>
</button>
```

#### 6. Danger Button

**Usage:** Delete, remove, destructive actions

```html
<button
	class="px-4 py-3 text-sm font-medium rounded-lg min-h-[44px]
         text-red-600 hover:text-red-700 hover:bg-red-50
         transition-all duration-200
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2
         montserrat-medium
         md:text-base"
>
	<RotateCcw class="size-4" />
	<span>Clear Filters</span>
</button>
```

**Button Guidelines:**

- Always include `min-h-[44px]` for touch targets
- Always include `focus-visible:ring-2` for accessibility
- Use `disabled:opacity-50 disabled:cursor-not-allowed` for disabled states
- Add `aria-label` for icon-only buttons
- Use `montserrat-semibold` for primary, `montserrat-medium` for secondary

---

### Cards

#### 1. Glass Card (Primary)

**Usage:** Main content cards, contact cards, artwork containers

```html
<div
	class="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 p-6 md:p-8"
>
	<!-- Card content -->
</div>
```

**With Hover Effect:**

```html
<div
	class="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 p-6 md:p-8
            hover:shadow-xl transition-all duration-300"
>
	<!-- Card content -->
</div>
```

#### 2. Solid Card (Alternative)

**Usage:** Form sections, secondary containers

```html
<div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8">
	<!-- Card content -->
</div>
```

#### 3. Interactive Card (Clickable)

**Usage:** Artwork cards, navigation cards, list items

```html
<div
	class="group cursor-pointer
            bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200/50
            hover:shadow-xl hover:-translate-y-1
            transition-all duration-300
            focus-within:ring-2 focus-within:ring-blue-500"
	tabindex="0"
	role="button"
>
	<!-- Card content with group-hover effects -->
</div>
```

**Example: Artwork Card Pattern**

```html
<div
	class="artwork-card group cursor-pointer
            rounded-xl overflow-hidden shadow-lg shadow-stone-800/20
            hover:shadow-xl hover:shadow-stone-900/40
            transition-all duration-300 hover:-translate-y-1
            bg-white"
>
	<!-- Image -->
	<div class="relative">
		<img src="..." class="w-full h-auto transition-transform duration-300 group-hover:scale-105" />
		<!-- Hover overlay -->
		<div
			class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300
                flex items-center justify-center"
		>
			<Eye
				class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
			/>
		</div>
	</div>
	<!-- Title -->
	<div class="px-3 py-2 border-t border-gray-200/50">
		<h3 class="font-semibold text-gray-900 text-sm">Artwork Title</h3>
	</div>
</div>
```

#### 4. Colored Accent Cards

**Usage:** Status messages, alerts, highlighted content

```html
<!-- Success Card -->
<div class="bg-green-50 border border-green-200 rounded-xl p-4 md:p-6">
	<h3 class="text-base md:text-lg font-semibold montserrat-semibold text-green-800 mb-2">
		Success Title
	</h3>
	<p class="text-green-700 text-xs md:text-sm">Success message content</p>
</div>

<!-- Info Card -->
<div class="bg-blue-50 border border-blue-200 rounded-xl p-4 md:p-6">
	<h3 class="text-base md:text-lg font-semibold montserrat-semibold text-blue-800 mb-2">
		Info Title
	</h3>
	<p class="text-blue-700 text-xs md:text-sm">Info message content</p>
</div>

<!-- Error Card -->
<div class="bg-red-50 border border-red-200 rounded-xl p-4 md:p-6">
	<h3 class="text-base md:text-lg font-semibold montserrat-semibold text-red-800 mb-2">
		Error Title
	</h3>
	<p class="text-red-700 text-xs md:text-sm">Error message content</p>
</div>
```

**Card Guidelines:**

- Use `rounded-2xl` for large cards, `rounded-xl` for standard cards
- Always use `p-6 md:p-8` for comfortable padding
- Add `overflow-hidden` when cards contain images
- Use `group` class for coordinated hover effects
- Include `focus-within:ring-2` for keyboard accessibility

---

### Form Elements

#### 1. Text Input

```html
<div>
	<label for="input-id" class="block text-sm font-medium text-gray-700 montserrat-medium mb-2">
		Label Text
	</label>
	<input
		type="text"
		id="input-id"
		class="w-full bg-white border border-gray-200 rounded-lg px-4 py-3
           focus:ring-2 focus:ring-blue-500 focus:border-blue-500
           transition-all duration-200 montserrat-medium"
		placeholder="Placeholder text"
	/>
</div>
```

**With Error State:**

```html
<div>
	<label for="input-id" class="block text-sm font-medium text-gray-700 montserrat-medium mb-2">
		Label Text
	</label>
	<input
		type="text"
		id="input-id"
		class="w-full bg-white border border-red-500 rounded-lg px-4 py-3
           focus:ring-2 focus:ring-red-500 focus:border-red-500
           transition-all duration-200 montserrat-medium"
		placeholder="Placeholder text"
	/>
	<p class="mt-1 text-sm text-red-600 montserrat-medium">Error message here</p>
</div>
```

#### 2. Textarea

```html
<div>
	<label for="textarea-id" class="block text-sm font-medium text-gray-700 montserrat-medium mb-2">
		Message
	</label>
	<textarea
		id="textarea-id"
		rows="6"
		class="w-full bg-white border border-gray-200 rounded-lg px-4 py-3
           focus:ring-2 focus:ring-blue-500 focus:border-blue-500
           transition-all duration-200 resize-vertical montserrat-medium"
		placeholder="Enter your message..."
	></textarea>
</div>
```

**Form Element Guidelines:**

- Always pair inputs with labels using `for` and `id`
- Use `w-full` for inputs to fill container
- Include `transition-all duration-200` for smooth focus states
- Add `montserrat-medium` for consistent typography
- Use `border-gray-200` for default, `border-red-500` for errors
- Include descriptive error messages below inputs

---

### Dropdowns/Selects (Bits UI)

#### Select Trigger Button

```html
<Select.Trigger
	class="inline-flex items-center justify-center rounded-lg
         border border-gray-300 bg-white/80 hover:bg-gray-50
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
         transition-all duration-200 min-h-[44px] min-w-[44px] text-gray-700"
	aria-label="Select option"
>
	<Languages class="size-5" />
</Select.Trigger>
```

#### Select Content Panel

```html
<Select.Content
	class="absolute right-0 mt-2 w-48 rounded-lg
         border border-gray-200 bg-white/95 backdrop-blur-md shadow-lg
         z-50 max-h-80 overflow-y-auto p-2"
>
	<!-- Section header -->
	<div class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2 py-1">
		Select Language
	</div>

	<!-- Items -->
	<Select.Item
		value="option-1"
		class="flex items-center gap-3 px-3 py-2.5 text-sm
           hover:bg-gray-50 text-left rounded cursor-pointer
           focus:bg-gray-50 focus:outline-none
           data-[highlighted]:bg-gray-50"
	>
		Option 1
	</Select.Item>
</Select.Content>
```

**Select Guidelines:**

- Use `bg-white/95 backdrop-blur-md` for dropdown panels
- Include section headers with `text-xs font-semibold text-gray-500 uppercase`
- Use `hover:bg-gray-50` and `data-[highlighted]:bg-gray-50` for items
- Set `max-h-80 overflow-y-auto` for scrollable long lists
- Add appropriate `aria-label` to triggers

---

### Collapsibles/Accordions (Bits UI)

#### Collapsible Trigger Button

```html
<button onclick="{()" ="">
	(open = !open)} class="w-full flex items-center justify-between px-4 py-3 text-sm font-medium
	rounded-lg border-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2
	focus-visible:ring-blue-500 focus-visible:ring-offset-2 min-h-[44px] montserrat-medium {open ?
	'bg-blue-50 text-blue-900 border-blue-300' : 'bg-white text-gray-700 border-gray-300
	hover:bg-gray-50'} md:text-base" aria-label="Toggle section" aria-expanded={open} >
	<div class="flex items-center gap-2 md:gap-3">
		<Filter class="size-5 {open ? 'text-blue-600' : 'text-gray-600'}" />
		<span>Filter Options</span>
	</div>
	<ChevronDown class="size-5 transition-transform duration-200 {open ? 'rotate-180' : ''}" />
</button>
```

#### Collapsible Content

```html
<Collapsible.Root bind:open="{isOpen}">
	<Collapsible.Content
		class="data-[state=open]:animate-collapsible-down
           data-[state=closed]:animate-collapsible-up
           overflow-hidden"
	>
		<div
			class="space-y-3 bg-white/80 backdrop-blur-xl rounded-xl border border-gray-200/50 shadow-sm p-3 md:p-4"
		>
			<!-- Collapsible content -->
		</div>
	</Collapsible.Content>
</Collapsible.Root>
```

**Nested Collapsibles Example (3 Levels):**

```
Level 1: Options Button
  └─ Level 2: Filter Button / Sort Button
       └─ Level 3: Category Items / Sort Items
```

**Collapsible Guidelines:**

- Use `ChevronDown` icon that rotates 180° when open
- Apply conditional classes for open/closed states
- Include smooth animations with `animate-collapsible-down/up`
- Always provide `aria-expanded` for accessibility
- Use `border-2` for emphasis on trigger buttons

---

### Toggle Groups (Bits UI)

#### Multiple Selection (Checkboxes)

**Usage:** Category filters, multi-select options

```html
<ToggleGroup.Root
	type="multiple"
	value="{selectedCategories}"
	onValueChange="{handleChange}"
	class="space-y-2"
>
	<ToggleGroup.Item
		value="category-1"
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
		<span>Category Name</span>
		<span class="text-xs opacity-75">(12)</span>
	</ToggleGroup.Item>
</ToggleGroup.Root>
```

#### Single Selection (Radio)

**Usage:** Sort options, exclusive choices

```html
<ToggleGroup.Root type="single" value="{sortBy}" onValueChange="{handleSort}" class="space-y-2">
	<ToggleGroup.Item
		value="option-1"
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
		<span>Sort by Name</span>
	</ToggleGroup.Item>
</ToggleGroup.Root>
```

**Toggle Group Guidelines:**

- Use gradient background (`data-[state=on]`) for selected items
- Include hover lift effect on selected items
- Maintain `space-y-2` between items
- Always use `w-full` for full-width items
- Include count badges for filterable items

---

### Badges & Tags

#### 1. Category Tags

**Usage:** Artwork categories, content tags

```html
<span
	class="inline-flex items-center px-2 md:px-3 py-1 rounded-full
             text-xs md:text-sm font-medium
             bg-blue-100 text-blue-800"
>
	Category Name
</span>
```

**Color Variants:**

```html
<!-- Info/Default (Blue) -->
<span class="bg-blue-100 text-blue-800">...</span>

<!-- Success (Green) -->
<span class="bg-green-100 text-green-800">...</span>

<!-- Warning (Yellow) -->
<span class="bg-yellow-100 text-yellow-800">...</span>

<!-- Error (Red) -->
<span class="bg-red-100 text-red-800">...</span>
```

#### 2. Count Badges

**Usage:** Notification counts, filter counts

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

#### 3. Status Indicators

**Available (Animated Green Dot):**

```html
<span
	class="relative w-3 h-3 bg-green-600 rounded-full flex-shrink-0 animate-pulse"
	aria-label="Available"
>
	<!-- Animated glow ring -->
	<span class="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-90"></span>
</span>
```

**Sold Badge:**

```html
<div
	class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
>
	Sold
</div>
```

**Badge Guidelines:**

- Use `rounded-full` for all badges and tags
- Use `inline-flex items-center` for proper alignment
- Scale text from `text-xs` to `md:text-sm`
- Use semantic colors (blue, green, yellow, red)
- Add `aria-label` for status indicators

---

### Modals & Dialogs (Bits UI)

#### Dialog Overlay

```html
<AlertDialog.Overlay
	class="fixed inset-0 z-50 bg-black/80
         data-[state=open]:animate-in data-[state=closed]:animate-out
         data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
/>
```

#### Dialog Content

```html
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
		Are you sure you want to proceed?
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
```

**Modal Guidelines:**

- Use `bg-black/80` for overlay (80% opacity)
- Center content with `left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]`
- Set `max-w-md` for modals, larger for complex content
- Include smooth animations with `data-[state]` attributes
- Stack actions vertically on mobile, horizontally on desktop

---

### Progress Bars

```html
<div class="mb-4">
  <!-- Label -->
  <div class="flex justify-between text-sm text-gray-600 mb-2 montserrat-medium">
    <span>Loading message...</span>
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
      style={`transform: translateX(-${100 - (100 * (progress ?? 0)) / 100}%)`}
    ></div>
  </Progress.Root>
</div>
```

**Progress Guidelines:**

- Use `h-2` for bar height
- Use gradient fill (`from-blue-500 to-indigo-500`)
- Include percentage label above bar
- Add smooth transitions with `transition-all duration-300`
- Always provide `aria-labelledby`

---

### Icon Containers

**Usage:** Contact cards, feature cards, decorative icons

```html
<!-- Large Icon Container (Standard) -->
<div
	class="flex-shrink-0 w-12 h-12
            bg-gradient-to-r from-blue-500 to-indigo-600
            rounded-xl flex items-center justify-center
            group-hover:scale-110 transition-transform duration-300"
>
	<Icon class="w-6 h-6 text-white" />
</div>

<!-- Color Variants -->
<!-- Blue/Indigo (Default) -->
<div class="bg-gradient-to-r from-blue-500 to-indigo-600">...</div>

<!-- Green (Phone, WhatsApp, Success) -->
<div class="bg-gradient-to-r from-green-500 to-green-600">...</div>

<!-- Pink (Instagram, Social) -->
<div class="bg-gradient-to-r from-pink-500 to-pink-600">...</div>

<!-- Red (Error, Delete) -->
<div class="bg-gradient-to-r from-red-600 to-red-700">...</div>
```

**Sizes:**

```html
<!-- Small (32px) -->
<div class="w-8 h-8">
	<Icon class="w-4 h-4 text-white" />
</div>

<!-- Medium (40px) -->
<div class="w-10 h-10">
	<Icon class="w-5 h-5 text-white" />
</div>

<!-- Large (48px - Standard) -->
<div class="w-12 h-12">
	<Icon class="w-6 h-6 text-white" />
</div>

<!-- Hero (64px+) -->
<div class="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24">
	<Icon class="text-white text-3xl sm:text-4xl lg:text-5xl" />
</div>
```

**Icon Container Guidelines:**

- Use `w-12 h-12` as standard size
- Always use `rounded-xl` for containers
- Include `flex items-center justify-center`
- Add `group-hover:scale-110` for interactive cards
- Use semantic gradient colors (blue, green, pink, red)
- Maintain consistent icon-to-container ratio

---

### Navigation Patterns

#### 1. Sticky Header

```html
<header
	class="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm"
>
	<div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
		<div class="flex items-center justify-between gap-3 py-3 md:gap-4 md:py-4 lg:gap-6 lg:py-6">
			<!-- Header content -->
		</div>
	</div>
</header>
```

#### 2. Navigation Link (Active State)

```html
<a
  href="/page"
  class="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
         flex items-center gap-2
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
         min-h-[44px] min-w-[44px]
         {isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}"
  aria-label="Page name"
  aria-current={isActive ? 'page' : undefined}
>
  <Icon class="size-4" />
  <span class="hidden lg:inline">Page Name</span>
</a>
```

#### 3. Back Button

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

#### 4. Scroll to Top Button

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
         {show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}"
>
	<ArrowUp class="size-5 group-hover:scale-110 transition-transform duration-300" />
</button>
```

**Navigation Guidelines:**

- Use `sticky top-0 z-50` for fixed headers
- Apply `text-blue-600 bg-blue-50` for active states
- Include `aria-current="page"` for active nav items
- Always provide `aria-label` for icon-only buttons
- Use smooth transitions (`transition-all duration-200`)

---

## 📐 Layout Patterns

### Page Container (Safe Padding)

**⚠️ CRITICAL:** Use safe padding values to prevent horizontal overflow

```html
<!-- ✅ CORRECT: Safe responsive container -->
<main class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 sm:py-12 lg:py-16">
	<!-- Page content -->
</main>

<!-- ❌ WRONG: Excessive padding causes overflow -->
<main class="mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 max-w-7xl">
	<!-- Don't use xl:px-12 or 2xl:px-16 -->
</main>
```

**Safe Padding Scale:**

- Mobile: `px-4` (16px)
- Tablet: `sm:px-6` (24px)
- Desktop: `lg:px-8` (32px)
- **Maximum:** `lg:px-8` (never exceed this)

### Grid Layouts (Mobile-First)

```html
<!-- Card Grid -->
<div
	class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5
            gap-4 md:gap-6 lg:gap-8 w-full"
>
	<!-- Grid items -->
</div>

<!-- Two Column Layout -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 w-full">
	<!-- Two columns on desktop, single column on mobile -->
</div>

<!-- Stats Grid -->
<div class="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
	<!-- 2 columns on mobile, 3 on tablet+ -->
</div>
```

**Grid Guidelines:**

- Always add `w-full` to constrain grid width
- Use progressive column counts: `1 → 2 → 3 → 4 → 5`
- Scale gaps with content: `gap-3 → gap-4 → gap-6 → gap-8`
- Never exceed `gap-8` to prevent overflow

### Spacing System

```html
<!-- Section Spacing (vertical) -->
<div class="space-y-4 md:space-y-6 lg:space-y-8">
	<!-- Child elements get consistent vertical spacing -->
</div>

<!-- Horizontal Spacing -->
<div class="flex items-center gap-3 md:gap-4 lg:gap-6">
	<!-- Inline elements with responsive gaps -->
</div>

<!-- Card/Container Padding -->
<div class="p-4 md:p-6 lg:p-8">
	<!-- Responsive padding for containers -->
</div>
```

---

## 🎭 Animation & Transitions

### Standard Transitions

```css
/* Fast (interactions, hovers) */
transition-all duration-150

/* Standard (UI feedback) */
transition-all duration-200

/* Smooth (cards, panels) */
transition-all duration-300

/* Slow (page transitions) */
transition-all duration-500
```

### Hover Effects

```css
/* Subtle Lift */
hover:-translate-y-0.5

/* Medium Lift */
hover:-translate-y-1

/* Large Lift */
hover:-translate-y-2

/* Scale Up */
hover:scale-105 /* 5% scale */
hover:scale-110 /* 10% scale */

/* Shadow Enhancement */
hover:shadow-lg
hover:shadow-xl
hover:shadow-2xl
```

### Loading States

```html
<!-- Spinner -->
<div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

<!-- Pulse (skeleton) -->
<div class="animate-pulse bg-gray-200 rounded"></div>

<!-- Ping (notification) -->
<span class="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-90"></span>
```

---

## ♿ Accessibility Requirements

### Focus States

**Always include focus-visible ring:**

```css
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-blue-500
focus-visible:ring-offset-2
```

### Touch Targets

**Minimum size for all interactive elements:**

```css
min-h-[44px] min-w-[44px]
```

### ARIA Labels

```html
<!-- Icon-only buttons -->
<button aria-label="Close menu">
	<X class="size-5" />
</button>

<!-- Current page -->
<a href="/current" aria-current="page">Current Page</a>

<!-- Expanded state -->
<button aria-expanded="{isOpen}">Toggle</button>

<!-- Form labels -->
<label for="input-id">Label</label>
<input id="input-id" type="text" />
```

### Keyboard Navigation

- All interactive elements must be focusable
- Use `tabindex="0"` for custom interactive elements
- Provide keyboard shortcuts where appropriate
- Ensure logical tab order

---

## 🚀 Usage Decision Trees

### When to Use Which Button?

```
Is it the primary action on the page?
├─ Yes → Primary Button (Blue Gradient)
└─ No
   ├─ Is it a success/active state?
   │  └─ Yes → Active Button (Green Gradient)
   ├─ Is it a destructive action?
   │  └─ Yes → Danger Button (Red Text)
   ├─ Is it icon-only?
   │  └─ Yes → Icon Button (Border + Icon)
   ├─ Is it a navigation link?
   │  └─ Yes → Text/Link Button (Blue Text)
   └─ Otherwise → Secondary Button (Gray)
```

### When to Use Which Card?

```
Does it need glass morphism effect?
├─ Yes
│  ├─ Is it clickable/interactive?
│  │  └─ Yes → Interactive Glass Card (hover effects)
│  └─ No → Standard Glass Card
└─ No → Solid Card
```

### When to Use Which Border Radius?

```
What type of element is it?
├─ Small (badge, tag, input) → rounded-lg
├─ Medium (button, card) → rounded-xl
├─ Large (modal, container) → rounded-2xl
└─ Circular (avatar, dot) → rounded-full
```

---

## 📚 Component Checklist

Before creating a new component, ensure:

- ✅ Mobile-first responsive design (320px+)
- ✅ Touch-friendly targets (`min-h-[44px]`)
- ✅ Focus states (`focus-visible:ring-2`)
- ✅ Proper ARIA labels and roles
- ✅ Consistent design tokens (borders, shadows, spacing)
- ✅ Smooth transitions (`transition-all duration-200`)
- ✅ Montserrat font with appropriate weights
- ✅ Safe padding (never exceed `lg:px-8`)
- ✅ Semantic color usage
- ✅ Keyboard navigation support

---

## 🔗 Related Documentation

- **Responsive Guide**: `docs/tailwind-responsive-guide.md`
- **Component Reference**: `docs/component-patterns-reference.md`
- **Svelte 5 Patterns**: `docs/svelte5classesparadigm.md`
- **i18n Guide**: `docs/i18n-hygiene-guide.md`

---

_This design system is a living document. Update it when introducing new patterns. All new components should reference these standards._
