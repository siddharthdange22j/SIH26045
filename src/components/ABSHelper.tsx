import React, { useState } from 'react';
import { ABSAssessmentInput, ABSAssessmentOutput, Jurisdiction } from '../types.ts';
import { 
  Scale, 
  ShieldCheck, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  ArrowRight, 
  ExternalLink,
  Info
} from 'lucide-react';

interface ABSHelperProps {
  onRunRAG: (query: string) => void;
  onEscalate: (data: { query: string; answer: string; confidence: string; jurisdiction: Jurisdiction }) => void;
}

export const ABSHelper: React.FC<ABSHelperProps> = ({ onRunRAG, onEscalate }) => {
  const [input, setInput] = useState<ABSAssessmentInput>({
    activity_type: "IPR_APPLICATION",
    applicant_category: "INDIAN_ENTITY_WITHOUT_FOREIGN_INVESTMENT",
    biological_resource_source: "INDIAN_CULTIVATED",
    annual_turnover_estimate_inr: 5000000
  });

  const [result, setResult] = useState<ABSAssessmentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/abs/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-700">
            <Scale className="w-5 h-5" />
            <h2 className="text-xl font-bold text-slate-900">
              Access & Benefit Sharing (ABS) Compliance Helper
            </h2>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg">
            Biological Diversity Act 2002 & 2023 Amendment
          </span>
        </div>
        <p className="text-xs text-slate-600">
          Determine whether your Ayurvedic commercial activity, IPR filing, or botanical sourcing requires prior approval from the National Biodiversity Authority (NBA) or intimation to the State Biodiversity Board (SBB), and check exemption status under the 2023 Amendment.
        </p>
      </div>

      {/* Calculator Input Form */}
      <form onSubmit={handleEvaluate} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          {/* Activity Type */}
          <div>
            <label className="block font-bold text-slate-800 mb-1.5">
              1. Nature of Activity Planned
            </label>
            <select
              value={input.activity_type}
              onChange={e => setInput({ ...input, activity_type: e.target.value as any })}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
            >
              <option value="IPR_APPLICATION">Filing a Patent / IPR Application (Section 6)</option>
              <option value="COMMERCIAL_UTILIZATION">Commercial Manufacturing / Scale Sale (Section 7)</option>
              <option value="RESEARCH">Scientific / Academic Research (Section 3)</option>
              <option value="TRANSFER_OF_RESULTS">Transfer of Research Results Abroad (Section 4)</option>
            </select>
          </div>

          {/* Applicant Category */}
          <div>
            <label className="block font-bold text-slate-800 mb-1.5">
              2. Applicant Legal Entity Type
            </label>
            <select
              value={input.applicant_category}
              onChange={e => setInput({ ...input, applicant_category: e.target.value as any })}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
            >
              <option value="INDIAN_ENTITY_WITHOUT_FOREIGN_INVESTMENT">Indian Citizen / Entity (100% Domestic Capital)</option>
              <option value="FOREIGN_ENTITY_OR_INDIAN_CO_WITH_FOREIGN_INVESTMENT">Foreign National / Indian Company with foreign equity/FDI</option>
              <option value="REGISTERED_AYUSH_PRACTITIONER">Registered Traditional Ayush Practitioner (Vaidya/Hakim)</option>
            </select>
          </div>

          {/* Biological Resource Source */}
          <div>
            <label className="block font-bold text-slate-800 mb-1.5">
              3. Origin / Sourcing of Biological Material
            </label>
            <select
              value={input.biological_resource_source}
              onChange={e => setInput({ ...input, biological_resource_source: e.target.value as any })}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
            >
              <option value="INDIAN_CULTIVATED">Cultivated by Indian farmers / agricultural land</option>
              <option value="INDIAN_WILD_HARVESTED">Wild-harvested from Indian forest or wasteland</option>
              <option value="IMPORTED_COMMODITY_NTAC">Imported commodity / Normally Traded Commodity (NTAC)</option>
            </select>
          </div>

          {/* Turnover */}
          <div>
            <label className="block font-bold text-slate-800 mb-1.5">
              4. Estimated Annual Ex-Factory Turnover (INR)
            </label>
            <input
              type="number"
              value={input.annual_turnover_estimate_inr || ''}
              onChange={e => setInput({ ...input, annual_turnover_estimate_inr: Number(e.target.value) })}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              placeholder="e.g., 5000000 (50 Lakhs)"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-slate-200 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition shadow-sm disabled:opacity-50"
          >
            <span>{isLoading ? 'Computing ABS Mandate...' : 'Assess ABS Compliance'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Results Output */}
      {result && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">Statutory Determination</span>
              <h3 className="text-lg font-bold text-slate-900">
                ABS Compliance Assessment Matrix
              </h3>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${
              result.abs_relevance === 'EXEMPTED_UNDER_2023_ACT' || result.abs_relevance === 'NOT_IDENTIFIED'
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-amber-100 text-amber-800 border border-amber-300'
            }`}>
              {result.abs_relevance.replace(/_/g, ' ')}
            </span>
          </div>

          {/* Key Authority & Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="font-bold text-slate-800 block">Designated Statutory Authority:</span>
              <p className="font-mono text-slate-900 font-bold text-sm">
                {result.authority_to_approach === 'NATIONAL_BIODIVERSITY_AUTHORITY_NBA' ? 'National Biodiversity Authority (NBA Chennai)' :
                 result.authority_to_approach === 'STATE_BIODIVERSITY_BOARD_SBB' ? 'State Biodiversity Board (SBB)' : 'EXEMPT FROM STATUTORY CLEARANCE'}
              </p>
              <div className="pt-1">
                <span className="font-semibold text-slate-600 block text-[11px]">Governing Provisions:</span>
                <ul className="list-disc pl-4 text-slate-700">
                  {result.applicable_sections.map((sec, idx) => (
                    <li key={idx} className="font-mono">{sec}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="font-bold text-slate-800 block">Monetary Benefit-Sharing Estimate:</span>
              <p className="text-slate-900 font-semibold text-xs leading-relaxed">
                {result.benefit_sharing_estimate}
              </p>
              <p className="text-[11px] text-slate-500 pt-1">
                Calculated as per National Biodiversity Authority (Guidelines on Access and Benefit Sharing) Regulations, 2014.
              </p>
            </div>
          </div>

          {/* Mandatory Statutory Forms */}
          {result.mandatory_forms.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-700" />
                <span>Mandatory Statutory Filings & Approval Deadlines</span>
              </h4>
              <div className="space-y-2 text-xs">
                {result.mandatory_forms.map((form, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <div className="flex items-center justify-between">
                      <strong className="font-mono text-slate-900 font-bold">{form.form_id}: {form.name}</strong>
                    </div>
                    <p className="text-slate-600 text-[11px]">{form.purpose}</p>
                    <div className="pt-1 text-[11px] font-semibold text-amber-800">
                      <strong>Statutory Deadline:</strong> {form.deadline}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Compliance Checklist */}
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 space-y-2 text-xs">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Step-by-Step Statutory Compliance Checklist</span>
            </span>
            <ul className="space-y-1.5 pl-4 list-disc text-slate-700">
              {result.compliance_checklist.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Statutory Citations */}
          <div className="pt-2 border-t border-slate-200 space-y-2 text-xs">
            <span className="font-bold text-slate-800">Direct Statutory Citations:</span>
            <div className="space-y-2">
              {result.statutory_citations.map((c, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-semibold text-slate-900">{c.title} ({c.section})</div>
                  <div className="italic text-[11px] text-slate-700">"{c.matched_passage}"</div>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              onClick={() => onRunRAG("What are the penalties for non-compliance with Section 6 of the Biological Diversity Act?")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition shadow-sm"
            >
              <span>Explore Section 6 Penalties in RAG</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onEscalate({
                query: `ABS Filing Assistance for ${input.activity_type}`,
                answer: `Requires ${result.authority_to_approach}. Status: ${result.abs_relevance}`,
                confidence: 'HIGH',
                jurisdiction: 'INDIA'
              })}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition shadow-sm"
            >
              <span>Connect with NBA Empanelled Counsel</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
