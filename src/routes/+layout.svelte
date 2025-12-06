<script lang="ts">
	import '../app.css';
	import ThemeToggle from '$lib/ThemeToggle.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<meta name="description" content="NOPE API Documentation - Safety layer for chat & LLMs" />
</svelte:head>

<div class="min-h-screen bg-white dark:bg-gray-900 transition-colors">
	<!-- Header -->
	<header class="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors">
		<div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between h-14">
				<a href="/" class="flex items-center gap-2">
					<div class="w-8 h-8 bg-zinc-900 dark:bg-white rounded flex items-center justify-center text-white dark:text-gray-900 font-bold text-sm transition-colors">
						N
					</div>
					<span class="font-semibold text-gray-900 dark:text-white">NOPE</span>
					<span class="text-gray-400 dark:text-gray-600">/</span>
					<span class="text-gray-600 dark:text-gray-400">Docs</span>
				</a>

				<nav class="flex items-center gap-4 text-sm">
					<ThemeToggle />
					<a href="https://nope.net" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Home</a>
					<a href="https://dashboard.nope.net" class="px-3 py-1.5 bg-teal-600 text-white rounded-md hover:bg-teal-700 dark:hover:bg-teal-500 transition-colors">
						Get API Key
					</a>
				</nav>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		{@render children()}
	</main>
</div>
