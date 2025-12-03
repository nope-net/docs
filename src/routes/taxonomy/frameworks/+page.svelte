<svelte:head>
	<title>Clinical Frameworks - NOPE Documentation</title>
</svelte:head>

<div class="prose">
	<h1>Clinical Frameworks</h1>

	<p class="text-xl text-gray-600 mb-8">
		NOPE's taxonomy is built on <strong>established clinical frameworks</strong> used by mental health professionals worldwide. This page explains each framework and how it maps to our classification system.
	</p>

	<hr class="my-12" />

	<h2>Suicide Risk Assessment</h2>

	<h3>C-SSRS (Columbia Suicide Severity Rating Scale)</h3>

	<p>
		The gold standard for suicide risk assessment, developed at Columbia University. Used in FDA trials, emergency departments, and clinical practice worldwide.
	</p>

	<h4>NOPE Mapping</h4>

	<table>
		<thead>
			<tr>
				<th>C-SSRS Level</th>
				<th>Definition</th>
				<th>NOPE Risk Type</th>
				<th>Typical Severity</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>1</td>
				<td>Wish to be dead</td>
				<td><code>self_harm_passive_ideation</code></td>
				<td>mild-moderate</td>
			</tr>
			<tr>
				<td>2</td>
				<td>Non-specific active suicidal thoughts</td>
				<td><code>self_harm_active_ideation_no_plan</code></td>
				<td>moderate</td>
			</tr>
			<tr>
				<td>3</td>
				<td>Active ideation with method (no plan)</td>
				<td><code>self_harm_active_ideation_plan</code></td>
				<td>moderate-high</td>
			</tr>
			<tr>
				<td>4</td>
				<td>Active ideation with intent to act</td>
				<td><code>self_harm_active_ideation_intent</code></td>
				<td>high</td>
			</tr>
			<tr>
				<td>5</td>
				<td>Active ideation with plan and intent</td>
				<td><code>self_harm_preparatory_behavior</code></td>
				<td>critical</td>
			</tr>
		</tbody>
	</table>

	<h4>Behavioral Questions (C-SSRS)</h4>

	<p>C-SSRS also assesses suicide behavior:</p>

	<ul>
		<li><strong>Actual attempt</strong> → <code>self_harm_actual_attempt</code></li>
		<li><strong>Interrupted attempt</strong> → <code>self_harm_interrupted_attempt</code></li>
		<li><strong>Aborted attempt</strong> → <code>self_harm_aborted_attempt</code></li>
		<li><strong>Preparatory acts</strong> → <code>preparatory_acts</code> feature</li>
	</ul>

	<h4>Reference</h4>
	<p class="text-sm text-gray-600">
		Posner, K., et al. (2011). The Columbia-Suicide Severity Rating Scale: Initial validity and internal consistency findings from three multisite studies with adolescents and adults. <em>American Journal of Psychiatry</em>, 168(12), 1266-1277.
	</p>

	<hr class="my-8" />

	<h3>Joiner's Interpersonal Theory of Suicide</h3>

	<p>
		Explains why people die by suicide through three constructs: thwarted belongingness, perceived burdensomeness, and acquired capability.
	</p>

	<h4>NOPE Mapping</h4>

	<table>
		<thead>
			<tr>
				<th>Construct</th>
				<th>Definition</th>
				<th>NOPE Feature</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Thwarted Belongingness</td>
				<td>Feeling disconnected, not part of a group</td>
				<td><code>social_isolation</code>, <code>feeling_trapped</code></td>
			</tr>
			<tr>
				<td>Perceived Burdensomeness</td>
				<td>Belief that others would be better off</td>
				<td><code>perceived_burdensomeness</code></td>
			</tr>
			<tr>
				<td>Acquired Capability</td>
				<td>Reduced fear of death through exposure</td>
				<td><code>previous_attempts</code>, <code>nssi</code></td>
			</tr>
		</tbody>
	</table>

	<h4>Reference</h4>
	<p class="text-sm text-gray-600">
		Joiner, T. E. (2005). <em>Why people die by suicide</em>. Harvard University Press.
	</p>

	<hr class="my-8" />

	<h3>Beck Hopelessness Scale</h3>

	<p>
		Measures negative expectations about the future. Hopelessness is a stronger predictor of suicide than depression alone.
	</p>

	<h4>NOPE Mapping</h4>

	<p>
		The <code>hopelessness</code> risk feature directly maps to elevated BHS scores.
	</p>

	<h4>Reference</h4>
	<p class="text-sm text-gray-600">
		Beck, A. T., et al. (1974). The measurement of pessimism: The Hopelessness Scale. <em>Journal of Consulting and Clinical Psychology</em>, 42(6), 861-865.
	</p>

	<hr class="my-12" />

	<h2>Violence Risk Assessment</h2>

	<h3>HCR-20 V3 (Historical-Clinical-Risk Management)</h3>

	<p>
		The most widely used structured professional judgment tool for violence risk. Version 3 (2013) is current standard.
	</p>

	<h4>NOPE Mapping</h4>

	<table>
		<thead>
			<tr>
				<th>HCR-20 Factor</th>
				<th>Scale</th>
				<th>NOPE Feature(s)</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Previous Violence</td>
				<td>Historical</td>
				<td><code>history_of_violence</code></td>
			</tr>
			<tr>
				<td>Problems with Substance Use</td>
				<td>Historical</td>
				<td><code>substance_intoxication</code></td>
			</tr>
			<tr>
				<td>Violent Ideation/Intent</td>
				<td>Clinical</td>
				<td><code>specific_threat</code></td>
			</tr>
			<tr>
				<td>Symptoms of Major Mental Disorder</td>
				<td>Clinical</td>
				<td><code>psychosis_present</code>, <code>command_hallucinations</code></td>
			</tr>
			<tr>
				<td>Instability</td>
				<td>Clinical</td>
				<td><code>escalating_anger</code>, <code>poor_impulse_control</code></td>
			</tr>
			<tr>
				<td>Recent Stressors</td>
				<td>Risk</td>
				<td><code>recent_loss</code>, <code>humiliation</code></td>
			</tr>
		</tbody>
	</table>

	<h4>Reference</h4>
	<p class="text-sm text-gray-600">
		Douglas, K. S., et al. (2013). <em>HCR-20V3: Assessing risk for violence</em>. Mental Health, Law, and Policy Institute, Simon Fraser University.
	</p>

	<hr class="my-8" />

	<h3>FBI BTAC (Behavioral Threat Assessment Center)</h3>

	<p>
		FBI's approach to preventing targeted violence, including mass attacks. Focuses on pathway to violence rather than profiles.
	</p>

	<h4>NOPE Mapping</h4>

	<table>
		<thead>
			<tr>
				<th>BTAC Concept</th>
				<th>NOPE Feature</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Grievance</td>
				<td><code>grievance</code></td>
			</tr>
			<tr>
				<td>Ideation</td>
				<td><code>violence_ideation_specific</code></td>
			</tr>
			<tr>
				<td>Research/Planning</td>
				<td><code>mass_violence_planning</code>, <code>target_identification</code></td>
			</tr>
			<tr>
				<td>Preparation</td>
				<td><code>means_available</code></td>
			</tr>
			<tr>
				<td>Breach/Attack</td>
				<td><code>violence_recent</code></td>
			</tr>
		</tbody>
	</table>

	<h4>Reference</h4>
	<p class="text-sm text-gray-600">
		FBI (2019). <em>Making Prevention a Reality: Identifying, Assessing, and Managing the Threat of Targeted Attacks</em>. Behavioral Analysis Unit.
	</p>

	<hr class="my-12" />

	<h2>Domestic Violence Assessment</h2>

	<h3>DASH (Domestic Abuse, Stalking and Harassment)</h3>

	<p>
		UK risk identification checklist used by police and agencies. Standard tool for domestic abuse assessment.
	</p>

	<h4>NOPE Mapping</h4>

	<table>
		<thead>
			<tr>
				<th>DASH Question Area</th>
				<th>NOPE Feature(s)</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Physical violence</td>
				<td><code>physical_violence</code></td>
			</tr>
			<tr>
				<td>Weapons</td>
				<td><code>weapon_access</code>, <code>weapon_threat</code></td>
			</tr>
			<tr>
				<td>Strangulation</td>
				<td><code>strangulation_history</code></td>
			</tr>
			<tr>
				<td>Jealousy/Controlling</td>
				<td><code>extreme_jealousy</code>, <code>controlling_behavior</code></td>
			</tr>
			<tr>
				<td>Stalking</td>
				<td><code>stalking</code>, <code>monitoring_surveillance</code></td>
			</tr>
			<tr>
				<td>Sexual violence</td>
				<td><code>sexual_violence</code></td>
			</tr>
			<tr>
				<td>Separation</td>
				<td><code>separation_recent</code></td>
			</tr>
			<tr>
				<td>Pregnancy</td>
				<td><code>pregnancy</code></td>
			</tr>
		</tbody>
	</table>

	<h4>Reference</h4>
	<p class="text-sm text-gray-600">
		Richards, L. (2009). <em>Domestic Abuse, Stalking and Harassment and Honour Based Violence (DASH) Risk Identification and Assessment and Management Model</em>. ACPO.
	</p>

	<hr class="my-8" />

	<h3>Danger Assessment (Johns Hopkins)</h3>

	<p>
		Evidence-based tool to assess risk of homicide or near-homicide in abusive relationships. Developed by Jacquelyn Campbell.
	</p>

	<h4>Critical Finding: Strangulation</h4>

	<blockquote>
		"Non-fatal strangulation is associated with a <strong>750% increase</strong> in the odds of subsequent completed homicide."
	</blockquote>

	<p>
		This finding drives NOPE's automatic escalation when <code>strangulation_history</code> is detected.
	</p>

	<h4>Reference</h4>
	<p class="text-sm text-gray-600">
		Glass, N., et al. (2008). Non-fatal strangulation is an important risk factor for homicide of women. <em>Journal of Emergency Medicine</em>, 35(3), 329-335.
	</p>

	<hr class="my-12" />

	<h2>Protective Factors</h2>

	<h3>START (Short-Term Assessment of Risk and Treatability)</h3>

	<p>
		Unique framework that assesses <strong>both strengths and vulnerabilities</strong>. Emphasizes dynamic factors that can change.
	</p>

	<h4>NOPE Mapping</h4>

	<p>
		All 28 protective factors in NOPE derive from START's strength domains:
	</p>

	<ul>
		<li><strong>Social support</strong> → <code>social_support</code>, <code>family_support</code></li>
		<li><strong>Relationships</strong> → <code>therapeutic_alliance</code>, <code>peer_support</code></li>
		<li><strong>Occupational</strong> → <code>employment</code></li>
		<li><strong>Recreation</strong> → <code>community_involvement</code></li>
		<li><strong>Self-care</strong> → <code>coping_skills</code></li>
		<li><strong>Mental state</strong> → <code>insight</code>, <code>hope</code></li>
		<li><strong>Emotional state</strong> → <code>reasons_for_living</code></li>
		<li><strong>Substance use</strong> → (absence is protective)</li>
		<li><strong>Impulse control</strong> → <code>conflict_resolution_skills</code></li>
		<li><strong>External triggers</strong> → <code>stable_housing</code>, <code>financial_stability</code></li>
		<li><strong>Social support</strong> → <code>children</code>, <code>caregiving_role</code></li>
		<li><strong>Material resources</strong> → <code>access_to_healthcare</code></li>
		<li><strong>Treatment</strong> → <code>treatment_engagement</code>, <code>medication_compliance</code></li>
	</ul>

	<h4>Reference</h4>
	<p class="text-sm text-gray-600">
		Webster, C. D., et al. (2009). <em>Short-Term Assessment of Risk and Treatability (START)</em>. BC Mental Health & Addiction Services.
	</p>

	<hr class="my-8" />

	<h3>Linehan's Reasons for Living</h3>

	<p>
		Inventory of beliefs and expectations that prevent suicide. Foundational to Dialectical Behavior Therapy (DBT).
	</p>

	<h4>NOPE Mapping</h4>

	<p>
		The <code>reasons_for_living</code> protective factor maps to this inventory. Specific reasons include:
	</p>

	<ul>
		<li><code>children</code> — Survival and coping beliefs (family)</li>
		<li><code>religious_beliefs</code> — Moral objections</li>
		<li><code>future_plans</code> — Fear of suicide / expectation of future</li>
		<li><code>social_support</code> — Responsibility to family</li>
	</ul>

	<h4>Reference</h4>
	<p class="text-sm text-gray-600">
		Linehan, M. M., et al. (1983). Reasons for staying alive when you are thinking of killing yourself: The Reasons for Living Inventory. <em>Journal of Consulting and Clinical Psychology</em>, 51(2), 276-286.
	</p>

	<hr class="my-12" />

	<h2>Safeguarding Frameworks</h2>

	<h3>MASH (Multi-Agency Safeguarding Hub)</h3>

	<p>
		UK model for coordinated safeguarding response. Brings together police, social services, health, and education.
	</p>

	<h4>NOPE Mapping</h4>

	<p>
		MASH urgency levels map directly to <code>child_safeguarding.urgency</code>:
	</p>

	<ul>
		<li><code>routine</code> — Early help assessment</li>
		<li><code>prompt</code> — Child in Need assessment</li>
		<li><code>urgent</code> — Strategy discussion required</li>
		<li><code>emergency</code> — Immediate protection</li>
	</ul>

	<hr class="my-8" />

	<h3>WHO Child Protection Guidelines</h3>

	<p>
		International standards for responding to child maltreatment. Defines abuse types and response frameworks.
	</p>

	<h4>NOPE Mapping</h4>

	<ul>
		<li><strong>Physical abuse</strong> → <code>physical_abuse</code></li>
		<li><strong>Sexual abuse</strong> → <code>sexual_abuse</code></li>
		<li><strong>Emotional abuse</strong> → <code>emotional_abuse</code></li>
		<li><strong>Neglect</strong> → <code>neglect</code>, <code>basic_needs_unmet</code></li>
	</ul>

	<h4>Reference</h4>
	<p class="text-sm text-gray-600">
		World Health Organization (2016). <em>INSPIRE: Seven strategies for ending violence against children</em>. WHO Press.
	</p>

	<hr class="my-12" />

	<h2>Self-Harm Assessment</h2>

	<h3>SITBI (Self-Injurious Thoughts and Behaviors Inventory)</h3>

	<p>
		Comprehensive assessment distinguishing suicidal from non-suicidal self-injury.
	</p>

	<h4>NOPE Mapping</h4>

	<table>
		<thead>
			<tr>
				<th>SITBI Category</th>
				<th>NOPE Risk Type</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Suicidal ideation</td>
				<td><code>self_harm_*_ideation_*</code> types</td>
			</tr>
			<tr>
				<td>Suicide plan</td>
				<td><code>plan_present</code> feature</td>
			</tr>
			<tr>
				<td>Suicide attempt</td>
				<td><code>self_harm_actual_attempt</code></td>
			</tr>
			<tr>
				<td>NSSI thoughts</td>
				<td><code>nssi</code> feature</td>
			</tr>
			<tr>
				<td>NSSI behavior</td>
				<td><code>nssi</code> + behavioral indicators</td>
			</tr>
		</tbody>
	</table>

	<h4>Reference</h4>
	<p class="text-sm text-gray-600">
		Nock, M. K., et al. (2007). Self-Injurious Thoughts and Behaviors Interview: Development, reliability, and validity in an adolescent sample. <em>Psychological Assessment</em>, 19(3), 309-317.
	</p>

	<hr class="my-12" />

	<h2>Other Referenced Frameworks</h2>

	<table>
		<thead>
			<tr>
				<th>Framework</th>
				<th>Purpose</th>
				<th>NOPE Application</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>DSM-5</td>
				<td>Diagnostic criteria</td>
				<td>NSSI disorder criteria, psychotic features</td>
			</tr>
			<tr>
				<td>HoNOS</td>
				<td>Outcome scales</td>
				<td>Multi-domain structure inspiration</td>
			</tr>
			<tr>
				<td>TAG</td>
				<td>Threshold Assessment Grid</td>
				<td>Severity × imminence separation</td>
			</tr>
			<tr>
				<td>IAR_DST</td>
				<td>Self-neglect assessment</td>
				<td>Self-neglect features and subtypes</td>
			</tr>
			<tr>
				<td>CALOCUS</td>
				<td>Child/adolescent level of care</td>
				<td>Youth safeguarding urgency</td>
			</tr>
			<tr>
				<td>Stanley-Brown</td>
				<td>Safety Planning Intervention</td>
				<td><code>safety_planning</code> protective factor</td>
			</tr>
		</tbody>
	</table>

	<hr class="my-12" />

	<h2>Validation Approach</h2>

	<p>
		NOPE's taxonomy is validated through:
	</p>

	<ol>
		<li><strong>Clinical mapping</strong> — Every enum value traces to established frameworks</li>
		<li><strong>Expert review</strong> — Taxonomies reviewed by clinical professionals</li>
		<li><strong>Test suites</strong> — Scenarios validated against expected classifications</li>
		<li><strong>Ongoing refinement</strong> — Continuous improvement based on real-world performance</li>
	</ol>

	<p>
		See our <a href="https://suites.nope.net">transparency dashboard</a> for test suite results.
	</p>
</div>
