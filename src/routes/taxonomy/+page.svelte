<svelte:head>
	<title>Risk Taxonomy Overview - NOPE Documentation</title>
</svelte:head>

<div class="prose">
	<h1>Risk Taxonomy Overview</h1>

	<p class="text-xl text-gray-600 mb-8">
		NOPE's classification system is built on evidence-based clinical frameworks. This section explains every concept in detail.
	</p>

	<h2>Design Philosophy</h2>

	<p>
		Our taxonomy separates three orthogonal dimensions:
	</p>

	<ol>
		<li><strong>WHO is at risk</strong> — Risk Domains (self, others, dependents, victim)</li>
		<li><strong>HOW SERIOUS is it</strong> — Severity (none → critical) + Imminence (chronic → emergency)</li>
		<li><strong>HOW does risk manifest</strong> — Presentation Modifiers (psychosis, substance, etc.)</li>
	</ol>

	<p>
		This separation ensures that a person with psychotic features experiencing suicidal ideation is classified
		differently from someone with the same psychotic features threatening others. The <em>domain</em> captures
		who's at risk, while the <em>modifier</em> captures the clinical presentation.
	</p>

	<h2>Core Components</h2>

	<div class="not-prose grid gap-4 my-8">
		<a href="/taxonomy/domains" class="block p-4 border border-gray-200 rounded-lg hover:border-teal-500 transition-colors">
			<h3 class="font-semibold text-gray-900">Risk Domains</h3>
			<p class="text-sm text-gray-600 mt-1">The 4 risk-target domains: self, others, dependent_at_risk, victimisation</p>
		</a>

		<a href="/taxonomy/severity" class="block p-4 border border-gray-200 rounded-lg hover:border-teal-500 transition-colors">
			<h3 class="font-semibold text-gray-900">Severity & Imminence</h3>
			<p class="text-sm text-gray-600 mt-1">The 5 severity levels and 5 imminence levels, with clinical definitions</p>
		</a>

		<a href="/taxonomy/features" class="block p-4 border border-gray-200 rounded-lg hover:border-teal-500 transition-colors">
			<h3 class="font-semibold text-gray-900">Risk Features</h3>
			<p class="text-sm text-gray-600 mt-1">106 domain-specific risk indicators with clinical definitions</p>
		</a>

		<a href="/taxonomy/protective" class="block p-4 border border-gray-200 rounded-lg hover:border-teal-500 transition-colors">
			<h3 class="font-semibold text-gray-900">Protective Factors</h3>
			<p class="text-sm text-gray-600 mt-1">28 strengths and resilience factors based on START framework</p>
		</a>

		<a href="/taxonomy/legal" class="block p-4 border border-gray-200 rounded-lg hover:border-teal-500 transition-colors">
			<h3 class="font-semibold text-gray-900">Legal & Safeguarding Flags</h3>
			<p class="text-sm text-gray-600 mt-1">Mandatory reporting triggers: IPV, child protection, third-party threats</p>
		</a>

		<a href="/taxonomy/frameworks" class="block p-4 border border-gray-200 rounded-lg hover:border-teal-500 transition-colors">
			<h3 class="font-semibold text-gray-900">Clinical Frameworks</h3>
			<p class="text-sm text-gray-600 mt-1">The evidence base: C-SSRS, HCR-20, DASH, START, and more</p>
		</a>
	</div>

	<h2>Why This Matters</h2>

	<p>
		Mental health risk assessment is complex. A single "risk score" loses critical nuance. Consider these scenarios:
	</p>

	<table>
		<thead>
			<tr>
				<th>Scenario</th>
				<th>Domain</th>
				<th>Severity</th>
				<th>Imminence</th>
				<th>Why It Matters</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>"I've thought about ending it"</td>
				<td>self</td>
				<td>moderate</td>
				<td>subacute</td>
				<td>Ideation present but no plan or immediate intent</td>
			</tr>
			<tr>
				<td>"I have pills saved up for tonight"</td>
				<td>self</td>
				<td>critical</td>
				<td>emergency</td>
				<td>Plan + means + timeline = immediate danger</td>
			</tr>
			<tr>
				<td>"I want to hurt my neighbor"</td>
				<td>others</td>
				<td>high</td>
				<td>subacute</td>
				<td>Identifiable victim triggers duty-to-warn</td>
			</tr>
			<tr>
				<td>"My partner choked me last week"</td>
				<td>victimisation</td>
				<td>critical</td>
				<td>urgent</td>
				<td>Strangulation = 750x homicide risk</td>
			</tr>
		</tbody>
	</table>

	<p>
		Each scenario requires different resources, different urgency, and different professional pathways.
		Our taxonomy captures these distinctions.
	</p>

	<h2>Validation & Evidence Base</h2>

	<p>
		Every enum value in NOPE maps to established clinical criteria:
	</p>

	<ul>
		<li><strong>Self domain</strong> — C-SSRS (Columbia Suicide Severity Rating Scale), Joiner's Interpersonal Theory</li>
		<li><strong>Others domain</strong> — HCR-20 V3 (Historical-Clinical-Risk Management), FBI BTAC</li>
		<li><strong>Victimisation domain</strong> — DASH (Domestic Abuse, Stalking, Harassment), Danger Assessment</li>
		<li><strong>Protective factors</strong> — START (Short-Term Assessment of Risk and Treatability)</li>
		<li><strong>Child safeguarding</strong> — WHO Child Protection Guidelines, UK MASH framework</li>
	</ul>

	<p>
		See the <a href="/taxonomy/frameworks">Clinical Frameworks</a> page for detailed citations and how each framework maps to our taxonomy.
	</p>

	<h2>Enum Philosophy</h2>

	<p>
		All values are <strong>fixed enumerations</strong>, not free text. This ensures:
	</p>

	<ul>
		<li><strong>Consistency</strong> — Same input → same classification structure</li>
		<li><strong>Type safety</strong> — Invalid values rejected at API level</li>
		<li><strong>Auditability</strong> — Clear mapping to clinical definitions</li>
		<li><strong>Versioning</strong> — Changes require explicit version bumps</li>
	</ul>

	<p>
		Adding a new risk feature requires clinical justification and coordinated updates to prompts, validation, and documentation.
	</p>

	<h2>Quick Reference</h2>

	<table>
		<thead>
			<tr>
				<th>Category</th>
				<th>Count</th>
				<th>Examples</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Risk Domains</td>
				<td>4</td>
				<td>self, others, dependent_at_risk, victimisation</td>
			</tr>
			<tr>
				<td>Severity Levels</td>
				<td>5</td>
				<td>none, mild, moderate, high, critical</td>
			</tr>
			<tr>
				<td>Imminence Levels</td>
				<td>5</td>
				<td>not_applicable, chronic, subacute, urgent, emergency</td>
			</tr>
			<tr>
				<td>Self Risk Features</td>
				<td>42</td>
				<td>plan_present, means_access, hopelessness</td>
			</tr>
			<tr>
				<td>Others Risk Features</td>
				<td>16</td>
				<td>specific_threat, identifiable_victim, history_of_violence</td>
			</tr>
			<tr>
				<td>Dependent Risk Features</td>
				<td>20</td>
				<td>physical_abuse, neglect, online_grooming</td>
			</tr>
			<tr>
				<td>Victimisation Risk Features</td>
				<td>28</td>
				<td>strangulation_history, escalation_pattern, sextortion</td>
			</tr>
			<tr>
				<td>Protective Factors</td>
				<td>28</td>
				<td>social_support, coping_skills, safety_planning</td>
			</tr>
			<tr>
				<td>Presentation Modifiers</td>
				<td>6</td>
				<td>psychotic_features, substance_involved</td>
			</tr>
			<tr>
				<td>Legal Flag Categories</td>
				<td>5</td>
				<td>third_party_threat, intimate_partner_violence</td>
			</tr>
		</tbody>
	</table>
</div>
