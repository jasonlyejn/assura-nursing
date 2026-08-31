-- Clinical Consumables & Supplies Catalogue with Specific Brand, French/Gauge Size, and Color Codes
DELETE FROM items;

-- 1. SYRINGES & NEEDLES (注射与针具)
INSERT INTO items (id, code, category, name, brand, size, uom, price, prepare_by, order_ahead, active) VALUES
('syr01', 'SYR001', 'SYRINGES & NEEDLES', 'Syringe 3cc (Catheter Tip / Luer Lock)', 'Terumo', '3cc Catheter Tip', 'EACH', 3.50, 'staff', 0, 1),
('syr02', 'SYR002', 'SYRINGES & NEEDLES', 'Syringe 5cc (Luer Lock)', 'Terumo', '5cc Luer Lock', 'EACH', 3.00, 'staff', 0, 1),
('syr03', 'SYR003', 'SYRINGES & NEEDLES', 'Syringe 10cc (Luer Lock)', 'Terumo', '10cc Luer Lock', 'EACH', 3.50, 'staff', 0, 1),
('syr04', 'SYR004', 'SYRINGES & NEEDLES', 'Syringe 20cc (Luer Lock / Eccentric Tip)', 'Terumo', '20cc Eccentric', 'EACH', 5.00, 'staff', 0, 1),
('syr05', 'SYR005', 'SYRINGES & NEEDLES', 'Feeding Syringe 50cc (Catheter Tip 喂食针筒)', 'Terumo', '50cc Catheter Tip', 'EACH', 8.00, 'staff', 0, 1),
('syr06', 'SYR006', 'SYRINGES & NEEDLES', 'Insulin Syringe with Needle 1cc 31G', 'BD Ultra-Fine', '1cc / 31G 8mm', 'EACH', 2.50, 'staff', 0, 1),
('ndl01', 'NDL001', 'SYRINGES & NEEDLES', 'Hypodermic Needle 30G (Yellow 极细注射针头)', 'Terumo Agani', '30G × 1/2" (Yellow)', 'EACH', 1.50, 'staff', 0, 1),
('ndl02', 'NDL002', 'SYRINGES & NEEDLES', 'Hypodermic Needle 23G (Blue 肌肉注射针头)', 'Terumo Agani', '23G × 1" (Blue)', 'EACH', 1.50, 'staff', 0, 1),
('ndl03', 'NDL003', 'SYRINGES & NEEDLES', 'Hypodermic Needle 21G (Green 静脉抽取针头)', 'Terumo Agani', '21G × 1.5" (Green)', 'EACH', 1.50, 'staff', 0, 1),
('ndl04', 'NDL004', 'SYRINGES & NEEDLES', 'Drawing-Up Filter Needle 18G (Pink 抽取粗针)', 'Terumo Agani', '18G × 1.5" (Pink)', 'EACH', 2.00, 'staff', 0, 1);

-- 2. URINARY CATHETERIZATION (导尿耗材)
INSERT INTO items (id, code, category, name, brand, size, uom, price, prepare_by, order_ahead, active) VALUES
('uro01', 'URO001', 'URINARY CATHETER', '2-Way Foley Catheter 100% Silicone 16Fr (Orange 硅胶尿管)', 'Teleflex Rusch', '16Fr (Orange, 30cc Balloon)', 'EACH', 65.00, 'staff', 0, 1),
('uro02', 'URO002', 'URINARY CATHETER', '2-Way Foley Catheter 100% Silicone 14Fr (Green 硅胶尿管)', 'Teleflex Rusch', '14Fr (Green, 10cc Balloon)', 'EACH', 65.00, 'staff', 0, 1),
('uro03', 'URO003', 'URINARY CATHETER', '2-Way Foley Catheter Latex 16Fr (Yellow 乳胶导尿管)', 'Unomedical', '16Fr (Yellow, 10cc Balloon)', 'EACH', 35.00, 'staff', 0, 1),
('uro04', 'URO004', 'URINARY CATHETER', '3-Way Irrigation Foley Catheter Silicone 20Fr (三腔冲洗尿管)', 'Teleflex Rusch', '20Fr (30cc Balloon)', 'EACH', 85.00, 'staff', 0, 1),
('uro05', 'URO005', 'URINARY CATHETER', 'Urine Drainage Bag 2000ml (Anti-Reflux Valve 尿袋)', 'Teleflex / B.Braun', '2000ml Push-Pull Drain', 'EACH', 15.00, 'staff', 0, 1),
('uro06', 'URO006', 'URINARY CATHETER', 'Urine Leg Bag 750ml with Elastic Straps (便携腿袋)', 'ConvaTec', '750ml / 50cm tube', 'EACH', 28.00, 'staff', 0, 1),
('uro07', 'URO007', 'URINARY CATHETER', 'Lignocaine Lubricant Gel 2% (Cathejell 局部麻醉润滑凝胶)', 'Cathejell', '12.5g Pre-filled Syringe', 'EACH', 18.00, 'staff', 0, 1),
('uro08', 'URO008', 'URINARY CATHETER', 'Catheter Leg Strap & Tubing Securement Device (导管固定带)', 'Statlock / Dale', 'Universal Leg Strap', 'EACH', 18.00, 'staff', 0, 1),
('uro09', 'URO009', 'URINARY CATHETER', 'Sterile Water for Balloon Inflation 10ml (无菌注射用水)', 'B. Braun', '10ml Ampoule', 'EACH', 5.00, 'staff', 0, 1);

