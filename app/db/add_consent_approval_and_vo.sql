-- Add approval, reviewer, and verbal order fields to procedure_consents
ALTER TABLE procedure_consents ADD COLUMN status TEXT DEFAULT 'pending_approval';
ALTER TABLE procedure_consents ADD COLUMN is_verbal_order INTEGER DEFAULT 0;
ALTER TABLE procedure_consents ADD COLUMN verbal_order_dr TEXT;
ALTER TABLE procedure_consents ADD COLUMN verbal_order_at INTEGER;
ALTER TABLE procedure_consents ADD COLUMN verbal_order_notes TEXT;
ALTER TABLE procedure_consents ADD COLUMN reviewer_staff_id TEXT;
ALTER TABLE procedure_consents ADD COLUMN reviewer_name TEXT;
ALTER TABLE procedure_consents ADD COLUMN reviewer_role TEXT;
ALTER TABLE procedure_consents ADD COLUMN reviewed_at INTEGER;
ALTER TABLE procedure_consents ADD COLUMN review_notes TEXT;
