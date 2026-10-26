import React, { useState } from 'react';
import { PageId, StudentClass, SubjectId } from '../types';
import { SUBJECTS, DAILY_TIPS } from '../data/curriculumData';
import {
  Sparkles,
  BookOpen,
  Dna,
  Atom,
  Cpu,
  CheckCircle,
  FileText,
  TrendingUp,
  ArrowRight,
  Lightbulb,
  GraduationCap,
  Award,
  Clock,
  ChevronRight,
  Flame,
  HelpCircle,
  BookCheck,
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: PageId, extra?: { subject?: SubjectId; topic?: string }) => void;
  selectedClass: StudentClass;
  onSelectClass: (cls: StudentClass) => void;
  language: 'bn' | 'en';
  progressData: {
    totalQuizzes: number;
    averageScore: number;
    recentActivities: { id: string; title: string; time: string; type: string }[];
  };
}

export const DashboardPage: React.FC<DashboardProps> = ({
  onNavigate,
  selectedClass,
  onSelectClass,
  language,
  progressData,
}) => {
  const [tipIndex, setTipIndex] = useState(0);
  const currentTip = DAILY_TIPS[tipIndex % DAILY_TIPS.length];

  const handleNextTip = () => {
    setTipIndex((prev) => (prev + 1) % DAILY_TIPS.length);
  };

  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen':
        return <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
      case 'Dna':
        return <Dna className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      case 'Atom':
        return <Atom className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-violet-600 dark:text-violet-400" />;
      default:
        return <BookOpen className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Hero Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white p-6 sm:p-10 shadow-xl border border-blue-600/30">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal-300" />
            <span>বাংলাদেশ জাতীয় শিক্ষাক্রম (Classes 6–10)</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white mb-2">
            Welcome to Smart Learning with Samad Sir!
          </h2>
          <p className="text-base sm:text-lg text-blue-100 font-normal leading-relaxed mb-6 font-bangla">
            কঠিন বিষয়গুলো শিখুন সহজ বাংলা ব্যাখ্যা, বাস্তব উদাহরণ এবং এআই চালিত অনুশীলনের মাধ্যমে।
            ইংরেজি ব্যাকরণ, জীববিজ্ঞান, সাধারণ বিজ্ঞান ও আইসিটিতে পূর্ণাঙ্গ দখল নিন।
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('tutor')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-blue-900 font-bold text-sm shadow-md hover:bg-blue-50 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>{language === 'bn' ? 'স্যারের কাছে প্রশ্ন করুন' : 'Ask Samad Sir'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('quiz')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600/40 hover:bg-blue-600/60 border border-blue-400/30 text-white font-semibold text-sm active:scale-95 transition-all"
            >
              <CheckCircle className="w-4 h-4 text-emerald-300" />
              <span>{language === 'bn' ? 'কুইজ অনুশীলন শুরু' : 'Practice Quiz'}</span>
            </button>

            <button
              onClick={() => onNavigate('teacher')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/40 hover:bg-slate-900/60 border border-white/10 text-blue-200 font-semibold text-sm active:scale-95 transition-all"
            >
              <FileText className="w-4 h-4 text-amber-300" />
              <span>{language === 'bn' ? 'শিক্ষক কর্নার' : 'Teachers Hub'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Class Filter Quick Bar */}
      <section className="bg-white dark:bg-slate-800/90 rounded-2xl p-4 border border-slate-200 dark:border-slate-700/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
          <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-bold">
            {language === 'bn' ? 'আপনার শ্রেণি নির্বাচন করুন:' : 'Select Your Class:'}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {(['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'] as StudentClass[]).map((cls) => (
            <button
              key={cls}
              onClick={() => onSelectClass(cls)}
              className={`flex-1 sm:flex-none text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                selectedClass === cls
                  ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400/30'
                  : 'bg-slate-100 dark:bg-slate-700/70 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cls}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Four Core Subject Cards */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>{language === 'bn' ? 'মূল বিষয়সমূহ' : 'Curriculum Subjects'}</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'bn'
                ? `${selectedClass}-এর জন্য নির্ধারিত পাঠ্যসূচি`
                : `Tailored curriculum for ${selectedClass}`}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SUBJECTS.map((sub) => {
            const isRelevant = sub.classes.includes(selectedClass);
            return (
              <div
                key={sub.id}
                onClick={() => {
                  if (sub.id === 'english') onNavigate('grammar');
                  else if (sub.id === 'biology') onNavigate('biology');
                  else if (sub.id === 'science') onNavigate('science');
                  else if (sub.id === 'ict') onNavigate('ict');
                }}
                className={`group cursor-pointer rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 p-5 shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition-all flex flex-col justify-between ${
                  !isRelevant ? 'opacity-85' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-100 dark:border-slate-600">
                      {getSubjectIcon(sub.icon)}
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                      {sub.topicsCount} অধ্যায়/টপিক
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {language === 'bn' ? sub.nameBn : sub.nameEn}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {sub.tagline}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span>{language === 'bn' ? 'অধ্যয়ন শুরু করুন' : 'Start Learning'}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Interactive Learning Modules Grid */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <span>{language === 'bn' ? 'স্মার্ট লার্নিং টুলস ও ফিচার' : 'Smart Learning Features'}</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {language === 'bn'
              ? 'ইন্টারেক্টিভ ল্যাব, এআই টিউটর এবং শিক্ষক সহায়িকা'
              : 'Interactive labs, AI tutor, and teaching toolkit'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card: AI Personal Tutor */}
          <div
            onClick={() => onNavigate('tutor')}
            className="cursor-pointer group p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-slate-800 dark:to-slate-800/80 border border-blue-200 dark:border-blue-900/60 hover:shadow-lg transition-all relative overflow-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-3 shadow-md shadow-blue-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center gap-1.5">
              <span>এআই পার্সোনাল টিউটর</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-600 text-white font-bold">LIVE AI</span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
              বাংলা বা ইংরেজিতে যে কোনো প্রশ্ন করুন। সহজ ব্যাখ্যা, বাস্তব উদাহরণ এবং কমন ভুল শুধরে নিন।
            </p>
            <div className="mt-4 flex items-center text-xs font-bold text-blue-700 dark:text-blue-400 gap-1">
              <span>প্রশ্ন জিজ্ঞেস করুন</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card: English Grammar Lab */}
          <div
            onClick={() => onNavigate('grammar')}
            className="cursor-pointer group p-5 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50/50 dark:from-slate-800 dark:to-slate-800/80 border border-sky-200 dark:border-sky-900/60 hover:shadow-lg transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center mb-3 shadow-md shadow-sky-500/20">
              <BookCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400">
              English Grammar Lab
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
              Right Forms of Verbs, Voice Change, Narration, Tag Questions ও উপযুক্ত Preposition-এর নির্ভুল নিয়ম ও ড্রিল।
            </p>
            <div className="mt-4 flex items-center text-xs font-bold text-sky-700 dark:text-sky-400 gap-1">
              <span>গ্রামার ল্যাবে যান</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card: Biology Learning Lab */}
          <div
            onClick={() => onNavigate('biology')}
            className="cursor-pointer group p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/50 dark:from-slate-800 dark:to-slate-800/80 border border-emerald-200 dark:border-emerald-900/60 hover:shadow-lg transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3 shadow-md shadow-emerald-500/20">
              <Dna className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 flex items-center gap-1.5">
              <span>Biology Learning Lab</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-700 text-white font-bold">সচিত্র</span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
              উদ্ভিদ ও প্রাণীকোষ, মানব হৃৎপিণ্ড, শ্বসনতন্ত্র ও ডিএনএ ডাবল হেলিক্সের ইন্টারঅ্যাক্টিভ লেবেলযুক্ত চিত্র।
            </p>
            <div className="mt-4 flex items-center text-xs font-bold text-emerald-700 dark:text-emerald-400 gap-1">
              <span>সচিত্র ল্যাব এক্সপ্লোর করুন</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card: AI Quiz Generator */}
          <div
            onClick={() => onNavigate('quiz')}
            className="cursor-pointer group p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-slate-800 dark:to-slate-800/80 border border-amber-200 dark:border-amber-900/60 hover:shadow-lg transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center mb-3 shadow-md shadow-amber-500/20">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400">
              AI কুইজ ও স্বমূল্যায়ন
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
              অধ্যায়ভিত্তিক MCQ ও ট্রু/ফলস টেস্ট দিন। প্রতিটি প্রশ্নের সাথে সঠিক উত্তরের বিস্তারিত ব্যাখ্যা দেখে নিন।
            </p>
            <div className="mt-4 flex items-center text-xs font-bold text-amber-700 dark:text-amber-400 gap-1">
              <span>কুইজ জেনারেট করুন</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card: Lesson Planner for Teachers */}
          <div
            onClick={() => onNavigate('teacher')}
            className="cursor-pointer group p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-violet-50/50 dark:from-slate-800 dark:to-slate-800/80 border border-purple-200 dark:border-purple-900/60 hover:shadow-lg transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center mb-3 shadow-md shadow-purple-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 flex items-center gap-1.5">
              <span>শিক্ষক সহায়িকা (Lesson Planner)</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-600 text-white font-bold">TEACHER</span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
              ১০-পয়েন্ট জাতীয় কারিকুলাম পাঠ পরিকল্পনা, সৃজনশীল প্রশ্ন (CQ), ওয়ার্কশিট ও উত্তরপত্র মুহূর্তেই তৈরি করুন।
            </p>
            <div className="mt-4 flex items-center text-xs font-bold text-purple-700 dark:text-purple-400 gap-1">
              <span>শিক্ষক টুলসেট দেখুন</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card: My Learning Progress */}
          <div
            onClick={() => onNavigate('progress')}
            className="cursor-pointer group p-5 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50/50 dark:from-slate-800 dark:to-slate-800/80 border border-teal-200 dark:border-teal-900/60 hover:shadow-lg transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center mb-3 shadow-md shadow-teal-500/20">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400">
              আমার শিখন অগ্রগতি (My Progress)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
              রিয়েল কুইজ স্কোর, দুর্বল বিষয়গুলোর তালিকা এবং সামাদ স্যারের বিশেষ রিভিশন গাইডলাইন।
            </p>
            <div className="mt-4 flex items-center text-xs font-bold text-teal-700 dark:text-teal-400 gap-1">
              <span>অগ্রগতি ট্র্যাক করুন</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Split Section: Daily Learning Tip & Real Recent Learning Activities */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Daily Tip Card */}
        <div className="lg:col-span-6 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent dark:from-amber-950/20 dark:to-slate-800/60 p-6 rounded-2xl border border-amber-300/40 dark:border-amber-800/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-400/30">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                {currentTip.category} (দৈনিক শিক্ষণ টিপস)
              </span>
              <button
                onClick={handleNextTip}
                className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline"
              >
                পরবর্তী টিপ →
              </button>
            </div>

            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              {currentTip.titleBn}
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-bangla">
              {currentTip.textBn}
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-amber-200/60 dark:border-amber-900/40 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>সামাদ স্যারের ক্লাসরুম নোটস</span>
            <span className="font-semibold text-slate-600 dark:text-slate-300">
              টিপ {((tipIndex % DAILY_TIPS.length) + 1)} / {DAILY_TIPS.length}
            </span>
          </div>
        </div>

        {/* Recent Learning Activities (Real Data Only) */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-800/90 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>সাম্প্রতিক শিখন কার্যক্রম (Recent Activities)</span>
              </h4>
              <button
                onClick={() => onNavigate('progress')}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                সব দেখুন
              </button>
            </div>

            {progressData.recentActivities && progressData.recentActivities.length > 0 ? (
              <div className="space-y-2.5">
                {progressData.recentActivities.slice(0, 3).map((act) => (
                  <div
                    key={act.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-xs">
                        ✓
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          {act.title}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          {act.type} • {act.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center text-slate-400 dark:text-slate-500 border border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
                <Award className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  এখনো কোনো কার্যক্রম শুরু করেননি
                </p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                  একটি কুইজ দিন অথবা গ্রামার ল্যাবে অনুশীলন করে আপনার অগ্রগতি পর্যবেক্ষণ শুরু করুন।
                </p>
                <button
                  onClick={() => onNavigate('quiz')}
                  className="mt-3 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                >
                  প্রথম কুইজ শুরু করুন
                </button>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-500">
            <span>কুইজ সংখ্যা: <strong>{progressData.totalQuizzes}</strong></span>
            <span>গড় স্কোর: <strong>{progressData.averageScore}%</strong></span>
          </div>
        </div>
      </section>
    </div>
  );
};
