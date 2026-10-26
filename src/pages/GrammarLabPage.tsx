import React, { useState } from 'react';
import { StudentClass, GrammarTopic, GrammarExercise } from '../types';
import { GRAMMAR_TOPICS } from '../data/curriculumData';
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  BookCheck,
  ChevronRight,
  Filter,
  GraduationCap,
} from 'lucide-react';

interface GrammarLabProps {
  selectedClass: StudentClass;
  language: 'bn' | 'en';
  onRecordProgress?: (topic: string, score: number, total: number) => void;
}

export const GrammarLabPage: React.FC<GrammarLabProps> = ({
  selectedClass,
  language,
  onRecordProgress,
}) => {
  const [activeTopicId, setActiveTopicId] = useState<string>('right-forms-of-verbs');
  const [activeDifficulty, setActiveDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showFeedback, setShowFeedback] = useState<Record<number, boolean>>({});
  const [isGeneratingAiDrills, setIsGeneratingAiDrills] = useState(false);
  const [aiExercises, setAiExercises] = useState<GrammarExercise[]>([]);

  const currentTopic =
    GRAMMAR_TOPICS.find((t) => t.id === activeTopicId) || GRAMMAR_TOPICS[0];

  const exercises = aiExercises.length > 0 ? aiExercises : currentTopic.exercises;

  const handleSelectAnswer = (exId: number, answer: string) => {
    setUserAnswers((prev) => ({ ...prev, [exId]: answer }));
    setShowFeedback((prev) => ({ ...prev, [exId]: true }));

    // Optional progress recording
    if (onRecordProgress) {
      const isCorrect = answer === exercises.find((e) => e.id === exId)?.correctAnswer;
      if (isCorrect) {
        onRecordProgress(currentTopic.titleEn, 1, 1);
      }
    }
  };

  const handleResetExercises = () => {
    setUserAnswers({});
    setShowFeedback({});
    setAiExercises([]);
  };

  const handleGenerateAiDrills = async () => {
    setIsGeneratingAiDrills(true);
    setUserAnswers({});
    setShowFeedback({});

    try {
      const response = await fetch('/api/gemini/grammar-practice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: currentTopic.titleEn,
          studentClass: selectedClass,
          difficulty: activeDifficulty,
          count: 5,
        }),
      });

      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      if (data.exercises && Array.isArray(data.exercises)) {
        setAiExercises(data.exercises);
      }
    } catch (err) {
      console.error('Failed to generate AI grammar drills:', err);
    } finally {
      setIsGeneratingAiDrills(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-blue-600/30">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-xs font-semibold text-blue-200 mb-2">
          <BookCheck className="w-3.5 h-3.5 text-teal-300" />
          <span>English 2nd Paper • Classes 6–10 Mastery</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          English Grammar Learning Lab
        </h2>
        <p className="text-sm text-blue-100 mt-1 max-w-2xl font-bangla">
          বোর্ড পরীক্ষার কমন গ্রামার রুলস, সূত্রের টেবিল, সাধারণ ভুল সংশোধন এবং তাৎক্ষণিক ফিডব্যাকসহ এআই অনুশীলন।
        </p>
      </div>

      {/* Main Grid: Sidebar topics + Active topic content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Topics Nav (Scrollable pills on mobile, clean list on desktop) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700/60">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-blue-600" />
              গ্রামার টপিক নির্বাচন
            </span>
            <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
              {GRAMMAR_TOPICS.length} টপিক
            </span>
          </div>

          <div className="flex lg:flex-col gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {GRAMMAR_TOPICS.map((topic) => {
              const isActive = activeTopicId === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => {
                    setActiveTopicId(topic.id);
                    handleResetExercises();
                  }}
                  className={`text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap lg:whitespace-normal transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <div className="truncate">
                    <p className="font-bold">{topic.titleEn}</p>
                    <p className={`text-[11px] truncate ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                      {topic.titleBn}
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 ml-1 hidden lg:block ${isActive ? 'text-white' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Details Panel: Rules + Formulas + Live Drills */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Topic Header Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-700">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full">
                  Topic Guide
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {currentTopic.titleEn}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bangla">
                  {currentTopic.summaryBn}
                </p>
              </div>

              {/* Difficulty selector */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700/60 p-1 rounded-xl self-start sm:self-auto">
                {(['Easy', 'Medium', 'Hard'] as const).map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setActiveDifficulty(diff)}
                    className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-all ${
                      activeDifficulty === diff
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Rules Cards */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>মূল নিয়মাবলি ও স্ট্রাকচার (Core Rules & Formula)</span>
              </h4>

              {currentTopic.rules.map((rule) => (
                <div
                  key={rule.ruleNo}
                  className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200/80 dark:border-slate-700/80 space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center shrink-0">
                      {rule.ruleNo}
                    </span>
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                      {rule.title}
                    </h5>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-bangla">
                    {rule.explanationBn}
                  </p>

                  {rule.formula && (
                    <div className="bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/70 dark:border-blue-800/60 p-2.5 rounded-lg text-xs font-mono font-bold text-blue-800 dark:text-blue-300">
                      {rule.formula}
                    </div>
                  )}

                  {/* Examples */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                      বাস্তব উদাহরণ (Examples):
                    </span>
                    {rule.examples.map((ex, i) => (
                      <div
                        key={i}
                        className="bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-200/70 dark:border-slate-700 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1"
                      >
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {ex.en}
                        </span>
                        <span className="text-slate-500 dark:text-slate-400 italic">
                          ({ex.bn})
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Common mistake callout */}
                  {rule.commonMistake && (
                    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 p-3 rounded-lg text-xs space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>সাধারণ ভুল ও সতর্কতা (Common Mistake):</span>
                      </div>
                      <p className="text-red-600 dark:text-red-400 line-through">
                        ভুল: {rule.commonMistake.wrong}
                      </p>
                      <p className="text-emerald-700 dark:text-emerald-300 font-semibold">
                        সঠিক: {rule.commonMistake.right}
                      </p>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                        নোট: {rule.commonMistake.note}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Practice Drills & Exercises */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-700">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>ইন্টারঅ্যাক্টিভ অনুশীলন (Practice Drills)</span>
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  সঠিক অপশনে ক্লিক করে সাথে সাথে উত্তর ও বাংলা ব্যাখ্যা যাচাই করুন
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleGenerateAiDrills}
                  disabled={isGeneratingAiDrills}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 active:scale-95 transition-all disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5 text-teal-300" />
                  <span>
                    {isGeneratingAiDrills ? 'জেনারেট হচ্ছে...' : 'AI নতুন প্রশ্ন তৈরি করুন'}
                  </span>
                </button>

                <button
                  onClick={handleResetExercises}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  title="রিসেট করুন"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Questions list */}
            <div className="space-y-4">
              {exercises.map((ex, index) => {
                const selected = userAnswers[ex.id];
                const isAnswered = showFeedback[ex.id];
                const isCorrect = selected === ex.correctAnswer;

                return (
                  <div
                    key={ex.id}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700/80 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          প্রশ্ন {index + 1}
                        </span>
                        <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                          {ex.instruction}
                        </p>
                        <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1 font-mono">
                          {ex.question}
                        </p>
                      </div>

                      {isAnswered && (
                        <div className="shrink-0">
                          {isCorrect ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              সঠিক!
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
                              <XCircle className="w-3.5 h-3.5" />
                              ভুল
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Options list */}
                    {ex.options && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {ex.options.map((opt, optIdx) => {
                          const isOptionSelected = selected === opt;
                          const isOptionCorrect = opt === ex.correctAnswer;

                          let btnStyle =
                            'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-blue-400';

                          if (isAnswered) {
                            if (isOptionCorrect) {
                              btnStyle =
                                'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold ring-1 ring-emerald-500';
                            } else if (isOptionSelected) {
                              btnStyle =
                                'bg-red-50 dark:bg-red-950/60 border-red-500 text-red-800 dark:text-red-200 font-bold';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectAnswer(ex.id, opt)}
                              className={`p-3 rounded-xl border text-xs text-left transition-all ${btnStyle}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Explanation breakdown */}
                    {isAnswered && (
                      <div className="bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/50 p-3 rounded-xl text-xs space-y-1 animate-in fade-in">
                        <p className="font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1">
                          <HelpCircle className="w-3.5 h-3.5" />
                          <span>সামাদ স্যারের উত্তর ও ব্যাখ্যা:</span>
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-bangla">
                          {ex.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
