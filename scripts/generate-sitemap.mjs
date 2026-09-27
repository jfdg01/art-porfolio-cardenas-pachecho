#!/usr/bin/env node

/**
 * Sitemap Generator for Carmen Cárdenas Pacheco Artist Portal
 * Generates sitemap.xml with all static routes and dynamic artwork pages
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Read artwork data
const artworkDataPath = join(projectRoot, 'src', 'lib', 'data', 'artworkData.ts');
const artworkDataContent = readFileSync(artworkDataPath, 'utf8');

// Extract artwork IDs from the data file
const artworkIdMatches = artworkDataContent.match(/id:\s*['"`]([^'"`]+)['"`]/g);
const artworkIds = artworkIdMatches
	? artworkIdMatches.map((match) => match.replace(/id:\s*['"`]/, '').replace(/['"`]/, ''))
	: [];

// Base URL - update this to your actual domain
const baseUrl = 'https://cardenaspacheco.com';

// Static routes
const staticRoutes = [
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

// Generate artwork routes
const artworkRoutes = artworkIds.map((id) => ({
	url: `/artwork/${id}`,
	changefreq: 'monthly',
	priority: '0.6',
	lastmod: new Date().toISOString().split('T')[0]
}));

// Combine all routes
const allRoutes = [...staticRoutes, ...artworkRoutes];

// Generate XML sitemap
function generateSitemap(routes) {
	const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
	const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
	const urlsetClose = '</urlset>';

	const urlEntries = routes
		.map((route) => {
			const fullUrl = `${baseUrl}${route.url}`;
			return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
		})
		.join('\n');

	return xmlHeader + urlsetOpen + urlEntries + '\n' + urlsetClose;
}

// Generate and write sitemap
const sitemapXml = generateSitemap(allRoutes);
const sitemapPath = join(projectRoot, 'static', 'sitemap.xml');

writeFileSync(sitemapPath, sitemapXml, 'utf8');

console.log('✅ Sitemap generated successfully!');
console.log(`📄 Generated sitemap with ${allRoutes.length} URLs`);
console.log(`📁 Saved to: ${sitemapPath}`);
console.log(`🌐 Base URL: ${baseUrl}`);
console.log(`🎨 Artwork pages: ${artworkIds.length}`);
console.log(`📄 Static pages: ${staticRoutes.length}`);

// Display first few URLs as preview
console.log('\n📋 Preview of generated URLs:');
allRoutes.slice(0, 10).forEach((route) => {
	console.log(`  ${baseUrl}${route.url} (priority: ${route.priority})`);
});
if (allRoutes.length > 10) {
	console.log(`  ... and ${allRoutes.length - 10} more`);
}
