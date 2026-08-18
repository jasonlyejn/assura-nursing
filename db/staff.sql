-- Staff profiles — fuller records for each person.
-- Safe to re-run: "duplicate column name" errors are harmless.
--   npx wrangler d1 execute assura --remote --file=db\staff.sql
ALTER TABLE staff ADD COLUMN email TEXT;
ALTER TABLE staff ADD COLUMN ic TEXT;
ALTER TABLE staff ADD COLUMN staff_no TEXT;
ALTER TABLE staff ADD COLUMN reg_no TEXT;
ALTER TABLE staff ADD COLUMN qualification TEXT;
ALTER TABLE staff ADD COLUMN started_at TEXT;
ALTER TABLE staff ADD COLUMN address TEXT;
ALTER TABLE staff ADD COLUMN kin_name TEXT;
ALTER TABLE staff ADD COLUMN kin_phone TEXT;
ALTER TABLE staff ADD COLUMN pay_basis TEXT;
ALTER TABLE staff ADD COLUMN pay_rate REAL NOT NULL DEFAULT 0;
ALTER TABLE staff ADD COLUMN bank_name TEXT;
ALTER TABLE staff ADD COLUMN bank_acc TEXT;
ALTER TABLE staff ADD COLUMN photo TEXT;
ALTER TABLE staff ADD COLUMN notes TEXT;
