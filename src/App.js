import React, { useState, useMemo } from 'react';
import {
  Battery, DollarSign, Shield, Clock, Zap, Cog, Search, Scale,
  CheckCircle2, Award, Calculator,
  Sparkles, Target, Leaf, Languages
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, RadarChart,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine, Legend, Cell
} from 'recharts';

// ============ THEME: Warm Editorial / Architectural ============
const T = {
  paper:      '#F5EFE6',
  paperDark:  '#EDE3D2',
  ink:        '#1A1611',
  inkSoft:    '#2D2620',
  inkLight:   '#5C5147',
  inkDim:     '#8B7E70',
  terracotta: '#B5533C',
  terracottaDk:'#8E3F2C',
  ochre:      '#C8923D',
  ochreLight: '#E8B968',
  sage:       '#6B7A5C',
  sageLight:  '#94A381',
  burgundy:   '#7A2E2E',
  cobalt:     '#3B4F7E',
  border:     '#D4C9B5',
  borderDark: '#A89A82',
};

// ============ VENDOR DATA (bilingual) ============
const VENDORS = [
  {
    id: 'bidayat', rank: 1, cc: 0.5651,
    price: 1534000000, capacity: 1000, battery: 1152, color: T.sage,
    name: { ar: 'بداية الشمس', en: 'Bidayat Al-Shams' },
    type: { ar: 'هجين', en: 'Hybrid' },
    warranty: { ar: 'ضمان المصنع', en: 'Factory warranty' },
    badge: { ar: 'الأعلى جودة', en: 'Top Quality' },
    pros: {
      ar: ['التوثيق الأكثر اكتمالاً', 'بطاريات موثقة (1152 kWh)', 'شفافية عالية للمورد', 'يشمل ATS وتأريض وتدريب'],
      en: ['Most complete documentation', 'Documented batteries (1152 kWh)', 'High vendor transparency', 'Includes ATS, grounding, and training']
    },
    cons: {
      ar: ['أكبر من الحاجة الفعلية', 'تكلفة أولية مرتفعة'],
      en: ['Larger than actual demand', 'High upfront cost']
    },
    ratings: { price: 'ML', battery: 'VH', capacity: 'M', warranty: 'MH', tech: 'VH', transparency: 'H', dayNight: 'VH', auxiliary: 'VH', demandMatch: 'L' }
  },
  {
    id: 'qalaat', rank: 2, cc: 0.5517,
    price: 772675000, capacity: 500, battery: 430, color: T.ochre,
    name: { ar: 'قلعة الترائب', en: "Qal'at Al-Tara'ib" },
    type: { ar: 'هجين', en: 'Hybrid' },
    warranty: { ar: 'غير محدد', en: 'Not specified' },
    badge: { ar: 'أفضل قيمة', en: 'Best Value' },
    pros: {
      ar: ['مطابق للحاجة الفعلية (500 ك.و ≈ 440 ك.و)', 'تسعير مفصل وشفاف', 'يوفر 761 مليون د.ع', 'نظام هجين مع بطاريات'],
      en: ['Matches actual demand (500 kW ≈ 440 kW)', 'Detailed and transparent pricing', 'Saves 761M IQD', 'Hybrid system with batteries']
    },
    cons: {
      ar: ['الضمان غير واضح', 'سعة البطارية تقديرية', 'ملف الشركة أصغر'],
      en: ['Warranty unclear', 'Battery capacity estimated', 'Smaller company profile']
    },
    ratings: { price: 'H', battery: 'MH', capacity: 'ML', warranty: 'VL', tech: 'H', transparency: 'M', dayNight: 'H', auxiliary: 'MH', demandMatch: 'VH' }
  },
  {
    id: 'farber', rank: 3, cc: 0.4125,
    price: 2384000000, capacity: 1000, battery: 0, color: T.cobalt,
    name: { ar: 'فاربر (الأسوار)', en: 'Farber (Al-Aswar)' },
    type: { ar: 'هجين', en: 'Hybrid' },
    warranty: { ar: '5 سنوات', en: '5 years' },
    badge: { ar: '', en: '' },
    pros: {
      ar: ['علامة تجارية معروفة', 'ضمان واضح 5 سنوات', 'نظام ESS هجين'],
      en: ['Well-known brand', 'Clear 5-year warranty', 'Hybrid ESS system']
    },
    cons: {
      ar: ['الأغلى (2.4 مليار د.ع)', 'سعة البطارية غير محددة', 'حجم مفرط', 'صلاحية العرض 5 أيام فقط'],
      en: ['Most expensive (2.4B IQD)', 'Battery capacity undefined', 'Oversized', 'Quote valid only 5 days']
    },
    ratings: { price: 'VL', battery: 'M', capacity: 'M', warranty: 'H', tech: 'M', transparency: 'M', dayNight: 'H', auxiliary: 'M', demandMatch: 'L' }
  },
  {
    id: 'rouya', rank: 4, cc: 0.3649,
    price: 1360600000, capacity: 1160, battery: 0, color: T.terracotta,
    name: { ar: 'الرؤيا الذكية', en: 'Smart Vision' },
    type: { ar: 'مرتبط بالشبكة', en: 'Grid-tied' },
    warranty: { ar: '12 شهر', en: '12 months' },
    badge: { ar: '', en: '' },
    pros: {
      ar: ['شروط شاملة (13 بنداً)', 'هيكل مقاوم للرياح (140 كم/س)', 'تدريب وصيانة 12 شهر', 'دفع مرن (40+40+20%)'],
      en: ['Comprehensive terms (13 items)', 'Wind-resistant frame (140 km/h)', '12 months training & maintenance', 'Flexible payment (40+40+20%)']
    },
    cons: {
      ar: ['بدون بطاريات — نهاراً فقط', 'الأكثر مفرط الحجم', 'لا يعمل أثناء انقطاع الشبكة'],
      en: ['No batteries — daytime only', 'Most oversized', 'Does not work during grid outages']
    },
    ratings: { price: 'M', battery: 'VL', capacity: 'MH', warranty: 'L', tech: 'VH', transparency: 'VH', dayNight: 'VL', auxiliary: 'VH', demandMatch: 'VL' }
  },
  {
    id: 'qimah', rank: 5, cc: 0.3153,
    price: 950000000, capacity: 1000, battery: 640, color: T.burgundy,
    name: { ar: 'قمة السفينة', en: "Qimat Al-Safina" },
    type: { ar: 'هجين', en: 'Hybrid' },
    warranty: { ar: 'غير محدد', en: 'Not specified' },
    badge: { ar: '', en: '' },
    pros: {
      ar: ['أرخص نظام هجين', 'بطاريات LFP HV (تقنية جيدة)'],
      en: ['Cheapest hybrid system', 'LFP HV batteries (good tech)']
    },
    cons: {
      ar: ['معظم البنود "LOT" بدون تفاصيل', 'لا يوجد ضمان مذكور', 'لا توجد شروط دفع', 'عرض من صفحة واحدة فقط'],
      en: ['Most items listed as "LOT" with no details', 'No warranty mentioned', 'No payment terms', 'Single-page quote only']
    },
    ratings: { price: 'MH', battery: 'MH', capacity: 'M', warranty: 'VL', tech: 'VL', transparency: 'VL', dayNight: 'M', auxiliary: 'VL', demandMatch: 'L' }
  },
  {
    id: 'viva', rank: 6, cc: 0.2688,
    price: 550000000, capacity: 1116, battery: 0, color: T.inkLight,
    name: { ar: 'فيفا سولار', en: 'Viva Solar' },
    type: { ar: 'مرتبط بالشبكة', en: 'Grid-tied' },
    warranty: { ar: '25 سنة', en: '25 years' },
    badge: { ar: '', en: '' },
    pros: {
      ar: ['أرخص عرض على الإطلاق', 'ألواح ULICA ثنائية الوجه', 'ضمان ألواح 25 سنة', 'يشمل غرفة تبريد'],
      en: ['Cheapest offer overall', 'ULICA bifacial panels', '25-year panel warranty', 'Includes cooling room']
    },
    cons: {
      ar: ['كيبل AC غير مشمول!', 'تسعير بالدولار', 'بدون بطاريات', '7 عواكس فقط'],
      en: ['AC cable not included!', 'Priced in USD', 'No batteries', 'Only 7 inverters']
    },
    ratings: { price: 'VH', battery: 'VL', capacity: 'M', warranty: 'VH', tech: 'L', transparency: 'L', dayNight: 'VL', auxiliary: 'M', demandMatch: 'VL' }
  }
];

