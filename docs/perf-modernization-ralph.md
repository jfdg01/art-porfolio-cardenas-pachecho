# Ralph task: image-performance modernization

Branch: `perf/image-modernization`. This is a heavy-image SvelteKit art portfolio
(Svelte 5, `@zerodevx/svelte-img` + imagetools, Vercel adapter). Goal: make it
faster, focused on image delivery and initial-load JS, WITHOUT regressing behavior
or visuals.

## Working rules

- Make ONE focused change per iteration, then verify, then commit. Do not batch.
- After each change run: `npm run check` (must pass) and `npm run build` (must succeed).
- Commit each completed item with a clear message and the standard Co-Authored-By trailer.
- Update the checkboxes below in this file as part of the same commit.
- Do not touch unrelated code. Do not delete originals until a replacement is verified.
- If a step turns out to be wrong or unsafe, note why in this file and skip it.

## Tasks (in order — highest impact first)

- [ ] **P0a — Stop eager-loading every gallery image.**
      In `src/lib/components/ArtworkGrid.svelte`, change the card render so only the
      first 6 (above-the-fold) images are eager: `eager={index < 6}` instead of
      `eager={true}`. Keep `isPriority={index < 6}`. Verify lazy `loading="lazy"` now
      appears on later cards in the built/served HTML.

- [ ] **P0b — Split image-import maps so the gallery bundle doesn't ship detail/carousel srcsets.**
      `src/lib/data/imageImports.ts` eager-globs four profiles (`gallery`, `detail`,
      `carousel`, `dev`) in one module imported by every route. Split it: keep
      `imageMapGallery` in `imageImports.ts` (imported by the gallery + cards); move
      `imageMapDetail` and `imageMapCarousel` into a new module
      `src/lib/data/imageImportsDetail.ts` imported ONLY by `/artwork/[id]` and its
      child components (`ArtworkCarousel`, `ThumbnailCarousel`, the detail page).
      Delete the dead `dev` branch and `dev` profile usage entirely. Update all imports.
      Verify build still resolves images on both routes.

- [ ] **P1a — Add AVIF to imagetools profiles.**
      In `vite.config.ts`, change each profile's `format` to put avif first, e.g.
      `format=avif;webp;jpg` for `gallery`, `detail`, and `carousel`. Rebuild and
      confirm `<source type="image/avif">` is emitted and images still render.

- [ ] **P1b — Reduce detail-page carousel node count.**
      In `src/lib/components/ArtworkCarousel.svelte`, lower `INSTANCE_COUNT` from 5 to 3.
      Verify the infinite-scroll illusion + center-on-current still work.

- [ ] **P2a — Precompute lightbox image dimensions; stop runtime probing.**
      The detail page (`src/routes/artwork/[id]/+page.svelte`) `openLightbox()` creates
      `new Image()` per image just to read natural width/height. If width/height already
      exist (or can be added) on the artwork image data via the generate scripts, pass
      them directly to BiggerPicture instead of probing. Only do this if it can be done
      cleanly without guessing dimensions; otherwise document why skipped and leave as-is.

- [ ] **P2b — Re-enable Vercel Speed Insights + Analytics.**
      Uncomment the `injectSpeedInsights()` / `injectAnalytics()` calls in
      `src/routes/+layout.svelte` so the wins are measurable. Keep it minimal.

## Out of scope (do NOT do)

- The undefined `montserrat-*` font classes (decide later; not a perf blocker).
- Dropping `static/images/` (lightbox depends on it; only revisit after P2a proves
  an optimized full-size source works).
- Any redesign / visual changes.

## Definition of done (completion promise may ONLY be output when ALL are true)

1. Every checkbox above is either checked (done) or explicitly marked skipped-with-reason.
2. `npm run check` passes with no new errors.
3. `npm run build` succeeds.
4. All changes are committed on `perf/image-modernization` (clean working tree).
