<svelte:head>
	<title>Error Handling - NOPE Documentation</title>
</svelte:head>

<div class="prose">
	<h1>Error Handling</h1>

	<p class="text-xl text-gray-600 mb-8">
		How to handle errors, rate limits, and edge cases when integrating with the NOPE API.
	</p>

	<h2>Error Response Format</h2>

	<p>All errors return a consistent JSON structure:</p>

	<pre><code>&#123;
  "error": &#123;
    "code": "validation_error",
    "message": "Invalid request: missing required field",
    "details": &#123;
      "field": "messages",
      "issue": "must contain at least one message"
    &#125;
  &#125;
&#125;</code></pre>

	<hr class="my-12" />

	<h2>Error Codes</h2>

	<table>
		<thead>
			<tr>
				<th>Code</th>
				<th>HTTP Status</th>
				<th>Meaning</th>
				<th>Action</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>invalid_request</code></td>
				<td>400</td>
				<td>Malformed request</td>
				<td>Check request syntax</td>
			</tr>
			<tr>
				<td><code>validation_error</code></td>
				<td>422</td>
				<td>Schema validation failed</td>
				<td>Check required fields and types</td>
			</tr>
			<tr>
				<td><code>unauthorized</code></td>
				<td>401</td>
				<td>Invalid/missing API key</td>
				<td>Check Authorization header</td>
			</tr>
			<tr>
				<td><code>forbidden</code></td>
				<td>403</td>
				<td>Valid key but access denied</td>
				<td>Check key permissions or account status</td>
			</tr>
			<tr>
				<td><code>not_found</code></td>
				<td>404</td>
				<td>Resource not found</td>
				<td>Check resource ID or endpoint URL</td>
			</tr>
			<tr>
				<td><code>rate_limited</code></td>
				<td>429</td>
				<td>Rate limit exceeded</td>
				<td>Wait and retry with backoff</td>
			</tr>
			<tr>
				<td><code>internal_error</code></td>
				<td>500</td>
				<td>Server error</td>
				<td>Retry with backoff, contact support if persistent</td>
			</tr>
		</tbody>
	</table>

	<hr class="my-12" />

	<h2>Rate Limiting</h2>

	<h3>Limits by Tier</h3>

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

	<h3>Rate Limit Headers</h3>

	<p>Every response includes rate limit information:</p>

	<pre><code>X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1700000000</code></pre>

	<table>
		<thead>
			<tr>
				<th>Header</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>X-RateLimit-Limit</code></td>
				<td>Maximum requests per minute</td>
			</tr>
			<tr>
				<td><code>X-RateLimit-Remaining</code></td>
				<td>Requests remaining in current window</td>
			</tr>
			<tr>
				<td><code>X-RateLimit-Reset</code></td>
				<td>Unix timestamp when limit resets</td>
			</tr>
		</tbody>
	</table>

	<h3>Handling 429 Responses</h3>

	<pre><code>async function evaluateWithRetry(messages, maxRetries = 3) &#123;
  for (let attempt = 0; attempt < maxRetries; attempt++) &#123;
    const response = await fetch('https://api.nope.net/v1/evaluate', &#123;
      method: 'POST',
      headers: &#123; 'Authorization': `Bearer $&#123;apiKey&#125;` &#125;,
      body: JSON.stringify(&#123; messages, config: &#123;&#125; &#125;)
    &#125;);

    if (response.status === 429) &#123;
      const resetTime = parseInt(response.headers.get('X-RateLimit-Reset'));
      const waitMs = Math.max(0, resetTime * 1000 - Date.now()) + 1000;
      console.log(`Rate limited. Waiting $&#123;waitMs&#125;ms...`);
      await new Promise(resolve => setTimeout(resolve, waitMs));
      continue;
    &#125;

    return response.json();
  &#125;
  throw new Error('Max retries exceeded');
&#125;</code></pre>

	<hr class="my-12" />

	<h2>Fail-Safe Principle</h2>

	<div class="not-prose bg-blue-50 border border-blue-200 rounded-lg p-4 my-6">
		<p class="text-sm text-blue-800">
			<strong>Critical:</strong> On any error, default to showing crisis resources and using cautious responses.
			Never let an API error prevent users from accessing help.
		</p>
	</div>

	<pre><code>async function safeEvaluate(messages) &#123;
  try &#123;
    const result = await nope.evaluate(&#123; messages, config: &#123;&#125; &#125;);
    return result;
  &#125; catch (error) &#123;
    // Log the error for debugging
    console.error('NOPE API error:', error);

    // Return fail-safe response with default crisis resources
    return &#123;
      global: &#123;
        overall_severity: 'unknown',
        overall_imminence: 'unknown'
      &#125;,
      crisis_resources: getDefaultCrisisResources(),
      error: true
    &#125;;
  &#125;
&#125;

function getDefaultCrisisResources() &#123;
  return [
    &#123;
      name: '988 Suicide & Crisis Lifeline',
      phone: '988',
      type: 'crisis_line',
      availability: '24/7'
    &#125;,
    &#123;
      name: 'Crisis Text Line',
      text_instructions: 'Text HOME to 741741',
      type: 'text_line',
      availability: '24/7'
    &#125;
  ];
&#125;</code></pre>

	<hr class="my-12" />

	<h2>Common Errors</h2>

	<h3>Missing Messages</h3>

	<pre><code>// Error
&#123;
  "error": &#123;
    "code": "validation_error",
    "message": "Either 'messages' or 'text' must be provided"
  &#125;
&#125;

// Fix: Include messages array
&#123;
  "messages": [&#123; "role": "user", "content": "Hello" &#125;],
  "config": &#123;&#125;
&#125;</code></pre>

	<h3>Invalid Message Role</h3>

	<pre><code>// Error
&#123;
  "error": &#123;
    "code": "validation_error",
    "message": "Invalid message role",
    "details": &#123;
      "field": "messages[0].role",
      "issue": "must be 'user', 'assistant', or 'system'"
    &#125;
  &#125;
&#125;

// Fix: Use valid role
&#123;
  "messages": [&#123; "role": "user", "content": "Hello" &#125;]
&#125;</code></pre>

	<h3>Invalid Country Code</h3>

	<pre><code>// Error
&#123;
  "error": &#123;
    "code": "validation_error",
    "message": "Invalid country code",
    "details": &#123;
      "field": "config.user_country",
      "issue": "must be valid ISO 3166-1 alpha-2 code"
    &#125;
  &#125;
&#125;

// Fix: Use ISO country code
&#123;
  "config": &#123; "user_country": "US" &#125;  // Not "USA" or "United States"
&#125;</code></pre>

	<h3>API Key Issues</h3>

	<pre><code>// Error: Missing key
&#123;
  "error": &#123;
    "code": "unauthorized",
    "message": "No API key provided"
  &#125;
&#125;

// Error: Invalid key
&#123;
  "error": &#123;
    "code": "unauthorized",
    "message": "Invalid API key"
  &#125;
&#125;

// Error: Revoked key
&#123;
  "error": &#123;
    "code": "forbidden",
    "message": "API key has been revoked"
  &#125;
&#125;</code></pre>

	<hr class="my-12" />

	<h2>Retry Strategy</h2>

	<p>Recommended retry strategy with exponential backoff:</p>

	<pre><code>async function fetchWithRetry(url, options, maxRetries = 3) &#123;
  const delays = [1000, 2000, 4000]; // ms

  for (let attempt = 0; attempt < maxRetries; attempt++) &#123;
    try &#123;
      const response = await fetch(url, options);

      // Don't retry client errors (except rate limits)
      if (response.status >= 400 && response.status < 500 && response.status !== 429) &#123;
        return response;
      &#125;

      // Retry server errors and rate limits
      if (response.status === 429 || response.status >= 500) &#123;
        if (attempt < maxRetries - 1) &#123;
          const delay = response.status === 429
            ? Math.max(delays[attempt], getRetryAfter(response))
            : delays[attempt];
          await new Promise(r => setTimeout(r, delay));
          continue;
        &#125;
      &#125;

      return response;
    &#125; catch (error) &#123;
      // Network errors - retry
      if (attempt < maxRetries - 1) &#123;
        await new Promise(r => setTimeout(r, delays[attempt]));
        continue;
      &#125;
      throw error;
    &#125;
  &#125;
&#125;

function getRetryAfter(response) &#123;
  const reset = response.headers.get('X-RateLimit-Reset');
  if (reset) &#123;
    return Math.max(0, parseInt(reset) * 1000 - Date.now()) + 1000;
  &#125;
  return 1000;
&#125;</code></pre>

	<hr class="my-12" />

	<h2>Timeout Handling</h2>

	<p>Set appropriate timeouts for API calls:</p>

	<pre><code>const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

try &#123;
  const response = await fetch('https://api.nope.net/v1/evaluate', &#123;
    method: 'POST',
    headers: &#123; 'Authorization': `Bearer $&#123;apiKey&#125;` &#125;,
    body: JSON.stringify(&#123; messages, config: &#123;&#125; &#125;),
    signal: controller.signal
  &#125;);
  clearTimeout(timeoutId);
  return response.json();
&#125; catch (error) &#123;
  if (error.name === 'AbortError') &#123;
    console.error('Request timed out');
    return getFailSafeResponse();
  &#125;
  throw error;
&#125;</code></pre>
</div>
