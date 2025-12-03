<svelte:head>
	<title>Severity & Imminence - NOPE Documentation</title>
</svelte:head>

<div class="prose">
	<h1>Severity & Imminence</h1>

	<p class="text-xl text-gray-600 mb-8">
		NOPE separates <strong>HOW SERIOUS</strong> (severity) from <strong>HOW SOON</strong> (imminence). This separation is critical for triage and resource allocation.
	</p>

	<h2>Why Separate Severity and Imminence?</h2>

	<p>
		Consider two scenarios:
	</p>

	<table>
		<thead>
			<tr>
				<th>Scenario</th>
				<th>Severity</th>
				<th>Imminence</th>
				<th>Response</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>"I've been suicidal for years but I'm managing"</td>
				<td>high</td>
				<td>chronic</td>
				<td>Outpatient care, safety planning, monitoring</td>
			</tr>
			<tr>
				<td>"I'm going to do it tonight"</td>
				<td>critical</td>
				<td>emergency</td>
				<td>Emergency services, immediate intervention</td>
			</tr>
		</tbody>
	</table>

	<p>
		Both are serious, but the second requires immediate action. Without imminence, you can't prioritize correctly.
	</p>

	<p>
		This separation is inspired by the <strong>Threshold Assessment Grid (TAG)</strong> used in UK mental health services.
	</p>

	<hr class="my-12" />

	<h2>Severity Levels</h2>

	<p>
		Severity indicates the <strong>seriousness of the risk pattern</strong>, independent of timing.
	</p>

	<table>
		<thead>
			<tr>
				<th>Level</th>
				<th>Definition</th>
				<th>Typical Indicators</th>
				<th>Response Guidance</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>none</code></td>
				<td>No clinically relevant concern detected</td>
				<td>Normal conversation, no distress signals</td>
				<td>Continue normal interaction</td>
			</tr>
			<tr>
				<td><code>mild</code></td>
				<td>Minor distress, no clear risk signals</td>
				<td>General stress, low mood without ideation</td>
				<td>Empathic response, general resources</td>
			</tr>
			<tr>
				<td><code>moderate</code></td>
				<td>Clear concern, clinical attention warranted</td>
				<td>Passive ideation, early warning signs</td>
				<td>Crisis resources, encourage professional help</td>
			</tr>
			<tr>
				<td><code>high</code></td>
				<td>Serious risk pattern or stated intent</td>
				<td>Active ideation, plan present, means access</td>
				<td>Strong crisis resources, safety planning prompt</td>
			</tr>
			<tr>
				<td><code>critical</code></td>
				<td>Imminent danger with intent and means</td>
				<td>Active plan + intent + means + timeline</td>
				<td>Emergency resources, immediate escalation</td>
			</tr>
		</tbody>
	</table>

	<h3>Severity Decision Factors</h3>

	<p>
		Severity escalates based on the <strong>presence and combination</strong> of risk features:
	</p>

	<h4>Self Domain (C-SSRS Mapping)</h4>

	<table>
		<thead>
			<tr>
				<th>Severity</th>
				<th>C-SSRS Level</th>
				<th>Required Features</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>mild</code></td>
				<td>Level 1</td>
				<td>Passive ideation only (wish to be dead)</td>
			</tr>
			<tr>
				<td><code>moderate</code></td>
				<td>Level 2-3</td>
				<td>Active ideation without plan, OR NSSI without suicidal intent</td>
			</tr>
			<tr>
				<td><code>high</code></td>
				<td>Level 3-4</td>
				<td>Active ideation WITH plan, OR means access, OR previous attempts</td>
			</tr>
			<tr>
				<td><code>critical</code></td>
				<td>Level 5</td>
				<td>Intent + plan + means + recent attempt, OR preparatory behaviors</td>
			</tr>
		</tbody>
	</table>

	<h4>Others Domain (HCR-20 Factors)</h4>

	<table>
		<thead>
			<tr>
				<th>Severity</th>
				<th>Required Features</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>mild</code></td>
				<td>Vague expressions of anger without threat</td>
			</tr>
			<tr>
				<td><code>moderate</code></td>
				<td>Specific violent thoughts without identified target</td>
			</tr>
			<tr>
				<td><code>high</code></td>
				<td>Specific threat OR identifiable victim OR plan for violence</td>
			</tr>
			<tr>
				<td><code>critical</code></td>
				<td>Identifiable victim + plan + means available + recent escalation</td>
			</tr>
		</tbody>
	</table>

	<h4>Victimisation Domain (DASH/Danger Assessment)</h4>

	<table>
		<thead>
			<tr>
				<th>Severity</th>
				<th>Required Features</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>mild</code></td>
				<td>Relationship conflict without violence</td>
			</tr>
			<tr>
				<td><code>moderate</code></td>
				<td>Pattern of control OR isolated physical incident</td>
			</tr>
			<tr>
				<td><code>high</code></td>
				<td>Escalating violence OR weapons involved OR recent separation</td>
			</tr>
			<tr>
				<td><code>critical</code></td>
				<td>Strangulation history OR threats to kill OR extreme control</td>
			</tr>
		</tbody>
	</table>

	<hr class="my-12" />

	<h2>Imminence Levels</h2>

	<p>
		Imminence indicates <strong>how soon harm might occur</strong>, guiding urgency of response.
	</p>

	<table>
		<thead>
			<tr>
				<th>Level</th>
				<th>Definition</th>
				<th>Timeframe</th>
				<th>Response Urgency</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>not_applicable</code></td>
				<td>No active risk detected</td>
				<td>N/A</td>
				<td>Only used when severity = none</td>
			</tr>
			<tr>
				<td><code>chronic</code></td>
				<td>Longstanding pattern, currently stable</td>
				<td>Weeks to months</td>
				<td>Monitoring, outpatient care</td>
			</tr>
			<tr>
				<td><code>subacute</code></td>
				<td>Elevated risk, potential for escalation</td>
				<td>Days to weeks</td>
				<td>Professional intervention within days</td>
			</tr>
			<tr>
				<td><code>urgent</code></td>
				<td>Likely escalation without intervention</td>
				<td>Hours to 48 hours</td>
				<td>Same-day response, crisis team</td>
			</tr>
			<tr>
				<td><code>emergency</code></td>
				<td>Immediate danger, harm in progress or imminent</td>
				<td>Now / minutes</td>
				<td>Emergency services (911/999/112)</td>
			</tr>
		</tbody>
	</table>

	<h3>Imminence Decision Factors</h3>

	<p>
		Imminence escalates based on <strong>temporal indicators</strong>:
	</p>

	<ul>
		<li><strong>Timeline stated</strong> — "tonight", "this week", "when I get home"</li>
		<li><strong>Preparatory acts</strong> — Giving away possessions, writing notes, acquiring means</li>
		<li><strong>Recent attempt</strong> — Attempt within 48 hours suggests continued imminent risk</li>
		<li><strong>Acute stressors</strong> — Recent loss, humiliation, crisis event</li>
		<li><strong>Deteriorating state</strong> — Increasing distress, hopelessness, agitation</li>
	</ul>

	<h3>Imminence Without High Severity</h3>

	<p>
		Imminence can be urgent even with moderate severity. For example:
	</p>

	<pre><code>"I'm having thoughts about ending it and I have a doctor's appointment tomorrow."</code></pre>

	<p>
		Severity: <code>moderate</code> (ideation present but no plan/means stated)<br>
		Imminence: <code>urgent</code> (acute crisis state requiring same-day attention)
	</p>

	<hr class="my-12" />

	<h2>Severity × Imminence Matrix</h2>

	<p>
		The combination determines response priority:
	</p>

	<table>
		<thead>
			<tr>
				<th></th>
				<th>not_applicable</th>
				<th>chronic</th>
				<th>subacute</th>
				<th>urgent</th>
				<th>emergency</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><strong>none</strong></td>
				<td class="bg-gray-50">Normal</td>
				<td class="bg-gray-100">—</td>
				<td class="bg-gray-100">—</td>
				<td class="bg-gray-100">—</td>
				<td class="bg-gray-100">—</td>
			</tr>
			<tr>
				<td><strong>mild</strong></td>
				<td class="bg-gray-100">—</td>
				<td class="bg-green-50">Low priority</td>
				<td class="bg-green-100">Monitor</td>
				<td class="bg-yellow-100">Attention</td>
				<td class="bg-yellow-200">Attention</td>
			</tr>
			<tr>
				<td><strong>moderate</strong></td>
				<td class="bg-gray-100">—</td>
				<td class="bg-green-100">Monitor</td>
				<td class="bg-yellow-100">Attention</td>
				<td class="bg-orange-100">Prompt</td>
				<td class="bg-orange-200">Escalate</td>
			</tr>
			<tr>
				<td><strong>high</strong></td>
				<td class="bg-gray-100">—</td>
				<td class="bg-yellow-100">Attention</td>
				<td class="bg-orange-100">Prompt</td>
				<td class="bg-red-100">Crisis</td>
				<td class="bg-red-200">Emergency</td>
			</tr>
			<tr>
				<td><strong>critical</strong></td>
				<td class="bg-gray-100">—</td>
				<td class="bg-orange-100">Prompt</td>
				<td class="bg-red-100">Crisis</td>
				<td class="bg-red-200">Emergency</td>
				<td class="bg-red-300">Immediate</td>
			</tr>
		</tbody>
	</table>

	<h3>Response Levels</h3>

	<ul>
		<li><strong>Normal</strong> — Standard interaction, no intervention needed</li>
		<li><strong>Low priority</strong> — Note concern, offer general resources</li>
		<li><strong>Monitor</strong> — Check in, provide crisis resources proactively</li>
		<li><strong>Attention</strong> — Strong encouragement to seek help, prominent crisis resources</li>
		<li><strong>Prompt</strong> — Professional intervention recommended within 24-48h</li>
		<li><strong>Crisis</strong> — Same-day intervention, crisis team engagement</li>
		<li><strong>Emergency</strong> — Emergency services, immediate escalation</li>
		<li><strong>Immediate</strong> — 911/999/112, in-progress emergency</li>
	</ul>

	<hr class="my-12" />

	<h2>Confidence Scores</h2>

	<p>
		Every assessment includes a confidence score (0.0 to 1.0) indicating certainty:
	</p>

	<table>
		<thead>
			<tr>
				<th>Range</th>
				<th>Interpretation</th>
				<th>Guidance</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>0.8 - 1.0</td>
				<td>High confidence</td>
				<td>Act on the classification</td>
			</tr>
			<tr>
				<td>0.6 - 0.8</td>
				<td>Moderate confidence</td>
				<td>Proceed with caution, consider context</td>
			</tr>
			<tr>
				<td>0.4 - 0.6</td>
				<td>Low confidence</td>
				<td>Human review recommended</td>
			</tr>
			<tr>
				<td>Below 0.4</td>
				<td>Very low confidence</td>
				<td>Insufficient information, gather more context</td>
			</tr>
		</tbody>
	</table>

	<p>
		Low confidence often indicates:
	</p>

	<ul>
		<li>Ambiguous language ("I could just disappear" — suicide or leaving?)</li>
		<li>Insufficient context (single short message)</li>
		<li>Mixed signals (distress + protective factors)</li>
		<li>Sarcasm or hypothetical framing unclear</li>
	</ul>

	<h2>Global vs Domain Levels</h2>

	<p>
		The API returns both domain-specific and global assessments:
	</p>

	<pre><code>&#123;
  "domains": [
    &#123;
      "domain": "self",
      "severity": "high",
      "imminence": "urgent"
    &#125;,
    &#123;
      "domain": "victimisation",
      "severity": "moderate",
      "imminence": "chronic"
    &#125;
  ],
  "global": &#123;
    "overall_severity": "high",      // Maximum across domains
    "overall_imminence": "urgent"    // Most urgent across domains
  &#125;
&#125;</code></pre>

	<p>
		<code>global.overall_severity</code> = MAX(all domain severities)<br>
		<code>global.overall_imminence</code> = MAX(all domain imminences)
	</p>

	<p>
		This ensures the most serious concern drives the response, even if other domains are less concerning.
	</p>
</div>
