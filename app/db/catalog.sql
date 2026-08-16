-- Assura — medical supplies catalogue (Malaysia)
-- Services + 391 chargeable items with code / brand / size / unit.
-- Prices are INDICATIVE starting points — review them in Rate card > Items.
-- Brands are common examples for identification, not endorsements.
-- Safe to run more than once. Prices you have already edited are kept.
--
--   npx wrangler d1 execute assura --remote --file=db\catalog.sql

-- 0. Make sure older databases have the photo column before we rebuild.
--    (Run db\images.sql first. If it is already there you will see
--     "duplicate column name: image" — that is harmless.)

-- 1. Upgrade the items table (adds code / category / brand / size / uom) -----
CREATE TABLE IF NOT EXISTS items_new (
  id TEXT PRIMARY KEY, code TEXT UNIQUE, category TEXT, name TEXT NOT NULL,
  brand TEXT, size TEXT, uom TEXT, price REAL NOT NULL DEFAULT 0,
  prepare_by TEXT NOT NULL DEFAULT 'staff', order_ahead INTEGER NOT NULL DEFAULT 0,
  spec TEXT, image TEXT, sort INTEGER NOT NULL DEFAULT 0, active INTEGER NOT NULL DEFAULT 1
);
INSERT OR IGNORE INTO items_new (id,name,price,prepare_by,order_ahead,spec,image,sort)
  SELECT id,name,price,prepare_by,order_ahead,spec,image,sort FROM items;
DROP TABLE IF EXISTS items;
ALTER TABLE items_new RENAME TO items;
CREATE INDEX IF NOT EXISTS idx_items_cat  ON items(category, sort);
CREATE INDEX IF NOT EXISTS idx_items_code ON items(code);

