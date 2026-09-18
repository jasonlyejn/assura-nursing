/**
 * Assura Nursing - 100% Comprehensive Universal Multilingual Engine (i18n.js)
 * Languages: English (en), 简体中文 (zh), Bahasa Melayu (bm), தமிழ் (ta)
 * Dynamically translates all DOM text nodes, input placeholders, option elements & tabs.
 */

const STRING_MAP = {
  "Home": {
    "zh": "首页",
    "bm": "Utama",
    "ta": "முகப்பு"
  },
  "About Us": {
    "zh": "关于我们",
    "bm": "Tentang Kami",
    "ta": "எங்களை பற்றி"
  },
  "Services": {
    "zh": "护理项目",
    "bm": "Perkhidmatan",
    "ta": "சேவைகள்"
  },
  "Media": {
    "zh": "多媒体专区",
    "bm": "Media",
    "ta": "மீடியா"
  },
  "Announcements": {
    "zh": "官方公告",
    "bm": "Pengumuman",
    "ta": "அறிவிப்புகள்"
  },
  "Download Apps": {
    "zh": "下载应用",
    "bm": "Muat Turun",
    "ta": "செயலிகள்"
  },
  "Download App": {
    "zh": "下载应用",
    "bm": "Muat Turun",
    "ta": "செயலிகள்"
  },
  "Clinical Portal": {
    "zh": "临床医护系统",
    "bm": "Portal Klinikal",
    "ta": "மருத்துவ போர்டல்"
  },
  "Staff Login": {
    "zh": "医护登录",
    "bm": "Log Masuk Staf",
    "ta": "ஊழியர் உள்நுழைவு"
  },
  "Patient Portal": {
    "zh": "患者通道",
    "bm": "Portal Pesakit",
    "ta": "நோயாளி போர்டல்"
  },
  "Alerts": {
    "zh": "实时动态",
    "bm": "Makluman",
    "ta": "அறிவிப்புகள்"
  },
  "All Rights Reserved": {
    "zh": "版权所有",
    "bm": "Hak Cipta Terpelihara",
    "ta": "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை"
  },
  "Penang Island & Mainland": {
    "zh": "槟岛与威省全境服务",
    "bm": "Seluruh Pulau Pinang & Tanah Besar",
    "ta": "பினாங்கு முழுவதும்"
  },
  "Private Home Nursing & Healthcare Services · Trained Nurses & Dedicated Caregivers": {
    "zh": "专业私人家庭护理与上门医疗 · 注册护士与专业护理员团队",
    "bm": "Perkhidmatan Kejururawatan Rumah Peribadi & Penjagaan Kesihatan · Jururawat Terlatih & Penjaga Berdedikasi",
    "ta": "தனியார் வீட்டு நர்சிங் & சுகாதார சேவைகள் · பயிற்சி பெற்ற செவிலியர்கள் மற்றும் பராமரிப்பாளர்கள்"
  },
  "Live Alerts & News Bulletin": {
    "zh": "实时通知与健康动态中心",
    "bm": "Pusat Makluman & Berita Langsung",
    "ta": "நேரலை அறிவிப்புகள் & செய்தி புல்லட்டின்"
  },
  "Real-time updates on case statuses, nurse availability & clinical announcements.": {
    "zh": "即时接收个案状态更新、护士排班动态与官方重要医疗通告。",
    "bm": "Kemas kini status kes masa nyata, ketersediaan jururawat & pengumuman klinikal.",
    "ta": "வழக்கு நிலை, செவிலியர் இருப்பு மற்றும் மருத்துவ அறிவிப்புகள் பற்றிய நேரடி தகவல்கள்."
  },
  "Enable Web Push Notifications": {
    "zh": "开启网页推送通知",
    "bm": "Aktifkan Pemberitahuan Web Push",
    "ta": "புஷ் அறிவிப்புகளை இயக்கு"
  },
  "Check Case / Booking Status": {
    "zh": "查询我的预约/个案状态",
    "bm": "Semak Status Tempahan / Kes",
    "ta": "முன்பதிவு நிலையைச் சரிபார்க்கவும்"
  },
  "Enter booking phone number or ref...": {
    "zh": "请输入预约电话号码（例如 0123456789）...",
    "bm": "Masukkan nombor telefon tempahan...",
    "ta": "முன்பதிவு தொலைபேசி எண்ணை உள்ளிடவும்..."
  },
  "Lookup Status": {
    "zh": "立即查询",
    "bm": "Semak Status",
    "ta": "நிலையை சரிபார்க்கவும்"
  },
  "Close": {
    "zh": "关闭",
    "bm": "Tutup",
    "ta": "மூடு"
  },
  "Assura Nursing · 24/7 Professional Home Nursing Penang": {
    "zh": "Assura Nursing · 槟城24小时专业私人家庭护理",
    "bm": "Assura Nursing · Kejururawatan Rumah Profesional 24/7 Pulau Pinang",
    "ta": "Assura Nursing · 24/7 தொழில்முறை வீட்டு நர்சிங் பினாங்கு"
  },
  "Penang's 1st Digital & AI-Era Home Nursing · Transparent Fare Rates · Fast Staff Coordination": {
    "zh": "槟城首创数字化与AI时代家庭护理 · 透明收费标准 · 快速就近协调医护",
    "bm": "Kejururawatan Rumah Era Digital & AI Pertama di Pulau Pinang · Kadar Telus · Padanan Pantas",
    "ta": "பினாங்கின் முதல் டிஜிட்டல் & AI வீட்டு நர்சிங் · வெளிப்படையான கட்டணங்கள் · உடனடி செவிலியர் ஏற்பாடு"
  },
  "Professional Clinical Care, Tailored to Your Home": {
    "zh": "专业临床医护 · 量身定制家庭照护",
    "bm": "Penjagaan Klinikal Profesional, Disesuaikan di Rumah Anda",
    "ta": "உங்கள் இல்லத்திற்கே தொழில்முறை மருத்துவ நர்சிங் பராமரிப்பு"
  },
  "Trained nurses and dedicated caregivers delivering personalized care plans adapted to your home environment—ensuring professional handling to minimize infection risks while upholding patient safety, comfort, and dignity.": {
    "zh": "由受训护士与专业护理人员提供定制化照护方案，根据您的居家环境细致规划——严格遵循无菌操作以降低感染风险，全力守护患者的安全、舒适与尊严。",
    "bm": "Jururawat terlatih dan penjaga berdedikasi menyediakan pelan penjagaan peribadi yang disesuaikan dengan persekitaran rumah anda—memastikan pengendalian profesional bagi meminimumkan risiko jangkitan serta menjaga keselamatan pesakit.",
    "ta": "பயிற்சி பெற்ற செவிலியர்கள் மற்றும் அர்ப்பணிப்புள்ள பராமரிப்பாளர்கள் உங்கள் வீட்டு சூழலுக்கு ஏற்ப தனிப்பயனாக்கப்பட்ட சிகிச்சை திட்டங்களை வழங்குகிறார்கள்—தொற்று அபாயங்களைக் குறைத்து நோயாளியின் பாதுகாப்பு, ஆறுதல் மற்றும் கண்ணியத்தை உறுதி செய்கிறார்கள்."
  },
  "Chat on WhatsApp (012-206 4868)": {
    "zh": "WhatsApp 立即咨询 (012-206 4868)",
    "bm": "WhatsApp Sekarang (012-206 4868)",
    "ta": "WhatsApp மூலம் தொடர்பு (012-206 4868)"
  },
  "View Services & Fees": {
    "zh": "查看服务项目与收费",
    "bm": "Lihat Perkhidmatan & Kadar",
    "ta": "சேவைகள் & கட்டணங்களை காண்க"
  },
  "Emergency & GPS Guide": {
    "zh": "急诊导航与应急指引",
    "bm": "Panduan Kecemasan & GPS",
    "ta": "அவசர வழிகாட்டி & GPS"
  },
  "Spreading redness >2cm, intense heat, foul odor, cloudy discharge, or patient fever >38°C.": {
    "zh": "伤口周围红肿扩散>2cm、剧烈发热、异味恶臭、浑浊脓液或患者体温发热>38°C。",
    "bm": "Kemerahan merebak >2cm, rasa panas kuat, bau busuk, cairan keruh, atau demam pesakit >38°C.",
    "ta": "சிவத்தல் >2செ.மீ பரவுதல், அதிக வெப்பம், துர்நாற்றம், சீழ் வெளியேற்றம் அல்லது காய்ச்சல் >38°C."
  },
  "Spreading redness &gt;2cm, intense heat, foul odor, cloudy discharge, or patient fever &gt;38°C.": {
    "zh": "伤口周围红肿扩散>2cm、剧烈发热、异味恶臭、浑浊脓液或患者体温发热>38°C。",
    "bm": "Kemerahan merebak >2cm, rasa panas kuat, bau busuk, cairan keruh, atau demam pesakit >38°C.",
    "ta": "சிவத்தல் >2செ.மீ பரவுதல், அதிக வெப்பம், துர்நாற்றம், சீழ் வெளியேற்றம் அல்லது காய்ச்சல் >38°C."
  },
  "Wound Care & Dressing": {
    "zh": "伤口清创与换药",
    "bm": "Rawatan & Cuci Luka",
    "ta": "காயம் மற்றும் கட்டு போடுதல்"
  },
  "Elderly & Bedridden Care": {
    "zh": "长者与卧床照护",
    "bm": "Penjagaan Warga Emas & Terlantar",
    "ta": "முதியோர் & படுக்கை நோயாளி பராமரிப்பு"
  },
  "Stroke Rehab & Mobility": {
    "zh": "中风康复与肢体活动",
    "bm": "Pemulihan Strok & Mobiliti",
    "ta": "பக்கவாதம் மறுவாழ்வு & இயக்கம்"
  },
  "Ryle's Tube / NG Tube": {
    "zh": "鼻胃管置换与护理",
    "bm": "Tiub Ryle / Tiub NG",
    "ta": "ரைல்ஸ் குழாய் (NG Tube) பராமரிப்பு"
  },
  "Catheter (CBD) Care": {
    "zh": "导尿管置换与照护",
    "bm": "Penjagaan Kateter (CBD)",
    "ta": "சிறுநீர் குழாய் (Catheter) பராமரிப்பு"
  },
  "Injections & Blood Tests": {
    "zh": "遵医嘱注射与上门抽血",
    "bm": "Suntikan & Ujian Darah",
    "ta": "ஊசிகள் & வீட்டு இரத்த பரிசோதனை"
  },
  "Hospital Escort & Transfer": {
    "zh": "医院就诊陪同与护送",
    "bm": "Pengiring & Pemindahan Hospital",
    "ta": "மருத்துவமனை துணை & போக்குவரத்து"
  },
  "Medical Bed & Oxygen Rental": {
    "zh": "医疗床与制氧机租赁",
    "bm": "Sewa Katil Hospital & Oksigen",
    "ta": "மருத்துவ படுக்கை & ஆக்ஸிஜன் வாடகை"
  },
  "24/7 Hospital Emergency GPS": {
    "zh": "24小时医院急诊导航",
    "bm": "GPS Kecemasan Hospital 24 Jam",
    "ta": "24 மணி நேர அவசர GPS வழிகாட்டி"
  },
  "All Penang Areas Covered": {
    "zh": "覆盖槟岛与威省全境",
    "bm": "Meliputi Seluruh Pulau Pinang",
    "ta": "பினாங்கு முழுவதும் சேவை"
  },
  "Trained": {
    "zh": "专业受训",
    "bm": "Terlatih",
    "ta": "பயிற்சி பெற்ற"
  },
  "Nurses & Dedicated Caregivers": {
    "zh": "注册护士与爱心护理员",
    "bm": "Jururawat & Penjaga Berdedikasi",
    "ta": "செவிலியர்கள் & பராமரிப்பாளர்கள்"
  },
  "1st in Penang": {
    "zh": "槟城首创",
    "bm": "Pertama di Penang",
    "ta": "பினாங்கில் முதல்"
  },
  "Pioneering Digital & AI-Era Care": {
    "zh": "开创数字化与智能护理时代",
    "bm": "Menerajui Era Digital & AI",
    "ta": "டிஜிட்டல் & AI பராமரிப்பு"
  },
  "Fast Match": {
    "zh": "快速匹配",
    "bm": "Pantas",
    "ta": "விரைவான"
  },
  "Staff Coordination & ASAP Reply": {
    "zh": "就近安排医护·迅速回复",
    "bm": "Koordinasi Staf & Balasan Segera",
    "ta": "செவிலியர் ஒருங்கிணைப்பு"
  },
  "Transparent": {
    "zh": "清晰透明",
    "bm": "Telus",
    "ta": "வெளிப்படையான"
  },
  "Upfront Fare & Procedure Rates": {
    "zh": "公开透明收费标准",
    "bm": "Kadar Tambang & Rawatan Jelas",
    "ta": "நேர்மையான கட்டண விவரங்கள்"
  },
  "How It Works · 3 Simple Steps": {
    "zh": "服务流程 · 3个简单步骤",
    "bm": "Cara Ia Berfungsi · 3 Langkah Mudah",
    "ta": "சேவை செயல்முறை · 3 எளிய படிகள்"
  },
  "Getting Home Care for Your Loved One is Simple": {
    "zh": "为您挚爱的家人安排居家护理非常简单",
    "bm": "Mendapatkan Rawatan Rumah Adalah Sangat Mudah",
    "ta": "வீட்டு பராமரிப்பு பெறுவது மிகவும் எளிது"
  },
  "We handle everything from initial medical assessment to daily bedside nursing so your family can focus on recovery.": {
    "zh": "从初步病情评估到上门床边护理，我们为您妥善安排一切，让家人安心专注于康复。",
    "bm": "Kami menguruskan segalanya daripada penilaian perubatan awal hingga kejururawatan harian di rumah supaya keluarga anda dapat fokus pada pemulihan.",
    "ta": "ஆரம்ப மதிப்பீடு முதல் தினசரி படுக்கை பராமரிப்பு வரை அனைத்தையும் நாங்கள் கையாளுகிறோம்."
  },
  "1. Reach Out to Us": {
    "zh": "1. 联络我们",
    "bm": "1. Hubungi Kami",
    "ta": "1. எங்களை தொடர்பு கொள்ளுங்கள்"
  },
  "Contact our care hotline via WhatsApp or phone. Share your location and care needs—we immediately look for nearby available staff and get back to you ASAP.": {
    "zh": "通过 WhatsApp 或电话联系我们的护理团队。告知您的所在地点与护理需求——我们将立即协调附近的可用医护人员并尽快向您回复。",
    "bm": "Hubungi kami melalui WhatsApp atau telefon. Kongsi lokasi dan keperluan penjagaan—kami segera mencari staf berhampiran dan membalas secepat mungkin.",
    "ta": "WhatsApp அல்லது தொலைபேசி மூலம் அழைக்கவும். உங்கள் இருப்பிடம் மற்றும் தேவைகளைப் பகிரவும்—நாங்கள் உடனடியாக செவிலியரை ஏற்பாடு செய்கிறோம்."
  },
  "2. Free Clinical Plan": {
    "zh": "2. 制定照护方案",
    "bm": "2. Pelan Klinikal Percuma",
    "ta": "2. இலவச மருத்துவ திட்டம்"
  },
  "Our experienced nursing and care team formulates an individualized home recovery schedule, clinical supplies checklist, and visit timeline.": {
    "zh": "由经验丰富的医护团队为您制定专属居家康复计划、医疗耗材清单与上门时间表。",
    "bm": "Pasukan kejururawatan kami yang berpengalaman merangka jadual pemulihan rumah, senarai bekalan klinikal dan garis masa lawatan.",
    "ta": "எங்கள் அனுபவம் வாய்ந்த குழு தனிப்பயனாக்கப்பட்ட மறுவாழ்வு அட்டவணையை உருவாக்குகிறது."
  },
  "3. Nurse at Your Home": {
    "zh": "3. 护士准时上门",
    "bm": "3. Jururawat Tiba di Rumah",
    "ta": "3. செவிலியர் உங்கள் இல்லத்தில்"
  },
  "A trained nurse arrives punctually with clean clinical equipment, executing professional procedures to minimize infection risks while providing gentle bedside care and digital updates.": {
    "zh": "受训护士准时携带无菌专业器械上门，严格遵守规范操作以降低感染风险，提供贴心床边护理与数字化记录。",
    "bm": "Jururawat terlatih tiba tepat pada masanya dengan peralatan steril, melaksanakan prosedur profesional untuk meminimumkan risiko jangkitan.",
    "ta": "பயிற்சி பெற்ற செவிலியர் சரியான நேரத்தில் தூய்மையான உபகரணங்களுடன் வந்து தொழில்முறை சிகிச்சை அளிக்கிறார்."
  },
  "Our Services · Clinical Care Options": {
    "zh": "护理项目 · 临床服务选项",
    "bm": "Perkhidmatan Kami · Pilihan Penjagaan Klinikal",
    "ta": "எங்கள் சேவைகள் · மருத்துவ பராமரிப்பு விருப்பங்கள்"
  },
  "Personalized Home Nursing & Clinical Services": {
    "zh": "量身定制的家庭护理与上门临床服务",
    "bm": "Perkhidmatan Kejururawatan Rumah & Klinikal Peribadi",
    "ta": "தனிப்பயனாக்கப்பட்ட வீட்டு நர்சிங் & மருத்துவ சேவைகள்"
  },
  "Professionally planned around your home environment with trained staff handling to minimize infection risks and protect patient safety. Click any service to view rates and book instantly:": {
    "zh": "因地制宜规划家庭护理环境，由专业培训医护团队规范操作，严防感染风险，全力保障病患安全。点击任意服务即可查看透明收费并立即预约：",
    "bm": "Dirancang secara profesional mengikut persekitaran rumah anda dengan pengendalian kakitangan terlatih untuk meminimumkan risiko jangkitan dan melindungi keselamatan pesakit. Klik mana-mana perkhidmatan untuk melihat kadar dan menempah serta-merta:",
    "ta": "தொற்று அபாயங்களைக் குறைக்கவும் நோயாளியின் பாதுகாப்பைப் பாதுகாக்கவும் பயிற்சி பெற்ற ஊழியர்களின் கையாளுதலுடன் உங்கள் வீட்டுச் சூழலைச் சுற்றி தொழில் ரீதியாக திட்டமிடப்பட்டுள்ளது. கட்டணங்களைப் பார்க்கவும் உடனடியாக பதிவு செய்யவும் எந்த சேவையையும் கிளிக் செய்க:"
  },
  "Professional wound dressing for diabetic foot ulcers, surgical stitches/staples removal, and pressure sore management to minimize infection and accelerate healing.": {
    "zh": "糖尿病足溃疡、手术缝合线/订书针拆线、压疮与褥疮专业清创换药，严格无菌操作降低感染并加速伤口愈合。",
    "bm": "Pembalutan luka profesional untuk ulser kaki diabetik, pembuangan jahitan/staple pembedahan, dan pengurusan luka tekanan bagi meminimumkan jangkitan dan mempercepatkan penyembuhan.",
    "ta": "நீரிழிவு கால் புண்கள், அறுவை சிகிச்சை தையல் அகற்றுதல் மற்றும் படுக்கை புண்களுக்கு தொழில்முறை சிகிச்சை."
  },
  "Aseptic non-touch technique (ANTT)": {
    "zh": "无菌非接触操作技术 (ANTT)",
    "bm": "Teknik Aseptik Tanpa Sentuh (ANTT)",
    "ta": "அசெப்டிக் தொடாத நுட்பம் (ANTT)"
  },
  "Diabetic foot ulcer treatment": {
    "zh": "糖尿病足部溃疡专业护理",
    "bm": "Rawatan ulser kaki diabetes",
    "ta": "சர்க்கரை நோய் கால் புண் சிகிச்சை"
  },
  "Post-operative wound healing": {
    "zh": "术后伤口护理与拆线",
    "bm": "Penyembuhan luka selepas pembedahan",
    "ta": "அறுவை சிகிச்சைக்குப் பிந்தைய காயம் ஆற்றுதல்"
  },
  "Attentive daily nursing, feeding tube (Ryle's tube/NG tube) replacement, catheter (CBD) care, hygiene assistance, and vital monitoring.": {
    "zh": "悉心日常护理、鼻胃管 (Ryle's Tube/NG Tube) 插管与置换、导尿管 (CBD) 护理、卧床擦浴与生命体征监测。",
    "bm": "Kejururawatan harian yang prihatin, penukaran tiub penyusuan (Ryle's / NG), penjagaan kateter kencing (CBD), bantuan kebersihan, dan pemantauan tanda vital.",
    "ta": "உணவுக் குழாய் (NG Tube) மாற்றுதல், சிறுநீர் குழாய் (CBD) பராமரிப்பு, படுக்கை குளியல் மற்றும் முக்கிய குறிகாட்டிகள் கண்காணிப்பு."
  },
  "NG Tube & Urinary Catheter insertion": {
    "zh": "鼻胃管与导尿管专业置换插管",
    "bm": "Pemasangan tiub pemakanan & tiub kencing",
    "ta": "NG குழாய் மற்றும் சிறுநீர் வடிகுழாய் பொருத்துதல்"
  },
  "Daily vitals & blood glucose tracking": {
    "zh": "生命体征与血糖每日监测记录",
    "bm": "Pemantauan tanda vital & glukosa darah harian",
    "ta": "தினசரி முக்கிய அறிகுறிகள் & இரத்த சர்க்கரை கண்காணிப்பு"
  },
  "Gentle bed bathing & repositioning": {
    "zh": "床上温水擦浴与定时翻身防压疮",
    "bm": "Mandian katil lembut & ubah posisi berkala",
    "ta": "படுக்கை குளியல் & பக்கவாட்டு மாற்றுதல்"
  },
  "Stroke & Post-Op Recovery": {
    "zh": "中风康复与术后护理",
    "bm": "Pemulihan Strok & Pasca-Pembedahan",
    "ta": "பக்கவாதம் & அறுவை சிகிச்சைக்குப் பின் மறுவாழ்வு"
  },
  "Personalized recovery care to regain physical mobility, strictly timely medication dispensing, fall prevention, and hospital discharge handover.": {
    "zh": "个性化康复护理，协助恢复肢体活动能力，按时给药管理，预防跌倒并做好出院后无缝衔接。",
    "bm": "Penjagaan pemulihan peribadi untuk mendapatkan semula mobiliti fizikal, pemberian ubat tepat pada masanya, pencegahan jatuh, dan serahan selepas discaj hospital.",
    "ta": "உடல் இயக்கத்தை மீட்டெடுப்பதற்கான தனிப்பயனாக்கப்பட்ட பராமரிப்பு, சரியான நேர மருந்துகள் மற்றும் பாதுகாப்பு."
  },
  "Passive & active limb exercise support": {
    "zh": "被动与主动肢体康复辅助锻炼",
    "bm": "Sokongan senaman anggota pasif & aktif",
    "ta": "உடல் மூட்டு உடற்பயிற்சி உதவி"
  },
  "Medication administration & safety": {
    "zh": "严谨用药管理与安全监督",
    "bm": "Pentadbiran & keselamatan ubat-ubatan",
    "ta": "மருந்து மேலாண்மை & பாதுகாப்பு"
  },
  "Complication prevention & care": {
    "zh": "并发症预防与专业日常监护",
    "bm": "Pencegahan komplikasi & penjagaan rapi",
    "ta": "சிக்கல்கள் தடுப்பு & தினசரி கவனிப்பு"
  },
  "Doctor-prescribed intramuscular / subcutaneous injections, insulin therapy management, and home blood collection dispatched to partner labs.": {
    "zh": "按医生处方提供肌肉/皮下注射、胰岛素注射指导，以及上门抽取血样并送往合作化验所快速出具报告。",
    "bm": "Suntikan intramuskular / subkutan yang dipreskripsikan oleh doktor, pengurusan terapi insulin, dan pengambilan sampel darah di rumah yang dihantar ke makmal rakan kongsi.",
    "ta": "மருத்துவர் பரிந்துரைத்த ஊசிகள், இன்சுலின் சிகிச்சை மற்றும் வீட்டிலேயே இரத்த மாதிரி எடுத்தல்."
  },
  "Prescribed injection administration": {
    "zh": "遵医嘱专业药物注射执行",
    "bm": "Pentadbiran suntikan yang dipreskripsi",
    "ta": "பரிந்துரைக்கப்பட்ட மருந்து ஊசிகள்"
  },
  "Home blood taking (Full blood, Renal, Liver)": {
    "zh": "上门抽取全血、肾功能、肝功能化验",
    "bm": "Pengambilan darah di rumah (Profil Darah, Buah Pinggang, Hati)",
    "ta": "முழு இரத்த & சிறுநீரக பரிசோதனைகள்"
  },
  "Fast digital laboratory report turnaround": {
    "zh": "快速出具官方数字化化验报告",
    "bm": "Laporan makmal digital yang pantas",
    "ta": "விரைவான டிஜிட்டல் ஆய்வக அறிக்கை"
  },
  "Qualified nurse accompaniment for hospital specialist check-ups, hemodialysis transport, outpatient appointments, and discharge accompaniment.": {
    "zh": "专业护士全程陪同专科复诊、血液透析往返、门诊检查及出院接送，协助与主治医生有效沟通。",
    "bm": "Pengiring jururawat bertauliah untuk pemeriksaan pakar hospital, pengangkutan hemodialisis, temu janji pesakit luar, dan bantuan discaj.",
    "ta": "மருத்துவமனை சிறப்பு பரிசோதனைகள், டயாலிசிஸ் மற்றும் வெளிநோயாளி சந்திப்புகளுக்கு தகுதியான செவிலியர் துணை."
  },
  "Direct hospital nurse accompaniment": {
    "zh": "注册护士全程陪同就医复诊",
    "bm": "Pengiring jururawat hospital secara langsung",
    "ta": "செவிலியர் நேரடி மருத்துவமனை துணை"
  },
  "Doctor consultation note taking for family": {
    "zh": "协助记录医生医嘱并向家属反馈",
    "bm": "Mencatat arahan doktor untuk rujukan keluarga",
    "ta": "மருத்துவர் ஆலோசனைக் குறிப்புகள் எடுத்தல்"
  },
  "Wheelchair & ambulance coordination": {
    "zh": "轮椅安排与救护车就诊协调",
    "bm": "Koordinasi kerusi roda & ambulans",
    "ta": "சக்கர நாற்காலி & ஆம்புலன்ஸ் ஒருங்கிணைப்பு"
  },
  "Same-day home delivery and installation of hospital beds, oxygen concentrators, suction machines, patient wheelchairs, and ripple mattresses.": {
    "zh": "提供医用病床、制氧机、吸痰器、轮椅及防褥疮气垫床的槟城当天上门配送、安装与使用指导。",
    "bm": "Penghantaran dan pemasangan pada hari yang sama untuk katil hospital, mesin oksigen, mesin penyedut kahak, kerusi roda, dan tilam angin di Pulau Pinang.",
    "ta": "மருத்துவமனை படுக்கைகள், ஆக்ஸிஜன் இயந்திரங்கள், உறிஞ்சும் இயந்திரங்கள் மற்றும் ஏர் மெத்தை ஒரே நாளில் டெலிவரி."
  },
  "Same-day delivery in Penang": {
    "zh": "槟城全境当天配送上门安装",
    "bm": "Penghantaran hari yang sama di Pulau Pinang",
    "ta": "பினாங்கில் ஒரே நாளில் டெலிவரி"
  },
  "Certified 3-function electric medical beds": {
    "zh": "通过认证的三功能电动升降医用病床",
    "bm": "Katil perubatan elektrik 3-fungsi yang diperakui",
    "ta": "சான்றளிக்கப்பட்ட 3-செயல்பாட்டு மின்சார படுக்கைகள்"
  },
  "Medical oxygen & ripple mattress setup": {
    "zh": "医用高纯度制氧机与防褥疮床垫",
    "bm": "Penyediaan oksigen perubatan & tilam angin",
    "ta": "மருத்துவ ஆக்ஸிஜன் & காற்று மெத்தை அமைப்பு"
  },
  "Founder & Clinical Director": {
    "zh": "创办人兼临床总监",
    "bm": "Pengasas & Pengarah Klinikal",
    "ta": "நிறுவனர் & மருத்துவ இயக்குநர்"
  },
  "Clinical Leadership": {
    "zh": "临床领导层",
    "bm": "Kepimpinan Klinikal",
    "ta": "மருத்துவ தலைமை"
  },
  "“Care starts from empathy, safety is built on professionalism, and transparency builds lifelong trust with every family.”": {
    "zh": "“护理始于关怀，安全源于专业，而透明与诚实为每个家庭建立起长久的信任。”",
    "bm": "“Penjagaan bermula daripada empati, keselamatan dibina atas profesionalisme, dan ketelusan membina kepercayaan seumur hidup bersama setiap keluarga.”",
    "ta": "“பராமரிப்பு இரக்கத்திலிருந்து தொடங்குகிறது, பாதுகாப்பு தொழில்முறையில் கட்டமைக்கப்படுகிறது, வெளிப்படைத்தன்மை வாழ்நாள் நம்பிக்கையை உருவாக்குகிறது.”"
  },
  "Official Android App": {
    "zh": "官方安卓客户端应用",
    "bm": "Aplikasi Android Rasmi",
    "ta": "அதிகாரப்பூர்வ Android செயலி"
  },
  "Download Assura Nursing App": {
    "zh": "下载 Assura Nursing 官方客户端",
    "bm": "Muat Turun Aplikasi Assura Nursing",
    "ta": "Assura Nursing செயலியை பதிவிறக்கவும்"
  },
  "Manage home nurse bookings, track clinical vital charts, access the 24/7 Penang emergency hospital directory, and use the 110 BPM CPR metronome even while offline.": {
    "zh": "一键预约上门护士、实时查看生命体征记录表、获取槟城24小时急诊医院指南，离线状态下亦可使用110 BPM急救CPR节拍器。",
    "bm": "Urus tempahan jururawat rumah, jejak carta tanda vital klinikal, akses direktori hospital kecemasan 24/7 Pulau Pinang, dan gunakan metronom CPR 110 BPM walaupun di luar talian.",
    "ta": "நர்ஸ் முன்பதிவுகளை நிர்வகிக்கவும், முக்கிய குறிகாட்டிகளை கண்காணிக்கவும், ஆஃப்லைனிலும் 110 BPM CPR வழிகாட்டியை அணுகவும்."
  },
  "Download Android APK": {
    "zh": "下载 Android APK 安装包",
    "bm": "Muat Turun APK Android",
    "ta": "ஆண்ட்ராய்டு APK பதிவிறக்கம்"
  },
  "Download Windows (.exe)": {
    "zh": "下载 Windows 客户端 (.exe)",
    "bm": "Muat Turun Windows (.exe)",
    "ta": "விண்டோஸ் பதிவிறக்கம் (.exe)"
  },
  "Installation Guide": {
    "zh": "安装与使用指南",
    "bm": "Panduan Pemasangan",
    "ta": "நிறுவல் வழிகாட்டி"
  },
  "Our Story, Standards & Values": {
    "zh": "创办理念 · 专业标准 · 核心价值",
    "bm": "Kisah, Piawaian & Nilai Kami",
    "ta": "எங்கள் வரலாறு, தரநிலைகள் & மதிப்புகள்"
  },
  "Penang's 1st Digital & AI-Era Home Nursing": {
    "zh": "槟城首创数字化与AI时代家庭护理",
    "bm": "Kejururawatan Rumah Era Digital & AI Pertama di Pulau Pinang",
    "ta": "பினாங்கின் முதல் டிஜிட்டல் & AI வீட்டு நர்சிங்"
  },
  "Pioneering modern digital home healthcare in Penang: transparent fare rates, fast staff coordination, and personalized clinical care tailored to your home environment.": {
    "zh": "开创槟城现代化数字家庭医疗：透明收费标准、迅速就近调配医护，根据居家环境定制专属临床照护。",
    "bm": "Menerajui penjagaan kesihatan rumah digital moden di Pulau Pinang: kadar tambang telus, koordinasi staf pantas, dan penjagaan klinikal peribadi yang disesuaikan.",
    "ta": "பினாங்கில் நவீன டிஜிட்டல் வீட்டு சுகாதார சேவையின் முன்னோடி: வெளிப்படையான கட்டணங்கள், விரைவான செவிலியர் ஒருங்கிணைப்பு."
  },
  "Founder's Message": {
    "zh": "创办人心声与初心",
    "bm": "Mesej Pengasas",
    "ta": "நிறுவனரின் செய்தி"
  },
  "Mr. Jason Ng Lye Tiam": {
    "zh": "吴乃添 (Jason Ng)",
    "bm": "Encik Jason Ng Lye Tiam",
    "ta": "திரு. ஜேசன் என்ஜி லை தியாம்"
  },
  "Registered Nurse (LJM)": {
    "zh": "大马注册执照护士 (LJM)",
    "bm": "Jururawat Berdaftar (LJM)",
    "ta": "பதிவுசெய்யப்பட்ட செவிலியர் (LJM)"
  },
  "Hospital Acute Care Background": {
    "zh": "医院重症与急诊临床经验",
    "bm": "Latar Belakang Penjagaan Akut Hospital",
    "ta": "மருத்துவமனை தீவிர சிகிச்சை அனுபவம்"
  },
  "Wound Care & Infection Risk Minimization": {
    "zh": "无菌伤口清创与感染防控专家",
    "bm": "Penjagaan Luka & Pencegahan Jangkitan",
    "ta": "காயம் பராமரிப்பு & தொற்று தடுப்பு"
  },
  "Home Clinical Care Specialist": {
    "zh": "居家临床护理专家",
    "bm": "Pakar Penjagaan Klinikal Rumah",
    "ta": "வீட்டு மருத்துவ பராமரிப்பு நிபுணர்"
  },
  "Home Nursing Procedures & Transparent Rates": {
    "zh": "家庭护理项目与公开透明收费标准",
    "bm": "Prosedur Kejururawatan Rumah & Kadar Telus",
    "ta": "வீட்டு நர்சிங் நடைமுறைகள் & வெளிப்படையான கட்டணங்கள்"
  },
  "Instant Price Estimator": {
    "zh": "快速估价计算器",
    "bm": "Penganggar Harga Segera",
    "ta": "உடனடி கட்டண மதிப்பீடு"
  },
  "Select your nursing procedure and Penang location for transparent procedure rates.": {
    "zh": "选择您需要的护理项目与槟城所在地点，即可获取透明公开的收费估价。",
    "bm": "Pilih prosedur rawatan dan lokasi Pulau Pinang anda untuk anggaran kadar yang telus.",
    "ta": "வெளிப்படையான கட்டண மதிப்பீட்டிற்கு உங்கள் நர்சிங் சிகிச்சை மற்றும் பினாங்கு இருப்பிடத்தைத் தேர்ந்தெடுக்கவும்."
  },
  "NURSING PROCEDURE": {
    "zh": "护理项目选择",
    "bm": "PROSEDUR KEJURURAWATAN",
    "ta": "நர்சிங் சிகிச்சை"
  },
  "Basic Wound Dressing (Simple / Post-Surgical) · RM 120": {
    "zh": "基础伤口换药（普通/术后缝合伤口）· RM 120",
    "bm": "Pembalutan Luka Asas (Mudah / Selepas Pembedahan) · RM 120",
    "ta": "அடிப்படை காயம் கட்டுதல் (அறுவை சிகிச்சைக்கு பின்) · RM 120"
  },
  "Complex Wound / Bed Sore Stage 3-4 · RM 160": {
    "zh": "复杂伤口清创 / 3-4期褥疮压疮处理 · RM 160",
    "bm": "Luka Kompleks / Luka Tekanan Tahap 3-4 · RM 160",
    "ta": "சிக்கலான காயம் / படுக்கை புண் நிலை 3-4 · RM 160"
  },
  "Ryle's Tube (NG Tube) Insertion & Checking · RM 150": {
    "zh": "鼻胃管 (NG Tube) 插管置换与位置确认 · RM 150",
    "bm": "Pemasangan & Pemeriksaan Tiub Ryle (NG) · RM 150",
    "ta": "ரைல்ஸ் குழாய் (NG Tube) மாற்றுதல் & சரிபார்த்தல் · RM 150"
  },
  "Urinary Catheterization (Foley Catheter) · RM 150": {
    "zh": "导尿管 (Foley Catheter) 专业插管与护理 · RM 150",
    "bm": "Pemasangan Kateter Kencing (Foley) · RM 150",
    "ta": "சிறுநீர் குழாய் (Foley Catheter) செருகுதல் · RM 150"
  },
  "SC/IM Injection / Blood Test Sampling · RM 130": {
    "zh": "皮下/肌肉注射 / 上门抽取血样化验 · RM 130",
    "bm": "Suntikan SC/IM / Pengambilan Sampel Darah · RM 130",
    "ta": "ஊசி செலுத்துதல் / இரத்த மாதிரி எடுத்தல் · RM 130"
  },
  "Stroke Rehab & Bedside Mobility Exercise (1 Hr) · RM 140": {
    "zh": "中风肢体康复与床边活动训练 (1小时) · RM 140",
    "bm": "Pemulihan Strok & Latihan Mobiliti (1 Jam) · RM 140",
    "ta": "பக்கவாதம் மறுவாழ்வு & உடற்பயிற்சி (1 மணி நேரம்) · RM 140"
  },
  "Clinic / Hospital Specialist Escort (4 Hours) · RM 280": {
    "zh": "专科门诊/医院就医全程陪同护送 (4小时) · RM 280",
    "bm": "Pengiring Pakar Klinik / Hospital (4 Jam) · RM 280",
    "ta": "மருத்துவமனை சிறப்பு பரிசோதனை துணை (4 மணி நேரம்) · RM 280"
  },
  "12-Hour Dedicated Bedside Nurse Shift · RM 350": {
    "zh": "12小时专属注册护士床边轮班陪护 · RM 350",
    "bm": "Syif Jururawat Khas 12 Jam · RM 350",
    "ta": "12 மணி நேர பிரத்யேக செவிலியர் பணி · RM 350"
  },
  "24-Hour Continuous Private Nurse Shift · RM 650": {
    "zh": "24小时全天候私人护士连续专护 · RM 650",
    "bm": "Syif Jururawat Peribadi Berterusan 24 Jam · RM 650",
    "ta": "24 மணி நேர தொடர் தனியார் செவிலியர் பணி · RM 650"
  },
  "Dedicated Caregiver Shift (12 Hours) · RM 200": {
    "zh": "爱心居家护理员班次 (12小时日常照料) · RM 200",
    "bm": "Syif Penjaga Berdedikasi (12 Jam) · RM 200",
    "ta": "அர்ப்பணிப்புள்ள பராமரிப்பாளர் பணி (12 மணி நேரம்) · RM 200"
  },
  "Other / Custom Nursing Service (Key in below) · 其他自订护理服务": {
    "zh": "其他自订护理服务（在下方输入具体需求）",
    "bm": "Perkhidmatan Kejururawatan Tersuai / Lain-lain (Nyatakan di bawah)",
    "ta": "மற்ற தனிப்பயன் நர்சிங் சேவைகள் (கீழே உள்ளிடவும்)"
  },
  "Describe your required nursing procedure / patient condition...": {
    "zh": "请详细描述您需要的特殊护理项目、伤口情况或患者身体状况...",
    "bm": "Sila huraikan prosedur rawatan atau keadaan pesakit...",
    "ta": "தேவையான நர்சிங் சிகிச்சை அல்லது நோயாளி நிலையை விவரிக்கவும்..."
  },
  "Apply via WhatsApp →": {
    "zh": "通过 WhatsApp 申请 →",
    "bm": "Mohon melalui WhatsApp →",
    "ta": "WhatsApp மூலம் விண்ணப்பிக்க →"
  },
  "Direct WhatsApp Application": {
    "zh": "通过 WhatsApp 直接应聘",
    "bm": "Permohonan Terus WhatsApp",
    "ta": "WhatsApp மூலம் நேரடி விண்ணப்பம்"
  },
  "Book via WhatsApp": {
    "zh": "通过 WhatsApp 预约",
    "bm": "Tempah melalui WhatsApp",
    "ta": "WhatsApp மூலம் முன்பதிவு"
  },
  "Enquire / 咨询": {
    "zh": "在线咨询 / 问价",
    "bm": "Pertanyaan / Konsultasi",
    "ta": "விசாரணை செய்க"
  },
  "Online Form": {
    "zh": "线上预约表格",
    "bm": "Borang Dalam Talian",
    "ta": "ஆன்லைன் படிவம்"
  },
  "Explore Equipment Catalog →": {
    "zh": "浏览医疗设备目录 →",
    "bm": "Terokai Katalog Peralatan →",
    "ta": "உபகரணங்கள் பட்டியலை காண்க →"
  },
  "View Rates & Book Visit →": {
    "zh": "查看收费并立即预约 →",
    "bm": "Lihat Kadar & Tempah Lawatan →",
    "ta": "கட்டணங்களைப் பார்த்து வருகையை முன்பதிவு செய்க →"
  },
  "Nurse Recruitment & Official Announcements": {
    "zh": "医护人员招募与官方重要公告",
    "bm": "Pengambilan Jururawat & Pengumuman Rasmi",
    "ta": "செவிலியர் ஆட்சேர்ப்பு & அதிகாரப்பூர்வ அறிவிப்புகள்"
  },
  "High Payout Network · 高收益医护网络": {
    "zh": "高收益医护网络 · High Payout Network",
    "bm": "Rangkaian Pendapatan Tinggi · High Payout Network",
    "ta": "உயர் வருவாய் நெட்வொர்க் · High Payout Network"
  },
  "Join Assura Nursing Penang": {
    "zh": "加入槟城 Assura Nursing 专业医护团队",
    "bm": "Sertai Pasukan Assura Nursing Penang",
    "ta": "Assura Nursing பினாங்குடன் இணையுங்கள்"
  },
  "We believe nurses deserve respect, transparent earnings, and professional autonomy. Earn high case commissions with prompt bi-weekly direct payroll transfers.": {
    "zh": "我们坚信医护人员应当享有应有的尊重、透明的收益与职业自主权。享受丰厚的个案提成与双周准时直接银行结算。",
    "bm": "Kami percaya jururawat berhak mendapat penghormatan, pendapatan telus, dan autonomi profesional. Nikmati komisen kes yang tinggi dengan pembayaran bank terus setiap 2 minggu.",
    "ta": "செவிலியர்கள் மரியாதை, வெளிப்படையான வருவாய் மற்றும் தொழில்முறை சுயாட்சியைப் பெற தகுதியானவர்கள் என்று நாங்கள் நம்புகிறோம். ஒவ்வொரு 2 வாரங்களுக்கும் விரைவான நேரடி வங்கி பரிமாற்றங்களுடன் கவர்ச்சிகரமான கமிஷன்களைப் பெறுங்கள்."
  },
  "High Earning Potential": {
    "zh": "丰厚收益与个案提成",
    "bm": "Potensi Pendapatan Tinggi",
    "ta": "அதிக வருவாய் வாய்ப்பு"
  },
  "Industry-leading payout structure. Attractive case commissions, hourly shift rates, and performance bonuses.": {
    "zh": "行业领先的薪酬激励机制。享受高额个案提成、轮班津贴以及绩效奖励。",
    "bm": "Struktur pembayaran terkemuka dalam industri. Komisen kes lumayan, elaun syif, dan bonus prestasi tinggi.",
    "ta": "தொழில்துறையில் முன்னணி ஊதியக் கட்டமைப்பு. கவர்ச்சிகரமான கமிஷன்கள், ஷிப்ட் படிகள் மற்றும் சிறந்த போனஸ்கள்."
  },
  "Flexible Scheduling": {
    "zh": "弹性排班自主掌控",
    "bm": "Jadual Kerja Fleksibel",
    "ta": "நெகிழ்வான வேலை நேரம்"
  },
  "Accept only the cases and shifts that suit your lifestyle (full-time, part-time, weekend, or ad-hoc visits).": {
    "zh": "自由选择符合您作息时间的个案与班次（全职、兼职、周末或特定时段上门）。",
    "bm": "Pilih kes dan syif mengikut keselesaan anda (sepenuh masa, separuh masa, hujung minggu, atau lawatan ad-hoc).",
    "ta": "உங்கள் வாழ்க்கை முறைக்கு ஏற்ற வழக்குகளையும் ஷிப்டுகளையும் மட்டுமே தேர்வு செய்து பணியாற்றலாம் (முழு நேரம், பகுதி நேரம், வார இறுதி)."
  },
  "Digital Clinical App": {
    "zh": "专属数字化临床应用",
    "bm": "Aplikasi Klinikal Digital",
    "ta": "டிஜிட்டல் மருத்துவ செயலி"
  },
  "Digital vitals logging, MEWS scoring, care handovers, and real-time job broadcasts on your phone.": {
    "zh": "手机端实时接收就近派单、记录生命体征、MEWS评分及电子交接班记录。",
    "bm": "Pencatatan tanda vital digital, skor MEWS, penyerahan tugas klinikal, dan siaran kes masa nyata pada telefon anda.",
    "ta": "உங்கள் தொலைபேசியில் நேரடி பணி அறிவிப்புகள், முக்கிய குறிகாட்டிகள் பதிவு மற்றும் MEWS மதிப்பீடு."
  },
  "Bi-Weekly Payroll": {
    "zh": "双周准时发放薪资",
    "bm": "Pembayaran Gaji Dwi-Mingguan",
    "ta": "2 வாரங்களுக்கு ஒருமுறை நேரடி ஊதியம்"
  },
  "Guaranteed on-time bank transfers every 2 weeks with clear breakdown of completed procedures.": {
    "zh": "每两周准时银行转账结算，提供清晰透明的已完成护理项目与收益明细。",
    "bm": "Pemindahan bank tepat pada masanya setiap 2 minggu dengan perincian jelas prosedur yang telah selesai.",
    "ta": "முடிந்த சிகிச்சைகளின் தெளிவான விவரங்களுடன் ஒவ்வொரு 2 வாரங்களுக்கும் தவறாமல் வங்கி கணக்கில் ஊதியம்."
  },
  "👩‍⚕️ Open Positions Across Penang Island & Mainland": {
    "zh": "👩‍⚕️ 槟岛与威省全境热招岗位",
    "bm": "👩‍⚕️ Kekosongan Jawatan di Seluruh Pulau Pinang & Tanah Besar",
    "ta": "👩‍⚕️ பினாங்கு முழுவதும் நேரடி காலிப் பணியிடங்கள்"
  },
  "Immediate Vacancies": {
    "zh": "急聘职位",
    "bm": "Kekosongan Segera",
    "ta": "உடனடி வேலைவாய்ப்பு"
  },
  "Registered Staff Nurse (SRN)": {
    "zh": "注册护士 (Staff Nurse / SRN)",
    "bm": "Jururawat Terlatih Berdaftar (SRN)",
    "ta": "பதிவு பெற்ற செவிலியர் (SRN)"
  },
  "Attractive Case Commission & Flexible Shifts": {
    "zh": "丰厚个案提成与弹性排班",
    "bm": "Komisen Kes Lumayan & Syif Fleksibel",
    "ta": "கவர்ச்சிகரமான கமிஷன் & நெகிழ்வான நேரம்"
  },
  "Valid Malaysian Nursing Board (LJM) APC license": {
    "zh": "持有马来西亚护士局 (LJM) 有效执业证书 (APC)",
    "bm": "Lesen Perakuan Amalan Tahunan (APC) Lembaga Jururawat Malaysia (LJM) yang sah",
    "ta": "செல்லுபடியாகும் மலேசிய நர்சிங் போர்டு (LJM) APC உரிமம்"
  },
  "Proficient in sterile wound dressing & tube changes": {
    "zh": "熟练掌握无菌伤口清创换药与鼻胃管/导尿管插管护理",
    "bm": "Mahir dalam pembalutan luka steril & penukaran tiub",
    "ta": "தூய்மையான காயம் கட்டுதல் & குழாய் மாற்றுவதில் நிபுணத்துவம்"
  },
  "Hospital ICU, Surgical, or Medical ward experience preferred": {
    "zh": "具医院重症监护室 (ICU)、外科或内科病房经验者优先",
    "bm": "Pengalaman di wad ICU, Pembedahan, atau Perubatan hospital diutamakan",
    "ta": "மருத்துவமனை ICU அல்லது அறுவை சிகிச்சை வார்டு அனுபவம் விரும்பத்தக்கது"
  },
  "Medical Assistant (PPP / MA)": {
    "zh": "助理医疗官 (PPP / Medical Assistant)",
    "bm": "Penolong Pegawai Perubatan (PPP / MA)",
    "ta": "மருத்துவ உதவியாளர் (PPP / MA)"
  },
  "Competitive Remuneration & Shift Allowance": {
    "zh": "具竞争力轮班津贴与接单提成",
    "bm": "Imbuhan Menarik & Elaun Syif",
    "ta": "சிறந்த ஊதியம் & ஷிப்ட் படிகள்"
  },
  "Valid Medical Assistant registration (LPPK)": {
    "zh": "持有助理医疗官局 (LPPK) 有效注册证书",
    "bm": "Pendaftaran sah Lembaga Pembantu Perubatan (LPPK)",
    "ta": "செல்லுபடியாகும் மருத்துவ உதவியாளர் பதிவு (LPPK)"
  },
  "Experienced in Foley catheterization & injections": {
    "zh": "熟练掌握导尿管置换、药物注射与急救处理",
    "bm": "Berpengalaman dalam pemasangan kateter Foley & suntikan",
    "ta": "சிறுநீர் குழாய் மற்றும் ஊசி போடுவதில் அனுபவம்"
  },
  "Emergency response & vital signs assessment": {
    "zh": "具备应急响应与生命体征综合评估能力",
    "bm": "Tindak balas kecemasan & penilaian tanda-tanda vital",
    "ta": "அவசர சிகிச்சை மற்றும் முக்கிய குறிகாட்டிகள் மதிப்பீடு"
  },
  "Dedicated Elderly Caregiver": {
    "zh": "爱心居家护理员 (Caregiver)",
    "bm": "Penjaga Warga Emas Berdedikasi (Caregiver)",
    "ta": "அர்ப்பணிப்புள்ள முதியோர் பராமரிப்பாளர் (Caregiver)"
  },
  "Guaranteed Bi-Weekly Payout & Flexible Hours": {
    "zh": "双周准时银行结算与弹性工时",
    "bm": "Bayaran Bank Dwi-Mingguan & Masa Fleksibel",
    "ta": "வங்கி மூலம் ஊதியம் & நெகிழ்வான நேரம்"
  },
  "Certificate in Elderly Care / Healthcare Aid": {
    "zh": "持有长者照护/医疗助理相关证书或丰富看护经验",
    "bm": "Sijil Penjagaan Warga Emas / Pembantu Penjagaan Kesihatan",
    "ta": "முதியோர் பராமரிப்பு / சுகாதார உதவி சான்றிதழ்"
  },
  "Assisting with ADLs, bed-bath, feeding, & turning": {
    "zh": "熟练协助日常生活起居、床上擦浴、喂食与翻身防压疮",
    "bm": "Membantu aktiviti harian (ADL), mandi di katil, menyuap makan & membalikkan badan",
    "ta": "தினசரி தேவைகள், படுக்கை குளியல், உணவளித்தல் மற்றும் கவனிப்பு"
  },
  "Patient, gentle, compassionate, and trustworthy": {
    "zh": "有耐心、细致温和、富有同理心且诚实守信",
    "bm": "Sabar, lemah lembut, berbelas kasihan, dan boleh dipercayai",
    "ta": "பொறுமை, மென்மையான குணம், இரக்கம் மற்றும் நம்பகத்தன்மை"
  },
  "Official Company Bulletins & Clinical Announcements": {
    "zh": "官方最新医疗公告与通告",
    "bm": "Buletin Rasmi Syarikat & Pengumuman Klinikal",
    "ta": "அதிகாரப்பூர்வ நிறுவன புல்லட்டின்கள் & மருத்துவ அறிவிப்புகள்"
  },
  "Full 24/7 Coverage Extended Across Penang Island & Seberang Perai": {
    "zh": "24/7全天候家庭护理覆盖扩展至全槟与威省全境",
    "bm": "Liputan 24/7 Diperluas ke Seluruh Pulau Pinang & Seberang Perai",
    "ta": "முழு 24/7 சேவை பினாங்கு தீவு & நிலப்பரப்பு முழுவதும் விரிவாக்கப்பட்டது"
  },
  "Assura Nursing has expanded its registered home nurse dispatch network across all districts: Georgetown, Bayan Lepas, Balik Pulau, Tanjung Bungah, Butterworth, Bukit Mertajam, Seberang Jaya, and Kepala Batas.": {
    "zh": "Assura Nursing 已将注册护士上门派遣网络扩展至所有区域：乔治市、峇六拜、浮罗山背、丹绒武雅、北海、大山脚、诗布朗再也以及甲抛峇底。",
    "bm": "Assura Nursing telah memperluaskan rangkaian penghantaran jururawat rumah berdaftar ke semua daerah: Georgetown, Bayan Lepas, Balik Pulau, Tanjung Bungah, Butterworth, Bukit Mertajam, Seberang Jaya, dan Kepala Batas.",
    "ta": "Assura Nursing அனைத்து மாவட்டங்களிலும் தனது பதிவு செய்யப்பட்ட நர்ஸ் சேவையை விரிவுபடுத்தியுள்ளது: ஜார்ஜ்டவுன், பயான் லெபாஸ், பாலிக் புலாவ், தஞ்சோங் புங்கா, பட்டர்வொர்த், புக்கிட் மெர்தாஜாம் மற்றும் செபராங் ஜெயா."
  },
  "Launch of Digital MEWS Vital Tracking System for Families": {
    "zh": "面向患者家属推出数字化 MEWS 早期预警生命体征系统",
    "bm": "Pelancaran Sistem Penjejakan Vital MEWS Digital untuk Keluarga",
    "ta": "குடும்பங்களுக்கான டிஜிட்டல் MEWS கண்காணிப்பு அமைப்பு அறிமுகம்"
  },
  "Families can now access real-time clinical vital sign graphs, blood pressure trends, SpO2 levels, and Modified Early Warning Scores (MEWS) logged by attending nurses directly via the Assura Clinical Portal.": {
    "zh": "家属现在可以通过 Assura 临床系统直接查看护士实时记录的生命体征图表、血压趋势、血氧水平以及改良早期预警评分 (MEWS)。",
    "bm": "Keluarga kini boleh mengakses graf tanda vital klinikal masa nyata, trend tekanan darah, tahap SpO2, dan Skor Amaran Awal Ubahsuai (MEWS) yang direkodkan oleh jururawat bertugas melalui Portal Klinikal Assura.",
    "ta": "குடும்பங்கள் இப்போது இரத்த அழுத்த போக்குகள், SpO2 அளவுகள் மற்றும் MEWS மதிப்பெண்களை Assura மருத்துவ போர்டல் வழியாக நேரடியாக அணுகலாம்."
  },
  "Hospital Discharge Fast-Track Care Coordination Program": {
    "zh": "医院出院快速衔接家庭护理计划",
    "bm": "Program Koordinasi Penjagaan Pantas Discaj Hospital",
    "ta": "மருத்துவமனை டிஸ்சார்ஜ் விரைவான பராமரிப்பு திட்டம்"
  },
  "Same-day clinical handover from Penang General Hospital, Island Hospital, Gleneagles, Loh Guan Lye, Pantai Hospital, and Bagan Specialist directly to home recovery with certified medical equipment setup.": {
    "zh": "提供从槟城中央医院、槟榔医院、鹰阁医院、卢源来专科医院、班台医院和北海专科医院当天出院直达家庭的护理交接及医疗设备安装。",
    "bm": "Serahan klinikal pada hari yang sama dari Hospital Besar Pulau Pinang, Hospital Island, Gleneagles, Loh Guan Lye, Hospital Pantai, dan Bagan Specialist terus ke pemulihan di rumah dengan pemasangan peralatan perubatan yang disahkan.",
    "ta": "பினாங்கு பொது மருத்துவமனை, ஐலேண்ட் மருத்துவமனை, கிளெனீகல்ஸ் மற்றும் பிற மருத்துவமனைகளில் இருந்து வீட்டிற்கு நேரடி சிகிச்சை மற்றும் உபகரணங்கள் அமைப்பு."
  },
  "Updated Aseptic Wound Care & ANTT Protocols Adopted": {
    "zh": "全面采用最新无菌伤口清创与 ANTT 操作规范",
    "bm": "Protokol Penjagaan Luka Aseptik & ANTT Terkini Digunakan",
    "ta": "மேம்படுத்தப்பட்ட ANTT காயம் பராமரிப்பு நெறிமுறைகள்"
  },
  "All active staff nurses have completed advanced certifications in modern wound care dressing, negative pressure wound therapy (NPWT), and hospital-to-home infection control standards.": {
    "zh": "所有在职注册护士均已完成现代伤口敷料护理、负压伤口治疗 (NPWT) 以及从医院到居家感染控制标准的专业进修培训。",
    "bm": "Semua jururawat bertugas telah menamatkan pensijilan lanjutan dalam pembalutan luka moden, terapi luka tekanan negatif (NPWT), dan piawaian kawalan jangkitan dari hospital ke rumah.",
    "ta": "அனைத்து செவிலியர்களும் நவீன காயம் கட்டுதல் மற்றும் தொற்று கட்டுப்பாட்டு சான்றிதழ்களை முடித்துள்ளனர்."
  },
  "Book Home Nursing | Assura Nursing": {
    "zh": "预约上门家庭护理 | Assura Nursing",
    "bm": "Tempah Kejururawatan Rumah | Assura Nursing",
    "ta": "வீட்டு நர்சிங் முன்பதிவு | Assura Nursing"
  },
  "CARE THAT COMES TO YOU": {
    "zh": "贴心护理 · 亲临您家",
    "bm": "PENJAGAAN YANG TIBA DI RUMAH ANDA",
    "ta": "உங்கள் இல்லம் தேடி வரும் பராமரிப்பு"
  },
  "Private Home Nursing Care": {
    "zh": "私人上门家庭护理服务",
    "bm": "Penjagaan Kejururawatan Rumah Peribadi",
    "ta": "தனியார் வீட்டு நர்சிங் பராமரிப்பு"
  },
  "Professional Nursing, Wherever You Need It": {
    "zh": "随时随地提供专业临床护理",
    "bm": "Kejururawatan Profesional, Di Mana Sahaja Anda Perlukan",
    "ta": "தொழில்முறை நர்சிங், நீங்கள் விரும்பும் இடத்தில்"
  },
  "Professional Nursing, Wherever You Need It · 24/7 Shift Visits": {
    "zh": "随时随地提供专业临床护理 · 24小时轮班探访",
    "bm": "Kejururawatan Profesional, Di Mana Sahaja Anda Perlukan · Lawatan Syif 24/7",
    "ta": "தொழில்முறை செவிலியர் சிகிச்சை, எப்போது வேண்டுமானாலும் · 24/7 நர்சிங் சேவைகள்"
  },
  "Need someone urgently?": {
    "zh": "需要紧急医疗协助？",
    "bm": "Perlukan bantuan segera?",
    "ta": "அவசரமாக யாராவது தேவையா?"
  },
  "Preferred Visiting Time (24 Hours Available)": {
    "zh": "选择上门时间（支持 24 小时全天候预约）",
    "bm": "Masa Lawatan Pilihan (Tersedia 24 Jam)",
    "ta": "விரும்பிய வருகை நேரம் (24 மணி நேரமும் கிடைக்கும்)"
  },
  "24/7 Home Nursing Visiting Hours — round-the-clock shift support across Penang. We'll confirm your exact slot by WhatsApp.": {
    "zh": "24小时全天候上门时段（全槟24/7轮班护理），确切时间将由我们在 WhatsApp 确认。",
    "bm": "Waktu Lawatan Kejururawatan Rumah 24/7 — sokongan syif sepanjang masa di seluruh Pulau Pinang. Kami akan mengesahkan slot tepat anda melalui WhatsApp.",
    "ta": "24/7 வீட்டு நர்சிங் வருகை நேரம் — பினாங்கு முழுவதும் 24 மணி நேர சுழற்சி முறை பராமரிப்பு. WhatsApp மூலம் சரியான நேரம் உறுதி செய்யப்படும்."
  },
  "Official Applications · 官方统一客户端": {
    "zh": "官方统一客户端 · 手机与电脑端下载",
    "bm": "Aplikasi Rasmi · Muat Turun Mudah Alih & Desktop",
    "ta": "அதிகாரப்பூர்வ செயலிகள்"
  },
  "Download Assura Nursing": {
    "zh": "下载 Assura Nursing 客户端",
    "bm": "Muat Turun Assura Nursing",
    "ta": "Assura Nursing பதிவிறக்கவும்"
  },
  "Install the official mobile or desktop application for seamless offline support, real-time vital charting, emergency hospital navigation, and clinical tools.": {
    "zh": "安装官方手机或电脑端应用程序，即可享受流畅的离线支持、实时生命体征记录、急诊医院导航以及实用急救工具。",
    "bm": "Pasang aplikasi mudah alih atau desktop rasmi untuk sokongan luar talian yang lancar, carta tanda vital masa nyata, navigasi hospital kecemasan, dan alat klinikal.",
    "ta": "ஆஃப்லைன் ஆதரவு, நேரடி முக்கிய குறிகாட்டிகள் பதிவு மற்றும் அவசர மருத்துவமனை வழிகாட்டலுக்கு அதிகாரப்பூர்வ செயலியை நிறுவவும்."
  },
  "Get instant access to home nurse bookings, transparent rates, emergency hospital directory, and offline 110 BPM CPR metronome.": {
    "zh": "即刻体验护士快捷预约、透明价格估算、槟城24小时急诊医院指南以及离线 110 BPM CPR 急救节拍器。",
    "bm": "Dapatkan akses segera kepada tempahan jururawat rumah, kadar telus, direktori hospital kecemasan, dan metronom CPR 110 BPM luar talian.",
    "ta": "வீட்டு நர்ஸ் முன்பதிவு, வெளிப்படையான கட்டணங்கள் மற்றும் 110 BPM CPR வழிகாட்டியை உடனடியாக அணுகவும்."
  },
  "Instant Home Screen App · No Storage Needed": {
    "zh": "即时添加到手机主屏幕 · 免占存储空间",
    "bm": "Aplikasi Skrin Utama Segera · Tanpa Storan",
    "ta": "உடனடி முகப்புத் திரை ஆப் · சேமிப்பிடம் தேவையில்லை"
  },
  "Install Assura App (Web / iOS / Android)": {
    "zh": "安装 Assura 应用 (网页/苹果/安卓通用)",
    "bm": "Pasang Aplikasi Assura (Web / iOS / Android)",
    "ta": "Assura செயலியை நிறுவவும் (Web / iOS / Android)"
  },
  "Add to iPhone / iPad Home Screen": {
    "zh": "添加到苹果 iPhone / iPad 主屏幕",
    "bm": "Tambah ke Skrin Utama iPhone / iPad",
    "ta": "iPhone / iPad முகப்புத் திரையில் சேர்க்கவும்"
  },
  "Safari Share ⎋ → Add to Home Screen ➕": {
    "zh": "Safari 分享 ⎋ → 添加到主屏幕 ➕",
    "bm": "Kongsi Safari ⎋ → Tambah ke Skrin Utama ➕",
    "ta": "Safari பகிர் ⎋ → முகப்புத் திரையில் சேர் ➕"
  },
  "Unified Patient & Staff Clinical Portal": {
    "zh": "统一患者与医护临床系统",
    "bm": "Portal Klinikal Bersepadu Pesakit & Staf",
    "ta": "ஒருங்கிணைந்த நோயாளி & மருத்துவ போர்டல்"
  },
  "STRICTLY PRIVATE & MEDICAL PROTECTED": {
    "zh": "严格保密 · 医疗隐私受法律保护",
    "bm": "SULIT & DILINDUNGI SECARA PERUBATAN",
    "ta": "முழுக்க முழுக்க தனிப்பட்டது & பாதுகாக்கப்பட்டது"
  },
  "First-Time App User Guide & Official Memo · 首次使用备忘录": {
    "zh": "首次使用指南与官方备忘录",
    "bm": "Panduan Pengguna Kali Pertama & Memo Rasmi",
    "ta": "முதல் முறை பயனர் வழிகாட்டி & அதிகாரப்பூர்வ குறிப்பு"
  },
  "No login required.": {
    "zh": "无需登录，直接使用。",
    "bm": "Tiada log masuk diperlukan.",
    "ta": "உள்நுழைவு தேவையில்லை."
  },
  "No login needed ·": {
    "zh": "无需登录 ·",
    "bm": "Tiada log masuk diperlukan ·",
    "ta": "உள்நுழைவு தேவையில்லை ·"
  },
  "St. John Ambulance (Penang)": {
    "zh": "St. John Ambulance (Penang)",
    "bm": "St. John Ambulance (Penang)",
    "ta": "St. John Ambulance (Penang)"
  },
  "🫁 Respiratory & Airway": {
    "zh": "🫁 Respiratory & Airway",
    "bm": "🫁 Respiratory & Airway",
    "ta": "🫁 Respiratory & Airway"
  },
  "1. Public Open Mode": {
    "zh": "1. Public Open Mode",
    "bm": "1. Public Open Mode",
    "ta": "1. Public Open Mode"
  },
  ": Nurses and supervisors click the \"🩺 Staff ID\" tab and enter their Staff ID (e.g.": {
    "zh": ": Nurses and supervisors click the \"🩺 Staff ID\" tab and enter their Staff ID (e.g.",
    "bm": ": Nurses and supervisors click the \"🩺 Staff ID\" tab and enter their Staff ID (e.g.",
    "ta": ": Nurses and supervisors click the \"🩺 Staff ID\" tab and enter their Staff ID (e.g."
  },
  "🚗 Waze": {
    "zh": "🚗 Waze",
    "bm": "🚗 Waze",
    "ta": "🚗 Waze"
  },
  "Sister Tan (Supervisor)": {
    "zh": "Sister Tan (Supervisor)",
    "bm": "Sister Tan (Supervisor)",
    "ta": "Sister Tan (Supervisor)"
  },
  "Downloads": {
    "zh": "Downloads",
    "bm": "Downloads",
    "ta": "Downloads"
  },
  "🏥 Hospital Escort & Transfer": {
    "zh": "🏥 Hospital Escort & Transfer",
    "bm": "🏥 Hospital Escort & Transfer",
    "ta": "🏥 Hospital Escort & Transfer"
  },
  "24/7 PRIVATE AMBULANCE DIRECTORY": {
    "zh": "24/7 PRIVATE AMBULANCE DIRECTORY",
    "bm": "24/7 PRIVATE AMBULANCE DIRECTORY",
    "ta": "24/7 PRIVATE AMBULANCE DIRECTORY"
  },
  "for family comfort, and": {
    "zh": "for family comfort, and",
    "bm": "for family comfort, and",
    "ta": "for family comfort, and"
  },
  "Registered Clinical Staff": {
    "zh": "Registered Clinical Staff",
    "bm": "Registered Clinical Staff",
    "ta": "Registered Clinical Staff"
  },
  "Digital Real-Time Charting & Handover:": {
    "zh": "Digital Real-Time Charting & Handover:",
    "bm": "Digital Real-Time Charting & Handover:",
    "ta": "Digital Real-Time Charting & Handover:"
  },
  "Phone": {
    "zh": "Phone",
    "bm": "Phone",
    "ta": "Phone"
  },
  "Jalan Bagan 1, 13400 Butterworth, Penang": {
    "zh": "Jalan Bagan 1, 13400 Butterworth, Penang",
    "bm": "Jalan Bagan 1, 13400 Butterworth, Penang",
    "ta": "Jalan Bagan 1, 13400 Butterworth, Penang"
  },
  "💬 Book via WhatsApp": {
    "zh": "💬 Book via WhatsApp",
    "bm": "💬 Book via WhatsApp",
    "ta": "💬 Book via WhatsApp"
  },
  "Rental:": {
    "zh": "Rental:",
    "bm": "Rental:",
    "ta": "Rental:"
  },
  "Private Specialist": {
    "zh": "Private Specialist",
    "bm": "Private Specialist",
    "ta": "Private Specialist"
  },
  "Please choose a date.": {
    "zh": "Please choose a date.",
    "bm": "Please choose a date.",
    "ta": "Please choose a date."
  },
  "Please enter your name.": {
    "zh": "Please enter your name.",
    "bm": "Please enter your name.",
    "ta": "Please enter your name."
  },
  "Tap the map to drop a pin, or use your GPS. ， GPS。": {
    "zh": "Tap the map to drop a pin, or use your GPS. ， GPS。",
    "bm": "Tap the map to drop a pin, or use your GPS. ， GPS。",
    "ta": "Tap the map to drop a pin, or use your GPS. ， GPS。"
  },
  "☎ 04-643 2743": {
    "zh": "☎ 04-643 2743",
    "bm": "☎ 04-643 2743",
    "ta": "☎ 04-643 2743"
  },
  "Gleneagles Hospital Penang": {
    "zh": "Gleneagles Hospital Penang",
    "bm": "Gleneagles Hospital Penang",
    "ta": "Gleneagles Hospital Penang"
  },
  "Maintain strict hygiene to prevent Catheter-Associated Urinary Tract Infections (CAUTI).": {
    "zh": "Maintain strict hygiene to prevent Catheter-Associated Urinary Tract Infections (CAUTI).",
    "bm": "Maintain strict hygiene to prevent Catheter-Associated Urinary Tract Infections (CAUTI).",
    "ta": "Maintain strict hygiene to prevent Catheter-Associated Urinary Tract Infections (CAUTI)."
  },
  "Staff ID Login.": {
    "zh": "Staff ID Login.",
    "bm": "Staff ID Login.",
    "ta": "Staff ID Login."
  },
  "Weekend & Holiday Surcharge": {
    "zh": "周末与公共假期附加费",
    "bm": "Caj Tambahan Hujung Minggu & Cuti",
    "ta": "வார இறுதி & விடுமுறை கூடுதல் கட்டணம்"
  },
  "Nibong Tebal / Jawi / Sungai Bakap": {
    "zh": "Nibong Tebal / Jawi / Sungai Bakap",
    "bm": "Nibong Tebal / Jawi / Sungai Bakap",
    "ta": "Nibong Tebal / Jawi / Sungai Bakap"
  },
  "☎ 012-206 4868": {
    "zh": "☎ 012-206 4868",
    "bm": "☎ 012-206 4868",
    "ta": "☎ 012-206 4868"
  },
  "Medication": {
    "zh": "Medication",
    "bm": "Medication",
    "ta": "Medication"
  },
  "Address": {
    "zh": "Address",
    "bm": "Address",
    "ta": "Address"
  },
  "🔄 Reset Demo Database": {
    "zh": "🔄 Reset Demo Database",
    "bm": "🔄 Reset Demo Database",
    "ta": "🔄 Reset Demo Database"
  },
  "Search a service, procedure, or condition (e.g. wound, catheter, tube, stroke, bed, oxygen)...": {
    "zh": "搜索护理项目、医疗操作或病情（例如：换药、导尿管、鼻胃管、中风、病床、制氧机）...",
    "bm": "Cari perkhidmatan, prosedur, atau keadaan (cth. luka, kateter, tiub, strok, katil, oksigen)...",
    "ta": "ஒரு சேவை, செயல்முறை அல்லது நிலையைத் தேடுங்கள் (எ.கா. காயம், வடிகுழாய், குழாய், பக்கவாதம், படுக்கை, ஆக்ஸிஜன்)..."
  },
  "To be Penang's most trusted digital home healthcare service, empowering patients and families with transparent pricing, evidence-based nursing standards, real-time vital tracking, and genuine clinical empathy.": {
    "zh": "To be Penang's most trusted digital home healthcare service, empowering patients and families with transparent pricing, evidence-based nursing standards, real-time vital tracking, and genuine clinical empathy.",
    "bm": "To be Penang's most trusted digital home healthcare service, empowering patients and families with transparent pricing, evidence-based nursing standards, real-time vital tracking, and genuine clinical empathy.",
    "ta": "To be Penang's most trusted digital home healthcare service, empowering patients and families with transparent pricing, evidence-based nursing standards, real-time vital tracking, and genuine clinical empathy."
  },
  "● Interactive Walkthrough": {
    "zh": "● Interactive Walkthrough",
    "bm": "● Interactive Walkthrough",
    "ta": "● Interactive Walkthrough"
  },
  "AUGUST 2026 · CLINICAL TECHNOLOGY": {
    "zh": "AUGUST 2026 · CLINICAL TECHNOLOGY",
    "bm": "AUGUST 2026 · CLINICAL TECHNOLOGY",
    "ta": "AUGUST 2026 · CLINICAL TECHNOLOGY"
  },
  "RM 80 – RM 140 / mo": {
    "zh": "RM 80 – RM 140 / mo",
    "bm": "RM 80 – RM 140 / mo",
    "ta": "RM 80 – RM 140 / mo"
  },
  "We answer when we can, but we cannot promise immediate availability. If nobody answers, call 999 or go to the nearest clinic.": {
    "zh": "We answer when we can, but we cannot promise immediate availability. If nobody answers, call 999 or go to the nearest clinic.",
    "bm": "We answer when we can, but we cannot promise immediate availability. If nobody answers, call 999 or go to the nearest clinic.",
    "ta": "We answer when we can, but we cannot promise immediate availability. If nobody answers, call 999 or go to the nearest clinic."
  },
  "Please enter a phone number.": {
    "zh": "Please enter a phone number.",
    "bm": "Please enter a phone number.",
    "ta": "Please enter a phone number."
  },
  "Every home has unique spatial layouts, bed heights, and lighting. Our nurses assess the home setup, ergonomics, and accessibility to design a safe, practical daily care routine that fits your household.": {
    "zh": "Every home has unique spatial layouts, bed heights, and lighting. Our nurses assess the home setup, ergonomics, and accessibility to design a safe, practical daily care routine that fits your household.",
    "bm": "Every home has unique spatial layouts, bed heights, and lighting. Our nurses assess the home setup, ergonomics, and accessibility to design a safe, practical daily care routine that fits your household.",
    "ta": "Every home has unique spatial layouts, bed heights, and lighting. Our nurses assess the home setup, ergonomics, and accessibility to design a safe, practical daily care routine that fits your household."
  },
  "Mr. Jason Ng Lye Tiam, Registered Nurse & Clinical Director, provides professional MOH-guided nursing care, licensed nurses, and zero hidden fees.": {
    "zh": "Mr. Jason Ng Lye Tiam, Registered Nurse & Clinical Director, provides professional MOH-guided nursing care, licensed nurses, and zero hidden fees.",
    "bm": "Mr. Jason Ng Lye Tiam, Registered Nurse & Clinical Director, provides professional MOH-guided nursing care, licensed nurses, and zero hidden fees.",
    "ta": "Mr. Jason Ng Lye Tiam, Registered Nurse & Clinical Director, provides professional MOH-guided nursing care, licensed nurses, and zero hidden fees."
  },
  "📥 Download": {
    "zh": "📥 Download",
    "bm": "📥 Download",
    "ta": "📥 Download"
  },
  "to save": {
    "zh": "to save",
    "bm": "to save",
    "ta": "to save"
  },
  "Compassion First": {
    "zh": "Compassion First",
    "bm": "Compassion First",
    "ta": "Compassion First"
  },
  "KPJ Penang Specialist Hospital": {
    "zh": "KPJ Penang Specialist Hospital",
    "bm": "KPJ Penang Specialist Hospital",
    "ta": "KPJ Penang Specialist Hospital"
  },
  "Announcements & Nurse Recruitment": {
    "zh": "Announcements & Nurse Recruitment",
    "bm": "Announcements & Nurse Recruitment",
    "ta": "Announcements & Nurse Recruitment"
  },
  "Book a visit": {
    "zh": "Book a visit",
    "bm": "Book a visit",
    "ta": "Book a visit"
  },
  "中文": {
    "zh": "中文",
    "bm": "中文",
    "ta": "中文"
  },
  "☎ 04-229 2288": {
    "zh": "☎ 04-229 2288",
    "bm": "☎ 04-229 2288",
    "ta": "☎ 04-229 2288"
  },
  "📝 Online Form": {
    "zh": "📝 Online Form",
    "bm": "📝 Online Form",
    "ta": "📝 Online Form"
  },
  "📞 Call 999 (Emergency Ambulance)": {
    "zh": "📞 Call 999 (Emergency Ambulance)",
    "bm": "📞 Call 999 (Emergency Ambulance)",
    "ta": "📞 Call 999 (Emergency Ambulance)"
  },
  "🩺 Monitoring & Kits": {
    "zh": "🩺 Monitoring & Kits",
    "bm": "🩺 Monitoring & Kits",
    "ta": "🩺 Monitoring & Kits"
  },
  ": No password required. Open the App directly to browse clinical services and contact 24/7 rapid emergency dispatch.": {
    "zh": ": No password required. Open the App directly to browse clinical services and contact 24/7 rapid emergency dispatch.",
    "bm": ": No password required. Open the App directly to browse clinical services and contact 24/7 rapid emergency dispatch.",
    "ta": ": No password required. Open the App directly to browse clinical services and contact 24/7 rapid emergency dispatch."
  },
  "Heel of one hand on center of chest (lower breastbone), interlock other hand on top.": {
    "zh": "Heel of one hand on center of chest (lower breastbone), interlock other hand on top.",
    "bm": "Heel of one hand on center of chest (lower breastbone), interlock other hand on top.",
    "ta": "Heel of one hand on center of chest (lower breastbone), interlock other hand on top."
  },
  "Auto-Fill": {
    "zh": "Auto-Fill",
    "bm": "Auto-Fill",
    "ta": "Auto-Fill"
  },
  "Enter your Staff PIN": {
    "zh": "Enter your Staff PIN",
    "bm": "Enter your Staff PIN",
    "ta": "Enter your Staff PIN"
  },
  "Public & Families": {
    "zh": "Public & Families",
    "bm": "Public & Families",
    "ta": "Public & Families"
  },
  "needs — a blocked catheter, a dressing that won't stop bleeding, a tube that has come out — reach us directly:": {
    "zh": "needs — a blocked catheter, a dressing that won't stop bleeding, a tube that has come out — reach us directly:",
    "bm": "needs — a blocked catheter, a dressing that won't stop bleeding, a tube that has come out — reach us directly:",
    "ta": "needs — a blocked catheter, a dressing that won't stop bleeding, a tube that has come out — reach us directly:"
  },
  "📝 Book Form": {
    "zh": "📝 Book Form",
    "bm": "📝 Book Form",
    "ta": "📝 Book Form"
  },
  "New Patient Registration": {
    "zh": "New Patient Registration",
    "bm": "New Patient Registration",
    "ta": "New Patient Registration"
  },
  "☎ 016-417 2007": {
    "zh": "☎ 016-417 2007",
    "bm": "☎ 016-417 2007",
    "ta": "☎ 016-417 2007"
  },
  "3. Push Hard & Fast:": {
    "zh": "3. Push Hard & Fast:",
    "bm": "3. Push Hard & Fast:",
    "ta": "3. Push Hard & Fast:"
  },
  "Loh Guan Lye Specialists Centre": {
    "zh": "Loh Guan Lye Specialists Centre",
    "bm": "Loh Guan Lye Specialists Centre",
    "ta": "Loh Guan Lye Specialists Centre"
  },
  "Clinical-grade automated NIBP Blood Pressure, Pulse Rate, and Oxygen Saturation monitoring.": {
    "zh": "Clinical-grade automated NIBP Blood Pressure, Pulse Rate, and Oxygen Saturation monitoring.",
    "bm": "Clinical-grade automated NIBP Blood Pressure, Pulse Rate, and Oxygen Saturation monitoring.",
    "ta": "Clinical-grade automated NIBP Blood Pressure, Pulse Rate, and Oxygen Saturation monitoring."
  },
  ": Enter your Case Access Code (e.g.": {
    "zh": ": Enter your Case Access Code (e.g.",
    "bm": ": Enter your Case Access Code (e.g.",
    "ta": ": Enter your Case Access Code (e.g."
  },
  "Step 3: Staff Portal": {
    "zh": "Step 3: Staff Portal",
    "bm": "Step 3: Staff Portal",
    "ta": "Step 3: Staff Portal"
  },
  "AD #2 · FOUNDER PROMISE": {
    "zh": "AD #2 · FOUNDER PROMISE",
    "bm": "AD #2 · FOUNDER PROMISE",
    "ta": "AD #2 · FOUNDER PROMISE"
  },
  "Focus on post-hospital discharge wound dressing (ANTT), Foley catheter & Ryle's tube replacement to prevent infections and readmissions.": {
    "zh": "Focus on post-hospital discharge wound dressing (ANTT), Foley catheter & Ryle's tube replacement to prevent infections and readmissions.",
    "bm": "Focus on post-hospital discharge wound dressing (ANTT), Foley catheter & Ryle's tube replacement to prevent infections and readmissions.",
    "ta": "Focus on post-hospital discharge wound dressing (ANTT), Foley catheter & Ryle's tube replacement to prevent infections and readmissions."
  },
  "☎ 010-520 5375": {
    "zh": "☎ 010-520 5375",
    "bm": "☎ 010-520 5375",
    "ta": "☎ 010-520 5375"
  },
  "308, Macalister Road / Peel Avenue, 10450 George Town": {
    "zh": "308, Macalister Road / Peel Avenue, 10450 George Town",
    "bm": "308, Macalister Road / Peel Avenue, 10450 George Town",
    "ta": "308, Macalister Road / Peel Avenue, 10450 George Town"
  },
  "♿ Transfer & Hygiene": {
    "zh": "♿ Transfer & Hygiene",
    "bm": "♿ Transfer & Hygiene",
    "ta": "♿ Transfer & Hygiene"
  },
  "v2.4 · Android APK · Windows EXE · Web PWA": {
    "zh": "v2.4 · Android APK · Windows EXE · Web PWA",
    "bm": "v2.4 · Android APK · Windows EXE · Web PWA",
    "ta": "v2.4 · Android APK · Windows EXE · Web PWA"
  },
  "e.g. Tan Ah Kow / Jason Tan": {
    "zh": "e.g. Tan Ah Kow / Jason Tan",
    "bm": "e.g. Tan Ah Kow / Jason Tan",
    "ta": "e.g. Tan Ah Kow / Jason Tan"
  },
  "Active Patients & Families (Case Link)": {
    "zh": "Active Patients & Families (Case Link)",
    "bm": "Active Patients & Families (Case Link)",
    "ta": "Active Patients & Families (Case Link)"
  },
  "📍 Google Maps": {
    "zh": "📍 Google Maps",
    "bm": "📍 Google Maps",
    "ta": "📍 Google Maps"
  },
  "📱 Interactive First Aid & CPR Simulator": {
    "zh": "📱 Interactive First Aid & CPR Simulator",
    "bm": "📱 Interactive First Aid & CPR Simulator",
    "ta": "📱 Interactive First Aid & CPR Simulator"
  },
  "Works on Locked / No-SIM phones": {
    "zh": "Works on Locked / No-SIM phones",
    "bm": "Works on Locked / No-SIM phones",
    "ta": "Works on Locked / No-SIM phones"
  },
  "👤 Patients & Families": {
    "zh": "👤 Patients & Families",
    "bm": "👤 Patients & Families",
    "ta": "👤 Patients & Families"
  },
  "🛡️ Licensed LJM Nurses": {
    "zh": "🛡️ Licensed LJM Nurses",
    "bm": "🛡️ Licensed LJM Nurses",
    "ta": "🛡️ Licensed LJM Nurses"
  },
  "24/7 Disaster & Medical Emergency Response": {
    "zh": "24/7 Disaster & Medical Emergency Response",
    "bm": "24/7 Disaster & Medical Emergency Response",
    "ta": "24/7 Disaster & Medical Emergency Response"
  },
  "Delivers continuous 90–96% high-purity medical oxygen without heavy gas cylinders.": {
    "zh": "Delivers continuous 90–96% high-purity medical oxygen without heavy gas cylinders.",
    "bm": "Delivers continuous 90–96% high-purity medical oxygen without heavy gas cylinders.",
    "ta": "Delivers continuous 90–96% high-purity medical oxygen without heavy gas cylinders."
  },
  "🎬 First-Time User Guide Video & Memo": {
    "zh": "🎬 First-Time User Guide Video & Memo",
    "bm": "🎬 First-Time User Guide Video & Memo",
    "ta": "🎬 First-Time User Guide Video & Memo"
  },
  "Patients/Family:": {
    "zh": "Patients/Family:",
    "bm": "Patients/Family:",
    "ta": "Patients/Family:"
  },
  "📌 First-Time User Memo:": {
    "zh": "📌 First-Time User Memo:",
    "bm": "📌 First-Time User Memo:",
    "ta": "📌 First-Time User Memo:"
  },
  "⚡ Estimate Rate": {
    "zh": "⚡ Estimate Rate",
    "bm": "⚡ Estimate Rate",
    "ta": "⚡ Estimate Rate"
  },
  "Sign in with your registered Staff ID inside the app to unlock patient vitals entry, MEWS scoring, and shift roster management.": {
    "zh": "Sign in with your registered Staff ID inside the app to unlock patient vitals entry, MEWS scoring, and shift roster management.",
    "bm": "Sign in with your registered Staff ID inside the app to unlock patient vitals entry, MEWS scoring, and shift roster management.",
    "ta": "Sign in with your registered Staff ID inside the app to unlock patient vitals entry, MEWS scoring, and shift roster management."
  },
  "Mobile Phone Number": {
    "zh": "Mobile Phone Number",
    "bm": "Mobile Phone Number",
    "ta": "Mobile Phone Number"
  },
  "Assura Nursing — home": {
    "zh": "Assura Nursing — home",
    "bm": "Assura Nursing — home",
    "ta": "Assura Nursing — home"
  },
  "Island Hospital Penang": {
    "zh": "Island Hospital Penang",
    "bm": "Island Hospital Penang",
    "ta": "Island Hospital Penang"
  },
  "12A, Jalan Masjid Negeri, 11600 George Town, Penang": {
    "zh": "12A, Jalan Masjid Negeri, 11600 George Town, Penang",
    "bm": "12A, Jalan Masjid Negeri, 11600 George Town, Penang",
    "ta": "12A, Jalan Masjid Negeri, 11600 George Town, Penang"
  },
  "After hospital discharge, families frequently feel lost dealing with wound changes, feeding tubes, catheters, or bed transfers in a home environment that wasn't built like a clinic. Working adult children are stressed about causing infections or doing procedures incorrectly.": {
    "zh": "After hospital discharge, families frequently feel lost dealing with wound changes, feeding tubes, catheters, or bed transfers in a home environment that wasn't built like a clinic. Working adult children are stressed about causing infections or doing procedures incorrectly.",
    "bm": "After hospital discharge, families frequently feel lost dealing with wound changes, feeding tubes, catheters, or bed transfers in a home environment that wasn't built like a clinic. Working adult children are stressed about causing infections or doing procedures incorrectly.",
    "ta": "After hospital discharge, families frequently feel lost dealing with wound changes, feeding tubes, catheters, or bed transfers in a home environment that wasn't built like a clinic. Working adult children are stressed about causing infections or doing procedures incorrectly."
  },
  "Administer feeding formula slowly via gravity (200–250ml over 20–30 minutes).": {
    "zh": "Administer feeding formula slowly via gravity (200–250ml over 20–30 minutes).",
    "bm": "Administer feeding formula slowly via gravity (200–250ml over 20–30 minutes).",
    "ta": "Administer feeding formula slowly via gravity (200–250ml over 20–30 minutes)."
  },
  "Bed-Bound Patient Care": {
    "zh": "Bed-Bound Patient Care",
    "bm": "Bed-Bound Patient Care",
    "ta": "Bed-Bound Patient Care"
  },
  "Penang General Hospital (HPP)": {
    "zh": "Penang General Hospital (HPP)",
    "bm": "Penang General Hospital (HPP)",
    "ta": "Penang General Hospital (HPP)"
  },
  "↑ Back to the form ·": {
    "zh": "↑ Back to the form ·",
    "bm": "↑ Back to the form ·",
    "ta": "↑ Back to the form ·"
  },
  "Medical Oxygen Concentrator (5L/10L)": {
    "zh": "Medical Oxygen Concentrator (5L/10L)",
    "bm": "Medical Oxygen Concentrator (5L/10L)",
    "ta": "Medical Oxygen Concentrator (5L/10L)"
  },
  "Ensure tubing is free of loops, kinks, or tension that can cause urethral trauma.": {
    "zh": "Ensure tubing is free of loops, kinks, or tension that can cause urethral trauma.",
    "bm": "Ensure tubing is free of loops, kinks, or tension that can cause urethral trauma.",
    "ta": "Ensure tubing is free of loops, kinks, or tension that can cause urethral trauma."
  },
  "☎ 04-646 3999": {
    "zh": "☎ 04-646 3999",
    "bm": "☎ 04-646 3999",
    "ta": "☎ 04-646 3999"
  },
  "📊 Real-Time MEWS Records": {
    "zh": "📊 Real-Time MEWS Records",
    "bm": "📊 Real-Time MEWS Records",
    "ta": "📊 Real-Time MEWS Records"
  },
  "தமிழ்": {
    "zh": "தமிழ்",
    "bm": "தமிழ்",
    "ta": "தமிழ்"
  },
  "Hospital Discharge & Sterile Wound Care": {
    "zh": "Hospital Discharge & Sterile Wound Care",
    "bm": "Hospital Discharge & Sterile Wound Care",
    "ta": "Hospital Discharge & Sterile Wound Care"
  },
  "How to Run Windows App (.exe):": {
    "zh": "How to Run Windows App (.exe):",
    "bm": "How to Run Windows App (.exe):",
    "ta": "How to Run Windows App (.exe):"
  },
  "admin@assuranursing.com": {
    "zh": "admin@assuranursing.com",
    "bm": "admin@assuranursing.com",
    "ta": "admin@assuranursing.com"
  },
  "Flip-up armrests for seamless lateral sliding transfers from bed with waterproof padded commode seat.": {
    "zh": "Flip-up armrests for seamless lateral sliding transfers from bed with waterproof padded commode seat.",
    "bm": "Flip-up armrests for seamless lateral sliding transfers from bed with waterproof padded commode seat.",
    "ta": "Flip-up armrests for seamless lateral sliding transfers from bed with waterproof padded commode seat."
  },
  "🏥 Hospital Acute Care Background": {
    "zh": "🏥 Hospital Acute Care Background",
    "bm": "🏥 Hospital Acute Care Background",
    "ta": "🏥 Hospital Acute Care Background"
  },
  "24/7 Emergency Line:": {
    "zh": "24/7 Emergency Line:",
    "bm": "24/7 Emergency Line:",
    "ta": "24/7 Emergency Line:"
  },
  "Tailored Clinical Nursing Care:": {
    "zh": "Tailored Clinical Nursing Care:",
    "bm": "Tailored Clinical Nursing Care:",
    "ta": "Tailored Clinical Nursing Care:"
  },
  "Please choose a time.": {
    "zh": "Please choose a time.",
    "bm": "Please choose a time.",
    "ta": "Please choose a time."
  },
  "👤 Patient & Family": {
    "zh": "👤 Patient & Family",
    "bm": "👤 Patient & Family",
    "ta": "👤 Patient & Family"
  },
  "to solve this exact challenge: our nurses and caregivers are trained to evaluate the home setting, plan safe bedside workflows, and guide family members—all while strictly adhering to Malaysian Ministry of Health (MOH) and Nursing Board (LJM) clinical protocols.": {
    "zh": "to solve this exact challenge: our nurses and caregivers are trained to evaluate the home setting, plan safe bedside workflows, and guide family members—all while strictly adhering to Malaysian Ministry of Health (MOH) and Nursing Board (LJM) clinical protocols.",
    "bm": "to solve this exact challenge: our nurses and caregivers are trained to evaluate the home setting, plan safe bedside workflows, and guide family members—all while strictly adhering to Malaysian Ministry of Health (MOH) and Nursing Board (LJM) clinical protocols.",
    "ta": "to solve this exact challenge: our nurses and caregivers are trained to evaluate the home setting, plan safe bedside workflows, and guide family members—all while strictly adhering to Malaysian Ministry of Health (MOH) and Nursing Board (LJM) clinical protocols."
  },
  "RM 50 – RM 80 / mo": {
    "zh": "RM 50 – RM 80 / mo",
    "bm": "RM 50 – RM 80 / mo",
    "ta": "RM 50 – RM 80 / mo"
  },
  "⚡ Install": {
    "zh": "⚡ Install",
    "bm": "⚡ Install",
    "ta": "⚡ Install"
  },
  "📊 Digital MEWS & Family Care": {
    "zh": "📊 云端 MEWS 体征与家属关怀",
    "bm": "📊 MEWS Digital & Penjagaan Keluarga",
    "ta": "📊 டிஜிட்டல் MEWS & குடும்ப பராமரிப்பு"
  },
  "Bayan Lepas / Queensbay / Relau": {
    "zh": "Bayan Lepas / Queensbay / Relau",
    "bm": "Bayan Lepas / Queensbay / Relau",
    "ta": "Bayan Lepas / Queensbay / Relau"
  },
  "Medication Safety & Standard Times": {
    "zh": "Medication Safety & Standard Times",
    "bm": "Medication Safety & Standard Times",
    "ta": "Medication Safety & Standard Times"
  },
  "🩸 Wound Care & Infection Risk Minimization": {
    "zh": "🩸 Wound Care & Infection Risk Minimization",
    "bm": "🩸 Wound Care & Infection Risk Minimization",
    "ta": "🩸 Wound Care & Infection Risk Minimization"
  },
  "🫁 Respiratory": {
    "zh": "🫁 Respiratory",
    "bm": "🫁 Respiratory",
    "ta": "🫁 Respiratory"
  },
  "Patient coughs persistently, vomits, experiences choking, or struggles to breathe.": {
    "zh": "Patient coughs persistently, vomits, experiences choking, or struggles to breathe.",
    "bm": "Patient coughs persistently, vomits, experiences choking, or struggles to breathe.",
    "ta": "Patient coughs persistently, vomits, experiences choking, or struggles to breathe."
  },
  "Staff Security PIN": {
    "zh": "Staff Security PIN",
    "bm": "Staff Security PIN",
    "ta": "Staff Security PIN"
  },
  "Choose date and time": {
    "zh": "Choose date and time",
    "bm": "Choose date and time",
    "ta": "Choose date and time"
  },
  "Open Clinical Portal": {
    "zh": "Open Clinical Portal",
    "bm": "Open Clinical Portal",
    "ta": "Open Clinical Portal"
  },
  "Butterworth / Perai / Seberang Jaya": {
    "zh": "Butterworth / Perai / Seberang Jaya",
    "bm": "Butterworth / Perai / Seberang Jaya",
    "ta": "Butterworth / Perai / Seberang Jaya"
  },
  "Every patient is cared for under strict ethical standards, licensed clinical supervision, and transparent coordination.": {
    "zh": "Every patient is cared for under strict ethical standards, licensed clinical supervision, and transparent coordination.",
    "bm": "Every patient is cared for under strict ethical standards, licensed clinical supervision, and transparent coordination.",
    "ta": "Every patient is cared for under strict ethical standards, licensed clinical supervision, and transparent coordination."
  },
  "Download Assura Nursing App · Android APK & Windows Desktop": {
    "zh": "Download Assura Nursing App · Android APK & Windows Desktop",
    "bm": "Download Assura Nursing App · Android APK & Windows Desktop",
    "ta": "Download Assura Nursing App · Android APK & Windows Desktop"
  },
  "Medical Equipment Rental": {
    "zh": "医用器材租借与急送",
    "bm": "Penyewaan Peralatan Perubatan",
    "ta": "மருத்துவ உபகரண வாடகை"
  },
  "22A, Jalan Sultan Ahmad Shah, 10050 George Town": {
    "zh": "22A, Jalan Sultan Ahmad Shah, 10050 George Town",
    "bm": "22A, Jalan Sultan Ahmad Shah, 10050 George Town",
    "ta": "22A, Jalan Sultan Ahmad Shah, 10050 George Town"
  },
  "LOCATION IN PENANG (ALL AREAS COVERED)": {
    "zh": "LOCATION IN PENANG (ALL AREAS COVERED)",
    "bm": "LOCATION IN PENANG (ALL AREAS COVERED)",
    "ta": "LOCATION IN PENANG (ALL AREAS COVERED)"
  },
  "Perform gentle peri-care twice daily with mild soap and clean warm water.": {
    "zh": "Perform gentle peri-care twice daily with mild soap and clean warm water.",
    "bm": "Perform gentle peri-care twice daily with mild soap and clean warm water.",
    "ta": "Perform gentle peri-care twice daily with mild soap and clean warm water."
  },
  "🧠 Stroke & Post-Op Rehab": {
    "zh": "🧠 Stroke & Post-Op Rehab",
    "bm": "🧠 Stroke & Post-Op Rehab",
    "ta": "🧠 Stroke & Post-Op Rehab"
  },
  "Any Nurse / Caregiver": {
    "zh": "Any Nurse / Caregiver",
    "bm": "Any Nurse / Caregiver",
    "ta": "Any Nurse / Caregiver"
  },
  "Stop Feeding Immediately If:": {
    "zh": "Stop Feeding Immediately If:",
    "bm": "Stop Feeding Immediately If:",
    "ta": "Stop Feeding Immediately If:"
  },
  "🩺 Direct Staff Workspace Link →": {
    "zh": "🩺 Direct Staff Workspace Link →",
    "bm": "🩺 Direct Staff Workspace Link →",
    "ta": "🩺 Direct Staff Workspace Link →"
  },
  "2. Position Hands:": {
    "zh": "2. Position Hands:",
    "bm": "2. Position Hands:",
    "ta": "2. Position Hands:"
  },
  "← Back to Home": {
    "zh": "← Back to Home",
    "bm": "← Back to Home",
    "ta": "← Back to Home"
  },
  "🏥 Penang Mainland Hospitals (Seberang Perai)": {
    "zh": "🏥 Penang Mainland Hospitals (Seberang Perai)",
    "bm": "🏥 Penang Mainland Hospitals (Seberang Perai)",
    "ta": "🏥 Penang Mainland Hospitals (Seberang Perai)"
  },
  "AssuraNursing.apk": {
    "zh": "AssuraNursing.apk",
    "bm": "AssuraNursing.apk",
    "ta": "AssuraNursing.apk"
  },
  "☎ 04-866 9333": {
    "zh": "☎ 04-866 9333",
    "bm": "☎ 04-866 9333",
    "ta": "☎ 04-866 9333"
  },
  "Post-Operative Care": {
    "zh": "Post-Operative Care",
    "bm": "Post-Operative Care",
    "ta": "Post-Operative Care"
  },
  "82, Jalan Tengah, Bandar Bayan Baru, 11900 Bayan Lepas": {
    "zh": "82, Jalan Tengah, Bandar Bayan Baru, 11900 Bayan Lepas",
    "bm": "82, Jalan Tengah, Bandar Bayan Baru, 11900 Bayan Lepas",
    "ta": "82, Jalan Tengah, Bandar Bayan Baru, 11900 Bayan Lepas"
  },
  "Northern Heart Hospital Penang": {
    "zh": "Northern Heart Hospital Penang",
    "bm": "Northern Heart Hospital Penang",
    "ta": "Northern Heart Hospital Penang"
  },
  "\"Why We Built Assura: Planning Care Around Your Home Without Compromising Clinical Fundamentals\"": {
    "zh": "“为何创立 Assura：因地制宜规划家庭护理，恪守医疗无菌根本”",
    "bm": "\"Mengapa Kami Menubuhkan Assura: Merancang Penjagaan di Rumah Anda Tanpa Mengabaikan Asas Klinikal\"",
    "ta": "\"நாங்கள் ஏன் அசுராவை உருவாக்கினோம்: மருத்துவ அடிப்படைகளை சமரசம் செய்யாமல் உங்கள் வீட்டைச் சுற்றி கவனிப்பைத் திட்டமிடுதல்\""
  },
  "🩺 Supplies": {
    "zh": "🩺 Supplies",
    "bm": "🩺 Supplies",
    "ta": "🩺 Supplies"
  },
  "v2.4 · 2.1 MB · PC & Workstations · Standalone": {
    "zh": "v2.4 · 2.1 MB · PC & Workstations · Standalone",
    "bm": "v2.4 · 2.1 MB · PC & Workstations · Standalone",
    "ta": "v2.4 · 2.1 MB · PC & Workstations · Standalone"
  },
  "📱 Official Unified Client": {
    "zh": "📱 Official Unified Client",
    "bm": "📱 Official Unified Client",
    "ta": "📱 Official Unified Client"
  },
  "Medical Compressor Nebulizer": {
    "zh": "Medical Compressor Nebulizer",
    "bm": "Medical Compressor Nebulizer",
    "ta": "Medical Compressor Nebulizer"
  },
  "Digital Vital Signs & SpO2 Monitor": {
    "zh": "Digital Vital Signs & SpO2 Monitor",
    "bm": "Digital Vital Signs & SpO2 Monitor",
    "ta": "Digital Vital Signs & SpO2 Monitor"
  },
  "💬 Chat with Our Team": {
    "zh": "💬 Chat with Our Team",
    "bm": "💬 Chat with Our Team",
    "ta": "💬 Chat with Our Team"
  },
  "Just asking": {
    "zh": "Just asking",
    "bm": "Just asking",
    "ta": "Just asking"
  },
  "Step-by-Step Practical Guidelines": {
    "zh": "Step-by-Step Practical Guidelines",
    "bm": "Step-by-Step Practical Guidelines",
    "ta": "Step-by-Step Practical Guidelines"
  },
  "Advanced Life Support (ALS) & Inter-State Transfers": {
    "zh": "Advanced Life Support (ALS) & Inter-State Transfers",
    "bm": "Advanced Life Support (ALS) & Inter-State Transfers",
    "ta": "Advanced Life Support (ALS) & Inter-State Transfers"
  },
  "Discover Assura Nursing in 60 Seconds": {
    "zh": "Discover Assura Nursing in 60 Seconds",
    "bm": "Discover Assura Nursing in 60 Seconds",
    "ta": "Discover Assura Nursing in 60 Seconds"
  },
  "🎬 Official Clinical Campaigns & Media Resources": {
    "zh": "🎬 Official Clinical Campaigns & Media Resources",
    "bm": "🎬 Official Clinical Campaigns & Media Resources",
    "ta": "🎬 Official Clinical Campaigns & Media Resources"
  },
  "Founder & Clinical Director Promise · Jason Ng": {
    "zh": "Founder & Clinical Director Promise · Jason Ng",
    "bm": "Founder & Clinical Director Promise · Jason Ng",
    "ta": "Founder & Clinical Director Promise · Jason Ng"
  },
  "Your browser does not support the video tag.": {
    "zh": "Your browser does not support the video tag.",
    "bm": "Your browser does not support the video tag.",
    "ta": "Your browser does not support the video tag."
  },
  "Everything you need to know about using the Assura Nursing App on your phone, tablet, or desktop:": {
    "zh": "Everything you need to know about using the Assura Nursing App on your phone, tablet, or desktop:",
    "bm": "Everything you need to know about using the Assura Nursing App on your phone, tablet, or desktop:",
    "ta": "Everything you need to know about using the Assura Nursing App on your phone, tablet, or desktop:"
  },
  "💬 Speak Directly with Clinical Director": {
    "zh": "💬 Speak Directly with Clinical Director",
    "bm": "💬 Speak Directly with Clinical Director",
    "ta": "💬 Speak Directly with Clinical Director"
  },
  "Clinical Services & Rates": {
    "zh": "Clinical Services & Rates",
    "bm": "Clinical Services & Rates",
    "ta": "Clinical Services & Rates"
  },
  "Protect healing tissue and prevent bacterial infection using certified Aseptic Non-Touch Technique (ANTT).": {
    "zh": "Protect healing tissue and prevent bacterial infection using certified Aseptic Non-Touch Technique (ANTT).",
    "bm": "Protect healing tissue and prevent bacterial infection using certified Aseptic Non-Touch Technique (ANTT).",
    "ta": "Protect healing tissue and prevent bacterial infection using certified Aseptic Non-Touch Technique (ANTT)."
  },
  "⏱️": {
    "zh": "⏱️",
    "bm": "⏱️",
    "ta": "⏱️"
  },
  "Apply primary prescribed dressing (hydrocolloid / foam) and secure edges firmly.": {
    "zh": "Apply primary prescribed dressing (hydrocolloid / foam) and secure edges firmly.",
    "bm": "Apply primary prescribed dressing (hydrocolloid / foam) and secure edges firmly.",
    "ta": "Apply primary prescribed dressing (hydrocolloid / foam) and secure edges firmly."
  },
  "Lam Wah Ee Hospital (HLWE)": {
    "zh": "Lam Wah Ee Hospital (HLWE)",
    "bm": "Lam Wah Ee Hospital (HLWE)",
    "ta": "Lam Wah Ee Hospital (HLWE)"
  },
  "🚀 Open": {
    "zh": "🚀 Open",
    "bm": "🚀 Open",
    "ta": "🚀 Open"
  },
  "Tap": {
    "zh": "Tap",
    "bm": "Tap",
    "ta": "Tap"
  },
  "3. Individualized Care Roadmap": {
    "zh": "3. Individualized Care Roadmap",
    "bm": "3. Individualized Care Roadmap",
    "ta": "3. Individualized Care Roadmap"
  },
  "Role": {
    "zh": "Role",
    "bm": "Role",
    "ta": "Role"
  },
  "LJM Registered Nurses & Dedicated Caregivers · Penang Island & Mainland": {
    "zh": "LJM Registered Nurses & Dedicated Caregivers · Penang Island & Mainland",
    "bm": "LJM Registered Nurses & Dedicated Caregivers · Penang Island & Mainland",
    "ta": "LJM Registered Nurses & Dedicated Caregivers · Penang Island & Mainland"
  },
  "\"To deliver accessible, personalized clinical nursing and compassionate home care—expertly adapting each care plan to the family's unique home environment with trained professional handling that minimizes infection risks while upholding fundamental nursing safety and patient dignity.\"": {
    "zh": "“提供触手可及、量身定制的专业临床护理与温情居家照护——因地制宜结合家庭实际环境，由专业培训医护规范操作，严防感染风险，全力守护医疗安全与病患尊严。”",
    "bm": "\"Menyampaikan kejururawatan klinikal yang mudah diakses dan diperibadikan serta penjagaan rumah penuh belas kasihan—menyesuaikan setiap pelan penjagaan mengikut persekitaran rumah keluarga dengan pengendalian profesional terlatih yang meminimumkan risiko jangkitan sambil menegakkan keselamatan dan maruah pesakit.\"",
    "ta": "\"அணுகக்கூடிய, தனிப்பயனாக்கப்பட்ட மருத்துவ நர்சிங் மற்றும் இரக்கமுள்ள வீட்டு பராமரிப்பை வழங்குதல்—ஒவ்வொரு பராமரிப்பு திட்டத்தையும் குடும்பத்தின் தனித்துவமான வீட்டுச் சூழலுக்கு ஏற்ப மாற்றியமைத்து தொற்று அபாயங்களைக் குறைத்து நோயாளியின் கண்ணியத்தைப் பாதுகாத்தல்.\""
  },
  "2. Uncompromising Nursing Fundamentals": {
    "zh": "2. Uncompromising Nursing Fundamentals",
    "bm": "2. Uncompromising Nursing Fundamentals",
    "ta": "2. Uncompromising Nursing Fundamentals"
  },
  "🛠️ Clinical Sandbox & Testing Accounts": {
    "zh": "🛠️ Clinical Sandbox & Testing Accounts",
    "bm": "🛠️ Clinical Sandbox & Testing Accounts",
    "ta": "🛠️ Clinical Sandbox & Testing Accounts"
  },
  "How to Install Android APK:": {
    "zh": "How to Install Android APK:",
    "bm": "How to Install Android APK:",
    "ta": "How to Install Android APK:"
  },
  "📁 Medical Vault": {
    "zh": "📁 Medical Vault",
    "bm": "📁 Medical Vault",
    "ta": "📁 Medical Vault"
  },
  "While adapting to the home, our trained nurses maintain professional handling and aseptic non-touch technique (ANTT) for wound dressings and catheterizations—managing a clean procedural field to minimize infection risks even in a home setting.": {
    "zh": "While adapting to the home, our trained nurses maintain professional handling and aseptic non-touch technique (ANTT) for wound dressings and catheterizations—managing a clean procedural field to minimize infection risks even in a home setting.",
    "bm": "While adapting to the home, our trained nurses maintain professional handling and aseptic non-touch technique (ANTT) for wound dressings and catheterizations—managing a clean procedural field to minimize infection risks even in a home setting.",
    "ta": "While adapting to the home, our trained nurses maintain professional handling and aseptic non-touch technique (ANTT) for wound dressings and catheterizations—managing a clean procedural field to minimize infection risks even in a home setting."
  },
  "Case Code or Phone ·": {
    "zh": "Case Code or Phone ·",
    "bm": "Case Code or Phone ·",
    "ta": "Case Code or Phone ·"
  },
  "RM 0": {
    "zh": "RM 0",
    "bm": "RM 0",
    "ta": "RM 0"
  },
  "PENANG HOME NURSING CARE": {
    "zh": "PENANG HOME NURSING CARE",
    "bm": "PENANG HOME NURSING CARE",
    "ta": "PENANG HOME NURSING CARE"
  },
  "Status": {
    "zh": "Status",
    "bm": "Status",
    "ta": "Status"
  },
  "Clinical Staff ID / Email / Phone": {
    "zh": "Clinical Staff ID / Email / Phone",
    "bm": "Clinical Staff ID / Email / Phone",
    "ta": "Clinical Staff ID / Email / Phone"
  },
  "nursing": {
    "zh": "nursing",
    "bm": "nursing",
    "ta": "nursing"
  },
  "application.": {
    "zh": "application.",
    "bm": "application.",
    "ta": "application."
  },
  "Patient (Stroke Rehab)": {
    "zh": "Patient (Stroke Rehab)",
    "bm": "Patient (Stroke Rehab)",
    "ta": "Patient (Stroke Rehab)"
  },
  "\"Planning Care Around Your Home Without Compromising Clinical Fundamentals\"": {
    "zh": "“因地制宜规划家庭护理 · 恪守医疗无菌根本”",
    "bm": "\"Merancang Penjagaan di Rumah Anda Tanpa Mengabaikan Asas Klinikal\"",
    "ta": "\"மருத்துவ அடிப்படைகளை சமரசம் செய்யாமல் உங்கள் வீட்டைச் சுற்றி கவனிப்பைத் திட்டமிடுதல்\""
  },
  "⚠️": {
    "zh": "⚠️",
    "bm": "⚠️",
    "ta": "⚠️"
  },
  "UNIFIED PORTAL ACCESS": {
    "zh": "UNIFIED PORTAL ACCESS",
    "bm": "UNIFIED PORTAL ACCESS",
    "ta": "UNIFIED PORTAL ACCESS"
  },
  "Passive and active range-of-motion (ROM) exercises, bed-to-chair transfers, mobility assistance, and fall prevention guidance.": {
    "zh": "Passive and active range-of-motion (ROM) exercises, bed-to-chair transfers, mobility assistance, and fall prevention guidance.",
    "bm": "Passive and active range-of-motion (ROM) exercises, bed-to-chair transfers, mobility assistance, and fall prevention guidance.",
    "ta": "Passive and active range-of-motion (ROM) exercises, bed-to-chair transfers, mobility assistance, and fall prevention guidance."
  },
  "Loading medications...": {
    "zh": "Loading medications...",
    "bm": "Loading medications...",
    "ta": "Loading medications..."
  },
  "supervisor@assuranursing.com": {
    "zh": "supervisor@assuranursing.com",
    "bm": "supervisor@assuranursing.com",
    "ta": "supervisor@assuranursing.com"
  },
  "Admin (Director)": {
    "zh": "Admin (Director)",
    "bm": "Admin (Director)",
    "ta": "Admin (Director)"
  },
  "🧪 Tube & Catheter Management": {
    "zh": "🧪 Tube & Catheter Management",
    "bm": "🧪 Tube & Catheter Management",
    "ta": "🧪 Tube & Catheter Management"
  },
  "Standard Malaysian Clinical Dosing Schedule": {
    "zh": "Standard Malaysian Clinical Dosing Schedule",
    "bm": "Standard Malaysian Clinical Dosing Schedule",
    "ta": "Standard Malaysian Clinical Dosing Schedule"
  },
  "Do Not Crush:": {
    "zh": "Do Not Crush:",
    "bm": "Do Not Crush:",
    "ta": "Do Not Crush:"
  },
  "110 BPM Standard Rhythm": {
    "zh": "110 BPM Standard Rhythm",
    "bm": "110 BPM Standard Rhythm",
    "ta": "110 BPM Standard Rhythm"
  },
  "Enforce a strict 2-hourly turning schedule (Left lateral → Supine → Right lateral).": {
    "zh": "Enforce a strict 2-hourly turning schedule (Left lateral → Supine → Right lateral).",
    "bm": "Enforce a strict 2-hourly turning schedule (Left lateral → Supine → Right lateral).",
    "ta": "Enforce a strict 2-hourly turning schedule (Left lateral → Supine → Right lateral)."
  },
  "Attentive daily nursing, feeding tube (Ryle's tube/NG tube) replacement, catheter (CBD) care, gentle bed transfers, and vital monitoring.": {
    "zh": "细心日常护理、鼻胃管与导尿管上门插管置换、床上温水擦浴、轻柔协助移位以及生命体征每日监测。",
    "bm": "Penjagaan kejururawatan harian yang teliti, penukaran tiub pemakanan (tiub Ryle/NG), tiub kencing (CBD), pemindahan katil yang lembut, dan pemantauan tanda vital.",
    "ta": "கனிவான தினசரி நர்சிங், உணவுக் குழாய் (Ryle's tube/NG tube) மாற்றுதல், வடிகுழாய் (CBD) பராமரிப்பு, படுக்கை இடமாற்றம் மற்றும் முக்கிய அறிகுறிகள் கண்காணிப்பு."
  },
  "Aspiration Prevention & Bolus Protocol": {
    "zh": "Aspiration Prevention & Bolus Protocol",
    "bm": "Aspiration Prevention & Bolus Protocol",
    "ta": "Aspiration Prevention & Bolus Protocol"
  },
  "Preferred date": {
    "zh": "Preferred date",
    "bm": "Preferred date",
    "ta": "Preferred date"
  },
  "1. Home Environment Assessment & Planning": {
    "zh": "1. Home Environment Assessment & Planning",
    "bm": "1. Home Environment Assessment & Planning",
    "ta": "1. Home Environment Assessment & Planning"
  },
  "← Previous": {
    "zh": "← Previous",
    "bm": "← Previous",
    "ta": "← Previous"
  },
  "☎ 04-332 2800": {
    "zh": "☎ 04-332 2800",
    "bm": "☎ 04-332 2800",
    "ta": "☎ 04-332 2800"
  },
  "Frequency": {
    "zh": "Frequency",
    "bm": "Frequency",
    "ta": "Frequency"
  },
  "Medication administration tracking (MAR)": {
    "zh": "电子用药打卡与医嘱同步核对",
    "bm": "Penjejakan pemberian ubat (MAR)",
    "ta": "மருந்து நிர்வாக கண்காணிப்பு (MAR)"
  },
  "RM 180 / mo": {
    "zh": "RM 180 / mo",
    "bm": "RM 180 / mo",
    "ta": "RM 180 / mo"
  },
  "🛡️ PDPA Privacy & Consent": {
    "zh": "🛡️ PDPA Privacy & Consent",
    "bm": "🛡️ PDPA Privacy & Consent",
    "ta": "🛡️ PDPA Privacy & Consent"
  },
  "Our experienced nursing team formulates an individualized home recovery schedule, clinical supplies checklist, and transparent fee quote.": {
    "zh": "Our experienced nursing team formulates an individualized home recovery schedule, clinical supplies checklist, and transparent fee quote.",
    "bm": "Our experienced nursing team formulates an individualized home recovery schedule, clinical supplies checklist, and transparent fee quote.",
    "ta": "Our experienced nursing team formulates an individualized home recovery schedule, clinical supplies checklist, and transparent fee quote."
  },
  "✓ Register Patient Account": {
    "zh": "✓ Register Patient Account",
    "bm": "✓ Register Patient Account",
    "ta": "✓ Register Patient Account"
  },
  "Clinical Alert:": {
    "zh": "Clinical Alert:",
    "bm": "Clinical Alert:",
    "ta": "Clinical Alert:"
  },
  "Active Care Families": {
    "zh": "Active Care Families",
    "bm": "Active Care Families",
    "ta": "Active Care Families"
  },
  "☎ 04-222 9199": {
    "zh": "☎ 04-222 9199",
    "bm": "☎ 04-222 9199",
    "ta": "☎ 04-222 9199"
  },
  "Other / Not Sure": {
    "zh": "Other / Not Sure",
    "bm": "Other / Not Sure",
    "ta": "Other / Not Sure"
  },
  "AD #5 · 24/7 FAST RESPONSE": {
    "zh": "AD #5 · 24/7 FAST RESPONSE",
    "bm": "AD #5 · 24/7 FAST RESPONSE",
    "ta": "AD #5 · 24/7 FAST RESPONSE"
  },
  "Alternating cylindrical air cells shift pressure points every 6–10 minutes to prevent and heal bedsores.": {
    "zh": "Alternating cylindrical air cells shift pressure points every 6–10 minutes to prevent and heal bedsores.",
    "bm": "Alternating cylindrical air cells shift pressure points every 6–10 minutes to prevent and heal bedsores.",
    "ta": "Alternating cylindrical air cells shift pressure points every 6–10 minutes to prevent and heal bedsores."
  },
  "24/7 Emergency:": {
    "zh": "24/7 Emergency:",
    "bm": "24/7 Emergency:",
    "ta": "24/7 Emergency:"
  },
  "Open": {
    "zh": "Open",
    "bm": "Open",
    "ta": "Open"
  },
  "，。": {
    "zh": "，。",
    "bm": "，。",
    "ta": "，。"
  },
  "Purchase:": {
    "zh": "Purchase:",
    "bm": "Purchase:",
    "ta": "Purchase:"
  },
  "Click": {
    "zh": "Click",
    "bm": "Click",
    "ta": "Click"
  },
  "What would you like to do?": {
    "zh": "What would you like to do?",
    "bm": "What would you like to do?",
    "ta": "What would you like to do?"
  },
  "AD #3 · TRANSPARENT PRICING": {
    "zh": "AD #3 · TRANSPARENT PRICING",
    "bm": "AD #3 · TRANSPARENT PRICING",
    "ta": "AD #3 · TRANSPARENT PRICING"
  },
  "e.g. ASN-001 / admin@assuranursing.com": {
    "zh": "e.g. ASN-001 / admin@assuranursing.com",
    "bm": "e.g. ASN-001 / admin@assuranursing.com",
    "ta": "e.g. ASN-001 / admin@assuranursing.com"
  },
  "24/7 Emergency Hotline:": {
    "zh": "24/7 Emergency Hotline:",
    "bm": "24/7 Emergency Hotline:",
    "ta": "24/7 Emergency Hotline:"
  },
  "Please enter your address.": {
    "zh": "Please enter your address.",
    "bm": "Please enter your address.",
    "ta": "Please enter your address."
  },
  "Enter your 4-8 digit PIN": {
    "zh": "Enter your 4-8 digit PIN",
    "bm": "Enter your 4-8 digit PIN",
    "ta": "Enter your 4-8 digit PIN"
  },
  "KC Ambulance Service (Butterworth / Penang)": {
    "zh": "KC Ambulance Service (Butterworth / Penang)",
    "bm": "KC Ambulance Service (Butterworth / Penang)",
    "ta": "KC Ambulance Service (Butterworth / Penang)"
  },
  "🛏️": {
    "zh": "🛏️",
    "bm": "🛏️",
    "ta": "🛏️"
  },
  "Bagan Specialist Centre": {
    "zh": "Bagan Specialist Centre",
    "bm": "Bagan Specialist Centre",
    "ta": "Bagan Specialist Centre"
  },
  "Marketing & Promo Videos": {
    "zh": "Marketing & Promo Videos",
    "bm": "Marketing & Promo Videos",
    "ta": "Marketing & Promo Videos"
  },
  "RM 2,500": {
    "zh": "RM 2,500",
    "bm": "RM 2,500",
    "ta": "RM 2,500"
  },
  "e.g. Tracheostomy suctioning, PICC line dressing, pediatric care, stoma bag care, special wound, or specific hospital requirements...": {
    "zh": "e.g. Tracheostomy suctioning, PICC line dressing, pediatric care, stoma bag care, special wound, or specific hospital requirements...",
    "bm": "e.g. Tracheostomy suctioning, PICC line dressing, pediatric care, stoma bag care, special wound, or specific hospital requirements...",
    "ta": "e.g. Tracheostomy suctioning, PICC line dressing, pediatric care, stoma bag care, special wound, or specific hospital requirements..."
  },
  "below bladder level": {
    "zh": "below bladder level",
    "bm": "below bladder level",
    "ta": "below bladder level"
  },
  "First-Time App User Guide & Official Memo": {
    "zh": "First-Time App User Guide & Official Memo",
    "bm": "First-Time App User Guide & Official Memo",
    "ta": "First-Time App User Guide & Official Memo"
  },
  "Not selected yet": {
    "zh": "Not selected yet",
    "bm": "Not selected yet",
    "ta": "Not selected yet"
  },
  "Digital": {
    "zh": "Digital",
    "bm": "Digital",
    "ta": "Digital"
  },
  "Basic Wound Dressing · Bukit Mertajam": {
    "zh": "Basic Wound Dressing · Bukit Mertajam",
    "bm": "Basic Wound Dressing · Bukit Mertajam",
    "ta": "Basic Wound Dressing · Bukit Mertajam"
  },
  "folder.": {
    "zh": "folder.",
    "bm": "folder.",
    "ta": "folder."
  },
  "24/7 Direct Care / Line:": {
    "zh": "24/7 Direct Care / Line:",
    "bm": "24/7 Direct Care / Line:",
    "ta": "24/7 Direct Care / Line:"
  },
  "☎ 04-652 8888": {
    "zh": "☎ 04-652 8888",
    "bm": "☎ 04-652 8888",
    "ta": "☎ 04-652 8888"
  },
  "Foley Urinary Catheter Hygiene": {
    "zh": "Foley Urinary Catheter Hygiene",
    "bm": "Foley Urinary Catheter Hygiene",
    "ta": "Foley Urinary Catheter Hygiene"
  },
  "Dose & Route": {
    "zh": "Dose & Route",
    "bm": "Dose & Route",
    "ta": "Dose & Route"
  },
  "Apply barrier moisturizing cream over bony prominences (sacrum, hips, ankles).": {
    "zh": "Apply barrier moisturizing cream over bony prominences (sacrum, hips, ankles).",
    "bm": "Apply barrier moisturizing cream over bony prominences (sacrum, hips, ankles).",
    "ta": "Apply barrier moisturizing cream over bony prominences (sacrum, hips, ankles)."
  },
  "24/7 Line & Emergency:": {
    "zh": "24/7 Line & Emergency:",
    "bm": "24/7 Line & Emergency:",
    "ta": "24/7 Line & Emergency:"
  },
  "☎ 04-222 7799": {
    "zh": "☎ 04-222 7799",
    "bm": "☎ 04-222 7799",
    "ta": "☎ 04-222 7799"
  },
  "RM 60 – RM 100 / mo": {
    "zh": "RM 60 – RM 100 / mo",
    "bm": "RM 60 – RM 100 / mo",
    "ta": "RM 60 – RM 100 / mo"
  },
  "♿ Transfer": {
    "zh": "♿ Transfer",
    "bm": "♿ Transfer",
    "ta": "♿ Transfer"
  },
  "Download HD Poster": {
    "zh": "Download HD Poster",
    "bm": "Download HD Poster",
    "ta": "Download HD Poster"
  },
  "Care plans are customized based on doctor discharge summaries, medication orders, mobility goals, and family schedules to ensure seamless recovery progression.": {
    "zh": "Care plans are customized based on doctor discharge summaries, medication orders, mobility goals, and family schedules to ensure seamless recovery progression.",
    "bm": "Care plans are customized based on doctor discharge summaries, medication orders, mobility goals, and family schedules to ensure seamless recovery progression.",
    "ta": "Care plans are customized based on doctor discharge summaries, medication orders, mobility goals, and family schedules to ensure seamless recovery progression."
  },
  "1, Jalan Pangkor, 10050 George Town, Penang": {
    "zh": "1, Jalan Pangkor, 10050 George Town, Penang",
    "bm": "1, Jalan Pangkor, 10050 George Town, Penang",
    "ta": "1, Jalan Pangkor, 10050 George Town, Penang"
  },
  "Wound Dressing": {
    "zh": "Wound Dressing",
    "bm": "Wound Dressing",
    "ta": "Wound Dressing"
  },
  "The pin is what gets the nurse to your gate — an address alone often stops at the street.": {
    "zh": "The pin is what gets the nurse to your gate — an address alone often stops at the street.",
    "bm": "The pin is what gets the nurse to your gate — an address alone often stops at the street.",
    "ta": "The pin is what gets the nurse to your gate — an address alone often stops at the street."
  },
  "☎ 04-890 7000": {
    "zh": "☎ 04-890 7000",
    "bm": "☎ 04-890 7000",
    "ta": "☎ 04-890 7000"
  },
  "Keep patient upright for 45–60 minutes after feeding.": {
    "zh": "Keep patient upright for 45–60 minutes after feeding.",
    "bm": "Keep patient upright for 45–60 minutes after feeding.",
    "ta": "Keep patient upright for 45–60 minutes after feeding."
  },
  "☎ 04-222 5222": {
    "zh": "☎ 04-222 5222",
    "bm": "☎ 04-222 5222",
    "ta": "☎ 04-222 5222"
  },
  "JULY 2026 · HOSPITAL PARTNERSHIP": {
    "zh": "JULY 2026 · HOSPITAL PARTNERSHIP",
    "bm": "JULY 2026 · HOSPITAL PARTNERSHIP",
    "ta": "JULY 2026 · HOSPITAL PARTNERSHIP"
  },
  "v2.4 · 3.3 MB · Phones & Tablets · Direct Install": {
    "zh": "v2.4 · 3.3 MB · Phones & Tablets · Direct Install",
    "bm": "v2.4 · 3.3 MB · Phones & Tablets · Direct Install",
    "ta": "v2.4 · 3.3 MB · Phones & Tablets · Direct Install"
  },
  "465, Jalan Burma, 10350 George Town, Penang": {
    "zh": "465, Jalan Burma, 10350 George Town, Penang",
    "bm": "465, Jalan Burma, 10350 George Town, Penang",
    "ta": "465, Jalan Burma, 10350 George Town, Penang"
  },
  "Step 1: Public": {
    "zh": "Step 1: Public",
    "bm": "Step 1: Public",
    "ta": "Step 1: Public"
  },
  "☎ 04-827 3333": {
    "zh": "☎ 04-827 3333",
    "bm": "☎ 04-827 3333",
    "ta": "☎ 04-827 3333"
  },
  "Medilife Ambulance Services (Bayan Lepas)": {
    "zh": "Medilife Ambulance Services (Bayan Lepas)",
    "bm": "Medilife Ambulance Services (Bayan Lepas)",
    "ta": "Medilife Ambulance Services (Bayan Lepas)"
  },
  "Founder's Assurance": {
    "zh": "创办人专业承诺",
    "bm": "Jaminan Pengasas",
    "ta": "நிறுவனரின் உறுதிமொழி"
  },
  "Female Nurse / Caregiver": {
    "zh": "Female Nurse / Caregiver",
    "bm": "Female Nurse / Caregiver",
    "ta": "Female Nurse / Caregiver"
  },
  "💉 Medication & Injections": {
    "zh": "💉 Medication & Injections",
    "bm": "💉 Medication & Injections",
    "ta": "💉 Medication & Injections"
  },
  "⏰ OD (Once Daily):": {
    "zh": "⏰ OD (Once Daily):",
    "bm": "⏰ OD (Once Daily):",
    "ta": "⏰ OD (Once Daily):"
  },
  ": Switch to \"Clinical Staff Sign-In\" to manage assigned visits, record digital MEWS vitals, and complete clinical handovers.": {
    "zh": ": Switch to \"Clinical Staff Sign-In\" to manage assigned visits, record digital MEWS vitals, and complete clinical handovers.",
    "bm": ": Switch to \"Clinical Staff Sign-In\" to manage assigned visits, record digital MEWS vitals, and complete clinical handovers.",
    "ta": ": Switch to \"Clinical Staff Sign-In\" to manage assigned visits, record digital MEWS vitals, and complete clinical handovers."
  },
  "Premier Ambulance Service (Penang)": {
    "zh": "Premier Ambulance Service (Penang)",
    "bm": "Premier Ambulance Service (Penang)",
    "ta": "Premier Ambulance Service (Penang)"
  },
  "Specialist Clinic Escort & Non-Emergency Transfer": {
    "zh": "Specialist Clinic Escort & Non-Emergency Transfer",
    "bm": "Specialist Clinic Escort & Non-Emergency Transfer",
    "ta": "Specialist Clinic Escort & Non-Emergency Transfer"
  },
  "Dark concentrated tea-colored urine, blood clots, sudden cessation of urine output, or lower abdominal pain.": {
    "zh": "Dark concentrated tea-colored urine, blood clots, sudden cessation of urine output, or lower abdominal pain.",
    "bm": "Dark concentrated tea-colored urine, blood clots, sudden cessation of urine output, or lower abdominal pain.",
    "ta": "Dark concentrated tea-colored urine, blood clots, sudden cessation of urine output, or lower abdominal pain."
  },
  "Patient & Family Care Guides": {
    "zh": "Patient & Family Care Guides",
    "bm": "Patient & Family Care Guides",
    "ta": "Patient & Family Care Guides"
  },
  "Oncology Specialist": {
    "zh": "Oncology Specialist",
    "bm": "Oncology Specialist",
    "ta": "Oncology Specialist"
  },
  "Staff ID Sign-in": {
    "zh": "Staff ID Sign-in",
    "bm": "Staff ID Sign-in",
    "ta": "Staff ID Sign-in"
  },
  "Estimated Total Before Consumables": {
    "zh": "Estimated Total Before Consumables",
    "bm": "Estimated Total Before Consumables",
    "ta": "Estimated Total Before Consumables"
  },
  "Rigorous Infection Control Standards:": {
    "zh": "Rigorous Infection Control Standards:",
    "bm": "Rigorous Infection Control Standards:",
    "ta": "Rigorous Infection Control Standards:"
  },
  "AHA / ERC LIFE-SAVING STANDARD": {
    "zh": "AHA / ERC LIFE-SAVING STANDARD",
    "bm": "AHA / ERC LIFE-SAVING STANDARD",
    "ta": "AHA / ERC LIFE-SAVING STANDARD"
  },
  "Match a Procedure & Nurse": {
    "zh": "Match a Procedure & Nurse",
    "bm": "Match a Procedure & Nurse",
    "ta": "Match a Procedure & Nurse"
  },
  "from your Downloads folder.": {
    "zh": "from your Downloads folder.",
    "bm": "from your Downloads folder.",
    "ta": "from your Downloads folder."
  },
  "Jalan Tun Hussein Onn, 13700 Seberang Jaya, Penang": {
    "zh": "Jalan Tun Hussein Onn, 13700 Seberang Jaya, Penang",
    "bm": "Jalan Tun Hussein Onn, 13700 Seberang Jaya, Penang",
    "ta": "Jalan Tun Hussein Onn, 13700 Seberang Jaya, Penang"
  },
  "Step-by-Step Training": {
    "zh": "Step-by-Step Training",
    "bm": "Step-by-Step Training",
    "ta": "Step-by-Step Training"
  },
  "Electric backrest, knee elevation, and bed height adjustability with safety drop-down side rails.": {
    "zh": "Electric backrest, knee elevation, and bed height adjustability with safety drop-down side rails.",
    "bm": "Electric backrest, knee elevation, and bed height adjustability with safety drop-down side rails.",
    "ta": "Electric backrest, knee elevation, and bed height adjustability with safety drop-down side rails."
  },
  "☎ 112": {
    "zh": "☎ 112",
    "bm": "☎ 112",
    "ta": "☎ 112"
  },
  "Empty drainage bag when 2/3 full, avoiding contact between tap and container.": {
    "zh": "Empty drainage bag when 2/3 full, avoiding contact between tap and container.",
    "bm": "Empty drainage bag when 2/3 full, avoiding contact between tap and container.",
    "ta": "Empty drainage bag when 2/3 full, avoiding contact between tap and container."
  },
  "SEPTEMBER 2026 · SERVICE EXPANSION": {
    "zh": "SEPTEMBER 2026 · SERVICE EXPANSION",
    "bm": "SEPTEMBER 2026 · SERVICE EXPANSION",
    "ta": "SEPTEMBER 2026 · SERVICE EXPANSION"
  },
  "🩺 Clinical Staff & Nurses": {
    "zh": "🩺 Clinical Staff & Nurses",
    "bm": "🩺 Clinical Staff & Nurses",
    "ta": "🩺 Clinical Staff & Nurses"
  },
  "☎ 04-228 3991": {
    "zh": "☎ 04-228 3991",
    "bm": "☎ 04-228 3991",
    "ta": "☎ 04-228 3991"
  },
  "、，。": {
    "zh": "、，。",
    "bm": "、，。",
    "ta": "、，。"
  },
  "Welcome back": {
    "zh": "Welcome back",
    "bm": "Welcome back",
    "ta": "Welcome back"
  },
  "Instant Care Plan & Quotation": {
    "zh": "即时照护方案与清晰报价",
    "bm": "Pelan Penjagaan Segera & Sebut Harga",
    "ta": "உடனடி பராமரிப்பு திட்டம் & மேற்கோள்"
  },
  "Transparent pricing from RM 150/visit, RM 0 weekend surcharge, all clinical supplies included, no locked-in contracts.": {
    "zh": "Transparent pricing from RM 150/visit, RM 0 weekend surcharge, all clinical supplies included, no locked-in contracts.",
    "bm": "Transparent pricing from RM 150/visit, RM 0 weekend surcharge, all clinical supplies included, no locked-in contracts.",
    "ta": "Transparent pricing from RM 150/visit, RM 0 weekend surcharge, all clinical supplies included, no locked-in contracts."
  },
  "Compress to this audio-visual beat": {
    "zh": "Compress to this audio-visual beat",
    "bm": "Compress to this audio-visual beat",
    "ta": "Compress to this audio-visual beat"
  },
  "⏰ TDS (Three Times Daily):": {
    "zh": "⏰ TDS (Three Times Daily):",
    "bm": "⏰ TDS (Three Times Daily):",
    "ta": "⏰ TDS (Three Times Daily):"
  },
  "Official Announcements": {
    "zh": "Official Announcements",
    "bm": "Official Announcements",
    "ta": "Official Announcements"
  },
  "👀 Preview Sample Patient Chart": {
    "zh": "👀 Preview Sample Patient Chart",
    "bm": "👀 Preview Sample Patient Chart",
    "ta": "👀 Preview Sample Patient Chart"
  },
  "We are a home nursing service, not an ambulance. For urgent": {
    "zh": "We are a home nursing service, not an ambulance. For urgent",
    "bm": "We are a home nursing service, not an ambulance. For urgent",
    "ta": "We are a home nursing service, not an ambulance. For urgent"
  },
  "Just leave your name, phone and question — everything else is optional.": {
    "zh": "Just leave your name, phone and question — everything else is optional.",
    "bm": "Just leave your name, phone and question — everything else is optional.",
    "ta": "Just leave your name, phone and question — everything else is optional."
  },
  "Alt / WhatsApp:": {
    "zh": "Alt / WhatsApp:",
    "bm": "Alt / WhatsApp:",
    "ta": "Alt / WhatsApp:"
  },
  "Safe Ryle's / NG Tube Feeding": {
    "zh": "Safe Ryle's / NG Tube Feeding",
    "bm": "Safe Ryle's / NG Tube Feeding",
    "ta": "Safe Ryle's / NG Tube Feeding"
  },
  "☎ 04-238 3388": {
    "zh": "☎ 04-238 3388",
    "bm": "☎ 04-238 3388",
    "ta": "☎ 04-238 3388"
  },
  "Download Assura Nursing (.exe)": {
    "zh": "Download Assura Nursing (.exe)",
    "bm": "Download Assura Nursing (.exe)",
    "ta": "Download Assura Nursing (.exe)"
  },
  "Penang Island · Bayan Lepas · Georgetown · Butterworth · Bukit Mertajam": {
    "zh": "Penang Island · Bayan Lepas · Georgetown · Butterworth · Bukit Mertajam",
    "bm": "Penang Island · Bayan Lepas · Georgetown · Butterworth · Bukit Mertajam",
    "ta": "Penang Island · Bayan Lepas · Georgetown · Butterworth · Bukit Mertajam"
  },
  "Fast Response Coordination": {
    "zh": "极速调度响应中心",
    "bm": "Penyelarasan Respon Pantas",
    "ta": "விரைவான பதில் ஒருங்கிணைப்பு"
  },
  "Clinical Integrity": {
    "zh": "Clinical Integrity",
    "bm": "Clinical Integrity",
    "ta": "Clinical Integrity"
  },
  "IV Drip Infusion & Medication Administration · RM 180": {
    "zh": "IV Drip Infusion & Medication Administration · RM 180",
    "bm": "IV Drip Infusion & Medication Administration · RM 180",
    "ta": "IV Drip Infusion & Medication Administration · RM 180"
  },
  "Ryle's tube (NG Tube) insertion, enteral feeding position checks, urinary Foley catheter changing, bladder irrigation & stoma pouch care.": {
    "zh": "Ryle's tube (NG Tube) insertion, enteral feeding position checks, urinary Foley catheter changing, bladder irrigation & stoma pouch care.",
    "bm": "Ryle's tube (NG Tube) insertion, enteral feeding position checks, urinary Foley catheter changing, bladder irrigation & stoma pouch care.",
    "ta": "Ryle's tube (NG Tube) insertion, enteral feeding position checks, urinary Foley catheter changing, bladder irrigation & stoma pouch care."
  },
  "Follow standard Malaysian hospital medication serving intervals to maintain therapeutic drug blood levels.": {
    "zh": "Follow standard Malaysian hospital medication serving intervals to maintain therapeutic drug blood levels.",
    "bm": "Follow standard Malaysian hospital medication serving intervals to maintain therapeutic drug blood levels.",
    "ta": "Follow standard Malaysian hospital medication serving intervals to maintain therapeutic drug blood levels."
  },
  "Professional wound dressing for diabetic ulcers, surgical stitches/staples removal, and pressure sores using sterile ANTT technique to accelerate healing.": {
    "zh": "针对糖尿病足部溃疡、术后拆线以及压疮褥疮，采用国际标准 ANTT 无菌非接触操作技术，加速伤口愈合。",
    "bm": "Pembalutan luka profesional untuk ulser diabetes, penanggalan jahitan/staples pembedahan, dan luka baring menggunakan teknik steril ANTT untuk mempercepatkan penyembuhan.",
    "ta": "சர்க்கரை நோய் புண்கள், அறுவை சிகிச்சை தையல் அகற்றுதல் மற்றும் படுக்கைப் புண்களுக்கு மலட்டு ANTT நுட்பத்தைப் பயன்படுத்தி நிபுணத்துவ காயம் கட்டுதல்."
  },
  "WhatsApp Consultation": {
    "zh": "WhatsApp Consultation",
    "bm": "WhatsApp Consultation",
    "ta": "WhatsApp Consultation"
  },
  "Palliative Care": {
    "zh": "Palliative Care",
    "bm": "Palliative Care",
    "ta": "Palliative Care"
  },
  "☎ 04-373 5000": {
    "zh": "☎ 04-373 5000",
    "bm": "☎ 04-373 5000",
    "ta": "☎ 04-373 5000"
  },
  "🎬 Assura Nursing · Complete Home Care & Clinical Management": {
    "zh": "🎬 Assura Nursing · Complete Home Care & Clinical Management",
    "bm": "🎬 Assura Nursing · Complete Home Care & Clinical Management",
    "ta": "🎬 Assura Nursing · Complete Home Care & Clinical Management"
  },
  "100% Upfront Transparent Rates (No Hidden Fees)": {
    "zh": "100% 透明公道收费（零隐藏加价）",
    "bm": "Kadar Telus 100% (Tiada Caj Tersembunyi)",
    "ta": "100% வெளிப்படையான கட்டணங்கள் (மறைமுக கட்டணங்கள் இல்லை)"
  },
  "Assura Nursing App": {
    "zh": "Assura Nursing App",
    "bm": "Assura Nursing App",
    "ta": "Assura Nursing App"
  },
  "Direct Mirrors:": {
    "zh": "Direct Mirrors:",
    "bm": "Direct Mirrors:",
    "ta": "Direct Mirrors:"
  },
  "LPPK Registered (MA)": {
    "zh": "LPPK Registered (MA)",
    "bm": "LPPK Registered (MA)",
    "ta": "LPPK Registered (MA)"
  },
  "Cloud MEWS & AI System": {
    "zh": "云端 MEWS 预警系统",
    "bm": "Sistem MEWS Awan & AI",
    "ta": "கிளவுட் MEWS & AI அமைப்பு"
  },
  "Sterile Wound Dressing Pack (ANTT)": {
    "zh": "Sterile Wound Dressing Pack (ANTT)",
    "bm": "Sterile Wound Dressing Pack (ANTT)",
    "ta": "Sterile Wound Dressing Pack (ANTT)"
  },
  "AssuraNursing.exe": {
    "zh": "AssuraNursing.exe",
    "bm": "AssuraNursing.exe",
    "ta": "AssuraNursing.exe"
  },
  "Tap shoulders, shout \"Are you OK?\". Dial 999 or 112 on speakerphone.": {
    "zh": "Tap shoulders, shout \"Are you OK?\". Dial 999 or 112 on speakerphone.",
    "bm": "Tap shoulders, shout \"Are you OK?\". Dial 999 or 112 on speakerphone.",
    "ta": "Tap shoulders, shout \"Are you OK?\". Dial 999 or 112 on speakerphone."
  },
  "06:00 / 12:00 or 18:00 / 22:00 (12-hour intervals)": {
    "zh": "06:00 / 12:00 or 18:00 / 22:00 (12-hour intervals)",
    "bm": "06:00 / 12:00 or 18:00 / 22:00 (12-hour intervals)",
    "ta": "06:00 / 12:00 or 18:00 / 22:00 (12-hour intervals)"
  },
  "🩺 Staff Sign In": {
    "zh": "🩺 Staff Sign In",
    "bm": "🩺 Staff Sign In",
    "ta": "🩺 Staff Sign In"
  },
  "Strict adherence to MOH & LJM standards. Hospital-standard aseptic non-touch technique (ANTT) for all wound & catheter care.": {
    "zh": "Strict adherence to MOH & LJM standards. Hospital-standard aseptic non-touch technique (ANTT) for all wound & catheter care.",
    "bm": "Strict adherence to MOH & LJM standards. Hospital-standard aseptic non-touch technique (ANTT) for all wound & catheter care.",
    "ta": "Strict adherence to MOH & LJM standards. Hospital-standard aseptic non-touch technique (ANTT) for all wound & catheter care."
  },
  "Clinical Staff Portal": {
    "zh": "Clinical Staff Portal",
    "bm": "Clinical Staff Portal",
    "ta": "Clinical Staff Portal"
  },
  "Where": {
    "zh": "Where",
    "bm": "Where",
    "ta": "Where"
  },
  "Georgetown / Jelutong / Pulau Tikus": {
    "zh": "Georgetown / Jelutong / Pulau Tikus",
    "bm": "Georgetown / Jelutong / Pulau Tikus",
    "ta": "Georgetown / Jelutong / Pulau Tikus"
  },
  "Hospital beds, 5L/10L oxygen concentrators, suction machines & ripple mattresses.": {
    "zh": "提供电动病床、5L/10L 医用制氧机、吸痰机以及防褥疮气垫床快速上门配送。",
    "bm": "Katil hospital, penumpu oksigen 5L/10L, mesin penyedut kahak & tilam angin anti-kudis.",
    "ta": "மருத்துவமனை படுக்கைகள், 5L/10L ஆக்ஸிஜன் செறிவூட்டிகள், உறிஞ்சும் இயந்திரங்கள் மற்றும் அலை மெத்தைகள்."
  },
  "☎ 04-373 5555": {
    "zh": "☎ 04-373 5555",
    "bm": "☎ 04-373 5555",
    "ta": "☎ 04-373 5555"
  },
  "👴 Palliative & Bedside Nursing": {
    "zh": "👴 Palliative & Bedside Nursing",
    "bm": "👴 Palliative & Bedside Nursing",
    "ta": "👴 Palliative & Bedside Nursing"
  },
  "Keep urine drainage bag": {
    "zh": "Keep urine drainage bag",
    "bm": "Keep urine drainage bag",
    "ta": "Keep urine drainage bag"
  },
  "Media Hub": {
    "zh": "Media Hub",
    "bm": "Media Hub",
    "ta": "Media Hub"
  },
  "Applying Malaysian Ministry of Health (MOH) Nursing Guidelines, adapted to home environments and individual patient needs.": {
    "zh": "Applying Malaysian Ministry of Health (MOH) Nursing Guidelines, adapted to home environments and individual patient needs.",
    "bm": "Applying Malaysian Ministry of Health (MOH) Nursing Guidelines, adapted to home environments and individual patient needs.",
    "ta": "Applying Malaysian Ministry of Health (MOH) Nursing Guidelines, adapted to home environments and individual patient needs."
  },
  "Click to expand": {
    "zh": "Click to expand",
    "bm": "Click to expand",
    "ta": "Click to expand"
  },
  "\"Every family's home is unique. When patients return home after surgery or illness, they need professional, trained nurses who understand how to plan care around their specific living space—minimizing infection risks through strict hygiene and aseptic handling, while keeping patient safety and comfort at the center.\"": {
    "zh": "“每个家庭的实际情况都独一无二。病患出院回家后，需要专业护士针对具体居家空间因地制宜规划护理方案——通过严格的卫生无菌操作降低感染风险，始终将病患的安全与舒适放在核心位置。”",
    "bm": "\"Setiap rumah keluarga adalah unik. Apabila pesakit pulang ke rumah selepas pembedahan atau sakit, mereka memerlukan jururawat profesional dan terlatih yang faham cara merancang penjagaan mengikut ruang kediaman mereka—meminimumkan risiko jangkitan melalui kebersihan ketat dan pengendalian aseptik, sambil mengutamakan keselamatan dan keselesaan pesakit.\"",
    "ta": "\"ஒவ்வொரு குடும்பத்தின் வீடும் தனித்துவமானது. நோயாளிகள் வீடு திரும்பும்போது, அவர்களின் குறிப்பிட்ட வாழ்க்கை இடத்தை சுற்றி கவனிப்பைத் திட்டமிடவும், கடுமையான சுகாதாரம் மற்றும் கையாளுதல் மூலம் தொற்று அபாயங்களைக் குறைக்கவும், நோயாளியின் பாதுகாப்பை முதன்மையாக வைத்திருக்கவும் தொழில்முறை செவிலியர்கள் தேவை.\""
  },
  "Loading MEWS Scoring Chart…": {
    "zh": "Loading MEWS Scoring Chart…",
    "bm": "Loading MEWS Scoring Chart…",
    "ta": "Loading MEWS Scoring Chart…"
  },
  "☎ 04-382 7333": {
    "zh": "☎ 04-382 7333",
    "bm": "☎ 04-382 7333",
    "ta": "☎ 04-382 7333"
  },
  "Preferred time": {
    "zh": "Preferred time",
    "bm": "Preferred time",
    "ta": "Preferred time"
  },
  "Official Video": {
    "zh": "Official Video",
    "bm": "Official Video",
    "ta": "Official Video"
  },
  "🛡️ Registered Nurse (LJM)": {
    "zh": "🛡️ Registered Nurse (LJM)",
    "bm": "🛡️ Registered Nurse (LJM)",
    "ta": "🛡️ Registered Nurse (LJM)"
  },
  "24/7 Cardiac Emergency:": {
    "zh": "24/7 Cardiac Emergency:",
    "bm": "24/7 Cardiac Emergency:",
    "ta": "24/7 Cardiac Emergency:"
  },
  "View Services & Rates": {
    "zh": "View Services & Rates",
    "bm": "View Services & Rates",
    "ta": "View Services & Rates"
  },
  "Action": {
    "zh": "Action",
    "bm": "Action",
    "ta": "Action"
  },
  "RM 180 – RM 320 / mo": {
    "zh": "RM 180 – RM 320 / mo",
    "bm": "RM 180 – RM 320 / mo",
    "ta": "RM 180 – RM 320 / mo"
  },
  "☎ 04-222 7200": {
    "zh": "☎ 04-222 7200",
    "bm": "☎ 04-222 7200",
    "ta": "☎ 04-222 7200"
  },
  "Offline Alerts & Notifications Active": {
    "zh": "Offline Alerts & Notifications Active",
    "bm": "Offline Alerts & Notifications Active",
    "ta": "Offline Alerts & Notifications Active"
  },
  "Private Home Nursing & Clinical Healthcare Services · Penang Island & Mainland (Bukit Mertajam Base)": {
    "zh": "Private Home Nursing & Clinical Healthcare Services · Penang Island & Mainland (Bukit Mertajam Base)",
    "bm": "Private Home Nursing & Clinical Healthcare Services · Penang Island & Mainland (Bukit Mertajam Base)",
    "ta": "Private Home Nursing & Clinical Healthcare Services · Penang Island & Mainland (Bukit Mertajam Base)"
  },
  "Our Mission": {
    "zh": "Our Mission",
    "bm": "Our Mission",
    "ta": "Our Mission"
  },
  "RM 250 – RM 450 / mo": {
    "zh": "RM 250 – RM 450 / mo",
    "bm": "RM 250 – RM 450 / mo",
    "ta": "RM 250 – RM 450 / mo"
  },
  "Purchase Reference": {
    "zh": "Purchase Reference",
    "bm": "Purchase Reference",
    "ta": "Purchase Reference"
  },
  "Back to Home": {
    "zh": "Back to Home",
    "bm": "Back to Home",
    "ta": "Back to Home"
  },
  "Create 4-8 digit PIN": {
    "zh": "Create 4-8 digit PIN",
    "bm": "Create 4-8 digit PIN",
    "ta": "Create 4-8 digit PIN"
  },
  "Clinical Staff ID": {
    "zh": "Clinical Staff ID",
    "bm": "Clinical Staff ID",
    "ta": "Clinical Staff ID"
  },
  "🏥 Penang Island Hospitals (Government & Private)": {
    "zh": "🏥 Penang Island Hospitals (Government & Private)",
    "bm": "🏥 Penang Island Hospitals (Government & Private)",
    "ta": "🏥 Penang Island Hospitals (Government & Private)"
  },
  "Clear Saved Details": {
    "zh": "Clear Saved Details",
    "bm": "Clear Saved Details",
    "ta": "Clear Saved Details"
  },
  "Any (No preference)": {
    "zh": "Any (No preference)",
    "bm": "Any (No preference)",
    "ta": "Any (No preference)"
  },
  "RM 120.00": {
    "zh": "RM 120.00",
    "bm": "RM 120.00",
    "ta": "RM 120.00"
  },
  "📖 User Guide & Memo": {
    "zh": "📖 User Guide & Memo",
    "bm": "📖 User Guide & Memo",
    "ta": "📖 User Guide & Memo"
  },
  "☎ 04-548 6666": {
    "zh": "☎ 04-548 6666",
    "bm": "☎ 04-548 6666",
    "ta": "☎ 04-548 6666"
  },
  "Infection Red Flags:": {
    "zh": "Infection Red Flags:",
    "bm": "Infection Red Flags:",
    "ta": "Infection Red Flags:"
  },
  "🚑 Penang Private Ambulance & Non-Emergency Medical Transport": {
    "zh": "🚑 Penang Private Ambulance & Non-Emergency Medical Transport",
    "bm": "🚑 Penang Private Ambulance & Non-Emergency Medical Transport",
    "ta": "🚑 Penang Private Ambulance & Non-Emergency Medical Transport"
  },
  "Step 1: Check Responsiveness": {
    "zh": "Step 1: Check Responsiveness",
    "bm": "Step 1: Check Responsiveness",
    "ta": "Step 1: Check Responsiveness"
  },
  "AD #1 · WOUND CARE": {
    "zh": "AD #1 · WOUND CARE",
    "bm": "AD #1 · WOUND CARE",
    "ta": "AD #1 · WOUND CARE"
  },
  ") in the App to view real-time vital sign charts and medication records.": {
    "zh": ") in the App to view real-time vital sign charts and medication records.",
    "bm": ") in the App to view real-time vital sign charts and medication records.",
    "ta": ") in the App to view real-time vital sign charts and medication records."
  },
  ": Enter your Case Code (e.g.": {
    "zh": ": Enter your Case Code (e.g.",
    "bm": ": Enter your Case Code (e.g.",
    "ta": ": Enter your Case Code (e.g."
  },
  "570, Jalan Perda Barat, Bandar Perda, 14000 Bukit Mertajam": {
    "zh": "570, Jalan Perda Barat, Bandar Perda, 14000 Bukit Mertajam",
    "bm": "570, Jalan Perda Barat, Bandar Perda, 14000 Bukit Mertajam",
    "ta": "570, Jalan Perda Barat, Bandar Perda, 14000 Bukit Mertajam"
  },
  "Protect vulnerable pressure points and maintain limb function in bedridden or post-stroke patients.": {
    "zh": "Protect vulnerable pressure points and maintain limb function in bedridden or post-stroke patients.",
    "bm": "Protect vulnerable pressure points and maintain limb function in bedridden or post-stroke patients.",
    "ta": "Protect vulnerable pressure points and maintain limb function in bedridden or post-stroke patients."
  },
  "e.g. 0123456789": {
    "zh": "e.g. 0123456789",
    "bm": "e.g. 0123456789",
    "ta": "e.g. 0123456789"
  },
  "Georgetown · Bayan Lepas · Balik Pulau · Tanjung Bungah": {
    "zh": "Georgetown · Bayan Lepas · Balik Pulau · Tanjung Bungah",
    "bm": "Georgetown · Bayan Lepas · Balik Pulau · Tanjung Bungah",
    "ta": "Georgetown · Bayan Lepas · Balik Pulau · Tanjung Bungah"
  },
  "Nursing": {
    "zh": "Nursing",
    "bm": "Nursing",
    "ta": "Nursing"
  },
  "☎ 04-327 8888": {
    "zh": "☎ 04-327 8888",
    "bm": "☎ 04-327 8888",
    "ta": "☎ 04-327 8888"
  },
  "19:00 or 22:00 before sleep": {
    "zh": "19:00 or 22:00 before sleep",
    "bm": "19:00 or 22:00 before sleep",
    "ta": "19:00 or 22:00 before sleep"
  },
  "Got It": {
    "zh": "Got It",
    "bm": "Got It",
    "ta": "Got It"
  },
  "🩹 Complex Wound Care": {
    "zh": "🩹 Complex Wound Care",
    "bm": "🩹 Complex Wound Care",
    "ta": "🩹 Complex Wound Care"
  },
  "Real-Time Vitals Tracking & Doctor Handover": {
    "zh": "实时体征追踪与主治医生交接",
    "bm": "Pemantauan Tanda Vital Masa Nyata & Serah Tugas Doktor",
    "ta": "நிகழ்நேர முக்கிய கண்காணிப்பு & மருத்துவர் ஒப்படைப்பு"
  },
  "Qualified nurse accompaniment for hospital specialist check-ups, hemodialysis transport, outpatient appointments, and discharge handover.": {
    "zh": "Qualified nurse accompaniment for hospital specialist check-ups, hemodialysis transport, outpatient appointments, and discharge handover.",
    "bm": "Qualified nurse accompaniment for hospital specialist check-ups, hemodialysis transport, outpatient appointments, and discharge handover.",
    "ta": "Qualified nurse accompaniment for hospital specialist check-ups, hemodialysis transport, outpatient appointments, and discharge handover."
  },
  "General Line:": {
    "zh": "General Line:",
    "bm": "General Line:",
    "ta": "General Line:"
  },
  "Services & Rates": {
    "zh": "Services & Rates",
    "bm": "Services & Rates",
    "ta": "Services & Rates"
  },
  "Clear rates from RM 150, RM 0 weekend surcharge, full clinical supplies included.": {
    "zh": "收费明码标价从 RM 150 起，周末及公假 RM 0 加收，包含全套基础无菌耗材。",
    "bm": "Kadar jelas bermula RM 150, caj tambahan hujung minggu RM 0, bekalan klinikal penuh disertakan.",
    "ta": "RM 150 முதல் தெளிவான கட்டணங்கள், வார இறுதி கூடுதல் கட்டணம் இல்லை, முழு மருத்துவப் பொருட்களும் சேர்க்கப்பட்டுள்ளன."
  },
  "Get 3-Min Quote →": {
    "zh": "3分钟获取报价 →",
    "bm": "Dapatkan Sebut Harga 3-Minit →",
    "ta": "3 நிமிட மேற்கோளைப் பெறுங்கள் →"
  },
  "About Us & Founder Message · Assura Nursing": {
    "zh": "关于我们与创办人心声 · Assura 护理",
    "bm": "Tentang Kami & Mesej Pengasas · Assura Nursing",
    "ta": "எங்களை பற்றி & நிறுவனர் செய்தி · அசுரா நர்சிங்"
  },
  "Pin to Taskbar or Desktop for 1-click clinical workstation access.": {
    "zh": "Pin to Taskbar or Desktop for 1-click clinical workstation access.",
    "bm": "Pin to Taskbar or Desktop for 1-click clinical workstation access.",
    "ta": "Pin to Taskbar or Desktop for 1-click clinical workstation access."
  },
  "All clinical charts, nurse recordings, and patient data are strictly protected under the Malaysian Personal Data Protection Act 2010. Unauthorized photography or secondary dissemination is prohibited.": {
    "zh": "All clinical charts, nurse recordings, and patient data are strictly protected under the Malaysian Personal Data Protection Act 2010. Unauthorized photography or secondary dissemination is prohibited.",
    "bm": "All clinical charts, nurse recordings, and patient data are strictly protected under the Malaysian Personal Data Protection Act 2010. Unauthorized photography or secondary dissemination is prohibited.",
    "ta": "All clinical charts, nurse recordings, and patient data are strictly protected under the Malaysian Personal Data Protection Act 2010. Unauthorized photography or secondary dissemination is prohibited."
  },
  "Our registered nurses provide professional home visits, wound management, tube changes, and immediate equipment delivery across Penang Island & Mainland.": {
    "zh": "Our registered nurses provide professional home visits, wound management, tube changes, and immediate equipment delivery across Penang Island & Mainland.",
    "bm": "Our registered nurses provide professional home visits, wound management, tube changes, and immediate equipment delivery across Penang Island & Mainland.",
    "ta": "Our registered nurses provide professional home visits, wound management, tube changes, and immediate equipment delivery across Penang Island & Mainland."
  },
  "☎ 04-828 6999": {
    "zh": "☎ 04-828 6999",
    "bm": "☎ 04-828 6999",
    "ta": "☎ 04-828 6999"
  },
  "Jalan Balik Pulau, 11000 Balik Pulau, Penang": {
    "zh": "Jalan Balik Pulau, 11000 Balik Pulau, Penang",
    "bm": "Jalan Balik Pulau, 11000 Balik Pulau, Penang",
    "ta": "Jalan Balik Pulau, 11000 Balik Pulau, Penang"
  },
  "🛏️ Home Medical Equipment Rental & Reference Guide": {
    "zh": "🛏️ Home Medical Equipment Rental & Reference Guide",
    "bm": "🛏️ Home Medical Equipment Rental & Reference Guide",
    "ta": "🛏️ Home Medical Equipment Rental & Reference Guide"
  },
  "For clinical staff, supervisors, and platform evaluators testing the live MEWS scoring workflow:": {
    "zh": "For clinical staff, supervisors, and platform evaluators testing the live MEWS scoring workflow:",
    "bm": "For clinical staff, supervisors, and platform evaluators testing the live MEWS scoring workflow:",
    "ta": "For clinical staff, supervisors, and platform evaluators testing the live MEWS scoring workflow:"
  },
  "❓ Enquire": {
    "zh": "❓ Enquire",
    "bm": "❓ Enquire",
    "ta": "❓ Enquire"
  },
  "Inquire & Order via WhatsApp": {
    "zh": "Inquire & Order via WhatsApp",
    "bm": "Inquire & Order via WhatsApp",
    "ta": "Inquire & Order via WhatsApp"
  },
  "Patient NRIC / IC Number (Optional)": {
    "zh": "Patient NRIC / IC Number (Optional)",
    "bm": "Patient NRIC / IC Number (Optional)",
    "ta": "Patient NRIC / IC Number (Optional)"
  },
  "Official company announcements, Penang clinical updates, and \"The Hire Site\" for Registered Nurses, Staff Nurses, and Dedicated Caregivers.": {
    "zh": "Official company announcements, Penang clinical updates, and \"The Hire Site\" for Registered Nurses, Staff Nurses, and Dedicated Caregivers.",
    "bm": "Official company announcements, Penang clinical updates, and \"The Hire Site\" for Registered Nurses, Staff Nurses, and Dedicated Caregivers.",
    "ta": "Official company announcements, Penang clinical updates, and \"The Hire Site\" for Registered Nurses, Staff Nurses, and Dedicated Caregivers."
  },
  "🏡 Home Clinical Care Specialist": {
    "zh": "🏡 Home Clinical Care Specialist",
    "bm": "🏡 Home Clinical Care Specialist",
    "ta": "🏡 Home Clinical Care Specialist"
  },
  "🛡️ PDPA Act 2010 Privacy & Data Protection": {
    "zh": "🛡️ PDPA Act 2010 Privacy & Data Protection",
    "bm": "🛡️ PDPA Act 2010 Privacy & Data Protection",
    "ta": "🛡️ PDPA Act 2010 Privacy & Data Protection"
  },
  "Explore Assura Nursing's official clinical awareness campaigns and educational posters. Download high-resolution media kits and contact our clinical care team for home visits across Penang Island and Mainland.": {
    "zh": "Explore Assura Nursing's official clinical awareness campaigns and educational posters. Download high-resolution media kits and contact our clinical care team for home visits across Penang Island and Mainland.",
    "bm": "Explore Assura Nursing's official clinical awareness campaigns and educational posters. Download high-resolution media kits and contact our clinical care team for home visits across Penang Island and Mainland.",
    "ta": "Explore Assura Nursing's official clinical awareness campaigns and educational posters. Download high-resolution media kits and contact our clinical care team for home visits across Penang Island and Mainland."
  },
  "For acute medical emergencies, call 999 immediately.": {
    "zh": "For acute medical emergencies, call 999 immediately.",
    "bm": "For acute medical emergencies, call 999 immediately.",
    "ta": "For acute medical emergencies, call 999 immediately."
  },
  "Cardiac Specialist": {
    "zh": "Cardiac Specialist",
    "bm": "Cardiac Specialist",
    "ta": "Cardiac Specialist"
  },
  "Public & New Patients": {
    "zh": "Public & New Patients",
    "bm": "Public & New Patients",
    "ta": "Public & New Patients"
  },
  "Media & Hospitals": {
    "zh": "Media & Hospitals",
    "bm": "Media & Hospitals",
    "ta": "Media & Hospitals"
  },
  "Active Coordination & Rapid Dispatch": {
    "zh": "Active Coordination & Rapid Dispatch",
    "bm": "Active Coordination & Rapid Dispatch",
    "ta": "Active Coordination & Rapid Dispatch"
  },
  "Clinical Points & Safety Checklist:": {
    "zh": "Clinical Points & Safety Checklist:",
    "bm": "Clinical Points & Safety Checklist:",
    "ta": "Clinical Points & Safety Checklist:"
  },
  "Web PWA · Any Browser · No Installation": {
    "zh": "Web PWA · Any Browser · No Installation",
    "bm": "Web PWA · Any Browser · No Installation",
    "ta": "Web PWA · Any Browser · No Installation"
  },
  "💻 Windows .EXE (2.1 MB)": {
    "zh": "💻 Windows .EXE (2.1 MB)",
    "bm": "💻 Windows .EXE (2.1 MB)",
    "ta": "💻 Windows .EXE (2.1 MB)"
  },
  "Manage home nurse bookings, track clinical vital charts, access the 24/7 Penang emergency hospital directory, and use the 110 BPM CPR metronome offline.": {
    "zh": "Manage home nurse bookings, track clinical vital charts, access the 24/7 Penang emergency hospital directory, and use the 110 BPM CPR metronome offline.",
    "bm": "Manage home nurse bookings, track clinical vital charts, access the 24/7 Penang emergency hospital directory, and use the 110 BPM CPR metronome offline.",
    "ta": "Manage home nurse bookings, track clinical vital charts, access the 24/7 Penang emergency hospital directory, and use the 110 BPM CPR metronome offline."
  },
  "All Equipment": {
    "zh": "All Equipment",
    "bm": "All Equipment",
    "ta": "All Equipment"
  },
  "If this is a medical emergency — chest pain, trouble breathing, severe bleeding, unconscious, stroke signs — call 999 now.": {
    "zh": "If this is a medical emergency — chest pain, trouble breathing, severe bleeding, unconscious, stroke signs — call 999 now.",
    "bm": "If this is a medical emergency — chest pain, trouble breathing, severe bleeding, unconscious, stroke signs — call 999 now.",
    "ta": "If this is a medical emergency — chest pain, trouble breathing, severe bleeding, unconscious, stroke signs — call 999 now."
  },
  "Malaysian Red Crescent (BSMM Penang)": {
    "zh": "Malaysian Red Crescent (BSMM Penang)",
    "bm": "Malaysian Red Crescent (BSMM Penang)",
    "ta": "Malaysian Red Crescent (BSMM Penang)"
  },
  "📢 Official Company Bulletins & Clinical Announcements": {
    "zh": "📢 Official Company Bulletins & Clinical Announcements",
    "bm": "📢 Official Company Bulletins & Clinical Announcements",
    "ta": "📢 Official Company Bulletins & Clinical Announcements"
  },
  "3088, Jalan Todak, Seberang Jaya, 13700 Perai": {
    "zh": "3088, Jalan Todak, Seberang Jaya, 13700 Perai",
    "bm": "3088, Jalan Todak, Seberang Jaya, 13700 Perai",
    "ta": "3088, Jalan Todak, Seberang Jaya, 13700 Perai"
  },
  "Direct EXE Mirror": {
    "zh": "Direct EXE Mirror",
    "bm": "Direct EXE Mirror",
    "ta": "Direct EXE Mirror"
  },
  "to place Assura on your mobile home screen.": {
    "zh": "to place Assura on your mobile home screen.",
    "bm": "to place Assura on your mobile home screen.",
    "ta": "to place Assura on your mobile home screen."
  },
  "⏰ BD (Twice Daily):": {
    "zh": "⏰ BD (Twice Daily):",
    "bm": "⏰ BD (Twice Daily):",
    "ta": "⏰ BD (Twice Daily):"
  },
  "LJM Registered (SRN)": {
    "zh": "LJM Registered (SRN)",
    "bm": "LJM Registered (SRN)",
    "ta": "LJM Registered (SRN)"
  },
  "Mobile Phone Emergency": {
    "zh": "Mobile Phone Emergency",
    "bm": "Mobile Phone Emergency",
    "ta": "Mobile Phone Emergency"
  },
  "WhatsApp，，。": {
    "zh": "WhatsApp，，。",
    "bm": "WhatsApp，，。",
    "ta": "WhatsApp，，。"
  },
  "Penang Island & Bukit Mertajam Base": {
    "zh": "槟岛与威省大山脚双基地出动",
    "bm": "Pulau Pinang & Pangkalan Bukit Mertajam",
    "ta": "பினாங்கு தீவு & புக்கிட் மெர்தாஜாம் தளம்"
  },
  "Times": {
    "zh": "Times",
    "bm": "Times",
    "ta": "Times"
  },
  "First Ambulance (Northern Regional Hub)": {
    "zh": "First Ambulance (Northern Regional Hub)",
    "bm": "First Ambulance (Northern Regional Hub)",
    "ta": "First Ambulance (Northern Regional Hub)"
  },
  "Crucial:": {
    "zh": "Crucial:",
    "bm": "Crucial:",
    "ta": "Crucial:"
  },
  "Electric Medical Suction Machine": {
    "zh": "Electric Medical Suction Machine",
    "bm": "Electric Medical Suction Machine",
    "ta": "Electric Medical Suction Machine"
  },
  "JUNE 2026 · EDUCATION & TRAINING": {
    "zh": "JUNE 2026 · EDUCATION & TRAINING",
    "bm": "JUNE 2026 · EDUCATION & TRAINING",
    "ta": "JUNE 2026 · EDUCATION & TRAINING"
  },
  "We will respond promptly. For urgent medical emergencies, please proceed to the nearest emergency department or call 999.": {
    "zh": "We will respond promptly. For urgent medical emergencies, please proceed to the nearest emergency department or call 999.",
    "bm": "We will respond promptly. For urgent medical emergencies, please proceed to the nearest emergency department or call 999.",
    "ta": "We will respond promptly. For urgent medical emergencies, please proceed to the nearest emergency department or call 999."
  },
  "Care": {
    "zh": "Care",
    "bm": "Care",
    "ta": "Care"
  },
  "Ryle": {
    "zh": "Ryle",
    "bm": "Ryle",
    "ta": "Ryle"
  },
  "Surgical, Bedsores & Diabetic Ulcers": {
    "zh": "Surgical, Bedsores & Diabetic Ulcers",
    "bm": "Surgical, Bedsores & Diabetic Ulcers",
    "ta": "Surgical, Bedsores & Diabetic Ulcers"
  },
  "Encrypted medical file repository for hospital discharge summaries, doctor prescriptions, and laboratory reports.": {
    "zh": "Encrypted medical file repository for hospital discharge summaries, doctor prescriptions, and laboratory reports.",
    "bm": "Encrypted medical file repository for hospital discharge summaries, doctor prescriptions, and laboratory reports.",
    "ta": "Encrypted medical file repository for hospital discharge summaries, doctor prescriptions, and laboratory reports."
  },
  "Male Nurse / Caregiver": {
    "zh": "Male Nurse / Caregiver",
    "bm": "Male Nurse / Caregiver",
    "ta": "Male Nurse / Caregiver"
  },
  "Media, Clinical Resources & Emergency Hub": {
    "zh": "Media, Clinical Resources & Emergency Hub",
    "bm": "Media, Clinical Resources & Emergency Hub",
    "ta": "Media, Clinical Resources & Emergency Hub"
  },
  "Pair regular turning with a 3-function electric bed and alternating ripple mattress for 100% bedsore prevention.": {
    "zh": "Pair regular turning with a 3-function electric bed and alternating ripple mattress for 100% bedsore prevention.",
    "bm": "Pair regular turning with a 3-function electric bed and alternating ripple mattress for 100% bedsore prevention.",
    "ta": "Pair regular turning with a 3-function electric bed and alternating ripple mattress for 100% bedsore prevention."
  },
  "2/3-Function Electric Hospital Bed": {
    "zh": "2/3-Function Electric Hospital Bed",
    "bm": "2/3-Function Electric Hospital Bed",
    "ta": "2/3-Function Electric Hospital Bed"
  },
  "⚡ Penang's 1st Digital & AI-Era Home Nursing · 100% Transparent Rates · RM 0 Weekend Surcharge": {
    "zh": "⚡ Penang's 1st Digital & AI-Era Home Nursing · 100% Transparent Rates · RM 0 Weekend Surcharge",
    "bm": "⚡ Penang's 1st Digital & AI-Era Home Nursing · 100% Transparent Rates · RM 0 Weekend Surcharge",
    "ta": "⚡ Penang's 1st Digital & AI-Era Home Nursing · 100% Transparent Rates · RM 0 Weekend Surcharge"
  },
  "Pick a visiting time": {
    "zh": "Pick a visiting time",
    "bm": "Pick a visiting time",
    "ta": "Pick a visiting time"
  },
  "Need Professional Nurse Visit or Equipment in Penang?": {
    "zh": "Need Professional Nurse Visit or Equipment in Penang?",
    "bm": "Need Professional Nurse Visit or Equipment in Penang?",
    "ta": "Need Professional Nurse Visit or Equipment in Penang?"
  },
  "❤️ Adult Hands-Only CPR & 110 BPM Metronome": {
    "zh": "❤️ Adult Hands-Only CPR & 110 BPM Metronome",
    "bm": "❤️ Adult Hands-Only CPR & 110 BPM Metronome",
    "ta": "❤️ Adult Hands-Only CPR & 110 BPM Metronome"
  },
  "Patient / Family Representative Name": {
    "zh": "Patient / Family Representative Name",
    "bm": "Patient / Family Representative Name",
    "ta": "Patient / Family Representative Name"
  },
  "🛡️": {
    "zh": "🛡️",
    "bm": "🛡️",
    "ta": "🛡️"
  },
  "PATIENT MEMBER ACCOUNT": {
    "zh": "PATIENT MEMBER ACCOUNT",
    "bm": "PATIENT MEMBER ACCOUNT",
    "ta": "PATIENT MEMBER ACCOUNT"
  },
  "Real-time vital signs scoring, WhatsApp post-visit reports with wound photos, and 72-hour attending doctor secure link.": {
    "zh": "Real-time vital signs scoring, WhatsApp post-visit reports with wound photos, and 72-hour attending doctor secure link.",
    "bm": "Real-time vital signs scoring, WhatsApp post-visit reports with wound photos, and 72-hour attending doctor secure link.",
    "ta": "Real-time vital signs scoring, WhatsApp post-visit reports with wound photos, and 72-hour attending doctor secure link."
  },
  "RM 120 – RM 200 / mo": {
    "zh": "RM 120 – RM 200 / mo",
    "bm": "RM 120 – RM 200 / mo",
    "ta": "RM 120 – RM 200 / mo"
  },
  "Real-time digital charting of blood pressure, SpO2, blood glucose, and temperature with seamless doctor handover summaries and family guidance.": {
    "zh": "实时数字化记录血压、血氧、血糖与体温走势，生成无缝衔接主治医生的交接报告，为家属提供专业指导。",
    "bm": "Pencatatan digital masa nyata bagi tekanan darah, SpO2, gula darah, dan suhu dengan ringkasan serahan tugas kepada doktor serta panduan keluarga.",
    "ta": "இரத்த அழுத்தம், SpO2, இரத்த சர்க்கரை மற்றும் வெப்பநிலையின் நிகழ்நேர டிஜிட்டல் விளக்கப்படம், மருத்துவர் ஒப்படைப்பு சுருக்கங்கள் மற்றும் குடும்ப வழிகாட்டுதல்."
  },
  "Private Home": {
    "zh": "Private Home",
    "bm": "Private Home",
    "ta": "Private Home"
  },
  "All details remain confidential under PDPA 2010 regulations.": {
    "zh": "All details remain confidential under PDPA 2010 regulations.",
    "bm": "All details remain confidential under PDPA 2010 regulations.",
    "ta": "All details remain confidential under PDPA 2010 regulations."
  },
  "You do not need to sign in or register to browse home nursing procedures, calculate transparent prices, or use emergency hospital GPS routing.": {
    "zh": "You do not need to sign in or register to browse home nursing procedures, calculate transparent prices, or use emergency hospital GPS routing.",
    "bm": "You do not need to sign in or register to browse home nursing procedures, calculate transparent prices, or use emergency hospital GPS routing.",
    "ta": "You do not need to sign in or register to browse home nursing procedures, calculate transparent prices, or use emergency hospital GPS routing."
  },
  "Call 012-206 4868 ☎": {
    "zh": "拨打 012-206 4868 ☎",
    "bm": "Hubungi 012-206 4868 ☎",
    "ta": "அழைக்கவும் 012-206 4868 ☎"
  },
  "Hospital Seberang Jaya (HSJ)": {
    "zh": "Hospital Seberang Jaya (HSJ)",
    "bm": "Hospital Seberang Jaya (HSJ)",
    "ta": "Hospital Seberang Jaya (HSJ)"
  },
  "⚡ Instant Price Estimator": {
    "zh": "⚡ Instant Price Estimator",
    "bm": "⚡ Instant Price Estimator",
    "ta": "⚡ Instant Price Estimator"
  },
  "Jalan Residensi, 10990 George Town, Penang": {
    "zh": "Jalan Residensi, 10990 George Town, Penang",
    "bm": "Jalan Residensi, 10990 George Town, Penang",
    "ta": "Jalan Residensi, 10990 George Town, Penang"
  },
  "Converts liquid respiratory medications into an inhalable fine aerosol mist for direct lung delivery.": {
    "zh": "Converts liquid respiratory medications into an inhalable fine aerosol mist for direct lung delivery.",
    "bm": "Converts liquid respiratory medications into an inhalable fine aerosol mist for direct lung delivery.",
    "ta": "Converts liquid respiratory medications into an inhalable fine aerosol mist for direct lung delivery."
  },
  "Equipment description.": {
    "zh": "Equipment description.",
    "bm": "Equipment description.",
    "ta": "Equipment description."
  },
  "06:00, 12:00, 18:00, 22:00 (6-hour intervals)": {
    "zh": "06:00, 12:00, 18:00, 22:00 (6-hour intervals)",
    "bm": "06:00, 12:00, 18:00, 22:00 (6-hour intervals)",
    "ta": "06:00, 12:00, 18:00, 22:00 (6-hour intervals)"
  },
  "We believe effective home care is a balance of two essential skills:": {
    "zh": "We believe effective home care is a balance of two essential skills:",
    "bm": "We believe effective home care is a balance of two essential skills:",
    "ta": "We believe effective home care is a balance of two essential skills:"
  },
  "The Hire Site (Join Our Team)": {
    "zh": "The Hire Site (Join Our Team)",
    "bm": "The Hire Site (Join Our Team)",
    "ta": "The Hire Site (Join Our Team)"
  },
  "Alt:": {
    "zh": "Alt:",
    "bm": "Alt:",
    "ta": "Alt:"
  },
  "e.g. No 8, Taman Kota Permai, Bukit Mertajam": {
    "zh": "e.g. No 8, Taman Kota Permai, Bukit Mertajam",
    "bm": "e.g. No 8, Taman Kota Permai, Bukit Mertajam",
    "ta": "e.g. No 8, Taman Kota Permai, Bukit Mertajam"
  },
  "24/7 Emergency / Line:": {
    "zh": "24/7 Emergency / Line:",
    "bm": "24/7 Emergency / Line:",
    "ta": "24/7 Emergency / Line:"
  },
  "Name": {
    "zh": "Name",
    "bm": "Name",
    "ta": "Name"
  },
  "☎ 1300 88 1919": {
    "zh": "☎ 1300 88 1919",
    "bm": "☎ 1300 88 1919",
    "ta": "☎ 1300 88 1919"
  },
  "Urinary Catheter Change": {
    "zh": "Urinary Catheter Change",
    "bm": "Urinary Catheter Change",
    "ta": "Urinary Catheter Change"
  },
  "Use Saved Details": {
    "zh": "Use Saved Details",
    "bm": "Use Saved Details",
    "ta": "Use Saved Details"
  },
  ", tap Settings and allow.": {
    "zh": ", tap Settings and allow.",
    "bm": ", tap Settings and allow.",
    "ta": ", tap Settings and allow."
  },
  "Your unified Penang healthcare & media center: 24/7 hospital emergency GPS directory, CPR metronome, medical equipment rental catalog, home nursing clinical guides, and clinical video & photo media.": {
    "zh": "Your unified Penang healthcare & media center: 24/7 hospital emergency GPS directory, CPR metronome, medical equipment rental catalog, home nursing clinical guides, and clinical video & photo media.",
    "bm": "Your unified Penang healthcare & media center: 24/7 hospital emergency GPS directory, CPR metronome, medical equipment rental catalog, home nursing clinical guides, and clinical video & photo media.",
    "ta": "Your unified Penang healthcare & media center: 24/7 hospital emergency GPS directory, CPR metronome, medical equipment rental catalog, home nursing clinical guides, and clinical video & photo media."
  },
  "Add your address": {
    "zh": "Add your address",
    "bm": "Add your address",
    "ta": "Add your address"
  },
  "ASSURA NURSING · PDPA 2010 CONFIDENTIAL": {
    "zh": "ASSURA NURSING · PDPA 2010 CONFIDENTIAL",
    "bm": "ASSURA NURSING · PDPA 2010 CONFIDENTIAL",
    "ta": "ASSURA NURSING · PDPA 2010 CONFIDENTIAL"
  },
  "e.g. 550101-07-5555": {
    "zh": "e.g. 550101-07-5555",
    "bm": "e.g. 550101-07-5555",
    "ta": "e.g. 550101-07-5555"
  },
  "2-Hourly Turning & Contracture Prevention": {
    "zh": "2-Hourly Turning & Contracture Prevention",
    "bm": "2-Hourly Turning & Contracture Prevention",
    "ta": "2-Hourly Turning & Contracture Prevention"
  },
  "💬 WhatsApp Urgent Care": {
    "zh": "💬 WhatsApp Urgent Care",
    "bm": "💬 WhatsApp Urgent Care",
    "ta": "💬 WhatsApp Urgent Care"
  },
  "Registered Mobile Phone or Case Code": {
    "zh": "Registered Mobile Phone or Case Code",
    "bm": "Registered Mobile Phone or Case Code",
    "ta": "Registered Mobile Phone or Case Code"
  },
  ") and PIN to view assigned rosters, record real-time MEWS vitals, and initiate doctor referrals.": {
    "zh": ") and PIN to view assigned rosters, record real-time MEWS vitals, and initiate doctor referrals.",
    "bm": ") and PIN to view assigned rosters, record real-time MEWS vitals, and initiate doctor referrals.",
    "ta": ") and PIN to view assigned rosters, record real-time MEWS vitals, and initiate doctor referrals."
  },
  "Hospital / Specialist Clinic Escort · RM 150": {
    "zh": "Hospital / Specialist Clinic Escort · RM 150",
    "bm": "Hospital / Specialist Clinic Escort · RM 150",
    "ta": "Hospital / Specialist Clinic Escort · RM 150"
  },
  "Ambulance / Police / Bomba": {
    "zh": "Ambulance / Police / Bomba",
    "bm": "Ambulance / Police / Bomba",
    "ta": "Ambulance / Police / Bomba"
  },
  "23, Jalan Bulan, Fettes Park, 11200 Tanjung Bungah": {
    "zh": "23, Jalan Bulan, Fettes Park, 11200 Tanjung Bungah",
    "bm": "23, Jalan Bulan, Fettes Park, 11200 Tanjung Bungah",
    "ta": "23, Jalan Bulan, Fettes Park, 11200 Tanjung Bungah"
  },
  "Flush tube with 30–50ml warm boiled water post-feed to keep lumen patent.": {
    "zh": "Flush tube with 30–50ml warm boiled water post-feed to keep lumen patent.",
    "bm": "Flush tube with 30–50ml warm boiled water post-feed to keep lumen patent.",
    "ta": "Flush tube with 30–50ml warm boiled water post-feed to keep lumen patent."
  },
  "Patient (Wound Care)": {
    "zh": "Patient (Wound Care)",
    "bm": "Patient (Wound Care)",
    "ta": "Patient (Wound Care)"
  },
  "High Payout Network": {
    "zh": "High Payout Network",
    "bm": "High Payout Network",
    "ta": "High Payout Network"
  },
  "☎ 04-222 9111": {
    "zh": "☎ 04-222 9111",
    "bm": "☎ 04-222 9111",
    "ta": "☎ 04-222 9111"
  },
  "Security PIN / Password": {
    "zh": "Security PIN / Password",
    "bm": "Security PIN / Password",
    "ta": "Security PIN / Password"
  },
  "Install": {
    "zh": "Install",
    "bm": "Install",
    "ta": "Install"
  },
  "Assura": {
    "zh": "Assura",
    "bm": "Assura",
    "ta": "Assura"
  },
  "Elevate patient's head of bed to at least 45° to 60° before starting feeds.": {
    "zh": "Elevate patient's head of bed to at least 45° to 60° before starting feeds.",
    "bm": "Elevate patient's head of bed to at least 45° to 60° before starting feeds.",
    "ta": "Elevate patient's head of bed to at least 45° to 60° before starting feeds."
  },
  "Select Procedure →": {
    "zh": "Select Procedure →",
    "bm": "Select Procedure →",
    "ta": "Select Procedure →"
  },
  "MALAYSIA TOLL-FREE & DISPATCH": {
    "zh": "MALAYSIA TOLL-FREE & DISPATCH",
    "bm": "MALAYSIA TOLL-FREE & DISPATCH",
    "ta": "MALAYSIA TOLL-FREE & DISPATCH"
  },
  "Open the file from notifications or your": {
    "zh": "Open the file from notifications or your",
    "bm": "Open the file from notifications or your",
    "ta": "Open the file from notifications or your"
  },
  "Kepala Batas / Tasek Gelugor / Bertam": {
    "zh": "Kepala Batas / Tasek Gelugor / Bertam",
    "bm": "Kepala Batas / Tasek Gelugor / Bertam",
    "ta": "Kepala Batas / Tasek Gelugor / Bertam"
  },
  "Saved only on this phone. We never see it until you send the message.": {
    "zh": "Saved only on this phone. We never see it until you send the message.",
    "bm": "Saved only on this phone. We never see it until you send the message.",
    "ta": "Saved only on this phone. We never see it until you send the message."
  },
  "Seberang Jaya · Butterworth · Bukit Mertajam · Kepala Batas": {
    "zh": "Seberang Jaya · Butterworth · Bukit Mertajam · Kepala Batas",
    "bm": "Seberang Jaya · Butterworth · Bukit Mertajam · Kepala Batas",
    "ta": "Seberang Jaya · Butterworth · Bukit Mertajam · Kepala Batas"
  },
  "CAUTI Prevention & Drainage Maintenance": {
    "zh": "CAUTI Prevention & Drainage Maintenance",
    "bm": "CAUTI Prevention & Drainage Maintenance",
    "ta": "CAUTI Prevention & Drainage Maintenance"
  },
  "☎ 04-228 8222": {
    "zh": "☎ 04-228 8222",
    "bm": "☎ 04-228 8222",
    "ta": "☎ 04-228 8222"
  },
  "🖨 Print Summary": {
    "zh": "🖨 Print Summary",
    "bm": "🖨 Print Summary",
    "ta": "🖨 Print Summary"
  },
  "1. Check & Call:": {
    "zh": "1. Check & Call:",
    "bm": "1. Check & Call:",
    "ta": "1. Check & Call:"
  },
  "🩺 View Services & Transparent Rates": {
    "zh": "🩺 View Services & Transparent Rates",
    "bm": "🩺 View Services & Transparent Rates",
    "ta": "🩺 View Services & Transparent Rates"
  },
  "🔔 Test Offline Alert": {
    "zh": "🔔 Test Offline Alert",
    "bm": "🔔 Test Offline Alert",
    "ta": "🔔 Test Offline Alert"
  },
  "Save this booking app": {
    "zh": "Save this booking app",
    "bm": "Save this booking app",
    "ta": "Save this booking app"
  },
  "Ryle's Tube Change": {
    "zh": "Ryle's Tube Change",
    "bm": "Ryle's Tube Change",
    "ta": "Ryle's Tube Change"
  },
  "custom": {
    "zh": "custom",
    "bm": "custom",
    "ta": "custom"
  },
  "Emergency & Patient Transfers · Mainland & Island": {
    "zh": "Emergency & Patient Transfers · Mainland & Island",
    "bm": "Emergency & Patient Transfers · Mainland & Island",
    "ta": "Emergency & Patient Transfers · Mainland & Island"
  },
  "Unified App for Everyone": {
    "zh": "Unified App for Everyone",
    "bm": "Unified App for Everyone",
    "ta": "Unified App for Everyone"
  },
  "Push down 2 inches (5 cm) at 100–120 beats per minute. Allow complete recoil.": {
    "zh": "Push down 2 inches (5 cm) at 100–120 beats per minute. Allow complete recoil.",
    "bm": "Push down 2 inches (5 cm) at 100–120 beats per minute. Allow complete recoil.",
    "ta": "Push down 2 inches (5 cm) at 100–120 beats per minute. Allow complete recoil."
  },
  ") or phone number to view real-time MEWS vital charts, medication administration records, and wound healing progress photos.": {
    "zh": ") or phone number to view real-time MEWS vital charts, medication administration records, and wound healing progress photos.",
    "bm": ") or phone number to view real-time MEWS vital charts, medication administration records, and wound healing progress photos.",
    "ta": ") or phone number to view real-time MEWS vital charts, medication administration records, and wound healing progress photos."
  },
  "Upfront pricing with RM 0 Penang distance surcharge. Itemized digital statements provided for family insurance claims.": {
    "zh": "Upfront pricing with RM 0 Penang distance surcharge. Itemized digital statements provided for family insurance claims.",
    "bm": "Upfront pricing with RM 0 Penang distance surcharge. Itemized digital statements provided for family insurance claims.",
    "ta": "Upfront pricing with RM 0 Penang distance surcharge. Itemized digital statements provided for family insurance claims."
  },
  "RM 15 – RM 45 / pack": {
    "zh": "RM 15 – RM 45 / pack",
    "bm": "RM 15 – RM 45 / pack",
    "ta": "RM 15 – RM 45 / pack"
  },
  "We provide scheduled and rapid home nursing care. If experiencing acute medical emergencies (severe chest pain, respiratory arrest, massive hemorrhage), please call 999 immediately.": {
    "zh": "We provide scheduled and rapid home nursing care. If experiencing acute medical emergencies (severe chest pain, respiratory arrest, massive hemorrhage), please call 999 immediately.",
    "bm": "We provide scheduled and rapid home nursing care. If experiencing acute medical emergencies (severe chest pain, respiratory arrest, massive hemorrhage), please call 999 immediately.",
    "ta": "We provide scheduled and rapid home nursing care. If experiencing acute medical emergencies (severe chest pain, respiratory arrest, massive hemorrhage), please call 999 immediately."
  },
  "Injection & Drip": {
    "zh": "Injection & Drip",
    "bm": "Injection & Drip",
    "ta": "Injection & Drip"
  },
  "Adapting to the Home, Upholding the Fundamentals": {
    "zh": "Adapting to the Home, Upholding the Fundamentals",
    "bm": "Adapting to the Home, Upholding the Fundamentals",
    "ta": "Adapting to the Home, Upholding the Fundamentals"
  },
  "Select your nursing procedure and Penang location for transparent procedure rates across all Penang areas (No initial travel surcharge):": {
    "zh": "Select your nursing procedure and Penang location for transparent procedure rates across all Penang areas (No initial travel surcharge):",
    "bm": "Select your nursing procedure and Penang location for transparent procedure rates across all Penang areas (No initial travel surcharge):",
    "ta": "Select your nursing procedure and Penang location for transparent procedure rates across all Penang areas (No initial travel surcharge):"
  },
  "Search Services": {
    "zh": "搜索项目",
    "bm": "Cari Perkhidmatan",
    "ta": "சேவைகளைத் தேடு"
  },
  "Receive shift alerts, patient reminders, and emergency updates even without internet.": {
    "zh": "Receive shift alerts, patient reminders, and emergency updates even without internet.",
    "bm": "Receive shift alerts, patient reminders, and emergency updates even without internet.",
    "ta": "Receive shift alerts, patient reminders, and emergency updates even without internet."
  },
  "🎬 First-Time App User Guide & Memo": {
    "zh": "🎬 First-Time App User Guide & Memo",
    "bm": "🎬 First-Time App User Guide & Memo",
    "ta": "🎬 First-Time App User Guide & Memo"
  },
  "ASN-001": {
    "zh": "ASN-001",
    "bm": "ASN-001",
    "ta": "ASN-001"
  },
  "Bukit Mertajam & Central Seberang Perai": {
    "zh": "Bukit Mertajam & Central Seberang Perai",
    "bm": "Bukit Mertajam & Central Seberang Perai",
    "ta": "Bukit Mertajam & Central Seberang Perai"
  },
  "Assura 24/7 Clinical Care Line": {
    "zh": "Assura 24/7 Clinical Care Line",
    "bm": "Assura 24/7 Clinical Care Line",
    "ta": "Assura 24/7 Clinical Care Line"
  },
  "Critical Care Transport & Home-to-Hospital Transfers": {
    "zh": "Critical Care Transport & Home-to-Hospital Transfers",
    "bm": "Critical Care Transport & Home-to-Hospital Transfers",
    "ta": "Critical Care Transport & Home-to-Hospital Transfers"
  },
  "Digital Cloud MEWS · Direct Doctor Connect": {
    "zh": "Digital Cloud MEWS · Direct Doctor Connect",
    "bm": "Digital Cloud MEWS · Direct Doctor Connect",
    "ta": "Digital Cloud MEWS · Direct Doctor Connect"
  },
  "Penang Adventist Hospital (PAH)": {
    "zh": "Penang Adventist Hospital (PAH)",
    "bm": "Penang Adventist Hospital (PAH)",
    "ta": "Penang Adventist Hospital (PAH)"
  },
  "\"Install unknown apps\"": {
    "zh": "\"Install unknown apps\"",
    "bm": "\"Install unknown apps\"",
    "ta": "\"Install unknown apps\""
  },
  "Estimated Rental": {
    "zh": "Estimated Rental",
    "bm": "Estimated Rental",
    "ta": "Estimated Rental"
  },
  "06:00, 15:00, 22:00 (8-hour intervals)": {
    "zh": "06:00, 15:00, 22:00 (8-hour intervals)",
    "bm": "06:00, 15:00, 22:00 (8-hour intervals)",
    "ta": "06:00, 15:00, 22:00 (8-hour intervals)"
  },
  "141, Jalan Tan Sri Teh Ewe Lim, 11600 George Town": {
    "zh": "141, Jalan Tan Sri Teh Ewe Lim, 11600 George Town",
    "bm": "141, Jalan Tan Sri Teh Ewe Lim, 11600 George Town",
    "ta": "141, Jalan Tan Sri Teh Ewe Lim, 11600 George Town"
  },
  "Penang's 1st Digital Home Nursing Platform · Trained nurses and dedicated caregivers delivering personalized care plans with transparent fare rates and fast staff coordination.": {
    "zh": "Penang's 1st Digital Home Nursing Platform · Trained nurses and dedicated caregivers delivering personalized care plans with transparent fare rates and fast staff coordination.",
    "bm": "Penang's 1st Digital Home Nursing Platform · Trained nurses and dedicated caregivers delivering personalized care plans with transparent fare rates and fast staff coordination.",
    "ta": "Penang's 1st Digital Home Nursing Platform · Trained nurses and dedicated caregivers delivering personalized care plans with transparent fare rates and fast staff coordination."
  },
  "We believe nurses deserve respect, transparent earnings, and professional autonomy. Earn competitive case commissions with prompt bi-weekly direct payroll transfers.": {
    "zh": "We believe nurses deserve respect, transparent earnings, and professional autonomy. Earn competitive case commissions with prompt bi-weekly direct payroll transfers.",
    "bm": "We believe nurses deserve respect, transparent earnings, and professional autonomy. Earn competitive case commissions with prompt bi-weekly direct payroll transfers.",
    "ta": "We believe nurses deserve respect, transparent earnings, and professional autonomy. Earn competitive case commissions with prompt bi-weekly direct payroll transfers."
  },
  "Get instant access to home nurse bookings, transparent rates, emergency hospital routing, and live clinical vital charts.": {
    "zh": "Get instant access to home nurse bookings, transparent rates, emergency hospital routing, and live clinical vital charts.",
    "bm": "Get instant access to home nurse bookings, transparent rates, emergency hospital routing, and live clinical vital charts.",
    "ta": "Get instant access to home nurse bookings, transparent rates, emergency hospital routing, and live clinical vital charts."
  },
  "Use My Location": {
    "zh": "Use My Location",
    "bm": "Use My Location",
    "ta": "Use My Location"
  },
  "Install the official mobile or desktop application for seamless offline support, direct alerts, and clinical access across Penang.": {
    "zh": "Install the official mobile or desktop application for seamless offline support, direct alerts, and clinical access across Penang.",
    "bm": "Install the official mobile or desktop application for seamless offline support, direct alerts, and clinical access across Penang.",
    "ta": "Install the official mobile or desktop application for seamless offline support, direct alerts, and clinical access across Penang."
  },
  "⏰ ON (Nightly):": {
    "zh": "⏰ ON (Nightly):",
    "bm": "⏰ ON (Nightly):",
    "ta": "⏰ ON (Nightly):"
  },
  "Well-Trained Care Team": {
    "zh": "专业培训护理团队",
    "bm": "Pasukan Penjagaan Terlatih",
    "ta": "நன்கு பயிற்சி பெற்ற பராமரிப்பு குழு"
  },
  "Visit": {
    "zh": "Visit",
    "bm": "Visit",
    "ta": "Visit"
  },
  "The Guiding Principles Behind Every Home Visit": {
    "zh": "The Guiding Principles Behind Every Home Visit",
    "bm": "The Guiding Principles Behind Every Home Visit",
    "ta": "The Guiding Principles Behind Every Home Visit"
  },
  "📞 Call us · 012-206 4868": {
    "zh": "📞 Call us · 012-206 4868",
    "bm": "📞 Call us · 012-206 4868",
    "ta": "📞 Call us · 012-206 4868"
  },
  "Personal Hygiene Care": {
    "zh": "Personal Hygiene Care",
    "bm": "Personal Hygiene Care",
    "ta": "Personal Hygiene Care"
  },
  "🎬 Watch Guide Video & Read Memo": {
    "zh": "🎬 Watch Guide Video & Read Memo",
    "bm": "🎬 Watch Guide Video & Read Memo",
    "ta": "🎬 Watch Guide Video & Read Memo"
  },
  "📍 Filled from your location — please add your house/unit number if it's missing.": {
    "zh": "📍 Filled from your location — please add your house/unit number if it's missing.",
    "bm": "📍 Filled from your location — please add your house/unit number if it's missing.",
    "ta": "📍 Filled from your location — please add your house/unit number if it's missing."
  },
  "4. Digital MEWS Vitals & Handover": {
    "zh": "4. Digital MEWS Vitals & Handover",
    "bm": "4. Digital MEWS Vitals & Handover",
    "ta": "4. Digital MEWS Vitals & Handover"
  },
  "A trained nurse arrives punctually with sterile clinical equipment, providing gentle bedside care, vital recording, and family guidance.": {
    "zh": "A trained nurse arrives punctually with sterile clinical equipment, providing gentle bedside care, vital recording, and family guidance.",
    "bm": "A trained nurse arrives punctually with sterile clinical equipment, providing gentle bedside care, vital recording, and family guidance.",
    "ta": "A trained nurse arrives punctually with sterile clinical equipment, providing gentle bedside care, vital recording, and family guidance."
  },
  "Stroke Rehab & Mobility Exercise (1.5 hr) · RM 250": {
    "zh": "Stroke Rehab & Mobility Exercise (1.5 hr) · RM 250",
    "bm": "Stroke Rehab & Mobility Exercise (1.5 hr) · RM 250",
    "ta": "Stroke Rehab & Mobility Exercise (1.5 hr) · RM 250"
  },
  "Sign Out": {
    "zh": "Sign Out",
    "bm": "Sign Out",
    "ta": "Sign Out"
  },
  "Single-use gamma-sterilized basic & complex dressing sets with forceps, gauze swabs, and drapes.": {
    "zh": "Single-use gamma-sterilized basic & complex dressing sets with forceps, gauze swabs, and drapes.",
    "bm": "Single-use gamma-sterilized basic & complex dressing sets with forceps, gauze swabs, and drapes.",
    "ta": "Single-use gamma-sterilized basic & complex dressing sets with forceps, gauze swabs, and drapes."
  },
  "LJM Registered Nurses & Trained Caregivers": {
    "zh": "大马 LJM 注册执照护士与专业护理员",
    "bm": "Jururawat Berdaftar LJM & Penjaga Terlatih",
    "ta": "LJM பதிவுசெய்த செவிலியர்கள் & பராமரிப்பாளர்கள்"
  },
  "Emergency & Non-Emergency Community Dispatch": {
    "zh": "Emergency & Non-Emergency Community Dispatch",
    "bm": "Emergency & Non-Emergency Community Dispatch",
    "ta": "Emergency & Non-Emergency Community Dispatch"
  },
  "Aseptic Wound Care & Dressing": {
    "zh": "Aseptic Wound Care & Dressing",
    "bm": "Aseptic Wound Care & Dressing",
    "ta": "Aseptic Wound Care & Dressing"
  },
  "To provide professional, compassionate, and standardized home nursing care for every family across Penang, adapting clinical protocols thoughtfully to home environments while maintaining rigorous infection control and patient dignity.": {
    "zh": "To provide professional, compassionate, and standardized home nursing care for every family across Penang, adapting clinical protocols thoughtfully to home environments while maintaining rigorous infection control and patient dignity.",
    "bm": "To provide professional, compassionate, and standardized home nursing care for every family across Penang, adapting clinical protocols thoughtfully to home environments while maintaining rigorous infection control and patient dignity.",
    "ta": "To provide professional, compassionate, and standardized home nursing care for every family across Penang, adapting clinical protocols thoughtfully to home environments while maintaining rigorous infection control and patient dignity."
  },
  "Media, Medical Equipment & Emergency Hub · Assura Nursing": {
    "zh": "Media, Medical Equipment & Emergency Hub · Assura Nursing",
    "bm": "Media, Medical Equipment & Emergency Hub · Assura Nursing",
    "ta": "Media, Medical Equipment & Emergency Hub · Assura Nursing"
  },
  "AD #4 · DIGITAL MEWS TECH": {
    "zh": "AD #4 · DIGITAL MEWS TECH",
    "bm": "AD #4 · DIGITAL MEWS TECH",
    "ta": "AD #4 · DIGITAL MEWS TECH"
  },
  "Next ▶": {
    "zh": "Next ▶",
    "bm": "Next ▶",
    "ta": "Next ▶"
  },
  "Announcements & Nurse Careers (\"The Hire Site\") · Assura Nursing": {
    "zh": "Announcements & Nurse Careers (\"The Hire Site\") · Assura Nursing",
    "bm": "Announcements & Nurse Careers (\"The Hire Site\") · Assura Nursing",
    "ta": "Announcements & Nurse Careers (\"The Hire Site\") · Assura Nursing"
  },
  "ℹ️": {
    "zh": "ℹ️",
    "bm": "ℹ️",
    "ta": "ℹ️"
  },
  "07:00 or 12:00 (Morning / Midday)": {
    "zh": "07:00 or 12:00 (Morning / Midday)",
    "bm": "07:00 or 12:00 (Morning / Midday)",
    "ta": "07:00 or 12:00 (Morning / Midday)"
  },
  "National Emergency Toll-Free": {
    "zh": "National Emergency Toll-Free",
    "bm": "National Emergency Toll-Free",
    "ta": "National Emergency Toll-Free"
  },
  "🤖 Android APK (3.8 MB)": {
    "zh": "🤖 Android APK (3.8 MB)",
    "bm": "🤖 Android APK (3.8 MB)",
    "ta": "🤖 Android APK (3.8 MB)"
  },
  "Home Nursing & Nurse Dispatch": {
    "zh": "Home Nursing & Nurse Dispatch",
    "bm": "Home Nursing & Nurse Dispatch",
    "ta": "Home Nursing & Nurse Dispatch"
  },
  "PIN": {
    "zh": "PIN",
    "bm": "PIN",
    "ta": "PIN"
  },
  "19 & 21, Logan Road, 10400 George Town, Penang": {
    "zh": "19 & 21, Logan Road, 10400 George Town, Penang",
    "bm": "19 & 21, Logan Road, 10400 George Town, Penang",
    "ta": "19 & 21, Logan Road, 10400 George Town, Penang"
  },
  "📖 Read Founder's Story & Clinical Values →": {
    "zh": "📖 Read Founder's Story & Clinical Values →",
    "bm": "📖 Read Founder's Story & Clinical Values →",
    "ta": "📖 Read Founder's Story & Clinical Values →"
  },
  "☎ 04-222 5333": {
    "zh": "☎ 04-222 5333",
    "bm": "☎ 04-222 5333",
    "ta": "☎ 04-222 5333"
  },
  "Place supportive pillows between knees, under affected arm, and floating heels.": {
    "zh": "Place supportive pillows between knees, under affected arm, and floating heels.",
    "bm": "Place supportive pillows between knees, under affected arm, and floating heels.",
    "ta": "Place supportive pillows between knees, under affected arm, and floating heels."
  },
  "\"To build a trusted digital and AI-era home healthcare service in Penang, recognized for real-time clinical tracking, transparent fare rates, and heartfelt family care.\"": {
    "zh": "“在槟城打造值得信赖的数智化居家照护服务，以实时体征追踪、透明公道收费和真诚家属关怀树立行业标杆。”",
    "bm": "\"Membina perkhidmatan penjagaan kesihatan rumah era digital dan AI yang dipercayai di Pulau Pinang, diiktiraf untuk pemantauan klinikal masa nyata, kadar tambang telus, dan penjagaan keluarga yang ikhlas.\"",
    "ta": "\"நிகழ்நேர மருத்துவ கண்காணிப்பு, வெளிப்படையான கட்டணங்கள் மற்றும் உண்மையான குடும்ப கவனிப்பு ஆகியவற்றிற்கு அங்கீகரிக்கப்பட்ட பினாங்கில் நம்பகமான டிஜிட்டல் வீட்டு சுகாதார சேவையை உருவாக்குதல்.\""
  },
  "☎ 012-344 1007": {
    "zh": "☎ 012-344 1007",
    "bm": "☎ 012-344 1007",
    "ta": "☎ 012-344 1007"
  },
  "24/7 Rapid Response Network · 15 Penang Hospitals": {
    "zh": "24/7 Rapid Response Network · 15 Penang Hospitals",
    "bm": "24/7 Rapid Response Network · 15 Penang Hospitals",
    "ta": "24/7 Rapid Response Network · 15 Penang Hospitals"
  },
  "Step 2: Family Case Link": {
    "zh": "Step 2: Family Case Link",
    "bm": "Step 2: Family Case Link",
    "ta": "Step 2: Family Case Link"
  },
  "Private ambulance services for post-hospital discharge, inter-hospital transfer, bedridden patient medical appointments, dialysis transport, and inter-state medical transfers:": {
    "zh": "Private ambulance services for post-hospital discharge, inter-hospital transfer, bedridden patient medical appointments, dialysis transport, and inter-state medical transfers:",
    "bm": "Private ambulance services for post-hospital discharge, inter-hospital transfer, bedridden patient medical appointments, dialysis transport, and inter-state medical transfers:",
    "ta": "Private ambulance services for post-hospital discharge, inter-hospital transfer, bedridden patient medical appointments, dialysis transport, and inter-state medical transfers:"
  },
  "Contact our care hotline via WhatsApp or phone. Share your location and care needs—we immediately match nearby available nurses and reply ASAP.": {
    "zh": "Contact our care hotline via WhatsApp or phone. Share your location and care needs—we immediately match nearby available nurses and reply ASAP.",
    "bm": "Contact our care hotline via WhatsApp or phone. Share your location and care needs—we immediately match nearby available nurses and reply ASAP.",
    "ta": "Contact our care hotline via WhatsApp or phone. Share your location and care needs—we immediately match nearby available nurses and reply ASAP."
  },
  "Call us · 012-206 4868": {
    "zh": "Call us · 012-206 4868",
    "bm": "Call us · 012-206 4868",
    "ta": "Call us · 012-206 4868"
  },
  "☎ 04-657 1888": {
    "zh": "☎ 04-657 1888",
    "bm": "☎ 04-657 1888",
    "ta": "☎ 04-657 1888"
  },
  "Doctor-prescribed subcutaneous insulin administration, IM injections, IV drip setups, clinical blood sample collection, and vital signs monitoring.": {
    "zh": "Doctor-prescribed subcutaneous insulin administration, IM injections, IV drip setups, clinical blood sample collection, and vital signs monitoring.",
    "bm": "Doctor-prescribed subcutaneous insulin administration, IM injections, IV drip setups, clinical blood sample collection, and vital signs monitoring.",
    "ta": "Doctor-prescribed subcutaneous insulin administration, IM injections, IV drip setups, clinical blood sample collection, and vital signs monitoring."
  },
  "Foldable Wheelchair & Commode Chair": {
    "zh": "Foldable Wheelchair & Commode Chair",
    "bm": "Foldable Wheelchair & Commode Chair",
    "ta": "Foldable Wheelchair & Commode Chair"
  },
  "Summary": {
    "zh": "Summary",
    "bm": "Summary",
    "ta": "Summary"
  },
  "Transparent Rates": {
    "zh": "Transparent Rates",
    "bm": "Transparent Rates",
    "ta": "Transparent Rates"
  },
  "Mount Miriam Cancer Hospital": {
    "zh": "Mount Miriam Cancer Hospital",
    "bm": "Mount Miriam Cancer Hospital",
    "ta": "Mount Miriam Cancer Hospital"
  },
  "Compassionate elderly & bedridden care, symptom control, and 12-hour / 24-hour round-the-clock dedicated nurse & caregiver shifts.": {
    "zh": "Compassionate elderly & bedridden care, symptom control, and 12-hour / 24-hour round-the-clock dedicated nurse & caregiver shifts.",
    "bm": "Compassionate elderly & bedridden care, symptom control, and 12-hour / 24-hour round-the-clock dedicated nurse & caregiver shifts.",
    "ta": "Compassionate elderly & bedridden care, symptom control, and 12-hour / 24-hour round-the-clock dedicated nurse & caregiver shifts."
  },
  "Staff:": {
    "zh": "Staff:",
    "bm": "Staff:",
    "ta": "Staff:"
  },
  "Other / Custom Nursing Service (Key in below)": {
    "zh": "Other / Custom Nursing Service (Key in below)",
    "bm": "Other / Custom Nursing Service (Key in below)",
    "ta": "Other / Custom Nursing Service (Key in below)"
  },
  "☎ 04-238 8888": {
    "zh": "☎ 04-238 8888",
    "bm": "☎ 04-238 8888",
    "ta": "☎ 04-238 8888"
  },
  "Week 1": {
    "zh": "Week 1",
    "bm": "Week 1",
    "ta": "Week 1"
  },
  "Verify tube marking at nose and check gastric residual volume with a 50ml syringe.": {
    "zh": "Verify tube marking at nose and check gastric residual volume with a 50ml syringe.",
    "bm": "Verify tube marking at nose and check gastric residual volume with a 50ml syringe.",
    "ta": "Verify tube marking at nose and check gastric residual volume with a 50ml syringe."
  },
  "at all times to prevent backflow.": {
    "zh": "at all times to prevent backflow.",
    "bm": "at all times to prevent backflow.",
    "ta": "at all times to prevent backflow."
  },
  "RM 40 – RM 70 / mo": {
    "zh": "RM 40 – RM 70 / mo",
    "bm": "RM 40 – RM 70 / mo",
    "ta": "RM 40 – RM 70 / mo"
  },
  "🛏️ Mobility & Beds": {
    "zh": "🛏️ Mobility & Beds",
    "bm": "🛏️ Mobility & Beds",
    "ta": "🛏️ Mobility & Beds"
  },
  "Patients & Families": {
    "zh": "Patients & Families",
    "bm": "Patients & Families",
    "ta": "Patients & Families"
  },
  "Balik Pulau & South Island": {
    "zh": "Balik Pulau & South Island",
    "bm": "Balik Pulau & South Island",
    "ta": "Balik Pulau & South Island"
  },
  "Upload Document": {
    "zh": "Upload Document",
    "bm": "Upload Document",
    "ta": "Upload Document"
  },
  "Assura Nursing · Unified Patient & Staff Clinical Portal": {
    "zh": "Assura Nursing · Unified Patient & Staff Clinical Portal",
    "bm": "Assura Nursing · Unified Patient & Staff Clinical Portal",
    "ta": "Assura Nursing · Unified Patient & Staff Clinical Portal"
  },
  "24/7 rapid response for emergencies, covering 15 Penang hospitals across Penang Island & Mainland (Bukit Mertajam base).": {
    "zh": "24/7 rapid response for emergencies, covering 15 Penang hospitals across Penang Island & Mainland (Bukit Mertajam base).",
    "bm": "24/7 rapid response for emergencies, covering 15 Penang hospitals across Penang Island & Mainland (Bukit Mertajam base).",
    "ta": "24/7 rapid response for emergencies, covering 15 Penang hospitals across Penang Island & Mainland (Bukit Mertajam base)."
  },
  "Tell us anything helpful about the patient": {
    "zh": "Tell us anything helpful about the patient",
    "bm": "Tell us anything helpful about the patient",
    "ta": "Tell us anything helpful about the patient"
  },
  "Gov Hospital": {
    "zh": "Gov Hospital",
    "bm": "Gov Hospital",
    "ta": "Gov Hospital"
  },
  "SPECIFY YOUR REQUIRED SERVICE · Please key in your specific nursing requirements": {
    "zh": "SPECIFY YOUR REQUIRED SERVICE · Please key in your specific nursing requirements",
    "bm": "SPECIFY YOUR REQUIRED SERVICE · Please key in your specific nursing requirements",
    "ta": "SPECIFY YOUR REQUIRED SERVICE · Please key in your specific nursing requirements"
  },
  "Rapidly aspirates thick oral, nasal, or tracheostomy secretions to maintain a clear airway.": {
    "zh": "Rapidly aspirates thick oral, nasal, or tracheostomy secretions to maintain a clear airway.",
    "bm": "Rapidly aspirates thick oral, nasal, or tracheostomy secretions to maintain a clear airway.",
    "ta": "Rapidly aspirates thick oral, nasal, or tracheostomy secretions to maintain a clear airway."
  },
  "Interactive Walkthrough": {
    "zh": "Interactive Walkthrough",
    "bm": "Interactive Walkthrough",
    "ta": "Interactive Walkthrough"
  },
  "💊 Medication Administration Record": {
    "zh": "💊 Medication Administration Record",
    "bm": "💊 Medication Administration Record",
    "ta": "💊 Medication Administration Record"
  },
  "Keep dressing clean, dry, and intact (CDI). Change immediately if soiled or leaking.": {
    "zh": "Keep dressing clean, dry, and intact (CDI). Change immediately if soiled or leaking.",
    "bm": "Keep dressing clean, dry, and intact (CDI). Change immediately if soiled or leaking.",
    "ta": "Keep dressing clean, dry, and intact (CDI). Change immediately if soiled or leaking."
  },
  "24/7 Emergency Care:": {
    "zh": "24/7 Emergency Care:",
    "bm": "24/7 Emergency Care:",
    "ta": "24/7 Emergency Care:"
  },
  "Perform gentle passive Range of Motion (ROM) on hemiplegic limbs twice daily.": {
    "zh": "Perform gentle passive Range of Motion (ROM) on hemiplegic limbs twice daily.",
    "bm": "Perform gentle passive Range of Motion (ROM) on hemiplegic limbs twice daily.",
    "ta": "Perform gentle passive Range of Motion (ROM) on hemiplegic limbs twice daily."
  },
  "☎ 04-643 3888": {
    "zh": "☎ 04-643 3888",
    "bm": "☎ 04-643 3888",
    "ta": "☎ 04-643 3888"
  },
  "☎ 04-548 6688": {
    "zh": "☎ 04-548 6688",
    "bm": "☎ 04-548 6688",
    "ta": "☎ 04-548 6688"
  },
  "Start 110 BPM CPR Rhythm Metronome": {
    "zh": "Start 110 BPM CPR Rhythm Metronome",
    "bm": "Start 110 BPM CPR Rhythm Metronome",
    "ta": "Start 110 BPM CPR Rhythm Metronome"
  },
  "Please choose a service and complete the required details.": {
    "zh": "Please choose a service and complete the required details.",
    "bm": "Please choose a service and complete the required details.",
    "ta": "Please choose a service and complete the required details."
  },
  "Launch Web App": {
    "zh": "Launch Web App",
    "bm": "Launch Web App",
    "ta": "Launch Web App"
  },
  "Next Step →": {
    "zh": "Next Step →",
    "bm": "Next Step →",
    "ta": "Next Step →"
  },
  "If an adult collapses, becomes unresponsive, and is not breathing normally, every second counts. Initiate continuous chest compressions immediately while waiting for the ambulance.": {
    "zh": "If an adult collapses, becomes unresponsive, and is not breathing normally, every second counts. Initiate continuous chest compressions immediately while waiting for the ambulance.",
    "bm": "If an adult collapses, becomes unresponsive, and is not breathing normally, every second counts. Initiate continuous chest compressions immediately while waiting for the ambulance.",
    "ta": "If an adult collapses, becomes unresponsive, and is not breathing normally, every second counts. Initiate continuous chest compressions immediately while waiting for the ambulance."
  },
  "Assura Hub · Announcements & Careers": {
    "zh": "Assura Hub · Announcements & Careers",
    "bm": "Assura Hub · Announcements & Careers",
    "ta": "Assura Hub · Announcements & Careers"
  },
  "Adaptive Home Environment Planning:": {
    "zh": "Adaptive Home Environment Planning:",
    "bm": "Adaptive Home Environment Planning:",
    "ta": "Adaptive Home Environment Planning:"
  },
  "Instant open access to procedures, transparent pricing calculators, emergency hospital GPS, and 1-tap WhatsApp nurse consultation.": {
    "zh": "Instant open access to procedures, transparent pricing calculators, emergency hospital GPS, and 1-tap WhatsApp nurse consultation.",
    "bm": "Instant open access to procedures, transparent pricing calculators, emergency hospital GPS, and 1-tap WhatsApp nurse consultation.",
    "ta": "Instant open access to procedures, transparent pricing calculators, emergency hospital GPS, and 1-tap WhatsApp nurse consultation."
  },
  "Hands-Only CPR Protocol": {
    "zh": "Hands-Only CPR Protocol",
    "bm": "Hands-Only CPR Protocol",
    "ta": "Hands-Only CPR Protocol"
  },
  "Wash hands thoroughly with antibacterial soap and prepare a clean sterile field.": {
    "zh": "Wash hands thoroughly with antibacterial soap and prepare a clean sterile field.",
    "bm": "Wash hands thoroughly with antibacterial soap and prepare a clean sterile field.",
    "ta": "Wash hands thoroughly with antibacterial soap and prepare a clean sterile field."
  },
  "Hospital Balik Pulau (HBP)": {
    "zh": "Hospital Balik Pulau (HBP)",
    "bm": "Hospital Balik Pulau (HBP)",
    "ta": "Hospital Balik Pulau (HBP)"
  },
  "24， WhatsApp 。": {
    "zh": "24， WhatsApp 。",
    "bm": "24， WhatsApp 。",
    "ta": "24， WhatsApp 。"
  },
  "Official Applications": {
    "zh": "Official Applications",
    "bm": "Official Applications",
    "ta": "Official Applications"
  },
  "Login Identifier": {
    "zh": "Login Identifier",
    "bm": "Login Identifier",
    "ta": "Login Identifier"
  },
  "Caregiver Tip:": {
    "zh": "Caregiver Tip:",
    "bm": "Caregiver Tip:",
    "ta": "Caregiver Tip:"
  },
  "Serving Bukit Mertajam & nearby areas": {
    "zh": "Serving Bukit Mertajam & nearby areas",
    "bm": "Serving Bukit Mertajam & nearby areas",
    "ta": "Serving Bukit Mertajam & nearby areas"
  },
  "Emergency & Hospital GPS": {
    "zh": "Emergency & Hospital GPS",
    "bm": "Emergency & Hospital GPS",
    "ta": "Emergency & Hospital GPS"
  },
  "Real-time digital charting of blood pressure, SpO2, blood glucose, temperature, and wound photos, providing transparent daily records for families and doctors.": {
    "zh": "Real-time digital charting of blood pressure, SpO2, blood glucose, temperature, and wound photos, providing transparent daily records for families and doctors.",
    "bm": "Real-time digital charting of blood pressure, SpO2, blood glucose, temperature, and wound photos, providing transparent daily records for families and doctors.",
    "ta": "Real-time digital charting of blood pressure, SpO2, blood glucose, temperature, and wound photos, providing transparent daily records for families and doctors."
  },
  "After this page is published, install it from your browser for faster bookings.": {
    "zh": "After this page is published, install it from your browser for faster bookings.",
    "bm": "After this page is published, install it from your browser for faster bookings.",
    "ta": "After this page is published, install it from your browser for faster bookings."
  },
  "Standalone portable application — no complex installation needed.": {
    "zh": "Standalone portable application — no complex installation needed.",
    "bm": "Standalone portable application — no complex installation needed.",
    "ta": "Standalone portable application — no complex installation needed."
  },
  "⏰ QID (Four Times Daily):": {
    "zh": "⏰ QID (Four Times Daily):",
    "bm": "⏰ QID (Four Times Daily):",
    "ta": "⏰ QID (Four Times Daily):"
  },
  "Tanjung Bungah / Batu Ferringhi": {
    "zh": "Tanjung Bungah / Batu Ferringhi",
    "bm": "Tanjung Bungah / Batu Ferringhi",
    "ta": "Tanjung Bungah / Batu Ferringhi"
  },
  "Our Vision": {
    "zh": "Our Vision",
    "bm": "Our Vision",
    "ta": "Our Vision"
  },
  "Assura Nursing · Bukit Mertajam Base & Penang Island · 012-206 4868": {
    "zh": "Assura Nursing · Bukit Mertajam Base & Penang Island · 012-206 4868",
    "bm": "Assura Nursing · Bukit Mertajam Base & Penang Island · 012-206 4868",
    "ta": "Assura Nursing · Bukit Mertajam Base & Penang Island · 012-206 4868"
  },
  "Assura Nursing Care": {
    "zh": "Assura Nursing Care",
    "bm": "Assura Nursing Care",
    "ta": "Assura Nursing Care"
  },
  "Post-operative surgical wound care": {
    "zh": "术后出院伤口拆线与护理",
    "bm": "Penjagaan luka pembedahan selepas keluar hospital",
    "ta": "அறுவை சிகிச்சைக்குப் பின் காயம் பராமரிப்பு"
  },
  "Watch how our trained nurses help families transition safely from hospital discharge to comfortable bedside healing at home across Penang.": {
    "zh": "Watch how our trained nurses help families transition safely from hospital discharge to comfortable bedside healing at home across Penang.",
    "bm": "Watch how our trained nurses help families transition safely from hospital discharge to comfortable bedside healing at home across Penang.",
    "ta": "Watch how our trained nurses help families transition safely from hospital discharge to comfortable bedside healing at home across Penang."
  },
  "© 2026 Assura Nursing Care. All Rights Reserved.": {
    "zh": "© 2026 Assura Nursing Care. All Rights Reserved.",
    "bm": "© 2026 Assura Nursing Care. All Rights Reserved.",
    "ta": "© 2026 Assura Nursing Care. All Rights Reserved."
  },
  "Penang Island & Mainland (Bukit Mertajam base) rapid nurse dispatch.": {
    "zh": "槟岛与威省（大山脚基地）执照护士极速调度上门。",
    "bm": "Penghantaran jururawat pantas di Pulau Pinang & Tanah Besar (pangkalan Bukit Mertajam).",
    "ta": "பினாங்கு தீவு மற்றும் நிலப்பரப்பு (புக்கிட் மெர்தாஜாம் தளம்) விரைவான செவிலியர் வருகை."
  },
  "📌 Official User Guide Memo :": {
    "zh": "📌 Official User Guide Memo :",
    "bm": "📌 Official User Guide Memo :",
    "ta": "📌 Official User Guide Memo :"
  },
  "☎ 04-827 5684": {
    "zh": "☎ 04-827 5684",
    "bm": "☎ 04-827 5684",
    "ta": "☎ 04-827 5684"
  },
  "EN": {
    "zh": "EN",
    "bm": "EN",
    "ta": "EN"
  },
  "Treating every patient with warmth, patience, and empathy—just as we would care for our own beloved family members.": {
    "zh": "Treating every patient with warmth, patience, and empathy—just as we would care for our own beloved family members.",
    "bm": "Treating every patient with warmth, patience, and empathy—just as we would care for our own beloved family members.",
    "ta": "Treating every patient with warmth, patience, and empathy—just as we would care for our own beloved family members."
  },
  "💬 Chat with Our Care Team (012-206 4868)": {
    "zh": "💬 Chat with Our Care Team (012-206 4868)",
    "bm": "💬 Chat with Our Care Team (012-206 4868)",
    "ta": "💬 Chat with Our Care Team (012-206 4868)"
  },
  "Cleanse wound gently with sterile Normal Saline from the cleanest area outward.": {
    "zh": "Cleanse wound gently with sterile Normal Saline from the cleanest area outward.",
    "bm": "Cleanse wound gently with sterile Normal Saline from the cleanest area outward.",
    "ta": "Cleanse wound gently with sterile Normal Saline from the cleanest area outward."
  },
  "Active local nurse coordination across Penang Island & Mainland with fast WhatsApp booking confirmation and on-call support.": {
    "zh": "Active local nurse coordination across Penang Island & Mainland with fast WhatsApp booking confirmation and on-call support.",
    "bm": "Active local nurse coordination across Penang Island & Mainland with fast WhatsApp booking confirmation and on-call support.",
    "ta": "Active local nurse coordination across Penang Island & Mainland with fast WhatsApp booking confirmation and on-call support."
  },
  "Choose services": {
    "zh": "Choose services",
    "bm": "Choose services",
    "ta": "Choose services"
  },
  "Structured clinical handover for doctors": {
    "zh": "结构化主治医生临床交接简报",
    "bm": "Serahan tugas klinikal berstruktur untuk doktor",
    "ta": "மருத்துவர்களுக்கான கட்டமைப்பு மருத்துவ ஒப்படைப்பு"
  },
  "Where should we come?": {
    "zh": "Where should we come?",
    "bm": "Where should we come?",
    "ta": "Where should we come?"
  },
  "🩺 Staff Sign-In": {
    "zh": "🩺 Staff Sign-In",
    "bm": "🩺 Staff Sign-In",
    "ta": "🩺 Staff Sign-In"
  },
  "🚨 National Emergency & 24/7 Assura Clinical Careline": {
    "zh": "🚨 National Emergency & 24/7 Assura Clinical Careline",
    "bm": "🚨 National Emergency & 24/7 Assura Clinical Careline",
    "ta": "🚨 National Emergency & 24/7 Assura Clinical Careline"
  },
  "➕ New Register": {
    "zh": "➕ New Register",
    "bm": "➕ New Register",
    "ta": "➕ New Register"
  },
  "Penang Island & Mainland Fast Delivery": {
    "zh": "Penang Island & Mainland Fast Delivery",
    "bm": "Penang Island & Mainland Fast Delivery",
    "ta": "Penang Island & Mainland Fast Delivery"
  },
  "ASN-8821": {
    "zh": "ASN-8821",
    "bm": "ASN-8821",
    "ta": "ASN-8821"
  },
  "Your name": {
    "zh": "Your name",
    "bm": "Your name",
    "ta": "Your name"
  },
  "Public:": {
    "zh": "Public:",
    "bm": "Public:",
    "ta": "Public:"
  },
  "🩹 Wound Care & Dressing": {
    "zh": "🩹 无菌换药与伤口护理",
    "bm": "🩹 Penjagaan Luka & Pembalutan",
    "ta": "🩹 காயம் பராமரிப்பு & கட்டுப்போடுதல்"
  },
  "Real-time digital MEWS score alerts": {
    "zh": "实时云端 MEWS 体征预警评分",
    "bm": "Amaran skor MEWS digital masa nyata",
    "ta": "நிகழ்நேர டிஜிட்டல் MEWS எச்சரிக்கைகள்"
  },
  "Our Standards": {
    "zh": "服务宗旨与专业承诺",
    "bm": "Piawaian Kami",
    "ta": "எங்கள் தரநிலைகள்"
  },
  "Stroke Rehabilitation & Offloading": {
    "zh": "Stroke Rehabilitation & Offloading",
    "bm": "Stroke Rehabilitation & Offloading",
    "ta": "Stroke Rehabilitation & Offloading"
  },
  "Civil Defence Force (APM Penang)": {
    "zh": "Civil Defence Force (APM Penang)",
    "bm": "Civil Defence Force (APM Penang)",
    "ta": "Civil Defence Force (APM Penang)"
  },
  "Click to view rates for Wound Care": {
    "zh": "Click to view rates for Wound Care",
    "bm": "Click to view rates for Wound Care",
    "ta": "Click to view rates for Wound Care"
  },
  ": Open the app to browse transparent home nursing rates, medical equipment guides, and hospital emergency GPS routes without requiring a login.": {
    "zh": ": Open the app to browse transparent home nursing rates, medical equipment guides, and hospital emergency GPS routes without requiring a login.",
    "bm": ": Open the app to browse transparent home nursing rates, medical equipment guides, and hospital emergency GPS routes without requiring a login.",
    "ta": ": Open the app to browse transparent home nursing rates, medical equipment guides, and hospital emergency GPS routes without requiring a login."
  },
  "◀ Prev": {
    "zh": "◀ Prev",
    "bm": "◀ Prev",
    "ta": "◀ Prev"
  },
  "Nursing Care": {
    "zh": "Nursing Care",
    "bm": "Nursing Care",
    "ta": "Nursing Care"
  },
  "👴 Elderly & Bedridden Care": {
    "zh": "👴 长辈与失能卧床护理",
    "bm": "👴 Penjagaan Warga Emas & Terlantar",
    "ta": "👴 முதியோர் & படுக்கை நோயாளிகள் பராமரிப்பு"
  },
  "Post-surgical incision care, diabetic foot ulcer debridement, and pressure sore staging (Stage 1 to 4) using sterile dressing protocols (ANTT) to minimize infection risks.": {
    "zh": "Post-surgical incision care, diabetic foot ulcer debridement, and pressure sore staging (Stage 1 to 4) using sterile dressing protocols (ANTT) to minimize infection risks.",
    "bm": "Post-surgical incision care, diabetic foot ulcer debridement, and pressure sore staging (Stage 1 to 4) using sterile dressing protocols (ANTT) to minimize infection risks.",
    "ta": "Post-surgical incision care, diabetic foot ulcer debridement, and pressure sore staging (Stage 1 to 4) using sterile dressing protocols (ANTT) to minimize infection risks."
  },
  "Georgetown Specialist Hospital": {
    "zh": "Georgetown Specialist Hospital",
    "bm": "Georgetown Specialist Hospital",
    "ta": "Georgetown Specialist Hospital"
  },
  "Firmly tap the person's shoulders and shout loudly: \"Are you okay?\". If no response and no normal breathing, proceed immediately.": {
    "zh": "Firmly tap the person's shoulders and shout loudly: \"Are you okay?\". If no response and no normal breathing, proceed immediately.",
    "bm": "Firmly tap the person's shoulders and shout loudly: \"Are you okay?\". If no response and no normal breathing, proceed immediately.",
    "ta": "Firmly tap the person's shoulders and shout loudly: \"Are you okay?\". If no response and no normal breathing, proceed immediately."
  },
  "Pantai Hospital Penang": {
    "zh": "Pantai Hospital Penang",
    "bm": "Pantai Hospital Penang",
    "ta": "Pantai Hospital Penang"
  },
  "ADL Assistance": {
    "zh": "ADL Assistance",
    "bm": "ADL Assistance",
    "ta": "ADL Assistance"
  },
  "We founded": {
    "zh": "We founded",
    "bm": "We founded",
    "ta": "We founded"
  },
  "Browse Equipment →": {
    "zh": "浏览器材名录 →",
    "bm": "Lihat Peralatan →",
    "ta": "உபகரணங்களை உலாவுக →"
  },
  "🏡 100% Home Adapted": {
    "zh": "🏡 100% Home Adapted",
    "bm": "🏡 100% Home Adapted",
    "ta": "🏡 100% Home Adapted"
  },
  "Simpang Ampat / Juru / Batu Kawan": {
    "zh": "Simpang Ampat / Juru / Batu Kawan",
    "bm": "Simpang Ampat / Juru / Batu Kawan",
    "ta": "Simpang Ampat / Juru / Batu Kawan"
  },
  "End-of-Life Care": {
    "zh": "End-of-Life Care",
    "bm": "End-of-Life Care",
    "ta": "End-of-Life Care"
  },
  ": Public, patients, families, and registered nurses use the same": {
    "zh": ": Public, patients, families, and registered nurses use the same",
    "bm": ": Public, patients, families, and registered nurses use the same",
    "ta": ": Public, patients, families, and registered nurses use the same"
  },
  "Preferred visiting time": {
    "zh": "Preferred visiting time",
    "bm": "Preferred visiting time",
    "ta": "Preferred visiting time"
  },
  "🔒 Sign In as Patient / Family": {
    "zh": "🔒 Sign In as Patient / Family",
    "bm": "🔒 Sign In as Patient / Family",
    "ta": "🔒 Sign In as Patient / Family"
  },
  "Our Standard of Care": {
    "zh": "专业护理标准与服务价值",
    "bm": "Piawaian Penjagaan Kami",
    "ta": "எங்கள் பராமரிப்பு தரம்"
  },
  "Step 1: Public Open Access": {
    "zh": "Step 1: Public Open Access",
    "bm": "Step 1: Public Open Access",
    "ta": "Step 1: Public Open Access"
  },
  "Click to view rates for Elderly & Bedridden Care": {
    "zh": "Click to view rates for Elderly & Bedridden Care",
    "bm": "Click to view rates for Elderly & Bedridden Care",
    "ta": "Click to view rates for Elderly & Bedridden Care"
  },
  "Clinical Services & Instant Pricing · Assura Nursing": {
    "zh": "Clinical Services & Instant Pricing · Assura Nursing",
    "bm": "Clinical Services & Instant Pricing · Assura Nursing",
    "ta": "Clinical Services & Instant Pricing · Assura Nursing"
  },
  "Sunway Medical Centre Penang": {
    "zh": "Sunway Medical Centre Penang",
    "bm": "Sunway Medical Centre Penang",
    "ta": "Sunway Medical Centre Penang"
  },
  "📁 Medical Document Vault": {
    "zh": "📁 Medical Document Vault",
    "bm": "📁 Medical Document Vault",
    "ta": "📁 Medical Document Vault"
  },
  "Compassionate, Safe & Professional Home Nursing in Penang": {
    "zh": "Compassionate, Safe & Professional Home Nursing in Penang",
    "bm": "Compassionate, Safe & Professional Home Nursing in Penang",
    "ta": "Compassionate, Safe & Professional Home Nursing in Penang"
  },
  "Oxygen-Equipped Bedside Medical Transfer": {
    "zh": "Oxygen-Equipped Bedside Medical Transfer",
    "bm": "Oxygen-Equipped Bedside Medical Transfer",
    "ta": "Oxygen-Equipped Bedside Medical Transfer"
  },
  "The Real Challenge We Solve": {
    "zh": "我们解决的实际痛点",
    "bm": "Cabaran Sebenar yang Kami Selesaikan",
    "ta": "நாங்கள் தீர்க்கும் உண்மையான சவால்"
  },
  "Assura Nursing": {
    "zh": "Assura Nursing",
    "bm": "Assura Nursing",
    "ta": "Assura Nursing"
  },
  "Prevent fatal pulmonary aspiration pneumonia during enteral tube nutrition administration.": {
    "zh": "Prevent fatal pulmonary aspiration pneumonia during enteral tube nutrition administration.",
    "bm": "Prevent fatal pulmonary aspiration pneumonia during enteral tube nutrition administration.",
    "ta": "Prevent fatal pulmonary aspiration pneumonia during enteral tube nutrition administration."
  },
  "24/7 Clinical Emergency Hotline": {
    "zh": "24小时紧急护理专线",
    "bm": "Talian Kecemasan Klinikal 24/7",
    "ta": "24/7 மருத்துவ அவசர உதவி எண்"
  },
  "Opens WhatsApp with your booking details filled in — just press send.": {
    "zh": "Opens WhatsApp with your booking details filled in — just press send.",
    "bm": "Opens WhatsApp with your booking details filled in — just press send.",
    "ta": "Opens WhatsApp with your booking details filled in — just press send."
  },
  "● Click steps to preview": {
    "zh": "● Click steps to preview",
    "bm": "● Click steps to preview",
    "ta": "● Click steps to preview"
  },
  "📊 MEWS Vitals Sign Scoring Chart": {
    "zh": "📊 MEWS Vitals Sign Scoring Chart",
    "bm": "📊 MEWS Vitals Sign Scoring Chart",
    "ta": "📊 MEWS Vitals Sign Scoring Chart"
  },
  "📈 MEWS Vitals": {
    "zh": "📈 MEWS Vitals",
    "bm": "📈 MEWS Vitals",
    "ta": "📈 MEWS Vitals"
  },
  "Patient condition / notes": {
    "zh": "Patient condition / notes",
    "bm": "Patient condition / notes",
    "ta": "Patient condition / notes"
  },
  "24/7 Humanitarian Ambulance Services": {
    "zh": "24/7 Humanitarian Ambulance Services",
    "bm": "24/7 Humanitarian Ambulance Services",
    "ta": "24/7 Humanitarian Ambulance Services"
  },
  "e.g. 0124567890 or ASN-8821": {
    "zh": "e.g. 0124567890 or ASN-8821",
    "bm": "e.g. 0124567890 or ASN-8821",
    "ta": "e.g. 0124567890 or ASN-8821"
  },
  "View Specifications & Advice →": {
    "zh": "View Specifications & Advice →",
    "bm": "View Specifications & Advice →",
    "ta": "View Specifications & Advice →"
  },
  "If prompted with": {
    "zh": "If prompted with",
    "bm": "If prompted with",
    "ta": "If prompted with"
  },
  "☎ 999": {
    "zh": "☎ 999",
    "bm": "☎ 999",
    "ta": "☎ 999"
  },
  "No password or registration required for browsing nursing procedures, transparent price lists, emergency hospital GPS, and 1-tap WhatsApp consultation.": {
    "zh": "No password or registration required for browsing nursing procedures, transparent price lists, emergency hospital GPS, and 1-tap WhatsApp consultation.",
    "bm": "No password or registration required for browsing nursing procedures, transparent price lists, emergency hospital GPS, and 1-tap WhatsApp consultation.",
    "ta": "No password or registration required for browsing nursing procedures, transparent price lists, emergency hospital GPS, and 1-tap WhatsApp consultation."
  },
  "💊 Medication Sheet": {
    "zh": "💊 Medication Sheet",
    "bm": "💊 Medication Sheet",
    "ta": "💊 Medication Sheet"
  },
  "\"Every family's home in Penang is unique. When patients return home after surgery or illness, they need professional, trained nurses who know how to plan safe bedside workflows, maintain strict aseptic hygiene, and guide families with reassurance and warmth.\"": {
    "zh": "“槟城每个家庭的居住环境都各不相同。当病患在术后或康复期回到家中时，他们需要受过专业培训的持照医护人员因地制宜规划安全的床边动线，恪守严格的无菌操作规范，并以温情与耐心指导家属照护。”",
    "bm": "\"Setiap rumah keluarga di Pulau Pinang adalah unik. Apabila pesakit pulang ke rumah selepas pembedahan atau penyakit, mereka memerlukan jururawat profesional dan terlatih yang tahu merancang aliran kerja di sisi katil dengan selamat, mengekalkan kebersihan aseptik yang ketat, dan membimbing keluarga dengan penuh keyakinan dan kehangatan.\"",
    "ta": "\"பினாங்கிலுள்ள ஒவ்வொரு குடும்பத்தின் வீடும் தனித்துவமானது. அறுவை சிகிச்சை அல்லது நோய்க்குப் பின் நோயாளிகள் வீட்டிற்குத் திரும்பும்போது, படுக்கை ஓர பணிப்பாய்வுகளைத் திட்டமிடவும், கடுமையான மலட்டு சுகாதாரத்தைப் பராமரிக்கவும், குடும்பங்களுக்கு அரவணைப்புடன் வழிகாட்டவும் பயிற்சி பெற்ற தொழில்முறை செவிலியர்கள் தேவை.\""
  },
  "🩺 Monitoring": {
    "zh": "🩺 Monitoring",
    "bm": "🩺 Monitoring",
    "ta": "🩺 Monitoring"
  },
  "📚 Patient & Family Clinical Home Care Guides": {
    "zh": "📚 Patient & Family Clinical Home Care Guides",
    "bm": "📚 Patient & Family Clinical Home Care Guides",
    "ta": "📚 Patient & Family Clinical Home Care Guides"
  },
  "Ocean Medic Ambulance (Penang)": {
    "zh": "Ocean Medic Ambulance (Penang)",
    "bm": "Ocean Medic Ambulance (Penang)",
    "ta": "Ocean Medic Ambulance (Penang)"
  },
  "Direct APK Mirror": {
    "zh": "Direct APK Mirror",
    "bm": "Direct APK Mirror",
    "ta": "Direct APK Mirror"
  },
  "Set Security PIN / Password": {
    "zh": "Set Security PIN / Password",
    "bm": "Set Security PIN / Password",
    "ta": "Set Security PIN / Password"
  },
  "Ripple Anti-Decubitus Mattress": {
    "zh": "Ripple Anti-Decubitus Mattress",
    "bm": "Ripple Anti-Decubitus Mattress",
    "ta": "Ripple Anti-Decubitus Mattress"
  },
  "01X-XXXX XXX": {
    "zh": "01X-XXXX XXX",
    "bm": "01X-XXXX XXX",
    "ta": "01X-XXXX XXX"
  },
  "BM": {
    "zh": "BM",
    "bm": "BM",
    "ta": "BM"
  },
  "flexible environmental adaptation": {
    "zh": "flexible environmental adaptation",
    "bm": "flexible environmental adaptation",
    "ta": "flexible environmental adaptation"
  },
  "uncompromising adherence to the core fundamentals of nursing care": {
    "zh": "uncompromising adherence to the core fundamentals of nursing care",
    "bm": "uncompromising adherence to the core fundamentals of nursing care",
    "ta": "uncompromising adherence to the core fundamentals of nursing care"
  },
  "📥 Poster": {
    "zh": "📥 Poster",
    "bm": "📥 Poster",
    "ta": "📥 Poster"
  },
  "Media & Clinical Resources": {
    "zh": "Media & Clinical Resources",
    "bm": "Media & Clinical Resources",
    "ta": "Media & Clinical Resources"
  },
  "Never crush Enteric-Coated (EC), Sustained-Release (SR/XR/CR), or sublingual tablets without pharmacist clearance.": {
    "zh": "Never crush Enteric-Coated (EC), Sustained-Release (SR/XR/CR), or sublingual tablets without pharmacist clearance.",
    "bm": "Never crush Enteric-Coated (EC), Sustained-Release (SR/XR/CR), or sublingual tablets without pharmacist clearance.",
    "ta": "Never crush Enteric-Coated (EC), Sustained-Release (SR/XR/CR), or sublingual tablets without pharmacist clearance."
  },
  "Clinic & Hospital Escort": {
    "zh": "Clinic & Hospital Escort",
    "bm": "Clinic & Hospital Escort",
    "ta": "Clinic & Hospital Escort"
  },
  "Elderly Care & Stroke": {
    "zh": "Elderly Care & Stroke",
    "bm": "Elderly Care & Stroke",
    "ta": "Elderly Care & Stroke"
  },
  "Staff & Gender Preference": {
    "zh": "Staff & Gender Preference",
    "bm": "Staff & Gender Preference",
    "ta": "Staff & Gender Preference"
  },
  "24/7 Emergency (ETD):": {
    "zh": "24/7 Emergency (ETD):",
    "bm": "24/7 Emergency (ETD):",
    "ta": "24/7 Emergency (ETD):"
  },
  "Install app": {
    "zh": "Install app",
    "bm": "Install app",
    "ta": "Install app"
  },
  "Wound dressing, catheters, Ryle's tube, bed bathing & post-surgery recovery.": {
    "zh": "Wound dressing, catheters, Ryle's tube, bed bathing & post-surgery recovery.",
    "bm": "Wound dressing, catheters, Ryle's tube, bed bathing & post-surgery recovery.",
    "ta": "Wound dressing, catheters, Ryle's tube, bed bathing & post-surgery recovery."
  },
  "Penang Transparent Rates · RM 0 Surcharge": {
    "zh": "Penang Transparent Rates · RM 0 Surcharge",
    "bm": "Penang Transparent Rates · RM 0 Surcharge",
    "ta": "Penang Transparent Rates · RM 0 Surcharge"
  },
  "Click to view rates for Stroke & Health Tracking": {
    "zh": "Click to view rates for Stroke & Health Tracking",
    "bm": "Click to view rates for Stroke & Health Tracking",
    "ta": "Click to view rates for Stroke & Health Tracking"
  },
  "Equipment Title": {
    "zh": "Equipment Title",
    "bm": "Equipment Title",
    "ta": "Equipment Title"
  },
  "Check this before you send. Nothing is sent until you tap the button.": {
    "zh": "Check this before you send. Nothing is sent until you tap the button.",
    "bm": "Check this before you send. Nothing is sent until you tap the button.",
    "ta": "Check this before you send. Nothing is sent until you tap the button."
  },
  "Milestones": {
    "zh": "发展历程与里程碑",
    "bm": "Pencapaian Penting",
    "ta": "மைல்கற்கள்"
  },
  "Assura Founded in Penang": {
    "zh": "创立于槟城",
    "bm": "Assura Ditubuhkan di Pulau Pinang",
    "ta": "பினாங்கில் அசுரா தொடங்கப்பட்டது"
  },
  "15 Hospital Network across Penang": {
    "zh": "覆盖槟威 15 大医院网络",
    "bm": "Rangkaian 15 Hospital di Seluruh Pulau Pinang",
    "ta": "பினாங்கு முழுவதும் 15 மருத்துவமனை நெட்வொர்க்"
  },
  "MEWS Cloud System Launched": {
    "zh": "首创云端 MEWS 体征系统上线",
    "bm": "Sistem Awan MEWS Dilancarkan",
    "ta": "MEWS கிளவுட் அமைப்பு தொடங்கப்பட்டது"
  },
  "Over 3,500 Completed Care Visits": {
    "zh": "已完成超过 3,500 次上门护理探访",
    "bm": "Lebih 3,500 Lawatan Penjagaan Selesai",
    "ta": "3,500 க்கும் மேற்பட்ட பராமரிப்பு வருகைகள் நிறைவடைந்தன"
  },
  "Clinical Safety First": {
    "zh": "临床安全第一",
    "bm": "Keselamatan Klinikal Diutamakan",
    "ta": "மருத்துவ பாதுகாப்பு முதன்மையானது"
  },
  "Empathy & Dignity": {
    "zh": "仁心关怀与尊严",
    "bm": "Empati & Maruah",
    "ta": "இரக்கம் & கண்ணியம்"
  },
  "Speed & Reliability": {
    "zh": "极速响应与可靠",
    "bm": "Kepantasan & Kebolehpercayaan",
    "ta": "வேகம் & நம்பகத்தன்மை"
  },
  "Transparent Pricing": {
    "zh": "透明收费无隐藏",
    "bm": "Harga Telus",
    "ta": "வெளிப்படையான விலை"
  },
  "Founder's Video & Promise": {
    "zh": "创办人视频与承诺",
    "bm": "Video & Janji Pengasas",
    "ta": "நிறுவனரின் வீடியோ & வாக்குறுதி"
  },
  "Watch Full Video Campaign": {
    "zh": "观看完整宣传视频",
    "bm": "Tonton Video Kempen Penuh",
    "ta": "முழு வீடியோ பிரச்சாரத்தைப் பாருங்கள்"
  },
  "Matron & Head of Clinical Operations": {
    "zh": "护士长兼临床运营主管",
    "bm": "Matron & Ketua Operasi Klinikal",
    "ta": "மேட்ரான் & மருத்துவ செயல்பாடுகளின் தலைவர்"
  },
  "ICU Specialist Nurse Lead": {
    "zh": "重症监护 (ICU) 专科护士主管",
    "bm": "Ketua Jururawat Pakar ICU",
    "ta": "ICU சிறப்பு செவிலியர் தலைவர்"
  },
  "Geriatric Care Specialist": {
    "zh": "老年医学专科护理师",
    "bm": "Pakar Penjagaan Geriatrik",
    "ta": "முதியோர் பராமரிப்பு நிபுணர்"
  },
  "Your unified Penang clinical & emergency hub: 24/7 hospital emergency GPS directory, private ambulance contacts, CPR metronome, medical equipment rental catalog, and patient & family home nursing guides.": {
    "zh": "Your unified Penang clinical & emergency hub: 24/7 hospital emergency GPS directory, private ambulance contacts, CPR metronome, medical equipment rental catalog, and patient & family home nursing guides.",
    "bm": "Your unified Penang clinical & emergency hub: 24/7 hospital emergency GPS directory, private ambulance contacts, CPR metronome, medical equipment rental catalog, and patient & family home nursing guides.",
    "ta": "Your unified Penang clinical & emergency hub: 24/7 hospital emergency GPS directory, private ambulance contacts, CPR metronome, medical equipment rental catalog, and patient & family home nursing guides."
  },
  "Clinical Resources, Emergency & Equipment Hub": {
    "zh": "Clinical Resources, Emergency & Equipment Hub",
    "bm": "Clinical Resources, Emergency & Equipment Hub",
    "ta": "Clinical Resources, Emergency & Equipment Hub"
  }
};

