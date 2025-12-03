<svelte:head>
	<title>Legal & Safeguarding Flags - NOPE Documentation</title>
</svelte:head>

<div class="prose">
	<h1>Legal & Safeguarding Flags</h1>

	<p class="text-xl text-gray-600 mb-8">
		Certain situations have <strong>legal or mandatory reporting implications</strong>. NOPE surfaces these as structured flags with evidence grades.
	</p>

	<h2>Overview</h2>

	<p>
		Legal flags are separate from domain assessments because they may require specific actions beyond clinical response:
	</p>

	<ul>
		<li><strong>Duty to warn</strong> — Legal obligation to warn identifiable victims</li>
		<li><strong>Mandatory reporting</strong> — Required reporting to authorities</li>
		<li><strong>Evidence preservation</strong> — Documentation for legal proceedings</li>
		<li><strong>Multi-agency response</strong> — Coordination with law enforcement, social services</li>
	</ul>

	<hr class="my-12" />

	<h2>Flag Categories</h2>

	<h3>Third-Party Threat (Tarasoff)</h3>

	<p>
		When someone threatens an <strong>identifiable victim</strong>, many jurisdictions impose a duty to warn or protect. Named after the landmark <em>Tarasoff v. Regents of University of California</em> (1976).
	</p>

	<pre><code>&#123;
  "legal_flags": &#123;
    "third_party_threat": &#123;
      "present": true,
      "identifiable_victim": true,
      "confidence": 0.88,
      "rationale": "User expressed plan to harm named neighbor",
      "evidence_grade": "strong"
    &#125;
  &#125;
&#125;</code></pre>

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
				<td><code>present</code></td>
				<td>boolean</td>
				<td>Threat to third party detected</td>
			</tr>
			<tr>
				<td><code>identifiable_victim</code></td>
				<td>boolean</td>
				<td>Victim is named or identifiable (triggers duty to warn)</td>
			</tr>
			<tr>
				<td><code>confidence</code></td>
				<td>number</td>
				<td>Classification confidence (0.0-1.0)</td>
			</tr>
			<tr>
				<td><code>rationale</code></td>
				<td>string</td>
				<td>Explanation of why flag was triggered</td>
			</tr>
			<tr>
				<td><code>evidence_grade</code></td>
				<td>string</td>
				<td>Strength of evidence (strong, moderate, weak)</td>
			</tr>
		</tbody>
	</table>

	<h4>Tarasoff Jurisdictions</h4>

	<p>
		Duty to warn/protect laws vary by jurisdiction:
	</p>

	<ul>
		<li><strong>Mandatory duty</strong> — California, many US states</li>
		<li><strong>Permissive duty</strong> — Some states allow but don't require warning</li>
		<li><strong>No duty</strong> — Some jurisdictions have no Tarasoff-like law</li>
		<li><strong>International</strong> — UK, Australia, Canada have varying approaches</li>
	</ul>

	<p>
		Consult legal counsel for your specific jurisdiction and context.
	</p>

	<hr class="my-12" />

	<h3>Intimate Partner Violence (IPV)</h3>

	<p>
		IPV flags include specific lethality indicators based on the <strong>Danger Assessment</strong> and <strong>DASH</strong> tools.
	</p>

	<pre><code>&#123;
  "legal_flags": &#123;
    "intimate_partner_violence": &#123;
      "risk_level": "extreme",
      "confidence": 0.91,
      "strangulation_history": true,
      "escalation_pattern": true,
      "evidence_grade": "strong"
    &#125;
  &#125;
