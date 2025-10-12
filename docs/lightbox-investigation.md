# Lightbox Implementation Investigation Report
**Date:** October 12, 2025  
**Context:** Artwork detail page (`src/routes/artwork/[id]/+page.svelte`)  
**Requirements:** Image zoom controls + Gallery navigation between artworks

---

## Executive Summary

After thorough investigation of lightbox solutions for Svelte 5/SvelteKit, **three viable options** have been identified:

1. **Bigger Picture** - Recommended for production use
2. **svelte-lightbox** - Alternative Svelte-native option
3. **Custom Implementation** - For maximum control and learning

**Top Recommendation:** **Bigger Picture** for its lightweight footprint, proven performance, active maintenance, and Svelte-native build.

---

## Detailed Options Analysis

### Option 1: Bigger Picture ⭐ RECOMMENDED

**Package:** `bigger-picture`  
**Website:** https://github.com/henrygd/bigger-picture  
**Bundle Size:** < 10 kB gzipped  
**Last Updated:** Actively maintained (2024-2025)

#### Pros
- ✅ Built with Svelte, designed for Svelte/SvelteKit
- ✅ Extremely lightweight (< 10 kB gzipped)
- ✅ Supports multiple media types (images, videos, iframes, HTML)
- ✅ No external dependencies
- ✅ Excellent performance and smooth animations
- ✅ TypeScript support
- ✅ Keyboard navigation built-in (arrow keys, Esc)
- ✅ Touch gesture support for mobile
- ✅ SSR-compatible with SvelteKit
- ✅ Active maintenance and community

#### Cons
- ⚠️ Requires programmatic API (not declarative component)
- ⚠️ May need Svelte 5 runes migration for state management
- ⚠️ Less extensive documentation than PhotoSwipe

#### Integration Complexity: **Medium** (3-4 hours)

#### Installation
```bash
npm install bigger-picture
```

#### Basic Implementation Pattern
```svelte
<script>
  import BiggerPicture from 'bigger-picture/svelte';
  import 'bigger-picture/css';
  import { onMount } from 'svelte';
  
  let bp;
  
  onMount(() => {
    bp = BiggerPicture({
      target: document.body,
    });
  });
  
  function openLightbox(event) {
    bp.open({
      items: artwork.images.map(img => ({
        src: img.src,
        alt: img.alt,
        thumb: img.thumb // optional thumbnail
      })),
      intro: 'fadeup', // animation
      el: event.currentTarget,
    });
  }
</script>

<button onclick={openLightbox}>
  <img src={currentImage.src} alt={artwork.title} />
</button>
```

#### Integration with Current Project
- **Image optimization:** Compatible with `@zerodevx/svelte-img` - can pass optimized images to items array
- **Navigation state:** Can leverage existing `currentImageIndex` to open at specific image
- **Keyboard handling:** Built-in, compatible with existing arrow key logic
- **i18n:** Will need custom controls for translated labels

#### Svelte 5 Compatibility: ✅ **GOOD**
- Built with Svelte, compatible with Svelte 5
- May need to replace `onMount` with `$effect` for optimal Svelte 5 patterns
- No known breaking issues with runes

---

### Option 2: svelte-lightbox

**Package:** `svelte-lightbox`  
**Website:** https://svelte-lightbox.js.org/  
**Bundle Size:** ~15-20 kB (estimated)  
**Last Updated:** 2024

#### Pros
- ✅ Declarative Svelte component API
- ✅ Designed specifically for Svelte/SvelteKit
- ✅ Gallery component with built-in navigation
- ✅ Highly customizable through props and CSS
- ✅ TypeScript support
- ✅ Good documentation
- ✅ Fullscreen mode support
- ✅ Mobile-friendly

#### Cons
- ⚠️ Svelte 5 compatibility uncertain (may need testing)
- ⚠️ Larger bundle size than Bigger Picture
- ⚠️ Limited to images only (no video/iframe support)
- ⚠️ Less active maintenance history

