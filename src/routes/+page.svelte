<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>NOPE API Reference</title>
</svelte:head>

<div class="flex gap-8">
	<!-- TOC Sidebar (desktop only) -->
	<aside class="hidden lg:block w-56 shrink-0">
		<nav class="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto text-sm">
			<div class="font-semibold text-gray-900 dark:text-white mb-3">On this page</div>
			<ul class="space-y-1">
				{#each data.toc as item}
					<li class={item.level === 3 ? 'pl-3' : ''}>
						<a
							href="#{item.id}"
							class="block py-1 text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 truncate transition-colors"
						>
							{item.title}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</aside>

	<!-- Content -->
	<article class="prose max-w-none flex-1 min-w-0">
		{@html data.html}
	</article>
</div>
