import React, { useState, useEffect } from 'react';
import { FacilitatorCase, Jurisdiction, IPType } from '../types.ts';
import { 
  UserCheck, 
  Plus, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Filter, 
  MessageSquare, 
  Send,
  Building,
  Mail,
  Phone,
  Scale
} from 'lucide-react';

interface EscalationPortalProps {
  initialCaseData?: {
    query: string;
    answer: string;
    confidence: string;
    jurisdiction: Jurisdiction;
  } | null;
}

export const EscalationPortal: React.FC<EscalationPortalProps> = ({ initialCaseData }) => {
  const [cases, setCases] = useState<FacilitatorCase[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(!!initialCaseData);

  // Form State
  const [formData, setFormData] = useState({
    applicant_name: "Dr. Arvind Vaidya",
    applicant_organization: "Shree Dhootapapeshwar Research Labs",
    email: "arvind.vaidya@ayur-research.org",
    phone: "+91 98200 45678",
    applicant_type: "RESEARCHER" as FacilitatorCase['applicant_type'],
    jurisdiction: initialCaseData?.jurisdiction || "INDIA" as Jurisdiction,
    ip_category: "PATENT" as IPType,
    title: initialCaseData ? `Advisory regarding: ${initialCaseData.query.substring(0, 45)}...` : "Patent & ABS Consultation for Synergistic Classical Extract",
    user_query: initialCaseData?.query || "We need formal advice on filing NBA Form III and overcoming Section 3(p) objections for our cold-macerated polyherbal extract.",
    ai_response_summary: initialCaseData?.answer || "Classical formulation barred under Section 3(p) unless synergistic non-obvious bioactivity is proven with Form III clearance.",
    confidence_at_escalation: (initialCaseData?.confidence || "MEDIUM") as any,
    priority: "HIGH" as FacilitatorCase['priority']
  });

  const fetchCases = async () => {
    try {
      const res = await fetch('/api/cases');
      const data = await res.json();
      setCases(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const handleCreateCase = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/escalate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setShowSubmitModal(false);
      fetchCases();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStatus = async (caseId: string, newStatus: FacilitatorCase['status']) => {
    try {
      await fetch(`/api/cases/${caseId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          facilitator: 'Adv. Meenakshi Sundaram (Registered Patent Agent IN/PA-842)'
        })
      });
      fetchCases();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredCases = statusFilter === 'ALL' 
    ? cases 
    : cases.filter(c => c.status === statusFilter);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-900">
            <UserCheck className="w-5 h-5 text-indigo-700" />
            <h2 className="text-xl font-bold text-slate-900">
              Human IP Facilitator Escalation System
            </h2>
          </div>
          <button
            onClick={() => setShowSubmitModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Escalation Ticket</span>
          </button>
        </div>
        <p className="text-xs text-slate-600">
          Seamlessly transition complex queries, uncertain prior-art assessments, or statutory filings to empanelled Ayush Patent Agents, Trademark Attorneys, and National Biodiversity Authority legal facilitators.
        </p>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar text-xs font-medium">
        {['ALL', 'SUBMITTED', 'ASSIGNED', 'IN_REVIEW', 'RESPONDED', 'CLOSED'].map(st => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1.5 rounded-lg border transition whitespace-nowrap ${
              statusFilter === st
                ? 'bg-slate-900 text-white border-slate-900 font-bold'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {st.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      {/* Cases List */}
      <div className="space-y-3">
        {filteredCases.map(c => (
          <div key={c.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100 text-xs">
              <div className="flex items-center gap-2 font-mono">
                <strong className="text-slate-900">{c.id}</strong>
                <span>•</span>
                <span className="text-slate-500">{new Date(c.created_at).toLocaleDateString()}</span>
                <span>•</span>
                <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  {c.ip_category} ({c.jurisdiction})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  c.priority === 'URGENT' ? 'bg-rose-100 text-rose-800' :
                  c.priority === 'HIGH' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'
                }`}>
                  {c.priority} PRIORITY
                </span>

                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono ${
                  c.status === 'RESPONDED' ? 'bg-emerald-100 text-emerald-800' :
                  c.status === 'IN_REVIEW' ? 'bg-blue-100 text-blue-800' :
                  c.status === 'ASSIGNED' ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-100 text-slate-800'
                }`}>
                  {c.status.replace(/_/g, ' ')}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-base font-bold text-slate-900">{c.title}</h4>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                <strong>Applicant Query:</strong> "{c.user_query}"
              </p>
              <p className="text-xs text-slate-500 italic mt-1">
                <strong>AI Summary:</strong> {c.ai_response_summary}
              </p>
            </div>

            {/* Applicant & Facilitator Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs border-t border-slate-100">
              <div className="space-y-1">
                <span className="text-slate-500 block text-[10px] font-mono">APPLICANT DETAILS:</span>
                <div className="text-slate-800 font-semibold">{c.applicant_name} ({c.applicant_type})</div>
                <div className="text-slate-600 text-[11px]">{c.applicant_organization} • {c.email}</div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 block text-[10px] font-mono">ASSIGNED FACILITATOR:</span>
                <div className="text-slate-900 font-semibold">{c.assigned_facilitator || "Pending assignment by DPIIT cell"}</div>
                <div className="text-slate-600 text-[11px]">{c.assigned_facilitator_role || "Empanelled Ayush IP Facilitator"}</div>
              </div>
            </div>

            {/* Status Change Buttons for Judges/Demo */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2 text-xs">
              <span className="text-slate-400 text-[11px] mr-1">Demo Stage Transition:</span>
              {c.status !== 'ASSIGNED' && (
                <button
                  onClick={() => handleUpdateStatus(c.id, 'ASSIGNED')}
                  className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium"
                >
                  Mark Assigned
                </button>
              )}
              {c.status !== 'IN_REVIEW' && (
                <button
                  onClick={() => handleUpdateStatus(c.id, 'IN_REVIEW')}
                  className="px-2.5 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-900 font-medium"
                >
                  Move to In Review
                </button>
              )}
              {c.status !== 'RESPONDED' && (
                <button
                  onClick={() => handleUpdateStatus(c.id, 'RESPONDED')}
                  className="px-2.5 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-medium"
                >
                  Mark Responded
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create Ticket Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900">
              Escalate to Empanelled IP Facilitator
            </h3>
            <p className="text-xs text-slate-600">
              Your inquiry, ground citations, and jurisdiction details will be packaged into an official consultation docket.
            </p>

            <form onSubmit={handleCreateCase} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Applicant Full Name</label>
                <input
                  type="text"
                  value={formData.applicant_name}
                  onChange={e => setFormData({ ...formData, applicant_name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-600"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Applicant Type</label>
                  <select
                    value={formData.applicant_type}
                    onChange={e => setFormData({ ...formData, applicant_type: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-900"
                  >
                    <option value="RESEARCHER">Academic / Research Scholar</option>
                    <option value="STARTUP">Ayush Startup / Innovator</option>
                    <option value="AYUSH_PRACTITIONER">Registered Vaidya / Practitioner</option>
                    <option value="MANUFACTURER">Ayurvedic Drug Manufacturer</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={e => setFormData({ ...formData, priority: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-900"
                  >
                    <option value="STANDARD">Standard Review</option>
                    <option value="HIGH">High Priority (Filing Approaching)</option>
                    <option value="URGENT">Urgent (FER / Examination Hearing)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Docket Subject</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-600"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Specific Legal / Technical Guidance Needed</label>
                <textarea
                  rows={3}
                  value={formData.user_query}
                  onChange={e => setFormData({ ...formData, user_query: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-600"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition shadow-sm"
                >
                  Submit Docket to Facilitator
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
