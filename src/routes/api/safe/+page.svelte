<svelte:head>
	<title>Safe Endpoint - NOPE Documentation</title>
</svelte:head>

<div class="prose">
	<h1>Safe Endpoint</h1>

	<p class="text-xl text-gray-600 mb-8">
		<code>POST /v1/safe</code> - OpenAI-compatible chat completion with built-in safety.
	</p>

	<h2>Overview</h2>

	<p>
		The Safe endpoint is a <strong>drop-in replacement</strong> for OpenAI's chat completions API
		that automatically evaluates messages for safety and returns risk metadata in response headers.
	</p>

	<pre><code>POST https://api.nope.net/v1/safe
Authorization: Bearer nope_live_xxx
Content-Type: application/json</code></pre>

	<hr class="my-12" />

	<h2>Request</h2>

	<pre><code>&#123;
  "messages": [
    &#123; "role": "system", "content": "You are a helpful wellness coach." &#125;,
    &#123; "role": "user", "content": "I've been feeling really down lately" &#125;
  ],
  "stream": false,
  "config": &#123;
    "user_country": "US"
  &#125;
&#125;</code></pre>

	<h3>Request Fields</h3>

	<table>
		<thead>
			<tr>
				<th>Field</th>
				<th>Type</th>
				<th>Required</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>messages</code></td>
				<td>array</td>
				<td>Yes</td>
				<td>OpenAI-format messages (system, user, assistant roles)</td>
			</tr>
			<tr>
				<td><code>system</code></td>
				<td>string</td>
				<td>No</td>
				<td>Alternative way to provide system prompt</td>
			</tr>
			<tr>
				<td><code>stream</code></td>
				<td>boolean</td>
				<td>No</td>
				<td>Enable streaming response (SSE format)</td>
			</tr>
			<tr>
				<td><code>config.user_country</code></td>
				<td>string</td>
				<td>No</td>
				<td>ISO country code for crisis resources</td>
			</tr>
			<tr>
				<td><code>config.user_age_band</code></td>
				<td>string</td>
				<td>No</td>
				<td><code>"adult"</code> or <code>"minor"</code></td>
			</tr>
			<tr>
				<td><code>config.locale</code></td>
				<td>string</td>
				<td>No</td>
				<td>Language/region preference</td>
			</tr>
		</tbody>
	</table>

	<hr class="my-12" />

	<h2>Response (Non-Streaming)</h2>

	<p>OpenAI-compatible chat completion format:</p>

	<pre><code>&#123;
  "id": "chatcmpl-nope-1234567890-abc123",
  "object": "chat.completion",
  "created": 1700000000,
  "model": "nope-safe-v1",
  "choices": [
    &#123;
      "index": 0,
      "message": &#123;
        "role": "assistant",
        "content": "I hear that you've been feeling down..."
      &#125;,
      "finish_reason": "stop"
    &#125;
  ]
