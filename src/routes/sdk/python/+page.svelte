<svelte:head>
	<title>Python SDK - NOPE Documentation</title>
</svelte:head>

<div class="prose">
	<h1>Python SDK</h1>

	<p class="text-xl text-gray-600 mb-8">
		Official Python SDK for the NOPE safety API. Supports both sync and async clients.
	</p>

	<h2>Installation</h2>

	<pre><code>pip install nope-net</code></pre>

	<p>Or with pip extras for development:</p>

	<pre><code>pip install nope-net[dev]</code></pre>

	<h3>Requirements</h3>

	<ul>
		<li>Python 3.9+</li>
		<li>httpx</li>
		<li>pydantic</li>
	</ul>

	<hr class="my-12" />

	<h2>Quick Start</h2>

	<pre><code>from nope import NopeClient

client = NopeClient(api_key="nope_live_...")
result = client.evaluate(
    messages=[&#123;"role": "user", "content": "I've been feeling really down"&#125;],
    config=&#123;"user_country": "US"&#125;
)

# Check severity
if result.global_.overall_severity in ("high", "critical"):
    print("High risk detected")
    for resource in result.crisis_resources:
        print(f"  &#123;resource.name&#125;: &#123;resource.phone&#125;")</code></pre>

	<div class="not-prose bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-6">
		<p class="text-sm text-yellow-800">
			<strong>Note:</strong> Use <code>result.global_</code> (with underscore) to access the global assessment.
			This is because <code>global</code> is a reserved word in Python.
		</p>
	</div>

	<hr class="my-12" />

	<h2>Client Initialization</h2>

	<pre><code>from nope import NopeClient

# Basic initialization
client = NopeClient(api_key="nope_live_...")

# With options
client = NopeClient(
    api_key="nope_live_...",
    base_url="https://api.nope.net",  # Optional, defaults to production
    timeout=30.0  # Seconds
)

# Context manager (recommended)
with NopeClient(api_key="nope_live_...") as client:
    result = client.evaluate(messages=[...])
# Client automatically closed</code></pre>

	<h3>Constructor Options</h3>

	<table>
		<thead>
			<tr>
				<th>Parameter</th>
				<th>Type</th>
				<th>Default</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>api_key</code></td>
				<td><code>str | None</code></td>
				<td><code>None</code></td>
				<td>Your NOPE API key</td>
			</tr>
			<tr>
				<td><code>base_url</code></td>
				<td><code>str | None</code></td>
				<td><code>"https://api.nope.net"</code></td>
				<td>API base URL</td>
			</tr>
			<tr>
				<td><code>timeout</code></td>
				<td><code>float | None</code></td>
				<td><code>30.0</code></td>
				<td>Request timeout in seconds</td>
			</tr>
		</tbody>
	</table>

	<hr class="my-12" />

	<h2>Evaluate Method</h2>

	<pre><code>result = client.evaluate(
    messages=[
        &#123;"role": "user", "content": "I've been feeling really down lately"&#125;,
        &#123;"role": "assistant", "content": "I hear you. Can you tell me more?"&#125;,
        &#123;"role": "user", "content": "I just don't see the point anymore"&#125;
    ],
    config=&#123;
        "user_country": "US",
        "locale": "en-US",
        "user_age_band": "adult"
    &#125;,
    user_context="User reported previous suicide attempt last year."
)</code></pre>

	<h3>Parameters</h3>

	<table>
		<thead>
			<tr>
				<th>Parameter</th>
				<th>Type</th>
				<th>Required</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>messages</code></td>
				<td><code>list[dict]</code></td>
				<td>One of messages/text</td>
				<td>Conversation messages with <code>role</code> and <code>content</code></td>
			</tr>
			<tr>
				<td><code>text</code></td>
				<td><code>str</code></td>
				<td>One of messages/text</td>
				<td>Plain text input for free-form transcripts</td>
			</tr>
			<tr>
				<td><code>config</code></td>
				<td><code>dict</code></td>
				<td>No</td>
				<td>Configuration options (see below)</td>
			</tr>
			<tr>
				<td><code>user_context</code></td>
				<td><code>str</code></td>
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
				<td><code>str</code></td>
				<td>ISO country code (e.g., <code>"US"</code>, <code>"GB"</code>)</td>
			</tr>
			<tr>
				<td><code>locale</code></td>
				<td><code>str</code></td>
				<td>Language/region (e.g., <code>"en-US"</code>)</td>
			</tr>
			<tr>
				<td><code>user_age_band</code></td>
				<td><code>str</code></td>
				<td><code>"adult"</code>, <code>"minor"</code>, or <code>"unknown"</code></td>
			</tr>
			<tr>
				<td><code>dry_run</code></td>
				<td><code>bool</code></td>
				<td>If true, don't log or trigger webhooks</td>
			</tr>
			<tr>
				<td><code>conversation_id</code></td>
				<td><code>str</code></td>
				<td>Your conversation ID for webhooks</td>
			</tr>
			<tr>
				<td><code>end_user_id</code></td>
				<td><code>str</code></td>
				<td>Your end-user ID for webhooks</td>
			</tr>
		</tbody>
	</table>

	<hr class="my-12" />

	<h2>Response Types</h2>

	<p>The <code>evaluate()</code> method returns an <code>EvaluateResponse</code> object with full type hints.</p>

	<h3>EvaluateResponse</h3>

	<pre><code>result = client.evaluate(messages=[...])

# Global assessment
result.global_.overall_severity    # "none" | "mild" | "moderate" | "high" | "critical"
result.global_.overall_imminence   # "not_applicable" | "chronic" | "subacute" | "urgent" | "emergency"
result.global_.primary_concerns    # list[str]
result.global_.language            # str
result.global_.locale              # str

# Domain-specific assessments
for domain in result.domains:
    domain.domain              # "self" | "others" | "dependent_at_risk" | "victimisation"
    domain.severity            # Severity level
    domain.imminence           # Imminence level
    domain.confidence          # float (0.0-1.0)
    domain.risk_features       # list[str]
    domain.protective_factors  # list[str]
    domain.risk_types          # list[str]

# Legal flags
if result.legal_flags:
    ipv = result.legal_flags.intimate_partner_violence
    if ipv:
        ipv.risk_level              # "standard" | "elevated" | "severe" | "extreme"
        ipv.strangulation_history   # bool
        ipv.escalation_pattern      # bool
        ipv.evidence_grade          # "strong" | "moderate" | "weak"

# Crisis resources
for resource in result.crisis_resources:
    resource.name          # str
    resource.phone         # str | None
    resource.type          # "emergency_number" | "crisis_line" | "text_line" | etc.
    resource.availability  # str
    resource.is_24_7       # bool | None

# Overall confidence
result.confidence  # float (0.0-1.0)</code></pre>

	<hr class="my-12" />

	<h2>Async Client</h2>

	<p>For async applications, use <code>AsyncNopeClient</code>:</p>

	<pre><code>from nope import AsyncNopeClient

async with AsyncNopeClient(api_key="nope_live_...") as client:
    result = await client.evaluate(
        messages=[&#123;"role": "user", "content": "I feel hopeless"&#125;],
        config=&#123;"user_country": "US"&#125;
    )
    print(result.global_.overall_severity)</code></pre>

	<p>The async client has the same API as the sync client, but all methods are awaitable.</p>

	<hr class="my-12" />

	<h2>Error Handling</h2>

	<p>The SDK provides specific exception types for different error scenarios:</p>

	<pre><code>from nope import NopeClient
from nope.errors import (
    NopeError,
    NopeAuthError,
    NopeValidationError,
    NopeRateLimitError,
    NopeServerError,
    NopeConnectionError,
)

client = NopeClient(api_key="nope_live_...")

try:
    result = client.evaluate(messages=[...])
except NopeAuthError as e:
    # Invalid or missing API key (401)
    print(f"Auth error: &#123;e&#125;")
except NopeValidationError as e:
    # Invalid request payload (400)
    print(f"Validation error: &#123;e&#125;")
except NopeRateLimitError as e:
    # Rate limit exceeded (429)
    print(f"Rate limited, retry after: &#123;e.retry_after&#125;s")
except NopeServerError as e:
    # Server error (5xx)
    print(f"Server error &#123;e.status_code&#125;: &#123;e&#125;")
except NopeConnectionError as e:
    # Connection failed or timeout
    print(f"Connection error: &#123;e&#125;")
except NopeError as e:
    # Generic NOPE error
    print(f"NOPE error: &#123;e&#125;")</code></pre>

	<h3>Exception Hierarchy</h3>

	<pre><code>NopeError (base)
├── NopeAuthError        # 401 Unauthorized
├── NopeValidationError  # 400 Bad Request
├── NopeRateLimitError   # 429 Rate Limited
├── NopeServerError      # 5xx Server Error
└── NopeConnectionError  # Network/timeout errors</code></pre>

	<hr class="my-12" />

	<h2>Using Pydantic Models</h2>

	<p>You can also use typed Pydantic models for messages and config:</p>

	<pre><code>from nope import NopeClient
from nope.types import Message, EvaluateConfig

client = NopeClient(api_key="nope_live_...")

# Using typed models
messages = [
    Message(role="user", content="I feel hopeless"),
    Message(role="assistant", content="I hear you."),
    Message(role="user", content="I don't see the point")
]

config = EvaluateConfig(
    user_country="US",
    locale="en-US",
    user_age_band="adult"
)

result = client.evaluate(messages=messages, config=config)</code></pre>

	<hr class="my-12" />

	<h2>Integration Example</h2>

	<p>Complete example with a chat application:</p>

	<pre><code>from nope import NopeClient
from nope.errors import NopeError

class SafetyEvaluator:
    def __init__(self, api_key: str, country: str = "US"):
        self.client = NopeClient(api_key=api_key)
        self.country = country
        # Fallback resources if API fails
        self.fallback_resources = [
            &#123;"name": "988 Suicide & Crisis Lifeline", "phone": "988"&#125;,
            &#123;"name": "Crisis Text Line", "text": "Text HOME to 741741"&#125;
        ]

    def evaluate_message(self, conversation: list[dict]) -> dict:
        """Evaluate conversation and return safety assessment."""
        try:
            result = self.client.evaluate(
                messages=conversation,
                config=&#123;"user_country": self.country&#125;
            )

            return &#123;
                "severity": result.global_.overall_severity,
                "imminence": result.global_.overall_imminence,
                "concerns": result.global_.primary_concerns,
                "resources": [
                    &#123;"name": r.name, "phone": r.phone, "type": r.type&#125;
                    for r in result.crisis_resources
                ],
                "confidence": result.confidence,
                "ipv_risk": self._check_ipv(result),
                "error": False
            &#125;

        except NopeError as e:
            # Fail safe - return cautious response with fallback resources
            return &#123;
                "severity": "unknown",
                "imminence": "unknown",
                "concerns": [],
                "resources": self.fallback_resources,
                "confidence": 0.0,
                "ipv_risk": None,
                "error": True,
                "error_message": str(e)
            &#125;

    def _check_ipv(self, result) -> dict | None:
        """Check for intimate partner violence indicators."""
        if result.legal_flags and result.legal_flags.intimate_partner_violence:
            ipv = result.legal_flags.intimate_partner_violence
            return &#123;
                "risk_level": ipv.risk_level,
                "strangulation": ipv.strangulation_history,
                "escalation": ipv.escalation_pattern
            &#125;
        return None

    def close(self):
        self.client.close()


# Usage
evaluator = SafetyEvaluator(api_key="nope_live_...", country="US")

conversation = [
    &#123;"role": "user", "content": "I've been feeling really down lately"&#125;,
    &#123;"role": "assistant", "content": "I'm sorry to hear that. Can you tell me more?"&#125;,
    &#123;"role": "user", "content": "I just don't see the point anymore"&#125;
]

assessment = evaluator.evaluate_message(conversation)

if assessment["severity"] in ("high", "critical"):
    print("High risk detected - showing crisis resources")
    for resource in assessment["resources"]:
        print(f"  &#123;resource['name']&#125;: &#123;resource.get('phone', 'N/A')&#125;")

evaluator.close()</code></pre>

	<hr class="my-12" />

	<h2>Environment Variables</h2>

	<p>The SDK can be configured via environment variables:</p>

	<pre><code>export NOPE_API_KEY=nope_live_xxx
export NOPE_BASE_URL=https://api.nope.net  # Optional</code></pre>

	<pre><code>import os
from nope import NopeClient

client = NopeClient(api_key=os.environ.get("NOPE_API_KEY"))</code></pre>
</div>
