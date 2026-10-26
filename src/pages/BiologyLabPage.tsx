import React, { useState } from 'react';
import { StudentClass, BiologyTopic } from '../types';
import { BIOLOGY_TOPICS } from '../data/curriculumData';
import { InteractiveDiagram } from '../components/biology/InteractiveDiagram';
import {
  Dna,
  BookOpen,
  Sparkles,
  Layers,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  ChevronRight,
  RotateCcw,
  Zap,
} from 'lucide-react';

interface BiologyLabProps {
  selectedClass: StudentClass;
  language: 'bn' | 'en';
}

export const BiologyLabPage: React.FC<BiologyLabProps> = ({ selectedClass, language }) => {
  const [activeTopicId, setActiveTopicId] = useState<string>('cell-organelles');
  const [activeTab, setActiveTab] = useState<'diagram' | 'definitions' | 'flashcards' | 'examTips'>('diagram');
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const currentTopic =
    BIOLOGY_TOPICS.find((t) => t.id === activeTopicId) || BIOLOGY_TOPICS[0];

  const handleToggleCard = (index: number) => {
    setFlippedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-800 to-cyan-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-emerald-600/30">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-xs font-semibold text-emerald-200 mb-2">
          <Dna className="w-3.5 h-3.5 text-teal-300" />
          <span>Biology & Life Science • Classes 9–10</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Biology Learning Lab (জীববিজ্ঞান ল্যাব)
        </h2>
        <p className="text-sm text-emerald-100 mt-1 max-w-2xl font-bangla">
          সচিত্র ইন্টারঅ্যাক্টিভ অ্যানাটমি, কোষের সূক্ষ্ম গঠন, ডিএনএ ডাবল হেলিক্স এবং বাস্তব উপমার মাধ্যমে জীববিজ্ঞানের গভীর জ্ঞান অর্জন।
        </p>
      </div>

      {/* Main Grid: Sidebar topics + Active topic content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Topic Selector */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700/60">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              অধ্যায় ও বিষয় নির্বাচন
            </span>
            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              {BIOLOGY_TOPICS.length} অধ্যায়
            </span>
          </div>

          <div className="flex lg:flex-col gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {BIOLOGY_TOPICS.map((topic) => {
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
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <div className="truncate">
                    <p className="font-bold">{topic.titleBn}</p>
                    <p className={`text-[11px] truncate ${isActive ? 'text-emerald-100' : 'text-slate-400'}`}>
                      {topic.titleEn}
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 ml-1 hidden lg:block ${isActive ? 'text-white' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Detail Pane */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Topic Banner */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full">
                Biology Concept
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                {currentTopic.titleBn} ({currentTopic.titleEn})
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {currentTopic.tagline}
              </p>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-3 leading-relaxed font-bangla bg-emerald-50/50 dark:bg-slate-900/40 p-3.5 rounded-xl border border-emerald-100 dark:border-slate-700">
                {currentTopic.explanationBn}
              </p>
            </div>

            {/* Sub-tabs: Diagram | Definitions | Analogies | Flashcards */}
            <div className="flex flex-wrap gap-2 border-b border-slate-100 dark:border-slate-700/70 pb-3">
              {[
                { id: 'diagram', label: 'ইন্টারঅ্যাক্টিভ চিত্র (Diagram)' },
                { id: 'definitions', label: 'মূল সংজ্ঞা (Definitions)' },
                { id: 'flashcards', label: 'ফ্ল্যাশকার্ড (Flashcards)' },
                { id: 'examTips', label: 'বোর্ড পরীক্ষার টিপস (Tips)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                    activeTab === tab.id
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Interactive Diagram */}
            {activeTab === 'diagram' && (
              <div className="space-y-4 animate-in fade-in">
                {currentTopic.diagramId ? (
                  <InteractiveDiagram diagramId={currentTopic.diagramId} />
                ) : (
                  <div className="p-8 text-center bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                      এই অধ্যায়ের টেক্সট-ভিত্তিক চিত্র ও ফ্লোচার্ট সংজ্ঞায় যুক্ত রয়েছে।
                    </p>
                  </div>
                )}

                {/* Analogies Section */}
                {currentTopic.analogies && currentTopic.analogies.length > 0 && (
                  <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 p-4 rounded-xl space-y-2">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-600" />
                      <span>বাস্তব জীবনের উপমা (Real-Life Analogy):</span>
                    </h5>
                    {currentTopic.analogies.map((an, i) => (
                      <div key={i} className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-bangla">
                        <strong>{an.concept}:</strong> {an.analogyBn}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Key Definitions & Scientific Terminology */}
            {activeTab === 'definitions' && (
              <div className="space-y-3 animate-in fade-in">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  পরীক্ষায় সর্বাধিক আসা সংজ্ঞা ও বৈজ্ঞানিক পরিভাষা
                </h5>
                <div className="grid grid-cols-1 gap-3">
                  {currentTopic.keyDefinitions.map((def, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                          {def.termBn}
                        </span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                          {def.termEn}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-bangla">
                        {def.defBn}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Interactive Flip Flashcards */}
            {activeTab === 'flashcards' && (
              <div className="space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>কার্ডে ট্যাপ করে উত্তর ও উল্টো পিঠ দেখুন</span>
                  <button
                    onClick={() => setFlippedCards({})}
                    className="text-emerald-600 font-semibold hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>সব রিসেট</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentTopic.flashcards.map((card, i) => {
                    const isFlipped = Boolean(flippedCards[i]);
                    return (
                      <div
                        key={i}
                        onClick={() => handleToggleCard(i)}
                        className={`cursor-pointer min-h-[140px] p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                          isFlipped
                            ? 'bg-emerald-900 text-white border-emerald-600 shadow-md'
                            : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700 hover:border-emerald-400'
                        }`}
                      >
                        <div>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mb-2 ${
                              isFlipped
                                ? 'bg-emerald-800 text-emerald-200'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300'
                            }`}
                          >
                            {isFlipped ? 'উত্তর (Back Side)' : 'প্রশ্ন (Front Side)'}
                          </span>
                          <p className="text-xs sm:text-sm font-semibold leading-relaxed font-bangla">
                            {isFlipped ? card.back : card.front}
                          </p>
                        </div>
                        <span
                          className={`text-[10px] text-right mt-2 ${
                            isFlipped ? 'text-emerald-300' : 'text-slate-400'
                          }`}
                        >
                          {isFlipped ? '↺ আবার প্রশ্ন দেখতে ট্যাপ করুন' : '↻ উত্তর দেখতে ট্যাপ করুন'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 4: Exam Tips */}
            {activeTab === 'examTips' && (
              <div className="space-y-3 animate-in fade-in">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  বোর্ড পরীক্ষার জন্য বিশেষ পরামর্শ
                </h5>
                <div className="space-y-2">
                  {currentTopic.examTipsBn.map((tip, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-2.5 font-bangla leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
