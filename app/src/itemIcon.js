// Picture for every catalogue item, so staff recognise it at a glance.
// A staff-taken photo always wins; otherwise we draw a matching icon based on
// the item name, then its category. Pure SVG — works offline, no downloads.

const N = '#0C3054';   // navy
const B = '#186084';   // steel blue
const A = '#F6B042';   // amber accent
const W = '#ffffff';
const G = '#c9d6e2';

const svg = (inner) =>
  `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${inner}</svg>`;

const ICONS = {
  dressing: svg(`<rect x="7" y="13" width="34" height="22" rx="3" fill="${W}" stroke="${N}" stroke-width="2"/>
    <rect x="17" y="19" width="14" height="10" rx="1.5" fill="${G}" stroke="${B}" stroke-width="1.5"/>
    <path d="M11 17v14M37 17v14" stroke="${B}" stroke-width="1.5" stroke-linecap="round"/>`),

  gauze: svg(`<rect x="9" y="9" width="30" height="30" rx="2" fill="${W}" stroke="${N}" stroke-width="2"/>
    <path d="M16 9v30M24 9v30M32 9v30M9 16h30M9 24h30M9 32h30" stroke="${G}" stroke-width="1.4"/>`),

  bandage: svg(`<path d="M10 30c0-8 6-14 14-14s14 6 14 14" fill="none" stroke="${N}" stroke-width="2"/>
    <rect x="8" y="28" width="32" height="11" rx="3" fill="${W}" stroke="${N}" stroke-width="2"/>
    <path d="M16 28v11M24 28v11M32 28v11" stroke="${G}" stroke-width="1.6"/>`),

  tape: svg(`<circle cx="24" cy="24" r="14" fill="${W}" stroke="${N}" stroke-width="2"/>
    <circle cx="24" cy="24" r="6" fill="none" stroke="${B}" stroke-width="2"/>
    <path d="M38 24h6" stroke="${A}" stroke-width="3" stroke-linecap="round"/>`),

  bottle: svg(`<path d="M20 8h8v6l4 5v21a2 2 0 0 1-2 2H18a2 2 0 0 1-2-2V19l4-5z"
      fill="${W}" stroke="${N}" stroke-width="2"/>
    <rect x="16" y="26" width="16" height="12" fill="${B}" opacity=".25"/>
    <rect x="19" y="6" width="10" height="4" rx="1" fill="${N}"/>`),

  tube: svg(`<path d="M18 10h12v4H18z" fill="${N}"/>
    <path d="M17 14h14v24a2 2 0 0 1-2 2H19a2 2 0 0 1-2-2z" fill="${W}" stroke="${N}" stroke-width="2"/>
    <path d="M21 20h6" stroke="${B}" stroke-width="2" stroke-linecap="round"/>`),

  syringe: svg(`<path d="M8 40l6-6" stroke="${N}" stroke-width="2" stroke-linecap="round"/>
    <rect x="14" y="16" width="20" height="12" rx="1.5" transform="rotate(45 24 22)"
      fill="${W}" stroke="${N}" stroke-width="2"/>
    <path d="M30 12l6 6" stroke="${B}" stroke-width="3" stroke-linecap="round"/>
    <path d="M36 6l6 6" stroke="${N}" stroke-width="2" stroke-linecap="round"/>`),

  needle: svg(`<path d="M10 38L26 22" stroke="${N}" stroke-width="2" stroke-linecap="round"/>
    <rect x="24" y="12" width="12" height="8" rx="2" transform="rotate(45 30 16)" fill="${B}"/>
    <circle cx="10" cy="38" r="2" fill="${A}"/>`),

  drip: svg(`<rect x="16" y="6" width="16" height="18" rx="2" fill="${W}" stroke="${N}" stroke-width="2"/>
    <path d="M16 16h16v6a2 2 0 0 1-2 2H18a2 2 0 0 1-2-2z" fill="${B}" opacity=".3"/>
    <path d="M24 24v10" stroke="${N}" stroke-width="2"/>
    <circle cx="24" cy="38" r="3.5" fill="${B}"/>`),

  cannula: svg(`<rect x="10" y="20" width="20" height="8" rx="2" fill="${W}" stroke="${N}" stroke-width="2"/>
    <path d="M30 24h10" stroke="${B}" stroke-width="3" stroke-linecap="round"/>
    <path d="M14 20v-5M20 20v-5" stroke="${A}" stroke-width="2.5" stroke-linecap="round"/>`),

  catheter: svg(`<path d="M12 36c10 0 6-20 16-20 6 0 8 4 8 8" fill="none" stroke="${N}"
      stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="12" cy="36" r="4" fill="${A}"/>
    <circle cx="36" cy="24" r="3" fill="${B}"/>`),

  bag: svg(`<path d="M16 10h16l-2 8v18a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V18z"
      fill="${W}" stroke="${N}" stroke-width="2"/>
    <path d="M16 26h16v10a3 3 0 0 1-3 3h-10a3 3 0 0 1-3-3z" fill="${A}" opacity=".35"/>
    <path d="M22 41v3M26 41v3" stroke="${N}" stroke-width="2" stroke-linecap="round"/>`),

  feeding: svg(`<path d="M14 8c0 12 20 8 20 20 0 8-6 12-6 12" fill="none" stroke="${N}"
      stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="14" cy="8" r="3" fill="${B}"/>
    <rect x="24" y="38" width="8" height="4" rx="1" fill="${A}"/>`),

  formula: svg(`<rect x="14" y="12" width="20" height="28" rx="2" fill="${W}" stroke="${N}" stroke-width="2"/>
    <rect x="12" y="8" width="24" height="5" rx="1.5" fill="${N}"/>
    <rect x="18" y="22" width="12" height="10" rx="1" fill="${A}" opacity=".5"/>`),

  glove: svg(`<path d="M14 40V22c0-2 3-2 3 0v-6c0-2 3-2 3 0v-4c0-2 3-2 3 0v4c0-2 3-2 3 0v6c0-2 3-2 3 0v18z"
      fill="${W}" stroke="${N}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M14 34h20" stroke="${B}" stroke-width="1.6"/>`),

  mask: svg(`<path d="M10 18c8-3 20-3 28 0v10c0 6-6 10-14 10s-14-4-14-10z"
      fill="${W}" stroke="${N}" stroke-width="2"/>
    <path d="M10 22h28M10 27h28" stroke="${G}" stroke-width="1.6"/>
    <path d="M10 19L4 15M38 19l6-4" stroke="${B}" stroke-width="2" stroke-linecap="round"/>`),

  gown: svg(`<path d="M18 8l6 4 6-4 8 6-4 6v20H14V24l-4-6z" fill="${W}" stroke="${N}" stroke-width="2"
      stroke-linejoin="round"/><path d="M24 12v28" stroke="${G}" stroke-width="1.6"/>`),

  diaper: svg(`<path d="M8 14h32c0 14-6 24-16 26C14 38 8 28 8 14z" fill="${W}" stroke="${N}" stroke-width="2"/>
    <path d="M8 20h32" stroke="${B}" stroke-width="1.6"/>
    <circle cx="18" cy="27" r="1.6" fill="${A}"/><circle cx="24" cy="29" r="1.6" fill="${A}"/>
    <circle cx="30" cy="27" r="1.6" fill="${A}"/>`),

  pad: svg(`<rect x="7" y="14" width="34" height="22" rx="3" fill="${W}" stroke="${N}" stroke-width="2"/>
    <path d="M7 22h34M7 28h34" stroke="${G}" stroke-width="1.5"/>
    <path d="M15 14v22M33 14v22" stroke="${G}" stroke-width="1.5"/>`),

  wipes: svg(`<rect x="9" y="16" width="30" height="20" rx="4" fill="${W}" stroke="${N}" stroke-width="2"/>
    <path d="M20 16c0-4 8-4 8 0" fill="none" stroke="${B}" stroke-width="2"/>
    <path d="M21 12c2-3 6-3 7 1" fill="none" stroke="${G}" stroke-width="2"/>`),

  oxygen: svg(`<path d="M24 8c-5 0-9 4-9 9v6h6v-6a3 3 0 0 1 6 0v6h6v-6c0-5-4-9-9-9z" fill="${B}"/>
    <path d="M14 24h20v12a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4z" fill="${W}" stroke="${N}" stroke-width="2"/>
    <path d="M20 30h8" stroke="${B}" stroke-width="2" stroke-linecap="round"/>`),

  suction: svg(`<path d="M10 38c14 0 8-24 22-24" fill="none" stroke="${N}" stroke-width="2.5"
      stroke-linecap="round"/>
    <path d="M28 10h10v8H28z" fill="${W}" stroke="${N}" stroke-width="2"/>
    <circle cx="10" cy="38" r="3.5" fill="${B}"/>`),

  monitor: svg(`<rect x="8" y="12" width="32" height="24" rx="3" fill="${W}" stroke="${N}" stroke-width="2"/>
    <path d="M12 26h6l3-7 4 12 3-5h8" fill="none" stroke="${A}" stroke-width="2.2"
      stroke-linecap="round" stroke-linejoin="round"/>`),

  glucose: svg(`<rect x="14" y="8" width="20" height="32" rx="3" fill="${W}" stroke="${N}" stroke-width="2"/>
    <rect x="18" y="13" width="12" height="8" rx="1" fill="${B}" opacity=".3"/>
    <circle cx="20" cy="28" r="2" fill="${N}"/><circle cx="28" cy="28" r="2" fill="${N}"/>
    <circle cx="20" cy="34" r="2" fill="${N}"/><circle cx="28" cy="34" r="2" fill="${A}"/>`),

  thermometer: svg(`<path d="M22 8a3 3 0 0 1 6 0v20a6 6 0 1 1-6 0z" fill="${W}" stroke="${N}" stroke-width="2"/>
    <circle cx="25" cy="34" r="4" fill="${A}"/><path d="M25 20v12" stroke="${A}" stroke-width="2.5"/>`),

  bp: svg(`<rect x="8" y="16" width="20" height="16" rx="3" fill="${W}" stroke="${N}" stroke-width="2"/>
    <path d="M28 24h4a6 6 0 0 1 6 6v4" fill="none" stroke="${B}" stroke-width="2"/>
    <circle cx="38" cy="36" r="4" fill="${A}"/>`),

  bed: svg(`<path d="M6 34V16M42 34V24" stroke="${N}" stroke-width="2.5" stroke-linecap="round"/>
    <rect x="6" y="24" width="36" height="8" rx="2" fill="${W}" stroke="${N}" stroke-width="2"/>
    <rect x="10" y="19" width="10" height="6" rx="2" fill="${B}" opacity=".4"/>`),

  wheelchair: svg(`<circle cx="20" cy="34" r="9" fill="none" stroke="${N}" stroke-width="2.5"/>
    <circle cx="20" cy="34" r="2" fill="${N}"/>
    <path d="M20 24V14h8" stroke="${B}" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    <circle cx="20" cy="11" r="3.5" fill="${A}"/><path d="M29 34h8" stroke="${N}" stroke-width="2.5"
      stroke-linecap="round"/>`),

  stoma: svg(`<circle cx="24" cy="18" r="8" fill="${W}" stroke="${N}" stroke-width="2"/>
    <circle cx="24" cy="18" r="3" fill="${A}"/>
    <path d="M17 24l-2 14a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3l-2-14" fill="${W}" stroke="${N}" stroke-width="2"/>`),

  set: svg(`<rect x="7" y="15" width="34" height="20" rx="3" fill="${W}" stroke="${N}" stroke-width="2"/>
    <path d="M7 22h34" stroke="${N}" stroke-width="1.6"/>
    <rect x="20" y="11" width="8" height="5" rx="1.5" fill="${B}"/>
    <path d="M14 28h8M28 28h6" stroke="${G}" stroke-width="2" stroke-linecap="round"/>`),

  scissors: svg(`<circle cx="14" cy="36" r="4" fill="none" stroke="${N}" stroke-width="2"/>
    <circle cx="28" cy="36" r="4" fill="none" stroke="${N}" stroke-width="2"/>
    <path d="M16 33L34 10M26 33L8 10" stroke="${B}" stroke-width="2" stroke-linecap="round"/>`),

  pill: svg(`<rect x="10" y="20" width="28" height="12" rx="6" fill="${W}" stroke="${N}" stroke-width="2"
      transform="rotate(-30 24 26)"/>
    <path d="M19 31l10-10" stroke="${N}" stroke-width="2"/>`),


  forceps: svg(`<path d="M18 6c-2 10-3 20-3 30l-3 6" stroke="${N}" stroke-width="2.2" fill="none"
      stroke-linecap="round"/>
    <path d="M30 6c2 10 3 20 3 30l3 6" stroke="${N}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <path d="M20 16h8" stroke="${B}" stroke-width="2" stroke-linecap="round"/>
    <circle cx="24" cy="9" r="3" fill="${A}"/>`),

  scalpel: svg(`<path d="M8 38l14-6 4 4-14 6z" fill="${N}"/>
    <path d="M22 32l12-20 6 4-14 20z" fill="${W}" stroke="${N}" stroke-width="2" stroke-linejoin="round"/>`),

  tray: svg(`<path d="M6 18h36v4a12 12 0 0 1-12 12H18A12 12 0 0 1 6 22z" fill="${W}" stroke="${N}"
      stroke-width="2"/><path d="M6 22h36" stroke="${G}" stroke-width="1.6"/>
    <rect x="16" y="10" width="16" height="5" rx="1.5" fill="${B}" opacity=".5"/>`),

  trolley: svg(`<rect x="8" y="10" width="32" height="5" rx="1.5" fill="${W}" stroke="${N}" stroke-width="2"/>
    <rect x="8" y="24" width="32" height="5" rx="1.5" fill="${W}" stroke="${N}" stroke-width="2"/>
    <path d="M12 15v9M36 15v9M12 29v6M36 29v6" stroke="${N}" stroke-width="2"/>
    <circle cx="12" cy="38" r="3" fill="${B}"/><circle cx="36" cy="38" r="3" fill="${B}"/>`),

  pump: svg(`<rect x="9" y="12" width="30" height="24" rx="3" fill="${W}" stroke="${N}" stroke-width="2"/>
    <rect x="13" y="16" width="22" height="9" rx="1.5" fill="${B}" opacity=".3"/>
    <circle cx="17" cy="31" r="2.2" fill="${A}"/><circle cx="24" cy="31" r="2.2" fill="${N}"/>
    <circle cx="31" cy="31" r="2.2" fill="${N}"/>`),

  machine: svg(`<rect x="8" y="10" width="32" height="22" rx="3" fill="${W}" stroke="${N}" stroke-width="2"/>
    <rect x="12" y="14" width="24" height="10" rx="1.5" fill="${B}" opacity=".3"/>
    <path d="M18 32v6M30 32v6" stroke="${N}" stroke-width="2"/>
    <circle cx="18" cy="40" r="2.5" fill="${B}"/><circle cx="30" cy="40" r="2.5" fill="${B}"/>`),

  ambubag: svg(`<ellipse cx="26" cy="26" rx="12" ry="9" fill="${W}" stroke="${N}" stroke-width="2"/>
    <path d="M14 26H8l-4-5v10l4-5" fill="${B}"/>
    <path d="M38 26h4" stroke="${N}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M20 26h12" stroke="${G}" stroke-width="1.6"/>`),

  steriliser: svg(`<rect x="8" y="14" width="32" height="22" rx="3" fill="${W}" stroke="${N}" stroke-width="2"/>
    <circle cx="24" cy="25" r="7" fill="none" stroke="${B}" stroke-width="2"/>
    <circle cx="24" cy="25" r="2.5" fill="${A}"/>
    <path d="M14 10v4M24 8v6M34 10v4" stroke="${B}" stroke-width="2" stroke-linecap="round"/>`),


  tablet: svg(`<circle cx="17" cy="24" r="9" fill="${W}" stroke="${N}" stroke-width="2"/>
    <path d="M11 24h12" stroke="${N}" stroke-width="1.8"/>
    <circle cx="33" cy="30" r="7" fill="${A}" opacity=".55" stroke="${N}" stroke-width="1.8"/>`),

  capsule: svg(`<rect x="9" y="18" width="30" height="13" rx="6.5" fill="${W}" stroke="${N}" stroke-width="2"
      transform="rotate(-20 24 24)"/>
    <path d="M24 14.5a6.5 6.5 0 0 0 0 0" fill="none"/>
    <path d="M17.5 28.5l13-4.7" stroke="${N}" stroke-width="1.8"/>
    <path d="M9.6 22.4a6.5 6.5 0 0 1 8.6-3.9l2.3 6.1-8.6 3.1a6.5 6.5 0 0 1-2.3-5.3z" fill="${B}" opacity=".45"/>`),

  syrup: svg(`<rect x="17" y="6" width="10" height="5" rx="1.5" fill="${N}"/>
    <path d="M15 11h14l3 6v21a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V17z" fill="${W}" stroke="${N}" stroke-width="2"/>
    <path d="M12 26h20v12a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2z" fill="${A}" opacity=".45"/>
    <path d="M34 30h8v8h-8z" fill="none" stroke="${B}" stroke-width="1.8"/>`),

  ampoule: svg(`<path d="M21 4l3 5v6h-4V9z" fill="${B}"/>
    <path d="M18 15h9v22a3 3 0 0 1-3 3h-3a3 3 0 0 1-3-3z" fill="${W}" stroke="${N}" stroke-width="2"/>
    <path d="M18 26h9v11a3 3 0 0 1-3 3h-3a3 3 0 0 1-3-3z" fill="${B}" opacity=".3"/>
    <path d="M16 20h13" stroke="${N}" stroke-width="1.6"/>`),

  vial: svg(`<rect x="16" y="6" width="14" height="4" rx="1" fill="${B}"/>
    <path d="M17 10h12v26a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3z" fill="${W}" stroke="${N}" stroke-width="2"/>
    <path d="M17 24h12v12a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3z" fill="${A}" opacity=".4"/>`),

  inhaler: svg(`<rect x="18" y="6" width="12" height="14" rx="2" fill="${B}" opacity=".5" stroke="${N}"
      stroke-width="1.8"/>
    <path d="M15 20h18v14a4 4 0 0 1-4 4H19a4 4 0 0 1-4-4z" fill="${W}" stroke="${N}" stroke-width="2"/>
    <path d="M33 26h7" stroke="${A}" stroke-width="2.5" stroke-linecap="round"/>`),

  drops: svg(`<path d="M19 8h10v7l3 4v18a3 3 0 0 1-3 3H19a3 3 0 0 1-3-3V19l3-4z" fill="${W}"
      stroke="${N}" stroke-width="2"/>
    <path d="M16 28h16v9a3 3 0 0 1-3 3H19a3 3 0 0 1-3-3z" fill="${B}" opacity=".3"/>
    <path d="M24 4c0 3 2 3 2 5a2 2 0 0 1-4 0c0-2 2-2 2-5z" fill="${B}"/>`),

  patch: svg(`<rect x="10" y="14" width="28" height="20" rx="4" fill="${W}" stroke="${N}" stroke-width="2"/>
    <rect x="17" y="19" width="14" height="10" rx="2" fill="${A}" opacity=".5"/>
    <path d="M10 20h28M10 28h28" stroke="${G}" stroke-width="1.3"/>`),

  insulinpen: svg(`<rect x="6" y="20" width="24" height="9" rx="2" fill="${W}" stroke="${N}" stroke-width="2"/>
    <rect x="30" y="21.5" width="8" height="6" rx="1.5" fill="${B}"/>
    <path d="M38 24.5h6" stroke="${N}" stroke-width="2" stroke-linecap="round"/>
    <path d="M12 20v9M18 20v9" stroke="${G}" stroke-width="1.5"/>`),

  suppository: svg(`<path d="M24 8c6 6 8 12 8 18a8 8 0 0 1-16 0c0-6 2-12 8-18z" fill="${W}"
      stroke="${N}" stroke-width="2"/>
    <path d="M16 28a8 8 0 0 0 16 0z" fill="${A}" opacity=".45"/>`),

  box: svg(`<path d="M8 18l16-8 16 8-16 8z" fill="${B}" opacity=".35" stroke="${N}" stroke-width="2"
      stroke-linejoin="round"/>
    <path d="M8 18v14l16 8V26z" fill="${W}" stroke="${N}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M40 18v14l-16 8V26z" fill="${W}" stroke="${N}" stroke-width="2" stroke-linejoin="round"/>`),
};

