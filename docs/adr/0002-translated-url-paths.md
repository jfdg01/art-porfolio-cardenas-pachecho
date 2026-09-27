# Each Locale has its own translated URL paths

Spanish lives at the root with Spanish paths (`/obra/[id]`, `/clases`, `/contacto`) and English under `/en` with English paths (`/en/artwork/[id]`, `/en/classes`, `/en/contact`), handled by Paraglide. We chose this over one shared URL with a cookie because search engines can only index a language that has its own URL. The old paths (`/artwork/[id]`, `/clases-online`, `/contact`) were already indexed, so `vercel.json` keeps permanent (301) redirects from them; do not remove those redirects.
