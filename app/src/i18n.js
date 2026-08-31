import React, { createContext, useContext, useState, useEffect } from 'react';

export const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'zh', label: '中文 (Chinese)', flag: '🇨🇳' },
  { code: 'bm', label: 'B. Melayu', flag: '🇲🇾' },
  { code: 'ta', label: 'தமிழ் (Tamil)', flag: '🇮🇳' },
];

export const TRANSLATIONS = {
  en: {
    // Navigation & Shell
    appTitle: 'Assura Case Management',
    home: 'Home',
    enquiries: 'Enquiries',
    intake: 'New Enquiries',
    care: 'Patient Care',
    cases: 'Cases',
    myCases: 'My Cases',
    escalations: 'Alerts',
    incidents: '🚨 Incidents',
    team: 'Team',
    roster: 'Roster',
    requests: 'Leave & Requests',
    payroll: '💰 Payroll & Commission',
    staff: 'Staff',
    approvals: 'Approvals',
    billing: 'Billing',
    invoices: 'Invoices',
    rates: 'Rate Card',
    myProfile: 'My Profile',
    signOut: 'Sign Out',
    notifications: 'Notifications',
    markAllRead: 'Mark all read',
    noNotifs: 'No notifications yet.',
    langSelect: 'Language',
    
    // Clinical Tabs & Screens
    vitals: 'MEWS Vitals',
    meds: 'Medications (MAR)',
    wound: 'Wound Care',
    handover: 'Handover Log',
    tubes: 'Tubes & Lines',
    clinicalDocs: 'Clinical Docs',
    summary: 'Clinical Summary',
    quote: 'Official Quote',
    invoice: 'Tax Invoice',
    chat: 'Case Chat',
    
    // Common Actions
    save: 'Save',
    cancel: 'Cancel',
    submit: 'Submit',
    apply: 'Apply for Case',
    approve: 'Approve',
    reject: 'Reject',
    clockIn: 'Clock In (GPS)',
    clockOut: 'Clock Out',
    downloadPdf: 'Download PDF',
    back: 'Back',
    search: 'Search...',
    edit: 'Edit',
    delete: 'Delete',
    loading: 'Loading…',
    status: 'Status',
    date: 'Date',
    time: 'Time',
    notes: 'Notes',
    action: 'Action',
    view: 'View',
    dismiss: 'Dismiss',
    
    // Auth & Setup
    signIn: 'Sign In',
    register: 'Register',
    phone: 'Mobile Phone',
    pin: 'Security PIN / Password',
    name: 'Full Name',
    role: 'Role',
    welcomeBack: 'Welcome back',
  },
  
  zh: {
    // Navigation & Shell
    appTitle: 'Assura 临床个案管理系统',
    home: '主页',
    enquiries: '咨询问诊',
    intake: '新咨询登记',
    care: '病患护理',
    cases: '个案列表',
    myCases: '我的个案',
    escalations: '紧急警报',
    incidents: '🚨 突发事件',
    team: '团队管理',
    roster: '排班表',
    requests: '请假与接案申请',
    payroll: '💰 薪资与分佣',
    staff: '员工档案',
    approvals: '审批中心',
    billing: '账单收费',
    invoices: '发票列表',
    rates: '收费价目表',
    myProfile: '个人资料',
    signOut: '登出',
    notifications: '通知中心',
    markAllRead: '全部标记为已读',
    noNotifs: '暂无新通知。',
    langSelect: '界面语言',
    
    // Clinical Tabs & Screens
    vitals: 'MEWS 生命体征',
    meds: '用药记录 (MAR)',
    wound: '伤口照片与评估',
    handover: '护士交接班日志',
    tubes: '管道与插管追踪',
    clinicalDocs: '医疗文件专区',
    summary: '临床综合报告',
    quote: '官方报价单',
    invoice: '正式税务发票',
    chat: '个案医护沟通群',
    
    // Common Actions
    save: '保存',
    cancel: '取消',
    submit: '提交',
    apply: '申请接案',
    approve: '批准',
    reject: '拒绝',
    clockIn: '打卡上班 (GPS)',
    clockOut: '打卡下班',
    downloadPdf: '下载 PDF 报告',
    back: '返回',
    search: '搜索...',
    edit: '编辑',
    delete: '删除',
    loading: '加载中…',
    status: '状态',
    date: '日期',
    time: '时间',
    notes: '备注',
    action: '操作',
    view: '查看',
    dismiss: '忽略',
    
    // Auth & Setup
    signIn: '登录系统',
    register: '新员工注册',
    phone: '手机号码',
    pin: '安全 PIN / 密码',
    name: '姓名',
    role: '职位角色',
    welcomeBack: '欢迎回来',
  },
  
  bm: {
    // Navigation & Shell
    appTitle: 'Pengurusan Kes Klinikal Assura',
    home: 'Utama',
    enquiries: 'Pertanyaan',
    intake: 'Pendaftaran Baharu',
    care: 'Penjagaan Pesakit',
    cases: 'Senarai Kes',
    myCases: 'Kes Saya',
    escalations: 'Amaran Kecemasan',
    incidents: '🚨 Laporan Insiden',
    team: 'Pasukan',
    roster: 'Jadual Bertugas',
    requests: 'Cuti & Permohonan',
    payroll: '💰 Gaji & Komisen',
    staff: 'Staf / Jururawat',
    approvals: 'Kelulusan',
    billing: 'Pengebilan',
    invoices: 'Invois',
    rates: 'Kadar Harga',
    myProfile: 'Profil Saya',
    signOut: 'Log Keluar',
    notifications: 'Pemberitahuan',
    markAllRead: 'Tanda semua dibaca',
    noNotifs: 'Tiada pemberitahuan baharu.',
    langSelect: 'Bahasa Pilihan',
    
    // Clinical Tabs & Screens
    vitals: 'Tanda Vital (MEWS)',
    meds: 'Ubat-ubatan (MAR)',
    wound: 'Penjagaan Luka',
    handover: 'Serah Tugas Jururawat',
    tubes: 'Tiub & Kateter',
    clinicalDocs: 'Dokumen Klinikal',
    summary: 'Ringkasan Klinikal',
    quote: 'Sebutharga Rasmi',
    invoice: 'Invois Cukai',
    chat: 'Mesej Kes',
    
    // Common Actions
    save: 'Simpan',
    cancel: 'Batal',
    submit: 'Hantar',
    apply: 'Mohon Bertugas',
    approve: 'Luluskan',
    reject: 'Tolak',
    clockIn: 'Rakam Masuk (GPS)',
    clockOut: 'Rakam Keluar',
    downloadPdf: 'Muat Turun PDF',
    back: 'Kembali',
    search: 'Cari...',
    edit: 'Kemaskini',
    delete: 'Padam',
    loading: 'Memuatkan…',
    status: 'Status',
    date: 'Tarikh',
    time: 'Masa',
    notes: 'Catatan',
    action: 'Tindakan',
    view: 'Lihat',
    dismiss: 'Tutup',
    
    // Auth & Setup
    signIn: 'Log Masuk',
    register: 'Daftar Staf Baharu',
    phone: 'Nombor Telefon',
    pin: 'PIN Keselamatan / Kata Laluan',
    name: 'Nama Penuh',
    role: 'Peranan',
    welcomeBack: 'Selamat kembali',
  },
  
  ta: {
    // Navigation & Shell
    appTitle: 'அசுரா மருத்துவ வழக்கு மேலாண்மை',
    home: 'முகப்பு',
    enquiries: 'விசாரணைகள்',
    intake: 'புதிய பதிவுகள்',
    care: 'நோயாளி பராமரிப்பு',
    cases: 'வழக்குகள்',
    myCases: 'எனது வழக்குகள்',
    escalations: 'அவசர எச்சரிக்கைகள்',
    incidents: '🚨 சம்பவங்கள்',
    team: 'குழு',
    roster: 'பணி அட்டவணை',
    requests: 'விடுமுறை & கோரிக்கைகள்',
    payroll: '💰 சம்பளம் & கமிஷன்',
    staff: 'ஊழியர்கள்',
    approvals: 'ஒப்புதல்கள்',
    billing: 'பில்லிங்',
    invoices: 'விலைப்பட்டியல்கள்',
    rates: 'கட்டண விபரம்',
    myProfile: 'எனது சுயவிவரம்',
    signOut: 'வெளியேறு',
    notifications: 'அறிவிப்புகள்',
    markAllRead: 'அனைத்தையும் படித்ததாகக் குறிக்கவும்',
    noNotifs: 'புதிய அறிவிப்புகள் எதுவும் இல்லை.',
    langSelect: 'மொழி',
    
    // Clinical Tabs & Screens
    vitals: 'உயிர் அறிகுறிகள் (MEWS)',
    meds: 'மருந்துகள் (MAR)',
    wound: 'காய பராமரிப்பு',
    handover: 'செவிலியர் பொறுப்பு ஒப்படைப்பு',
    tubes: 'குழாய்கள் & வடிகுழாய்கள்',
    clinicalDocs: 'மருத்துவ ஆவணங்கள்',
    summary: 'மருத்துவ சுருக்கம்',
    quote: 'மதிப்பீட்டு சீட்டு',
    invoice: 'வரி விலைப்பட்டியல்',
    chat: 'வழக்கு உரையாடல்',
    
    // Common Actions
    save: 'சேமி',
    cancel: 'ரத்து',
    submit: 'சமர்ப்பி',
    apply: 'பணிக்கு விண்ணப்பிக்கவும்',
    approve: 'ஒப்புதல்',
    reject: 'நிராகரி',
    clockIn: 'வருகை பதிவு (GPS)',
    clockOut: 'பணி நிறைவு பதிவு',
    downloadPdf: 'PDF பதிவிறக்கம்',
    back: 'பின்செல்க',
    search: 'தேடுக...',
    edit: 'திருத்து',
    delete: 'நீக்கு',
    loading: 'ஏற்றுகிறது…',
    status: 'நிலை',
    date: 'தேதி',
    time: 'நேரம்',
    notes: 'குறிப்புகள்',
    action: 'நடவடிக்கை',
    view: 'பார்வையிடு',
    dismiss: 'மூடு',
    
    // Auth & Setup
    signIn: 'உள்நுழையவும்',
    register: 'புதிய ஊழியர் பதிவு',
    phone: 'கைபேசி எண்',
    pin: 'பாதுகாப்பு பின் / கடவுச்சொல்',
    name: 'முழு பெயர்',
    role: 'பணிப் பதவி',
    welcomeBack: 'மீண்டும் நல்வரவு',
  }
};

const I18nContext = createContext({
  lang: 'en',
  setLang: () => {},
  t: (key) => key,
});

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      return localStorage.getItem('assura_staff_lang') || 'en';
    } catch (_) {
      return 'en';
    }
  });

  const setLang = (newLang) => {
    if (TRANSLATIONS[newLang]) {
      setLangState(newLang);
      try {
        localStorage.setItem('assura_staff_lang', newLang);
      } catch (_) {}
    }
  };

  const t = (key, fallback = '') => {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || fallback || key;
  };

  return React.createElement(
    I18nContext.Provider,
    { value: { lang, setLang, t } },
    children
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
