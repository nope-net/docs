/**
 * Generate docs reference markdown
 *
 * Self-contained script that generates the complete API reference.
 * Taxonomy enums are embedded directly (sync manually when api/ changes).
 *
 * Run: pnpm generate
 * Output: src/lib/reference.generated.md (gitignored)
 */

import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = resolve(__dirname, '../src/lib/reference.generated.md');

// ============================================================================
// TAXONOMY (synced from api/lib/classification/domain-enums.ts)
// Last sync: auto-embedded at generation time
// ============================================================================

const SELF_RISK_FEATURES = [
  'plan_present', 'means_access', 'intent_present', 'recent_attempt', 'preparatory_acts',
  'self_harm_passive_ideation', 'nssi', 'hopelessness', 'feeling_trapped',
  'perceived_burdensomeness', 'social_isolation', 'previous_attempts', 'impulsivity',
  'agitation', 'sleep_disruption', 'substance_intoxication', 'medication_non_adherence',
  'command_hallucinations', 'persecutory_delusions', 'grandiose_delusions',
  'visual_hallucinations', 'disorientation', 'disorganized_thinking', 'lack_of_insight',
  'substance_induced_psychosis', 'medical_exclusion_required', 'ai_collusion_risk',
  'days_without_food', 'days_without_fluids', 'unsafe_living_conditions',
  'severe_functional_impairment', 'hoarding', 'hygiene_neglect', 'medical_care_refusal',
  'capacity_concerns', 'self_isolation_neglect',
];

const OTHERS_RISK_FEATURES = [
  'specific_threat', 'identifiable_victim', 'means_available', 'history_of_violence',
  'escalating_anger', 'poor_impulse_control', 'substance_intoxication', 'recent_loss',
  'humiliation', 'grievance', 'psychosis_present', 'command_hallucinations',
  'paranoid_delusions', 'lack_of_insight', 'extremist_ideology_reference',
  'extremist_group_affiliation', 'mass_violence_planning', 'target_identification',
  'manifesto_or_ideological_justification',
];

const DEPENDENT_AT_RISK_FEATURES = [
  'basic_needs_unmet', 'immediate_danger', 'physical_abuse', 'sexual_abuse',
  'emotional_abuse', 'neglect', 'parental_incapacity', 'witnessing_violence',
  'unsafe_environment', 'medical_neglect', 'educational_neglect', 'abandonment',
  'animal_cruelty_indicator', 'online_grooming', 'sexual_exploitation_online',
  'contact_from_unknown_adult', 'age_mismatch_concern', 'location_or_identity_request_from_minor',
];

const VICTIMISATION_RISK_FEATURES = [
  'strangulation_history', 'threats_to_kill', 'weapon_access', 'weapon_threat',
  'escalation_pattern', 'pattern_of_isolation', 'economic_control', 'monitoring_surveillance',
  'stalking', 'sexual_violence', 'physical_violence', 'pregnancy', 'separation_recent',
  'perpetrator_access', 'victim_fear_level', 'threats_to_children', 'threats_to_pets',
  'extreme_jealousy', 'controlling_behavior', 'sextortion', 'non_consensual_image_sharing',
  'sexual_exploitation_online_adult', 'suspected_human_trafficking', 'forced_sex_work',
  'labour_exploitation', 'control_of_documents', 'movement_restriction', 'recruitment_for_exploitation',
];

const PROTECTIVE_FACTORS = [
  'social_support', 'family_support', 'therapeutic_alliance', 'peer_support',
  'treatment_engagement', 'medication_compliance', 'help_seeking_behavior',
  'past_treatment_success', 'insight', 'coping_skills', 'reasons_for_living', 'hope',
  'future_plans', 'problem_solving_skills', 'safety_planning', 'means_safety',
  'communication_skills', 'conflict_resolution_skills', 'stable_housing', 'employment',
  'financial_stability', 'access_to_healthcare', 'children', 'pets', 'caregiving_role',
  'religious_beliefs', 'cultural_identity', 'community_involvement',
  'digital_literacy_and_safety', 'school_or_youth_service_engagement',
  'trusted_adult_available', 'specialist_support_service', 'legal_protection_in_place',
  'safety_tech_measures', 'gaming_context', 'novel_writing_context',
];

const SELF_RISK_TYPES = [
  'self_harm_passive_ideation', 'self_harm_active_ideation_no_plan',
  'self_harm_active_ideation_plan', 'self_harm_active_ideation_intent',
  'self_harm_preparatory_behavior', 'self_harm_interrupted_attempt',
  'self_harm_aborted_attempt', 'self_harm_actual_attempt', 'nssi', 'nssi_with_suicidal_ideation',
];

