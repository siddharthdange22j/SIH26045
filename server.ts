/**
 * Express Server for IP-SAKTI Sahayak
 * Provides real RAG APIs, classification wizards, ABS calculators,
 * prior-art lookups, knowledge graph queries, case escalations,
 * source management, and SIH benchmark evaluations.
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { executeRAGPipeline } from './server/ragEngine.ts';
import { classifyAyurvedaFormulation } from './server/classificationEngine.ts';
import { assessABSCompliance } from './server/absEngine.ts';
import { lookupPriorArtBotanical, BOTANICAL_DATABASE } from './server/botanicalsData.ts';
import { GRAPH_NODES, GRAPH_EDGES } from './server/knowledgeGraph.ts';
import { ESCALATION_CASES, createEscalationCase, updateCaseStatus } from './server/escalation.ts';
import { listSources, getSourceById, addOrUpdateSource, markSourceVerified } from './server/sourceManager.ts';
import { runBenchmarkSuite, BENCHMARK_TEST_SUITE } from './server/evaluations.ts';
import { GoogleGenAI, Modality } from '@google/genai';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // ===================================================
  // 1. Health & Status Endpoint
  // ===================================================
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'IP-SAKTI Sahayak Backend',
      problem_statement: 'SIH 2026 - PS 26045',
      rag_engine: 'Hybrid Vector + BM25 + Multi-Agent Orchestrator',
      knowledge_base_status: 'ACTIVE_STATUTORY'
    });
  });

  // ===================================================
  // 2. Core RAG Chat Endpoint
  // ===================================================
  app.post('/api/chat', async (req, res) => {
    try {
      const { query, jurisdiction = 'INDIA', language = 'en' } = req.body;
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ error: 'Valid query string required' });
      }

      const result = await executeRAGPipeline(query, jurisdiction, language);
      res.json(result);
    } catch (err: any) {
      console.error('Error in /api/chat:', err);
      res.status(500).json({ error: 'Failed to process RAG pipeline', details: err.message });
    }
  });

  // ===================================================
  // 3. Query Intent & IP Routing Analysis
  // ===================================================
  app.post('/api/query/analyze', async (req, res) => {
    try {
      const { query } = req.body;
      if (!query) return res.status(400).json({ error: 'Query is required' });

      const botanicalMatch = lookupPriorArtBotanical(query);
      res.json({
        query,
        detected_botanical: botanicalMatch ? {
          common_name: botanicalMatch.query,
          sanskrit_name: botanicalMatch.sanskrit_name,
          botanical_name: botanicalMatch.botanical_name,
          indications: botanicalMatch.classical_treatise_citations
        } : null
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ===================================================
  // 4. Ayurveda Formulation Classification Endpoint
  // ===================================================
  app.post('/api/formulation/classify', (req, res) => {
    try {
      const input = req.body;
      const result = classifyAyurvedaFormulation(input);
      res.json(result);
    } catch (err: any) {
      console.error('Error in /api/formulation/classify:', err);
      res.status(500).json({ error: err.message });
    }
  });

  // ===================================================
  // 5. ABS Compliance Helper Endpoint
  // ===================================================
  app.post('/api/abs/check', (req, res) => {
    try {
      const input = req.body;
      const result = assessABSCompliance(input);
      res.json(result);
    } catch (err: any) {
      console.error('Error in /api/abs/check:', err);
      res.status(500).json({ error: err.message });
    }
  });

  // ===================================================
  // 6. Traditional Knowledge & Prior Art Lookup
  // ===================================================
  app.post('/api/prior-art/search', (req, res) => {
    try {
      const { query } = req.body;
      if (!query) return res.status(400).json({ error: 'Query required' });

      const match = lookupPriorArtBotanical(query);
      if (match) {
        return res.json(match);
      }

      // Return general prior art recommendations if specific herb not in botanical database
      res.json({
        query,
        botanical_name: "Botanical or Polyherbal Compound",
        sanskrit_name: "आयुर्वेदिक योग (Ayurvedic Formulation)",
        classical_treatise_citations: [
          {
            treatise: "Ayurvedic Pharmacopoeia of India (API)",
            shloka_reference: "Monograph Standard Reference Check Required",
            therapeutic_indications: ["Subject to classical ASU verification"]
          }
        ],
        historical_landmark_cases: [
          {
            case_name: "General Section 3(p) Screening",
            patent_number: "IN IPO Traditional Knowledge Filter",
            jurisdiction: "India",
            revocation_basis: "Section 3(p) statutory bar",
            lesson: "Consult CSIR-TKDL and Ayurvedic Pharmacopoeia prior to filing."
          }
        ],
        tkdl_indicators: {
          indicative_match: true,
          reference_count: 50,
          csir_tkdl_note: "CSIR-TKDL search recommended for all Ayurvedic polyherbal formulations."
        },
        prior_art_risk_level: "MODERATE_SYNERGISM_NEEDED",
        strategic_recommendation: "Ensure comparative synergy data under Section 3(e) to prove that the combined effect is non-obvious."
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get('/api/botanicals/list', (req, res) => {
    res.json(Object.values(BOTANICAL_DATABASE));
  });

  // ===================================================
  // 7. Relational Knowledge Graph Endpoint
  // ===================================================
  app.get('/api/knowledge-graph', (req, res) => {
    try {
      const { type, query } = req.query;
      let nodes = GRAPH_NODES;
      let edges = GRAPH_EDGES;

      if (type && typeof type === 'string') {
        nodes = nodes.filter(n => n.type.toLowerCase() === type.toLowerCase());
        const nodeIds = new Set(nodes.map(n => n.id));
        edges = edges.filter(e => nodeIds.has(e.source) || nodeIds.has(e.target));
      }

      if (query && typeof query === 'string') {
        const q = query.toLowerCase();
        nodes = nodes.filter(n => 
          n.label.toLowerCase().includes(q) || 
          Object.values(n.properties).some(v => v.toLowerCase().includes(q))
        );
        const nodeIds = new Set(nodes.map(n => n.id));
        edges = edges.filter(e => nodeIds.has(e.source) || nodeIds.has(e.target));
      }

      res.json({ nodes, edges });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ===================================================
  // 8. Authoritative Source Management Endpoints
  // ===================================================
  app.get('/api/sources', (req, res) => {
    try {
      const { jurisdiction, ip_type, status, query } = req.query;
      const sources = listSources({
        jurisdiction: jurisdiction as any,
        ip_type: ip_type as any,
        status: status as any,
        query: query as any
      });
      res.json(sources);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get('/api/sources/:id', (req, res) => {
    const source = getSourceById(req.params.id);
    if (!source) return res.status(404).json({ error: 'Source not found' });
    res.json(source);
  });

  app.post('/api/admin/sources', (req, res) => {
    try {
      const source = req.body;
      const saved = addOrUpdateSource(source);
      res.json(saved);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/admin/sources/:id/verify', (req, res) => {
    const { verifierName = 'DPIIT/Ayush Legal Committee' } = req.body;
    const verified = markSourceVerified(req.params.id, verifierName);
    if (!verified) return res.status(404).json({ error: 'Source not found' });
    res.json(verified);
  });

  // ===================================================
  // 9. Facilitator Escalation Endpoints
  // ===================================================
  app.get('/api/cases', (req, res) => {
    res.json(ESCALATION_CASES);
  });

  app.post('/api/escalate', (req, res) => {
    try {
      const caseData = req.body;
      const created = createEscalationCase(caseData);
      res.status(201).json(created);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.patch('/api/cases/:id/status', (req, res) => {
    const { status, facilitator } = req.body;
    const updated = updateCaseStatus(req.params.id, status, facilitator);
    if (!updated) return res.status(404).json({ error: 'Case not found' });
    res.json(updated);
  });

  // ===================================================
  // 10. SIH Evaluation & Benchmark Suite Endpoint
  // ===================================================
  app.get('/api/evaluations/run', async (req, res) => {
    try {
      const results = await runBenchmarkSuite();
      res.json(results);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get('/api/evaluations/test-cases', (req, res) => {
    res.json(BENCHMARK_TEST_SUITE);
  });

  // ===================================================
  // 11. Text-to-Speech (Gemini TTS API where available)
  // ===================================================
  app.post('/api/tts', async (req, res) => {
    try {
      const { text } = req.body;
      if (!text) return res.status(400).json({ error: 'Text required' });

      if (process.env.GEMINI_API_KEY) {
        const ai = new GoogleGenAI({
          apiKey: process.env.GEMINI_API_KEY,
          httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
        });

        const ttsResponse = await ai.models.generateContent({
          model: "gemini-3.1-flash-tts-preview",
          contents: [{ parts: [{ text: text.substring(0, 400) }] }],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: 'Kore' }
              }
            }
          }
        });

        const base64Audio = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
          return res.json({ audio: base64Audio, format: 'pcm', sampleRate: 24000 });
        }
      }

      // If key is not configured or TTS model returns empty, return client-fallback flag
      res.json({ fallback_browser_speech: true });
    } catch (err: any) {
      console.warn('TTS server call skipped:', err.message);
      res.json({ fallback_browser_speech: true });
    }
  });

  // ===================================================
  // 12. Vite Middleware Setup (Dev vs Prod)
  // ===================================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[IP-SAKTI Sahayak] Server running on http://localhost:${PORT}`);
  });
}

startServer();