&#125;</code></pre>

	<hr class="my-12" />

	<h2>Response Headers</h2>

	<p>Risk metadata is included in response headers:</p>

	<table>
		<thead>
			<tr>
				<th>Header</th>
				<th>Description</th>
				<th>Example</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>X-NOPE-Risk-Level</code></td>
				<td>Detected severity</td>
				<td><code>none</code>, <code>mild</code>, <code>moderate</code>, <code>high</code>, <code>critical</code></td>
			</tr>
			<tr>
				<td><code>X-NOPE-Confidence</code></td>
				<td>Confidence score</td>
				<td><code>0.87</code></td>
			</tr>
			<tr>
				<td><code>X-NOPE-Version</code></td>
				<td>API version</td>
				<td><code>v1</code></td>
			</tr>
		</tbody>
	</table>

	<h3>Example Usage</h3>

	<pre><code>const response = await fetch('https://api.nope.net/v1/safe', &#123;
  method: 'POST',
  headers: &#123;
    'Authorization': `Bearer $&#123;apiKey&#125;`,
    'Content-Type': 'application/json',
  &#125;,
  body: JSON.stringify(&#123;
    messages: [&#123; role: 'user', content: 'I feel hopeless' &#125;]
  &#125;)
&#125;);

// Check risk level from headers
const riskLevel = response.headers.get('X-NOPE-Risk-Level');
const confidence = response.headers.get('X-NOPE-Confidence');

if (riskLevel === 'high' || riskLevel === 'critical') &#123;
  showCrisisResources();
&#125;

// Use the response body normally
const data = await response.json();
console.log(data.choices[0].message.content);</code></pre>

	<hr class="my-12" />

	<h2>Streaming Response</h2>

	<p>When <code>stream: true</code>, returns Server-Sent Events in OpenAI format:</p>

	<pre><code>data: &#123;"id":"chatcmpl-...","object":"chat.completion.chunk","choices":[&#123;"delta":&#123;"role":"assistant"&#125;&#125;]&#125;

data: &#123;"id":"chatcmpl-...","object":"chat.completion.chunk","choices":[&#123;"delta":&#123;"content":"I hear "&#125;&#125;]&#125;

data: &#123;"id":"chatcmpl-...","object":"chat.completion.chunk","choices":[&#123;"delta":&#123;"content":"that you"&#125;&#125;]&#125;

data: [DONE]</code></pre>

	<h3>Streaming Example</h3>

	<pre><code>const response = await fetch('https://api.nope.net/v1/safe', &#123;
  method: 'POST',
  headers: &#123;
    'Authorization': `Bearer $&#123;apiKey&#125;`,
    'Content-Type': 'application/json',
  &#125;,
  body: JSON.stringify(&#123;
    messages: [&#123; role: 'user', content: 'Hello' &#125;],
    stream: true
  &#125;)
&#125;);

// Check risk level from initial headers
const riskLevel = response.headers.get('X-NOPE-Risk-Level');

// Read the stream
const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) &#123;
  const &#123; done, value &#125; = await reader.read();
  if (done) break;

  const chunk = decoder.decode(value);
  const lines = chunk.split('\n').filter(line => line.startsWith('data: '));

  for (const line of lines) &#123;
    const data = line.slice(6); // Remove 'data: ' prefix
    if (data === '[DONE]') break;

    const parsed = JSON.parse(data);
    const content = parsed.choices[0]?.delta?.content;
    if (content) &#123;
      process.stdout.write(content);
    &#125;
  &#125;
&#125;</code></pre>

	<hr class="my-12" />

	<h2>Drop-in Replacement</h2>

	<p>
		The Safe endpoint is designed to be a drop-in replacement for OpenAI's chat completions API.
		Simply change the base URL and add your NOPE API key:
	</p>

	<h3>Before (OpenAI)</h3>

	<pre><code>const response = await fetch('https://api.openai.com/v1/chat/completions', &#123;
  headers: &#123;
    'Authorization': `Bearer $&#123;OPENAI_KEY&#125;`,
    'Content-Type': 'application/json',
  &#125;,
  body: JSON.stringify(&#123;
    model: 'gpt-4',
    messages: [&#123; role: 'user', content: 'Hello' &#125;]
  &#125;)
&#125;);</code></pre>

	<h3>After (NOPE Safe)</h3>

	<pre><code>const response = await fetch('https://api.nope.net/v1/safe', &#123;
  headers: &#123;
    'Authorization': `Bearer $&#123;NOPE_KEY&#125;`,
    'Content-Type': 'application/json',
  &#125;,
  body: JSON.stringify(&#123;
    messages: [&#123; role: 'user', content: 'Hello' &#125;],
    config: &#123; user_country: 'US' &#125;
  &#125;)
&#125;);

// Bonus: Check risk headers
const riskLevel = response.headers.get('X-NOPE-Risk-Level');</code></pre>

	<hr class="my-12" />

	<h2>Use Cases</h2>

	<ul>
		<li><strong>Chatbots</strong> - Add safety layer to existing chat implementations</li>
		<li><strong>Content moderation</strong> - Pre-screen user messages</li>
		<li><strong>Wellness apps</strong> - Ensure responses are clinically appropriate</li>
		<li><strong>Customer support</strong> - Detect and escalate concerning messages</li>
	</ul>
</div>
