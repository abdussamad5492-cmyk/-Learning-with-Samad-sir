import React, { useState } from 'react';
import { PageId, StudentClass } from '../../types';
import {
  BookOpen,
  Sparkles,
  Lightbulb,
  GraduationCap,
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  Dna,
  CheckCircle,
  FileText,
  UserCheck,
  TrendingUp,
  Cpu,
  Atom,
} from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  selectedClass: StudentClass;
  onSelectClass: (cls: StudentClass) => void;
  language: 'bn' | 'en';
  onToggleLanguage: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  selectedClass,
  onSelectClass,
  language,
  onToggleLanguage,
  darkMode,
  onToggleDarkMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const classesList: StudentClass[] = [
    'Class 6',
    'Class 7',
    'Class 8',
    'Class 9',
    'Class 10',
  ];

  const navItems: { id: PageId; labelBn: string; labelEn: string; icon: any }[] = [
    { id: 'dashboard', labelBn: 'হোম ড্যাশবোর্ড', labelEn: 'Home', icon: GraduationCap },
    { id: 'tutor', labelBn: 'এআই টিউটর', labelEn: 'AI Tutor', icon: Sparkles },
    { id: 'grammar', labelBn: 'ইংরেজি গ্রামার', labelEn: 'English Lab', icon: BookOpen },
    { id: 'biology', labelBn: 'জীববিজ্ঞান ল্যাব', labelEn: 'Biology Lab', icon: Dna },
    { id: 'science', labelBn: 'সাধারণ বিজ্ঞান', labelEn: 'Science', icon: Atom },
    { id: 'ict', labelBn: 'আইসিটি ল্যাব', labelEn: 'ICT Lab', icon: Cpu },
    { id: 'quiz', labelBn: 'কুইজ জেনারেটর', labelEn: 'Quiz Lab', icon: CheckCircle },
    { id: 'teacher', labelBn: 'শিক্ষক সহায়িকা', labelEn: 'Teacher Hub', icon: FileText },
    { id: 'progress', labelBn: 'আমার অগ্রগতি', labelEn: 'Progress', icon: TrendingUp },
  ];

  const handleNav = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand Identity */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNav('dashboard')}
          >
            {/* Custom Brand Icon: Open Book + Lightbulb + AI Spark */}
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
              <div className="absolute -top-1 -right-1 bg-amber-400 text-slate-900 rounded-full p-0.5 shadow">
                <Lightbulb className="w-3 h-3" />
              </div>
              <div className="absolute -bottom-1 -left-1 bg-teal-400 text-slate-900 rounded-full p-0.5 shadow">
                <Sparkles className="w-2.5 h-2.5" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                  Smart Learning
                </h1>
                <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
                  with Samad Sir
                </span>
              </div>
              <p className="hidden sm:block text-[11px] font-medium text-slate-500 dark:text-slate-400">
                Learn Smart. Think Deeply. Succeed Together.
              </p>
            </div>
          </div>

          {/* Desktop Class Selector & Controls */}
          <div className="hidden md:flex items-center gap-4">
            {/* Class Pill selector */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-semibold px-2 text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5" />
                শ্রেণি:
              </span>
              {classesList.map((cls) => (
                <button
                  key={cls}
                  onClick={() => onSelectClass(cls)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    selectedClass === cls
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {cls.replace('Class ', '')}ম
                </button>
              ))}
            </div>

            {/* Language switch */}
            <button
              onClick={onToggleLanguage}
              className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-500 transition-colors shadow-sm"
              title="ভাষা পরিবর্তন (Bangla / English)"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{language === 'bn' ? 'বাংলা' : 'English'}</span>
            </button>

            {/* Dark mode switch */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors shadow-sm"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile Right Controls: Class drop, theme, hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <select
              value={selectedClass}
              onChange={(e) => onSelectClass(e.target.value as StudentClass)}
              className="text-xs font-bold py-1 px-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 focus:outline-none"
            >
              {classesList.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>

            <button
              onClick={onToggleLanguage}
              className="text-xs font-bold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              {language === 'bn' ? 'বাং' : 'EN'}
            </button>

            <button
              onClick={onToggleDarkMode}
              className="p-1.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Main Navigation Bar */}
        <nav className="hidden md:flex items-center gap-1 py-2 border-t border-slate-100 dark:border-slate-800/60 overflow-x-auto scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                <span>{language === 'bn' ? item.labelBn : item.labelEn}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-1 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="p-2 mb-2 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-100 dark:border-blue-900/40">
            <p className="text-xs font-bold text-blue-900 dark:text-blue-200">
              Smart Learning with Samad Sir
            </p>
            <p className="text-[11px] text-blue-700 dark:text-blue-300">
              মাধ্যমিক শ্রেণি ৬ষ্ঠ-১০ম শ্রেণির সহজ ডিজিটাল শিক্ষা
            </p>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                <span>{language === 'bn' ? item.labelBn : item.labelEn}</span>
              </button>
            );
          })}

          <div className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500">
            <span>নির্বাচিত শ্রেণি: <strong>{selectedClass}</strong></span>
            <button
              onClick={() => handleNav('about')}
              className="text-blue-600 dark:text-blue-400 font-semibold underline"
            >
              সম্পর্কে ও নির্দেশিকা
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
