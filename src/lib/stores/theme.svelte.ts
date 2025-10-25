import { browser } from '$app/environment';

type Theme = 'light' | 'dark' | 'system';

class ThemeStore {
	private _theme = $state<Theme>('system');
	private _resolvedTheme = $state<'light' | 'dark'>('light');

	constructor() {
		if (browser) {
			this.initializeTheme();
		}
	}

	get theme() {
		return this._theme;
	}

	get resolvedTheme() {
		return this._resolvedTheme;
	}

	set theme(value: Theme) {
		this._theme = value;
		this.updateResolvedTheme();
		this.saveTheme();
	}

	private initializeTheme() {
		const saved = localStorage.getItem('theme') as Theme;
		if (saved && ['light', 'dark', 'system'].includes(saved)) {
			this._theme = saved;
		}
		this.updateResolvedTheme();
	}

	private updateResolvedTheme() {
		if (this._theme === 'system') {
			this._resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light';
		} else {
			this._resolvedTheme = this._theme;
		}
		this.applyTheme();
	}

	private applyTheme() {
		const html = document.documentElement;
		if (this._resolvedTheme === 'dark') {
			html.classList.add('dark');
		} else {
			html.classList.remove('dark');
		}
	}

	private saveTheme() {
		if (browser) {
			localStorage.setItem('theme', this._theme);
		}
	}

	toggle() {
		this.theme = this._resolvedTheme === 'light' ? 'dark' : 'light';
	}
}

export const themeStore = new ThemeStore();
