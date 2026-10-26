import React, { useState } from 'react';
import { StudentClass, IctTopic, PageId } from '../types';
import { ICT_TOPICS } from '../data/curriculumData';
import {
  Cpu,
  Sparkles,
  Layers,
  ChevronRight,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Lock,
} from 'lucide-react';

interface IctLabProps {
  selectedClass: StudentClass;
  language: 'bn' | 'en';
  onNavigate: (page: PageId, extra?: { topic?: string }) => void;
}

export const IctLabPage: React.FC<IctLabProps> = ({
  selectedClass,
  language,
  onNavigate,
}) => {
  const [activeTopicId, setActiveTopicId] = useState<string>('networks-and-internet');
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const currentTopic =
    ICT_TOPICS.find((t) => t.id === activeTopicId) || ICT_TOPICS[0];

  const handleToggleCard = (index: number) => {
    setFlippedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-violet-700 via-purple-800 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-violet-600/30">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 text-xs font-semibold text-violet-200 mb-2">
          <Cpu className="w-3.5 h-3.5 text-violet-300" />
          <span>Information & Communication Technology • Classes 6–10</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          তথ্য ও যোগাযোগ প্রযুক্তি ল্যাব (ICT Lab)
        </h2>
        <p className="text-sm text-violet-100 mt-1 max-w-2xl font-bangla">
          কম্পিউটার নেটওয়ার্কিং, সাইবার সুরক্ষা, ডেটাবেজ ও অ্যালগরিদম-ফ্লোচার্টের মৌলিক ধারণা ও ব্যবহারিক প্রস্তুতি।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Topic Selector */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700/60">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-violet-600" />
              আইসিটি টপিকসমূহ
            </span>
            <span className="text-[11px] font-semibold text-violet-600 dark:text-violet-400">
              {ICT_TOPICS.length} টপিক
            </span>
          </div>

          <div className="flex lg:flex-col gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {ICT_TOPICS.map((topic) => {
              const isActive = activeTopicId === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => {
                    setActiveTopicId(topic.id);
                    setFlippedCards({});
                  }}
                  className={`text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap lg:whitespace-normal transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <div className="truncate">
                    <p className="font-bold">{topic.titleBn}</p>
                    <p className={`text-[11px] truncate ${isActive ? 'text-violet-100' : 'text-slate-400'}`}>
                      {topic.titleEn}
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 ml-1 hidden lg:block ${isActive ? 'text-white' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Details Panel */}
        <div className="lg:col-span-8 space-y-5">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/60 px-2.5 py-0.5 rounded-full">
                ICT Core Module
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                {currentTopic.titleBn}
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-2 leading-relaxed font-bangla">
                {currentTopic.explanationBn}
              </p>
            </div>

            {/* Core points */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                মূল ধারণা ও বৈশিষ্ট্যসমূহ:
              </h4>
              <div className="space-y-2">
                {currentTopic.keyPoints.map((pt, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Practical tips */}
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>ব্যবহারিক ডিজিটাল টিপস (Practical Tip):</span>
              </div>
              <p className="leading-relaxed font-bangla">{currentTopic.practicalTipsBn}</p>
            </div>

            {/* Flashcards */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-bold uppercase tracking-wider">আইসিটি রিভিশন ফ্ল্যাশকার্ড</span>
                <button
                  onClick={() => setFlippedCards({})}
                  className="text-violet-600 font-semibold hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>রিসেট</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentTopic.flashcards.map((card, idx) => {
                  const isFlipped = Boolean(flippedCards[idx]);
                  return (
                    <div
                      key={idx}
                      onClick={() => handleToggleCard(idx)}
                      className={`cursor-pointer min-h-[120px] p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                        isFlipped
                          ? 'bg-violet-900 text-white border-violet-600 shadow-md'
                          : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700 hover:border-violet-400'
                      }`}
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider block mb-1.5 opacity-70">
                          {isFlipped ? 'উত্তর' : 'প্রশ্ন'}
                        </span>
                        <p className="text-xs sm:text-sm font-semibold leading-relaxed font-bangla">
                          {isFlipped ? card.back : card.front}
                        </p>
                      </div>
                      <span className="text-[10px] text-right mt-2 opacity-60">
                        {isFlipped ? '↺ প্রশ্ন দেখুন' : '↻ উত্তর দেখুন'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Ask AI CTA */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-end">
              <button
                onClick={() => onNavigate('tutor', { topic: currentTopic.titleEn })}
                className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>সামাদ স্যারকে আইসিটি প্রশ্ন করুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
