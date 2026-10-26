import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '5mb' }));

// Initialize GoogleGenAI SDK safely
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// Health and Config status check
app.get('/api/health', (req: Request, res: Response) => {
  const hasApiKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY');
  res.json({
    status: 'ok',
    appName: 'Smart Learning with Samad Sir',
    version: '1.0.0',
    hasApiKey,
    targetAudience: 'Classes 6-10 Bangladesh National Curriculum (English, Biology, Science, ICT)',
  });
});

// Endpoint: AI Tutor
app.post('/api/gemini/tutor', async (req: Request, res: Response) => {
  try {
    const {
      query,
      studentClass = 'Class 9',
      subject = 'English',
      topic = 'General',
      mode = 'simple',
      language = 'bilingual',
      conversationHistory = [],
    } = req.body;

    if (!query || typeof query !== 'string') {
      res.status(400).json({ error: 'A question or topic is required.' });
      return;
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Provide an educational offline response when API key is not yet set
      const offlineAnswer = generateOfflineTutorAnswer(query, studentClass, subject, topic, language);
      res.json({
        text: offlineAnswer,
        source: 'curated_offline',
        note: 'Using curated educational content. Add GEMINI_API_KEY in Secrets for live AI responses.',
      });
      return;
    }

    const systemInstruction = `You are "Samad Sir" (আব্দুস সামাদ স্যার), an experienced, caring, and encouraging secondary school teacher in Bangladesh.
You specialize in English, Biology, General Science, and ICT for students in Classes 6, 7, 8, 9, and 10 following the Bangladeshi national secondary curriculum.

Your pedagogical approach:
1. Explain concepts warmly and clearly, using simple Bangla and easy English.
2. Bridge English and Bangla: provide English terms/sentences with accurate Bangla meaning (বাংলা অর্থ ও সহজ ব্যাখ্যা).
3. Connect concepts to everyday Bangladeshi life (e.g., cricket, monsoon, local rivers, daily kitchen biology, school examples).
4. Point out common student pitfalls and exam misconceptions (ছাত্র-ছাত্রীদের সাধারণ ভুল).
5. For English grammar: give exact rules, formula boxes, 3-4 distinct examples, and practical transformation steps.
6. For Biology & Science: maintain scientific accuracy with clear definitions and functional analogies.
7. Tone: Respectful, patient, motivating, like a beloved mentor who believes in the student's potential ("মনোযোগ দিয়ে লক্ষ্য করো", "চমৎকার প্রশ্ন!").
8. Disclaimer guideline: State general educational guidance. Do not fabricate specific NCTB textbook page numbers or claim to be an official examination board paper.

Response Mode requested: "${mode}" (e.g. simple, detailed, examples, revision_notes, quiz, bangla, english, bilingual).
Target Class: "${studentClass}".
Subject: "${subject}".
Topic: "${topic}".
Language style: "${language}".

Format your response cleanly with markdown headers, bold highlights, bullet points, and practical practice items.
Prefer this 7-part structure:
### 📌 বিষয়সংক্ষেপ ও পরিচিতি (Topic Overview)
### 💡 সহজ ভাষায় ব্যাখ্যা (Simple Explanation)
### 🔍 মূল সূত্র / গুরুত্বপূর্ণ তথ্য (Core Rules & Key Facts)
### 📝 বাস্তব উদাহরণ ও প্রয়োগ (Examples with Meaning)
### ⚠️ সাধারণ ভুল ও সতর্কতা (Common Mistakes to Avoid)
### ✍️ ছোট অনুশীলন (Quick 2-Minute Practice Drill)
### 🎯 এক নজরে সারসংক্ষেপ (Summary)`;

    const historyContext = conversationHistory
      .slice(-4)
      .map((m: { role: string; content: string }) => `${m.role === 'user' ? 'Student' : 'Samad Sir'}: ${m.content}`)
      .join('\n\n');

    const prompt = `${historyContext ? `Previous Discussion:\n${historyContext}\n\n` : ''}Student's Current Question (${studentClass}, ${subject}, Topic: ${topic}):
"${query}"

Mode: ${mode}
Language: ${language}
Please answer as Samad Sir following the instructions above.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({
      text: response.text || 'কোনো উত্তর পাওয়া যায়নি। দয়া করে আবার চেষ্টা করুন।',
      source: 'gemini-3.8-flash',
    });
  } catch (error: any) {
    console.error('Tutor API Error (Falling back to curated):', error);
    const { query = '', studentClass = 'Class 9', subject = 'English', topic = 'General', language = 'bilingual' } = req.body || {};
    const fallback = generateOfflineTutorAnswer(query, studentClass, subject, topic, language);
    res.json({
      text: fallback,
      source: 'curated_fallback',
      note: 'AI সার্ভারে সাময়িক চাপের কারণে সামাদ স্যারের নির্দেশিকা দেওয়া হয়েছে।',
    });
  }
});

// Endpoint: English Grammar Practice Generator
app.post('/api/gemini/grammar-practice', async (req: Request, res: Response) => {
  try {
    const { topic = 'Tense', studentClass = 'Class 9', difficulty = 'Medium', count = 5 } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      const fallback = getCuratedGrammarExercises(topic);
      res.json({ exercises: fallback, source: 'curated' });
      return;
    }

    const prompt = `You are Samad Sir creating English grammar exercises for Bangladeshi students in ${studentClass}.
Topic: ${topic}
Difficulty: ${difficulty}
Generate ${count} interactive exercises in JSON format.

Output MUST be a strict JSON array with this exact structure:
[
  {
    "id": 1,
    "instruction": "Short instruction in English and Bangla",
    "question": "The sentence or question to solve",
    "options": ["Option A", "Option B", "Option C", "Option D"], // or empty if fill-in or transformation
    "correctAnswer": "Exact correct answer",
    "explanation": "Clear explanation in simple Bangla explaining why this answer is correct and the grammar rule behind it."
  }
]
Do not wrap in markdown quotes if possible, output raw JSON only.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.5,
      },
    });

    const parsed = JSON.parse(response.text?.trim() || '[]');
    res.json({ exercises: parsed, source: 'gemini-3.8-flash' });
  } catch (error: any) {
    console.error('Grammar practice error:', error);
    const fallback = getCuratedGrammarExercises(req.body.topic || 'Tense');
    res.json({ exercises: fallback, source: 'curated_fallback' });
  }
});

