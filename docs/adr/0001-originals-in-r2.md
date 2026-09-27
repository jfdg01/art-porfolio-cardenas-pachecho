# Original photos live in Cloudflare R2, not in git

The Full View must show each Artwork at the original resolution of its photo so the charcoal and paint texture are visible. The originals are 5 MB or more each, so the repo keeps only the display copies that the build turns into responsive images, and the originals live in a Cloudflare R2 bucket that the Full View loads from.

## Considered Options

- **Originals in git**: every image change grows the history forever, and every Vercel build clones all of it.
- **Git LFS**: GitHub's free plan gives 1 GB of bandwidth a month, and every Vercel build spends some of it.
- **Cloudflare R2** (chosen): free up to 10 GB with zero egress cost; the `add-artwork` skill uploads the original.
