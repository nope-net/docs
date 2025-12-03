<svelte:head>
	<title>Node SDK - NOPE Documentation</title>
</svelte:head>

<div class="prose">
	<h1>Node SDK</h1>

	<p class="text-xl text-gray-600 mb-8">
		Official TypeScript/JavaScript SDK for the NOPE safety API. Uses native fetch (Node 18+).
	</p>

	<h2>Installation</h2>

	<pre><code>npm install @nope-net/sdk</code></pre>

	<p>Or with yarn/pnpm:</p>

	<pre><code>yarn add @nope-net/sdk
pnpm add @nope-net/sdk</code></pre>

	<h3>Requirements</h3>

	<ul>
		<li>Node.js 18+ (uses native fetch)</li>
		<li>TypeScript 5.0+ (optional, for type checking)</li>
	</ul>

	<hr class="my-12" />

	<h2>Quick Start</h2>

	<pre><code>import &#123; NopeClient &#125; from '@nope-net/sdk';

const client = new NopeClient(&#123; apiKey: 'nope_live_...' &#125;);

const result = await client.evaluate(&#123;
  messages: [&#123; role: 'user', content: "I've been feeling really down" &#125;],
  config: &#123; user_country: 'US' &#125;
&#125;);

// Check severity
if (result.global.overall_severity === 'high' ||
    result.global.overall_severity === 'critical') &#123;
  console.log('High risk detected');
  for (const resource of result.crisis_resources) &#123;
    console.log(`  $&#123;resource.name&#125;: $&#123;resource.phone&#125;`);
  &#125;
&#125;</code></pre>

	<hr class="my-12" />

	<h2>Client Initialization</h2>

	<pre><code>import &#123; NopeClient &#125; from '@nope-net/sdk';

// Basic initialization
const client = new NopeClient(&#123; apiKey: 'nope_live_...' &#125;);

// With options
const client = new NopeClient(&#123;
  apiKey: 'nope_live_...',
  baseUrl: 'https://api.nope.net',  // Optional, defaults to production
  timeout: 30000  // Milliseconds
&#125;);</code></pre>

	<h3>Constructor Options</h3>

	<table>
		<thead>
			<tr>
				<th>Option</th>
				<th>Type</th>
				<th>Default</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>apiKey</code></td>
				<td><code>string | undefined</code></td>
				<td><code>undefined</code></td>
				<td>Your NOPE API key</td>
			</tr>
			<tr>
				<td><code>baseUrl</code></td>
				<td><code>string</code></td>
				<td><code>"https://api.nope.net"</code></td>
				<td>API base URL</td>
			</tr>
			<tr>
				<td><code>timeout</code></td>
				<td><code>number</code></td>
				<td><code>30000</code></td>
				<td>Request timeout in milliseconds</td>
			</tr>
		</tbody>
	</table>

	<hr class="my-12" />

	<h2>Evaluate Method</h2>

	<pre><code>const result = await client.evaluate(&#123;
  messages: [
    &#123; role: 'user', content: "I've been feeling really down lately" &#125;,
    &#123; role: 'assistant', content: 'I hear you. Can you tell me more?' &#125;,
    &#123; role: 'user', content: "I just don't see the point anymore" &#125;
  ],
  config: &#123;
    user_country: 'US',
    locale: 'en-US',
    user_age_band: 'adult'
  &#125;,
  userContext: 'User reported previous suicide attempt last year.'
&#125;);</code></pre>

	<h3>Options</h3>

	<table>
		<thead>
			<tr>
				<th>Option</th>
				<th>Type</th>
				<th>Required</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>messages</code></td>
				<td><code>Message[]</code></td>
				<td>One of messages/text</td>
				<td>Conversation messages with <code>role</code> and <code>content</code></td>
			</tr>
			<tr>
				<td><code>text</code></td>
				<td><code>string</code></td>
				<td>One of messages/text</td>
				<td>Plain text input for free-form transcripts</td>
			</tr>
			<tr>
				<td><code>config</code></td>
				<td><code>EvaluateConfig</code></td>
				<td>No</td>
				<td>Configuration options</td>
			</tr>
			<tr>
				<td><code>userContext</code></td>
				<td><code>string</code></td>
				<td>No</td>
				<td>Additional context about the user</td>
			</tr>
		</tbody>
	</table>

	<h3>Config Options</h3>

	<table>
		<thead>
			<tr>
				<th>Option</th>
				<th>Type</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>user_country</code></td>
				<td><code>string</code></td>
				<td>ISO country code (e.g., <code>"US"</code>, <code>"GB"</code>)</td>
			</tr>
			<tr>
				<td><code>locale</code></td>
				<td><code>string</code></td>
				<td>Language/region (e.g., <code>"en-US"</code>)</td>
			</tr>
			<tr>
				<td><code>user_age_band</code></td>
				<td><code>string</code></td>
				<td><code>"adult"</code>, <code>"minor"</code>, or <code>"unknown"</code></td>
			</tr>
			<tr>
				<td><code>dry_run</code></td>
				<td><code>boolean</code></td>
				<td>If true, don't log or trigger webhooks</td>
			</tr>
			<tr>
				<td><code>conversation_id</code></td>
				<td><code>string</code></td>
				<td>Your conversation ID for webhooks</td>
			</tr>
			<tr>
				<td><code>end_user_id</code></td>
				<td><code>string</code></td>
				<td>Your end-user ID for webhooks</td>
			</tr>
		</tbody>
	</table>

	<hr class="my-12" />

	<h2>TypeScript Types</h2>

	<p>The SDK exports all types for full TypeScript support:</p>

	<pre><code>import type &#123;
  NopeClientOptions,
  EvaluateOptions,
  EvaluateConfig,
  EvaluateResponse,
  Message,
  DomainAssessment,
  GlobalAssessment,
  CrisisResource,
  LegalFlags,
  Severity,
  Imminence,
  RiskDomain,
&#125; from '@nope-net/sdk';</code></pre>

	<h3>EvaluateResponse</h3>

	<pre><code>const result = await client.evaluate(&#123; messages: [...] &#125;);

// Global assessment
result.global.overall_severity    // "none" | "mild" | "moderate" | "high" | "critical"
result.global.overall_imminence   // "not_applicable" | "chronic" | "subacute" | "urgent" | "emergency"
result.global.primary_concerns    // string[]
result.global.language            // string
result.global.locale              // string

// Domain-specific assessments
for (const domain of result.domains) &#123;
  domain.domain              // "self" | "others" | "dependent_at_risk" | "victimisation"
  domain.severity            // Severity
  domain.imminence           // Imminence
  domain.confidence          // number (0.0-1.0)
  domain.risk_features       // string[]
  domain.protective_factors  // string[]
  domain.risk_types          // string[]
&#125;

// Legal flags
if (result.legal_flags?.intimate_partner_violence) &#123;
  const ipv = result.legal_flags.intimate_partner_violence;
  ipv.risk_level              // "standard" | "elevated" | "severe" | "extreme"
  ipv.strangulation_history   // boolean
  ipv.escalation_pattern      // boolean
  ipv.evidence_grade          // "strong" | "moderate" | "weak"
&#125;

// Crisis resources
for (const resource of result.crisis_resources) &#123;
  resource.name          // string
  resource.phone         // string | undefined
  resource.type          // "emergency_number" | "crisis_line" | "text_line" | etc.
  resource.availability  // string
  resource.is_24_7       // boolean | undefined
&#125;

// Overall confidence
result.confidence  // number (0.0-1.0)</code></pre>

	<hr class="my-12" />

	<h2>Error Handling</h2>

	<p>The SDK provides specific error types for different scenarios:</p>

	<pre><code>import &#123; NopeClient &#125; from '@nope-net/sdk';
import &#123;
  NopeError,
  NopeAuthError,
  NopeValidationError,
  NopeRateLimitError,
  NopeServerError,
  NopeConnectionError,
&#125; from '@nope-net/sdk';

const client = new NopeClient(&#123; apiKey: 'nope_live_...' &#125;);

try &#123;
  const result = await client.evaluate(&#123; messages: [...] &#125;);
&#125; catch (error) &#123;
  if (error instanceof NopeAuthError) &#123;
    // Invalid or missing API key (401)
    console.error('Auth error:', error.message);
  &#125; else if (error instanceof NopeValidationError) &#123;
    // Invalid request payload (400)
    console.error('Validation error:', error.message);
  &#125; else if (error instanceof NopeRateLimitError) &#123;
    // Rate limit exceeded (429)
    console.error(`Rate limited, retry after: $&#123;error.retryAfterMs&#125;ms`);
  &#125; else if (error instanceof NopeServerError) &#123;
    // Server error (5xx)
    console.error(`Server error $&#123;error.statusCode&#125;:`, error.message);
  &#125; else if (error instanceof NopeConnectionError) &#123;
    // Connection failed or timeout
    console.error('Connection error:', error.message);
  &#125; else if (error instanceof NopeError) &#123;
    // Generic NOPE error
    console.error('NOPE error:', error.message);
  &#125;
&#125;</code></pre>

	<h3>Error Classes</h3>

	<pre><code>NopeError (base)
├── NopeAuthError        // 401 Unauthorized
├── NopeValidationError  // 400 Bad Request
├── NopeRateLimitError   // 429 Rate Limited (has retryAfterMs)
├── NopeServerError      // 5xx Server Error (has statusCode)
└── NopeConnectionError  // Network/timeout errors (has originalError)</code></pre>

	<hr class="my-12" />

	<h2>Integration Example</h2>

	<p>Complete example with Express.js:</p>

	<pre><code>import express from 'express';
import &#123; NopeClient &#125; from '@nope-net/sdk';
import &#123; NopeError &#125; from '@nope-net/sdk';

const app = express();
app.use(express.json());

const nope = new NopeClient(&#123; apiKey: process.env.NOPE_API_KEY &#125;);

// Fallback crisis resources if API fails
const FALLBACK_RESOURCES = [
  &#123; name: '988 Suicide & Crisis Lifeline', phone: '988' &#125;,
  &#123; name: 'Crisis Text Line', text: 'Text HOME to 741741' &#125;
];

app.post('/api/chat', async (req, res) => &#123;
  const &#123; messages, userId &#125; = req.body;

  // Evaluate safety
  let safety;
  try &#123;
    safety = await nope.evaluate(&#123;
      messages,
      config: &#123;
        user_country: 'US',
        end_user_id: userId
      &#125;
    &#125;);
  &#125; catch (error) &#123;
    console.error('NOPE API error:', error);
    // Fail safe - return cautious response
    safety = &#123;
      global: &#123; overall_severity: 'unknown', overall_imminence: 'unknown' &#125;,
      crisis_resources: FALLBACK_RESOURCES,
      confidence: 0
    &#125;;
  &#125;

  // Handle high risk
  if (['high', 'critical'].includes(safety.global.overall_severity)) &#123;
    return res.json(&#123;
      blocked: true,
      reason: 'safety',
      resources: safety.crisis_resources,
      message: 'I\'m concerned about what you\'ve shared. Please reach out to one of these resources.'
    &#125;);
  &#125;

  // Check for IPV
  if (safety.legal_flags?.intimate_partner_violence?.risk_level === 'extreme') &#123;
    return res.json(&#123;
      blocked: true,
      reason: 'ipv',
      resources: safety.crisis_resources.filter(r =>
        r.service_scope?.includes('domestic_violence')
      ),
      message: 'I want to make sure you\'re safe. Here are some resources that can help.'
    &#125;);
  &#125;

  // Continue with normal chat flow
  const response = await generateChatResponse(messages);

  res.json(&#123;
    blocked: false,
    message: response,
    safety: &#123;
      severity: safety.global.overall_severity,
      confidence: safety.confidence
    &#125;
  &#125;);
&#125;);

app.listen(3000, () => console.log('Server running on port 3000'));</code></pre>

	<hr class="my-12" />

	<h2>Environment Variables</h2>

	<p>Common setup with environment variables:</p>

	<pre><code>// .env
NOPE_API_KEY=nope_live_xxx
NOPE_BASE_URL=https://api.nope.net</code></pre>

	<pre><code>import &#123; NopeClient &#125; from '@nope-net/sdk';

const client = new NopeClient(&#123;
  apiKey: process.env.NOPE_API_KEY,
  baseUrl: process.env.NOPE_BASE_URL  // Optional
&#125;);</code></pre>

	<hr class="my-12" />

	<h2>ESM and CommonJS</h2>

	<p>The SDK supports both ESM and CommonJS:</p>

	<h3>ESM (recommended)</h3>

	<pre><code>import &#123; NopeClient &#125; from '@nope-net/sdk';</code></pre>

	<h3>CommonJS</h3>

	<pre><code>const &#123; NopeClient &#125; = require('@nope-net/sdk');</code></pre>

	<hr class="my-12" />

	<h2>Browser Usage</h2>

	<div class="not-prose bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-6">
		<p class="text-sm text-yellow-800">
			<strong>Warning:</strong> Never expose your API key in client-side code.
			Use the SDK from a backend server, not directly from the browser.
		</p>
	</div>

	<p>If you need browser support, proxy requests through your backend:</p>

	<pre><code>// Frontend - call your backend
const response = await fetch('/api/evaluate', &#123;
  method: 'POST',
  headers: &#123; 'Content-Type': 'application/json' &#125;,
  body: JSON.stringify(&#123; messages &#125;)
&#125;);

// Backend - use the SDK
app.post('/api/evaluate', async (req, res) => &#123;
  const result = await nope.evaluate(&#123;
    messages: req.body.messages,
    config: &#123; user_country: 'US' &#125;
  &#125;);
  res.json(result);
&#125;);</code></pre>
</div>
