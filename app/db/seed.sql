-- Assura v2 seed — services, items, settings (from v1). Run after schema.sql.
-- wrangler d1 execute assura --file=db/seed.sql

-- Services
INSERT OR IGNORE INTO services (id,name_en,name_zh,basis,rate,rate2,grp,sort,active) VALUES ('wound','Wound Dressing','伤口换药','procedure',80,0,'proc',0,1);
INSERT OR IGNORE INTO services (id,name_en,name_zh,basis,rate,rate2,grp,sort,active) VALUES ('inject','Injection & Drip','注射 · 打点滴','procedure',60,0,'proc',1,1);
INSERT OR IGNORE INTO services (id,name_en,name_zh,basis,rate,rate2,grp,sort,active) VALUES ('catheter','Urinary Catheter Change','更换尿管','procedure',120,0,'proc',2,1);
INSERT OR IGNORE INTO services (id,name_en,name_zh,basis,rate,rate2,grp,sort,active) VALUES ('ryles','Ryle''s Tube Change','更换鼻胃管','procedure',120,0,'proc',3,1);
INSERT OR IGNORE INTO services (id,name_en,name_zh,basis,rate,rate2,grp,sort,active) VALUES ('postop','Post-Operative Care','术后护理','session',150,0,'recov',4,1);
INSERT OR IGNORE INTO services (id,name_en,name_zh,basis,rate,rate2,grp,sort,active) VALUES ('bedbound','Bed-Bound Patient Care','卧床护理','hour',90,0,'recov',5,1);
INSERT OR IGNORE INTO services (id,name_en,name_zh,basis,rate,rate2,grp,sort,active) VALUES ('adl','ADL Assistance','日常起居协助','hour',80,0,'recov',6,1);
INSERT OR IGNORE INTO services (id,name_en,name_zh,basis,rate,rate2,grp,sort,active) VALUES ('hygiene','Personal Hygiene Care','个人卫生','session',100,0,'pers',7,1);
INSERT OR IGNORE INTO services (id,name_en,name_zh,basis,rate,rate2,grp,sort,active) VALUES ('pall','Palliative Care','安宁疗护','hour',100,0,'pall',8,1);
INSERT OR IGNORE INTO services (id,name_en,name_zh,basis,rate,rate2,grp,sort,active) VALUES ('eol','End-of-Life Care','临终关怀','hour',100,0,'pall',9,1);
INSERT OR IGNORE INTO services (id,name_en,name_zh,basis,rate,rate2,grp,sort,active) VALUES ('escort','Clinic & Hospital Escort','陪诊','tiered',80,40,'supp',10,1);
INSERT OR IGNORE INTO services (id,name_en,name_zh,basis,rate,rate2,grp,sort,active) VALUES ('other','Other / Not Sure','其他需求','session',0,0,'supp',11,1);

