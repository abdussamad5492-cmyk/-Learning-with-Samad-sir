import React, { useState, useRef, useEffect } from 'react';
import { StudentClass, ChatMessage } from '../types';
import {
  Sparkles,
  Send,
  RotateCcw,
  Copy,
  Check,
  Volume2,
  VolumeX,
  BookOpen,
  HelpCircle,
  GraduationCap,
  AlertCircle,
  Bookmark,
  Share2,
} from 'lucide-react';

interface TutorPageProps {
  selectedClass: StudentClass;
  language: 'bn' | 'en';
}

export const TutorPage: React.FC<TutorPageProps> = ({ selectedClass, language }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `### আসসালামু আলাইকুম ও শুভেচ্ছা! 🌟
আমি **আব্দুস সামাদ স্যার (Samad Sir)**। 
**${selectedClass}**-এর ইংরেজি ২য় পত্র, জীববিজ্ঞান, সাধারণ বিজ্ঞান বা আইসিটির যেকোনো জটিল অধ্যায় বা টপিক নিয়ে নির্দ্বিধায় প্রশ্ন করুন।

আমি আপনাকে সহজ বাংলায় ব্যাখ্যা, বাস্তব জীবনের উদাহরণ, সাধারণ ভুলত্রুটি এবং দ্রুত অনুশীলনের মাধ্যমে বুঝিয়ে দেব। নিচে থেকে কোনো প্রশ্ন নির্বাচন করতে পারেন অথবা টাইপ করে লিখে পাঠান!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('English');
  const [selectedTopic, setSelectedTopic] = useState('General');
  const [selectedMode, setSelectedMode] = useState('simple');
  const [selectedLang, setSelectedLang] = useState('bilingual');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Suggested quick questions
  const suggestedQuestions = [
    {
      subject: 'English',
      topic: 'Right Forms of Verbs',
      q: 'Present Perfect এবং Past Indefinite Tense-এর মধ্যে মূল পার্থক্য কী এবং কখন কোনটি ব্যবহার করব?',
    },
    {
      subject: 'Biology',
      topic: 'Cell Organelles',
      q: 'মাইটোকন্ড্রিয়াকে কেন কোষের পাওয়ার হাউস বলা হয়? সহজ উপমায় বুঝিয়ে বলুন।',
    },
    {
      subject: 'English',
      topic: 'Appropriate Prepositions',
      q: 'Preposition "good at", "abide by" এবং "senior to"-এর সঠিক ব্যবহার ও অর্থ কী?',
    },
    {
      subject: 'Science',
      topic: 'Force and Motion',
      q: 'নিউটনের ৩য় সূত্রটি নৌকার বৈঠা বা মাটিতে হাঁটার উদাহরণের মাধ্যমে বুঝিয়ে দিন।',
    },
    {
      subject: 'ICT',
      topic: 'Networks',
      q: 'রাউটার (Router) এবং সুইচের (Switch) মধ্যে পার্থক্য কী?',
    },
    {
      subject: 'Biology',
      topic: 'Genetics',
      q: 'ডিএনএ (DNA) ডাবল হেলিক্সে ক্ষারক জোড়া (A-T এবং G-C) কীভাবে কাজ করে?',
    },
  ];

  const responseModes = [
    { id: 'simple', labelBn: 'সহজ ব্যাখ্যা', labelEn: 'Explain simply' },
    { id: 'detailed', labelBn: 'বিস্তারিত ব্যাখ্যা', labelEn: 'In detail' },
    { id: 'examples', labelBn: 'বাস্তব উদাহরণ সহ', labelEn: 'With examples' },
    { id: 'revision_notes', labelBn: 'রিভিশন নোটস', labelEn: 'Revision notes' },
    { id: 'quiz', labelBn: 'অনুশীলন কুইজ', labelEn: 'Practice quiz' },
    { id: 'bangla', labelBn: 'শুধুমাত্র বাংলায়', labelEn: 'In Bangla' },
    { id: 'english', labelBn: 'In English', labelEn: 'In English' },
    { id: 'bilingual', labelBn: 'উভয় ভাষায় (দ্বৈত)', labelEn: 'Bilingual' },
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery.trim();
    if (!query || isLoading) return;

    setApiError(null);
    setInputQuery('');

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      subject: selectedSubject,
      studentClass: selectedClass,
      topic: selectedTopic,
      mode: selectedMode,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          studentClass: selectedClass,
          subject: selectedSubject,
          topic: selectedTopic,
          mode: selectedMode,
          language: selectedLang,
          conversationHistory: messages.slice(-4).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Tutor fetch error:', err);
      setApiError(
        'দুঃখিত, সার্ভারের সাথে সংযোগ করতে বিঘ্ন ঘটেছে। দয়া করে আপনার ইন্টারনেট চেক করুন এবং পুনরায় চেষ্টা করুন।'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('আপনার ব্রাউজারে স্পিচ সিন্থেসিস সমর্থিত নয়।');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Clean markdown hashes/asterisks before speaking
    const cleanText = text.replace(/[#*`_-]/g, ' ');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleResetChat = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: `### নতুন আলোচনা শুরু হয়েছে! 📝
আমি **সামাদ স্যার**। **${selectedClass}**-এর কোন বিষয়টি নিয়ে এখন জানতে চান? নির্দ্বিধায় আপনার প্রশ্ন লিখুন।`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 pb-20">
      {/* Header card with subject & mode filters */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-700/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Sparkles className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>এআই পার্সোনাল টিউটর (Samad Sir)</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold">
                  অনলাইন
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                শ্রেণি: <strong>{selectedClass}</strong> • বিষয়ভিত্তিক দ্বৈত ভাষার সহজ সমাধান
              </p>
            </div>
          </div>

          <button
            onClick={handleResetChat}
            className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 flex items-center gap-1.5 font-semibold transition-colors self-end sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>নতুন আলাপ</span>
          </button>
        </div>

        {/* Configuration Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div>
            <label className="block text-slate-500 dark:text-slate-400 font-semibold mb-1">
              বিষয় (Subject):
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full p-2 rounded-lg bg-slate-50 dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 font-medium focus:ring-1 focus:ring-blue-500"
            >
              <option value="English">ইংরেজি ২য় পত্র (English)</option>
              <option value="Biology">জীববিজ্ঞান (Biology)</option>
              <option value="General Science">সাধারণ বিজ্ঞান (Science)</option>
              <option value="ICT">আইসিটি (ICT)</option>
              <option value="General">সার্বিক পড়ালেখা ও টিপস</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-500 dark:text-slate-400 font-semibold mb-1">
              ব্যাখ্যার ধরন (Mode):
            </label>
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="w-full p-2 rounded-lg bg-slate-50 dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 font-medium focus:ring-1 focus:ring-blue-500"
            >
              {responseModes.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.labelBn}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-500 dark:text-slate-400 font-semibold mb-1">
              ভাষা (Language):
            </label>
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="w-full p-2 rounded-lg bg-slate-50 dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 font-medium focus:ring-1 focus:ring-blue-500"
            >
              <option value="bilingual">বাংলা ও ইংরেজি (Bilingual)</option>
              <option value="bangla">শুধুমাত্র বাংলায়</option>
              <option value="english">In English only</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-500 dark:text-slate-400 font-semibold mb-1">
              টপিক/অধ্যায় (Topic):
            </label>
            <input
              type="text"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              placeholder="e.g. Tense / Cell"
              className="w-full p-2 rounded-lg bg-slate-50 dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 font-medium focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Suggested Questions Carousel */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
          দ্রুত জিজ্ঞাস্য প্রশ্নসমূহ (Quick Sample Questions):
        </span>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {suggestedQuestions.map((sq, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedSubject(sq.subject);
                setSelectedTopic(sq.topic);
                handleSendMessage(sq.q);
              }}
              className="text-xs px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-slate-700/50 whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span>{sq.q.slice(0, 48)}...</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Box */}
      <div className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 min-h-[420px] max-h-[580px] overflow-y-auto space-y-5">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
            >
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 px-1">
                <span>{isUser ? 'আপনি (Student)' : 'সামাদ স্যার (Samad Sir)'}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>

              <div
                className={`max-w-[92%] sm:max-w-[85%] rounded-2xl p-4 sm:p-5 shadow-sm leading-relaxed ${
                  isUser
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700 rounded-tl-none font-bangla'
                }`}
              >
                {/* Render Markdown-like content nicely */}
                <div className="text-sm space-y-2 whitespace-pre-wrap leading-relaxed">
                  {msg.content}
                </div>

                {/* Assistant message action controls */}
                {!isUser && (
                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-500">
                    <span className="text-[11px] italic text-slate-400">
                      Smart Learning AI Education
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                        title="উত্তর কপি করুন"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        onClick={() => handleSpeak(msg.content)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                        title={isSpeaking ? 'থামান' : 'পড়ে শোনান'}
                      >
                        {isSpeaking ? (
                          <VolumeX className="w-3.5 h-3.5 text-red-500" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5 text-blue-500" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-2">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  সামাদ স্যার উত্তর প্রস্তুত করছেন...
                </p>
                <p className="text-[11px] text-slate-400">
                  সহজ বাংলা ব্যাখ্যা ও সঠিক উদাহরণ সাজানো হচ্ছে
                </p>
              </div>
            </div>
          </div>
        )}

        {apiError && (
          <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{apiError}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form with Touch-Friendly Send Button */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="bg-white dark:bg-slate-800 p-2 sm:p-3 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg flex items-center gap-2"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder={`প্রশ্ন লিখুন (যেমন: ${selectedSubject} এর কোনো সূত্র বা সমস্যা)...`}
          className="flex-1 px-3 sm:px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!inputQuery.trim() || isLoading}
          className="px-4 sm:px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-blue-500/20 active:scale-95 transition-all flex items-center gap-1.5 shrink-0"
        >
          <span>পাঠান</span>
          <Send className="w-4 h-4" />
        </button>
      </form>

      <p className="text-[11px] text-center text-slate-400">
        💡 টিপস: উত্তর বিস্তারিত বুঝতে প্রয়োজনে &apos;বাস্তব উদাহরণ দিন&apos; বা &apos;অনুশীলন কুইজ দিন&apos; নির্বাচন করুন।
      </p>
    </div>
  );
};
