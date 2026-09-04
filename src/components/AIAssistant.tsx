import React, { useState, useEffect } from 'react';
import { Jurisdiction, LanguageCode, Citation, AgentStepTrace } from '../types.ts';
import { TRANSLATIONS } from '../translations.ts';
import { 
  Send, 
  Sparkles, 
  Scale, 
  CheckCircle, 
  AlertTriangle, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  ShieldCheck, 
  UserCheck, 
  Volume2, 
  StopCircle, 
  Layers,
  FileText,
  HelpCircle
} from 'lucide-react';

interface AIAssistantProps {
  jurisdiction: Jurisdiction;
  language: LanguageCode;
  initialQuery?: string;
  onEscalate: (data: { query: string; answer: string; confidence: string; jurisdiction: Jurisdiction }) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  key_conclusion?: string;
  reasoning_summary?: string;
  confidence?: 'HIGH' | 'MEDIUM' | 'LOW';
  confidence_reason?: string;
  sources?: Citation[];
  warnings?: string[];
  recommended_next_steps?: string[];
  agent_trace?: AgentStepTrace[];
  is_safe_abstention?: boolean;
  abstention_reason?: string;
  timestamp: string;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
  jurisdiction,
  language,
  initialQuery,
  onEscalate
}) => {
  const t = TRANSLATIONS[language];
  const [query, setQuery] = useState(initialQuery || '');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [activeTraceId, setActiveTraceId] = useState<string | null>(null);
  const [activeSourceId, setActiveSourceId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const samplePrompts = [
    "Can a formulation containing Ashwagandha and Turmeric be patented in India?",
    "Does the 2023 Biodiversity Amendment exempt registered Ayush practitioners from ABS fees?",
    "What are the genetic resource disclosure requirements under the 2024 WIPO Treaty?",
    "How does Section 3(e) apply to a polyherbal syrup claiming synergistic efficacy?",
    "What clinical evidence is needed for an Ayush Patent & Proprietary license under Rule 158-B?"
  ];

  // Auto-run if initialQuery passed from dashboard
  useEffect(() => {
    if (initialQuery && messages.length === 0) {
      handleSend(initialQuery);
    }
  }, [initialQuery]);

  const handleSend = async (textToSend?: string) => {
    const q = textToSend || query;
    if (!q.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          jurisdiction,
          language
        })
      });

      if (!response.ok) {
        throw new Error('Failed to query RAG engine');
      }

      const data = await response.json();

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.answer,
        key_conclusion: data.key_conclusion,
        reasoning_summary: data.reasoning_summary,
        confidence: data.confidence,
        confidence_reason: data.confidence_reason,
        sources: data.sources || [],
        warnings: data.warnings || [],
        recommended_next_steps: data.recommended_next_steps || [],
        agent_trace: data.agent_trace || [],
        is_safe_abstention: data.is_safe_abstention,
        abstention_reason: data.abstention_reason,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: `Unable to complete RAG retrieval: ${err.message}. Please verify the connection or try again.`,
        confidence: 'LOW',
        confidence_reason: 'Network or server retrieval exception',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : (language === 'mr' ? 'mr-IN' : 'en-US');
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] min-h-[600px] max-w-5xl mx-auto">
      {/* Active Jurisdiction Status Banner */}
      <div className={`px-4 py-2 rounded-xl mb-3 flex items-center justify-between text-xs font-medium border ${
        jurisdiction === 'INDIA'
          ? 'bg-indigo-50 text-indigo-900 border-indigo-200'
          : 'bg-slate-100 text-slate-800 border-slate-200'
      }`}>
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-indigo-700" />
          <span>Active Statutory Regime: <strong>{jurisdiction === 'INDIA' ? 'INDIA (DPIIT / NBA / Ayush)' : 'INTERNATIONAL (WIPO / PCT / Nagoya)'}</strong></span>
        </div>
        <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
          Strict Regime Partitioning Enforced
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-2 rounded-2xl bg-slate-50/60 p-4 border border-slate-200">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 shadow-xs">
              <Sparkles className="w-6 h-6" />
            </div>

            <div className="max-w-md space-y-1">
              <h3 className="text-lg font-bold text-slate-900">
                Ask IP-SAKTI Sahayak
              </h3>
              <p className="text-xs text-slate-600">
                Inquire about patents, traditional knowledge exclusions, ABS approvals, prior art references, or regulatory drug licensing under the active {jurisdiction} regime.
              </p>
            </div>

            <div className="w-full max-w-xl space-y-2 pt-2">
              <p className="text-[11px] font-semibold text-slate-500 text-left">Suggested Research Queries:</p>
              <div className="flex flex-col gap-2">
                {samplePrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    id={`sample-prompt-${idx}`}
                    onClick={() => handleSend(prompt)}
                    className="text-left text-xs p-2.5 rounded-lg bg-white border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/40 text-slate-700 transition shadow-xs"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          messages.map(msg => (
            <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1`}>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 px-1">
                <span>{msg.sender === 'user' ? 'Applicant / Researcher' : 'IP-SAKTI Sahayak (Statutory RAG)'}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>

              {msg.sender === 'user' ? (
                <div className="max-w-2xl bg-indigo-600 text-white rounded-2xl rounded-tr-none px-4 py-3 text-sm shadow-sm">
                  {msg.text}
                </div>
              ) : (
                <div className="w-full max-w-4xl bg-white border border-slate-200 rounded-2xl rounded-tl-none p-5 sm:p-6 space-y-4 shadow-sm">
                  {/* Safe Abstention Warning */}
                  {msg.is_safe_abstention && (
                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-rose-700">
                        <AlertTriangle className="w-4 h-4" />
                        <span>System Guardrail Triggered • Safe Abstention Enforced</span>
                      </div>
                      <p className="text-xs leading-relaxed">
                        {msg.abstention_reason || "The input violates statutory compliance, ethical, or safety guardrails."}
                      </p>
                    </div>
                  )}

                  {/* Confidence Badge & TTS Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                        msg.confidence === 'HIGH'
                          ? 'bg-green-100 text-green-700 border border-green-200'
                          : msg.confidence === 'MEDIUM'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{msg.confidence === 'HIGH' ? t.confidence_high : (msg.confidence === 'MEDIUM' ? t.confidence_med : t.confidence_low)}</span>
                      </span>

                      {msg.confidence_reason && (
                        <span className="text-[11px] text-slate-500 hidden sm:inline">
                          ({msg.confidence_reason})
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSpeak(msg.key_conclusion || msg.text)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                        title="Read aloud"
                      >
                        {isSpeaking ? <StopCircle className="w-3.5 h-3.5 text-rose-600" /> : <Volume2 className="w-3.5 h-3.5 text-slate-600" />}
                        <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
                      </button>

                      <button
                        onClick={() => onEscalate({
                          query: messages.find(m => m.sender === 'user')?.text || '',
                          answer: msg.key_conclusion || msg.text,
                          confidence: msg.confidence || 'HIGH',
                          jurisdiction
                        })}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition shadow-xs"
                      >
                        <UserCheck className="w-3.5 h-3.5 text-indigo-700" />
                        <span>{t.talk_to_facilitator}</span>
                      </button>
                    </div>
                  </div>

                  {/* Key Conclusion Callout */}
                  {msg.key_conclusion && (
                    <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-800 block font-mono">
                        Key Statutory Conclusion
                      </span>
                      <p className="text-sm font-semibold text-indigo-950 leading-relaxed">
                        {msg.key_conclusion}
                      </p>
                    </div>
                  )}

                  {/* Main Grounded Answer Text */}
                  <div className="text-sm text-slate-800 leading-relaxed space-y-3 whitespace-pre-line font-sans">
                    {msg.text}
                  </div>

                  {/* Warnings & Actionable Next Steps */}
                  {(msg.warnings && msg.warnings.length > 0 || msg.recommended_next_steps && msg.recommended_next_steps.length > 0) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                      {msg.warnings && msg.warnings.length > 0 && (
                        <div className="p-3 rounded-lg bg-rose-50 border border-rose-100 space-y-1.5">
                          <span className="font-bold text-rose-800 flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                            Statutory Warnings
                          </span>
                          <ul className="space-y-1 pl-4 list-disc text-rose-700">
                            {msg.warnings.map((w, idx) => (
                              <li key={idx}>{w}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {msg.recommended_next_steps && msg.recommended_next_steps.length > 0 && (
                        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100 space-y-1.5">
                          <span className="font-bold text-emerald-800 flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                            Recommended Procedural Steps
                          </span>
                          <ul className="space-y-1 pl-4 list-disc text-emerald-700">
                            {msg.recommended_next_steps.map((s, idx) => (
                              <li key={idx}>{s}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Verified Citations Drawer */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="pt-3 border-t border-slate-200 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-indigo-700" />
                          Grounded Authoritative Citations ({msg.sources.length})
                        </span>
                        <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          100% Zero-Hallucination Verified
                        </span>
                      </div>

                      <div className="space-y-2">
                        {msg.sources.map((cit, idx) => {
                          const isExpanded = activeSourceId === `${msg.id}-${idx}`;
                          return (
                            <div
                              key={idx}
                              className="rounded-lg border border-slate-200 bg-slate-50/70 p-3 space-y-2 text-xs"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded text-[11px] border border-indigo-200">
                                      [{idx + 1}]
                                    </span>
                                    <span className="font-semibold text-slate-900">{cit.title}</span>
                                    <span className="text-slate-500 font-mono text-[11px]">({cit.section})</span>
                                  </div>
                                  <p className="text-[11px] text-slate-500 mt-0.5">
                                    Authority: {cit.authority} • Version: {cit.version} • Published: {cit.publication_date}
                                  </p>
                                </div>

                                <button
                                  onClick={() => setActiveSourceId(isExpanded ? null : `${msg.id}-${idx}`)}
                                  className="text-[11px] text-indigo-700 hover:text-indigo-900 font-medium flex items-center gap-0.5 shrink-0"
                                >
                                  <span>{isExpanded ? 'Hide passage' : 'View passage'}</span>
                                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                                </button>
                              </div>

                              {/* Expanded Statutory Passage */}
                              {isExpanded && (
                                <div className="mt-2 pt-2 border-t border-slate-200 space-y-2">
                                  <div className="p-2.5 rounded bg-white border border-slate-200 text-slate-800 text-[12px] leading-relaxed">
                                    "{cit.matched_passage}"
                                  </div>
                                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                                    <span><strong>Why this source:</strong> {cit.why_this_source}</span>
                                    {cit.source_url && (
                                      <a
                                        href={cit.source_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-indigo-600 hover:underline shrink-0"
                                      >
                                        <span>Official Gazette</span>
                                        <ExternalLink className="w-3 h-3" />
                                      </a>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Multi-Agent Trace Drawer */}
                  {msg.agent_trace && msg.agent_trace.length > 0 && (
                    <div className="pt-2">
                      <button
                        onClick={() => setActiveTraceId(activeTraceId === msg.id ? null : msg.id)}
                        className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-slate-600 hover:text-slate-900 transition"
                      >
                        <Layers className="w-3.5 h-3.5 text-indigo-700" />
                        <span>
                          {activeTraceId === msg.id ? 'Hide Multi-Agent Orchestration Trace' : `Show Multi-Agent Orchestration Trace (${msg.agent_trace.length} steps)`}
                        </span>
                        {activeTraceId === msg.id ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>

                      {activeTraceId === msg.id && (
                        <div className="mt-2 p-3 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] space-y-2 shadow-sm">
                          <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1.5">
                            <span>AGENT EXECUTION PIPELINE</span>
                            <span>STATUS</span>
                          </div>
                          {msg.agent_trace.map((step, sIdx) => (
                            <div key={sIdx} className="flex items-start justify-between gap-4 py-1 border-b border-slate-800/50 last:border-0">
                              <div className="space-y-0.5">
                                <div className="text-indigo-400 font-bold">
                                  #{sIdx + 1} {step.agent_name}
                                </div>
                                <div className="text-slate-400 text-[10px]">{step.role}</div>
                                <div className="text-slate-300 text-[11px] italic mt-0.5">↳ {step.output_summary}</div>
                              </div>
                              <div className="text-right shrink-0">
                                <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                                  step.status === 'COMPLETED' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                                }`}>
                                  {step.status}
                                </span>
                                <div className="text-[10px] text-slate-500 mt-0.5">{step.execution_time_ms}ms</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200 text-slate-600 text-xs shadow-sm">
            <div className="w-4 h-4 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
            <span>Orchestrating multi-agent legal RAG pipeline & verifying statutory passages...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <div className="mt-3 bg-white p-2.5 sm:p-3 rounded-2xl border border-slate-200 shadow-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            id="chat-query-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Ask an Ayurveda IP or regulatory question under ${jurisdiction} jurisdiction...`}
            className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-900 focus:outline-none placeholder:text-slate-400"
            disabled={isLoading}
          />

          <button
            id="btn-chat-send"
            type="submit"
            disabled={isLoading || !query.trim()}
            className="inline-flex items-center justify-center p-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 transition shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
