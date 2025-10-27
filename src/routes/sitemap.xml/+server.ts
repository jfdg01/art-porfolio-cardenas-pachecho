import type { RequestHandler } from '@sveltejs/kit';
import { artworkData } from '$lib/data/artworkData';

// Base URL - update this to your actual domain
const baseUrl = 'https://cardenaspacheco.es';

// Type definitions for sitemap
type ImageEntry = {
	loc: string;
	title: string;
	caption: string;
};

type SitemapRoute = {
	url: string;
	changefreq: string;
	priority: string;
	lastmod: string;
	images?: ImageEntry[];
};

export const GET: RequestHandler = async () => {
	// Static routes
	const staticRoutes: SitemapRoute[] = [
		{
			url: '',
			changefreq: 'weekly',
			priority: '1.0',
			lastmod: new Date().toISOString().split('T')[0]
		},
		{
			url: '/contact',
			changefreq: 'monthly',
			priority: '0.8',
			lastmod: new Date().toISOString().split('T')[0]
		},
		{
			url: '/clases-online',
			changefreq: 'monthly',
			priority: '0.7',
			lastmod: new Date().toISOString().split('T')[0]
		}
	];

	// Generate artwork routes with image information
	const artworkRoutes: SitemapRoute[] = artworkData.map((artwork) => ({
		url: `/artwork/${artwork.id}`,
		changefreq: 'monthly',
		priority: '0.6',
		lastmod: new Date().toISOString().split('T')[0],
		images: artwork.images?.map((img) => ({
			loc: `${baseUrl}${img.src}`,
			title: artwork.title,
			caption: artwork.description || `${artwork.title} by Carmen Cárdenas Pacheco`
		}))
	}));

	// Combine all routes
	const allRoutes: SitemapRoute[] = [...staticRoutes, ...artworkRoutes];

	// Generate XML sitemap with image extensions
	function generateSitemap(routes: SitemapRoute[]) {
		const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
		const urlsetOpen =
			'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n' +
			'        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
		const urlsetClose = '</urlset>';

		const urlEntries = routes
			.map((route) => {
				const fullUrl = `${baseUrl}${route.url}`;
				let imageEntries = '';

				// Add image entries if they exist
				if (route.images && route.images.length > 0) {
					imageEntries = route.images
						.map(
							(img: ImageEntry) =>
								`    <image:image>
      <image:loc>${img.loc}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>
      <image:caption>${escapeXml(img.caption)}</image:caption>
    </image:image>`
						)
						.join('\n');
				}

				return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
${imageEntries}
  </url>`;
			})
			.join('\n');

		return xmlHeader + urlsetOpen + urlEntries + '\n' + urlsetClose;
	}

	// Helper function to escape XML special characters
	function escapeXml(str: string): string {
		return str
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&apos;');
	}

	const sitemapXml = generateSitemap(allRoutes);

	return new Response(sitemapXml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
		}
	});
};