// Endpoint: AI Quiz Generator
app.post('/api/gemini/quiz', async (req: Request, res: Response) => {
  try {
    const {
      studentClass = 'Class 9',
      subject = 'English',
      topic = 'General',
      numQuestions = 5,
      difficulty = 'Medium',
      questionType = 'MCQ',
      language = 'Bilingual',
    } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      const fallbackQuiz = getCuratedQuiz(subject, topic, studentClass);
      res.json({ questions: fallbackQuiz, source: 'curated' });
      return;
    }

    const prompt = `You are Samad Sir, preparing an interactive school quiz for Bangladeshi secondary school students.
Target Audience: ${studentClass}
Subject: ${subject}
Topic/Chapter: ${topic}
Number of questions: ${numQuestions}
Difficulty: ${difficulty}
Question Type: ${questionType} (e.g. MCQ, True/False, Fill in blanks, Short Answer)
Language preference: ${language}

Generate exactly ${numQuestions} high-quality questions for practice.
Guidelines:
1. Make questions pedagogically sound, matching the difficulty of ${studentClass}.
2. For MCQ, provide exactly 4 distinct and plausible options.
3. Provide the exact correctAnswer.
4. Provide a friendly explanation in Bangla (or bilingual) explaining why that answer is correct.
5. Clearly indicate that these are practice drill questions.

Output strictly as a JSON object:
{
  "title": "${subject} - ${topic} Practice Assessment (${studentClass})",
  "questions": [
    {
      "id": 1,
      "question": "Question text in ${language}",
      "type": "mcq", // or "true_false", "fill_blank"
      "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
      "correctAnswer": "A) ...",
      "explanation": "বাংলায় ব্যাখ্যা: ..."
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.6,
      },
    });

    const parsed = JSON.parse(response.text?.trim() || '{}');
    res.json({
      title: parsed.title || `${subject} Quiz`,
      questions: parsed.questions || [],
      source: 'gemini-3.8-flash',
    });
  } catch (error: any) {
    console.error('Quiz API error:', error);
    const fallbackQuiz = getCuratedQuiz(req.body.subject, req.body.topic, req.body.studentClass);
    res.json({
      title: `${req.body.subject || 'Learning'} Practice Quiz`,
      questions: fallbackQuiz,
      source: 'curated_fallback',
    });
  }
});

// Endpoint: Teacher Assistant (Lesson Planner & Teaching Materials)
app.post('/api/gemini/teacher-planner', async (req: Request, res: Response) => {
  try {
    const {
      studentClass = 'Class 8',
      subject = 'English',
      topic = 'Right Forms of Verbs',
      duration = '45 minutes',
      objectives = '',
      language = 'Bilingual',
      format = 'lesson_plan',
      difficulty = 'Standard',
    } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      const fallbackPlan = generateCuratedTeacherPlan(subject, topic, studentClass, format);
      res.json({
        content: fallbackPlan,
        source: 'curated',
      });
      return;
    }

    const systemInstruction = `You are an educational curriculum consultant and master teacher trainer in Bangladesh assisting secondary school teachers.
Generate professional, practical, and classroom-ready educational content tailored for Bangladeshi schools.
Never invent official examination board questions or claim NCTB endorsement; frame all materials as recommended classroom instructional resources.`;

    const prompt = `Generate a comprehensive ${format.replace('_', ' ')} for Bangladeshi secondary school teachers.
Class: ${studentClass}
Subject: ${subject}
Topic/Chapter: ${topic}
Class Duration: ${duration}
Specific Objectives: ${objectives || 'Standard curriculum mastery'}
Language: ${language}
Format requested: ${format} (options: lesson_plan, worksheet, mcq_assessment, creative_questions, classroom_activities, remedial_plan)

Format specifications if "lesson_plan":
1. Lesson Title & Basic Info (শ্রেণি, বিষয়, অধ্যায়, সময়: ${duration})
2. Learning Outcomes / শিখনফল (Students will be able to...)
3. Required Teaching Aids / শিক্ষা উপকরণ (Whiteboard, charts, flashcards, realia)
4. Introduction / Warm-up / পূর্বজ্ঞান যাচাই (5 minutes)
5. Presentation & Teaching-Learning Activities / উপস্থাপন ও পাঠ পরিচালনা (25 minutes)
   - Step 1: Concept Explanation by Teacher
   - Step 2: Guided Practice / Group work
   - Step 3: Independent Student Work
6. Assessment / মূল্যায়ন (7 minutes) - 3 quick checking questions
7. Homework / বাড়ির কাজ
8. Teacher Reflection / শিক্ষকের আত্মপ্রতিফলন

Format specifications if "creative_questions" (সৃজনশীল প্রশ্ন - CQ):
- Stimulus / উদ্দীপক
- ক (জ্ঞানমূলক - 1 mark)
- খ (অনুধাবনমূলক - 2 marks)
- গ (প্রয়োগমূলক - 3 marks)
- ঘ (উচ্চতর দক্ষতামূলক - 4 marks)
- Detailed answer key & evaluation criteria.

Format specifications if "worksheet":
- Student name, roll, section header
- Section A: Objective checking
- Section B: Application practice
- Section C: Challenge question
- Complete Teacher Answer Key at the end.

Please format with clean markdown, clear Bangla & English terminology, and ready-to-copy structure.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.6,
      },
    });

    res.json({
      content: response.text || 'কোনো পাঠ পরিকল্পনা প্রস্তুত করা সম্ভব হয়নি।',
      source: 'gemini-3.8-flash',
    });
  } catch (error: any) {
    console.error('Teacher planner error:', error);
    const fallbackPlan = generateCuratedTeacherPlan(
      req.body.subject || 'English',
      req.body.topic || 'General',
      req.body.studentClass || 'Class 9',
      req.body.format || 'lesson_plan'
    );
    res.json({
      content: fallbackPlan,
      source: 'curated_fallback',
    });
  }
});