// name keyword -> icon  (checked first, most specific wins)
const BY_NAME = [
  [/insulin pen|insulin.*pen|胰岛素笔/i, 'insulinpen'],
  [/insulin|胰岛素/i, 'vial'],
  [/inhaler|spacer|aerochamber|吸入剂|储雾罐/i, 'inhaler'],
  [/nebule|雾化液/i, 'ampoule'],
  [/eye drop|ear |nasal spray|eye wash|tears|眼药水|洗眼|鼻喷|耳/i, 'drops'],
  [/patch|贴片/i, 'patch'],
  [/suppositor|enema|塞剂|灌肠/i, 'suppository'],
  [/ampoule|injection|inj |针$|注射/i, 'ampoule'],
  [/syrup|suspension|solution.*ml|lotion|糖浆|洗剂|口服液/i, 'syrup'],
  [/\bcap\b|capsule|胶囊/i, 'capsule'],
  [/\btab\b|tablet|片$/i, 'tablet'],
  [/ambu|bvm|resuscitat|pocket mask|airway|简易呼吸|通气道/i, 'ambubag'],
  [/forceps|镊|止血钳|持针器|持物钳/i, 'forceps'],
  [/scalpel|blade|刀片|刀柄/i, 'scalpel'],
  [/trolley|换药车/i, 'trolley'],
  [/tray|gallipot|kidney dish|器械盘|药杯|弯盘/i, 'tray'],
  [/pump|泵/i, 'pump'],
  [/autoclave|sterilis|steriliz|消毒袋|指示胶带/i, 'steriliser'],
  [/machine|concentrator|monitor|scanner|doppler|ecg|cpap|bipap|tens|scale|仪|机|秤/i, 'machine'],
  [/gel|cream|paste|ointment|凝胶|膏/i, 'tube'],
  [/syringe|针筒/i, 'syringe'],
  [/needle|lancet|针头|采血针/i, 'needle'],
  [/cannula|留置针/i, 'cannula'],
  [/giving set|burette|extension|stopcock|三通|延长管|输液器/i, 'drip'],
  [/saline|dextroze|dextrose|hartmann|ringer|点滴/i, 'drip'],
  [/catheter|尿管|导尿/i, 'catheter'],
  [/urine bag|leg bag|drainage bag|尿袋|腿袋|引流袋/i, 'bag'],
  [/colostomy|stoma|造口/i, 'stoma'],
  [/ryle|ng tube|peg|feeding|喂食|鼻胃管/i, 'feeding'],
  [/ensure|glucerna|nepro|peptamen|nutren|fresubin|pediasure|formula|thicken|奶粉|配方/i, 'formula'],
  [/glove|手套/i, 'glove'],
  [/mask|respirator|口罩|面罩/i, 'mask'],
  [/gown|apron|围裙|隔离衣/i, 'gown'],
  [/diaper|pull-up|pants|纸尿裤|拉拉裤/i, 'diaper'],
  [/underpad|看护垫/i, 'pad'],
  [/wipe|湿纸巾/i, 'wipes'],
  [/oxygen tank|oxygen cylinder|oxygen concentrator|oxygen mask|nasal cannula|non-rebreather|venturi|nebuli|humidifier|hme|氧气|雾化|人工鼻/i, 'oxygen'],
  [/suction|trache|抽痰|气切/i, 'suction'],
  [/glucose|glucometer|血糖/i, 'glucose'],
  [/thermometer|体温/i, 'thermometer'],
  [/bp monitor|blood pressure|oximeter|血压|血氧/i, 'bp'],
  [/scissor|forcep|剪刀|镊子/i, 'scissors'],
  [/tape|micropore|durapore|transpore|胶带/i, 'tape'],
  [/bandage|crepe|tubigrip|coban|绷带|三角巾/i, 'bandage'],
  [/gauze|swab|cotton|纱布|棉/i, 'gauze'],
  [/dressing|tulle|mepilex|allevyn|duoderm|aquacel|tegaderm|opsite|敷料|油纱/i, 'dressing'],
  [/solution|iodine|chlorhexidine|peroxide|sanitiser|disinfect|shampoo|foam bath|药水|消毒/i, 'bottle'],
  [/bed|mattress|床/i, 'bed'],
  [/wheelchair|commode|walking|hoist|frame|轮椅|助行|便椅/i, 'wheelchair'],
  [/pill|medication|药/i, 'pill'],
  [/set|pack|kit|包/i, 'set'],
  [/monitor|chart|record|记录/i, 'monitor'],
];

