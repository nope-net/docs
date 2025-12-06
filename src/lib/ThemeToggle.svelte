<script lang="ts">
	import { onMount } from 'svelte';

	// Theme state using Svelte 5 runes
	let theme = $state<'light' | 'dark'>('light');
	let mounted = $state(false);

	// Initialize theme from localStorage or OS preference
	onMount(() => {
		const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;

		if (stored) {
			theme = stored;
		} else {
			// Check OS preference
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			theme = prefersDark ? 'dark' : 'light';
		}

		// Apply theme
		applyTheme(theme);
		mounted = true;

		// Listen for OS preference changes
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = (e: MediaQueryListEvent) => {
			// Only update if user hasn't set a preference
			if (!localStorage.getItem('theme')) {
				theme = e.matches ? 'dark' : 'light';
				applyTheme(theme);
			}
		};

		mediaQuery.addEventListener('change', handleChange);

		return () => {
			mediaQuery.removeEventListener('change', handleChange);
		};
	});

	function applyTheme(newTheme: 'light' | 'dark') {
		if (newTheme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}

	function toggleTheme() {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		theme = newTheme;
		localStorage.setItem('theme', newTheme);
		applyTheme(newTheme);
	}
</script>

{#if mounted}
	<button
		onclick={toggleTheme}
		class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
		aria-label="Toggle theme"
		title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
	>
		{#if theme === 'light'}
			<!-- Moon icon for dark mode -->
			<svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
			</svg>
		{:else}
			<!-- Sun icon for light mode -->
			<svg class="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
			</svg>
		{/if}
	</button>
{/if}
