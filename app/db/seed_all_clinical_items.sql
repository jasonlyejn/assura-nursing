-- Complete Clinical Consumables & Supplies Catalog for Assura Home Nursing Care
DELETE FROM items;

INSERT INTO items (id, code, category, name, brand, size, uom, price, prepare_by, order_ahead, spec, sort, active) VALUES
-- =========================================================================
-- 1. SYRINGES & NEEDLES (注射器与针头)
-- =========================================================================
('itm_syr001', 'SYR001', 'SYRINGES & NEEDLES', 'Terumo Syringe Luer Slip 1ml (Tuberculin)', 'Terumo', '1ml / 1cc', 'EACH', 1.50, 'staff', 0, 'Ultra-clear barrel, smooth plunger for precise dosing', 1, 1),
('itm_syr002', 'SYR002', 'SYRINGES & NEEDLES', 'Terumo Syringe Luer Lock 3ml', 'Terumo', '3ml / 3cc', 'EACH', 1.80, 'staff', 0, 'Luer lock thread for secure needle attachment', 2, 1),
('itm_syr003', 'SYR003', 'SYRINGES & NEEDLES', 'Terumo Syringe Luer Lock 5ml', 'Terumo', '5ml / 5cc', 'EACH', 2.00, 'staff', 0, 'Double-contact gasket for airtight seal', 3, 1),
('itm_syr004', 'SYR004', 'SYRINGES & NEEDLES', 'Terumo Syringe Luer Lock 10ml', 'Terumo', '10ml / 10cc', 'EACH', 2.50, 'staff', 0, 'Standard IV medication administration & flushing', 4, 1),
('itm_syr005', 'SYR005', 'SYRINGES & NEEDLES', 'Terumo Syringe Luer Lock 20ml', 'Terumo', '20ml / 20cc', 'EACH', 3.50, 'staff', 0, 'For drug reconstitution, irrigation & wound wash', 5, 1),
('itm_syr006', 'SYR006', 'SYRINGES & NEEDLES', 'Terumo / BD Feeding Syringe Catheter Tip 50ml', 'Terumo', '50ml / 60ml Catheter Tip', 'EACH', 6.00, 'staff', 0, 'Catheter tip for Ryles tube & PEG enteral feeding', 6, 1),

('itm_ndl001', 'NDL001', 'SYRINGES & NEEDLES', 'Drawing Up Needle 18G Pink', 'BD / Terumo', '18G × 1.5 inch (Pink)', 'EACH', 1.00, 'staff', 0, 'Blunt/bevel drawing needle for reconstituting vials', 7, 1),
('itm_ndl002', 'NDL002', 'SYRINGES & NEEDLES', 'Terumo Agani Hypodermic Needle 21G Green', 'Terumo Agani', '21G × 1.5 inch (Green)', 'EACH', 1.20, 'staff', 0, 'Standard intramuscular (IM) injection needle', 8, 1),
('itm_ndl003', 'NDL003', 'SYRINGES & NEEDLES', 'Terumo Agani Hypodermic Needle 23G Blue', 'Terumo Agani', '23G × 1.25 inch (Blue)', 'EACH', 1.20, 'staff', 0, 'Deep subcutaneous & intramuscular injection', 9, 1),
('itm_ndl004', 'NDL004', 'SYRINGES & NEEDLES', 'Terumo Agani Hypodermic Needle 25G Orange', 'Terumo Agani', '25G × 1.0 inch (Orange)', 'EACH', 1.20, 'staff', 0, 'Subcutaneous (SC) injection needle', 10, 1),
('itm_ndl005', 'NDL005', 'SYRINGES & NEEDLES', 'Terumo Agani Hypodermic Needle 30G Yellow', 'Terumo Agani', '30G × 0.5 inch (Yellow)', 'EACH', 1.50, 'staff', 0, 'Fine facial/local anaesthesia injection', 11, 1),
('itm_ndl006', 'NDL006', 'SYRINGES & NEEDLES', 'BD Ultra-Fine Insulin Syringe with Needle 1ml', 'BD Ultra-Fine', '1ml 31G × 6mm (100u)', 'EACH', 2.00, 'staff', 0, 'Short 6mm needle for pain-free insulin injection', 12, 1),
('itm_ndl007', 'NDL007', 'SYRINGES & NEEDLES', 'BD Ultra-Fine Insulin Pen Needles', 'BD Ultra-Fine', '4mm 32G (Box of 100)', 'BOX', 55.00, 'staff', 0, 'Universal fit for Lantus, Novorapid, Humalog pens', 13, 1),

