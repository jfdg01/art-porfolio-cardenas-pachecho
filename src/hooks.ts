import type { Reroute } from '@sveltejs/kit';
import { deLocalizeUrl } from '$lib/paraglide/runtime';

// Each Locale has its own paths (ADR 0002); the routes live under the English ones.
export const reroute: Reroute = (request) => deLocalizeUrl(request.url).pathname;