function setLanguage(lang) {
  if (!['en', 'zh', 'bm', 'ta'].includes(lang)) {
    lang = 'en';
  }
  try {
    localStorage.setItem('assura_lang', lang);
  } catch (e) {}

  // Update html lang attribute
  if (document.documentElement) {
    document.documentElement.lang = lang === 'bm' ? 'ms' : lang;
  }

  // Update active state on language switcher buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const btnLang = btn.getAttribute('data-lang');
    if (btnLang === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Deep recursive DOM text replacement
  translateDomNodes(document.body, lang);

  // Form inputs, options, placeholders
  translateInputsAndOptions(lang);

  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

function translateDomNodes(node, lang) {
  if (!node) return;

  const tag = (node.tagName || '').toLowerCase();
  if (tag === 'script' || tag === 'style' || tag === 'svg' || tag === 'path' || tag === 'code' || (node.classList && node.classList.contains('no-translate'))) {
    return;
  }

  // Handle Text Nodes
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.nodeValue;
    const trimmed = text.trim();
    if (trimmed.length > 0) {
      if (node._orig_en === undefined) {
        node._orig_en = text;
      }
      
      if (lang === 'en') {
        node.nodeValue = node._orig_en;
      } else {
        const origTrimmed = node._orig_en.trim();
        const cleanOrig = origTrimmed.replace(/\s+/g, ' ');

        if (STRING_MAP[origTrimmed] && STRING_MAP[origTrimmed][lang]) {
          node.nodeValue = node._orig_en.replace(origTrimmed, STRING_MAP[origTrimmed][lang]);
        } else if (STRING_MAP[cleanOrig] && STRING_MAP[cleanOrig][lang]) {
          node.nodeValue = node._orig_en.replace(origTrimmed, STRING_MAP[cleanOrig][lang]);
        } else {
          // Substring phrase replacement
          let replaced = node._orig_en;
          let changed = false;
          for (const [phrase, trans] of Object.entries(STRING_MAP)) {
            if (phrase.length > 3 && replaced.includes(phrase) && trans[lang] && trans[lang] !== phrase) {
              replaced = replaced.split(phrase).join(trans[lang]);
              changed = true;
            }
          }
          if (changed) {
            node.nodeValue = replaced;
          }
        }
      }
    }
    return;
  }

  // Recursively process child nodes
  for (let i = 0; i < node.childNodes.length; i++) {
    translateDomNodes(node.childNodes[i], lang);
  }
}

function translateInputsAndOptions(lang) {
  // Input & Textarea Placeholders
  document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(input => {
    if (input._orig_ph === undefined) {
      input._orig_ph = input.getAttribute('placeholder');
    }
    if (lang === 'en') {
      input.setAttribute('placeholder', input._orig_ph);
    } else {
      const ph = (input._orig_ph || '').trim();
      const cleanPh = ph.replace(/\s+/g, ' ');
      if (STRING_MAP[ph] && STRING_MAP[ph][lang]) {
        input.setAttribute('placeholder', STRING_MAP[ph][lang]);
      } else if (STRING_MAP[cleanPh] && STRING_MAP[cleanPh][lang]) {
        input.setAttribute('placeholder', STRING_MAP[cleanPh][lang]);
      }
    }
  });

  // Select Option Text
  document.querySelectorAll('select option').forEach(opt => {
    if (opt._orig_text === undefined) {
      opt._orig_text = opt.textContent;
    }
    if (lang === 'en') {
      opt.textContent = opt._orig_text;
    } else {
      const optTrimmed = (opt._orig_text || '').trim();
      const cleanOpt = optTrimmed.replace(/\s+/g, ' ');
      if (STRING_MAP[optTrimmed] && STRING_MAP[optTrimmed][lang]) {
        opt.textContent = STRING_MAP[optTrimmed][lang];
      } else if (STRING_MAP[cleanOpt] && STRING_MAP[cleanOpt][lang]) {
        opt.textContent = STRING_MAP[cleanOpt][lang];
      }
    }
  });
}

function getCurrentLanguage() {
  try {
    const saved = localStorage.getItem('assura_lang');
    if (saved && ['en', 'zh', 'bm', 'ta'].includes(saved)) return saved;
  } catch (e) {}
  return 'en';
}

window.setLanguage = setLanguage;
window.setSubPageLang = setLanguage;
window.getCurrentLanguage = getCurrentLanguage;
window.STRING_MAP = STRING_MAP;

// Auto-run on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setLanguage(getCurrentLanguage());
  });
} else {
  setLanguage(getCurrentLanguage());
}

// Observe dynamic DOM changes to re-apply language translation
let _i18n_debounce = null;
const observer = new MutationObserver((mutations) => {
  const currentLang = getCurrentLanguage();
  if (currentLang === 'en') return;
  
  if (_i18n_debounce) clearTimeout(_i18n_debounce);
  _i18n_debounce = setTimeout(() => {
    translateDomNodes(document.body, currentLang);
    translateInputsAndOptions(currentLang);
  }, 100);
});

if (document.body) {
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
} else {
  document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  });
}
