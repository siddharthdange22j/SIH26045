-- ====================================================================
-- IP-SAKTI Sahayak - Relational Database Schema (PostgreSQL + pgvector)
-- SIH 2026 Problem Statement 26045
-- ====================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- 1. Jurisdictions
CREATE TABLE IF NOT EXISTS jurisdictions (
    id VARCHAR(50) PRIMARY KEY, -- 'INDIA', 'INTERNATIONAL'
    name VARCHAR(255) NOT NULL,
    legal_system VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Authorities
CREATE TABLE IF NOT EXISTS authorities (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    acronym VARCHAR(50),
    jurisdiction_id VARCHAR(50) REFERENCES jurisdictions(id),
    website_url TEXT,
    contact_email VARCHAR(255),
    statutory_mandate TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Users and Roles
CREATE TABLE IF NOT EXISTS roles (
    id VARCHAR(50) PRIMARY KEY,
    role_name VARCHAR(100) NOT NULL,
    permissions JSONB NOT NULL DEFAULT '[]'::jsonb
);

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role_id VARCHAR(50) REFERENCES roles(id),
    organization VARCHAR(255),
    user_type VARCHAR(50) NOT NULL, -- 'RESEARCHER', 'STARTUP', 'AYUSH_PRACTITIONER', 'STUDENT', 'FACILITATOR', 'ADMIN'
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Authoritative Documents & Sources
CREATE TABLE IF NOT EXISTS documents (
    id VARCHAR(100) PRIMARY KEY, -- e.g., 'IN-PAT-1970-SEC3P'
    title VARCHAR(500) NOT NULL,
    authority_id VARCHAR(100) REFERENCES authorities(id),
    jurisdiction_id VARCHAR(50) REFERENCES jurisdictions(id),
    document_type VARCHAR(50) NOT NULL, -- 'ACT', 'RULES', 'GUIDELINES', 'TREATY', 'JUDGMENT'
    publication_date DATE NOT NULL,
    effective_date DATE NOT NULL,
    current_version VARCHAR(50) NOT NULL,
    source_url TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE_CURRENT', -- 'ACTIVE_CURRENT', 'HISTORICAL_SUPERSEDED', 'AMENDMENT_PENDING'
    reliability_score INT CHECK (reliability_score BETWEEN 0 AND 100),
    last_verified DATE NOT NULL,
    verified_by VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS document_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id VARCHAR(100) REFERENCES documents(id) ON DELETE CASCADE,
    version_label VARCHAR(50) NOT NULL,
    gazette_notification_number VARCHAR(255),
    amendment_summary TEXT,
    full_statute_text TEXT NOT NULL,
    effective_from DATE NOT NULL,
    effective_until DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Document Chunks & Vector Storage (pgvector)
CREATE TABLE IF NOT EXISTS document_chunks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id VARCHAR(100) REFERENCES documents(id) ON DELETE CASCADE,
    chunk_index INT NOT NULL,
    section_number VARCHAR(100) NOT NULL,
    paragraph_number VARCHAR(100),
    chunk_text TEXT NOT NULL,
    chunk_tokens INT NOT NULL,
    embedding vector(768), -- Compatible with standard dense embedding models
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Plants, Biological Resources, Ingredients
CREATE TABLE IF NOT EXISTS plants (
    id VARCHAR(100) PRIMARY KEY,
    common_name VARCHAR(255) NOT NULL,
    sanskrit_name VARCHAR(255) NOT NULL,
    botanical_name VARCHAR(255) NOT NULL,
    family VARCHAR(255) NOT NULL,
    ayurvedic_properties JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ingredients (
    id VARCHAR(100) PRIMARY KEY,
    chemical_name VARCHAR(255) NOT NULL,
    plant_id VARCHAR(100) REFERENCES plants(id),
    chemical_class VARCHAR(255),
    therapeutic_bioactivities TEXT[]
);

CREATE TABLE IF NOT EXISTS formulations (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    classical_treatise_source VARCHAR(255),
    is_classical BOOLEAN DEFAULT TRUE,
    dosage_form VARCHAR(100),
    indications TEXT[]
);

CREATE TABLE IF NOT EXISTS formulation_ingredients (
    formulation_id VARCHAR(100) REFERENCES formulations(id),
    plant_id VARCHAR(100) REFERENCES plants(id),
    ratio_percentage NUMERIC(5,2),
    PRIMARY KEY (formulation_id, plant_id)
);

-- 7. Traditional Knowledge & Prior Art Cases
CREATE TABLE IF NOT EXISTS traditional_knowledge (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    treatise_name VARCHAR(255) NOT NULL,
    shloka_reference VARCHAR(255) NOT NULL,
    plant_id VARCHAR(100) REFERENCES plants(id),
    recorded_indication TEXT NOT NULL,
    tkdl_reference_code VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS landmark_prior_art_cases (
    id VARCHAR(100) PRIMARY KEY,
    case_name VARCHAR(500) NOT NULL,
    foreign_patent_number VARCHAR(100),
    patent_office VARCHAR(100),
    opposing_agency VARCHAR(255) DEFAULT 'CSIR India',
    revocation_date DATE,
    legal_statute_invoked VARCHAR(255),
    ruling_summary TEXT NOT NULL
);

-- 8. Queries, RAG Answers & Citations
CREATE TABLE IF NOT EXISTS queries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    query_text TEXT NOT NULL,
    jurisdiction_selected VARCHAR(50) NOT NULL,
    detected_ip_types TEXT[],
    language_code VARCHAR(10) DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    query_id UUID REFERENCES queries(id) ON DELETE CASCADE,
    answer_text TEXT NOT NULL,
    key_conclusion TEXT NOT NULL,
    confidence_level VARCHAR(20) NOT NULL, -- 'HIGH', 'MEDIUM', 'LOW'
    confidence_rationale TEXT NOT NULL,
    is_safe_abstention BOOLEAN DEFAULT FALSE,
    abstention_reason TEXT,
    latency_ms INT NOT NULL,
    model_version VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS answer_citations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    answer_id UUID REFERENCES answers(id) ON DELETE CASCADE,
    document_id VARCHAR(100) REFERENCES documents(id),
    section_cited VARCHAR(100) NOT NULL,
    verified_passage TEXT NOT NULL,
    verification_status VARCHAR(50) DEFAULT 'VERIFIED_AUTHORITATIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Human Facilitator Escalation Cases
CREATE TABLE IF NOT EXISTS facilitator_cases (
    id VARCHAR(50) PRIMARY KEY,
    applicant_name VARCHAR(255) NOT NULL,
    organization VARCHAR(255),
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50),
    applicant_type VARCHAR(50) NOT NULL,
    jurisdiction VARCHAR(50) NOT NULL,
    ip_category VARCHAR(50) NOT NULL,
    title VARCHAR(500) NOT NULL,
    user_query TEXT NOT NULL,
    ai_response_summary TEXT NOT NULL,
    confidence_at_escalation VARCHAR(20) NOT NULL,
    status VARCHAR(50) DEFAULT 'SUBMITTED', -- 'SUBMITTED', 'ASSIGNED', 'IN_REVIEW', 'RESPONDED', 'CLOSED'
    assigned_facilitator VARCHAR(255),
    assigned_role VARCHAR(255),
    priority VARCHAR(20) DEFAULT 'STANDARD',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Audit Logs (DPDP & Cybersecurity Compliance)
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    action_type VARCHAR(100) NOT NULL, -- 'QUERY_EXECUTED', 'CASE_ESCALATED', 'SOURCE_ADMIN_EDIT'
    jurisdiction_context VARCHAR(50) NOT NULL,
    anonymized_ip_hash VARCHAR(64) NOT NULL,
    guardrail_status VARCHAR(50) NOT NULL, -- 'PASSED', 'REJECTED_PROMPT_INJECTION', 'REJECTED_ILLEGAL_EVASION'
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Evaluations & Benchmarks
CREATE TABLE IF NOT EXISTS evaluation_runs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    total_test_cases INT NOT NULL,
    accuracy_percentage NUMERIC(5,2) NOT NULL,
    citation_correctness_percentage NUMERIC(5,2) NOT NULL,
    hallucination_rate_percentage NUMERIC(5,2) NOT NULL,
    safe_abstention_rate_percentage NUMERIC(5,2) NOT NULL,
    average_latency_ms INT NOT NULL,
    executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
