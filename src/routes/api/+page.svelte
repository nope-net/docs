<svelte:head>
	<title>REST API - NOPE Documentation</title>
</svelte:head>

<div class="prose">
	<h1>REST API</h1>

	<p class="text-xl text-gray-600 mb-8">
		The NOPE API provides conversation-aware mental health safety for AI chat systems.
	</p>

	<p><strong>Base URL:</strong> <code>https://api.nope.net/v1</code></p>
	<p><strong>Version:</strong> v1.0</p>

	<hr class="my-12" />

	<h2>What It Does</h2>

	<ul>
		<li><strong>Detects clinically relevant risk</strong> across 4 domains: self, others, dependent_at_risk, victimisation</li>
		<li><strong>Returns severity and imminence</strong> assessments per domain</li>
		<li><strong>Provides protective factors</strong> alongside risk indicators</li>
		<li><strong>Surfaces legal/clinical flags</strong> (IPV, child safeguarding, third-party threats)</li>
		<li><strong>Returns classification-aware crisis resources</strong> matched to the user's specific situation</li>
		<li><strong>Sends webhooks</strong> when risk thresholds are crossed</li>
	</ul>

	<h2>What It Does NOT Do</h2>

	<ul>
		<li>Diagnose mental illness</li>
		<li>Replace clinical assessment</li>
		<li>Guarantee crisis prevention</li>
		<li>Serve as emergency intervention</li>
	</ul>

	<hr class="my-12" />

	<h2>Design Principles</h2>

	<ul>
		<li><strong>Stateless</strong> - You manage conversation state, we evaluate risk</li>
		<li><strong>Multi-domain</strong> - Separate assessments for different risk types</li>
		<li><strong>Evidence-based</strong> - Built on C-SSRS, HCR-20, DASH, START, and other clinical frameworks</li>
		<li><strong>Transparent</strong> - Confidence scores and explanations for every assessment</li>
		<li><strong>Privacy-first</strong> - No conversation data stored</li>
	</ul>

	<hr class="my-12" />

	<h2>Endpoints</h2>

	<table>
		<thead>
			<tr>
				<th>Endpoint</th>
				<th>Method</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><a href="/api/evaluate"><code>/v1/evaluate</code></a></td>
				<td>POST</td>
				<td>Multi-domain risk classification</td>
			</tr>
			<tr>
				<td><a href="/api/safe"><code>/v1/safe</code></a></td>
				<td>POST</td>
				<td>OpenAI-compatible chat completions with safety</td>
			</tr>
			<tr>
				<td><a href="/api/webhooks"><code>/v1/webhooks</code></a></td>
				<td>CRUD</td>
				<td>Webhook configuration management</td>
			</tr>
			<tr>
				<td><code>/health</code></td>
				<td>GET</td>
				<td>Health check endpoint</td>
			</tr>
		</tbody>
	</table>

	<hr class="my-12" />

	<h2>Core Concepts</h2>

	<h3>Risk Domains</h3>

	<table>
		<thead>
			<tr>
				<th>Domain</th>
				<th>Focus</th>
				<th>Example Concerns</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>self</code></td>
				<td>Suicide, self-harm</td>
				<td>Suicidal ideation, NSSI, preparatory behavior</td>
			</tr>
			<tr>
				<td><code>others</code></td>
				<td>Violence toward others</td>
				<td>Homicidal ideation, threats, mass violence</td>
			</tr>
			<tr>
				<td><code>dependent_at_risk</code></td>
				<td>Child/elder/vulnerable</td>
				<td>Abuse, neglect, online grooming</td>
			</tr>
			<tr>
				<td><code>victimisation</code></td>
				<td>Being abused/exploited</td>
				<td>IPV, coercive control, trafficking</td>
			</tr>
		</tbody>
	</table>

	<h3>Severity Levels</h3>

	<p><code>none</code> &rarr; <code>mild</code> &rarr; <code>moderate</code> &rarr; <code>high</code> &rarr; <code>critical</code></p>

	<h3>Imminence Levels</h3>

	<p><code>not_applicable</code> &rarr; <code>chronic</code> &rarr; <code>subacute</code> &rarr; <code>urgent</code> &rarr; <code>emergency</code></p>

	<hr class="my-12" />

	<h2>Quick Example</h2>

	<pre><code>curl -X POST https://api.nope.net/v1/evaluate \
  -H "Authorization: Bearer nope_live_xxx" \
  -H "Content-Type: application/json" \
  -d '&#123;
    "messages": [&#123;"role": "user", "content": "I feel hopeless"&#125;],
    "config": &#123;"user_country": "US"&#125;
  &#125;'</code></pre>

	<pre><code>&#123;
  "domains": [
    &#123;
      "domain": "self",
      "severity": "moderate",
      "imminence": "subacute",
      "confidence": 0.85,
      "risk_features": ["hopelessness"],
      "protective_factors": ["help_seeking_behavior"]
    &#125;
  ],
  "global": &#123;
    "overall_severity": "moderate",
    "overall_imminence": "subacute"
  &#125;,
  "crisis_resources": [
    &#123;
      "name": "988 Suicide & Crisis Lifeline",
      "phone": "988",
      "type": "crisis_line"
    &#125;
  ],
  "confidence": 0.85
&#125;</code></pre>

	<hr class="my-12" />

	<h2>Next Steps</h2>

	<ul>
		<li><a href="/quickstart">Quick Start</a> - Get started in under 5 minutes</li>
		<li><a href="/authentication">Authentication</a> - API key setup and management</li>
		<li><a href="/api/evaluate">Evaluate Endpoint</a> - Full request/response reference</li>
		<li><a href="/taxonomy">Taxonomy Reference</a> - Understanding risk domains and features</li>
	</ul>
</div>
