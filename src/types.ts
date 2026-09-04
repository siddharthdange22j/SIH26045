/**
 * IP-SAKTI Sahayak - Type Definitions
 * SIH 2026 Problem Statement 26045
 */

export type Jurisdiction = 'INDIA' | 'INTERNATIONAL';

export type IPType = 
  | 'PATENT'
  | 'TRADEMARK'
  | 'COPYRIGHT'
  | 'GEOGRAPHICAL_INDICATION'
  | 'TRADE_SECRET'
  | 'TRADITIONAL_KNOWLEDGE'
  | 'PLANT_VARIETY'
  | 'PRIOR_ART'
  | 'REGULATORY_AYUSH';

export type ConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export type LanguageCode = 'en' | 'hi' | 'mr';

export interface AuthoritativeSource {
  document_id: string;
  title: string;
  authority: string;
  jurisdiction: Jurisdiction;
  country: string;
  document_type: 'ACT' | 'RULES' | 'GUIDELINES' | 'TREATY' | 'COURT_JUDGMENT' | 'PHARMACOPOEIA' | 'GAZETTE_NOTIFICATION';
  IP_type: IPType[];
  language: string;
  publication_date: string;
  effective_date: string;
  version: string;
  source_url: string;
  section: string;
  paragraph?: string;
  page?: string;
  reliability_score: number; // 0 - 100
  last_verified: string;
  status: 'ACTIVE_CURRENT' | 'HISTORICAL_SUPERSEDED' | 'AMENDMENT_PENDING';
  verified_by: string;
  key_provisions: string[];
  summary: string;
  full_text_passage: string;
}

export interface Citation {
  source_id: string;
  title: string;
  authority: string;
  section: string;
  page?: string;
  version: string;
  publication_date: string;
  source_url: string;
  matched_passage: string;
  why_this_source: string;
  verification_status: 'VERIFIED_AUTHORITATIVE' | 'INFERRED' | 'UNVERIFIED';
  reliability_score: number;
  is_historical?: boolean;
}

export interface AgentStepTrace {
  agent_name: string;
  role: string;
  status: 'COMPLETED' | 'SKIPPED' | 'WARNING';
  execution_time_ms: number;
  output_summary: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  content: string;
  jurisdiction?: Jurisdiction;
  language?: LanguageCode;
  
  // Assistant-specific RAG output fields
  key_conclusion?: string;
  reasoning_summary?: string;
  relevant_ip_types?: IPType[];
  citations?: Citation[];
  confidence?: ConfidenceLevel;
  confidence_reason?: string;
  warnings?: string[];
  recommended_next_steps?: string[];
  agent_trace?: AgentStepTrace[];
  is_safe_abstention?: boolean;
  abstention_reason?: string;
  can_escalate?: boolean;
}

export interface FormulationClassificationInput {
  formulation_name: string;
  classical_tradition_based: boolean;
  classical_source_text?: string;
  is_new_combination: boolean;
  novel_extraction_process: boolean;
  novel_therapeutic_indication: boolean;
  contains_biological_resources: boolean;
  source_of_biological_resource: 'WILD_HARVESTED' | 'CULTIVATED' | 'IMPORTED' | 'NONE';
  publicly_available_prior_art: boolean;
  synergistic_efficacy_data_available: boolean;
}

export interface FormulationClassificationOutput {
  formulation_name: string;
  potential_ip_categories: {
    category: IPType;
    relevance_score: number; // 0 - 100
    rationale: string;
  }[];
  traditional_knowledge_flag: {
    is_tk: boolean;
    statutory_clause: string; // e.g. "Section 3(p) of Indian Patents Act, 1970"
    explanation: string;
  };
  prior_art_check_recommendation: {
    urgency: 'HIGH' | 'MEDIUM' | 'LOW';
    recommended_databases: string[];
    risk_factors: string[];
  };
  abs_compliance_relevance: {
    status: 'MANDATORY' | 'POTENTIALLY_APPLICABLE' | 'EXEMPTED' | 'NOT_APPLICABLE';
    governing_body: string;
    forms_needed: string[];
    explanation: string;
  };
  regulatory_pathway: {
    license_category: 'CLASSICAL_ASU' | 'PATENT_PROPRIETARY_ASU' | 'PHYTOPHARMACEUTICAL';
    relevant_rule: string;
    authority: string;
  };
  recommended_next_action: string[];
  disclaimer: string;
}

