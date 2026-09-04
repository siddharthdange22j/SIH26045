import React, { useState } from 'react';
import { Jurisdiction, LanguageCode } from './types.ts';
import { Navbar } from './components/Navbar.tsx';
import { Dashboard } from './components/Dashboard.tsx';
import { AIAssistant } from './components/AIAssistant.tsx';
import { FormulationClassifier } from './components/FormulationClassifier.tsx';
import { ABSHelper } from './components/ABSHelper.tsx';
import { PriorArtExplorer } from './components/PriorArtExplorer.tsx';
import { KnowledgeGraphView } from './components/KnowledgeGraphView.tsx';
import { SourceCatalog } from './components/SourceCatalog.tsx';
import { EscalationPortal } from './components/EscalationPortal.tsx';
import { EvaluationDashboard } from './components/EvaluationDashboard.tsx';
import { SecurityCompliance } from './components/SecurityCompliance.tsx';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>('INDIA');
  const [language, setLanguage] = useState<LanguageCode>('en');

  // Shared state for navigation with prefilled inputs
  const [activeQuery, setActiveQuery] = useState<string>('');
  const [escalationData, setEscalationData] = useState<{
    query: string;
    answer: string;
    confidence: string;
    jurisdiction: Jurisdiction;
  } | null>(null);

  const handleNavigate = (tab: string, query?: string) => {
    if (query) {
      setActiveQuery(query);
    }
    setCurrentTab(tab);
  };

  const handleEscalate = (data: {
    query: string;
    answer: string;
    confidence: string;
    jurisdiction: Jurisdiction;
  }) => {
    setEscalationData(data);
    setCurrentTab('escalate');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col antialiased selection:bg-indigo-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        jurisdiction={jurisdiction}
        setJurisdiction={setJurisdiction}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {currentTab === 'dashboard' && (
          <Dashboard
            onNavigate={handleNavigate}
            jurisdiction={jurisdiction}
            language={language}
          />
        )}

        {currentTab === 'ai-assistant' && (
          <AIAssistant
            jurisdiction={jurisdiction}
            language={language}
            initialQuery={activeQuery}
            onEscalate={handleEscalate}
          />
        )}

        {currentTab === 'formulation' && (
          <FormulationClassifier
            onRunRAG={(q) => handleNavigate('ai-assistant', q)}
            onEscalate={handleEscalate}
          />
        )}

        {currentTab === 'abs' && (
          <ABSHelper
            onRunRAG={(q) => handleNavigate('ai-assistant', q)}
            onEscalate={handleEscalate}
          />
        )}

        {currentTab === 'prior-art' && (
          <PriorArtExplorer
            onRunRAG={(q) => handleNavigate('ai-assistant', q)}
          />
        )}

        {currentTab === 'knowledge-graph' && (
          <KnowledgeGraphView
            onRunRAG={(q) => handleNavigate('ai-assistant', q)}
          />
        )}

        {currentTab === 'sources' && (
          <SourceCatalog
            onRunRAG={(q) => handleNavigate('ai-assistant', q)}
          />
        )}

        {currentTab === 'escalate' && (
          <EscalationPortal
            initialCaseData={escalationData}
          />
        )}

        {currentTab === 'evaluations' && (
          <EvaluationDashboard />
        )}

        {currentTab === 'security' && (
          <SecurityCompliance />
        )}
      </main>

      {/* Footer styled to Professional Polish design */}
      <footer className="mt-12 bg-slate-900 text-slate-400 border-t border-slate-800 px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-xs font-medium gap-3">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="font-bold text-white">IP-SAKTI Sahayak</span>
          <span>•</span>
          <span>SIH 2026 Problem Statement 26045</span>
          <span className="hidden md:inline">•</span>
          <span className="hidden md:inline text-slate-400">CGPDTM • NBA • Ministry of Ayush • CSIR-TKDL • WIPO GRATK</span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-wider text-slate-400">
          <span>DPDP Act 2023 Compliant</span>
          <span>•</span>
          <span>AES-256 Pseudonymized</span>
          <span>•</span>
          <span className="text-emerald-400 font-semibold">v1.0.4-stable</span>
        </div>
      </footer>
    </div>
  );
}