('itm_can001', 'CAN001', 'SYRINGES & NEEDLES', 'BD Venflon Pro Safety IV Cannula 20G Pink', 'BD Venflon', '20G (Pink) 1.1 × 32mm', 'EACH', 9.00, 'staff', 0, 'Safety ported IV cannula for IV drip & medications', 14, 1),
('itm_can002', 'CAN002', 'SYRINGES & NEEDLES', 'BD Venflon Pro Safety IV Cannula 22G Blue', 'BD Venflon', '22G (Blue) 0.9 × 25mm', 'EACH', 9.00, 'staff', 0, 'Standard IV cannula for elderly / fragile veins', 15, 1),
('itm_can003', 'CAN003', 'SYRINGES & NEEDLES', 'BD Venflon Pro Safety IV Cannula 24G Yellow', 'BD Venflon', '24G (Yellow) 0.7 × 19mm', 'EACH', 9.00, 'staff', 0, 'Fine IV cannula for difficult / pediatric veins', 16, 1),
('itm_can004', 'CAN004', 'SYRINGES & NEEDLES', 'Scalp Vein / Butterfly Infusion Set 23G Blue', 'Terumo / BD', '23G Butterfly', 'EACH', 4.50, 'staff', 0, 'Butterfly needle with flexible tubing for blood taking', 17, 1),
('itm_can005', 'CAN005', 'SYRINGES & NEEDLES', 'Sharps Disposal Bin (Biohazard Yellow)', 'SafetyBox', '2.5 Litre Biohazard', 'EACH', 16.00, 'staff', 0, 'BS 7320 certified puncture-resistant sharps disposal', 18, 1),

-- =========================================================================
-- 2. UROLOGY & CATHETERS (导尿管与泌尿护理)
-- =========================================================================
('itm_uro001', 'URO001', 'UROLOGY & CATHETERS', 'Teleflex Rusch 100% Silicone 2-Way Foley Catheter Fr 12', 'Teleflex Rusch', '12Fr (White) 10ml Balloon', 'EACH', 36.00, 'staff', 1, '100% medical grade silicone, gentle for strictures', 19, 1),
('itm_uro002', 'URO002', 'UROLOGY & CATHETERS', 'Teleflex Rusch 100% Silicone 2-Way Foley Catheter Fr 14', 'Teleflex Rusch', '14Fr (Green) 10ml Balloon', 'EACH', 36.00, 'staff', 1, 'Long-term 30-day dwelling time, bio-compatible', 20, 1),
('itm_uro003', 'URO003', 'UROLOGY & CATHETERS', 'Teleflex Rusch 100% Silicone 2-Way Foley Catheter Fr 16', 'Teleflex Rusch', '16Fr (Orange) 10ml Balloon', 'EACH', 36.00, 'staff', 0, 'Standard adult male/female 100% silicone catheter', 21, 1),
('itm_uro004', 'URO004', 'UROLOGY & CATHETERS', 'Teleflex Rusch 100% Silicone 2-Way Foley Catheter Fr 18', 'Teleflex Rusch', '18Fr (Red) 10ml Balloon', 'EACH', 36.00, 'staff', 1, 'Wide lumen silicone catheter for cloudy urine/sediment', 22, 1),
('itm_uro005', 'URO005', 'UROLOGY & CATHETERS', 'Teleflex 3-Way Hematuria Irrigation Catheter Fr 20', 'Teleflex Rusch', '20Fr 3-Way (Yellow) 30ml', 'EACH', 48.00, 'staff', 1, 'Triple lumen catheter for continuous bladder washouts', 23, 1),
('itm_uro006', 'URO006', 'UROLOGY & CATHETERS', 'Latex 2-Way Foley Catheter Silicone-Coated Fr 16', 'Bardia / Rusch', '16Fr (Orange) 10ml Balloon', 'EACH', 14.00, 'staff', 0, 'Short-term silicone-elastomer coated catheter', 24, 1),
('itm_uro007', 'URO007', 'UROLOGY & CATHETERS', 'Drainage Urine Bedside Bag with T-Tap & Anti-Reflux', 'Teleflex / Amsino', '2000ml with Anti-Reflux', 'EACH', 12.00, 'staff', 0, 'Cross-valve T-tap, non-return flutter valve, 120cm tube', 25, 1),
('itm_uro008', 'URO008', 'UROLOGY & CATHETERS', 'Urine Leg Bag with Elastic Fabric Straps', 'ConvaTec / Coloplast', '500ml / 750ml with Straps', 'EACH', 22.00, 'staff', 0, 'Discreet ambulatory leg bag with soft flocked backing', 26, 1),
('itm_uro009', 'URO009', 'UROLOGY & CATHETERS', 'Instillagel / Cathejell 2% Lignocaine Anaesthetic Gel', 'Farco-Pharma', '11ml Pre-filled Syringe', 'EACH', 18.00, 'staff', 0, 'Local anaesthetic & antiseptic lubricant for catheterisation', 27, 1),
('itm_uro010', 'URO010', 'UROLOGY & CATHETERS', 'Uro-Tainer Suby G Catheter Maintenance Solution', 'B. Braun', '100ml Sachet with Connector', 'EACH', 32.00, 'staff', 1, 'Citric acid 3.23% solution to dissolve encrustations', 28, 1),
('itm_uro011', 'URO011', 'UROLOGY & CATHETERS', 'Statlock Foley Catheter Stabilization Leg Anchor', 'BD Statlock', 'Universal Swivel Clamp', 'EACH', 24.00, 'staff', 0, 'Suture-free securement to prevent urethral traction', 29, 1),
('itm_uro012', 'URO012', 'UROLOGY & CATHETERS', 'Sterile Water for Balloon Inflation Ampoule', 'Ain Medicare', '10ml Ampoule (Sterile)', 'EACH', 3.00, 'staff', 0, 'Non-pyrogenic sterile water for inflating balloon', 30, 1),

