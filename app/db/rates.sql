-- Assura — real service rates + quotes
--   npx wrangler d1 execute assura --remote --file=db\rates.sql
-- Safe to run more than once.

-- "plus" marks a ++ rate (a starting price that varies by location / severity)
ALTER TABLE services ADD COLUMN plus INTEGER NOT NULL DEFAULT 0;

-- Quotes ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS quotes (
  id          TEXT PRIMARY KEY,
  no          TEXT,
  case_id     TEXT REFERENCES cases(id),
  lines       TEXT,                       -- JSON: [{label,qty,unit,rate,amount}]
  subtotal    REAL NOT NULL DEFAULT 0,
  travel      REAL NOT NULL DEFAULT 0,
  surcharge   REAL NOT NULL DEFAULT 0,
  deposit     REAL NOT NULL DEFAULT 0,
  total       REAL NOT NULL DEFAULT 0,
  note        TEXT,
  status      TEXT NOT NULL DEFAULT 'draft',  -- draft | sent | accepted | declined
  created_at  INTEGER NOT NULL,
  created_by  TEXT,
  sent_at     INTEGER,
  accepted_at INTEGER
);
CREATE INDEX IF NOT EXISTS idx_quotes_case ON quotes(case_id, created_at DESC);

-- Real rates -----------------------------------------------------------------
-- procedure | session | hour | tiered | day | shift
INSERT OR IGNORE INTO services (id,name_en,name_zh,basis,rate,rate2,grp,sort,active,plus)
VALUES ('x','x','x','procedure',0,0,'x',999,0,0);
DELETE FROM services WHERE id='x';

INSERT OR REPLACE INTO services (id,name_en,name_zh,basis,rate,rate2,grp,sort,active,plus) VALUES
 ('wound',    'Wound Dressing','伤口换药',              'procedure', 80, 0,'proc', 0,1,1),
 ('inject',   'Injection & Drip','注射 · 打点滴',        'procedure', 80, 0,'proc', 1,1,1),
 ('catheter', 'Urinary Catheter Change','更换尿管',      'procedure', 80, 0,'proc', 2,1,1),
 ('ryles',    'Ryle''s Tube Change','更换鼻胃管',        'procedure', 80, 0,'proc', 3,1,1),

 ('postop',   'Post-Operative Care','术后护理',          'session',  100, 0,'recov',4,1,0),
 ('postop_hr','Post-Operative Care (hourly)','术后护理(按小时)','hour', 26, 0,'recov',5,1,0),
 ('bedbound', 'Bed-Bound Patient Care','卧床护理',       'hour',      25, 0,'recov',6,1,1),
 ('adl',      'ADL Assistance (hourly)','日常起居协助',   'hour',      25, 0,'recov',7,1,0),
 ('adl_sess', 'ADL Assistance (session)','日常起居协助(每节)','session',60, 0,'recov',8,1,0),
 ('hygiene',  'Personal Hygiene Care','个人卫生',        'session',   60, 0,'pers', 9,1,0),

 ('pall',     'Palliative Care','安宁疗护',              'hour',      28, 0,'pall',10,1,0),
 ('eol',      'End-of-Life Care','临终关怀',             'hour',      28, 0,'pall',11,1,0),

 ('live24',   '24-Hour Live-In Care (daily)','24小时住家护理','day',  250, 0,'live',12,1,1),
 ('live24_hr','24-Hour Live-In Care (hourly)','住家护理(按小时)','hour',25, 0,'live',13,1,1),
 ('shift12',  '12-Hour Shift Care','12小时轮班护理',      'shift',    130, 0,'live',14,1,1),

 ('escort',   'Clinic & Hospital Escort','陪诊',         'tiered',    60,30,'supp',15,1,0),
 ('other',    'Other / Not Sure','其他需求',             'session',    0, 0,'supp',16,1,0);

-- Charges --------------------------------------------------------------------
INSERT OR REPLACE INTO settings (key,value) VALUES
 ('travelFreeKm','25'),
 ('travelPerKm','3'),
 ('depositLongTerm','500'),
 ('escortNote','Transport (Grab / ambulance) is charged separately 交通费另计');