const OTHERS_RISK_TYPES = [
  'violence_ideation_vague', 'violence_ideation_specific', 'violence_plan',
  'violence_intent', 'violence_threat', 'violence_recent', 'homicidal_ideation',
  'target_identification', 'violence_targeted_mass_attack_planning',
  'violence_ideology_motivated', 'extremist_propaganda_generation',
  'extremist_recruitment_or_radicalisation',
];

const DEPENDENT_AT_RISK_RISK_TYPES = [
  'child_physical_abuse', 'child_sexual_abuse', 'child_emotional_abuse', 'child_neglect',
  'medical_neglect', 'unsafe_environment', 'witnessing_violence', 'elder_abuse',
  'elder_neglect', 'vulnerable_adult_abuse', 'vulnerable_adult_neglect', 'animal_abuse',
  'animal_neglect', 'child_online_grooming', 'child_sexual_exploitation_online',
  'child_exposure_to_sexual_content_by_adult', 'child_trafficking_suspected',
  'child_forced_marriage_risk', 'fgm_risk_or_history',
];

const VICTIMISATION_RISK_TYPES = [
  'domestic_violence_physical', 'domestic_violence_sexual', 'domestic_violence_emotional',
  'domestic_violence_financial', 'domestic_violence_coercive_control', 'stalking',
  'sexual_assault', 'physical_assault', 'human_trafficking', 'elder_abuse_victim',
  'non_consensual_intimate_image_sharing', 'sextortion_pattern', 'online_stalking',
  'sexual_exploitation_in_person', 'labour_exploitation_ongoing', 'human_trafficking_pattern',
];

// ============================================================================
// DESCRIPTIONS FOR TAXONOMY
// ============================================================================

const SELF_RISK_FEATURES_DESC: Record<string, string> = {
  'plan_present': 'Specific plan for self-harm or suicide',
  'means_access': 'Access to lethal means (medication, weapons, etc.)',
  'intent_present': 'Stated intention to act on self-harm thoughts',
  'recent_attempt': 'Recent suicide or self-harm attempt',
  'preparatory_acts': 'Preparations for self-harm (gathering means, writing notes)',
  'self_harm_passive_ideation': 'Wish to be dead without active plan',
  'nssi': 'Non-suicidal self-injury (cutting, burning, etc.)',
  'hopelessness': 'Feeling that things will never improve',
  'feeling_trapped': 'Sense of no way out or being unable to escape situation',
  'perceived_burdensomeness': 'Belief that others would be better off without them',
  'social_isolation': 'Lack of social connections or support',
  'previous_attempts': 'History of past suicide attempts',
  'impulsivity': 'Acting without thinking, poor impulse control',
  'agitation': 'Restlessness, anxiety, inability to settle',
  'sleep_disruption': 'Severe insomnia or sleep disturbance',
  'substance_intoxication': 'Current intoxication affecting judgment',
  'medication_non_adherence': 'Not taking prescribed psychiatric medications',
  'command_hallucinations': 'Voices telling person to harm themselves',
  'persecutory_delusions': 'False beliefs of being persecuted',
  'grandiose_delusions': 'Inflated sense of power or importance',
  'visual_hallucinations': 'Seeing things that aren\'t there',
  'disorientation': 'Confusion about time, place, or identity',
  'disorganized_thinking': 'Incoherent or illogical thought patterns',
  'lack_of_insight': 'Unable to recognize illness or need for help',
  'substance_induced_psychosis': 'Psychotic symptoms from substance use',
  'medical_exclusion_required': 'Medical condition may be causing symptoms',
  'ai_collusion_risk': 'Seeking AI assistance for self-harm methods',
  'days_without_food': 'Severe self-neglect: not eating',
  'days_without_fluids': 'Severe self-neglect: dehydration risk',
  'unsafe_living_conditions': 'Dangerous or uninhabitable living environment',
  'severe_functional_impairment': 'Unable to perform basic self-care',
  'hoarding': 'Accumulation of items creating unsafe conditions',
  'hygiene_neglect': 'Severe personal hygiene deterioration',
  'medical_care_refusal': 'Refusing needed medical treatment',
  'capacity_concerns': 'Questionable ability to make decisions',
  'self_isolation_neglect': 'Isolating self leading to neglect',
};

