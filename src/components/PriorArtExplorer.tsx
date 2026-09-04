import React, { useState, useEffect } from 'react';
import { PriorArtLookupResult } from '../types.ts';
import { 
  BookOpen, 
  Search, 
  Leaf, 
  FileText, 
  ShieldAlert, 
  Award, 
  ExternalLink, 
  ArrowRight,
  Database
} from 'lucide-react';

interface PriorArtExplorerProps {
  onRunRAG: (query: string) => void;
}

export const PriorArtExplorer: React.FC<PriorArtExplorerProps> = ({ onRunRAG }) => {
  const [query, setQuery] = useState('ashwagandha');
  const [result, setResult] = useState<PriorArtLookupResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const popularHerbs = [
    { label: "Ashwagandha", key: "ashwagandha" },
    { label: "Turmeric (Haridra)", key: "turmeric" },
    { label: "Neem (Nimba)", key: "neem" },
    { label: "Tulsi (Holy Basil)", key: "tulsi" },
    { label: "Brahmi (Bacopa)", key: "brahmi" },
    { label: "Triphala", key: "triphala" },
    { label: "Chyawanprash", key: "chyawanprash" }
  ];

  const handleSearch = async (term?: string) => {
    const q = term || query;
    if (!q.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/prior-art/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearch('ashwagandha');
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-700">
            <BookOpen className="w-5 h-5" />
            <h2 className="text-xl font-bold text-slate-900">
              Classical Prior Art & Traditional Knowledge Explorer
            </h2>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg">
            TKDL & Landmark Case Antedating
          </span>
        </div>
        <p className="text-xs text-slate-600">
          Search Ayurvedic herbs and polyherbal formulations to discover classical treatise citations (Charaka, Sushruta, Ashtanga Hridaya), digitized CSIR-TKDL indications, landmark foreign patent revocation precedents, and patentability strategies.
        </p>
      </div>

      {/* Search Input & Quick Herb Chips */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by botanical name (Withania), Sanskrit name (Haridra), or formulation..."
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition shadow-sm"
          >
            {isLoading ? 'Scanning...' : 'Search Prior Art'}
          </button>
        </form>

        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-slate-500 font-medium">Quick Benchmarks:</span>
          {popularHerbs.map(h => (
            <button
              key={h.key}
              onClick={() => {
                setQuery(h.key);
                handleSearch(h.key);
              }}
              className="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-300 text-slate-700 transition"
            >
              {h.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Display */}
      {result && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          {/* Herb Title Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-200">
            <div>
              <span className="text-[11px] font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                Classical Botanical Profile
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                {result.sanskrit_name}
              </h3>
              <p className="italic text-slate-600 text-xs mt-0.5">
                Botanical Taxon: <strong className="text-slate-900">{result.botanical_name}</strong>
              </p>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-rose-100 text-rose-900 border border-rose-300">
              {result.prior_art_risk_level}
            </span>
          </div>

          {/* Classical Treatise Shloka Citations */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-700" />
              <span>Classical Treatise Citations (Non-Patent Literature Prior Art)</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {result.classical_treatise_citations.map((c, i) => (
                <div key={i} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
                  <div className="font-bold text-slate-900 text-[13px]">{c.treatise}</div>
                  <div className="font-mono text-slate-600 text-[11px]">{c.shloka_reference}</div>
                  <div className="pt-1 flex flex-wrap gap-1">
                    {c.therapeutic_indications.map((ind, indIdx) => (
                      <span key={indIdx} className="px-2 py-0.5 rounded bg-white text-slate-700 text-[10px] border border-slate-200">
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CSIR-TKDL Integration Indicator */}
          <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 space-y-2 text-xs">
            <div className="flex items-center justify-between font-bold text-indigo-950">
              <span className="flex items-center gap-1.5">
                <Database className="w-4 h-4 text-indigo-700" />
                Traditional Knowledge Digital Library (TKDL) Presence
              </span>
              <span className="bg-indigo-200 text-indigo-900 px-2 py-0.5 rounded font-mono text-[11px]">
                {result.tkdl_indicators.reference_count}+ Documented Formulations
              </span>
            </div>
            <p className="text-indigo-900 leading-relaxed text-[11px]">
              {result.tkdl_indicators.csir_tkdl_note}
            </p>
          </div>

          {/* Landmark Prior Art Cases */}
          {result.historical_landmark_cases.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Landmark Case Law & Patent Precedents</span>
              </h4>
              <div className="space-y-2.5 text-xs">
                {result.historical_landmark_cases.map((lc, i) => (
                  <div key={i} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>{lc.case_name}</span>
                      <span className="font-mono text-slate-600 text-[11px]">{lc.patent_number}</span>
                    </div>
                    <p className="text-[11px] text-slate-600"><strong>Legal Ground:</strong> {lc.revocation_basis}</p>
                    <p className="text-[11px] text-amber-800 font-semibold pt-0.5">↳ {lc.lesson}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Strategic Recommendation */}
          <div className="p-4 rounded-xl bg-slate-900 text-slate-200 space-y-1.5 text-xs">
            <span className="font-bold text-indigo-400 font-mono text-[11px] uppercase tracking-wider block">
              Strategic Patentability Guidance
            </span>
            <p className="leading-relaxed text-[12px] text-slate-300">
              {result.strategic_recommendation}
            </p>
          </div>

          {/* Trigger RAG */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => onRunRAG(`Patentability analysis and Section 3(p) prior-art review for ${result.botanical_name}`)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition shadow-sm"
            >
              <span>Verify in RAG Pipeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