-- 3. ENTERAL NUTRITION & TUBES (鼻胃管与喂食)
INSERT INTO items (id, code, category, name, brand, size, uom, price, prepare_by, order_ahead, active) VALUES
('tub01', 'TUB001', 'ENTERAL TUBES', 'Ryle’s / NG Feeding Tube 100% Silicone 14Fr (Green 硅胶鼻胃管)', 'Teleflex / Kangaroo', '14Fr 120cm (Green Cap)', 'EACH', 55.00, 'staff', 0, 1),
('tub02', 'TUB002', 'ENTERAL TUBES', 'Ryle’s / NG Feeding Tube 100% Silicone 16Fr (Orange 硅胶鼻胃管)', 'Teleflex / Kangaroo', '16Fr 120cm (Orange Cap)', 'EACH', 55.00, 'staff', 0, 1),
('tub03', 'TUB003', 'ENTERAL TUBES', 'Ryle’s / NG Feeding Tube 100% Silicone 12Fr (White 细号硅胶胃管)', 'Teleflex / Kangaroo', '12Fr 105cm (White Cap)', 'EACH', 55.00, 'staff', 0, 1),
('tub04', 'TUB004', 'ENTERAL TUBES', 'PVC Ryle’s Tube 14Fr with Radiopaque Line (PVC鼻胃管)', 'Unomedical', '14Fr 105cm (Green)', 'EACH', 28.00, 'staff', 0, 1),
('tub05', 'TUB005', 'ENTERAL TUBES', 'pH Indicator Test Strips for Gastric Aspirate (胃酸试纸)', 'Merck', 'pH 1.0 - 6.0 Strip', 'PACK', 12.00, 'staff', 0, 1),
('tub06', 'TUB006', 'ENTERAL TUBES', 'Nasal Tube Fixation Dressing (鼻贴固定敷料)', 'Smith & Nephew', 'Specialized Butterfly Plaster', 'EACH', 6.00, 'staff', 0, 1);

-- 4. WOUND CARE & ADVANCED DRESSINGS (伤口与先进敷料)
INSERT INTO items (id, code, category, name, brand, size, uom, price, prepare_by, order_ahead, active) VALUES
('wnd01', 'WND001', 'WOUND CARE', 'Sterile Basic Dressing Set (Forceps, Gauze, Drape, Yellow Bag 换药包)', 'Harps / Medi-Set', 'Standard 4-Compartment Tray', 'SET', 25.00, 'staff', 0, 1),
('wnd02', 'WND002', 'WOUND CARE', 'Aquacel Ag+ Extra (Silver Hydrofiber Dressing 银离子纤维敷料)', 'ConvaTec', '10cm × 10cm', 'EACH', 48.00, 'staff', 0, 1),
('wnd03', 'WND003', 'WOUND CARE', 'Duoderm CGF Hydrocolloid Dressing (水胶体人工皮敷料)', 'ConvaTec', '10cm × 10cm', 'EACH', 35.00, 'staff', 0, 1),
('wnd04', 'WND004', 'WOUND CARE', 'Mepilex Border Foam Dressing with Safetac (自粘性泡沫敷料)', 'Mölnlycke', '10cm × 10cm', 'EACH', 45.00, 'staff', 0, 1),
('wnd05', 'WND005', 'WOUND CARE', 'Mepilex Border Sacrum Dressing (尾骶骨褥疮专用泡沫敷料)', 'Mölnlycke', '18cm × 18cm (Sacral)', 'EACH', 68.00, 'staff', 0, 1),
('wnd06', 'WND006', 'WOUND CARE', 'Opsite Post-Op Waterproof Film with Absorbent Pad (防水伤口贴)', 'Smith & Nephew', '8.5cm × 15cm', 'EACH', 18.00, 'staff', 0, 1),
('wnd07', 'WND007', 'WOUND CARE', 'Intrasite Gel Hydrogel Wound Gel (清创水凝胶)', 'Smith & Nephew', '25g Applicap Tube', 'TUBE', 38.00, 'staff', 0, 1),
('wnd08', 'WND008', 'WOUND CARE', 'Bactigras Chlorhexidine Tulle Gras (油纱布敷料)', 'Smith & Nephew', '10cm × 10cm', 'EACH', 12.00, 'staff', 0, 1),
('wnd09', 'WND009', 'WOUND CARE', 'Normal Saline 0.9% Irrigation Bottle (生理盐水冲洗液)', 'B. Braun / Ain', '500ml Twist Bottle', 'BOTTLE', 12.00, 'staff', 0, 1),
('wnd10', 'WND010', 'WOUND CARE', 'Normal Saline 0.9% Sterile Ampoules (无菌生理盐水安瓿)', 'B. Braun', '30ml Ampoule (Pack of 3)', 'PACK', 10.00, 'staff', 0, 1),
('wnd11', 'WND011', 'WOUND CARE', 'Povidone Iodine 10% Antiseptic Solution (聚维酮碘消毒液)', 'Betadine', '60ml Bottle', 'BOTTLE', 15.00, 'staff', 0, 1),
('wnd12', 'WND012', 'WOUND CARE', 'Micropore Surgical Tape (Hypoallergenic 纸胶带)', '3M', '1-inch × 10 yards', 'ROLL', 8.00, 'staff', 0, 1),
('wnd13', 'WND013', 'WOUND CARE', 'Hypafix Dressing Retention Tape (弹性透气自粘胶布)', 'BSN Medical', '10cm × 10cm Sheet', 'EACH', 6.00, 'staff', 0, 1);