-- Items
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm00','Dressing set 换药包',25,'staff',0,'',0);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm01','Gauze / bandage 纱布绷带',10,'staff',0,'',1);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm02','Normal saline 生理盐水',12,'staff',0,'',2);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm03','Sterile gloves 无菌手套',5,'staff',0,'',3);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm04','Micropore tape 纸胶带',6,'staff',0,'',4);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm05','Transparent film dressing 透明敷料',18,'staff',0,'',5);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm06','Foam dressing 泡沫敷料',35,'staff',0,'',6);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm07','Hydrocolloid dressing 水胶体敷料',30,'staff',0,'',7);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm08','Alginate dressing 藻酸盐敷料',38,'staff',0,'',8);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm09','Antiseptic solution 消毒药水',15,'staff',0,'',9);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm10','Cotton bud / swab 棉签',5,'staff',0,'',10);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm11','Foley catheter 尿管',45,'staff',1,'tell us the size 请说明尺寸 (Fr 14 / 16 / 18)',11);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm12','Urine bag 尿袋',15,'staff',0,'',12);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm13','Leg bag 腿袋',25,'staff',0,'',13);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm14','Lubricant gel 润滑剂',12,'staff',0,'',14);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm15','Sterile water 无菌注射用水',8,'staff',0,'',15);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm16','Catheter strap 固定带',15,'staff',0,'',16);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm17','Ryle''s tube 鼻胃管',35,'staff',1,'tell us the size 请说明尺寸 (Fr 12 / 14 / 16)',17);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm18','Feeding syringe 50ml 喂食针筒',8,'staff',0,'',18);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm19','pH test paper 酸碱试纸',10,'staff',0,'',19);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm20','Nasal fixation tape 鼻贴',8,'staff',0,'',20);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm21','Feed formula 营养奶粉',0,'family',1,'the brand her doctor prescribed 医生指定的牌子',21);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm22','IV / drip set 输液器',15,'staff',0,'',22);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm23','IV cannula 静脉留置针',12,'staff',0,'',23);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm24','Syringe 针筒',3,'staff',0,'',24);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm25','Needle 针头',2,'staff',0,'',25);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm26','Alcohol swab 酒精棉',1,'staff',0,'',26);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm27','Sharps bin 利器盒',15,'staff',0,'',27);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm28','Plaster 胶布',3,'staff',0,'',28);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm29','Disposable gloves 一次性手套',3,'staff',0,'',29);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm30','Face mask 口罩',2,'staff',0,'',30);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm31','Disposable apron 围裙',3,'staff',0,'',31);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm32','Hand sanitiser 洗手液',12,'staff',0,'',32);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm33','Underpad 看护垫',3,'staff',0,'',33);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm34','Adult diaper 成人纸尿裤',3,'staff',0,'',34);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm35','Wet wipes 湿纸巾',8,'staff',0,'',35);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm36','Barrier cream 隔离膏',25,'staff',0,'',36);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm37','Kidney dish 弯盘',8,'staff',0,'',37);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm38','Mouth care swab 口腔棉棒',12,'staff',0,'',38);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm39','Suction catheter 抽痰管',6,'staff',1,'tell us the size 请说明尺寸',39);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm40','Air mattress 气垫床',0,'family',1,'rental — arrange a few days ahead 租借，请提前几天安排',40);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm41','Hospital bed 医院病床',0,'family',1,'rental — arrange a few days ahead 租借，请提前几天安排',41);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm42','Oxygen cylinder 氧气筒',0,'family',1,'from a supplier — arrange ahead 供应商提供，请提前安排',42);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm43','Suction machine 抽痰机',0,'family',1,'rental — arrange a few days ahead 租借，请提前几天安排',43);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm44','Wheelchair 轮椅',0,'family',1,'rental or purchase 租借或购买',44);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm45','Commode chair 便椅',0,'family',1,'rental or purchase 租借或购买',45);
INSERT OR IGNORE INTO items (id,name,price,prepare_by,order_ahead,spec,sort) VALUES ('itm46','Prescribed medication 处方药物',0,'family',1,'from her own doctor or pharmacy 由医生或药房提供',46);

-- Settings
INSERT OR IGNORE INTO settings (key,value) VALUES ('emergency','80');
INSERT OR IGNORE INTO settings (key,value) VALUES ('afterHours','50');
INSERT OR IGNORE INTO settings (key,value) VALUES ('publicHol','100');
INSERT OR IGNORE INTO settings (key,value) VALUES ('travelFreeKm','15');
INSERT OR IGNORE INTO settings (key,value) VALUES ('travelPerKm','1.5');
INSERT OR IGNORE INTO settings (key,value) VALUES ('depositLongTerm','300');
INSERT OR IGNORE INTO settings (key,value) VALUES ('bizName','Assura Nursing Care');
INSERT OR IGNORE INTO settings (key,value) VALUES ('bizReg','');
INSERT OR IGNORE INTO settings (key,value) VALUES ('bizAddr','');
INSERT OR IGNORE INTO settings (key,value) VALUES ('bankName','');
INSERT OR IGNORE INTO settings (key,value) VALUES ('accName','');
INSERT OR IGNORE INTO settings (key,value) VALUES ('accNo','');
INSERT OR IGNORE INTO settings (key,value) VALUES ('ewallet','');
INSERT OR IGNORE INTO settings (key,value) VALUES ('billingDay','saturday');