-- =========================================================================
-- 3. ENTERAL & GASTRIC TUBES (鼻胃管与喂食管)
-- =========================================================================
('itm_tub001', 'TUB001', 'ENTERAL & GASTRIC TUBES', '100% Silicone Ryles Tube with Guide Wire Fr 12', 'Teleflex / Rusch', '12Fr (White) 120cm', 'EACH', 55.00, 'staff', 1, 'Soft silicone feeding tube with tungsten wire, 30-day use', 31, 1),
('itm_tub002', 'TUB002', 'ENTERAL & GASTRIC TUBES', '100% Silicone Ryles Tube with Guide Wire Fr 14', 'Teleflex / Rusch', '14Fr (Green) 120cm', 'EACH', 55.00, 'staff', 0, 'Standard adult silicone nasogastric tube, radiopaque line', 32, 1),
('itm_tub003', 'TUB003', 'ENTERAL & GASTRIC TUBES', '100% Silicone Ryles Tube with Guide Wire Fr 16', 'Teleflex / Rusch', '16Fr (Orange) 120cm', 'EACH', 55.00, 'staff', 0, 'Wide bore silicone feeding tube for thicker blenderised feeds', 33, 1),
('itm_tub004', 'TUB004', 'ENTERAL & GASTRIC TUBES', 'Polyurethane (PU) Long-Term Enteral Tube with ENFit Fr 12', 'Corpak / Kangaroo', '12Fr × 109cm weighted tip', 'EACH', 78.00, 'staff', 1, 'Biocompatible PU tube, soft inside body, lasts up to 90 days', 34, 1),
('itm_tub005', 'TUB005', 'ENTERAL & GASTRIC TUBES', 'PVC Stomach Tube / Ryles Tube Fr 16', 'Unomedical / Rusch', '16Fr (Orange) 105cm', 'EACH', 15.00, 'staff', 0, 'Short-term PVC feeding tube (max 7-10 days)', 35, 1),
('itm_tub006', 'TUB006', 'ENTERAL & GASTRIC TUBES', 'Nose Plaster NG Tube Fixation Anchor', 'NasoFix / 3M', 'Butterfly Shape (Pack of 5)', 'PACK', 12.00, 'staff', 0, 'Hypoallergenic contoured nose plaster for tube securement', 36, 1),
('itm_tub007', 'TUB007', 'ENTERAL & GASTRIC TUBES', 'Gastric Aspirate pH Indicator Test Strips', 'Macherey-Nagel', 'pH 2.0 – 9.0 (Box of 100)', 'BOX', 45.00, 'staff', 0, 'Narrow range pH verification strips for gastric position', 37, 1),
('itm_tub008', 'TUB008', 'ENTERAL & GASTRIC TUBES', 'Enteral Gravity Feeding Bag Set 1000ml', 'Kangaroo / Compat', '1000ml Bag with Roller Clamp', 'EACH', 18.00, 'staff', 0, 'Large opening bag with drip chamber & ENFit/funnel tip', 38, 1),
('itm_tub009', 'TUB009', 'ENTERAL & GASTRIC TUBES', 'PEG Tube Replacement Y-Port Adapter / Extension', 'MIC-KEY / Kimberly-Clark', 'Bolus & Medication Port Set', 'EACH', 68.00, 'staff', 1, 'Replacement connection ports for percutaneous gastrostomy', 39, 1),

