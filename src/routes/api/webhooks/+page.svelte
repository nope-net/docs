<svelte:head>
	<title>Webhooks - NOPE Documentation</title>
</svelte:head>

<div class="prose">
	<h1>Webhooks</h1>

	<p class="text-xl text-gray-600 mb-8">
		Receive real-time notifications when risk thresholds are crossed during evaluations.
	</p>

	<h2>Overview</h2>

	<p>
		Webhooks fire asynchronously after <code>/v1/evaluate</code> when the detected risk severity
		meets or exceeds your configured threshold. Use webhooks to:
	</p>

	<ul>
		<li>Alert on-call staff for critical situations</li>
		<li>Log safety events to your ticketing system</li>
		<li>Trigger automated escalation workflows</li>
	</ul>

	<h3>Event Types</h3>

	<table>
		<thead>
			<tr>
				<th>Event</th>
				<th>Trigger</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>risk.elevated</code></td>
				<td>Overall severity >= your configured <code>min_risk_level</code></td>
			</tr>
			<tr>
				<td><code>risk.critical</code></td>
				<td>Critical severity detected (always fires regardless of threshold)</td>
			</tr>
			<tr>
				<td><code>test.ping</code></td>
				<td>Manual test from API (for verifying webhook configuration)</td>
			</tr>
		</tbody>
	</table>

	<hr class="my-12" />

	<h2>Webhook Management API</h2>

	<h3>Create Webhook</h3>

	<pre><code>POST /v1/webhooks

&#123;
  "url": "https://your-app.com/webhooks/nope",
  "min_risk_level": "high",
  "include_conversation": false
&#125;</code></pre>

	<table>
		<thead>
			<tr>
				<th>Field</th>
				<th>Required</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>url</code></td>
				<td>Yes</td>
				<td>HTTPS endpoint URL (localhost allowed for development)</td>
			</tr>
			<tr>
				<td><code>min_risk_level</code></td>
				<td>No</td>
				<td>Minimum severity: <code>low</code>, <code>moderate</code>, <code>high</code>, <code>critical</code> (default: <code>high</code>)</td>
			</tr>
			<tr>
				<td><code>include_conversation</code></td>
				<td>No</td>
				<td>Include latest user message in payload (default: <code>false</code>)</td>
			</tr>
		</tbody>
	</table>

	<p><strong>Response (201 Created):</strong></p>

	<pre><code>&#123;
  "id": "whk_abc123",
  "url": "https://your-app.com/webhooks/nope",
  "secret": "whsec_7f8a9b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u",
  "min_risk_level": "high",
  "enabled": true,
  "include_conversation": false,
  "created_at": "2025-01-15T10:00:00.000Z"
&#125;</code></pre>

	<div class="not-prose bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-6">
		<p class="text-sm text-yellow-800">
			<strong>Important:</strong> The <code>secret</code> is only returned on create. Store it securely - you'll need it to verify webhook signatures.
		</p>
	</div>

	<h3>List Webhooks</h3>

	<pre><code>GET /v1/webhooks</code></pre>

	<h3>Get Webhook</h3>

	<pre><code>GET /v1/webhooks/:id</code></pre>

	<h3>Update Webhook</h3>

	<pre><code>PATCH /v1/webhooks/:id

&#123;
  "min_risk_level": "moderate",
  "enabled": false
&#125;</code></pre>

	<h3>Delete Webhook</h3>

	<pre><code>DELETE /v1/webhooks/:id</code></pre>

	<h3>Send Test Webhook</h3>

	<pre><code>POST /v1/webhooks/:id/test</code></pre>

	<p>Sends a <code>test.ping</code> event to verify your endpoint is working.</p>

	<hr class="my-12" />

	<h2>Webhook Payload</h2>

	<pre><code>&#123;
  "event": "risk.elevated",
  "event_id": "evt_abc123def456",
  "timestamp": "2025-01-15T14:32:00.000Z",
  "api_version": "2025-01",

  "conversation_id": "your-conversation-id",
  "user_id": "your-end-user-id",

  "risk_summary": &#123;
    "overall_severity": "high",
    "overall_imminence": "urgent",
    "primary_domain": "self",
    "confidence": 0.89,
    "primary_concerns": "User expressing suicidal ideation with identified method."
  &#125;,

  "domains": [
    &#123;
      "domain": "self",
      "severity": "high",
      "imminence": "urgent"
    &#125;
  ],

  "flags": &#123;
    "intimate_partner_violence": null,
    "child_safeguarding": null,
    "third_party_threat": false
  &#125;,

  "resources_provided": [
    &#123;
      "name": "988 Suicide & Crisis Lifeline",
      "type": "crisis_line",
      "country": "US"
    &#125;
  ],

  "conversation": &#123;
    "included": false
  &#125;
&#125;</code></pre>

	<p>With <code>include_conversation: true</code>:</p>

	<pre><code>&#123;
  "conversation": &#123;
    "included": true,
    "message_count": 5,
    "latest_user_message": "I've been saving up my pills",
    "truncated": false
  &#125;
