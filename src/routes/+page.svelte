<script lang="ts">
	import { marked } from 'marked';

	let { data } = $props();

	// Configure marked to add IDs to headings
	const renderer = new marked.Renderer();
	renderer.heading = ({ text, depth }) => {
		const id = text
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '');
		return `<h${depth} id="${id}">${text}</h${depth}>`;
	};

	marked.setOptions({ renderer });

	const html = $derived(marked(data.markdown));
</script>

<svelte:head>
	<title>NOPE API Reference</title>
</svelte:head>

<div class="flex gap-8">
	<!-- TOC Sidebar (desktop only) -->
	<aside class="hidden lg:block w-56 shrink-0">
		<nav class="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto text-sm">
			<div class="font-semibold text-gray-900 mb-3">On this page</div>
			<ul class="space-y-1">
				{#each data.toc as item}
					<li class={item.level === 3 ? 'pl-3' : ''}>
						<a
							href="#{item.id}"
							class="block py-1 text-gray-600 hover:text-teal-600 truncate"
						>
							{item.title}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</aside>

	<!-- Content -->
	<article class="prose flex-1 min-w-0">
		{@html html}
	</article>
</div>