-- =========================================================================
-- 4. ADVANCED WOUND CARE & DRESSINGS (伤口敷料)
-- =========================================================================
('itm_wnd001', 'WND001', 'ADVANCED WOUND CARE', 'Mepilex Border Flex Foam Dressing 7.5 × 7.5cm', 'Mölnlycke Mepilex', '7.5cm × 7.5cm with Border', 'EACH', 22.00, 'staff', 0, 'Safetac soft silicone foam dressing, flex technology', 40, 1),
('itm_wnd002', 'WND002', 'ADVANCED WOUND CARE', 'Mepilex Border Flex Foam Dressing 10 × 10cm', 'Mölnlycke Mepilex', '10cm × 10cm with Border', 'EACH', 28.00, 'staff', 0, 'All-in-one silicone foam dressing for bedsores & ulcers', 41, 1),
('itm_wnd003', 'WND003', 'ADVANCED WOUND CARE', 'Mepilex Border Sacrum Dressing 18 × 18cm', 'Mölnlycke Mepilex', '18cm × 18cm Sacral Shape', 'EACH', 48.00, 'staff', 0, 'Anatomical sacrum shape for coccyx pressure ulcers', 42, 1),
('itm_wnd004', 'WND004', 'ADVANCED WOUND CARE', 'Mepilex Border Heel Dressing', 'Mölnlycke Mepilex', '13cm × 20cm Heel Shape', 'EACH', 42.00, 'staff', 0, 'Anatomical heel dressing for calcaneus ulcers', 43, 1),
('itm_wnd005', 'WND005', 'ADVANCED WOUND CARE', 'Aquacel Ag+ Extra Silver Hydrofiber 10 × 10cm', 'ConvaTec Aquacel', '10cm × 10cm (Ionic Silver)', 'EACH', 34.00, 'staff', 0, 'Ionic silver + antibiofilm technology for infected sloughy wounds', 44, 1),
('itm_wnd006', 'WND006', 'ADVANCED WOUND CARE', 'Aquacel Ag+ Extra Silver Ribbon with Stitching', 'ConvaTec Aquacel', '2cm × 45cm Ribbon', 'EACH', 32.00, 'staff', 0, 'Hydrofiber ribbon for packing deep cavity wounds & sinuses', 45, 1),
('itm_wnd007', 'WND007', 'ADVANCED WOUND CARE', 'Kaltostat Calcium Sodium Alginate Dressing 10 × 10cm', 'ConvaTec Kaltostat', '10cm × 10cm Alginate', 'EACH', 18.00, 'staff', 0, 'High-absorption calcium alginate for bleeding & exuding wounds', 46, 1),
('itm_wnd008', 'WND008', 'ADVANCED WOUND CARE', 'Duoderm Extra Thin Hydrocolloid 10 × 10cm', 'ConvaTec Duoderm', '10cm × 10cm Extra Thin', 'EACH', 16.00, 'staff', 0, 'Translucent hydrocolloid for superficial bedsores & skin tears', 47, 1),
('itm_wnd009', 'WND009', 'ADVANCED WOUND CARE', 'UrgoClean Ag Silver Polyabsorbent Dressing 10 × 10cm', 'Urgo Medical', '10cm × 10cm Lipido-Colloid', 'EACH', 32.00, 'staff', 0, 'Desloughing polyabsorbent fibers with antimicrobial silver', 48, 1),
('itm_wnd010', 'WND010', 'ADVANCED WOUND CARE', 'Acticoat Flex 3 Nanocrystalline Silver Dressing', 'Smith & Nephew', '10cm × 10cm 3-Day Silver', 'EACH', 38.00, 'staff', 0, 'Fast-acting antimicrobial barrier kills bacteria in 30 mins', 49, 1),
('itm_wnd011', 'WND011', 'ADVANCED WOUND CARE', 'Iodosorb Cadexomer Iodine Ointment 20g Tube', 'Smith & Nephew', '20g Tube (0.9% Iodine)', 'TUBE', 42.00, 'staff', 0, 'Cadexomer iodine absorbs exudate & slough, releases iodine', 50, 1),
('itm_wnd012', 'WND012', 'ADVANCED WOUND CARE', 'Prontosan Wound Irrigation Solution 350ml', 'B. Braun', '350ml Bottle (Betaine + PHMB)', 'BOTTLE', 45.00, 'staff', 0, 'Cleans, rinses and decontaminates biofilm & chronic wounds', 51, 1),
('itm_wnd013', 'WND013', 'ADVANCED WOUND CARE', 'Prontosan Wound Gel X 50g Tube', 'B. Braun', '50g Tube (High Viscosity)', 'TUBE', 52.00, 'staff', 0, 'Hydrogel for deep wound beds, maintains moist healing', 52, 1),
('itm_wnd014', 'WND014', 'ADVANCED WOUND CARE', 'Intrasite Gel Hydrogel with APG 15g Applipak', 'Smith & Nephew', '15g Sterile Applipak', 'EACH', 16.00, 'staff', 0, 'Rehydrates necrotic tissue and promotes autolytic debridement', 53, 1),
('itm_wnd015', 'WND015', 'ADVANCED WOUND CARE', 'Bactigras Chlorhexidine Tulle Gras 10 × 10cm', 'Smith & Nephew', '10cm × 10cm Paraffin Gauze', 'EACH', 4.50, 'staff', 0, 'Paraffin gauze with 0.5% chlorhexidine acetate for burns & cuts', 54, 1),
('itm_wnd016', 'WND016', 'ADVANCED WOUND CARE', 'Sterile Gauze Swabs 8-Ply 7.5 × 7.5cm', 'Hospital Grade', 'Pack of 5 Swabs', 'PACK', 3.00, 'staff', 0, '100% pure cotton sterile gauze swabs for wound cleansing', 55, 1),
('itm_wnd017', 'WND017', 'ADVANCED WOUND CARE', 'Sterile Gauze Swabs 8-Ply 10 × 10cm', 'Hospital Grade', 'Pack of 5 Swabs', 'PACK', 4.00, 'staff', 0, '100% pure cotton sterile gauze swabs for large dressings', 56, 1),
('itm_wnd018', 'WND018', 'ADVANCED WOUND CARE', 'Hypafix / Opsite Flexifix Dressing Retention Tape', 'BSN Medical / S&N', '10cm × 10m Roll', 'ROLL', 58.00, 'staff', 0, 'Wide-area adhesive non-woven fabric tape for secure dressing', 57, 1),
('itm_wnd019', 'WND019', 'ADVANCED WOUND CARE', '3M Micropore Surgical Paper Tape 1-Inch', '3M Micropore', '1 inch × 10 yards', 'ROLL', 8.00, 'staff', 0, 'Gentle breathable paper tape for sensitive fragile skin', 58, 1),
('itm_wnd020', 'WND020', 'ADVANCED WOUND CARE', '3M Transpore Surgical Plastic Tape 1-Inch', '3M Transpore', '1 inch × 10 yards', 'ROLL', 9.00, 'staff', 0, 'Clear porous plastic tape with bi-directional tear', 59, 1),
('itm_wnd021', 'WND021', 'ADVANCED WOUND CARE', 'Cotton Crepe Bandage 3-Inch', 'BSN Medical', '7.5cm × 4.5m Stretched', 'ROLL', 6.00, 'staff', 0, 'Medium support compression bandage with fast edges', 60, 1),
('itm_wnd022', 'WND022', 'ADVANCED WOUND CARE', '3M Coban Self-Adherent Wrap 3-Inch', '3M Coban', '7.5cm × 4.5m Stretched', 'ROLL', 18.00, 'staff', 0, 'Cohesive elastic bandage that sticks to itself, not to skin', 61, 1),

