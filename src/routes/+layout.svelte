<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<meta name="description" content="NOPE API Documentation - Safety layer for chat & LLMs" />
</svelte:head>

<div class="min-h-screen bg-white">
	<!-- Header -->
	<header class="sticky top-0 z-50 bg-white border-b border-gray-200">
		<div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between h-14">
				<a href="/" class="flex items-center gap-2">
					<div class="w-8 h-8 bg-zinc-900 rounded flex items-center justify-center text-white font-bold text-sm">
						N
					</div>
					<span class="font-semibold text-gray-900">NOPE</span>
					<span class="text-gray-400">/</span>
					<span class="text-gray-600">Docs</span>
				</a>

				<nav class="flex items-center gap-6 text-sm">
					<a href="https://nope.net" class="text-gray-600 hover:text-gray-900">Home</a>
					<a href="https://dashboard.nope.net" class="px-3 py-1.5 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors">
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
