## Tailwind CSS Design Guide (Mobile‑First)

This guide defines our responsive breakpoints, Do/Don't rules, and styling best practices for developing consistent UI in this project (Svelte + Tailwind v4) with a true mobile-first approach.

### Breakpoints (Mobile-First)

Define these custom breakpoints via Tailwind v4 `@theme` in `src/app.css`:

```css
@theme {
	--breakpoint-xxs: 320px; /* smallest phones - base mobile */
	--breakpoint-xs: 425px; /* large phones - enhanced mobile */
	--breakpoint-md: 768px; /* tablets - extended design */
	--breakpoint-lg: 1024px; /* small laptops - complete view */
	--breakpoint-xl: 1280px; /* desktops - spacious layout */
	--breakpoint-2xl: 1440px; /* large desktops - maximum spacing */
}
```

Usage example: `p-3 md:p-6 lg:p-8 xl:p-10 2xl:p-12` (mobile-first progression)

### Mobile‑First Philosophy

- **Base Mobile (320px+)**: Start with mobile-optimized design as the foundation
- **Enhanced Mobile (425px+)**: Refine spacing and typography for larger phones
- **Extended Design (768px+)**: Introduce multi-column layouts and enhanced spacing
- **Complete View (1024px+)**: Full desktop experience with all features
- **Spacious Layout (1280px+)**: Maximum spacing and premium desktop experience
- **Ultra-wide (1440px+)**: Large desktop optimization with generous whitespace

**Core Principles:**

- Base styles must work perfectly at 320px without horizontal scroll
- Add overrides progressively only when content requires layout changes
- Prioritize readable typography, accessible targets, and essential actions on mobile
- Touch-friendly interactions (44px minimum touch targets)

### Do / Don’t

#### Do

- **Mobile-First Progression**: Use responsive utilities in ascending order: `p-3 md:p-6 lg:p-8 xl:p-10 2xl:p-12`
- **Text Constraints**: Constrain readable text width at large screens: `max-w-prose` or `max-w-[65ch]`
- **Consistent Padding**: Maintain consistent horizontal padding: `px-4` (mobile), `md:px-6`, `lg:px-8`, `xl:px-12`, `2xl:px-16`
- **Aspect Ratios**: Use CSS aspect ratios for media: `aspect-[3/4]`, `object-cover`
- **Fluid Typography**: Use fluid/`clamp()` for type where helpful: `text-[clamp(0.875rem,2vw,1.125rem)]`
- **Layout Progression**:
  - Mobile (320px+): Single column, essential content
  - Tablet (768px+): Multi-column layouts, side panels
  - Desktop (1024px+): Full feature set, densified grids
- **Mobile Controls**: Gate complex/secondary controls behind disclosures on mobile (sheets, drawers, menus)
- **Touch Targets**: Ensure 44px minimum touch targets on all interactive elements
- **Testing Matrix**: Test at: 320, 360, 390, 414, 425, 768, 820, 1024, 1280, 1366, 1440, 1920, 2560

#### Don't

- **Avoid Over-Engineering**: Don't duplicate styles at every breakpoint when a fluid value works
- **Touch-First Design**: Don't rely on hover-only interactions for core actions (touch devices)
- **Text Readability**: Don't allow text lines to stretch beyond ~75ch on desktop
- **Layout Primitives**: Don't position UI with magic numbers; prefer layout primitives (flex/grid/gap)
- **Design Tokens**: Don't introduce new color tokens ad‑hoc; use theme tokens
- **Spacing Consistency**: Don't change spacing scale arbitrarily; stick to Tailwind spacing scale
- **Performance**: Don't ship images without defined aspect ratio (avoid CLS)
- **Mobile Assumptions**: Don't assume mobile users want less functionality - gate, don't remove
- **Breakpoint Jumps**: Don't make dramatic layout changes between adjacent breakpoints
- **❌ CRITICAL - Horizontal Overflow**: Never use excessive padding like `xl:px-10 2xl:px-12` or `xl:px-12 2xl:px-16` as they cause horizontal overflow
- **❌ Missing Overflow Protection**: Don't forget `overflow-x-hidden` on main page containers
- **❌ Unconstrained Widths**: Don't use grid containers without `w-full` constraint

### Layout Patterns (Mobile-First)

- **Containers**: `mx-auto` with progressive max-widths (SAFE PADDING):
  - Mobile: `max-w-full px-4`
  - Tablet: `md:max-w-2xl md:px-6`
  - Desktop: `lg:max-w-4xl lg:px-8`
  - Large: `xl:max-w-7xl xl:px-8` ⚠️ (NOT xl:px-12)
  - Ultra-wide: `2xl:max-w-7xl 2xl:px-8` ⚠️ (NOT 2xl:px-16)