-- 5. IV INFUSION & BLOOD SAMPLING (输液与采血)
INSERT INTO items (id, code, category, name, brand, size, uom, price, prepare_by, order_ahead, active) VALUES
('iv01', 'IV001', 'IV INFUSION', 'IV Cannula Venflon Pro 20G (Pink 静脉留置针)', 'BD Venflon Pro', '20G 1.1 × 32mm (Pink)', 'EACH', 18.00, 'staff', 0, 1),
('iv02', 'IV002', 'IV INFUSION', 'IV Cannula Venflon Pro 22G (Blue 静脉留置针)', 'BD Venflon Pro', '22G 0.9 × 25mm (Blue)', 'EACH', 18.00, 'staff', 0, 1),
('iv03', 'IV003', 'IV INFUSION', 'IV Cannula Venflon Pro 24G (Yellow 儿科/细血管留置针)', 'BD Venflon Pro', '24G 0.7 × 19mm (Yellow)', 'EACH', 18.00, 'staff', 0, 1),
('iv04', 'IV004', 'IV INFUSION', 'IV Infusion Administration Drip Set (重力输液皮条)', 'B. Braun / Terumo', 'Gravity Drip Set with 15µm Filter', 'SET', 15.00, 'staff', 0, 1),
('iv05', 'IV005', 'IV INFUSION', 'IV Extension Tube with Needleless Connector (延长管带无针接头)', 'BD / B.Braun', '15cm T-Connector Extension', 'EACH', 14.00, 'staff', 0, 1),
('iv06', 'IV006', 'IV INFUSION', 'Tegaderm IV Transparent Cannula Fixation Dressing (留置针贴膜)', '3M Tegaderm', '7cm × 8.5cm with Border', 'EACH', 10.00, 'staff', 0, 1),
('iv07', 'IV007', 'IV INFUSION', 'Blood Glucose Test Strips + Sterile Lancets (血糖试纸与采血针)', 'Accu-Chek / Contour', '1 Strip + 1 Lancet 28G', 'SET', 5.00, 'staff', 0, 1),
('iv08', 'IV008', 'IV INFUSION', 'Alcohol Swabs 70% Isopropyl (消毒酒精棉片)', 'Webcol / BD', 'Pack of 10 Sachets', 'PACK', 4.00, 'staff', 0, 1);

-- 6. HYGIENE, PPE & DISINFECTION (消毒与个人防护)
INSERT INTO items (id, code, category, name, brand, size, uom, price, prepare_by, order_ahead, active) VALUES
('ppe01', 'PPE001', 'HYGIENE & PPE', 'Sterile Surgical Gloves Powder-Free (无菌手术手套)', 'Ansell / Top Glove', 'Size 7.0 / 7.5 (Sterile)', 'PAIR', 6.00, 'staff', 0, 1),
('ppe02', 'PPE002', 'HYGIENE & PPE', 'Nitrile Examination Gloves Powder-Free (丁腈医用手套)', 'Hartalega / Ansell', 'Size M / L (Non-sterile)', 'PAIR', 3.00, 'staff', 0, 1),
('ppe03', 'PPE003', 'HYGIENE & PPE', 'Disposable Waterproof Underpad (成人一次性护理垫)', 'Seni / Tena', '60cm × 90cm (Large)', 'EACH', 4.00, 'staff', 0, 1),
('ppe04', 'PPE004', 'HYGIENE & PPE', 'Yellow Biohazard Waste Disposal Bag (医疗黄色垃圾袋)', 'Medi-Safe', 'Heavy Duty 30L', 'EACH', 2.00, 'staff', 0, 1);