-- 2. Services ----------------------------------------------------------------
INSERT OR IGNORE INTO services (id,name_en,name_zh,basis,rate,rate2,grp,sort,active) VALUES
 ('wound','Wound Dressing','伤口换药','procedure',80,0,'proc',0,1),
 ('inject','Injection & Drip','注射 · 打点滴','procedure',60,0,'proc',1,1),
 ('catheter','Urinary Catheter Change','更换尿管','procedure',120,0,'proc',2,1),
 ('ryles','Ryle''''s Tube Change','更换鼻胃管','procedure',120,0,'proc',3,1),
 ('postop','Post-Operative Care','术后护理','session',150,0,'recov',4,1),
 ('bedbound','Bed-Bound Patient Care','卧床护理','hour',90,0,'recov',5,1),
 ('adl','ADL Assistance','日常起居协助','hour',80,0,'recov',6,1),
 ('hygiene','Personal Hygiene Care','个人卫生','session',100,0,'pers',7,1),
 ('pall','Palliative Care','安宁疗护','hour',100,0,'pall',8,1),
 ('eol','End-of-Life Care','临终关怀','hour',100,0,'pall',9,1),
 ('escort','Clinic & Hospital Escort','陪诊','tiered',80,40,'supp',10,1),
 ('other','Other / Not Sure','其他需求','session',0,0,'supp',11,1);

-- 3. Items -------------------------------------------------------------------
INSERT OR IGNORE INTO items
 (id,code,category,name,brand,size,uom,price,prepare_by,order_ahead,spec,sort) VALUES
('itm_wnd001','WND001','WOUND CARE - DRESSINGS','Dressing set 换药包','','','SET',25,'staff',0,'',0),
('itm_wnd002','WND002','WOUND CARE - DRESSINGS','Gauze swab 纱布块','','5x5cm','PACK',6,'staff',0,'',1),
('itm_wnd003','WND003','WOUND CARE - DRESSINGS','Gauze swab 纱布块','','7.5x7.5cm','PACK',8,'staff',0,'',2),
('itm_wnd004','WND004','WOUND CARE - DRESSINGS','Gauze swab 纱布块','','10x10cm','PACK',10,'staff',0,'',3),
('itm_wnd005','WND005','WOUND CARE - DRESSINGS','Non-adherent dressing 不粘敷料','Melolin','10x10cm','EACH',6,'staff',0,'',4),
('itm_wnd006','WND006','WOUND CARE - DRESSINGS','Paraffin tulle dressing 油纱','Jelonet','10x10cm','EACH',8,'staff',0,'',5),
('itm_wnd007','WND007','WOUND CARE - DRESSINGS','Chlorhexidine tulle 消毒油纱','Bactigras','10x10cm','EACH',10,'staff',0,'',6),
('itm_wnd008','WND008','WOUND CARE - DRESSINGS','Transparent film dressing 透明敷料','Tegaderm','6x7cm','EACH',8,'staff',0,'',7),
('itm_wnd009','WND009','WOUND CARE - DRESSINGS','Transparent film dressing 透明敷料','Tegaderm','10x12cm','EACH',15,'staff',0,'',8),
('itm_wnd010','WND010','WOUND CARE - DRESSINGS','Transparent film dressing 透明敷料','Opsite','10x12cm','EACH',14,'staff',0,'',9),
('itm_wnd011','WND011','WOUND CARE - DRESSINGS','Foam dressing 泡沫敷料','Mepilex','10x10cm','EACH',35,'staff',0,'',10),
('itm_wnd012','WND012','WOUND CARE - DRESSINGS','Foam dressing 泡沫敷料','Mepilex','15x15cm','EACH',55,'staff',0,'',11),
('itm_wnd013','WND013','WOUND CARE - DRESSINGS','Foam dressing border 泡沫敷料(带边)','Mepilex Border','10x10cm','EACH',40,'staff',0,'',12),
('itm_wnd014','WND014','WOUND CARE - DRESSINGS','Foam dressing 泡沫敷料','Allevyn','10x10cm','EACH',32,'staff',0,'',13),
('itm_wnd015','WND015','WOUND CARE - DRESSINGS','Sacral foam dressing 骶部泡沫敷料','Mepilex Border','sacrum','EACH',60,'staff',1,'for pressure sore prevention',14),
('itm_wnd016','WND016','WOUND CARE - DRESSINGS','Heel foam dressing 足跟泡沫敷料','Allevyn','heel','EACH',55,'staff',1,'',15),
('itm_wnd017','WND017','WOUND CARE - DRESSINGS','Hydrocolloid dressing 水胶体敷料','DuoDERM','10x10cm','EACH',30,'staff',0,'',16),
('itm_wnd018','WND018','WOUND CARE - DRESSINGS','Hydrocolloid thin 薄水胶体','DuoDERM Extra Thin','10x10cm','EACH',22,'staff',0,'',17),
('itm_wnd019','WND019','WOUND CARE - DRESSINGS','Alginate dressing 藻酸盐敷料','Kaltostat','10x10cm','EACH',38,'staff',0,'for bleeding / exuding wounds',18),
('itm_wnd020','WND020','WOUND CARE - DRESSINGS','Hydrofiber dressing 亲水性纤维敷料','Aquacel','10x10cm','EACH',42,'staff',0,'',19),
('itm_wnd021','WND021','WOUND CARE - DRESSINGS','Silver hydrofiber 银离子敷料','Aquacel Ag','10x10cm','EACH',65,'staff',1,'for infected wounds',20),
('itm_wnd022','WND022','WOUND CARE - DRESSINGS','Silver foam dressing 银离子泡沫敷料','Mepilex Ag','10x10cm','EACH',70,'staff',1,'',21),
('itm_wnd023','WND023','WOUND CARE - DRESSINGS','Silicone contact layer 硅胶接触层','Mepitel','7.5x10cm','EACH',30,'staff',0,'',22),
('itm_wnd024','WND024','WOUND CARE - DRESSINGS','Lipidocolloid dressing 脂质敷料','Urgotul','10x10cm','EACH',28,'staff',0,'',23),
('itm_wnd025','WND025','WOUND CARE - DRESSINGS','Hydrogel 水凝胶','Intrasite','15g','TUBE',45,'staff',0,'for sloughy / dry wounds',24),
('itm_wnd026','WND026','WOUND CARE - DRESSINGS','Wound gel 伤口凝胶','Solosite','85g','TUBE',55,'staff',0,'',25),
('itm_wnd027','WND027','WOUND CARE - DRESSINGS','Island adhesive dressing 岛型敷料','Primapore','10x8cm','EACH',6,'staff',0,'',26),
('itm_wnd028','WND028','WOUND CARE - DRESSINGS','Adhesive plaster 胶布贴','Hansaplast','assorted','BOX',12,'staff',0,'',27),
('itm_wnd029','WND029','WOUND CARE - DRESSINGS','Post-op waterproof dressing 防水敷料','Opsite Post-Op','10x8cm','EACH',12,'staff',0,'',28),
('itm_wnd030','WND030','WOUND CARE - DRESSINGS','Negative pressure dressing kit 负压敷料','','small','SET',0,'staff',1,'quote on request 需另报价',29),
('itm_cln001','CLN001','WOUND CARE - CLEANSING & ANTISEPTIC','Normal saline 生理盐水','','500ml','BOTTLE',12,'staff',0,'',30),
('itm_cln002','CLN002','WOUND CARE - CLEANSING & ANTISEPTIC','Normal saline sachet 生理盐水包','','30ml','EACH',4,'staff',0,'',31),
('itm_cln003','CLN003','WOUND CARE - CLEANSING & ANTISEPTIC','Wound irrigation saline 冲洗盐水','','100ml','BOTTLE',8,'staff',0,'',32),
('itm_cln004','CLN004','WOUND CARE - CLEANSING & ANTISEPTIC','Povidone iodine 碘伏','Betadine','60ml','BOTTLE',15,'staff',0,'',33),
('itm_cln005','CLN005','WOUND CARE - CLEANSING & ANTISEPTIC','Povidone iodine 碘伏','Betadine','500ml','BOTTLE',45,'staff',0,'',34),
('itm_cln006','CLN006','WOUND CARE - CLEANSING & ANTISEPTIC','Chlorhexidine solution 洗必泰','Hibiscrub','500ml','BOTTLE',40,'staff',0,'',35),
('itm_cln007','CLN007','WOUND CARE - CLEANSING & ANTISEPTIC','Hydrogen peroxide 双氧水','','100ml','BOTTLE',10,'staff',0,'',36),
('itm_cln008','CLN008','WOUND CARE - CLEANSING & ANTISEPTIC','Alcohol swab 酒精棉片','','single use','BOX',12,'staff',0,'',37),
('itm_cln009','CLN009','WOUND CARE - CLEANSING & ANTISEPTIC','Cotton ball 棉球','','','PACK',6,'staff',0,'',38),
('itm_cln010','CLN010','WOUND CARE - CLEANSING & ANTISEPTIC','Cotton bud / swab 棉签','','','PACK',5,'staff',0,'',39),
('itm_cln011','CLN011','WOUND CARE - CLEANSING & ANTISEPTIC','Wound cleanser spray 伤口清洗喷雾','Prontosan','350ml','BOTTLE',85,'staff',1,'',40),
('itm_cln012','CLN012','WOUND CARE - CLEANSING & ANTISEPTIC','Sterile water 无菌注射用水','','10ml','VIAL',8,'staff',0,'',41),
('itm_bnd001','BND001','WOUND CARE - BANDAGE & TAPE','Micropore tape 纸胶带','3M Micropore','1 inch','ROLL',6,'staff',0,'',42),
('itm_bnd002','BND002','WOUND CARE - BANDAGE & TAPE','Micropore tape 纸胶带','3M Micropore','2 inch','ROLL',10,'staff',0,'',43),
('itm_bnd003','BND003','WOUND CARE - BANDAGE & TAPE','Silk tape 丝绸胶带','3M Durapore','1 inch','ROLL',9,'staff',0,'',44),
('itm_bnd004','BND004','WOUND CARE - BANDAGE & TAPE','Transparent tape 透明胶带','3M Transpore','1 inch','ROLL',8,'staff',0,'',45),
('itm_bnd005','BND005','WOUND CARE - BANDAGE & TAPE','Conforming bandage 弹性绷带','','5cm','ROLL',5,'staff',0,'',46),
('itm_bnd006','BND006','WOUND CARE - BANDAGE & TAPE','Conforming bandage 弹性绷带','','7.5cm','ROLL',7,'staff',0,'',47),
('itm_bnd007','BND007','WOUND CARE - BANDAGE & TAPE','Conforming bandage 弹性绷带','','10cm','ROLL',9,'staff',0,'',48),
('itm_bnd008','BND008','WOUND CARE - BANDAGE & TAPE','Crepe bandage 弹力绷带','','7.5cm','ROLL',8,'staff',0,'',49),
('itm_bnd009','BND009','WOUND CARE - BANDAGE & TAPE','Crepe bandage 弹力绷带','','10cm','ROLL',10,'staff',0,'',50),
('itm_bnd010','BND010','WOUND CARE - BANDAGE & TAPE','Compression bandage 压力绷带','Comprilan','10cm','ROLL',35,'staff',1,'for venous leg ulcer',51),
('itm_bnd011','BND011','WOUND CARE - BANDAGE & TAPE','Tubular bandage 管状绷带','Tubigrip','size C/D','ROLL',18,'staff',0,'',52),
('itm_bnd012','BND012','WOUND CARE - BANDAGE & TAPE','Cohesive bandage 自粘绷带','Coban','7.5cm','ROLL',15,'staff',0,'',53),
('itm_bnd013','BND013','WOUND CARE - BANDAGE & TAPE','Triangular bandage 三角巾','','','EACH',8,'staff',0,'',54),
('itm_bnd014','BND014','WOUND CARE - BANDAGE & TAPE','Stockinette 弹力套','','10cm','ROLL',20,'staff',0,'',55),
('itm_cth001','CTH001','URINARY / CATHETER','Foley catheter 2-way 双腔尿管','Bard','Fr12','EACH',45,'staff',1,'',56),
('itm_cth002','CTH002','URINARY / CATHETER','Foley catheter 2-way 双腔尿管','Bard','Fr14','EACH',45,'staff',1,'',57),
('itm_cth003','CTH003','URINARY / CATHETER','Foley catheter 2-way 双腔尿管','Bard','Fr16','EACH',45,'staff',1,'',58),
('itm_cth004','CTH004','URINARY / CATHETER','Foley catheter 2-way 双腔尿管','Bard','Fr18','EACH',45,'staff',1,'',59),
('itm_cth005','CTH005','URINARY / CATHETER','Foley catheter 2-way 双腔尿管','Bard','Fr20','EACH',48,'staff',1,'',60),
('itm_cth006','CTH006','URINARY / CATHETER','Silicone Foley catheter 硅胶尿管','Bard','Fr16','EACH',75,'staff',1,'for long-term use 长期留置',61),
('itm_cth007','CTH007','URINARY / CATHETER','Silicone Foley catheter 硅胶尿管','Bard','Fr18','EACH',75,'staff',1,'',62),
('itm_cth008','CTH008','URINARY / CATHETER','3-way Foley catheter 三腔尿管','Bard','Fr20','EACH',90,'staff',1,'for irrigation',63),
('itm_cth009','CTH009','URINARY / CATHETER','Nelaton catheter 单次导尿管','Romsons','Fr12','EACH',8,'staff',0,'',64),
('itm_cth010','CTH010','URINARY / CATHETER','Nelaton catheter 单次导尿管','Romsons','Fr14','EACH',8,'staff',0,'',65),
('itm_cth011','CTH011','URINARY / CATHETER','Urine bag 2000ml 尿袋','','2000ml','EACH',15,'staff',0,'',66),
('itm_cth012','CTH012','URINARY / CATHETER','Urine bag with drain tap 可排尿袋','','2000ml','EACH',20,'staff',0,'',67),
('itm_cth013','CTH013','URINARY / CATHETER','Leg bag 腿袋','','500ml','EACH',25,'staff',0,'',68),
('itm_cth014','CTH014','URINARY / CATHETER','Leg bag strap 腿袋固定带','','pair','SET',15,'staff',0,'',69),
('itm_cth015','CTH015','URINARY / CATHETER','Catheter fixation device 尿管固定器','StatLock','','EACH',22,'staff',0,'',70),
('itm_cth016','CTH016','URINARY / CATHETER','Catheter valve 尿管阀','','','EACH',18,'staff',0,'',71),
('itm_cth017','CTH017','URINARY / CATHETER','Lubricant gel 润滑剂','K-Y / Lignocaine','42g','TUBE',12,'staff',0,'',72),
('itm_cth018','CTH018','URINARY / CATHETER','Lignocaine gel 利多卡因凝胶','Xylocaine','11ml','EACH',18,'staff',1,'',73),
('itm_cth019','CTH019','URINARY / CATHETER','Bladder syringe 膀胱冲洗针筒','','60ml','EACH',10,'staff',0,'',74),
('itm_cth020','CTH020','URINARY / CATHETER','Sterile water for balloon 球囊用无菌水','','10ml','VIAL',8,'staff',0,'',75),
('itm_cth021','CTH021','URINARY / CATHETER','Urine specimen container 尿标本瓶','','','EACH',3,'staff',0,'',76),
('itm_stm001','STM001','STOMA & DRAINAGE','Colostomy bag 造口袋','Coloplast','one-piece','EACH',25,'staff',1,'',77),
('itm_stm002','STM002','STOMA & DRAINAGE','Colostomy bag 造口袋','Hollister','two-piece','EACH',30,'staff',1,'',78),
('itm_stm003','STM003','STOMA & DRAINAGE','Stoma baseplate 造口底盘','Coloplast','','EACH',28,'staff',1,'',79),
('itm_stm004','STM004','STOMA & DRAINAGE','Stoma paste 造口膏','Coloplast','60g','TUBE',55,'staff',1,'',80),
('itm_stm005','STM005','STOMA & DRAINAGE','Stoma powder 造口粉','Coloplast','25g','EACH',50,'staff',1,'',81),
('itm_stm006','STM006','STOMA & DRAINAGE','Barrier ring 防漏环','Coloplast','','EACH',20,'staff',1,'',82),
('itm_stm007','STM007','STOMA & DRAINAGE','Adhesive remover spray 除胶喷雾','Niltac','50ml','EACH',45,'staff',1,'',83),
('itm_stm008','STM008','STOMA & DRAINAGE','Drainage bag 引流袋','','','EACH',20,'staff',0,'',84),
('itm_stm009','STM009','STOMA & DRAINAGE','Wound drain bag 伤口引流袋','','','EACH',25,'staff',0,'',85),
('itm_fed001','FED001','FEEDING / ENTERAL','Ryle''s tube 鼻胃管','Romsons','Fr10','EACH',35,'staff',1,'',86),
('itm_fed002','FED002','FEEDING / ENTERAL','Ryle''s tube 鼻胃管','Romsons','Fr12','EACH',35,'staff',1,'',87),
('itm_fed003','FED003','FEEDING / ENTERAL','Ryle''s tube 鼻胃管','Romsons','Fr14','EACH',35,'staff',1,'',88),
('itm_fed004','FED004','FEEDING / ENTERAL','Ryle''s tube 鼻胃管','Romsons','Fr16','EACH',35,'staff',1,'',89),
('itm_fed005','FED005','FEEDING / ENTERAL','PEG tube care set PEG护理包','','','SET',45,'staff',1,'',90),
('itm_fed006','FED006','FEEDING / ENTERAL','Feeding syringe 喂食针筒','','50ml','EACH',8,'staff',0,'',91),
('itm_fed007','FED007','FEEDING / ENTERAL','Feeding bag & giving set 喂食袋','','','SET',25,'staff',0,'',92),
('itm_fed008','FED008','FEEDING / ENTERAL','Enteral feeding pump set 喂食泵管','','','SET',45,'staff',1,'',93),
('itm_fed009','FED009','FEEDING / ENTERAL','pH test paper 酸碱试纸','','','PACK',10,'staff',0,'',94),
('itm_fed010','FED010','FEEDING / ENTERAL','Nasal fixation tape 鼻贴','','','ROLL',8,'staff',0,'',95),
('itm_fed011','FED011','FEEDING / ENTERAL','NG tube securing device 鼻胃管固定器','','','EACH',15,'staff',0,'',96),
('itm_nut001','NUT001','NUTRITION / FORMULA','Ensure Gold 营养奶粉','Abbott','850g','TIN',0,'family',1,'family supplies 家属自备',97),
('itm_nut002','NUT002','NUTRITION / FORMULA','Glucerna (diabetic) 糖尿病配方','Abbott','850g','TIN',0,'family',1,'family supplies 家属自备',98),
('itm_nut003','NUT003','NUTRITION / FORMULA','Nepro (renal) 肾病配方','Abbott','400g','TIN',0,'family',1,'family supplies 家属自备',99),
('itm_nut004','NUT004','NUTRITION / FORMULA','Peptamen 短肽配方','Nestle','400g','TIN',0,'family',1,'family supplies 家属自备',100),
('itm_nut005','NUT005','NUTRITION / FORMULA','Nutren Optimum 营养配方','Nestle','800g','TIN',0,'family',1,'family supplies 家属自备',101),
('itm_nut006','NUT006','NUTRITION / FORMULA','Fresubin 营养配方','Fresenius','500ml','BOTTLE',0,'family',1,'family supplies 家属自备',102),
('itm_nut007','NUT007','NUTRITION / FORMULA','Pediasure 儿童配方','Abbott','850g','TIN',0,'family',1,'family supplies 家属自备',103),
('itm_nut008','NUT008','NUTRITION / FORMULA','Thickener 增稠剂','Resource ThickenUp','227g','TIN',0,'family',1,'for dysphagia 吞咽困难',104),
('itm_nut009','NUT009','NUTRITION / FORMULA','Oral rehydration salt 口服补液盐','','sachet','PACK',8,'staff',0,'',105),
('itm_ivl001','IVL001','IV / INJECTION','IV cannula 静脉留置针','B.Braun Vasofix','18G green','EACH',12,'staff',0,'',106),
('itm_ivl002','IVL002','IV / INJECTION','IV cannula 静脉留置针','B.Braun Vasofix','20G pink','EACH',12,'staff',0,'',107),
('itm_ivl003','IVL003','IV / INJECTION','IV cannula 静脉留置针','B.Braun Vasofix','22G blue','EACH',12,'staff',0,'',108),
('itm_ivl004','IVL004','IV / INJECTION','IV cannula 静脉留置针','B.Braun Vasofix','24G yellow','EACH',12,'staff',0,'',109),
('itm_ivl005','IVL005','IV / INJECTION','IV giving set 输液器','','standard','EACH',15,'staff',0,'',110),
('itm_ivl006','IVL006','IV / INJECTION','Burette set 精密输液器','','150ml','EACH',25,'staff',0,'',111),
('itm_ivl007','IVL007','IV / INJECTION','Extension tubing 延长管','','','EACH',10,'staff',0,'',112),
('itm_ivl008','IVL008','IV / INJECTION','Three-way stopcock 三通','','','EACH',8,'staff',0,'',113),
('itm_ivl009','IVL009','IV / INJECTION','Cannula fixation dressing 留置针敷料','Tegaderm IV','','EACH',6,'staff',0,'',114),
('itm_ivl010','IVL010','IV / INJECTION','Syringe 针筒','Terumo','1ml','EACH',2,'staff',0,'',115),
('itm_ivl011','IVL011','IV / INJECTION','Syringe 针筒','Terumo','3ml','EACH',2,'staff',0,'',116),
('itm_ivl012','IVL012','IV / INJECTION','Syringe 针筒','Terumo','5ml','EACH',3,'staff',0,'',117),
('itm_ivl013','IVL013','IV / INJECTION','Syringe 针筒','Terumo','10ml','EACH',3,'staff',0,'',118),
('itm_ivl014','IVL014','IV / INJECTION','Syringe 针筒','Terumo','20ml','EACH',4,'staff',0,'',119),
('itm_ivl015','IVL015','IV / INJECTION','Syringe 针筒','Terumo','50ml','EACH',6,'staff',0,'',120),
('itm_ivl016','IVL016','IV / INJECTION','Insulin syringe 胰岛素针筒','BD','1ml 30G','EACH',3,'staff',0,'',121),
('itm_ivl017','IVL017','IV / INJECTION','Needle 针头','Terumo','21G','EACH',2,'staff',0,'',122),
('itm_ivl018','IVL018','IV / INJECTION','Needle 针头','Terumo','23G','EACH',2,'staff',0,'',123),
('itm_ivl019','IVL019','IV / INJECTION','Needle 针头','Terumo','25G','EACH',2,'staff',0,'',124),
('itm_ivl020','IVL020','IV / INJECTION','Butterfly needle 蝴蝶针','Terumo','23G','EACH',5,'staff',0,'',125),
('itm_ivl021','IVL021','IV / INJECTION','Normal saline IV 生理盐水点滴','Baxter','500ml','BOTTLE',18,'staff',0,'',126),
('itm_ivl022','IVL022','IV / INJECTION','Normal saline IV 生理盐水点滴','Baxter','1000ml','BOTTLE',22,'staff',0,'',127),
('itm_ivl023','IVL023','IV / INJECTION','Dextrose 5% 葡萄糖点滴','Baxter','500ml','BOTTLE',20,'staff',0,'',128),
('itm_ivl024','IVL024','IV / INJECTION','Hartmann''s / RL solution 乳酸林格液','Baxter','500ml','BOTTLE',20,'staff',0,'',129),
('itm_ivl025','IVL025','IV / INJECTION','Sharps bin 利器盒','','1L','EACH',15,'staff',0,'',130),
('itm_ivl026','IVL026','IV / INJECTION','Tourniquet 止血带','','','EACH',8,'staff',0,'',131),
('itm_rsp001','RSP001','RESPIRATORY / OXYGEN','Nasal cannula 鼻导管','','adult','EACH',8,'staff',0,'',132),
('itm_rsp002','RSP002','RESPIRATORY / OXYGEN','Oxygen mask 氧气面罩','','adult','EACH',12,'staff',0,'',133),
('itm_rsp003','RSP003','RESPIRATORY / OXYGEN','Non-rebreather mask 储氧面罩','','adult','EACH',18,'staff',0,'',134),
('itm_rsp004','RSP004','RESPIRATORY / OXYGEN','Venturi mask 文丘里面罩','','adult','EACH',25,'staff',1,'',135),
('itm_rsp005','RSP005','RESPIRATORY / OXYGEN','Nebuliser mask kit 雾化面罩','','adult','SET',15,'staff',0,'',136),
('itm_rsp006','RSP006','RESPIRATORY / OXYGEN','Nebuliser machine 雾化机','Omron','','UNIT',0,'family',1,'rental / purchase 租借或购买',137),
('itm_rsp007','RSP007','RESPIRATORY / OXYGEN','Oxygen concentrator 制氧机','','5L','UNIT',0,'family',1,'rental — arrange ahead 租借，需提前安排',138),
('itm_rsp008','RSP008','RESPIRATORY / OXYGEN','Oxygen cylinder 氧气筒','','portable','UNIT',0,'family',1,'rental 租借',139),
('itm_rsp009','RSP009','RESPIRATORY / OXYGEN','Humidifier bottle 湿化瓶','','','EACH',25,'staff',0,'',140),
('itm_rsp010','RSP010','RESPIRATORY / OXYGEN','Suction catheter 抽痰管','Romsons','Fr10','EACH',6,'staff',0,'',141),
('itm_rsp011','RSP011','RESPIRATORY / OXYGEN','Suction catheter 抽痰管','Romsons','Fr12','EACH',6,'staff',0,'',142),
('itm_rsp012','RSP012','RESPIRATORY / OXYGEN','Suction catheter 抽痰管','Romsons','Fr14','EACH',6,'staff',0,'',143),
('itm_rsp013','RSP013','RESPIRATORY / OXYGEN','Yankauer suction tip 吸痰头','','','EACH',10,'staff',0,'',144),
('itm_rsp014','RSP014','RESPIRATORY / OXYGEN','Suction machine 抽痰机','','','UNIT',0,'family',1,'rental 租借',145),
('itm_rsp015','RSP015','RESPIRATORY / OXYGEN','Suction tubing 抽痰管路','','','EACH',15,'staff',0,'',146),
('itm_rsp016','RSP016','RESPIRATORY / OXYGEN','Tracheostomy tube 气切管','Portex','size 7.0','EACH',0,'staff',1,'quote on request 需另报价',147),
('itm_rsp017','RSP017','RESPIRATORY / OXYGEN','Tracheostomy dressing 气切敷料','','','EACH',12,'staff',0,'',148),
('itm_rsp018','RSP018','RESPIRATORY / OXYGEN','Trache tie 气切固定带','','','EACH',15,'staff',0,'',149),
('itm_rsp019','RSP019','RESPIRATORY / OXYGEN','HME filter 人工鼻','','','EACH',18,'staff',0,'',150),
('itm_ppe001','PPE001','PPE / INFECTION CONTROL','Sterile gloves 无菌手套','Ansell','size 6.5','PAIR',5,'staff',0,'',151),
('itm_ppe002','PPE002','PPE / INFECTION CONTROL','Sterile gloves 无菌手套','Ansell','size 7.0','PAIR',5,'staff',0,'',152),
('itm_ppe003','PPE003','PPE / INFECTION CONTROL','Sterile gloves 无菌手套','Ansell','size 7.5','PAIR',5,'staff',0,'',153),
('itm_ppe004','PPE004','PPE / INFECTION CONTROL','Examination gloves 检查手套','Hartalega','S','BOX',35,'staff',0,'',154),
('itm_ppe005','PPE005','PPE / INFECTION CONTROL','Examination gloves 检查手套','Hartalega','M','BOX',35,'staff',0,'',155),
('itm_ppe006','PPE006','PPE / INFECTION CONTROL','Examination gloves 检查手套','Hartalega','L','BOX',35,'staff',0,'',156),
('itm_ppe007','PPE007','PPE / INFECTION CONTROL','Face mask 3-ply 口罩','','','BOX',15,'staff',0,'',157),
('itm_ppe008','PPE008','PPE / INFECTION CONTROL','N95 respirator N95口罩','3M','','EACH',6,'staff',0,'',158),
('itm_ppe009','PPE009','PPE / INFECTION CONTROL','Disposable apron 一次性围裙','','','EACH',3,'staff',0,'',159),
('itm_ppe010','PPE010','PPE / INFECTION CONTROL','Isolation gown 隔离衣','','','EACH',12,'staff',0,'',160),
('itm_ppe011','PPE011','PPE / INFECTION CONTROL','Face shield 面罩','','','EACH',8,'staff',0,'',161),
('itm_ppe012','PPE012','PPE / INFECTION CONTROL','Hand sanitiser 洗手液','','500ml','BOTTLE',15,'staff',0,'',162),
('itm_ppe013','PPE013','PPE / INFECTION CONTROL','Surface disinfectant 表面消毒液','','500ml','BOTTLE',20,'staff',0,'',163),
('itm_ppe014','PPE014','PPE / INFECTION CONTROL','Clinical waste bag 医疗垃圾袋','','yellow','PACK',12,'staff',0,'',164),
('itm_ppe015','PPE015','PPE / INFECTION CONTROL','Shoe cover 鞋套','','','PACK',10,'staff',0,'',165),
('itm_psc001','PSC001','PERSONAL CARE / CONTINENCE','Adult diaper tape 成人纸尿裤','MamyPoko','M','EACH',3,'staff',0,'',166),
('itm_psc002','PSC002','PERSONAL CARE / CONTINENCE','Adult diaper tape 成人纸尿裤','MamyPoko','L','EACH',3.5,'staff',0,'',167),
('itm_psc003','PSC003','PERSONAL CARE / CONTINENCE','Adult diaper tape 成人纸尿裤','Certainty','XL','EACH',4,'staff',0,'',168),
('itm_psc004','PSC004','PERSONAL CARE / CONTINENCE','Adult pull-up pants 成人拉拉裤','Certainty','M','EACH',4,'staff',0,'',169),
('itm_psc005','PSC005','PERSONAL CARE / CONTINENCE','Adult pull-up pants 成人拉拉裤','Certainty','L','EACH',4.5,'staff',0,'',170),
('itm_psc006','PSC006','PERSONAL CARE / CONTINENCE','Underpad 看护垫','','60x90cm','EACH',3,'staff',0,'',171),
('itm_psc007','PSC007','PERSONAL CARE / CONTINENCE','Underpad 看护垫','','60x60cm','EACH',2,'staff',0,'',172),
('itm_psc008','PSC008','PERSONAL CARE / CONTINENCE','Wet wipes 湿纸巾','','80s','PACK',8,'staff',0,'',173),
('itm_psc009','PSC009','PERSONAL CARE / CONTINENCE','Barrier cream 隔离膏','Sudocrem','125g','TUBE',25,'staff',0,'',174),
('itm_psc010','PSC010','PERSONAL CARE / CONTINENCE','Zinc oxide cream 氧化锌膏','','50g','TUBE',15,'staff',0,'',175),
('itm_psc011','PSC011','PERSONAL CARE / CONTINENCE','Rinse-free bath foam 免冲洗沐浴泡','','500ml','BOTTLE',30,'staff',0,'',176),
('itm_psc012','PSC012','PERSONAL CARE / CONTINENCE','Dry shampoo cap 免洗洗发帽','','','EACH',15,'staff',0,'',177),
('itm_psc013','PSC013','PERSONAL CARE / CONTINENCE','Mouth care swab 口腔棉棒','','','PACK',12,'staff',0,'',178),
('itm_psc014','PSC014','PERSONAL CARE / CONTINENCE','Oral gel 口腔凝胶','Biotene','','TUBE',35,'staff',0,'',179),
('itm_psc015','PSC015','PERSONAL CARE / CONTINENCE','Bed bath basin 洗浴盆','','','EACH',20,'staff',0,'',180),
('itm_psc016','PSC016','PERSONAL CARE / CONTINENCE','Kidney dish 弯盘','','','EACH',8,'staff',0,'',181),
('itm_psc017','PSC017','PERSONAL CARE / CONTINENCE','Bedpan 便盆','','','EACH',25,'staff',0,'',182),
('itm_psc018','PSC018','PERSONAL CARE / CONTINENCE','Urinal bottle 尿壶','','male/female','EACH',18,'staff',0,'',183),
('itm_psc019','PSC019','PERSONAL CARE / CONTINENCE','Nail care set 指甲护理包','','','SET',20,'staff',0,'',184),
('itm_dgx001','DGX001','DIAGNOSTIC / MONITORING','Blood glucose test strip 血糖试纸','Accu-Chek','50s','BOX',75,'staff',0,'',185),
('itm_dgx002','DGX002','DIAGNOSTIC / MONITORING','Blood glucose test strip 血糖试纸','OneTouch','50s','BOX',70,'staff',0,'',186),
('itm_dgx003','DGX003','DIAGNOSTIC / MONITORING','Lancet 采血针','Accu-Chek','','BOX',25,'staff',0,'',187),
('itm_dgx004','DGX004','DIAGNOSTIC / MONITORING','Glucometer 血糖机','Accu-Chek','','UNIT',90,'staff',1,'',188),
('itm_dgx005','DGX005','DIAGNOSTIC / MONITORING','Digital thermometer 电子体温计','','','EACH',20,'staff',0,'',189),
('itm_dgx006','DGX006','DIAGNOSTIC / MONITORING','Infrared thermometer 红外线体温计','','','EACH',60,'staff',1,'',190),
('itm_dgx007','DGX007','DIAGNOSTIC / MONITORING','BP monitor 血压计','Omron','arm','UNIT',180,'staff',1,'',191),
('itm_dgx008','DGX008','DIAGNOSTIC / MONITORING','Pulse oximeter 血氧仪','','finger','EACH',70,'staff',1,'',192),
('itm_dgx009','DGX009','DIAGNOSTIC / MONITORING','Urine test strip 尿试纸','','100s','BOX',60,'staff',0,'',193),
('itm_dgx010','DGX010','DIAGNOSTIC / MONITORING','Blood collection tube 采血管','BD Vacutainer','','EACH',5,'staff',0,'',194),
('itm_dgx011','DGX011','DIAGNOSTIC / MONITORING','Specimen container 标本瓶','','','EACH',3,'staff',0,'',195),
('itm_dgx012','DGX012','DIAGNOSTIC / MONITORING','Stethoscope 听诊器','Littmann','','EACH',0,'staff',1,'nurse''s own equipment',196),
('itm_eqp001','EQP001','MOBILITY & EQUIPMENT','Air mattress (alternating) 气垫床','','','UNIT',0,'family',1,'rental — arrange a few days ahead 租借，请提前几天安排',197),
('itm_eqp002','EQP002','MOBILITY & EQUIPMENT','Hospital bed 医院病床','','3-function','UNIT',0,'family',1,'rental — arrange a few days ahead 租借',198),
('itm_eqp003','EQP003','MOBILITY & EQUIPMENT','Wheelchair 轮椅','','standard','UNIT',0,'family',1,'rental 租借',199),
('itm_eqp004','EQP004','MOBILITY & EQUIPMENT','Commode chair 便椅','','','UNIT',0,'family',1,'rental 租借',200),
('itm_eqp005','EQP005','MOBILITY & EQUIPMENT','Walking frame 助行架','','','UNIT',0,'family',1,'',201),
('itm_eqp006','EQP006','MOBILITY & EQUIPMENT','Walking stick 拐杖','','','EACH',0,'family',1,'',202),
('itm_eqp007','EQP007','MOBILITY & EQUIPMENT','Patient hoist 移位机','','','UNIT',0,'family',1,'rental — arrange ahead 租借',203),
('itm_eqp008','EQP008','MOBILITY & EQUIPMENT','Transfer sheet / slide 移位单','','','EACH',60,'staff',1,'',204),
('itm_eqp009','EQP009','MOBILITY & EQUIPMENT','Bed rail 床栏','','pair','SET',0,'family',1,'rental 租借',205),
('itm_eqp010','EQP010','MOBILITY & EQUIPMENT','Over-bed table 床上桌','','','UNIT',0,'family',1,'rental 租借',206),
('itm_eqp011','EQP011','MOBILITY & EQUIPMENT','Ripple cushion 防褥疮坐垫','','','EACH',0,'family',1,'',207),
('itm_eqp012','EQP012','MOBILITY & EQUIPMENT','Heel protector 足跟保护垫','','pair','SET',55,'staff',0,'',208),
('itm_msc001','MSC001','PROCEDURE & MISC','Suture set 缝合包','','','SET',45,'staff',1,'',209),
('itm_msc002','MSC002','PROCEDURE & MISC','Suture removal set 拆线包','','','SET',25,'staff',0,'',210),
('itm_msc003','MSC003','PROCEDURE & MISC','Disposable scissors 一次性剪刀','','','EACH',8,'staff',0,'',211),
('itm_msc004','MSC004','PROCEDURE & MISC','Disposable forceps 一次性镊子','','','EACH',6,'staff',0,'',212),
('itm_msc005','MSC005','PROCEDURE & MISC','Sterile drape 无菌洞巾','','','EACH',12,'staff',0,'',213),
('itm_msc006','MSC006','PROCEDURE & MISC','Disposable underpad sterile 无菌垫','','','EACH',6,'staff',0,'',214),
('itm_msc007','MSC007','PROCEDURE & MISC','Measuring jug 量杯','','','EACH',12,'staff',0,'',215),
('itm_msc008','MSC008','PROCEDURE & MISC','Ice pack 冰袋','','','EACH',15,'staff',0,'',216),
('itm_msc009','MSC009','PROCEDURE & MISC','Hot pack 热敷袋','','','EACH',15,'staff',0,'',217),
('itm_msc010','MSC010','PROCEDURE & MISC','Weighing scale 体重秤','','','UNIT',0,'family',1,'',218),
('itm_msc011','MSC011','PROCEDURE & MISC','Pill organiser 药盒','','weekly','EACH',15,'staff',0,'',219),
('itm_msc012','MSC012','PROCEDURE & MISC','Pill crusher 磨药器','','','EACH',20,'staff',0,'',220),
('itm_msc013','MSC013','PROCEDURE & MISC','Medication cup 药杯','','','PACK',8,'staff',0,'',221),
('itm_msc014','MSC014','PROCEDURE & MISC','Documentation / chart pack 记录表','','','SET',0,'staff',0,'included 已包含',222),
('itm_ins001','INS001','NURSING INSTRUMENTS (REUSABLE)','Dressing forceps 换药镊','','13cm','EACH',35,'staff',0,'reusable — autoclave 可重复消毒',223),
('itm_ins002','INS002','NURSING INSTRUMENTS (REUSABLE)','Tissue forceps toothed 有齿镊','','14cm','EACH',38,'staff',0,'reusable 可重复消毒',224),
('itm_ins003','INS003','NURSING INSTRUMENTS (REUSABLE)','Non-toothed forceps 无齿镊','','14cm','EACH',38,'staff',0,'reusable 可重复消毒',225),
('itm_ins004','INS004','NURSING INSTRUMENTS (REUSABLE)','Artery forceps 止血钳','Spencer Wells','14cm','EACH',45,'staff',0,'reusable 可重复消毒',226),
('itm_ins005','INS005','NURSING INSTRUMENTS (REUSABLE)','Sponge holding forceps 持物钳','','20cm','EACH',55,'staff',0,'reusable 可重复消毒',227),
('itm_ins006','INS006','NURSING INSTRUMENTS (REUSABLE)','Dressing scissors 换药剪','','14cm','EACH',40,'staff',0,'reusable 可重复消毒',228),
('itm_ins007','INS007','NURSING INSTRUMENTS (REUSABLE)','Stitch / suture scissors 拆线剪','','11cm','EACH',38,'staff',0,'reusable 可重复消毒',229),
('itm_ins008','INS008','NURSING INSTRUMENTS (REUSABLE)','Bandage scissors 绷带剪','Lister','18cm','EACH',45,'staff',0,'reusable 可重复消毒',230),
('itm_ins009','INS009','NURSING INSTRUMENTS (REUSABLE)','Needle holder 持针器','','14cm','EACH',60,'staff',0,'reusable 可重复消毒',231),
('itm_ins010','INS010','NURSING INSTRUMENTS (REUSABLE)','Scalpel handle 手术刀柄','','No.3','EACH',30,'staff',0,'reusable 可重复消毒',232),
('itm_ins011','INS011','NURSING INSTRUMENTS (REUSABLE)','Scalpel blade 手术刀片','Swann-Morton','No.11 / 15','BOX',35,'staff',0,'single use 一次性',233),
('itm_ins012','INS012','NURSING INSTRUMENTS (REUSABLE)','Gallipot 药杯','stainless','60ml','EACH',20,'staff',0,'reusable 可重复消毒',234),
('itm_ins013','INS013','NURSING INSTRUMENTS (REUSABLE)','Kidney dish stainless 不锈钢弯盘','stainless','8 inch','EACH',30,'staff',0,'reusable 可重复消毒',235),
('itm_ins014','INS014','NURSING INSTRUMENTS (REUSABLE)','Instrument tray 器械盘','stainless','medium','EACH',45,'staff',0,'reusable 可重复消毒',236),
('itm_ins015','INS015','NURSING INSTRUMENTS (REUSABLE)','Dressing trolley 换药车','stainless','2-tier','UNIT',450,'staff',1,'clinic / facility use',237),
('itm_ins016','INS016','NURSING INSTRUMENTS (REUSABLE)','Instrument box 器械盒','stainless','','EACH',55,'staff',0,'reusable 可重复消毒',238),
('itm_ins017','INS017','NURSING INSTRUMENTS (REUSABLE)','Sterilisation pouch 消毒袋','','assorted','BOX',40,'staff',0,'single use 一次性',239),
('itm_ins018','INS018','NURSING INSTRUMENTS (REUSABLE)','Autoclave tape 消毒指示胶带','','','ROLL',18,'staff',0,'',240),
('itm_ins019','INS019','NURSING INSTRUMENTS (REUSABLE)','Tongue depressor 压舌板','','','PACK',10,'staff',0,'single use 一次性',241),
('itm_ins020','INS020','NURSING INSTRUMENTS (REUSABLE)','Torch / penlight 手电筒','','','EACH',25,'staff',0,'for pupil check',242),
('itm_ins021','INS021','NURSING INSTRUMENTS (REUSABLE)','Tape measure 软尺','','150cm','EACH',8,'staff',0,'for wound measuring',243),
('itm_ins022','INS022','NURSING INSTRUMENTS (REUSABLE)','Wound measuring guide 伤口测量尺','','','PACK',15,'staff',0,'',244),
('itm_dev001','DEV001','MEDICAL EQUIPMENT / DEVICES','Infusion pump 输液泵','','','UNIT',0,'family',1,'rental — arrange ahead 租借，需提前安排',245),
('itm_dev002','DEV002','MEDICAL EQUIPMENT / DEVICES','Syringe pump 注射泵','','','UNIT',0,'family',1,'rental — arrange ahead 租借',246),
('itm_dev003','DEV003','MEDICAL EQUIPMENT / DEVICES','Enteral feeding pump 喂食泵','','','UNIT',0,'family',1,'rental 租借',247),
('itm_dev004','DEV004','MEDICAL EQUIPMENT / DEVICES','Suction machine 抽痰机','','portable','UNIT',0,'family',1,'rental 租借',248),
('itm_dev005','DEV005','MEDICAL EQUIPMENT / DEVICES','Nebuliser machine 雾化机','Omron','','UNIT',0,'family',1,'rental or purchase 租借或购买',249),
('itm_dev006','DEV006','MEDICAL EQUIPMENT / DEVICES','Oxygen concentrator 制氧机','','5L','UNIT',0,'family',1,'rental — arrange ahead 租借',250),
('itm_dev007','DEV007','MEDICAL EQUIPMENT / DEVICES','Portable oxygen cylinder 便携氧气筒','','','UNIT',0,'family',1,'rental 租借',251),
('itm_dev008','DEV008','MEDICAL EQUIPMENT / DEVICES','CPAP machine 呼吸机','ResMed','','UNIT',0,'family',1,'as prescribed 需医生处方',252),
('itm_dev009','DEV009','MEDICAL EQUIPMENT / DEVICES','BiPAP machine 双水平呼吸机','ResMed','','UNIT',0,'family',1,'as prescribed 需医生处方',253),
('itm_dev010','DEV010','MEDICAL EQUIPMENT / DEVICES','Patient monitor 监护仪','','multi-para','UNIT',0,'family',1,'rental 租借',254),
('itm_dev011','DEV011','MEDICAL EQUIPMENT / DEVICES','ECG machine 心电图机','','3-channel','UNIT',0,'family',1,'facility use',255),
('itm_dev012','DEV012','MEDICAL EQUIPMENT / DEVICES','Doppler (vascular) 多普勒','','8MHz','UNIT',0,'family',1,'for ABPI / pulse check',256),
('itm_dev013','DEV013','MEDICAL EQUIPMENT / DEVICES','Bladder scanner 膀胱扫描仪','','','UNIT',0,'family',1,'facility use',257),
('itm_dev014','DEV014','MEDICAL EQUIPMENT / DEVICES','Alternating pressure pump 气垫泵','','','UNIT',0,'family',1,'with air mattress 配气垫床',258),
('itm_dev015','DEV015','MEDICAL EQUIPMENT / DEVICES','Weighing scale 体重秤','','adult','UNIT',0,'family',1,'',259),
('itm_dev016','DEV016','MEDICAL EQUIPMENT / DEVICES','Chair weighing scale 座椅秤','','','UNIT',0,'family',1,'for non-ambulant patient',260),
('itm_dev017','DEV017','MEDICAL EQUIPMENT / DEVICES','Feeding pump giving set 喂食泵管','','','SET',45,'staff',1,'',261),
('itm_dev018','DEV018','MEDICAL EQUIPMENT / DEVICES','Infusion pump giving set 输液泵管','','','SET',35,'staff',1,'',262),
('itm_dev019','DEV019','MEDICAL EQUIPMENT / DEVICES','ECG electrode 心电电极片','','','PACK',25,'staff',0,'',263),
('itm_dev020','DEV020','MEDICAL EQUIPMENT / DEVICES','Ultrasound gel 超声耦合剂','','250ml','BOTTLE',18,'staff',0,'',264),
('itm_dev021','DEV021','MEDICAL EQUIPMENT / DEVICES','TENS machine 电疗仪','','','UNIT',0,'family',1,'',265),
('itm_emr001','EMR001','EMERGENCY / RESUSCITATION','Ambu bag (BVM) 简易呼吸器','','adult','EACH',180,'staff',1,'',266),
('itm_emr002','EMR002','EMERGENCY / RESUSCITATION','Ambu bag (BVM) 简易呼吸器','','paediatric','EACH',165,'staff',1,'',267),
('itm_emr003','EMR003','EMERGENCY / RESUSCITATION','Pocket mask CPR面罩','','','EACH',55,'staff',0,'',268),
('itm_emr004','EMR004','EMERGENCY / RESUSCITATION','Oropharyngeal airway 口咽通气道','Guedel','assorted','SET',35,'staff',1,'',269),
('itm_emr005','EMR005','EMERGENCY / RESUSCITATION','First aid kit 急救包','','home care','SET',85,'staff',0,'',270),
('itm_emr006','EMR006','EMERGENCY / RESUSCITATION','Emergency drug box 急救药箱','','','SET',0,'staff',1,'contents per doctor''s order 依医嘱',271),
('itm_emr007','EMR007','EMERGENCY / RESUSCITATION','Glucose gel (hypo) 葡萄糖凝胶','','25g','EACH',18,'staff',0,'for hypoglycaemia 低血糖用',272),
('itm_emr008','EMR008','EMERGENCY / RESUSCITATION','Instant ice pack 速冷冰袋','','','EACH',12,'staff',0,'',273),
('itm_emr009','EMR009','EMERGENCY / RESUSCITATION','Emergency blanket 保温毯','','','EACH',15,'staff',0,'',274),
('itm_emr010','EMR010','EMERGENCY / RESUSCITATION','Cervical collar 颈托','','adjustable','EACH',65,'staff',1,'',275),
('itm_mpn001','MPN001','MEDICATION - ANALGESIA & PAIN','Paracetamol 扑热息痛','Panadol','500mg tab','PACK',12,'staff',0,'OTC 非处方',276),
('itm_mpn002','MPN002','MEDICATION - ANALGESIA & PAIN','Paracetamol syrup 退烧糖浆','Panadol','120mg/5ml','BOTTLE',15,'staff',0,'OTC 非处方',277),
('itm_mpn003','MPN003','MEDICATION - ANALGESIA & PAIN','Ibuprofen 布洛芬','Brufen','400mg tab','PACK',15,'staff',0,'OTC 非处方',278),
('itm_mpn004','MPN004','MEDICATION - ANALGESIA & PAIN','Diclofenac 双氯芬酸','Voltaren','50mg tab','PACK',0,'family',1,'Rx prescription only 需医生处方',279),
('itm_mpn005','MPN005','MEDICATION - ANALGESIA & PAIN','Diclofenac gel 外用止痛膏','Voltaren Emulgel','20g','TUBE',25,'staff',0,'OTC 非处方',280),
('itm_mpn006','MPN006','MEDICATION - ANALGESIA & PAIN','Mefenamic acid 甲芬那酸','Ponstan','500mg cap','PACK',0,'family',1,'Rx prescription only 需医生处方',281),
('itm_mpn007','MPN007','MEDICATION - ANALGESIA & PAIN','Tramadol 曲马多','','50mg cap','PACK',0,'family',1,'Rx prescription only 需医生处方',282),
('itm_mpn008','MPN008','MEDICATION - ANALGESIA & PAIN','Morphine oral solution 吗啡口服液','','10mg/5ml','BOTTLE',0,'family',1,'Controlled drug 管制药 — CD register required',283),
('itm_mpn009','MPN009','MEDICATION - ANALGESIA & PAIN','Morphine injection 吗啡注射','','10mg/ml','AMPOULE',0,'family',1,'Controlled drug 管制药 — CD register required',284),
('itm_mpn010','MPN010','MEDICATION - ANALGESIA & PAIN','Fentanyl patch 芬太尼贴片','Durogesic','25mcg/h','EACH',0,'family',1,'Controlled drug 管制药',285),
('itm_mpn011','MPN011','MEDICATION - ANALGESIA & PAIN','Lignocaine gel 局部麻醉凝胶','Xylocaine','2%','TUBE',0,'family',1,'Rx prescription only 需医生处方',286),
('itm_mab001','MAB001','MEDICATION - ANTIBIOTIC & ANTIMICROBIAL','Amoxicillin 阿莫西林','','500mg cap','PACK',0,'family',1,'Rx prescription only 需医生处方',287),
('itm_mab002','MAB002','MEDICATION - ANTIBIOTIC & ANTIMICROBIAL','Amoxicillin-clavulanate 阿莫西林克拉维酸','Augmentin','625mg tab','PACK',0,'family',1,'Rx prescription only 需医生处方',288),
('itm_mab003','MAB003','MEDICATION - ANTIBIOTIC & ANTIMICROBIAL','Cloxacillin 氯唑西林','','500mg cap','PACK',0,'family',1,'Rx prescription only 需医生处方',289),
('itm_mab004','MAB004','MEDICATION - ANTIBIOTIC & ANTIMICROBIAL','Cephalexin 头孢氨苄','','500mg cap','PACK',0,'family',1,'Rx prescription only 需医生处方',290),
('itm_mab005','MAB005','MEDICATION - ANTIBIOTIC & ANTIMICROBIAL','Ciprofloxacin 环丙沙星','','500mg tab','PACK',0,'family',1,'Rx prescription only 需医生处方',291),
('itm_mab006','MAB006','MEDICATION - ANTIBIOTIC & ANTIMICROBIAL','Metronidazole 甲硝唑','Flagyl','400mg tab','PACK',0,'family',1,'Rx prescription only 需医生处方',292),
('itm_mab007','MAB007','MEDICATION - ANTIBIOTIC & ANTIMICROBIAL','Doxycycline 强力霉素','','100mg cap','PACK',0,'family',1,'Rx prescription only 需医生处方',293),
('itm_mab008','MAB008','MEDICATION - ANTIBIOTIC & ANTIMICROBIAL','Fusidic acid cream 夫西地酸乳膏','Fucidin','15g','TUBE',0,'family',1,'Rx prescription only 需医生处方',294),
('itm_mab009','MAB009','MEDICATION - ANTIBIOTIC & ANTIMICROBIAL','Mupirocin ointment 莫匹罗星软膏','Bactroban','15g','TUBE',0,'family',1,'Rx prescription only 需医生处方',295),
('itm_mab010','MAB010','MEDICATION - ANTIBIOTIC & ANTIMICROBIAL','Silver sulfadiazine 磺胺嘧啶银','Silverex / Flamazine','50g','TUBE',0,'family',1,'Rx prescription only 需医生处方',296),
('itm_mab011','MAB011','MEDICATION - ANTIBIOTIC & ANTIMICROBIAL','Clotrimazole cream 克霉唑乳膏','Canesten','20g','TUBE',22,'staff',0,'OTC 非处方',297),
('itm_mab012','MAB012','MEDICATION - ANTIBIOTIC & ANTIMICROBIAL','Ketoconazole cream 酮康唑乳膏','Nizoral','15g','TUBE',0,'family',1,'Rx prescription only 需医生处方',298),
('itm_mab013','MAB013','MEDICATION - ANTIBIOTIC & ANTIMICROBIAL','Nystatin oral suspension 制霉菌素','','100000u/ml','BOTTLE',0,'family',1,'Rx prescription only 需医生处方',299),
('itm_mdb001','MDB001','MEDICATION - DIABETES','Metformin 二甲双胍','Glucophage','500mg tab','PACK',0,'family',1,'Rx prescription only 需医生处方',300),
('itm_mdb002','MDB002','MEDICATION - DIABETES','Gliclazide 格列齐特','Diamicron','30mg MR tab','PACK',0,'family',1,'Rx prescription only 需医生处方',301),
('itm_mdb003','MDB003','MEDICATION - DIABETES','Insulin rapid-acting 速效胰岛素','NovoRapid','100u/ml pen','EACH',0,'family',1,'Rx prescription only 需医生处方 — keep refrigerated 冷藏',302),
('itm_mdb004','MDB004','MEDICATION - DIABETES','Insulin short-acting 短效胰岛素','Actrapid','100u/ml vial','EACH',0,'family',1,'Rx prescription only 需医生处方 — keep refrigerated 冷藏',303),
('itm_mdb005','MDB005','MEDICATION - DIABETES','Insulin premixed 预混胰岛素','Mixtard 30','100u/ml pen','EACH',0,'family',1,'Rx prescription only 需医生处方 — keep refrigerated 冷藏',304),
('itm_mdb006','MDB006','MEDICATION - DIABETES','Insulin long-acting 长效胰岛素','Lantus','100u/ml pen','EACH',0,'family',1,'Rx prescription only 需医生处方 — keep refrigerated 冷藏',305),
('itm_mdb007','MDB007','MEDICATION - DIABETES','Insulin pen needle 胰岛素笔针头','BD / NovoFine','32G 4mm','BOX',35,'staff',0,'OTC 非处方',306),
('itm_mdb008','MDB008','MEDICATION - DIABETES','Glucose tablet 葡萄糖片','','','PACK',12,'staff',0,'OTC 非处方 — for hypo 低血糖',307),
('itm_mcv001','MCV001','MEDICATION - CARDIOVASCULAR','Amlodipine 氨氯地平','Norvasc','5mg tab','PACK',0,'family',1,'Rx prescription only 需医生处方',308),
('itm_mcv002','MCV002','MEDICATION - CARDIOVASCULAR','Perindopril 培哚普利','Coversyl','4mg tab','PACK',0,'family',1,'Rx prescription only 需医生处方',309),
('itm_mcv003','MCV003','MEDICATION - CARDIOVASCULAR','Losartan 氯沙坦','Cozaar','50mg tab','PACK',0,'family',1,'Rx prescription only 需医生处方',310),
('itm_mcv004','MCV004','MEDICATION - CARDIOVASCULAR','Bisoprolol 比索洛尔','Concor','5mg tab','PACK',0,'family',1,'Rx prescription only 需医生处方',311),
('itm_mcv005','MCV005','MEDICATION - CARDIOVASCULAR','Metoprolol 美托洛尔','','50mg tab','PACK',0,'family',1,'Rx prescription only 需医生处方',312),
('itm_mcv006','MCV006','MEDICATION - CARDIOVASCULAR','Frusemide (furosemide) 呋塞米','Lasix','40mg tab','PACK',0,'family',1,'Rx prescription only 需医生处方',313),
('itm_mcv007','MCV007','MEDICATION - CARDIOVASCULAR','Spironolactone 螺内酯','Aldactone','25mg tab','PACK',0,'family',1,'Rx prescription only 需医生处方',314),
('itm_mcv008','MCV008','MEDICATION - CARDIOVASCULAR','Digoxin 地高辛','Lanoxin','0.25mg tab','PACK',0,'family',1,'Rx prescription only 需医生处方',315),
('itm_mcv009','MCV009','MEDICATION - CARDIOVASCULAR','Atorvastatin 阿托伐他汀','Lipitor','20mg tab','PACK',0,'family',1,'Rx prescription only 需医生处方',316),
('itm_mcv010','MCV010','MEDICATION - CARDIOVASCULAR','Simvastatin 辛伐他汀','','20mg tab','PACK',0,'family',1,'Rx prescription only 需医生处方',317),
('itm_mcv011','MCV011','MEDICATION - CARDIOVASCULAR','GTN sublingual 硝酸甘油舌下片','Glyceryl trinitrate','0.5mg','BOTTLE',0,'family',1,'Rx prescription only 需医生处方',318),
('itm_mcv012','MCV012','MEDICATION - CARDIOVASCULAR','Isosorbide dinitrate 硝酸异山梨酯','Isordil','10mg tab','PACK',0,'family',1,'Rx prescription only 需医生处方',319),
('itm_mac001','MAC001','MEDICATION - BLOOD & ANTICOAGULANT','Aspirin 阿司匹林','','100mg tab','PACK',0,'family',1,'Rx prescription only 需医生处方',320),
('itm_mac002','MAC002','MEDICATION - BLOOD & ANTICOAGULANT','Clopidogrel 氯吡格雷','Plavix','75mg tab','PACK',0,'family',1,'Rx prescription only 需医生处方',321),
('itm_mac003','MAC003','MEDICATION - BLOOD & ANTICOAGULANT','Warfarin 华法林','','3mg tab','PACK',0,'family',1,'Rx prescription only 需医生处方 — INR monitoring 需监测',322),
('itm_mac004','MAC004','MEDICATION - BLOOD & ANTICOAGULANT','Enoxaparin 依诺肝素','Clexane','40mg/0.4ml','SYRINGE',0,'family',1,'Rx prescription only 需医生处方',323),
('itm_mac005','MAC005','MEDICATION - BLOOD & ANTICOAGULANT','Rivaroxaban 利伐沙班','Xarelto','20mg tab','PACK',0,'family',1,'Rx prescription only 需医生处方',324),
('itm_mac006','MAC006','MEDICATION - BLOOD & ANTICOAGULANT','Ferrous fumarate 富马酸亚铁','','200mg tab','PACK',18,'staff',0,'OTC 非处方',325),
('itm_mac007','MAC007','MEDICATION - BLOOD & ANTICOAGULANT','Folic acid 叶酸','','5mg tab','PACK',12,'staff',0,'OTC 非处方',326),
('itm_mrs001','MRS001','MEDICATION - RESPIRATORY','Salbutamol inhaler 沙丁胺醇吸入剂','Ventolin','100mcg','EACH',0,'family',1,'Rx prescription only 需医生处方',327),
('itm_mrs002','MRS002','MEDICATION - RESPIRATORY','Salbutamol nebule 沙丁胺醇雾化液','Ventolin','2.5mg/2.5ml','PACK',0,'family',1,'Rx prescription only 需医生处方',328),
('itm_mrs003','MRS003','MEDICATION - RESPIRATORY','Ipratropium nebule 异丙托溴铵','Atrovent','500mcg','PACK',0,'family',1,'Rx prescription only 需医生处方',329),
('itm_mrs004','MRS004','MEDICATION - RESPIRATORY','Combination nebule 复方雾化液','Combivent','','PACK',0,'family',1,'Rx prescription only 需医生处方',330),
('itm_mrs005','MRS005','MEDICATION - RESPIRATORY','Budesonide inhaler 布地奈德','Pulmicort','200mcg','EACH',0,'family',1,'Rx prescription only 需医生处方',331),
('itm_mrs006','MRS006','MEDICATION - RESPIRATORY','Seretide inhaler 沙美特罗氟替卡松','Seretide','250/25','EACH',0,'family',1,'Rx prescription only 需医生处方',332),
('itm_mrs007','MRS007','MEDICATION - RESPIRATORY','Normal saline nebule 生理盐水雾化','','3ml','PACK',15,'staff',0,'OTC 非处方',333),
('itm_mrs008','MRS008','MEDICATION - RESPIRATORY','Spacer / aerochamber 储雾罐','','adult','EACH',65,'staff',0,'OTC 非处方',334),
('itm_mrs009','MRS009','MEDICATION - RESPIRATORY','Carbocisteine 羧甲司坦','','375mg cap','PACK',0,'family',1,'Rx prescription only 需医生处方',335),
('itm_mgi001','MGI001','MEDICATION - GASTROINTESTINAL & BOWEL','Omeprazole 奥美拉唑','Losec','20mg cap','PACK',0,'family',1,'Rx prescription only 需医生处方',336),
('itm_mgi002','MGI002','MEDICATION - GASTROINTESTINAL & BOWEL','Pantoprazole 泮托拉唑','Controloc','40mg tab','PACK',0,'family',1,'Rx prescription only 需医生处方',337),
('itm_mgi003','MGI003','MEDICATION - GASTROINTESTINAL & BOWEL','Famotidine 法莫替丁','','20mg tab','PACK',0,'family',1,'Rx prescription only 需医生处方',338),
('itm_mgi004','MGI004','MEDICATION - GASTROINTESTINAL & BOWEL','Antacid suspension 抗酸剂','Gaviscon','200ml','BOTTLE',22,'staff',0,'OTC 非处方',339),
('itm_mgi005','MGI005','MEDICATION - GASTROINTESTINAL & BOWEL','Domperidone 多潘立酮','Motilium','10mg tab','PACK',0,'family',1,'Rx prescription only 需医生处方',340),
('itm_mgi006','MGI006','MEDICATION - GASTROINTESTINAL & BOWEL','Metoclopramide 甲氧氯普胺','Maxolon','10mg tab','PACK',0,'family',1,'Rx prescription only 需医生处方',341),
('itm_mgi007','MGI007','MEDICATION - GASTROINTESTINAL & BOWEL','Lactulose 乳果糖','Duphalac','200ml','BOTTLE',28,'staff',0,'OTC 非处方',342),
('itm_mgi008','MGI008','MEDICATION - GASTROINTESTINAL & BOWEL','Bisacodyl 比沙可啶','Dulcolax','5mg tab','PACK',15,'staff',0,'OTC 非处方',343),
('itm_mgi009','MGI009','MEDICATION - GASTROINTESTINAL & BOWEL','Bisacodyl suppository 塞剂','Dulcolax','10mg','EACH',6,'staff',0,'OTC 非处方',344),
('itm_mgi010','MGI010','MEDICATION - GASTROINTESTINAL & BOWEL','Glycerin suppository 甘油塞剂','','adult','EACH',4,'staff',0,'OTC 非处方',345),
('itm_mgi011','MGI011','MEDICATION - GASTROINTESTINAL & BOWEL','Phosphate enema 灌肠液','Fleet','133ml','EACH',18,'staff',0,'OTC 非处方',346),
('itm_mgi012','MGI012','MEDICATION - GASTROINTESTINAL & BOWEL','Senna 番泻叶','Senokot','7.5mg tab','PACK',18,'staff',0,'OTC 非处方',347),
('itm_mgi013','MGI013','MEDICATION - GASTROINTESTINAL & BOWEL','Loperamide 洛哌丁胺','Imodium','2mg cap','PACK',15,'staff',0,'OTC 非处方',348),
('itm_mgi014','MGI014','MEDICATION - GASTROINTESTINAL & BOWEL','Oral rehydration salt 口服补液盐','','sachet','PACK',8,'staff',0,'OTC 非处方',349),
('itm_mgi015','MGI015','MEDICATION - GASTROINTESTINAL & BOWEL','Hyoscine butylbromide 丁溴东莨菪碱','Buscopan','10mg tab','PACK',0,'family',1,'Rx prescription only 需医生处方',350),
('itm_mtp001','MTP001','MEDICATION - TOPICAL & SKIN','Hydrocortisone cream 氢化可的松','','1% 15g','TUBE',18,'staff',0,'OTC 非处方',351),
('itm_mtp002','MTP002','MEDICATION - TOPICAL & SKIN','Betamethasone cream 倍他米松','Betnovate','15g','TUBE',0,'family',1,'Rx prescription only 需医生处方',352),
('itm_mtp003','MTP003','MEDICATION - TOPICAL & SKIN','Zinc oxide cream 氧化锌膏','','50g','TUBE',15,'staff',0,'OTC 非处方',353),
('itm_mtp004','MTP004','MEDICATION - TOPICAL & SKIN','Barrier cream 隔离膏','Sudocrem','125g','TUBE',25,'staff',0,'OTC 非处方',354),
('itm_mtp005','MTP005','MEDICATION - TOPICAL & SKIN','Calamine lotion 炉甘石洗剂','','100ml','BOTTLE',12,'staff',0,'OTC 非处方',355),
('itm_mtp006','MTP006','MEDICATION - TOPICAL & SKIN','Emollient / moisturiser 润肤霜','Cetaphil / QV','250g','TUBE',35,'staff',0,'OTC 非处方',356),
('itm_mtp007','MTP007','MEDICATION - TOPICAL & SKIN','Menthol / analgesic balm 药膏','Counterpain','30g','TUBE',15,'staff',0,'OTC 非处方',357),
('itm_mtp008','MTP008','MEDICATION - TOPICAL & SKIN','Antiseptic cream 消毒药膏','Betadine','15g','TUBE',18,'staff',0,'OTC 非处方',358),
('itm_mtp009','MTP009','MEDICATION - TOPICAL & SKIN','Scabies lotion 疥疮洗剂','','permethrin 5%','BOTTLE',0,'family',1,'Rx prescription only 需医生处方',359),
('itm_mee001','MEE001','MEDICATION - EYE, EAR & NOSE','Chloramphenicol eye drops 氯霉素眼药水','','0.5%','BOTTLE',0,'family',1,'Rx prescription only 需医生处方',360),
('itm_mee002','MEE002','MEDICATION - EYE, EAR & NOSE','Chloramphenicol eye ointment 眼膏','','1%','TUBE',0,'family',1,'Rx prescription only 需医生处方',361),
('itm_mee003','MEE003','MEDICATION - EYE, EAR & NOSE','Artificial tears 人工泪液','Tears Naturale','15ml','BOTTLE',25,'staff',0,'OTC 非处方',362),
('itm_mee004','MEE004','MEDICATION - EYE, EAR & NOSE','Gentamicin eye drops 庆大霉素眼药水','','0.3%','BOTTLE',0,'family',1,'Rx prescription only 需医生处方',363),
('itm_mee005','MEE005','MEDICATION - EYE, EAR & NOSE','Ear wax softener 耳垢软化剂','Waxsol','10ml','BOTTLE',20,'staff',0,'OTC 非处方',364),
('itm_mee006','MEE006','MEDICATION - EYE, EAR & NOSE','Saline nasal spray 生理盐水鼻喷','','30ml','BOTTLE',18,'staff',0,'OTC 非处方',365),
('itm_mee007','MEE007','MEDICATION - EYE, EAR & NOSE','Eye wash / irrigation 洗眼液','','100ml','BOTTLE',20,'staff',0,'OTC 非处方',366),
('itm_mvt001','MVT001','MEDICATION - VITAMINS & SUPPLEMENTS','Vitamin B complex 维生素B群','','','PACK',20,'staff',0,'OTC 非处方',367),
('itm_mvt002','MVT002','MEDICATION - VITAMINS & SUPPLEMENTS','Vitamin C 维生素C','','500mg','PACK',18,'staff',0,'OTC 非处方',368),
('itm_mvt003','MVT003','MEDICATION - VITAMINS & SUPPLEMENTS','Vitamin D3 维生素D3','','1000iu','PACK',30,'staff',0,'OTC 非处方',369),
('itm_mvt004','MVT004','MEDICATION - VITAMINS & SUPPLEMENTS','Calcium + D 钙片','Caltrate','600mg','PACK',45,'staff',0,'OTC 非处方',370),
('itm_mvt005','MVT005','MEDICATION - VITAMINS & SUPPLEMENTS','Zinc supplement 锌片','','','PACK',25,'staff',0,'OTC 非处方',371),
('itm_mvt006','MVT006','MEDICATION - VITAMINS & SUPPLEMENTS','Multivitamin 综合维生素','','','PACK',35,'staff',0,'OTC 非处方',372),
('itm_mvt007','MVT007','MEDICATION - VITAMINS & SUPPLEMENTS','Protein supplement 蛋白粉','','','TIN',0,'family',1,'family supplies 家属自备',373),
('itm_mpl001','MPL001','MEDICATION - PALLIATIVE / END OF LIFE','Morphine SC injection 吗啡皮下注射','','10mg/ml','AMPOULE',0,'family',1,'Controlled drug 管制药 — per doctor''s order',374),
('itm_mpl002','MPL002','MEDICATION - PALLIATIVE / END OF LIFE','Midazolam injection 咪达唑仑','','5mg/ml','AMPOULE',0,'family',1,'Controlled drug 管制药 — per doctor''s order',375),
('itm_mpl003','MPL003','MEDICATION - PALLIATIVE / END OF LIFE','Haloperidol injection 氟哌啶醇','','5mg/ml','AMPOULE',0,'family',1,'Rx prescription only 需医生处方',376),
('itm_mpl004','MPL004','MEDICATION - PALLIATIVE / END OF LIFE','Hyoscine butylbromide inj 丁溴东莨菪碱针','Buscopan','20mg/ml','AMPOULE',0,'family',1,'Rx prescription only 需医生处方',377),
('itm_mpl005','MPL005','MEDICATION - PALLIATIVE / END OF LIFE','Metoclopramide injection 甲氧氯普胺针','','10mg/2ml','AMPOULE',0,'family',1,'Rx prescription only 需医生处方',378),
('itm_mpl006','MPL006','MEDICATION - PALLIATIVE / END OF LIFE','Dexamethasone injection 地塞米松','','4mg/ml','AMPOULE',0,'family',1,'Rx prescription only 需医生处方',379),
('itm_mpl007','MPL007','MEDICATION - PALLIATIVE / END OF LIFE','Syringe driver 微量泵','','','UNIT',0,'family',1,'rental 租借',380),
('itm_mpl008','MPL008','MEDICATION - PALLIATIVE / END OF LIFE','Syringe driver line 微量泵管','','','SET',35,'staff',1,'',381),
('itm_mpl009','MPL009','MEDICATION - PALLIATIVE / END OF LIFE','Subcutaneous butterfly set 皮下留置针','','','EACH',25,'staff',0,'',382),
('itm_mpl010','MPL010','MEDICATION - PALLIATIVE / END OF LIFE','Mouth moisturising gel 口腔保湿凝胶','','','TUBE',30,'staff',0,'OTC 非处方',383),
('itm_mem001','MEM001','MEDICATION - EMERGENCY','Adrenaline injection 肾上腺素','','1mg/ml','AMPOULE',0,'family',1,'Rx prescription only 需医生处方 — anaphylaxis',384),
('itm_mem002','MEM002','MEDICATION - EMERGENCY','Atropine injection 阿托品','','0.6mg/ml','AMPOULE',0,'family',1,'Rx prescription only 需医生处方',385),
('itm_mem003','MEM003','MEDICATION - EMERGENCY','Hydrocortisone injection 氢化可的松针','','100mg','VIAL',0,'family',1,'Rx prescription only 需医生处方',386),
('itm_mem004','MEM004','MEDICATION - EMERGENCY','Dextrose 50% 高糖','','50ml','VIAL',0,'family',1,'Rx prescription only 需医生处方 — for hypoglycaemia',387),
('itm_mem005','MEM005','MEDICATION - EMERGENCY','Naloxone injection 纳洛酮','','0.4mg/ml','AMPOULE',0,'family',1,'Rx prescription only 需医生处方 — opioid reversal',388),
('itm_mem006','MEM006','MEDICATION - EMERGENCY','Chlorpheniramine injection 扑尔敏针','Piriton','10mg/ml','AMPOULE',0,'family',1,'Rx prescription only 需医生处方',389),
('itm_mem007','MEM007','MEDICATION - EMERGENCY','Glucagon kit 胰高血糖素','','1mg','EACH',0,'family',1,'Rx prescription only 需医生处方 — for severe hypo',390);

-- 4. Re-apply code / category / brand / size for built-in items --------------
-- (keeps this file safe to run again; your edited prices are untouched)
UPDATE items SET code='WND001',category='WOUND CARE - DRESSINGS',brand='',size='',uom='SET' WHERE id='itm_wnd001';
UPDATE items SET code='WND002',category='WOUND CARE - DRESSINGS',brand='',size='5x5cm',uom='PACK' WHERE id='itm_wnd002';
UPDATE items SET code='WND003',category='WOUND CARE - DRESSINGS',brand='',size='7.5x7.5cm',uom='PACK' WHERE id='itm_wnd003';
UPDATE items SET code='WND004',category='WOUND CARE - DRESSINGS',brand='',size='10x10cm',uom='PACK' WHERE id='itm_wnd004';
UPDATE items SET code='WND005',category='WOUND CARE - DRESSINGS',brand='Melolin',size='10x10cm',uom='EACH' WHERE id='itm_wnd005';
UPDATE items SET code='WND006',category='WOUND CARE - DRESSINGS',brand='Jelonet',size='10x10cm',uom='EACH' WHERE id='itm_wnd006';
UPDATE items SET code='WND007',category='WOUND CARE - DRESSINGS',brand='Bactigras',size='10x10cm',uom='EACH' WHERE id='itm_wnd007';
UPDATE items SET code='WND008',category='WOUND CARE - DRESSINGS',brand='Tegaderm',size='6x7cm',uom='EACH' WHERE id='itm_wnd008';
UPDATE items SET code='WND009',category='WOUND CARE - DRESSINGS',brand='Tegaderm',size='10x12cm',uom='EACH' WHERE id='itm_wnd009';
UPDATE items SET code='WND010',category='WOUND CARE - DRESSINGS',brand='Opsite',size='10x12cm',uom='EACH' WHERE id='itm_wnd010';
UPDATE items SET code='WND011',category='WOUND CARE - DRESSINGS',brand='Mepilex',size='10x10cm',uom='EACH' WHERE id='itm_wnd011';
UPDATE items SET code='WND012',category='WOUND CARE - DRESSINGS',brand='Mepilex',size='15x15cm',uom='EACH' WHERE id='itm_wnd012';
UPDATE items SET code='WND013',category='WOUND CARE - DRESSINGS',brand='Mepilex Border',size='10x10cm',uom='EACH' WHERE id='itm_wnd013';
UPDATE items SET code='WND014',category='WOUND CARE - DRESSINGS',brand='Allevyn',size='10x10cm',uom='EACH' WHERE id='itm_wnd014';
UPDATE items SET code='WND015',category='WOUND CARE - DRESSINGS',brand='Mepilex Border',size='sacrum',uom='EACH' WHERE id='itm_wnd015';
UPDATE items SET code='WND016',category='WOUND CARE - DRESSINGS',brand='Allevyn',size='heel',uom='EACH' WHERE id='itm_wnd016';
UPDATE items SET code='WND017',category='WOUND CARE - DRESSINGS',brand='DuoDERM',size='10x10cm',uom='EACH' WHERE id='itm_wnd017';
UPDATE items SET code='WND018',category='WOUND CARE - DRESSINGS',brand='DuoDERM Extra Thin',size='10x10cm',uom='EACH' WHERE id='itm_wnd018';
UPDATE items SET code='WND019',category='WOUND CARE - DRESSINGS',brand='Kaltostat',size='10x10cm',uom='EACH' WHERE id='itm_wnd019';
UPDATE items SET code='WND020',category='WOUND CARE - DRESSINGS',brand='Aquacel',size='10x10cm',uom='EACH' WHERE id='itm_wnd020';
UPDATE items SET code='WND021',category='WOUND CARE - DRESSINGS',brand='Aquacel Ag',size='10x10cm',uom='EACH' WHERE id='itm_wnd021';
UPDATE items SET code='WND022',category='WOUND CARE - DRESSINGS',brand='Mepilex Ag',size='10x10cm',uom='EACH' WHERE id='itm_wnd022';
UPDATE items SET code='WND023',category='WOUND CARE - DRESSINGS',brand='Mepitel',size='7.5x10cm',uom='EACH' WHERE id='itm_wnd023';
UPDATE items SET code='WND024',category='WOUND CARE - DRESSINGS',brand='Urgotul',size='10x10cm',uom='EACH' WHERE id='itm_wnd024';
UPDATE items SET code='WND025',category='WOUND CARE - DRESSINGS',brand='Intrasite',size='15g',uom='TUBE' WHERE id='itm_wnd025';
UPDATE items SET code='WND026',category='WOUND CARE - DRESSINGS',brand='Solosite',size='85g',uom='TUBE' WHERE id='itm_wnd026';
UPDATE items SET code='WND027',category='WOUND CARE - DRESSINGS',brand='Primapore',size='10x8cm',uom='EACH' WHERE id='itm_wnd027';
UPDATE items SET code='WND028',category='WOUND CARE - DRESSINGS',brand='Hansaplast',size='assorted',uom='BOX' WHERE id='itm_wnd028';
UPDATE items SET code='WND029',category='WOUND CARE - DRESSINGS',brand='Opsite Post-Op',size='10x8cm',uom='EACH' WHERE id='itm_wnd029';
UPDATE items SET code='WND030',category='WOUND CARE - DRESSINGS',brand='',size='small',uom='SET' WHERE id='itm_wnd030';
UPDATE items SET code='CLN001',category='WOUND CARE - CLEANSING & ANTISEPTIC',brand='',size='500ml',uom='BOTTLE' WHERE id='itm_cln001';
UPDATE items SET code='CLN002',category='WOUND CARE - CLEANSING & ANTISEPTIC',brand='',size='30ml',uom='EACH' WHERE id='itm_cln002';
UPDATE items SET code='CLN003',category='WOUND CARE - CLEANSING & ANTISEPTIC',brand='',size='100ml',uom='BOTTLE' WHERE id='itm_cln003';
UPDATE items SET code='CLN004',category='WOUND CARE - CLEANSING & ANTISEPTIC',brand='Betadine',size='60ml',uom='BOTTLE' WHERE id='itm_cln004';
UPDATE items SET code='CLN005',category='WOUND CARE - CLEANSING & ANTISEPTIC',brand='Betadine',size='500ml',uom='BOTTLE' WHERE id='itm_cln005';
UPDATE items SET code='CLN006',category='WOUND CARE - CLEANSING & ANTISEPTIC',brand='Hibiscrub',size='500ml',uom='BOTTLE' WHERE id='itm_cln006';
UPDATE items SET code='CLN007',category='WOUND CARE - CLEANSING & ANTISEPTIC',brand='',size='100ml',uom='BOTTLE' WHERE id='itm_cln007';
UPDATE items SET code='CLN008',category='WOUND CARE - CLEANSING & ANTISEPTIC',brand='',size='single use',uom='BOX' WHERE id='itm_cln008';
UPDATE items SET code='CLN009',category='WOUND CARE - CLEANSING & ANTISEPTIC',brand='',size='',uom='PACK' WHERE id='itm_cln009';
UPDATE items SET code='CLN010',category='WOUND CARE - CLEANSING & ANTISEPTIC',brand='',size='',uom='PACK' WHERE id='itm_cln010';
UPDATE items SET code='CLN011',category='WOUND CARE - CLEANSING & ANTISEPTIC',brand='Prontosan',size='350ml',uom='BOTTLE' WHERE id='itm_cln011';
UPDATE items SET code='CLN012',category='WOUND CARE - CLEANSING & ANTISEPTIC',brand='',size='10ml',uom='VIAL' WHERE id='itm_cln012';
UPDATE items SET code='BND001',category='WOUND CARE - BANDAGE & TAPE',brand='3M Micropore',size='1 inch',uom='ROLL' WHERE id='itm_bnd001';
UPDATE items SET code='BND002',category='WOUND CARE - BANDAGE & TAPE',brand='3M Micropore',size='2 inch',uom='ROLL' WHERE id='itm_bnd002';
UPDATE items SET code='BND003',category='WOUND CARE - BANDAGE & TAPE',brand='3M Durapore',size='1 inch',uom='ROLL' WHERE id='itm_bnd003';
UPDATE items SET code='BND004',category='WOUND CARE - BANDAGE & TAPE',brand='3M Transpore',size='1 inch',uom='ROLL' WHERE id='itm_bnd004';
UPDATE items SET code='BND005',category='WOUND CARE - BANDAGE & TAPE',brand='',size='5cm',uom='ROLL' WHERE id='itm_bnd005';
UPDATE items SET code='BND006',category='WOUND CARE - BANDAGE & TAPE',brand='',size='7.5cm',uom='ROLL' WHERE id='itm_bnd006';
UPDATE items SET code='BND007',category='WOUND CARE - BANDAGE & TAPE',brand='',size='10cm',uom='ROLL' WHERE id='itm_bnd007';
UPDATE items SET code='BND008',category='WOUND CARE - BANDAGE & TAPE',brand='',size='7.5cm',uom='ROLL' WHERE id='itm_bnd008';
UPDATE items SET code='BND009',category='WOUND CARE - BANDAGE & TAPE',brand='',size='10cm',uom='ROLL' WHERE id='itm_bnd009';
UPDATE items SET code='BND010',category='WOUND CARE - BANDAGE & TAPE',brand='Comprilan',size='10cm',uom='ROLL' WHERE id='itm_bnd010';
UPDATE items SET code='BND011',category='WOUND CARE - BANDAGE & TAPE',brand='Tubigrip',size='size C/D',uom='ROLL' WHERE id='itm_bnd011';
UPDATE items SET code='BND012',category='WOUND CARE - BANDAGE & TAPE',brand='Coban',size='7.5cm',uom='ROLL' WHERE id='itm_bnd012';
UPDATE items SET code='BND013',category='WOUND CARE - BANDAGE & TAPE',brand='',size='',uom='EACH' WHERE id='itm_bnd013';
UPDATE items SET code='BND014',category='WOUND CARE - BANDAGE & TAPE',brand='',size='10cm',uom='ROLL' WHERE id='itm_bnd014';
UPDATE items SET code='CTH001',category='URINARY / CATHETER',brand='Bard',size='Fr12',uom='EACH' WHERE id='itm_cth001';
UPDATE items SET code='CTH002',category='URINARY / CATHETER',brand='Bard',size='Fr14',uom='EACH' WHERE id='itm_cth002';
UPDATE items SET code='CTH003',category='URINARY / CATHETER',brand='Bard',size='Fr16',uom='EACH' WHERE id='itm_cth003';
UPDATE items SET code='CTH004',category='URINARY / CATHETER',brand='Bard',size='Fr18',uom='EACH' WHERE id='itm_cth004';
UPDATE items SET code='CTH005',category='URINARY / CATHETER',brand='Bard',size='Fr20',uom='EACH' WHERE id='itm_cth005';
UPDATE items SET code='CTH006',category='URINARY / CATHETER',brand='Bard',size='Fr16',uom='EACH' WHERE id='itm_cth006';
UPDATE items SET code='CTH007',category='URINARY / CATHETER',brand='Bard',size='Fr18',uom='EACH' WHERE id='itm_cth007';
UPDATE items SET code='CTH008',category='URINARY / CATHETER',brand='Bard',size='Fr20',uom='EACH' WHERE id='itm_cth008';
UPDATE items SET code='CTH009',category='URINARY / CATHETER',brand='Romsons',size='Fr12',uom='EACH' WHERE id='itm_cth009';
UPDATE items SET code='CTH010',category='URINARY / CATHETER',brand='Romsons',size='Fr14',uom='EACH' WHERE id='itm_cth010';
UPDATE items SET code='CTH011',category='URINARY / CATHETER',brand='',size='2000ml',uom='EACH' WHERE id='itm_cth011';
UPDATE items SET code='CTH012',category='URINARY / CATHETER',brand='',size='2000ml',uom='EACH' WHERE id='itm_cth012';
UPDATE items SET code='CTH013',category='URINARY / CATHETER',brand='',size='500ml',uom='EACH' WHERE id='itm_cth013';
UPDATE items SET code='CTH014',category='URINARY / CATHETER',brand='',size='pair',uom='SET' WHERE id='itm_cth014';
UPDATE items SET code='CTH015',category='URINARY / CATHETER',brand='StatLock',size='',uom='EACH' WHERE id='itm_cth015';
UPDATE items SET code='CTH016',category='URINARY / CATHETER',brand='',size='',uom='EACH' WHERE id='itm_cth016';
UPDATE items SET code='CTH017',category='URINARY / CATHETER',brand='K-Y / Lignocaine',size='42g',uom='TUBE' WHERE id='itm_cth017';
UPDATE items SET code='CTH018',category='URINARY / CATHETER',brand='Xylocaine',size='11ml',uom='EACH' WHERE id='itm_cth018';
UPDATE items SET code='CTH019',category='URINARY / CATHETER',brand='',size='60ml',uom='EACH' WHERE id='itm_cth019';
UPDATE items SET code='CTH020',category='URINARY / CATHETER',brand='',size='10ml',uom='VIAL' WHERE id='itm_cth020';
UPDATE items SET code='CTH021',category='URINARY / CATHETER',brand='',size='',uom='EACH' WHERE id='itm_cth021';
UPDATE items SET code='STM001',category='STOMA & DRAINAGE',brand='Coloplast',size='one-piece',uom='EACH' WHERE id='itm_stm001';
UPDATE items SET code='STM002',category='STOMA & DRAINAGE',brand='Hollister',size='two-piece',uom='EACH' WHERE id='itm_stm002';
UPDATE items SET code='STM003',category='STOMA & DRAINAGE',brand='Coloplast',size='',uom='EACH' WHERE id='itm_stm003';
UPDATE items SET code='STM004',category='STOMA & DRAINAGE',brand='Coloplast',size='60g',uom='TUBE' WHERE id='itm_stm004';
UPDATE items SET code='STM005',category='STOMA & DRAINAGE',brand='Coloplast',size='25g',uom='EACH' WHERE id='itm_stm005';
UPDATE items SET code='STM006',category='STOMA & DRAINAGE',brand='Coloplast',size='',uom='EACH' WHERE id='itm_stm006';
UPDATE items SET code='STM007',category='STOMA & DRAINAGE',brand='Niltac',size='50ml',uom='EACH' WHERE id='itm_stm007';
UPDATE items SET code='STM008',category='STOMA & DRAINAGE',brand='',size='',uom='EACH' WHERE id='itm_stm008';
UPDATE items SET code='STM009',category='STOMA & DRAINAGE',brand='',size='',uom='EACH' WHERE id='itm_stm009';
UPDATE items SET code='FED001',category='FEEDING / ENTERAL',brand='Romsons',size='Fr10',uom='EACH' WHERE id='itm_fed001';
UPDATE items SET code='FED002',category='FEEDING / ENTERAL',brand='Romsons',size='Fr12',uom='EACH' WHERE id='itm_fed002';
UPDATE items SET code='FED003',category='FEEDING / ENTERAL',brand='Romsons',size='Fr14',uom='EACH' WHERE id='itm_fed003';
UPDATE items SET code='FED004',category='FEEDING / ENTERAL',brand='Romsons',size='Fr16',uom='EACH' WHERE id='itm_fed004';
UPDATE items SET code='FED005',category='FEEDING / ENTERAL',brand='',size='',uom='SET' WHERE id='itm_fed005';
UPDATE items SET code='FED006',category='FEEDING / ENTERAL',brand='',size='50ml',uom='EACH' WHERE id='itm_fed006';
UPDATE items SET code='FED007',category='FEEDING / ENTERAL',brand='',size='',uom='SET' WHERE id='itm_fed007';
UPDATE items SET code='FED008',category='FEEDING / ENTERAL',brand='',size='',uom='SET' WHERE id='itm_fed008';
UPDATE items SET code='FED009',category='FEEDING / ENTERAL',brand='',size='',uom='PACK' WHERE id='itm_fed009';
UPDATE items SET code='FED010',category='FEEDING / ENTERAL',brand='',size='',uom='ROLL' WHERE id='itm_fed010';
UPDATE items SET code='FED011',category='FEEDING / ENTERAL',brand='',size='',uom='EACH' WHERE id='itm_fed011';
UPDATE items SET code='NUT001',category='NUTRITION / FORMULA',brand='Abbott',size='850g',uom='TIN' WHERE id='itm_nut001';
UPDATE items SET code='NUT002',category='NUTRITION / FORMULA',brand='Abbott',size='850g',uom='TIN' WHERE id='itm_nut002';
UPDATE items SET code='NUT003',category='NUTRITION / FORMULA',brand='Abbott',size='400g',uom='TIN' WHERE id='itm_nut003';
UPDATE items SET code='NUT004',category='NUTRITION / FORMULA',brand='Nestle',size='400g',uom='TIN' WHERE id='itm_nut004';
UPDATE items SET code='NUT005',category='NUTRITION / FORMULA',brand='Nestle',size='800g',uom='TIN' WHERE id='itm_nut005';
UPDATE items SET code='NUT006',category='NUTRITION / FORMULA',brand='Fresenius',size='500ml',uom='BOTTLE' WHERE id='itm_nut006';
UPDATE items SET code='NUT007',category='NUTRITION / FORMULA',brand='Abbott',size='850g',uom='TIN' WHERE id='itm_nut007';
UPDATE items SET code='NUT008',category='NUTRITION / FORMULA',brand='Resource ThickenUp',size='227g',uom='TIN' WHERE id='itm_nut008';
UPDATE items SET code='NUT009',category='NUTRITION / FORMULA',brand='',size='sachet',uom='PACK' WHERE id='itm_nut009';
UPDATE items SET code='IVL001',category='IV / INJECTION',brand='B.Braun Vasofix',size='18G green',uom='EACH' WHERE id='itm_ivl001';
UPDATE items SET code='IVL002',category='IV / INJECTION',brand='B.Braun Vasofix',size='20G pink',uom='EACH' WHERE id='itm_ivl002';
UPDATE items SET code='IVL003',category='IV / INJECTION',brand='B.Braun Vasofix',size='22G blue',uom='EACH' WHERE id='itm_ivl003';
UPDATE items SET code='IVL004',category='IV / INJECTION',brand='B.Braun Vasofix',size='24G yellow',uom='EACH' WHERE id='itm_ivl004';
UPDATE items SET code='IVL005',category='IV / INJECTION',brand='',size='standard',uom='EACH' WHERE id='itm_ivl005';
UPDATE items SET code='IVL006',category='IV / INJECTION',brand='',size='150ml',uom='EACH' WHERE id='itm_ivl006';
UPDATE items SET code='IVL007',category='IV / INJECTION',brand='',size='',uom='EACH' WHERE id='itm_ivl007';
UPDATE items SET code='IVL008',category='IV / INJECTION',brand='',size='',uom='EACH' WHERE id='itm_ivl008';
UPDATE items SET code='IVL009',category='IV / INJECTION',brand='Tegaderm IV',size='',uom='EACH' WHERE id='itm_ivl009';
UPDATE items SET code='IVL010',category='IV / INJECTION',brand='Terumo',size='1ml',uom='EACH' WHERE id='itm_ivl010';
UPDATE items SET code='IVL011',category='IV / INJECTION',brand='Terumo',size='3ml',uom='EACH' WHERE id='itm_ivl011';
UPDATE items SET code='IVL012',category='IV / INJECTION',brand='Terumo',size='5ml',uom='EACH' WHERE id='itm_ivl012';
UPDATE items SET code='IVL013',category='IV / INJECTION',brand='Terumo',size='10ml',uom='EACH' WHERE id='itm_ivl013';
UPDATE items SET code='IVL014',category='IV / INJECTION',brand='Terumo',size='20ml',uom='EACH' WHERE id='itm_ivl014';
UPDATE items SET code='IVL015',category='IV / INJECTION',brand='Terumo',size='50ml',uom='EACH' WHERE id='itm_ivl015';
UPDATE items SET code='IVL016',category='IV / INJECTION',brand='BD',size='1ml 30G',uom='EACH' WHERE id='itm_ivl016';
UPDATE items SET code='IVL017',category='IV / INJECTION',brand='Terumo',size='21G',uom='EACH' WHERE id='itm_ivl017';
UPDATE items SET code='IVL018',category='IV / INJECTION',brand='Terumo',size='23G',uom='EACH' WHERE id='itm_ivl018';
UPDATE items SET code='IVL019',category='IV / INJECTION',brand='Terumo',size='25G',uom='EACH' WHERE id='itm_ivl019';
UPDATE items SET code='IVL020',category='IV / INJECTION',brand='Terumo',size='23G',uom='EACH' WHERE id='itm_ivl020';
UPDATE items SET code='IVL021',category='IV / INJECTION',brand='Baxter',size='500ml',uom='BOTTLE' WHERE id='itm_ivl021';
UPDATE items SET code='IVL022',category='IV / INJECTION',brand='Baxter',size='1000ml',uom='BOTTLE' WHERE id='itm_ivl022';
UPDATE items SET code='IVL023',category='IV / INJECTION',brand='Baxter',size='500ml',uom='BOTTLE' WHERE id='itm_ivl023';
UPDATE items SET code='IVL024',category='IV / INJECTION',brand='Baxter',size='500ml',uom='BOTTLE' WHERE id='itm_ivl024';
UPDATE items SET code='IVL025',category='IV / INJECTION',brand='',size='1L',uom='EACH' WHERE id='itm_ivl025';
UPDATE items SET code='IVL026',category='IV / INJECTION',brand='',size='',uom='EACH' WHERE id='itm_ivl026';
UPDATE items SET code='RSP001',category='RESPIRATORY / OXYGEN',brand='',size='adult',uom='EACH' WHERE id='itm_rsp001';
UPDATE items SET code='RSP002',category='RESPIRATORY / OXYGEN',brand='',size='adult',uom='EACH' WHERE id='itm_rsp002';
UPDATE items SET code='RSP003',category='RESPIRATORY / OXYGEN',brand='',size='adult',uom='EACH' WHERE id='itm_rsp003';
UPDATE items SET code='RSP004',category='RESPIRATORY / OXYGEN',brand='',size='adult',uom='EACH' WHERE id='itm_rsp004';
UPDATE items SET code='RSP005',category='RESPIRATORY / OXYGEN',brand='',size='adult',uom='SET' WHERE id='itm_rsp005';
UPDATE items SET code='RSP006',category='RESPIRATORY / OXYGEN',brand='Omron',size='',uom='UNIT' WHERE id='itm_rsp006';
UPDATE items SET code='RSP007',category='RESPIRATORY / OXYGEN',brand='',size='5L',uom='UNIT' WHERE id='itm_rsp007';
UPDATE items SET code='RSP008',category='RESPIRATORY / OXYGEN',brand='',size='portable',uom='UNIT' WHERE id='itm_rsp008';
UPDATE items SET code='RSP009',category='RESPIRATORY / OXYGEN',brand='',size='',uom='EACH' WHERE id='itm_rsp009';
UPDATE items SET code='RSP010',category='RESPIRATORY / OXYGEN',brand='Romsons',size='Fr10',uom='EACH' WHERE id='itm_rsp010';
UPDATE items SET code='RSP011',category='RESPIRATORY / OXYGEN',brand='Romsons',size='Fr12',uom='EACH' WHERE id='itm_rsp011';
UPDATE items SET code='RSP012',category='RESPIRATORY / OXYGEN',brand='Romsons',size='Fr14',uom='EACH' WHERE id='itm_rsp012';
UPDATE items SET code='RSP013',category='RESPIRATORY / OXYGEN',brand='',size='',uom='EACH' WHERE id='itm_rsp013';
UPDATE items SET code='RSP014',category='RESPIRATORY / OXYGEN',brand='',size='',uom='UNIT' WHERE id='itm_rsp014';
UPDATE items SET code='RSP015',category='RESPIRATORY / OXYGEN',brand='',size='',uom='EACH' WHERE id='itm_rsp015';
UPDATE items SET code='RSP016',category='RESPIRATORY / OXYGEN',brand='Portex',size='size 7.0',uom='EACH' WHERE id='itm_rsp016';
UPDATE items SET code='RSP017',category='RESPIRATORY / OXYGEN',brand='',size='',uom='EACH' WHERE id='itm_rsp017';
UPDATE items SET code='RSP018',category='RESPIRATORY / OXYGEN',brand='',size='',uom='EACH' WHERE id='itm_rsp018';
UPDATE items SET code='RSP019',category='RESPIRATORY / OXYGEN',brand='',size='',uom='EACH' WHERE id='itm_rsp019';
UPDATE items SET code='PPE001',category='PPE / INFECTION CONTROL',brand='Ansell',size='size 6.5',uom='PAIR' WHERE id='itm_ppe001';
UPDATE items SET code='PPE002',category='PPE / INFECTION CONTROL',brand='Ansell',size='size 7.0',uom='PAIR' WHERE id='itm_ppe002';
UPDATE items SET code='PPE003',category='PPE / INFECTION CONTROL',brand='Ansell',size='size 7.5',uom='PAIR' WHERE id='itm_ppe003';
UPDATE items SET code='PPE004',category='PPE / INFECTION CONTROL',brand='Hartalega',size='S',uom='BOX' WHERE id='itm_ppe004';
UPDATE items SET code='PPE005',category='PPE / INFECTION CONTROL',brand='Hartalega',size='M',uom='BOX' WHERE id='itm_ppe005';
UPDATE items SET code='PPE006',category='PPE / INFECTION CONTROL',brand='Hartalega',size='L',uom='BOX' WHERE id='itm_ppe006';
UPDATE items SET code='PPE007',category='PPE / INFECTION CONTROL',brand='',size='',uom='BOX' WHERE id='itm_ppe007';
UPDATE items SET code='PPE008',category='PPE / INFECTION CONTROL',brand='3M',size='',uom='EACH' WHERE id='itm_ppe008';
UPDATE items SET code='PPE009',category='PPE / INFECTION CONTROL',brand='',size='',uom='EACH' WHERE id='itm_ppe009';
UPDATE items SET code='PPE010',category='PPE / INFECTION CONTROL',brand='',size='',uom='EACH' WHERE id='itm_ppe010';
UPDATE items SET code='PPE011',category='PPE / INFECTION CONTROL',brand='',size='',uom='EACH' WHERE id='itm_ppe011';
UPDATE items SET code='PPE012',category='PPE / INFECTION CONTROL',brand='',size='500ml',uom='BOTTLE' WHERE id='itm_ppe012';
UPDATE items SET code='PPE013',category='PPE / INFECTION CONTROL',brand='',size='500ml',uom='BOTTLE' WHERE id='itm_ppe013';
UPDATE items SET code='PPE014',category='PPE / INFECTION CONTROL',brand='',size='yellow',uom='PACK' WHERE id='itm_ppe014';
UPDATE items SET code='PPE015',category='PPE / INFECTION CONTROL',brand='',size='',uom='PACK' WHERE id='itm_ppe015';
UPDATE items SET code='PSC001',category='PERSONAL CARE / CONTINENCE',brand='MamyPoko',size='M',uom='EACH' WHERE id='itm_psc001';
UPDATE items SET code='PSC002',category='PERSONAL CARE / CONTINENCE',brand='MamyPoko',size='L',uom='EACH' WHERE id='itm_psc002';
UPDATE items SET code='PSC003',category='PERSONAL CARE / CONTINENCE',brand='Certainty',size='XL',uom='EACH' WHERE id='itm_psc003';
UPDATE items SET code='PSC004',category='PERSONAL CARE / CONTINENCE',brand='Certainty',size='M',uom='EACH' WHERE id='itm_psc004';
UPDATE items SET code='PSC005',category='PERSONAL CARE / CONTINENCE',brand='Certainty',size='L',uom='EACH' WHERE id='itm_psc005';
UPDATE items SET code='PSC006',category='PERSONAL CARE / CONTINENCE',brand='',size='60x90cm',uom='EACH' WHERE id='itm_psc006';
UPDATE items SET code='PSC007',category='PERSONAL CARE / CONTINENCE',brand='',size='60x60cm',uom='EACH' WHERE id='itm_psc007';
UPDATE items SET code='PSC008',category='PERSONAL CARE / CONTINENCE',brand='',size='80s',uom='PACK' WHERE id='itm_psc008';
UPDATE items SET code='PSC009',category='PERSONAL CARE / CONTINENCE',brand='Sudocrem',size='125g',uom='TUBE' WHERE id='itm_psc009';
UPDATE items SET code='PSC010',category='PERSONAL CARE / CONTINENCE',brand='',size='50g',uom='TUBE' WHERE id='itm_psc010';
UPDATE items SET code='PSC011',category='PERSONAL CARE / CONTINENCE',brand='',size='500ml',uom='BOTTLE' WHERE id='itm_psc011';
UPDATE items SET code='PSC012',category='PERSONAL CARE / CONTINENCE',brand='',size='',uom='EACH' WHERE id='itm_psc012';
UPDATE items SET code='PSC013',category='PERSONAL CARE / CONTINENCE',brand='',size='',uom='PACK' WHERE id='itm_psc013';
UPDATE items SET code='PSC014',category='PERSONAL CARE / CONTINENCE',brand='Biotene',size='',uom='TUBE' WHERE id='itm_psc014';
UPDATE items SET code='PSC015',category='PERSONAL CARE / CONTINENCE',brand='',size='',uom='EACH' WHERE id='itm_psc015';
UPDATE items SET code='PSC016',category='PERSONAL CARE / CONTINENCE',brand='',size='',uom='EACH' WHERE id='itm_psc016';
UPDATE items SET code='PSC017',category='PERSONAL CARE / CONTINENCE',brand='',size='',uom='EACH' WHERE id='itm_psc017';
UPDATE items SET code='PSC018',category='PERSONAL CARE / CONTINENCE',brand='',size='male/female',uom='EACH' WHERE id='itm_psc018';
UPDATE items SET code='PSC019',category='PERSONAL CARE / CONTINENCE',brand='',size='',uom='SET' WHERE id='itm_psc019';
UPDATE items SET code='DGX001',category='DIAGNOSTIC / MONITORING',brand='Accu-Chek',size='50s',uom='BOX' WHERE id='itm_dgx001';
UPDATE items SET code='DGX002',category='DIAGNOSTIC / MONITORING',brand='OneTouch',size='50s',uom='BOX' WHERE id='itm_dgx002';
UPDATE items SET code='DGX003',category='DIAGNOSTIC / MONITORING',brand='Accu-Chek',size='',uom='BOX' WHERE id='itm_dgx003';
UPDATE items SET code='DGX004',category='DIAGNOSTIC / MONITORING',brand='Accu-Chek',size='',uom='UNIT' WHERE id='itm_dgx004';
UPDATE items SET code='DGX005',category='DIAGNOSTIC / MONITORING',brand='',size='',uom='EACH' WHERE id='itm_dgx005';
UPDATE items SET code='DGX006',category='DIAGNOSTIC / MONITORING',brand='',size='',uom='EACH' WHERE id='itm_dgx006';
UPDATE items SET code='DGX007',category='DIAGNOSTIC / MONITORING',brand='Omron',size='arm',uom='UNIT' WHERE id='itm_dgx007';
UPDATE items SET code='DGX008',category='DIAGNOSTIC / MONITORING',brand='',size='finger',uom='EACH' WHERE id='itm_dgx008';
UPDATE items SET code='DGX009',category='DIAGNOSTIC / MONITORING',brand='',size='100s',uom='BOX' WHERE id='itm_dgx009';
UPDATE items SET code='DGX010',category='DIAGNOSTIC / MONITORING',brand='BD Vacutainer',size='',uom='EACH' WHERE id='itm_dgx010';
UPDATE items SET code='DGX011',category='DIAGNOSTIC / MONITORING',brand='',size='',uom='EACH' WHERE id='itm_dgx011';
UPDATE items SET code='DGX012',category='DIAGNOSTIC / MONITORING',brand='Littmann',size='',uom='EACH' WHERE id='itm_dgx012';
UPDATE items SET code='EQP001',category='MOBILITY & EQUIPMENT',brand='',size='',uom='UNIT' WHERE id='itm_eqp001';
UPDATE items SET code='EQP002',category='MOBILITY & EQUIPMENT',brand='',size='3-function',uom='UNIT' WHERE id='itm_eqp002';
UPDATE items SET code='EQP003',category='MOBILITY & EQUIPMENT',brand='',size='standard',uom='UNIT' WHERE id='itm_eqp003';
UPDATE items SET code='EQP004',category='MOBILITY & EQUIPMENT',brand='',size='',uom='UNIT' WHERE id='itm_eqp004';
UPDATE items SET code='EQP005',category='MOBILITY & EQUIPMENT',brand='',size='',uom='UNIT' WHERE id='itm_eqp005';
UPDATE items SET code='EQP006',category='MOBILITY & EQUIPMENT',brand='',size='',uom='EACH' WHERE id='itm_eqp006';
UPDATE items SET code='EQP007',category='MOBILITY & EQUIPMENT',brand='',size='',uom='UNIT' WHERE id='itm_eqp007';
UPDATE items SET code='EQP008',category='MOBILITY & EQUIPMENT',brand='',size='',uom='EACH' WHERE id='itm_eqp008';
UPDATE items SET code='EQP009',category='MOBILITY & EQUIPMENT',brand='',size='pair',uom='SET' WHERE id='itm_eqp009';
UPDATE items SET code='EQP010',category='MOBILITY & EQUIPMENT',brand='',size='',uom='UNIT' WHERE id='itm_eqp010';
UPDATE items SET code='EQP011',category='MOBILITY & EQUIPMENT',brand='',size='',uom='EACH' WHERE id='itm_eqp011';
UPDATE items SET code='EQP012',category='MOBILITY & EQUIPMENT',brand='',size='pair',uom='SET' WHERE id='itm_eqp012';
UPDATE items SET code='MSC001',category='PROCEDURE & MISC',brand='',size='',uom='SET' WHERE id='itm_msc001';
UPDATE items SET code='MSC002',category='PROCEDURE & MISC',brand='',size='',uom='SET' WHERE id='itm_msc002';
UPDATE items SET code='MSC003',category='PROCEDURE & MISC',brand='',size='',uom='EACH' WHERE id='itm_msc003';
UPDATE items SET code='MSC004',category='PROCEDURE & MISC',brand='',size='',uom='EACH' WHERE id='itm_msc004';
UPDATE items SET code='MSC005',category='PROCEDURE & MISC',brand='',size='',uom='EACH' WHERE id='itm_msc005';
UPDATE items SET code='MSC006',category='PROCEDURE & MISC',brand='',size='',uom='EACH' WHERE id='itm_msc006';
UPDATE items SET code='MSC007',category='PROCEDURE & MISC',brand='',size='',uom='EACH' WHERE id='itm_msc007';
UPDATE items SET code='MSC008',category='PROCEDURE & MISC',brand='',size='',uom='EACH' WHERE id='itm_msc008';
UPDATE items SET code='MSC009',category='PROCEDURE & MISC',brand='',size='',uom='EACH' WHERE id='itm_msc009';
UPDATE items SET code='MSC010',category='PROCEDURE & MISC',brand='',size='',uom='UNIT' WHERE id='itm_msc010';
UPDATE items SET code='MSC011',category='PROCEDURE & MISC',brand='',size='weekly',uom='EACH' WHERE id='itm_msc011';
UPDATE items SET code='MSC012',category='PROCEDURE & MISC',brand='',size='',uom='EACH' WHERE id='itm_msc012';
UPDATE items SET code='MSC013',category='PROCEDURE & MISC',brand='',size='',uom='PACK' WHERE id='itm_msc013';
UPDATE items SET code='MSC014',category='PROCEDURE & MISC',brand='',size='',uom='SET' WHERE id='itm_msc014';
UPDATE items SET code='INS001',category='NURSING INSTRUMENTS (REUSABLE)',brand='',size='13cm',uom='EACH' WHERE id='itm_ins001';
UPDATE items SET code='INS002',category='NURSING INSTRUMENTS (REUSABLE)',brand='',size='14cm',uom='EACH' WHERE id='itm_ins002';
UPDATE items SET code='INS003',category='NURSING INSTRUMENTS (REUSABLE)',brand='',size='14cm',uom='EACH' WHERE id='itm_ins003';
UPDATE items SET code='INS004',category='NURSING INSTRUMENTS (REUSABLE)',brand='Spencer Wells',size='14cm',uom='EACH' WHERE id='itm_ins004';
UPDATE items SET code='INS005',category='NURSING INSTRUMENTS (REUSABLE)',brand='',size='20cm',uom='EACH' WHERE id='itm_ins005';
UPDATE items SET code='INS006',category='NURSING INSTRUMENTS (REUSABLE)',brand='',size='14cm',uom='EACH' WHERE id='itm_ins006';
UPDATE items SET code='INS007',category='NURSING INSTRUMENTS (REUSABLE)',brand='',size='11cm',uom='EACH' WHERE id='itm_ins007';
UPDATE items SET code='INS008',category='NURSING INSTRUMENTS (REUSABLE)',brand='Lister',size='18cm',uom='EACH' WHERE id='itm_ins008';
UPDATE items SET code='INS009',category='NURSING INSTRUMENTS (REUSABLE)',brand='',size='14cm',uom='EACH' WHERE id='itm_ins009';
UPDATE items SET code='INS010',category='NURSING INSTRUMENTS (REUSABLE)',brand='',size='No.3',uom='EACH' WHERE id='itm_ins010';
UPDATE items SET code='INS011',category='NURSING INSTRUMENTS (REUSABLE)',brand='Swann-Morton',size='No.11 / 15',uom='BOX' WHERE id='itm_ins011';
UPDATE items SET code='INS012',category='NURSING INSTRUMENTS (REUSABLE)',brand='stainless',size='60ml',uom='EACH' WHERE id='itm_ins012';
UPDATE items SET code='INS013',category='NURSING INSTRUMENTS (REUSABLE)',brand='stainless',size='8 inch',uom='EACH' WHERE id='itm_ins013';
UPDATE items SET code='INS014',category='NURSING INSTRUMENTS (REUSABLE)',brand='stainless',size='medium',uom='EACH' WHERE id='itm_ins014';
UPDATE items SET code='INS015',category='NURSING INSTRUMENTS (REUSABLE)',brand='stainless',size='2-tier',uom='UNIT' WHERE id='itm_ins015';
UPDATE items SET code='INS016',category='NURSING INSTRUMENTS (REUSABLE)',brand='stainless',size='',uom='EACH' WHERE id='itm_ins016';
UPDATE items SET code='INS017',category='NURSING INSTRUMENTS (REUSABLE)',brand='',size='assorted',uom='BOX' WHERE id='itm_ins017';
UPDATE items SET code='INS018',category='NURSING INSTRUMENTS (REUSABLE)',brand='',size='',uom='ROLL' WHERE id='itm_ins018';
UPDATE items SET code='INS019',category='NURSING INSTRUMENTS (REUSABLE)',brand='',size='',uom='PACK' WHERE id='itm_ins019';
UPDATE items SET code='INS020',category='NURSING INSTRUMENTS (REUSABLE)',brand='',size='',uom='EACH' WHERE id='itm_ins020';
UPDATE items SET code='INS021',category='NURSING INSTRUMENTS (REUSABLE)',brand='',size='150cm',uom='EACH' WHERE id='itm_ins021';
UPDATE items SET code='INS022',category='NURSING INSTRUMENTS (REUSABLE)',brand='',size='',uom='PACK' WHERE id='itm_ins022';
UPDATE items SET code='DEV001',category='MEDICAL EQUIPMENT / DEVICES',brand='',size='',uom='UNIT' WHERE id='itm_dev001';
UPDATE items SET code='DEV002',category='MEDICAL EQUIPMENT / DEVICES',brand='',size='',uom='UNIT' WHERE id='itm_dev002';
UPDATE items SET code='DEV003',category='MEDICAL EQUIPMENT / DEVICES',brand='',size='',uom='UNIT' WHERE id='itm_dev003';
UPDATE items SET code='DEV004',category='MEDICAL EQUIPMENT / DEVICES',brand='',size='portable',uom='UNIT' WHERE id='itm_dev004';
UPDATE items SET code='DEV005',category='MEDICAL EQUIPMENT / DEVICES',brand='Omron',size='',uom='UNIT' WHERE id='itm_dev005';
UPDATE items SET code='DEV006',category='MEDICAL EQUIPMENT / DEVICES',brand='',size='5L',uom='UNIT' WHERE id='itm_dev006';
UPDATE items SET code='DEV007',category='MEDICAL EQUIPMENT / DEVICES',brand='',size='',uom='UNIT' WHERE id='itm_dev007';
UPDATE items SET code='DEV008',category='MEDICAL EQUIPMENT / DEVICES',brand='ResMed',size='',uom='UNIT' WHERE id='itm_dev008';
UPDATE items SET code='DEV009',category='MEDICAL EQUIPMENT / DEVICES',brand='ResMed',size='',uom='UNIT' WHERE id='itm_dev009';
UPDATE items SET code='DEV010',category='MEDICAL EQUIPMENT / DEVICES',brand='',size='multi-para',uom='UNIT' WHERE id='itm_dev010';
UPDATE items SET code='DEV011',category='MEDICAL EQUIPMENT / DEVICES',brand='',size='3-channel',uom='UNIT' WHERE id='itm_dev011';
UPDATE items SET code='DEV012',category='MEDICAL EQUIPMENT / DEVICES',brand='',size='8MHz',uom='UNIT' WHERE id='itm_dev012';
UPDATE items SET code='DEV013',category='MEDICAL EQUIPMENT / DEVICES',brand='',size='',uom='UNIT' WHERE id='itm_dev013';
UPDATE items SET code='DEV014',category='MEDICAL EQUIPMENT / DEVICES',brand='',size='',uom='UNIT' WHERE id='itm_dev014';
UPDATE items SET code='DEV015',category='MEDICAL EQUIPMENT / DEVICES',brand='',size='adult',uom='UNIT' WHERE id='itm_dev015';
UPDATE items SET code='DEV016',category='MEDICAL EQUIPMENT / DEVICES',brand='',size='',uom='UNIT' WHERE id='itm_dev016';
UPDATE items SET code='DEV017',category='MEDICAL EQUIPMENT / DEVICES',brand='',size='',uom='SET' WHERE id='itm_dev017';
UPDATE items SET code='DEV018',category='MEDICAL EQUIPMENT / DEVICES',brand='',size='',uom='SET' WHERE id='itm_dev018';
UPDATE items SET code='DEV019',category='MEDICAL EQUIPMENT / DEVICES',brand='',size='',uom='PACK' WHERE id='itm_dev019';
UPDATE items SET code='DEV020',category='MEDICAL EQUIPMENT / DEVICES',brand='',size='250ml',uom='BOTTLE' WHERE id='itm_dev020';
UPDATE items SET code='DEV021',category='MEDICAL EQUIPMENT / DEVICES',brand='',size='',uom='UNIT' WHERE id='itm_dev021';
UPDATE items SET code='EMR001',category='EMERGENCY / RESUSCITATION',brand='',size='adult',uom='EACH' WHERE id='itm_emr001';
UPDATE items SET code='EMR002',category='EMERGENCY / RESUSCITATION',brand='',size='paediatric',uom='EACH' WHERE id='itm_emr002';
UPDATE items SET code='EMR003',category='EMERGENCY / RESUSCITATION',brand='',size='',uom='EACH' WHERE id='itm_emr003';
UPDATE items SET code='EMR004',category='EMERGENCY / RESUSCITATION',brand='Guedel',size='assorted',uom='SET' WHERE id='itm_emr004';
UPDATE items SET code='EMR005',category='EMERGENCY / RESUSCITATION',brand='',size='home care',uom='SET' WHERE id='itm_emr005';
UPDATE items SET code='EMR006',category='EMERGENCY / RESUSCITATION',brand='',size='',uom='SET' WHERE id='itm_emr006';
UPDATE items SET code='EMR007',category='EMERGENCY / RESUSCITATION',brand='',size='25g',uom='EACH' WHERE id='itm_emr007';
UPDATE items SET code='EMR008',category='EMERGENCY / RESUSCITATION',brand='',size='',uom='EACH' WHERE id='itm_emr008';
UPDATE items SET code='EMR009',category='EMERGENCY / RESUSCITATION',brand='',size='',uom='EACH' WHERE id='itm_emr009';
UPDATE items SET code='EMR010',category='EMERGENCY / RESUSCITATION',brand='',size='adjustable',uom='EACH' WHERE id='itm_emr010';
UPDATE items SET code='MPN001',category='MEDICATION - ANALGESIA & PAIN',brand='Panadol',size='500mg tab',uom='PACK' WHERE id='itm_mpn001';
UPDATE items SET code='MPN002',category='MEDICATION - ANALGESIA & PAIN',brand='Panadol',size='120mg/5ml',uom='BOTTLE' WHERE id='itm_mpn002';
UPDATE items SET code='MPN003',category='MEDICATION - ANALGESIA & PAIN',brand='Brufen',size='400mg tab',uom='PACK' WHERE id='itm_mpn003';
UPDATE items SET code='MPN004',category='MEDICATION - ANALGESIA & PAIN',brand='Voltaren',size='50mg tab',uom='PACK' WHERE id='itm_mpn004';
UPDATE items SET code='MPN005',category='MEDICATION - ANALGESIA & PAIN',brand='Voltaren Emulgel',size='20g',uom='TUBE' WHERE id='itm_mpn005';
UPDATE items SET code='MPN006',category='MEDICATION - ANALGESIA & PAIN',brand='Ponstan',size='500mg cap',uom='PACK' WHERE id='itm_mpn006';
UPDATE items SET code='MPN007',category='MEDICATION - ANALGESIA & PAIN',brand='',size='50mg cap',uom='PACK' WHERE id='itm_mpn007';
UPDATE items SET code='MPN008',category='MEDICATION - ANALGESIA & PAIN',brand='',size='10mg/5ml',uom='BOTTLE' WHERE id='itm_mpn008';
UPDATE items SET code='MPN009',category='MEDICATION - ANALGESIA & PAIN',brand='',size='10mg/ml',uom='AMPOULE' WHERE id='itm_mpn009';
UPDATE items SET code='MPN010',category='MEDICATION - ANALGESIA & PAIN',brand='Durogesic',size='25mcg/h',uom='EACH' WHERE id='itm_mpn010';
UPDATE items SET code='MPN011',category='MEDICATION - ANALGESIA & PAIN',brand='Xylocaine',size='2%',uom='TUBE' WHERE id='itm_mpn011';
UPDATE items SET code='MAB001',category='MEDICATION - ANTIBIOTIC & ANTIMICROBIAL',brand='',size='500mg cap',uom='PACK' WHERE id='itm_mab001';
UPDATE items SET code='MAB002',category='MEDICATION - ANTIBIOTIC & ANTIMICROBIAL',brand='Augmentin',size='625mg tab',uom='PACK' WHERE id='itm_mab002';
UPDATE items SET code='MAB003',category='MEDICATION - ANTIBIOTIC & ANTIMICROBIAL',brand='',size='500mg cap',uom='PACK' WHERE id='itm_mab003';
UPDATE items SET code='MAB004',category='MEDICATION - ANTIBIOTIC & ANTIMICROBIAL',brand='',size='500mg cap',uom='PACK' WHERE id='itm_mab004';
UPDATE items SET code='MAB005',category='MEDICATION - ANTIBIOTIC & ANTIMICROBIAL',brand='',size='500mg tab',uom='PACK' WHERE id='itm_mab005';
UPDATE items SET code='MAB006',category='MEDICATION - ANTIBIOTIC & ANTIMICROBIAL',brand='Flagyl',size='400mg tab',uom='PACK' WHERE id='itm_mab006';
UPDATE items SET code='MAB007',category='MEDICATION - ANTIBIOTIC & ANTIMICROBIAL',brand='',size='100mg cap',uom='PACK' WHERE id='itm_mab007';
UPDATE items SET code='MAB008',category='MEDICATION - ANTIBIOTIC & ANTIMICROBIAL',brand='Fucidin',size='15g',uom='TUBE' WHERE id='itm_mab008';
UPDATE items SET code='MAB009',category='MEDICATION - ANTIBIOTIC & ANTIMICROBIAL',brand='Bactroban',size='15g',uom='TUBE' WHERE id='itm_mab009';
UPDATE items SET code='MAB010',category='MEDICATION - ANTIBIOTIC & ANTIMICROBIAL',brand='Silverex / Flamazine',size='50g',uom='TUBE' WHERE id='itm_mab010';
UPDATE items SET code='MAB011',category='MEDICATION - ANTIBIOTIC & ANTIMICROBIAL',brand='Canesten',size='20g',uom='TUBE' WHERE id='itm_mab011';
UPDATE items SET code='MAB012',category='MEDICATION - ANTIBIOTIC & ANTIMICROBIAL',brand='Nizoral',size='15g',uom='TUBE' WHERE id='itm_mab012';
UPDATE items SET code='MAB013',category='MEDICATION - ANTIBIOTIC & ANTIMICROBIAL',brand='',size='100000u/ml',uom='BOTTLE' WHERE id='itm_mab013';
UPDATE items SET code='MDB001',category='MEDICATION - DIABETES',brand='Glucophage',size='500mg tab',uom='PACK' WHERE id='itm_mdb001';
UPDATE items SET code='MDB002',category='MEDICATION - DIABETES',brand='Diamicron',size='30mg MR tab',uom='PACK' WHERE id='itm_mdb002';
UPDATE items SET code='MDB003',category='MEDICATION - DIABETES',brand='NovoRapid',size='100u/ml pen',uom='EACH' WHERE id='itm_mdb003';
UPDATE items SET code='MDB004',category='MEDICATION - DIABETES',brand='Actrapid',size='100u/ml vial',uom='EACH' WHERE id='itm_mdb004';
UPDATE items SET code='MDB005',category='MEDICATION - DIABETES',brand='Mixtard 30',size='100u/ml pen',uom='EACH' WHERE id='itm_mdb005';
UPDATE items SET code='MDB006',category='MEDICATION - DIABETES',brand='Lantus',size='100u/ml pen',uom='EACH' WHERE id='itm_mdb006';
UPDATE items SET code='MDB007',category='MEDICATION - DIABETES',brand='BD / NovoFine',size='32G 4mm',uom='BOX' WHERE id='itm_mdb007';
UPDATE items SET code='MDB008',category='MEDICATION - DIABETES',brand='',size='',uom='PACK' WHERE id='itm_mdb008';
UPDATE items SET code='MCV001',category='MEDICATION - CARDIOVASCULAR',brand='Norvasc',size='5mg tab',uom='PACK' WHERE id='itm_mcv001';
UPDATE items SET code='MCV002',category='MEDICATION - CARDIOVASCULAR',brand='Coversyl',size='4mg tab',uom='PACK' WHERE id='itm_mcv002';
UPDATE items SET code='MCV003',category='MEDICATION - CARDIOVASCULAR',brand='Cozaar',size='50mg tab',uom='PACK' WHERE id='itm_mcv003';
UPDATE items SET code='MCV004',category='MEDICATION - CARDIOVASCULAR',brand='Concor',size='5mg tab',uom='PACK' WHERE id='itm_mcv004';
UPDATE items SET code='MCV005',category='MEDICATION - CARDIOVASCULAR',brand='',size='50mg tab',uom='PACK' WHERE id='itm_mcv005';
UPDATE items SET code='MCV006',category='MEDICATION - CARDIOVASCULAR',brand='Lasix',size='40mg tab',uom='PACK' WHERE id='itm_mcv006';
UPDATE items SET code='MCV007',category='MEDICATION - CARDIOVASCULAR',brand='Aldactone',size='25mg tab',uom='PACK' WHERE id='itm_mcv007';
UPDATE items SET code='MCV008',category='MEDICATION - CARDIOVASCULAR',brand='Lanoxin',size='0.25mg tab',uom='PACK' WHERE id='itm_mcv008';
UPDATE items SET code='MCV009',category='MEDICATION - CARDIOVASCULAR',brand='Lipitor',size='20mg tab',uom='PACK' WHERE id='itm_mcv009';
UPDATE items SET code='MCV010',category='MEDICATION - CARDIOVASCULAR',brand='',size='20mg tab',uom='PACK' WHERE id='itm_mcv010';
UPDATE items SET code='MCV011',category='MEDICATION - CARDIOVASCULAR',brand='Glyceryl trinitrate',size='0.5mg',uom='BOTTLE' WHERE id='itm_mcv011';
UPDATE items SET code='MCV012',category='MEDICATION - CARDIOVASCULAR',brand='Isordil',size='10mg tab',uom='PACK' WHERE id='itm_mcv012';
UPDATE items SET code='MAC001',category='MEDICATION - BLOOD & ANTICOAGULANT',brand='',size='100mg tab',uom='PACK' WHERE id='itm_mac001';
UPDATE items SET code='MAC002',category='MEDICATION - BLOOD & ANTICOAGULANT',brand='Plavix',size='75mg tab',uom='PACK' WHERE id='itm_mac002';
UPDATE items SET code='MAC003',category='MEDICATION - BLOOD & ANTICOAGULANT',brand='',size='3mg tab',uom='PACK' WHERE id='itm_mac003';
UPDATE items SET code='MAC004',category='MEDICATION - BLOOD & ANTICOAGULANT',brand='Clexane',size='40mg/0.4ml',uom='SYRINGE' WHERE id='itm_mac004';
UPDATE items SET code='MAC005',category='MEDICATION - BLOOD & ANTICOAGULANT',brand='Xarelto',size='20mg tab',uom='PACK' WHERE id='itm_mac005';
UPDATE items SET code='MAC006',category='MEDICATION - BLOOD & ANTICOAGULANT',brand='',size='200mg tab',uom='PACK' WHERE id='itm_mac006';
UPDATE items SET code='MAC007',category='MEDICATION - BLOOD & ANTICOAGULANT',brand='',size='5mg tab',uom='PACK' WHERE id='itm_mac007';
UPDATE items SET code='MRS001',category='MEDICATION - RESPIRATORY',brand='Ventolin',size='100mcg',uom='EACH' WHERE id='itm_mrs001';
UPDATE items SET code='MRS002',category='MEDICATION - RESPIRATORY',brand='Ventolin',size='2.5mg/2.5ml',uom='PACK' WHERE id='itm_mrs002';
UPDATE items SET code='MRS003',category='MEDICATION - RESPIRATORY',brand='Atrovent',size='500mcg',uom='PACK' WHERE id='itm_mrs003';
UPDATE items SET code='MRS004',category='MEDICATION - RESPIRATORY',brand='Combivent',size='',uom='PACK' WHERE id='itm_mrs004';
UPDATE items SET code='MRS005',category='MEDICATION - RESPIRATORY',brand='Pulmicort',size='200mcg',uom='EACH' WHERE id='itm_mrs005';
UPDATE items SET code='MRS006',category='MEDICATION - RESPIRATORY',brand='Seretide',size='250/25',uom='EACH' WHERE id='itm_mrs006';
UPDATE items SET code='MRS007',category='MEDICATION - RESPIRATORY',brand='',size='3ml',uom='PACK' WHERE id='itm_mrs007';
UPDATE items SET code='MRS008',category='MEDICATION - RESPIRATORY',brand='',size='adult',uom='EACH' WHERE id='itm_mrs008';
UPDATE items SET code='MRS009',category='MEDICATION - RESPIRATORY',brand='',size='375mg cap',uom='PACK' WHERE id='itm_mrs009';
UPDATE items SET code='MGI001',category='MEDICATION - GASTROINTESTINAL & BOWEL',brand='Losec',size='20mg cap',uom='PACK' WHERE id='itm_mgi001';
UPDATE items SET code='MGI002',category='MEDICATION - GASTROINTESTINAL & BOWEL',brand='Controloc',size='40mg tab',uom='PACK' WHERE id='itm_mgi002';
UPDATE items SET code='MGI003',category='MEDICATION - GASTROINTESTINAL & BOWEL',brand='',size='20mg tab',uom='PACK' WHERE id='itm_mgi003';
UPDATE items SET code='MGI004',category='MEDICATION - GASTROINTESTINAL & BOWEL',brand='Gaviscon',size='200ml',uom='BOTTLE' WHERE id='itm_mgi004';
UPDATE items SET code='MGI005',category='MEDICATION - GASTROINTESTINAL & BOWEL',brand='Motilium',size='10mg tab',uom='PACK' WHERE id='itm_mgi005';
UPDATE items SET code='MGI006',category='MEDICATION - GASTROINTESTINAL & BOWEL',brand='Maxolon',size='10mg tab',uom='PACK' WHERE id='itm_mgi006';
UPDATE items SET code='MGI007',category='MEDICATION - GASTROINTESTINAL & BOWEL',brand='Duphalac',size='200ml',uom='BOTTLE' WHERE id='itm_mgi007';
UPDATE items SET code='MGI008',category='MEDICATION - GASTROINTESTINAL & BOWEL',brand='Dulcolax',size='5mg tab',uom='PACK' WHERE id='itm_mgi008';
UPDATE items SET code='MGI009',category='MEDICATION - GASTROINTESTINAL & BOWEL',brand='Dulcolax',size='10mg',uom='EACH' WHERE id='itm_mgi009';
UPDATE items SET code='MGI010',category='MEDICATION - GASTROINTESTINAL & BOWEL',brand='',size='adult',uom='EACH' WHERE id='itm_mgi010';
UPDATE items SET code='MGI011',category='MEDICATION - GASTROINTESTINAL & BOWEL',brand='Fleet',size='133ml',uom='EACH' WHERE id='itm_mgi011';
UPDATE items SET code='MGI012',category='MEDICATION - GASTROINTESTINAL & BOWEL',brand='Senokot',size='7.5mg tab',uom='PACK' WHERE id='itm_mgi012';
UPDATE items SET code='MGI013',category='MEDICATION - GASTROINTESTINAL & BOWEL',brand='Imodium',size='2mg cap',uom='PACK' WHERE id='itm_mgi013';
UPDATE items SET code='MGI014',category='MEDICATION - GASTROINTESTINAL & BOWEL',brand='',size='sachet',uom='PACK' WHERE id='itm_mgi014';
UPDATE items SET code='MGI015',category='MEDICATION - GASTROINTESTINAL & BOWEL',brand='Buscopan',size='10mg tab',uom='PACK' WHERE id='itm_mgi015';
UPDATE items SET code='MTP001',category='MEDICATION - TOPICAL & SKIN',brand='',size='1% 15g',uom='TUBE' WHERE id='itm_mtp001';
UPDATE items SET code='MTP002',category='MEDICATION - TOPICAL & SKIN',brand='Betnovate',size='15g',uom='TUBE' WHERE id='itm_mtp002';
UPDATE items SET code='MTP003',category='MEDICATION - TOPICAL & SKIN',brand='',size='50g',uom='TUBE' WHERE id='itm_mtp003';
UPDATE items SET code='MTP004',category='MEDICATION - TOPICAL & SKIN',brand='Sudocrem',size='125g',uom='TUBE' WHERE id='itm_mtp004';
UPDATE items SET code='MTP005',category='MEDICATION - TOPICAL & SKIN',brand='',size='100ml',uom='BOTTLE' WHERE id='itm_mtp005';
UPDATE items SET code='MTP006',category='MEDICATION - TOPICAL & SKIN',brand='Cetaphil / QV',size='250g',uom='TUBE' WHERE id='itm_mtp006';
UPDATE items SET code='MTP007',category='MEDICATION - TOPICAL & SKIN',brand='Counterpain',size='30g',uom='TUBE' WHERE id='itm_mtp007';
UPDATE items SET code='MTP008',category='MEDICATION - TOPICAL & SKIN',brand='Betadine',size='15g',uom='TUBE' WHERE id='itm_mtp008';
UPDATE items SET code='MTP009',category='MEDICATION - TOPICAL & SKIN',brand='',size='permethrin 5%',uom='BOTTLE' WHERE id='itm_mtp009';
UPDATE items SET code='MEE001',category='MEDICATION - EYE, EAR & NOSE',brand='',size='0.5%',uom='BOTTLE' WHERE id='itm_mee001';
UPDATE items SET code='MEE002',category='MEDICATION - EYE, EAR & NOSE',brand='',size='1%',uom='TUBE' WHERE id='itm_mee002';
UPDATE items SET code='MEE003',category='MEDICATION - EYE, EAR & NOSE',brand='Tears Naturale',size='15ml',uom='BOTTLE' WHERE id='itm_mee003';
UPDATE items SET code='MEE004',category='MEDICATION - EYE, EAR & NOSE',brand='',size='0.3%',uom='BOTTLE' WHERE id='itm_mee004';
UPDATE items SET code='MEE005',category='MEDICATION - EYE, EAR & NOSE',brand='Waxsol',size='10ml',uom='BOTTLE' WHERE id='itm_mee005';
UPDATE items SET code='MEE006',category='MEDICATION - EYE, EAR & NOSE',brand='',size='30ml',uom='BOTTLE' WHERE id='itm_mee006';
UPDATE items SET code='MEE007',category='MEDICATION - EYE, EAR & NOSE',brand='',size='100ml',uom='BOTTLE' WHERE id='itm_mee007';
UPDATE items SET code='MVT001',category='MEDICATION - VITAMINS & SUPPLEMENTS',brand='',size='',uom='PACK' WHERE id='itm_mvt001';
UPDATE items SET code='MVT002',category='MEDICATION - VITAMINS & SUPPLEMENTS',brand='',size='500mg',uom='PACK' WHERE id='itm_mvt002';
UPDATE items SET code='MVT003',category='MEDICATION - VITAMINS & SUPPLEMENTS',brand='',size='1000iu',uom='PACK' WHERE id='itm_mvt003';
UPDATE items SET code='MVT004',category='MEDICATION - VITAMINS & SUPPLEMENTS',brand='Caltrate',size='600mg',uom='PACK' WHERE id='itm_mvt004';
UPDATE items SET code='MVT005',category='MEDICATION - VITAMINS & SUPPLEMENTS',brand='',size='',uom='PACK' WHERE id='itm_mvt005';
UPDATE items SET code='MVT006',category='MEDICATION - VITAMINS & SUPPLEMENTS',brand='',size='',uom='PACK' WHERE id='itm_mvt006';
UPDATE items SET code='MVT007',category='MEDICATION - VITAMINS & SUPPLEMENTS',brand='',size='',uom='TIN' WHERE id='itm_mvt007';
UPDATE items SET code='MPL001',category='MEDICATION - PALLIATIVE / END OF LIFE',brand='',size='10mg/ml',uom='AMPOULE' WHERE id='itm_mpl001';
UPDATE items SET code='MPL002',category='MEDICATION - PALLIATIVE / END OF LIFE',brand='',size='5mg/ml',uom='AMPOULE' WHERE id='itm_mpl002';
UPDATE items SET code='MPL003',category='MEDICATION - PALLIATIVE / END OF LIFE',brand='',size='5mg/ml',uom='AMPOULE' WHERE id='itm_mpl003';
UPDATE items SET code='MPL004',category='MEDICATION - PALLIATIVE / END OF LIFE',brand='Buscopan',size='20mg/ml',uom='AMPOULE' WHERE id='itm_mpl004';
UPDATE items SET code='MPL005',category='MEDICATION - PALLIATIVE / END OF LIFE',brand='',size='10mg/2ml',uom='AMPOULE' WHERE id='itm_mpl005';
UPDATE items SET code='MPL006',category='MEDICATION - PALLIATIVE / END OF LIFE',brand='',size='4mg/ml',uom='AMPOULE' WHERE id='itm_mpl006';
UPDATE items SET code='MPL007',category='MEDICATION - PALLIATIVE / END OF LIFE',brand='',size='',uom='UNIT' WHERE id='itm_mpl007';
UPDATE items SET code='MPL008',category='MEDICATION - PALLIATIVE / END OF LIFE',brand='',size='',uom='SET' WHERE id='itm_mpl008';
UPDATE items SET code='MPL009',category='MEDICATION - PALLIATIVE / END OF LIFE',brand='',size='',uom='EACH' WHERE id='itm_mpl009';
UPDATE items SET code='MPL010',category='MEDICATION - PALLIATIVE / END OF LIFE',brand='',size='',uom='TUBE' WHERE id='itm_mpl010';
UPDATE items SET code='MEM001',category='MEDICATION - EMERGENCY',brand='',size='1mg/ml',uom='AMPOULE' WHERE id='itm_mem001';
UPDATE items SET code='MEM002',category='MEDICATION - EMERGENCY',brand='',size='0.6mg/ml',uom='AMPOULE' WHERE id='itm_mem002';
UPDATE items SET code='MEM003',category='MEDICATION - EMERGENCY',brand='',size='100mg',uom='VIAL' WHERE id='itm_mem003';
UPDATE items SET code='MEM004',category='MEDICATION - EMERGENCY',brand='',size='50ml',uom='VIAL' WHERE id='itm_mem004';
UPDATE items SET code='MEM005',category='MEDICATION - EMERGENCY',brand='',size='0.4mg/ml',uom='AMPOULE' WHERE id='itm_mem005';
UPDATE items SET code='MEM006',category='MEDICATION - EMERGENCY',brand='Piriton',size='10mg/ml',uom='AMPOULE' WHERE id='itm_mem006';
UPDATE items SET code='MEM007',category='MEDICATION - EMERGENCY',brand='',size='1mg',uom='EACH' WHERE id='itm_mem007';

UPDATE items SET category='UNCATEGORISED' WHERE category IS NULL OR category='';
UPDATE items SET uom='EACH' WHERE uom IS NULL OR uom='';
UPDATE items SET active=1 WHERE active IS NULL;
