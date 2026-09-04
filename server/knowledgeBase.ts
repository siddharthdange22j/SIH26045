/**
 * Authoritative Knowledge Base for IP-SAKTI Sahayak
 * Grounded in statutory Indian & International IP & Regulatory regimes.
 */

import { AuthoritativeSource } from '../src/types.ts';

export const AUTHORITATIVE_SOURCES: AuthoritativeSource[] = [
  // ==========================================
  // INDIA JURISDICTION - PATENTS & TK
  // ==========================================
  {
    document_id: "IN-PAT-1970-SEC3P",
    title: "Indian Patents Act, 1970 (as amended) – Section 3(p)",
    authority: "Controller General of Patents, Designs and Trade Marks (CGPDTM), DPIIT",
    jurisdiction: "INDIA",
    country: "India",
    document_type: "ACT",
    IP_type: ["PATENT", "TRADITIONAL_KNOWLEDGE", "PRIOR_ART"],
    language: "en",
    publication_date: "1970-09-19",
    effective_date: "2003-05-20",
    version: "2024 Consolidated Edition",
    source_url: "https://ipindia.gov.in/writereaddata/Portal/IPOAct/1_31_1_patent-act-1970-11march2015.pdf",
    section: "Section 3(p)",
    paragraph: "Clause (p)",
    page: "7",
    reliability_score: 99,
    last_verified: "2026-02-15",
    status: "ACTIVE_CURRENT",
    verified_by: "DPIIT & Ayush IP Cell Legal Panel",
    key_provisions: [
      "Inventions relating to traditional knowledge are not patentable per se.",
      "An invention which, in effect, is traditional knowledge or which is an aggregation or duplication of known properties of traditionally known component or components is non-patentable.",
      "Requires demonstrable non-obvious synergistic technical effect to overcome Section 3(p) objection."
    ],
    summary: "Section 3(p) prohibits patenting of traditional knowledge or mere aggregations/duplications of known properties of traditionally known components.",
    full_text_passage: "The following are not inventions within the meaning of this Act: (p) an invention which, in effect, is traditional knowledge or which is an aggregation or duplication of known properties of traditionally known component or components."
  },
  {
    document_id: "IN-PAT-1970-SEC3E",
    title: "Indian Patents Act, 1970 – Section 3(e) [Admixture & Synergism]",
    authority: "Controller General of Patents, Designs and Trade Marks (CGPDTM), DPIIT",
    jurisdiction: "INDIA",
    country: "India",
    document_type: "ACT",
    IP_type: ["PATENT", "PRIOR_ART"],
    language: "en",
    publication_date: "1970-09-19",
    effective_date: "2005-01-01",
    version: "2024 Consolidated Edition",
    source_url: "https://ipindia.gov.in",
    section: "Section 3(e)",
    paragraph: "Clause (e)",
    page: "6",
    reliability_score: 98,
    last_verified: "2026-02-15",
    status: "ACTIVE_CURRENT",
    verified_by: "CGPDTM Examiner Guidelines",
    key_provisions: [
      "A substance obtained by a mere admixture resulting only in the aggregation of the properties of the components thereof is not patentable.",
      "A process for producing such substance is also excluded unless unexpected synergy is proved.",
      "For herbal formulations, applicant must submit comparative experimental data proving a synergistic interaction between herbs, rather than additive effects."
    ],
    summary: "Mere admixtures without technical synergism are non-patentable under Section 3(e). Herbal polyherbal combinations must provide rigorous biological synergy proof.",
    full_text_passage: "The following are not inventions within the meaning of this Act: (e) a substance obtained by a mere admixture resulting only in the aggregation of the properties of the components thereof or a process for producing such substance."
  },
  {
    document_id: "IN-PAT-1970-SEC10",
    title: "Indian Patents Act, 1970 – Section 10(4)(d)(ii) [Mandatory Source & NBA Disclosure]",
    authority: "CGPDTM & Ministry of Commerce and Industry",
    jurisdiction: "INDIA",
    country: "India",
    document_type: "ACT",
    IP_type: ["PATENT", "TRADITIONAL_KNOWLEDGE"],
    language: "en",
    publication_date: "1970-09-19",
    effective_date: "2003-05-20",
    version: "2024 Consolidated",
    source_url: "https://ipindia.gov.in",
    section: "Section 10(4)(d)(ii)",
    paragraph: "Sub-clause (ii)",
    page: "18",
    reliability_score: 99,
    last_verified: "2026-02-15",
    status: "ACTIVE_CURRENT",
    verified_by: "Indian Patent Office",
    key_provisions: [
      "Mandatory disclosure of source and geographical origin of any biological material used in the specification.",
      "Failure to disclose or wrongful disclosure of source/geographical origin is a statutory ground for opposition (Section 25) and revocation (Section 64(1)(p)).",
      "Applicant must produce Form 3 approval from National Biodiversity Authority prior to grant of patent."
    ],
    summary: "Requires full statutory disclosure of geographical origin and source of biological materials and NBA clearance before patent grant.",
    full_text_passage: "The specification shall disclose the source and geographical origin of the biological material in the specification, when that biological material is used for the invention."
  },
  {
    document_id: "IN-CGPDTM-GUIDELINES-TK",
    title: "Guidelines for Processing of Patent Applications Relating to Traditional Knowledge and Biological Material",
    authority: "Office of the Controller General of Patents, Designs and Trade Marks (CGPDTM)",
    jurisdiction: "INDIA",
    country: "India",
    document_type: "GUIDELINES",
    IP_type: ["PATENT", "TRADITIONAL_KNOWLEDGE", "PRIOR_ART"],
    language: "en",
    publication_date: "2012-12-18",
    effective_date: "2013-01-01",
    version: "Official Examiner Manual",
    source_url: "https://ipindia.gov.in/writereaddata/Portal/IPORules/1_36_1_Guidelines_for_Patent_Applications_relating_to_TK.pdf",
    section: "Paragraphs 4.1 to 6.3",
    page: "1-14",
    reliability_score: 96,
    last_verified: "2026-01-10",
    status: "ACTIVE_CURRENT",
    verified_by: "Patent Office Screening Committee",
    key_provisions: [
      "Screening of all patent applications for presence of medicinal plant names or traditional uses.",
      "Compulsory search of Traditional Knowledge Digital Library (TKDL) prior to issuance of First Examination Report (FER).",
      "Novel isolation methods or novel extracts with demonstrable therapeutic activity differing from classical formulation may be patentable if Section 3(d) and 3(e) are satisfied."
    ],
    summary: "Administrative examination manual governing how Indian patent examiners screen and scrutinize Ayurveda and botanical patent applications against TKDL.",
    full_text_passage: "When the subject matter relates to plants or traditional knowledge, examiners must examine novelty against TKDL citations, verify Section 3(p) compliance, and demand National Biodiversity Authority clearance where biological resources are sourced within India."
  },

  // ==========================================
  // INDIA JURISDICTION - BIODIVERSITY & ABS
  // ==========================================
  {
    document_id: "IN-BDA-2002-SEC6",
    title: "Biological Diversity Act, 2002 – Section 6 [Prior Approval for IPR]",
    authority: "National Biodiversity Authority (NBA), MoEFCC",
    jurisdiction: "INDIA",
    country: "India",
    document_type: "ACT",
    IP_type: ["PATENT", "TRADITIONAL_KNOWLEDGE"],
    language: "en",
    publication_date: "2003-02-05",
    effective_date: "2004-07-01",
    version: "2002 Act (as updated by 2023 Amendment)",
    source_url: "https://nbaindia.org/uploaded/actindia/act.pdf",
    section: "Section 6(1)",
    paragraph: "Subsection 1 & 2",
    page: "4-5",
    reliability_score: 99,
    last_verified: "2026-02-10",
    status: "ACTIVE_CURRENT",
    verified_by: "National Biodiversity Authority Legal Cell",
    key_provisions: [
      "No person shall apply for any intellectual property right, in or outside India, for any invention based on any research or information on a biological resource obtained from India without previous approval of the National Biodiversity Authority.",
      "Approval must be obtained in Form III before the grant of the patent.",
      "The NBA may impose benefit-sharing fees or conditions as per the Access and Benefit Sharing Regulations."
    ],
    summary: "Section 6 mandates obtaining National Biodiversity Authority (NBA) approval via Form III before any patent can be granted in or outside India for inventions using Indian biological resources.",
    full_text_passage: "No person shall apply for any intellectual property right, by whatever name called, in or outside India for any invention based on any research or information on a biological resource obtained from India without obtaining the previous approval of the National Biodiversity Authority before grant of such IPR."
  },
  {
    document_id: "IN-BDA-AMENDMENT-2023",
    title: "Biological Diversity (Amendment) Act, 2023 (Act No. 10 of 2023)",
    authority: "Ministry of Environment, Forest and Climate Change / Parliament of India",
    jurisdiction: "INDIA",
    country: "India",
    document_type: "ACT",
    IP_type: ["TRADITIONAL_KNOWLEDGE", "REGULATORY_AYUSH", "PATENT"],
    language: "en",
    publication_date: "2023-08-03",
    effective_date: "2023-09-01",
    version: "Gazette of India, Extraordinary Part II Sec 1",
    source_url: "https://egazette.gov.in",
    section: "Sections 3, 7, 19, 21 Amendments",
    paragraph: "Section 7 Proviso",
    page: "1-18",
    reliability_score: 98,
    last_verified: "2026-01-20",
    status: "ACTIVE_CURRENT",
    verified_by: "MoEFCC Notification Division",
    key_provisions: [
      "Exemption from prior intimation to State Biodiversity Boards (SBB) for registered Ayush practitioners (Vaidyas, Hakims) practicing traditional medicine.",
      "Exemption for cultivated medicinal plants when authenticated through Certificate of Origin or Forest Transit rules.",
      "Decriminalization of procedural violations with replacement by financial penalties under an Adjudicating Officer framework.",
      "Foreign controlled Indian companies still require NBA approval under Section 3 and Section 6."
    ],
    summary: "The 2023 Amendment Act eases compliance for registered Ayush practitioners and cultivated medicinal plants while retaining strict NBA approvals for foreign entities and IPR applications.",
    full_text_passage: "Provided that the provisions of this section shall not apply to the local people and communities of the area, including growers and cultivators of biodiversity, and to Vaids and Hakims who have been practicing indigenous medicine: Provided further that cultivated medicinal plants are exempted subject to prescribed certification of origin."
  },
  {
    document_id: "IN-NBA-ABS-REGULATIONS-2014",
    title: "Guidelines on Access to Biological Resources and Associated Knowledge and Benefits Sharing Regulations, 2014",
    authority: "National Biodiversity Authority (NBA)",
    jurisdiction: "INDIA",
    country: "India",
    document_type: "RULES",
    IP_type: ["TRADITIONAL_KNOWLEDGE", "PATENT"],
    language: "en",
    publication_date: "2014-11-21",
    effective_date: "2014-11-21",
    version: "G.S.R. 827(E)",
    source_url: "https://nbaindia.org/uploaded/pdf/Gazette_Notification_of_ABS_Guidlines.pdf",
    section: "Regulations 8, 9, 14",
    paragraph: "Regulation 8(1)",
    page: "3-8",
    reliability_score: 97,
    last_verified: "2026-01-15",
    status: "ACTIVE_CURRENT",
    verified_by: "NBA ABS Division",
    key_provisions: [
      "Benefit sharing percentage for commercialization of IPR: 0.2% to 1.0% of ex-factory sale price where applicant commercializes itself.",
      "Where applicant transfers/licenses IPR to a third party: 3.0% to 5.0% of royalty received.",
      "Form I for Access, Form II for Transfer of Research, Form III for applying for IPR, Form IV for Third Party Transfer."
    ],
    summary: "Prescribes exact formula, monetary tiers, and filing forms for Access and Benefit Sharing under the Biological Diversity Act.",
    full_text_passage: "Where the applicant himself commercializes the process/product/innovation based on biological resources, the monetary sharing of benefits shall be in the range of 0.2 to 1.0 per cent of the ex-factory sale price (gross sales minus taxes)."
  },

  // ==========================================
  // INDIA JURISDICTION - AYUSH REGULATORY & LICENSING
  // ==========================================
  {
    document_id: "IN-AYUSH-DCA-1940-RULE158B",
    title: "Drugs and Cosmetics Rules, 1945 – Rule 158-B (Guidelines for Ayurvedic, Siddha, Unani Licensing)",
    authority: "Ministry of Ayush & Central Drugs Standard Control Organization (CDSCO)",
    jurisdiction: "INDIA",
    country: "India",
    document_type: "RULES",
    IP_type: ["REGULATORY_AYUSH", "TRADE_SECRET"],
    language: "en",
    publication_date: "2010-08-10",
    effective_date: "2010-10-01",
    version: "Amended via GSR 663(E) & subsequent Ayush notifications",
    source_url: "https://ayush.gov.in",
    section: "Rule 158-B",
    paragraph: "Schedule I & Categories A, B, C, D",
    page: "12-24",
    reliability_score: 98,
    last_verified: "2026-02-12",
    status: "ACTIVE_CURRENT",
    verified_by: "Ayush Drug Controller",
    key_provisions: [
      "Category 1: Classical Ayurveda Drugs (Form 24-D / 25-D) manufactured strictly according to authoritative classical books specified in the First Schedule.",
      "Category 2: Patent or Proprietary Medicines (Ayurvedic P&P) containing ingredients mentioned in classical books but formulated in new dosage forms or combinations.",
      "Proof of safety and efficacy required for Patent or Proprietary formulations: animal toxicity testing, pilot clinical trials depending on whether indications differ from classical texts.",
      "Phytopharmaceuticals: Governed under separate CDSCO regime for purified botanical fractions requiring full phase I/II/III clinical trials."
    ],
    summary: "Defines the statutory regulatory difference between Classical Ayurvedic Medicines (Schedule I texts) and Patent/Proprietary Ayurvedic Medicines (requiring safety and efficacy evidence).",
    full_text_passage: "For the issue of license to manufacture for sale of Ayurvedic, Siddha or Unani drugs under Form 24-D or Form 25-D, Category A: Classical medicines strictly following texts listed in the First Schedule do not require safety and efficacy trials. Category B: Patent or Proprietary medicines must furnish published scientific evidence of safety and pilot clinical data."
  },
  {
    document_id: "IN-AYUSH-FIRST-SCHEDULE",
    title: "Drugs and Cosmetics Act, 1940 – The First Schedule (Authoritative Books of Ayurveda)",
    authority: "Ministry of Ayush, Government of India",
    jurisdiction: "INDIA",
    country: "India",
    document_type: "ACT",
    IP_type: ["TRADITIONAL_KNOWLEDGE", "PRIOR_ART", "REGULATORY_AYUSH"],
    language: "en",
    publication_date: "1940-04-10",
    effective_date: "1940-04-10",
    version: "Updated with 57 authoritative texts",
    source_url: "https://cdsco.gov.in",
    section: "The First Schedule – Ayurveda",
    page: "First Schedule Table",
    reliability_score: 99,
    last_verified: "2026-01-25",
    status: "ACTIVE_CURRENT",
    verified_by: "Ayurvedic Pharmacopoeia Committee (APC)",
    key_provisions: [
      "Lists the 57 statutory classical texts of Ayurveda recognized by law, including Charaka Samhita, Sushruta Samhita, Ashtanga Hridaya, Bhavaprakasha, Sharangadhara Samhita, Bhaishajya Ratnavali, and Ayurvedic Pharmacopoeia of India (API).",
      "Formulations sourced from these texts are classified as non-patentable traditional knowledge under Section 3(p) of the Patents Act.",
      "Serves as the legal baseline for prior art in India and international patent scrutiny."
    ],
    summary: "The statutory register of 57 classical Ayurveda books that define classical traditional knowledge and prior art under Indian drug and patent law.",
    full_text_passage: "The First Schedule specifies the authoritative books of Ayurvedic, Siddha and Unani Tibb systems. Any formulation whose composition and method of preparation is described in these texts is legally recognized as classical traditional formulation."
  },

  // ==========================================
  // INDIA JURISDICTION - GI & TRADEMARKS
  // ==========================================
  {
    document_id: "IN-GI-ACT-1999",
    title: "Geographical Indications of Goods (Registration and Protection) Act, 1999",
    authority: "Geographical Indications Registry, CGPDTM, Chennai",
    jurisdiction: "INDIA",
    country: "India",
    document_type: "ACT",
    IP_type: ["GEOGRAPHICAL_INDICATION", "TRADITIONAL_KNOWLEDGE"],
    language: "en",
    publication_date: "1999-12-30",
    effective_date: "2003-09-15",
    version: "2024 Edition",
    source_url: "https://ipindia.gov.in",
    section: "Sections 2(1)(e), 9, 21",
    page: "3-15",
    reliability_score: 96,
    last_verified: "2026-02-01",
    status: "ACTIVE_CURRENT",
    verified_by: "GI Registry India",
    key_provisions: [
      "Protects goods possessing a given quality, reputation or other characteristic attributable to its geographical origin.",
      "Ayurvedic raw drugs and regional preparations can be protected under GI (e.g., Navara Rice GI #63, Kangra Tea GI #14, Nilambur Teak GI #582).",
      "GI rights are collective community rights; individual monopoly cannot be granted."
    ],
    summary: "Law protecting geographical indications for traditional agricultural, herbal, and Ayurvedic products tied to specific terroirs in India.",
    full_text_passage: "A geographical indication in relation to goods means an indication which identifies such goods as agricultural goods, natural goods or manufactured goods originating in the territory of a country, or a region or locality in that territory, where a given quality, reputation or other characteristic is attributable to its geographical origin."
  },

  // ==========================================
  // INTERNATIONAL JURISDICTION - WIPO, TRIPS, PCT, NAGOYA
  // ==========================================
  {
    document_id: "INT-WIPO-TREATY-GRATK-2024",
    title: "WIPO Treaty on Intellectual Property, Genetic Resources and Associated Traditional Knowledge",
    authority: "World Intellectual Property Organization (WIPO), Geneva",
    jurisdiction: "INTERNATIONAL",
    country: "Multilateral (WIPO Diplomatic Conference)",
    document_type: "TREATY",
    IP_type: ["PATENT", "TRADITIONAL_KNOWLEDGE", "PRIOR_ART"],
    language: "en",
    publication_date: "2024-05-24",
    effective_date: "Ratification Phase (Adopted 24 May 2024)",
    version: "WIPO Document GRATK/DC/7",
    source_url: "https://www.wipo.int/treaties/en/ip/gratk/",
    section: "Articles 3, 4, 6",
    paragraph: "Article 3 (Disclosure Requirement)",
    page: "1-9",
    reliability_score: 99,
    last_verified: "2026-02-20",
    status: "ACTIVE_CURRENT",
    verified_by: "WIPO Secretariat & Diplomatic Delegation of India",
    key_provisions: [
      "Landmark international treaty establishing a mandatory disclosure requirement in patent applications.",
      "Where an invention is based on genetic resources, patent applicants must disclose the country of origin.",
      "Where an invention is based on traditional knowledge associated with genetic resources, applicants must disclose the indigenous peoples or local community providing the TK.",
      "Provides for information systems and non-patent literature databases (such as India's TKDL) to be connected to international patent offices."
    ],
    summary: "Landmark May 2024 WIPO Treaty mandating worldwide patent disclosure of country of origin for genetic resources and associated traditional knowledge.",
    full_text_passage: "Article 3.1: Where an invention is based on genetic resources, each Contracting Party shall require applicants to disclose the country of origin of the genetic resources, or if unknown, the source. Article 3.2: Where an invention is based on traditional knowledge associated with genetic resources, applicants shall disclose the indigenous peoples or local community who provided the traditional knowledge."
  },
  {
    document_id: "INT-CBD-NAGOYA-PROTOCOL-2010",
    title: "Nagoya Protocol on Access to Genetic Resources and Fair and Equitable Sharing of Benefits (ABS)",
    authority: "Secretariat of the Convention on Biological Diversity (SCBD / UNEP)",
    jurisdiction: "INTERNATIONAL",
    country: "Multilateral (141 Parties including India)",
    document_type: "TREATY",
    IP_type: ["TRADITIONAL_KNOWLEDGE", "PATENT"],
    language: "en",
    publication_date: "2010-10-29",
    effective_date: "2014-10-12",
    version: "UN Treaty Series Vol. 3008",
    source_url: "https://www.cbd.int/abs/text/",
    section: "Articles 5, 6, 7, 15, 17",
    paragraph: "Article 6 & 15",
    page: "1-25",
    reliability_score: 98,
    last_verified: "2026-01-30",
    status: "ACTIVE_CURRENT",
    verified_by: "UN CBD ABS Clearing House (ABSCH)",
    key_provisions: [
      "Parties must take measures to ensure that genetic resources utilized within their jurisdiction have been accessed in accordance with Prior Informed Consent (PIC) and Mutually Agreed Terms (MAT).",
      "Internationally Recognized Certificate of Compliance (IRCC) serves as evidence of legal access.",
      "Checkpoints at patent offices and regulatory approval bodies to monitor utilization of genetic resources and traditional knowledge."
    ],
    summary: "International treaty enforcing cross-border compliance with Prior Informed Consent and benefit-sharing for genetic resources and traditional knowledge.",
    full_text_passage: "Each Party shall take appropriate, effective and proportionate legislative, administrative or policy measures to provide that genetic resources and associated traditional knowledge utilized within its jurisdiction have been accessed in accordance with prior informed consent and mutually agreed terms."
  },
  {
    document_id: "INT-WTO-TRIPS-ART27",
    title: "WTO TRIPS Agreement – Article 27 [Patentable Subject Matter] & Traditional Knowledge",
    authority: "World Trade Organization (WTO) Council for TRIPS",
    jurisdiction: "INTERNATIONAL",
    country: "Multilateral (WTO Member States)",
    document_type: "TREATY",
    IP_type: ["PATENT", "TRADITIONAL_KNOWLEDGE"],
    language: "en",
    publication_date: "1994-04-15",
    effective_date: "1995-01-01",
    version: "Marrakesh Agreement Annex 1C (2020 Compendium)",
    source_url: "https://www.wto.org/english/docs_e/legal_e/27-trips_04c_e.htm",
    section: "Article 27(1), 27(2), 27(3)(b)",
    page: "13-14",
    reliability_score: 97,
    last_verified: "2026-01-18",
    status: "ACTIVE_CURRENT",
    verified_by: "WTO TRIPS Division",
    key_provisions: [
      "Patents shall be available for any inventions, whether products or processes, in all fields of technology, provided that they are new, involve an inventive step and are capable of industrial application.",
      "Article 27.3(b) allows members to exclude from patentability plants and animals other than micro-organisms, but requires protection of plant varieties either by patents or an effective sui generis system.",
      "Debate under Doha Declaration Paragraph 19 regarding relationship between TRIPS and the Convention on Biological Diversity."
    ],
    summary: "Governs global patentability standards, allowing national flexibilities for biological inventions and traditional medicine exclusions.",
    full_text_passage: "Members may exclude from patentability: (b) plants and animals other than micro-organisms, and essentially biological processes for the production of plants or animals other than non-biological and microbiological processes. However, Members shall provide for the protection of plant varieties either by patents or by an effective sui generis system."
  },
  {
    document_id: "INT-WIPO-PCT-RULE34",
    title: "Patent Cooperation Treaty (PCT) – Rule 34 [Minimum Documentation & TKDL Access]",
    authority: "World Intellectual Property Organization (WIPO)",
    jurisdiction: "INTERNATIONAL",
    country: "International (PCT Union)",
    document_type: "RULES",
    IP_type: ["PATENT", "PRIOR_ART", "TRADITIONAL_KNOWLEDGE"],
    language: "en",
    publication_date: "1970-06-19",
    effective_date: "2020-07-01 (Latest Amendment)",
    version: "PCT Regulations 2024",
    source_url: "https://www.wipo.int/pct/en/texts/rules/r34.html",
    section: "Rule 34.1(b)(iii)",
    page: "38-41",
    reliability_score: 96,
    last_verified: "2026-01-12",
    status: "ACTIVE_CURRENT",
    verified_by: "PCT International Searching Authorities (ISA)",
    key_provisions: [
      "Defines the minimum non-patent literature that International Searching Authorities (ISAs) must consult when preparing International Search Reports.",
      "Includes Indian Traditional Knowledge Digital Library (TKDL) and traditional medicine journals.",
      "Preempts bad-faith international patents by putting classical knowledge directly in front of international patent examiners."
    ],
    summary: "Requires international search authorities to search traditional knowledge databases including TKDL before issuing global patent search reports.",
    full_text_passage: "The minimum documentation referred to in Article 15(4) shall consist of the national patent documents specified in paragraph (c) and the published items of non-patent literature agreed upon by the International Searching Authorities, including recognized traditional knowledge collections."
  },

  // ==========================================
  // LANDMARK CASE LAW - TURMERIC & NEEM
  // ==========================================
  {
    document_id: "CASE-US-TURMERIC-CSIR-1997",
    title: "Reexamination of US Patent 5,401,504 (Use of Turmeric in Wound Healing)",
    authority: "United States Patent and Trademark Office (USPTO) / CSIR India",
    jurisdiction: "INTERNATIONAL",
    country: "United States / India",
    document_type: "COURT_JUDGMENT",
    IP_type: ["PATENT", "TRADITIONAL_KNOWLEDGE", "PRIOR_ART"],
    language: "en",
    publication_date: "1997-08-21",
    effective_date: "1997-08-21",
    version: "USPTO Reexamination Certificate 5,401,504 B1",
    source_url: "https://patents.google.com/patent/US5401504A/en",
    section: "Reexamination Decision 90/004,374",
    page: "All claims canceled",
    reliability_score: 99,
    last_verified: "2026-02-14",
    status: "ACTIVE_CURRENT",
    verified_by: "Council of Scientific and Industrial Research (CSIR)",
    key_provisions: [
      "CSIR challenged patent granted to University of Mississippi on wound-healing properties of turmeric powder.",
      "CSIR cited classical Sanskrit and Hindi Ayurvedic texts and an Indian Medical Association paper published in 1953 proving prior art.",
      "USPTO revoked all 6 claims for lack of novelty (35 U.S.C. 102), establishing international precedent that published traditional knowledge destroys novelty globally."
    ],
    summary: "Landmark revocation case where India's CSIR defeated a US patent on turmeric wound healing by proving classical Ayurvedic prior art.",
    full_text_passage: "In reexamination proceedings initiated by CSIR India, all claims 1-6 were rejected as fully anticipated under 35 U.S.C. 102 by prior art publications documenting the thousands-of-years-old traditional use of Curcuma longa powder for wound healing."
  },
  {
    document_id: "CASE-EPO-NEEM-TKDL-2005",
    title: "EPO Opposition Decision: European Patent EP 0436257 (Fungicidal Effect of Neem)",
    authority: "European Patent Office (EPO) Technical Board of Appeal",
    jurisdiction: "INTERNATIONAL",
    country: "Europe / India",
    document_type: "COURT_JUDGMENT",
    IP_type: ["PATENT", "TRADITIONAL_KNOWLEDGE", "PRIOR_ART"],
    language: "en",
    publication_date: "2005-03-08",
    effective_date: "2005-03-08",
    version: "EPO Decision T 0416/01",
    source_url: "https://www.epo.org",
    section: "Board of Appeal Decision T 0416/01",
    page: "1-22",
    reliability_score: 99,
    last_verified: "2026-02-14",
    status: "ACTIVE_CURRENT",
    verified_by: "EPO Technical Board of Appeal",
    key_provisions: [
      "Patent granted to W.R. Grace and US Department of Agriculture for hydrophobic extract of neem seeds as a fungicide.",
      "Opposition filed citing public prior use and Ayurvedic knowledge across India for centuries.",
      "EPO Technical Board of Appeal upheld revocation under Article 56 EPC (lack of inventive step), concluding that the purported innovation was obvious in view of traditional Indian agricultural practices."
    ],
    summary: "Landmark EPO decision revoking a European patent on neem fungicide due to proven traditional Ayurvedic and indigenous prior art.",
    full_text_passage: "The European Patent Office revoked European Patent No. 0436257 in its entirety on grounds that the claimed fungicidal effect of neem extract lacked an inventive step over centuries-old traditional knowledge practiced in India."
  }
];
