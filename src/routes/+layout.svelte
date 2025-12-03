<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';

	let { children } = $props();
	let showMobileNav = $state(false);

	const navigation = [
		{
			section: 'Getting Started',
			items: [
				{ title: 'Introduction', href: '/' },
				{ title: 'Quick Start', href: '/quickstart' },
				{ title: 'Authentication', href: '/authentication' },
			]
		},
		{
			section: 'API Reference',
			items: [
				{ title: 'Overview', href: '/api' },
				{ title: 'Evaluate Endpoint', href: '/api/evaluate' },
				{ title: 'Safe Endpoint', href: '/api/safe' },
				{ title: 'Webhooks', href: '/api/webhooks' },
				{ title: 'Errors & Rate Limits', href: '/api/errors' },
			]
		},
		{
			section: 'SDKs',
			items: [
				{ title: 'Python SDK', href: '/sdk/python' },
				{ title: 'Node.js SDK', href: '/sdk/node' },
			]
		},
		{
			section: 'Taxonomy',
			items: [
				{ title: 'Overview', href: '/taxonomy' },
				{ title: 'Risk Domains', href: '/taxonomy/domains' },
				{ title: 'Severity & Imminence', href: '/taxonomy/severity' },
				{ title: 'Risk Features', href: '/taxonomy/features' },
				{ title: 'Protective Factors', href: '/taxonomy/protective' },
				{ title: 'Legal & Safeguarding', href: '/taxonomy/legal' },
				{ title: 'Clinical Frameworks', href: '/taxonomy/frameworks' },
			]
		},
	];

	function isActive(href: string): boolean {
		const currentPath = $page.url.pathname;
		if (href === '/') return currentPath === '/';
		return currentPath === href || currentPath.startsWith(href + '/');
	}
</script>

<svelte:head>
	<meta name="description" content="NOPE API Documentation - Safety layer for chat & LLMs" />
</svelte:head>

<div class="min-h-screen bg-white">
	<!-- Header -->
	<header class="sticky top-0 z-50 bg-white border-b border-gray-200">
		<div class="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between h-14">
				<div class="flex items-center gap-4">
					<a href="/" class="flex items-center gap-2">
						<div class="w-8 h-8 bg-zinc-900 rounded flex items-center justify-center text-white font-bold text-sm">
							N
						</div>
						<span class="font-semibold text-gray-900">NOPE</span>
						<span class="text-gray-400">/</span>
						<span class="text-gray-600">Docs</span>
					</a>
				</div>

				<nav class="hidden md:flex items-center gap-6 text-sm">
					<a href="/api" class="text-gray-600 hover:text-gray-900">API</a>
					<a href="/sdk/python" class="text-gray-600 hover:text-gray-900">SDKs</a>
					<a href="/taxonomy" class="text-gray-600 hover:text-gray-900">Taxonomy</a>
					<a href="https://nope.net" class="text-gray-600 hover:text-gray-900">Home</a>
					<a href="https://dashboard.nope.net" class="px-3 py-1.5 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors">
						Get API Key
					</a>
				</nav>

				<button
					onclick={() => showMobileNav = !showMobileNav}
					class="md:hidden p-2 text-gray-600 hover:text-gray-900"
					aria-label="Toggle navigation"
				>
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						{#if showMobileNav}
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						{:else}
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
						{/if}
					</svg>
				</button>
			</div>
		</div>
	</header>

	<div class="max-w-screen-2xl mx-auto flex">
		<!-- Sidebar -->
		<aside class={`
			${showMobileNav ? 'fixed inset-0 z-40 bg-white pt-14' : 'hidden'}
			md:block md:sticky md:top-14 md:w-64 md:h-[calc(100vh-3.5rem)] md:overflow-y-auto md:border-r md:border-gray-200
		`}>
			<nav class="p-4 space-y-1">
				{#each navigation as group}
					<div class="nav-section">{group.section}</div>
					{#each group.items as item}
						<a
							href={item.href}
							class="nav-item {isActive(item.href) ? 'active' : ''}"
							onclick={() => showMobileNav = false}
						>
							{item.title}
						</a>
					{/each}
				{/each}
			</nav>
		</aside>

		<!-- Main Content -->
		<main class="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-8">
			<div class="max-w-4xl">
				{@render children()}
			</div>
		</main>
	</div>
</div>
