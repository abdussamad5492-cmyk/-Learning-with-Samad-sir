export type StudentClass = 'Class 6' | 'Class 7' | 'Class 8' | 'Class 9' | 'Class 10';

export type SubjectId = 'english' | 'biology' | 'science' | 'ict';

export type LanguageMode = 'bn' | 'en' | 'bilingual';

export type PageId =
  | 'dashboard'
  | 'tutor'
  | 'grammar'
  | 'biology'
  | 'science'
  | 'ict'
  | 'quiz'
  | 'teacher'
  | 'progress'
  | 'about';

export interface SubjectInfo {
  id: SubjectId;
  nameBn: string;
  nameEn: string;
  tagline: string;
  icon: string;
  color: string;
  bgLight: string;
  borderLight: string;
  accent: string;
  topicsCount: number;
  classes: StudentClass[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  subject?: string;
  studentClass?: string;
  topic?: string;
  mode?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  type: 'mcq' | 'true_false' | 'fill_blank';
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface QuizResultRecord {
  id: string;
  title: string;
  subject: string;
  topic: string;
  studentClass: StudentClass;
  score: number;
  total: number;
  percentage: number;
  date: string;
  missedQuestions: {
    question: string;
    selected: string;
    correct: string;
    explanation: string;
  }[];
}

export interface GrammarExercise {
  id: number;
  instruction: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface GrammarTopic {
  id: string;
  titleEn: string;
  titleBn: string;
  classes: StudentClass[];
  summaryBn: string;
  rules: {
    ruleNo: number;
    title: string;
    explanationBn: string;
    formula?: string;
    examples: { en: string; bn: string }[];
    commonMistake?: { wrong: string; right: string; note: string };
  }[];
  exercises: GrammarExercise[];
}

export interface BiologyTopic {
  id: string;
  titleEn: string;
  titleBn: string;
  classes: StudentClass[];
  tagline: string;
  explanationBn: string;
  diagramId?: 'cell' | 'heart' | 'digestive' | 'respiratory' | 'dna' | 'photosynthesis';
  keyDefinitions: { termEn: string; termBn: string; defBn: string }[];
  analogies: { concept: string; analogyBn: string }[];
  flashcards: { front: string; back: string }[];
  examTipsBn: string[];
}

export interface ScienceTopic {
  id: string;
  titleEn: string;
  titleBn: string;
  classes: StudentClass[];
  explanationBn: string;
  keyPoints: string[];
  realLifeApplicationBn: string;
  flashcards: { front: string; back: string }[];
}

export interface IctTopic {
  id: string;
  titleEn: string;
  titleBn: string;
  classes: StudentClass[];
  explanationBn: string;
  keyPoints: string[];
  practicalTipsBn: string;
  flashcards: { front: string; back: string }[];
}
