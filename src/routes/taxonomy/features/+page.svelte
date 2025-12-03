<svelte:head>
	<title>Risk Features - NOPE Documentation</title>
</svelte:head>

<div class="prose">
	<h1>Risk Features</h1>

	<p class="text-xl text-gray-600 mb-8">
		Risk features are the <strong>specific indicators</strong> extracted from conversations. Each domain has its own set of clinically-validated features.
	</p>

	<p>
		There are <strong>106 risk features</strong> across the four domains, each mapped to established clinical frameworks.
	</p>

	<div class="not-prose bg-blue-50 border border-blue-200 rounded-lg p-4 my-6">
		<p class="text-sm text-blue-800">
			<strong>Note:</strong> Risk features are returned in the <code>risk_features</code> array for each domain assessment. Only features detected in the conversation are included.
		</p>
	</div>

	<hr class="my-12" />

	<h2 id="self">Self Domain Features (42)</h2>

	<p>
		Based on <strong>C-SSRS</strong> (Columbia Suicide Severity Rating Scale), <strong>Joiner's Interpersonal Theory</strong>, and <strong>IAR_DST</strong> for self-neglect.
	</p>

	<h3>Suicidal Ideation & Behavior</h3>

	<table>
		<thead>
			<tr>
				<th>Feature</th>
				<th>Definition</th>
				<th>Clinical Significance</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>plan_present</code></td>
				<td>Method identified for suicide</td>
				<td>C-SSRS Level 3+. Escalates severity to high minimum.</td>
			</tr>
			<tr>
				<td><code>means_access</code></td>
				<td>Access to lethal means (weapons, medications, heights)</td>
				<td>Critical multiplier. Means restriction is evidence-based intervention.</td>
			</tr>
			<tr>
				<td><code>intent_present</code></td>
				<td>Stated intent to act on suicidal thoughts</td>
				<td>C-SSRS Level 4. Intent + plan = high/critical severity.</td>
			</tr>
			<tr>
				<td><code>recent_attempt</code></td>
				<td>Suicide attempt within past 48 hours</td>
				<td>Strongest short-term predictor. Auto-escalates to urgent/emergency.</td>
			</tr>
			<tr>
				<td><code>preparatory_acts</code></td>
				<td>Goodbye letters, giving away possessions, saving pills</td>
				<td>C-SSRS Level 5. Immediate danger indicator.</td>
			</tr>
			<tr>
				<td><code>self_harm_passive_ideation</code></td>
				<td>Wish to be dead without active suicidal thoughts</td>
				<td>C-SSRS Level 1. Often underestimated but clinically significant.</td>
			</tr>
			<tr>
				<td><code>nssi</code></td>
				<td>Non-suicidal self-injury (cutting, burning, hitting self)</td>
				<td>DSM-5 criteria. Distinct from suicidal behavior but often comorbid.</td>
			</tr>
			<tr>
				<td><code>previous_attempts</code></td>
				<td>History of suicide attempts</td>
				<td>40x increased lifetime risk. Strongest long-term predictor.</td>
			</tr>
		</tbody>
	</table>

	<h3>Psychological Risk Factors</h3>

	<table>
		<thead>
			<tr>
				<th>Feature</th>
				<th>Definition</th>
				<th>Clinical Significance</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>hopelessness</code></td>
				<td>Pervasive belief that things won't improve</td>
				<td>Beck Hopelessness Scale. Stronger predictor than depression alone.</td>
			</tr>
			<tr>
				<td><code>feeling_trapped</code></td>
				<td>Perception of no escape from unbearable situation</td>
				<td>Joiner's Interpersonal Theory. "No way out" cognition.</td>
			</tr>
			<tr>
				<td><code>perceived_burdensomeness</code></td>
				<td>Belief that others would be better off without them</td>
				<td>Joiner's Interpersonal Theory. Key cognitive distortion.</td>
			</tr>
			<tr>
				<td><code>social_isolation</code></td>
				<td>Disconnection from social support</td>
				<td>Thwarted belongingness. Reduces protective factors.</td>
			</tr>
			<tr>
				<td><code>impulsivity</code></td>
				<td>Trait or state impulsivity</td>
				<td>Increases risk of acting on ideation without planning.</td>
			</tr>
			<tr>
				<td><code>agitation</code></td>
				<td>Psychomotor agitation, restlessness</td>
				<td>Acute warning sign. Often precedes crisis.</td>
			</tr>
			<tr>
				<td><code>sleep_disruption</code></td>
				<td>Severe insomnia or sleep disturbance</td>
				<td>Acute warning sign. 3x risk increase with severe insomnia.</td>
			</tr>
		</tbody>
	</table>

	<h3>Psychotic Features (Cross-Cutting)</h3>

	<p>
		These features also set <code>presentation_modifiers.psychotic_features = true</code>:
	</p>

	<table>
		<thead>
			<tr>
				<th>Feature</th>
				<th>Definition</th>
				<th>Clinical Significance</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>command_hallucinations</code></td>
				<td>Auditory hallucinations commanding self-harm</td>
				<td>High compliance risk. Requires immediate assessment.</td>
			</tr>
			<tr>
				<td><code>persecutory_delusions</code></td>
				<td>Fixed false belief of being persecuted</td>
				<td>May drive self-harm as "escape" from perceived threat.</td>
			</tr>
			<tr>
				<td><code>grandiose_delusions</code></td>
				<td>Inflated beliefs about abilities or invulnerability</td>
				<td>May lead to risky behavior without awareness of danger.</td>
			</tr>
			<tr>
				<td><code>disorganized_thinking</code></td>
				<td>Thought disorder, incoherent speech</td>
				<td>Impairs judgment and safety planning capacity.</td>
			</tr>
			<tr>
				<td><code>lack_of_insight</code></td>
				<td>No awareness of illness or risk</td>
				<td>Major barrier to help-seeking and treatment engagement.</td>
			</tr>
			<tr>
				<td><code>substance_induced_psychosis</code></td>
				<td>Psychotic symptoms from substance use</td>
				<td>May resolve but requires acute management.</td>
			</tr>
			<tr>
				<td><code>ai_collusion_risk</code></td>
				<td>Risk of AI reinforcing delusional beliefs</td>
				<td>Unique to AI contexts. Requires careful response framing.</td>
			</tr>
		</tbody>
	</table>

	<h3>Self-Neglect Features</h3>

	<p>
		These features trigger <code>self_subtype: "self_neglect"</code>:
	</p>

	<table>
		<thead>
			<tr>
				<th>Feature</th>
				<th>Definition</th>
				<th>Clinical Significance</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>days_without_food</code></td>
				<td>Extended period without eating</td>
				<td>Immediate physical risk. Adult protective services concern.</td>
			</tr>
			<tr>
				<td><code>days_without_fluids</code></td>
				<td>Extended period without drinking</td>
				<td>Medical emergency if >24-48 hours.</td>
			</tr>
			<tr>
				<td><code>medical_care_refusal</code></td>
				<td>Refusing necessary medical treatment</td>
				<td>Capacity assessment may be needed.</td>
			</tr>
			<tr>
				<td><code>medication_non_adherence</code></td>
				<td>Intentionally stopping life-sustaining medications</td>
				<td>Passive self-harm. Critical if diabetic, cardiac, etc.</td>
			</tr>
			<tr>
				<td><code>unsafe_living_conditions</code></td>
				<td>Hazardous environment (no heat, hoarding, infestations)</td>
				<td>Adult protective services concern.</td>
			</tr>
			<tr>
				<td><code>hygiene_neglect</code></td>
				<td>Severe lack of personal hygiene</td>
				<td>Often indicates depression, cognitive decline, or disability.</td>
			</tr>
			<tr>
				<td><code>capacity_concerns</code></td>
				<td>Questionable decision-making capacity</td>
				<td>May require formal capacity assessment.</td>
			</tr>
			<tr>
				<td><code>hoarding</code></td>
				<td>Severe hoarding affecting safety</td>
				<td>Fire risk, falls, barriers to emergency access.</td>
			</tr>
		</tbody>
	</table>

	<hr class="my-12" />

	<h2 id="others">Others Domain Features (16)</h2>

	<p>
		Based on <strong>HCR-20 V3</strong> (Historical-Clinical-Risk Management) and <strong>FBI BTAC</strong> (Behavioral Threat Assessment Center).
	</p>

	<h3>Direct Threat Indicators</h3>

	<table>
		<thead>
			<tr>
				<th>Feature</th>
				<th>Definition</th>
				<th>Clinical Significance</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>specific_threat</code></td>
				<td>Explicit threat of violence made</td>
				<td>Direct statement of intent to harm.</td>
			</tr>
			<tr>
				<td><code>identifiable_victim</code></td>
				<td>Victim named or identifiable</td>
				<td>Tarasoff duty to warn trigger. Legal implications.</td>
			</tr>
			<tr>
				<td><code>means_available</code></td>
				<td>Access to weapons</td>
				<td>Gun access = highest lethality risk.</td>
			</tr>
			<tr>
				<td><code>history_of_violence</code></td>
				<td>Past violent behavior</td>
				<td>Strongest single predictor of future violence.</td>
			</tr>
		</tbody>
	</table>

	<h3>HCR-20 Clinical Factors</h3>

	<table>
		<thead>
			<tr>
				<th>Feature</th>
				<th>Definition</th>
				<th>Clinical Significance</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>escalating_anger</code></td>
				<td>Increasing intensity of anger/rage</td>
				<td>Pattern suggests approaching breaking point.</td>
			</tr>
			<tr>
				<td><code>poor_impulse_control</code></td>
				<td>Difficulty controlling aggressive impulses</td>
				<td>Risk of reactive violence.</td>
			</tr>
			<tr>
				<td><code>substance_intoxication</code></td>
				<td>Current intoxication</td>
				<td>Disinhibition increases violence risk 5-8x.</td>
			</tr>
			<tr>
				<td><code>recent_loss</code></td>
				<td>Job loss, relationship breakdown</td>
				<td>Destabilizing event. Common violence precipitant.</td>
			</tr>
			<tr>
				<td><code>humiliation</code></td>
				<td>Perceived humiliation or shame</td>
				<td>Rage response to narcissistic injury.</td>
			</tr>
			<tr>
				<td><code>grievance</code></td>
				<td>Perceived injustice seeking redress</td>
				<td>Targeted violence often follows grievance pathway.</td>
			</tr>
		</tbody>
	</table>

	<h3>Mass Violence / Extremism Indicators</h3>

	<table>
		<thead>
			<tr>
				<th>Feature</th>
				<th>Definition</th>
				<th>Clinical Significance</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>extremist_ideology_reference</code></td>
				<td>Explicit support for extremist ideology</td>
				<td>Ideological framing of violence.</td>
			</tr>
			<tr>
				<td><code>extremist_group_affiliation</code></td>
				<td>Claimed or implied membership</td>
				<td>Group reinforcement of violence.</td>
			</tr>
			<tr>
				<td><code>mass_violence_planning</code></td>
				<td>Planning violence against multiple people</td>
				<td>FBI BTAC pathway to violence.</td>
			</tr>
			<tr>
				<td><code>target_identification</code></td>
				<td>Specific school, workplace, or public space named</td>
				<td>Advanced planning indicator.</td>
			</tr>
			<tr>
				<td><code>manifesto_or_ideological_justification</code></td>
				<td>Preparation of manifesto</td>
				<td>Pre-attack behavior pattern.</td>
			</tr>
		</tbody>
	</table>

	<hr class="my-12" />

	<h2 id="dependent">Dependent at Risk Features (20)</h2>

	<p>
		Based on <strong>WHO Child Protection Guidelines</strong>, <strong>UK MASH framework</strong>, and safeguarding best practices.
	</p>

	<h3>Core Abuse & Neglect</h3>

	<table>
		<thead>
			<tr>
				<th>Feature</th>
				<th>Definition</th>
				<th>Safeguarding Response</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>physical_abuse</code></td>
				<td>Evidence of physical harm to dependent</td>
				<td>Mandatory reporting in most jurisdictions.</td>
			</tr>
			<tr>
				<td><code>sexual_abuse</code></td>
				<td>Evidence of sexual harm to dependent</td>
				<td>Immediate safeguarding response required.</td>
			</tr>
			<tr>
				<td><code>emotional_abuse</code></td>
				<td>Sustained emotional harm</td>
				<td>Often harder to detect but equally damaging.</td>
			</tr>
			<tr>
				<td><code>neglect</code></td>
				<td>Failure to provide adequate care</td>
				<td>Most common form of child maltreatment.</td>
			</tr>
			<tr>
				<td><code>basic_needs_unmet</code></td>
				<td>Food, shelter, medical care lacking</td>
				<td>Immediate intervention may be needed.</td>
			</tr>
			<tr>
				<td><code>immediate_danger</code></td>
				<td>Currently in dangerous situation</td>
				<td>Emergency response required.</td>
			</tr>
			<tr>
				<td><code>witnessing_violence</code></td>
				<td>Child exposed to domestic violence</td>
				<td>Psychological harm equivalent to direct abuse.</td>
			</tr>
			<tr>
				<td><code>parental_incapacity</code></td>
				<td>Parent unable to care (mental health, substance use)</td>
				<td>May require alternative care arrangements.</td>
			</tr>
		</tbody>
	</table>

	<h3>Online Exploitation of Minors</h3>

	<table>
		<thead>
			<tr>
				<th>Feature</th>
				<th>Definition</th>
				<th>Response</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>online_grooming</code></td>
				<td>Adult building trust with minor for sexual exploitation</td>
				<td>Law enforcement referral. CEOP (UK), NCMEC (US).</td>
			</tr>
			<tr>
				<td><code>sexual_exploitation_online</code></td>
				<td>Minor coerced to share sexual content</td>
				<td>Immediate safeguarding. Image removal services.</td>
			</tr>
			<tr>
				<td><code>contact_from_unknown_adult</code></td>
				<td>Minor in contact with unknown adult (sexual/coercive)</td>
				<td>Risk assessment, parental notification.</td>
			</tr>
			<tr>
				<td><code>age_mismatch_concern</code></td>
				<td>Large age gap in sexual/romantic context</td>
				<td>Potential statutory offense depending on ages.</td>
			</tr>
			<tr>
				<td><code>location_or_identity_request_from_minor</code></td>
				<td>Minor pressured to share personal info</td>
				<td>Safety education, blocking perpetrator.</td>
			</tr>
		</tbody>
	</table>

	<h3>Animal Cruelty</h3>

	<table>
		<thead>
			<tr>
				<th>Feature</th>
				<th>Definition</th>
				<th>Significance</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>animal_cruelty_indicator</code></td>
				<td>Intentional harm to animals</td>
				<td>5x predictor of violence toward humans. FBI tracks as serious crime.</td>
			</tr>
		</tbody>
	</table>

	<hr class="my-12" />

	<h2 id="victimisation">Victimisation Domain Features (28)</h2>

	<p>
		Based on <strong>DASH</strong> (Domestic Abuse, Stalking and Harassment) and <strong>Danger Assessment</strong> (Johns Hopkins).
	</p>

	<h3>IPV Core Indicators</h3>

	<table>
		<thead>
			<tr>
				<th>Feature</th>
				<th>Definition</th>
				<th>Risk Significance</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>strangulation_history</code></td>
				<td>ANY history of strangulation/choking</td>
				<td class="bg-red-50"><strong>750x homicide risk.</strong> Auto-escalates to critical consideration.</td>
			</tr>
			<tr>
				<td><code>threats_to_kill</code></td>
				<td>Threats to kill victim, children, or pets</td>
				<td>Death threats are strong lethality predictor.</td>
			</tr>
			<tr>
				<td><code>weapon_access</code></td>
				<td>Perpetrator has access to weapons</td>
				<td>Gun access = 5x homicide risk.</td>
			</tr>
			<tr>
				<td><code>weapon_threat</code></td>
				<td>Weapon used in threat or violence</td>
				<td>Escalation indicator.</td>
			</tr>
			<tr>
				<td><code>escalation_pattern</code></td>
				<td>Violence increasing in frequency/severity</td>
				<td>Predictable escalation toward serious harm.</td>
			</tr>
			<tr>
				<td><code>separation_recent</code></td>
				<td>Recently separated or attempting to leave</td>
				<td>Highest risk period for homicide. 75% occur at/after separation.</td>
			</tr>
			<tr>
				<td><code>perpetrator_access</code></td>
				<td>Perpetrator has current access to victim</td>
				<td>Immediate safety planning needed.</td>
			</tr>
			<tr>
				<td><code>victim_fear_level</code></td>
				<td>Victim expresses fear for their life</td>
				<td>Victim perception is strong predictor. Trust their assessment.</td>
			</tr>
		</tbody>
	</table>

	<h3>Coercive Control</h3>

	<table>
		<thead>
			<tr>
				<th>Feature</th>
				<th>Definition</th>
				<th>Pattern</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>pattern_of_isolation</code></td>
				<td>Cut off from friends/family</td>
				<td>Control tactic. Reduces help-seeking capacity.</td>
			</tr>
			<tr>
				<td><code>economic_control</code></td>
				<td>Financial abuse/control</td>
				<td>Prevents leaving. May include sabotaging employment.</td>
			</tr>
			<tr>
				<td><code>monitoring_surveillance</code></td>
				<td>GPS tracking, phone monitoring</td>
				<td>Tech-facilitated abuse. Common in modern IPV.</td>
			</tr>
			<tr>
				<td><code>controlling_behavior</code></td>
				<td>Excessive control over daily life</td>
				<td>Coercive control is now criminal in UK and other jurisdictions.</td>
			</tr>
			<tr>
				<td><code>extreme_jealousy</code></td>
				<td>Pathological jealousy</td>
				<td>Often escalates to stalking and violence.</td>
			</tr>
		</tbody>
	</table>

	<h3>Physical & Sexual Violence</h3>

	<table>
		<thead>
			<tr>
				<th>Feature</th>
				<th>Definition</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>physical_violence</code></td>
				<td>Hitting, kicking, restraining, physical assault</td>
			</tr>
			<tr>
				<td><code>sexual_violence</code></td>
				<td>Forced sexual acts, marital rape</td>
			</tr>
			<tr>
				<td><code>stalking</code></td>
				<td>Following, unwanted contact, surveillance</td>
			</tr>
			<tr>
				<td><code>pregnancy</code></td>
				<td>Currently pregnant</td>
			</tr>
		</tbody>
	</table>

	<h3>Tech-Facilitated Harm</h3>

	<table>
		<thead>
			<tr>
				<th>Feature</th>
				<th>Definition</th>
				<th>Response</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>sextortion</code></td>
				<td>Threat to share intimate content unless demands met</td>
				<td>FBI reports increasing prevalence. Often targets minors.</td>
			</tr>
			<tr>
				<td><code>non_consensual_image_sharing</code></td>
				<td>Intimate images shared without consent (NCII)</td>
				<td>Criminal in most jurisdictions. Takedown services available.</td>
			</tr>
			<tr>
				<td><code>sexual_exploitation_online_adult</code></td>
				<td>Adult coerced into sexual content</td>
				<td>May overlap with trafficking indicators.</td>
			</tr>
		</tbody>
	</table>

	<h3>Human Trafficking</h3>

	<table>
		<thead>
			<tr>
				<th>Feature</th>
				<th>Definition</th>
				<th>Indicators</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>suspected_human_trafficking</code></td>
				<td>Indicators of trafficking control</td>
				<td>Third party controlling movement, money, communication.</td>
			</tr>
			<tr>
				<td><code>forced_sex_work</code></td>
				<td>Coerced involvement in sex work</td>
				<td>Cannot leave, money taken, threats to family.</td>
			</tr>
			<tr>
				<td><code>labour_exploitation</code></td>
				<td>Forced or exploitative labor</td>
				<td>Debt bondage, excessive hours, no pay.</td>
			</tr>
			<tr>
				<td><code>control_of_documents</code></td>
				<td>Perpetrator controls passport, ID</td>
				<td>Classic trafficking indicator.</td>
			</tr>
			<tr>
				<td><code>movement_restriction</code></td>
				<td>Not allowed to leave or contact others</td>
				<td>Physical or psychological confinement.</td>
			</tr>
		</tbody>
	</table>

	<hr class="my-12" />

	<h2>Feature Combinations</h2>

	<p>
		Certain feature combinations are particularly significant:
	</p>

	<table>
		<thead>
			<tr>
				<th>Combination</th>
				<th>Domain</th>
				<th>Significance</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>plan_present</code> + <code>means_access</code> + <code>intent_present</code></td>
				<td>self</td>
				<td>Critical severity. C-SSRS highest risk.</td>
			</tr>
			<tr>
				<td><code>specific_threat</code> + <code>identifiable_victim</code></td>
				<td>others</td>
				<td>Duty to warn triggered.</td>
			</tr>
			<tr>
				<td><code>strangulation_history</code> + <code>separation_recent</code></td>
				<td>victimisation</td>
				<td>Extreme lethality risk. Emergency response.</td>
			</tr>
			<tr>
				<td><code>command_hallucinations</code> + <code>plan_present</code></td>
				<td>self</td>
				<td>Psychosis-driven suicide risk. Hospitalization indicated.</td>
			</tr>
		</tbody>
	</table>

	<h2>Risk Types</h2>

	<p>
		In addition to features, each domain has specific <strong>risk types</strong> that categorize the nature of the risk. See the API response field <code>risk_types</code>.
	</p>

	<p>
		Full risk type definitions are available in the <a href="/api/evaluate">Evaluate Endpoint</a> documentation.
	</p>
</div>
