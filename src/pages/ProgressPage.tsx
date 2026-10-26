import React from 'react';
import { PageId, QuizResultRecord } from '../types';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';

interface ProgressPageProps {
  quizHistory: QuizResultRecord[];
  onClearHistory: () => void;
  onNavigate: (page: PageId, extra?: { topic?: string }) => void;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({
  quizHistory,
  onClearHistory,
  onNavigate,
}) => {
  const totalQuizzes = quizHistory.length;
  const averageScore =
    totalQuizzes > 0
      ? Math.round(
          quizHistory.reduce((acc, curr) => acc + curr.percentage, 0) / totalQuizzes
        )
      : 0;

  // Compute weak topics from missed questions
  const weakTopicCounts: Record<string, number> = {};
  quizHistory.forEach((q) => {
    if (q.percentage < 80) {
      weakTopicCounts[q.topic] = (weakTopicCounts[q.topic] || 0) + (q.total - q.score);
    }
  });

  const weakTopicsList = Object.entries(weakTopicCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([topic, missedCount]) => ({ topic, missedCount }));

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-700 via-cyan-800 to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-teal-600/30">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-xs font-semibold text-teal-200 mb-2">
          <TrendingUp className="w-3.5 h-3.5 text-teal-300" />
          <span>Real-time Learning Analytics</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          আমার শিখন অগ্রগতি (My Learning Progress)
        </h2>
        <p className="text-sm text-teal-100 mt-1 max-w-2xl font-bangla">
          আপনার প্রদত্ত প্রতিটি কুইজ ও অনুশীলনের বাস্তব স্কোর, চিহ্নিত দুর্বল টপিকসমূহ এবং সামাদ স্যারের বিশেষ রিভিশন গাইডলাইন।
        </p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              মোট কুইজ সম্পন্ন
            </span>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {totalQuizzes}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              গড় সাফল্য (Average)
            </span>
            <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {averageScore}%
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              পুনর্বিবেচনাযোগ্য টপিক
            </span>
            <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">
              {weakTopicsList.length}টি
            </p>
          </div>
        </div>
      </div>

      {/* Actionable Revision Recommendations */}
      {weakTopicsList.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-300/80 dark:border-amber-900/40 rounded-2xl p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-amber-500/20 text-amber-800 dark:text-amber-300">
              <Sparkles className="w-4 h-4" />
            </span>
            <h4 className="text-base font-bold text-amber-900 dark:text-amber-200">
              সামাদ স্যারের বিশেষ রিভিশন পরামর্শ (Personalized Recommendation)
            </h4>
          </div>
          <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed font-bangla">
            কুইজ ফলাফলের ভিত্তিতে নিম্নোক্ত বিষয়ে আপনার অতিরিক্ত অনুশীলন প্রয়োজন:
          </p>
          <div className="space-y-2 pt-1">
            {weakTopicsList.slice(0, 3).map((w, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-amber-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
              >
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {w.topic}
                  </span>
                  <p className="text-[11px] text-amber-700 dark:text-amber-400">
                    {w.missedCount}টি প্রশ্নের উত্তর ভুল হয়েছিল
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('quiz')}
                  className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm"
                >
                  <span>পুনরায় প্র্যাকটিস কুইজ দিন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quiz History Table / Cards */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              কুইজের ইতিহাস ও বিস্তারিত ফলাফল
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              কখন কোন বিষয়ে পরীক্ষা দিয়েছেন তার সংরক্ষিত বিবরণ
            </p>
          </div>

          {totalQuizzes > 0 && (
            <button
              onClick={onClearHistory}
              className="text-xs text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ইতিহাস মুছুন</span>
            </button>
          )}
        </div>

        {totalQuizzes > 0 ? (
          <div className="space-y-3">
            {quizHistory.map((q) => (
              <div
                key={q.id}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                      {q.subject}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {q.date}
                    </span>
                  </div>
                  <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                    {q.title}
                  </h5>
                  <p className="text-xs text-slate-500">
                    শ্রেণি: {q.studentClass} • টপিক: {q.topic}
                  </p>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-auto">
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">প্রাপ্ত নম্বর</span>
                    <span className="text-base font-extrabold text-slate-900 dark:text-white">
                      {q.score} / {q.total}
                    </span>
                  </div>

                  <div
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold ${
                      q.percentage >= 80
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : q.percentage >= 50
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                    }`}
                  >
                    {q.percentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-slate-400 border border-dashed border-slate-200 dark:border-slate-700 rounded-xl space-y-2">
            <Award className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
              এখনো কোনো কুইজের রেকর্ড পাওয়া যায়নি
            </p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              কুইজ জেনারেটরে গিয়ে একটি পরীক্ষা দিন। আপনার ফলাফল স্বয়ংক্রিয়ভাবে এখানে সংরক্ষিত হবে।
            </p>
            <button
              onClick={() => onNavigate('quiz')}
              className="mt-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all inline-flex items-center gap-1.5"
            >
              <span>কুইজ শুরু করুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Privacy & Storage Transparency Card */}
      <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-3 text-xs text-slate-600 dark:text-slate-400">
        <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-800 dark:text-slate-200 block mb-0.5">
            তথ্য গোপনীয়তা ও সুরক্ষা গ্যারান্টি (Privacy & Local Storage):
          </span>
          আপনার কুইজ ফলাফল ও শিখন রেকর্ড আপনার ডিভাইসের ব্রাউজার লোকাল স্টোরেজে নিরাপদে সংরক্ষিত থাকে।
          কোনো অপ্রয়োজনীয় ব্যক্তিগত তথ্য সংগ্রহ বা সার্ভারে শেয়ার করা হয় না।
        </div>
      </div>
    </div>
  );
};