#### Integration Complexity: **Low-Medium** (2-3 hours)

#### Installation
```bash
npm install svelte-lightbox
```

#### Basic Implementation Pattern
```svelte
<script>
  import { Lightbox, LightboxGallery } from 'svelte-lightbox';
</script>

<!-- Single image -->
<Lightbox
  title={artwork.title}
  description={artwork.description}
  imagePreset="fullscreen"
  enableImageExpand={true}
  enableEscapeToClose={true}
  showCloseButton={true}
>
  <img src={currentImage.src} alt={artwork.title} />
</Lightbox>

<!-- Gallery -->
<LightboxGallery
  images={artwork.images}
  enableNavigation={true}
/>
```

#### Integration with Current Project
- **Image optimization:** May need adapter for `@zerodevx/svelte-img` format
- **Navigation state:** Built-in gallery navigation
- **Keyboard handling:** Built-in
- **i18n:** Props for titles/descriptions support translation keys

#### Svelte 5 Compatibility: ⚠️ **UNCERTAIN**
- No explicit Svelte 5 documentation
- May use older Svelte 3/4 patterns
- **Recommendation:** Test before committing

---

### Option 3: Custom Implementation

**Approach:** Native Svelte 5 component using HTML `<dialog>` element  
**Bundle Size:** ~2-5 kB (minimal)  
**Development Time:** 8-16 hours

#### Pros
- ✅ Full control over functionality and design
- ✅ Perfect integration with existing code patterns
- ✅ Native Svelte 5 runes ($state, $derived, $effect)
- ✅ Can use HTML `<dialog>` element (native browser support)
- ✅ Zero external dependencies
- ✅ Smallest possible bundle size
- ✅ Deep integration with `@zerodevx/svelte-img`
- ✅ Custom i18n integration
- ✅ Learning opportunity

#### Cons
- ❌ Significant development time required
- ❌ Must implement all features from scratch
- ❌ Accessibility requires careful implementation
- ❌ Cross-browser testing needed
- ❌ Ongoing maintenance burden
- ❌ No community support/examples

#### Integration Complexity: **High** (8-16 hours)

#### Key Implementation Considerations
1. **Modal Management:** Use native `<dialog>` element with `.showModal()`
2. **Zoom Controls:** CSS transforms with pinch-to-zoom on mobile
3. **Gallery Navigation:** Leverage existing `currentImageIndex` state
4. **Keyboard Handling:** Arrow keys, Esc, Enter, Space
5. **Touch Gestures:** Swipe left/right for navigation, pinch for zoom
6. **Accessibility:** Focus trap, ARIA labels, screen reader announcements
7. **Animations:** CSS transitions or Svelte transitions

#### Example Architecture
```svelte
<script lang="ts">
  // Svelte 5 runes
  let isOpen = $state(false);
  let currentIndex = $state(0);
  let zoomLevel = $state(1);
  
  let dialog: HTMLDialogElement;
  
  function openLightbox(startIndex: number) {
    currentIndex = startIndex;
    dialog?.showModal();
    isOpen = true;
  }
  
  function close() {
    dialog?.close();
    isOpen = false;
    zoomLevel = 1;
  }
  
  $effect(() => {
    if (isOpen) {
      // Handle keyboard events
      const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') previousImage();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'Escape') close();
      };
      document.addEventListener('keydown', handleKeydown);
      return () => document.removeEventListener('keydown', handleKeydown);
    }
  });
</script>

<dialog bind:this={dialog} class="lightbox">
  <!-- Image display with zoom -->
  <!-- Navigation controls -->
  <!-- Close button -->
</dialog>
```

---

## Comparison Table