const OTHERS_RISK_FEATURES_DESC: Record<string, string> = {
  'specific_threat': 'Explicit threat to harm someone',
  'identifiable_victim': 'Specific person or group identified as target',
  'means_available': 'Access to weapons or means to harm others',
  'history_of_violence': 'Past violent behavior toward others',
  'escalating_anger': 'Increasing intensity of anger or rage',
  'poor_impulse_control': 'Difficulty controlling aggressive impulses',
  'substance_intoxication': 'Current intoxication increasing violence risk',
  'recent_loss': 'Recent significant loss (job, relationship, status)',
  'humiliation': 'Experience of public shame or humiliation',
  'grievance': 'Perceived injustice or desire for revenge',
  'psychosis_present': 'Active psychotic symptoms',
  'command_hallucinations': 'Voices commanding violence toward others',
  'paranoid_delusions': 'False beliefs others intend harm',
  'lack_of_insight': 'No awareness of illness affecting behavior',
  'extremist_ideology_reference': 'Reference to extremist beliefs',
  'extremist_group_affiliation': 'Affiliation with violent extremist groups',
  'mass_violence_planning': 'Planning attack on multiple people',
  'target_identification': 'Identifying specific targets for violence',
  'manifesto_or_ideological_justification': 'Written justification for violence',
};

const DEPENDENT_AT_RISK_FEATURES_DESC: Record<string, string> = {
  'basic_needs_unmet': 'Food, shelter, or safety needs not met',
  'immediate_danger': 'Child or vulnerable person in immediate danger',
  'physical_abuse': 'Physical harm or injury',
  'sexual_abuse': 'Sexual abuse or exploitation',
  'emotional_abuse': 'Severe emotional or psychological abuse',
  'neglect': 'Failure to provide adequate care',
  'parental_incapacity': 'Caregiver unable to provide safe care',
  'witnessing_violence': 'Exposure to domestic or community violence',
  'unsafe_environment': 'Dangerous living conditions',
  'medical_neglect': 'Failure to provide needed medical care',
  'educational_neglect': 'Failure to ensure education/school attendance',
  'abandonment': 'Left alone or abandoned by caregiver',
  'animal_cruelty_indicator': 'Harming animals (violence predictor)',
  'online_grooming': 'Adult building relationship for exploitation',
  'sexual_exploitation_online': 'Online sexual exploitation of minor',
  'contact_from_unknown_adult': 'Inappropriate adult contact',
  'age_mismatch_concern': 'Significant age gap in relationship',
  'location_or_identity_request_from_minor': 'Adult asking minor for personal info',
};

const VICTIMISATION_RISK_FEATURES_DESC: Record<string, string> = {
  'strangulation_history': 'History of strangulation (750x homicide risk)',
  'threats_to_kill': 'Explicit death threats from perpetrator',
  'weapon_access': 'Perpetrator has access to weapons',
  'weapon_threat': 'Threats with weapon',
  'escalation_pattern': 'Violence increasing in frequency/severity',
  'pattern_of_isolation': 'Victim isolated from support networks',
  'economic_control': 'Control over finances and resources',
  'monitoring_surveillance': 'Constant monitoring/tracking of victim',
  'stalking': 'Persistent unwanted attention and following',
  'sexual_violence': 'Sexual assault or coercion',
  'physical_violence': 'Physical assault or battery',
  'pregnancy': 'Victim is pregnant (increased IPV risk)',
  'separation_recent': 'Recently separated (high-risk period)',
  'perpetrator_access': 'Perpetrator has access to victim',
  'victim_fear_level': 'Victim expresses significant fear',
  'threats_to_children': 'Threats to harm children',
  'threats_to_pets': 'Threats to harm pets',
  'extreme_jealousy': 'Possessive and jealous behavior',
  'controlling_behavior': 'Controlling daily activities and decisions',
  'sextortion': 'Using sexual images for coercion',
  'non_consensual_image_sharing': 'Sharing intimate images without consent',
  'sexual_exploitation_online_adult': 'Online sexual exploitation of adult',
  'suspected_human_trafficking': 'Indicators of trafficking',
  'forced_sex_work': 'Coerced into commercial sex',
  'labour_exploitation': 'Forced labor or exploitation',
  'control_of_documents': 'Withholding ID/passport',
  'movement_restriction': 'Restricting victim\'s movement',
  'recruitment_for_exploitation': 'Being recruited for exploitation',
};

