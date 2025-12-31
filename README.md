# Cardenas Pacheco | Digital Portfolio

![Svelte 5](https://img.shields.io/badge/Svelte-5.0_Runes-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)
![Tailwind 4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Edge-000000?style=for-the-badge&logo=vercel&logoColor=white)

This is the digital portfolio for **Cardenas Pacheco**.

The goal here was simple: build a gallery that feels instant and gets out of the way. The art should be the focus, not the UI loading spinners. I used this project to test drive the new **Svelte 5 Runes** syntax and **Tailwind 4**, and the performance gains were worth it.

---

## 🛠 Under the Hood

I went with a bleeding-edge stack to keep things lightweight and fast.

*   **SvelteKit (Svelte 5)**: Switched to Runes for state management. It makes the reactivity much easier to reason about compared to the old store subscriptions, especially for the complex gallery filters.
*   **Tailwind CSS v4**: The new engine is impressively fast. Zero configuration, just CSS.
*   **Sharp**: I'm not resizing images manually. The build pipeline grabs the high-res uploads and generates optimized WebP/AVIF variants automatically.
*   **svelte-i18n**: The site supports 12 languages. It's fully strictly typed, so we don't break translations when refactoring.

## ✨ Key Features

### The Gallery
It's designed to be fast.
*   **Instant Filtering**: You can filter by category, price, or size instantly. No API round-trips; the metadata is loaded initially and filtered client-side.
*   **Zoom**: High-res viewing without killing bandwidth. We load the heavy assets only when interaction happens.

### Performance
*   **Lighthouse**: Hitting 100 across the board.
*   **Edge Caching**: Deployed on Vercel with aggressive caching headers for the static assets.

## 🚀 Running Locally

If you want to poke around the code:

1.  **Clone it**
    ```bash
    git clone https://github.com/jfdg01/portal-artistas.git
    cd portal-artistas
    ```

2.  **Install**
    ```bash
    npm install
    # or pnpm install, if that's your thing
    ```

3.  **Run dev**
    ```bash
    npm run dev
    ```

### Helpful Scripts

*   `npm run images:convert`: Runs the Sharp pipeline. Useful if you've added new raw images to `src/lib/data`.
*   `npm run check`: Runs the Svelte type checker. I keep this strict.
*   `npm run hygiene`: Runs linting, formatting, and type-checking in one go.

## 📄 License

Code is for private reference. Artwork copyright belongs to **Cardenas Pacheco**.