// Curated Educational Fallback Helpers for robust offline & fast demo experiences
function generateOfflineTutorAnswer(
  query: string,
  studentClass: string,
  subject: string,
  topic: string,
  language: string
): string {
  return `### 📌 বিষয়সংক্ষেপ ও পরিচিতি: ${topic} (${studentClass} - ${subject})
**প্রশ্ন/বিষয়:** "${query}"

### 💡 সহজ ভাষায় ব্যাখ্যা (Simple Explanation)
এই বিষয়টি ভালোভাবে বুঝতে হলে আমাদের দৈনন্দিন জীবনের সাথে মিলিয়ে দেখতে হবে। প্রতিটি বিষয় যখন আমরা বাস্তব উদাহরণের সাথে শিখি, তখন পড়া অনেক সহজ এবং আনন্দদায়ক হয়ে ওঠে।

### 🔍 মূল সূত্র ও গুরুত্বপূর্ণ তথ্য (Core Rules & Facts)
1. **নিয়ম ১ (মৌলিক ভিত্তি):** মূল ধারণাটি আগে স্পষ্টভাবে মাথায় গেঁথে নিতে হবে।
2. **নিয়ম ২ (ধারাবাহিকতা):** প্রতিটি ধাপ আগের ধাপের সাথে সরাসরি সম্পর্কিত।
3. **নিয়ম ৩ (প্রয়োগ):** মুখস্থ করার চেয়ে নিজে নিজে বাক্য তৈরি বা চিত্র এঁকে বোঝা অনেক বেশি কার্যকর।

### 📝 বাস্তব উদাহরণ ও প্রয়োগ (Examples)
- **উদাহরণ ১:** যেমন আমরা প্রতিনিয়ত বাংলায় বলি এবং তার ইংরেজি রূপান্তরের সময় সঠিক Tense বা Verb ফর্ম মেনে চলি।
- **উদাহরণ ২:** জীববিজ্ঞান ও বিজ্ঞানের ক্ষেত্রে কোনো তন্ত্র (System) পড়ার সময় বিভিন্ন অঙ্গের পারস্পরিক সমন্বয় লক্ষ্য করা প্রয়োজন।

### ⚠️ সাধারণ ভুল ও সতর্কতা (Common Mistakes to Avoid)
- অনেক শিক্ষার্থী শুধু সংজ্ঞা মুখস্থ করে, কিন্তু প্রয়োগের সময় গুলিয়ে ফেলে।
- পরীক্ষার খাতায় উত্তর লেখার সময় প্রয়োজনীয় উদাহরণ বা সহজ রেখাচিত্র না দিলে পূর্ণ নম্বর পাওয়া কঠিন হয়।

### ✍️ ছোট অনুশীলন (Quick 2-Minute Practice Drill)
১. আজকের শেখা মূল নিয়মটি নিজের ভাষায় ১ বাক্যে খাতায় লিখুন।
২. এই বিষয়ের উপর একটি বাস্তব উদাহরণ তৈরি করে অনুশীলন করুন।

### 🎯 এক নজরে সারসংক্ষেপ (Summary)
নিয়মিত ১০ মিনিট অনুশীলনই আপনাকে যে কোনো বিষয়ে দক্ষ করে তুলবে। আপনার যেকোনো প্রশ্ন থাকলে দ্বিধাহীনভাবে জিজ্ঞাসা করুন!`;
}

