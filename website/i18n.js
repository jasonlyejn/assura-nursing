/**
 * Assura Nursing - Master Multi-Language Translation System (i18n.js)
 * High-performance, comprehensive, zero-fallback translation runtime for EN, ZH, BM, TA
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
    "zh": "专业护理服务 · 护理项目与收费",
    "bm": "Perkhidmatan Kami · Pilihan Rawatan Klinikal",
    "ta": "எங்கள் சேவைகள் · மருத்துவ பராமரிப்பு"
  },
  "Personalized Home Nursing & Clinical Services": {
    "zh": "个性化居家护理与临床医疗服务",
    "bm": "Kejururawatan Rumah & Rawatan Klinikal Peribadi",
    "ta": "தனிப்பயனாக்கப்பட்ட வீட்டு நர்சிங் சேவைகள்"
  },
  "Professionally planned around your home environment with trained staff handling to minimize infection risks and protect patient safety. Click any service to view rates and book instantly:": {
    "zh": "针对您的居家环境量身规划，由专业人员规范操作以降低感染风险并守护患者安全。点击任意项目即可查看收费并直接预约：",
    "bm": "Dirancang secara profesional mengikut persekitaran rumah anda oleh staf terlatih bagi meminimumkan risiko jangkitan dan melindungi keselamatan pesakit. Klik untuk melihat kadar dan menempah:",
    "ta": "தொற்று அபாயங்களைக் குறைத்து நோயாளியின் பாதுகாப்பை உறுதி செய்ய உங்கள் வீட்டு சூழலுக்கு ஏற்ப திட்டமிடப்பட்டுள்ளது:"
  },
  "Professional wound dressing for diabetic foot ulcers, surgical stitches/staples removal, and pressure sore management to minimize infection and accelerate healing.": {
    "zh": "糖尿病足溃疡、手术缝合线/订书针拆线、压疮与褥疮专业清创换药，严格无菌操作降低感染并加速伤口愈合。",
    "bm": "Pembalutan luka profesional untuk ulser kaki diabetik, pembuangan jahitan/staple pembedahan, dan pengurusan luka tekanan bagi meminimumkan jangkitan dan mempercepatkan penyembuhan.",
    "ta": "நீரிழிவு கால் புண்கள், அறுவை சிகிச்சை தையல் அகற்றுதல் மற்றும் படுக்கை புண்களுக்கு தொழில்முறை சிகிச்சை."
  },
  "Aseptic non-touch technique (ANTT)": {
    "zh": "无菌非接触操作技术 (ANTT)",
    "bm": "Teknik Tanpa Sentuh Aseptik (ANTT)",
    "ta": "தொற்றற்ற நுட்ப முறை (ANTT)"
  },
  "Diabetic foot ulcer treatment": {
    "zh": "糖尿病足部溃疡专业护理",
    "bm": "Rawatan ulser kaki diabetik",
    "ta": "நீரிழிவு கால் புண் சிகிச்சை"
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
    "bm": "Pemasukan Tiub NG & Kateter Kencing",
    "ta": "உணவு குழாய் & சிறுநீர் குழாய் செருகுதல்"
  },
  "Daily vitals & blood glucose tracking": {
    "zh": "生命体征与血糖每日监测记录",
    "bm": "Pemantauan tanda vital & glukosa darah harian",
    "ta": "இரத்த அழுத்தம் & சர்க்கரை அளவு கண்காணிப்பு"
  },
  "Gentle bed bathing & repositioning": {
    "zh": "床上温水擦浴与定时翻身防压疮",
    "bm": "Mandi di atas katil & pertukaran posisi",
    "ta": "படுக்கை குளியல் & நிலை மாற்றுதல்"
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
    "ta": "நிறுவனர் & மருத்துவ இயக்குனர்"
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
    "zh": "官方安卓应用 · 智能掌上医护",
    "bm": "Aplikasi Android Rasmi",
    "ta": "அதிகாரப்பூர்வ ஆண்ட்ராய்டு செயலி"
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
    "ta": "நிறுவனர் செய்தி"
  },
  "Mr. Jason Ng Lye Tiam": {
    "zh": "黄来添 先生 (Jason Ng)",
    "bm": "Encik Jason Ng Lye Tiam",
    "ta": "திரு. ஜேசன் இங் லாய் தியாம்"
  },
  "Registered Nurse (LJM)": {
    "zh": "马来西亚护士局注册护士 (LJM)",
    "bm": "Jururawat Berdaftar (LJM)",
    "ta": "பதிவு பெற்ற செவிலியர் (LJM)"
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
    "ta": "கட்டணங்களை கண்டு முன்பதிவு செய்க →"
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
  "Follow standard Malaysian hospital medication serving intervals to maintain therapeutic drug blood levels.": {
    "zh": "Follow standard Malaysian hospital medication serving intervals to maintain therapeutic drug blood levels.",
    "bm": "Follow standard Malaysian hospital medication serving intervals to maintain therapeutic drug blood levels.",
    "ta": "Follow standard Malaysian hospital medication serving intervals to maintain therapeutic drug blood levels."
  },
  "☎ 04-332 2800": {
    "zh": "☎ 04-332 2800",
    "bm": "☎ 04-332 2800",
    "ta": "☎ 04-332 2800"
  },
  "📍 Google Maps": {
    "zh": "📍 Google Maps",
    "bm": "📍 Google Maps",
    "ta": "📍 Google Maps"
  },
  "Bagan Specialist Centre": {
    "zh": "Bagan Specialist Centre",
    "bm": "Bagan Specialist Centre",
    "ta": "Bagan Specialist Centre"
  },
  "Compassion First (仁爱关怀)": {
    "zh": "Compassion First (仁爱关怀)",
    "bm": "Compassion First (仁爱关怀)",
    "ta": "Compassion First (仁爱关怀)"
  },
  "570, Jalan Perda Barat, Bandar Perda, 14000 Bukit Mertajam": {
    "zh": "570, Jalan Perda Barat, Bandar Perda, 14000 Bukit Mertajam",
    "bm": "570, Jalan Perda Barat, Bandar Perda, 14000 Bukit Mertajam",
    "ta": "570, Jalan Perda Barat, Bandar Perda, 14000 Bukit Mertajam"
  },
  "\"Why We Built Assura: Planning Care Around Your Home Without Compromising Clinical Fundamentals\"": {
    "zh": "\"Why We Built Assura: Planning Care Around Your Home Without Compromising Clinical Fundamentals\"",
    "bm": "\"Why We Built Assura: Planning Care Around Your Home Without Compromising Clinical Fundamentals\"",
    "ta": "\"Why We Built Assura: Planning Care Around Your Home Without Compromising Clinical Fundamentals\""
  },
  "Alt: 04-828 2842": {
    "zh": "Alt: 04-828 2842",
    "bm": "Alt: 04-828 2842",
    "ta": "Alt: 04-828 2842"
  },
  "Click to view rates for Hospital Escort": {
    "zh": "Click to view rates for Hospital Escort",
    "bm": "Click to view rates for Hospital Escort",
    "ta": "Click to view rates for Hospital Escort"
  },
  "\"Install unknown apps\"": {
    "zh": "\"Install unknown apps\"",
    "bm": "\"Install unknown apps\"",
    "ta": "\"Install unknown apps\""
  },
  "Infection Red Flags:": {
    "zh": "Infection Red Flags:",
    "bm": "Infection Red Flags:",
    "ta": "Infection Red Flags:"
  },
  "💬 WhatsApp urgent · 紧急讯息": {
    "zh": "💬 WhatsApp urgent · 紧急讯息",
    "bm": "💬 WhatsApp urgent · 紧急讯息",
    "ta": "💬 WhatsApp urgent · 紧急讯息"
  },
  "需要紧急护理？": {
    "zh": "需要紧急护理？",
    "bm": "需要紧急护理？",
    "ta": "需要紧急护理？"
  },
  "Clinic & Hospital Escort": {
    "zh": "Clinic & Hospital Escort",
    "bm": "Clinic & Hospital Escort",
    "ta": "Clinic & Hospital Escort"
  },
  "🩺 Supplies": {
    "zh": "🩺 Supplies",
    "bm": "🩺 Supplies",
    "ta": "🩺 Supplies"
  },
  "Medical Compressor Nebulizer": {
    "zh": "Medical Compressor Nebulizer",
    "bm": "Medical Compressor Nebulizer",
    "ta": "Medical Compressor Nebulizer"
  },
  "What would you like to do?": {
    "zh": "What would you like to do?",
    "bm": "What would you like to do?",
    "ta": "What would you like to do?"
  },
  "居家护理服务": {
    "zh": "居家护理服务",
    "bm": "居家护理服务",
    "ta": "居家护理服务"
  },
  "❓ Enquire / 咨询": {
    "zh": "❓ Enquire / 咨询",
    "bm": "❓ Enquire / 咨询",
    "ta": "❓ Enquire / 咨询"
  },
  "创办人兼临床总监": {
    "zh": "创办人兼临床总监",
    "bm": "创办人兼临床总监",
    "ta": "创办人兼临床总监"
  },
  "Hospital Seberang Jaya (HSJ)": {
    "zh": "Hospital Seberang Jaya (HSJ)",
    "bm": "Hospital Seberang Jaya (HSJ)",
    "ta": "Hospital Seberang Jaya (HSJ)"
  },
  "1. Home Environment Assessment & Planning": {
    "zh": "1. Home Environment Assessment & Planning",
    "bm": "1. Home Environment Assessment & Planning",
    "ta": "1. Home Environment Assessment & Planning"
  },
  "Medication Safety & Standard Times": {
    "zh": "Medication Safety & Standard Times",
    "bm": "Medication Safety & Standard Times",
    "ta": "Medication Safety & Standard Times"
  },
  "医护人员与性别偏好（男女护士/护理师均可指定）": {
    "zh": "医护人员与性别偏好（男女护士/护理师均可指定）",
    "bm": "医护人员与性别偏好（男女护士/护理师均可指定）",
    "ta": "医护人员与性别偏好（男女护士/护理师均可指定）"
  },
  "Click to explore Medical Equipment": {
    "zh": "Click to explore Medical Equipment",
    "bm": "Click to explore Medical Equipment",
    "ta": "Click to explore Medical Equipment"
  },
  "Crucial:": {
    "zh": "Crucial:",
    "bm": "Crucial:",
    "ta": "Crucial:"
  },
  "Other / Not Sure": {
    "zh": "Other / Not Sure",
    "bm": "Other / Not Sure",
    "ta": "Other / Not Sure"
  },
  "AssuraNursing.apk": {
    "zh": "AssuraNursing.apk",
    "bm": "AssuraNursing.apk",
    "ta": "AssuraNursing.apk"
  },
  "Patient NRIC / IC Number (身份证号 - 选填)": {
    "zh": "Patient NRIC / IC Number (身份证号 - 选填)",
    "bm": "Patient NRIC / IC Number (身份证号 - 选填)",
    "ta": "Patient NRIC / IC Number (身份证号 - 选填)"
  },
  "🛏️": {
    "zh": "🛏️",
    "bm": "🛏️",
    "ta": "🛏️"
  },
  "AssuraNursing.exe": {
    "zh": "AssuraNursing.exe",
    "bm": "AssuraNursing.exe",
    "ta": "AssuraNursing.exe"
  },
  "👴 Elderly & Bedridden Care": {
    "zh": "👴 Elderly & Bedridden Care",
    "bm": "👴 Elderly & Bedridden Care",
    "ta": "👴 Elderly & Bedridden Care"
  },
  "Any Nurse / Caregiver": {
    "zh": "Any Nurse / Caregiver",
    "bm": "Any Nurse / Caregiver",
    "ta": "Any Nurse / Caregiver"
  },
  "📍 Filled from your location — please add your house/unit number if it's missing.": {
    "zh": "📍 Filled from your location — please add your house/unit number if it's missing.",
    "bm": "📍 Filled from your location — please add your house/unit number if it's missing.",
    "ta": "📍 Filled from your location — please add your house/unit number if it's missing."
  },
  "Action": {
    "zh": "Action",
    "bm": "Action",
    "ta": "Action"
  },
  "🩺 View Services & Transparent Rates": {
    "zh": "🩺 View Services & Transparent Rates",
    "bm": "🩺 View Services & Transparent Rates",
    "ta": "🩺 View Services & Transparent Rates"
  },
  "Wound Dressing": {
    "zh": "Wound Dressing",
    "bm": "Wound Dressing",
    "ta": "Wound Dressing"
  },
  "📁 Medical Vault (病历文件)": {
    "zh": "📁 Medical Vault (病历文件)",
    "bm": "📁 Medical Vault (病历文件)",
    "ta": "📁 Medical Vault (病历文件)"
  },
  "优先安排女护士 / 女护理师": {
    "zh": "优先安排女护士 / 女护理师",
    "bm": "优先安排女护士 / 女护理师",
    "ta": "优先安排女护士 / 女护理师"
  },
  "Passive and active range-of-motion (ROM) exercises, bed-to-chair transfers, mobility assistance, and fall prevention guidance.": {
    "zh": "Passive and active range-of-motion (ROM) exercises, bed-to-chair transfers, mobility assistance, and fall prevention guidance.",
    "bm": "Passive and active range-of-motion (ROM) exercises, bed-to-chair transfers, mobility assistance, and fall prevention guidance.",
    "ta": "Passive and active range-of-motion (ROM) exercises, bed-to-chair transfers, mobility assistance, and fall prevention guidance."
  },
  "flexible environmental adaptation": {
    "zh": "flexible environmental adaptation",
    "bm": "flexible environmental adaptation",
    "ta": "flexible environmental adaptation"
  },
  "Media & Clinical Resources · 媒体中心与临床资源": {
    "zh": "Media & Clinical Resources · 媒体中心与临床资源",
    "bm": "Media & Clinical Resources · 媒体中心与临床资源",
    "ta": "Media & Clinical Resources · 媒体中心与临床资源"
  },
  "🔒 Sign In as Patient / Family (家属与患者登录)": {
    "zh": "🔒 Sign In as Patient / Family (家属与患者登录)",
    "bm": "🔒 Sign In as Patient / Family (家属与患者登录)",
    "ta": "🔒 Sign In as Patient / Family (家属与患者登录)"
  },
  "Week 1": {
    "zh": "Week 1",
    "bm": "Week 1",
    "ta": "Week 1"
  },
  "For clinical staff, supervisors, and platform evaluators testing the live MEWS scoring workflow:": {
    "zh": "For clinical staff, supervisors, and platform evaluators testing the live MEWS scoring workflow:",
    "bm": "For clinical staff, supervisors, and platform evaluators testing the live MEWS scoring workflow:",
    "ta": "For clinical staff, supervisors, and platform evaluators testing the live MEWS scoring workflow:"
  },
  "Personal Hygiene Care": {
    "zh": "Personal Hygiene Care",
    "bm": "Personal Hygiene Care",
    "ta": "Personal Hygiene Care"
  },
  "📥 Download": {
    "zh": "📥 Download",
    "bm": "📥 Download",
    "ta": "📥 Download"
  },
  "19 & 21, Logan Road, 10400 George Town, Penang": {
    "zh": "19 & 21, Logan Road, 10400 George Town, Penang",
    "bm": "19 & 21, Logan Road, 10400 George Town, Penang",
    "ta": "19 & 21, Logan Road, 10400 George Town, Penang"
  },
  "Save this booking app": {
    "zh": "Save this booking app",
    "bm": "Save this booking app",
    "ta": "Save this booking app"
  },
  "📊 MEWS Vitals Sign Scoring Chart (生命体征评分表)": {
    "zh": "📊 MEWS Vitals Sign Scoring Chart (生命体征评分表)",
    "bm": "📊 MEWS Vitals Sign Scoring Chart (生命体征评分表)",
    "ta": "📊 MEWS Vitals Sign Scoring Chart (生命体征评分表)"
  },
  "Surgical, Bedsores & Diabetic Ulcers": {
    "zh": "Surgical, Bedsores & Diabetic Ulcers",
    "bm": "Surgical, Bedsores & Diabetic Ulcers",
    "ta": "Surgical, Bedsores & Diabetic Ulcers"
  },
  "⏰ QID (Four Times Daily):": {
    "zh": "⏰ QID (Four Times Daily):",
    "bm": "⏰ QID (Four Times Daily):",
    "ta": "⏰ QID (Four Times Daily):"
  },
  "UNIFIED PORTAL ACCESS (统一服务登录)": {
    "zh": "UNIFIED PORTAL ACCESS (统一服务登录)",
    "bm": "UNIFIED PORTAL ACCESS (统一服务登录)",
    "ta": "UNIFIED PORTAL ACCESS (统一服务登录)"
  },
  "➕ New Register": {
    "zh": "➕ New Register",
    "bm": "➕ New Register",
    "ta": "➕ New Register"
  },
  "企业使命": {
    "zh": "企业使命",
    "bm": "企业使命",
    "ta": "企业使命"
  },
  "If an adult collapses, becomes unresponsive, and is not breathing normally, every second counts. Initiate continuous chest compressions immediately while waiting for the ambulance.": {
    "zh": "If an adult collapses, becomes unresponsive, and is not breathing normally, every second counts. Initiate continuous chest compressions immediately while waiting for the ambulance.",
    "bm": "If an adult collapses, becomes unresponsive, and is not breathing normally, every second counts. Initiate continuous chest compressions immediately while waiting for the ambulance.",
    "ta": "If an adult collapses, becomes unresponsive, and is not breathing normally, every second counts. Initiate continuous chest compressions immediately while waiting for the ambulance."
  },
  "Open": {
    "zh": "Open",
    "bm": "Open",
    "ta": "Open"
  },
  "Seberang Jaya · Butterworth · Bukit Mertajam · Kepala Batas": {
    "zh": "Seberang Jaya · Butterworth · Bukit Mertajam · Kepala Batas",
    "bm": "Seberang Jaya · Butterworth · Bukit Mertajam · Kepala Batas",
    "ta": "Seberang Jaya · Butterworth · Bukit Mertajam · Kepala Batas"
  },
  "Tap the map to drop a pin, or use your GPS. 点地图放置定位针，或使用 GPS。": {
    "zh": "Tap the map to drop a pin, or use your GPS. 点地图放置定位针，或使用 GPS。",
    "bm": "Tap the map to drop a pin, or use your GPS. 点地图放置定位针，或使用 GPS。",
    "ta": "Tap the map to drop a pin, or use your GPS. 点地图放置定位针，或使用 GPS。"
  },
  "Use my location · 定位": {
    "zh": "Use my location · 定位",
    "bm": "Use my location · 定位",
    "ta": "Use my location · 定位"
  },
  "Jalan Tun Hussein Onn, 13700 Seberang Jaya, Penang": {
    "zh": "Jalan Tun Hussein Onn, 13700 Seberang Jaya, Penang",
    "bm": "Jalan Tun Hussein Onn, 13700 Seberang Jaya, Penang",
    "ta": "Jalan Tun Hussein Onn, 13700 Seberang Jaya, Penang"
  },
  "Our Standard of Care · 专业护理标准与服务价值": {
    "zh": "Our Standard of Care · 专业护理标准与服务价值",
    "bm": "Our Standard of Care · 专业护理标准与服务价值",
    "ta": "Our Standard of Care · 专业护理标准与服务价值"
  },
  "Jalan Balik Pulau, 11000 Balik Pulau, Penang": {
    "zh": "Jalan Balik Pulau, 11000 Balik Pulau, Penang",
    "bm": "Jalan Balik Pulau, 11000 Balik Pulau, Penang",
    "ta": "Jalan Balik Pulau, 11000 Balik Pulau, Penang"
  },
  "⚡ Instant Price Estimator": {
    "zh": "⚡ Instant Price Estimator",
    "bm": "⚡ Instant Price Estimator",
    "ta": "⚡ Instant Price Estimator"
  },
  "Injection & Drip": {
    "zh": "Injection & Drip",
    "bm": "Injection & Drip",
    "ta": "Injection & Drip"
  },
  "Wash hands thoroughly with antibacterial soap and prepare a clean sterile field.": {
    "zh": "Wash hands thoroughly with antibacterial soap and prepare a clean sterile field.",
    "bm": "Wash hands thoroughly with antibacterial soap and prepare a clean sterile field.",
    "ta": "Wash hands thoroughly with antibacterial soap and prepare a clean sterile field."
  },
  "4. Digital MEWS Vitals & Handover": {
    "zh": "4. Digital MEWS Vitals & Handover",
    "bm": "4. Digital MEWS Vitals & Handover",
    "ta": "4. Digital MEWS Vitals & Handover"
  },
  "Ripple Anti-Decubitus Mattress": {
    "zh": "Ripple Anti-Decubitus Mattress",
    "bm": "Ripple Anti-Decubitus Mattress",
    "ta": "Ripple Anti-Decubitus Mattress"
  },
  "Assura Nursing · Unified Patient & Staff Clinical Portal": {
    "zh": "Assura Nursing · Unified Patient & Staff Clinical Portal",
    "bm": "Assura Nursing · Unified Patient & Staff Clinical Portal",
    "ta": "Assura Nursing · Unified Patient & Staff Clinical Portal"
  },
  "for family comfort, and": {
    "zh": "for family comfort, and",
    "bm": "for family comfort, and",
    "ta": "for family comfort, and"
  },
  "to place Assura on your mobile home screen.": {
    "zh": "to place Assura on your mobile home screen.",
    "bm": "to place Assura on your mobile home screen.",
    "ta": "to place Assura on your mobile home screen."
  },
  "🩺 Staff Sign In (医护人员工号登录)": {
    "zh": "🩺 Staff Sign In (医护人员工号登录)",
    "bm": "🩺 Staff Sign In (医护人员工号登录)",
    "ta": "🩺 Staff Sign In (医护人员工号登录)"
  },
  "Step 2: Family Case Link": {
    "zh": "Step 2: Family Case Link",
    "bm": "Step 2: Family Case Link",
    "ta": "Step 2: Family Case Link"
  },
  "Firmly tap the person's shoulders and shout loudly: \"Are you okay?\". If no response and no normal breathing, proceed immediately.": {
    "zh": "Firmly tap the person's shoulders and shout loudly: \"Are you okay?\". If no response and no normal breathing, proceed immediately.",
    "bm": "Firmly tap the person's shoulders and shout loudly: \"Are you okay?\". If no response and no normal breathing, proceed immediately.",
    "ta": "Firmly tap the person's shoulders and shout loudly: \"Are you okay?\". If no response and no normal breathing, proceed immediately."
  },
  "Step 1: Public": {
    "zh": "Step 1: Public",
    "bm": "Step 1: Public",
    "ta": "Step 1: Public"
  },
  "Medication": {
    "zh": "Medication",
    "bm": "Medication",
    "ta": "Medication"
  },
  "Auto-Fill": {
    "zh": "Auto-Fill",
    "bm": "Auto-Fill",
    "ta": "Auto-Fill"
  },
  "Install": {
    "zh": "Install",
    "bm": "Install",
    "ta": "Install"
  },
  "安宁疗护 · 舒缓护理": {
    "zh": "安宁疗护 · 舒缓护理",
    "bm": "安宁疗护 · 舒缓护理",
    "ta": "安宁疗护 · 舒缓护理"
  },
  "Assura 24/7 Clinical Care Line": {
    "zh": "Assura 24/7 Clinical Care Line",
    "bm": "Assura 24/7 Clinical Care Line",
    "ta": "Assura 24/7 Clinical Care Line"
  },
  "无偏好 · 安排最快到达人员": {
    "zh": "无偏好 · 安排最快到达人员",
    "bm": "无偏好 · 安排最快到达人员",
    "ta": "无偏好 · 安排最快到达人员"
  },
  "📍 All Penang Areas Covered": {
    "zh": "📍 All Penang Areas Covered",
    "bm": "📍 All Penang Areas Covered",
    "ta": "📍 All Penang Areas Covered"
  },
  "Upfront pricing with RM 0 Penang distance surcharge. Itemized digital statements provided for family insurance claims.": {
    "zh": "Upfront pricing with RM 0 Penang distance surcharge. Itemized digital statements provided for family insurance claims.",
    "bm": "Upfront pricing with RM 0 Penang distance surcharge. Itemized digital statements provided for family insurance claims.",
    "ta": "Upfront pricing with RM 0 Penang distance surcharge. Itemized digital statements provided for family insurance claims."
  },
  "🛡️": {
    "zh": "🛡️",
    "bm": "🛡️",
    "ta": "🛡️"
  },
  "19:00 or 22:00 before sleep": {
    "zh": "19:00 or 22:00 before sleep",
    "bm": "19:00 or 22:00 before sleep",
    "ta": "19:00 or 22:00 before sleep"
  },
  "☎ 04-828 6999": {
    "zh": "☎ 04-828 6999",
    "bm": "☎ 04-828 6999",
    "ta": "☎ 04-828 6999"
  },
  "📢 Official Company Bulletins & Clinical Announcements": {
    "zh": "📢 Official Company Bulletins & Clinical Announcements",
    "bm": "📢 Official Company Bulletins & Clinical Announcements",
    "ta": "📢 Official Company Bulletins & Clinical Announcements"
  },
  "：护士与主管请点击「🩺 Staff ID」标签，输入专属工号 (如": {
    "zh": "：护士与主管请点击「🩺 Staff ID」标签，输入专属工号 (如",
    "bm": "：护士与主管请点击「🩺 Staff ID」标签，输入专属工号 (如",
    "ta": "：护士与主管请点击「🩺 Staff ID」标签，输入专属工号 (如"
  },
  "🤖 Android APK (3.8 MB)": {
    "zh": "🤖 Android APK (3.8 MB)",
    "bm": "🤖 Android APK (3.8 MB)",
    "ta": "🤖 Android APK (3.8 MB)"
  },
  "2-Hourly Turning & Contracture Prevention": {
    "zh": "2-Hourly Turning & Contracture Prevention",
    "bm": "2-Hourly Turning & Contracture Prevention",
    "ta": "2-Hourly Turning & Contracture Prevention"
  },
  "🚨 Immediate 24/7 Emergency & Ambulance Dispatch": {
    "zh": "🚨 Immediate 24/7 Emergency & Ambulance Dispatch",
    "bm": "🚨 Immediate 24/7 Emergency & Ambulance Dispatch",
    "ta": "🚨 Immediate 24/7 Emergency & Ambulance Dispatch"
  },
  "只需留下姓名、电话和问题，其余可不填。": {
    "zh": "只需留下姓名、电话和问题，其余可不填。",
    "bm": "只需留下姓名、电话和问题，其余可不填。",
    "ta": "只需留下姓名、电话和问题，其余可不填。"
  },
  "🫁 Respiratory": {
    "zh": "🫁 Respiratory",
    "bm": "🫁 Respiratory",
    "ta": "🫁 Respiratory"
  },
  "Click": {
    "zh": "Click",
    "bm": "Click",
    "ta": "Click"
  },
  "：直接打开 App 即可查询全槟城上门护理收费、器材指南与医院急诊 GPS 路线。": {
    "zh": "：直接打开 App 即可查询全槟城上门护理收费、器材指南与医院急诊 GPS 路线。",
    "bm": "：直接打开 App 即可查询全槟城上门护理收费、器材指南与医院急诊 GPS 路线。",
    "ta": "：直接打开 App 即可查询全槟城上门护理收费、器材指南与医院急诊 GPS 路线。"
  },
  "Compress to this audio-visual beat": {
    "zh": "Compress to this audio-visual beat",
    "bm": "Compress to this audio-visual beat",
    "ta": "Compress to this audio-visual beat"
  },
  "Step-by-Step Training": {
    "zh": "Step-by-Step Training",
    "bm": "Step-by-Step Training",
    "ta": "Step-by-Step Training"
  },
  "Care": {
    "zh": "Care",
    "bm": "Care",
    "ta": "Care"
  },
  "Male Nurse / Caregiver": {
    "zh": "Male Nurse / Caregiver",
    "bm": "Male Nurse / Caregiver",
    "ta": "Male Nurse / Caregiver"
  },
  "🛡️ PDPA Act 2010 Privacy & Data Protection": {
    "zh": "🛡️ PDPA Act 2010 Privacy & Data Protection",
    "bm": "🛡️ PDPA Act 2010 Privacy & Data Protection",
    "ta": "🛡️ PDPA Act 2010 Privacy & Data Protection"
  },
  "Ryle's tube (NG Tube) insertion, enteral feeding position checks, urinary Foley catheter changing, bladder irrigation & stoma pouch care.": {
    "zh": "Ryle's tube (NG Tube) insertion, enteral feeding position checks, urinary Foley catheter changing, bladder irrigation & stoma pouch care.",
    "bm": "Ryle's tube (NG Tube) insertion, enteral feeding position checks, urinary Foley catheter changing, bladder irrigation & stoma pouch care.",
    "ta": "Ryle's tube (NG Tube) insertion, enteral feeding position checks, urinary Foley catheter changing, bladder irrigation & stoma pouch care."
  },
  "Saved only on this phone. We never see it until you send the message.": {
    "zh": "Saved only on this phone. We never see it until you send the message.",
    "bm": "Saved only on this phone. We never see it until you send the message.",
    "ta": "Saved only on this phone. We never see it until you send the message."
  },
  "Where": {
    "zh": "Where",
    "bm": "Where",
    "ta": "Where"
  },
  "🍼 Ryle's Tube / NG Tube": {
    "zh": "🍼 Ryle's Tube / NG Tube",
    "bm": "🍼 Ryle's Tube / NG Tube",
    "ta": "🍼 Ryle's Tube / NG Tube"
  },
  "3. Individualized Care Roadmap": {
    "zh": "3. Individualized Care Roadmap",
    "bm": "3. Individualized Care Roadmap",
    "ta": "3. Individualized Care Roadmap"
  },
  "Palliative Care": {
    "zh": "Palliative Care",
    "bm": "Palliative Care",
    "ta": "Palliative Care"
  },
  "Book via WhatsApp · 预约": {
    "zh": "Book via WhatsApp · 预约",
    "bm": "Book via WhatsApp · 预约",
    "ta": "Book via WhatsApp · 预约"
  },
  "⚡ Install": {
    "zh": "⚡ Install",
    "bm": "⚡ Install",
    "ta": "⚡ Install"
  },
  "Our Mission": {
    "zh": "Our Mission",
    "bm": "Our Mission",
    "ta": "Our Mission"
  },
  "Everything you need to know about using the Assura Nursing App on your phone, tablet, or desktop:": {
    "zh": "Everything you need to know about using the Assura Nursing App on your phone, tablet, or desktop:",
    "bm": "Everything you need to know about using the Assura Nursing App on your phone, tablet, or desktop:",
    "ta": "Everything you need to know about using the Assura Nursing App on your phone, tablet, or desktop:"
  },
  "Our registered nurses provide professional home visits, wound management, tube changes, and immediate equipment delivery across Penang Island & Mainland.": {
    "zh": "Our registered nurses provide professional home visits, wound management, tube changes, and immediate equipment delivery across Penang Island & Mainland.",
    "bm": "Our registered nurses provide professional home visits, wound management, tube changes, and immediate equipment delivery across Penang Island & Mainland.",
    "ta": "Our registered nurses provide professional home visits, wound management, tube changes, and immediate equipment delivery across Penang Island & Mainland."
  },
  "Role": {
    "zh": "Role",
    "bm": "Role",
    "ta": "Role"
  },
  "Announcements & Nurse Recruitment": {
    "zh": "Announcements & Nurse Recruitment",
    "bm": "Announcements & Nurse Recruitment",
    "ta": "Announcements & Nurse Recruitment"
  },
  "Loading MEWS Scoring Chart…": {
    "zh": "Loading MEWS Scoring Chart…",
    "bm": "Loading MEWS Scoring Chart…",
    "ta": "Loading MEWS Scoring Chart…"
  },
  "Every patient is cared for under strict ethical standards, licensed clinical supervision, and transparent coordination.": {
    "zh": "Every patient is cared for under strict ethical standards, licensed clinical supervision, and transparent coordination.",
    "bm": "Every patient is cared for under strict ethical standards, licensed clinical supervision, and transparent coordination.",
    "ta": "Every patient is cared for under strict ethical standards, licensed clinical supervision, and transparent coordination."
  },
  "We are a home nursing service, not an ambulance. For urgent": {
    "zh": "We are a home nursing service, not an ambulance. For urgent",
    "bm": "We are a home nursing service, not an ambulance. For urgent",
    "ta": "We are a home nursing service, not an ambulance. For urgent"
  },
  "♿ Transfer & Hygiene": {
    "zh": "♿ Transfer & Hygiene",
    "bm": "♿ Transfer & Hygiene",
    "ta": "♿ Transfer & Hygiene"
  },
  "Just leave your name, phone and question — everything else is optional.": {
    "zh": "Just leave your name, phone and question — everything else is optional.",
    "bm": "Just leave your name, phone and question — everything else is optional.",
    "ta": "Just leave your name, phone and question — everything else is optional."
  },
  "Just asking": {
    "zh": "Just asking",
    "bm": "Just asking",
    "ta": "Just asking"
  },
  "JULY 2026 · HOSPITAL PARTNERSHIP": {
    "zh": "JULY 2026 · HOSPITAL PARTNERSHIP",
    "bm": "JULY 2026 · HOSPITAL PARTNERSHIP",
    "ta": "JULY 2026 · HOSPITAL PARTNERSHIP"
  },
  "🔔 Test Offline Alert": {
    "zh": "🔔 Test Offline Alert",
    "bm": "🔔 Test Offline Alert",
    "ta": "🔔 Test Offline Alert"
  },
  "24/7 Emergency (ETD):": {
    "zh": "24/7 Emergency (ETD):",
    "bm": "24/7 Emergency (ETD):",
    "ta": "24/7 Emergency (ETD):"
  },
  "选择上门时间": {
    "zh": "选择上门时间",
    "bm": "选择上门时间",
    "ta": "选择上门时间"
  },
  "RM 40 – RM 70 / mo": {
    "zh": "RM 40 – RM 70 / mo",
    "bm": "RM 40 – RM 70 / mo",
    "ta": "RM 40 – RM 70 / mo"
  },
  "Sign Out": {
    "zh": "Sign Out",
    "bm": "Sign Out",
    "ta": "Sign Out"
  },
  "Not selected yet": {
    "zh": "Not selected yet",
    "bm": "Not selected yet",
    "ta": "Not selected yet"
  },
  "Call": {
    "zh": "Call",
    "bm": "Call",
    "ta": "Call"
  },
  "2. Uncompromising Nursing Fundamentals": {
    "zh": "2. Uncompromising Nursing Fundamentals",
    "bm": "2. Uncompromising Nursing Fundamentals",
    "ta": "2. Uncompromising Nursing Fundamentals"
  },
  "Announcements & Nurse Careers (\"The Hire Site\") · Assura Nursing": {
    "zh": "Announcements & Nurse Careers (\"The Hire Site\") · Assura Nursing",
    "bm": "Announcements & Nurse Careers (\"The Hire Site\") · Assura Nursing",
    "ta": "Announcements & Nurse Careers (\"The Hire Site\") · Assura Nursing"
  },
  "Active local nurse coordination across Penang Island & Mainland with fast WhatsApp booking confirmation and on-call support.": {
    "zh": "Active local nurse coordination across Penang Island & Mainland with fast WhatsApp booking confirmation and on-call support.",
    "bm": "Active local nurse coordination across Penang Island & Mainland with fast WhatsApp booking confirmation and on-call support.",
    "ta": "Active local nurse coordination across Penang Island & Mainland with fast WhatsApp booking confirmation and on-call support."
  },
  "Compassionate elderly & bedridden care, symptom control, and 12-hour / 24-hour round-the-clock dedicated nurse & caregiver shifts.": {
    "zh": "Compassionate elderly & bedridden care, symptom control, and 12-hour / 24-hour round-the-clock dedicated nurse & caregiver shifts.",
    "bm": "Compassionate elderly & bedridden care, symptom control, and 12-hour / 24-hour round-the-clock dedicated nurse & caregiver shifts.",
    "ta": "Compassionate elderly & bedridden care, symptom control, and 12-hour / 24-hour round-the-clock dedicated nurse & caregiver shifts."
  },
  "01X-XXXX XXX": {
    "zh": "01X-XXXX XXX",
    "bm": "01X-XXXX XXX",
    "ta": "01X-XXXX XXX"
  },
  "06:00, 15:00, 22:00 (8-hour intervals)": {
    "zh": "06:00, 15:00, 22:00 (8-hour intervals)",
    "bm": "06:00, 15:00, 22:00 (8-hour intervals)",
    "ta": "06:00, 15:00, 22:00 (8-hour intervals)"
  },
  "Every home has unique spatial layouts, bed heights, and lighting. Our nurses assess the home setup, ergonomics, and accessibility to design a safe, practical daily care routine that fits your household.": {
    "zh": "Every home has unique spatial layouts, bed heights, and lighting. Our nurses assess the home setup, ergonomics, and accessibility to design a safe, practical daily care routine that fits your household.",
    "bm": "Every home has unique spatial layouts, bed heights, and lighting. Our nurses assess the home setup, ergonomics, and accessibility to design a safe, practical daily care routine that fits your household.",
    "ta": "Every home has unique spatial layouts, bed heights, and lighting. Our nurses assess the home setup, ergonomics, and accessibility to design a safe, practical daily care routine that fits your household."
  },
  "💻 Windows .EXE (2.1 MB)": {
    "zh": "💻 Windows .EXE (2.1 MB)",
    "bm": "💻 Windows .EXE (2.1 MB)",
    "ta": "💻 Windows .EXE (2.1 MB)"
  },
  "☎ 04-228 3991": {
    "zh": "☎ 04-228 3991",
    "bm": "☎ 04-228 3991",
    "ta": "☎ 04-228 3991"
  },
  "在册医护人员": {
    "zh": "在册医护人员",
    "bm": "在册医护人员",
    "ta": "在册医护人员"
  },
  "Never crush Enteric-Coated (EC), Sustained-Release (SR/XR/CR), or sublingual tablets without pharmacist clearance.": {
    "zh": "Never crush Enteric-Coated (EC), Sustained-Release (SR/XR/CR), or sublingual tablets without pharmacist clearance.",
    "bm": "Never crush Enteric-Coated (EC), Sustained-Release (SR/XR/CR), or sublingual tablets without pharmacist clearance.",
    "ta": "Never crush Enteric-Coated (EC), Sustained-Release (SR/XR/CR), or sublingual tablets without pharmacist clearance."
  },
  "You do not need to sign in or register to browse home nursing procedures, calculate transparent prices, or use emergency hospital GPS routing.": {
    "zh": "You do not need to sign in or register to browse home nursing procedures, calculate transparent prices, or use emergency hospital GPS routing.",
    "bm": "You do not need to sign in or register to browse home nursing procedures, calculate transparent prices, or use emergency hospital GPS routing.",
    "ta": "You do not need to sign in or register to browse home nursing procedures, calculate transparent prices, or use emergency hospital GPS routing."
  },
  "扫码分享": {
    "zh": "扫码分享",
    "bm": "扫码分享",
    "ta": "扫码分享"
  },
  "👤 Patients & Families (公众与家属)": {
    "zh": "👤 Patients & Families (公众与家属)",
    "bm": "👤 Patients & Families (公众与家属)",
    "ta": "👤 Patients & Families (公众与家属)"
  },
  "医护人员专属门户 (Staff Portal)": {
    "zh": "医护人员专属门户 (Staff Portal)",
    "bm": "医护人员专属门户 (Staff Portal)",
    "ta": "医护人员专属门户 (Staff Portal)"
  },
  "Hospital / Specialist Clinic Escort · RM 150": {
    "zh": "Hospital / Specialist Clinic Escort · RM 150",
    "bm": "Hospital / Specialist Clinic Escort · RM 150",
    "ta": "Hospital / Specialist Clinic Escort · RM 150"
  },
  "Welcome back": {
    "zh": "Welcome back",
    "bm": "Welcome back",
    "ta": "Welcome back"
  },
  "Gov Hospital": {
    "zh": "Gov Hospital",
    "bm": "Gov Hospital",
    "ta": "Gov Hospital"
  },
  "Care plans are customized based on doctor discharge summaries, medication orders, mobility goals, and family schedules to ensure seamless recovery progression.": {
    "zh": "Care plans are customized based on doctor discharge summaries, medication orders, mobility goals, and family schedules to ensure seamless recovery progression.",
    "bm": "Care plans are customized based on doctor discharge summaries, medication orders, mobility goals, and family schedules to ensure seamless recovery progression.",
    "ta": "Care plans are customized based on doctor discharge summaries, medication orders, mobility goals, and family schedules to ensure seamless recovery progression."
  },
  "📞 Call 999 · 紧急救护": {
    "zh": "📞 Call 999 · 紧急救护",
    "bm": "📞 Call 999 · 紧急救护",
    "ta": "📞 Call 999 · 紧急救护"
  },
  "Real-time digital charting of blood pressure, SpO2, blood glucose, temperature, and wound photos, providing transparent daily records for families and doctors.": {
    "zh": "Real-time digital charting of blood pressure, SpO2, blood glucose, temperature, and wound photos, providing transparent daily records for families and doctors.",
    "bm": "Real-time digital charting of blood pressure, SpO2, blood glucose, temperature, and wound photos, providing transparent daily records for families and doctors.",
    "ta": "Real-time digital charting of blood pressure, SpO2, blood glucose, temperature, and wound photos, providing transparent daily records for families and doctors."
  },
  "Strict adherence to MOH & LJM standards. Hospital-standard aseptic non-touch technique (ANTT) for all wound & catheter care.": {
    "zh": "Strict adherence to MOH & LJM standards. Hospital-standard aseptic non-touch technique (ANTT) for all wound & catheter care.",
    "bm": "Strict adherence to MOH & LJM standards. Hospital-standard aseptic non-touch technique (ANTT) for all wound & catheter care.",
    "ta": "Strict adherence to MOH & LJM standards. Hospital-standard aseptic non-touch technique (ANTT) for all wound & catheter care."
  },
  "Ambulance / Police / Bomba": {
    "zh": "Ambulance / Police / Bomba",
    "bm": "Ambulance / Police / Bomba",
    "ta": "Ambulance / Police / Bomba"
  },
  "姓名": {
    "zh": "姓名",
    "bm": "姓名",
    "ta": "姓名"
  },
  "☎ 04-382 7333": {
    "zh": "☎ 04-382 7333",
    "bm": "☎ 04-382 7333",
    "ta": "☎ 04-382 7333"
  },
  "Where should we come?": {
    "zh": "Where should we come?",
    "bm": "Where should we come?",
    "ta": "Where should we come?"
  },
  "Use my details · 填入资料": {
    "zh": "Use my details · 填入资料",
    "bm": "Use my details · 填入资料",
    "ta": "Use my details · 填入资料"
  },
  "Hours": {
    "zh": "Hours",
    "bm": "Hours",
    "ta": "Hours"
  },
  "← Back to Home": {
    "zh": "← Back to Home",
    "bm": "← Back to Home",
    "ta": "← Back to Home"
  },
  "✓ Register Patient Account (注册账号)": {
    "zh": "✓ Register Patient Account (注册账号)",
    "bm": "✓ Register Patient Account (注册账号)",
    "ta": "✓ Register Patient Account (注册账号)"
  },
  "Hospital Balik Pulau (HBP)": {
    "zh": "Hospital Balik Pulau (HBP)",
    "bm": "Hospital Balik Pulau (HBP)",
    "ta": "Hospital Balik Pulau (HBP)"
  },
  "KPJ Penang Specialist Hospital": {
    "zh": "KPJ Penang Specialist Hospital",
    "bm": "KPJ Penang Specialist Hospital",
    "ta": "KPJ Penang Specialist Hospital"
  },
  "RM 180 / mo": {
    "zh": "RM 180 / mo",
    "bm": "RM 180 / mo",
    "ta": "RM 180 / mo"
  },
  "folder.": {
    "zh": "folder.",
    "bm": "folder.",
    "ta": "folder."
  },
  "Forget me · 清除": {
    "zh": "Forget me · 清除",
    "bm": "Forget me · 清除",
    "ta": "Forget me · 清除"
  },
  "at all times to prevent backflow.": {
    "zh": "at all times to prevent backflow.",
    "bm": "at all times to prevent backflow.",
    "ta": "at all times to prevent backflow."
  },
  "Open the file from notifications or your": {
    "zh": "Open the file from notifications or your",
    "bm": "Open the file from notifications or your",
    "ta": "Open the file from notifications or your"
  },
  "No password or registration required for browsing nursing procedures, transparent price lists, emergency hospital GPS, and 1-tap WhatsApp consultation.": {
    "zh": "No password or registration required for browsing nursing procedures, transparent price lists, emergency hospital GPS, and 1-tap WhatsApp consultation.",
    "bm": "No password or registration required for browsing nursing procedures, transparent price lists, emergency hospital GPS, and 1-tap WhatsApp consultation.",
    "ta": "No password or registration required for browsing nursing procedures, transparent price lists, emergency hospital GPS, and 1-tap WhatsApp consultation."
  },
  "🩺 Monitoring": {
    "zh": "🩺 Monitoring",
    "bm": "🩺 Monitoring",
    "ta": "🩺 Monitoring"
  },
  "🩺 Staff Sign-In": {
    "zh": "🩺 Staff Sign-In",
    "bm": "🩺 Staff Sign-In",
    "ta": "🩺 Staff Sign-In"
  },
  "🚀 Open": {
    "zh": "🚀 Open",
    "bm": "🚀 Open",
    "ta": "🚀 Open"
  },
  "Please choose a date.": {
    "zh": "Please choose a date.",
    "bm": "Please choose a date.",
    "ta": "Please choose a date."
  },
  "公众与家属 (无需登录)": {
    "zh": "公众与家属 (无需登录)",
    "bm": "公众与家属 (无需登录)",
    "ta": "公众与家属 (无需登录)"
  },
  "💧 Catheter (CBD) Care": {
    "zh": "💧 Catheter (CBD) Care",
    "bm": "💧 Catheter (CBD) Care",
    "ta": "💧 Catheter (CBD) Care"
  },
  "Please enter your address.": {
    "zh": "Please enter your address.",
    "bm": "Please enter your address.",
    "ta": "Please enter your address."
  },
  "Rapidly aspirates thick oral, nasal, or tracheostomy secretions to maintain a clear airway.": {
    "zh": "Rapidly aspirates thick oral, nasal, or tracheostomy secretions to maintain a clear airway.",
    "bm": "Rapidly aspirates thick oral, nasal, or tracheostomy secretions to maintain a clear airway.",
    "ta": "Rapidly aspirates thick oral, nasal, or tracheostomy secretions to maintain a clear airway."
  },
  "：在 App 内输入个案编号（如": {
    "zh": "：在 App 内输入个案编号（如",
    "bm": "：在 App 内输入个案编号（如",
    "ta": "：在 App 内输入个案编号（如"
  },
  "308, Macalister Road / Peel Avenue, 10450 George Town": {
    "zh": "308, Macalister Road / Peel Avenue, 10450 George Town",
    "bm": "308, Macalister Road / Peel Avenue, 10450 George Town",
    "ta": "308, Macalister Road / Peel Avenue, 10450 George Town"
  },
  "Post-surgical incision care, diabetic foot ulcer debridement, and pressure sore staging (Stage 1 to 4) using sterile dressing protocols (ANTT) to minimize infection risks.": {
    "zh": "Post-surgical incision care, diabetic foot ulcer debridement, and pressure sore staging (Stage 1 to 4) using sterile dressing protocols (ANTT) to minimize infection risks.",
    "bm": "Post-surgical incision care, diabetic foot ulcer debridement, and pressure sore staging (Stage 1 to 4) using sterile dressing protocols (ANTT) to minimize infection risks.",
    "ta": "Post-surgical incision care, diabetic foot ulcer debridement, and pressure sore staging (Stage 1 to 4) using sterile dressing protocols (ANTT) to minimize infection risks."
  },
  "Safe Ryle's / NG Tube Feeding": {
    "zh": "Safe Ryle's / NG Tube Feeding",
    "bm": "Safe Ryle's / NG Tube Feeding",
    "ta": "Safe Ryle's / NG Tube Feeding"
  },
  "Flush tube with 30–50ml warm boiled water post-feed to keep lumen patent.": {
    "zh": "Flush tube with 30–50ml warm boiled water post-feed to keep lumen patent.",
    "bm": "Flush tube with 30–50ml warm boiled water post-feed to keep lumen patent.",
    "ta": "Flush tube with 30–50ml warm boiled water post-feed to keep lumen patent."
  },
  "如属紧急医疗状况（胸痛、呼吸困难、大量出血、昏迷、中风征兆），请立即拨打 999。": {
    "zh": "如属紧急医疗状况（胸痛、呼吸困难、大量出血、昏迷、中风征兆），请立即拨打 999。",
    "bm": "如属紧急医疗状况（胸痛、呼吸困难、大量出血、昏迷、中风征兆），请立即拨打 999。",
    "ta": "如属紧急医疗状况（胸痛、呼吸困难、大量出血、昏迷、中风征兆），请立即拨打 999。"
  },
  "Empty drainage bag when 2/3 full, avoiding contact between tap and container.": {
    "zh": "Empty drainage bag when 2/3 full, avoiding contact between tap and container.",
    "bm": "Empty drainage bag when 2/3 full, avoiding contact between tap and container.",
    "ta": "Empty drainage bag when 2/3 full, avoiding contact between tap and container."
  },
  "Bayan Lepas / Queensbay / Relau": {
    "zh": "Bayan Lepas / Queensbay / Relau",
    "bm": "Bayan Lepas / Queensbay / Relau",
    "ta": "Bayan Lepas / Queensbay / Relau"
  },
  "Login Identifier": {
    "zh": "Login Identifier",
    "bm": "Login Identifier",
    "ta": "Login Identifier"
  },
  "病人情况 / 备注（选填）": {
    "zh": "病人情况 / 备注（选填）",
    "bm": "病人情况 / 备注（选填）",
    "ta": "病人情况 / 备注（选填）"
  },
  "The Guiding Principles Behind Every Home Visit": {
    "zh": "The Guiding Principles Behind Every Home Visit",
    "bm": "The Guiding Principles Behind Every Home Visit",
    "ta": "The Guiding Principles Behind Every Home Visit"
  },
  "新会员注册": {
    "zh": "新会员注册",
    "bm": "新会员注册",
    "ta": "新会员注册"
  },
  "定位针能让护士准确找到您家门口。": {
    "zh": "定位针能让护士准确找到您家门口。",
    "bm": "定位针能让护士准确找到您家门口。",
    "ta": "定位针能让护士准确找到您家门口。"
  },
  "Our Vision": {
    "zh": "Our Vision",
    "bm": "Our Vision",
    "ta": "Our Vision"
  },
  "Aseptic Wound Care & Dressing": {
    "zh": "Aseptic Wound Care & Dressing",
    "bm": "Aseptic Wound Care & Dressing",
    "ta": "Aseptic Wound Care & Dressing"
  },
  "💊 Medication Administration Record (用药记录表)": {
    "zh": "💊 Medication Administration Record (用药记录表)",
    "bm": "💊 Medication Administration Record (用药记录表)",
    "ta": "💊 Medication Administration Record (用药记录表)"
  },
  "◀ Prev": {
    "zh": "◀ Prev",
    "bm": "◀ Prev",
    "ta": "◀ Prev"
  },
  "☎ 112": {
    "zh": "☎ 112",
    "bm": "☎ 112",
    "ta": "☎ 112"
  },
  "Administer feeding formula slowly via gravity (200–250ml over 20–30 minutes).": {
    "zh": "Administer feeding formula slowly via gravity (200–250ml over 20–30 minutes).",
    "bm": "Administer feeding formula slowly via gravity (200–250ml over 20–30 minutes).",
    "ta": "Administer feeding formula slowly via gravity (200–250ml over 20–30 minutes)."
  },
  "📝 Online Form": {
    "zh": "📝 Online Form",
    "bm": "📝 Online Form",
    "ta": "📝 Online Form"
  },
  "☎ 04-222 5333": {
    "zh": "☎ 04-222 5333",
    "bm": "☎ 04-222 5333",
    "ta": "☎ 04-222 5333"
  },
  "AUGUST 2026 · CLINICAL TECHNOLOGY": {
    "zh": "AUGUST 2026 · CLINICAL TECHNOLOGY",
    "bm": "AUGUST 2026 · CLINICAL TECHNOLOGY",
    "ta": "AUGUST 2026 · CLINICAL TECHNOLOGY"
  },
  "已根据定位填写，请补上门牌号码。": {
    "zh": "已根据定位填写，请补上门牌号码。",
    "bm": "已根据定位填写，请补上门牌号码。",
    "ta": "已根据定位填写，请补上门牌号码。"
  },
  "电话": {
    "zh": "电话",
    "bm": "电话",
    "ta": "电话"
  },
  "07:00 or 12:00 (Morning / Midday)": {
    "zh": "07:00 or 12:00 (Morning / Midday)",
    "bm": "07:00 or 12:00 (Morning / Midday)",
    "ta": "07:00 or 12:00 (Morning / Midday)"
  },
  "Digital Vital Signs & SpO2 Monitor": {
    "zh": "Digital Vital Signs & SpO2 Monitor",
    "bm": "Digital Vital Signs & SpO2 Monitor",
    "ta": "Digital Vital Signs & SpO2 Monitor"
  },
  "Media, Clinical Resources & Emergency Hub": {
    "zh": "Media, Clinical Resources & Emergency Hub",
    "bm": "Media, Clinical Resources & Emergency Hub",
    "ta": "Media, Clinical Resources & Emergency Hub"
  },
  "Address": {
    "zh": "Address",
    "bm": "Address",
    "ta": "Address"
  },
  "v2.4 · 3.3 MB · Phones & Tablets · Direct Install": {
    "zh": "v2.4 · 3.3 MB · Phones & Tablets · Direct Install",
    "bm": "v2.4 · 3.3 MB · Phones & Tablets · Direct Install",
    "ta": "v2.4 · 3.3 MB · Phones & Tablets · Direct Install"
  },
  "Get instant access to home nurse bookings, transparent rates, emergency hospital routing, and live clinical vital charts.": {
    "zh": "Get instant access to home nurse bookings, transparent rates, emergency hospital routing, and live clinical vital charts.",
    "bm": "Get instant access to home nurse bookings, transparent rates, emergency hospital routing, and live clinical vital charts.",
    "ta": "Get instant access to home nurse bookings, transparent rates, emergency hospital routing, and live clinical vital charts."
  },
  "2/3-Function Electric Hospital Bed": {
    "zh": "2/3-Function Electric Hospital Bed",
    "bm": "2/3-Function Electric Hospital Bed",
    "ta": "2/3-Function Electric Hospital Bed"
  },
  "Equipment Title": {
    "zh": "Equipment Title",
    "bm": "Equipment Title",
    "ta": "Equipment Title"
  },
  "Upload Document": {
    "zh": "Upload Document",
    "bm": "Upload Document",
    "ta": "Upload Document"
  },
  "BM": {
    "zh": "BM",
    "bm": "BM",
    "ta": "BM"
  },
  "应用。": {
    "zh": "应用。",
    "bm": "应用。",
    "ta": "应用。"
  },
  "Clinical Services & Rates · 临床服务与透明收费": {
    "zh": "Clinical Services & Rates · 临床服务与透明收费",
    "bm": "Clinical Services & Rates · 临床服务与透明收费",
    "ta": "Clinical Services & Rates · 临床服务与透明收费"
  },
  "Book a visit": {
    "zh": "Book a visit",
    "bm": "Book a visit",
    "ta": "Book a visit"
  },
  "Please enter your name.": {
    "zh": "Please enter your name.",
    "bm": "Please enter your name.",
    "ta": "Please enter your name."
  },
  "ASSURA NURSING · PDPA 2010 CONFIDENTIAL": {
    "zh": "ASSURA NURSING · PDPA 2010 CONFIDENTIAL",
    "bm": "ASSURA NURSING · PDPA 2010 CONFIDENTIAL",
    "ta": "ASSURA NURSING · PDPA 2010 CONFIDENTIAL"
  },
  "e.g. ASN-001 / admin@assuranursing.com": {
    "zh": "e.g. ASN-001 / admin@assuranursing.com",
    "bm": "e.g. ASN-001 / admin@assuranursing.com",
    "ta": "e.g. ASN-001 / admin@assuranursing.com"
  },
  "St. John Ambulance (Penang)": {
    "zh": "St. John Ambulance (Penang)",
    "bm": "St. John Ambulance (Penang)",
    "ta": "St. John Ambulance (Penang)"
  },
  "患者家属关联病历 (Case Link)": {
    "zh": "患者家属关联病历 (Case Link)",
    "bm": "患者家属关联病历 (Case Link)",
    "ta": "患者家属关联病历 (Case Link)"
  },
  "Keep dressing clean, dry, and intact (CDI). Change immediately if soiled or leaking.": {
    "zh": "Keep dressing clean, dry, and intact (CDI). Change immediately if soiled or leaking.",
    "bm": "Keep dressing clean, dry, and intact (CDI). Change immediately if soiled or leaking.",
    "ta": "Keep dressing clean, dry, and intact (CDI). Change immediately if soiled or leaking."
  },
  "Official company announcements, Penang clinical updates, and \"The Hire Site\" for Registered Nurses, Staff Nurses, and Dedicated Caregivers.": {
    "zh": "Official company announcements, Penang clinical updates, and \"The Hire Site\" for Registered Nurses, Staff Nurses, and Dedicated Caregivers.",
    "bm": "Official company announcements, Penang clinical updates, and \"The Hire Site\" for Registered Nurses, Staff Nurses, and Dedicated Caregivers.",
    "ta": "Official company announcements, Penang clinical updates, and \"The Hire Site\" for Registered Nurses, Staff Nurses, and Dedicated Caregivers."
  },
  "The Hire Site (Join Our Team)": {
    "zh": "The Hire Site (Join Our Team)",
    "bm": "The Hire Site (Join Our Team)",
    "ta": "The Hire Site (Join Our Team)"
  },
  "Female Nurse / Caregiver (女护士/女护理师)": {
    "zh": "Female Nurse / Caregiver (女护士/女护理师)",
    "bm": "Female Nurse / Caregiver (女护士/女护理师)",
    "ta": "Female Nurse / Caregiver (女护士/女护理师)"
  },
  "Summary": {
    "zh": "Summary",
    "bm": "Summary",
    "ta": "Summary"
  },
  "Nursing": {
    "zh": "Nursing",
    "bm": "Nursing",
    "ta": "Nursing"
  },
  "Electric backrest, knee elevation, and bed height adjustability with safety drop-down side rails.": {
    "zh": "Electric backrest, knee elevation, and bed height adjustability with safety drop-down side rails.",
    "bm": "Electric backrest, knee elevation, and bed height adjustability with safety drop-down side rails.",
    "ta": "Electric backrest, knee elevation, and bed height adjustability with safety drop-down side rails."
  },
  "Clinical Staff ID / Email / Phone (医护人员工号 / 邮箱)": {
    "zh": "Clinical Staff ID / Email / Phone (医护人员工号 / 邮箱)",
    "bm": "Clinical Staff ID / Email / Phone (医护人员工号 / 邮箱)",
    "ta": "Clinical Staff ID / Email / Phone (医护人员工号 / 邮箱)"
  },
  "ADL Assistance": {
    "zh": "ADL Assistance",
    "bm": "ADL Assistance",
    "ta": "ADL Assistance"
  },
  "Georgetown · Bayan Lepas · Balik Pulau · Tanjung Bungah": {
    "zh": "Georgetown · Bayan Lepas · Balik Pulau · Tanjung Bungah",
    "bm": "Georgetown · Bayan Lepas · Balik Pulau · Tanjung Bungah",
    "ta": "Georgetown · Bayan Lepas · Balik Pulau · Tanjung Bungah"
  },
  "RM 60 – RM 100 / mo": {
    "zh": "RM 60 – RM 100 / mo",
    "bm": "RM 60 – RM 100 / mo",
    "ta": "RM 60 – RM 100 / mo"
  },
  "Security PIN / Password (个人安全密码)": {
    "zh": "Security PIN / Password (个人安全密码)",
    "bm": "Security PIN / Password (个人安全密码)",
    "ta": "Security PIN / Password (个人安全密码)"
  },
  "注册执业护士与专业医护护理人员 · 专属上门居家探访 · 探访前提供透明清晰报价": {
    "zh": "注册执业护士与专业医护护理人员 · 专属上门居家探访 · 探访前提供透明清晰报价",
    "bm": "注册执业护士与专业医护护理人员 · 专属上门居家探访 · 探访前提供透明清晰报价",
    "ta": "注册执业护士与专业医护护理人员 · 专属上门居家探访 · 探访前提供透明清晰报价"
  },
  "Equipment description.": {
    "zh": "Equipment description.",
    "bm": "Equipment description.",
    "ta": "Equipment description."
  },
  "Sister Tan (Supervisor)": {
    "zh": "Sister Tan (Supervisor)",
    "bm": "Sister Tan (Supervisor)",
    "ta": "Sister Tan (Supervisor)"
  },
  "custom": {
    "zh": "custom",
    "bm": "custom",
    "ta": "custom"
  },
  "🩺 Monitoring & Kits": {
    "zh": "🩺 Monitoring & Kits",
    "bm": "🩺 Monitoring & Kits",
    "ta": "🩺 Monitoring & Kits"
  },
  "Inquire & Order via WhatsApp": {
    "zh": "Inquire & Order via WhatsApp",
    "bm": "Inquire & Order via WhatsApp",
    "ta": "Inquire & Order via WhatsApp"
  },
  "点击后会打开 WhatsApp，预约资料已自动填好，按发送即可。": {
    "zh": "点击后会打开 WhatsApp，预约资料已自动填好，按发送即可。",
    "bm": "点击后会打开 WhatsApp，预约资料已自动填好，按发送即可。",
    "ta": "点击后会打开 WhatsApp，预约资料已自动填好，按发送即可。"
  },
  "Serving Bukit Mertajam & nearby areas": {
    "zh": "Serving Bukit Mertajam & nearby areas",
    "bm": "Serving Bukit Mertajam & nearby areas",
    "ta": "Serving Bukit Mertajam & nearby areas"
  },
  "⏱️": {
    "zh": "⏱️",
    "bm": "⏱️",
    "ta": "⏱️"
  },
  "数智记录·清晰交接：": {
    "zh": "数智记录·清晰交接：",
    "bm": "数智记录·清晰交接：",
    "ta": "数智记录·清晰交接："
  },
  "术后护理与康复照顾": {
    "zh": "术后护理与康复照顾",
    "bm": "术后护理与康复照顾",
    "ta": "术后护理与康复照顾"
  },
  "Enter your 4-8 digit PIN": {
    "zh": "Enter your 4-8 digit PIN",
    "bm": "Enter your 4-8 digit PIN",
    "ta": "Enter your 4-8 digit PIN"
  },
  "Download Assura Nursing (.exe)": {
    "zh": "Download Assura Nursing (.exe)",
    "bm": "Download Assura Nursing (.exe)",
    "ta": "Download Assura Nursing (.exe)"
  },
  "Qualified nurse accompaniment for hospital specialist check-ups, hemodialysis transport, outpatient appointments, and discharge handover.": {
    "zh": "Qualified nurse accompaniment for hospital specialist check-ups, hemodialysis transport, outpatient appointments, and discharge handover.",
    "bm": "Qualified nurse accompaniment for hospital specialist check-ups, hemodialysis transport, outpatient appointments, and discharge handover.",
    "ta": "Qualified nurse accompaniment for hospital specialist check-ups, hemodialysis transport, outpatient appointments, and discharge handover."
  },
  "Jalan Residensi, 10990 George Town, Penang": {
    "zh": "Jalan Residensi, 10990 George Town, Penang",
    "bm": "Jalan Residensi, 10990 George Town, Penang",
    "ta": "Jalan Residensi, 10990 George Town, Penang"
  },
  "Clinical Points & Safety Checklist:": {
    "zh": "Clinical Points & Safety Checklist:",
    "bm": "Clinical Points & Safety Checklist:",
    "ta": "Clinical Points & Safety Checklist:"
  },
  "Click to view rates for Elderly & Bedridden Care": {
    "zh": "Click to view rates for Elderly & Bedridden Care",
    "bm": "Click to view rates for Elderly & Bedridden Care",
    "ta": "Click to view rates for Elderly & Bedridden Care"
  },
  "Estimated Total Before Consumables": {
    "zh": "Estimated Total Before Consumables",
    "bm": "Estimated Total Before Consumables",
    "ta": "Estimated Total Before Consumables"
  },
  "日期": {
    "zh": "日期",
    "bm": "日期",
    "ta": "日期"
  },
  "supervisor@assuranursing.com": {
    "zh": "supervisor@assuranursing.com",
    "bm": "supervisor@assuranursing.com",
    "ta": "supervisor@assuranursing.com"
  },
  "Assura Nursing App · 官方手机应用": {
    "zh": "Assura Nursing App · 官方手机应用",
    "bm": "Assura Nursing App · 官方手机应用",
    "ta": "Assura Nursing App · 官方手机应用"
  },
  "🫁 Respiratory & Airway": {
    "zh": "🫁 Respiratory & Airway",
    "bm": "🫁 Respiratory & Airway",
    "ta": "🫁 Respiratory & Airway"
  },
  "Treating every patient with warmth, patience, and empathy—just as we would care for our own beloved family members.": {
    "zh": "Treating every patient with warmth, patience, and empathy—just as we would care for our own beloved family members.",
    "bm": "Treating every patient with warmth, patience, and empathy—just as we would care for our own beloved family members.",
    "ta": "Treating every patient with warmth, patience, and empathy—just as we would care for our own beloved family members."
  },
  "Elderly Care & Stroke": {
    "zh": "Elderly Care & Stroke",
    "bm": "Elderly Care & Stroke",
    "ta": "Elderly Care & Stroke"
  },
  "RM 80 – RM 140 / mo": {
    "zh": "RM 80 – RM 140 / mo",
    "bm": "RM 80 – RM 140 / mo",
    "ta": "RM 80 – RM 140 / mo"
  },
  "🏥 Penang Mainland Hospitals (Seberang Perai)": {
    "zh": "🏥 Penang Mainland Hospitals (Seberang Perai)",
    "bm": "🏥 Penang Mainland Hospitals (Seberang Perai)",
    "ta": "🏥 Penang Mainland Hospitals (Seberang Perai)"
  },
  "：无需输入密码，直接打开 App 即可享受全套护理资讯与紧急呼叫。": {
    "zh": "：无需输入密码，直接打开 App 即可享受全套护理资讯与紧急呼叫。",
    "bm": "：无需输入密码，直接打开 App 即可享受全套护理资讯与紧急呼叫。",
    "ta": "：无需输入密码，直接打开 App 即可享受全套护理资讯与紧急呼叫。"
  },
  "24/7 Emergency / Line:": {
    "zh": "24/7 Emergency / Line:",
    "bm": "24/7 Emergency / Line:",
    "ta": "24/7 Emergency / Line:"
  },
  "Georgetown / Jelutong / Pulau Tikus": {
    "zh": "Georgetown / Jelutong / Pulau Tikus",
    "bm": "Georgetown / Jelutong / Pulau Tikus",
    "ta": "Georgetown / Jelutong / Pulau Tikus"
  },
  "🔄 Reset Demo Database": {
    "zh": "🔄 Reset Demo Database",
    "bm": "🔄 Reset Demo Database",
    "ta": "🔄 Reset Demo Database"
  },
  "Install the official mobile or desktop application for seamless offline support, direct alerts, and clinical access across Penang.": {
    "zh": "Install the official mobile or desktop application for seamless offline support, direct alerts, and clinical access across Penang.",
    "bm": "Install the official mobile or desktop application for seamless offline support, direct alerts, and clinical access across Penang.",
    "ta": "Install the official mobile or desktop application for seamless offline support, direct alerts, and clinical access across Penang."
  },
  "All Equipment": {
    "zh": "All Equipment",
    "bm": "All Equipment",
    "ta": "All Equipment"
  },
  "🎬 First-Time App User Guide & Memo": {
    "zh": "🎬 First-Time App User Guide & Memo",
    "bm": "🎬 First-Time App User Guide & Memo",
    "ta": "🎬 First-Time App User Guide & Memo"
  },
  "We believe effective home care is a balance of two essential skills:": {
    "zh": "We believe effective home care is a balance of two essential skills:",
    "bm": "We believe effective home care is a balance of two essential skills:",
    "ta": "We believe effective home care is a balance of two essential skills:"
  },
  "nursing": {
    "zh": "nursing",
    "bm": "nursing",
    "ta": "nursing"
  },
  "Step 1: Public Open Access (公众免密使用)": {
    "zh": "Step 1: Public Open Access (公众免密使用)",
    "bm": "Step 1: Public Open Access (公众免密使用)",
    "ta": "Step 1: Public Open Access (公众免密使用)"
  },
  "Purchase Reference": {
    "zh": "Purchase Reference",
    "bm": "Purchase Reference",
    "ta": "Purchase Reference"
  },
  "After this page is published, install it from your browser for faster bookings.": {
    "zh": "After this page is published, install it from your browser for faster bookings.",
    "bm": "After this page is published, install it from your browser for faster bookings.",
    "ta": "After this page is published, install it from your browser for faster bookings."
  },
  "Perform gentle passive Range of Motion (ROM) on hemiplegic limbs twice daily.": {
    "zh": "Perform gentle passive Range of Motion (ROM) on hemiplegic limbs twice daily.",
    "bm": "Perform gentle passive Range of Motion (ROM) on hemiplegic limbs twice daily.",
    "ta": "Perform gentle passive Range of Motion (ROM) on hemiplegic limbs twice daily."
  },
  "🛠️ Clinical Sandbox & Testing Accounts (内部测试账号说明)": {
    "zh": "🛠️ Clinical Sandbox & Testing Accounts (内部测试账号说明)",
    "bm": "🛠️ Clinical Sandbox & Testing Accounts (内部测试账号说明)",
    "ta": "🛠️ Clinical Sandbox & Testing Accounts (内部测试账号说明)"
  },
  "🛡️ Registered Nurse (LJM)": {
    "zh": "🛡️ Registered Nurse (LJM)",
    "bm": "🛡️ Registered Nurse (LJM)",
    "ta": "🛡️ Registered Nurse (LJM)"
  },
  "🛏️ Mobility & Beds": {
    "zh": "🛏️ Mobility & Beds",
    "bm": "🛏️ Mobility & Beds",
    "ta": "🛏️ Mobility & Beds"
  },
  "Step 1: Check Responsiveness": {
    "zh": "Step 1: Check Responsiveness",
    "bm": "Step 1: Check Responsiveness",
    "ta": "Step 1: Check Responsiveness"
  },
  "优先安排男护士 (力气大·翻身/男导尿)": {
    "zh": "优先安排男护士 (力气大·翻身/男导尿)",
    "bm": "优先安排男护士 (力气大·翻身/男导尿)",
    "ta": "优先安排男护士 (力气大·翻身/男导尿)"
  },
  "Please choose a service and complete the required details.": {
    "zh": "Please choose a service and complete the required details.",
    "bm": "Please choose a service and complete the required details.",
    "ta": "Please choose a service and complete the required details."
  },
  "LJM Registered (SRN)": {
    "zh": "LJM Registered (SRN)",
    "bm": "LJM Registered (SRN)",
    "ta": "LJM Registered (SRN)"
  },
  "Open Clinical Portal": {
    "zh": "Open Clinical Portal",
    "bm": "Open Clinical Portal",
    "ta": "Open Clinical Portal"
  },
  "RM 2,500": {
    "zh": "RM 2,500",
    "bm": "RM 2,500",
    "ta": "RM 2,500"
  },
  "Preferred visiting time": {
    "zh": "Preferred visiting time",
    "bm": "Preferred visiting time",
    "ta": "Preferred visiting time"
  },
  "3. Push Hard & Fast:": {
    "zh": "3. Push Hard & Fast:",
    "bm": "3. Push Hard & Fast:",
    "ta": "3. Push Hard & Fast:"
  },
  "Visit": {
    "zh": "Visit",
    "bm": "Visit",
    "ta": "Visit"
  },
  "Simpang Ampat / Juru / Batu Kawan": {
    "zh": "Simpang Ampat / Juru / Batu Kawan",
    "bm": "Simpang Ampat / Juru / Batu Kawan",
    "ta": "Simpang Ampat / Juru / Batu Kawan"
  },
  "☎ 04-222 5222": {
    "zh": "☎ 04-222 5222",
    "bm": "☎ 04-222 5222",
    "ta": "☎ 04-222 5222"
  },
  "Public:": {
    "zh": "Public:",
    "bm": "Public:",
    "ta": "Public:"
  },
  "我们会尽快回复，但无法保证随时到场。如无人接听，请拨 999 或前往就近诊所。": {
    "zh": "我们会尽快回复，但无法保证随时到场。如无人接听，请拨 999 或前往就近诊所。",
    "bm": "我们会尽快回复，但无法保证随时到场。如无人接听，请拨 999 或前往就近诊所。",
    "ta": "我们会尽快回复，但无法保证随时到场。如无人接听，请拨 999 或前往就近诊所。"
  },
  "Online": {
    "zh": "Online",
    "bm": "Online",
    "ta": "Online"
  },
  "Mobile Phone Number (手机号码)": {
    "zh": "Mobile Phone Number (手机号码)",
    "bm": "Mobile Phone Number (手机号码)",
    "ta": "Mobile Phone Number (手机号码)"
  },
  "伤口换药与护理": {
    "zh": "伤口换药与护理",
    "bm": "伤口换药与护理",
    "ta": "伤口换药与护理"
  },
  "Penang Island & Mainland Fast Delivery": {
    "zh": "Penang Island & Mainland Fast Delivery",
    "bm": "Penang Island & Mainland Fast Delivery",
    "ta": "Penang Island & Mainland Fast Delivery"
  },
  "Nibong Tebal / Jawi / Sungai Bakap": {
    "zh": "Nibong Tebal / Jawi / Sungai Bakap",
    "bm": "Nibong Tebal / Jawi / Sungai Bakap",
    "ta": "Nibong Tebal / Jawi / Sungai Bakap"
  },
  "🩸 Wound Care & Infection Risk Minimization": {
    "zh": "🩸 Wound Care & Infection Risk Minimization",
    "bm": "🩸 Wound Care & Infection Risk Minimization",
    "ta": "🩸 Wound Care & Infection Risk Minimization"
  },
  "JUNE 2026 · EDUCATION & TRAINING": {
    "zh": "JUNE 2026 · EDUCATION & TRAINING",
    "bm": "JUNE 2026 · EDUCATION & TRAINING",
    "ta": "JUNE 2026 · EDUCATION & TRAINING"
  },
  "Staff ID Sign-in": {
    "zh": "Staff ID Sign-in",
    "bm": "Staff ID Sign-in",
    "ta": "Staff ID Sign-in"
  },
  "Pantai Hospital Penang": {
    "zh": "Pantai Hospital Penang",
    "bm": "Pantai Hospital Penang",
    "ta": "Pantai Hospital Penang"
  },
  "👀 Preview Sample Patient Chart (查看病历演示样本)": {
    "zh": "👀 Preview Sample Patient Chart (查看病历演示样本)",
    "bm": "👀 Preview Sample Patient Chart (查看病历演示样本)",
    "ta": "👀 Preview Sample Patient Chart (查看病历演示样本)"
  },
  "🧪 Tube & Catheter Management": {
    "zh": "🧪 Tube & Catheter Management",
    "bm": "🧪 Tube & Catheter Management",
    "ta": "🧪 Tube & Catheter Management"
  },
  "● Click steps to preview": {
    "zh": "● Click steps to preview",
    "bm": "● Click steps to preview",
    "ta": "● Click steps to preview"
  },
  "e.g. 0124567890 or ASN-8821": {
    "zh": "e.g. 0124567890 or ASN-8821",
    "bm": "e.g. 0124567890 or ASN-8821",
    "ta": "e.g. 0124567890 or ASN-8821"
  },
  "Need Professional Nurse Visit or Equipment in Penang?": {
    "zh": "Need Professional Nurse Visit or Equipment in Penang?",
    "bm": "Need Professional Nurse Visit or Equipment in Penang?",
    "ta": "Need Professional Nurse Visit or Equipment in Penang?"
  },
  "Click to view rates for Wound Care": {
    "zh": "Click to view rates for Wound Care",
    "bm": "Click to view rates for Wound Care",
    "ta": "Click to view rates for Wound Care"
  },
  "Alternating cylindrical air cells shift pressure points every 6–10 minutes to prevent and heal bedsores.": {
    "zh": "Alternating cylindrical air cells shift pressure points every 6–10 minutes to prevent and heal bedsores.",
    "bm": "Alternating cylindrical air cells shift pressure points every 6–10 minutes to prevent and heal bedsores.",
    "ta": "Alternating cylindrical air cells shift pressure points every 6–10 minutes to prevent and heal bedsores."
  },
  "Opens WhatsApp with your booking details filled in — just press send.": {
    "zh": "Opens WhatsApp with your booking details filled in — just press send.",
    "bm": "Opens WhatsApp with your booking details filled in — just press send.",
    "ta": "Opens WhatsApp with your booking details filled in — just press send."
  },
  "Up to 25 km": {
    "zh": "Up to 25 km",
    "bm": "Up to 25 km",
    "ta": "Up to 25 km"
  },
  "Downloads": {
    "zh": "Downloads",
    "bm": "Downloads",
    "ta": "Downloads"
  },
  "Name": {
    "zh": "Name",
    "bm": "Name",
    "ta": "Name"
  },
  "EN": {
    "zh": "EN",
    "bm": "EN",
    "ta": "EN"
  },
  "Adapting to the Home, Upholding the Fundamentals": {
    "zh": "Adapting to the Home, Upholding the Fundamentals",
    "bm": "Adapting to the Home, Upholding the Fundamentals",
    "ta": "Adapting to the Home, Upholding the Fundamentals"
  },
  "Doctor-prescribed subcutaneous insulin administration, IM injections, IV drip setups, clinical blood sample collection, and vital signs monitoring.": {
    "zh": "Doctor-prescribed subcutaneous insulin administration, IM injections, IV drip setups, clinical blood sample collection, and vital signs monitoring.",
    "bm": "Doctor-prescribed subcutaneous insulin administration, IM injections, IV drip setups, clinical blood sample collection, and vital signs monitoring.",
    "ta": "Doctor-prescribed subcutaneous insulin administration, IM injections, IV drip setups, clinical blood sample collection, and vital signs monitoring."
  },
  "居家护理预约 · 专业护士上门": {
    "zh": "居家护理预约 · 专业护士上门",
    "bm": "居家护理预约 · 专业护士上门",
    "ta": "居家护理预约 · 专业护士上门"
  },
  "Post-Operative Care": {
    "zh": "Post-Operative Care",
    "bm": "Post-Operative Care",
    "ta": "Post-Operative Care"
  },
  "Founder's Message · 创办人心声与初心": {
    "zh": "Founder's Message · 创办人心声与初心",
    "bm": "Founder's Message · 创办人心声与初心",
    "ta": "Founder's Message · 创办人心声与初心"
  },
  "Estimated Rental": {
    "zh": "Estimated Rental",
    "bm": "Estimated Rental",
    "ta": "Estimated Rental"
  },
  "\"To build a trusted digital and AI-era home healthcare service in Penang, recognized for real-time clinical tracking, transparent fare rates, and heartfelt family care.\"": {
    "zh": "\"To build a trusted digital and AI-era home healthcare service in Penang, recognized for real-time clinical tracking, transparent fare rates, and heartfelt family care.\"",
    "bm": "\"To build a trusted digital and AI-era home healthcare service in Penang, recognized for real-time clinical tracking, transparent fare rates, and heartfelt family care.\"",
    "ta": "\"To build a trusted digital and AI-era home healthcare service in Penang, recognized for real-time clinical tracking, transparent fare rates, and heartfelt family care.\""
  },
  "Your unified Penang healthcare & media center: 24/7 hospital emergency GPS directory, CPR metronome, medical equipment rental catalog, home nursing clinical guides, and clinical video & photo media.": {
    "zh": "Your unified Penang healthcare & media center: 24/7 hospital emergency GPS directory, CPR metronome, medical equipment rental catalog, home nursing clinical guides, and clinical video & photo media.",
    "bm": "Your unified Penang healthcare & media center: 24/7 hospital emergency GPS directory, CPR metronome, medical equipment rental catalog, home nursing clinical guides, and clinical video & photo media.",
    "ta": "Your unified Penang healthcare & media center: 24/7 hospital emergency GPS directory, CPR metronome, medical equipment rental catalog, home nursing clinical guides, and clinical video & photo media."
  },
  "Push down 2 inches (5 cm) at 100–120 beats per minute. Allow complete recoil.": {
    "zh": "Push down 2 inches (5 cm) at 100–120 beats per minute. Allow complete recoil.",
    "bm": "Push down 2 inches (5 cm) at 100–120 beats per minute. Allow complete recoil.",
    "ta": "Push down 2 inches (5 cm) at 100–120 beats per minute. Allow complete recoil."
  },
  "Clinical-grade automated NIBP Blood Pressure, Pulse Rate, and Oxygen Saturation monitoring.": {
    "zh": "Clinical-grade automated NIBP Blood Pressure, Pulse Rate, and Oxygen Saturation monitoring.",
    "bm": "Clinical-grade automated NIBP Blood Pressure, Pulse Rate, and Oxygen Saturation monitoring.",
    "ta": "Clinical-grade automated NIBP Blood Pressure, Pulse Rate, and Oxygen Saturation monitoring."
  },
  "量身定制·科学照护：": {
    "zh": "量身定制·科学照护：",
    "bm": "量身定制·科学照护：",
    "ta": "量身定制·科学照护："
  },
  "v2.4 · 2.1 MB · PC & Workstations · Standalone": {
    "zh": "v2.4 · 2.1 MB · PC & Workstations · Standalone",
    "bm": "v2.4 · 2.1 MB · PC & Workstations · Standalone",
    "ta": "v2.4 · 2.1 MB · PC & Workstations · Standalone"
  },
  "RM 120.00": {
    "zh": "RM 120.00",
    "bm": "RM 120.00",
    "ta": "RM 120.00"
  },
  "注射 · 打点滴（输液）": {
    "zh": "注射 · 打点滴（输液）",
    "bm": "注射 · 打点滴（输液）",
    "ta": "注射 · 打点滴（输液）"
  },
  "🖨 Print Summary": {
    "zh": "🖨 Print Summary",
    "bm": "🖨 Print Summary",
    "ta": "🖨 Print Summary"
  },
  "Case Code or Phone ·": {
    "zh": "Case Code or Phone ·",
    "bm": "Case Code or Phone ·",
    "ta": "Case Code or Phone ·"
  },
  "Pick a visiting time": {
    "zh": "Pick a visiting time",
    "bm": "Pick a visiting time",
    "ta": "Pick a visiting time"
  },
  "Gleneagles Hospital Penang": {
    "zh": "Gleneagles Hospital Penang",
    "bm": "Gleneagles Hospital Penang",
    "ta": "Gleneagles Hospital Penang"
  },
  "💊 Medication Sheet (用药记录)": {
    "zh": "💊 Medication Sheet (用药记录)",
    "bm": "💊 Medication Sheet (用药记录)",
    "ta": "💊 Medication Sheet (用药记录)"
  },
  "Preferred date": {
    "zh": "Preferred date",
    "bm": "Preferred date",
    "ta": "Preferred date"
  },
  "e.g. No 8, Taman Kota Permai, Bukit Mertajam": {
    "zh": "e.g. No 8, Taman Kota Permai, Bukit Mertajam",
    "bm": "e.g. No 8, Taman Kota Permai, Bukit Mertajam",
    "ta": "e.g. No 8, Taman Kota Permai, Bukit Mertajam"
  },
  "Encrypted medical file repository for hospital discharge summaries, doctor prescriptions, and laboratory reports.": {
    "zh": "Encrypted medical file repository for hospital discharge summaries, doctor prescriptions, and laboratory reports.",
    "bm": "Encrypted medical file repository for hospital discharge summaries, doctor prescriptions, and laboratory reports.",
    "ta": "Encrypted medical file repository for hospital discharge summaries, doctor prescriptions, and laboratory reports."
  },
  "Active Coordination (就近协调·迅速回复)": {
    "zh": "Active Coordination (就近协调·迅速回复)",
    "bm": "Active Coordination (就近协调·迅速回复)",
    "ta": "Active Coordination (就近协调·迅速回复)"
  },
  "Patient & Family Care Guides": {
    "zh": "Patient & Family Care Guides",
    "bm": "Patient & Family Care Guides",
    "ta": "Patient & Family Care Guides"
  },
  "Install app · 安装应用": {
    "zh": "Install app · 安装应用",
    "bm": "Install app · 安装应用",
    "ta": "Install app · 安装应用"
  },
  "Private Home Nursing & Healthcare Services · Registered with Lembaga Jururawat Malaysia (LJM)": {
    "zh": "Private Home Nursing & Healthcare Services · Registered with Lembaga Jururawat Malaysia (LJM)",
    "bm": "Private Home Nursing & Healthcare Services · Registered with Lembaga Jururawat Malaysia (LJM)",
    "ta": "Private Home Nursing & Healthcare Services · Registered with Lembaga Jururawat Malaysia (LJM)"
  },
  "Stop Feeding Immediately If:": {
    "zh": "Stop Feeding Immediately If:",
    "bm": "Stop Feeding Immediately If:",
    "ta": "Stop Feeding Immediately If:"
  },
  "below bladder level": {
    "zh": "below bladder level",
    "bm": "below bladder level",
    "ta": "below bladder level"
  },
  "General Line:": {
    "zh": "General Line:",
    "bm": "General Line:",
    "ta": "General Line:"
  },
  "☎ 04-228 8222": {
    "zh": "☎ 04-228 8222",
    "bm": "☎ 04-228 8222",
    "ta": "☎ 04-228 8222"
  },
  "Delivers continuous 90–96% high-purity medical oxygen without heavy gas cylinders.": {
    "zh": "Delivers continuous 90–96% high-purity medical oxygen without heavy gas cylinders.",
    "bm": "Delivers continuous 90–96% high-purity medical oxygen without heavy gas cylinders.",
    "ta": "Delivers continuous 90–96% high-purity medical oxygen without heavy gas cylinders."
  },
  "RM 15 – RM 45 / pack": {
    "zh": "RM 15 – RM 45 / pack",
    "bm": "RM 15 – RM 45 / pack",
    "ta": "RM 15 – RM 45 / pack"
  },
  "WhatsApp Consultation": {
    "zh": "WhatsApp Consultation",
    "bm": "WhatsApp Consultation",
    "ta": "WhatsApp Consultation"
  },
  "只想咨询": {
    "zh": "只想咨询",
    "bm": "只想咨询",
    "ta": "只想咨询"
  },
  "Download Assura Nursing App · Android APK & Windows Desktop": {
    "zh": "Download Assura Nursing App · Android APK & Windows Desktop",
    "bm": "Download Assura Nursing App · Android APK & Windows Desktop",
    "ta": "Download Assura Nursing App · Android APK & Windows Desktop"
  },
  "↑ Back to the form · 返回表格": {
    "zh": "↑ Back to the form · 返回表格",
    "bm": "↑ Back to the form · 返回表格",
    "ta": "↑ Back to the form · 返回表格"
  },
  ") 或手机号，即可实时查看护士每次上门记录的 MEWS 生命体征评分与给药打卡。": {
    "zh": ") 或手机号，即可实时查看护士每次上门记录的 MEWS 生命体征评分与给药打卡。",
    "bm": ") 或手机号，即可实时查看护士每次上门记录的 MEWS 生命体征评分与给药打卡。",
    "ta": ") 或手机号，即可实时查看护士每次上门记录的 MEWS 生命体征评分与给药打卡。"
  },
  "☎ 012-206 4868": {
    "zh": "☎ 012-206 4868",
    "bm": "☎ 012-206 4868",
    "ta": "☎ 012-206 4868"
  },
  "Licensed Nurses & Trained Caregivers · Home visits only · Transparent quotation before every visit": {
    "zh": "Licensed Nurses & Trained Caregivers · Home visits only · Transparent quotation before every visit",
    "bm": "Licensed Nurses & Trained Caregivers · Home visits only · Transparent quotation before every visit",
    "ta": "Licensed Nurses & Trained Caregivers · Home visits only · Transparent quotation before every visit"
  },
  "Patient coughs persistently, vomits, experiences choking, or struggles to breathe.": {
    "zh": "Patient coughs persistently, vomits, experiences choking, or struggles to breathe.",
    "bm": "Patient coughs persistently, vomits, experiences choking, or struggles to breathe.",
    "ta": "Patient coughs persistently, vomits, experiences choking, or struggles to breathe."
  },
  "Tap": {
    "zh": "Tap",
    "bm": "Tap",
    "ta": "Tap"
  },
  "Any (No preference / 均可)": {
    "zh": "Any (No preference / 均可)",
    "bm": "Any (No preference / 均可)",
    "ta": "Any (No preference / 均可)"
  },
  "All clinical charts, nurse recordings, and patient data are strictly protected under the Malaysian Personal Data Protection Act 2010. Unauthorized photography or secondary dissemination is prohibited.": {
    "zh": "All clinical charts, nurse recordings, and patient data are strictly protected under the Malaysian Personal Data Protection Act 2010. Unauthorized photography or secondary dissemination is prohibited.",
    "bm": "All clinical charts, nurse recordings, and patient data are strictly protected under the Malaysian Personal Data Protection Act 2010. Unauthorized photography or secondary dissemination is prohibited.",
    "ta": "All clinical charts, nurse recordings, and patient data are strictly protected under the Malaysian Personal Data Protection Act 2010. Unauthorized photography or secondary dissemination is prohibited."
  },
  "Please choose a time.": {
    "zh": "Please choose a time.",
    "bm": "Please choose a time.",
    "ta": "Please choose a time."
  },
  "Do Not Crush:": {
    "zh": "Do Not Crush:",
    "bm": "Do Not Crush:",
    "ta": "Do Not Crush:"
  },
  "Flip-up armrests for seamless lateral sliding transfers from bed with waterproof padded commode seat.": {
    "zh": "Flip-up armrests for seamless lateral sliding transfers from bed with waterproof padded commode seat.",
    "bm": "Flip-up armrests for seamless lateral sliding transfers from bed with waterproof padded commode seat.",
    "ta": "Flip-up armrests for seamless lateral sliding transfers from bed with waterproof padded commode seat."
  },
  "Step-by-Step Practical Guidelines": {
    "zh": "Step-by-Step Practical Guidelines",
    "bm": "Step-by-Step Practical Guidelines",
    "ta": "Step-by-Step Practical Guidelines"
  },
  "Pin to Taskbar or Desktop for 1-click clinical workstation access.": {
    "zh": "Pin to Taskbar or Desktop for 1-click clinical workstation access.",
    "bm": "Pin to Taskbar or Desktop for 1-click clinical workstation access.",
    "ta": "Pin to Taskbar or Desktop for 1-click clinical workstation access."
  },
  "同一个 App 所有人通用": {
    "zh": "同一个 App 所有人通用",
    "bm": "同一个 App 所有人通用",
    "ta": "同一个 App 所有人通用"
  },
  "Enforce a strict 2-hourly turning schedule (Left lateral → Supine → Right lateral).": {
    "zh": "Enforce a strict 2-hourly turning schedule (Left lateral → Supine → Right lateral).",
    "bm": "Enforce a strict 2-hourly turning schedule (Left lateral → Supine → Right lateral).",
    "ta": "Enforce a strict 2-hourly turning schedule (Left lateral → Supine → Right lateral)."
  },
  "1. Check & Call:": {
    "zh": "1. Check & Call:",
    "bm": "1. Check & Call:",
    "ta": "1. Check & Call:"
  },
  "🎬 Watch Guide Video & Read Memo": {
    "zh": "🎬 Watch Guide Video & Read Memo",
    "bm": "🎬 Watch Guide Video & Read Memo",
    "ta": "🎬 Watch Guide Video & Read Memo"
  },
  "Pair regular turning with a 3-function electric bed and alternating ripple mattress for 100% bedsore prevention.": {
    "zh": "Pair regular turning with a 3-function electric bed and alternating ripple mattress for 100% bedsore prevention.",
    "bm": "Pair regular turning with a 3-function electric bed and alternating ripple mattress for 100% bedsore prevention.",
    "ta": "Pair regular turning with a 3-function electric bed and alternating ripple mattress for 100% bedsore prevention."
  },
  "：公众、患者、家属与注册护士均下载同一款": {
    "zh": "：公众、患者、家属与注册护士均下载同一款",
    "bm": "：公众、患者、家属与注册护士均下载同一款",
    "ta": "：公众、患者、家属与注册护士均下载同一款"
  },
  "🏥 Penang Island Hospitals (Government & Private)": {
    "zh": "🏥 Penang Island Hospitals (Government & Private)",
    "bm": "🏥 Penang Island Hospitals (Government & Private)",
    "ta": "🏥 Penang Island Hospitals (Government & Private)"
  },
  "to save": {
    "zh": "to save",
    "bm": "to save",
    "ta": "to save"
  },
  "Bed-Bound Patient Care": {
    "zh": "Bed-Bound Patient Care",
    "bm": "Bed-Bound Patient Care",
    "ta": "Bed-Bound Patient Care"
  },
  "\"Every family's home is unique. When patients return home after surgery or illness, they need professional, trained nurses who understand how to plan care around their specific living space—minimizing infection risks through strict hygiene and aseptic handling, while keeping patient safety and comfort at the center.\"": {
    "zh": "\"Every family's home is unique. When patients return home after surgery or illness, they need professional, trained nurses who understand how to plan care around their specific living space—minimizing infection risks through strict hygiene and aseptic handling, while keeping patient safety and comfort at the center.\"",
    "bm": "\"Every family's home is unique. When patients return home after surgery or illness, they need professional, trained nurses who understand how to plan care around their specific living space—minimizing infection risks through strict hygiene and aseptic handling, while keeping patient safety and comfort at the center.\"",
    "ta": "\"Every family's home is unique. When patients return home after surgery or illness, they need professional, trained nurses who understand how to plan care around their specific living space—minimizing infection risks through strict hygiene and aseptic handling, while keeping patient safety and comfort at the center.\""
  },
  "☎ 04-238 8888": {
    "zh": "☎ 04-238 8888",
    "bm": "☎ 04-238 8888",
    "ta": "☎ 04-238 8888"
  },
  "WhatsApp": {
    "zh": "WhatsApp",
    "bm": "WhatsApp",
    "ta": "WhatsApp"
  },
  "时间": {
    "zh": "时间",
    "bm": "时间",
    "ta": "时间"
  },
  "🛡️ PDPA Privacy & Consent": {
    "zh": "🛡️ PDPA Privacy & Consent",
    "bm": "🛡️ PDPA Privacy & Consent",
    "ta": "🛡️ PDPA Privacy & Consent"
  },
  "🏥 Hospital Escort & Transfer": {
    "zh": "🏥 Hospital Escort & Transfer",
    "bm": "🏥 Hospital Escort & Transfer",
    "ta": "🏥 Hospital Escort & Transfer"
  },
  "🚨 24/7 Hospital Emergency GPS": {
    "zh": "🚨 24/7 Hospital Emergency GPS",
    "bm": "🚨 24/7 Hospital Emergency GPS",
    "ta": "🚨 24/7 Hospital Emergency GPS"
  },
  "Standalone portable application — no complex installation needed.": {
    "zh": "Standalone portable application — no complex installation needed.",
    "bm": "Standalone portable application — no complex installation needed.",
    "ta": "Standalone portable application — no complex installation needed."
  },
  "06:00, 12:00, 18:00, 22:00 (6-hour intervals)": {
    "zh": "06:00, 12:00, 18:00, 22:00 (6-hour intervals)",
    "bm": "06:00, 12:00, 18:00, 22:00 (6-hour intervals)",
    "ta": "06:00, 12:00, 18:00, 22:00 (6-hour intervals)"
  },
  "v2.4 · Android APK · Windows EXE · Web PWA": {
    "zh": "v2.4 · Android APK · Windows EXE · Web PWA",
    "bm": "v2.4 · Android APK · Windows EXE · Web PWA",
    "ta": "v2.4 · Android APK · Windows EXE · Web PWA"
  },
  "Single-use gamma-sterilized basic & complex dressing sets with forceps, gauze swabs, and drapes.": {
    "zh": "Single-use gamma-sterilized basic & complex dressing sets with forceps, gauze swabs, and drapes.",
    "bm": "Single-use gamma-sterilized basic & complex dressing sets with forceps, gauze swabs, and drapes.",
    "ta": "Single-use gamma-sterilized basic & complex dressing sets with forceps, gauze swabs, and drapes."
  },
  "患者与家属": {
    "zh": "患者与家属",
    "bm": "患者与家属",
    "ta": "患者与家属"
  },
  "Staff ID Login.": {
    "zh": "Staff ID Login.",
    "bm": "Staff ID Login.",
    "ta": "Staff ID Login."
  },
  "ASN-8821": {
    "zh": "ASN-8821",
    "bm": "ASN-8821",
    "ta": "ASN-8821"
  },
  "Verify tube marking at nose and check gastric residual volume with a 50ml syringe.": {
    "zh": "Verify tube marking at nose and check gastric residual volume with a 50ml syringe.",
    "bm": "Verify tube marking at nose and check gastric residual volume with a 50ml syringe.",
    "ta": "Verify tube marking at nose and check gastric residual volume with a 50ml syringe."
  },
  "恪守根本·降低感染风险：": {
    "zh": "恪守根本·降低感染风险：",
    "bm": "恪守根本·降低感染风险：",
    "ta": "恪守根本·降低感染风险："
  },
  "e.g. Tan Ah Kow / Jason Tan": {
    "zh": "e.g. Tan Ah Kow / Jason Tan",
    "bm": "e.g. Tan Ah Kow / Jason Tan",
    "ta": "e.g. Tan Ah Kow / Jason Tan"
  },
  "Urinary Catheter Change": {
    "zh": "Urinary Catheter Change",
    "bm": "Urinary Catheter Change",
    "ta": "Urinary Catheter Change"
  },
  "Based in": {
    "zh": "Based in",
    "bm": "Based in",
    "ta": "Based in"
  },
  "更换尿管（导尿管）": {
    "zh": "更换尿管（导尿管）",
    "bm": "更换尿管（导尿管）",
    "ta": "更换尿管（导尿管）"
  },
  "admin@assuranursing.com": {
    "zh": "admin@assuranursing.com",
    "bm": "admin@assuranursing.com",
    "ta": "admin@assuranursing.com"
  },
  "Alerts & Live Case Status": {
    "zh": "Alerts & Live Case Status",
    "bm": "Alerts & Live Case Status",
    "ta": "Alerts & Live Case Status"
  },
  "Clinical Integrity (专业严谨)": {
    "zh": "Clinical Integrity (专业严谨)",
    "bm": "Clinical Integrity (专业严谨)",
    "ta": "Clinical Integrity (专业严谨)"
  },
  "National Emergency Toll-Free": {
    "zh": "National Emergency Toll-Free",
    "bm": "National Emergency Toll-Free",
    "ta": "National Emergency Toll-Free"
  },
  "End-of-Life Care": {
    "zh": "End-of-Life Care",
    "bm": "End-of-Life Care",
    "ta": "End-of-Life Care"
  },
  "e.g. 0123456789": {
    "zh": "e.g. 0123456789",
    "bm": "e.g. 0123456789",
    "ta": "e.g. 0123456789"
  },
  "🩹 Complex Wound Care": {
    "zh": "🩹 Complex Wound Care",
    "bm": "🩹 Complex Wound Care",
    "ta": "🩹 Complex Wound Care"
  },
  "Clinical Alert:": {
    "zh": "Clinical Alert:",
    "bm": "Clinical Alert:",
    "ta": "Clinical Alert:"
  },
  "Sterile Wound Dressing Pack (ANTT)": {
    "zh": "Sterile Wound Dressing Pack (ANTT)",
    "bm": "Sterile Wound Dressing Pack (ANTT)",
    "ta": "Sterile Wound Dressing Pack (ANTT)"
  },
  "24/7 Emergency Care:": {
    "zh": "24/7 Emergency Care:",
    "bm": "24/7 Emergency Care:",
    "ta": "24/7 Emergency Care:"
  },
  "Instant open access to procedures, transparent pricing calculators, emergency hospital GPS, and 1-tap WhatsApp nurse consultation.": {
    "zh": "Instant open access to procedures, transparent pricing calculators, emergency hospital GPS, and 1-tap WhatsApp nurse consultation.",
    "bm": "Instant open access to procedures, transparent pricing calculators, emergency hospital GPS, and 1-tap WhatsApp nurse consultation.",
    "ta": "Instant open access to procedures, transparent pricing calculators, emergency hospital GPS, and 1-tap WhatsApp nurse consultation."
  },
  "⏰ OD (Once Daily):": {
    "zh": "⏰ OD (Once Daily):",
    "bm": "⏰ OD (Once Daily):",
    "ta": "⏰ OD (Once Daily):"
  },
  "预约摘要 · Check this before you send. Nothing is sent until you tap the button.": {
    "zh": "预约摘要 · Check this before you send. Nothing is sent until you tap the button.",
    "bm": "预约摘要 · Check this before you send. Nothing is sent until you tap the button.",
    "ta": "预约摘要 · Check this before you send. Nothing is sent until you tap the button."
  },
  "☎ 04-327 8888": {
    "zh": "☎ 04-327 8888",
    "bm": "☎ 04-327 8888",
    "ta": "☎ 04-327 8888"
  },
  "If prompted with": {
    "zh": "If prompted with",
    "bm": "If prompted with",
    "ta": "If prompted with"
  },
  "上门地址与联系方式": {
    "zh": "上门地址与联系方式",
    "bm": "上门地址与联系方式",
    "ta": "上门地址与联系方式"
  },
  "Launch Web App": {
    "zh": "启动网页应用",
    "bm": "Buka Aplikasi Web",
    "ta": "வலை செயலியைத் திறக்கவும்"
  },
  "e.g. Tracheostomy suctioning, PICC line dressing, pediatric care, stoma bag care, special wound, or specific hospital requirements... (例如：气管切开吸痰、PICC换药、造口护理、小儿护理或特定需求)": {
    "zh": "e.g. Tracheostomy suctioning, PICC line dressing, pediatric care, stoma bag care, special wound, or specific hospital requirements... (例如：气管切开吸痰、PICC换药、造口护理、小儿护理或特定需求)",
    "bm": "e.g. Tracheostomy suctioning, PICC line dressing, pediatric care, stoma bag care, special wound, or specific hospital requirements... (例如：气管切开吸痰、PICC换药、造口护理、小儿护理或特定需求)",
    "ta": "e.g. Tracheostomy suctioning, PICC line dressing, pediatric care, stoma bag care, special wound, or specific hospital requirements... (例如：气管切开吸痰、PICC换药、造口护理、小儿护理或特定需求)"
  },
  "致力于在槟城打造一个值得信赖的数智化居家照护服务，以透明收费、严谨医疗规范、智能健康记录与真诚关怀守护每个家庭。": {
    "zh": "致力于在槟城打造一个值得信赖的数智化居家照护服务，以透明收费、严谨医疗规范、智能健康记录与真诚关怀守护每个家庭。",
    "bm": "致力于在槟城打造一个值得信赖的数智化居家照护服务，以透明收费、严谨医疗规范、智能健康记录与真诚关怀守护每个家庭。",
    "ta": "致力于在槟城打造一个值得信赖的数智化居家照护服务，以透明收费、严谨医疗规范、智能健康记录与真诚关怀守护每个家庭。"
  },
  "Place supportive pillows between knees, under affected arm, and floating heels.": {
    "zh": "Place supportive pillows between knees, under affected arm, and floating heels.",
    "bm": "Place supportive pillows between knees, under affected arm, and floating heels.",
    "ta": "Place supportive pillows between knees, under affected arm, and floating heels."
  },
  "☎ 04-222 9199": {
    "zh": "☎ 04-222 9199",
    "bm": "☎ 04-222 9199",
    "ta": "☎ 04-222 9199"
  },
  "SPECIFY YOUR REQUIRED SERVICE · 请输入您需要的特定护理服务或具体要求": {
    "zh": "SPECIFY YOUR REQUIRED SERVICE · 请输入您需要的特定护理服务或具体要求",
    "bm": "SPECIFY YOUR REQUIRED SERVICE · 请输入您需要的特定护理服务或具体要求",
    "ta": "SPECIFY YOUR REQUIRED SERVICE · 请输入您需要的特定护理服务或具体要求"
  },
  "View Specifications & Advice →": {
    "zh": "View Specifications & Advice →",
    "bm": "View Specifications & Advice →",
    "ta": "View Specifications & Advice →"
  },
  "Create 4-8 digit PIN": {
    "zh": "Create 4-8 digit PIN",
    "bm": "Create 4-8 digit PIN",
    "ta": "Create 4-8 digit PIN"
  },
  "Electric Medical Suction Machine": {
    "zh": "Electric Medical Suction Machine",
    "bm": "Electric Medical Suction Machine",
    "ta": "Electric Medical Suction Machine"
  },
  "🩺 Direct Staff Workspace Link (医护工作台通道) →": {
    "zh": "🩺 Direct Staff Workspace Link (医护工作台通道) →",
    "bm": "🩺 Direct Staff Workspace Link (医护工作台通道) →",
    "ta": "🩺 Direct Staff Workspace Link (医护工作台通道) →"
  },
  "Malaysian Red Crescent (BSMM)": {
    "zh": "Malaysian Red Crescent (BSMM)",
    "bm": "Malaysian Red Crescent (BSMM)",
    "ta": "Malaysian Red Crescent (BSMM)"
  },
  "If this is a medical emergency — chest pain, trouble breathing, severe bleeding, unconscious, stroke signs — call 999 now.": {
    "zh": "If this is a medical emergency — chest pain, trouble breathing, severe bleeding, unconscious, stroke signs — call 999 now.",
    "bm": "If this is a medical emergency — chest pain, trouble breathing, severe bleeding, unconscious, stroke signs — call 999 now.",
    "ta": "If this is a medical emergency — chest pain, trouble breathing, severe bleeding, unconscious, stroke signs — call 999 now."
  },
  "📌 Official User Guide Memo (使用要点备忘):": {
    "zh": "📌 Official User Guide Memo (使用要点备忘):",
    "bm": "📌 Official User Guide Memo (使用要点备忘):",
    "ta": "📌 Official User Guide Memo (使用要点备忘):"
  },
  "☎ 04-222 9111": {
    "zh": "☎ 04-222 9111",
    "bm": "☎ 04-222 9111",
    "ta": "☎ 04-222 9111"
  },
  "）即可同步查看主治护士记录的生命体征图表与用药打卡。": {
    "zh": "）即可同步查看主治护士记录的生命体征图表与用药打卡。",
    "bm": "）即可同步查看主治护士记录的生命体征图表与用药打卡。",
    "ta": "）即可同步查看主治护士记录的生命体征图表与用药打卡。"
  },
  "PIN": {
    "zh": "PIN",
    "bm": "PIN",
    "ta": "PIN"
  },
  "Patient (Wound Care)": {
    "zh": "Patient (Wound Care)",
    "bm": "Patient (Wound Care)",
    "ta": "Patient (Wound Care)"
  },
  "⚡ Estimate Rate": {
    "zh": "⚡ Estimate Rate",
    "bm": "⚡ Estimate Rate",
    "ta": "⚡ Estimate Rate"
  },
  "☎ 04-548 6688": {
    "zh": "☎ 04-548 6688",
    "bm": "☎ 04-548 6688",
    "ta": "☎ 04-548 6688"
  },
  "RM 120 – RM 200 / mo": {
    "zh": "RM 120 – RM 200 / mo",
    "bm": "RM 120 – RM 200 / mo",
    "ta": "RM 120 – RM 200 / mo"
  },
  "RM 50 – RM 80 / mo": {
    "zh": "RM 50 – RM 80 / mo",
    "bm": "RM 50 – RM 80 / mo",
    "ta": "RM 50 – RM 80 / mo"
  },
  "Status": {
    "zh": "Status",
    "bm": "Status",
    "ta": "Status"
  },
  "地址": {
    "zh": "地址",
    "bm": "地址",
    "ta": "地址"
  },
  "RM 180 – RM 320 / mo": {
    "zh": "RM 180 – RM 320 / mo",
    "bm": "RM 180 – RM 320 / mo",
    "ta": "RM 180 – RM 320 / mo"
  },
  "⚠️": {
    "zh": "⚠️",
    "bm": "⚠️",
    "ta": "⚠️"
  },
  "24/7 Disaster & Medical Emergency": {
    "zh": "24/7 Disaster & Medical Emergency",
    "bm": "24/7 Disaster & Medical Emergency",
    "ta": "24/7 Disaster & Medical Emergency"
  },
  "Choose services": {
    "zh": "Choose services",
    "bm": "Choose services",
    "ta": "Choose services"
  },
  "☎ 04-827 5684": {
    "zh": "☎ 04-827 5684",
    "bm": "☎ 04-827 5684",
    "ta": "☎ 04-827 5684"
  },
  "Back to Home": {
    "zh": "Back to Home",
    "bm": "Back to Home",
    "ta": "Back to Home"
  },
  "Male Nurse / Caregiver (男护士/男护理师)": {
    "zh": "Male Nurse / Caregiver (男护士/男护理师)",
    "bm": "Male Nurse / Caregiver (男护士/男护理师)",
    "ta": "Male Nurse / Caregiver (男护士/男护理师)"
  },
  "💉 Medication & Injections": {
    "zh": "💉 Medication & Injections",
    "bm": "💉 Medication & Injections",
    "ta": "💉 Medication & Injections"
  },
  "Stroke Rehab & Mobility Exercise (1.5 hr) · RM 250": {
    "zh": "Stroke Rehab & Mobility Exercise (1.5 hr) · RM 250",
    "bm": "Stroke Rehab & Mobility Exercise (1.5 hr) · RM 250",
    "ta": "Stroke Rehab & Mobility Exercise (1.5 hr) · RM 250"
  },
  "⏰ ON (Nightly):": {
    "zh": "⏰ ON (Nightly):",
    "bm": "⏰ ON (Nightly):",
    "ta": "⏰ ON (Nightly):"
  },
  "Scan to share": {
    "zh": "Scan to share",
    "bm": "Scan to share",
    "ta": "Scan to share"
  },
  "2. Position Hands:": {
    "zh": "2. Position Hands:",
    "bm": "2. Position Hands:",
    "ta": "2. Position Hands:"
  },
  "Step 3: Staff Portal": {
    "zh": "Step 3: Staff Portal",
    "bm": "Step 3: Staff Portal",
    "ta": "Step 3: Staff Portal"
  },
  "The pin is what gets the nurse to your gate — an address alone often stops at the street.": {
    "zh": "The pin is what gets the nurse to your gate — an address alone often stops at the street.",
    "bm": "The pin is what gets the nurse to your gate — an address alone often stops at the street.",
    "ta": "The pin is what gets the nurse to your gate — an address alone often stops at the street."
  },
  "🎬 First-Time User Guide Video & Memo (首次使用指南)": {
    "zh": "🎬 First-Time User Guide Video & Memo (首次使用指南)",
    "bm": "🎬 First-Time User Guide Video & Memo (首次使用指南)",
    "ta": "🎬 First-Time User Guide Video & Memo (首次使用指南)"
  },
  "资料只存于本手机，发送前我们不会看到。": {
    "zh": "资料只存于本手机，发送前我们不会看到。",
    "bm": "资料只存于本手机，发送前我们不会看到。",
    "ta": "资料只存于本手机，发送前我们不会看到。"
  },
  "其他需求 · 欢迎询问": {
    "zh": "其他需求 · 欢迎询问",
    "bm": "其他需求 · 欢迎询问",
    "ta": "其他需求 · 欢迎询问"
  },
  "Perform gentle peri-care twice daily with mild soap and clean warm water.": {
    "zh": "Perform gentle peri-care twice daily with mild soap and clean warm water.",
    "bm": "Perform gentle peri-care twice daily with mild soap and clean warm water.",
    "ta": "Perform gentle peri-care twice daily with mild soap and clean warm water."
  },
  "24小时全天候上门时段（全槟24/7轮班护理），确切时间将由我们在 WhatsApp 确认。": {
    "zh": "24小时全天候上门时段（全槟24/7轮班护理），确切时间将由我们在 WhatsApp 确认。",
    "bm": "24小时全天候上门时段（全槟24/7轮班护理），确切时间将由我们在 WhatsApp 确认。",
    "ta": "24小时全天候上门时段（全槟24/7轮班护理），确切时间将由我们在 WhatsApp 确认。"
  },
  "Mobile Phone Emergency": {
    "zh": "Mobile Phone Emergency",
    "bm": "Mobile Phone Emergency",
    "ta": "Mobile Phone Emergency"
  },
  "Rental:": {
    "zh": "Rental:",
    "bm": "Rental:",
    "ta": "Rental:"
  },
  "Tanjung Bungah / Batu Ferringhi": {
    "zh": "Tanjung Bungah / Batu Ferringhi",
    "bm": "Tanjung Bungah / Batu Ferringhi",
    "ta": "Tanjung Bungah / Batu Ferringhi"
  },
  "💬 Chat with Our Care Team (012-206 4868)": {
    "zh": "💬 Chat with Our Care Team (012-206 4868)",
    "bm": "💬 Chat with Our Care Team (012-206 4868)",
    "ta": "💬 Chat with Our Care Team (012-206 4868)"
  },
  "Select your nursing procedure and Penang location for transparent procedure rates across all Penang areas (No initial travel surcharge):": {
    "zh": "Select your nursing procedure and Penang location for transparent procedure rates across all Penang areas (No initial travel surcharge):",
    "bm": "Select your nursing procedure and Penang location for transparent procedure rates across all Penang areas (No initial travel surcharge):",
    "ta": "Select your nursing procedure and Penang location for transparent procedure rates across all Penang areas (No initial travel surcharge):"
  },
  "Private Specialist": {
    "zh": "Private Specialist",
    "bm": "Private Specialist",
    "ta": "Private Specialist"
  },
  "Phone": {
    "zh": "Phone",
    "bm": "Phone",
    "ta": "Phone"
  },
  "：在 App 内切换至「医护人员工号登录」，输入 Staff ID 即可接单、记录生命体征与交班。": {
    "zh": "：在 App 内切换至「医护人员工号登录」，输入 Staff ID 即可接单、记录生命体征与交班。",
    "bm": "：在 App 内切换至「医护人员工号登录」，输入 Staff ID 即可接单、记录生命体征与交班。",
    "ta": "：在 App 内切换至「医护人员工号登录」，输入 Staff ID 即可接单、记录生命体征与交班。"
  },
  "❤️ Adult Hands-Only CPR & 110 BPM Metronome": {
    "zh": "❤️ Adult Hands-Only CPR & 110 BPM Metronome",
    "bm": "❤️ Adult Hands-Only CPR & 110 BPM Metronome",
    "ta": "❤️ Adult Hands-Only CPR & 110 BPM Metronome"
  },
  "Your name": {
    "zh": "Your name",
    "bm": "Your name",
    "ta": "Your name"
  },
  "为槟城每一个家庭提供规范、专业且量身定制的到府医护服务，因地制宜规划家庭护理方案，严守医疗无菌规范与护理根本，让病患在家庭温暖中安全尊严地康复。": {
    "zh": "为槟城每一个家庭提供规范、专业且量身定制的到府医护服务，因地制宜规划家庭护理方案，严守医疗无菌规范与护理根本，让病患在家庭温暖中安全尊严地康复。",
    "bm": "为槟城每一个家庭提供规范、专业且量身定制的到府医护服务，因地制宜规划家庭护理方案，严守医疗无菌规范与护理根本，让病患在家庭温暖中安全尊严地康复。",
    "ta": "为槟城每一个家庭提供规范、专业且量身定制的到府医护服务，因地制宜规划家庭护理方案，严守医疗无菌规范与护理根本，让病患在家庭温暖中安全尊严地康复。"
  },
  "How to Install Android APK:": {
    "zh": "How to Install Android APK:",
    "bm": "How to Install Android APK:",
    "ta": "How to Install Android APK:"
  },
  "Tap shoulders, shout \"Are you OK?\". Dial 999 or 112 on speakerphone.": {
    "zh": "Tap shoulders, shout \"Are you OK?\". Dial 999 or 112 on speakerphone.",
    "bm": "Tap shoulders, shout \"Are you OK?\". Dial 999 or 112 on speakerphone.",
    "ta": "Tap shoulders, shout \"Are you OK?\". Dial 999 or 112 on speakerphone."
  },
  "Call us · 拨打 012-206 4868": {
    "zh": "Call us · 拨打 012-206 4868",
    "bm": "Call us · 拨打 012-206 4868",
    "ta": "Call us · 拨打 012-206 4868"
  },
  "24/7 Emergency Line:": {
    "zh": "24/7 Emergency Line:",
    "bm": "24/7 Emergency Line:",
    "ta": "24/7 Emergency Line:"
  },
  "Home Nursing & Nurse Dispatch": {
    "zh": "Home Nursing & Nurse Dispatch",
    "bm": "Home Nursing & Nurse Dispatch",
    "ta": "Home Nursing & Nurse Dispatch"
  },
  "Direct EXE Mirror": {
    "zh": "直接下载 EXE 安装包",
    "bm": "Muat Turun Terus EXE",
    "ta": "நேரடி EXE பதிவிறக்கம்"
  },
  "ASN-002": {
    "zh": "ASN-002",
    "bm": "ASN-002",
    "ta": "ASN-002"
  },
  "We travel": {
    "zh": "We travel",
    "bm": "We travel",
    "ta": "We travel"
  },
  "uncompromising adherence to the core fundamentals of nursing care": {
    "zh": "uncompromising adherence to the core fundamentals of nursing care",
    "bm": "uncompromising adherence to the core fundamentals of nursing care",
    "ta": "uncompromising adherence to the core fundamentals of nursing care"
  },
  "to solve this exact challenge: our nurses and caregivers are trained to evaluate the home setting, plan safe bedside workflows, and guide family members—all while strictly adhering to Malaysian Ministry of Health (MOH) and Nursing Board (LJM) clinical protocols.": {
    "zh": "to solve this exact challenge: our nurses and caregivers are trained to evaluate the home setting, plan safe bedside workflows, and guide family members—all while strictly adhering to Malaysian Ministry of Health (MOH) and Nursing Board (LJM) clinical protocols.",
    "bm": "to solve this exact challenge: our nurses and caregivers are trained to evaluate the home setting, plan safe bedside workflows, and guide family members—all while strictly adhering to Malaysian Ministry of Health (MOH) and Nursing Board (LJM) clinical protocols.",
    "ta": "to solve this exact challenge: our nurses and caregivers are trained to evaluate the home setting, plan safe bedside workflows, and guide family members—all while strictly adhering to Malaysian Ministry of Health (MOH) and Nursing Board (LJM) clinical protocols."
  },
  "🏥 Hospital Acute Care Background": {
    "zh": "🏥 Hospital Acute Care Background",
    "bm": "🏥 Hospital Acute Care Background",
    "ta": "🏥 Hospital Acute Care Background"
  },
  "Web PWA · Any Browser · No Installation": {
    "zh": "Web PWA · Any Browser · No Installation",
    "bm": "Web PWA · Any Browser · No Installation",
    "ta": "Web PWA · Any Browser · No Installation"
  },
  "from your Downloads folder.": {
    "zh": "from your Downloads folder.",
    "bm": "from your Downloads folder.",
    "ta": "from your Downloads folder."
  },
  "Transparent Rates (透明合理收费)": {
    "zh": "Transparent Rates (透明合理收费)",
    "bm": "Transparent Rates (透明合理收费)",
    "ta": "Transparent Rates (透明合理收费)"
  },
  "Jalan Bagan 1, 13400 Butterworth, Penang": {
    "zh": "Jalan Bagan 1, 13400 Butterworth, Penang",
    "bm": "Jalan Bagan 1, 13400 Butterworth, Penang",
    "ta": "Jalan Bagan 1, 13400 Butterworth, Penang"
  },
  "吴乃添": {
    "zh": "吴乃添",
    "bm": "吴乃添",
    "ta": "吴乃添"
  },
  "Times": {
    "zh": "Times",
    "bm": "Times",
    "ta": "Times"
  },
  "Heel of one hand on center of chest (lower breastbone), interlock other hand on top.": {
    "zh": "Heel of one hand on center of chest (lower breastbone), interlock other hand on top.",
    "bm": "Heel of one hand on center of chest (lower breastbone), interlock other hand on top.",
    "ta": "Heel of one hand on center of chest (lower breastbone), interlock other hand on top."
  },
  "医护工号登录": {
    "zh": "医护工号登录",
    "bm": "医护工号登录",
    "ta": "医护工号登录"
  },
  "Caregiver Tip:": {
    "zh": "Caregiver Tip:",
    "bm": "Caregiver Tip:",
    "ta": "Caregiver Tip:"
  },
  "预约上门": {
    "zh": "预约上门",
    "bm": "预约上门",
    "ta": "预约上门"
  },
  "Admin (Director)": {
    "zh": "Admin (Director)",
    "bm": "Admin (Director)",
    "ta": "Admin (Director)"
  },
  "Direct APK Mirror": {
    "zh": "直接下载 APK 安装包",
    "bm": "Muat Turun Terus APK",
    "ta": "நேரடி APK பதிவிறக்கம்"
  },
  "Butterworth / Perai / Seberang Jaya": {
    "zh": "Butterworth / Perai / Seberang Jaya",
    "bm": "Butterworth / Perai / Seberang Jaya",
    "ta": "Butterworth / Perai / Seberang Jaya"
  },
  "更换鼻胃管（喂食管）": {
    "zh": "更换鼻胃管（喂食管）",
    "bm": "更换鼻胃管（喂食管）",
    "ta": "更换鼻胃管（喂食管）"
  },
  "🧠 Stroke Rehab & Mobility": {
    "zh": "🧠 Stroke Rehab & Mobility",
    "bm": "🧠 Stroke Rehab & Mobility",
    "ta": "🧠 Stroke Rehab & Mobility"
  },
  "Female Nurse / Caregiver": {
    "zh": "Female Nurse / Caregiver",
    "bm": "Female Nurse / Caregiver",
    "ta": "Female Nurse / Caregiver"
  },
  "选择护理项目": {
    "zh": "选择护理项目",
    "bm": "选择护理项目",
    "ta": "选择护理项目"
  },
  "Cleanse wound gently with sterile Normal Saline from the cleanest area outward.": {
    "zh": "Cleanse wound gently with sterile Normal Saline from the cleanest area outward.",
    "bm": "Cleanse wound gently with sterile Normal Saline from the cleanest area outward.",
    "ta": "Cleanse wound gently with sterile Normal Saline from the cleanest area outward."
  },
  "The Real Challenge We Solve (创办初心)": {
    "zh": "The Real Challenge We Solve (创办初心)",
    "bm": "The Real Challenge We Solve (创办初心)",
    "ta": "The Real Challenge We Solve (创办初心)"
  },
  "Offline Alerts & Notifications Active": {
    "zh": "Offline Alerts & Notifications Active",
    "bm": "Offline Alerts & Notifications Active",
    "ta": "Offline Alerts & Notifications Active"
  },
  "👤 Patient & Family": {
    "zh": "👤 Patient & Family",
    "bm": "👤 Patient & Family",
    "ta": "👤 Patient & Family"
  },
  "Protect vulnerable pressure points and maintain limb function in bedridden or post-stroke patients.": {
    "zh": "Protect vulnerable pressure points and maintain limb function in bedridden or post-stroke patients.",
    "bm": "Protect vulnerable pressure points and maintain limb function in bedridden or post-stroke patients.",
    "ta": "Protect vulnerable pressure points and maintain limb function in bedridden or post-stroke patients."
  },
  "Patient condition / notes": {
    "zh": "Patient condition / notes",
    "bm": "Patient condition / notes",
    "ta": "Patient condition / notes"
  },
  "🛏️ Medical Bed & Oxygen Rental": {
    "zh": "🛏️ Medical Bed & Oxygen Rental",
    "bm": "🛏️ Medical Bed & Oxygen Rental",
    "ta": "🛏️ Medical Bed & Oxygen Rental"
  },
  "Assura Nursing": {
    "zh": "Assura Nursing",
    "bm": "Assura Nursing",
    "ta": "Assura Nursing"
  },
  "Ryle's Tube Change": {
    "zh": "Ryle's Tube Change",
    "bm": "Ryle's Tube Change",
    "ta": "Ryle's Tube Change"
  },
  "📱 Official Unified Client": {
    "zh": "📱 Official Unified Client",
    "bm": "📱 Official Unified Client",
    "ta": "📱 Official Unified Client"
  },
  "陪诊 · 陪同复诊门诊": {
    "zh": "陪诊 · 陪同复诊门诊",
    "bm": "陪诊 · 陪同复诊门诊",
    "ta": "陪诊 · 陪同复诊门诊"
  },
  "日常起居协助 · 进食移动": {
    "zh": "日常起居协助 · 进食移动",
    "bm": "日常起居协助 · 进食移动",
    "ta": "日常起居协助 · 进食移动"
  },
  "正在接受护理的家属": {
    "zh": "正在接受护理的家属",
    "bm": "正在接受护理的家属",
    "ta": "正在接受护理的家属"
  },
  "PATIENT MEMBER ACCOUNT · 个人病历管理": {
    "zh": "PATIENT MEMBER ACCOUNT · 个人病历管理",
    "bm": "PATIENT MEMBER ACCOUNT · 个人病历管理",
    "ta": "PATIENT MEMBER ACCOUNT · 个人病历管理"
  },
  "卧床护理 · 翻身防褥疮": {
    "zh": "卧床护理 · 翻身防褥疮",
    "bm": "卧床护理 · 翻身防褥疮",
    "ta": "卧床护理 · 翻身防褥疮"
  },
  "Converts liquid respiratory medications into an inhalable fine aerosol mist for direct lung delivery.": {
    "zh": "Converts liquid respiratory medications into an inhalable fine aerosol mist for direct lung delivery.",
    "bm": "Converts liquid respiratory medications into an inhalable fine aerosol mist for direct lung delivery.",
    "ta": "Converts liquid respiratory medications into an inhalable fine aerosol mist for direct lung delivery."
  },
  "Patient / Family Representative Name (姓名)": {
    "zh": "Patient / Family Representative Name (姓名)",
    "bm": "Patient / Family Representative Name (姓名)",
    "ta": "Patient / Family Representative Name (姓名)"
  },
  "：已有护理个案的家庭，在门户输入 Case Access Code (如": {
    "zh": "：已有护理个案的家庭，在门户输入 Case Access Code (如",
    "bm": "：已有护理个案的家庭，在门户输入 Case Access Code (如",
    "ta": "：已有护理个案的家庭，在门户输入 Case Access Code (如"
  },
  "Patients/Family:": {
    "zh": "Patients/Family:",
    "bm": "Patients/Family:",
    "ta": "Patients/Family:"
  },
  "24 Hours Daily": {
    "zh": "24 Hours Daily",
    "bm": "24 Hours Daily",
    "ta": "24 Hours Daily"
  },
  "Basic Wound Dressing · Bukit Mertajam": {
    "zh": "Basic Wound Dressing · Bukit Mertajam",
    "bm": "Basic Wound Dressing · Bukit Mertajam",
    "ta": "Basic Wound Dressing · Bukit Mertajam"
  },
  "方圆 25 公里": {
    "zh": "方圆 25 公里",
    "bm": "方圆 25 公里",
    "ta": "方圆 25 公里"
  },
  "📈 MEWS Vitals (生命体征)": {
    "zh": "📈 MEWS Vitals (生命体征)",
    "bm": "📈 MEWS Vitals (生命体征)",
    "ta": "📈 MEWS Vitals (生命体征)"
  },
  ") 与 PIN 登录接单、记录生命体征与排班。": {
    "zh": ") 与 PIN 登录接单、记录生命体征与排班。",
    "bm": ") 与 PIN 登录接单、记录生命体征与排班。",
    "ta": ") 与 PIN 登录接单、记录生命体征与排班。"
  },
  "Got It (明白了)": {
    "zh": "Got It (明白了)",
    "bm": "Got It (明白了)",
    "ta": "Got It (明白了)"
  },
  "Protect healing tissue and prevent bacterial infection using certified Aseptic Non-Touch Technique (ANTT).": {
    "zh": "Protect healing tissue and prevent bacterial infection using certified Aseptic Non-Touch Technique (ANTT).",
    "bm": "Protect healing tissue and prevent bacterial infection using certified Aseptic Non-Touch Technique (ANTT).",
    "ta": "Protect healing tissue and prevent bacterial infection using certified Aseptic Non-Touch Technique (ANTT)."
  },
  "公众与普通患者": {
    "zh": "公众与普通患者",
    "bm": "公众与普通患者",
    "ta": "公众与普通患者"
  },
  "Island Hospital Penang": {
    "zh": "Island Hospital Penang",
    "bm": "Island Hospital Penang",
    "ta": "Island Hospital Penang"
  },
  "Choose date and time": {
    "zh": "Choose date and time",
    "bm": "Choose date and time",
    "ta": "Choose date and time"
  },
  "☎ 04-643 3888": {
    "zh": "☎ 04-643 3888",
    "bm": "☎ 04-643 3888",
    "ta": "☎ 04-643 3888"
  },
  "Preferred time": {
    "zh": "Preferred time",
    "bm": "Preferred time",
    "ta": "Preferred time"
  },
  "RM 250 – RM 450 / mo": {
    "zh": "RM 250 – RM 450 / mo",
    "bm": "RM 250 – RM 450 / mo",
    "ta": "RM 250 – RM 450 / mo"
  },
  "Prevent fatal pulmonary aspiration pneumonia during enteral tube nutrition administration.": {
    "zh": "Prevent fatal pulmonary aspiration pneumonia during enteral tube nutrition administration.",
    "bm": "Prevent fatal pulmonary aspiration pneumonia during enteral tube nutrition administration.",
    "ta": "Prevent fatal pulmonary aspiration pneumonia during enteral tube nutrition administration."
  },
  "☎ 04-548 6666": {
    "zh": "☎ 04-548 6666",
    "bm": "☎ 04-548 6666",
    "ta": "☎ 04-548 6666"
  },
  "💬 Book via WhatsApp": {
    "zh": "💬 Book via WhatsApp",
    "bm": "💬 Book via WhatsApp",
    "ta": "💬 Book via WhatsApp"
  },
  "☎ 999": {
    "zh": "☎ 999",
    "bm": "☎ 999",
    "ta": "☎ 999"
  },
  "Click to view rates for Injections & Blood Tests": {
    "zh": "Click to view rates for Injections & Blood Tests",
    "bm": "Click to view rates for Injections & Blood Tests",
    "ta": "Click to view rates for Injections & Blood Tests"
  },
  "Stroke Rehabilitation & Offloading": {
    "zh": "Stroke Rehabilitation & Offloading",
    "bm": "Stroke Rehabilitation & Offloading",
    "ta": "Stroke Rehabilitation & Offloading"
  },
  "Please enter a phone number.": {
    "zh": "Please enter a phone number.",
    "bm": "Please enter a phone number.",
    "ta": "Please enter a phone number."
  },
  "Maintain strict hygiene to prevent Catheter-Associated Urinary Tract Infections (CAUTI).": {
    "zh": "Maintain strict hygiene to prevent Catheter-Associated Urinary Tract Infections (CAUTI).",
    "bm": "Maintain strict hygiene to prevent Catheter-Associated Urinary Tract Infections (CAUTI).",
    "ta": "Maintain strict hygiene to prevent Catheter-Associated Urinary Tract Infections (CAUTI)."
  },
  "Ensure tubing is free of loops, kinks, or tension that can cause urethral trauma.": {
    "zh": "Ensure tubing is free of loops, kinks, or tension that can cause urethral trauma.",
    "bm": "Ensure tubing is free of loops, kinks, or tension that can cause urethral trauma.",
    "ta": "Ensure tubing is free of loops, kinks, or tension that can cause urethral trauma."
  },
  "Private Home": {
    "zh": "Private Home",
    "bm": "Private Home",
    "ta": "Private Home"
  },
  "Purchase:": {
    "zh": "Purchase:",
    "bm": "Purchase:",
    "ta": "Purchase:"
  },
  "1. Public Open Mode (公众免密快速浏览)": {
    "zh": "1. Public Open Mode (公众免密快速浏览)",
    "bm": "1. Public Open Mode (公众免密快速浏览)",
    "ta": "1. Public Open Mode (公众免密快速浏览)"
  },
  "Alt: 04-828 5999": {
    "zh": "Alt: 04-828 5999",
    "bm": "Alt: 04-828 5999",
    "ta": "Alt: 04-828 5999"
  },
  "大山脚": {
    "zh": "大山脚",
    "bm": "大山脚",
    "ta": "大山脚"
  },
  "After hospital discharge, families frequently feel lost dealing with wound changes, feeding tubes, catheters, or bed transfers in a home environment that wasn't built like a clinic. Working adult children are stressed about causing infections or doing procedures incorrectly.": {
    "zh": "After hospital discharge, families frequently feel lost dealing with wound changes, feeding tubes, catheters, or bed transfers in a home environment that wasn't built like a clinic. Working adult children are stressed about causing infections or doing procedures incorrectly.",
    "bm": "After hospital discharge, families frequently feel lost dealing with wound changes, feeding tubes, catheters, or bed transfers in a home environment that wasn't built like a clinic. Working adult children are stressed about causing infections or doing procedures incorrectly.",
    "ta": "After hospital discharge, families frequently feel lost dealing with wound changes, feeding tubes, catheters, or bed transfers in a home environment that wasn't built like a clinic. Working adult children are stressed about causing infections or doing procedures incorrectly."
  },
  "Registered Mobile Phone (手机号码) or Case Code (病历编号)": {
    "zh": "Registered Mobile Phone (手机号码) or Case Code (病历编号)",
    "bm": "Registered Mobile Phone (手机号码) or Case Code (病历编号)",
    "ta": "Registered Mobile Phone (手机号码) or Case Code (病历编号)"
  },
  "Standard Malaysian Clinical Dosing Schedule": {
    "zh": "Standard Malaysian Clinical Dosing Schedule",
    "bm": "Standard Malaysian Clinical Dosing Schedule",
    "ta": "Standard Malaysian Clinical Dosing Schedule"
  },
  "大山脚及邻近地区": {
    "zh": "大山脚及邻近地区",
    "bm": "大山脚及邻近地区",
    "ta": "大山脚及邻近地区"
  },
  "Hands-Only CPR Protocol": {
    "zh": "Hands-Only CPR Protocol",
    "bm": "Hands-Only CPR Protocol",
    "ta": "Hands-Only CPR Protocol"
  },
  "\"To deliver accessible, personalized clinical nursing and compassionate home care—expertly adapting each care plan to the family's unique home environment with trained professional handling that minimizes infection risks while upholding fundamental nursing safety and patient dignity.\"": {
    "zh": "\"To deliver accessible, personalized clinical nursing and compassionate home care—expertly adapting each care plan to the family's unique home environment with trained professional handling that minimizes infection risks while upholding fundamental nursing safety and patient dignity.\"",
    "bm": "\"To deliver accessible, personalized clinical nursing and compassionate home care—expertly adapting each care plan to the family's unique home environment with trained professional handling that minimizes infection risks while upholding fundamental nursing safety and patient dignity.\"",
    "ta": "\"To deliver accessible, personalized clinical nursing and compassionate home care—expertly adapting each care plan to the family's unique home environment with trained professional handling that minimizes infection risks while upholding fundamental nursing safety and patient dignity.\""
  },
  "🧠 Stroke & Post-Op Rehab": {
    "zh": "🧠 Stroke & Post-Op Rehab",
    "bm": "🧠 Stroke & Post-Op Rehab",
    "ta": "🧠 Stroke & Post-Op Rehab"
  },
  "Foldable Wheelchair & Commode Chair": {
    "zh": "Foldable Wheelchair & Commode Chair",
    "bm": "Foldable Wheelchair & Commode Chair",
    "ta": "Foldable Wheelchair & Commode Chair"
  },
  "Dark concentrated tea-colored urine, blood clots, sudden cessation of urine output, or lower abdominal pain.": {
    "zh": "Dark concentrated tea-colored urine, blood clots, sudden cessation of urine output, or lower abdominal pain.",
    "bm": "Dark concentrated tea-colored urine, blood clots, sudden cessation of urine output, or lower abdominal pain.",
    "ta": "Dark concentrated tea-colored urine, blood clots, sudden cessation of urine output, or lower abdominal pain."
  },
  "⏰ TDS (Three Times Daily):": {
    "zh": "⏰ TDS (Three Times Daily):",
    "bm": "⏰ TDS (Three Times Daily):",
    "ta": "⏰ TDS (Three Times Daily):"
  },
  "LOCATION IN PENANG (ALL AREAS COVERED)": {
    "zh": "LOCATION IN PENANG (ALL AREAS COVERED)",
    "bm": "LOCATION IN PENANG (ALL AREAS COVERED)",
    "ta": "LOCATION IN PENANG (ALL AREAS COVERED)"
  },
  "Next ▶": {
    "zh": "Next ▶",
    "bm": "Next ▶",
    "ta": "Next ▶"
  },
  "06:00 / 12:00 or 18:00 / 22:00 (12-hour intervals)": {
    "zh": "06:00 / 12:00 or 18:00 / 22:00 (12-hour intervals)",
    "bm": "06:00 / 12:00 or 18:00 / 22:00 (12-hour intervals)",
    "ta": "06:00 / 12:00 or 18:00 / 22:00 (12-hour intervals)"
  },
  "How to Run Windows App (.exe):": {
    "zh": "How to Run Windows App (.exe):",
    "bm": "How to Run Windows App (.exe):",
    "ta": "How to Run Windows App (.exe):"
  },
  "1, Jalan Pangkor, 10050 George Town, Penang": {
    "zh": "1, Jalan Pangkor, 10050 George Town, Penang",
    "bm": "1, Jalan Pangkor, 10050 George Town, Penang",
    "ta": "1, Jalan Pangkor, 10050 George Town, Penang"
  },
  "每日 24小时全天候": {
    "zh": "每日 24小时全天候",
    "bm": "每日 24小时全天候",
    "ta": "每日 24小时全天候"
  },
  "Assura Nursing · 官方统一应用使用备忘录": {
    "zh": "Assura Nursing · 官方统一应用使用备忘录",
    "bm": "Assura Nursing · 官方统一应用使用备忘录",
    "ta": "Assura Nursing · 官方统一应用使用备忘录"
  },
  "🩹 Wound Care & Dressing": {
    "zh": "🩹 Wound Care & Dressing",
    "bm": "🩹 Wound Care & Dressing",
    "ta": "🩹 Wound Care & Dressing"
  },
  "Loading medications...": {
    "zh": "Loading medications...",
    "bm": "Loading medications...",
    "ta": "Loading medications..."
  },
  "Our Story, Standards & Values · 创办理念 · 专业标准 · 核心价值": {
    "zh": "Our Story, Standards & Values · 创办理念 · 专业标准 · 核心价值",
    "bm": "Our Story, Standards & Values · 创办理念 · 专业标准 · 核心价值",
    "ta": "Our Story, Standards & Values · 创办理念 · 专业标准 · 核心价值"
  },
  "IV Drip Infusion & Medication Administration · RM 180": {
    "zh": "IV Drip Infusion & Medication Administration · RM 180",
    "bm": "IV Drip Infusion & Medication Administration · RM 180",
    "ta": "IV Drip Infusion & Medication Administration · RM 180"
  },
  "Foley Urinary Catheter Hygiene": {
    "zh": "Foley Urinary Catheter Hygiene",
    "bm": "Foley Urinary Catheter Hygiene",
    "ta": "Foley Urinary Catheter Hygiene"
  },
  "Our Standards · 服务宗旨与承诺": {
    "zh": "Our Standards · 服务宗旨与承诺",
    "bm": "Our Standards · 服务宗旨与承诺",
    "ta": "Our Standards · 服务宗旨与承诺"
  },
  "Bukit Mertajam & Central Seberang Perai": {
    "zh": "Bukit Mertajam & Central Seberang Perai",
    "bm": "Bukit Mertajam & Central Seberang Perai",
    "ta": "Bukit Mertajam & Central Seberang Perai"
  },
  "Ryle": {
    "zh": "Ryle",
    "bm": "Ryle",
    "ta": "Ryle"
  },
  "中文": {
    "zh": "中文",
    "bm": "中文",
    "ta": "中文"
  },
  "☎ 04-238 3388": {
    "zh": "☎ 04-238 3388",
    "bm": "☎ 04-238 3388",
    "ta": "☎ 04-238 3388"
  },
  "📁 Medical Document Vault (医疗文件与报告)": {
    "zh": "📁 Medical Document Vault (医疗文件与报告)",
    "bm": "📁 Medical Document Vault (医疗文件与报告)",
    "ta": "📁 Medical Document Vault (医疗文件与报告)"
  },
  "☎ 04-643 2743": {
    "zh": "☎ 04-643 2743",
    "bm": "☎ 04-643 2743",
    "ta": "☎ 04-643 2743"
  },
  "We believe nurses deserve respect, transparent earnings, and professional autonomy. Earn competitive case commissions with prompt bi-weekly direct payroll transfers.": {
    "zh": "We believe nurses deserve respect, transparent earnings, and professional autonomy. Earn competitive case commissions with prompt bi-weekly direct payroll transfers.",
    "bm": "We believe nurses deserve respect, transparent earnings, and professional autonomy. Earn competitive case commissions with prompt bi-weekly direct payroll transfers.",
    "ta": "We believe nurses deserve respect, transparent earnings, and professional autonomy. Earn competitive case commissions with prompt bi-weekly direct payroll transfers."
  },
  "© 2026 Assura Nursing · All Rights Reserved · Penang Island & Mainland": {
    "zh": "© 2026 Assura Nursing · All Rights Reserved · Penang Island & Mainland",
    "bm": "© 2026 Assura Nursing · All Rights Reserved · Penang Island & Mainland",
    "ta": "© 2026 Assura Nursing · All Rights Reserved · Penang Island & Mainland"
  },
  "🚗 Waze": {
    "zh": "🚗 Waze",
    "bm": "🚗 Waze",
    "ta": "🚗 Waze"
  },
  "AHA / ERC LIFE-SAVING STANDARD": {
    "zh": "AHA / ERC LIFE-SAVING STANDARD",
    "bm": "AHA / ERC LIFE-SAVING STANDARD",
    "ta": "AHA / ERC LIFE-SAVING STANDARD"
  },
  "Sign in with your registered Staff ID inside the app to unlock patient vitals entry, MEWS scoring, and shift roster management.": {
    "zh": "Sign in with your registered Staff ID inside the app to unlock patient vitals entry, MEWS scoring, and shift roster management.",
    "bm": "Sign in with your registered Staff ID inside the app to unlock patient vitals entry, MEWS scoring, and shift roster management.",
    "ta": "Sign in with your registered Staff ID inside the app to unlock patient vitals entry, MEWS scoring, and shift roster management."
  },
  "ASN-001": {
    "zh": "ASN-001",
    "bm": "ASN-001",
    "ta": "ASN-001"
  },
  "24/7 Emergency Hotline:": {
    "zh": "24/7 Emergency Hotline:",
    "bm": "24/7 Emergency Hotline:",
    "ta": "24/7 Emergency Hotline:"
  },
  "Assura Nursing · Bukit Mertajam 大山脚 · 012-206 4868": {
    "zh": "Assura Nursing · Bukit Mertajam 大山脚 · 012-206 4868",
    "bm": "Assura Nursing · Bukit Mertajam 大山脚 · 012-206 4868",
    "ta": "Assura Nursing · Bukit Mertajam 大山脚 · 012-206 4868"
  },
  "📚 Patient & Family Clinical Home Care Guides": {
    "zh": "📚 Patient & Family Clinical Home Care Guides",
    "bm": "📚 Patient & Family Clinical Home Care Guides",
    "ta": "📚 Patient & Family Clinical Home Care Guides"
  },
  "Bukit Mertajam, Penang": {
    "zh": "Bukit Mertajam, Penang",
    "bm": "Bukit Mertajam, Penang",
    "ta": "Bukit Mertajam, Penang"
  },
  "📝 Book Form": {
    "zh": "📝 Book Form",
    "bm": "📝 Book Form",
    "ta": "📝 Book Form"
  },
  "Elevate patient's head of bed to at least 45° to 60° before starting feeds.": {
    "zh": "Elevate patient's head of bed to at least 45° to 60° before starting feeds.",
    "bm": "Elevate patient's head of bed to at least 45° to 60° before starting feeds.",
    "ta": "Elevate patient's head of bed to at least 45° to 60° before starting feeds."
  },
  "⏰ BD (Twice Daily):": {
    "zh": "⏰ BD (Twice Daily):",
    "bm": "⏰ BD (Twice Daily):",
    "ta": "⏰ BD (Twice Daily):"
  },
  "我们是居家护理服务，并非救护车。如遇尿管阻塞、伤口渗血不止、喂食管脱落等紧急护理需求，请直接联系我们：": {
    "zh": "我们是居家护理服务，并非救护车。如遇尿管阻塞、伤口渗血不止、喂食管脱落等紧急护理需求，请直接联系我们：",
    "bm": "我们是居家护理服务，并非救护车。如遇尿管阻塞、伤口渗血不止、喂食管脱落等紧急护理需求，请直接联系我们：",
    "ta": "我们是居家护理服务，并非救护车。如遇尿管阻塞、伤口渗血不止、喂食管脱落等紧急护理需求，请直接联系我们："
  },
  "LPPK Registered (MA)": {
    "zh": "LPPK Registered (MA)",
    "bm": "LPPK Registered (MA)",
    "ta": "LPPK Registered (MA)"
  },
  "Staff & Gender Preference": {
    "zh": "Staff & Gender Preference",
    "bm": "Staff & Gender Preference",
    "ta": "Staff & Gender Preference"
  },
  "About Us & Founder Message · Assura Nursing": {
    "zh": "About Us & Founder Message · Assura Nursing",
    "bm": "About Us & Founder Message · Assura Nursing",
    "ta": "About Us & Founder Message · Assura Nursing"
  },
  "While adapting to the home, our trained nurses maintain professional handling and aseptic non-touch technique (ANTT) for wound dressings and catheterizations—managing a clean procedural field to minimize infection risks even in a home setting.": {
    "zh": "While adapting to the home, our trained nurses maintain professional handling and aseptic non-touch technique (ANTT) for wound dressings and catheterizations—managing a clean procedural field to minimize infection risks even in a home setting.",
    "bm": "While adapting to the home, our trained nurses maintain professional handling and aseptic non-touch technique (ANTT) for wound dressings and catheterizations—managing a clean procedural field to minimize infection risks even in a home setting.",
    "ta": "While adapting to the home, our trained nurses maintain professional handling and aseptic non-touch technique (ANTT) for wound dressings and catheterizations—managing a clean procedural field to minimize infection risks even in a home setting."
  },
  "Set Security PIN / Password (设定您的安全密码)": {
    "zh": "Set Security PIN / Password (设定您的安全密码)",
    "bm": "Set Security PIN / Password (设定您的安全密码)",
    "ta": "Set Security PIN / Password (设定您的安全密码)"
  },
  "Unified Care & Clinical Portal": {
    "zh": "Unified Care & Clinical Portal",
    "bm": "Unified Care & Clinical Portal",
    "ta": "Unified Care & Clinical Portal"
  },
  "Staff Security PIN (员工授权密码)": {
    "zh": "Staff Security PIN (员工授权密码)",
    "bm": "Staff Security PIN (员工授权密码)",
    "ta": "Staff Security PIN (员工授权密码)"
  },
  "CAUTI Prevention & Drainage Maintenance": {
    "zh": "CAUTI Prevention & Drainage Maintenance",
    "bm": "CAUTI Prevention & Drainage Maintenance",
    "ta": "CAUTI Prevention & Drainage Maintenance"
  },
  "Aspiration Prevention & Bolus Protocol": {
    "zh": "Aspiration Prevention & Bolus Protocol",
    "bm": "Aspiration Prevention & Bolus Protocol",
    "ta": "Aspiration Prevention & Bolus Protocol"
  },
  "Medical Oxygen Concentrator (5L/10L)": {
    "zh": "Medical Oxygen Concentrator (5L/10L)",
    "bm": "Medical Oxygen Concentrator (5L/10L)",
    "ta": "Medical Oxygen Concentrator (5L/10L)"
  },
  "Assura Hub · 公告与招聘中心": {
    "zh": "Assura Hub · 公告与招聘中心",
    "bm": "Assura Hub · 公告与招聘中心",
    "ta": "Assura Hub · 公告与招聘中心"
  },
  "♿ Transfer": {
    "zh": "♿ Transfer",
    "bm": "♿ Transfer",
    "ta": "♿ Transfer"
  },
  "needs — a blocked catheter, a dressing that won't stop bleeding, a tube that has come out — reach us directly:": {
    "zh": "needs — a blocked catheter, a dressing that won't stop bleeding, a tube that has come out — reach us directly:",
    "bm": "needs — a blocked catheter, a dressing that won't stop bleeding, a tube that has come out — reach us directly:",
    "ta": "needs — a blocked catheter, a dressing that won't stop bleeding, a tube that has come out — reach us directly:"
  },
  "☎ 04-866 9333": {
    "zh": "☎ 04-866 9333",
    "bm": "☎ 04-866 9333",
    "ta": "☎ 04-866 9333"
  },
  "● Interactive Walkthrough": {
    "zh": "● Interactive Walkthrough",
    "bm": "● Interactive Walkthrough",
    "ta": "● Interactive Walkthrough"
  },
  "🛏️ Home Medical Equipment Rental & Reference Guide": {
    "zh": "🛏️ Home Medical Equipment Rental & Reference Guide",
    "bm": "🛏️ Home Medical Equipment Rental & Reference Guide",
    "ta": "🛏️ Home Medical Equipment Rental & Reference Guide"
  },
  "Media, Medical Equipment & Emergency Hub · Assura Nursing": {
    "zh": "Media, Medical Equipment & Emergency Hub · Assura Nursing",
    "bm": "Media, Medical Equipment & Emergency Hub · Assura Nursing",
    "ta": "Media, Medical Equipment & Emergency Hub · Assura Nursing"
  },
  "个人卫生 · 洗澡清洁": {
    "zh": "个人卫生 · 洗澡清洁",
    "bm": "个人卫生 · 洗澡清洁",
    "ta": "个人卫生 · 洗澡清洁"
  },
  "🩺 Clinical Staff & Nurses (医护人员)": {
    "zh": "🩺 Clinical Staff & Nurses (医护人员)",
    "bm": "🩺 Clinical Staff & Nurses (医护人员)",
    "ta": "🩺 Clinical Staff & Nurses (医护人员)"
  },
  "← Previous": {
    "zh": "← Previous",
    "bm": "← Previous",
    "ta": "← Previous"
  },
  "82, Jalan Tengah, Bandar Bayan Baru, 11900 Bayan Lepas": {
    "zh": "82, Jalan Tengah, Bandar Bayan Baru, 11900 Bayan Lepas",
    "bm": "82, Jalan Tengah, Bandar Bayan Baru, 11900 Bayan Lepas",
    "ta": "82, Jalan Tengah, Bandar Bayan Baru, 11900 Bayan Lepas"
  },
  "MALAYSIA & PENANG HOTLINES": {
    "zh": "MALAYSIA & PENANG HOTLINES",
    "bm": "MALAYSIA & PENANG HOTLINES",
    "ta": "MALAYSIA & PENANG HOTLINES"
  },
  "Apply primary prescribed dressing (hydrocolloid / foam) and secure edges firmly.": {
    "zh": "Apply primary prescribed dressing (hydrocolloid / foam) and secure edges firmly.",
    "bm": "Apply primary prescribed dressing (hydrocolloid / foam) and secure edges firmly.",
    "ta": "Apply primary prescribed dressing (hydrocolloid / foam) and secure edges firmly."
  },
  "Frequency": {
    "zh": "Frequency",
    "bm": "Frequency",
    "ta": "Frequency"
  },
  "Interactive Walkthrough": {
    "zh": "Interactive Walkthrough",
    "bm": "Interactive Walkthrough",
    "ta": "Interactive Walkthrough"
  },
  "We founded": {
    "zh": "We founded",
    "bm": "We founded",
    "ta": "We founded"
  },
  "Penang's 1st Digital Home Nursing Platform · Trained nurses and dedicated caregivers delivering personalized care plans with transparent fare rates and fast staff coordination.": {
    "zh": "Penang's 1st Digital Home Nursing Platform · Trained nurses and dedicated caregivers delivering personalized care plans with transparent fare rates and fast staff coordination.",
    "bm": "Penang's 1st Digital Home Nursing Platform · Trained nurses and dedicated caregivers delivering personalized care plans with transparent fare rates and fast staff coordination.",
    "ta": "Penang's 1st Digital Home Nursing Platform · Trained nurses and dedicated caregivers delivering personalized care plans with transparent fare rates and fast staff coordination."
  },
  "Next Step →": {
    "zh": "Next Step →",
    "bm": "Next Step →",
    "ta": "Next Step →"
  },
  "Medical Equipment Rental": {
    "zh": "Medical Equipment Rental",
    "bm": "Medical Equipment Rental",
    "ta": "Medical Equipment Rental"
  },
  "Official Announcements": {
    "zh": "Official Announcements",
    "bm": "Official Announcements",
    "ta": "Official Announcements"
  },
  "Works on Locked / No-SIM phones": {
    "zh": "Works on Locked / No-SIM phones",
    "bm": "Works on Locked / No-SIM phones",
    "ta": "Works on Locked / No-SIM phones"
  },
  "Keep patient upright for 45–60 minutes after feeding.": {
    "zh": "Keep patient upright for 45–60 minutes after feeding.",
    "bm": "Keep patient upright for 45–60 minutes after feeding.",
    "ta": "Keep patient upright for 45–60 minutes after feeding."
  },
  "Emergency & Hospital GPS": {
    "zh": "Emergency & Hospital GPS",
    "bm": "Emergency & Hospital GPS",
    "ta": "Emergency & Hospital GPS"
  },
  "📌 First-Time User Memo (使用备忘):": {
    "zh": "📌 First-Time User Memo (使用备忘):",
    "bm": "📌 First-Time User Memo (使用备忘):",
    "ta": "📌 First-Time User Memo (使用备忘):"
  },
  "110 BPM Standard Rhythm": {
    "zh": "110 BPM Standard Rhythm",
    "bm": "110 BPM Standard Rhythm",
    "ta": "110 BPM Standard Rhythm"
  },
  "Official Android App · 官方安卓应用": {
    "zh": "Official Android App · 官方安卓应用",
    "bm": "Official Android App · 官方安卓应用",
    "ta": "Official Android App · 官方安卓应用"
  },
  "📱 Interactive First Aid & CPR Simulator": {
    "zh": "📱 Interactive First Aid & CPR Simulator",
    "bm": "📱 Interactive First Aid & CPR Simulator",
    "ta": "📱 Interactive First Aid & CPR Simulator"
  },
  "Click to expand": {
    "zh": "Click to expand",
    "bm": "Click to expand",
    "ta": "Click to expand"
  },
  "Apply barrier moisturizing cream over bony prominences (sacrum, hips, ankles).": {
    "zh": "Apply barrier moisturizing cream over bony prominences (sacrum, hips, ankles).",
    "bm": "Apply barrier moisturizing cream over bony prominences (sacrum, hips, ankles).",
    "ta": "Apply barrier moisturizing cream over bony prominences (sacrum, hips, ankles)."
  },
  "Staff:": {
    "zh": "Staff:",
    "bm": "Staff:",
    "ta": "Staff:"
  },
  "Loh Guan Lye Specialists Centre": {
    "zh": "Loh Guan Lye Specialists Centre",
    "bm": "Loh Guan Lye Specialists Centre",
    "ta": "Loh Guan Lye Specialists Centre"
  },
  "Click to view rates for Stroke Rehab": {
    "zh": "Click to view rates for Stroke Rehab",
    "bm": "Click to view rates for Stroke Rehab",
    "ta": "Click to view rates for Stroke Rehab"
  },
  "Penang General Hospital (HPP)": {
    "zh": "Penang General Hospital (HPP)",
    "bm": "Penang General Hospital (HPP)",
    "ta": "Penang General Hospital (HPP)"
  },
  "Patient (Stroke Rehab)": {
    "zh": "Patient (Stroke Rehab)",
    "bm": "Patient (Stroke Rehab)",
    "ta": "Patient (Stroke Rehab)"
  },
  "Enter your Staff PIN": {
    "zh": "Enter your Staff PIN",
    "bm": "Enter your Staff PIN",
    "ta": "Enter your Staff PIN"
  },
  "Civil Defence Force (APM Penang)": {
    "zh": "Civil Defence Force (APM Penang)",
    "bm": "Civil Defence Force (APM Penang)",
    "ta": "Civil Defence Force (APM Penang)"
  },
  "Kepala Batas / Tasek Gelugor / Bertam": {
    "zh": "Kepala Batas / Tasek Gelugor / Bertam",
    "bm": "Kepala Batas / Tasek Gelugor / Bertam",
    "ta": "Kepala Batas / Tasek Gelugor / Bertam"
  },
  "Tell us anything helpful about the patient": {
    "zh": "Tell us anything helpful about the patient",
    "bm": "Tell us anything helpful about the patient",
    "ta": "Tell us anything helpful about the patient"
  },
  "தமிழ்": {
    "zh": "தமிழ்",
    "bm": "தமிழ்",
    "ta": "தமிழ்"
  },
  "Start 110 BPM CPR Rhythm Metronome": {
    "zh": "Start 110 BPM CPR Rhythm Metronome",
    "bm": "Start 110 BPM CPR Rhythm Metronome",
    "ta": "Start 110 BPM CPR Rhythm Metronome"
  },
  "Dose & Route": {
    "zh": "Dose & Route",
    "bm": "Dose & Route",
    "ta": "Dose & Route"
  },
  "因地制宜·环境规划：": {
    "zh": "因地制宜·环境规划：",
    "bm": "因地制宜·环境规划：",
    "ta": "因地制宜·环境规划："
  },
  "Receive shift alerts, patient reminders, and emergency updates even without internet.": {
    "zh": "Receive shift alerts, patient reminders, and emergency updates even without internet.",
    "bm": "Receive shift alerts, patient reminders, and emergency updates even without internet.",
    "ta": "Receive shift alerts, patient reminders, and emergency updates even without internet."
  },
  "🏡 Home Clinical Care Specialist": {
    "zh": "🏡 Home Clinical Care Specialist",
    "bm": "🏡 Home Clinical Care Specialist",
    "ta": "🏡 Home Clinical Care Specialist"
  },
  "24/7 Emergency:": {
    "zh": "24/7 Emergency:",
    "bm": "24/7 Emergency:",
    "ta": "24/7 Emergency:"
  },
  "Balik Pulau & South Island": {
    "zh": "Balik Pulau & South Island",
    "bm": "Balik Pulau & South Island",
    "ta": "Balik Pulau & South Island"
  },
  "Lembaga Jururawat Malaysia (LJM) Regulated Private Nursing Services": {
    "zh": "Lembaga Jururawat Malaysia (LJM) Regulated Private Nursing Services",
    "bm": "Lembaga Jururawat Malaysia (LJM) Regulated Private Nursing Services",
    "ta": "Lembaga Jururawat Malaysia (LJM) Regulated Private Nursing Services"
  },
  "企业愿景": {
    "zh": "企业愿景",
    "bm": "企业愿景",
    "ta": "企业愿景"
  },
  "Keep urine drainage bag": {
    "zh": "Keep urine drainage bag",
    "bm": "Keep urine drainage bag",
    "ta": "Keep urine drainage bag"
  },
  "📞 Call us · 012-206 4868": {
    "zh": "📞 Call us · 012-206 4868",
    "bm": "📞 Call us · 012-206 4868",
    "ta": "📞 Call us · 012-206 4868"
  },
  "📖 User Guide & Memo (首次使用指南)": {
    "zh": "📖 User Guide & Memo (首次使用指南)",
    "bm": "📖 User Guide & Memo (首次使用指南)",
    "ta": "📖 User Guide & Memo (首次使用指南)"
  },
  "SEPTEMBER 2026 · SERVICE EXPANSION": {
    "zh": "SEPTEMBER 2026 · SERVICE EXPANSION",
    "bm": "SEPTEMBER 2026 · SERVICE EXPANSION",
    "ta": "SEPTEMBER 2026 · SERVICE EXPANSION"
  },
  "e.g. 550101-07-5555": {
    "zh": "e.g. 550101-07-5555",
    "bm": "e.g. 550101-07-5555",
    "ta": "e.g. 550101-07-5555"
  },
  "We answer when we can, but we cannot promise immediate availability. If nobody answers, call 999 or go to the nearest clinic.": {
    "zh": "We answer when we can, but we cannot promise immediate availability. If nobody answers, call 999 or go to the nearest clinic.",
    "bm": "We answer when we can, but we cannot promise immediate availability. If nobody answers, call 999 or go to the nearest clinic.",
    "ta": "We answer when we can, but we cannot promise immediate availability. If nobody answers, call 999 or go to the nearest clinic."
  },
  ", tap Settings and allow.": {
    "zh": ", tap Settings and allow.",
    "bm": ", tap Settings and allow.",
    "ta": ", tap Settings and allow."
  },
  "Clinical Services & Instant Pricing · Assura Nursing": {
    "zh": "Clinical Services & Instant Pricing · Assura Nursing",
    "bm": "Clinical Services & Instant Pricing · Assura Nursing",
    "ta": "Clinical Services & Instant Pricing · Assura Nursing"
  },
  "About our service · 了解服务": {
    "zh": "About our service · 了解服务",
    "bm": "About our service · 了解服务",
    "ta": "About our service · 了解服务"
  },
  "Assura Nursing App": {
    "zh": "Assura Nursing App",
    "bm": "Assura Nursing App",
    "ta": "Assura Nursing App"
  },
  "Assura Nursing — home": {
    "zh": "Assura Nursing — home",
    "bm": "Assura Nursing — home",
    "ta": "Assura Nursing — home"
  },
  "👴 Palliative & Bedside Nursing": {
    "zh": "👴 Palliative & Bedside Nursing",
    "bm": "👴 Palliative & Bedside Nursing",
    "ta": "👴 Palliative & Bedside Nursing"
  },
  "临终关怀与家属支持": {
    "zh": "临终关怀与家属支持",
    "bm": "临终关怀与家属支持",
    "ta": "临终关怀与家属支持"
  },
  "Add your address": {
    "zh": "Add your address",
    "bm": "Add your address",
    "ta": "Add your address"
  },
  "💉 Injections & Blood Tests": {
    "zh": "💉 Injections & Blood Tests",
    "bm": "💉 Injections & Blood Tests",
    "ta": "💉 Injections & Blood Tests"
  },
  "View Services & Rates": {
    "zh": "View Services & Rates",
    "bm": "View Services & Rates",
    "ta": "View Services & Rates"
  },
  "Direct Mirrors:": {
    "zh": "备用直接下载镜像：",
    "bm": "Cermin Muat Turun Terus:",
    "ta": "நேரடி பதிவிறக்க இணைப்புகள்:"
  },
  "Apple iOS (iPhone / iPad) Detected:": {
    "zh": "已检测到 Apple iOS 设备（iPhone / iPad）：",
    "bm": "Dikesan Peranti Apple iOS (iPhone / iPad):",
    "ta": "Apple iOS சாதனம் கண்டறியப்பட்டது (iPhone / iPad):"
  },
  "Tap the": {
    "zh": "轻按 Safari 浏览器底部的",
    "bm": "Ketik butang",
    "ta": "Safari உலாவியில் உள்ள"
  },
  "button": {
    "zh": "分享按钮",
    "bm": "butang",
    "ta": "பொத்தானை அழுத்தவும்"
  },
  "in Safari and choose": {
    "zh": "并在菜单中选择",
    "bm": "di Safari dan pilih",
    "ta": "மற்றும் தேர்ந்தெடுக்கவும்"
  },
  "\"Add to Home Screen\" ➕": {
    "zh": "“添加到主屏幕” ➕",
    "bm": "\"Tambah ke Skrin Utama\" ➕",
    "ta": "\"முகப்புத் திரையில் சேர்\" ➕"
  },
  "Android Device Detected:": {
    "zh": "已检测到 Android 安卓设备：",
    "bm": "Dikesan Peranti Android:",
    "ta": "Android சாதனம் கண்டறியப்பட்டது:"
  },
  "below for direct installation, or tap": {
    "zh": "获取 APK 快速安装包，或点击",
    "bm": "di bawah untuk pemasangan terus, atau ketik",
    "ta": "நேரடி நிறுவலுக்கு கீழே உள்ள இணைப்பைப் பயன்படுத்தவும் அல்லது"
  },
  "Windows PC Detected:": {
    "zh": "已检测到 Windows 电脑：",
    "bm": "Dikesan Komputer Windows:",
    "ta": "Windows கணினி கண்டறியப்பட்டது:"
  },
  "Download Assura Nursing APK": {
    "zh": "下载 Assura Nursing 安卓安装包 (APK)",
    "bm": "Muat Turun APK Assura Nursing",
    "ta": "Assura Nursing APK பதிவிறக்கவும்"
  },
  "Download Assura Nursing EXE": {
    "zh": "下载 Assura Nursing 电脑安装包 (EXE)",
    "bm": "Muat Turun EXE Assura Nursing",
    "ta": "Assura Nursing EXE பதிவிறக்கவும்"
  },
  "Direct APK Download": {
    "zh": "直接下载 APK 安装包",
    "bm": "Muat Turun APK Terus",
    "ta": "நேரடி APK பதிவிறக்கம்"
  },
  "Direct EXE Download": {
    "zh": "直接下载 EXE 安装包",
    "bm": "Muat Turun EXE Terus",
    "ta": "நேரடி EXE பதிவிறக்கம்"
  },
  "Direct Download Link": {
    "zh": "直接下载链接",
    "bm": "Pautan Muat Turun Terus",
    "ta": "நேரடி பதிவிறக்க இணைப்பு"
  },
  "Assura Nursing APK": {
    "zh": "Assura Nursing 安卓应用 (APK)",
    "bm": "APK Assura Nursing",
    "ta": "Assura Nursing APK"
  },
  "Assura Nursing EXE": {
    "zh": "Assura Nursing 电脑客户端 (EXE)",
    "bm": "EXE Assura Nursing",
    "ta": "Assura Nursing EXE"
  },
  "Assura Nursing Web App": {
    "zh": "Assura Nursing 网页版应用",
    "bm": "Aplikasi Web Assura Nursing",
    "ta": "Assura Nursing வலை ஆப்"
  },
  "Install Official App": {
    "zh": "安装官方应用",
    "bm": "Pasang Aplikasi Rasmi",
    "ta": "அதிகாரப்பூர்வ செயலியை நிறுவவும்"
  },
  "All downloads are direct, malware-free, and hosted securely on Cloudflare.": {
    "zh": "所有安装包均为官方直链，无任何恶意插件，由 Cloudflare 全球安全托管。",
    "bm": "Semua muat turun adalah terus, bebas perisian hasad, dan dihoskan secara selamat di Cloudflare.",
    "ta": "அனைத்து பதிவிறக்கங்களும் நேரடியானவை, தீம்பொருள் இல்லாதவை மற்றும் Cloudflare இல் பாதுகாப்பாக வழங்கப்படுகின்றன."
  },
  "☎ 04-222 7799": {
    "zh": "☎ 04-222 7799",
    "bm": "☎ 04-222 7799",
    "ta": "☎ 04-222 7799"
  },
  "Oncology Specialist": {
    "zh": "Oncology Specialist",
    "bm": "Oncology Specialist",
    "ta": "Oncology Specialist"
  },
  "Penang Adventist Hospital (PAH)": {
    "zh": "Penang Adventist Hospital (PAH)",
    "bm": "Penang Adventist Hospital (PAH)",
    "ta": "Penang Adventist Hospital (PAH)"
  },
  "☎ 04-222 7200": {
    "zh": "☎ 04-222 7200",
    "bm": "☎ 04-222 7200",
    "ta": "☎ 04-222 7200"
  },
  "24/7 Direct Care / Line:": {
    "zh": "24/7 Direct Care / Line:",
    "bm": "24/7 Direct Care / Line:",
    "ta": "24/7 Direct Care / Line:"
  },
  "465, Jalan Burma, 10350 George Town, Penang": {
    "zh": "465, Jalan Burma, 10350 George Town, Penang",
    "bm": "465, Jalan Burma, 10350 George Town, Penang",
    "ta": "465, Jalan Burma, 10350 George Town, Penang"
  },
  "☎ 04-890 7000": {
    "zh": "☎ 04-890 7000",
    "bm": "☎ 04-890 7000",
    "ta": "☎ 04-890 7000"
  },
  "23, Jalan Bulan, Fettes Park, 11200 Tanjung Bungah": {
    "zh": "23, Jalan Bulan, Fettes Park, 11200 Tanjung Bungah",
    "bm": "23, Jalan Bulan, Fettes Park, 11200 Tanjung Bungah",
    "ta": "23, Jalan Bulan, Fettes Park, 11200 Tanjung Bungah"
  },
  "Mount Miriam Cancer Hospital": {
    "zh": "Mount Miriam Cancer Hospital",
    "bm": "Mount Miriam Cancer Hospital",
    "ta": "Mount Miriam Cancer Hospital"
  }
};

function setLanguage(lang) {
  if (!['en', 'zh', 'bm', 'ta'].includes(lang)) lang = 'en';
  try {
    localStorage.setItem('assura_lang', lang);
  } catch (e) {}
  
  // Set HTML lang attribute
  document.documentElement.lang = lang === 'bm' ? 'ms' : lang;
  
  // Update UI Language dropdowns & active states
  document.querySelectorAll('#langSelect, #mobileLangSelect, select.lang-switcher').forEach(sel => {
    sel.value = lang;
  });
  
  document.querySelectorAll('.lang-btn, .lang-option').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Translate DOM
  translateDomNodes(document.body, lang);
  translateInputsAndOptions(lang);
}

function translateDomNodes(root, lang) {
  if (!root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
  let node;
  while ((node = walker.nextNode())) {
    const parent = node.parentElement;
    if (!parent) continue;
    const tag = parent.tagName.toUpperCase();
    if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'CODE', 'PRE'].includes(tag)) continue;
    if (parent.classList.contains('notranslate')) continue;

    const raw = node.nodeValue;
    if (!raw) continue;
    
    // Check if original English text is cached
    if (!node._origText) {
      node._origText = raw;
    }
    
    const orig = node._origText;
    const trimmed = orig.trim();
    if (!trimmed || /^[0-9\s.,:\-+*/\\()%=#@!_\[\]|<>—–]+$/.test(trimmed)) continue;

    if (lang === 'en') {
      if (node.nodeValue !== orig) node.nodeValue = orig;
      continue;
    }

    // Check direct match
    let translation = null;
    if (STRING_MAP[trimmed] && STRING_MAP[trimmed][lang]) {
      translation = STRING_MAP[trimmed][lang];
    } else {
      // Try normalized spacing
      const norm = trimmed.replace(/\s+/g, ' ');
      if (STRING_MAP[norm] && STRING_MAP[norm][lang]) {
        translation = STRING_MAP[norm][lang];
      }
    }

    if (translation && translation !== trimmed) {
      // Preserve leading/trailing whitespace
      const leading = orig.match(/^\s*/)[0];
      const trailing = orig.match(/\s*$/)[0];
      node.nodeValue = leading + translation + trailing;
    }
  }
}

