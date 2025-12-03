<svelte:head>
	<title>Quick Start - NOPE Documentation</title>
</svelte:head>

<div class="prose">
	<h1>Quick Start</h1>

	<p class="text-xl text-gray-600 mb-8">
		Get started with NOPE in under 5 minutes. Evaluate your first conversation and handle the response.
	</p>

	<h2>60-Second Integration</h2>

	<pre><code>// Evaluate user message
const response = await fetch('https://api.nope.net/v1/evaluate', &#123;
  method: 'POST',
  headers: &#123;
    'Authorization': `Bearer $&#123;process.env.NOPE_API_KEY&#125;`,
    'Content-Type': 'application/json',
  &#125;,
  body: JSON.stringify(&#123;
    messages: [
      &#123; role: "user", content: "I've been feeling really hopeless lately" &#125;
    ],
    config: &#123; user_country: 'GB' &#125;
  &#125;),
&#125;);

const result = await response.json();

// Check overall severity
if (result.global.overall_severity === 'high' ||
    result.global.overall_severity === 'critical') &#123;
  displayCrisisBanner(result.crisis_resources);
&#125;

// Check specific domains
const selfDomain = result.domains.find(d => d.domain === 'self');
if (selfDomain?.severity !== 'none') &#123;
  logSafetyEvent(conversationId, result);
&#125;</code></pre>

	<p><strong>That's it.</strong> Everything else is optional.</p>

	<hr class="my-12" />

	<h2>Get Your API Key</h2>

	<ol>
		<li>Create an account at <a href="https://dashboard.nope.net">dashboard.nope.net</a></li>
		<li>Navigate to your Account page</li>
		<li>Click "Create API Key"</li>
		<li>Copy your key (starts with <code>nope_live_</code>)</li>
	</ol>

	<div class="not-prose bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-6">
		<p class="text-sm text-yellow-800">
			<strong>Important:</strong> Keep your API key secret. Never expose it in client-side code or public repositories.
		</p>
	</div>

	<hr class="my-12" />

	<h2>Install an SDK</h2>

	<h3>Python</h3>

	<pre><code>pip install nope-net</code></pre>

	<pre><code>from nope import NopeClient

client = NopeClient(api_key="nope_live_...")
result = client.evaluate(
    messages=[&#123;"role": "user", "content": "I feel hopeless"&#125;],
    config=&#123;"user_country": "US"&#125;
)
print(result.global_.overall_severity)</code></pre>

	<h3>Node.js</h3>

	<pre><code>npm install @nope-net/sdk</code></pre>

	<pre><code>import &#123; NopeClient &#125; from '@nope-net/sdk';

const client = new NopeClient(&#123; apiKey: 'nope_live_...' &#125;);
const result = await client.evaluate(&#123;
  messages: [&#123; role: 'user', content: 'I feel hopeless' &#125;],
  config: &#123; user_country: 'US' &#125;
&#125;);
console.log(result.global.overall_severity);</code></pre>

	<hr class="my-12" />

	<h2>Understanding the Response</h2>

	<p>Every evaluation returns:</p>

	<table>
		<thead>
			<tr>
				<th>Field</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>domains</code></td>
				<td>Array of domain-specific assessments (self, others, victimisation, etc.)</td>
			</tr>
			<tr>
				<td><code>global</code></td>
				<td>Overall severity and imminence (max across all domains)</td>
			</tr>
			<tr>
				<td><code>legal_flags</code></td>
				<td>IPV, child safeguarding, third-party threat indicators</td>
			</tr>
			<tr>
				<td><code>crisis_resources</code></td>
				<td>Country-specific helplines matched to detected risk</td>
			</tr>
			<tr>
				<td><code>confidence</code></td>
				<td>Classification confidence (0.0-1.0)</td>
			</tr>
		</tbody>
	</table>

	<hr class="my-12" />

	<h2>Basic Response Handling</h2>

	<pre><code>async function handleUserMessage(message, conversationId) &#123;
  const result = await nope.evaluate(&#123;
    messages: [&#123; role: 'user', content: message &#125;],
    config: &#123;
      user_country: 'US',
      conversation_id: conversationId
    &#125;
  &#125;);

  // Handle by severity level
  switch (result.global.overall_severity) &#123;
    case 'critical':
      // Emergency - show crisis resources prominently
      showEmergencyBanner(result.crisis_resources);
      notifyOnCallStaff(result);
      break;

    case 'high':
      // Serious - show crisis resources, log for review
      showCrisisResources(result.crisis_resources);
      logForReview(conversationId, result);
      break;

    case 'moderate':
      // Concerning - offer resources, continue conversation
      offerResources(result.crisis_resources);
      break;

    case 'mild':
    case 'none':
      // Low/no concern - normal operation
      break;
  &#125;

  // Check for legal flags
  if (result.legal_flags?.intimate_partner_violence?.risk_level === 'extreme') &#123;
    showDVResources(result.crisis_resources);
  &#125;

  if (result.legal_flags?.third_party_threat?.identifiable_victim) &#123;
    escalateToSafetyTeam(result);
  &#125;

  return result;
&#125;</code></pre>

	<hr class="my-12" />

	<h2>Next Steps</h2>

	<ul>
		<li><a href="/api/evaluate">Evaluate endpoint reference</a> - Full request/response details</li>
		<li><a href="/api/webhooks">Webhooks</a> - Get notified when risk thresholds are crossed</li>
		<li><a href="/taxonomy">Taxonomy reference</a> - Understanding risk domains and features</li>
		<li><a href="/sdk/python">Python SDK</a> / <a href="/sdk/node">Node SDK</a> - Full SDK documentation</li>
	</ul>
</div>