const CRITERIA_LIST = [
  { key: 'price',        label: { ar: 'السعر',                en: 'Price' },              weight: 0.95, type: 'cost',    icon: DollarSign },
  { key: 'battery',      label: { ar: 'سعة البطاريات',         en: 'Battery Capacity' },   weight: 0.85, type: 'benefit', icon: Battery },
  { key: 'capacity',     label: { ar: 'قدرة النظام',           en: 'System Capacity' },    weight: 0.30, type: 'benefit', icon: Zap },
  { key: 'warranty',     label: { ar: 'الضمان',                en: 'Warranty' },           weight: 0.85, type: 'benefit', icon: Shield },
  { key: 'tech',         label: { ar: 'التفاصيل التقنية',       en: 'Technical Details' },  weight: 0.85, type: 'benefit', icon: Search },
  { key: 'transparency', label: { ar: 'الشفافية',              en: 'Transparency' },       weight: 0.70, type: 'benefit', icon: CheckCircle2 },
  { key: 'dayNight',     label: { ar: 'تشغيل ليل ونهار',       en: 'Day/Night Operation' }, weight: 0.95, type: 'benefit', icon: Clock },
  { key: 'auxiliary',    label: { ar: 'المكونات المساعدة',      en: 'Auxiliary Components' }, weight: 0.70, type: 'benefit', icon: Cog },
  { key: 'demandMatch',  label: { ar: 'الملاءمة للحاجة',        en: 'Demand Match' },       weight: 0.95, type: 'benefit', icon: Scale }
];

const RATING_VALUES = { VL: 1, L: 2, ML: 3, M: 4, MH: 5, H: 6, VH: 7 };