const PROTECTIVE_FACTORS_DESC: Record<string, string> = {
  'social_support': 'Strong social connections and friendships',
  'family_support': 'Supportive family relationships',
  'therapeutic_alliance': 'Good relationship with therapist/counselor',
  'peer_support': 'Support from peers or support groups',
  'treatment_engagement': 'Actively engaged in treatment',
  'medication_compliance': 'Taking prescribed medications as directed',
  'help_seeking_behavior': 'Willing to ask for and accept help',
  'past_treatment_success': 'Previous positive treatment outcomes',
  'insight': 'Awareness of condition and need for support',
  'coping_skills': 'Effective strategies for managing distress',
  'reasons_for_living': 'Identified reasons to continue living',
  'hope': 'Belief that situation can improve',
  'future_plans': 'Plans and goals for the future',
  'problem_solving_skills': 'Ability to work through challenges',
  'safety_planning': 'Has safety plan in place',
  'means_safety': 'Lethal means secured or removed',
  'communication_skills': 'Can express needs and feelings effectively',
  'conflict_resolution_skills': 'Can resolve conflicts constructively',
  'stable_housing': 'Secure and stable living situation',
  'employment': 'Employed or in stable occupation',
  'financial_stability': 'Financial security',
  'access_to_healthcare': 'Can access healthcare services',
  'children': 'Responsibility for children',
  'pets': 'Pets providing companionship',
  'caregiving_role': 'Caring for others',
  'religious_beliefs': 'Religious or spiritual beliefs providing support',
  'cultural_identity': 'Strong cultural connections',
  'community_involvement': 'Active in community',
  'digital_literacy_and_safety': 'Aware of online safety',
  'school_or_youth_service_engagement': 'Engaged with school/youth services',
  'trusted_adult_available': 'Has trusted adult to turn to',
  'specialist_support_service': 'Connected to specialized support',
  'legal_protection_in_place': 'Has legal protections (restraining order, etc.)',
  'safety_tech_measures': 'Using technology for safety',
  'gaming_context': 'Discussion is in gaming/fictional context',
  'novel_writing_context': 'Discussion is creative writing context',
};

const SELF_RISK_TYPES_DESC: Record<string, string> = {
  'self_harm_passive_ideation': 'Wish to be dead without active planning',
  'self_harm_active_ideation_no_plan': 'Active thoughts of suicide without specific plan',
  'self_harm_active_ideation_plan': 'Suicidal thoughts with specific plan',
  'self_harm_active_ideation_intent': 'Suicidal thoughts with plan and intent to act',
  'self_harm_preparatory_behavior': 'Preparing for suicide (gathering means, writing notes)',
  'self_harm_interrupted_attempt': 'Attempt stopped by external circumstances',
  'self_harm_aborted_attempt': 'Person stopped themselves from attempting',
  'self_harm_actual_attempt': 'Actual suicide attempt made',
  'nssi': 'Non-suicidal self-injury without suicidal intent',
  'nssi_with_suicidal_ideation': 'Self-injury combined with suicidal thoughts',
};

const OTHERS_RISK_TYPES_DESC: Record<string, string> = {
  'violence_ideation_vague': 'General thoughts of harming others',
  'violence_ideation_specific': 'Specific thoughts about harming identified person',
  'violence_plan': 'Developed plan for violence',
  'violence_intent': 'Intent to carry out violent act',
  'violence_threat': 'Explicit threat to harm someone',
  'violence_recent': 'Recent violent act committed',
  'homicidal_ideation': 'Thoughts of killing someone',
  'target_identification': 'Specific person or group identified as target',
  'violence_targeted_mass_attack_planning': 'Planning mass casualty attack',
  'violence_ideology_motivated': 'Violence motivated by extremist ideology',
  'extremist_propaganda_generation': 'Creating extremist content',
  'extremist_recruitment_or_radicalisation': 'Recruiting others to extremist cause',
};

const DEPENDENT_AT_RISK_RISK_TYPES_DESC: Record<string, string> = {
  'child_physical_abuse': 'Physical abuse or injury to child',
  'child_sexual_abuse': 'Sexual abuse of child',
  'child_emotional_abuse': 'Emotional or psychological abuse of child',
  'child_neglect': 'Failure to provide adequate care for child',
  'medical_neglect': 'Failure to provide needed medical care',
  'unsafe_environment': 'Child in dangerous living conditions',
  'witnessing_violence': 'Child exposed to violence',
  'elder_abuse': 'Abuse of elderly person',
  'elder_neglect': 'Neglect of elderly person',
  'vulnerable_adult_abuse': 'Abuse of vulnerable adult',
  'vulnerable_adult_neglect': 'Neglect of vulnerable adult',
  'animal_abuse': 'Physical abuse of animal',
  'animal_neglect': 'Neglect of animal',
  'child_online_grooming': 'Adult grooming child online',
  'child_sexual_exploitation_online': 'Online sexual exploitation of child',
  'child_exposure_to_sexual_content_by_adult': 'Adult exposing child to sexual content',
  'child_trafficking_suspected': 'Indicators of child trafficking',
  'child_forced_marriage_risk': 'Risk of forced marriage',
  'fgm_risk_or_history': 'Female genital mutilation risk or history',
};

