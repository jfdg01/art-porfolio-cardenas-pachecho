# Ralph Fix Plan — image-performance modernization

Full spec & working rules: `docs/perf-modernization-ralph.md` (authoritative).
Heavy-image SvelteKit art portfolio. Goal: faster image delivery + lighter
initial-load JS, WITHOUT regressing behavior or visuals. ONE task per loop.

## Tasks (in order — highest impact first)

- [ ] **P0a** — Stop eager-loading every gallery image. In `ArtworkGrid.svelte`
      use `eager={index < 6}` (keep `isPriority={index < 6}`); verify later cards get
      `loading="lazy"`.
- [ ] **P0b** — Split `src/lib/data/imageImports.ts`: keep `imageMapGallery`; move
      `imageMapDetail` + `imageMapCarousel` to new `imageImportsDetail.ts` imported only
      by `/artwork/[id]` and children. Delete dead `dev` profile/branch. Update imports.
- [ ] **P1a** — Add AVIF first to imagetools profiles in `vite.config.ts`
      (`format=avif;webp;jpg` for gallery/detail/carousel). Confirm `<source type="image/avif">`.
- [ ] **P1b** — Lower `INSTANCE_COUNT` 5→3 in `ArtworkCarousel.svelte`; verify
      infinite-scroll + center-on-current still work.
- [ ] **P2a** — Precompute lightbox dimensions; stop `new Image()` probing in
      `artwork/[id]/+page.svelte`. Only if doable cleanly without guessing; else skip-with-reason.
- [ ] **P2b** — Re-enable `injectSpeedInsights()` / `injectAnalytics()` in `+layout.svelte`.

## Out of scope (do NOT do)

- `montserrat-*` font classes. Dropping `static/images/`. Any redesign / visual changes.

## Definition of done (only output completion when ALL true)

1. Every checkbox above checked or explicitly skipped-with-reason (here).
2. `npm run check` passes, no new errors.
3. `npm run build` succeeds.
4. All changes committed on `perf/image-modernization` (clean tree).

## Notes / learnings

- (Ralph: append findings here as you go.)
