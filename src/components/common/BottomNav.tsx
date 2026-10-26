import React from 'react';
import { PageId } from '../../types';
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  Dna,
  CheckCircle,
  TrendingUp,
  FileText,
} from 'lucide-react';

interface BottomNavProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  language: 'bn' | 'en';
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentPage, onNavigate, language }) => {
  const items: { id: PageId; labelBn: string; labelEn: string; icon: any }[] = [
    { id: 'dashboard', labelBn: 'হোম', labelEn: 'Home', icon: GraduationCap },
    { id: 'tutor', labelBn: 'টিউটর', labelEn: 'Tutor', icon: Sparkles },
    { id: 'grammar', labelBn: 'গ্রামার', labelEn: 'Grammar', icon: BookOpen },
    { id: 'biology', labelBn: 'বায়োলজি', labelEn: 'Biology', icon: Dna },
    { id: 'quiz', labelBn: 'কুইজ', labelEn: 'Quiz', icon: CheckCircle },
    { id: 'progress', labelBn: 'অগ্রগতি', labelEn: 'Progress', icon: TrendingUp },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 shadow-lg safe-bottom">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400 font-bold scale-105'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div
                className={`p-1 rounded-lg ${
                  isActive ? 'bg-blue-100 dark:bg-blue-900/50' : ''
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5 leading-none">
                {language === 'bn' ? item.labelBn : item.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