function getCuratedGrammarExercises(topic: string) {
  return [
    {
      id: 1,
      instruction: 'Choose the correct form of verb (সঠিক Verb নির্বাচন করুন)',
      question: 'Neither the teacher nor the students ____ present in the seminar yesterday.',
      options: ['is', 'are', 'was', 'were'],
      correctAnswer: 'were',
      explanation: 'ব্যাখ্যা: "Neither... nor" যুক্ত বাক্যে verb নির্ধারিত হয় দ্বিতীয় Subject বা nor-এর পরের Subject অনুসারে। এখানে "the students" plural, এবং বাক্যটি গতকালের (yesterday) ঘটনা, তাই Past Plural verb "were" সঠিক।',
    },
    {
      id: 2,
      instruction: 'Transform into Passive Voice (বাচ্য পরিবর্তন করুন)',
      question: 'Who broke this beautiful vase?',
      options: [
        'By whom this beautiful vase was broken?',
        'By whom was this beautiful vase broken?',
        'Who was broken this beautiful vase by?',
        'By whom did this beautiful vase break?',
      ],
      correctAnswer: 'By whom was this beautiful vase broken?',
      explanation: 'ব্যাখ্যা: Interrogative বাক্যে "Who" থাকলে Passive করার সময় "By whom" দিয়ে শুরু হয়। এরপর auxiliary verb (was) + subject (this beautiful vase) + past participle (broken) বসে।',
    },
    {
      id: 3,
      instruction: 'Select the appropriate preposition (সঠিক Preposition বসান)',
      question: 'Rafid is senior ____ me by three years.',
      options: ['than', 'from', 'to', 'of'],
      correctAnswer: 'to',
      explanation: 'ব্যাখ্যা: Latin comparative adjectives যেমন senior, junior, superior, inferior, prior-এর পরে তুলনার ক্ষেত্রে "than" না বসে "to" ব্যবহৃত হয়।',
    },
    {
      id: 4,
      instruction: 'Tag Question (সঠিক Tag Question যুক্ত করুন)',
      question: 'Let us discuss the matter with Samad Sir, ____?',
      options: ["won't you", 'shall we', 'will you', "can't we"],
      correctAnswer: 'shall we',
      explanation: 'ব্যাখ্যা: "Let us" বা "Let\'s" দ্বারা প্রস্তাব (proposal/suggestion) বোঝালে Tag Question সবসময় "shall we?" হয়।',
    },
    {
      id: 5,
      instruction: 'Complete the sentence (বাক্যটি সম্পূর্ণ করুন)',
      question: 'Work hard lest you ____ fail in the examination.',
      options: ['should', 'will', 'might not', 'would'],
      correctAnswer: 'should',
      explanation: 'ব্যাখ্যা: "Lest" শব্দটির অর্থ "পাছে ভয় হয় যে" বা "নতুবা"। Lest যুক্ত clause-এ Subject-এর পর সাধারণত "should" (অথবা "might") বসে এবং Verb-এর base form হয়। এখানে কোনো negative শব্দ বসে না।',
    },
  ];
}

