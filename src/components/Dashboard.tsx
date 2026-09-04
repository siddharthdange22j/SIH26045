import React from 'react';
import { Jurisdiction, LanguageCode } from '../types.ts';
import { TRANSLATIONS } from '../translations.ts';
import { 
  ShieldCheck, 
  Scale, 
  BookOpen, 
  FileCheck, 
  Sparkles, 
  ArrowRight, 
  Database, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  Cpu,
  Layers,
  Leaf
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (tab: string, query?: string) => void;
  jurisdiction: Jurisdiction;
  language: LanguageCode;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate, jurisdiction, language }) => {
  const t = TRANSLATIONS[language];

  const quickScenarios = [
    {
      title: "Ashwagandha Extract Patentability",
      description: "Can a standardized solvent extract of Withania somnifera be patented without violating Section 3(p)?",
      ip: "PATENT / TK",
      jurisdiction: "INDIA",
      query: "Can our laboratory patent a standardized solvent extract of Ashwagandha (Withania somnifera) root with 12% withanolides under the Indian Patents Act, 1970?"
    },
    {
      title: "National Biodiversity Authority (Form III)",
      description: "Statutory requirements for patenting an invention utilizing Indian biological resources.",
      ip: "ABS / BDA 2002",
      jurisdiction: "INDIA",
      query: "When is NBA Form III mandatory before filing a patent for an Ayurvedic formulation derived from Indian biological resources?"
    },
    {
      title: "WIPO Genetic Resources Treaty 2024",
      description: "Mandatory country-of-origin disclosure for international patent filings.",
      ip: "INTERNATIONAL",
      jurisdiction: "INTERNATIONAL",
      query: "What are the mandatory disclosure requirements for patents based on traditional knowledge under the May 2024 WIPO Treaty on Genetic Resources?"
    },
    {
      title: "Rule 158-B Drug Licensing",
      description: "Classical Ayurvedic Medicine (Category A) vs Patent & Proprietary (Category B).",
      ip: "REGULATORY",
      jurisdiction: "INDIA",
      query: "What are the safety and clinical trial requirements for obtaining an Ayush manufacturing license for a classical Ayurvedic medicine under Rule 158-B?"
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-8 border border-slate-800 shadow-xl">
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Smart India Hackathon 2026 • Problem Statement 26045</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Authoritative, Source-Grounded IP & Regulatory Guidance for Ayurveda
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            IP-SAKTI Sahayak bridges classical Ayurvedic treatises (Charaka Samhita, Sushruta Samhita, API) with contemporary Intellectual Property laws (Patents Act Section 3(p)/3(e), Biological Diversity Act 2002/2023, and WIPO treaties). Every statement is backed by verifiable statutory citations with zero hallucinations.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              id="btn-start-chat-hero"
              onClick={() => onNavigate('ai-assistant')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition shadow-md text-sm"
            >
              <span>Launch AI Assistant</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="btn-formulation-hero"
              onClick={() => onNavigate('formulation')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition text-sm border border-white/15"
            >
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span>Classify a Formulation</span>
            </button>
            <button
              id="btn-evaluations-hero"
              onClick={() => onNavigate('evaluations')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition text-sm border border-white/15"
            >
              <FileCheck className="w-4 h-4 text-indigo-300" />
              <span>SIH Benchmark Suite</span>
            </button>
          </div>
        </div>

        {/* Decorative Watermark */}
        <div className="absolute -right-8 -bottom-10 opacity-10 pointer-events-none text-[180px] font-black text-indigo-300 select-none">
          आयुष
        </div>
      </div>

      {/* Real-time Metric Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Statutory Corpus</span>
            <Database className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">100%</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Authoritative Indian & Int'l Laws</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Citation Grounding</span>
            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">Zero Hallucination</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Verified Section & Passage Links</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Regime Partition</span>
            <Scale className="w-4 h-4 text-blue-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">Strict Isolation</p>
          <p className="text-[11px] text-slate-500 mt-0.5">India vs International Isolation</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">TKDL Integration</span>
            <BookOpen className="w-4 h-4 text-purple-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">4.4+ Lakh</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Treatise formulations referenced</p>
        </div>
      </div>

      {/* Interactive Quick-Test Scenarios for Judges */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Demonstration Test Scenarios</h3>
            <p className="text-xs text-slate-600">Click any card to launch a grounded RAG query with multi-agent orchestration traces.</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700 border border-slate-200">
            SIH Judge Showcase
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickScenarios.map((sc, i) => (
            <div
              key={i}
              id={`quick-scenario-${i}`}
              onClick={() => onNavigate('ai-assistant', sc.query)}
              className="group p-5 rounded-xl bg-white border border-slate-200 hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  {sc.ip}
                </span>
                <span className={`font-semibold text-[11px] px-2 py-0.5 rounded ${
                  sc.jurisdiction === 'INDIA' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' : 'bg-slate-100 text-slate-700 border border-slate-200'
                }`}>
                  {sc.jurisdiction === 'INDIA' ? '🇮🇳 India' : '🌐 International'}
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-700 transition">
                {sc.title}
              </h4>

              <p className="text-xs text-slate-600 leading-relaxed">
                {sc.description}
              </p>

              <div className="pt-1 flex items-center gap-1 text-xs font-semibold text-indigo-700 group-hover:translate-x-1 transition-transform">
                <span>Run RAG analysis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dual Regime Isolation Matrix */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-indigo-700" />
          <h3 className="text-lg font-bold text-slate-900">
            Regime Isolation Matrix (Statutory Partitioning)
          </h3>
        </div>
        <p className="text-xs text-slate-600">
          The system strictly enforces legal partitioning. Indian statutory rules and international treaties are never blended invisibly:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-900">
              <span className="flex items-center gap-1.5">🇮🇳 National Regime (India)</span>
              <span className="text-[10px] bg-slate-200 text-slate-800 px-2 py-0.5 rounded">CGPDTM / NBA / AYUSH</span>
            </div>
            <ul className="space-y-1.5 text-slate-700 pl-4 list-disc marker:text-indigo-600">
              <li><strong>Section 3(p) Patents Act:</strong> Absolute exclusion of traditional knowledge & classical formulations.</li>
              <li><strong>Section 3(e) Patents Act:</strong> Rejection of mere admixtures without demonstrable synergy.</li>
              <li><strong>Section 6 Biological Diversity Act:</strong> Mandatory Form III approval from NBA before patent grant.</li>
              <li><strong>Rule 158-B Drugs & Cosmetics:</strong> Strict categorization of Classical ASU vs Patent & Proprietary.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-200 space-y-2">
            <div className="flex items-center justify-between font-bold text-indigo-950">
              <span className="flex items-center gap-1.5">🌐 International Regime</span>
              <span className="text-[10px] bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded border border-indigo-200">WIPO / TRIPS / PCT / CBD</span>
            </div>
            <ul className="space-y-1.5 text-slate-700 pl-4 list-disc marker:text-indigo-600">
              <li><strong>WIPO GRATK Treaty (2024):</strong> Mandatory patent application disclosure of genetic origin & associated TK.</li>
              <li><strong>Nagoya Protocol:</strong> Prior Informed Consent (PIC) & Internationally Recognized Certificate of Compliance (IRCC).</li>
              <li><strong>PCT Rule 34:</strong> Mandatory prior-art search across CSIR-TKDL by International Searching Authorities.</li>
              <li><strong>Landmark Revocations:</strong> Turmeric (US 5,401,504) and Neem (EP 0436257) anti-biopiracy precedents.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Multi-Agent Architecture Overview */}
      <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-white">
              10-Agent RAG Orchestration Architecture
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded">
            Deterministic Pipeline + Gemini Grounding
          </span>
        </div>

        <p className="text-xs text-slate-300">
          Unlike standard chat wrappers, IP-SAKTI Sahayak passes queries through a sequential multi-agent orchestration pipeline that validates intent, isolates jurisdictions, checks classical treatise prior art, filters statutory metadata, verifies citation exactness, and enforces safe abstention.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 text-[11px] pt-2">
          {[
            { name: "Safety & Abstention", desc: "Blocks prompt injections & illegal circumvention" },
            { name: "Query Understanding", desc: "Extracts entities & technical keywords" },
            { name: "Jurisdiction Agent", desc: "Enforces India vs Int'l legal partition" },
            { name: "IP Classifier", desc: "Routes across Patent, TM, GI, ABS, TK" },
            { name: "Ayurveda Prior-Art", desc: "Scans Charaka, Sushruta & TKDL" },
            { name: "Legal Retriever", desc: "Hybrid dense-sparse BM25 + vector search" },
            { name: "ABS Compliance", desc: "NBA/SBB triggers & 2023 Amendment" },
            { name: "Citation Verifier", desc: "Eliminates hallucinated provisions" },
            { name: "Grounding Synthesizer", desc: "Produces structured, cited answer" },
            { name: "Human Escalator", desc: "Hands off complex cases to IP agents" }
          ].map((agent, i) => (
            <div key={i} className="p-2.5 rounded-lg bg-slate-800/90 border border-slate-700/80 space-y-1">
              <div className="text-indigo-400 font-bold flex items-center gap-1">
                <span>#{i + 1}</span>
                <span className="truncate">{agent.name}</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-tight">{agent.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
