import React, { useState, useMemo } from 'react';
import {
  Battery, DollarSign, Shield, Clock, Zap, Cog, Search, Scale,
  CheckCircle2, Award, Calculator,
  Sparkles, Target, Leaf
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, RadarChart,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine, Legend, Cell
} from 'recharts';

// ============ NEW THEME: Warm Editorial / Architectural ============
// Inspired by: cream paper, terracotta, deep ink, warm gold
// Vibe: a finely printed monograph meets museum exhibition signage
const T = {
  paper:      '#F5EFE6',  // warm cream paper
  paperDark:  '#EDE3D2',  // slightly darker cream
  ink:        '#1A1611',  // deep warm black
  inkSoft:    '#2D2620',  // softer ink
  inkLight:   '#5C5147',  // muted ink
  inkDim:     '#8B7E70',  // dim ink
  terracotta: '#B5533C',  // warm terracotta
  terracottaDk:'#8E3F2C', // deep terracotta
  ochre:      '#C8923D',  // warm gold ochre
  ochreLight: '#E8B968',  // light ochre
  sage:       '#6B7A5C',  // muted sage green
  sageLight:  '#94A381',  // lighter sage
  burgundy:   '#7A2E2E',  // deep burgundy
  cobalt:     '#3B4F7E',  // muted cobalt
  border:     '#D4C9B5',  // warm border
  borderDark: '#A89A82',  // darker border
};

const VENDORS = [
  {
    id: 'bidayat', name: 'بداية الشمس', rank: 1, cc: 0.5651,
    price: 1534000000, capacity: 1000, battery: 1152,
    type: 'هجين', warranty: 'ضمان المصنع', color: T.sage,
    badge: 'الأعلى جودة',
    pros: ['التوثيق الأكثر اكتمالاً', 'بطاريات موثقة (1152 kWh)', 'شفافية عالية للمورد', 'يشمل ATS وتأريض وتدريب'],
    cons: ['أكبر من الحاجة الفعلية', 'تكلفة أولية مرتفعة'],
    ratings: { price: 'ML', battery: 'VH', capacity: 'M', warranty: 'MH', tech: 'VH', transparency: 'H', dayNight: 'VH', auxiliary: 'VH', demandMatch: 'L' }
  },
  {
    id: 'qalaat', name: 'قلعة الترائب', rank: 2, cc: 0.5517,
    price: 772675000, capacity: 500, battery: 430,
    type: 'هجين', warranty: 'غير محدد', color: T.ochre,
    badge: 'أفضل قيمة',
    pros: ['مطابق للحاجة الفعلية (500 ك.و ≈ 440 ك.و)', 'تسعير مفصل وشفاف', 'يوفر 761 مليون د.ع', 'نظام هجين مع بطاريات'],
    cons: ['الضمان غير واضح', 'سعة البطارية تقديرية', 'ملف الشركة أصغر'],
    ratings: { price: 'H', battery: 'MH', capacity: 'ML', warranty: 'VL', tech: 'H', transparency: 'M', dayNight: 'H', auxiliary: 'MH', demandMatch: 'VH' }
  },
  {
    id: 'farber', name: 'فاربر (الأسوار)', rank: 3, cc: 0.4125,
    price: 2384000000, capacity: 1000, battery: 0,
    type: 'هجين', warranty: '5 سنوات', color: T.cobalt,
    badge: '',
    pros: ['علامة تجارية معروفة', 'ضمان واضح 5 سنوات', 'نظام ESS هجين'],
    cons: ['الأغلى (2.4 مليار د.ع)', 'سعة البطارية غير محددة', 'حجم مفرط', 'صلاحية العرض 5 أيام فقط'],
    ratings: { price: 'VL', battery: 'M', capacity: 'M', warranty: 'H', tech: 'M', transparency: 'M', dayNight: 'H', auxiliary: 'M', demandMatch: 'L' }
  },
  {
    id: 'rouya', name: 'الرؤيا الذكية', rank: 4, cc: 0.3649,
    price: 1360600000, capacity: 1160, battery: 0,
    type: 'مرتبط بالشبكة', warranty: '12 شهر', color: T.terracotta,
    badge: '',
    pros: ['شروط شاملة (13 بنداً)', 'هيكل مقاوم للرياح (140 كم/س)', 'تدريب وصيانة 12 شهر', 'دفع مرن (40+40+20%)'],
    cons: ['بدون بطاريات — نهاراً فقط', 'الأكثر مفرط الحجم', 'لا يعمل أثناء انقطاع الشبكة'],
    ratings: { price: 'M', battery: 'VL', capacity: 'MH', warranty: 'L', tech: 'VH', transparency: 'VH', dayNight: 'VL', auxiliary: 'VH', demandMatch: 'VL' }
  },
  {
    id: 'qimah', name: 'قمة السفينة', rank: 5, cc: 0.3153,
    price: 950000000, capacity: 1000, battery: 640,
    type: 'هجين', warranty: 'غير محدد', color: T.burgundy,
    badge: '',
    pros: ['أرخص نظام هجين', 'بطاريات LFP HV (تقنية جيدة)'],
    cons: ['معظم البنود "LOT" بدون تفاصيل', 'لا يوجد ضمان مذكور', 'لا توجد شروط دفع', 'عرض من صفحة واحدة فقط'],
    ratings: { price: 'MH', battery: 'MH', capacity: 'M', warranty: 'VL', tech: 'VL', transparency: 'VL', dayNight: 'M', auxiliary: 'VL', demandMatch: 'L' }
  },
  {
    id: 'viva', name: 'فيفا سولار', rank: 6, cc: 0.2688,
    price: 550000000, capacity: 1116, battery: 0,
    type: 'مرتبط بالشبكة', warranty: '25 سنة', color: T.inkLight,
    badge: '',
    pros: ['أرخص عرض على الإطلاق', 'ألواح ULICA ثنائية الوجه', 'ضمان ألواح 25 سنة', 'يشمل غرفة تبريد'],
    cons: ['كيبل AC غير مشمول!', 'تسعير بالدولار', 'بدون بطاريات', '7 عواكس فقط'],
    ratings: { price: 'VH', battery: 'VL', capacity: 'M', warranty: 'VH', tech: 'L', transparency: 'L', dayNight: 'VL', auxiliary: 'M', demandMatch: 'VL' }
  }
];