const VICTIMISATION_RISK_TYPES_DESC: Record<string, string> = {
  'domestic_violence_physical': 'Physical violence by intimate partner',
  'domestic_violence_sexual': 'Sexual violence by intimate partner',
  'domestic_violence_emotional': 'Emotional abuse by intimate partner',
  'domestic_violence_financial': 'Financial control by intimate partner',
  'domestic_violence_coercive_control': 'Pattern of coercive control',
  'stalking': 'Persistent unwanted pursuit',
  'sexual_assault': 'Sexual assault or rape',
  'physical_assault': 'Physical assault',
  'human_trafficking': 'Human trafficking',
  'elder_abuse_victim': 'Elderly person experiencing abuse',
  'non_consensual_intimate_image_sharing': 'Intimate images shared without consent',
  'sextortion_pattern': 'Coercion using sexual images/content',
  'online_stalking': 'Cyberstalking',
  'sexual_exploitation_in_person': 'In-person sexual exploitation',
  'labour_exploitation_ongoing': 'Ongoing forced labor',
  'human_trafficking_pattern': 'Pattern indicating trafficking',
};

// ============================================================================
// GENERATE MARKDOWN
// ============================================================================

function generateMarkdown(): string {
  return `# NOPE API Reference

> Safety layer for chat & LLMs. Analyze conversations for mental health and safeguarding risk.

**Base URL:** \`https://api.nope.net\`

---

## Quick Start

\`\`\`bash
curl -X POST https://api.nope.net/v1/evaluate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "messages": [{"role": "user", "content": "I feel hopeless"}],
    "config": {"user_country": "US"}
  }'
\`\`\`

Get your API key at [dashboard.nope.net](https://dashboard.nope.net).

---

## Authentication

All requests require a Bearer token:

\`\`\`
Authorization: Bearer nope_live_xxxxxx
\`\`\`

Key types:
- \`nope_live_*\` - Production keys
- \`nope_test_*\` - Test keys (rate limited)

---

## POST /v1/evaluate

**Primary API endpoint.** Analyze conversation for risk across four domains (self, others, dependent_at_risk, victimisation). Returns detailed assessment with severity, imminence, risk features, legal flags, and matched crisis resources.

### Request

\`\`\`typescript
{
  // Provide ONE of these:
  messages?: Array<{role: 'user'|'assistant', content: string}>,
  text?: string,  // Single text blob (converted to user message)

  config: {
    user_country?: string,           // ISO 3166-1 alpha-2 (e.g., "US", "GB")
    locale?: string,                 // e.g., "en-US"
    user_age_band?: 'adult'|'minor'|'unknown',
    return_assistant_reply?: boolean, // Default: true
    assistant_safety_mode?: 'template'|'generate',
    conversation_id?: string,        // Your ID for webhooks
    end_user_id?: string,            // Your user ID for webhooks
  },
  user_context?: string  // Additional context (e.g., app persona)
}
\`\`\`

### Response

\`\`\`typescript
{
  domains: DomainAssessment[],  // Assessment per risk domain
  global: {
    overall_severity: 'none'|'mild'|'moderate'|'high'|'critical',
    overall_imminence: 'not_applicable'|'chronic'|'subacute'|'urgent'|'emergency',
    primary_concerns: string[],
    language?: string,  // ISO 639-1
    locale?: string,
  },
  legal_flags?: LegalFlags,
  confidence: number,  // 0-1
  crisis_resources: CrisisResource[],
  recommended_reply?: {
    content: string,
    source: 'template'|'llm_generated',
  },
  coping_recommendations?: Array<{
    category: 'self_soothing'|'social_support'|'professional_support'|'safety_planning'|'means_safety',
    evidence_grade: 'strong'|'moderate'|'weak'|'consensus'|'none',
  }>,
  presentation_modifiers?: {
    psychotic_features?: boolean,
    substance_involved?: boolean,
    cognitive_impairment?: boolean,
  },
  safeguarding_flags?: {
    child_at_risk?: boolean,
    adult_at_risk?: boolean,
    duty_to_warn_others?: boolean,
  },
}
\`\`\`

### Example Response

\`\`\`json
{
  "domains": [
    {
      "domain": "self",
      "self_subtype": "suicidal_or_self_injury",
      "severity": "high",
      "imminence": "urgent",
      "confidence": 0.92,
      "risk_features": [
        "plan_present",
        "means_access",
        "hopelessness",
        "feeling_trapped",
        "social_isolation"
      ],
      "risk_types": [
        "self_harm_active_ideation_plan"
      ],
      "reasoning": "Active suicidal ideation with specific plan and identified means. Expressing hopelessness and feeling trapped. No identified protective factors mentioned."
    }
  ],
  "global": {
    "overall_severity": "high",
    "overall_imminence": "urgent",
    "primary_concerns": ["self"],
    "language": "en",
    "locale": "en-US"
  },
  "legal_flags": {
    "child_safeguarding": null,
    "third_party_threat": null,
    "intimate_partner_violence": null
  },
  "presentation_modifiers": {
    "psychotic_features": false,
    "substance_involved": false
  },
  "safeguarding_flags": {
    "child_at_risk": false,
    "adult_at_risk": false,
    "duty_to_warn_others": false,
    "mandatory_reporting_possible": false
  },
  "confidence": 0.92,
  "crisis_resources": [
    {
      "type": "crisis_line",
      "name": "988 Suicide and Crisis Lifeline",
      "phone": "988",
      "availability": "24/7",
      "is_24_7": true,
      "languages": ["en", "es"],
      "description": "Free and confidential support for people in distress, prevention and crisis resources",
      "resource_kind": "helpline",
      "service_scope": ["suicide", "crisis", "mental_health"],
      "priority_tier": "primary_national_crisis",
      "source": "database"
    },
    {
      "type": "text_line",
      "name": "Crisis Text Line",
      "text_instructions": "Text HOME to 741741",
      "website_url": "https://www.crisistextline.org",
      "availability": "24/7",
      "is_24_7": true,
      "languages": ["en"],
      "description": "Free, 24/7 text support for people in crisis",
      "resource_kind": "helpline",
      "service_scope": ["suicide", "crisis", "mental_health"],
      "priority_tier": "secondary_national_crisis",
      "source": "database"
    }
  ],
  "recommended_reply": {
    "content": "I'm really concerned about what you're sharing. It sounds like you're going through an incredibly difficult time. Your safety is the most important thing right now.\\n\\nPlease reach out to the 988 Suicide and Crisis Lifeline by calling or texting 988. They're available 24/7 and can provide immediate support. If you're in immediate danger, please call 911 or go to your nearest emergency room.\\n\\nYou don't have to face this alone. There are people who want to help.",
    "source": "template"
  },
  "coping_recommendations": [
    {
      "category": "professional_support",
      "evidence_grade": "strong"
    },
    {
      "category": "safety_planning",
      "evidence_grade": "strong"
    },
    {
      "category": "means_safety",
      "evidence_grade": "strong"
    }
  ]
}
\`\`\`

### Type Definitions

**CrisisResource:**

\`\`\`typescript
{
  type: 'emergency_number'|'crisis_line'|'text_line'|'chat_service'|'support_service',
  name: string,
  phone?: string,
  text_instructions?: string,       // e.g., "Text HOME to 741741"
  chat_url?: string,
  website_url?: string,
  availability?: string,            // Human-readable (e.g., "24/7", "Mon-Fri 9am-5pm")
  is_24_7?: boolean,
  languages?: string[],             // ISO 639-1 codes
  description?: string,
  resource_kind?: 'helpline'|'reporting_portal'|'directory'|'self_help_site',
  service_scope?: string[],         // e.g., ["suicide", "domestic_violence"]
  population_served?: string[],     // e.g., ["youth", "veterans"]
  priority_tier?: string,
  source?: 'database'|'web_search',
}
\`\`\`

### Domain Assessment

\`\`\`typescript
{
  domain: 'self'|'others'|'dependent_at_risk'|'victimisation',
  severity: 'none'|'mild'|'moderate'|'high'|'critical',
  imminence: 'not_applicable'|'chronic'|'subacute'|'urgent'|'emergency',
  confidence: number,
  risk_features: string[],     // Domain-specific indicators
  risk_types: string[],        // Clinical classifications
  protective_factors: string[],

  // Required subtypes for certain domains:
  self_subtype?: 'suicidal_or_self_injury'|'self_neglect'|'other',
  dependent_subtype?: 'child'|'adult_at_risk'|'animal_or_other',
  victimisation_subtype?: 'IPV_intimate_partner'|'family_non_intimate'|'trafficking_exploitation'|'community_violence'|'institutional_abuse'|'other',
}
\`\`\`

---

## Webhooks

Configure webhooks at [dashboard.nope.net](https://dashboard.nope.net) to receive POST requests when risk thresholds are exceeded.

### Payload

\`\`\`typescript
{
  event: 'risk.detected',
  timestamp: string,  // ISO 8601
  data: {
    conversation_id?: string,
    end_user_id?: string,
    overall_severity: Severity,
    overall_imminence: Imminence,
    domains: DomainAssessment[],
    crisis_resources: CrisisResource[],
  }
}
\`\`\`

---

## Errors

| Code | Description |
|------|-------------|
| 400 | Invalid request (missing fields, bad format) |
| 401 | Invalid or missing API key |
| 403 | Feature not available for your plan |
| 429 | Rate limit exceeded |
| 500 | Internal server error |

---

## How It Works

NOPE uses a multi-stage classification approach optimized for both accuracy and performance:

- **Fast triage** identifies conversations that need detailed evaluation
- **Multi-domain assessment** provides comprehensive risk analysis across four domains
- **Clinical grounding** based on evidence-based frameworks (C-SSRS, HCR-20, DASH, SafeLives)
- **Cost-effective** architecture suitable for production use at scale

Typical latency: <2s for full assessment. Suitable for real-time applications.

---

## Risk Domains

| Domain | Description | Subtypes |
|--------|-------------|----------|
| \`self\` | User at risk to themselves | suicidal_or_self_injury, self_neglect, other |
| \`others\` | User poses risk to others | — |
| \`dependent_at_risk\` | Child/vulnerable at risk | child, adult_at_risk, animal_or_other |
| \`victimisation\` | User is victim | IPV_intimate_partner, family_non_intimate, trafficking_exploitation, community_violence, institutional_abuse, other |

---

## Severity Scale

| Level | Definition |
|-------|------------|
| \`none\` | No clinical concern |
| \`mild\` | Minor distress, no functional impairment |
| \`moderate\` | Clear concern, not immediately dangerous |
| \`high\` | Serious risk requiring urgent intervention |
| \`critical\` | Life-threatening, imminent harm |

---

## Imminence Scale

| Level | Definition |
|-------|------------|
| \`not_applicable\` | ONLY when severity=none |
| \`chronic\` | Weeks-months, stable pattern |
| \`subacute\` | Likely escalation in days-weeks |
| \`urgent\` | Escalation likely within 24-48h |
| \`emergency\` | Happening NOW |

---

## Legal Flags

\`\`\`typescript
{
  third_party_threat?: {
    present: boolean,
    identifiable_victim: boolean,
    confidence: number,
    rationale: string,
  },
  intimate_partner_violence?: {
    risk_level: 'standard'|'elevated'|'severe'|'extreme',
    confidence: number,
    strangulation_history?: boolean,  // ANY = 750x homicide risk
    escalation_pattern?: boolean,
  },
  child_safeguarding?: {
    urgency: 'routine'|'prompt'|'urgent'|'emergency',
    confidence: number,
    basic_needs_unmet?: boolean,
    immediate_danger?: boolean,
  },
  vulnerable_adult_safeguarding?: {
    urgency: 'routine'|'prompt'|'urgent'|'emergency',
    confidence: number,
  },
  animal_cruelty_indicator?: {
    present: boolean,
    confidence: number,
  },
}
\`\`\`

---

## Risk Features

Risk features are specific observable indicators detected in conversations. These align with clinical risk assessment frameworks.

### Self Domain (${SELF_RISK_FEATURES.length} features)

| Feature | Description |
|---------|-------------|
${SELF_RISK_FEATURES.map(f => `| \`${f}\` | ${SELF_RISK_FEATURES_DESC[f]} |`).join('\n')}