// ============ STRINGS ============
const STR = {
  ar: {
    headerKicker: 'تقرير اختيار مورد',
    headerTitle: 'منظومة الطاقة الشمسية',
    headerInstitution: 'جامعة الإمام الصادق · بغداد · مشروع الطاقة الشمسية',
    nav: { comparison: 'مقارنة العروض', lab: 'مختبر القرار', financial: 'العائد المالي' },
    langButton: 'EN',
    section1Num: 'القسم الأول',
    section1Title: 'مقارنة العروض',
    section1Sub: 'ستة موردين متقدمين، كل منهم يقدم رؤية مختلفة لتلبية احتياجات الجامعة من الطاقة الشمسية.',
    pq: { highest: 'الأعلى ترتيباً', priceRange: 'نطاق الأسعار', actualNeed: 'الحاجة الفعلية', bestFit: 'الأنسب للحاجة' },
    pqPriceRangeValue: '٥٥٠م – ٢٫٤ مليار',
    pqPriceRangeSub: 'دينار عراقي',
    pqActualNeedValue: '٤٤٠ ك.و',
    pqActualNeedSub: 'مقابل ١ ميجا واط متوسط',
    pqBestFitSub: 'العرض الوحيد المُحجّم',
    vendorIndex: 'فهرس الموردين',
    vendorIndexHint: 'اضغط للاختيار · حد أقصى ٤',
    closenessCoef: 'معامل القرب',
    price: 'السعر',
    iqd: 'د.ع',
    capacity: 'القدرة',
    kw: 'ك.و',
    detailedComparison: 'مقارنة تفصيلية',
    vendorsCount: (n) => n === 1 ? 'مورد واحد' : n === 2 ? 'موردان' : `${n} موردين`,
    multiDimComparison: 'مقارنة متعددة الأبعاد',
    multiDimSub: 'كل محور يمثل معياراً — كلما زادت المساحة كان التقييم العام أفضل',
    rankPrefix: 'المرتبة #',
    battery: 'البطارية',
    type: 'النوع',
    strengths: '▲ نقاط القوة',
    concerns: '▼ نقاط الحذر',
    section2Num: 'القسم الثاني',
    section2Title: 'مختبر القرار',
    section2Sub: 'عدّل أهمية كل معيار وشاهد كيف يتغيّر الترتيب لحظياً. هذه أداة لاختبار افتراضاتك ورؤية النتائج بنفسك.',
    criteriaWeights: 'أوزان المعايير',
    reset: '↺ إعادة',
    costBadge: 'تكلفة',
    liveRanking: 'الترتيب المباشر',
    ccComparison: 'مقارنة معامل القرب',
    section3Num: 'القسم الثالث',
    section3Title: 'العائد المالي',
    section3Sub: 'تحليل الوفورات التراكمية على مدى ٢٥ عاماً مع معاملات قابلة للتعديل تعكس الواقع الاقتصادي العراقي.',
    chooseVendors: 'اختر الموردين للمقارنة',
    selectedMax: (n) => `${n} مختار · حد أقصى ٤`,
    financialParams: 'المعاملات المالية',
    paramElectricity: { label: 'سعر الكهرباء', unit: 'د.ع/kWh' },
    paramInflation:   { label: 'معدل التضخم السنوي', unit: '٪' },
    paramDegradation: { label: 'معدل تدهور الألواح', unit: '٪/سنة' },
    paramSunshine:    { label: 'ساعات سطوع الشمس', unit: 'ساعة' },
    paramMaintenance: { label: 'الصيانة السنوية', unit: 'مليون د.ع' },
    resetDefaults: '↺ إعادة للقيم الافتراضية',
    cumulative25y: 'الوفورات التراكمية على ٢٥ سنة',
    cumulativeSub: 'القيم السالبة = ما زال هناك سداد · الصفر = نقطة التعادل · القيم الموجبة = وفورات صافية',
    millionIQD: 'مليون د.ع',
    yearAxisLabel: (year) => `سنة ${year}`,
    environmental25y: 'الأثر البيئي على ٢٥ سنة',
    co2Saved: 'ثاني أكسيد الكربون الموفّر',
    tons: 'طن',
    carsOff: (n) => `≈ ${n.toLocaleString('ar')} سيارة خارج الطريق لمدة عام`,
    treesPlanted: (n) => `≈ ${n.toLocaleString('ar')} شجرة مزروعة`,
    initialInvestment: 'الاستثمار الأولي',
    paybackPeriod: 'فترة الاسترداد',
    yearsLabel: (n) => `${n} سنة`,
    over25Years: '> ٢٥ سنة',
    netAfter25y: 'الصافي بعد ٢٥ سنة',
    billion: 'مليار',
    roi: 'العائد على الاستثمار',
    annualProduction: 'الإنتاج السنوي',
    thousandKwh: 'ألف kWh',
    methodology: 'المنهجية: Fuzzy TOPSIS بأرقام ضبابية مثلثية · 6 بدائل × 9 معايير'
  },
  en: {
    headerKicker: 'Vendor Selection Report',
    headerTitle: 'Solar Energy System',
    headerInstitution: "Imam Al-Sadiq University · Baghdad · Solar Energy Project",
    nav: { comparison: 'Vendor Comparison', lab: 'Decision Lab', financial: 'Financial ROI' },
    langButton: 'العربية',
    section1Num: 'Section One',
    section1Title: 'Vendor Comparison',
    section1Sub: "Six leading vendors, each presenting a different vision for meeting the university's solar energy needs.",
    pq: { highest: 'Top Ranked', priceRange: 'Price Range', actualNeed: 'Actual Demand', bestFit: 'Best Fit' },
    pqPriceRangeValue: '550M – 2.4B',
    pqPriceRangeSub: 'Iraqi Dinar (IQD)',
    pqActualNeedValue: '440 kW',
    pqActualNeedSub: 'vs. ~1 MW average offered',
    pqBestFitSub: 'The only right-sized offer',
    vendorIndex: 'Vendor Index',
    vendorIndexHint: 'Click to select · max 4',
    closenessCoef: 'Closeness Coef.',
    price: 'Price',
    iqd: 'IQD',
    capacity: 'Capacity',
    kw: 'kW',
    detailedComparison: 'Detailed Comparison',
    vendorsCount: (n) => `${n} vendor${n === 1 ? '' : 's'}`,
    multiDimComparison: 'Multi-Dimensional Comparison',
    multiDimSub: 'Each axis represents a criterion — larger area means a better overall rating',
    rankPrefix: 'Rank #',
    battery: 'Battery',
    type: 'Type',
    strengths: '▲ Strengths',
    concerns: '▼ Concerns',
    section2Num: 'Section Two',
    section2Title: 'Decision Lab',
    section2Sub: 'Adjust the importance of each criterion and watch the ranking change in real time. A tool to test your assumptions and see results yourself.',
    criteriaWeights: 'Criterion Weights',
    reset: '↺ Reset',
    costBadge: 'cost',
    liveRanking: 'Live Ranking',
    ccComparison: 'Closeness Coefficient Comparison',
    section3Num: 'Section Three',
    section3Title: 'Financial ROI',
    section3Sub: 'Analysis of cumulative savings over 25 years with adjustable parameters reflecting Iraqi economic reality.',
    chooseVendors: 'Choose vendors to compare',
    selectedMax: (n) => `${n} selected · max 4`,
    financialParams: 'Financial Parameters',
    paramElectricity: { label: 'Electricity Price', unit: 'IQD/kWh' },
    paramInflation:   { label: 'Annual Inflation', unit: '%' },
    paramDegradation: { label: 'Panel Degradation', unit: '%/year' },
    paramSunshine:    { label: 'Sunshine Hours', unit: 'hours' },
    paramMaintenance: { label: 'Annual Maintenance', unit: 'million IQD' },
    resetDefaults: '↺ Reset to defaults',
    cumulative25y: 'Cumulative Savings Over 25 Years',
    cumulativeSub: 'Negative = still paying back · Zero = break-even · Positive = net savings',
    millionIQD: 'Million IQD',
    yearAxisLabel: (year) => `Year ${year}`,
    environmental25y: 'Environmental Impact Over 25 Years',
    co2Saved: 'CO₂ Avoided',
    tons: 'tons',
    carsOff: (n) => `≈ ${n.toLocaleString('en')} cars off the road for a year`,
    treesPlanted: (n) => `≈ ${n.toLocaleString('en')} trees planted`,
    initialInvestment: 'Initial Investment',
    paybackPeriod: 'Payback Period',
    yearsLabel: (n) => `${n} year${n === 1 ? '' : 's'}`,
    over25Years: '> 25 years',
    netAfter25y: '25-Year Net',
    billion: 'B',
    roi: 'Return on Investment',
    annualProduction: 'Annual Production',
    thousandKwh: 'k kWh',
    methodology: 'Methodology: Fuzzy TOPSIS with Triangular Fuzzy Numbers · 6 Alternatives × 9 Criteria'
  }
};