&#125;</code></pre>

	<hr class="my-12" />

	<h2>Webhook Headers</h2>

	<table>
		<thead>
			<tr>
				<th>Header</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>Content-Type</code></td>
				<td><code>application/json</code></td>
			</tr>
			<tr>
				<td><code>X-NOPE-Signature</code></td>
				<td>HMAC-SHA256 signature: <code>sha256=&lt;hex&gt;</code></td>
			</tr>
			<tr>
				<td><code>X-NOPE-Timestamp</code></td>
				<td>Unix timestamp (seconds) when webhook was sent</td>
			</tr>
			<tr>
				<td><code>X-NOPE-Event</code></td>
				<td>Event type: <code>risk.elevated</code>, <code>risk.critical</code>, <code>test.ping</code></td>
			</tr>
			<tr>
				<td><code>X-NOPE-Delivery-ID</code></td>
				<td>Unique event ID for idempotency</td>
			</tr>
			<tr>
				<td><code>X-NOPE-Webhook-ID</code></td>
				<td>Your webhook configuration ID</td>
			</tr>
			<tr>
				<td><code>User-Agent</code></td>
				<td><code>NOPE-Webhooks/1.0</code></td>
			</tr>
		</tbody>
	</table>

	<hr class="my-12" />

	<h2>Signature Verification</h2>

	<p><strong>Always verify webhook signatures</strong> to ensure the request came from NOPE.</p>

	<p>The signature is computed as:</p>

	<pre><code>HMAC-SHA256(key=secret, message=timestamp + "." + raw_body)</code></pre>

	<h3>Node.js Example</h3>

	<pre><code>const crypto = require('crypto');

function verifyWebhook(rawBody, signature, timestamp, secret) &#123;
  // 1. Check timestamp freshness (prevent replay attacks)
  const timestampAge = Date.now() - (parseInt(timestamp) * 1000);
  if (timestampAge > 5 * 60 * 1000) &#123; // 5 minutes
    console.error('Webhook timestamp too old');
    return false;
  &#125;

  // 2. Compute expected signature
  const message = `$&#123;timestamp&#125;.$&#123;rawBody&#125;`;
  const expected = crypto
    .createHmac('sha256', secret)
    .update(message)
    .digest('hex');

  // 3. Compare signatures (constant-time)
  const received = signature.replace('sha256=', '');
  return crypto.timingSafeEqual(
    Buffer.from(expected),
    Buffer.from(received)
  );
&#125;

// Express.js example
app.post('/webhooks/nope', express.raw(&#123; type: 'application/json' &#125;), (req, res) => &#123;
  const signature = req.headers['x-nope-signature'];
  const timestamp = req.headers['x-nope-timestamp'];

  if (!verifyWebhook(req.body.toString(), signature, timestamp, process.env.NOPE_WEBHOOK_SECRET)) &#123;
    return res.status(401).send('Invalid signature');
  &#125;

  const event = JSON.parse(req.body);

  // Handle event
  if (event.event === 'risk.elevated' || event.event === 'risk.critical') &#123;
    notifySafetyTeam(event);
  &#125;

  // Respond quickly (< 30s)
  res.status(200).send('OK');
&#125;);</code></pre>

	<h3>Python Example</h3>

	<pre><code>import hmac
import hashlib
import time

def verify_webhook(raw_body: bytes, signature: str, timestamp: str, secret: str) -> bool:
    # 1. Check timestamp freshness
    timestamp_age = time.time() - int(timestamp)
    if timestamp_age > 300:  # 5 minutes
        return False

    # 2. Compute expected signature
    message = f"&#123;timestamp&#125;.&#123;raw_body.decode()&#125;"
    expected = hmac.new(
        secret.encode(),
        message.encode(),
        hashlib.sha256
    ).hexdigest()

    # 3. Compare signatures (constant-time)
    received = signature.replace('sha256=', '')
    return hmac.compare_digest(expected, received)

# Flask example
@app.route('/webhooks/nope', methods=['POST'])
def handle_webhook():
    signature = request.headers.get('X-NOPE-Signature')
    timestamp = request.headers.get('X-NOPE-Timestamp')

    if not verify_webhook(request.data, signature, timestamp, WEBHOOK_SECRET):
        return 'Invalid signature', 401

    event = request.json

    if event['event'] in ('risk.elevated', 'risk.critical'):
        notify_safety_team(event)

    return 'OK', 200</code></pre>

	<hr class="my-12" />

	<h2>Retry Behavior</h2>

	<p>We retry failed deliveries with exponential backoff:</p>

	<table>
		<thead>
			<tr>
				<th>Attempt</th>
				<th>Delay</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>1</td>
				<td>Immediate</td>
			</tr>
			<tr>
				<td>2</td>
				<td>1 minute</td>
			</tr>
			<tr>
				<td>3</td>
				<td>10 minutes</td>
			</tr>
			<tr>
				<td>4</td>
				<td>1 hour</td>
			</tr>
		</tbody>
	</table>

	<p><strong>Success:</strong> HTTP 2xx</p>
	<p><strong>Permanent failure (no retry):</strong> HTTP 4xx (except 408, 429)</p>
	<p><strong>Transient failure (retry):</strong> HTTP 408, 429, 5xx, timeout, network error</p>

	<hr class="my-12" />

	<h2>Delivery Semantics</h2>

	<p>
		<strong>At-least-once delivery.</strong> Webhooks may be delivered more than once.
		Use <code>event_id</code> for idempotency:
	</p>

	<pre><code>// Check if we've already processed this event
if (await hasProcessedEvent(event.event_id)) &#123;
  return res.status(200).send('OK'); // Acknowledge duplicate
&#125;
await markEventProcessed(event.event_id);
// ... handle event</code></pre>

	<hr class="my-12" />

	<h2>Best Practices</h2>

	<ul>
		<li><strong>Respond quickly</strong> - Return 200 within 30 seconds, process async</li>
		<li><strong>Always verify signatures</strong> - Prevents spoofed webhooks</li>
		<li><strong>Implement idempotency</strong> - Webhooks may be delivered multiple times</li>
		<li><strong>Check timestamp freshness</strong> - Prevents replay attacks</li>
		<li><strong>Use HTTPS</strong> - Protect webhook payloads in transit</li>
		<li><strong>Log all events</strong> - Maintain audit trail for compliance</li>
	</ul>
</div>
