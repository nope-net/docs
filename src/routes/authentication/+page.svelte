<svelte:head>
	<title>Authentication - NOPE Documentation</title>
</svelte:head>

<div class="prose">
	<h1>Authentication</h1>

	<p class="text-xl text-gray-600 mb-8">
		All NOPE API endpoints require authentication via API key.
	</p>

	<h2>API Key Format</h2>

	<p>NOPE API keys use the format:</p>

	<pre><code>nope_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</code></pre>

	<table>
		<thead>
			<tr>
				<th>Prefix</th>
				<th>Environment</th>
				<th>Usage</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>nope_live_</code></td>
				<td>Production</td>
				<td>Live API calls, counts against quota</td>
			</tr>
			<tr>
				<td><code>nope_test_</code></td>
				<td>Test</td>
				<td>Development/testing, no quota impact</td>
			</tr>
		</tbody>
	</table>

	<hr class="my-12" />

	<h2>Using Your API Key</h2>

	<p>Include your API key in the <code>Authorization</code> header:</p>

	<pre><code>Authorization: Bearer nope_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Content-Type: application/json</code></pre>

	<h3>cURL Example</h3>

	<pre><code>curl -X POST https://api.nope.net/v1/evaluate \
  -H "Authorization: Bearer nope_live_xxx" \
  -H "Content-Type: application/json" \
  -d '&#123;
    "messages": [&#123;"role": "user", "content": "Hello"&#125;],
    "config": &#123;&#125;
  &#125;'</code></pre>

	<h3>JavaScript Example</h3>

	<pre><code>const response = await fetch('https://api.nope.net/v1/evaluate', &#123;
  method: 'POST',
  headers: &#123;
    'Authorization': `Bearer $&#123;process.env.NOPE_API_KEY&#125;`,
    'Content-Type': 'application/json',
  &#125;,
  body: JSON.stringify(&#123;
    messages: [&#123; role: 'user', content: 'Hello' &#125;],
    config: &#123;&#125;
  &#125;),
&#125;);</code></pre>

	<h3>Python Example</h3>

	<pre><code>import httpx

response = httpx.post(
    'https://api.nope.net/v1/evaluate',
    headers=&#123;
        'Authorization': f'Bearer &#123;os.environ["NOPE_API_KEY"]&#125;',
        'Content-Type': 'application/json',
    &#125;,
    json=&#123;
        'messages': [&#123;'role': 'user', 'content': 'Hello'&#125;],
        'config': &#123;&#125;
    &#125;
)</code></pre>

	<hr class="my-12" />

	<h2>Getting an API Key</h2>

	<ol>
		<li>Sign up at <a href="https://dashboard.nope.net">dashboard.nope.net</a></li>
		<li>Navigate to your Account page</li>
		<li>Click "Create API Key"</li>
		<li>Give your key a descriptive name (e.g., "Production", "Development")</li>
		<li>Copy and securely store your key</li>
	</ol>

	<div class="not-prose bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-6">
		<p class="text-sm text-yellow-800">
			<strong>Important:</strong> Your full API key is only shown once at creation time. If you lose it, you'll need to create a new key.
		</p>
	</div>

	<hr class="my-12" />

	<h2>Key Security Best Practices</h2>

	<h3>Do</h3>
	<ul>
		<li>Store keys in environment variables</li>
		<li>Use secret management services (AWS Secrets Manager, HashiCorp Vault)</li>
		<li>Rotate keys periodically</li>
		<li>Use separate keys for development and production</li>
		<li>Monitor key usage in the dashboard</li>
	</ul>

	<h3>Don't</h3>
	<ul>
		<li>Commit keys to version control</li>
		<li>Expose keys in client-side JavaScript</li>
		<li>Share keys via unencrypted channels (email, chat)</li>
		<li>Use production keys in development</li>
	</ul>

	<hr class="my-12" />

	<h2>Managing Keys</h2>

	<p>From the dashboard, you can:</p>

	<ul>
		<li><strong>View keys</strong> - See all active keys (last 4 characters only)</li>
		<li><strong>Create keys</strong> - Generate new API keys</li>
		<li><strong>Revoke keys</strong> - Immediately disable a compromised key</li>
		<li><strong>View usage</strong> - Monitor request counts per key</li>
	</ul>

	<hr class="my-12" />

	<h2>Authentication Errors</h2>

	<h3>401 Unauthorized</h3>

	<p>Missing or invalid API key:</p>

	<pre><code>&#123;
  "error": &#123;
    "code": "unauthorized",
    "message": "Invalid or missing API key"
  &#125;
&#125;</code></pre>

	<p><strong>Causes:</strong></p>
	<ul>
		<li>Missing <code>Authorization</code> header</li>
		<li>Malformed header (missing <code>Bearer</code> prefix)</li>
		<li>Invalid key format</li>
		<li>Key doesn't exist</li>
	</ul>

	<h3>403 Forbidden</h3>

	<p>Valid key but access denied:</p>

	<pre><code>&#123;
  "error": &#123;
    "code": "forbidden",
    "message": "API key has been revoked"
  &#125;
&#125;</code></pre>

	<p><strong>Causes:</strong></p>
	<ul>
		<li>Key has been revoked</li>
		<li>Account suspended</li>
		<li>Accessing admin-only endpoint</li>
	</ul>

	<hr class="my-12" />

	<h2>Rate Limits by Tier</h2>

	<table>
		<thead>
			<tr>
				<th>Tier</th>
				<th>Evaluations/Month</th>
				<th>Requests/Minute</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Free</td>
				<td>10,000</td>
				<td>20</td>
			</tr>
			<tr>
				<td>Pro</td>
				<td>100,000</td>
				<td>100</td>
			</tr>
			<tr>
				<td>Enterprise</td>
				<td>Custom</td>
				<td>Custom</td>
			</tr>
		</tbody>
	</table>

	<p>Rate limit headers are included in every response:</p>

	<pre><code>X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1700000000</code></pre>
</div>