-- =========================================================================
-- 5. IV INFUSION & INJECTION (输液与点滴耗材)
-- =========================================================================
('itm_iv001', 'IV001', 'IV INFUSION & INJECTION', 'IV Infusion Administration Giving Set with Air Vent & Needle', 'B. Braun / Terumo', '20 drops/ml with Luer Lock', 'EACH', 8.00, 'staff', 0, 'Gravity infusion set with 15-micron fluid filter and roller clamp', 62, 1),
('itm_iv002', 'IV002', 'IV INFUSION & INJECTION', 'IV Microdrip Giving Set with Burette 100ml / 150ml', 'Terumo / Braun', '60 drops/ml Microdrip', 'EACH', 24.00, 'staff', 0, 'Precision volume chamber for controlled antibiotic infusions', 63, 1),
('itm_iv003', 'IV003', 'IV INFUSION & INJECTION', '3-Way Stopcock with 10cm Extension Tube', 'B. Braun Discofix', '10cm Extension Line', 'EACH', 10.00, 'staff', 0, 'Lipid-resistant 3-way valve for multi-line administration', 64, 1),
('itm_iv004', 'IV004', 'IV INFUSION & INJECTION', 'Needleless IV Connector / MicroClave Cap', 'MicroClave / ICU', 'Neutral Displacement', 'EACH', 8.00, 'staff', 0, 'Closed needleless valve to prevent catheter occlusion & sepsis', 65, 1),
('itm_iv005', 'IV005', 'IV INFUSION & INJECTION', '3M Tegaderm IV Transparent Cannula Fixation Dressing', '3M Tegaderm', '7cm × 8.5cm with Border', 'EACH', 10.00, 'staff', 0, 'Waterproof breathable transparent film with notched design', 66, 1),
('itm_iv006', 'IV006', 'IV INFUSION & INJECTION', 'Sodium Chloride 0.9% Normal Saline IV Bag 500ml', 'Ain Medicare / B. Braun', '500ml IV Infusion Bag', 'EACH', 14.00, 'staff', 0, 'Isotonic sterile IV saline solution for hydration & medication carrier', 67, 1),
('itm_iv007', 'IV007', 'IV INFUSION & INJECTION', 'Sodium Chloride 0.9% Normal Saline IV Bag 1000ml', 'Ain Medicare / B. Braun', '1000ml IV Infusion Bag', 'EACH', 18.00, 'staff', 0, 'Large volume sterile saline for rehydration & continuous drip', 68, 1),
('itm_iv008', 'IV008', 'IV INFUSION & INJECTION', 'BD PosiFlush Normal Saline Pre-Filled Flush Syringe 10ml', 'BD PosiFlush', '10ml Pre-filled Syringe', 'EACH', 7.50, 'staff', 0, 'Sterile zero-reflux flush syringe reduces catheter-related infections', 69, 1),
('itm_iv009', 'IV009', 'IV INFUSION & INJECTION', 'Water for Injection (WFI) Sterile Ampoule 10ml', 'Ain Medicare', '10ml Plastic Ampoule', 'EACH', 2.50, 'staff', 0, 'Solvent for dissolving parenteral antibiotics & medications', 70, 1),
('itm_iv010', 'IV010', 'IV INFUSION & INJECTION', 'Portable 4-Hook Telescopic IV Drip Stand', 'Medical Stand', '4-Hook Chrome Steel', 'EACH', 120.00, 'staff', 1, 'Heavy base wheeled drip pole for home continuous infusions', 71, 1),

