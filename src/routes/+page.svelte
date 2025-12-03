<svelte:head>
	<title>NOPE Documentation - Safety Layer for Chat & LLMs</title>
</svelte:head>

<div class="prose">
	<h1>NOPE Documentation</h1>

	<p class="text-xl text-gray-600 mb-8">
		Safety layer for chat & LLMs. Analyze conversations for mental health and safeguarding risk with clinical-grade accuracy.
	</p>

	<div class="grid md:grid-cols-2 gap-6 not-prose mb-12">
		<a href="/api" class="block p-6 border border-gray-200 rounded-lg hover:border-teal-500 hover:shadow-md transition-all">
			<div class="text-2xl mb-2">🔌</div>
			<h3 class="font-semibold text-gray-900 mb-2">REST API Reference</h3>
			<p class="text-sm text-gray-600">Complete reference for the evaluate, safe, and webhook endpoints.</p>
		</a>

		<a href="/sdk/python" class="block p-6 border border-gray-200 rounded-lg hover:border-teal-500 hover:shadow-md transition-all">
			<div class="text-2xl mb-2">🐍</div>
			<h3 class="font-semibold text-gray-900 mb-2">Python SDK</h3>
			<p class="text-sm text-gray-600">Install with pip and start evaluating in minutes.</p>
		</a>

		<a href="/sdk/node" class="block p-6 border border-gray-200 rounded-lg hover:border-teal-500 hover:shadow-md transition-all">
			<div class="text-2xl mb-2">📦</div>
			<h3 class="font-semibold text-gray-900 mb-2">Node.js SDK</h3>
			<p class="text-sm text-gray-600">TypeScript-first SDK with full type definitions.</p>
		</a>

		<a href="/taxonomy" class="block p-6 border border-gray-200 rounded-lg hover:border-teal-500 hover:shadow-md transition-all">
			<div class="text-2xl mb-2">📋</div>
			<h3 class="font-semibold text-gray-900 mb-2">Risk Taxonomy</h3>
			<p class="text-sm text-gray-600">Deep dive into domains, features, severity, and clinical frameworks.</p>
		</a>
	</div>

	<h2>What is NOPE?</h2>

	<p>
		NOPE analyzes text conversations for mental health and safeguarding risk. It detects suicidal ideation,
		self-harm, violence toward others, abuse, and other high-risk patterns, then helps systems respond safely
		with crisis resources, safe response templates, and structured signals.
	</p>

	<h3>Core Capabilities</h3>

	<ul>
		<li><strong>Multi-domain risk assessment</strong> - Evaluate risk across self-harm, violence, safeguarding, and victimisation domains</li>
		<li><strong>Severity & imminence separation</strong> - Know both HOW serious and HOW urgent</li>
		<li><strong>Evidence-based taxonomy</strong> - Built on C-SSRS, HCR-20, DASH, START clinical frameworks</li>
		<li><strong>Protective factor detection</strong> - Identify strengths alongside risks</li>
		<li><strong>Legal/safeguarding flags</strong> - IPV, child protection, third-party threats</li>
		<li><strong>Classification-aware resources</strong> - Crisis helplines matched to the specific risk profile</li>
	</ul>

	<h3>Quick Example</h3>

	<pre><code class="language-typescript">const response = await fetch('https://api.nope.net/v1/evaluate', &#123;
  method: 'POST',
  headers: &#123;
    'Authorization': `Bearer $&#123;API_KEY&#125;`,
    'Content-Type': 'application/json',
  &#125;,
  body: JSON.stringify(&#123;
    messages: [
      &#123; role: "user", content: "I've been feeling hopeless lately" &#125;
    ],
    config: &#123; user_country: 'US' &#125;
  &#125;),
&#125;);

const result = await response.json();
// result.global.overall_severity → "moderate"
// result.domains[0].risk_features → ["hopelessness"]
// result.crisis_resources → [&#123; name: "988 Lifeline", ... &#125;]</code></pre>

	<h3>What NOPE Does NOT Do</h3>

	<ul>
		<li>Diagnose mental illness</li>
		<li>Replace clinical assessment by licensed professionals</li>
		<li>Guarantee crisis prevention</li>
		<li>Serve as emergency intervention</li>
	</ul>

	<blockquote>
		<strong>This API supports human decision-making, not replaces it.</strong> Always maintain human oversight for high-risk situations.
	</blockquote>

	<h2>Getting Help</h2>

	<ul>
		<li><strong>Documentation:</strong> You're here!</li>
		<li><strong>API Status:</strong> <a href="https://status.nope.net">status.nope.net</a></li>
		<li><strong>Test Suites:</strong> <a href="https://suites.nope.net">suites.nope.net</a></li>
		<li><strong>Support:</strong> hello@nope.net</li>
	</ul>
</div>
