/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, StudentClass, QuizResultRecord } from './types';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { DashboardPage } from './pages/DashboardPage';
import { TutorPage } from './pages/TutorPage';
import { GrammarLabPage } from './pages/GrammarLabPage';
import { BiologyLabPage } from './pages/BiologyLabPage';
import { ScienceLabPage } from './pages/ScienceLabPage';
import { IctLabPage } from './pages/IctLabPage';
import { QuizGeneratorPage } from './pages/QuizGeneratorPage';
import { TeacherHubPage } from './pages/TeacherHubPage';
import { ProgressPage } from './pages/ProgressPage';
import { AboutPage } from './pages/AboutPage';
import { BookOpen, Sparkles, Heart } from 'lucide-react';

const STORAGE_KEYS = {
  CLASS: 'smart_samad_class',
  LANG: 'smart_samad_lang',
  DARK: 'smart_samad_dark',
  QUIZ_HISTORY: 'smart_samad_quiz_history',
  ACTIVITIES: 'smart_samad_activities',
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');

  const [selectedClass, setSelectedClass] = useState<StudentClass>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CLASS);
    return (saved as StudentClass) || 'Class 9';
  });

  const [language, setLanguage] = useState<'bn' | 'en'>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANG);
    return (saved as 'bn' | 'en') || 'bn';
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DARK);
    if (saved !== null) return saved === 'true';
    return false;
  });

  const [quizHistory, setQuizHistory] = useState<QuizResultRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUIZ_HISTORY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [recentActivities, setRecentActivities] = useState<
    { id: string; title: string; time: string; type: string }[]
  >(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Apply dark class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEYS.DARK, darkMode ? 'true' : 'false');
  }, [darkMode]);

  // Persist class and language
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CLASS, selectedClass);
  }, [selectedClass]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LANG, language);
  }, [language]);

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'bn' ? 'en' : 'bn'));
  };

  const handleNavigate = (page: PageId, extra?: { topic?: string }) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuizCompleted = (record: QuizResultRecord) => {
    const updatedHistory = [record, ...quizHistory];
    setQuizHistory(updatedHistory);
    localStorage.setItem(STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify(updatedHistory));

    const newActivity = {
      id: Date.now().toString(),
      title: `${record.subject}: ${record.topic} কুইজ (${record.score}/${record.total})`,
      time: 'এইমাত্র',
      type: 'কুইজ মূল্যায়ন',
    };
    const updatedActivities = [newActivity, ...recentActivities.slice(0, 9)];
    setRecentActivities(updatedActivities);
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(updatedActivities));
  };

  const handleClearAllHistory = () => {
    if (window.confirm('আপনি কি সকল কুইজ ও শিখন ইতিহাস মুছে ফেলতে চান?')) {
      setQuizHistory([]);
      setRecentActivities([]);
      localStorage.removeItem(STORAGE_KEYS.QUIZ_HISTORY);
      localStorage.removeItem(STORAGE_KEYS.ACTIVITIES);
    }
  };

  // Compute stats for Dashboard
  const averageScore =
    quizHistory.length > 0
      ? Math.round(
          quizHistory.reduce((acc, curr) => acc + curr.percentage, 0) / quizHistory.length
        )
      : 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Top Bar & Navigation */}
      <div>
        <Header
          currentPage={currentPage}
          onNavigate={handleNavigate}
          selectedClass={selectedClass}
          onSelectClass={setSelectedClass}
          language={language}
          onToggleLanguage={handleToggleLanguage}
          darkMode={darkMode}
          onToggleDarkMode={handleToggleDarkMode}
        />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24">
          {currentPage === 'dashboard' && (
            <DashboardPage
              onNavigate={handleNavigate}
              selectedClass={selectedClass}
              onSelectClass={setSelectedClass}
              language={language}
              progressData={{
                totalQuizzes: quizHistory.length,
                averageScore,
                recentActivities,
              }}
            />
          )}

          {currentPage === 'tutor' && (
            <TutorPage selectedClass={selectedClass} language={language} />
          )}

          {currentPage === 'grammar' && (
            <GrammarLabPage
              selectedClass={selectedClass}
              language={language}
              onRecordProgress={(topic, score, total) => {
                const act = {
                  id: Date.now().toString(),
                  title: `Grammar Drill: ${topic}`,
                  time: 'এইমাত্র',
                  type: 'গ্রামার অনুশীলন',
                };
                const updated = [act, ...recentActivities.slice(0, 9)];
                setRecentActivities(updated);
                localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(updated));
              }}
            />
          )}

          {currentPage === 'biology' && (
            <BiologyLabPage selectedClass={selectedClass} language={language} />
          )}

          {currentPage === 'science' && (
            <ScienceLabPage
              selectedClass={selectedClass}
              language={language}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'ict' && (
            <IctLabPage
              selectedClass={selectedClass}
              language={language}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'quiz' && (
            <QuizGeneratorPage
              selectedClass={selectedClass}
              language={language}
              onQuizCompleted={handleQuizCompleted}
            />
          )}

          {currentPage === 'teacher' && (
            <TeacherHubPage selectedClass={selectedClass} language={language} />
          )}

          {currentPage === 'progress' && (
            <ProgressPage
              quizHistory={quizHistory}
              onClearHistory={handleClearAllHistory}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'about' && (
            <AboutPage
              selectedClass={selectedClass}
              onSelectClass={setSelectedClass}
              language={language}
              onToggleLanguage={handleToggleLanguage}
              darkMode={darkMode}
              onToggleDarkMode={handleToggleDarkMode}
              onClearAllData={handleClearAllHistory}
            />
          )}
        </main>
      </div>

      {/* Desktop/Tablet Footer */}
      <footer className="hidden sm:block border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md py-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
              S
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              Smart Learning with Samad Sir
            </span>
            <span>• Learn Smart. Think Deeply. Succeed Together.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavigate('dashboard')}
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              হোম
            </button>
            <button
              onClick={() => handleNavigate('tutor')}
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              এআই টিউটর
            </button>
            <button
              onClick={() => handleNavigate('grammar')}
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              ইংরেজি গ্রামার
            </button>
            <button
              onClick={() => handleNavigate('biology')}
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              জীববিজ্ঞান ল্যাব
            </button>
            <button
              onClick={() => handleNavigate('teacher')}
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              শিক্ষক সহায়িকা
            </button>
            <button
              onClick={() => handleNavigate('about')}
              className="hover:text-blue-600 dark:hover:text-blue-400 font-semibold"
            >
              সম্পর্কে ও নীতি
            </button>
          </div>
        </div>
      </footer>

      {/* Touch-Friendly Mobile Bottom Navigation */}
      <BottomNav
        currentPage={currentPage}
        onNavigate={handleNavigate}
        language={language}
      />
    </div>
  );
}