| Criteria | Bigger Picture | svelte-lightbox | Custom Implementation |
|----------|----------------|-----------------|----------------------|
| **Svelte 5 Compatibility** | ✅ Excellent | ⚠️ Uncertain | ✅ Perfect |
| **Feature Completeness** | ✅ Excellent | ✅ Good | ⚠️ Need to build |
| **Bundle Size** | ✅ < 10 kB | ⚠️ ~15-20 kB | ✅ ~2-5 kB |
| **Accessibility** | ✅ Good | ✅ Good | ⚠️ Need to implement |
| **Documentation** | ✅ Good | ✅ Excellent | ❌ N/A |
| **Maintenance** | ✅ Active | ⚠️ Moderate | ❌ Self-maintained |
| **TypeScript Support** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Mobile/Touch** | ✅ Excellent | ✅ Good | ⚠️ Need to implement |
| **Integration Complexity** | 🟡 Medium | 🟢 Low-Medium | 🔴 High |
| **SSR Compatibility** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Dev Time Estimate** | 3-4 hours | 2-3 hours | 8-16 hours |
| **Media Support** | Images, video, iframe | Images only | Customizable |
| **API Style** | Programmatic | Declarative | Fully custom |

---

## Other Options Evaluated (Not Recommended)

### PhotoSwipe v5
- **Status:** Not Svelte-native, requires significant integration work
- **Bundle Size:** ~40-50 kB (larger)
- **Verdict:** Overkill for this use case, better alternatives exist

### GLightbox
- **Status:** Vanilla JS library, requires wrapper component
- **Bundle Size:** ~30 kB
- **Verdict:** Good library but not optimized for Svelte

### Lightbox2
- **Status:** Legacy library, jQuery dependency
- **Verdict:** Not suitable for modern Svelte projects

---

## Final Recommendation: Bigger Picture

### Why Bigger Picture?

1. **Perfect balance:** Lightweight yet feature-complete
2. **Svelte-native:** Built with Svelte, designed for Svelte projects
3. **Active maintenance:** Well-maintained with recent updates
4. **Performance:** Excellent performance with minimal bundle impact
5. **Flexibility:** Supports multiple media types (future-proof)
6. **Proven:** Used in production by multiple projects

### Implementation Plan

#### Phase 1: Setup (30 minutes)
1. Install `bigger-picture` package
2. Import CSS and initialize in artwork detail page
3. Create wrapper function for opening lightbox

#### Phase 2: Integration (2 hours)
1. Map artwork images to Bigger Picture format
2. Connect optimized images from `@zerodevx/svelte-img`
3. Wire up click handler on current image display
4. Test basic open/close functionality

#### Phase 3: Enhanced Features (1 hour)
1. Add gallery navigation for multiple artwork images
2. Set initial image based on `currentImageIndex`
3. Add custom controls with i18n translations
4. Implement responsive behavior

#### Phase 4: Testing & Polish (30 minutes)
1. Test keyboard navigation
2. Test touch gestures on mobile
3. Verify SSR compatibility
4. Add loading states if needed

### Alternative Recommendation

If declarative API is strongly preferred or Bigger Picture has Svelte 5 compatibility issues:
- **Fallback:** Custom implementation using native `<dialog>` element
- **Rationale:** Full control, perfect Svelte 5 integration, learning opportunity
- **Trade-off:** More development time but better long-term maintenance

---

## Integration Points with Current Project

### 1. Artwork Detail Page (`src/routes/artwork/[id]/+page.svelte`)

**Lines 132-156:** Current image display section
```svelte
<!-- CURRENT -->
<Img
  src={optimizedImage}
  alt={$t('artworkAlt', { values: { title: artwork.title } })}
  class="w-full h-auto rounded-lg shadow-md"
/>

<!-- WITH LIGHTBOX -->
<button onclick={openLightbox}>
  <Img
    src={optimizedImage}
    alt={$t('artworkAlt', { values: { title: artwork.title } })}
    class="w-full h-auto rounded-lg shadow-md cursor-zoom-in"
  />
</button>
```

### 2. Image Navigation State (Lines 34-38)
- Leverage existing `currentImageIndex` for opening at correct image
- Sync lightbox navigation with page state

### 3. Keyboard Handling (Lines 44-52)
- Existing arrow key support for image navigation
- Lightbox will take over when open, restore when closed

