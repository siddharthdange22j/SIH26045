/**
 * Relational Knowledge Graph for Ayurveda IP & Regulatory Domain
 */

import { KnowledgeGraphEdge, KnowledgeGraphNode } from '../src/types.ts';

export const GRAPH_NODES: KnowledgeGraphNode[] = [
  // Plants
  { id: "plant-withania", label: "Ashwagandha (Withania somnifera)", type: "Plant", properties: { family: "Solanaceae", origin: "India", classical_name: "Aśvagandhā" } },
  { id: "plant-curcuma", label: "Turmeric (Curcuma longa)", type: "Plant", properties: { family: "Zingiberaceae", origin: "India", classical_name: "Haridrā" } },
  { id: "plant-azadirachta", label: "Neem (Azadirachta indica)", type: "Plant", properties: { family: "Meliaceae", origin: "India", classical_name: "Nimba" } },
  { id: "plant-bacopa", label: "Brahmi (Bacopa monnieri)", type: "Plant", properties: { family: "Plantaginaceae", origin: "India", classical_name: "Brāhmī" } },

  // Biological Resources
  { id: "bio-root-withania", label: "Withania Root Biomass", type: "BiologicalResource", properties: { category: "Root", source: "Cultivated/Wild" } },
  { id: "bio-rhizome-curcuma", label: "Curcuma Rhizome", type: "BiologicalResource", properties: { category: "Rhizome", source: "Agricultural harvest" } },
  { id: "bio-seed-neem", label: "Neem Seed Kernel Oil", type: "BiologicalResource", properties: { category: "Seed", source: "Wild collected" } },

  // Ingredients / Phytochemicals
  { id: "ing-withaferin", label: "Withaferin A", type: "Ingredient", properties: { class: "Steroidal lactone", bioactivity: "Anti-inflammatory, Cytotoxic" } },
  { id: "ing-curcumin", label: "Curcuminoids", type: "Ingredient", properties: { class: "Polyphenol", bioactivity: "Wound healing, Antioxidant" } },
  { id: "ing-azadirachtin", label: "Azadirachtin", type: "Ingredient", properties: { class: "Limonoid", bioactivity: "Insecticidal, Antifungal" } },
  { id: "ing-bacosides", label: "Bacosides A & B", type: "Ingredient", properties: { class: "Triterpenoid saponin", bioactivity: "Nootropic / Cognition" } },

  // Formulations
  { id: "form-chyawanprash", label: "Chyawanprash Avaleha", type: "Formulation", properties: { text: "Charaka Samhita", classification: "Classical Rasayana" } },
  { id: "form-triphala", label: "Triphala Churna", type: "Formulation", properties: { text: "Sushruta & Charaka", classification: "Classical Kashaya/Churna" } },
  { id: "form-bacoside-extract", label: "Enriched Bacoside Fraction", type: "Formulation", properties: { developer: "CSIR-CDRI", classification: "Phytopharmaceutical extract" } },

  // Traditional Knowledge
  { id: "tk-charaka", label: "Charaka Samhita (1000 BCE)", type: "TraditionalKnowledge", properties: { scope: "Internal Medicine & Rasayana", status: "Public Domain Non-Patent Literature" } },
  { id: "tk-sushruta", label: "Sushruta Samhita", type: "TraditionalKnowledge", properties: { scope: "Surgery & Wound Management", status: "Classical Treatise" } },
  { id: "tk-tkdl", label: "CSIR-TKDL Database", type: "TraditionalKnowledge", properties: { entries: "4.4+ Lakh formulations", access: "IPC / Patent Office Agreement" } },

  // Patents & Landmark Cases
  { id: "pat-us-turmeric", label: "US Patent 5,401,504 (Revoked)", type: "Patent", properties: { subject: "Turmeric wound healing", outcome: "Revoked 1997 via CSIR opposition" } },
  { id: "pat-ep-neem", label: "EP Patent 0436257 (Revoked)", type: "Patent", properties: { subject: "Neem fungicide", outcome: "Revoked 2005 at EPO Board of Appeal" } },
  { id: "pat-cdri-brahmi", label: "US Patent 6,833,143 (Granted)", type: "Patent", properties: { applicant: "CSIR India", subject: "Novel standardized bacoside yield process" } },

  // Laws & Regulations
  { id: "law-patents-act", label: "Indian Patents Act 1970 [Sec 3(p) & 3(e)]", type: "Law", properties: { clause: "Exclusion of TK & mere admixtures" } },
  { id: "law-bda", label: "Biological Diversity Act 2002 / 2023 [Sec 6]", type: "Law", properties: { clause: "Mandatory prior approval for IPR" } },
  { id: "reg-rule158b", label: "Drugs & Cosmetics Rule 158-B", type: "Regulation", properties: { scope: "Licensing of Classical vs Patent/Proprietary ASU" } },

  // Treaties & International
  { id: "treaty-wipo-gratk", label: "WIPO GRATK Treaty 2024", type: "Treaty", properties: { landmark: "Mandatory patent disclosure of genetic resources" } },
  { id: "treaty-nagoya", label: "Nagoya Protocol on ABS", type: "Treaty", properties: { mechanism: "Prior Informed Consent & Mutually Agreed Terms" } },
  { id: "treaty-pct", label: "PCT Rule 34 Minimum Documentation", type: "Treaty", properties: { provision: "ISAs must search TK databases including TKDL" } },

  // Authorities
  { id: "auth-cgpdtm", label: "CGPDTM (Indian Patent Office)", type: "Authority", properties: { ministry: "Ministry of Commerce & Industry" } },
  { id: "auth-nba", label: "National Biodiversity Authority (NBA)", type: "Authority", properties: { headquarters: "Chennai", mandate: "ABS approvals & IPR Form III" } },
  { id: "auth-ayush", label: "Ministry of Ayush", type: "Authority", properties: { role: "Ayurveda standards, API & TKDL co-custodian" } },
  { id: "auth-wipo", label: "World Intellectual Property Organization (WIPO)", type: "Authority", properties: { headquarters: "Geneva", role: "Global IP treaties" } },

  // Jurisdictions
  { id: "jur-india", label: "Jurisdiction: India", type: "Jurisdiction", properties: { system: "National Statutory Framework" } },
  { id: "jur-intl", label: "Jurisdiction: International", type: "Jurisdiction", properties: { system: "Multilateral Treaties & Conventions" } }
];

