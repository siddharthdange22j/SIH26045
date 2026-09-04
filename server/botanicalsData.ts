/**
 * Classical Ayurveda Treatises & Botanical Database for Prior Art & TK Analysis
 */

import { PriorArtLookupResult } from '../src/types.ts';

export interface BotanicalEntry {
  common_name: string;
  sanskrit_name: string;
  botanical_name: string;
  family: string;
  classical_treatise_citations: {
    treatise: string;
    shloka_reference: string;
    therapeutic_indications: string[];
  }[];
  active_phytochemicals: string[];
  patentability_notes: string;
  tkdl_indication_count: number;
  historical_patents: {
    patent_number: string;
    title: string;
    outcome: string;
  }[];
}

export const BOTANICAL_DATABASE: Record<string, BotanicalEntry> = {
  "ashwagandha": {
    common_name: "Ashwagandha (Indian Ginseng)",
    sanskrit_name: "अश्वगंधा (Aśvagandhā)",
    botanical_name: "Withania somnifera (L.) Dunal",
    family: "Solanaceae",
    classical_treatise_citations: [
      {
        treatise: "Charaka Samhita (चरकसंहिता)",
        shloka_reference: "Sutra Sthana Ch. 4 (Balya & Brumhaniya Mahakashaya)",
        therapeutic_indications: ["Rasayana (Rejuvenator)", "Balya (Strength promoter)", "Shukrala (Aphrodisiac)"]
      },
      {
        treatise: "Bhavaprakasha Nighantu (भावप्रकाश निघण्टु)",
        shloka_reference: "Guduchyadi Varga, Shloka 189-190",
        therapeutic_indications: ["Vata-Kaphahara", "Kshaya (Debility)", "Shotha (Inflammation)"]
      }
    ],
    active_phytochemicals: ["Withaferin A", "Withanolide A", "Withanolide D", "Withanoside IV"],
    patentability_notes: "Raw powders or classical decoctions (Kashaya/Arishta) are excluded under Section 3(p) & 3(e). Isolated fractions or novel standardized extraction processes demonstrating unexpected neuroprotective or adaptogenic synergy may be patentable if backed by comparative in vitro/in vivo assays.",
    tkdl_indication_count: 284,
    historical_patents: [
      {
        patent_number: "US 6,153,198",
        title: "Withania somnifera compositions",
        outcome: "Heavily restricted following TKDL prior-art submission by CSIR"
      }
    ]
  },
  "turmeric": {
    common_name: "Turmeric / Haridra",
    sanskrit_name: "हरिद्रा (Haridrā)",
    botanical_name: "Curcuma longa L.",
    family: "Zingiberaceae",
    classical_treatise_citations: [
      {
        treatise: "Sushruta Samhita (सुश्रुतसंहिता)",
        shloka_reference: "Sutra Sthana Ch. 38 (Haridradi Gana)",
        therapeutic_indications: ["Vranashodhana (Wound cleansing)", "Vranaropana (Wound healing)", "Kushtaghna (Skin disorders)"]
      },
      {
        treatise: "Charaka Samhita (चरकसंहिता)",
        shloka_reference: "Chikitsa Sthana Ch. 7",
        therapeutic_indications: ["Mehahara (Antidiabetic)", "Krimighna (Anthelmintic)", "Vishaghna (Detoxification)"]
      }
    ],
    active_phytochemicals: ["Curcumin", "Demethoxycurcumin", "Bisdemethoxycurcumin", "Curcuminoids", "Turmerones"],
    patentability_notes: "Wound healing and anti-inflammatory uses of turmeric powder are documented extensively in classical texts. Any attempt to patent raw powder or simple solvent extraction will fail under Section 3(p) and US/EPO 102/54 prior art bars. Only novel drug delivery systems (e.g. liposomal, nano-particle formulations) or synergistic synthetic complexes with enhanced bioavailability can be considered.",
    tkdl_indication_count: 512,
    historical_patents: [
      {
        patent_number: "US 5,401,504",
        title: "Use of Turmeric in Wound Healing",
        outcome: "REVOKED in 1997 after CSIR India presented ancient Sanskrit texts and 1953 IMA paper"
      }
    ]
  },
  "neem": {
    common_name: "Neem / Margosa",
    sanskrit_name: "निम्ब (Nimba)",
    botanical_name: "Azadirachta indica A. Juss.",
    family: "Meliaceae",
    classical_treatise_citations: [
      {
        treatise: "Charaka Samhita (चरकसंहिता)",
        shloka_reference: "Sutra Sthana Ch. 2 & Chikitsa Sthana Ch. 7",
        therapeutic_indications: ["Kushtaghna (Skin diseases)", "Krimighna (Insecticidal/Pest control)", "Kandughna (Anti-pruritic)"]
      },
      {
        treatise: "Ashtanga Hridaya (अष्टाङ्गहृदयम्)",
        shloka_reference: "Uttara Sthana Ch. 30",
        therapeutic_indications: ["Vranaropana", "Jwarahara (Antipyretic)"]
      }
    ],
    active_phytochemicals: ["Azadirachtin", "Nimbin", "Nimbidin", "Salannin", "Gedunin"],
    patentability_notes: "Fungicidal and insecticidal uses of neem seeds and bark are universal traditional knowledge. Pure agricultural extract patents have been repeatedly defeated in Europe (EPO EP 0436257). Non-obvious chemical modifications or novel stabilized storage emulsions may qualify.",
    tkdl_indication_count: 420,
    historical_patents: [
      {
        patent_number: "EP 0436257 B1",
        title: "Hydrophobic neem oil fungicide",
        outcome: "REVOKED by EPO Board of Appeal in 2005 on grounds of lack of novelty and inventive step over Indian traditional knowledge"
      }
    ]
  },
  "tulsi": {
    common_name: "Tulsi / Holy Basil",
    sanskrit_name: "तुलसी (Tulasī)",
    botanical_name: "Ocimum sanctum L. / Ocimum tenuiflorum L.",
    family: "Lamiaceae",
    classical_treatise_citations: [
      {
        treatise: "Charaka Samhita (चरकसंहिता)",
        shloka_reference: "Sutra Sthana Ch. 27",
        therapeutic_indications: ["Shwasahara (Antiasthmatic)", "Kasahara (Antitussive)", "Hridya (Cardioprotective)"]
      },
      {
        treatise: "Bhavaprakasha Nighantu (भावप्रकाश निघण्टु)",
        shloka_reference: "Pushpa Varga, Shloka 62-64",
        therapeutic_indications: ["Pitta-Krit", "Kaphahara", "Deepana (Digestive stimulant)"]
      }
    ],
    active_phytochemicals: ["Eugenol", "Ursolic acid", "Rosmarinic acid", "Caryophyllene"],
    patentability_notes: "Antitussive, antimicrobial, and adaptogenic uses of holy basil are well established in classical ASU literature. Process patents for solvent extracts must demonstrate novel parameters, specific extraction solvents, and non-obvious bioactivity enhancement.",
    tkdl_indication_count: 195,
    historical_patents: [
      {
        patent_number: "IN 2011/DEL/2009",
        title: "Standardized extract of Ocimum sanctum",
        outcome: "Amended to specific fractionated phytochemical ratio following Section 3(p) objections"
      }
    ]
  },
  "brahmi": {
    common_name: "Brahmi / Water Hyssop",
    sanskrit_name: "ब्राह्मी (Brāhmī)",
    botanical_name: "Bacopa monnieri (L.) Wettst.",
    family: "Plantaginaceae / Scrophulariaceae",
    classical_treatise_citations: [
      {
        treatise: "Charaka Samhita (चरकसंहिता)",
        shloka_reference: "Chikitsa Sthana Ch. 1 (Rasayana Pada)",
        therapeutic_indications: ["Medhya (Nootropic / Cognition enhancer)", "Ayushya (Longevity)", "Smritivardhaka (Memory enhancer)"]
      },
      {
        treatise: "Sushruta Samhita (सुश्रुतसंहिता)",
        shloka_reference: "Chikitsa Sthana Ch. 28",
        therapeutic_indications: ["Manasadoshahara", "Unmada-Apasmara (Psychiatric/Neurological wellness)"]
      }
    ],
    active_phytochemicals: ["Bacoside A", "Bacoside B", "Bacopaside I", "Bacopasaponins"],
    patentability_notes: "Cognition and memory enhancement are prime classical Medhya Rasayana indications. Any claim reciting improved memory using whole plant or standard extracts will trigger Section 3(p) refusal. CDRI Lucknow patented specific enriched bacoside fractions with enriched stability profiles.",
    tkdl_indication_count: 168,
    historical_patents: [
      {
        patent_number: "US 6,833,143",
        title: "Process for preparation of extract of Bacopa monniera enriched in bacosides",
        outcome: "Granted to CSIR-CDRI for a specific, novel industrial extraction yield process"
      }
    ]
  },
  "triphala": {
    common_name: "Triphala (Three Fruits Formulation)",
    sanskrit_name: "त्रिफला (Triphalā)",
    botanical_name: "Combination of Emblica officinalis, Terminalia chebula, Terminalia bellirica",
    family: "Combretaceae / Phyllanthaceae",
    classical_treatise_citations: [
      {
        treatise: "Charaka Samhita (चरकसंहिता)",
        shloka_reference: "Chikitsa Sthana Ch. 1 (Rasayana Pada 2, Shloka 41-44)",
        therapeutic_indications: ["Sarvarogahara (Panacea)", "Chakshushya (Ophthalmic booster)", "Deepana-Pachana"]
      },
      {
        treatise: "Ashtanga Hridaya (अष्टाङ्गहृदयम्)",
        shloka_reference: "Uttara Sthana Ch. 40",
        therapeutic_indications: ["Virechana (Gentle laxative)", "Rasayana", "Kaphapittajit"]
      }
    ],
    active_phytochemicals: ["Gallic acid", "Ellagic acid", "Chebulinic acid", "Corilagin", "Ascorbic acid"],
    patentability_notes: "Triphala in equal 1:1:1 or 1:2:4 ratio is absolute traditional knowledge listed in the Ayurvedic Pharmacopoeia of India. A patent application for Triphala or simple admixtures will be directly rejected under Sections 3(p) and 3(e). Only novel targeted nano-carriers or specific non-obvious combinations with synthetic molecules might escape.",
    tkdl_indication_count: 640,
    historical_patents: [
      {
        patent_number: "IN Application 2018/CHE/0192",
        title: "Triphala synergistic tablet",
        outcome: "Abandoned after First Examination Report issued Section 3(e) and 3(p) rejections"
      }
    ]
  },
  "chyawanprash": {
    common_name: "Chyawanprash Avaleha",
    sanskrit_name: "च्यवनप्राश (Cyavanaprāśa)",
    botanical_name: "Polyherbal preparation with Emblica officinalis (Amla) as prime ingredient",
    family: "Multi-botanical (approx 48 herbs in sesame oil, ghee, honey, sugar candy)",
    classical_treatise_citations: [
      {
        treatise: "Charaka Samhita (चरकसंहिता)",
        shloka_reference: "Chikitsa Sthana Ch. 1:1 (Rasayana Adhyaya, Shloka 62-74)",
        therapeutic_indications: ["Prana-vardhaka (Respiratory immunity)", "Dhatuposhaka", "Jarahara (Anti-aging)"]
      }
    ],
    active_phytochemicals: ["Vitamin C", "Phyllanthin", "Emblicanin A & B", "Flavonoids"],
    patentability_notes: "Classic formulation described verbatim in Charaka Samhita. Entirely public domain. Trademarks can be registered for distinctive brand names (e.g., 'Dabur Chyawanprash', 'Zandu Chyawanprash') but the composition cannot be patented. Sugar-free variants using novel artificial matrices may seek formulation process claims.",
    tkdl_indication_count: 850,
    historical_patents: [
      {
        patent_number: "EP 1400249",
        title: "Herbal nutritional paste",
        outcome: "Withdrawn after third-party observation submitted by Indian Patent Office citing Charaka Samhita"
      }
    ]
  }
};

