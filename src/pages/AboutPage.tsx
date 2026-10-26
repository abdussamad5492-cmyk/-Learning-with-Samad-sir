import React, { useState, useEffect } from 'react';
import { StudentClass } from '../types';
import {
  BookOpen,
  Lightbulb,
  Sparkles,
  ShieldCheck,
  Smartphone,
  Cpu,
  Globe,
  Award,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Key,
} from 'lucide-react';

interface AboutPageProps {
  selectedClass: StudentClass;
  onSelectClass: (cls: StudentClass) => void;
  language: 'bn' | 'en';
  onToggleLanguage: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onClearAllData: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  selectedClass,
  onSelectClass,
  language,
  onToggleLanguage,
  darkMode,
  onToggleDarkMode,
  onClearAllData,
}) => {
  const [healthStatus, setHealthStatus] = useState<{
    status: string;
    hasApiKey: boolean;
    appName: string;
    version: string;
  } | null>(null);

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setHealthStatus(data))
      .catch((err) => console.error('Health fetch error:', err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Brand Header */}
      <div className="bg-gradient-to-r from-blue-800 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-blue-700/40">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-teal-400 flex items-center justify-center text-white shadow-lg">
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Smart Learning with Samad Sir
            </h2>
            <p className="text-xs sm:text-sm text-teal-300 font-semibold">
              Learn Smart. Think Deeply. Succeed Together.
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-200 mt-2 max-w-2xl font-bangla leading-relaxed">
          বাংলাদেশের মাধ্যমিক স্তরের (৬ষ্ঠ–১০ম শ্রেণি) শিক্ষার্থীদের জন্য সহজ ভাষায় বিজ্ঞান, ইংরেজি গ্রামার ও তথ্যপ্রযুক্তি শিক্ষার সমন্বিত আধুনিক প্ল্যাটফর্ম।
        </p>
      </div>

      {/* App Preferences & Settings */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-7 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          অ্যাপ প্রেফারেন্স ও কনফিগারেশন (App Settings)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Default Class */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
              ডিফল্ট শ্রেণি:
            </label>
            <select
              value={selectedClass}
              onChange={(e) => onSelectClass(e.target.value as StudentClass)}
              className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-xs font-bold text-slate-800 dark:text-slate-100"
            >
              {(['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'] as StudentClass[]).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Language Toggle */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                অ্যাপের ভাষা (Language):
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                বর্তমান ভাষা: <strong>{language === 'bn' ? 'বাংলা' : 'English'}</strong>
              </p>
            </div>
            <button
              onClick={onToggleLanguage}
              className="mt-2 text-xs py-1.5 px-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors"
            >
              ভাষা পরিবর্তন করুন
            </button>
          </div>

          {/* Theme Toggle */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                থিম (Color Theme):
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                বর্তমান মোড: <strong>{darkMode ? 'Dark Theme (রাত)' : 'Light Theme (দিন)'}</strong>
              </p>
            </div>
            <button
              onClick={onToggleDarkMode}
              className="mt-2 text-xs py-1.5 px-3 rounded-lg bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-100 font-bold hover:bg-slate-300 transition-colors"
            >
              {darkMode ? 'লাইট মোড অন করুন' : 'ডার্ক মোড অন করুন'}
            </button>
          </div>
        </div>
      </div>

      {/* AI Backend & System Diagnostics */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-7 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-blue-600" />
          <span>এআই ইঞ্জিন ও সিস্টেম স্ট্যাটাস (System Diagnostics)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-slate-500 block">AI মডেল (Server Engine):</span>
            <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
              gemini-3.8-flash (via @google/genai SDK)
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-slate-500 block">সার্ভার সিক্রেট স্ট্যাটাস:</span>
            {healthStatus?.hasApiKey ? (
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                GEMINI_API_KEY সংযুক্ত রয়েছে
              </span>
            ) : (
              <span className="font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <Key className="w-3.5 h-3.5" />
                কিউরেটেড অফলাইন মোড (Secrets প্যানেলে GEMINI_API_KEY দিন)
              </span>
            )}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-200 leading-relaxed font-bangla">
          <strong>সার্ভার-সাইড সুরক্ষা নীতি:</strong> গুগল এআই স্টুডিওর সুরক্ষা নির্দেশিকা অনুসারে কোনো এপিআই কী ক্লায়েন্ট ব্রাউজারে উন্মুক্ত করা হয় না। সকল জেনারেটিভ রিকোয়েস্ট এক্সপ্রেস ব্যাকএন্ড সার্ভারের মাধ্যমে সুরক্ষিতভাবে সম্পন্ন হয়।
        </div>
      </div>

      {/* Pedagogical Philosophy & Target Users */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-7 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-teal-600" />
          <span>লক্ষ্য, উদ্দেশ্য ও পাঠদান দর্শন</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 dark:text-slate-200">
              কাদের জন্য এই প্ল্যাটফর্ম?
            </h4>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-300 list-disc list-inside font-bangla">
              <li>৬ষ্ঠ থেকে ১০ম শ্রেণির বাংলাদেশি শিক্ষার্থীরা</li>
              <li>ইংরেজি ২য় পত্র ও জীববিজ্ঞানের শিক্ষকবৃন্দ</li>
              <li>সাধারণ বিজ্ঞান ও আইসিটি শিক্ষকবৃন্দ</li>
              <li>শ্রেণিকক্ষে এআই প্রযুক্তি ব্যবহারে আগ্রহী শিক্ষকগণ</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 dark:text-slate-200">
              মোবাইল-ফার্স্ট ডিজাইন অগ্রাধিকার
            </h4>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-300 list-disc list-inside font-bangla">
              <li>সাধারণ স্মার্টফোনে দ্রুত লোডিং ও রেসপনসিভনেস</li>
              <li>কোনো আনুভূমিক স্ক্রোলিং (Horizontal Scroll) নেই</li>
              <li>সহজ বাংলা ফন্ট (Hind Siliguri) নির্ভরযোগ্য রেন্ডারিং</li>
              <li>অফলাইন-বান্ধব লোকাল স্টোরেজ প্রগ্রেস ট্র্যাকিং</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Safety & Educational Disclaimer */}
      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-300/80 dark:border-amber-900/40 rounded-2xl p-5 space-y-2 text-xs text-amber-900 dark:text-amber-200">
        <div className="flex items-center gap-2 font-bold text-sm text-amber-800 dark:text-amber-300">
          <ShieldCheck className="w-4 h-4 text-amber-600" />
          <span>শিক্ষামূলক নির্দেশিকা ও সতর্কবার্তা (Educational Disclaimer)</span>
        </div>
        <p className="leading-relaxed font-bangla">
          এই প্ল্যাটফর্মে প্রদত্ত পাঠ সহায়তা ও অনুশীলন প্রশ্নগুলো শিক্ষার্থীদের সাধারণ বিষয়ভিত্তিক ধারণা স্পষ্টকরণ ও দক্ষতা বৃদ্ধির জন্য প্রস্তুতকৃত। এটি জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) বা কোনো নির্দিষ্ট শিক্ষা বোর্ডের অফিসিয়াল প্রশ্নপত্র বা অনুমোদন দাবি করে না। কৃত্রিম বুদ্ধিমত্তা চালিত উত্তরসমূহ সর্বদা আপনার মূল পাঠ্যপুস্তকের সাথে মিলিয়ে অধ্যয়ন করার পরামর্শ দেওয়া হচ্ছে।
        </p>
      </div>

      {/* Reset Local Data */}
      <div className="pt-2 flex justify-between items-center text-xs text-slate-500">
        <span>স্মার্ট লার্নিং উইথ সামাদ স্যার • সংস্করণ ১.০.০</span>
        <button
          onClick={onClearAllData}
          className="text-red-600 dark:text-red-400 font-semibold hover:underline flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>সকল লোকাল ডেটা রিসেট করুন</span>
        </button>
      </div>
    </div>
  );
};