function getCuratedQuiz(subject: string, topic: string, studentClass: string) {
  if (subject.toLowerCase().includes('bio')) {
    return [
      {
        id: 1,
        question: 'উদ্ভিদকোষের কোন অঙ্গাণুটিকে "কোষের পাওয়ার হাউস" (Powerhouse of the Cell) বলা হয়?',
        type: 'mcq',
        options: ['রাইবোসোম', 'মাইটোকন্ড্রিয়া', 'গলগি বস্তু', 'লাইসোজোম'],
        correctAnswer: 'মাইটোকন্ড্রিয়া',
        explanation: 'মাইটোকন্ড্রিয়া শ্বসন প্রক্রিয়ায় শক্তি (ATP) উৎপন্ন ও সঞ্চয় করে, তাই একে কোষের শক্তিঘর বা পাওয়ার হাউস বলা হয়।',
      },
      {
        id: 2,
        question: 'মানুষের হৃৎপিণ্ড কয়টি প্রকোষ্ঠে বিভক্ত?',
        type: 'mcq',
        options: ['২টি', '৩টি', '৪টি', '৫টি'],
        correctAnswer: '৪টি',
        explanation: 'মানুষের হৃৎপিণ্ডে মোট ৪টি প্রকোষ্ঠ থাকে: ডান অলিন্দ, বাম অলিন্দ, ডান নিলয় এবং বাম নিলয়।',
      },
      {
        id: 3,
        question: 'সালোকসংশ্লেষণ প্রক্রিয়ায় উৎপন্ন প্রধান উপজাত (by-product) কোনটি?',
        type: 'mcq',
        options: ['কার্বন ডাই-অক্সাইড', 'অক্সিজেন', 'নাইট্রোজেন', 'মিথেন'],
        correctAnswer: 'অক্সিজেন',
        explanation: 'সালোকসংশ্লেষণ প্রক্রিয়ায় পানি বিশ্লেষিত হয়ে উপজাত হিসেবে অক্সিজেন (O₂) গ্যাস বায়ুমণ্ডলে নির্গত হয়।',
      },
      {
        id: 4,
        question: 'ডিএনএ (DNA) অণুতে অ্যাডেনিন (A)-এর সম্পূরক ক্ষারক কোনটি?',
        type: 'mcq',
        options: ['গুয়ানিন (G)', 'সাইটোসিন (C)', 'থাইমিন (T)', 'ইউরাসিল (U)'],
        correctAnswer: 'থাইমিন (T)',
        explanation: 'ডিএনএ-তে অ্যাডেনিন সবসময় দুটি হাইড্রোজেন বন্ধন দ্বারা থাইমিনের সাথে যুক্ত থাকে (A = T)। ইউরাসিল শুধুমাত্র আরএনএ-তে পাওয়া যায়।',
      },
      {
        id: 5,
        question: 'ফুসফুসের গঠনগত ও কার্যকরী ক্ষুদ্রতম একক কোনটি?',
        type: 'mcq',
        options: ['নেফ্রন', 'অ্যালভিওলাই (Alveoli)', 'নিউরন', 'ব্রঙ্কাস'],
        correctAnswer: 'অ্যালভিওলাই (Alveoli)',
        explanation: 'ফুসফুসে গ্যাসীয় আদান-প্রদান (অক্সিজেন ও কার্বন ডাই-অক্সাইড) অ্যালভিওলাই নামক ক্ষুদ্র বায়ুকুঠুরিতে ঘটে। নেফ্রন হলো বৃক্কের একক।',
      },
    ];
  }

  // Default English / General
  return [
    {
      id: 1,
      question: 'Which of the following is an example of an Abstract Noun?',
      type: 'mcq',
      options: ['Book', 'Honesty', 'Dhaka', 'Teacher'],
      correctAnswer: 'Honesty',
      explanation: 'Honesty (সততা) কোনো গুণ বা অবস্থার নাম যা ইন্দ্রিয় দিয়ে ছোঁয়া যায় না, শুধু উপলব্ধি করা যায়। তাই এটি Abstract Noun.',
    },
    {
      id: 2,
      question: 'Select the sentence with the correct Right Form of Verb:',
      type: 'mcq',
      options: [
        'He has gone to school yesterday.',
        'He went to school yesterday.',
        'He was go to school yesterday.',
        'He is going to school yesterday.',
      ],
      correctAnswer: 'He went to school yesterday.',
      explanation: 'Yesterday, ago, last night প্রভৃতি অতীত নির্দেশক শব্দ থাকলে Past Indefinite Tense (Subject + V2) ব্যবহৃত হয়।',
    },
    {
      id: 3,
      question: 'What is the passive form of "He wrote a letter"?',
      type: 'mcq',
      options: [
        'A letter is written by him.',
        'A letter was written by him.',
        'A letter has been written by him.',
        'A letter had written by him.',
      ],
      correctAnswer: 'A letter was written by him.',
      explanation: 'Past Indefinite Tense-এর Passive রূপ: Object as Subject (A letter) + was/were (was) + V3 (written) + by + Subject as Object (him).',
    },
    {
      id: 4,
      question: 'Fill in the blank: "He is good ____ Mathematics."',
      type: 'mcq',
      options: ['in', 'at', 'with', 'on'],
      correctAnswer: 'at',
      explanation: 'কোনো বিষয়ে বা দক্ষতায় ভালো বোঝাতে appropriate preposition "good at" ব্যবহৃত হয়।',
    },
    {
      id: 5,
      question: 'Choose the correct Tag Question: "Everybody knows this, ____?"',
      type: 'mcq',
      options: ["doesn't he", "don't they", "isn't it", "do they"],
      correctAnswer: "don't they",
      explanation: 'Everybody, everyone, somebody থাকলে Tag Question-এ pronoun হিসেবে "they" বসে। They plural হওয়ায় verb "don\'t" হবে।',
    },
  ];
}

