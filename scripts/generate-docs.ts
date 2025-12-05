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

Analyze conversation for risk. Returns multi-domain assessment with severity, imminence, risk features, and matched crisis resources.

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
  coping_recommendations?: CopingRecommendation[],
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

## POST /v1/safe

Safety-aware LLM proxy. Evaluates input, generates safe response, returns OpenAI-compatible format.

### Request

\`\`\`typescript
{
  messages: Array<{role: 'user'|'assistant'|'system', content: string}>,
  system?: string,      // System prompt
  stream?: boolean,     // SSE streaming
  config?: {
    user_country?: string,
    user_age_band?: 'adult'|'minor',
    locale?: string,
  }
}
\`\`\`

### Response

OpenAI-compatible chat completion with headers:
- \`X-NOPE-Risk-Level\`: severity
- \`X-NOPE-Confidence\`: confidence score

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

## Architecture

\`\`\`
Input → Stage 1 (Filter) → triage:none|concern → [if concern] → Stage 2 (Classifier) → Output
\`\`\`

**Stage 1 (Filter):** Fast triage (~$0.0001/msg, <100ms). Conservative: over-flag OK, under-flag NOT.

**Stage 2 (Classifier):** Full multi-domain assessment (~$0.01/msg, <2s). Detailed risk features, types, legal flags.

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

### Self Domain (${SELF_RISK_FEATURES.length} features)

\`\`\`
${SELF_RISK_FEATURES.join('\n')}
\`\`\`

### Others Domain (${OTHERS_RISK_FEATURES.length} features)

\`\`\`
${OTHERS_RISK_FEATURES.join('\n')}
\`\`\`

### Dependent at Risk Domain (${DEPENDENT_AT_RISK_FEATURES.length} features)

\`\`\`
${DEPENDENT_AT_RISK_FEATURES.join('\n')}
\`\`\`

### Victimisation Domain (${VICTIMISATION_RISK_FEATURES.length} features)

\`\`\`
${VICTIMISATION_RISK_FEATURES.join('\n')}
\`\`\`

---

## Risk Types

### Self Types (C-SSRS aligned)

\`\`\`
${SELF_RISK_TYPES.join('\n')}
\`\`\`

### Others Types

\`\`\`
${OTHERS_RISK_TYPES.join('\n')}
\`\`\`

### Dependent at Risk Types

\`\`\`
${DEPENDENT_AT_RISK_RISK_TYPES.join('\n')}
\`\`\`

### Victimisation Types

\`\`\`
${VICTIMISATION_RISK_TYPES.join('\n')}
\`\`\`

---

## Protective Factors (${PROTECTIVE_FACTORS.length} total)

\`\`\`
${PROTECTIVE_FACTORS.join('\n')}
\`\`\`

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
