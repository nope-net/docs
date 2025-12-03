<svelte:head>
	<title>Risk Domains - NOPE Documentation</title>
</svelte:head>

<div class="prose">
	<h1>Risk Domains</h1>

	<p class="text-xl text-gray-600 mb-8">
		Risk domains answer the fundamental question: <strong>WHO is at risk?</strong> NOPE evaluates four distinct domains, each with specific subtypes and clinical considerations.
	</p>

	<h2>The Four Domains</h2>

	<table>
		<thead>
			<tr>
				<th>Domain</th>
				<th>Description</th>
				<th>Subtype Required?</th>
				<th>Clinical Framework</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>self</code></td>
				<td>Risk to oneself (suicide, self-harm, self-neglect)</td>
				<td>Yes</td>
				<td>C-SSRS, SITBI</td>
			</tr>
			<tr>
				<td><code>others</code></td>
				<td>Risk to other people (violence, threats, homicide)</td>
				<td>No</td>
				<td>HCR-20 V3</td>
			</tr>
			<tr>
				<td><code>dependent_at_risk</code></td>
				<td>Risk to dependents (children, vulnerable adults, animals)</td>
				<td>Yes</td>
				<td>WHO, MASH</td>
			</tr>
			<tr>
				<td><code>victimisation</code></td>
				<td>Being harmed by others (IPV, trafficking, abuse)</td>
				<td>Optional</td>
				<td>DASH, Danger Assessment</td>
			</tr>
		</tbody>
	</table>

	<hr class="my-12" />

	<h2 id="self">Self Domain</h2>

	<p>
		The <code>self</code> domain captures risk directed toward oneself. This includes suicidal ideation, non-suicidal self-injury (NSSI), and self-neglect. It's the most nuanced domain because self-directed risk presents differently across these subtypes.
	</p>

	<h3>Subtypes (Required)</h3>

	<p>Every <code>self</code> assessment MUST include a <code>self_subtype</code>:</p>

	<table>
		<thead>
			<tr>
				<th>Subtype</th>
				<th>Definition</th>
				<th>Key Indicators</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>suicidal_or_self_injury</code></td>
				<td>Suicidal ideation, planning, attempts, or non-suicidal self-injury</td>
				<td>plan_present, means_access, intent_present, nssi</td>
			</tr>
			<tr>
				<td><code>self_neglect</code></td>
				<td>Failure to meet basic needs through inaction (not eating, refusing medical care)</td>
				<td>days_without_food, medical_care_refusal, hygiene_neglect</td>
			</tr>
			<tr>
				<td><code>other</code></td>
				<td>Self-directed risk that doesn't fit the above categories</td>
				<td>Rare; used for edge cases</td>
			</tr>
		</tbody>
	</table>

	<h3>Why Subtypes Matter</h3>

	<p>
		Suicidal ideation and self-neglect require fundamentally different interventions:
	</p>

	<ul>
		<li><strong>Suicidal ideation</strong> → Crisis line, safety planning, means restriction, psychiatric evaluation</li>
		<li><strong>Self-neglect</strong> → Adult protective services, capacity assessment, home care, guardianship evaluation</li>
	</ul>

	<p>
		Without the subtype, a system can't route to appropriate resources.
	</p>

	<h3>Clinical Framework: C-SSRS</h3>

	<p>
		The Columbia Suicide Severity Rating Scale (C-SSRS) provides our ideation/behavior hierarchy:
	</p>

	<ol>
		<li><strong>Wish to be dead</strong> — Passive ideation ("I wish I wasn't here")</li>
		<li><strong>Non-specific active ideation</strong> — Thoughts of killing oneself without method</li>
		<li><strong>Active ideation with method</strong> — Thoughts with identified method but no plan</li>
		<li><strong>Active ideation with plan</strong> — Method + plan (when, where, how)</li>
		<li><strong>Active ideation with intent</strong> — Plan + intent to act</li>
	</ol>

	<p>
		Our <code>risk_types</code> directly map to these levels. See <a href="/taxonomy/features">Risk Features</a> for the full mapping.
	</p>

	<hr class="my-12" />

	<h2 id="others">Others Domain</h2>

	<p>
		The <code>others</code> domain captures risk of harm TO other people. This includes violence, threats, homicidal ideation, and mass violence planning.
	</p>

	<h3>No Subtype Required</h3>

	<p>
		Unlike <code>self</code>, the <code>others</code> domain doesn't require a subtype. Violence risk is assessed holistically using HCR-20 V3 factors.
	</p>

	<h3>Key Concepts</h3>

	<h4>Identifiable Victim (Tarasoff)</h4>

	<p>
		When a threat targets an <strong>identifiable victim</strong>, many jurisdictions impose a duty to warn. NOPE flags this in <code>legal_flags.third_party_threat</code>:
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

	<h4>Mass Violence Indicators</h4>

	<p>
		Risk features include specific indicators for mass violence planning, based on FBI Behavioral Threat Assessment Center (BTAC) criteria:
	</p>

	<ul>
		<li><code>mass_violence_planning</code> — Planning violence against multiple people</li>
		<li><code>target_identification</code> — Specific school, workplace, or public space named</li>
		<li><code>extremist_ideology_reference</code> — Explicit support for extremist ideology</li>
		<li><code>manifesto_or_ideological_justification</code> — Preparation of manifesto</li>
	</ul>

	<h3>Clinical Framework: HCR-20 V3</h3>

	<p>
		The Historical-Clinical-Risk Management framework provides our violence risk factors:
	</p>

	<ul>
		<li><strong>Historical</strong> — Previous violence (strongest predictor), early maladjustment</li>
		<li><strong>Clinical</strong> — Current mental state, substance use, insight</li>
		<li><strong>Risk Management</strong> — Plans feasibility, stress, professional services</li>
	</ul>

	<hr class="my-12" />

	<h2 id="dependent">Dependent at Risk Domain</h2>

	<p>
		The <code>dependent_at_risk</code> domain captures risk to people (or animals) who depend on others for their safety. This triggers safeguarding considerations.
	</p>

	<h3>Subtypes (Required)</h3>

	<table>
		<thead>
			<tr>
				<th>Subtype</th>
				<th>Definition</th>
				<th>Safeguarding Pathway</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>child</code></td>
				<td>Person under 18 at risk of abuse or neglect</td>
				<td>Child protective services, MASH referral</td>
			</tr>
			<tr>
				<td><code>adult_at_risk</code></td>
				<td>Vulnerable adult (elderly, disabled, cognitively impaired)</td>
				<td>Adult protective services</td>
			</tr>
			<tr>
				<td><code>animal_or_other</code></td>
				<td>Animal cruelty or other dependent</td>
				<td>Animal welfare, law enforcement</td>
			</tr>
		</tbody>
	</table>

	<h3>Why Animal Cruelty Matters</h3>

	<p>
		Animal cruelty is a <strong>5x predictor of violence toward humans</strong>. Research consistently shows the link between animal abuse and interpersonal violence. When detected, it's flagged in <code>legal_flags.animal_cruelty_indicator</code>.
	</p>

	<h3>Online Exploitation of Minors</h3>

	<p>
		Special risk features exist for online exploitation:
	</p>

	<ul>
		<li><code>online_grooming</code> — Adult building trust with minor for sexual exploitation</li>
		<li><code>sexual_exploitation_online</code> — Minor coerced to share sexual content</li>
		<li><code>contact_from_unknown_adult</code> — Minor in contact with unknown adult (sexual/coercive context)</li>
		<li><code>age_mismatch_concern</code> — Large age gap in sexual/romantic context</li>
	</ul>

	<h3>Clinical Framework: WHO + MASH</h3>

	<p>
		We integrate WHO Child Protection Guidelines with UK Multi-Agency Safeguarding Hub (MASH) urgency levels:
	</p>

	<ul>
		<li><strong>Routine</strong> — Concern noted, standard follow-up</li>
		<li><strong>Prompt</strong> — Action needed within days</li>
		<li><strong>Urgent</strong> — Same-day response required</li>
		<li><strong>Emergency</strong> — Immediate child protection intervention</li>
	</ul>

	<hr class="my-12" />

	<h2 id="victimisation">Victimisation Domain</h2>

	<p>
		The <code>victimisation</code> domain captures situations where the user IS BEING harmed by others. This is the inverse of <code>others</code> — the user is the victim, not the perpetrator.
	</p>

	<h3>Subtypes (Optional)</h3>

	<p>
		Subtypes improve resource matching but aren't required:
	</p>

	<table>
		<thead>
			<tr>
				<th>Subtype</th>
				<th>Definition</th>
				<th>Key Resources</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>IPV_intimate_partner</code></td>
				<td>Domestic violence, intimate partner violence</td>
				<td>DV hotlines, shelter services</td>
			</tr>
			<tr>
				<td><code>family_non_intimate</code></td>
				<td>Family violence (non-partner)</td>
				<td>Family services, social services</td>
			</tr>
			<tr>
				<td><code>trafficking_exploitation</code></td>
				<td>Labor or sex trafficking</td>
				<td>Trafficking hotlines, law enforcement</td>
			</tr>
			<tr>
				<td><code>community_violence</code></td>
				<td>Gang violence, community-based threats</td>
				<td>Victim services, relocation support</td>
			</tr>
			<tr>
				<td><code>institutional_abuse</code></td>
				<td>Care setting or workplace abuse</td>
				<td>Regulatory bodies, legal services</td>
			</tr>
			<tr>
				<td><code>other</code></td>
				<td>Other victimisation patterns</td>
				<td>General victim support</td>
			</tr>
		</tbody>
	</table>

	<h3>Critical Indicator: Strangulation</h3>

	<blockquote>
		<strong>ANY history of strangulation = 750x increased homicide risk</strong>
	</blockquote>

	<p>
		This is the single most important risk factor in intimate partner violence. Based on research by the Johns Hopkins Danger Assessment, strangulation history triggers:
	</p>

	<ul>
		<li>Automatic <code>critical</code> severity consideration</li>
		<li><code>legal_flags.intimate_partner_violence.risk_level = "extreme"</code></li>
		<li><code>legal_flags.intimate_partner_violence.strangulation_history = true</code></li>
	</ul>

	<h3>Tech-Facilitated Harm</h3>

	<p>
		Modern victimisation includes technology-facilitated abuse:
	</p>

	<ul>
		<li><code>sextortion</code> — Threat to share intimate content unless demands met</li>
		<li><code>non_consensual_image_sharing</code> — NCII ("revenge porn")</li>
		<li><code>monitoring_surveillance</code> — GPS tracking, phone monitoring</li>
		<li><code>stalking</code> — Following, unwanted contact (online or offline)</li>
	</ul>

	<h3>Clinical Framework: DASH</h3>

	<p>
		The Domestic Abuse, Stalking and Harassment Risk Identification Checklist (DASH) provides our IPV risk factors. Combined with the Johns Hopkins Danger Assessment for lethality indicators.
	</p>

	<hr class="my-12" />

	<h2>Domain Interactions</h2>

	<p>
		A single conversation can trigger multiple domains. For example:
	</p>

	<pre><code>"My partner hit me again. I'm thinking of hurting myself. I'm worried about what he'll do to the kids."</code></pre>

	<p>
		This triggers:
	</p>

	<ul>
		<li><code>victimisation</code> — User is being abused (IPV)</li>
		<li><code>self</code> — Suicidal ideation</li>
		<li><code>dependent_at_risk</code> — Children at risk</li>
	</ul>

	<p>
		Each domain receives independent severity/imminence assessment. The <code>global.overall_severity</code> takes the maximum across all domains.
	</p>

	<h2>Removed Domains</h2>

	<p>
		Earlier versions had additional domains that were restructured in v1:
	</p>

	<table>
		<thead>
			<tr>
				<th>Former Domain</th>
				<th>Now Handled As</th>
				<th>Rationale</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>psychosis</code></td>
				<td><code>presentation_modifiers.psychotic_features</code></td>
				<td>Psychosis modifies HOW risk presents, not WHO is at risk</td>
			</tr>
			<tr>
				<td><code>self_neglect</code></td>
				<td><code>self</code> domain with <code>self_subtype: "self_neglect"</code></td>
				<td>Self-neglect is self-directed risk</td>
			</tr>
			<tr>
				<td><code>other_concerns</code></td>
				<td>Removed</td>
				<td>Out of scope for clinical safety API</td>
			</tr>
		</tbody>
	</table>
</div>
