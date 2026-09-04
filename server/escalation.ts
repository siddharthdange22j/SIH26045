/**
 * Human IP Facilitator Escalation Management
 */

import { FacilitatorCase } from '../src/types.ts';

// In-memory case repository seeded with realistic initial cases
let caseCounter = 1042;

export const ESCALATION_CASES: FacilitatorCase[] = [
  {
    id: "CASE-2026-1038",
    applicant_name: "Dr. Rajeshwar Sharma",
    applicant_organization: "Kerala Ayurveda Research Institute",
    email: "r.sharma@kari.res.in",
    phone: "+91 98470 11234",
    applicant_type: "RESEARCHER",
    jurisdiction: "INDIA",
    ip_category: "PATENT",
    title: "Novel extraction parameters for standardized Withania Somnifera adaptogenic syrup",
    user_query: "Can we patent our cold-macerated Withania root extract with 12% withanolide content without attracting Section 3(p) objections?",
    ai_response_summary: "Classical Withania preparations are barred under Section 3(p). However, standardized novel extraction parameters yielding non-obvious bioactivity may sustain a process claim.",
    confidence_at_escalation: "MEDIUM",
    status: "IN_REVIEW",
    assigned_facilitator: "Adv. Meenakshi Sundaram (Registered Patent Agent IN/PA-842)",
    assigned_facilitator_role: "Senior Ayush Patent Facilitator, DPIIT Panel",
    created_at: "2026-03-01T10:30:00Z",
    updated_at: "2026-03-02T14:15:00Z",
    priority: "HIGH"
  },
  {
    id: "CASE-2026-1039",
    applicant_name: "Aarav Patel",
    applicant_organization: "VedaPharma Biotech Pvt Ltd",
    email: "aarav@vedapharma.in",
    phone: "+91 98250 87654",
    applicant_type: "STARTUP",
    jurisdiction: "INDIA",
    ip_category: "TRADITIONAL_KNOWLEDGE",
    title: "NBA Form III clearance for polyherbal antidiabetic tablet export to USA",
    user_query: "We want to export our patented formulation to the US and file a US patent. Do we need NBA Form III before filing the PCT application?",
    ai_response_summary: "Yes, Section 6 of Biological Diversity Act mandates prior NBA approval before applying for any IPR based on Indian biological resources.",
    confidence_at_escalation: "HIGH",
    status: "ASSIGNED",
    assigned_facilitator: "Dr. Sunita Kulkarni (Biodiversity & ABS Legal Specialist)",
    assigned_facilitator_role: "NBA Empanelled Counsel",
    created_at: "2026-03-02T11:00:00Z",
    updated_at: "2026-03-03T09:20:00Z",
    priority: "URGENT"
  },
  {
    id: "CASE-2026-1040",
    applicant_name: "Prof. Ananya Sen",
    applicant_organization: "National Institute of Ayurveda, Jaipur",
    email: "ananya.sen@nia.edu.in",
    applicant_type: "AYUSH_PRACTITIONER",
    jurisdiction: "INDIA",
    ip_category: "TRADEMARK",
    title: "Brand registration for regional classical Triphala formulation",
    user_query: "Can we trademark 'Classical Triphala' for our dispensary?",
    ai_response_summary: "Descriptive classical names cannot be monopolized under Section 9 of Trade Marks Act. You must add a distinctive prefix/brand element.",
    confidence_at_escalation: "HIGH",
    status: "RESPONDED",
    assigned_facilitator: "Adv. Vikram Sethi (IP Attorney)",
    assigned_facilitator_role: "Trademark Specialist",
    created_at: "2026-02-28T16:45:00Z",
    updated_at: "2026-03-01T11:10:00Z",
    priority: "STANDARD"
  }
];

export function createEscalationCase(input: Omit<FacilitatorCase, 'id' | 'created_at' | 'updated_at' | 'status'>): FacilitatorCase {
  caseCounter++;
  const newCase: FacilitatorCase = {
    ...input,
    id: `CASE-2026-${caseCounter}`,
    status: 'SUBMITTED',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  ESCALATION_CASES.unshift(newCase);
  return newCase;
}

export function updateCaseStatus(caseId: string, status: FacilitatorCase['status'], facilitator?: string): FacilitatorCase | null {
  const target = ESCALATION_CASES.find(c => c.id === caseId);
  if (!target) return null;

  target.status = status;
  target.updated_at = new Date().toISOString();
  if (facilitator) {
    target.assigned_facilitator = facilitator;
  }
  return target;
}