export interface ABSAssessmentInput {
  activity_type: 'COMMERCIAL_UTILIZATION' | 'RESEARCH_ACADEMIC' | 'IPR_APPLICATION' | 'TRANSFER_OF_RESEARCH';
  applicant_category: 'INDIAN_CITIZEN_INDIVIDUAL' | 'INDIAN_COMPANY_NO_FOREIGN_EQUITY' | 'FOREIGN_ENTITY_OR_INDIAN_CO_WITH_FOREIGN_INVESTMENT' | 'REGISTERED_AYUSH_PRACTITIONER';
  biological_resource_source: 'INDIAN_WILD' | 'INDIAN_CULTIVATED' | 'IMPORTED_COMMODITY_NTAC' | 'VALUE_ADDED_PRODUCT';
  associated_traditional_knowledge: boolean;
  community_associated: boolean;
  state_of_collection: string;
  resource_common_or_scientific_name: string;
}

export interface ABSAssessmentOutput {
  abs_relevance: 'LIKELY_RELEVANT' | 'POTENTIALLY_RELEVANT' | 'EXEMPTED_UNDER_2023_ACT' | 'NOT_IDENTIFIED';
  authority_to_approach: 'NATIONAL_BIODIVERSITY_AUTHORITY_NBA' | 'STATE_BIODIVERSITY_BOARD_SBB' | 'EXEMPT';
  applicable_sections: string[];
  mandatory_forms: {
    form_id: string;
    name: string;
    purpose: string;
    deadline: string;
  }[];
  benefit_sharing_estimate: string;
  compliance_checklist: string[];
  statutory_citations: Citation[];
}

export interface PriorArtLookupResult {
  query: string;
  botanical_name?: string;
  sanskrit_name?: string;
  classical_treatise_citations: {
    treatise: string; // e.g., "Charaka Samhita", "Sushruta Samhita", "Bhavaprakasha"
    shloka_reference: string;
    therapeutic_indications: string[];
  }[];
  historical_landmark_cases: {
    case_name: string;
    patent_number: string;
    jurisdiction: string;
    revocation_basis: string;
    lesson: string;
  }[];
  tkdl_indicators: {
    indicative_match: boolean;
    reference_count: number;
    csir_tkdl_note: string;
  };
  prior_art_risk_level: 'VERY_HIGH_TK_EXCLUSION' | 'MODERATE_SYNERGISM_NEEDED' | 'LOW_NOVEL_ACTIVE_FRACTION';
  strategic_recommendation: string;
}

export interface KnowledgeGraphNode {
  id: string;
  label: string;
  type: 'Plant' | 'BiologicalResource' | 'Formulation' | 'Ingredient' | 'TraditionalKnowledge' | 'Patent' | 'Regulation' | 'Law' | 'Authority' | 'Treaty' | 'Jurisdiction';
  properties: Record<string, string>;
}

export interface KnowledgeGraphEdge {
  source: string;
  target: string;
  relationship: string;
}

export interface FacilitatorCase {
  id: string;
  applicant_name: string;
  applicant_organization: string;
  email: string;
  phone?: string;
  applicant_type: 'RESEARCHER' | 'STARTUP' | 'AYUSH_PRACTITIONER' | 'STUDENT' | 'MANUFACTURER';
  jurisdiction: Jurisdiction;
  ip_category: IPType;
  title: string;
  user_query: string;
  ai_response_summary: string;
  confidence_at_escalation: ConfidenceLevel;
  status: 'SUBMITTED' | 'ASSIGNED' | 'IN_REVIEW' | 'RESPONDED' | 'CLOSED';
  assigned_facilitator?: string;
  assigned_facilitator_role?: string;
  created_at: string;
  updated_at: string;
  priority: 'HIGH' | 'STANDARD' | 'URGENT';
}

export interface BenchmarkTestCase {
  id: string;
  title: string;
  query: string;
  jurisdiction: Jurisdiction;
  expected_ip_types: IPType[];
  expected_statutes: string[];
  expected_confidence: ConfidenceLevel;
  should_abstain: boolean;
  ground_truth_summary: string;
}

export interface BenchmarkRunResult {
  total_tests: number;
  passed_tests: number;
  overall_accuracy: number;
  citation_correctness_score: number;
  retrieval_recall_score: number;
  hallucination_rate_score: number;
  safe_abstention_rate: number;
  avg_latency_ms: number;
  test_details: {
    test_id: string;
    title: string;
    passed: boolean;
    citations_matched: number;
    latency_ms: number;
    confidence_matched: boolean;
    notes: string;
  }[];
}
