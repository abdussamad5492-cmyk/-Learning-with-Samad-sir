import React, { useState } from 'react';
import { StudentClass } from '../types';
import {
  FileText,
  Sparkles,
  Copy,
  Check,
  Printer,
  Download,
  Edit3,
  BookOpen,
  Users,
  CheckSquare,
  HelpCircle,
  Clock,
  Layers,
  GraduationCap,
} from 'lucide-react';

interface TeacherHubProps {
  selectedClass: StudentClass;
  language: 'bn' | 'en';
}

export const TeacherHubPage: React.FC<TeacherHubProps> = ({ selectedClass, language }) => {
  const [subject, setSubject] = useState('English');
  const [topic, setTopic] = useState('Right Forms of Verbs');
  const [duration, setDuration] = useState('45 minutes');
  const [objectives, setObjectives] = useState('শিখনফল অর্জন ও বাস্তব প্রয়োগ');
  const [format, setFormat] = useState('lesson_plan');
  const [langPref, setLangPref] = useState('Bilingual');

  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  const formatOptions = [
    { id: 'lesson_plan', label: '১০-পয়েন্ট জাতীয় পাঠ পরিকল্পনা (Lesson Plan)', icon: FileText },
    { id: 'creative_questions', label: 'সৃজনশীল প্রশ্ন কাঠামো (CQ Assessment)', icon: BookOpen },
    { id: 'worksheet', label: 'শ্রেণিকক্ষ ওয়ার্কশিট ও হ্যান্ডআউট (Worksheet)', icon: CheckSquare },
    { id: 'mcq_assessment', label: '১০টি MCQ ও সম্পূর্ণ উত্তরপত্র (Answer Key)', icon: CheckSquare },
    { id: 'classroom_activities', label: 'জোড়ায় ও দলগত ক্লাসরুম অ্যাক্টিভিটি', icon: Users },
    { id: 'remedial_plan', label: 'পিছিয়ে পড়া শিক্ষার্থীদের রেমিডিয়াল প্ল্যান', icon: Layers },
  ];

  const handleGenerate = async () => {
    setIsLoading(true);
    setIsEditing(false);

    try {
      const response = await fetch('/api/gemini/teacher-planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentClass: selectedClass,
          subject,
          topic,
          duration,
          objectives,
          language: langPref,
          format,
        }),
      });

      if (!response.ok) throw new Error('Failed to generate teacher material');

      const data = await response.json();
      setGeneratedContent(data.content);
    } catch (err) {
      console.error('Teacher planner API error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedContent) return;
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadTxt = () => {
    if (!generatedContent) return;
    const element = document.createElement('a');
    const file = new Blob([generatedContent], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedClass}_${subject}_${topic}_TeacherMaterial.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-800 to-purple-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-purple-600/30">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-xs font-semibold text-purple-200 mb-2">
          <GraduationCap className="w-3.5 h-3.5 text-purple-300" />
          <span>Teachers Toolkit & Curriculum Planner</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          শিক্ষক সহায়িকা (AI Teacher Assistant)
        </h2>
        <p className="text-sm text-purple-100 mt-1 max-w-2xl font-bangla">
          বাংলাদেশ জাতীয় শিক্ষাক্রম অনুযায়ী ১০-পয়েন্ট লেসন প্ল্যান, সৃজনশীল প্রশ্ন (CQ), ক্লাসরুম হ্যান্ডআউট ও মূল্যায়ন শিট প্রস্তুত করার এআই সহকারী।
        </p>
      </div>

      {/* Input Configuration Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-7 border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
        <div className="border-b border-slate-100 dark:border-slate-700 pb-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-600" />
            <span>পাঠ পরিকল্পনা ও শিক্ষা সামগ্রীর প্যারামিটার</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            শ্রেণি: <strong>{selectedClass}</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              বিষয় (Subject):
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 text-xs font-semibold text-slate-800 dark:text-slate-100"
            >
              <option value="English">ইংরেজি ২য় পত্র (English 2nd)</option>
              <option value="Biology">জীববিজ্ঞান (Biology)</option>
              <option value="General Science">সাধারণ বিজ্ঞান (Science)</option>
              <option value="ICT">আইসিটি (ICT)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              পাঠের বিষয়/অধ্যায় (Topic/Chapter):
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Right Forms of Verbs"
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 text-xs font-semibold text-slate-800 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              ক্লাসের সময়কাল (Duration):
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 text-xs font-semibold text-slate-800 dark:text-slate-100"
            >
              <option value="40 minutes">৪০ মিনিট (Standard period)</option>
              <option value="45 minutes">৪৫ মিনিট (Standard secondary)</option>
              <option value="60 minutes">৬০ মিনিট (Double/Lab period)</option>
            </select>
          </div>
        </div>

        {/* Output format selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            কাঙ্ক্ষিত ফরম্যাট নির্বাচন করুন (Desired Resource Format):
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {formatOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = format === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setFormat(opt.id)}
                  className={`p-3 rounded-xl border text-xs text-left transition-all flex items-center gap-2.5 ${
                    isSelected
                      ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-600 text-purple-900 dark:text-purple-200 font-bold ring-2 ring-purple-500/20'
                      : 'bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-purple-400'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-purple-600' : 'text-slate-400'}`} />
                  <span className="truncate">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Specific Objectives input */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            নির্দিষ্ট শিখন লক্ষ্য বা শিক্ষকের বিশেষ নির্দেশনা (ঐচ্ছিক):
          </label>
          <input
            type="text"
            value={objectives}
            onChange={(e) => setObjectives(e.target.value)}
            placeholder="e.g. পিছিয়ে পড়া শিক্ষার্থীদের জন্য সহজ উদাহরণ, দলগত কাজের সুযোগ"
            className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 text-xs text-slate-800 dark:text-slate-100"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading || !topic.trim()}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 text-white font-extrabold text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>শিক্ষক সামগ্রী প্রস্তুত হচ্ছে...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-purple-200" />
              <span>শিক্ষক সামগ্রী জেনারেট করুন (Generate Teaching Material)</span>
            </>
          )}
        </button>
      </div>

      {/* Generated Material Workspace */}
      {generatedContent && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-7 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-700">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50 px-2 py-0.5 rounded-full">
                প্রস্তুতকৃত শিক্ষাদান সামগ্রী
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                {topic} - {selectedClass} ({subject})
              </h4>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-semibold flex items-center gap-1.5 ${
                  isEditing
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditing ? 'প্রিভিউ দেখুন' : 'সম্পাদনা করুন'}</span>
              </button>

              <button
                onClick={handleCopy}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                title="কপি করুন"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>

              <button
                onClick={handleDownloadTxt}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                title="ডাউনলোড করুন"
              >
                <Download className="w-4 h-4" />
              </button>

              <button
                onClick={handlePrint}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                title="প্রিন্ট করুন"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Editable Textarea or Rendered Markdown */}
          {isEditing ? (
            <textarea
              value={generatedContent}
              onChange={(e) => setGeneratedContent(e.target.value)}
              rows={18}
              className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 leading-relaxed"
            />
          ) : (
            <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-xl border border-slate-200/80 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-bangla">
              {generatedContent}
            </div>
          )}

          <div className="text-[11px] text-slate-400 italic pt-2">
            নোট: শিক্ষক প্রয়োজনবোধে শ্রেণিকক্ষের বাস্তবতা এবং শিক্ষার্থীদের মেধার স্তর অনুযায়ী যেকোনো অংশ পরিবর্তন বা কাস্টমাইজ করে নিতে পারেন।
          </div>
        </div>
      )}
    </div>
  );
};
