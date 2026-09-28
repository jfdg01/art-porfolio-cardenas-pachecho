import { deLocalizeHref } from '$lib/paraglide/runtime';
import { m } from '$lib/paraglide/messages';

/** The one navigation list of the site. */
export const LINKS = [
	{ path: '/', label: m.artworks },
	{ path: '/classes', label: m.onlineClassesPage },
	{ path: '/contact', label: m.contact }
];

/**
 * Check if a path is currently active in the navigation
 * @param currentPath - The current page pathname, in any Locale
 * @param path - The route path to check against, such as `/classes`
 * @returns true if the path is active
 */
export function isActivePath(currentPath: string, path: string): boolean {
	const route = deLocalizeHref(currentPath);
	if (path === '/') {
		// For home, match exact path or artwork detail pages
		return route === '/' || route.startsWith('/artwork/');
	}
	return route === path;
}
