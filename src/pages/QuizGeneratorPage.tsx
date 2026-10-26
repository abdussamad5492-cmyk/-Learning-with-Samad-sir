import React, { useState } from 'react';
import { StudentClass, QuizQuestion, QuizResultRecord } from '../types';
import {
  CheckCircle,
  HelpCircle,
  Sparkles,
  RotateCcw,
  Copy,
  Printer,
  ChevronRight,
  ChevronLeft,
  Award,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock,
  BookOpen,
} from 'lucide-react';

interface QuizGeneratorProps {
  selectedClass: StudentClass;
  language: 'bn' | 'en';
  onQuizCompleted: (record: QuizResultRecord) => void;
}

export const QuizGeneratorPage: React.FC<QuizGeneratorProps> = ({
  selectedClass,
  language,
  onQuizCompleted,
}) => {
  // Config state
  const [subject, setSubject] = useState('English');
  const [topic, setTopic] = useState('Right Forms of Verbs');
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState('Medium');
  const [questionType, setQuestionType] = useState('MCQ');
  const [langPref, setLangPref] = useState('Bilingual');

  // Quiz running state
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizActive, setQuizActive] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [userSelections, setUserSelections] = useState<Record<number, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'step' | 'list'>('step');
  const [copied, setCopied] = useState(false);

  // Error state
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleStartQuiz = async () => {
    setIsGenerating(true);
    setErrorMsg(null);
    setUserSelections({});
    setQuizSubmitted(false);
    setCurrentQuestionIndex(0);

    try {
      const response = await fetch('/api/gemini/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentClass: selectedClass,
          subject,
          topic,
          numQuestions,
          difficulty,
          questionType,
          language: langPref,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate quiz');
      }

      const data = await response.json();
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
        setQuizTitle(data.title || `${subject} - ${topic} Practice Quiz`);
        setQuizActive(true);
      } else {
        throw new Error('No questions returned');
      }
    } catch (err: any) {
      console.error('Quiz generation error:', err);
      setErrorMsg('কুইজ জেনারেট করতে সাময়িক সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectAnswer = (qId: number, answer: string) => {
    if (quizSubmitted) return;
    setUserSelections((prev) => ({ ...prev, [qId]: answer }));
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);

    // Calculate score
    let score = 0;
    const missed: QuizResultRecord['missedQuestions'] = [];

    questions.forEach((q) => {
      const chosen = userSelections[q.id] || 'Not answered';
      // Normalize comparison
      const isCorrect = chosen.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
      if (isCorrect) {
        score += 1;
      } else {
        missed.push({
          question: q.question,
          selected: chosen,
          correct: q.correctAnswer,
          explanation: q.explanation,
        });
      }
    });

    const total = questions.length;
    const percentage = Math.round((score / total) * 100);

    const record: QuizResultRecord = {
      id: Date.now().toString(),
      title: quizTitle,
      subject,
      topic,
      studentClass: selectedClass,
      score,
      total,
      percentage,
      date: new Date().toLocaleDateString('bn-BD', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      missedQuestions: missed,
    };

    onQuizCompleted(record);
  };

  const handleRetry = () => {
    setUserSelections({});
    setQuizSubmitted(false);
    setCurrentQuestionIndex(0);
  };

  const handleNewQuiz = () => {
    setQuizActive(false);
    setQuizSubmitted(false);
    setUserSelections({});
    setQuestions([]);
  };

  const handleCopyQuiz = () => {
    let quizText = `${quizTitle}\nশ্রেণি: ${selectedClass} | বিষয়: ${subject}\n\n`;
    questions.forEach((q, i) => {
      quizText += `প্রশ্ন ${i + 1}: ${q.question}\n`;
      if (q.options) {
        q.options.forEach((opt) => {
          quizText += `  ${opt}\n`;
        });
      }
      if (quizSubmitted) {
        quizText += `  সঠিক উত্তর: ${q.correctAnswer}\n  ব্যাখ্যা: ${q.explanation}\n`;
      }
      quizText += '\n';
    });

    navigator.clipboard.writeText(quizText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Score summary
  const score = Object.entries(userSelections).reduce((acc, [idStr, ans]) => {
    const q = questions.find((item) => item.id === Number(idStr));
    if (q && q.correctAnswer.trim().toLowerCase() === ans.trim().toLowerCase()) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-amber-500/30">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-xs font-semibold text-amber-100 mb-2">
          <CheckCircle className="w-3.5 h-3.5 text-amber-300" />
          <span>Interactive Assessment Engine</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          AI কুইজ ও স্বমূল্যায়ন (Quiz Generator)
        </h2>
        <p className="text-sm text-amber-100 mt-1 max-w-2xl font-bangla">
          যেকোনো বিষয়ের অধ্যায় নির্বাচন করে তাৎক্ষণিক কুইজ তৈরি করুন। প্রতিটি প্রশ্নের উত্তর বিস্তারিত ব্যাখ্যা সহ জেনে নিজের প্রস্তুতি যাচাই করুন।
        </p>
      </div>

      {!quizActive ? (
        /* Quiz Configuration Screen */
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              কুইজের বিষয় ও সেটিংস নির্ধারণ করুন
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              নির্বাচিত শ্রেণি: <strong>{selectedClass}</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                বিষয় (Subject):
              </label>
              <select
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  if (e.target.value === 'Biology') setTopic('Cell Organelles');
                  else if (e.target.value === 'English') setTopic('Right Forms of Verbs');
                  else if (e.target.value === 'General Science') setTopic('Force & Motion');
                  else if (e.target.value === 'ICT') setTopic('Networks');
                }}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 text-sm font-semibold text-slate-800 dark:text-slate-100"
              >
                <option value="English">ইংরেজি ২য় পত্র (English 2nd)</option>
                <option value="Biology">জীববিজ্ঞান (Biology)</option>
                <option value="General Science">সাধারণ বিজ্ঞান (Science)</option>
                <option value="ICT">আইসিটি (ICT)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                অধ্যায় বা টপিক (Chapter/Topic):
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Tense, Voice, Heart, Mitochondria"
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 text-sm font-semibold text-slate-800 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                প্রশ্নের সংখ্যা:
              </label>
              <div className="flex gap-2">
                {[5, 10, 15].map((cnt) => (
                  <button
                    key={cnt}
                    onClick={() => setNumQuestions(cnt)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                      numQuestions === cnt
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {cnt}টি প্রশ্ন
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                কঠিন্যের মাত্রা (Difficulty):
              </label>
              <div className="flex gap-2">
                {['Easy', 'Medium', 'Hard'].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                      difficulty === diff
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {diff === 'Easy' ? 'সহজ' : diff === 'Medium' ? 'মাঝারি' : 'কঠিন'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                প্রশ্নের ধরন (Question Type):
              </label>
              <select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 text-sm font-semibold text-slate-800 dark:text-slate-100"
              >
                <option value="MCQ">বহুনির্বাচনী (MCQ - 4 options)</option>
                <option value="True/False">সত্য / মিথ্যা (True/False)</option>
                <option value="Mixed">মিশ্র অনুশীলন (Mixed Drill)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                ভাষা (Language Style):
              </label>
              <select
                value={langPref}
                onChange={(e) => setLangPref(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 text-sm font-semibold text-slate-800 dark:text-slate-100"
              >
                <option value="Bilingual">বাংলা ও ইংরেজি উভয় (Bilingual)</option>
                <option value="Bangla">বাংলা (Bangla)</option>
                <option value="English">English</option>
              </select>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 p-3.5 rounded-xl text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>সতর্কতা:</strong> এগুলো স্বমূল্যায়নের জন্য এআই দ্বারা তৈরিকৃত অনুশীলন প্রশ্ন। এটি কোনো অফিসিয়াল বোর্ড পরীক্ষার প্রশ্ন নয়।
            </span>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            onClick={handleStartQuiz}
            disabled={isGenerating || !topic.trim()}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 disabled:opacity-50 text-white font-extrabold text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>এআই কুইজ তৈরি হচ্ছে...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>কুইজ শুরু করুন (Generate & Start Quiz)</span>
              </>
            )}
          </button>
        </div>
      ) : (
        /* Active Quiz Arena */
        <div className="space-y-6">
          {/* Top Control Bar */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                {subject} • {selectedClass}
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {quizTitle}
              </h3>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => setViewMode(viewMode === 'step' ? 'list' : 'step')}
                className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold"
              >
                {viewMode === 'step' ? 'তালিকা ভিউ (List)' : 'ধাপে ধাপে (1 by 1)'}
              </button>

              <button
                onClick={handleCopyQuiz}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                title="কুইজ কপি করুন"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>

              <button
                onClick={handlePrint}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                title="প্রিন্ট করুন"
              >
                <Printer className="w-4 h-4" />
              </button>

              <button
                onClick={handleNewQuiz}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-200"
              >
                নতুন কুইজ
              </button>
            </div>
          </div>

          {/* Result Card if Submitted */}
          {quizSubmitted && (
            <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-700/50 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-extrabold">
                    কুইজ সম্পন্ন হয়েছে!
                  </h4>
                  <p className="text-xs text-blue-200">
                    আপনার ফলাফল সফলভাবে ‘আমার অগ্রগতি’ ড্যাশবোর্ডে সংরক্ষিত হয়েছে।
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-white/10 p-3.5 rounded-xl text-center">
                  <span className="text-[11px] text-blue-200 block">মোট প্রশ্ন</span>
                  <span className="text-xl sm:text-2xl font-bold">{questions.length}</span>
                </div>
                <div className="bg-white/10 p-3.5 rounded-xl text-center">
                  <span className="text-[11px] text-blue-200 block">সঠিক উত্তর</span>
                  <span className="text-xl sm:text-2xl font-bold text-emerald-300">{score}</span>
                </div>
                <div className="bg-white/10 p-3.5 rounded-xl text-center">
                  <span className="text-[11px] text-blue-200 block">শতকরা হার</span>
                  <span className="text-xl sm:text-2xl font-bold text-amber-300">
                    {Math.round((score / questions.length) * 100)}%
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={handleRetry}
                  className="px-4 py-2 rounded-xl bg-white text-blue-950 font-bold text-xs hover:bg-blue-50 transition-all flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>পুনরায় কুইজ দিন (Retry)</span>
                </button>
              </div>
            </div>
          )}

          {/* Single Step View */}
          {viewMode === 'step' && !quizSubmitted && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-500 font-semibold">
                  <span>প্রশ্ন {currentQuestionIndex + 1} / {questions.length}</span>
                  <span>উত্তর দেওয়া হয়েছে: {Object.keys(userSelections).length}টি</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full transition-all duration-300"
                    style={{
                      width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Question */}
              {questions[currentQuestionIndex] && (
                <div className="space-y-4">
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                    {questions[currentQuestionIndex].question}
                  </h4>

                  {/* Options */}
                  <div className="space-y-2">
                    {questions[currentQuestionIndex].options?.map((opt, optIdx) => {
                      const isSelected =
                        userSelections[questions[currentQuestionIndex].id] === opt;
                      return (
                        <button
                          key={optIdx}
                          onClick={() =>
                            handleSelectAnswer(questions[currentQuestionIndex].id, opt)
                          }
                          className={`w-full p-3.5 rounded-xl border text-xs sm:text-sm text-left transition-all font-medium flex items-center justify-between ${
                            isSelected
                              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-900 dark:text-amber-200 font-bold ring-2 ring-amber-500/20'
                              : 'bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-amber-400'
                          }`}
                        >
                          <span>{opt}</span>
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'border-amber-600 bg-amber-600 text-white text-[10px]'
                                : 'border-slate-300 dark:border-slate-500'
                            }`}
                          >
                            {isSelected ? '✓' : ''}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                <button
                  onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentQuestionIndex === 0}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 disabled:opacity-30 flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>আগের প্রশ্ন</span>
                </button>

                {currentQuestionIndex < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1 shadow-sm"
                  >
                    <span>পরের প্রশ্ন</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitQuiz}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-95 transition-all"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>কুইজ সাবমিট করুন</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* List View / Post-submission Review Screen */}
          {(viewMode === 'list' || quizSubmitted) && (
            <div className="space-y-4">
              {questions.map((q, idx) => {
                const userAns = userSelections[q.id];
                const isCorrect = userAns?.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();

                return (
                  <div
                    key={q.id}
                    className={`bg-white dark:bg-slate-800 rounded-2xl p-5 border shadow-sm space-y-3 ${
                      quizSubmitted
                        ? isCorrect
                          ? 'border-emerald-300 dark:border-emerald-800'
                          : 'border-red-300 dark:border-red-800'
                        : 'border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          প্রশ্ন {idx + 1}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                          {q.question}
                        </h4>
                      </div>

                      {quizSubmitted && (
                        <div className="shrink-0">
                          {isCorrect ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              সঠিক
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options?.map((opt, optIdx) => {
                        const isSelected = userAns === opt;
                        const isThisCorrect = opt.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();

                        let optClass =
                          'bg-slate-50 dark:bg-slate-700/60 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200';

                        if (quizSubmitted) {
                          if (isThisCorrect) {
                            optClass =
                              'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold';
                          } else if (isSelected) {
                            optClass =
                              'bg-red-50 dark:bg-red-950/60 border-red-500 text-red-900 dark:text-red-200 font-bold';
                          }
                        } else if (isSelected) {
                          optClass =
                            'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-900 dark:text-amber-200 font-bold';
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={quizSubmitted}
                            onClick={() => handleSelectAnswer(q.id, opt)}
                            className={`p-3 rounded-xl border text-xs text-left transition-all ${optClass}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {/* Post-submission explanation */}
                    {quizSubmitted && (
                      <div className="bg-slate-50 dark:bg-slate-900/50 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                        <p className="font-bold text-slate-800 dark:text-slate-200">
                          সঠিক উত্তর: <span className="text-emerald-600 dark:text-emerald-400">{q.correctAnswer}</span>
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-bangla">
                          {q.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}

              {!quizSubmitted && (
                <div className="text-center pt-4">
                  <button
                    onClick={handleSubmitQuiz}
                    className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg shadow-emerald-500/25 active:scale-95 transition-all"
                  >
                    কুইজ সমাপ্ত ও মূল্যায়ন দেখুন
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