export const GRAPH_EDGES: KnowledgeGraphEdge[] = [
  // Plant -> Ingredient / Biological Resource
  { source: "plant-withania", target: "bio-root-withania", relationship: "Yields biological resource" },
  { source: "bio-root-withania", target: "ing-withaferin", relationship: "Contains phytochemical active" },
  { source: "plant-curcuma", target: "bio-rhizome-curcuma", relationship: "Yields biological resource" },
  { source: "bio-rhizome-curcuma", target: "ing-curcumin", relationship: "Contains active fraction" },
  { source: "plant-azadirachta", target: "bio-seed-neem", relationship: "Yields seed biomass" },
  { source: "bio-seed-neem", target: "ing-azadirachtin", relationship: "Contains limonoid" },
  { source: "plant-bacopa", target: "ing-bacosides", relationship: "Contains saponins" },

  // Ingredient -> Formulation
  { source: "ing-curcumin", target: "form-triphala", relationship: "Constituent ingredient" },
  { source: "ing-withaferin", target: "form-chyawanprash", relationship: "Classical polyherbal ingredient" },
  { source: "ing-bacosides", target: "form-bacoside-extract", relationship: "Enriched industrial fraction" },

  // Formulation -> Traditional Knowledge
  { source: "form-chyawanprash", target: "tk-charaka", relationship: "Described verbatim in treatise" },
  { source: "form-triphala", target: "tk-sushruta", relationship: "Classical shloka description" },
  { source: "tk-charaka", target: "tk-tkdl", relationship: "Transcribed into 5 UN languages" },

  // Formulation / Plant -> Patents & Landmark Cases
  { source: "ing-curcumin", target: "pat-us-turmeric", relationship: "Subject of revoked claim" },
  { source: "tk-sushruta", target: "pat-us-turmeric", relationship: "Invalidated novelty under 35 U.S.C. 102" },
  { source: "ing-azadirachtin", target: "pat-ep-neem", relationship: "Subject of revoked EP claim" },
  { source: "tk-tkdl", target: "pat-ep-neem", relationship: "Proved lack of inventive step (Art 56 EPC)" },
  { source: "form-bacoside-extract", target: "pat-cdri-brahmi", relationship: "Novel extraction process granted" },

  // Biological Resource -> ABS / Law
  { source: "bio-root-withania", target: "law-bda", relationship: "Governed under Section 6 (Mandatory Form III)" },
  { source: "bio-rhizome-curcuma", target: "law-bda", relationship: "Requires ABS intimation if commercialized" },
  { source: "law-bda", target: "auth-nba", relationship: "Administered by" },

  // Law -> Jurisdiction
  { source: "law-patents-act", target: "jur-india", relationship: "Statutory code of" },
  { source: "law-bda", target: "jur-india", relationship: "Statutory code of" },
  { source: "reg-rule158b", target: "jur-india", relationship: "Drug regulation of" },

  // Treaties -> Jurisdiction
  { source: "treaty-wipo-gratk", target: "jur-intl", relationship: "Multilateral regime" },
  { source: "treaty-nagoya", target: "jur-intl", relationship: "Multilateral regime" },
  { source: "treaty-pct", target: "jur-intl", relationship: "Multilateral regime" },

  // Authorities -> Regulations & Enforcement
  { source: "auth-cgpdtm", target: "law-patents-act", relationship: "Enforces Section 3(p) & 3(e)" },
  { source: "auth-ayush", target: "reg-rule158b", relationship: "Licensing authority" },
  { source: "auth-wipo", target: "treaty-wipo-gratk", relationship: "Administering agency" },
  { source: "treaty-wipo-gratk", target: "law-patents-act", relationship: "Mandates genetic disclosure harmony" },
  { source: "tk-tkdl", target: "treaty-pct", relationship: "Integrated into PCT Rule 34 minimum docs" }
];