function generateCuratedTeacherPlan(subject: string, topic: string, studentClass: string, format: string): string {
  return `# 📘 শিক্ষক সহায়িকা: ${subject}
## শ্রেণি: ${studentClass} | বিষয়: ${subject} | অধ্যায়/টপিক: ${topic}
**সময়:** ৪৫ মিনিট | **শিক্ষক:** সামাদ স্যার নির্দেশিত পাঠ পরিকল্পনা

---

### ১. শিখনফল (Learning Outcomes)
পাঠ শেষে শিক্ষার্থীরা:
- ${topic}-এর মূল সংজ্ঞা ও প্রয়োজনীয় নিয়মাবলি স্পষ্টভাবে বলতে ও লিখতে পারবে।
- বাস্তব উদাহরণ শনাক্ত করতে এবং সঠিক প্রয়োগ করতে সক্ষম হবে।
- সাধারণ ভুলত্রুটি চিহ্নিত করে সঠিক রূপ দিতে পারবে।

---

### ২. প্রয়োজনীয় শিক্ষা উপকরণ (Teaching Materials)
- বোর্ড ও মার্কার
- ফ্লাশ কার্ড / রুল চার্ট
- শ্রেণির শিক্ষার্থীদের জন্য জোড়ায় কাজের অনুশীলন শিট

---

### ৩. পাঠ উপস্থাপন ও সময় বণ্টন (Time Allocation - 45 Mins)

#### ক. প্রাক-পাঠ ও মনোযোগ আকর্ষণ (৫ মিনিট)
- শুভেচ্ছা বিনিময় ও দৈনন্দিন জীবনের একটি চমকপ্রদ উদাহরণ বা প্রশ্ন দিয়ে পাঠের সূচনা।
- শিক্ষার্থীদের পূর্বজ্ঞান যাচাই ("তোমরা কি কেউ বলতে পারবে...?")।

#### খ. মূল পাঠ উপস্থাপন (১৫ মিনিট)
- বোর্ডে স্পষ্ট করে নিয়ম ও সূত্র লিখে দেওয়া।
- বাংলা ও ইংরেজি দ্বৈত ভাষায় সহজ ব্যাখ্যা প্রদান।
- ৩টি ভিন্নধর্মী উদাহরণ বোর্ডে লিখে শিক্ষার্থীদের সাথে নিয়ে বিশ্লেষণ করা।

#### গ. জোড়ায় ও দলগত কাজ (১৫ মিনিট)
- শিক্ষার্থীদের ৩-৪ জনের দলে ভাগ করে অনুশীলন শিটের সমস্যা সমাধান করতে দেওয়া।
- শিক্ষক পুরো শ্রেণিকক্ষে ঘুরে পিছিয়ে পড়া শিক্ষার্থীদের সহায়তা প্রদান করবেন।

#### ঘ. মূল্যায়ন ও ফিডব্যাক (৭ মিনিট)
- তাৎক্ষণিক ৩টি সংক্ষিপ্ত প্রশ্ন বা কুইজ দিয়ে শিক্ষার্থীদের শিখন যাচাই।
- ভুল উত্তরের ক্ষেত্রে সঠিক ব্যাখ্যার পুনরাবৃত্তি।

#### ঙ. বাড়ির কাজ ও সমাপ্তি (৩ মিনিট)
- পাঠ্যবই বা শিট থেকে ৫টি বাক্য রূপান্তর বা চিত্রভিত্তিক প্রশ্ন তৈরি করার নির্দেশনা।

---

### ৪. শিক্ষকের আত্মপ্রতিফলন (Teacher's Reflection)
- শিক্ষার্থীরা কি সক্রিয়ভাবে অংশগ্রহণ করেছে?
- কোন কোন ক্ষেত্রে অতিরিক্ত অনুশীলনের প্রয়োজন রয়েছে? পরবর্তী ক্লাসে তা রিভিশন দেওয়া হবে।`;
}

// Development Vite Middleware integration or Production static serving
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT} (Mode: ${isProd ? 'production' : 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