&#125;</code></pre>

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
				<td><code>risk_level</code></td>
				<td>string</td>
				<td>Risk tier: standard, elevated, severe, extreme</td>
			</tr>
			<tr>
				<td><code>strangulation_history</code></td>
				<td>boolean</td>
				<td>Any history of strangulation (750x homicide risk)</td>
			</tr>
			<tr>
				<td><code>escalation_pattern</code></td>
				<td>boolean</td>
				<td>Violence increasing in frequency/severity</td>
			</tr>
		</tbody>
	</table>

	<h4>Risk Levels</h4>

	<table>
		<thead>
			<tr>
				<th>Level</th>
				<th>Indicators</th>
				<th>Response</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>standard</code></td>
				<td>Relationship conflict, no physical violence</td>
				<td>General DV resources</td>
			</tr>
			<tr>
				<td><code>elevated</code></td>
				<td>Physical violence, controlling behavior</td>
				<td>Safety planning, DV hotline</td>
			</tr>
			<tr>
				<td><code>severe</code></td>
				<td>Escalation, weapons, recent separation</td>
				<td>Urgent safety planning, shelter information</td>
			</tr>
			<tr>
				<td><code>extreme</code></td>
				<td>Strangulation, death threats, stalking</td>
				<td>Emergency response, law enforcement</td>
			</tr>
		</tbody>
	</table>

	<div class="not-prose bg-red-50 border border-red-200 rounded-lg p-4 my-6">
		<p class="text-sm text-red-800">
			<strong>Critical:</strong> <code>strangulation_history = true</code> indicates a 750x increase in homicide risk. This single indicator warrants extreme caution regardless of other factors.
		</p>
	</div>

	<hr class="my-12" />

	<h3>Child Safeguarding</h3>

	<p>
		Child protection flags use the UK <strong>MASH</strong> (Multi-Agency Safeguarding Hub) urgency framework.
	</p>

	<pre><code>&#123;
  "legal_flags": &#123;
    "child_safeguarding": &#123;
      "urgency": "urgent",
      "confidence": 0.85,
      "basic_needs_unmet": true,
      "immediate_danger": false,
      "evidence_grade": "moderate"
    &#125;
  &#125;
&#125;</code></pre>

	<table>
		<thead>
			<tr>
				<th>Urgency</th>
				<th>Definition</th>
				<th>Response Timeframe</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>routine</code></td>
				<td>Concern noted, standard follow-up appropriate</td>
				<td>Days to weeks</td>
			</tr>
			<tr>
				<td><code>prompt</code></td>
				<td>Action needed soon but not immediate</td>
				<td>Within 72 hours</td>
			</tr>
			<tr>
				<td><code>urgent</code></td>
				<td>Same-day safeguarding response required</td>
				<td>Same day</td>
			</tr>
			<tr>
				<td><code>emergency</code></td>
				<td>Immediate child protection intervention</td>
				<td>Immediate</td>
			</tr>
		</tbody>
	</table>

	<h4>Mandatory Reporting</h4>

	<p>
		Most jurisdictions require certain professionals to report suspected child abuse:
	</p>

	<ul>
		<li><strong>Mandated reporters</strong> — Teachers, doctors, social workers, law enforcement</li>
		<li><strong>Universal reporting</strong> — Some jurisdictions require anyone to report</li>
		<li><strong>Penalties</strong> — Failure to report may be criminal offense</li>
	</ul>

	<p>
		NOPE doesn't automatically report — it surfaces indicators for human decision-making.
	</p>

	<hr class="my-12" />

	<h3>Vulnerable Adult Safeguarding</h3>

	<p>
		Similar to child safeguarding but for adults who cannot protect themselves due to age, disability, or illness.
	</p>

	<pre><code>&#123;
  "legal_flags": &#123;
    "vulnerable_adult_safeguarding": &#123;
      "urgency": "prompt",
      "confidence": 0.78,
      "evidence_grade": "moderate"
    &#125;
  &#125;
&#125;</code></pre>

	<p>
		Includes:
	</p>

	<ul>
		<li>Elderly adults experiencing abuse or neglect</li>
		<li>Adults with disabilities being exploited</li>
		<li>Adults with cognitive impairment in unsafe situations</li>
		<li>Adults unable to care for themselves due to mental illness</li>
	</ul>

	<hr class="my-12" />

	<h3>Animal Cruelty Indicator</h3>

	<p>
		Animal cruelty is a <strong>significant predictor of violence toward humans</strong> (5x risk multiplier). FBI now tracks animal cruelty as a Group A felony.
	</p>

	<pre><code>&#123;
  "legal_flags": &#123;
    "animal_cruelty_indicator": &#123;
      "present": true,
      "confidence": 0.82,
      "evidence_grade": "moderate"
    &#125;
  &#125;
