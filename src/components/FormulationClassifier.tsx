import React, { useState } from 'react';
import { FormulationClassificationInput, FormulationClassificationOutput, Jurisdiction } from '../types.ts';
import { 
  Leaf, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  FileText, 
  Scale, 
  ShieldCheck, 
  Layers,
  RotateCcw
} from 'lucide-react';

interface FormulationClassifierProps {
  onRunRAG: (query: string) => void;
  onEscalate: (data: { query: string; answer: string; confidence: string; jurisdiction: Jurisdiction }) => void;
}

export const FormulationClassifier: React.FC<FormulationClassifierProps> = ({ onRunRAG, onEscalate }) => {
  const [formData, setFormData] = useState<FormulationClassificationInput>({
    formulation_name: "AyurImmuno Synergistic Syrup",
    classical_tradition_based: true,
    classical_source_text: "Charaka Samhita & Sharangdhara Samhita",
    is_new_combination: true,
    novel_extraction_process: true,
    novel_therapeutic_indication: false,
    contains_biological_resources: true,
    source_of_biological_resource: "CULTIVATED",
    publicly_available_prior_art: true,
    synergistic_efficacy_data_available: true
  });

  const [result, setResult] = useState<FormulationClassificationOutput | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/formulation/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-700">
            <Leaf className="w-5 h-5" />
            <h2 className="text-xl font-bold text-slate-900">
              Ayurveda Formulation Classification Wizard
            </h2>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg">
            Rule 158-B & Patents Act Evaluator
          </span>
        </div>
        <p className="text-xs text-slate-600">
          Answer the diagnostic questionnaire below to map your proposed formulation to Intellectual Property categories, Traditional Knowledge exclusions (Section 3(p)/3(e)), Access & Benefit Sharing (ABS) mandates, and Ayush drug licensing pathways.
        </p>
      </div>

      {!result ? (
        /* The 9-Question Diagnostic Questionnaire */
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2">
              Formulation Profile & Composition
            </h3>

            {/* Q1: Formulation Name */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                1. Proposed Formulation / Product Name
              </label>
              <input
                id="input-formulation-name"
                type="text"
                value={formData.formulation_name}
                onChange={e => setFormData({ ...formData, formulation_name: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                placeholder="e.g., Brahmi-Ashwagandha Cognitive Drops"
                required
              />
            </div>

            {/* Q2 & Q3: Classical Basis & Treatise */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  2. Is it based on classical Ayurveda texts (First Schedule)?
                </label>
                <div className="flex items-center gap-4 text-xs mt-2">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="classical_based"
                      checked={formData.classical_tradition_based}
                      onChange={() => setFormData({ ...formData, classical_tradition_based: true })}
                      className="text-indigo-600"
                    />
                    <span>Yes, rooted in classical treatises</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="classical_based"
                      checked={!formData.classical_tradition_based}
                      onChange={() => setFormData({ ...formData, classical_tradition_based: false })}
                      className="text-indigo-600"
                    />
                    <span>No, completely novel / synthetic</span>
                  </label>
                </div>
              </div>

              {formData.classical_tradition_based && (
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    3. Classical Source Text / Pharmacopoeia
                  </label>
                  <input
                    type="text"
                    value={formData.classical_source_text || ''}
                    onChange={e => setFormData({ ...formData, classical_source_text: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-amber-700"
                    placeholder="e.g., Charaka Samhita, API, Sharangdhara Samhita"
                  />
                </div>
              )}
            </div>

            {/* Q4 & Q5: Combination & Process */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  4. Is it a new combination of classical herbs?
                </label>
                <div className="flex items-center gap-4 text-xs mt-2">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="is_new_combo"
                      checked={formData.is_new_combination}
                      onChange={() => setFormData({ ...formData, is_new_combination: true })}
                    />
                    <span>Yes (Novel polyherbal ratio)</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="is_new_combo"
                      checked={!formData.is_new_combination}
                      onChange={() => setFormData({ ...formData, is_new_combination: false })}
                    />
                    <span>No (Verbatim classical recipe)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  5. Is there a novel extraction or processing method?
                </label>
                <div className="flex items-center gap-4 text-xs mt-2">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="novel_process"
                      checked={formData.novel_extraction_process}
                      onChange={() => setFormData({ ...formData, novel_extraction_process: true })}
                    />
                    <span>Yes (Novel solvent, microwave, CO2)</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="novel_process"
                      checked={!formData.novel_extraction_process}
                      onChange={() => setFormData({ ...formData, novel_extraction_process: false })}
                    />
                    <span>No (Traditional Kashaya/Svarasa)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Q6 & Q7: Indication & Biological Resources */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  6. Does it claim a new therapeutic indication not in texts?
                </label>
                <div className="flex items-center gap-4 text-xs mt-2">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="novel_indication"
                      checked={formData.novel_therapeutic_indication}
                      onChange={() => setFormData({ ...formData, novel_therapeutic_indication: true })}
                    />
                    <span>Yes (e.g. anti-Alzheimer's, viral)</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="novel_indication"
                      checked={!formData.novel_therapeutic_indication}
                      onChange={() => setFormData({ ...formData, novel_therapeutic_indication: false })}
                    />
                    <span>No (Traditional Rasayana/Balya)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  7. Source of Biological Material
                </label>
                <select
                  value={formData.source_of_biological_resource}
                  onChange={e => setFormData({ ...formData, source_of_biological_resource: e.target.value as any })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-amber-700 bg-white"
                >
                  <option value="CULTIVATED">Cultivated in agricultural land (Farmer transit)</option>
                  <option value="WILD_HARVESTED">Wild harvested from Indian forest/common land</option>
                  <option value="IMPORTED">Imported from outside India (NTAC listed)</option>
                </select>
              </div>
            </div>

            {/* Q8 & Q9: Prior Art & Synergistic Data */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  8. Are ingredients published in research or public domain?
                </label>
                <div className="flex items-center gap-4 text-xs mt-2">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="prior_art"
                      checked={formData.publicly_available_prior_art}
                      onChange={() => setFormData({ ...formData, publicly_available_prior_art: true })}
                    />
                    <span>Yes (Published research exists)</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="prior_art"
                      checked={!formData.publicly_available_prior_art}
                      onChange={() => setFormData({ ...formData, publicly_available_prior_art: false })}
                    />
                    <span>No (Undisclosed formulation)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  9. Is comparative synergy assay data available?
                </label>
                <div className="flex items-center gap-4 text-xs mt-2">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="synergy_data"
                      checked={formData.synergistic_efficacy_data_available}
                      onChange={() => setFormData({ ...formData, synergistic_efficacy_data_available: true })}
                    />
                    <span>Yes (Statistically validated assays)</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="synergy_data"
                      checked={!formData.synergistic_efficacy_data_available}
                      onChange={() => setFormData({ ...formData, synergistic_efficacy_data_available: false })}
                    />
                    <span>No (Theoretical additive concept)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <button
              id="btn-submit-classification"
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition shadow-sm disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Evaluating statutory matrix...' : 'Generate Classification Report'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      ) : (
        /* The Comprehensive Diagnostic Report */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">Classification Evaluation Result</span>
              <h3 className="text-xl font-bold text-slate-900">{result.formulation_name}</h3>
            </div>
            <button
              onClick={resetForm}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Re-evaluate</span>
            </button>
          </div>

          {/* Potential IP Categories with Relevance Scores */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-indigo-700" />
              <span>Potential IP Protection Channels & Relevance Scores</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {result.potential_ip_categories.map((ip, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs font-mono text-slate-900">{ip.category}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                      ip.relevance_score >= 80 ? 'bg-emerald-100 text-emerald-900' :
                      ip.relevance_score >= 50 ? 'bg-amber-100 text-amber-900' : 'bg-rose-100 text-rose-900'
                    }`}>
                      {ip.relevance_score}%
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{ip.rationale}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Traditional Knowledge Flag */}
          <div className={`p-4 rounded-xl border space-y-1.5 text-xs ${
            result.traditional_knowledge_flag.is_tk 
              ? 'bg-amber-50 border-amber-200 text-amber-900' 
              : 'bg-emerald-50 border-emerald-200 text-emerald-900'
          }`}>
            <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-[11px]">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Traditional Knowledge Assessment: {result.traditional_knowledge_flag.is_tk ? 'TK EXCLUSION APPLICABLE' : 'NO DIRECT TK BAR'}</span>
            </div>
            <p className="font-mono font-semibold text-[11px]">Governing Statute: {result.traditional_knowledge_flag.statutory_clause}</p>
            <p className="leading-relaxed">{result.traditional_knowledge_flag.explanation}</p>
          </div>

          {/* ABS & Regulatory Pathway */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* ABS Compliance */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-700" />
                Access & Benefit Sharing (ABS) Status
              </span>
              <div className="space-y-1">
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span>Status:</span>
                  <strong className="text-indigo-900">{result.abs_compliance_relevance.status}</strong>
                </div>
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span>Authority:</span>
                  <span>{result.abs_compliance_relevance.governing_body}</span>
                </div>
                <p className="text-slate-600 pt-1 leading-relaxed">{result.abs_compliance_relevance.explanation}</p>
                {result.abs_compliance_relevance.forms_needed.length > 0 && (
                  <div className="pt-1">
                    <span className="font-semibold block text-[11px]">Required Filings:</span>
                    <ul className="list-disc pl-4 text-slate-700">
                      {result.abs_compliance_relevance.forms_needed.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Regulatory Drug Licensing */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-700" />
                Ayush Drug Licensing Pathway
              </span>
              <div className="space-y-1">
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span>License Category:</span>
                  <strong className="text-emerald-900">{result.regulatory_pathway.license_category}</strong>
                </div>
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span>Authority:</span>
                  <span>{result.regulatory_pathway.authority}</span>
                </div>
                <p className="text-slate-600 pt-1 leading-relaxed">{result.regulatory_pathway.relevant_rule}</p>
              </div>
            </div>
          </div>

          {/* Recommended Next Actions */}
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 space-y-2 text-xs">
            <span className="font-bold text-slate-900">Actionable Procedural Roadmap</span>
            <ul className="space-y-1 pl-4 list-disc text-slate-700">
              {result.recommended_next_action.map((act, i) => (
                <li key={i}>{act}</li>
              ))}
            </ul>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => onRunRAG(`Patentability assessment and Section 3(p) analysis for ${result.formulation_name}`)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition shadow-sm"
            >
              <span>Verify in RAG Assistant</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onEscalate({
                query: `Formulation Classification: ${result.formulation_name}`,
                answer: `Evaluated as ${result.regulatory_pathway.license_category}. Traditional knowledge flag: ${result.traditional_knowledge_flag.is_tk}`,
                confidence: 'HIGH',
                jurisdiction: 'INDIA'
              })}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition shadow-sm"
            >
              <span>Escalate to Empanelled Facilitator</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
