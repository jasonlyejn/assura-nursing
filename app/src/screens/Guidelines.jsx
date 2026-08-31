import { useState } from 'react';
import { LAB_PANELS } from '../labReference.js';

export default function Guidelines({ me }) {
  const [tab, setTab] = useState('mpsg'); // 'mpsg', 'firstaid', 'als', 'sops', 'lab_panic', 'emergency', 'calculators'
  const [search, setSearch] = useState('');
  const [selectedMpsg, setSelectedMpsg] = useState('mpsg5');
  const [selectedFirstAid, setSelectedFirstAid] = useState('fa_cpr');
  const [selectedAls, setSelectedAls] = useState('als_5h5t');
  const [selectedSop, setSelectedSop] = useState('sop_intake');
  const [selectedLabPanel, setSelectedLabPanel] = useState('all');
  const [labSearch, setLabSearch] = useState('');
  const [sbarCopied, setSbarCopied] = useState(false);

  /* =========================================================================
     1. MALAYSIAN PATIENT SAFETY GOALS (13 MPSG - MINISTRY OF HEALTH MALAYSIA)
  ========================================================================= */
  const MPSG_GOALS = {
    mpsg1: {
      goal: 'Goal 1: Implementation of Clinical Governance (临床治理)',
      kpi: 'KPI 1: Implementation of systematic clinical governance framework',
      target: '100% compliance across all clinical operations',
      summary: 'Establishing a non-blaming, transparent learning culture where evidence-based guidelines, clinical audits, and quality assurance are integrated into everyday patient care.',
      nurseRole: [
        'Adhere to standardized nursing policies, protocols, and care pathways.',
        'Actively participate in clinical audits and incident reporting without fear of blame.',
        'Engage in Continuous Professional Development (CPD/CNE) and mentorship.',
        'Involve patients and families in care planning and transparent communication.',
      ],
    },
    mpsg2: {
      goal: 'Goal 2: Clean Care Is Safer Care (WHO 1st Global Challenge - 感染控制与手卫生)',
      kpi: 'KPI 2: Hand Hygiene Compliance Rate',
      target: '≥ 75% compliance rate on quarterly audits',
      summary: 'Strict adherence to the WHO 5 Moments for Hand Hygiene to prevent Healthcare-Associated Infections (HAI).',
      nurseRole: [
        'Moment 1: Before touching a patient.',
        'Moment 2: Before clean / aseptic procedures (e.g. dressing, catheter, IV line).',
        'Moment 3: After body fluid exposure risk.',
        'Moment 4: After touching a patient.',
        'Moment 5: After touching patient surroundings.',
        'Ensure alcohol hand rubs are available at bedside, procedure trolleys, and medication stations.',
      ],
    },
    mpsg3: {
      goal: 'Goal 3: Safe Surgery Saves Lives (WHO 2nd Global Challenge - 手术与侵入性操作安全)',
      kpi: 'KPI 3 & 4: Zero (0) wrong surgeries & Zero (0) unintended retained foreign bodies',
      target: '100% Perioperative & Invasive Procedure Checklist compliance',
      summary: 'Execution of the 3-part Safety Checklist (Sign In, Time Out, Sign Out) and strict swab/instrument count for all invasive and bedside surgical procedures.',
      nurseRole: [
        'Sign In: Verify patient identity, procedure consent, site marking, allergy, and airway risk before anesthesia/procedure.',
        'Time Out: Team briefing immediately before incision/insertion to confirm patient, procedure, correct side, antibiotics, and emergency readiness.',
        'Sign Out: Confirm procedure name, complete 3-stage instrument/swab/sharp count (Initial, 2nd, Final count), and specimen labeling.',
      ],
    },
    mpsg4: {
      goal: 'Goal 4: Tackling Antimicrobial Resistance (遏制耐药菌与抗生素管理)',
      kpi: 'KPI 5, 6, 7: Incidence rate of MRSA (≤0.4%), ESBL-Klebsiella (≤0.3%), ESBL-E.coli (≤0.2%)',
      target: 'Zero cross-contamination of Multi-Drug Resistant Organisms (MDRO)',
      summary: 'Surveillance of alert organisms, adherence to National Antibiotic Guidelines, and strict contact precautions for colonized/infected patients.',
      nurseRole: [
        'Immediately apply Contact Precautions upon receipt of positive lab alert for MRSA/ESBL/VRE/CRE.',
        'Don personal protective equipment (gloves, plastic apron) for every patient contact.',
        'Use dedicated patient-care equipment (BP cuff, thermometer, stethoscopes).',
        'Cohort or isolate infected patients and document in Alert Organism Surveillance Form.',
      ],
    },
    mpsg5: {
      goal: 'Goal 5: Improve the Accuracy of Patient Identification (确保患者身份识别准确)',
      kpi: 'KPI 8: Compliance Rate for At Least 2 Identifiers Implemented',
      target: '100% compliance at each clinical interaction',
      summary: 'Mandatory verification of at least TWO unique patient identifiers before any medication, blood transfusion, procedure, diagnostic test, or shift handover.',
      nurseRole: [
        'ACCEPTABLE Identifiers: (1) Patient Full Name, (2) IC / Passport Number, (3) Registration Number (RN), (4) Date of Birth (DOB).',
        'UNACCEPTABLE Identifiers: Room Number or Bed Number (STRICTLY PROHIBITED).',
        'Active Asking: Always ask the patient "What is your full name and IC number?" — DO NOT say "Are you Mr. Tan?" (avoids passive yes/no acquiescence).',
        'For unconscious/dysphasic patients: verify with printed wristband and accompanying Next-of-Kin.',
      ],
    },
    mpsg6: {
      goal: 'Goal 6: Safety of Transfusion of Blood & Blood Products (输血与血液制品安全)',
      kpi: 'KPI 9 & 10: Zero (0) actual transfusion errors',
      target: '100% verification and zero transfusion mismatch',
      summary: 'Comprehensive transfusion safety chain from bedside Group & Cross-Match (GXM) sampling, informed consent, independent 2-person verification, to vital sign surveillance.',
      nurseRole: [
        'Ensure signed Blood Transfusion Consent is obtained by doctor and witnessed by nurse.',
        'Bedside Double-Check: 2 registered staff must independently verify Patient Name, IC/RN, Blood Bag Serial No, Blood Group/Rh, Expiry Date, and Crossmatch compatibility.',
        'Vital Signs: Take baseline vitals before starting. Stay with patient for the FIRST 15 MINUTES (highest risk of acute hemolytic reaction). Monitor vitals every 30-60 mins until completion.',
        'Transfusion Reaction Protocol: If fever (temp rise ≥1°C), chills, rash, dyspnea, hypotension, or dark urine occur ➔ IMMEDIATELY STOP TRANSFUSION ➔ Maintain IV Normal Saline ➔ Notify Doctor & Blood Bank ➔ Complete PPDK 1 card.',
      ],
    },
    mpsg7: {
      goal: 'Goal 7: Ensure Medication Safety & 7Rs Principle (药物安全与7对原则)',
      kpi: 'KPI 11 & 12: Zero (0) actual medication administration errors',
      target: '100% 7Rs and double-checking compliance',
      summary: 'Systematic prevention of prescribing, dispensing, and administration errors using 7Rs verification, TALL MAN lettering, and High-Alert drug protocols.',
      nurseRole: [
        'Strictly follow the 7 Rights: Right Patient, Right Drug, Right Dose, Right Route, Right Time, Right Documentation, Right to Refuse.',
        'High-Alert Medications: Insulin, Opioids/Morphine, Anticoagulants (Clexane/Warfarin), and Concentrated Electrolytes (KCl > 0.9%) REQUIRE mandatory independent double-checking.',
        'TALL MAN Lettering for Look-Alike Sound-Alike (LASA) drugs: e.g. carBAMAZepine vs carBIMazole, DOBUTamine vs DOPamine, CeLEBREX vs CeLEXA.',
        'Wear "Medication Nurse" indicator/vest to avoid distractions during drug preparation.',
      ],
    },
    mpsg8: {
      goal: 'Goal 8: Clinical Communication by Implementing Critical Values Programme (危急值通报与闭环沟通)',
      kpi: 'KPI 13: Percentage of Critical Values Notified within 30 Minutes or Less',
      target: '100% within ≤ 30 minutes',
      summary: 'Timely and accurate communication of life-threatening diagnostic laboratory and radiology results to prevent clinical collapse.',
      nurseRole: [
        'When receiving critical lab values (e.g. Potassium < 2.5 or > 6.0 mmol/L, HGT < 2.2 mmol/L, Platelets < 20 × 10^9/L, Hb < 7.0 g/dL):',
        'Record in Critical Value Record Book (CVRB): Patient Name, IC/RN, Test Name & Critical Result, Date/Time, Informer Name.',
        'MANDATORY Read-Back: Read back the exact numbers to the caller to prevent hearing/transcription errors.',
        'Notify Primary Attending Doctor immediately (within 15-30 minutes). If unreachable, escalate to Medical Director/Specialist on-call.',
      ],
    },
    mpsg9: {
      goal: 'Goal 9: Reduce Patient Falls (跌倒风险评估与防跌指引)',
      kpi: 'KPI 14 & 15: ≥ 10% annual reduction in adult and paediatric falls',
      target: 'Zero preventable inpatient falls',
      summary: 'Routine admission and shift-based Morse Fall Scale (MFS) assessment with visual color-coded tagging and environmental safeguards.',
      nurseRole: [
        'Assess using Morse Fall Scale upon admission and post-fall: (1) Fall history, (2) Secondary diagnosis, (3) Ambulatory aid, (4) IV lock, (5) Gait, (6) Mental status.',
        'MFS 0–24: Low Risk (Routine precautions).',
        'MFS 25–44: Medium Risk ➔ Placed YELLOW Bed Tag / Wristband ➔ Bilateral bed rails up ➔ Call bell in reach.',
        'MFS ≥ 45: High Risk ➔ Placed RED Bed Tag / Wristband ➔ Bed near nurse station ➔ 2-person assist during transfer ➔ Non-slip footwear.',
        'Post-Fall Action: Place in bed, assess ABC and vitals, check for fractures/head injury, notify Doctor immediately, log Incident Report (IR1.1).',
      ],
    },
    mpsg10: {
      goal: 'Goal 10: Reduce Healthcare-Associated Pressure Ulcers (预防与减少压疮发生)',
      kpi: 'KPI 16: Pressure Ulcer Incidence Rate ≤ 2.1%',
      target: 'Zero hospital-acquired Stage 3, Stage 4 or Unstageable pressure injuries',
      summary: 'Braden Scale risk assessment on admission and every shift, combined with dynamic pressure-relieving ripple mattresses and clock turn schedules.',
      nurseRole: [
        'Assess Braden Scale (Sensory, Moisture, Activity, Mobility, Nutrition, Friction/Shear). Score < 16 triggers High-Risk Bedsore Protocol.',
        'Positioning: 2-Hourly Position Turn Clock Schedule (Left Lateral 30° ➔ Supine ➔ Right Lateral 30° ➔ Semi-Fowler ≤30°).',
        'Support Surfaces: Activate alternating pressure air mattress / ripple mattress for bedbound patients.',
        'Skin Care: Apply pH-neutral barrier cream (zinc/silicone), avoid friction/dragging with slide sheets, protect heels with gel boots/pillows, NEVER massage bony prominences.',
      ],
    },
    mpsg11: {
      goal: 'Goal 11: Reduce Catheter-Related Bloodstream Infections (CRBSI) (预防血管导管血流感染)',
      kpi: 'KPI 17: Rate of CRBSI < 5 per 1000 catheter-days',
      target: 'Zero preventable central line bloodstream infections',
      summary: 'Implementation of the 5-element Central Venous Catheter (CVC) Care Bundle and daily necessity review.',
      nurseRole: [
        'Strict 5 moments of hand hygiene and maximal sterile barrier precautions during insertion.',
        'Skin antisepsis with Chlorhexidine 4% (or 2% in 70% alcohol) with complete air dry.',
        'Daily Line Review at 8:00 PM: Assess clinical necessity and prompt doctor to remove redundant catheters.',
        'Dressing & Tubing: Change transparent dressing every 7 days (or immediately if loose/soiled); change standard IV infusion tubing every 72 hours (lipid infusions every 24 hours); scrub catheter hub with alcohol swab for 15s before every access.',
      ],
    },
    mpsg12: {
      goal: 'Goal 12: Reduce Ventilator-Associated Pneumonia (VAP) (预防呼吸机相关性肺炎)',
      kpi: 'KPI 18: Rate of VAP < 10 per 1000 ventilator-days',
      target: 'Zero preventable ventilator-associated pneumonia cases',
      summary: 'Implementation of the 4-component Ventilator Care Bundle and rigorous subglottic secretion clearance.',
      nurseRole: [
        'Elevation of Head of Bed: Maintain Semi-Fowler position at 30° to 45° at all times unless clinically contraindicated.',
        'Oral Hygiene: Perform mouth toilet with Chlorhexidine 0.2% oral solution every 4 to 6 hours using specialized swab/toothbrush.',
        'Cuff Pressure Monitoring: Check endotracheal/tracheostomy pilot balloon cuff pressure every shift (maintain 25–30 cmH2O).',
        'Sterile Suctioning: Preoxygenate with 100% O2; suction using sterile technique (limit pass to ≤ 10-15 seconds); drain and discard ventilator circuit condensate as clinical waste.',
      ],
    },
    mpsg13: {
      goal: 'Goal 13: Implement Incident Reporting & Learning System (不良事件报告与根因分析)',
      kpi: 'KPI 19: Facility-wide Incident Reporting System with Root Cause Analysis (RCA)',
      target: '100% mandatory incident reporting and non-punitive safety learning',
      summary: 'Fostering a safety culture where near-misses, adverse drug events, falls, and sentinel events are reported and investigated through RCA to improve systems.',
      nurseRole: [
        'Immediate Clinical Action: Secure patient safety and vital stability first.',
        'Sentinel Events (involving death, severe permanent harm, wrong procedure): Notify Sister-in-Charge and Medical Director WITHIN 1 HOUR.',
        'Documentation: Complete Incident Reporting Form IR1.1 factually (state clinical facts, vitals, time, and immediate remedial actions taken — no subjective opinions or blame).',
        'Participate in multidisciplinary Root Cause Analysis (RCA) to implement systemic safeguards.',
      ],
    },
  };

  /* =========================================================================
     2. FIRST AID & ACUTE EMERGENCIES (IHH HEALTHCARE MALAYSIA GUIDE)
  ========================================================================= */
  const FIRST_AID_TOPICS = {
    fa_cpr: {
      title: '🫀 Cardiopulmonary Resuscitation (CPR) & AED — Adults, Children & Infants',
      summary: 'Evidence-based life support protocol when a patient is unresponsive, breathless, or pulseless.',
      steps: [
        '1. Danger & Responsiveness: Ensure scene is safe. Tap shoulders and shout "Hello! Are you OK?".',
        '2. Shout for Help: Call 999 / Ambulance and request an AED immediately.',
        '3. Breathing & Pulse Check (≤10 seconds): Look for normal chest rise while checking carotid pulse (brachial pulse in infants). If gasping or no pulse: Start CPR immediately.',
        '4. Adult CPR: 30 Compressions : 2 Breaths. Hand position: center of chest between nipples. Depth: 5–6 cm. Rate: 100–120 bpm. Allow full chest recoil.',
        '5. Child CPR (>1 year): 30:2 (or 15:2 with 2 rescuers). Use 1 or 2 hands. Depth: ~5 cm.',
        '6. Infant CPR (<1 year): 30:2 (15:2 with 2 rescuers). Use 2 fingers below nipple line. Depth: ~4 cm. Rescue breathing: 1 breath every 3-5 seconds (20-30 bpm).',
        '7. Automated External Defibrillator (AED): Turn on AED ➔ Apply pads to bare dry chest (Antero-lateral position) ➔ Clear patient during analysis ➔ Deliver shock if advised ➔ Resume CPR immediately for 2 mins.',
      ],
    },
    fa_stroke: {
      title: '🧠 Stroke Recognition & Emergency Protocol (BE-FAST Algorithm)',
      summary: 'Rapid identification of acute cerebrovascular accident (CVA) for golden hour thrombolysis (< 4.5 hours).',
      steps: [
        'B - Balance: Sudden loss of balance, ataxia, or difficulty standing/walking.',
        'E - Eyes: Sudden change in vision, diplopia, or loss of sight in one/both eyes.',
        'F - Face: Facial asymmetry, one side of mouth drooping when smiling.',
        'A - Arm: Sudden weakness or numbness in one arm; unable to raise both arms equally.',
        'S - Speech: Slurred speech, word-finding difficulty, or unable to repeat a simple sentence.',
        'T - Time: TIME IS BRAIN. Record exact time of onset. Call Ambulance (999) or transport immediately to Stroke Center (HPP / Gleneagles / Island Hospital / Pantai).',
        'Crucial Nursing Rule: Keep patient NPO (strict nil by mouth due to dysphagia/aspiration risk). Position head elevated 30°. Do not administer aspirin until CT scan rules out hemorrhagic stroke.',
      ],
    },
    fa_mi: {
      title: '❤️ Heart Attack / Acute Myocardial Infarction (AMI)',
      summary: 'Emergency response to acute coronary artery occlusion.',
      steps: [
        '1. Recognize Symptoms: Crushing chest pain/pressure behind breastbone lasting > 5 minutes, radiating to left arm, neck, jaw, or back; accompanied by cold sweats, nausea, dyspnea.',
        '2. Position: Help patient sit in a comfortable semi-recumbent position with knees bent (relieves cardiac workload). Loosen tight clothing.',
        '3. Medication Assistance: If prescribed, assist patient in taking sublingual Nitroglycerin (GTN) 0.5mg tablet under tongue. If not allergic: give chewable Aspirin 300mg.',
        '4. Emergency Dispatch: Call 999 or Hospital A&E Ambulance immediately.',
        '5. Arrest Readiness: Keep defibrillator/AED close. If patient collapses and becomes pulseless: start CPR immediately.',
      ],
    },
    fa_choking: {
      title: '🫁 Choking & Airway Obstruction (Adults, Children & Infants)',
      summary: 'Heimlich maneuver and back blows for foreign body airway obstruction.',
      steps: [
        '1. Mild Obstruction (Coughing effectively): Encourage forceful coughing. Do not interfere.',
        '2. Severe Obstruction in Conscious Adult/Child (Unable to speak, clutching throat, cyanosis):',
        '   • 5 Back Blows: Lean patient forward, deliver 5 firm blows between shoulder blades with heel of hand.',
        '   • 5 Abdominal Thrusts (Heimlich): Stand behind, wrap arms around waist, place fist above navel, pull inward and upward firmly.',
        '   • Repeat 5 back blows : 5 abdominal thrusts until object is expelled or patient loses consciousness.',
        '3. Severe Obstruction in Infants (<1 year):',
        '   • Place infant face down along forearm resting on thigh, head lower than chest.',
        '   • Deliver 5 firm Back Blows between shoulder blades.',
        '   • Turn infant face up, deliver 5 Chest Thrusts (2 fingers on sternum).',
        '4. If Victim Becomes Unresponsive: Lower to floor, call 999, start CPR chest compressions. Look in mouth before breaths — remove object ONLY if clearly visible (NO blind sweeps).',
      ],
    },
    fa_anaphylaxis: {
      title: '💉 Allergic Reactions & Anaphylaxis (Epinephrine / EpiPen Protocol)',
      summary: 'Emergency management of severe IgE-mediated systemic allergic collapse.',
      steps: [
        '1. Identify Anaphylaxis: Swollen lips/tongue/uvula, wheezing, stridor, throat tightness, generalized hives/urticaria, vomiting, hypotension, syncope.',
        '2. Epinephrine First: Epinephrine is the primary life-saving drug. Administer intramuscularly (IM) into anterolateral aspect of mid-outer thigh (can inject through clothing if needed).',
        '3. EpiPen Technique: Remove safety cap ➔ Push orange tip firmly into outer thigh at 90° until click heard ➔ Hold in place for 3–5 seconds ➔ Massage site for 10 seconds.',
        '4. Posture: Lay patient flat with legs elevated (unless breathing difficulty, then semi-sitting). NEVER stand or walk the patient.',
        '5. Call 999 / Ambulance immediately. If symptoms do not improve within 5–10 minutes, a second dose of epinephrine may be administered.',
      ],
    },
    fa_seizures: {
      title: '⚡ Epileptic Seizures & Febrile Convulsions',
      summary: 'Safe management during tonic-clonic convulsions and seizure precautions.',
      steps: [
        '1. Safety & Positioning: Clear away sharp objects, furniture, and hazards. Protect head with a soft pillow or folded jacket.',
        '2. Airway: Turn patient onto their SIDE (Recovery Position) to allow saliva/vomit to drain and keep tongue from blocking airway.',
        '3. STRICTLY PROHIBITED: DO NOT restrain movements, DO NOT force anything into patient\'s mouth (no spoons, fingers, or wooden sticks — causes dental fracture and airway occlusion).',
        '4. Timing: Note the start time and duration of seizure.',
        '5. Call 999 / A&E immediately if: Seizure lasts > 5 minutes (Status Epilepticus), multiple seizures occur without regaining consciousness, patient is pregnant, or has head trauma.',
      ],
    },
    fa_bites: {
      title: '🐍 Snakebites & Animal Bites Protocol',
      summary: 'First aid for venomous snakebites and domestic animal puncture wounds.',
      steps: [
        '1. Reassurance & Stillness: Keep patient calm and completely STILL. Movement accelerates lymphatic venom absorption.',
        '2. Immobilization: Splint the bitten limb in functional extension and support with a sling. Keep bitten limb at or slightly below heart level.',
        '3. Remove constricting items: Take off rings, watches, and tight clothing before swelling begins.',
        '4. DO NOT DO: DO NOT cut or incise wound, DO NOT suck venom, DO NOT apply arterial tourniquet, DO NOT apply ice or electric shock, DO NOT give alcohol or aspirin.',
        '5. Transport immediately to hospital with antivenom capability (Hospital Pulau Pinang / Hospital Seberang Jaya). Take photo of snake from a safe distance if possible.',
      ],
    },
    fa_burns: {
      title: '🔥 Burns & Scalds Management',
      summary: 'Thermal, electrical, and chemical burn first aid principles.',
      steps: [
        '1. Immediate Cooling: Hold affected area under COOL running tap water for at least 15–20 minutes. (Do NOT use ice, ice water, butter, toothpaste, or soy sauce).',
        '2. Remove items: Gently remove rings, watches, and loose clothing before edema develops. DO NOT rip off clothing adhered to burnt skin.',
        '3. Protection: Cover loosely with clean, non-adherent sterile dressing, clean cling wrap (applied longitudinally, not wrapped tightly), or clean damp cloth.',
        '4. Blister Care: DO NOT burst or puncture blisters — intact blisters act as the body\'s sterile biological barrier.',
        '5. Hospital Transfer: All deep partial-thickness/full-thickness burns, burns > 10% BSA, burns to face, hands, feet, perineum, or major joints require urgent hospital evaluation.',
      ],
    },
  };

  /* =========================================================================
     3. ADVANCED LIFE SUPPORT & PHARMACOLOGY (MOH MALAYSIA ALS MANUAL)
  ========================================================================= */
  const ALS_TOPICS = {
    als_5h5t: {
      title: '🔍 5H & 5T Reversible Causes of Cardiac Arrest (可逆病因分析)',
      summary: 'Systematic diagnosis of underlying treatable triggers during Pulseless Electrical Activity (PEA) and Asystole.',
      table: [
        { type: '5H', cause: 'Hypovolemia (低血容量/大出血/脱水)', clues: 'History of blood loss, flat neck veins, tachycardia', treatment: 'Rapid IV/IO crystalloid bolus (Normal Saline), blood transfusion' },
        { type: '5H', cause: 'Hypoxia (严重缺氧/窒息)', clues: 'Cyanosis, airway obstruction, low SpO2, chest pathology', treatment: '100% O2, bag-valve-mask, secure advanced airway (ETT/LMA)' },
        { type: '5H', cause: 'Hydrogen Ion / Acidosis (酸中毒)', clues: 'DKA, renal failure, prolonged arrest', treatment: 'Hyperventilation, Sodium Bicarbonate 1 mEq/kg IV in specific acidosis' },
        { type: '5H', cause: 'Hypo / Hyperkalemia (低钾/高钾血症)', clues: 'Renal failure, peaked T waves, wide QRS', treatment: 'Hyperkalemia: Calcium Chloride 10%, Insulin + D50, Salbutamol nebulizer' },
        { type: '5H', cause: 'Hypothermia (低体温 <35°C)', clues: 'Core temp low, cold exposure, drowning', treatment: 'Active rewarming, warm IV fluids' },
        { type: '5T', cause: 'Tension Pneumothorax (张力性气胸)', clues: 'Tracheal deviation, absent breath sounds on one side, distended neck veins', treatment: 'Immediate needle thoracostomy decompression (2nd ICS midclavicular or 5th ICS anterior axillary)' },
        { type: '5T', cause: 'Tamponade, Cardiac (心包填塞)', clues: 'Beck\'s triad (hypotension, JVD, muffled heart sounds)', treatment: 'Emergency pericardiocentesis under ultrasound guidance' },
        { type: '5T', cause: 'Toxins / Drug Overdose (药物/毒物中毒)', clues: 'Pinpoint pupils (opioids), wide QRS (TCAs), empty pill bottles', treatment: 'Specific antidotes: Naloxone (opioids), Flumazenil, Sodium Bicarb (TCAs)' },
        { type: '5T', cause: 'Thrombosis, Pulmonary (肺栓塞 / PE)', clues: 'Sudden collapse, DVT history, distended neck veins', treatment: 'Emergency thrombolysis (Alteplase/Tenecteplase), surgical embolectomy' },
        { type: '5T', cause: 'Thrombosis, Coronary / Massive MI (急性心梗)', clues: 'Pre-arrest chest pain, ST elevation ECG', treatment: 'Emergency primary PCI / thrombolytic therapy' },
      ],
    },
    als_drugs: {
      title: '💊 Core Resuscitation Pharmacology & Dosing (急救药物速查表)',
      summary: 'Emergency medication dosages, indications, and administration precautions per MOH ALS guidelines.',
      table: [
        { drug: 'Adrenaline (Epinephrine)', dose: '1 mg IV/IO (1:10,000 solution) every 3–5 minutes followed by 20 mL saline flush', indication: 'Cardiac arrest (VF, pulseless VT, asystole, PEA), profound anaphylaxis, severe symptomatic bradycardia' },
        { drug: 'Amiodarone', dose: 'VF/Pulseless VT: 300 mg IV bolus in 20 mL D5%. Second dose: 150 mg after 3-5 min. Stable VT/SVT: 300 mg over 20-60 min; maintenance 900 mg/24h', indication: 'Refractory shockable VF / pulseless VT after 3rd shock; atrial and ventricular tachyarrhythmias' },
        { drug: 'Atropine Sulfate', dose: '0.5 mg IV push every 3–5 minutes up to max 3.0 mg', indication: 'Symptomatic sinus bradycardia. (Note: Avoid doses < 0.5 mg as it can paradoxically slow heart rate)' },
        { drug: 'Adenosine', dose: '6 mg rapid IV push (< 2s) via large vein + 20 mL flush. If unsuccessful: 12 mg in 1-2 min; second 12 mg if needed', indication: 'First-line for stable Paroxysmal Supraventricular Tachycardia (PSVT). Warn patient of transient chest tightness/flushing' },
        { drug: 'Calcium Chloride 10%', dose: '10 mL 10% solution (6.8 mmol Ca2+) slow IV over 2–5 minutes', indication: 'Hyperkalemia, hypocalcemia, calcium channel blocker overdose. (Do NOT give in same line with Sodium Bicarbonate)' },
        { drug: 'Dopamine Infusion', dose: '2 to 20 mcg/kg/min IV infusion titrated to systolic BP ≥ 90 mmHg', indication: 'Cardiogenic shock, severe hypotension post-ROSC, symptomatic bradycardia unresponsive to atropine' },
        { drug: 'Magnesium Sulfate', dose: '1 to 2 g diluted in 10 mL D5% IV over 5–20 minutes (or slow infusion 0.5–1g/hr for Torsades)', indication: 'Torsades de Pointes (polymorphic VT with prolonged QT), severe hypomagnesemia, digitalis toxicity' },
        { drug: 'Sodium Bicarbonate 8.4%', dose: '1 mEq/kg IV push (50 mL of 8.4% solution)', indication: 'Severe metabolic acidosis, hyperkalemia, tricyclic antidepressant (TCA) overdose, prolonged resuscitation' },
      ],
    },
    als_airway: {
      title: '🌬️ Airway Devices, Oxygen Delivery & Suctioning Standards',
      summary: 'FiO2 capabilities, device sizing, and tracheobronchial suctioning parameters.',
      table: [
        { device: 'Nasal Cannula (鼻导管)', flow: '1 – 6 L/min', fio2: '24% – 44% (approx. +4% per 1 L/min)', notes: 'Comfortable, non-invasive; do not exceed 6 L/min (dries mucosa)' },
        { device: 'Simple Face Mask (普通面罩)', flow: '6 – 10 L/min', fio2: '35% – 60%', notes: 'Requires min 6 L/min to flush exhaled CO2 from mask' },
        { device: 'Venturi Mask (文丘里面罩)', flow: '4 – 12 L/min', fio2: '24% – 60% (fixed precise %)', notes: 'Gold standard for COPD patients to prevent hypoxic drive loss' },
        { device: 'Non-Rebreather Mask + Reservoir (储氧面罩)', flow: '10 – 15 L/min', fio2: '95% – 100%', notes: 'Keep reservoir bag 2/3 inflated; used for severe hypoxemia/shock' },
        { device: 'Oropharyngeal Airway (OPA / Guedel)', flow: 'Sizes 3, 4, 5', fio2: 'Adjunct', notes: 'Size: Angle of mouth to angle of jaw. Unconscious/comatose only' },
        { device: 'Nasopharyngeal Airway (NPA)', flow: 'Sizes 6.0 – 8.0 mm', fio2: 'Adjunct', notes: 'Size: Tip of nose to tragus of ear. Tolerated in semi-conscious patients' },
        { device: 'Laryngeal Mask Airway (LMA)', flow: 'Sizes 1 to 5', fio2: 'Supraglottic', notes: 'Size 3 (30-50kg / 20ml air), Size 4 (50-70kg / 30ml air), Size 5 (>70kg / 40ml air)' },
        { device: 'Endotracheal Tube (ETT)', flow: 'Adult Male: 8.0-8.5mm / Female: 7.0-7.5mm', fio2: 'Definitive', notes: 'Cuff pressure 25-30 cmH2O; verify position with 5-point auscultation & EtCO2' },
      ],
    },
  };

  return (
    <div className="card" style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
        <div>
          <h2 style={{ margin: 0, color: '#0d3a54', display: 'flex', alignItems: 'center', gap: '8px' }}>
            📖 Clinical Standards, SOPs &amp; Emergency Directory
          </h2>
          <p className="muted" style={{ margin: '3px 0 0', fontSize: '0.85rem' }}>
            Official Malaysian Patient Safety Goals (MOH), IHH First Aid Guide, KKM ALS Manual, Nursing SOPs, and Penang Emergency Hotlines.
          </p>
        </div>

        {/* 6 Tab Controls */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button
            className={`xs ${tab === 'mpsg' ? 'pri' : 'ghost'}`}
            onClick={() => setTab('mpsg')}
            style={{ fontWeight: 700 }}
          >
            🛡️ 13 MOH Patient Safety Goals
          </button>
          <button
            className={`xs ${tab === 'firstaid' ? 'pri' : 'ghost'}`}
            onClick={() => setTab('firstaid')}
            style={{ fontWeight: 700 }}
          >
            🚑 First Aid &amp; Acute Protocols
          </button>
          <button
            className={`xs ${tab === 'als' ? 'pri' : 'ghost'}`}
            onClick={() => setTab('als')}
            style={{ fontWeight: 700 }}
          >
            ⚡ ALS Resuscitation &amp; Drugs
          </button>
          <button
            className={`xs ${tab === 'sops' ? 'pri' : 'ghost'}`}
            onClick={() => setTab('sops')}
            style={{ fontWeight: 700 }}
          >
            📋 Nursing Clinical SOPs
          </button>
          <button
            className={`xs ${tab === 'lab_panic' ? 'pri' : 'ghost'}`}
            onClick={() => setTab('lab_panic')}
            style={{ fontWeight: 700, background: tab === 'lab_panic' ? '#dc2626' : undefined, color: tab === 'lab_panic' ? '#fff' : undefined }}
          >
            🧪 Lab &amp; ABG Panic Protocol (危急值与血气)
          </button>
          <button
            className={`xs ${tab === 'emergency' ? 'pri' : 'ghost'}`}
            onClick={() => setTab('emergency')}
            style={{ fontWeight: 700 }}
          >
            📞 Penang Hospital Hotlines
          </button>
          <button
            className={`xs ${tab === 'calculators' ? 'pri' : 'ghost'}`}
            onClick={() => setTab('calculators')}
            style={{ fontWeight: 700 }}
          >
            🧮 Clinical Calculators
          </button>
        </div>
      </div>

      {/* ================= TAB 1: 13 MALAYSIAN PATIENT SAFETY GOALS ================= */}
      {tab === 'mpsg' && (
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {/* Sidebar */}
          <div style={{ width: 'min(290px, 100%)', display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '680px', overflowY: 'auto' }}>
            {Object.entries(MPSG_GOALS).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setSelectedMpsg(key)}
                style={{
                  textAlign: 'left',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  border: selectedMpsg === key ? '1.5px solid #0284c7' : '1px solid #e2e8f0',
                  background: selectedMpsg === key ? '#eff6ff' : '#fff',
                  color: selectedMpsg === key ? '#0369a1' : '#334155',
                  cursor: 'pointer',
                  lineHeight: 1.3,
                }}
              >
                {item.goal}
              </button>
            ))}
          </div>

          {/* Goal Content */}
          <div style={{ flex: 1, minWidth: 'min(320px, 100%)', background: '#fff', border: '1.5px solid #0284c7', borderRadius: '10px', padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
              <span style={{ background: '#dbeafe', color: '#1e40af', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>
                Ministry of Health Malaysia · Nursing Division
              </span>
              <span style={{ fontSize: '0.74rem', color: '#16a34a', fontWeight: 700 }}>
                Target: {MPSG_GOALS[selectedMpsg].target}
              </span>
            </div>

            <h3 style={{ margin: '0 0 8px', color: '#0d3a54', fontSize: '1.15rem' }}>{MPSG_GOALS[selectedMpsg].goal}</h3>
            <div style={{ background: '#f8fafc', borderLeft: '4px solid #0284c7', padding: '8px 12px', borderRadius: '0 6px 6px 0', fontSize: '0.8rem', color: '#475569', marginBottom: '14px' }}>
              <b>{MPSG_GOALS[selectedMpsg].kpi}</b>: {MPSG_GOALS[selectedMpsg].summary}
            </div>

            <h4 style={{ margin: '0 0 8px', color: '#0f172a', fontSize: '0.9rem' }}>👩‍⚕️ Nurses Roles &amp; Clinical Responsibilities:</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {MPSG_GOALS[selectedMpsg].nurseRole.map((role, rIdx) => (
                <div
                  key={rIdx}
                  style={{
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    fontSize: '0.8rem',
                    color: '#166534',
                    lineHeight: 1.45,
                  }}
                >
                  ✓ {role}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: FIRST AID & ACUTE EMERGENCIES ================= */}
      {tab === 'firstaid' && (
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {/* Sidebar */}
          <div style={{ width: 'min(280px, 100%)', display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '680px', overflowY: 'auto' }}>
            {Object.entries(FIRST_AID_TOPICS).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setSelectedFirstAid(key)}
                style={{
                  textAlign: 'left',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  border: selectedFirstAid === key ? '1.5px solid #dc2626' : '1px solid #e2e8f0',
                  background: selectedFirstAid === key ? '#fef2f2' : '#fff',
                  color: selectedFirstAid === key ? '#991b1b' : '#334155',
                  cursor: 'pointer',
                  lineHeight: 1.3,
                }}
              >
                {item.title.split('—')[0]}
              </button>
            ))}
          </div>

          {/* First Aid Content */}
          <div style={{ flex: 1, minWidth: 'min(320px, 100%)', background: '#fff', border: '1.5px solid #dc2626', borderRadius: '10px', padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ background: '#fee2e2', color: '#991b1b', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>
                Essential Guide to First Aid (IHH Healthcare Malaysia)
              </span>
              <a href="tel:999" className="btn danger xs" style={{ textDecoration: 'none', fontWeight: 800 }}>
                📞 Call 999
              </a>
            </div>

            <h3 style={{ margin: '0 0 6px', color: '#991b1b', fontSize: '1.15rem' }}>{FIRST_AID_TOPICS[selectedFirstAid].title}</h3>
            <p className="muted" style={{ margin: '0 0 14px', fontSize: '0.82rem' }}>{FIRST_AID_TOPICS[selectedFirstAid].summary}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {FIRST_AID_TOPICS[selectedFirstAid].steps.map((st, sIdx) => (
                <div
                  key={sIdx}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderLeft: '4px solid #dc2626',
                    borderRadius: '0 6px 6px 0',
                    padding: '10px 12px',
                    fontSize: '0.82rem',
                    color: '#1e293b',
                    lineHeight: 1.45,
                  }}
                >
                  {st}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: ALS RESUSCITATION & PHARMACOLOGY ================= */}
      {tab === 'als' && (
        <div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <button
              className={`xs ${selectedAls === 'als_5h5t' ? 'pri' : 'ghost'}`}
              onClick={() => setSelectedAls('als_5h5t')}
              style={{ fontWeight: 700 }}
            >
              🔍 5H &amp; 5T Reversible Causes
            </button>
            <button
              className={`xs ${selectedAls === 'als_drugs' ? 'pri' : 'ghost'}`}
              onClick={() => setSelectedAls('als_drugs')}
              style={{ fontWeight: 700 }}
            >
              💊 Core Resuscitation Drugs &amp; Dosages
            </button>
            <button
              className={`xs ${selectedAls === 'als_airway' ? 'pri' : 'ghost'}`}
              onClick={() => setSelectedAls('als_airway')}
              style={{ fontWeight: 700 }}
            >
              🌬️ Oxygen Delivery &amp; Airway Devices
            </button>
          </div>

          <div style={{ background: '#fff', border: '1.5px solid #6366f1', borderRadius: '10px', padding: '16px' }}>
            <h3 style={{ margin: '0 0 6px', color: '#4338ca' }}>{ALS_TOPICS[selectedAls].title}</h3>
            <p className="muted" style={{ margin: '0 0 14px', fontSize: '0.82rem' }}>{ALS_TOPICS[selectedAls].summary}</p>

            {selectedAls === 'als_5h5t' && (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#eef2ff', color: '#312e81', textAlign: 'left' }}>
                      <th style={{ padding: '8px 10px', border: '1px solid #c7d2fe' }}>Group</th>
                      <th style={{ padding: '8px 10px', border: '1px solid #c7d2fe' }}>Reversible Cause</th>
                      <th style={{ padding: '8px 10px', border: '1px solid #c7d2fe' }}>Clinical Clues / Clues</th>
                      <th style={{ padding: '8px 10px', border: '1px solid #c7d2fe' }}>Immediate Medical Treatment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ALS_TOPICS.als_5h5t.table.map((row, idx) => (
                      <tr key={idx} style={{ background: idx % 2 === 0 ? '#fff' : '#f8fafc' }}>
                        <td style={{ padding: '8px 10px', border: '1px solid #e2e8f0', fontWeight: 800, color: row.type === '5H' ? '#0284c7' : '#dc2626' }}>{row.type}</td>
                        <td style={{ padding: '8px 10px', border: '1px solid #e2e8f0', fontWeight: 700 }}>{row.cause}</td>
                        <td style={{ padding: '8px 10px', border: '1px solid #e2e8f0' }}>{row.clues}</td>
                        <td style={{ padding: '8px 10px', border: '1px solid #e2e8f0', color: '#166534', fontWeight: 600 }}>{row.treatment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {selectedAls === 'als_drugs' && (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#eef2ff', color: '#312e81', textAlign: 'left' }}>
                      <th style={{ padding: '8px 10px', border: '1px solid #c7d2fe' }}>Drug Name</th>
                      <th style={{ padding: '8px 10px', border: '1px solid #c7d2fe' }}>Standard Dose &amp; Route</th>
                      <th style={{ padding: '8px 10px', border: '1px solid #c7d2fe' }}>Clinical Indication &amp; Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ALS_TOPICS.als_drugs.table.map((row, idx) => (
                      <tr key={idx} style={{ background: idx % 2 === 0 ? '#fff' : '#f8fafc' }}>
                        <td style={{ padding: '8px 10px', border: '1px solid #e2e8f0', fontWeight: 800, color: '#0d3a54' }}>{row.drug}</td>
                        <td style={{ padding: '8px 10px', border: '1px solid #e2e8f0', color: '#b91c1c', fontWeight: 700 }}>{row.dose}</td>
                        <td style={{ padding: '8px 10px', border: '1px solid #e2e8f0' }}>{row.indication}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {selectedAls === 'als_airway' && (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#eef2ff', color: '#312e81', textAlign: 'left' }}>
                      <th style={{ padding: '8px 10px', border: '1px solid #c7d2fe' }}>Device</th>
                      <th style={{ padding: '8px 10px', border: '1px solid #c7d2fe' }}>Flow Rate / Sizes</th>
                      <th style={{ padding: '8px 10px', border: '1px solid #c7d2fe' }}>Delivered FiO2</th>
                      <th style={{ padding: '8px 10px', border: '1px solid #c7d2fe' }}>Clinical Notes &amp; Sizing</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ALS_TOPICS.als_airway.table.map((row, idx) => (
                      <tr key={idx} style={{ background: idx % 2 === 0 ? '#fff' : '#f8fafc' }}>
                        <td style={{ padding: '8px 10px', border: '1px solid #e2e8f0', fontWeight: 700 }}>{row.device}</td>
                        <td style={{ padding: '8px 10px', border: '1px solid #e2e8f0' }}>{row.flow}</td>
                        <td style={{ padding: '8px 10px', border: '1px solid #e2e8f0', fontWeight: 800, color: '#0369a1' }}>{row.fio2}</td>
                        <td style={{ padding: '8px 10px', border: '1px solid #e2e8f0' }}>{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= TAB 4: NURSING CLINICAL SOPS ================= */}
      {tab === 'sops' && (
        <NursingSopsSection selectedSop={selectedSop} setSelectedSop={setSelectedSop} />
      )}

      {/* ================= TAB 5: LAB & ABG PANIC PROTOCOL ================= */}
      {tab === 'lab_panic' && (
        <LabPanicProtocolSection
          selectedLabPanel={selectedLabPanel}
          setSelectedLabPanel={setSelectedLabPanel}
          labSearch={labSearch}
          setLabSearch={setLabSearch}
          sbarCopied={sbarCopied}
          setSbarCopied={setSbarCopied}
        />
      )}

      {/* ================= TAB 6: PENANG EMERGENCY DIRECTORY ================= */}
      {tab === 'emergency' && (
        <EmergencyDirectorySection search={search} setSearch={setSearch} />
      )}

      {/* ================= TAB 6: CLINICAL CALCULATORS ================= */}
      {tab === 'calculators' && (
        <ClinicalCalculators />
      )}
    </div>
  );
}

/* =========================================================================
   NURSING SOPS SUB-COMPONENT
========================================================================= */
function NursingSopsSection({ selectedSop, setSelectedSop }) {
  const [sopSearch, setSopSearch] = useState('');

  const SOPS = {
    sop_intake: {
      code: 'SOP-CLIN-01',
      title: 'Patient Intake, Comprehensive Admission Assessment & Care Plan Formulation',
      points: [
        '1. Two-Identifier Patient Verification: Confirm patient identity using at least two unique identifiers (Full Name + NRIC/Passport/RN). Cross-check signed informed nursing consent with patient or legal Next-of-Kin (NOK).',
        '2. Baseline MEWS Vital Signs: Obtain comprehensive baseline vitals within 30 minutes of admission: Blood Pressure, Heart Rate, Respiratory Rate, SpO2, Body Temperature, Capillary Blood Glucose (CBG), and AVPU/GCS neurological score.',
        '3. Comprehensive Clinical History: Document primary diagnosis, comorbidities, surgical history, known drug/food/latex allergies, and current medication regimen from hospital discharge summary.',
        '4. Mandatory Admission Risk Screening: Complete Morse Fall Risk Scale, Braden Pressure Ulcer Scale, Pain Scale (Numeric/FLACC), and Nutritional Screening. Flag high-risk parameters immediately.',
        '5. Nursing Care Plan (NCP) & Emergency Setup: Establish patient-specific care plan, define vital signs frequency, verify attending physician contact details, and identify nearest hospital emergency department (A&E).',
      ],
    },
    sop_emar: {
      code: 'SOP-CLIN-02',
      title: 'Medication Administration, 7 Rights & High-Alert Double-Checking Protocol',
      points: [
        '1. The 7 Rights Verification: Right Patient (2 identifiers), Right Drug (3-point label check), Right Dose (exact calculation), Right Route (oral, IV, SC, IM, topical, NG), Right Time/Frequency, Right Documentation (immediate eMAR signing), Right to Refuse.',
        '2. Independent Double-Checking for High-Alert Drugs: High-Alert Medications (Insulin, Morphine/Fentanyl/Opioids, Clexane/Enoxaparin/Warfarin, Concentrated Electrolytes e.g. KCl >0.9%) REQUIRE mandatory independent verification by two staff members before administration.',
        '3. TALL MAN Lettering & LASA Awareness: Prevent Look-Alike Sound-Alike errors (e.g. DOBUTamine vs DOPamine, CeLEBREX vs CeLEXA, MetroNIDAZOLE vs MetOPROLOL).',
        '4. Crushing & Formulation Precautions: Never crush sustained-release (SR/CR/XR/ER), enteric-coated (EC), delayed-release, or sublingual medications. Verify enteral tube compatibility.',
        '5. Omission & Adverse Reaction Protocol: If a dose is withheld (e.g. SBP < 90 for antihypertensives, HR < 60 for Digoxin/Beta-blockers), document clinical rationale in eMAR and notify attending physician immediately.',
      ],
    },
    sop_ng: {
      code: 'SOP-CLIN-03',
      title: 'Nasogastric (NG) Tube Insertion, Position Verification & Enteral Feeding Protocol',
      points: [
        '1. Pre-Procedure & NEX Measurement: Check physician order, verify 2 identifiers, check nasal patency. Measure NEX: Tip of Nose ➔ Earlobe ➔ Xiphoid Process (NEX) + 5 cm. Mark insertion depth with tape.',
        '2. Aseptic Insertion Technique: Position patient in High Fowler (60–90°). Lubricate tube with water-soluble K-Y jelly. Advance gently along nasal floor. Have patient swallow sips of water as tube passes nasopharynx. Stop immediately if coughing, cyanosis, or respiratory distress occurs.',
        '3. MANDATORY Gastric Position Verification: Aspirate gastric contents and test with CE-marked pH indicator paper. Placement confirmed if pH ≤ 5.5. (Note: Whoosh test auscultation alone is NOT acceptable per clinical safety guidelines).',
        '4. Gastric Residual Volume (GRV) Protocol: Check GRV before each bolus feed. If GRV > 150–200 mL, withhold feed for 1 hour and recheck. Re-instill aspirate to prevent electrolyte loss unless prescribed otherwise.',
        '5. Flushing & Post-Feed Position: Flush tube with 30–50 mL warm sterile water before and after every feed and medication. Keep head of bed elevated at ≥ 30–45° during feed and for at least 60 minutes post-feed to prevent aspiration pneumonia.',
      ],
    },
    sop_foley: {
      code: 'SOP-CLIN-04',
      title: 'Foley Urinary Catheter Insertion, Maintenance & CAUTI Prevention Standard',
      points: [
        '1. Strict Aseptic Technique (ANTT): Surgical hand scrub, sterile gloves, fenestrated sterile drape, and sterile procedure tray.',
        '2. Anesthetic Lubrication: Instill 10–15 mL 2% Lignocaine gel into male urethra (wait 3–5 min) or lubricate female catheter generously to minimize urethral trauma and spasm.',
        '3. Balloon Inflation Standard: Inflate retention balloon ONLY with sterile Water for Injection (10 mL). NEVER use normal saline (saline crystallizes and jams the deflation channel).',
        '4. Closed Drainage & Gravitational Flow: Keep drainage bag ALWAYS below bladder level to prevent retrograde urine reflux and CAUTI. Never allow bag to touch floor. Secure catheter to upper thigh with statlock to prevent traction.',
        '5. Daily Hygiene & Emptying: Clean meatus daily with mild soap and water. Empty drainage bag when 2/3 full using sterile non-touch technique into a dedicated measuring container.',
      ],
    },
    sop_tracheo: {
      code: 'SOP-CLIN-05',
      title: 'Tracheostomy Care, Suctioning & Emergency Decannulation Protocol',
      points: [
        '1. Sterile Suctioning Protocol: Hyperoxygenate with 100% O2 for 30s before suctioning. Use sterile suction catheter (outer diameter ≤ 1/2 to 2/3 ETT internal diameter). Suction pressure: 80–120 mmHg (adults). Apply intermittent suction ONLY upon withdrawal. Limit duration to ≤ 10–15 seconds.',
        '2. Inner Cannula Maintenance: Clean or replace inner cannula every 8–12 hours using sterile saline and dedicated brush. Ensure locking mechanism clicks securely.',
        '3. Stoma Dressing & Tie Securing: Clean peristomal skin with sterile saline, dry thoroughly, apply non-fraying tracheostomy dressing. Fasten neck ties leaving space for 1–2 fingers between tie and neck.',
        '4. Cuff Pressure Surveillance: Check pilot balloon pressure every shift (maintain 25–30 cmH2O) using calibrated manometer to prevent tracheal mucosal necrosis and aspiration.',
        '5. Bedside Emergency Kit: Always keep spare tracheostomy tube of same size, spare tube one size smaller, sterile obturator, tracheal dilator, sterile lubricant, and suction apparatus at bedside.',
      ],
    },
    sop_wound: {
      code: 'SOP-CLIN-06',
      title: 'Aseptic Wound Care, TIME Principle & Pressure Injury Staging Management',
      points: [
        '1. Aseptic Non-Touch Technique (ANTT): Establish clean sterile field, perform hand hygiene before and after, don sterile gloves for deep/cavity wounds.',
        '2. Cleansing & Debridement: Irrigate wound bed with sterile Normal Saline (0.9% NaCl) or potable water. Avoid cytotoxic agents (hydrogen peroxide, concentrated povidone iodine) on healthy granulating tissue.',
        '3. TIME Framework: T = Tissue management (debride slough/eschar), I = Infection control (antimicrobial silver/honey/iodine), M = Moisture balance (foams/alginates for heavy exudate, hydrogels for dry necrosis), E = Edge advancement.',
        '4. Pressure Injury Staging & Prevention: Stage 1 (non-blanchable erythema) to Stage 4 (full thickness with bone/tendon). Enforce 2-hourly Q2H repositioning schedule, pressure-relieving air mattresses, and barrier cream for incontinence.',
        '5. Digital Tracking: Measure length × width × depth in centimeters and upload calibrated photo to Assura Wound Care Tracker.',
      ],
    },
    sop_iv: {
      code: 'SOP-CLIN-07',
      title: 'Intravenous (IV) Cannulation, Infusion Care & VIP Phlebitis Prevention Standard',
      points: [
        '1. Site Selection & Skin Asepsis: Select distal veins of upper extremities (forearm preferred). Cleanse site with 2% Chlorhexidine in 70% Alcohol for 30 seconds and allow to AIR DRY completely for 30 seconds before puncture.',
        '2. Insertion & Occlusive Dressing: Insert cannula bevel up at 10–30° angle. Observe flashback, lower angle, advance 2mm, then thread catheter into vein. Secure with sterile transparent occlusive dressing (Tegaderm).',
        '3. Flushing & Patency: Flush with 5–10 mL sterile 0.9% Sodium Chloride using push-pause pulsating technique. Assess for resistance, swelling, or pain.',
        '4. Visual Infusion Phlebitis (VIP) Scoring: Inspect site every shift. VIP Score 0 = healthy; VIP Score 1 = slight pain/erythema; VIP Score ≥2 = phlebitis present ➔ IMMEDIATELY REMOVE CANNULA and resite.',
        '5. Line Replacement Standard: Change peripheral IV cannula every 72–96 hours or immediately upon first sign of complication, extravasation, or occlusion.',
      ],
    },
    sop_oxygen: {
      code: 'SOP-CLIN-08',
      title: 'Oxygen Delivery Therapy, Device Titration & ABG Verification Protocol',
      points: [
        '1. Device Selection & Delivered FiO2: Nasal Cannula (1–4 L/min, FiO2 24–36%), Simple Face Mask (5–8 L/min, FiO2 40–60%), Venturi Mask (precise FiO2 24–60%), Non-Rebreather Mask / NRM (10–15 L/min with full reservoir, FiO2 80–95%), High Flow Nasal Cannula / HFNC (20–60 L/min, FiO2 21–100%).',
        '2. Target SpO2 Titration: Standard patients: Target SpO2 94–98%. Patients with chronic hypercapnic respiratory failure (COPD, obesity hypoventilation): Target SpO2 88–92% to prevent loss of hypoxic drive.',
        '3. Humidification & Skin Protection: Use sterile bubble humidifier for oxygen flows > 4 L/min to prevent mucosal drying and crusting. Apply silicone padding behind ears and across nasal bridge.',
        '4. Oxygen Toxicity & Fire Safety: Avoid prolonged 100% FiO2 when PaO2 > 100 mmHg. Strictly prohibit smoking, open flames, and oil-based petroleum jelly around oxygen delivery systems.',
        '5. ABG Verification in Acute Desaturation: If SpO2 drops < 88% or patient develops altered mental status, perform immediate Arterial Blood Gas (ABG) and escalate using the SBAR protocol.',
      ],
    },
    sop_cbg: {
      code: 'SOP-CLIN-09',
      title: 'Capillary Blood Glucose (CBG) Monitoring & Acute Hypo/Hyperglycemia Management',
      points: [
        '1. Sampling Standard: Wash patient hands with warm water and soap. Avoid alcohol wipes if possible (residual alcohol falsely alters glucose reading) or allow to dry completely. Lance lateral aspect of fingertip; wipe away first drop, use second drop.',
        '2. Target Glycemic Ranges: Fasting Blood Sugar (FBS): 4.4–7.0 mmol/L; Random / Post-Prandial: 6.0–10.0 mmol/L.',
        '3. Rule of 15 Hypoglycemia Protocol (CBG < 4.0 mmol/L): Conscious: Administer 15–20g fast-acting carbohydrate (150 mL fruit juice, 3 teaspoons sugar/honey in water, or 3–4 glucose tablets). Recheck CBG in 15 minutes. Repeat until CBG > 4.0 mmol/L, then give complex carb snack. Unconscious / NPO: Call 999 immediately. Administer IV 50% Dextrose 40–50 mL (20–25g) over 3–5 min or IM Glucagon 1mg.',
        '4. Hyperglycemia & DKA / HHS Alert (CBG > 16.7–20.0 mmol/L): Check urine/blood ketones. Assess for Kussmaul breathing, fruity breath, dehydration, or confusion. Notify doctor stat.',
        '5. Glucometer Quality Control: Perform daily QC strip calibration and clean meter housing with disinfectant wipe between patients.',
      ],
    },
    sop_vent: {
      code: 'SOP-CLIN-10',
      title: 'Mechanical Ventilation, CPAP/BiPAP Care & VAP Prevention Bundle Standard',
      points: [
        '1. Ventilator Circuit & Humidifier: Maintain heated humidifier water temperature at 37°C with sterile water. Position moisture trap below patient level to prevent condensate aspiration. Never flush condensate back into humidifier.',
        '2. VAP Prevention Bundle: (1) Head of bed elevated 30–45° continuously; (2) Daily sedation hold & spontaneous breathing trial evaluation; (3) Peptic ulcer disease prophylaxis; (4) Deep vein thrombosis (DVT) prophylaxis; (5) Daily oral care with 0.12% Chlorhexidine gluconate.',
        '3. Subglottic Suctioning: Suction subglottic secretions every 4–6 hours before deflating cuff or repositioning tube. Maintain cuff pressure at 25–30 cmH2O.',
        '4. Alarm Response Standard (DOPE Rule): If high pressure or low volume alarm sounds, systematically evaluate: D = Dislodgement / extubation, O = Obstruction / mucus plug (suction immediately), P = Pneumothorax (check bilateral air entry), E = Equipment failure (disconnect and bag-valve-mask ventilate with 100% O2).',
        '5. Non-Invasive CPAP/BiPAP Care: Ensure mask cushion fit with minimal air leak (< 25 L/min). Apply hydrocolloid barrier dressing on nasal bridge to prevent pressure ulceration. Monitor for gastric distension.',
      ],
    },
    sop_injection: {
      code: 'SOP-CLIN-11',
      title: 'Subcutaneous & Intramuscular Injections (Insulin / LMWH Clexane) & Sharps Safety',
      points: [
        '1. Subcutaneous Injection Standard (Insulin / Clexane Enoxaparin): Insulin: Rotate injection sites systematically across abdomen (2 inches away from umbilicus), upper outer arms, and anterior thighs. Pinch skin fold, insert needle at 90° (or 45° for thin patients), inject slowly, wait 10 seconds before needle withdrawal. LMWH (Clexane): Inject into anterolateral/posterolateral abdominal wall. DO NOT expel air bubble from pre-filled syringe (bubble seals medication). DO NOT rub site post-injection (prevents hematoma).',
        '2. Intramuscular (IM) Injection Standard: Preferred site: Ventrogluteal (safest, away from sciatic nerve) or Vastus Lateralis. Deltoid for small volumes (≤ 1 mL). Use Z-track technique for irritating medications to prevent subcutaneous leakage.',
        '3. Needle Sizing: Subcutaneous: 27–31G, 4–8mm needle. Intramuscular: 21–23G, 1–1.5 inch needle.',
        '4. Strict Sharps Safety Protocol: NEVER recap needles by hand. Immediately discard needles into yellow sharps bin at point of use. Never fill sharps bin past 3/4 fill line.',
      ],
    },
    sop_fall: {
      code: 'SOP-CLIN-12',
      title: 'Fall Prevention, Morse Risk Stratification & Post-Fall Management Protocol',
      points: [
        '1. Morse Fall Risk Stratification: Assess on admission, post-fall, and upon clinical change. Score < 25 = Low Risk; 25–45 = Moderate Risk; > 45 = High Fall Risk.',
        '2. Universal High-Fall-Risk Interventions: Apply yellow "Fall Risk" wristband and bed sign. Maintain bed in lowest position with wheels locked. Keep 2 side rails raised. Ensure call bell and personal items are within arm\'s reach. Clear floor pathways of cords, rugs, and spills. Adequate night lighting. Non-skid footwear for ambulation; assist with all transfers and toileting.',
        '3. Post-Fall Emergency Protocol: DO NOT move patient immediately. Check consciousness (AVPU), Airway, Breathing, Circulation. Check for head trauma, neck pain, limb deformity, or bleeding. If neck trauma suspected, maintain C-spine immobilization.',
        '4. Post-Fall Assessment: Perform complete vital signs, blood glucose, and neurological GCS check. Assist patient to bed with slide sheet/hoist if safe. Notify attending doctor and family immediately. Document in Clinical Progress Notes and submit formal Incident Report within 24 hours.',
      ],
    },
    sop_stoma: {
      code: 'SOP-CLIN-13',
      title: 'Stoma Care (Colostomy / Ileostomy / Urostomy) & Peristomal Skin Management',
      points: [
        '1. Assessment & Stoma Character: Inspect stoma color (healthy = beefy red/pink and moist; dusky/purple/black = ischemia/necrosis ➔ notify surgeon stat), size, shape, and peristomal skin integrity.',
        '2. Wafer Sizing & Skin Cleansing: Clean peristomal skin with warm water and dry thoroughly (avoid oily soaps). Measure stoma diameter with measuring guide. Cut baseplate aperture to exact stoma size + 2mm clearance (prevents leakage and constrictive necrosis).',
        '3. Pouch Application: Apply skin barrier wipe or paste around stoma base for uneven skin. Press baseplate gently onto skin for 30–60 seconds to ensure thermo-activated adhesive seal.',
        '4. Emptying & Bag Change Frequency: Empty pouch when 1/3 to 1/2 full of flatus or effluent. Change one-piece appliance every 1–2 days; change two-piece baseplate every 3–5 days or immediately upon leakage.',
        '5. Output Surveillance: Monitor daily stoma output. Normal colostomy: 200–600 mL formed/semi-formed; Ileostomy: 500–1000 mL liquid/pasty. Alert physician if ileostomy output > 1500 mL/day (risk of severe dehydration and electrolyte depletion).',
      ],
    },
    sop_ipc: {
      code: 'SOP-CLIN-14',
      title: 'Infection Prevention & Control (IPC), PPE Donning/Doffing & MDRO Isolation',
      points: [
        '1. Standard Precautions: Apply to ALL patients regardless of infection status. Clean hands before and after patient contact. Use PPE when risk of exposure to blood, body fluids, or non-intact skin.',
        '2. Transmission-Based Precautions: Contact Isolation (MRSA, VRE, CRE, C. difficile, ESBL): Dedicated gown and gloves upon room entry. Dedicated single-patient equipment (BP cuff, thermometer, stethoscope). Clean C. diff equipment with bleach (alcohol does not kill spores). Droplet Isolation (Influenza, Meningitis, COVID-19): Surgical mask and eye protection within 1 meter. Airborne Isolation (Active Pulmonary TB, Measles, Chickenpox): Fit-tested N95 respirator.',
        '3. Correct PPE Donning Sequence: Hand hygiene ➔ Gown / Apron ➔ Mask / N95 Respirator ➔ Eye Protection / Face Shield ➔ Gloves (pulled over gown cuffs).',
        '4. Correct PPE Doffing Sequence: Gloves ➔ Eye Protection ➔ Gown ➔ Hand Hygiene ➔ Mask / N95 Respirator ➔ Final Hand Hygiene.',
        '5. Clinical Waste Segregation: Yellow clinical waste bag for infectious waste/dressings/blood; Black bag for non-clinical domestic waste; Yellow rigid sharps container for needles/blades.',
      ],
    },
    sop_handover: {
      code: 'SOP-CLIN-15',
      title: 'Shift Handover (ISBAR Standard) & Inter-Facility Transfer Protocol',
      points: [
        '1. ISBAR Bedside Structured Handover: I (Identify): Staff name, Patient Full Name, Age, IC/RN, Code Status (Full Code / DNR). S (Situation): Current status, primary diagnosis, post-op day. B (Background): Past history, allergies, IV lines, catheters, oxygen settings. A (Assessment): Latest MEWS vitals, GCS, pain, I/O balance, lab/ABG results, wound status. R (Recommendation): Pending tests, meds due, procedure schedule, monitoring directives.',
        '2. Interactive Bedside Verification: Both outgoing and incoming staff must jointly verify bedside IV drip infusion rates, NG tube / Foley patency, drain outputs, and skin integrity.',
        '3. Controlled Drug (Dangerous Drugs / DDA) Handover: Joint count and physical inspection of DDA register, locked drug cupboard, and ampoule counts by both shift nurses.',
        '4. Inter-Facility Medical Transfer Checklist: Ensure portable oxygen cylinder is full, portable suction and emergency resuscitation bag (BVM) are ready, medical transport summary and consent documents are signed, and receiving facility team is notified.',
      ],
    },
    sop_dnr: {
      code: 'SOP-CLIN-16',
      title: 'Do Not Resuscitate (DNR) & End-of-Life Palliative Dignified Care',
      points: [
        '1. Legal Authorization: DNR advance directives require explicit discussion with patient/Next-of-Kin, attending physician endorsement (MMC No), and formal Director/Consultant authorization in Assura.',
        '2. Scope of DNR: Withhold chest compressions, defibrillation, endotracheal intubation, and mechanical ventilation.',
        '3. DNR is NOT Withholding Care: Continue active symptom control (pain relief, dyspnea management, oral comfort care, hygiene, pressure sore prevention).',
        '4. Verification of Death: Confirm cessation of respiration (1 min), absence of carotid pulse (1 min), absence of heart sounds (1 min), and fixed dilated pupils. Complete NOK Handover and Last Offices with dignity.',
      ],
    },
  };

  const filteredSops = Object.entries(SOPS).filter(([k, s]) => {
    if (!sopSearch) return true;
    const q = sopSearch.toLowerCase();
    return (
      s.code.toLowerCase().includes(q) ||
      s.title.toLowerCase().includes(q) ||
      s.points.some(p => p.toLowerCase().includes(q))
    );
  });

  const activeSopKey = SOPS[selectedSop] ? selectedSop : (filteredSops[0] ? filteredSops[0][0] : 'sop_intake');
  const currentSop = SOPS[activeSopKey] || SOPS.sop_intake;

  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      {/* Sidebar */}
      <div style={{ width: 'min(300px, 100%)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <input
          type="search"
          value={sopSearch}
          onChange={(e) => setSopSearch(e.target.value)}
          placeholder="🔍 Search SOP (e.g. Intake, NG, IV, Foley, DNR)..."
          style={{ width: '100%', padding: '8px 12px', fontSize: '0.82rem', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '4px' }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '680px', overflowY: 'auto', paddingRight: '2px' }}>
          {filteredSops.map(([key, s]) => (
            <button
              key={key}
              onClick={() => setSelectedSop(key)}
              style={{
                textAlign: 'left',
                padding: '9px 12px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 700,
                border: activeSopKey === key ? '1.5px solid #16a34a' : '1px solid #e2e8f0',
                background: activeSopKey === key ? '#f0fdf4' : '#fff',
                color: activeSopKey === key ? '#166534' : '#334155',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 800, color: activeSopKey === key ? '#15803d' : '#0369a1' }}>{s.code}</span>
              </div>
              <div style={{ fontSize: '0.74rem', fontWeight: 500, color: activeSopKey === key ? '#166534' : '#64748b', marginTop: '2px', lineHeight: 1.25 }}>
                {s.title}
              </div>
            </button>
          ))}
          {filteredSops.length === 0 && (
            <div style={{ textAlign: 'center', padding: '20px', color: '#94a3b8', fontSize: '0.8rem' }}>
              No SOPs matching "{sopSearch}"
            </div>
          )}
        </div>
      </div>

      {/* SOP Detail Content */}
      <div style={{ flex: 1, minWidth: 'min(320px, 100%)', background: '#fff', border: '1.5px solid #16a34a', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
          <span style={{ background: '#dcfce7', color: '#15803d', padding: '3px 10px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 800 }}>
            {currentSop.code}
          </span>
          <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600 }}>
            Malaysian Clinical Nursing Practice Standard (LJM / MOH Malaysia)
          </span>
        </div>

        <h3 style={{ margin: '0 0 16px', color: '#0d3a54', fontSize: '1.15rem', lineHeight: 1.35 }}>
          {currentSop.title}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {currentSop.points.map((pt, idx) => (
            <div
              key={idx}
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '12px 14px',
                fontSize: '0.84rem',
                lineHeight: 1.5,
                color: '#334155',
              }}
            >
              {pt}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   EMERGENCY DIRECTORY SUB-COMPONENT
========================================================================= */
function EmergencyDirectorySection({ search, setSearch }) {
  const EMERGENCY_DIRECTORIES = [
    {
      category: '🚨 National Emergency & Disaster Response (全国紧急救护)',
      items: [
        { name: 'National Emergency Response (MERS 999)', phone: '999', alt: '112 (Mobile)', desc: 'Ambulance (KKM), Police (PDRM), Fire & Rescue (Bomba)', priority: true },
        { name: 'Civil Defence Force (APM Penang 999/Direct)', phone: '04-226 2444', desc: 'Emergency rescue, storm, and disaster support' },
        { name: 'National Poison Centre (PRN USM Penang)', phone: '04-657 0099', alt: '018-979 0099', desc: 'Poisoning, overdose & toxicology emergency hotline' },
      ],
    },
    {
      category: '🏥 Penang Public Government Hospitals (槟城政府医院急诊部)',
      items: [
        { name: 'Hospital Pulau Pinang (HPP / Penang General Hospital)', phone: '04-222 5333', alt: 'Main: 04-222 5555', desc: 'A&E Trauma & Emergency Department (Island / Georgetown)' },
        { name: 'Hospital Seberang Jaya (HSJ / Mainland General Hospital)', phone: '04-382 7333', alt: 'Main: 04-382 7000', desc: 'A&E Trauma & Emergency Department (Mainland Central)' },
        { name: 'Hospital Bukit Mertajam (HBM)', phone: '04-549 7333', alt: 'Main: 04-549 7000', desc: 'A&E Department (Bukit Mertajam / South Seberang Perai)' },
        { name: 'Hospital Kepala Batas (HKB)', phone: '04-562 2333', alt: 'Main: 04-562 2000', desc: 'A&E Department (North Seberang Perai)' },
        { name: 'Hospital Balik Pulau (HBP)', phone: '04-866 9333', alt: 'Main: 04-866 9000', desc: 'A&E Department (South-West Island)' },
        { name: 'Hospital Sungai Bakap (HSB)', phone: '04-582 4333', alt: 'Main: 04-582 4000', desc: 'A&E Department (South Seberang Perai)' },
      ],
    },
    {
      category: '🏥 Penang Private Hospitals (24-Hour Emergency & Ambulance Direct)',
      items: [
        { name: 'Gleneagles Hospital Penang (GHP)', phone: '04-222 9199', alt: 'Ambulance: 04-222 9111', desc: '24H Emergency, Trauma & Ambulance Services (Jalan Pangkor)' },
        { name: 'Island Hospital Penang', phone: '04-228 8222', alt: 'Ambulance: 04-238 3333', desc: '24H Emergency Department & Medical Transfer (Peel Avenue)' },
        { name: 'Loh Guan Lye Specialists Centre (LSC)', phone: '04-238 8888', alt: 'A&E: 04-228 8501', desc: '24H Emergency & Critical Care (Jalan Logan)' },
        { name: 'Pantai Hospital Penang (Bayan Lepas)', phone: '04-643 3433', alt: 'Main: 04-643 7888', desc: '24H Emergency & Ambulance (Bayan Baru / FIZ / Airport Area)' },
        { name: 'KPJ Penang Specialist Hospital (Bandar Perda)', phone: '04-548 6688', alt: 'Main: 04-548 6600', desc: '24H Emergency & Ambulance (Bukit Mertajam / Mainland)' },
        { name: 'Bagan Specialist Centre (Butterworth)', phone: '04-332 2800', alt: 'Main: 04-329 9000', desc: '24H Emergency & Ambulance (Jalan Bagan 1, Butterworth)' },
        { name: 'Penang Adventist Hospital', phone: '04-222 7799', alt: 'Main: 04-222 7200', desc: '24H Emergency Department & Ambulance (Jalan Burma)' },
        { name: 'Mount Miriam Cancer Hospital', phone: '04-890 7000', alt: 'Fax: 04-890 1583', desc: 'Specialist Oncology & Palliative Care (Tanjung Bungah)' },
      ],
    },
    {
      category: '🚑 Private Ambulance & Non-Emergency Medical Transport (私人救护车)',
      items: [
        { name: 'St. John Ambulance Malaysia (Penang HQ)', phone: '04-828 5999', alt: '04-828 5555', desc: '24H Emergency Ambulance & Medical Event Standby' },
        { name: 'Malaysian Red Crescent Society (PBSM Penang)', phone: '04-827 5678', alt: '04-828 5797', desc: 'Emergency ambulance & patient transfer services' },
        { name: 'First Ambulance Services (Northern Region)', phone: '04-229 9999', alt: '1300-88-1911', desc: '24H ICU Ambulance, Inter-facility Transfer & Long Distance' },
        { name: 'LifeCare Private Ambulance Hotline', phone: '012-488 9999', alt: '016-411 9999', desc: 'Home to Hospital Medical Transport & Oxygen Support' },
      ],
    },
  ];

  const filtered = EMERGENCY_DIRECTORIES.map(cat => ({
    ...cat,
    items: cat.items.filter(i =>
      !search ||
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.phone.includes(search) ||
      (i.desc && i.desc.toLowerCase().includes(search.toLowerCase()))
    ),
  })).filter(cat => cat.items.length > 0);

  return (
    <div>
      <div style={{ background: '#fef2f2', border: '1.5px solid #f87171', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <b style={{ color: '#991b1b', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            🚨 Immediate Life-Threatening Emergency Direct Dial:
          </b>
          <div style={{ fontSize: '0.8rem', color: '#b91c1c', marginTop: '2px' }}>
            For cardiac arrest, severe choking, acute stroke, or massive haemorrhage — dial <b>999</b> (Ambulance/Police/Bomba) or Hospital A&amp;E.
          </div>
        </div>
        <a
          href="tel:999"
          className="btn danger"
          style={{ padding: '8px 18px', fontSize: '1rem', fontWeight: 900, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          📞 Call 999 Now
        </a>
      </div>

      <div style={{ marginBottom: '14px' }}>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search hospital, emergency department, ambulance service, or phone number..."
          style={{ width: '100%', padding: '10px 14px', fontSize: '0.9rem', borderRadius: '8px', border: '1.5px solid #cbd5e1' }}
        />
      </div>

      {filtered.map((cat, idx) => (
        <div key={idx} style={{ marginBottom: '18px' }}>
          <h4 style={{ color: '#0d3a54', borderBottom: '1.5px solid #e2e8f0', paddingBottom: '6px', margin: '0 0 10px' }}>
            {cat.category}
          </h4>
          <div className="grid2" style={{ gap: '10px' }}>
            {cat.items.map((item, i) => (
              <div
                key={i}
                style={{
                  background: item.priority ? '#fffbeb' : '#f8fafc',
                  border: item.priority ? '1.5px solid #f59e0b' : '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <div style={{ flex: 1 }}>
                  <b style={{ color: '#0f172a', fontSize: '0.92rem', display: 'block' }}>{item.name}</b>
                  <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '2px' }}>{item.desc}</div>
                  {item.alt && <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Alt: {item.alt}</div>}
                </div>

                <a
                  href={`tel:${item.phone.replace(/[^0-9+]/g, '')}`}
                  className="pri xs"
                  style={{
                    padding: '6px 12px',
                    fontWeight: 800,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    whiteSpace: 'nowrap',
                    background: '#0284c7',
                  }}
                >
                  📞 {item.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}


function ClinicalCalculators() {
  // 1. IV Drop Rate
  const [vol, setVol] = useState(500); // mL
  const [hrs, setHrs] = useState(4); // hours
  const [dropFactor, setDropFactor] = useState(20); // 20 standard, 60 micro

  const flowRateMlh = hrs > 0 ? (vol / hrs).toFixed(1) : 0;
  const dropRateGtt = hrs > 0 ? Math.round((vol * dropFactor) / (hrs * 60)) : 0;

  // 2. BMI
  const [weightKg, setWeightKg] = useState(65);
  const [heightCm, setHeightCm] = useState(165);
  const heightM = heightCm / 100;
  const bmi = heightM > 0 ? (weightKg / (heightM * heightM)).toFixed(1) : 0;

  function bmiCategory(val) {
    if (val < 18.5) return { cat: 'Underweight (偏瘦/营养不良风险)', col: '#ea580c' };
    if (val < 23.0) return { cat: 'Normal Asian Weight (正常健康体重)', col: '#16a34a' };
    if (val < 27.5) return { cat: 'Overweight (超重)', col: '#ca8a04' };
    return { cat: 'Obese (肥胖)', col: '#dc2626' };
  }

  // 3. Clinical Age & Malaysian IC Decoder
  const [dobInput, setDobInput] = useState('1950-01-15');
  const [nricInput, setNricInput] = useState('');
  const [nricResult, setNricResult] = useState(null);

  // Calculate age from DOB
  function calculateAge(birthDateStr) {
    if (!birthDateStr) return null;
    const birthDate = new Date(birthDateStr);
    const today = new Date();
    if (isNaN(birthDate.getTime()) || birthDate > today) return null;

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const diffTime = Math.abs(today - birthDate);
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let category = 'Adult (成年人)';
    let catCol = '#0284c7';
    if (years >= 100) { category = 'Centenarian (百岁长者 🌟)'; catCol = '#9333ea'; }
    else if (years >= 85) { category = 'Very Elderly / Oldest-Old (高龄长者 ≥85岁)'; catCol = '#b91c1c'; }
    else if (years >= 65) { category = 'Geriatric Elderly (长者 65–84岁)'; catCol = '#ea580c'; }
    else if (years >= 45) { category = 'Middle-Aged Adult (中年 45–64岁)'; catCol = '#0284c7'; }
    else if (years >= 18) { category = 'Young Adult (青年 18–44岁)'; catCol = '#16a34a'; }
    else { category = 'Paediatric / Adolescent (未成年人 <18岁)'; catCol = '#6366f1'; }

    return { years, months, days, totalDays, category, catCol };
  }

  // Parse Malaysian IC (e.g., 520412-07-5531 or 051225081122)
  function handleNricChange(val) {
    setNricInput(val);
    const cleaned = val.replace(/[^0-9]/g, '');
    if (cleaned.length === 12) {
      const yy = parseInt(cleaned.slice(0, 2), 10);
      const mm = parseInt(cleaned.slice(2, 4), 10);
      const dd = parseInt(cleaned.slice(4, 6), 10);
      const pb = cleaned.slice(6, 8);
      const lastDigit = parseInt(cleaned.slice(11, 12), 10);

      // Validate month and day
      if (mm >= 1 && mm <= 12 && dd >= 1 && dd <= 31) {
        const currentYearTwoDigit = new Date().getFullYear() % 100;
        // In Malaysian IC: if yy <= current 2-digit year (e.g. 26), usually 2000s; otherwise 1900s
        const fullYear = yy <= currentYearTwoDigit ? 2000 + yy : 1900 + yy;
        const formattedDob = `${fullYear}-${String(mm).padStart(2, '0')}-${String(dd).padStart(2, '0')}`;
        
        const gender = lastDigit % 2 === 1 ? 'Male (男 ♂)' : 'Female (女 ♀)';

        const STATE_CODES = {
          '01': 'Johor', '02': 'Kedah', '03': 'Kelantan', '04': 'Melaka', '05': 'Negeri Sembilan',
          '06': 'Pahang', '07': 'Penang (槟城)', '08': 'Perak', '09': 'Perlis', '10': 'Selangor',
          '11': 'Terengganu', '12': 'Sabah', '13': 'Sarawak', '14': 'Kuala Lumpur', '15': 'Labuan', '16': 'Putrajaya',
        };
        const stateName = STATE_CODES[pb] || `State code: ${pb}`;
        const ageDetails = calculateAge(formattedDob);

        setNricResult({
          dob: formattedDob,
          gender,
          state: stateName,
          age: ageDetails,
        });
        setDobInput(formattedDob);
        return;
      }
    }
    setNricResult(null);
  }

  const ageData = calculateAge(dobInput);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Calculator 3: CLINICAL AGE & MALAYSIAN IC CALCULATOR */}
      <div style={{ background: '#f8fafc', border: '1.5px solid #6366f1', borderRadius: '10px', padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ fontSize: '1.4rem' }}>🎂</span>
          <div>
            <h4 style={{ margin: 0, color: '#4338ca' }}>
              Clinical Age &amp; Malaysian NRIC Decoder (临床年龄与身份证快速计算器)
            </h4>
            <div style={{ fontSize: '0.74rem', color: '#6366f1' }}>
              Instant calculation of exact chronological age (Years, Months, Days), geriatric stage, and Malaysian IC auto-decoding.
            </div>
          </div>
        </div>

        <div className="grid2" style={{ gap: '12px', marginBottom: '12px' }}>
          {/* Option A: Malaysian IC Input */}
          <div className="f">
            <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#1e293b' }}>
              🇲🇾 Malaysian IC / NRIC Number (输入身份证号码)
            </label>
            <input
              type="text"
              value={nricInput}
              onChange={(e) => handleNricChange(e.target.value)}
              placeholder="e.g. 480615-07-5231 or 550812071234"
              style={{ fontSize: '0.86rem' }}
            />
            <span style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '2px' }}>
              Auto-extracts Date of Birth, Gender, State of Origin &amp; exact Age.
            </span>
          </div>

          {/* Option B: Date of Birth Picker */}
          <div className="f">
            <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#1e293b' }}>
              📅 Date of Birth / DOB (出生日期)
            </label>
            <input
              type="date"
              value={dobInput}
              onChange={(e) => {
                setDobInput(e.target.value);
                setNricResult(null);
              }}
              style={{ fontSize: '0.86rem' }}
            />
            <span style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '2px' }}>
              Select birth date to calculate exact days/months/years.
            </span>
          </div>
        </div>

        {/* Calculated Result Display Card */}
        {ageData && (
          <div style={{ background: '#eef2ff', border: '1.5px solid #c7d2fe', borderRadius: '10px', padding: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#4338ca', fontWeight: 800 }}>
                  Exact Chronological Age (精确生理年龄):
                </span>
                <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#312e81', marginTop: '2px' }}>
                  {ageData.years} Years, {ageData.months} Months, {ageData.days} Days
                </div>
                <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '2px' }}>
                  Total Days Lived: <b>{ageData.totalDays.toLocaleString()} days</b> · DOB: <b>{dobInput}</b>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span
                  style={{
                    background: '#fff',
                    border: `1.5px solid ${ageData.catCol}`,
                    color: ageData.catCol,
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    display: 'inline-block',
                  }}
                >
                  {ageData.category}
                </span>
                {nricResult && (
                  <div style={{ fontSize: '0.74rem', color: '#1e293b', marginTop: '4px' }}>
                    Gender: <b>{nricResult.gender}</b> · Origin: <b>{nricResult.state}</b>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid2" style={{ gap: '16px' }}>
        {/* Calculator 1: IV Drip Rate */}
        <div style={{ background: '#f8fafc', border: '1.5px solid #0284c7', borderRadius: '10px', padding: '14px' }}>
          <h4 style={{ margin: '0 0 10px', color: '#0369a1' }}>💧 IV Infusion &amp; Drop Rate Calculator (静脉滴速计算器)</h4>

          <div className="grid3" style={{ gap: '8px', marginBottom: '10px' }}>
            <div className="f">
              <label style={{ fontSize: '0.74rem', fontWeight: 600 }}>Total Volume (mL)</label>
              <input type="number" value={vol} onChange={(e) => setVol(Number(e.target.value))} />
            </div>
            <div className="f">
              <label style={{ fontSize: '0.74rem', fontWeight: 600 }}>Duration (Hours)</label>
              <input type="number" value={hrs} onChange={(e) => setHrs(Number(e.target.value))} />
            </div>
            <div className="f">
              <label style={{ fontSize: '0.74rem', fontWeight: 600 }}>Drop Factor (gtt/mL)</label>
              <select value={dropFactor} onChange={(e) => setDropFactor(Number(e.target.value))}>
                <option value={20}>20 gtt/mL (Standard Adult / 常规成人)</option>
                <option value={15}>15 gtt/mL (Blood Set / 输血器)</option>
                <option value={60}>60 gtt/mL (Microdrip / 儿科/精密微滴)</option>
              </select>
            </div>
          </div>

          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0369a1' }}>
              {dropRateGtt} drops/min (滴/分钟)
            </div>
            <div style={{ fontSize: '0.8rem', color: '#1e40af', marginTop: '2px' }}>
              Infusion Pump Rate: <b>{flowRateMlh} mL/hour</b>
            </div>
          </div>
        </div>

        {/* Calculator 2: BMI */}
        <div style={{ background: '#f8fafc', border: '1.5px solid #16a34a', borderRadius: '10px', padding: '14px' }}>
          <h4 style={{ margin: '0 0 10px', color: '#15803d' }}>⚖️ BMI &amp; Nutrition Metric Calculator (体重指数计算器)</h4>

          <div className="grid2" style={{ gap: '8px', marginBottom: '10px' }}>
            <div className="f">
              <label style={{ fontSize: '0.74rem', fontWeight: 600 }}>Weight (kg)</label>
              <input type="number" value={weightKg} onChange={(e) => setWeightKg(Number(e.target.value))} />
            </div>
            <div className="f">
              <label style={{ fontSize: '0.74rem', fontWeight: 600 }}>Height (cm)</label>
              <input type="number" value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))} />
            </div>
          </div>

          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#15803d' }}>
              BMI: {bmi} kg/m²
            </div>
            <div style={{ fontSize: '0.8rem', color: bmiCategory(Number(bmi)).col, fontWeight: 700, marginTop: '2px' }}>
              Category: {bmiCategory(Number(bmi)).cat}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   LAB & ABG PANIC PROTOCOL SUB-COMPONENT
========================================================================= */
function LabPanicProtocolSection({ selectedLabPanel, setSelectedLabPanel, labSearch, setLabSearch, sbarCopied, setSbarCopied }) {
  const copySbarTemplate = () => {
    const template = `🚨 *ASSURA SBAR CLINICAL ESCALATION FOR CRITICAL LAB RESULT*
━━━━━━━━━━━━━━━━━━━━━
👤 *Patient:* [Patient Full Name] (Age/Sex: [Age]yo / [Sex]) · RN: [RN/IC]
🏥 *Ward / Bed:* [Home / Room] · *Diagnosis:* [Primary Diagnosis]
🧪 *Laboratory Test Panel:* [ABG / Renal / FBC / LFT / Cardiac]
📅 *Time of Sample / Report:* [DD/MM/YYYY HH:mm]

⚠️ *CRITICAL / PANIC VALUES DETECTED:*
• *[Parameter, e.g. Potassium K⁺]:* [Value, e.g. 6.4 mmol/L] (🚨 CRITICAL HIGH)
  ↳ _Physiological Risk:_ Severe cardiac arrhythmia, VFib, Asystole risk.
  ↳ _Immediate Action Taken:_ Continuous cardiac monitoring, 12-lead ECG performed, standby IV Calcium Gluconate.

📊 *Accompanying Key Vitals & Observations:*
• BP: [___/___] mmHg · HR: [___] bpm · SpO₂: [___]% on [RA / O₂ ___L] · Temp: [___]°C · GCS: [___/15]

👩‍⚕️ *Nurse SBAR Recommendation:*
Requesting urgent doctor review and verbal treatment directives (e.g. IV replacement, urgent repeat sampling, or acute transfer).`;
    navigator.clipboard.writeText(template);
    setSbarCopied(true);
    setTimeout(() => setSbarCopied(false), 3000);
  };

  const panels = selectedLabPanel === 'all'
    ? LAB_PANELS
    : LAB_PANELS.filter(p => p.id === selectedLabPanel);

  const filteredPanels = panels.map(panel => {
    const matchingParams = panel.params.filter(param => {
      if (!labSearch) return true;
      const q = labSearch.toLowerCase();
      return (
        param.name.toLowerCase().includes(q) ||
        param.key.toLowerCase().includes(q) ||
        (param.unit && param.unit.toLowerCase().includes(q)) ||
        (param.panicAdviceLow && param.panicAdviceLow.toLowerCase().includes(q)) ||
        (param.panicAdviceHigh && param.panicAdviceHigh.toLowerCase().includes(q))
      );
    });
    return { ...panel, matchingParams };
  }).filter(p => p.matchingParams.length > 0);

  return (
    <div>
      {/* Critical Action Banner */}
      <div style={{ background: '#fef2f2', border: '2px solid #ef4444', borderRadius: '10px', padding: '14px 16px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, color: '#991b1b', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              🚨 Mandatory Clinical Lab Panic Value Protocol (危急值标准化处置程序)
            </h3>
            <div style={{ fontSize: '0.82rem', color: '#7f1d1d', marginTop: '4px', lineHeight: 1.4 }}>
              Any lab value meeting <b>PANIC / CRITICAL thresholds</b> represents an imminent physiological life threat. Adhere strictly to the 5-step nursing safety protocol.
            </div>
          </div>

          <button
            type="button"
            onClick={copySbarTemplate}
            style={{
              background: '#b91c1c',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 14px',
              fontWeight: 800,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {sbarCopied ? '✓ SBAR Template Copied!' : '📋 Copy SBAR Doctor Template'}
          </button>
        </div>

        {/* 5-Step Flowchart */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px', marginTop: '12px' }}>
          <div style={{ background: '#fff', border: '1px solid #fca5a5', borderRadius: '6px', padding: '8px 10px', fontSize: '0.78rem' }}>
            <b style={{ color: '#b91c1c' }}>1. Verbal Read-Back</b>
            <div style={{ color: '#475569', marginTop: '2px' }}>Repeat test result &amp; patient ID back to laboratory technician to eliminate clerical error.</div>
          </div>
          <div style={{ background: '#fff', border: '1px solid #fca5a5', borderRadius: '6px', padding: '8px 10px', fontSize: '0.78rem' }}>
            <b style={{ color: '#b91c1c' }}>2. Rule Out Pre-Analytical</b>
            <div style={{ color: '#475569', marginTop: '2px' }}>Verify sample was NOT taken above IV drip line (dilution) or hemolyzed (false high K+).</div>
          </div>
          <div style={{ background: '#fff', border: '1px solid #fca5a5', borderRadius: '6px', padding: '8px 10px', fontSize: '0.78rem' }}>
            <b style={{ color: '#b91c1c' }}>3. 15-Min SBAR Escalation</b>
            <div style={{ color: '#475569', marginTop: '2px' }}>Call attending Medical Officer/Consultant within 15 mins. Use SBAR format. Document time &amp; doctor name.</div>
          </div>
          <div style={{ background: '#fff', border: '1px solid #fca5a5', borderRadius: '6px', padding: '8px 10px', fontSize: '0.78rem' }}>
            <b style={{ color: '#b91c1c' }}>4. Bedside Intervention</b>
            <div style={{ color: '#475569', marginTop: '2px' }}>Stat 12-lead ECG (K+ &gt;6.0), Oxygen titrate (PaO2 &lt;60), Crossmatch (Hb &lt;7.0), Sepsis Six (Lactate &gt;4.0).</div>
          </div>
          <div style={{ background: '#fff', border: '1px solid #fca5a5', borderRadius: '6px', padding: '8px 10px', fontSize: '0.78rem' }}>
            <b style={{ color: '#b91c1c' }}>5. Post-Treatment Re-test</b>
            <div style={{ color: '#475569', marginTop: '2px' }}>Perform repeat serial blood test within 2–4 hours post-treatment to confirm stabilization.</div>
          </div>
        </div>
      </div>

      {/* Search & Panel Selector Bar */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '14px' }}>
        <input
          type="search"
          value={labSearch}
          onChange={(e) => setLabSearch(e.target.value)}
          placeholder="🔍 Search lab parameter (e.g. Potassium, Lactate, Troponin, ABG, Hb, INR, Creatinine)..."
          style={{ flex: 1, minWidth: '240px', padding: '8px 12px', fontSize: '0.86rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
        />
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className={`xs ${selectedLabPanel === 'all' ? 'pri' : 'ghost'}`}
            onClick={() => setSelectedLabPanel('all')}
            style={{ fontWeight: 700 }}
          >
            All Panels
          </button>
          {LAB_PANELS.map(p => (
            <button
              key={p.id}
              type="button"
              className={`xs ${selectedLabPanel === p.id ? 'pri' : 'ghost'}`}
              onClick={() => setSelectedLabPanel(p.id)}
              style={{ fontWeight: 700 }}
            >
              {p.shortName}
            </button>
          ))}
        </div>
      </div>

      {/* Panels Tables */}
      {filteredPanels.map(panel => (
        <div key={panel.id} style={{ background: '#fff', border: '1.5px solid #cbd5e1', borderRadius: '10px', padding: '14px', marginBottom: '14px' }}>
          <h4 style={{ margin: '0 0 10px', color: 'var(--navy)', fontSize: '0.95rem', borderBottom: '1.5px solid #f1f5f9', paddingBottom: '6px' }}>
            {panel.name}
          </h4>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ background: '#0f2b48', color: '#fff', textAlign: 'left' }}>
                  <th style={{ padding: '8px 10px', borderRight: '1px solid #1e40af', width: '220px' }}>Parameter (指标)</th>
                  <th style={{ padding: '8px 8px', borderRight: '1px solid #1e40af', width: '70px', textAlign: 'center' }}>Unit</th>
                  <th style={{ padding: '8px 10px', borderRight: '1px solid #1e40af', width: '130px', textAlign: 'center' }}>Normal Range</th>
                  <th style={{ padding: '8px 10px', borderRight: '1px solid #1e40af', width: '150px', textAlign: 'center', background: '#991b1b' }}>🚨 Panic Threshold</th>
                  <th style={{ padding: '8px 10px' }}>Action Directive &amp; Clinical Management</th>
                </tr>
              </thead>
              <tbody>
                {panel.matchingParams.map((param, idx) => (
                  <tr key={param.key} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#fff' : '#f8fafc' }}>
                    <td style={{ padding: '8px 10px', fontWeight: 700, color: 'var(--navy)', borderRight: '1px solid #e2e8f0' }}>
                      {param.name}
                    </td>
                    <td style={{ padding: '8px 6px', textAlign: 'center', color: '#64748b', fontSize: '0.75rem', borderRight: '1px solid #e2e8f0' }}>
                      {param.unit || '—'}
                    </td>
                    <td style={{ padding: '8px 8px', textAlign: 'center', color: '#166534', fontWeight: 700, borderRight: '1px solid #e2e8f0', background: '#f0fdf4' }}>
                      {param.min != null ? param.min : '—'} – {param.max != null ? param.max : '—'}
                    </td>
                    <td style={{ padding: '8px 8px', textAlign: 'center', color: '#b91c1c', fontWeight: 800, borderRight: '1px solid #e2e8f0', background: '#fef2f2' }}>
                      {param.critLow != null && <div>&lt; {param.critLow} {param.unit}</div>}
                      {param.critHigh != null && <div>&gt; {param.critHigh} {param.unit}</div>}
                      {param.critLow == null && param.critHigh == null && <span>—</span>}
                    </td>
                    <td style={{ padding: '8px 10px', fontSize: '0.78rem', color: '#334155' }}>
                      {param.panicAdviceHigh && (
                        <div style={{ marginBottom: param.panicAdviceLow ? '4px' : '0' }}>
                          <b style={{ color: '#b91c1c' }}>High Panic Action:</b> {param.panicAdviceHigh}
                        </div>
                      )}
                      {param.panicAdviceLow && (
                        <div>
                          <b style={{ color: '#b91c1c' }}>Low Panic Action:</b> {param.panicAdviceLow}
                        </div>
                      )}
                      {!param.panicAdviceHigh && !param.panicAdviceLow && (
                        <span style={{ color: '#64748b' }}>Notify attending physician for interpretation and care plan adjustment.</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