- **Grids (Mobile-First)**:
  - Cards/listing: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5`
  - Gaps: `gap-3 md:gap-4 lg:gap-6 xl:gap-8`

- **Navigation (Mobile-First)**:
  - Mobile (320px+): Simple top/bottom bar; overflow actions in menu/sheet
  - Tablet (768px+): Inline toolbar with enhanced spacing
  - Desktop (1024px+): Optional persistent sidebar

- **Filter Panels (Mobile-First)**:
  - Mobile: Overlay/sheet (`md:hidden`)
  - Desktop: Docked behavior (`hidden md:block md:sticky md:top-0`)

### Typography (Mobile-First)

- **Base Body**: Start with `text-sm` on mobile (320px+), scale up: `md:text-base lg:text-lg`
- **Headings Scale**: Consistent progression without dramatic jumps:
  - H1: `text-xl md:text-2xl lg:text-3xl xl:text-4xl`
  - H2: `text-lg md:text-xl lg:text-2xl xl:text-3xl`
  - H3: `text-base md:text-lg lg:text-xl xl:text-2xl`
- **Text Constraints**: Limit paragraph width: `prose` or `max-w-[65-75ch]` at `xl/2xl`
- **Fluid Typography**: Use `text-[clamp(0.875rem,2vw,1.125rem)]` for responsive scaling

### Spacing and Sizing (Mobile-First)

- **Spacing Scale**: Stick to Tailwind spacing scale for paddings/margins; use `gap-*` for separation
- **Touch Targets**: Minimum 44px height for all interactive elements (mobile-first)
- **Progressive Spacing**: Increase spacing stepwise:
  - Mobile (320px+): `p-3`, `gap-3`, `space-y-3`
  - Tablet (768px+): `md:p-4`, `md:gap-4`, `md:space-y-4`
  - Desktop (1024px+): `lg:p-6`, `lg:gap-6`, `lg:space-y-6`
  - Large (1280px+): `xl:p-8`, `xl:gap-8`, `xl:space-y-8`
  - Ultra-wide (1440px+): `2xl:p-12`, `2xl:gap-12`, `2xl:space-y-12`

### Preventing Horizontal Overflow (Critical)

**⚠️ CRITICAL: Always prevent horizontal overflow to maintain proper responsive behavior**

#### Container Padding Rules

- **Maximum Padding**: Never exceed `px-4 sm:px-6 lg:px-8` for main containers
- **Avoid Excessive Padding**: Don't use `xl:px-10 2xl:px-12` or `xl:px-12 2xl:px-16` as they cause overflow
- **Consistent Max-Width**: Always pair with `max-w-7xl` for proper constraint

#### Safe Padding Patterns

```html
<!-- ✅ CORRECT: Safe padding that won't overflow -->
<div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
	<!-- Safe padding stops at lg:px-8 -->
</div>

<!-- ❌ WRONG: Excessive padding causes horizontal overflow -->
<div class="mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 max-w-7xl">
	<!-- Never use xl:px-10, xl:px-12, or 2xl:px-16 -->
</div>
```

#### Overflow Protection

- **Always Add**: `overflow-x-hidden` to main page containers
- **Width Constraints**: Add `w-full` to grid containers and form elements
- **Responsive Gaps**: Use `gap-6 lg:gap-8` instead of `gap-8 lg:gap-12` for grids

#### Layout Container Best Practices

```html
<!-- ✅ CORRECT: Safe responsive container -->
<main class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 sm:py-12 lg:py-16">
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 w-full">
		<!-- content -->
	</div>
</main>

<!-- ✅ CORRECT: Header with safe padding -->
<header class="sticky top-0 z-50 bg-white/80 backdrop-blur-xl">
	<div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
		<!-- header content -->
	</div>
</header>
```

#### Testing for Overflow

- **Always Test**: Check at 1920px, 2560px, and ultra-wide screens
- **Visual Check**: Ensure no horizontal scrollbar appears
- **Content Check**: Verify all content fits within viewport bounds

### Color and theming

- Use CSS variables or Tailwind color tokens; centralize palette.
- Ensure 4.5:1 contrast for text vs background; 3:1 for large text/UI.
- Reserve accent color for primary actions; use neutrals for structure.

### Accessibility

- Always provide focus states (`focus-visible:*`), and readable labels.
- Respect reduced motion (`motion-reduce:*`) for animations.
- Avoid text in images; keep alt text informative for media.

### Images and media

- Define explicit aspect ratios on cards and media containers.
- Use `object-cover` with center focal point for cropped thumbnails.
- Constrain large media on `xl/2xl` to avoid excessive width.

### State, transitions, and layers

- Keep transitions subtle; 150–250ms is typical for UI.
- Z-index: prefer a small, documented scale (e.g., dropdown 20, modal 40, toast 50) and avoid arbitrary values.

### Example snippets

Responsive container and grid:

```html
<!-- ✅ SAFE: No horizontal overflow -->
<div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
	<div
		class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 md:gap-4 lg:gap-6 w-full"
	>
		<!-- cards -->
	</div>

	<p class="mt-6 text-base xs:text-[17px] md:text-lg xl:text-xl max-w-[70ch]">
		Responsive body text with constrained line length.
	</p>