### Others Domain (${OTHERS_RISK_FEATURES.length} features)

| Feature | Description |
|---------|-------------|
${OTHERS_RISK_FEATURES.map(f => `| \`${f}\` | ${OTHERS_RISK_FEATURES_DESC[f]} |`).join('\n')}

### Dependent at Risk Domain (${DEPENDENT_AT_RISK_FEATURES.length} features)

| Feature | Description |
|---------|-------------|
${DEPENDENT_AT_RISK_FEATURES.map(f => `| \`${f}\` | ${DEPENDENT_AT_RISK_FEATURES_DESC[f]} |`).join('\n')}

### Victimisation Domain (${VICTIMISATION_RISK_FEATURES.length} features)

| Feature | Description |
|---------|-------------|
${VICTIMISATION_RISK_FEATURES.map(f => `| \`${f}\` | ${VICTIMISATION_RISK_FEATURES_DESC[f]} |`).join('\n')}

---

## Risk Types

Risk types provide clinical classification of the specific nature of risk. These map to established clinical frameworks and inform crisis resource matching.

### Self Types (C-SSRS aligned)

| Type | Description |
|------|-------------|
${SELF_RISK_TYPES.map(t => `| \`${t}\` | ${SELF_RISK_TYPES_DESC[t]} |`).join('\n')}