export function lookupPriorArtBotanical(queryText: string): PriorArtLookupResult | null {
  const clean = queryText.toLowerCase();
  
  for (const [key, entry] of Object.entries(BOTANICAL_DATABASE)) {
    if (
      clean.includes(key) ||
      clean.includes(entry.common_name.toLowerCase()) ||
      clean.includes(entry.sanskrit_name.toLowerCase()) ||
      clean.includes(entry.botanical_name.toLowerCase()) ||
      entry.active_phytochemicals.some(p => clean.includes(p.toLowerCase()))
    ) {
      return {
        query: queryText,
        botanical_name: entry.botanical_name,
        sanskrit_name: entry.sanskrit_name,
        classical_treatise_citations: entry.classical_treatise_citations,
        historical_landmark_cases: entry.historical_patents.map(hp => ({
          case_name: `${entry.common_name} Patent Examination`,
          patent_number: hp.patent_number,
          jurisdiction: "International / Indian IPO",
          revocation_basis: "Section 3(p) / Prior Art Antedating via Classical Literature",
          lesson: hp.outcome
        })),
        tkdl_indicators: {
          indicative_match: true,
          reference_count: entry.tkdl_indication_count,
          csir_tkdl_note: `Contains approximately ${entry.tkdl_indication_count} digitized formulations in CSIR-TKDL across Ayurvedic Pharmacopoeia, Charaka Samhita, Sushruta Samhita, and regional treatises.`
        },
        prior_art_risk_level: 'VERY_HIGH_TK_EXCLUSION',
        strategic_recommendation: entry.patentability_notes
      };
    }
  }

  return null;
}