-- =========================================================================
-- 6. RESPIRATORY & TRACHEOSTOMY (气切与呼吸护理)
-- =========================================================================
('itm_res001', 'RES001', 'RESPIRATORY & TRACHEOSTOMY', 'Medtronic Shiley Cuffed Tracheostomy Tube Size 7.0', 'Medtronic Shiley', 'Size 7.0 (ID 7.0mm, OD 10.8mm)', 'EACH', 220.00, 'staff', 1, 'Low-pressure cuff with disposable inner cannula & obturator', 72, 1),
('itm_res002', 'RES002', 'RESPIRATORY & TRACHEOSTOMY', 'Medtronic Shiley Cuffed Tracheostomy Tube Size 7.5', 'Medtronic Shiley', 'Size 7.5 (ID 7.5mm, OD 11.3mm)', 'EACH', 220.00, 'staff', 1, 'Cuffed tracheostomy tube for ventilator or aspiration risk', 73, 1),
('itm_res003', 'RES003', 'RESPIRATORY & TRACHEOSTOMY', 'Tracheostomy Split Foam Dressing (Y-Cut) 8 × 8cm', 'Metalline / Lyofoam', '8cm × 8cm Y-Split (5s)', 'PACK', 28.00, 'staff', 0, 'Absorbent split foam cushion to prevent peristomal skin excoriation', 74, 1),
('itm_res004', 'RES004', 'RESPIRATORY & TRACHEOSTOMY', 'Tracheostomy Neck Tie Holder with Velcro Fasteners', 'Dale / TrachFit', 'Adult Adjustable Neck Strap', 'EACH', 18.00, 'staff', 0, 'Soft moisture-wicking foam collar prevents accidental decannulation', 75, 1),
('itm_res005', 'RES005', 'RESPIRATORY & TRACHEOSTOMY', 'Sterile Suction Catheter with Control Valve Fr 10', 'ConvaTec / Teleflex', '10Fr (Black) 50cm', 'EACH', 3.50, 'staff', 0, 'Atraumatic distal eyes with vacuum thumb control valve', 76, 1),
('itm_res006', 'RES006', 'RESPIRATORY & TRACHEOSTOMY', 'Sterile Suction Catheter with Control Valve Fr 12', 'ConvaTec / Teleflex', '12Fr (White) 50cm', 'EACH', 3.50, 'staff', 0, 'Standard adult airway suction catheter for deep secretional clearance', 77, 1),
('itm_res007', 'RES007', 'RESPIRATORY & TRACHEOSTOMY', 'Sterile Suction Catheter with Control Valve Fr 14', 'ConvaTec / Teleflex', '14Fr (Green) 50cm', 'EACH', 3.50, 'staff', 0, 'Thick sputum airway clearance catheter for tracheostomy patients', 78, 1),
('itm_res008', 'RES008', 'RESPIRATORY & TRACHEOSTOMY', 'Nebulizer Mask Set with Medication Chamber & Tubing', 'Intersurgical', 'Adult Mask with 2m Tubing', 'SET', 16.00, 'staff', 0, 'Aerosol mask kit for Salbutamol, Atrovent & Pulmicort inhalation', 79, 1),
('itm_res009', 'RES009', 'RESPIRATORY & TRACHEOSTOMY', 'Oxygen Nasal Cannula with Star Lumen Tubing', 'Intersurgical', 'Adult Soft Curved Prongs 2m', 'EACH', 8.50, 'staff', 0, 'Crush-resistant oxygen tubing for comfortable low-flow O2 delivery', 80, 1),