### Others Types

| Type | Description |
|------|-------------|
${OTHERS_RISK_TYPES.map(t => `| \`${t}\` | ${OTHERS_RISK_TYPES_DESC[t]} |`).join('\n')}

### Dependent at Risk Types

| Type | Description |
|------|-------------|
${DEPENDENT_AT_RISK_RISK_TYPES.map(t => `| \`${t}\` | ${DEPENDENT_AT_RISK_RISK_TYPES_DESC[t]} |`).join('\n')}

### Victimisation Types

| Type | Description |
|------|-------------|
${VICTIMISATION_RISK_TYPES.map(t => `| \`${t}\` | ${VICTIMISATION_RISK_TYPES_DESC[t]} |`).join('\n')}

---

## Protective Factors (${PROTECTIVE_FACTORS.length} total)

Protective factors are strengths that reduce risk. These are based on START assessment framework and C-SSRS protective factors.

| Factor | Description |
|--------|-------------|
${PROTECTIVE_FACTORS.map(p => `| \`${p}\` | ${PROTECTIVE_FACTORS_DESC[p]} |`).join('\n')}

---

## Clinical Frameworks

| Framework | Usage |
|-----------|-------|
| C-SSRS | Suicide severity levels (self risk types) |
| HCR-20 | Violence risk (others domain features) |
| START | Protective factors, cross-cutting |
| DASH | IPV risk assessment (victimisation) |
| Danger Assessment | IPV lethality (strangulation indicator) |

