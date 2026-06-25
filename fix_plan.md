# Fix plan — image-performance modernization

Authoritative spec: `docs/perf-modernization-ralph.md`. One task per loop.

- [x] **P0a** — Stop eager-loading every gallery image (`eager={index < 6}`).
- [x] **P0b** — Split image-import maps (gallery vs detail/carousel); drop `dev`.
- [x] **P1a** — Add AVIF to imagetools profiles.
- [x] **P1b** — Lower carousel `INSTANCE_COUNT` 5→3.
- [x] **P2a** — Precompute lightbox dimensions; stop runtime probing.
- [ ] **P2b** — Re-enable Vercel Speed Insights + Analytics.