function translateInputsAndOptions(lang) {
  // Placeholders and Titles
  document.querySelectorAll('input, textarea, select, button, a').forEach(el => {
    if (el.placeholder) {
      if (!el._origPlaceholder) el._origPlaceholder = el.placeholder;
      const orig = el._origPlaceholder.trim();
      if (lang === 'en') {
        el.placeholder = el._origPlaceholder;
      } else if (STRING_MAP[orig] && STRING_MAP[orig][lang]) {
        el.placeholder = STRING_MAP[orig][lang];
      }
    }
    if (el.title) {
      if (!el._origTitle) el._origTitle = el.title;
      const orig = el._origTitle.trim();
      if (lang === 'en') {
        el.title = el._origTitle;
      } else if (STRING_MAP[orig] && STRING_MAP[orig][lang]) {
        el.title = STRING_MAP[orig][lang];
      }
    }
    if (el.getAttribute('aria-label')) {
      if (!el._origAriaLabel) el._origAriaLabel = el.getAttribute('aria-label');
      const orig = el._origAriaLabel.trim();
      if (lang === 'en') {
        el.setAttribute('aria-label', el._origAriaLabel);
      } else if (STRING_MAP[orig] && STRING_MAP[orig][lang]) {
        el.setAttribute('aria-label', STRING_MAP[orig][lang]);
      }
    }
  });

  // Select Option elements
  document.querySelectorAll('select option').forEach(opt => {
    if (!opt._origText) opt._origText = opt.textContent;
    const orig = opt._origText.trim();
    if (lang === 'en') {
      opt.textContent = opt._origText;
    } else if (STRING_MAP[orig] && STRING_MAP[orig][lang]) {
      opt.textContent = STRING_MAP[orig][lang];
    }
  });
}

function getCurrentLanguage() {
  try {
    const saved = localStorage.getItem('assura_lang');
    if (saved && ['en', 'zh', 'bm', 'ta'].includes(saved)) return saved;
  } catch (e) {}
  
  const navLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
  if (navLang.startsWith('zh')) return 'zh';
  if (navLang.startsWith('ms') || navLang.startsWith('id')) return 'bm';
  if (navLang.startsWith('ta')) return 'ta';
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