&#125;</code></pre>

	<p>
		Research connections:
	</p>

	<ul>
		<li><strong>Link to domestic violence</strong> — Abusers often harm pets to control victims</li>
		<li><strong>Link to child abuse</strong> — Children who abuse animals may be abuse victims</li>
		<li><strong>Link to mass violence</strong> — Many mass shooters have animal cruelty history</li>
		<li><strong>Developmental concern</strong> — Childhood animal cruelty predicts adult violence</li>
	</ul>

	<hr class="my-12" />

	<h2>Evidence Grades</h2>

	<p>
		Every legal flag includes an evidence grade indicating the strength of the classification:
	</p>

	<table>
		<thead>
			<tr>
				<th>Grade</th>
				<th>Definition</th>
				<th>Action Guidance</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>strong</code></td>
				<td>Clear, explicit indicators with high confidence</td>
				<td>Act on the flag. Evidence supports intervention.</td>
			</tr>
			<tr>
				<td><code>moderate</code></td>
				<td>Reasonable indicators, some interpretation required</td>
				<td>Consider carefully. May need clarification.</td>
			</tr>
			<tr>
				<td><code>weak</code></td>
				<td>Possible indicators, significant ambiguity</td>
				<td>Monitor situation. Gather more information.</td>
			</tr>
			<tr>
				<td><code>consensus</code></td>
				<td>Based on expert consensus rather than direct evidence</td>
				<td>Follow best practices even without explicit evidence.</td>
			</tr>
			<tr>
				<td><code>none</code></td>
				<td>No evidence for this flag</td>
				<td>Flag not applicable.</td>
			</tr>
		</tbody>
	</table>

	<hr class="my-12" />

	<h2>Presentation Modifiers</h2>

	<p>
		Presentation modifiers are <strong>cross-cutting clinical features</strong> that affect how risk presents across any domain:
	</p>

	<pre><code>&#123;
  "presentation_modifiers": &#123;
    "psychotic_features": true,
    "substance_involved": false,
    "cognitive_impairment": false,
    "personality_features": false,
    "acute_decompensation": true,
    "self_neglect_severe": false
  &#125;
&#125;</code></pre>

	<table>
		<thead>
			<tr>
				<th>Modifier</th>
				<th>Definition</th>
				<th>Clinical Implication</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>psychotic_features</code></td>
				<td>Delusions, hallucinations, disorganized thinking</td>
				<td>May need psychiatric hospitalization. Capacity concerns.</td>
			</tr>
			<tr>
				<td><code>substance_involved</code></td>
				<td>Current intoxication or withdrawal</td>
				<td>Disinhibition increases risk. May need medical management.</td>
			</tr>
			<tr>
				<td><code>cognitive_impairment</code></td>
				<td>Dementia, TBI, intellectual disability</td>
				<td>May affect capacity. Communication adaptations needed.</td>
			</tr>
			<tr>
				<td><code>personality_features</code></td>
				<td>Cluster B patterns (BPD, ASPD)</td>
				<td>May affect therapeutic approach. Risk of manipulation.</td>
			</tr>
			<tr>
				<td><code>acute_decompensation</code></td>
				<td>Sudden deterioration from baseline</td>
				<td>Crisis state. More intensive intervention needed.</td>
			</tr>
			<tr>
				<td><code>self_neglect_severe</code></td>
				<td>Severe self-care failure</td>
				<td>May need adult protective services even without suicidality.</td>
			</tr>
		</tbody>
	</table>

	<h2>Implementation Guidance</h2>

	<h3>When Legal Flags Fire</h3>

	<pre><code>const result = await nope.evaluate(&#123; messages, config &#125;);

// Check for duty to warn
if (result.legal_flags?.third_party_threat?.identifiable_victim) &#123;
  // Log for legal review
  logTarasoffConcern(result);
  // May need to contact authorities
&#125;

// Check for IPV emergency
if (result.legal_flags?.intimate_partner_violence?.risk_level === 'extreme') &#123;
  // Prioritize safety planning
  showEmergencyDVResources(result.crisis_resources);
&#125;

// Check for child protection
if (result.legal_flags?.child_safeguarding?.urgency === 'emergency') &#123;
  // Immediate safeguarding response
  escalateToChildProtection(result);
&#125;</code></pre>

	<h3>Legal Considerations</h3>

	<ul>
		<li><strong>Document everything</strong> — Legal flags should be logged for audit trail</li>
		<li><strong>Consult legal counsel</strong> — Duty to warn varies by jurisdiction</li>
		<li><strong>Human review</strong> — AI classification supports, doesn't replace, human judgment</li>
		<li><strong>Liability</strong> — Understand your organization's obligations and protections</li>
	</ul>
</div>
