import React, { useState } from 'react';
import { Info, Sparkles, CheckCircle2 } from 'lucide-react';

interface DiagramProps {
  diagramId: 'cell' | 'heart' | 'digestive' | 'respiratory' | 'dna' | 'photosynthesis';
}

interface Hotspot {
  id: string;
  x: number;
  y: number;
  labelEn: string;
  labelBn: string;
  descriptionBn: string;
  functionEn: string;
  examTipBn: string;
}

export const InteractiveDiagram: React.FC<DiagramProps> = ({ diagramId }) => {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);

  // Diagrams data with coordinates and rich explanations
  const getHotspots = (): { title: string; hotspots: Hotspot[] } => {
    switch (diagramId) {
      case 'cell':
        return {
          title: 'আদর্শ উদ্ভিদকোষের চিহ্নিত চিত্র (Plant Cell Structure)',
          hotspots: [
            {
              id: 'nucleus',
              x: 190,
              y: 140,
              labelEn: 'Nucleus (নিউক্লিয়াস)',
              labelBn: 'নিউক্লিয়াস (কোষের মস্তিষ্ক)',
              descriptionBn: 'নিউক্লিয়াসের ভেতরে নিউক্লিওলাস ও ক্রোমাটিন জালিকা থাকে যা জীবের বংশগতির বৈশিষ্ট্য বহন করে।',
              functionEn: 'Controls all cell activities, stores genetic DNA.',
              examTipBn: 'নিউক্লিয়ার মেমব্রেন, নিউক্লিওলাস, নিউক্লিওপ্লাজম ও ক্রোমাটিন জালিকা - এই ৪টি অংশ লেবেল করা আবশ্যক।',
            },
            {
              id: 'mitochondria',
              x: 95,
              y: 200,
              labelEn: 'Mitochondria (মাইটোকন্ড্রিয়া)',
              labelBn: 'মাইটোকন্ড্রিয়া (শক্তিঘর)',
              descriptionBn: 'শ্বসন প্রক্রিয়ায় শক্তি (ATP) তৈরি করে। এর ভেতরের ভাঁজকে কৃষ্টি (Cristae) বলে।',
              functionEn: 'Cellular respiration and ATP generation.',
              examTipBn: 'একে "Powerhouse of the Cell" বলা হয়।',
            },
            {
              id: 'chloroplast',
              x: 270,
              y: 195,
              labelEn: 'Chloroplast (ক্লোরোপ্লাস্ট)',
              labelBn: 'ক্লোরোপ্লাস্ট (সবুজ প্লাস্টিড)',
              descriptionBn: 'সবুজ রঞ্জক ক্লোরোফিলযুক্ত অঙ্গাণু যা সালোকসংশ্লেষণ প্রক্রিয়ায় খাদ্য শর্করা তৈরি করে।',
              functionEn: 'Photosynthesis and glucose synthesis.',
              examTipBn: 'প্রাণীকোষে ক্লোরোপ্লাস্ট থাকে না - এটি প্রধান পার্থক্য।',
            },
            {
              id: 'vacuole',
              x: 180,
              y: 220,
              labelEn: 'Large Central Vacuole',
              labelBn: 'বৃহৎ কেন্দ্রীয় কোষগহ্বর',
              descriptionBn: 'উদ্ভিদকোষের কেন্দ্রে অবস্থিত বিশাল গহ্বর যাতে কোষরস সঞ্চিত থাকে এবং কোষের অভ্যন্তরীণ চাপ রক্ষা করে।',
              functionEn: 'Stores cell sap, maintains turgor pressure.',
              examTipBn: 'উদ্ভিদকোষে কোষগহ্বর খুব বড় হওয়ায় নিউক্লিয়াস একপাশে সরে থাকে।',
            },
            {
              id: 'cell_wall',
              x: 50,
              y: 85,
              labelEn: 'Cell Wall (কোষপ্রাচীর)',
              labelBn: 'সেলুলোজ নির্মিত কোষপ্রাচীর',
              descriptionBn: 'উদ্ভিদকোষের সর্ববহিঃস্থ শক্ত জড় আবরণী যা কোষকে নির্দিষ্ট আকার ও দৃঢ়তা দেয়।',
              functionEn: 'Provides structural rigidity and protection.',
              examTipBn: 'কোষপ্রাচীর মৃত ও সম্পূর্ণ ভেদ্য (Permeable)।',
            },
          ],
        };

      case 'heart':
        return {
          title: 'মানব হৃৎপিণ্ডের চার প্রকোষ্ঠ ও রক্ত সংবহন (Human Heart)',
          hotspots: [
            {
              id: 'right_atrium',
              x: 110,
              y: 110,
              labelEn: 'Right Atrium (ডান অলিন্দ)',
              labelBn: 'ডান অলিন্দ',
              descriptionBn: 'ঊর্ধ্ব ও নিম্ন মহাশিরার মাধ্যমে সারা শরীর থেকে কার্বন ডাই-অক্সাইডযুক্ত রক্ত এখানে প্রবেশ করে।',
              functionEn: 'Receives deoxygenated blood from body.',
              examTipBn: 'ডান অলিন্দ ও ডান নিলয়ের মাঝে ট্রাইকাসপিড কপাটিকা থাকে।',
            },
            {
              id: 'right_ventricle',
              x: 125,
              y: 210,
              labelEn: 'Right Ventricle (ডান নিলয়)',
              labelBn: 'ডান নিলয়',
              descriptionBn: 'সংকুচিত হয়ে CO₂ যুক্ত রক্ত পালমোনারি ধমনীর মাধ্যমে ফুসফুসে পরিশোধনের জন্য পাঠায়।',
              functionEn: 'Pumps deoxygenated blood to lungs via pulmonary artery.',
              examTipBn: 'পালমোনারি ধমনী একমাত্র ধমনী যা দূষিত রক্ত বহন করে।',
            },
            {
              id: 'left_atrium',
              x: 250,
              y: 110,
              labelEn: 'Left Atrium (বাম অলিন্দ)',
              labelBn: 'বাম অলিন্দ',
              descriptionBn: 'ফুসফুস থেকে চারটি পালমোনারি শিরার মাধ্যমে তাজা অক্সিজেনসমৃদ্ধ রক্ত গ্রহণ করে।',
              functionEn: 'Receives oxygen-rich blood from lungs.',
              examTipBn: 'পালমোনারি শিরা একমাত্র শিরা যা বিশুদ্ধ রক্ত বহন করে।',
            },
            {
              id: 'left_ventricle',
              x: 235,
              y: 220,
              labelEn: 'Left Ventricle (বাম নিলয়)',
              labelBn: 'বাম নিলয় (সর্বাপেক্ষা পুরু পেশি)',
              descriptionBn: 'সারা দেহে মহাধমনীর মাধ্যমে উচ্চ চাপে রক্ত পাম্প করে, তাই এর প্রাচীর সবচেয়ে পুরু।',
              functionEn: 'Pumps oxygenated blood to the entire body via Aorta.',
              examTipBn: 'বাম নিলয় ও বাম অলিন্দের মাঝে বাইকাসপিড বা মাইট্রাল কপাটিকা থাকে।',
            },
            {
              id: 'aorta',
              x: 185,
              y: 55,
              labelEn: 'Aorta (মহাধমনী)',
              labelBn: 'মহাধমনী (প্রধান ধমনী)',
              descriptionBn: 'হৃৎপিণ্ডের সবচেয়ে বড় ধমনী যা বিশুদ্ধ রক্ত পুরো মানবদেহের শাখা-প্রশাখায় নিয়ে যায়।',
              functionEn: 'Distributes pure oxygenated blood to systemic circulation.',
              examTipBn: 'মহাধমনীর গোড়ায় সেমিলুনার বা অর্ধচন্দ্রাকার কপাটিকা থাকে।',
            },
          ],
        };

      case 'respiratory':
        return {
          title: 'শ্বসনতন্ত্র ও ফুসফুসের অ্যালভিওলাই (Respiratory System)',
          hotspots: [
            {
              id: 'trachea',
              x: 180,
              y: 70,
              labelEn: 'Trachea (শ্বাসনালি)',
              labelBn: 'শ্বাসনালি (ট্রাকিয়া)',
              descriptionBn: 'একটি ফাঁপা তরুণাস্থিযুক্ত নল যা স্বরযন্ত্র থেকে বাতাস ফুসফুসের দিকে পরিচালিত করে।',
              functionEn: 'Windpipe conducting air to bronchi.',
              examTipBn: 'এর তরুণাস্থিগুলো "C" আকৃতির, যা নালিটিকে সংকুচিত হওয়া থেকে রক্ষা করে।',
            },
            {
              id: 'bronchi',
              x: 180,
              y: 130,
              labelEn: 'Bronchus & Bronchioles',
              labelBn: 'ব্রঙ্কাস ও ব্রঙ্কিওল',
              descriptionBn: 'ট্রাকিয়া দুই ভাগে বিভক্ত হয়ে ডান ও বাম ফুসফুসে প্রবেশ করে অসংখ্য ক্ষুদ্র শাখায় রূপ নেয়।',
              functionEn: 'Air passages branching inside lungs.',
              examTipBn: 'ডান ব্রঙ্কাসটি বামটির চেয়ে কিছুটা খাটো ও চওড়া।',
            },
            {
              id: 'alveoli',
              x: 260,
              y: 210,
              labelEn: 'Alveoli (অ্যালভিওলাই)',
              labelBn: 'অ্যালভিওলাই (বায়ুকুঠুরি)',
              descriptionBn: 'ফুসফুসের কোটি কোটি ক্ষুদ্রাতিক্ষুদ্র আঙুরের থোকার মতো বায়ুথলি যেখানে ব্যাপন প্রক্রিয়ায় গ্যাস বিনিময় হয়।',
              functionEn: 'Site of O2 and CO2 diffusion with capillary blood.',
              examTipBn: 'ফুসফুসের কার্যকরী একক হলো অ্যালভিওলাই।',
            },
          ],
        };

      case 'dna':
        return {
          title: 'ডিএনএ ডাবল হেলিক্স গঠন (DNA Double Helix Structure)',
          hotspots: [
            {
              id: 'sugar_phosphate',
              x: 70,
              y: 120,
              labelEn: 'Sugar-Phosphate Backbone',
              labelBn: 'সুগার-ফসফেট মেরুদণ্ড',
              descriptionBn: 'ডিঅক্সিরাইবোজ সুগার ও ফসফেট অণু পর্যায়ক্রমে ফসফোডাইএস্টার বন্ধন দ্বারা যুক্ত হয়ে সিঁড়ির দুই পাশের খুঁটি তৈরি করে।',
              functionEn: 'Structural scaffold supporting base pairs.',
              examTipBn: 'ডিঅক্সিরাইবোজ হলো একটি ৫-কার্বনবিশিষ্ট পেন্টোজ চিনি।',
            },
            {
              id: 'base_at',
              x: 180,
              y: 110,
              labelEn: 'A = T (Adenine - Thymine Pair)',
              labelBn: 'অ্যাডেনিন ও থাইমিন জোড়',
              descriptionBn: 'অ্যাডেনিন সবসময় দুটি দুর্বল হাইড্রোজেন বন্ধন (A = T) দ্বারা থাইমিনের সাথে যুক্ত থাকে।',
              functionEn: 'Complementary base pairing (2 hydrogen bonds).',
              examTipBn: 'A এবং T সমান অনুপাতে থাকে (Chargaff\'s Rule)।',
            },
            {
              id: 'base_gc',
              x: 180,
              y: 190,
              labelEn: 'G ≡ C (Guanine - Cytosine Pair)',
              labelBn: 'গুয়ানিন ও সাইটোসিন জোড়',
              descriptionBn: 'গুয়ানিন সবসময় তিনটি শক্তিশালী হাইড্রোজেন বন্ধন (G ≡ C) দ্বারা সাইটোসিনের সাথে যুক্ত থাকে।',
              functionEn: 'Stronger complementary base pairing (3 hydrogen bonds).',
              examTipBn: 'G-C জোড় ভাঙতে বেশি তাপশক্তির প্রয়োজন হয়।',
            },
          ],
        };

      default: // Photosynthesis
        return {
          title: 'সালোকসংশ্লেষণ প্রক্রিয়া (Photosynthesis Process)',
          hotspots: [
            {
              id: 'sunlight',
              x: 70,
              y: 60,
              labelEn: 'Sunlight Energy (সৌরশক্তি)',
              labelBn: 'সূর্যরশ্মি ও ফোটন কণা',
              descriptionBn: 'ক্লোরোফিল সূর্যালোকের লাল ও নীল বর্ণালীর ফোটন শোষণ করে উত্তেজিত ইলেকট্রন নির্গত করে।',
              functionEn: 'Drives the light reaction photolysis.',
              examTipBn: 'সবুজ আলো সবচেয়ে কম শোষিত হয় (প্রতিফলিত হয়ে ফিরে আসে)।',
            },
            {
              id: 'water_input',
              x: 90,
              y: 220,
              labelEn: 'Water (H₂O) & Photolysis',
              labelBn: 'পানি ও ফটোলাইসিস',
              descriptionBn: 'মূল দ্বারা শোষিত পানি সূর্যালোকের প্রভাবে ভেঙে অক্সিজেন, ইলেকট্রন ও প্রোটন উৎপন্ন করে।',
              functionEn: 'H2O split into O2, H+ and electrons.',
              examTipBn: 'সালোকসংশ্লেষণে নির্গত অক্সিজেনের মূল উৎস পানি, কার্বন ডাই-অক্সাইড নয়।',
            },
            {
              id: 'glucose_out',
              x: 270,
              y: 210,
              labelEn: 'Glucose (C₆H₁₂O₆)',
              labelBn: 'শর্করা বা গ্লুকোজ খাদ্য',
              descriptionBn: 'অন্ধকার বা কার্বন বিজারণ চক্রে CO₂ যুক্ত হয়ে উদ্ভিদদেহের জন্য স্থায়ী শর্করা খাদ্য প্রস্তুত করে।',
              functionEn: 'Chemical food energy stored in plant.',
              examTipBn: 'ক্যালভিন চক্র বা C3 চক্র উদ্ভিদের স্ট্রোমায় সম্পন্ন হয়।',
            },
          ],
        };
    }
  };

  const { title, hotspots } = getHotspots();

  return (
    <div className="bg-slate-900 border border-slate-700/60 rounded-2xl p-4 sm:p-6 text-white shadow-xl overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-400 bg-teal-950/70 border border-teal-800/60 px-2.5 py-1 rounded-full inline-block mb-1">
            ইন্টারঅ্যাক্টিভ চিত্র (Interactive Diagram)
          </span>
          <h4 className="text-lg font-bold text-slate-100">{title}</h4>
        </div>
        <p className="text-xs text-slate-400 flex items-center gap-1">
          <Info className="w-3.5 h-3.5 text-teal-400" />
          পিনগুলোতে ট্যাপ করে বিস্তারিত দেখুন
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4 items-center">
        {/* SVG Diagram Canvas */}
        <div className="lg:col-span-7 flex justify-center bg-slate-950/60 p-4 rounded-xl border border-slate-800 relative">
          <svg
            viewBox="0 0 360 300"
            className="w-full max-w-[380px] h-auto drop-shadow-md select-none"
            aria-label={title}
          >
            {/* SVG Illustration Base */}
            {diagramId === 'cell' && (
              <g>
                {/* Cell Wall (Hexagonal Plant Shape) */}
                <polygon
                  points="40,90 100,30 260,30 320,90 320,220 260,280 100,280 40,220"
                  fill="#064e3b"
                  stroke="#10b981"
                  strokeWidth="8"
                  opacity="0.85"
                />
                {/* Cell Membrane */}
                <polygon
                  points="46,94 103,38 255,38 314,94 314,216 255,274 103,274 46,216"
                  fill="#022c22"
                  stroke="#34d399"
                  strokeWidth="3"
                />
                {/* Cytoplasm background */}
                <ellipse cx="180" cy="155" rx="120" ry="105" fill="#047857" opacity="0.15" />
                {/* Large Central Vacuole */}
                <ellipse cx="180" cy="210" rx="60" ry="40" fill="#0284c7" opacity="0.35" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
                {/* Nucleus */}
                <circle cx="190" cy="120" r="34" fill="#6d28d9" stroke="#a78bfa" strokeWidth="3" />
                <circle cx="196" cy="116" r="12" fill="#c084fc" opacity="0.9" />
                {/* Mitochondria */}
                <ellipse cx="95" cy="190" rx="26" ry="15" fill="#b91c1c" stroke="#f87171" strokeWidth="2" transform="rotate(-20 95 190)" />
                <path d="M 80 190 Q 95 180 110 190" stroke="#fca5a5" strokeWidth="2" fill="none" />
                {/* Chloroplasts */}
                <ellipse cx="270" cy="180" rx="28" ry="16" fill="#15803d" stroke="#4ade80" strokeWidth="2" transform="rotate(25 270 180)" />
                <circle cx="265" cy="178" r="3" fill="#86efac" />
                <circle cx="275" cy="182" r="3" fill="#86efac" />
              </g>
            )}

            {diagramId === 'heart' && (
              <g>
                {/* Heart Outer Muscle */}
                <path
                  d="M 180 60 C 130 10, 50 60, 80 160 C 100 230, 180 280, 180 280 C 180 280, 260 230, 280 160 C 310 60, 230 10, 180 60 Z"
                  fill="#881337"
                  stroke="#f43f5e"
                  strokeWidth="5"
                />
                {/* Septum & Chambers dividing line */}
                <path d="M 180 80 L 180 260" stroke="#fb7185" strokeWidth="6" strokeLinecap="round" />
                <path d="M 90 150 L 270 150" stroke="#e11d48" strokeWidth="3" strokeDasharray="5 3" />
                {/* Blue (Deoxygenated) indicator on Right Heart (Viewer's Left) */}
                <circle cx="130" cy="115" r="26" fill="#1e3a8a" opacity="0.75" />
                <circle cx="130" cy="200" r="28" fill="#1d4ed8" opacity="0.8" />
                {/* Red (Oxygenated) indicator on Left Heart (Viewer's Right) */}
                <circle cx="230" cy="115" r="26" fill="#9f1239" opacity="0.75" />
                <circle cx="230" cy="200" r="32" fill="#be123c" opacity="0.8" />
                {/* Aorta Arch */}
                <path d="M 175 75 C 175 30, 205 20, 220 40 L 220 60" fill="none" stroke="#ef4444" strokeWidth="12" strokeLinecap="round" />
              </g>
            )}

            {diagramId === 'respiratory' && (
              <g>
                {/* Trachea */}
                <rect x="165" y="40" width="30" height="75" rx="5" fill="#0369a1" stroke="#38bdf8" strokeWidth="2" />
                <line x1="165" y1="55" x2="195" y2="55" stroke="#7dd3fc" strokeWidth="2" />
                <line x1="165" y1="70" x2="195" y2="70" stroke="#7dd3fc" strokeWidth="2" />
                <line x1="165" y1="85" x2="195" y2="85" stroke="#7dd3fc" strokeWidth="2" />
                <line x1="165" y1="100" x2="195" y2="100" stroke="#7dd3fc" strokeWidth="2" />
                {/* Bronchi division */}
                <path d="M 180 115 L 125 155 M 180 115 L 235 155" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
                {/* Left & Right Lungs */}
                <path d="M 130 145 C 90 145, 60 190, 75 250 C 90 270, 140 260, 145 220 Z" fill="#be185d" opacity="0.6" stroke="#f472b6" strokeWidth="2" />
                <path d="M 230 145 C 270 145, 300 190, 285 250 C 270 270, 220 260, 215 220 Z" fill="#be185d" opacity="0.6" stroke="#f472b6" strokeWidth="2" />
                {/* Alveolar Cluster bubble callout */}
                <circle cx="260" cy="210" r="22" fill="#fda4af" stroke="#f43f5e" strokeWidth="3" />
                <circle cx="253" cy="205" r="8" fill="#f43f5e" />
                <circle cx="268" cy="208" r="7" fill="#f43f5e" />
                <circle cx="260" cy="218" r="7" fill="#f43f5e" />
              </g>
            )}

            {diagramId === 'dna' && (
              <g>
                {/* DNA Double Helix Strands */}
                <path d="M 100 40 Q 180 100, 260 40 T 260 160 T 100 260" fill="none" stroke="#0284c7" strokeWidth="7" strokeLinecap="round" />
                <path d="M 260 40 Q 180 100, 100 40 T 100 160 T 260 260" fill="none" stroke="#0d9488" strokeWidth="7" strokeLinecap="round" />
                {/* Base Pair Rungs */}
                <line x1="120" y1="65" x2="240" y2="65" stroke="#f59e0b" strokeWidth="4" />
                <line x1="145" y1="100" x2="215" y2="100" stroke="#ef4444" strokeWidth="4" />
                <line x1="130" y1="135" x2="230" y2="135" stroke="#10b981" strokeWidth="4" />
                <line x1="120" y1="180" x2="240" y2="180" stroke="#a855f7" strokeWidth="4" />
                <line x1="145" y1="220" x2="215" y2="220" stroke="#f59e0b" strokeWidth="4" />
              </g>
            )}

            {diagramId === 'photosynthesis' && (
              <g>
                {/* Sun */}
                <circle cx="70" cy="60" r="24" fill="#fbbf24" stroke="#f59e0b" strokeWidth="4" />
                <line x1="70" y1="25" x2="70" y2="15" stroke="#fbbf24" strokeWidth="3" />
                <line x1="100" y1="60" x2="115" y2="60" stroke="#fbbf24" strokeWidth="3" />
                <line x1="90" y1="80" x2="105" y2="95" stroke="#fbbf24" strokeWidth="3" />
                {/* Leaf Shape */}
                <path d="M 110 200 C 110 100, 250 110, 290 200 C 250 250, 150 260, 110 200 Z" fill="#15803d" stroke="#4ade80" strokeWidth="4" />
                <path d="M 110 200 Q 200 185 290 200" stroke="#86efac" strokeWidth="3" fill="none" />
                {/* CO2 In arrow */}
                <path d="M 220 60 L 220 120" stroke="#93c5fd" strokeWidth="3" markerEnd="url(#arrow)" />
                <text x="210" y="50" fill="#bfdbfe" fontSize="12" fontWeight="bold">CO₂ In</text>
                {/* O2 Out arrow */}
                <path d="M 260 140 L 310 110" stroke="#86efac" strokeWidth="3" />
                <text x="290" y="105" fill="#bbf7d0" fontSize="12" fontWeight="bold">O₂ Out</text>
                {/* Water from Roots */}
                <path d="M 80 270 L 110 215" stroke="#38bdf8" strokeWidth="3" strokeDasharray="3 2" />
                <text x="50" y="285" fill="#7dd3fc" fontSize="12" fontWeight="bold">H₂O (Water)</text>
              </g>
            )}

            {/* Hotspot Markers (Pulsing Pins) */}
            {hotspots.map((spot) => {
              const isSelected = selectedHotspot?.id === spot.id;
              return (
                <g
                  key={spot.id}
                  className="cursor-pointer transition-transform duration-200"
                  onClick={() => setSelectedHotspot(spot)}
                >
                  <circle
                    cx={spot.x}
                    cy={spot.y}
                    r={isSelected ? 14 : 10}
                    fill={isSelected ? '#38bdf8' : '#0284c7'}
                    stroke="#ffffff"
                    strokeWidth={isSelected ? 3 : 2}
                    className={isSelected ? 'animate-pulse' : ''}
                  />
                  <text
                    x={spot.x}
                    y={spot.y + 4}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="11"
                    fontWeight="bold"
                    pointerEvents="none"
                  >
                    ●
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Hotspot Details Card */}
        <div className="lg:col-span-5 bg-slate-800/80 p-4 sm:p-5 rounded-xl border border-slate-700 flex flex-col justify-between min-h-[260px]">
          {selectedHotspot ? (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="p-1 bg-teal-500/20 text-teal-300 rounded-md">
                  <Sparkles className="w-4 h-4" />
                </span>
                <span className="text-xs uppercase font-bold tracking-wider text-teal-400">
                  {selectedHotspot.labelEn}
                </span>
              </div>
              <h5 className="text-lg font-bold text-slate-100 mb-2">
                {selectedHotspot.labelBn}
              </h5>
              <p className="text-sm text-slate-300 leading-relaxed mb-3">
                {selectedHotspot.descriptionBn}
              </p>
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700/80 text-xs text-slate-300 mb-3 space-y-1">
                <p className="font-semibold text-sky-400">English Concept / Function:</p>
                <p className="italic text-slate-200">{selectedHotspot.functionEn}</p>
              </div>
              <div className="bg-emerald-950/40 border border-emerald-800/60 p-2.5 rounded-lg text-xs text-emerald-300 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>পরীক্ষার টিপস:</strong> {selectedHotspot.examTipBn}</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-8 text-slate-400">
              <div className="w-12 h-12 rounded-full bg-slate-700/50 flex items-center justify-center mb-3 text-teal-400">
                <Info className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-slate-300">
                বাম পাশের চিত্রের যে কোনো পয়েন্টে ক্লিক বা ট্যাপ করুন
              </p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                কোষের অঙ্গাণু, হৃৎপিণ্ডের প্রকোষ্ঠ এবং জীববিজ্ঞানের মূল ধারণার সচিত্র বিবরণ জানুন।
              </p>
            </div>
          )}

          {/* Quick select buttons */}
          <div className="pt-3 border-t border-slate-700/70 mt-3">
            <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
              দ্রুত নির্বাচন করুন (Quick Select):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {hotspots.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setSelectedHotspot(spot)}
                  className={`text-xs px-2.5 py-1 rounded-md transition-all font-medium ${
                    selectedHotspot?.id === spot.id
                      ? 'bg-teal-500 text-slate-950 font-bold'
                      : 'bg-slate-700/70 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {spot.labelBn.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
