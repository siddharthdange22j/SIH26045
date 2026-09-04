/**
 * Access and Benefit Sharing (ABS) Compliance Engine
 * Handles statutory analysis under the Biological Diversity Act, 2002 & 2023 Amendment.
 */

import { ABSAssessmentInput, ABSAssessmentOutput, Citation } from '../src/types.ts';
import { AUTHORITATIVE_SOURCES } from './knowledgeBase.ts';

export function assessABSCompliance(input: ABSAssessmentInput): ABSAssessmentOutput {
  const isRegisteredPractitioner = input.applicant_category === 'REGISTERED_AYUSH_PRACTITIONER';
  const isCultivated = input.biological_resource_source === 'INDIAN_CULTIVATED';
  const isImported = input.biological_resource_source === 'IMPORTED_COMMODITY_NTAC';
  const isIPRApplication = input.activity_type === 'IPR_APPLICATION';
  const isForeignOrForeignFunded = input.applicant_category === 'FOREIGN_ENTITY_OR_INDIAN_CO_WITH_FOREIGN_INVESTMENT';

  let absRelevance: ABSAssessmentOutput['abs_relevance'] = 'POTENTIALLY_RELEVANT';
  let authority: ABSAssessmentOutput['authority_to_approach'] = 'STATE_BIODIVERSITY_BOARD_SBB';
  const applicableSections: string[] = [];
  const forms: ABSAssessmentOutput['mandatory_forms'] = [];
  const checklist: string[] = [];
  let benefitSharing = "0.1% to 0.5% of ex-factory sale price (gross sales minus government taxes).";

  // Check 2023 Amendment Exemptions
  if (isRegisteredPractitioner && !isIPRApplication && !isForeignOrForeignFunded) {
    absRelevance = 'EXEMPTED_UNDER_2023_ACT';
    authority = 'EXEMPT';
    applicableSections.push("Section 7 Proviso (as amended by Biological Diversity Amendment Act, 2023)");
    benefitSharing = "EXEMPTED: 0% benefit sharing for registered traditional Ayush Vaidyas/Hakims practicing indigenous medicine.";
    checklist.push("Maintain proof of valid State Ayush Council / NCISM registration certificate.");
    checklist.push("Maintain record of patient dispensing vs commercial mass manufacturing.");
  } else if (isImported) {
    absRelevance = 'NOT_IDENTIFIED';
    authority = 'EXEMPT';
    applicableSections.push("Section 40 – Normally Traded Commodities (NTAC) Exemption");
    benefitSharing = "EXEMPTED: Biological resources imported from abroad or notified under NTAC list.";
    checklist.push("Retain Customs Bill of Entry and Country of Origin certificate.");
    checklist.push("Verify that raw material is not wild-collected within Indian territorial limits.");
  } else if (isIPRApplication) {
    absRelevance = 'LIKELY_RELEVANT';
    authority = 'NATIONAL_BIODIVERSITY_AUTHORITY_NBA';
    applicableSections.push("Section 6(1) of Biological Diversity Act, 2002");
    applicableSections.push("Section 10(4)(d)(ii) of Indian Patents Act, 1970");
    forms.push({
      form_id: "Form III",
      name: "Application for prior approval of NBA for applying for Intellectual Property Rights",
      purpose: "Mandatory statutory approval before patent grant in India or foreign patent offices.",
      deadline: "Must be obtained before the Indian Patent Office issues the patent grant certificate."
    });
    benefitSharing = "If commercialized by applicant: 0.2% to 1.0% of ex-factory sale price. If licensed/assigned to third party: 3.0% to 5.0% of royalty received.";
    checklist.push("Disclose geographical coordinates / state of collection in patent specification.");
    checklist.push("Submit Form III with official filing fee to NBA Chennai.");
    checklist.push("Awaiting NBA agreement execution prior to final patent hearing.");
  } else if (isForeignOrForeignFunded) {
    absRelevance = 'LIKELY_RELEVANT';
    authority = 'NATIONAL_BIODIVERSITY_AUTHORITY_NBA';
    applicableSections.push("Section 3 of Biological Diversity Act, 2002");
    forms.push({
      form_id: "Form I",
      name: "Application for Access to Biological Resources and associated knowledge",
      purpose: "Mandatory prior approval for foreign nationals, non-residents, or entities having any foreign equity participation.",
      deadline: "Prior to physical collection, acquisition, or commencement of research/utilization."
    });
    benefitSharing = "Upfront access fee and 0.1% to 0.5% ex-factory sales as per NBA ABS Regulations 2014.";
    checklist.push("Foreign entity or Indian company with FDI must not touch biological material without Form I approval.");
    checklist.push("Prior Informed Consent (PIC) from local Biodiversity Management Committee (BMC).");
  } else {
    // Domestic commercial utilization
    if (isCultivated) {
      absRelevance = 'EXEMPTED_UNDER_2023_ACT';
      authority = 'STATE_BIODIVERSITY_BOARD_SBB';
      applicableSections.push("Section 7 (2023 Amendment) – Cultivated Medicinal Plants Exemption");
      benefitSharing = "EXEMPTED from monetary benefit sharing subject to submission of Certificate of Origin.";
      checklist.push("Obtain Certificate of Cultivation from local revenue/panchayat or AYUSH e-Aushadhi portal.");
      checklist.push("Submit annual intimation to State Biodiversity Board with transit authentication.");
    } else {
      absRelevance = 'LIKELY_RELEVANT';
      authority = 'STATE_BIODIVERSITY_BOARD_SBB';
      applicableSections.push("Section 7 of Biological Diversity Act, 2002");
      forms.push({
        form_id: "Form I (State SBB)",
        name: "Prior Intimation for Commercial Utilization of Biological Resources",
        purpose: "Intimation to State Biodiversity Board prior to commercial manufacturing.",
        deadline: "Before initiating commercial batch production."
      });
      benefitSharing = "0.1% to 0.5% of ex-factory sale price paid annually to State Biodiversity Board.";
      checklist.push("File intimation with SBB of the state where biological resource was collected.");
      checklist.push("Execute ABS agreement with SBB specifying yearly turnover reporting.");
    }
  }

  // Citations
  const relevantDocs = AUTHORITATIVE_SOURCES.filter(s => 
    s.document_id === 'IN-BDA-2002-SEC6' || 
    s.document_id === 'IN-BDA-AMENDMENT-2023' || 
    s.document_id === 'IN-NBA-ABS-REGULATIONS-2014'
  );

  const statutoryCitations: Citation[] = relevantDocs.map(doc => ({
    source_id: doc.document_id,
    title: doc.title,
    authority: doc.authority,
    section: doc.section,
    version: doc.version,
    publication_date: doc.publication_date,
    source_url: doc.source_url,
    matched_passage: doc.full_text_passage,
    why_this_source: `Statutory framework governing Access and Benefit Sharing under ${doc.title}.`,
    verification_status: 'VERIFIED_AUTHORITATIVE',
    reliability_score: doc.reliability_score
  }));

  return {
    abs_relevance: absRelevance,
    authority_to_approach: authority,
    applicable_sections: applicableSections,
    mandatory_forms: forms,
    benefit_sharing_estimate: benefitSharing,
    compliance_checklist: checklist,
    statutory_citations: statutoryCitations
  };
}
