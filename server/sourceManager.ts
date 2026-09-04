/**
 * Authoritative Source Management & Version Tracking
 */

import { AuthoritativeSource, IPType, Jurisdiction } from '../src/types.ts';
import { AUTHORITATIVE_SOURCES } from './knowledgeBase.ts';

// In-memory working copy allowing admin updates and additions
const workingSources: AuthoritativeSource[] = [...AUTHORITATIVE_SOURCES];

export function listSources(filter?: {
  jurisdiction?: Jurisdiction;
  ip_type?: IPType;
  status?: string;
  query?: string;
}): AuthoritativeSource[] {
  return workingSources.filter(source => {
    if (filter?.jurisdiction && source.jurisdiction !== filter.jurisdiction) return false;
    if (filter?.ip_type && !source.IP_type.includes(filter.ip_type)) return false;
    if (filter?.status && source.status !== filter.status) return false;
    if (filter?.query) {
      const q = filter.query.toLowerCase();
      const match = 
        source.title.toLowerCase().includes(q) ||
        source.authority.toLowerCase().includes(q) ||
        source.section.toLowerCase().includes(q) ||
        source.summary.toLowerCase().includes(q) ||
        source.key_provisions.some(p => p.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });
}

export function getSourceById(id: string): AuthoritativeSource | undefined {
  return workingSources.find(s => s.document_id === id);
}

export function addOrUpdateSource(source: AuthoritativeSource): AuthoritativeSource {
  const index = workingSources.findIndex(s => s.document_id === source.document_id);
  if (index >= 0) {
    workingSources[index] = {
      ...source,
      last_verified: new Date().toISOString().split('T')[0]
    };
    return workingSources[index];
  } else {
    workingSources.push(source);
    return source;
  }
}

export function markSourceVerified(id: string, verifierName: string): AuthoritativeSource | null {
  const source = workingSources.find(s => s.document_id === id);
  if (!source) return null;

  source.last_verified = new Date().toISOString().split('T')[0];
  source.verified_by = verifierName;
  source.reliability_score = Math.min(100, source.reliability_score + 2);
  return source;
}
