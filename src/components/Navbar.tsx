import React from 'react';
import { Jurisdiction, LanguageCode } from '../types.ts';
import { TRANSLATIONS } from '../translations.ts';
import { Shield, Globe, Award, AlertTriangle, BookOpen, Layers } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  jurisdiction: Jurisdiction;
  setJurisdiction: (j: Jurisdiction) => void;
  language: LanguageCode;
  setLanguage: (l: LanguageCode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  jurisdiction,
  setJurisdiction,
  language,
  setLanguage
}) => {
  const t = TRANSLATIONS[language];

  const navItems = [
    { id: 'dashboard', label: t.tab_dashboard, icon: '🏛️' },
    { id: 'ai-assistant', label: t.tab_ai_assistant, icon: '🤖' },
    { id: 'formulation', label: t.tab_formulation, icon: '🌿' },
    { id: 'abs', label: t.tab_abs, icon: '⚖️' },
    { id: 'prior-art', label: t.tab_prior_art, icon: '📜' },
    { id: 'knowledge-graph', label: t.tab_knowledge_graph, icon: '🌐' },
    { id: 'sources', label: t.tab_sources, icon: '📚' },
    { id: 'escalate', label: t.tab_escalate, icon: '👨‍⚖️' },
    { id: 'evaluations', label: t.tab_evaluations, icon: '📊' },
    { id: 'security', label: t.tab_security, icon: '🛡️' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      {/* Statutory Disclaimer Strip */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 sm:px-6 py-1.5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2 max-w-5xl overflow-hidden truncate">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="truncate text-slate-300 font-normal">{t.disclaimer}</span>
        </div>
        <div className="flex items-center gap-3 shrink-0 text-[11px] text-indigo-300 font-mono">
          <span>SIH 2026 PS 26045</span>
          <span>•</span>
          <span className="text-emerald-400">RAG-GROUNDED & CITATION-VERIFIED</span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Brand Identity */}
          <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => setCurrentTab('dashboard')}>
            <div className="w-10 h-10 bg-indigo-700 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm">
              IP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-indigo-900 leading-none">
                  IP-SAKTI Sahayak
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Ayush RAG 2.0
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mt-1">
                Ayurveda IP & Regulatory Guidance Assistant
              </p>
            </div>
          </div>

          {/* Controls: Jurisdiction Toggle, Language & Profile Avatar */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Strict Jurisdiction Toggle */}
            <div className="flex bg-slate-100 p-1 rounded-md border border-slate-200">
              <button
                id="btn-jurisdiction-india"
                onClick={() => setJurisdiction('INDIA')}
                className={`px-3 sm:px-4 py-1.5 text-xs font-bold transition-all rounded-sm ${
                  jurisdiction === 'INDIA'
                    ? 'bg-white text-indigo-700 shadow-sm border border-slate-200'
                    : 'text-slate-500 hover:bg-slate-200 font-semibold'
                }`}
              >
                <span>🇮🇳 INDIA (DPIIT/NBA)</span>
              </button>
              <button
                id="btn-jurisdiction-intl"
                onClick={() => setJurisdiction('INTERNATIONAL')}
                className={`px-3 sm:px-4 py-1.5 text-xs font-bold transition-all rounded-sm ${
                  jurisdiction === 'INTERNATIONAL'
                    ? 'bg-white text-indigo-700 shadow-sm border border-slate-200'
                    : 'text-slate-500 hover:bg-slate-200 font-semibold'
                }`}
              >
                <span>🌐 INTERNATIONAL</span>
              </button>
            </div>

            {/* Language Selector */}
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-md p-1 text-xs">
              <Globe className="w-3.5 h-3.5 text-slate-400 mx-1.5" />
              <button
                id="btn-lang-en"
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded text-xs transition ${
                  language === 'en' ? 'bg-white shadow-sm text-indigo-700 font-bold border border-slate-200' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                id="btn-lang-hi"
                onClick={() => setLanguage('hi')}
                className={`px-2 py-1 rounded text-xs transition ${
                  language === 'hi' ? 'bg-white shadow-sm text-indigo-700 font-bold border border-slate-200' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                हिन्दी
              </button>
              <button
                id="btn-lang-mr"
                onClick={() => setLanguage('mr')}
                className={`px-2 py-1 rounded text-xs transition ${
                  language === 'mr' ? 'bg-white shadow-sm text-indigo-700 font-bold border border-slate-200' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                मराठी
              </button>
            </div>

            {/* Profile Avatar */}
            <div className="h-8 w-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 text-xs font-bold" title="Ayush IP Delegate / Researcher">
              AD
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="mt-3 pt-2 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
          {navItems.map(item => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => setCurrentTab(item.id)}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 shrink-0 transition-colors whitespace-nowrap text-xs ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200 shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
