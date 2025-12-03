<svelte:head>
	<title>Evaluate Endpoint - NOPE Documentation</title>
</svelte:head>

<div class="prose">
	<h1>Evaluate Endpoint</h1>

	<p class="text-xl text-gray-600 mb-8">
		<code>POST /v1/evaluate</code> - The core endpoint for multi-domain risk assessment.
	</p>

	<h2>Overview</h2>

	<p>
		Evaluates risk across multiple clinical domains for the <strong>most recent user message</strong>,
		using previous turns as context.
	</p>

	<pre><code>POST https://api.nope.net/v1/evaluate
Authorization: Bearer nope_live_xxx
Content-Type: application/json</code></pre>

	<hr class="my-12" />

	<h2>Request Body</h2>

	<pre><code>&#123;
  "messages": [
    &#123;
      "role": "user",
      "content": "I don't know if I can keep going anymore.",
      "timestamp": "2025-11-17T10:00:00Z"
    &#125;
  ],
  "config": &#123;
    "user_country": "CA",
    "locale": "fr-CA"
  &#125;
&#125;</code></pre>

	<h3>Required Fields</h3>

	<table>
		<thead>
			<tr>
				<th>Field</th>
				<th>Type</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>messages</code> <em>or</em> <code>text</code></td>
				<td>array | string</td>
				<td>Either structured messages array OR plain text input</td>
			</tr>
			<tr>
				<td><code>config</code></td>
				<td>object</td>
				<td>Configuration object (can be empty <code>&#123;&#125;</code>)</td>
			</tr>
		</tbody>
	</table>

	<h3>Message Format</h3>

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
				<td><code>role</code></td>
				<td>string</td>
				<td>Yes</td>
				<td><code>"user"</code>, <code>"assistant"</code>, or <code>"system"</code></td>
			</tr>
			<tr>
				<td><code>content</code></td>
				<td>string</td>
				<td>Yes</td>
				<td>Message content</td>
			</tr>
			<tr>
				<td><code>timestamp</code></td>
				<td>string</td>
				<td>No</td>
				<td>ISO 8601 timestamp</td>
			</tr>
		</tbody>
	</table>

	<h3>Config Options</h3>

	<table>
		<thead>
			<tr>
				<th>Field</th>
				<th>Type</th>
				<th>Default</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>user_country</code></td>
				<td>string</td>
				<td><code>"US"</code></td>
				<td>ISO country code for crisis resources</td>
			</tr>
			<tr>
				<td><code>locale</code></td>
				<td>string</td>
				<td>Auto-detect</td>
				<td>Language/region (e.g., <code>"fr-CA"</code>)</td>
			</tr>
			<tr>
				<td><code>user_age_band</code></td>
				<td>string</td>
				<td><code>"adult"</code></td>
				<td><code>"adult"</code>, <code>"minor"</code>, or <code>"unknown"</code></td>
			</tr>
			<tr>
				<td><code>dry_run</code></td>
				<td>boolean</td>
				<td><code>false</code></td>
				<td>If true, don't log or trigger webhooks</td>
			</tr>
			<tr>
				<td><code>return_assistant_reply</code></td>
				<td>boolean</td>
				<td><code>true</code></td>
				<td>Include recommended reply in response</td>
			</tr>
			<tr>
				<td><code>assistant_safety_mode</code></td>
				<td>string</td>
				<td><code>"template"</code></td>
				<td><code>"template"</code> or <code>"generate"</code> (LLM-generated)</td>
			</tr>
			<tr>
				<td><code>conversation_id</code></td>
				<td>string</td>
				<td>—</td>
				<td>Your conversation ID (included in webhooks)</td>
			</tr>
			<tr>
				<td><code>end_user_id</code></td>
				<td>string</td>
				<td>—</td>
				<td>Your end-user ID (included in webhooks)</td>
			</tr>
		</tbody>
	</table>

	<h3>User Context (Optional)</h3>

	<p>Pass high-level, non-PII context to improve assessment:</p>

	<pre><code>&#123;
  "user_context": "User reported a suicide attempt last year and is in outpatient care."
&#125;</code></pre>

	<p><strong>Appropriate:</strong> History of attempts, general treatment status, channel preferences</p>
	<p><strong>Avoid:</strong> Names, addresses, contact details, specific methods</p>

	<hr class="my-12" />

	<h2>Response</h2>

	<pre><code>&#123;
  "domains": [
    &#123;
      "domain": "self",
      "severity": "high",
      "imminence": "urgent",
      "confidence": 0.87,
      "risk_features": ["hopelessness", "feeling_trapped"],
      "protective_factors": ["help_seeking_behavior"],
      "risk_types": ["self_harm_active_ideation_no_plan"]
    &#125;
  ],

  "global": &#123;
    "overall_severity": "high",
    "overall_imminence": "urgent",
    "primary_concerns": ["Suicidal ideation with hopelessness"],
    "language": "en",
    "locale": "en-CA"
  &#125;,

  "legal_flags": &#123;
    "child_safeguarding": null,
    "intimate_partner_violence": null,
    "third_party_threat": null
  &#125;,

  "confidence": 0.87,

  "crisis_resources": [
    &#123;
      "type": "crisis_line",
      "name": "988 Suicide Crisis Helpline (Canada)",
      "phone": "988",
      "availability": "24/7",
      "languages": ["en", "fr"],
      "service_scope": ["suicide", "self_harm", "mental_health_crisis"],
      "priority_tier": "primary_national_crisis"
    &#125;
  ],

  "recommended_reply": &#123;
    "content": "I'm really concerned about what you've shared...",
    "source": "template"
  &#125;,

  "metadata": &#123;
    "api_version": "v2"
  &#125;
&#125;</code></pre>

	<hr class="my-12" />

	<h2>Response Fields</h2>

	<h3><code>domains</code> - Domain-Specific Assessments</h3>

	<p>Array of assessments for each relevant risk domain.</p>

	<table>
		<thead>
			<tr>
				<th>Field</th>
				<th>Type</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>domain</code></td>
				<td>string</td>
				<td><code>self</code>, <code>others</code>, <code>dependent_at_risk</code>, <code>victimisation</code></td>
			</tr>
			<tr>
				<td><code>severity</code></td>
				<td>string</td>
				<td><code>none</code>, <code>mild</code>, <code>moderate</code>, <code>high</code>, <code>critical</code></td>
			</tr>
			<tr>
				<td><code>imminence</code></td>
				<td>string</td>
				<td><code>not_applicable</code>, <code>chronic</code>, <code>subacute</code>, <code>urgent</code>, <code>emergency</code></td>
			</tr>
			<tr>
				<td><code>confidence</code></td>
				<td>number</td>
				<td>0.0-1.0 confidence in this domain's assessment</td>
			</tr>
			<tr>
				<td><code>risk_features</code></td>
				<td>string[]</td>
				<td>Domain-specific evidence (e.g., <code>plan_present</code>)</td>
			</tr>
			<tr>
				<td><code>protective_factors</code></td>
				<td>string[]</td>
				<td>Strengths/resilience (e.g., <code>social_support</code>)</td>
			</tr>
			<tr>
				<td><code>risk_types</code></td>
				<td>string[]</td>
				<td>Specific risk classifications</td>
			</tr>
		</tbody>
	</table>

	<h3><code>global</code> - Overall Summary</h3>

	<table>
		<thead>
			<tr>
				<th>Field</th>
				<th>Type</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>overall_severity</code></td>
				<td>string</td>
				<td>Maximum severity across all domains</td>
			</tr>
			<tr>
				<td><code>overall_imminence</code></td>
				<td>string</td>
				<td>Most urgent imminence across domains</td>
			</tr>
			<tr>
				<td><code>primary_concerns</code></td>
				<td>string[]</td>
				<td>Human-readable summary of main concerns</td>
			</tr>
			<tr>
				<td><code>language</code></td>
				<td>string</td>
				<td>Detected language (ISO 639-1)</td>
			</tr>
			<tr>
				<td><code>locale</code></td>
				<td>string</td>
				<td>Detected locale (e.g., <code>"en-US"</code>)</td>
			</tr>
		</tbody>
	</table>

	<h3><code>legal_flags</code> - Legal/Clinical Flags</h3>

	<p>Evidence-graded flags for situations with legal or mandatory reporting implications.</p>

	<table>
		<thead>
			<tr>
				<th>Flag</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>third_party_threat</code></td>
				<td>Threat to identifiable third party (Tarasoff-style)</td>
			</tr>
			<tr>
				<td><code>intimate_partner_violence</code></td>
				<td>IPV risk with strangulation history, escalation pattern</td>
			</tr>
			<tr>
				<td><code>child_safeguarding</code></td>
				<td>Child protection urgency level</td>
			</tr>
			<tr>
				<td><code>vulnerable_adult_safeguarding</code></td>
				<td>Elder/disabled adult protection</td>
			</tr>
			<tr>
				<td><code>animal_cruelty_indicator</code></td>
				<td>Animal cruelty (5x violence predictor)</td>
			</tr>
		</tbody>
	</table>

	<p>Example IPV flag:</p>

	<pre><code>&#123;
  "intimate_partner_violence": &#123;
    "risk_level": "severe",
    "confidence": 0.85,
    "strangulation_history": true,
    "escalation_pattern": true,
    "evidence_grade": "strong"
  &#125;
&#125;</code></pre>

	<h3><code>crisis_resources</code> - Classification-Aware Resources</h3>

	<p>Resources matched to the user's situation based on detected risk domains.</p>

	<table>
		<thead>
			<tr>
				<th>Field</th>
				<th>Type</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>type</code></td>
				<td>string</td>
				<td><code>emergency_number</code>, <code>crisis_line</code>, <code>text_line</code>, <code>chat_service</code>, <code>support_service</code></td>
			</tr>
			<tr>
				<td><code>name</code></td>
				<td>string</td>
				<td>Organization name</td>
			</tr>
			<tr>
				<td><code>phone</code></td>
				<td>string</td>
				<td>Phone number</td>
			</tr>
			<tr>
				<td><code>text_instructions</code></td>
				<td>string</td>
				<td>SMS instructions (e.g., "Text HOME to 741741")</td>
			</tr>
			<tr>
				<td><code>chat_url</code></td>
				<td>string</td>
				<td>Web chat URL</td>
			</tr>
			<tr>
				<td><code>availability</code></td>
				<td>string</td>
				<td>Human-readable availability</td>
			</tr>
			<tr>
				<td><code>is_24_7</code></td>
				<td>boolean</td>
				<td>Machine-readable 24/7 flag</td>
			</tr>
			<tr>
				<td><code>languages</code></td>
				<td>string[]</td>
				<td>Supported languages</td>
			</tr>
			<tr>
				<td><code>service_scope</code></td>
				<td>string[]</td>
				<td>Issues handled (aligned with taxonomy)</td>
			</tr>
			<tr>
				<td><code>priority_tier</code></td>
				<td>string</td>
				<td><code>emergency_services</code>, <code>primary_national_crisis</code>, <code>specialist_issue_crisis</code>, etc.</td>
			</tr>
		</tbody>
	</table>

	<hr class="my-12" />

	<h2>Idempotency</h2>

	<p>Use the <code>Idempotency-Key</code> header to safely retry requests:</p>

	<pre><code>Idempotency-Key: 3d8b9c79-4e28-4bf4-bbf2-a1c4e6f8d9e0</code></pre>

	<ul>
		<li>Server caches response for 72 hours</li>
		<li>Repeated calls with same key return cached response</li>
		<li>No duplicate logs, webhooks, or side effects</li>
	</ul>

	<hr class="my-12" />

	<h2>Example Scenarios</h2>

	<h3>General Distress (Mild)</h3>

	<pre><code>// Request
&#123;
  "messages": [
    &#123; "role": "user", "content": "I'm feeling really stressed about work lately" &#125;
  ]
&#125;

// Response
&#123;
  "domains": [
    &#123;
      "domain": "self",
      "severity": "mild",
      "imminence": "not_applicable",
      "confidence": 0.85
    &#125;
  ],
  "global": &#123;
    "overall_severity": "mild",
    "overall_imminence": "not_applicable"
  &#125;
&#125;</code></pre>

	<h3>Suicidal Ideation with Plan (High)</h3>

	<pre><code>// Request
&#123;
  "messages": [
    &#123; "role": "user", "content": "I don't want to be alive anymore. I've thought about how I'd do it." &#125;
  ]
&#125;

// Response
&#123;
  "domains": [
    &#123;
      "domain": "self",
      "severity": "high",
      "imminence": "urgent",
      "risk_features": ["plan_present", "hopelessness"],
      "risk_types": ["self_harm_active_ideation_plan"]
    &#125;
  ],
  "global": &#123;
    "overall_severity": "high",
    "overall_imminence": "urgent"
  &#125;,
  "crisis_resources": [
    &#123;
      "name": "988 Suicide & Crisis Lifeline",
      "phone": "988"
    &#125;
  ]
&#125;</code></pre>

	<h3>Academic Discussion (None)</h3>

	<pre><code>// Request
&#123;
  "messages": [
    &#123; "role": "user", "content": "I'm writing a paper on suicide prevention. What are common warning signs?" &#125;
  ]
&#125;

// Response
&#123;
  "domains": [],
  "global": &#123;
    "overall_severity": "none",
    "overall_imminence": "not_applicable"
  &#125;
&#125;</code></pre>
</div>