-- =========================================================================
-- 7. STOMA & OSTOMY CARE (造口护理)
-- =========================================================================
('itm_stm001', 'STM001', 'STOMA & OSTOMY CARE', 'ConvaTec Sur-Fit Natura Stoma Wafer / Flange 45mm', 'ConvaTec Sur-Fit', '45mm Flange (Box of 10)', 'BOX', 140.00, 'staff', 1, 'Durahesive hydrocolloid moldable skin barrier flange', 81, 1),
('itm_stm002', 'STM002', 'STOMA & OSTOMY CARE', 'ConvaTec Sur-Fit Natura Drainable Stoma Pouch 45mm', 'ConvaTec Sur-Fit', '45mm Opaque with Filter (10s)', 'BOX', 120.00, 'staff', 1, 'InvisiClose tail closure with deodorizing charcoal filter', 82, 1),
('itm_stm003', 'STM003', 'STOMA & OSTOMY CARE', 'Coloplast SenSura Mio 1-Piece Drainable Ostomy Bag', 'Coloplast SenSura', '10–55mm Cut-to-Fit (30s)', 'BOX', 260.00, 'staff', 1, 'Elastic adhesive barrier fits body shapes, neutral grey textile', 83, 1),
('itm_stm004', 'STM004', 'STOMA & OSTOMY CARE', 'ConvaTec Stomahesive Paste 60g Tube', 'ConvaTec Stomahesive', '60g Hydrocolloid Tube', 'TUBE', 42.00, 'staff', 0, 'Pectin hydrocolloid paste to seal uneven peristomal skin dips', 84, 1),
('itm_stm005', 'STM005', 'STOMA & OSTOMY CARE', 'Coloplast Brava Moldable Barrier Protective Rings', 'Coloplast Brava', 'Thin 2.0mm (Box of 10)', 'BOX', 75.00, 'staff', 0, 'Moldable seal ring prevents stoma output leakage under flange', 85, 1),
('itm_stm006', 'STM006', 'STOMA & OSTOMY CARE', 'Coloplast Brava Adhesive Remover Spray 50ml', 'Coloplast Brava', '50ml No-Sting Spray', 'BOTTLE', 48.00, 'staff', 0, '100% silicone spray for pain-free flange removal without skin tear', 86, 1),
('itm_stm007', 'STM007', 'STOMA & OSTOMY CARE', 'Coloplast Brava Protective Skin Barrier Spray 50ml', 'Coloplast Brava', '50ml Barrier Film Spray', 'BOTTLE', 52.00, 'staff', 0, 'Silicone barrier layer shields skin from output & adhesives', 87, 1),

