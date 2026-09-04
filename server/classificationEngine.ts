/**
 * Ayurveda Formulation Classification Engine
 * Interactive diagnostic wizard mapping formulations to IP, TK, ABS, and Regulatory pathways.
 */

import { FormulationClassificationInput, FormulationClassificationOutput } from '../src/types.ts';

export function classifyAyurvedaFormulation(input: FormulationClassificationInput): FormulationClassificationOutput {
  const isClassicalOnly = input.classical_tradition_based && 
    !input.is_new_combination && 
    !input.novel_extraction_process && 
    !input.novel_therapeutic_indication;

  const hasNovelProcess = input.novel_extraction_process;
  const hasNovelSynergy = input.is_new_combination && input.synergistic_efficacy_data_available;
  const hasNewIndication = input.novel_therapeutic_indication;

  // Potential IP Categories
  const potentialIP: FormulationClassificationOutput['potential_ip_categories'] = [];

  if (hasNovelProcess) {
    potentialIP.push({
      category: 'PATENT',
      relevance_score: 85,
      rationale: "Novel, non-obvious industrial extraction, purification, or stabilization process may qualify for a Process Patent under Section 2(1)(j) of Patents Act, bypassing Section 3(p) product bars."
    });
  } else if (hasNovelSynergy) {
    potentialIP.push({
      category: 'PATENT',
      relevance_score: 70,
      rationale: "Polyherbal combination with verified synergistic bioassay data can potentially overcome Section 3(e) (mere admixture) and Section 3(p) if individual properties are synergistically enhanced."
    });
  } else if (isClassicalOnly) {
    potentialIP.push({
      category: 'PATENT',
      relevance_score: 5,
      rationale: "STRICT BAR: Classical formulation described in Ayurvedic First Schedule texts is statutorily excluded under Section 3(p) as traditional knowledge."
    });
  }

  // Trademark is always relevant for commercial branding
  potentialIP.push({
    category: 'TRADEMARK',
    relevance_score: 95,
    rationale: "Brand name, logo, or distinctive packaging can be protected under the Trade Marks Act, 1999 (Class 5 - Pharmaceuticals & Ayush preparations)."
  });

  // Trade Secret for proprietary process Know-How
  if (input.novel_extraction_process) {
    potentialIP.push({
      category: 'TRADE_SECRET',
      relevance_score: 80,
      rationale: "Specific manufacturing temperature curves, solvent ratios, or extraction yields can be guarded as proprietary trade secrets without public disclosure."
    });
  }

  // Traditional Knowledge Flag
  let isTK = false;
  let tkClause = "None identified";
  let tkExplanation = "Formulation appears to involve proprietary synthesis or novel non-classical composition.";

  if (input.classical_tradition_based || !input.is_new_combination) {
    isTK = true;
    tkClause = "Section 3(p) & Section 3(e) of Indian Patents Act, 1970";
    tkExplanation = `The formulation is rooted in classical Ayurvedic literature (${input.classical_source_text || 'Authoritative Schedule I Treatises'}). Under Section 3(p), traditional knowledge or mere aggregations of known properties cannot be patented per se.`;
  }

  // Prior Art Check Recommendation
  const priorArtUrgency = isClassicalOnly ? 'HIGH' : (input.is_new_combination ? 'HIGH' : 'MEDIUM');
  const riskFactors = [];
  if (input.publicly_available_prior_art) riskFactors.push("Public domain disclosures or published studies exist.");
  if (input.classical_tradition_based) riskFactors.push("Digital records in CSIR-TKDL likely exist for the key botanical ingredients.");
  if (!input.synergistic_efficacy_data_available && input.is_new_combination) {
    riskFactors.push("High risk of Section 3(e) 'mere admixture' refusal by the Patent Examiner without comparative synergy data.");
  }

  // ABS Compliance Relevance
  let absStatus: FormulationClassificationOutput['abs_compliance_relevance']['status'] = 'NOT_APPLICABLE';
  let absGoverningBody = "Not Applicable";
  let absForms: string[] = [];
  let absExplanation = "";

  if (input.contains_biological_resources) {
    if (input.source_of_biological_resource === 'WILD_HARVESTED') {
      absStatus = 'MANDATORY';
      absGoverningBody = "National Biodiversity Authority (NBA) & State Biodiversity Board (SBB)";
      absForms = ["Form III (for IPR application)", "Form I (if foreign entity involved)", "SBB Prior Intimation Form"];
      absExplanation = "Wild harvested biological resources from India fall under mandatory ABS compliance under Section 6 of Biological Diversity Act.";
    } else if (input.source_of_biological_resource === 'CULTIVATED') {
      absStatus = 'POTENTIALLY_APPLICABLE';
      absGoverningBody = "State Biodiversity Board (SBB)";
      absForms = ["Certificate of Origin / Forest Transit Exemption Form", "Form III (for IPR)"];
      absExplanation = "Under the Biological Diversity (Amendment) Act 2023, cultivated medicinal plants are granted exemptions from commercial utilization fees, but IPR applications under Section 6 still require NBA intimation/Form III.";
    } else if (input.source_of_biological_resource === 'IMPORTED') {
      absStatus = 'EXEMPTED';
      absGoverningBody = "Customs / Normally Traded Commodities (NTAC)";
      absForms = ["Import Bill of Entry & NTAC Exemption Certificate"];
      absExplanation = "Imported raw biological materials or items notified as Normally Traded Commodities (NTAC) under Section 40 are exempt from Indian ABS regulations.";
    }
  }

  // Regulatory Pathway under Ayush
  let licenseCategory: FormulationClassificationOutput['regulatory_pathway']['license_category'] = 'CLASSICAL_ASU';
  let relevantRule = "Rule 158-B, Category A (Drugs and Cosmetics Rules, 1945)";
  let authority = "State Licensing Authority (Ayush Drug Controller)";

  if (isClassicalOnly) {
    licenseCategory = 'CLASSICAL_ASU';
    relevantRule = "Rule 158-B Category A: Classical Ayurvedic medicine manufactured strictly in accordance with Schedule I texts. Requires proof of adherence to classical textual method; exempted from human clinical trials.";
  } else if (hasNovelProcess || input.is_new_combination || hasNewIndication) {
    licenseCategory = 'PATENT_PROPRIETARY_ASU';
    relevantRule = "Rule 158-B Category B/C: Patent or Proprietary Ayurvedic Medicine. Requires published safety data, acute toxicity test reports, and pilot clinical trial proof for new therapeutic indications.";
  }

  // Next Actions
  const nextActions = [
    "Register the brand name under Class 5 of the Trade Marks Act, 1999 to protect commercial goodwill.",
    isClassicalOnly 
      ? "Apply for Classical Ayurvedic Drug License (Form 24-D / 25-D) under Rule 158-B Category A without seeking a composition patent."
      : "For patenting, conduct an in-depth prior art search in TKDL, IPO, and WIPO databases focusing on Section 3(p) and 3(e) barriers.",
    input.contains_biological_resources 
      ? "Initiate NBA Form III filing before submitting a patent specification to the Indian Patent Office or PCT."
      : "Proceed with standard regulatory documentation."
  ];

  return {
    formulation_name: input.formulation_name || "Proposed Ayurvedic Formulation",
    potential_ip_categories: potentialIP,
    traditional_knowledge_flag: {
      is_tk: isTK,
      statutory_clause: tkClause,
      explanation: tkExplanation
    },
    prior_art_check_recommendation: {
      urgency: priorArtUrgency,
      recommended_databases: [
        "CSIR Traditional Knowledge Digital Library (TKDL)",
        "Indian Patent Advanced Search System (InPASS)",
        "WIPO PATENTSCOPE & Espacenet",
        "Ayurvedic Pharmacopoeia of India (API) Monograph Database"
      ],
      risk_factors: riskFactors
    },
    abs_compliance_relevance: {
      status: absStatus,
      governing_body: absGoverningBody,
      forms_needed: absForms,
      explanation: absExplanation
    },
    regulatory_pathway: {
      license_category: licenseCategory,
      relevant_rule: relevantRule,
      authority
    },
    recommended_next_action: nextActions,
    disclaimer: "This assessment represents preliminary diagnostic guidance based on retrieved statutory rules and is not a formal legal determination. Consult an empanelled Patent Attorney or Ayush IP Facilitator prior to filing."
  };
}