---

## SDKs

### Python

\`\`\`bash
pip install nope-net
\`\`\`

\`\`\`python
from nope import NopeClient

client = NopeClient(api_key="nope_live_...")
result = client.evaluate(
    messages=[{"role": "user", "content": "I feel hopeless"}],
    config={"user_country": "US"}
)
print(result.global_.overall_severity)  # Note: global_ not global
\`\`\`

### Node.js

\`\`\`bash
npm install @nope-net/sdk
\`\`\`

\`\`\`typescript
import { NopeClient } from '@nope-net/sdk';

const client = new NopeClient({ apiKey: 'nope_live_...' });
const result = await client.evaluate({
  messages: [{ role: 'user', content: 'I feel hopeless' }],
  config: { user_country: 'US' }
});
console.log(result.global.overall_severity);
\`\`\`

---

## Rate Limits

| Plan | Requests/min | Requests/day |
|------|--------------|--------------|
| Free | 10 | 100 |
| Pro | 100 | 10,000 |
| Enterprise | Custom | Custom |

---

## POST /v1/safe (Optional)

Safety-aware LLM proxy endpoint. Evaluates input for risk and generates a safe response in OpenAI-compatible format.

**Note:** Most integrations use \`/v1/evaluate\` only. This endpoint is for specific use cases where you need both evaluation and response generation in a single call.

### Request

\`\`\`typescript
{
  messages: Array<{role: 'user'|'assistant'|'system', content: string}>,
  stream?: boolean,     // SSE streaming support
  config?: {
    user_country?: string,
    user_age_band?: 'adult'|'minor',
  }
}
\`\`\`

### Response

OpenAI-compatible chat completion with additional headers:
- \`X-NOPE-Risk-Level\`: Overall severity level
- \`X-NOPE-Confidence\`: Confidence score (0-1)

---

## Support

- **Status:** [status.nope.net](https://status.nope.net)
- **Test Suites:** [suites.nope.net](https://suites.nope.net)
- **Email:** hello@nope.net

---

*This API supports human decision-making, not replaces it. Always maintain human oversight for high-risk situations.*
`;
}

// ============================================================================
// MAIN
// ============================================================================

function main() {
  console.log('Generating API reference markdown...');
  const markdown = generateMarkdown();

  // Ensure directory exists
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });

  writeFileSync(OUTPUT_PATH, markdown, 'utf-8');
  console.log(`Written to ${OUTPUT_PATH}`);
}

main();
