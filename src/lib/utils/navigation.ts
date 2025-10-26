/**
 * Check if a path is currently active in the navigation
 * @param currentPath - The current page pathname
 * @param path - The path to check against
 * @returns true if the path is active
 */
export function isActivePath(currentPath: string, path: string): boolean {
	if (path === '/') {
		// For home, match exact path or artwork detail pages
		return currentPath === '/' || currentPath.startsWith('/artwork/');
	}
	return currentPath === path;
}