const CRITERIA_LIST = [
  { key: 'price', label: 'السعر', weight: 0.95, type: 'cost', icon: DollarSign },
  { key: 'battery', label: 'سعة البطاريات', weight: 0.85, type: 'benefit', icon: Battery },
  { key: 'capacity', label: 'قدرة النظام', weight: 0.30, type: 'benefit', icon: Zap },
  { key: 'warranty', label: 'الضمان', weight: 0.85, type: 'benefit', icon: Shield },
  { key: 'tech', label: 'التفاصيل التقنية', weight: 0.85, type: 'benefit', icon: Search },
  { key: 'transparency', label: 'الشفافية', weight: 0.70, type: 'benefit', icon: CheckCircle2 },
  { key: 'dayNight', label: 'تشغيل ليل ونهار', weight: 0.95, type: 'benefit', icon: Clock },
  { key: 'auxiliary', label: 'المكونات المساعدة', weight: 0.70, type: 'benefit', icon: Cog },
  { key: 'demandMatch', label: 'الملاءمة للحاجة', weight: 0.95, type: 'benefit', icon: Scale }
];

const RATING_VALUES = { VL: 1, L: 2, ML: 3, M: 4, MH: 5, H: 6, VH: 7 };

const fmtIQD = (n) => {
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)} مليار`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(0)} مليون`;
  return n.toLocaleString('ar');
};

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

  return (
    <div dir="rtl" lang="ar" style={{
      minHeight: '100vh', background: T.paper, color: T.ink,
      fontFamily: '"Tajawal", -apple-system, sans-serif',
      position: 'relative'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;900&family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Reem+Kufi:wght@400;500;600;700&display=swap');
        body { font-family: 'Tajawal', sans-serif; background: ${T.paper}; }
        input[type="range"] { direction: ltr; -webkit-appearance: none; appearance: none; height: 4px; background: ${T.border}; border-radius: 2px; outline: none; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 18px; height: 18px; background: ${T.terracotta}; border-radius: 50%; cursor: pointer; border: 2px solid ${T.paper}; box-shadow: 0 2px 6px rgba(0,0,0,0.15); }
        input[type="range"]::-moz-range-thumb { width: 18px; height: 18px; background: ${T.terracotta}; border-radius: 50%; cursor: pointer; border: 2px solid ${T.paper}; }
        .h-display { font-family: 'Amiri', serif; font-weight: 700; }
        .h-kufi { font-family: 'Reem Kufi', sans-serif; font-weight: 600; letter-spacing: 0.02em; }
        .num-eng { font-family: 'Reem Kufi', sans-serif; }
      `}</style>

      <PaperGrain />

      {/* HEADER — Editorial masthead */}
      <header style={{ borderBottom: `2px solid ${T.ink}`, background: T.paper, position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div style={{ fontSize: '11px', color: T.terracotta, letterSpacing: '0.3em', fontWeight: 600, marginBottom: '6px' }}>
                — تقرير اختيار مورد · {new Date().toLocaleDateString('ar-IQ', { day: 'numeric', month: 'long', year: 'numeric' })} —
              </div>
              <h1 className="h-display" style={{ fontSize: '38px', lineHeight: 1, color: T.ink, margin: 0 }}>
                مَنظومة الشَّمس
                <span style={{ display: 'inline-block', margin: '0 16px', color: T.terracotta }}>·</span>
                <span style={{ fontStyle: 'italic', fontSize: '34px', color: T.inkSoft }}>القرار</span>
              </h1>
              <div style={{ fontSize: '13px', color: T.inkLight, marginTop: '4px' }}>
                جامعة الإمام الصادق · بغداد · مشروع الطاقة الشمسية
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <Ornament size={28} color={T.terracotta} />
              <nav style={{ display: 'flex', gap: '4px', borderTop: `1px solid ${T.borderDark}`, borderBottom: `1px solid ${T.borderDark}`, padding: '6px 0' }}>
                {[
                  { id: 'comparison', label: 'مقارنة العروض', num: '01' },
                  { id: 'lab', label: 'مختبر القرار', num: '02' },
                  { id: 'financial', label: 'العائد المالي', num: '03' }
                ].map(tab => {
                  const active = view === tab.id;
                  return (
                    <button key={tab.id} onClick={() => setView(tab.id)} style={{
                      background: active ? T.ink : 'transparent',
                      color: active ? T.paper : T.ink,
                      padding: '8px 16px', fontSize: '13px', fontWeight: 600,
                      border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                      fontFamily: '"Reem Kufi", sans-serif', transition: 'all 0.2s'
                    }}>
                      <span style={{ fontSize: '10px', color: active ? T.ochreLight : T.inkDim, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>{tab.num}</span>
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 32px', position: 'relative', zIndex: 1 }}>
        {view === 'comparison' && <ComparisonView vendors={rankedVendors} selectedVendors={selectedVendors} toggleVendor={toggleVendor} />}
        {view === 'lab' && <DecisionLabView weights={weights} setWeights={setWeights} rankedVendors={rankedVendors} />}
        {view === 'financial' && <FinancialView vendors={rankedVendors} params={financialParams} setParams={setFinancialParams} selectedVendors={selectedVendors} toggleVendor={toggleVendor} />}
      </main>

      <footer style={{ borderTop: `2px solid ${T.ink}`, marginTop: '60px', padding: '32px', background: T.paperDark, position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontSize: '12px', color: T.inkLight, fontStyle: 'italic' }}>
            المنهجية: Fuzzy TOPSIS بأرقام ضبابية مثلثية · 6 بدائل × 9 معايير
          </div>
          <div style={{ fontSize: '12px', color: T.inkLight, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Ornament size={14} color={T.ochre} />
            <span>مُعدّ لـ البروفيسور د. كالوس</span>
          </div>
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
        <p style={{ fontSize: '14px', color: T.inkLight, marginTop: '8px', marginRight: '40px', fontStyle: 'italic', maxWidth: '700px', lineHeight: 1.6 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ============ COMPARISON VIEW ============
function ComparisonView({ vendors, selectedVendors, toggleVendor }) {
  const compared = vendors.filter(v => selectedVendors.includes(v.id));

  return (
    <div>
      <SectionHeader num="القسم الأول" title="مقارنة العروض" subtitle="ستة موردين متقدمين، كل منهم يقدم رؤية مختلفة لتلبية احتياجات الجامعة من الطاقة الشمسية." />

      {/* Hero stats — magazine pull-quote style */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0', marginBottom: '40px', border: `1px solid ${T.ink}` }}>
        <PullQuote icon={Award} label="الأعلى ترتيباً" value={vendors[0].name} sub={`CC = ${vendors[0].cc.toFixed(4)}`} accent={T.sage} />
        <PullQuote icon={DollarSign} label="نطاق الأسعار" value="٥٥٠م – ٢٫٤ مليار" sub="دينار عراقي" accent={T.ochre} divider />
        <PullQuote icon={Target} label="الحاجة الفعلية" value="٤٤٠ ك.و" sub="مقابل ١ ميجا واط متوسط" accent={T.cobalt} divider />
        <PullQuote icon={Sparkles} label="الأنسب للحاجة" value={vendors.find(v => v.id === 'qalaat').name} sub="العرض الوحيد المُحجّم" accent={T.terracotta} divider />
      </div>

      {/* Vendor catalog — like a museum exhibition list */}
      <div style={{ marginBottom: '48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
          <h3 className="h-kufi" style={{ fontSize: '20px', color: T.ink, margin: 0 }}>
            فهرس الموردين
          </h3>
          <div style={{ fontSize: '12px', color: T.inkDim, fontStyle: 'italic' }}>
            اضغط للاختيار · حد أقصى ٤
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '0', border: `1px solid ${T.ink}` }}>
          {vendors.map((v, idx) => {
            const selected = selectedVendors.includes(v.id);
            return (
              <button key={v.id} onClick={() => toggleVendor(v.id)} style={{
                textAlign: 'right', padding: '20px',
                background: selected ? T.paperDark : T.paper,
                border: 'none',
                borderBottom: idx < vendors.length - 1 ? `1px solid ${T.border}` : 'none',
                borderLeft: (idx % 3 !== 2 && idx < vendors.length) ? `1px solid ${T.border}` : 'none',
                cursor: 'pointer', position: 'relative', transition: 'all 0.2s',
                fontFamily: 'inherit', color: T.ink
              }}>
                {selected && (
                  <div style={{ position: 'absolute', top: 0, right: 0, width: '4px', height: '100%', background: v.color }} />
                )}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                    <span className="h-display" style={{ fontSize: '32px', color: v.color, lineHeight: 1, fontStyle: 'italic' }}>
                      {v.rank}
                    </span>
                    <div>
                      <div className="h-kufi" style={{ fontSize: '17px', color: T.ink, lineHeight: 1.2 }}>{v.name}</div>
                      {v.badge && (
                        <span style={{
                          display: 'inline-block', marginTop: '4px',
                          fontSize: '10px', padding: '2px 8px',
                          background: v.color, color: T.paper,
                          letterSpacing: '0.1em', fontWeight: 600
                        }}>{v.badge}</span>
                      )}
                    </div>
                  </div>
                  {selected && <CheckCircle2 size={18} color={v.color} strokeWidth={2.5} />}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', paddingTop: '12px', borderTop: `1px dashed ${T.border}` }}>
                  <DataPoint label="معامل القرب" value={v.cc.toFixed(4)} accent={v.color} />
                  <DataPoint label="السعر" value={fmtIQD(v.price)} unit="د.ع" />
                  <DataPoint label="القدرة" value={v.capacity} unit="ك.و" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed cards */}
      <div style={{ marginBottom: '48px' }}>
        <h3 className="h-kufi" style={{ fontSize: '20px', color: T.ink, margin: '0 0 20px' }}>
          مقارنة تفصيلية
          <span style={{ fontSize: '13px', color: T.inkDim, marginRight: '12px', fontWeight: 400, fontStyle: 'italic' }}>
            ({compared.length} {compared.length === 1 ? 'مورد' : compared.length === 2 ? 'موردان' : 'موردين'})
          </span>
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(compared.length, 4)}, 1fr)`, gap: '20px' }}>
          {compared.map(v => <VendorDetailCard key={v.id} v={v} />)}
        </div>
      </div>

      {/* Radar */}
      {compared.length >= 2 && (
        <div style={{ background: T.paperDark, padding: '32px', border: `1px solid ${T.border}` }}>
          <h3 className="h-kufi" style={{ fontSize: '20px', color: T.ink, margin: '0 0 4px' }}>
            مقارنة متعددة الأبعاد
          </h3>
          <p style={{ fontSize: '13px', color: T.inkLight, marginBottom: '20px', fontStyle: 'italic' }}>
            كل محور يمثل معياراً — كلما زادت المساحة كان التقييم العام أفضل
          </p>
          <div style={{ height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={CRITERIA_LIST.map(c => {
                const point = { criterion: c.label };
                compared.forEach(v => { point[v.name] = RATING_VALUES[v.ratings[c.key]]; });
                return point;
              })}>
                <PolarGrid stroke={T.borderDark} strokeWidth={0.5} />
                <PolarAngleAxis dataKey="criterion" tick={{ fill: T.ink, fontSize: 12, fontWeight: 600 }} />
                <PolarRadiusAxis domain={[0, 7]} tick={{ fill: T.inkDim, fontSize: 10 }} stroke={T.borderDark} />
                {compared.map(v => (
                  <Radar key={v.id} name={v.name} dataKey={v.name}
                    stroke={v.color} fill={v.color} fillOpacity={0.18} strokeWidth={2} />
                ))}
                <Legend wrapperStyle={{ color: T.ink, fontSize: '13px', paddingTop: '20px' }} />
                <Tooltip contentStyle={{ background: T.paper, border: `1px solid ${T.ink}`, borderRadius: 0, direction: 'rtl', fontFamily: 'Tajawal' }} />
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
      borderRight: divider ? `1px solid ${T.border}` : 'none',
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

function VendorDetailCard({ v }) {
  return (
    <div style={{ background: T.paper, border: `1px solid ${T.ink}`, position: 'relative' }}>
      <div style={{ background: v.color, padding: '14px 20px', color: T.paper }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div className="h-kufi" style={{ fontSize: '17px' }}>{v.name}</div>
            <div style={{ fontSize: '11px', opacity: 0.85, marginTop: '2px', fontStyle: 'italic' }}>
              المرتبة #{v.rank} · CC = {v.cc.toFixed(4)}
            </div>
          </div>
          <span className="h-display" style={{ fontSize: '36px', lineHeight: 1, fontStyle: 'italic', opacity: 0.4 }}>
            {v.rank}
          </span>
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', paddingBottom: '16px', borderBottom: `1px dashed ${T.border}`, marginBottom: '16px' }}>
          <DataPoint label="السعر" value={fmtIQD(v.price)} unit="د.ع" />
          <DataPoint label="القدرة" value={v.capacity} unit="ك.و" />
          <DataPoint label="البطارية" value={v.battery || '—'} unit={v.battery ? 'kWh' : ''} />
          <DataPoint label="النوع" value={v.type} />
        </div>

        <div style={{ marginBottom: '14px' }}>
          <div style={{ fontSize: '10px', color: T.sage, letterSpacing: '0.15em', fontWeight: 700, marginBottom: '8px' }}>
            ▲ نقاط القوة
          </div>
          {v.pros.slice(0, 3).map((p, i) => (
            <div key={i} style={{ fontSize: '12px', color: T.inkSoft, lineHeight: 1.5, paddingRight: '12px', marginBottom: '4px', position: 'relative' }}>
              <span style={{ position: 'absolute', right: 0, color: T.sage, fontWeight: 700 }}>·</span>
              {p}
            </div>
          ))}
        </div>

        <div>
          <div style={{ fontSize: '10px', color: T.terracotta, letterSpacing: '0.15em', fontWeight: 700, marginBottom: '8px' }}>
            ▼ نقاط الحذر
          </div>
          {v.cons.slice(0, 2).map((c, i) => (
            <div key={i} style={{ fontSize: '12px', color: T.inkSoft, lineHeight: 1.5, paddingRight: '12px', marginBottom: '4px', position: 'relative' }}>
              <span style={{ position: 'absolute', right: 0, color: T.terracotta, fontWeight: 700 }}>·</span>
              {c}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ DECISION LAB ============
function DecisionLabView({ weights, setWeights, rankedVendors }) {
  const updateWeight = (key, value) => setWeights(prev => ({ ...prev, [key]: parseFloat(value) }));
  const resetWeights = () => setWeights(Object.fromEntries(CRITERIA_LIST.map(c => [c.key, c.weight])));

  return (
    <div>
      <SectionHeader num="القسم الثاني" title="مختبر القرار" subtitle="عدّل أهمية كل معيار وشاهد كيف يتغيّر الترتيب لحظياً. هذه أداة لاختبار افتراضاتك ورؤية النتائج بنفسك." />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
        {/* Sliders */}
        <div style={{ background: T.paper, border: `1px solid ${T.ink}` }}>
          <div style={{ borderBottom: `1px solid ${T.ink}`, padding: '16px 20px', background: T.paperDark, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="h-kufi" style={{ fontSize: '16px', color: T.ink, margin: 0 }}>أوزان المعايير</h3>
            <button onClick={resetWeights} style={{
              background: 'transparent', border: `1px solid ${T.ink}`,
              padding: '4px 12px', fontSize: '11px', color: T.ink,
              cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600
            }}>
              ↺ إعادة
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
                      <span style={{ fontSize: '13px', color: T.ink, fontWeight: 600 }}>{c.label}</span>
                      {isCost && (
                        <span style={{ fontSize: '9px', color: T.terracotta, padding: '1px 6px', border: `1px solid ${T.terracotta}`, letterSpacing: '0.1em', fontWeight: 700 }}>
                          تكلفة
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

        {/* Live ranking */}
        <div style={{ background: T.paper, border: `1px solid ${T.ink}` }}>
          <div style={{ borderBottom: `1px solid ${T.ink}`, padding: '16px 20px', background: T.paperDark }}>
            <h3 className="h-kufi" style={{ fontSize: '16px', color: T.ink, margin: 0 }}>الترتيب المباشر</h3>
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
                  <div className="h-kufi" style={{ fontSize: '14px', color: T.ink }}>{v.name}</div>
                  <div style={{ fontSize: '11px', color: T.inkDim, fontStyle: 'italic' }}>
                    {fmtIQD(v.price)} د.ع · {v.capacity} ك.و
                  </div>
                </div>
                <div style={{ textAlign: 'left' }}>
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

      {/* Bar chart */}
      <div style={{ background: T.paperDark, padding: '32px', border: `1px solid ${T.border}` }}>
        <h3 className="h-kufi" style={{ fontSize: '18px', color: T.ink, margin: '0 0 20px' }}>
          مقارنة معامل القرب
        </h3>
        <div style={{ height: '320px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rankedVendors.map(v => ({ name: v.name, CC: v.cc, fill: v.color }))} layout="vertical" margin={{ left: 100 }}>
              <CartesianGrid stroke={T.borderDark} strokeDasharray="2 4" horizontal={false} />
              <XAxis type="number" domain={[0, 0.7]} tick={{ fill: T.inkLight, fontSize: 11 }} stroke={T.borderDark} />
              <YAxis type="category" dataKey="name" tick={{ fill: T.ink, fontSize: 12, fontWeight: 600 }} stroke={T.borderDark} width={95} />
              <Tooltip contentStyle={{ background: T.paper, border: `1px solid ${T.ink}`, borderRadius: 0, direction: 'rtl' }} />
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
function FinancialView({ vendors, params, setParams, selectedVendors, toggleVendor }) {
  const compared = vendors.filter(v => selectedVendors.includes(v.id));
  const calcs = useMemo(() => compared.map(v => ({ vendor: v, ...calculateROI(v, params) })), [compared, params]);
  const combinedChart = useMemo(() => {
    const years = Array.from({ length: 26 }, (_, i) => i);
    return years.map(year => {
      const point = { year: `سنة ${year}` };
      calcs.forEach(c => { point[c.vendor.name] = Math.round(c.cumulativeData[year].cumulative / 1e6); });
      return point;
    });
  }, [calcs]);

  return (
    <div>
      <SectionHeader num="القسم الثالث" title="العائد المالي" subtitle="تحليل الوفورات التراكمية على مدى ٢٥ عاماً مع معاملات قابلة للتعديل تعكس الواقع الاقتصادي العراقي." />

      {/* Vendor selector */}
      <div style={{ background: T.paper, border: `1px solid ${T.ink}`, padding: '20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 className="h-kufi" style={{ fontSize: '15px', color: T.ink, margin: 0 }}>اختر الموردين للمقارنة</h3>
          <span style={{ fontSize: '11px', color: T.inkDim, fontStyle: 'italic' }}>{compared.length} مختار · حد أقصى ٤</span>
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
                {v.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Parameters */}
      <div style={{ background: T.paper, border: `1px solid ${T.ink}`, marginBottom: '32px' }}>
        <div style={{ borderBottom: `1px solid ${T.ink}`, padding: '14px 20px', background: T.paperDark, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Calculator size={16} color={T.terracotta} />
          <h3 className="h-kufi" style={{ fontSize: '15px', color: T.ink, margin: 0 }}>المعاملات المالية</h3>
        </div>
        <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          <ParamSlider label="سعر الكهرباء" value={params.electricityPrice} unit="د.ع/kWh"
            min={50} max={300} step={5} onChange={(v) => setParams(p => ({ ...p, electricityPrice: v }))} />
          <ParamSlider label="معدل التضخم السنوي" value={params.annualPriceIncrease} unit="٪"
            min={0} max={15} step={0.5} onChange={(v) => setParams(p => ({ ...p, annualPriceIncrease: v }))} />
          <ParamSlider label="معدل تدهور الألواح" value={params.degradationRate} unit="٪/سنة"
            min={0} max={2} step={0.1} onChange={(v) => setParams(p => ({ ...p, degradationRate: v }))} />
          <ParamSlider label="ساعات سطوع الشمس" value={params.sunshineHours} unit="ساعة"
            min={3} max={9} step={0.5} onChange={(v) => setParams(p => ({ ...p, sunshineHours: v }))} />
          <ParamSlider label="الصيانة السنوية" value={params.annualMaintenance / 1e6} unit="مليون د.ع"
            min={5} max={50} step={1} onChange={(v) => setParams(p => ({ ...p, annualMaintenance: v * 1e6 }))} />
          <button onClick={() => setParams({ electricityPrice: 120, annualPriceIncrease: 5, degradationRate: 0.5, sunshineHours: 6, annualMaintenance: 15000000 })}
            style={{ alignSelf: 'flex-end', padding: '8px 16px', background: T.ink, color: T.paper, border: 'none', cursor: 'pointer', fontSize: '12px', fontFamily: 'inherit', fontWeight: 600, height: '36px' }}>
            ↺ إعادة للقيم الافتراضية
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(calcs.length, 4)}, 1fr)`, gap: '0', marginBottom: '32px', border: `1px solid ${T.ink}` }}>
        {calcs.map((c, i) => <FinancialCard key={c.vendor.id} calc={c} divider={i < calcs.length - 1} />)}
      </div>

      {/* Cumulative chart */}
      <div style={{ background: T.paperDark, padding: '32px', border: `1px solid ${T.border}`, marginBottom: '32px' }}>
        <h3 className="h-kufi" style={{ fontSize: '18px', color: T.ink, margin: '0 0 4px' }}>
          الوفورات التراكمية على ٢٥ سنة
        </h3>
        <p style={{ fontSize: '12px', color: T.inkLight, fontStyle: 'italic', marginBottom: '20px' }}>
          القيم السالبة = ما زال هناك سداد · الصفر = نقطة التعادل · القيم الموجبة = وفورات صافية
        </p>
        <div style={{ height: '380px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={combinedChart}>
              <CartesianGrid stroke={T.borderDark} strokeDasharray="2 4" />
              <XAxis dataKey="year" tick={{ fill: T.inkLight, fontSize: 10 }} stroke={T.borderDark} />
              <YAxis tick={{ fill: T.inkLight, fontSize: 11 }} stroke={T.borderDark} label={{ value: 'مليون د.ع', angle: -90, position: 'insideRight', fill: T.inkLight, fontSize: 11 }} />
              <Tooltip contentStyle={{ background: T.paper, border: `1px solid ${T.ink}`, borderRadius: 0, direction: 'rtl', fontFamily: 'Tajawal' }} formatter={(value) => `${value.toLocaleString('ar')} مليون د.ع`} />
              <Legend wrapperStyle={{ color: T.ink, fontSize: '12px', paddingTop: '12px' }} />
              <ReferenceLine y={0} stroke={T.terracotta} strokeWidth={1.5} strokeDasharray="4 4" />
              {calcs.map(c => (
                <Line key={c.vendor.id} type="monotone" dataKey={c.vendor.name}
                  stroke={c.vendor.color} strokeWidth={2.5} dot={false}
                  activeDot={{ r: 6, stroke: c.vendor.color, fill: T.paper, strokeWidth: 2 }} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Environmental */}
      <div style={{ background: T.paper, border: `1px solid ${T.ink}` }}>
        <div style={{ borderBottom: `1px solid ${T.ink}`, padding: '14px 20px', background: T.sage + '20', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Leaf size={16} color={T.sage} />
          <h3 className="h-kufi" style={{ fontSize: '16px', color: T.ink, margin: 0 }}>الأثر البيئي على ٢٥ سنة</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(calcs.length, 4)}, 1fr)`, gap: 0 }}>
          {calcs.map((c, i) => (
            <div key={c.vendor.id} style={{ padding: '24px', borderLeft: i < calcs.length - 1 ? `1px solid ${T.border}` : 'none' }}>
              <div className="h-kufi" style={{ fontSize: '14px', color: T.ink, marginBottom: '4px', borderBottom: `2px solid ${c.vendor.color}`, paddingBottom: '8px', display: 'inline-block' }}>
                {c.vendor.name}
              </div>
              <div style={{ marginTop: '16px' }}>
                <div style={{ fontSize: '11px', color: T.inkDim, letterSpacing: '0.1em' }}>ثاني أكسيد الكربون الموفّر</div>
                <div className="h-display" style={{ fontSize: '32px', color: T.sage, lineHeight: 1.1, marginTop: '4px' }}>
                  {Math.round(c.co2Saved25Y).toLocaleString('ar')}
                  <span style={{ fontSize: '14px', color: T.inkLight, marginRight: '6px', fontStyle: 'italic' }}>طن</span>
                </div>
                <div style={{ fontSize: '11px', color: T.inkLight, lineHeight: 1.6, marginTop: '12px', paddingTop: '12px', borderTop: `1px dashed ${T.border}`, fontStyle: 'italic' }}>
                  ≈ {Math.round(c.co2Saved25Y / 4.6).toLocaleString('ar')} سيارة خارج الطريق لمدة عام
                  <br />≈ {Math.round(c.co2Saved25Y * 16).toLocaleString('ar')} شجرة مزروعة
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

function FinancialCard({ calc, divider }) {
  const v = calc.vendor;
  const profitable = calc.totalSavings25Y > v.price;
  return (
    <div style={{ padding: '24px', borderLeft: divider ? `1px solid ${T.border}` : 'none', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: '4px', height: '50px', background: v.color }} />

      <div style={{ marginBottom: '20px' }}>
        <span className="h-display" style={{ fontSize: '40px', fontStyle: 'italic', color: v.color, lineHeight: 1, display: 'block' }}>
          {v.rank}
        </span>
        <div className="h-kufi" style={{ fontSize: '15px', color: T.ink, marginTop: '4px' }}>{v.name}</div>
      </div>

      <FinancialRow label="الاستثمار الأولي" value={`${fmtIQD(v.price)} د.ع`} color={T.ink} />
      <FinancialRow label="فترة الاسترداد" value={calc.paybackYear !== null ? `${calc.paybackYear} سنة` : '> ٢٥ سنة'} color={calc.paybackYear < 10 ? T.sage : T.ochre} />
      <FinancialRow label="الصافي بعد ٢٥ سنة" value={`${(calc.totalSavings25Y / 1e9).toFixed(2)} مليار`} color={profitable ? T.sage : T.terracotta} large />
      <FinancialRow label="العائد على الاستثمار" value={`${calc.roi25Y.toFixed(0)}٪`} color={profitable ? T.sage : T.terracotta} />
      <FinancialRow label="الإنتاج السنوي" value={`${(calc.annualProduction / 1000).toFixed(0)} ألف kWh`} color={T.inkLight} last />
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
