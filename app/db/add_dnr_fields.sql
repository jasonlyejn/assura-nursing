-- Migration: DNR Consent & Advance Directive Fields
ALTER TABLE procedure_consents ADD COLUMN doctor_name TEXT;
ALTER TABLE procedure_consents ADD COLUMN doctor_mmc TEXT;
ALTER TABLE procedure_consents ADD COLUMN is_dnr INTEGER NOT NULL DEFAULT 0;
ALTER TABLE procedure_consents ADD COLUMN consent_terms TEXT;

ALTER TABLE cases ADD COLUMN dnr_active INTEGER NOT NULL DEFAULT 0;
