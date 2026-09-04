/**
 * Multilingual Translations & Legal Terminology Glossary
 * Preserves technical legal meaning while providing Hindi & Marathi UI.
 */

import { LanguageCode } from './types.ts';

export interface TranslationDict {
  app_title: string;
  app_subtitle: string;
  jurisdiction_india: string;
  jurisdiction_intl: string;
  disclaimer: string;
  tab_dashboard: string;
  tab_ai_assistant: string;
  tab_formulation: string;
  tab_abs: string;
  tab_prior_art: string;
  tab_knowledge_graph: string;
  tab_sources: string;
  tab_escalate: string;
  tab_evaluations: string;
  tab_security: string;
  confidence_high: string;
  confidence_med: string;
  confidence_low: string;
  talk_to_facilitator: string;
  view_source: string;
  why_source: string;
}

export const TRANSLATIONS: Record<LanguageCode, TranslationDict> = {
  en: {
    app_title: "IP-SAKTI Sahayak",
    app_subtitle: "AI-powered Intellectual Property & Regulatory Guidance for Ayurveda",
    jurisdiction_india: "Jurisdiction: India (DPIIT / NBA / AYUSH)",
    jurisdiction_intl: "Jurisdiction: International (WIPO / TRIPS / PCT / Nagoya)",
    disclaimer: "Legal Guidance Notice: This AI system provides information and research assistance based on retrieved sources. It does not provide legal advice, determine legal rights, or replace consultation with a qualified IP professional.",
    tab_dashboard: "Overview",
    tab_ai_assistant: "AI Assistant",
    tab_formulation: "Formulation Classifier",
    tab_abs: "ABS Compliance",
    tab_prior_art: "Prior Art & TK",
    tab_knowledge_graph: "Knowledge Graph",
    tab_sources: "Statutory Sources",
    tab_escalate: "IP Facilitator",
    tab_evaluations: "SIH Benchmark",
    tab_security: "Security & Specs",
    confidence_high: "HIGH CONFIDENCE",
    confidence_med: "MEDIUM CONFIDENCE",
    confidence_low: "LOW CONFIDENCE",
    talk_to_facilitator: "Talk to an IP Facilitator",
    view_source: "View Verified Statute",
    why_source: "Why this Source?"
  },
  hi: {
    app_title: "आईपी-शक्ति सहायक (IP-SAKTI Sahayak)",
    app_subtitle: "आयुर्वेद हेतु एआई-संचालित बौद्धिक संपदा एवं नियामक मार्गदर्शन",
    jurisdiction_india: "अधिकार क्षेत्र: भारत (DPIIT / NBA / आयुष)",
    jurisdiction_intl: "अधिकार क्षेत्र: अंतर्राष्ट्रीय (WIPO / TRIPS / PCT / नागोया)",
    disclaimer: "विधिक मार्गदर्शन सूचना: यह एआई प्रणाली प्राधिकृत स्रोतों पर आधारित सूचना और अनुसंधान सहायता प्रदान करती है। यह औपचारिक विधिक सलाह नहीं है।",
    tab_dashboard: "डैशबोर्ड (Overview)",
    tab_ai_assistant: "एआई सहायक (AI Assistant)",
    tab_formulation: "योग वर्गीकरण (Formulation)",
    tab_abs: "एबीएस अनुपालन (ABS Compliance)",
    tab_prior_art: "पूर्व कला एवं टीके (Prior Art & TK)",
    tab_knowledge_graph: "ज्ञान मानचित्र (Knowledge Graph)",
    tab_sources: "वैधानिक स्रोत (Sources)",
    tab_escalate: "विशेषज्ञ परामर्श (Escalation)",
    tab_evaluations: "मूल्यांकन (SIH Benchmark)",
    tab_security: "सुरक्षा एवं विनिर्देश (Security)",
    confidence_high: "उच्च विश्वसनीयता (HIGH)",
    confidence_med: "मध्यम विश्वसनीयता (MEDIUM)",
    confidence_low: "सीमित साक्ष्य (LOW)",
    talk_to_facilitator: "आईपी विशेषज्ञ से परामर्श करें",
    view_source: "सत्यापित स्रोत देखें",
    why_source: "यह स्रोत क्यों?"
  },
  mr: {
    app_title: "आयपी-शक्ती सहायक (IP-SAKTI Sahayak)",
    app_subtitle: "आयुर्वेदासाठी एआय-आधारित बौद्धिक संपदा आणि नियामक मार्गदर्शन",
    jurisdiction_india: "अधिकार क्षेत्र: भारत (DPIIT / NBA / आयुष)",
    jurisdiction_intl: "अधिकार क्षेत्र: आंतरराष्ट्रीय (WIPO / TRIPS / PCT)",
    disclaimer: "कायदेशीर मार्गदर्शन सूचना: ही प्रणाली अधिकृत स्रोतांवर आधारित माहिती व संशोधन सहाय्य पुरवते. हा अंतिम कायदेशीर सल्ला नाही.",
    tab_dashboard: "डॅशबोर्ड (Overview)",
    tab_ai_assistant: "एआय सहाय्यक (AI Assistant)",
    tab_formulation: "औषध वर्गीकरण (Formulation)",
    tab_abs: "एबीएस अनुपालन (ABS)",
    tab_prior_art: "पूर्व कला आणि टीके (Prior Art)",
    tab_knowledge_graph: "ज्ञान आलेख (Knowledge Graph)",
    tab_sources: "वैधानिक स्रोत (Sources)",
    tab_escalate: "तज्ज्ञ सहाय्य (Escalate)",
    tab_evaluations: "मूल्यांकन (Benchmark)",
    tab_security: "सुरक्षा व तांत्रिक तपशील",
    confidence_high: "उच्च विश्वासार्हता (HIGH)",
    confidence_med: "मध्यम विश्वासार्हता (MEDIUM)",
    confidence_low: "कमी विश्वासार्हता (LOW)",
    talk_to_facilitator: "आयपी तज्ज्ञांशी संपर्क साधा",
    view_source: "अधिकृत स्रोत पाहा",
    why_source: "हा स्रोत का?"
  }
};