// ============ FORMATTERS ============
const fmtIQD = (n, lang) => {
  if (lang === 'ar') {
    if (n >= 1e9) return `${(n / 1e9).toFixed(2)} مليار`;
    if (n >= 1e6) return `${(n / 1e6).toFixed(0)} مليون`;
    return n.toLocaleString('ar');
  }
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(0)}M`;
  return n.toLocaleString('en');
};
const fmtNum = (n, lang) => n.toLocaleString(lang === 'ar' ? 'ar' : 'en');
const fmtDate = (d, lang) => d.toLocaleDateString(lang === 'ar' ? 'ar-IQ' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' });

const recalculateRanking = (weights) => {
  const total = Object.values(weights).reduce((a, b) => a + b, 0);
  const norm = {};
  Object.keys(weights).forEach(k => norm[k] = weights[k] / total);
  const scored = VENDORS.map(v => {
    let score = 0, anti = 0;
    Object.keys(v.ratings).forEach(c => {
      const r = RATING_VALUES[v.ratings[c]] / 7;
      score += r * (norm[c] || 0);
      anti += (1 - r) * (norm[c] || 0);
    });
    return { ...v, cc: score / (score + anti) };
  }).sort((a, b) => b.cc - a.cc);
  return scored.map((v, i) => ({ ...v, rank: i + 1 }));
};

const calculateROI = (vendor, params) => {
  const { electricityPrice, annualPriceIncrease, degradationRate, sunshineHours, annualMaintenance } = params;
  const annualProduction = vendor.capacity * sunshineHours * 365;
  const years = Array.from({ length: 26 }, (_, i) => i);
  const data = years.map(year => {
    const deg = Math.pow(1 - degradationRate / 100, year);
    const yearProd = annualProduction * deg;
    const priceM = Math.pow(1 + annualPriceIncrease / 100, year);
    const yearSavings = year === 0 ? 0 : yearProd * electricityPrice * priceM;
    const yearMaint = year === 0 ? 0 : annualMaintenance * priceM;
    return { year, net: yearSavings - yearMaint, production: yearProd };
  });
  let cumul = -vendor.price;
  const cumulData = data.map(d => { cumul += d.net; return { year: d.year, cumulative: cumul, annual: d.net }; });
  const paybackYear = cumulData.findIndex(d => d.cumulative >= 0);
  const totalSavings25Y = cumulData[25].cumulative + vendor.price;
  return {
    cumulativeData: cumulData,
    paybackYear: paybackYear === -1 ? null : paybackYear,
    totalSavings25Y, roi25Y: ((totalSavings25Y - vendor.price) / vendor.price) * 100,
    annualProduction,
    co2Saved25Y: data.reduce((acc, d) => acc + d.production * 0.45 / 1000, 0)
  };
};

// ============ DECORATIVE PATTERNS ============
const PaperGrain = () => (
  <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.4 }}>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" />
      <feColorMatrix values="0 0 0 0 0.1 0 0 0 0 0.08 0 0 0 0 0.06 0 0 0 0.08 0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#grain)" />
  </svg>
);

const Ornament = ({ size = 24, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ display: 'inline-block' }}>
    <circle cx="12" cy="12" r="2" fill={color} />
    <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="0.5" fill="none" />
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="0.3" fill="none" strokeDasharray="1 2" />
  </svg>
);

// ============ MAIN ============
export default function App() {
  const [lang, setLang] = useState('ar');
  const [view, setView] = useState('comparison');
  const [selectedVendors, setSelectedVendors] = useState(['bidayat', 'qalaat']);
  const [weights, setWeights] = useState(Object.fromEntries(CRITERIA_LIST.map(c => [c.key, c.weight])));
  const [financialParams, setFinancialParams] = useState({
    electricityPrice: 120, annualPriceIncrease: 5, degradationRate: 0.5,
    sunshineHours: 6, annualMaintenance: 15000000
  });
  const rankedVendors = useMemo(() => recalculateRanking(weights), [weights]);
  const toggleVendor = (id) => {
    if (selectedVendors.includes(id)) {
      if (selectedVendors.length > 1) setSelectedVendors(selectedVendors.filter(v => v !== id));
    } else { if (selectedVendors.length < 4) setSelectedVendors([...selectedVendors, id]); }
  };

  const s = STR[lang];
  const isAr = lang === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';
  const bodyFont = isAr ? '"Tajawal", -apple-system, sans-serif' : '"Inter", -apple-system, sans-serif';
  const displayFont = isAr ? "'Amiri', serif" : "'Playfair Display', serif";
  const kufiFont = isAr ? "'Reem Kufi', sans-serif" : "'Inter', sans-serif";

  return (
    <div dir={dir} lang={lang} style={{
      minHeight: '100vh', background: T.paper, color: T.ink,
      fontFamily: bodyFont, position: 'relative'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;900&family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Reem+Kufi:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        body { font-family: ${bodyFont}; background: ${T.paper}; }
        input[type="range"] { direction: ltr; -webkit-appearance: none; appearance: none; height: 4px; background: ${T.border}; border-radius: 2px; outline: none; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 18px; height: 18px; background: ${T.terracotta}; border-radius: 50%; cursor: pointer; border: 2px solid ${T.paper}; box-shadow: 0 2px 6px rgba(0,0,0,0.15); }
        input[type="range"]::-moz-range-thumb { width: 18px; height: 18px; background: ${T.terracotta}; border-radius: 50%; cursor: pointer; border: 2px solid ${T.paper}; }
        .h-display { font-family: ${displayFont}; font-weight: 700; }
        .h-kufi { font-family: ${kufiFont}; font-weight: 600; letter-spacing: 0.02em; }
        .num-eng { font-family: ${isAr ? "'Reem Kufi', sans-serif" : "'Inter', sans-serif"}; }
      `}</style>

      <PaperGrain />

      {/* HEADER */}
      <header style={{ borderBottom: `2px solid ${T.ink}`, background: T.paper, position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div style={{ fontSize: '11px', color: T.terracotta, letterSpacing: '0.3em', fontWeight: 600, marginBottom: '6px' }}>
                — {s.headerKicker} · {fmtDate(new Date(), lang)} —
              </div>
              <h1 className="h-display" style={{ fontSize: '38px', lineHeight: 1, color: T.ink, margin: 0 }}>
                {s.headerTitle}
              </h1>
              <div style={{ fontSize: '13px', color: T.inkLight, marginTop: '4px' }}>
                {s.headerInstitution}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Ornament size={28} color={T.terracotta} />
              <nav style={{ display: 'flex', gap: '4px', borderTop: `1px solid ${T.borderDark}`, borderBottom: `1px solid ${T.borderDark}`, padding: '6px 0' }}>
                {[
                  { id: 'comparison', label: s.nav.comparison, num: '01' },
                  { id: 'lab', label: s.nav.lab, num: '02' },
                  { id: 'financial', label: s.nav.financial, num: '03' }
                ].map(tab => {
                  const active = view === tab.id;
                  return (
                    <button key={tab.id} onClick={() => setView(tab.id)} style={{
                      background: active ? T.ink : 'transparent',
                      color: active ? T.paper : T.ink,
                      padding: '8px 16px', fontSize: '13px', fontWeight: 600,
                      border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                      fontFamily: kufiFont, transition: 'all 0.2s'
                    }}>
                      <span style={{ fontSize: '10px', color: active ? T.ochreLight : T.inkDim, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>{tab.num}</span>
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
              {/* Language toggle */}
              <button
                onClick={() => setLang(isAr ? 'en' : 'ar')}
                title={isAr ? 'Switch to English' : 'التبديل إلى العربية'}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  background: T.paper, border: `1.5px solid ${T.ink}`,
                  padding: '6px 12px', fontSize: '12px', fontWeight: 700,
                  color: T.ink, cursor: 'pointer',
                  fontFamily: kufiFont, letterSpacing: '0.05em',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = T.ink; e.currentTarget.style.color = T.paper; }}
                onMouseOut={(e) => { e.currentTarget.style.background = T.paper; e.currentTarget.style.color = T.ink; }}
              >
                <Languages size={14} strokeWidth={2} />
                {s.langButton}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 32px', position: 'relative', zIndex: 1 }}>
        {view === 'comparison' && <ComparisonView vendors={rankedVendors} selectedVendors={selectedVendors} toggleVendor={toggleVendor} lang={lang} s={s} dir={dir} />}
        {view === 'lab' && <DecisionLabView weights={weights} setWeights={setWeights} rankedVendors={rankedVendors} lang={lang} s={s} dir={dir} />}
        {view === 'financial' && <FinancialView vendors={rankedVendors} params={financialParams} setParams={setFinancialParams} selectedVendors={selectedVendors} toggleVendor={toggleVendor} lang={lang} s={s} dir={dir} />}
      </main>

      <footer style={{ borderTop: `2px solid ${T.ink}`, marginTop: '60px', padding: '32px', background: T.paperDark, position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <Ornament size={14} color={T.ochre} />
          <div style={{ fontSize: '12px', color: T.inkLight, fontStyle: 'italic' }}>
            {s.methodology}
          </div>
          <Ornament size={14} color={T.ochre} />
        </div>
      </footer>
    </div>
  );
}

// ============ SECTION HEADER ============
function SectionHeader({ num, title, subtitle }) {
  return (
    <div style={{ marginBottom: '32px', borderBottom: `1px solid ${T.borderDark}`, paddingBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '20px', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '20px', color: T.terracotta, fontWeight: 400 }}>
          {num}
        </span>
        <h2 className="h-display" style={{ fontSize: '32px', color: T.ink, margin: 0, lineHeight: 1.1 }}>
          {title}
        </h2>
      </div>
      {subtitle && (
        <p style={{ fontSize: '14px', color: T.inkLight, marginTop: '8px', marginInlineStart: '40px', fontStyle: 'italic', maxWidth: '700px', lineHeight: 1.6 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ============ COMPARISON VIEW ============
function ComparisonView({ vendors, selectedVendors, toggleVendor, lang, s, dir }) {
  const compared = vendors.filter(v => selectedVendors.includes(v.id));
  const qalaat = vendors.find(v => v.id === 'qalaat');

  return (
    <div>
      <SectionHeader num={s.section1Num} title={s.section1Title} subtitle={s.section1Sub} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0', marginBottom: '40px', border: `1px solid ${T.ink}` }}>
        <PullQuote icon={Award} label={s.pq.highest} value={vendors[0].name[lang]} sub={`CC = ${vendors[0].cc.toFixed(4)}`} accent={T.sage} />
        <PullQuote icon={DollarSign} label={s.pq.priceRange} value={s.pqPriceRangeValue} sub={s.pqPriceRangeSub} accent={T.ochre} divider />
        <PullQuote icon={Target} label={s.pq.actualNeed} value={s.pqActualNeedValue} sub={s.pqActualNeedSub} accent={T.cobalt} divider />
        <PullQuote icon={Sparkles} label={s.pq.bestFit} value={qalaat.name[lang]} sub={s.pqBestFitSub} accent={T.terracotta} divider />
      </div>

      <div style={{ marginBottom: '48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
          <h3 className="h-kufi" style={{ fontSize: '20px', color: T.ink, margin: 0 }}>
            {s.vendorIndex}
          </h3>
          <div style={{ fontSize: '12px', color: T.inkDim, fontStyle: 'italic' }}>
            {s.vendorIndexHint}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '0', border: `1px solid ${T.ink}` }}>
          {vendors.map((v, idx) => {
            const selected = selectedVendors.includes(v.id);
            return (
              <button key={v.id} onClick={() => toggleVendor(v.id)} style={{
                textAlign: 'start', padding: '20px',
                background: selected ? T.paperDark : T.paper,
                border: 'none',
                borderBottom: idx < vendors.length - 1 ? `1px solid ${T.border}` : 'none',
                borderInlineEnd: (idx % 3 !== 2 && idx < vendors.length) ? `1px solid ${T.border}` : 'none',
                cursor: 'pointer', position: 'relative', transition: 'all 0.2s',
                fontFamily: 'inherit', color: T.ink
              }}>
                {selected && (
                  <div style={{ position: 'absolute', top: 0, insetInlineStart: 0, width: '4px', height: '100%', background: v.color }} />
                )}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                    <span className="h-display" style={{ fontSize: '32px', color: v.color, lineHeight: 1, fontStyle: 'italic' }}>
                      {v.rank}
                    </span>
                    <div>
                      <div className="h-kufi" style={{ fontSize: '17px', color: T.ink, lineHeight: 1.2 }}>{v.name[lang]}</div>
                      {v.badge[lang] && (
                        <span style={{
                          display: 'inline-block', marginTop: '4px',
                          fontSize: '10px', padding: '2px 8px',
                          background: v.color, color: T.paper,
                          letterSpacing: '0.1em', fontWeight: 600
                        }}>{v.badge[lang]}</span>
                      )}
                    </div>
                  </div>
                  {selected && <CheckCircle2 size={18} color={v.color} strokeWidth={2.5} />}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', paddingTop: '12px', borderTop: `1px dashed ${T.border}` }}>
                  <DataPoint label={s.closenessCoef} value={v.cc.toFixed(4)} accent={v.color} />
                  <DataPoint label={s.price} value={fmtIQD(v.price, lang)} unit={s.iqd} />
                  <DataPoint label={s.capacity} value={v.capacity} unit={s.kw} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ marginBottom: '48px' }}>
        <h3 className="h-kufi" style={{ fontSize: '20px', color: T.ink, margin: '0 0 20px' }}>
          {s.detailedComparison}
          <span style={{ fontSize: '13px', color: T.inkDim, marginInlineStart: '12px', fontWeight: 400, fontStyle: 'italic' }}>
            ({s.vendorsCount(compared.length)})
          </span>
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(compared.length, 4)}, 1fr)`, gap: '20px' }}>
          {compared.map(v => <VendorDetailCard key={v.id} v={v} lang={lang} s={s} />)}
        </div>
      </div>

      {compared.length >= 2 && (
        <div style={{ background: T.paperDark, padding: '32px', border: `1px solid ${T.border}` }}>
          <h3 className="h-kufi" style={{ fontSize: '20px', color: T.ink, margin: '0 0 4px' }}>
            {s.multiDimComparison}
          </h3>
          <p style={{ fontSize: '13px', color: T.inkLight, marginBottom: '20px', fontStyle: 'italic' }}>
            {s.multiDimSub}
          </p>
          <div style={{ height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={CRITERIA_LIST.map(c => {
                const point = { criterion: c.label[lang] };
                compared.forEach(v => { point[v.name[lang]] = RATING_VALUES[v.ratings[c.key]]; });
                return point;
              })}>
                <PolarGrid stroke={T.borderDark} strokeWidth={0.5} />
                <PolarAngleAxis dataKey="criterion" tick={{ fill: T.ink, fontSize: 12, fontWeight: 600 }} />
                <PolarRadiusAxis domain={[0, 7]} tick={{ fill: T.inkDim, fontSize: 10 }} stroke={T.borderDark} />
                {compared.map(v => (
                  <Radar key={v.id} name={v.name[lang]} dataKey={v.name[lang]}
                    stroke={v.color} fill={v.color} fillOpacity={0.18} strokeWidth={2} />
                ))}
                <Legend wrapperStyle={{ color: T.ink, fontSize: '13px', paddingTop: '20px' }} />
                <Tooltip contentStyle={{ background: T.paper, border: `1px solid ${T.ink}`, borderRadius: 0, direction: dir, fontFamily: 'inherit' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

// ============ PULL QUOTE STAT ============
function PullQuote({ icon: Icon, label, value, sub, accent, divider }) {
  return (
    <div style={{
      padding: '24px',
      borderInlineEnd: divider ? `1px solid ${T.border}` : 'none',
      position: 'relative'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <Icon size={14} color={accent} strokeWidth={2} />
        <div style={{ fontSize: '11px', color: T.inkLight, letterSpacing: '0.15em', fontWeight: 600 }}>
          {label}
        </div>
      </div>
      <div className="h-display" style={{ fontSize: '22px', color: T.ink, lineHeight: 1.1, marginBottom: '4px' }}>
        {value}
      </div>
      <div style={{ fontSize: '12px', color: T.inkDim, fontStyle: 'italic' }}>{sub}</div>
    </div>
  );
}

function DataPoint({ label, value, unit, accent }) {
  return (
    <div>
      <div style={{ fontSize: '10px', color: T.inkDim, letterSpacing: '0.05em', marginBottom: '2px' }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
        <span className="num-eng" style={{ fontSize: '15px', fontWeight: 700, color: accent || T.ink }}>{value}</span>
        {unit && <span style={{ fontSize: '11px', color: T.inkLight }}>{unit}</span>}
      </div>
    </div>
  );
}

function VendorDetailCard({ v, lang, s }) {
  return (
    <div style={{ background: T.paper, border: `1px solid ${T.ink}`, position: 'relative' }}>
      <div style={{ background: v.color, padding: '14px 20px', color: T.paper }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div className="h-kufi" style={{ fontSize: '17px' }}>{v.name[lang]}</div>
            <div style={{ fontSize: '11px', opacity: 0.85, marginTop: '2px', fontStyle: 'italic' }}>
              {s.rankPrefix}{v.rank} · CC = {v.cc.toFixed(4)}
            </div>
          </div>
          <span className="h-display" style={{ fontSize: '36px', lineHeight: 1, fontStyle: 'italic', opacity: 0.4 }}>
            {v.rank}
          </span>
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', paddingBottom: '16px', borderBottom: `1px dashed ${T.border}`, marginBottom: '16px' }}>
          <DataPoint label={s.price} value={fmtIQD(v.price, lang)} unit={s.iqd} />
          <DataPoint label={s.capacity} value={v.capacity} unit={s.kw} />
          <DataPoint label={s.battery} value={v.battery || '—'} unit={v.battery ? 'kWh' : ''} />
          <DataPoint label={s.type} value={v.type[lang]} />
        </div>

        <div style={{ marginBottom: '14px' }}>
          <div style={{ fontSize: '10px', color: T.sage, letterSpacing: '0.15em', fontWeight: 700, marginBottom: '8px' }}>
            {s.strengths}
          </div>
          {v.pros[lang].slice(0, 3).map((p, i) => (
            <div key={i} style={{ fontSize: '12px', color: T.inkSoft, lineHeight: 1.5, paddingInlineStart: '12px', marginBottom: '4px', position: 'relative' }}>
              <span style={{ position: 'absolute', insetInlineStart: 0, color: T.sage, fontWeight: 700 }}>·</span>
              {p}
            </div>
          ))}
        </div>

        <div>
          <div style={{ fontSize: '10px', color: T.terracotta, letterSpacing: '0.15em', fontWeight: 700, marginBottom: '8px' }}>
            {s.concerns}
          </div>
          {v.cons[lang].slice(0, 2).map((c, i) => (
            <div key={i} style={{ fontSize: '12px', color: T.inkSoft, lineHeight: 1.5, paddingInlineStart: '12px', marginBottom: '4px', position: 'relative' }}>
              <span style={{ position: 'absolute', insetInlineStart: 0, color: T.terracotta, fontWeight: 700 }}>·</span>
              {c}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ DECISION LAB ============
function DecisionLabView({ weights, setWeights, rankedVendors, lang, s, dir }) {
  const updateWeight = (key, value) => setWeights(prev => ({ ...prev, [key]: parseFloat(value) }));
  const resetWeights = () => setWeights(Object.fromEntries(CRITERIA_LIST.map(c => [c.key, c.weight])));

  return (
    <div>
      <SectionHeader num={s.section2Num} title={s.section2Title} subtitle={s.section2Sub} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
        <div style={{ background: T.paper, border: `1px solid ${T.ink}` }}>
          <div style={{ borderBottom: `1px solid ${T.ink}`, padding: '16px 20px', background: T.paperDark, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="h-kufi" style={{ fontSize: '16px', color: T.ink, margin: 0 }}>{s.criteriaWeights}</h3>
            <button onClick={resetWeights} style={{
              background: 'transparent', border: `1px solid ${T.ink}`,
              padding: '4px 12px', fontSize: '11px', color: T.ink,
              cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600
            }}>
              {s.reset}
            </button>
          </div>
          <div style={{ padding: '20px' }}>
            {CRITERIA_LIST.map((c, idx) => {
              const Icon = c.icon;
              const val = weights[c.key];
              const isCost = c.type === 'cost';
              return (
                <div key={c.key} style={{ marginBottom: idx < CRITERIA_LIST.length - 1 ? '20px' : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Icon size={14} color={isCost ? T.terracotta : T.sage} strokeWidth={2} />
                      <span style={{ fontSize: '13px', color: T.ink, fontWeight: 600 }}>{c.label[lang]}</span>
                      {isCost && (
                        <span style={{ fontSize: '9px', color: T.terracotta, padding: '1px 6px', border: `1px solid ${T.terracotta}`, letterSpacing: '0.1em', fontWeight: 700 }}>
                          {s.costBadge}
                        </span>
                      )}
                    </div>
                    <span className="num-eng" style={{ fontSize: '13px', color: T.terracotta, fontWeight: 700 }}>
                      {val.toFixed(2)}
                    </span>
                  </div>
                  <input type="range" min="0" max="1" step="0.05" value={val}
                    onChange={(e) => updateWeight(c.key, e.target.value)}
                    style={{ width: '100%' }} />
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ background: T.paper, border: `1px solid ${T.ink}` }}>
          <div style={{ borderBottom: `1px solid ${T.ink}`, padding: '16px 20px', background: T.paperDark }}>
            <h3 className="h-kufi" style={{ fontSize: '16px', color: T.ink, margin: 0 }}>{s.liveRanking}</h3>
          </div>
          <div style={{ padding: '20px' }}>
            {rankedVendors.map((v, i) => (
              <div key={v.id} style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '12px 14px', marginBottom: '8px',
                background: i === 0 ? T.sage + '15' : 'transparent',
                border: `1px solid ${i === 0 ? T.sage : T.border}`,
                position: 'relative'
              }}>
                <span className="h-display" style={{ fontSize: '28px', fontStyle: 'italic', color: v.color, lineHeight: 1, minWidth: '30px' }}>
                  {v.rank}
                </span>
                <div style={{ flex: 1 }}>
                  <div className="h-kufi" style={{ fontSize: '14px', color: T.ink }}>{v.name[lang]}</div>
                  <div style={{ fontSize: '11px', color: T.inkDim, fontStyle: 'italic' }}>
                    {fmtIQD(v.price, lang)} {s.iqd} · {v.capacity} {s.kw}
                  </div>
                </div>
                <div style={{ textAlign: 'end' }}>
                  <div className="num-eng" style={{ fontSize: '15px', fontWeight: 700, color: v.color }}>
                    {v.cc.toFixed(4)}
                  </div>
                  <div style={{ width: '70px', height: '3px', background: T.border, marginTop: '4px' }}>
                    <div style={{ width: `${v.cc * 100}%`, height: '100%', background: v.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: T.paperDark, padding: '32px', border: `1px solid ${T.border}` }}>
        <h3 className="h-kufi" style={{ fontSize: '18px', color: T.ink, margin: '0 0 20px' }}>
          {s.ccComparison}
        </h3>
        <div style={{ height: '320px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rankedVendors.map(v => ({ name: v.name[lang], CC: v.cc, fill: v.color }))} layout="vertical" margin={{ left: 110, right: 20 }}>
              <CartesianGrid stroke={T.borderDark} strokeDasharray="2 4" horizontal={false} />
              <XAxis type="number" domain={[0, 0.7]} tick={{ fill: T.inkLight, fontSize: 11 }} stroke={T.borderDark} />
              <YAxis type="category" dataKey="name" tick={{ fill: T.ink, fontSize: 12, fontWeight: 600 }} stroke={T.borderDark} width={110} />
              <Tooltip contentStyle={{ background: T.paper, border: `1px solid ${T.ink}`, borderRadius: 0, direction: dir, fontFamily: 'inherit' }} />
              <ReferenceLine x={0.5} stroke={T.terracotta} strokeDasharray="3 3" />
              <Bar dataKey="CC">
                {rankedVendors.map((v, i) => (<Cell key={i} fill={v.color} />))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// ============ FINANCIAL VIEW ============
function FinancialView({ vendors, params, setParams, selectedVendors, toggleVendor, lang, s, dir }) {
  const compared = vendors.filter(v => selectedVendors.includes(v.id));
  const calcs = useMemo(() => compared.map(v => ({ vendor: v, ...calculateROI(v, params) })), [compared, params]);
  const combinedChart = useMemo(() => {
    const years = Array.from({ length: 26 }, (_, i) => i);
    return years.map(year => {
      const point = { year: s.yearAxisLabel(year) };
      calcs.forEach(c => { point[c.vendor.name[lang]] = Math.round(c.cumulativeData[year].cumulative / 1e6); });
      return point;
    });
  }, [calcs, lang, s]);

  return (
    <div>
      <SectionHeader num={s.section3Num} title={s.section3Title} subtitle={s.section3Sub} />

      <div style={{ background: T.paper, border: `1px solid ${T.ink}`, padding: '20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 className="h-kufi" style={{ fontSize: '15px', color: T.ink, margin: 0 }}>{s.chooseVendors}</h3>
          <span style={{ fontSize: '11px', color: T.inkDim, fontStyle: 'italic' }}>{s.selectedMax(compared.length)}</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {vendors.map(v => {
            const selected = selectedVendors.includes(v.id);
            return (
              <button key={v.id} onClick={() => toggleVendor(v.id)} style={{
                padding: '8px 14px', fontSize: '13px',
                background: selected ? v.color : T.paper,
                border: `1.5px solid ${selected ? v.color : T.borderDark}`,
                color: selected ? T.paper : T.ink,
                fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px'
              }}>
                <span style={{ opacity: 0.7, fontSize: '11px' }}>#{v.rank}</span>
                {v.name[lang]}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ background: T.paper, border: `1px solid ${T.ink}`, marginBottom: '32px' }}>
        <div style={{ borderBottom: `1px solid ${T.ink}`, padding: '14px 20px', background: T.paperDark, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Calculator size={16} color={T.terracotta} />
          <h3 className="h-kufi" style={{ fontSize: '15px', color: T.ink, margin: 0 }}>{s.financialParams}</h3>
        </div>
        <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          <ParamSlider label={s.paramElectricity.label} value={params.electricityPrice} unit={s.paramElectricity.unit}
            min={50} max={300} step={5} onChange={(v) => setParams(p => ({ ...p, electricityPrice: v }))} />
          <ParamSlider label={s.paramInflation.label} value={params.annualPriceIncrease} unit={s.paramInflation.unit}
            min={0} max={15} step={0.5} onChange={(v) => setParams(p => ({ ...p, annualPriceIncrease: v }))} />
          <ParamSlider label={s.paramDegradation.label} value={params.degradationRate} unit={s.paramDegradation.unit}
            min={0} max={2} step={0.1} onChange={(v) => setParams(p => ({ ...p, degradationRate: v }))} />
          <ParamSlider label={s.paramSunshine.label} value={params.sunshineHours} unit={s.paramSunshine.unit}
            min={3} max={9} step={0.5} onChange={(v) => setParams(p => ({ ...p, sunshineHours: v }))} />
          <ParamSlider label={s.paramMaintenance.label} value={params.annualMaintenance / 1e6} unit={s.paramMaintenance.unit}
            min={5} max={50} step={1} onChange={(v) => setParams(p => ({ ...p, annualMaintenance: v * 1e6 }))} />
          <button onClick={() => setParams({ electricityPrice: 120, annualPriceIncrease: 5, degradationRate: 0.5, sunshineHours: 6, annualMaintenance: 15000000 })}
            style={{ alignSelf: 'flex-end', padding: '8px 16px', background: T.ink, color: T.paper, border: 'none', cursor: 'pointer', fontSize: '12px', fontFamily: 'inherit', fontWeight: 600, height: '36px' }}>
            {s.resetDefaults}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(calcs.length, 4)}, 1fr)`, gap: '0', marginBottom: '32px', border: `1px solid ${T.ink}` }}>
        {calcs.map((c, i) => <FinancialCard key={c.vendor.id} calc={c} divider={i < calcs.length - 1} lang={lang} s={s} />)}
      </div>

      <div style={{ background: T.paperDark, padding: '32px', border: `1px solid ${T.border}`, marginBottom: '32px' }}>
        <h3 className="h-kufi" style={{ fontSize: '18px', color: T.ink, margin: '0 0 4px' }}>
          {s.cumulative25y}
        </h3>
        <p style={{ fontSize: '12px', color: T.inkLight, fontStyle: 'italic', marginBottom: '20px' }}>
          {s.cumulativeSub}
        </p>
        <div style={{ height: '380px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={combinedChart}>
              <CartesianGrid stroke={T.borderDark} strokeDasharray="2 4" />
              <XAxis dataKey="year" tick={{ fill: T.inkLight, fontSize: 10 }} stroke={T.borderDark} />
              <YAxis tick={{ fill: T.inkLight, fontSize: 11 }} stroke={T.borderDark} label={{ value: s.millionIQD, angle: -90, position: 'insideLeft', fill: T.inkLight, fontSize: 11 }} />
              <Tooltip contentStyle={{ background: T.paper, border: `1px solid ${T.ink}`, borderRadius: 0, direction: dir, fontFamily: 'inherit' }} formatter={(value) => `${fmtNum(value, lang)} ${s.millionIQD}`} />
              <Legend wrapperStyle={{ color: T.ink, fontSize: '12px', paddingTop: '12px' }} />
              <ReferenceLine y={0} stroke={T.terracotta} strokeWidth={1.5} strokeDasharray="4 4" />
              {calcs.map(c => (
                <Line key={c.vendor.id} type="monotone" dataKey={c.vendor.name[lang]}
                  stroke={c.vendor.color} strokeWidth={2.5} dot={false}
                  activeDot={{ r: 6, stroke: c.vendor.color, fill: T.paper, strokeWidth: 2 }} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ background: T.paper, border: `1px solid ${T.ink}` }}>
        <div style={{ borderBottom: `1px solid ${T.ink}`, padding: '14px 20px', background: T.sage + '20', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Leaf size={16} color={T.sage} />
          <h3 className="h-kufi" style={{ fontSize: '16px', color: T.ink, margin: 0 }}>{s.environmental25y}</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(calcs.length, 4)}, 1fr)`, gap: 0 }}>
          {calcs.map((c, i) => (
            <div key={c.vendor.id} style={{ padding: '24px', borderInlineStart: i > 0 ? `1px solid ${T.border}` : 'none' }}>
              <div className="h-kufi" style={{ fontSize: '14px', color: T.ink, marginBottom: '4px', borderBottom: `2px solid ${c.vendor.color}`, paddingBottom: '8px', display: 'inline-block' }}>
                {c.vendor.name[lang]}
              </div>
              <div style={{ marginTop: '16px' }}>
                <div style={{ fontSize: '11px', color: T.inkDim, letterSpacing: '0.1em' }}>{s.co2Saved}</div>
                <div className="h-display" style={{ fontSize: '32px', color: T.sage, lineHeight: 1.1, marginTop: '4px' }}>
                  {fmtNum(Math.round(c.co2Saved25Y), lang)}
                  <span style={{ fontSize: '14px', color: T.inkLight, marginInlineStart: '6px', fontStyle: 'italic' }}>{s.tons}</span>
                </div>
                <div style={{ fontSize: '11px', color: T.inkLight, lineHeight: 1.6, marginTop: '12px', paddingTop: '12px', borderTop: `1px dashed ${T.border}`, fontStyle: 'italic' }}>
                  {s.carsOff(Math.round(c.co2Saved25Y / 4.6))}
                  <br />{s.treesPlanted(Math.round(c.co2Saved25Y * 16))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ParamSlider({ label, value, unit, min, max, step, onChange }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
        <span style={{ fontSize: '12px', color: T.ink, fontWeight: 600 }}>{label}</span>
        <span className="num-eng" style={{ fontSize: '14px', color: T.terracotta, fontWeight: 700 }}>
          {typeof value === 'number' && value % 1 !== 0 ? value.toFixed(1) : value} <span style={{ fontSize: '10px', color: T.inkLight }}>{unit}</span>
        </span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))} style={{ width: '100%' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '9px', color: T.inkDim, direction: 'ltr' }}>
        <span>{min}</span><span>{max}</span>
      </div>
    </div>
  );
}

function FinancialCard({ calc, divider, lang, s }) {
  const v = calc.vendor;
  const profitable = calc.totalSavings25Y > v.price;
  return (
    <div style={{ padding: '24px', borderInlineStart: divider ? `1px solid ${T.border}` : 'none', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, insetInlineStart: 0, width: '4px', height: '50px', background: v.color }} />

      <div style={{ marginBottom: '20px' }}>
        <span className="h-display" style={{ fontSize: '40px', fontStyle: 'italic', color: v.color, lineHeight: 1, display: 'block' }}>
          {v.rank}
        </span>
        <div className="h-kufi" style={{ fontSize: '15px', color: T.ink, marginTop: '4px' }}>{v.name[lang]}</div>
      </div>

      <FinancialRow label={s.initialInvestment} value={`${fmtIQD(v.price, lang)} ${s.iqd}`} color={T.ink} />
      <FinancialRow label={s.paybackPeriod} value={calc.paybackYear !== null ? s.yearsLabel(calc.paybackYear) : s.over25Years} color={calc.paybackYear < 10 ? T.sage : T.ochre} />
      <FinancialRow label={s.netAfter25y} value={`${(calc.totalSavings25Y / 1e9).toFixed(2)}${lang === 'ar' ? ' ' : ''}${s.billion}`} color={profitable ? T.sage : T.terracotta} large />
      <FinancialRow label={s.roi} value={`${calc.roi25Y.toFixed(0)}${lang === 'ar' ? '٪' : '%'}`} color={profitable ? T.sage : T.terracotta} />
      <FinancialRow label={s.annualProduction} value={`${(calc.annualProduction / 1000).toFixed(0)} ${s.thousandKwh}`} color={T.inkLight} last />
    </div>
  );
}

function FinancialRow({ label, value, color, large, last }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      padding: '10px 0', borderBottom: last ? 'none' : `1px dashed ${T.border}`
    }}>
      <span style={{ fontSize: '11px', color: T.inkLight }}>{label}</span>
      <span className={large ? 'h-display' : ''} style={{
        fontSize: large ? '18px' : '13px',
        fontWeight: 700, color,
        fontStyle: large ? 'italic' : 'normal'
      }}>{value}</span>
    </div>
  );
}
