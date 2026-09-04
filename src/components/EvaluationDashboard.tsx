import React, { useState, useEffect } from 'react';
import { BenchmarkRunResult, BenchmarkTestCase } from '../types.ts';
import { 
  FileCheck, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  Award, 
  RotateCcw,
  Zap,
  Layers,
  Database
} from 'lucide-react';

export const EvaluationDashboard: React.FC = () => {
  const [benchmarkResult, setBenchmarkResult] = useState<BenchmarkRunResult | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const runBenchmark = async () => {
    setIsRunning(true);
    try {
      const res = await fetch('/api/evaluations/run');
      const data = await res.json();
      setBenchmarkResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    runBenchmark();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-900">
            <FileCheck className="w-5 h-5 text-indigo-700" />
            <h2 className="text-xl font-bold text-slate-900">
              SIH 2026 Evaluation & Technical Benchmark Dashboard
            </h2>
          </div>
          <button
            onClick={runBenchmark}
            disabled={isRunning}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition shadow-sm disabled:opacity-50"
          >
            {isRunning ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            <span>{isRunning ? 'Executing Automated Suite...' : 'Execute Live Benchmark'}</span>
          </button>
        </div>
        <p className="text-xs text-slate-600">
          Standardized test suite assessing retrieval precision, statutory citation correctness, jurisdiction boundary enforcement, zero-hallucination guarantees, and safe abstention guardrails.
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-mono">Accuracy</span>
          <p className="text-2xl font-bold text-emerald-700">
            {benchmarkResult ? `${benchmarkResult.overall_accuracy}%` : '--'}
          </p>
          <span className="text-[10px] text-slate-500">Statutory alignment</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-mono">Citation Score</span>
          <p className="text-2xl font-bold text-indigo-700">
            {benchmarkResult ? `${benchmarkResult.citation_correctness_score}%` : '--'}
          </p>
          <span className="text-[10px] text-slate-500">Exact passage match</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-mono">Retrieval Recall</span>
          <p className="text-2xl font-bold text-indigo-600">
            {benchmarkResult ? `${benchmarkResult.retrieval_recall_score}%` : '--'}
          </p>
          <span className="text-[10px] text-slate-500">Hybrid BM25 + dense</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-mono">Hallucination</span>
          <p className="text-2xl font-bold text-emerald-600">
            {benchmarkResult ? `${benchmarkResult.hallucination_rate_score}%` : '--'}
          </p>
          <span className="text-[10px] text-emerald-700 font-semibold">Zero hallucination</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-mono">Abstention Rate</span>
          <p className="text-2xl font-bold text-amber-600">
            {benchmarkResult ? `${benchmarkResult.safe_abstention_rate}%` : '--'}
          </p>
          <span className="text-[10px] text-slate-500">Security guardrails</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-mono">Avg Latency</span>
          <p className="text-2xl font-bold text-slate-900">
            {benchmarkResult ? `${benchmarkResult.avg_latency_ms}ms` : '--'}
          </p>
          <span className="text-[10px] text-slate-500">Full RAG execution</span>
        </div>
      </div>

      {/* Test Cases Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Benchmark Test Execution Breakdown
            </h3>
            <p className="text-xs text-slate-600">
              Results from running the 10 SIH 2026 canonical test questions across Patents, ABS, TK, and Guardrails.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-600 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
            {benchmarkResult?.passed_tests} / {benchmarkResult?.total_tests} Tests Passed
          </span>
        </div>

        <div className="space-y-2.5">
          {benchmarkResult?.test_details.map(tc => (
            <div
              key={tc.test_id}
              className={`p-3.5 rounded-xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                tc.passed
                  ? 'bg-emerald-50/40 border-emerald-200'
                  : 'bg-rose-50/40 border-rose-200'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {tc.test_id}
                  </span>
                  <span className="font-semibold text-slate-900">{tc.title}</span>
                </div>
                <p className="text-slate-600 text-[11px]">{tc.notes}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right text-[11px] font-mono text-slate-500">
                  <div>{tc.citations_matched} citations matched</div>
                  <div>{tc.latency_ms} ms</div>
                </div>

                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold ${
                  tc.passed ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
                }`}>
                  {tc.passed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                  <span>{tc.passed ? 'PASSED' : 'FAILED'}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
