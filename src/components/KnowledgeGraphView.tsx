import React, { useState, useEffect } from 'react';
import { KnowledgeGraphEdge, KnowledgeGraphNode } from '../types.ts';
import { 
  Network, 
  Filter, 
  Search, 
  Info, 
  ArrowRight, 
  ExternalLink,
  Layers
} from 'lucide-react';

interface KnowledgeGraphViewProps {
  onRunRAG: (query: string) => void;
}

export const KnowledgeGraphView: React.FC<KnowledgeGraphViewProps> = ({ onRunRAG }) => {
  const [nodes, setNodes] = useState<KnowledgeGraphNode[]>([]);
  const [edges, setEdges] = useState<KnowledgeGraphEdge[]>([]);
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNode, setSelectedNode] = useState<KnowledgeGraphNode | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const entityTypes = [
    'ALL',
    'Plant',
    'BiologicalResource',
    'Ingredient',
    'Formulation',
    'TraditionalKnowledge',
    'Patent',
    'Law',
    'Treaty',
    'Authority'
  ];

  const fetchGraph = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedType !== 'ALL') params.append('type', selectedType);
      if (searchQuery) params.append('query', searchQuery);

      const res = await fetch(`/api/knowledge-graph?${params.toString()}`);
      const data = await res.json();
      setNodes(data.nodes || []);
      setEdges(data.edges || []);
      if (data.nodes && data.nodes.length > 0 && !selectedNode) {
        setSelectedNode(data.nodes[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGraph();
  }, [selectedType]);

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'Plant': return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'BiologicalResource': return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Ingredient': return 'bg-cyan-100 text-cyan-900 border-cyan-300';
      case 'Formulation': return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'TraditionalKnowledge': return 'bg-orange-100 text-orange-900 border-orange-300';
      case 'Patent': return 'bg-rose-100 text-rose-900 border-rose-300';
      case 'Law': return 'bg-red-100 text-red-900 border-red-300';
      case 'Treaty': return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Authority': return 'bg-indigo-100 text-indigo-900 border-indigo-300';
      default: return 'bg-stone-100 text-stone-900 border-stone-300';
    }
  };

  // Connected edges for the selected node
  const connectedEdges = selectedNode
    ? edges.filter(e => e.source === selectedNode.id || e.target === selectedNode.id)
    : [];

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-900">
            <Network className="w-5 h-5 text-indigo-700" />
            <h2 className="text-xl font-bold text-slate-900">
              Ayurveda IP & Regulatory Relational Knowledge Graph
            </h2>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 border border-slate-200 rounded-lg">
            {nodes.length} Entities • {edges.length} Semantic Triples
          </span>
        </div>
        <p className="text-xs text-slate-600">
          Explore multi-hop relationships connecting botanical plants, phytochemical ingredients, classical treatises, patent revocations, biodiversity statutes (NBA Section 6), and international treaties (WIPO GRATK).
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <span className="text-slate-500 font-medium mr-1">Filter Entity:</span>
          {entityTypes.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-2.5 py-1 rounded-md transition font-medium whitespace-nowrap ${
                selectedType === type
                  ? 'bg-indigo-600 text-white shadow-sm font-bold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); fetchGraph(); }} className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search graph entities..."
              className="pl-8 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
            />
          </div>
          <button
            type="submit"
            className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow-sm"
          >
            Find
          </button>
        </form>
      </div>

      {/* Interactive Visual Graph & Inspector Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Node Network Map (Left 2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-sm font-bold text-slate-900">Entity Topology Map</span>
            <span className="text-[11px] text-slate-500">Click any entity node to inspect connections</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[520px] overflow-y-auto p-1">
            {nodes.map(node => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${getNodeColor(node.type)} ${
                    isSelected ? 'ring-2 ring-indigo-600 shadow-md scale-[1.02]' : 'hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">{node.type}</span>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
                  </div>
                  <h4 className="font-semibold leading-tight text-slate-950 truncate">
                    {node.label}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Node Inspector (Right 1 col) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-5">
          {selectedNode ? (
            <div className="space-y-4">
              <div>
                <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase mb-1.5 ${getNodeColor(selectedNode.type)}`}>
                  {selectedNode.type}
                </span>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                  {selectedNode.label}
                </h3>
              </div>

              {/* Entity Properties */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                <span className="font-bold text-slate-800 block text-[11px]">Entity Attributes:</span>
                {Object.entries(selectedNode.properties).map(([key, value]) => (
                  <div key={key} className="flex items-start justify-between gap-2 text-[11px]">
                    <span className="text-slate-500 font-mono capitalize">{key.replace(/_/g, ' ')}:</span>
                    <span className="text-slate-900 font-medium text-right">{value}</span>
                  </div>
                ))}
              </div>

              {/* Relational Semantic Triples */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-900 block">
                  Connected Relational Triples ({connectedEdges.length})
                </span>
                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1 text-xs">
                  {connectedEdges.map((edge, i) => {
                    const isSource = edge.source === selectedNode.id;
                    const otherNodeId = isSource ? edge.target : edge.source;
                    const otherNode = nodes.find(n => n.id === otherNodeId);

                    return (
                      <div key={i} className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-[11px] space-y-1">
                        <div className="text-indigo-700 font-semibold italic">
                          ↳ {edge.relationship}
                        </div>
                        <div className="text-slate-800 font-medium pl-2">
                          {otherNode ? otherNode.label : otherNodeId}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action: Query in RAG */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => onRunRAG(`Analyze legal, regulatory, and patent status of ${selectedNode.label}`)}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition shadow-sm"
                >
                  <span>Query in RAG Assistant</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 text-xs">
              <Info className="w-8 h-8 mb-2 opacity-50" />
              <span>Select any entity node on the left to view semantic connections.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
