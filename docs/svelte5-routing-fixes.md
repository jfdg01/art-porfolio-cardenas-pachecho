# Svelte 5 Routing & Component Lifecycle Fixes

## Issues Encountered

### 1. Page Stacking During Navigation

**Symptom:** When navigating between routes, the previous page remained visible underneath the new page.

**Root Cause:** Each page component had its own full-page wrapper (`min-h-screen bg-gradient-to-br...`) in addition to the layout's wrapper, creating double-wrapping. In Svelte 5, the new `{@render children?.()}` syntax requires a single container boundary for proper component mounting/unmounting.

**Fix:** Removed duplicate wrapper divs from all page components:

- `src/routes/+page.svelte`
- `src/routes/artwork/[id]/+page.svelte`
- `src/routes/contact/+page.svelte`
- `src/routes/clases-online/+page.svelte`

The `+layout.svelte` now provides the single source of truth for the page container.

**Before:**

```svelte
<!-- +layout.svelte -->
<div class="min-h-screen bg-gradient-to-br...">
	{@render children?.()}
</div>

<!-- +page.svelte -->
<div class="min-h-screen bg-gradient-to-br...">
	<!-- ❌ Duplicate! -->
	<main>...</main>
</div>
```

**After:**

```svelte
<!-- +layout.svelte -->
<div class="min-h-screen bg-gradient-to-br...">
	{@render children?.()}
</div>

<!-- +page.svelte -->
<main>...</main>
<!-- ✅ Clean! -->
```

---

### 2. Nested Button HTML Validation Error

**Symptom:** Console warning: `<button>` cannot be a descendant of `<button>` in `ArtworkFilter.svelte`

**Root Cause:** A clear filters button was nested inside `<Collapsible.Trigger>` (which renders as a `<button>`). HTML does not allow buttons inside buttons.

**Fix:** Replaced the nested `<button>` with an accessible `<div>` at line 194-213 in `ArtworkFilter.svelte`:

```svelte
<!-- Before: nested button -->
<button onclick={clearFilters} ...>
  <X />
</button>

<!-- After: accessible div -->
{#if galleryState.selectedCategories.length > 0}
  <div
    role="button"
    tabindex="0"
    onclick={(e) => { e.stopPropagation(); clearFilters(); }}
    onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { ... } }}
    class="..."
  >
    <X />
  </div>
{/if}
```

Changed `disabled` attribute to conditional rendering with `{#if}` block.

---

### 3. BiggerPicture Cleanup Error

**Symptom:** Error during navigation: `Cannot read properties of undefined (reading 'onClose')`

**Root Cause:** During route navigation, the `onMount` cleanup function called `bp.close()`, which tried to access internal properties (`onClose`) that were already undefined due to the component teardown order.

**Fix:** Made the cleanup defensive in `src/routes/artwork/[id]/+page.svelte` (lines 172-185):

```javascript
onMount(() => {
	bp = BiggerPicture({ target: document.body });

	return () => {
		if (bp) {
			try {
				if (typeof bp.close === 'function') {
					bp.close();
				}
			} catch {
				// Ignore cleanup errors - instance may be already torn down
			}
			bp = null;
		}
	};
});
```

Added try-catch block and function type check to handle race conditions during navigation.

---

## Key Learnings: Svelte 5 Best Practices

1. **Single Layout Container:** With `{@render children?.()}`, only the layout should provide the main page wrapper
2. **No Nested Interactive Elements:** Avoid nesting buttons, links, or form controls inside Bits UI components that render as interactive elements
3. **Defensive Cleanup:** Always add defensive checks in lifecycle cleanup functions, especially when dealing with third-party libraries
4. **Proper `onMount` Returns:** Use `onMount` return functions for cleanup rather than separate `onDestroy` calls

## Verification

All fixes verified with:

- ✅ `npm run hygiene` (svelte-check, eslint, prettier, i18n)
- ✅ No browser console errors
- ✅ Proper component mounting/unmounting during navigation
- ✅ No HTML validation warnings
