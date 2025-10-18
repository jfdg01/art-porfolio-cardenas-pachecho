# Implement Bigger Picture Lightbox

## Overview

Add the Bigger Picture lightbox to the artwork detail page. Users can click the main image to open a full-screen zoomable gallery, while keeping the existing arrow navigation and dots on the page.

## Implementation Steps

### 1. Install Dependencies ✅ COMPLETED

- ✅ Installed `bigger-picture` from npm
- ✅ Added `@import 'bigger-picture/css';` to `src/app.css`

### 2. Initialize BiggerPicture ✅ COMPLETED

- ✅ Imported BiggerPicture library in `src/routes/artwork/[id]/+page.svelte`
- ✅ Created `bp` variable to hold the BiggerPicture instance
- ✅ Added `onMount` hook to initialize BiggerPicture (client-side only, Svelte 5 best practice)
- ✅ Added cleanup function to close lightbox on component unmount
- ✅ Added `@ts-expect-error` comment to handle TypeScript module resolution

### 3. Add Click Handler and Image Integration ✅ COMPLETED

- ✅ Created `openLightbox()` function that:
  - Converts `artwork.images` array to BiggerPicture item format
  - Maps each image with `img`, `alt`, `width`, `height` properties
  - Opens the lightbox with all images
  - Starts at the current `currentImageIndex`
- ✅ Added clickable wrapper div around Img component with:
  - `onclick` handler
  - `onkeydown` for keyboard accessibility (Enter key)
  - `cursor-pointer` styling
  - `role="button"`, `tabindex="0"`, and `aria-label` for full accessibility
  - Focus ring styling

### 4. Testing and Cleanup 🔄 IN PROGRESS

- ✅ Run `npm run hygiene` - All checks passed!
  - ✅ TypeScript: 0 errors, 0 warnings
  - ✅ ESLint: passed
  - ✅ Prettier: formatted
  - ✅ i18n: All 12 locales clean
- TODO: Test lightbox functionality in dev server
- TODO: Verify all images display correctly in lightbox
- TODO: Test navigation between images in lightbox
- TODO: Test zoom functionality

## Key Features

- Clicking the image opens a full-screen lightbox
- Lightbox shows all images (main + zoom views)
- Navigation starts at currently displayed image
- On-page arrow buttons and dots remain functional
- Lightbox supports zooming, keyboard navigation, and pinch gestures

## Files Modified

- `package.json` - bigger-picture dependency added
- `src/app.css` - bigger-picture CSS imported
- `src/routes/artwork/[id]/+page.svelte` - BiggerPicture integration in progress
