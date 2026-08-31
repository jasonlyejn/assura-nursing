-- Migration to add Patient Assessment, Case Brief, Aware Alerts & To-Do Checklist fields
ALTER TABLE patients ADD COLUMN case_brief TEXT;
ALTER TABLE patients ADD COLUMN things_to_aware TEXT;
ALTER TABLE patients ADD COLUMN things_to_do TEXT;
ALTER TABLE patients ADD COLUMN medical_history TEXT;
ALTER TABLE patients ADD COLUMN devices_tubes TEXT;
ALTER TABLE patients ADD COLUMN mobility_status TEXT;
ALTER TABLE patients ADD COLUMN feeding_regimen TEXT;
ALTER TABLE patients ADD COLUMN emergency_contacts TEXT;