// category -> fallback icon
const BY_CAT = [
  [/DRESSING/i, 'dressing'], [/CLEANSING|ANTISEPTIC/i, 'bottle'], [/BANDAGE|TAPE/i, 'bandage'],
  [/URINARY|CATHETER/i, 'catheter'], [/STOMA|DRAINAGE/i, 'stoma'], [/FEEDING|ENTERAL/i, 'feeding'],
  [/NUTRITION|FORMULA/i, 'formula'], [/IV|INJECTION/i, 'syringe'], [/RESPIRATORY|OXYGEN/i, 'oxygen'],
  [/PPE|INFECTION/i, 'glove'], [/PERSONAL CARE|CONTINENCE/i, 'diaper'],
  [/DIAGNOSTIC|MONITORING/i, 'monitor'],
  [/MEDICATION - EMERGENCY|PALLIATIVE/i, 'ampoule'],
  [/MEDICATION - VITAMIN/i, 'tablet'],
  [/MEDICATION - TOPICAL/i, 'tube'],
  [/MEDICATION - EYE/i, 'drops'],
  [/MEDICATION - RESPIRATORY/i, 'inhaler'],
  [/MEDICATION/i, 'tablet'],
  [/INSTRUMENT/i, 'forceps'], [/DEVICE/i, 'machine'],
  [/EMERGENCY|RESUSCITATION/i, 'ambubag'], [/MOBILITY|EQUIPMENT/i, 'wheelchair'],
];

export function itemIcon(item) {
  const name = (item && item.name) || '';
  const size = (item && item.size) || '';
  // dose form is most reliably in the size field ("500mg cap", "200ml", "10mg tab")
  if (/\bcap\b|capsule/i.test(size)) return ICONS.capsule;
  if (/\btab\b|tablet/i.test(size)) return ICONS.tablet;
  if (/ampoule|\/ml|\/2ml|mg\/ml/i.test(size) && /inject|inj|ampoule/i.test(name)) return ICONS.ampoule;
  if (/^\d+ ?ml$/i.test(size.trim()) && /MEDICATION/i.test((item && item.category) || '')) return ICONS.syrup;
  for (const [re, key] of BY_NAME) if (re.test(name)) return ICONS[key];
  const cat = (item && item.category) || '';
  for (const [re, key] of BY_CAT) if (re.test(cat)) return ICONS[key];
  return ICONS.box;
}