### 4. i18n Integration
Add new translation keys to locale files:
```json
{
  "lightbox": {
    "close": "Close",
    "previous": "Previous",
    "next": "Next",
    "zoomIn": "Zoom In",
    "zoomOut": "Zoom Out",
    "counter": "{{current}} of {{total}}"
  }
}
```

### 5. Image Optimization (`@zerodevx/svelte-img`)
- Convert optimized image objects to Bigger Picture format
- Maintain responsive image loading
- Provide multiple resolutions for zoom functionality

---

## Potential Gotchas & Limitations

### Bigger Picture
1. **Programmatic API:** Requires understanding of imperative API vs declarative components
2. **CSS Customization:** May need to override default styles for brand consistency
3. **SSR:** Ensure `onMount` is used correctly to avoid hydration issues
4. **Image Format:** Need to map from current image structure to BP format

### svelte-lightbox
1. **Svelte 5 Compatibility:** Must verify before implementation
2. **Limited Features:** Image-only, may need workaround for future video support
3. **Customization:** May be constrained by library's prop API

### Custom Implementation
1. **Development Time:** Significant upfront investment
2. **Browser Compatibility:** Must test `<dialog>` element across browsers (Safari < 15.4 requires polyfill)
3. **Accessibility:** Requires careful ARIA implementation and testing
4. **Touch Gestures:** Complex to implement properly
5. **Performance:** Must optimize animations and large images

---

## Next Steps

### Immediate Action Items
1. ✅ **Approved:** Proceed with Bigger Picture implementation
2. 📦 **Install:** `npm install bigger-picture`
3. 🧪 **Prototype:** Create basic integration in artwork detail page
4. 🌐 **Test:** Verify functionality across devices and browsers
5. 🎨 **Style:** Customize to match current design system
6. 🌍 **i18n:** Add translation keys for controls
7. ✨ **Polish:** Add loading states, error handling, transitions

### Testing Checklist
- [ ] Desktop: Chrome, Firefox, Safari, Edge
- [ ] Mobile: iOS Safari, Android Chrome
- [ ] Keyboard navigation: Arrow keys, Esc, Tab
- [ ] Touch gestures: Swipe, pinch-to-zoom
- [ ] Screen reader: NVDA/JAWS/VoiceOver
- [ ] SSR: Verify no hydration errors
- [ ] Performance: Check Lighthouse score impact
- [ ] Network: Test with slow 3G connection

---

## References & Resources

### Bigger Picture
- GitHub: https://github.com/henrygd/bigger-picture
- Demo: https://henrygd.github.io/bigger-picture/
- NPM: https://www.npmjs.com/package/bigger-picture

### svelte-lightbox
- Documentation: https://svelte-lightbox.js.org/
- GitHub: https://github.com/Hejtmus/svelte-lightbox
- NPM: https://www.npmjs.com/package/svelte-lightbox

### Custom Implementation Resources
- MDN Dialog Element: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
- Svelte 5 Runes: https://svelte-5-preview.vercel.app/docs/runes
- WCAG Modal Accessibility: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/

### Related Articles
- "Quickly add lightbox in SvelteKit": https://www.sabbirz.com/blog/quickly-add-lightbox-in-sveltekit-project-using-bi
- "Lightbox for Svelte/SvelteKit": https://webjeda.com/blog/lightbox-svelte

---

## Conclusion

**Bigger Picture** emerges as the clear winner for this use case, offering the best balance of:
- Lightweight bundle size
- Svelte-native integration
- Feature completeness
- Active maintenance
- Ease of integration

The recommended approach is to proceed with Bigger Picture implementation, with a custom implementation as a fallback if compatibility issues arise during testing.

**Estimated Total Implementation Time:** 3-4 hours for Bigger Picture, 8-16 hours for custom implementation.

**Confidence Level:** High - Bigger Picture is a proven solution with active community support and excellent fit for the project requirements.