</div>
```

Mobile overlay filter → desktop docked:

```html
<!-- Toggle visible on mobile -->
<button class="md:hidden">Filters</button>

<!-- Overlay (mobile) -->
<aside class="md:hidden fixed inset-0 bg-black/40">
	<div class="ml-auto h-full w-80 bg-white p-4">...</div>
</aside>

<!-- Docked (desktop) -->
<aside
	class="hidden md:block md:sticky md:top-0 md:h-[calc(100dvh-var(--header))] md:w-80 md:shrink-0"
>
	...
</aside>
```

### Component-Specific Responsive Patterns

#### Buttons (Mobile-First)

```html
<!-- Primary Button -->
<button class="px-4 py-3 text-sm md:px-6 md:text-base min-h-[44px]">
	<!-- Scales padding and text size -->
</button>

<!-- Icon Button -->
<button class="min-h-[44px] min-w-[44px]">
	<!-- Always maintains touch-friendly size -->
</button>
```

#### Cards (Mobile-First)

```html
<!-- Card padding progression -->
<div class="p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl">
	<!-- Padding and border radius scale up -->
</div>
```

#### Forms (Mobile-First)

```html
<!-- Form inputs maintain consistent sizing -->
<input class="w-full px-4 py-3 text-sm md:text-base" />

<!-- Labels scale -->
<label class="text-xs md:text-sm">Label</label>

<!-- Error messages -->
<p class="text-xs md:text-sm text-red-600">Error message</p>
```

#### Modals/Dialogs (Mobile-First)

```html
<!-- Modal content scales width -->
<div class="w-full max-w-md p-4 sm:p-6">
	<!-- Actions stack on mobile, inline on desktop -->
	<div class="flex flex-col-reverse sm:flex-row sm:space-x-2">
		<button>Cancel</button>
		<button>Confirm</button>
	</div>
</div>
```

#### Dropdowns/Selects (Mobile-First)

```html
<!-- Trigger maintains touch size -->
<button class="min-h-[44px] min-w-[44px] px-4 py-2.5">Select</button>

<!-- Dropdown panel width -->
<div class="w-48 sm:w-56 md:w-64">
	<!-- Items maintain touch targets -->
	<div class="px-3 py-2.5 min-h-[44px]">Item</div>
</div>
```

#### Icon Containers (Mobile-First)

```html
<!-- Icon containers scale -->
<div class="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16">
	<Icon class="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
</div>
```

#### Badges/Tags (Mobile-First)

```html
<!-- Text and padding scale -->
<span class="px-2 py-1 text-xs md:px-3 md:text-sm">Badge</span>
```

#### Navigation (Mobile-First)

```html
<!-- Desktop nav shows full labels -->
<a class="px-4 py-2 min-h-[44px]">
	<Icon class="size-4" />
	<span class="hidden lg:inline">Label</span>
</a>
```

### Workflow Guidelines (Mobile-First)

1. **Mobile Foundation (320px+)**: Build mobile-optimized design first. Ensure no horizontal scroll and all core actions are reachable with 44px touch targets.

2. **Enhanced Mobile (425px+)**: Add `xs` refinements for larger phones - subtle spacing and typography improvements.

3. **Extended Design (768px+)**: At `md`, introduce multi-column layouts, side panels, and inline toolbars/filters.

4. **Complete View (1024px+)**: At `lg`, densify grids, add persistent sidebars, and reveal full feature set.

5. **Spacious Layout (1280px+)**: At `xl`, increase whitespace, cap text widths, and optimize for desktop experience.

6. **Ultra-wide (1440px+)**: At `2xl`, add maximum spacing and premium desktop optimizations.

7. **Validation**: Test the complete matrix and keyboard/AT accessibility at each step.

### Responsive Testing Checklist

Before deploying any responsive component:

- ✅ Test at 320px (smallest mobile)
- ✅ Test at 375px, 390px, 414px (common mobile sizes)
- ✅ Test at 768px (tablet portrait)
- ✅ Test at 1024px (tablet landscape / small laptop)
- ✅ Test at 1280px, 1366px (standard desktop)
- ✅ Test at 1920px (HD desktop)
- ✅ Test at 2560px (QHD desktop)
- ✅ Verify no horizontal scrollbars at any size
- ✅ Check touch targets are 44px minimum
- ✅ Verify text remains readable (not too small or too large)
- ✅ Test with browser zoom at 150% and 200%

---

By following this mobile-first guide, we ensure consistent, accessible, and performant responsive design across 320px → 2560px with a true mobile-first approach that enhances progressively for larger screens.
