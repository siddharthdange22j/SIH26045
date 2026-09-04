import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Database, 
  Terminal, 
  Copy, 
  Check, 
  FileCode, 
  Server, 
  AlertTriangle 
} from 'lucide-react';

export const SecurityCompliance: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const dockerSnippet = `version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - GEMINI_API_KEY=\${GEMINI_API_KEY}
      - DATABASE_URL=postgresql://ipsakti_admin:sakti_secure_pass@db:5432/ipsakti_db
    depends_on:
      - db

  db:
    image: pgvector/pgvector:pg16
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: ipsakti_db
      POSTGRES_USER: ipsakti_admin
      POSTGRES_PASSWORD: sakti_secure_pass
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./database/schema.sql:/docker-entrypoint-initdb.d/init.sql

volumes:
  pgdata:`;

  const schemaSnippet = `-- PostgreSQL + pgvector Schema Summary
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- 1. Jurisdictions & Authorities
CREATE TABLE jurisdictions (id VARCHAR(50) PRIMARY KEY, name VARCHAR(255), legal_system VARCHAR(255));
CREATE TABLE authorities (id VARCHAR(100) PRIMARY KEY, name VARCHAR(255), jurisdiction_id VARCHAR(50));

-- 2. Documents & Chunks (pgvector 768-dim embeddings)
CREATE TABLE documents (id VARCHAR(100) PRIMARY KEY, title VARCHAR(500), status VARCHAR(50), reliability_score INT);
CREATE TABLE document_chunks (id UUID PRIMARY KEY, document_id VARCHAR(100), chunk_text TEXT, embedding vector(768));

-- 3. Queries, RAG Answers & Citations
CREATE TABLE queries (id UUID PRIMARY KEY, query_text TEXT, jurisdiction_selected VARCHAR(50));
CREATE TABLE answers (id UUID PRIMARY KEY, query_id UUID, answer_text TEXT, confidence_level VARCHAR(20));
CREATE TABLE answer_citations (id UUID PRIMARY KEY, answer_id UUID, document_id VARCHAR(100), verified_passage TEXT);

-- 4. Human Facilitator Cases & DPDP Audit Logs
CREATE TABLE facilitator_cases (id VARCHAR(50) PRIMARY KEY, applicant_name VARCHAR(255), status VARCHAR(50));
CREATE TABLE audit_logs (id UUID PRIMARY KEY, action_type VARCHAR(100), anonymized_ip_hash VARCHAR(64), timestamp TIMESTAMPTZ);`;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
        <div className="flex items-center gap-2 text-slate-900">
          <ShieldCheck className="w-5 h-5 text-indigo-700" />
          <h2 className="text-xl font-bold text-slate-900">
            Security, Privacy & Deployment Architecture
          </h2>
        </div>
        <p className="text-xs text-slate-600">
          Built in accordance with India's Digital Personal Data Protection Act (DPDP Act 2023), ISO 27001 secure engineering standards, and robust defensive prompt-injection guardrails.
        </p>
      </div>

      {/* Security Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 text-xs">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold mb-1">
            <Lock className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">DPDP Act 2023 Compliance</h3>
          <p className="text-slate-600 leading-relaxed">
            All user queries are processed with pseudonymized identifiers. IP addresses are hashed using salted SHA-256 before audit logging. No sensitive formulation secrets are shared with third-party tracking services.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 text-xs">
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 font-bold mb-1">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Defensive Guardrails & Abstention</h3>
          <p className="text-slate-600 leading-relaxed">
            Sequential pre-retrieval agents analyze incoming queries for adversarial injection, system prompt exfiltration, and statutory circumvention (e.g. smuggling biologicals or evading SBB fees), safely abstaining with clear legal explanations.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 text-xs">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-800 font-bold mb-1">
            <Server className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Strict Regime Partitioning</h3>
          <p className="text-slate-600 leading-relaxed">
            National statutes (Patents Act, BDA, Rule 158-B) and international frameworks (WIPO, TRIPS, Nagoya) operate in isolated database vector partitions to guarantee that non-binding international provisions are never hallucinated into Indian legal opinions.
          </p>
        </div>
      </div>

      {/* Database Schema Viewer */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-indigo-700" />
            <h3 className="text-sm font-bold text-slate-900">
              Production Database Schema (PostgreSQL + pgvector)
            </h3>
          </div>
          <button
            onClick={() => handleCopy(schemaSnippet, 'schema')}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition"
          >
            {copiedKey === 'schema' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey === 'schema' ? 'Copied' : 'Copy SQL'}</span>
          </button>
        </div>
        <pre className="p-4 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono overflow-x-auto max-h-56 leading-relaxed border border-slate-800">
          {schemaSnippet}
        </pre>
      </div>

      {/* Docker Compose Viewer */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-700" />
            <h3 className="text-sm font-bold text-slate-900">
              Container Deployment Configuration (docker-compose.yml)
            </h3>
          </div>
          <button
            onClick={() => handleCopy(dockerSnippet, 'docker')}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition"
          >
            {copiedKey === 'docker' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey === 'docker' ? 'Copied' : 'Copy Compose'}</span>
          </button>
        </div>
        <pre className="p-4 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono overflow-x-auto max-h-56 leading-relaxed border border-slate-800">
          {dockerSnippet}
        </pre>
      </div>
    </div>
  );
};