-- =========================================================================
-- 8. DIAGNOSTIC & MONITORING SUPPLIES (诊断与监测耗材)
-- =========================================================================
('itm_dia001', 'DIA001', 'DIAGNOSTIC & MONITORING', 'Accu-Chek Instant Blood Glucose Test Strips', 'Accu-Chek', 'Box of 50 Strips', 'BOX', 78.00, 'staff', 0, 'Target range indicator strips, instant measurement in 4 secs', 88, 1),
('itm_dia002', 'DIA002', 'DIAGNOSTIC & MONITORING', 'Contour Plus Blood Glucose Test Strips', 'Ascensia Contour', 'Box of 50 Strips', 'BOX', 75.00, 'staff', 0, 'Second-chance sampling strips for accurate capillary blood testing', 89, 1),
('itm_dia003', 'DIA003', 'DIAGNOSTIC & MONITORING', 'Sterile Blood Lancets 28G / 30G', 'Accu-Chek / Contour', 'Box of 100 Lancets', 'BOX', 22.00, 'staff', 0, 'Triple-sharpened fine sterile twist-off lancets for finger-prick', 90, 1),
('itm_dia004', 'DIA004', 'DIAGNOSTIC & MONITORING', 'Alcohol Swabs 70% Isopropyl Alcohol (Box of 100)', 'Webcol / BD / Braun', 'Box of 100 Sachets', 'BOX', 8.00, 'staff', 0, '2-ply 70% isopropyl alcohol prep pads for skin disinfection', 91, 1),
('itm_dia005', 'DIA005', 'DIAGNOSTIC & MONITORING', 'Urinalysis Reagent Test Strips 10-Parameter', 'Combina 10 / Uriscan', 'Bottle of 100 Strips', 'BOTTLE', 58.00, 'staff', 0, 'Tests Leukocytes, Nitrite, Urobilinogen, Protein, pH, Blood, SG, Ketone, Bilirubin, Glucose', 92, 1),
('itm_dia006', 'DIA006', 'DIAGNOSTIC & MONITORING', '3M Red Dot ECG Disposable Monitoring Electrodes', '3M Red Dot', 'Pack of 50 Electrodes', 'PACK', 35.00, 'staff', 0, 'High-conductivity adhesive foam electrodes for ECG telemetry', 93, 1),

-- =========================================================================
-- 9. PPE & INFECTION CONTROL (个人防护与消毒)
-- =========================================================================
('itm_ppe001', 'PPE001', 'PPE & INFECTION CONTROL', 'Nitrile Examination Gloves Powder-Free Medium', 'Top Glove / Hartalega', 'Box of 100 Gloves (M)', 'BOX', 25.00, 'staff', 0, 'Medical-grade chemotherapy tested powder-free blue nitrile gloves', 94, 1),
('itm_ppe002', 'PPE002', 'PPE & INFECTION CONTROL', 'Nitrile Examination Gloves Powder-Free Large', 'Top Glove / Hartalega', 'Box of 100 Gloves (L)', 'BOX', 25.00, 'staff', 0, 'Textured fingertips for clinical grip and high puncture resistance', 95, 1),
('itm_ppe003', 'PPE003', 'PPE & INFECTION CONTROL', 'Sterile Surgical Gloves Powder-Free Pair Size 7.5', 'Ansell Gammex', '1 Pair (Sterile)', 'PAIR', 6.00, 'staff', 0, 'Individually cuffed sterile surgical gloves for aseptic procedures', 96, 1),
('itm_ppe004', 'PPE004', 'PPE & INFECTION CONTROL', 'Sterillium 70% Alcohol Hand Rub with Moisturizer 500ml', 'Bode Sterillium', '500ml Pump Bottle', 'BOTTLE', 38.00, 'staff', 0, 'Hospital surgical hand disinfectant with skin protection emollients', 97, 1),
('itm_ppe005', 'PPE005', 'PPE & INFECTION CONTROL', 'Chlorhexidine 0.5% in 70% Alcohol Tinted Pink 500ml', 'Ain Medicare', '500ml Antiseptic Bottle', 'BOTTLE', 24.00, 'staff', 0, 'Skin prep solution for cannula insertion & minor procedures', 98, 1),
('itm_ppe006', 'PPE006', 'PPE & INFECTION CONTROL', 'Povidone Iodine 10% Antiseptic Solution 100ml', 'Betadine', '100ml Squeeze Bottle', 'BOTTLE', 14.00, 'staff', 0, 'Broad spectrum microbicidal solution for wound & catheter antisepsis', 99, 1),
('itm_ppe007', 'PPE007', 'PPE & INFECTION CONTROL', 'Disposable Incontinence Underpads (Bluey) 60 × 90cm', 'Seni / Tena / Lifree', 'Pack of 10 Underpads', 'PACK', 16.00, 'staff', 0, 'Superabsorbent polymer bed protector mats with waterproof PE back', 100, 1),
('itm_ppe008', 'PPE008', 'PPE & INFECTION CONTROL', 'Medical Surface Disinfectant Wipes (Tub of 100)', 'CaviWipes / Clinell', 'Tub of 100 Large Wipes', 'TIN', 38.00, 'staff', 0, 'Non-corrosive hospital surface wipe kills TB, MRSA, HBV & Viruses in 2 mins', 101, 1);
