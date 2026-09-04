import React, { useState, useEffect } from 'react';
import { AuthoritativeSource, Jurisdiction, IPType } from '../types.ts';
import { 
  BookOpen, 
  Search, 
  Filter, 
  CheckCircle2, 
  ExternalLink, 
  Plus, 
  ShieldCheck, 
  FileText, 
  Clock,
  ArrowRight
} from 'lucide-react';

interface SourceCatalogProps {
  onRunRAG: (query: string) => void;
}

export const SourceCatalog: React.FC<SourceCatalogProps> = ({ onRunRAG }) => {
  const [sources, setSources] = useState<AuthoritativeSource[]>([]);
  const [jurisdictionFilter, setJurisdictionFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState<AuthoritativeSource | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // New source form state
  const [newSource, setNewSource] = useState<Partial<AuthoritativeSource>>({
    document_id: 'IN-AYUSH-NEW-2026',
    title: 'Ayush Good Clinical Practice (GCP) Guidelines for ASU Drugs',
    authority: 'Ministry of Ayush, Government of India',
    country: 'India',
    jurisdiction: 'INDIA',
    document_type: 'GUIDELINES',
    section: 'Section 4 - Safety & Bioequivalence',
    publication_date: '2026-01-15',
    effective_date: '2026-02-01',
    version: 'Version 2.1 (Gazette Notified)',
    source_url: 'https://ayush.gov.in',
    status: 'ACTIVE_CURRENT',
    reliability_score: 95,
    summary: 'Standard clinical trial and safety monitoring protocols for proprietary Ayurveda formulations.',
    full_text_passage: 'Every manufacturer seeking patent and proprietary drug licensing must maintain documented GCP adherence.',
    key_provisions: ['GCP Compliance', 'Bioavailability', 'Adverse Drug Reporting'],
    IP_type: ['REGULATORY_AYUSH', 'PATENT'],
    verified_by: 'Ayush National Review Board',
    last_verified: new Date().toISOString().split('T')[0]
  });

  const fetchSources = async () => {
    try {
      const params = new URLSearchParams();
      if (jurisdictionFilter !== 'ALL') params.append('jurisdiction', jurisdictionFilter);
      if (searchQuery) params.append('query', searchQuery);

      const res = await fetch(`/api/sources?${params.toString()}`);
      const data = await res.json();
      setSources(data);
      if (data.length > 0 && !selectedSource) {
        setSelectedSource(data[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSources();
  }, [jurisdictionFilter]);

  const handleVerify = async (id: string) => {
    setIsVerifying(true);
    try {
      const res = await fetch(`/api/admin/sources/${id}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verifierName: 'SIH 2026 Judicial Assessment Panel' })
      });
      const updated = await res.json();
      setSelectedSource(updated);
      fetchSources();
    } catch (err) {
      console.error(err);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleAddSource = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/admin/sources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSource)
      });
      setShowAddModal(false);
      fetchSources();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-900">
            <BookOpen className="w-5 h-5 text-indigo-700" />
            <h2 className="text-xl font-bold text-slate-900">
              Authoritative Statutory Repository & Source Manager
            </h2>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Statutory Source</span>
          </button>
        </div>
        <p className="text-xs text-slate-600">
          Browse verified legal statutes, Gazette notifications, judicial precedents, and international treaties that ground IP-SAKTI Sahayak's RAG answers.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">Jurisdiction:</span>
          {['ALL', 'INDIA', 'INTERNATIONAL'].map(j => (
            <button
              key={j}
              onClick={() => setJurisdictionFilter(j)}
              className={`px-3 py-1 rounded-md transition font-medium ${
                jurisdictionFilter === j
                  ? 'bg-slate-900 text-white font-bold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {j}
            </button>
          ))}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); fetchSources(); }} className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search statutes, sections, provisions..."
              className="pl-8 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
            />
          </div>
          <button
            type="submit"
            className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow-sm"
          >
            Search
          </button>
        </form>
      </div>

      {/* Split List & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Source List (Left) */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-2.5 max-h-[640px] overflow-y-auto">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-900">Documents ({sources.length})</span>
            <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">All Verified</span>
          </div>

          {sources.map(src => {
            const isSelected = selectedSource?.document_id === src.document_id;
            return (
              <div
                key={src.document_id}
                onClick={() => setSelectedSource(src)}
                className={`p-3 rounded-xl border text-xs cursor-pointer transition-all space-y-1 ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/70 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-indigo-700 font-bold">{src.section}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    src.jurisdiction === 'INDIA' ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-200 text-slate-800'
                  }`}>
                    {src.jurisdiction}
                  </span>
                </div>
                <h4 className="font-semibold text-slate-900 leading-snug line-clamp-2">
                  {src.title}
                </h4>
                <p className="text-[11px] text-slate-500 truncate">{src.authority}</p>
              </div>
            );
          })}
        </div>

        {/* Source Details Inspector (Right 2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          {selectedSource ? (
            <div className="space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-slate-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      {selectedSource.document_id}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded border border-emerald-300">
                      Score: {selectedSource.reliability_score}/100
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">
                    {selectedSource.title}
                  </h3>
                  <p className="text-xs text-slate-600">
                    Authority: <strong className="text-slate-900">{selectedSource.authority}</strong> • Jurisdiction: <strong className="text-slate-900">{selectedSource.jurisdiction}</strong>
                  </p>
                </div>

                <button
                  onClick={() => handleVerify(selectedSource.document_id)}
                  disabled={isVerifying}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-900 text-xs font-semibold hover:bg-emerald-100 transition shadow-sm"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{isVerifying ? 'Verifying...' : 'Re-verify Statute'}</span>
                </button>
              </div>

              {/* Version & Verification Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[10px]">Section</span>
                  <strong className="text-slate-900">{selectedSource.section}</strong>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[10px]">Version</span>
                  <strong className="text-slate-900">{selectedSource.version}</strong>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[10px]">Published</span>
                  <strong className="text-slate-900">{selectedSource.publication_date}</strong>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[10px]">Last Verified</span>
                  <strong className="text-emerald-800">{selectedSource.last_verified}</strong>
                </div>
              </div>

              {/* Full Grounding Passage */}
              <div className="space-y-2">
                <span className="text-sm font-bold text-slate-900 block">
                  Authoritative Statutory Passage (RAG Retrieval Grounding)
                </span>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm italic leading-relaxed">
                  "{selectedSource.full_text_passage}"
                </div>
              </div>

              {/* Summary & Provisions */}
              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-bold text-slate-800 block mb-1">Executive Legal Summary:</span>
                  <p className="text-slate-700 leading-relaxed">{selectedSource.summary}</p>
                </div>

                <div>
                  <span className="font-bold text-slate-800 block mb-1.5">Key Legal Provisions Indexed:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedSource.key_provisions.map((prov, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-800 font-medium">
                        {prov}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                {selectedSource.source_url && (
                  <a
                    href={selectedSource.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-indigo-700 hover:underline font-semibold"
                  >
                    <span>View Official Government Publication</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                <button
                  onClick={() => onRunRAG(`Analyze statutory scope of ${selectedSource.title} (${selectedSource.section})`)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition shadow-sm"
                >
                  <span>Query in RAG Assistant</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 text-xs">
              Select a source from the list to view statutory provisions.
            </div>
          )}
        </div>
      </div>

      {/* Add Source Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900">
              Ingest New Authoritative Statutory Source
            </h3>
            <form onSubmit={handleAddSource} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Document Identifier</label>
                <input
                  type="text"
                  value={newSource.document_id}
                  onChange={e => setNewSource({ ...newSource, document_id: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-600"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-slate-800 mb-1">Title</label>
                <input
                  type="text"
                  value={newSource.title}
                  onChange={e => setNewSource({ ...newSource, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-600"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Authority</label>
                  <input
                    type="text"
                    value={newSource.authority}
                    onChange={e => setNewSource({ ...newSource, authority: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-600"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Jurisdiction</label>
                  <select
                    value={newSource.jurisdiction}
                    onChange={e => setNewSource({ ...newSource, jurisdiction: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-900"
                  >
                    <option value="INDIA">INDIA</option>
                    <option value="INTERNATIONAL">INTERNATIONAL</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-800 mb-1">Verbatim Statutory Passage</label>
                <textarea
                  rows={3}
                  value={newSource.full_text_passage}
                  onChange={e => setNewSource({ ...newSource, full_text_passage: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-600"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition shadow-sm"
                >
                  Ingest & Index Source
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
