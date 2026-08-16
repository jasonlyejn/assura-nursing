-- Adds a photo column to items so staff can attach a picture of the real product.
-- Safe to run more than once (the error on a second run is harmless).
--   npx wrangler d1 execute assura --remote --file=db\images.sql
ALTER TABLE items ADD COLUMN image TEXT;
