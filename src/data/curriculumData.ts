import { GrammarTopic, BiologyTopic, ScienceTopic, IctTopic, SubjectInfo } from '../types';

export const SUBJECTS: SubjectInfo[] = [
  {
    id: 'english',
    nameBn: 'ইংরেজি ২য় পত্র',
    nameEn: 'English Grammar & Composition',
    tagline: 'সহজ নিয়মে ব্যাকরণ, ভোকাবুলারি ও নির্ভুল বাক্য গঠন',
    icon: 'BookOpen',
    color: 'from-blue-600 to-indigo-700',
    bgLight: 'bg-blue-50 text-blue-700',
    borderLight: 'border-blue-200',
    accent: 'blue',
    topicsCount: 12,
    classes: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
  },
  {
    id: 'biology',
    nameBn: 'জীববিজ্ঞান',
    nameEn: 'Biology & Life Science',
    tagline: 'কোষ, জিনতত্ত্ব, মানবদেহ ও পরিবেশের সচিত্র ব্যাখ্যা',
    icon: 'Dna',
    color: 'from-emerald-600 to-teal-700',
    bgLight: 'bg-emerald-50 text-emerald-700',
    borderLight: 'border-emerald-200',
    accent: 'emerald',
    topicsCount: 11,
    classes: ['Class 9', 'Class 10'],
  },
  {
    id: 'science',
    nameBn: 'সাধারণ বিজ্ঞান',
    nameEn: 'General Science',
    tagline: 'গতি, আলো, শক্তি, পরমাণু ও প্রকৃতির বৈজ্ঞানিক নিয়ম',
    icon: 'Atom',
    color: 'from-cyan-600 to-blue-700',
    bgLight: 'bg-cyan-50 text-cyan-700',
    borderLight: 'border-cyan-200',
    accent: 'cyan',
    topicsCount: 6,
    classes: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
  },
  {
    id: 'ict',
    nameBn: 'তথ্য ও যোগাযোগ প্রযুক্তি',
    nameEn: 'Information & Communication Technology',
    tagline: 'কম্পিউটার নেটওয়ার্ক, ইন্টারনেট নিরাপত্তা ও লজিক',
    icon: 'Cpu',
    color: 'from-violet-600 to-purple-700',
    bgLight: 'bg-violet-50 text-violet-700',
    borderLight: 'border-violet-200',
    accent: 'violet',
    topicsCount: 5,
    classes: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
  },
];

export const DAILY_TIPS = [
  {
    id: 1,
    category: 'English Tip',
    titleBn: 'Preposition-এর সহজ কৌশল',
    textBn: 'নির্দিষ্ট দিন বা তারিখের পূর্বে "on" (যেমন: on Friday, on 26th March), মাস বা বছরের পূর্বে "in" (যেমন: in 2026, in December) এবং সুনির্দিষ্ট সময়ের পূর্বে "at" (যেমন: at 9:00 AM) বসে।',
  },
  {
    id: 2,
    category: 'Biology Tip',
    titleBn: 'চিত্রের মাধ্যমে পুরো নম্বর পাওয়ার উপায়',
    textBn: 'জীববিজ্ঞানে যে কোনো সংজ্ঞার সাথে পেন্সিল দিয়ে পরিষ্কার চিহ্নিত চিত্র (Labelled Diagram) আঁকলে পূর্ণ নম্বর পাওয়া সহজ হয়। লেবেল সবসময় চিত্রের ডানপাশে সোজা রেখা টেনে করা ভালো।',
  },
  {
    id: 3,
    category: 'Study Habit',
    titleBn: 'পমোডোরো স্টাডি মেথড (২৫ + ৫ মিনিট)',
    textBn: 'একটানা ২ ঘণ্টা না পড়ে ২৫ মিনিট গভীর মনোযোগ দিয়ে পড়ুন, এরপর ৫ মিনিট বিশ্রাম নিন। এভাবে পড়লে মস্তিষ্কের ধারণক্ষমতা প্রায় তিনগুণ বৃদ্ধি পায়।',
  },
  {
    id: 4,
    category: 'ICT Tip',
    titleBn: 'সাইবার নিরাপত্তা ও পাসওয়ার্ড সুরক্ষায় করণীয়',
    textBn: 'নিজের নাম বা মোবাইল নম্বর কখনো পাসওয়ার্ড করবেন না। বড় হাতের অক্ষর, ছোট হাতের অক্ষর, সংখ্যা ও স্পেশাল ক্যারেক্টার (@, #, $) মিলিয়ে শক্তিশালী পাসওয়ার্ড তৈরি করুন।',
  },
  {
    id: 5,
    category: 'Science Tip',
    titleBn: 'নিউটনের ৩য় সূত্রের বাস্তব উপলব্ধি',
    textBn: 'আমরা যখন মাটিতে হাঁটি, আমাদের পা মাটির দিকে পেছনের দিকে বল প্রয়োগ করে (ক্রিয়া) এবং মাটি আমাদের সামনের দিকে এগিয়ে দেয় (প্রতিক্রিয়া)। প্রতিটি ক্রিয়ারই সমান ও বিপরীত প্রতিক্রিয়া আছে।',
  },
];

export const GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: 'right-forms-of-verbs',
    titleEn: 'Right Forms of Verbs',
    titleBn: 'ভার্ব এর সঠিক রূপ (Right Forms of Verbs)',
    classes: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
    summaryBn: 'Subject, Tense, Modals ও বিভিন্ন Condition অনুযায়ী Verb-এর সঠিক রূপ নির্ধারণের নির্ভুল নিয়ম।',
    rules: [
      {
        ruleNo: 1,
        title: 'Subject-Verb Agreement (Universal Rule)',
        explanationBn: 'Subject যদি 3rd person singular number হয় এবং বাক্যটি Present Indefinite Tense হয়, তবে Verb-এর শেষে s বা es যুক্ত হয়।',
        formula: 'Subject (3rd Person Singular) + Verb(s/es) + Object',
        examples: [
          { en: 'The boy reads the holy Quran every morning.', bn: 'ছেলেটি প্রতিদিন সকালে পবিত্র কুরআন পড়ে।' },
          { en: 'Water boils at 100 degrees Celsius.', bn: 'পানি ১০০ ডিগ্রি সেলসিয়াসে ফোটে।' },
        ],
        commonMistake: {
          wrong: 'He go to school daily.',
          right: 'He goes to school daily.',
          note: 'He হলো 3rd person singular, তাই go-এর সাথে es যুক্ত হয়ে goes হবে।',
        },
      },
      {
        ruleNo: 2,
        title: 'Modal Auxiliaries Rule',
        explanationBn: 'Can, could, may, might, shall, should, will, would, must, need, dare, ought to-এর পরে মূল Verb-এর সর্বদা Base Form (V1) বসে।',
        formula: 'Subject + Modal Auxiliary + V1 (Base Form)',
        examples: [
          { en: 'You must respect your parents and teachers.', bn: 'তোমাকে অবশ্যই তোমার পিতা-মাতা ও শিক্ষকদের শ্রদ্ধা করতে হবে।' },
          { en: 'We should study attentively.', bn: 'আমাদের মনোযোগ সহকারে পড়ালেখা করা উচিত।' },
        ],
        commonMistake: {
          wrong: 'He can speaks English fluently.',
          right: 'He can speak English fluently.',
          note: 'Modal verb "can"-এর পর মূল verb-এর সাথে s/es বা ing যুক্ত হয় না, সর্বদা base form বসে।',
        },
      },
      {
        ruleNo: 3,
        title: 'Preposition + Verb(ing) Rule',
        explanationBn: '"To" ব্যতীত অন্য যেকোনো Preposition (in, on, at, for, by, without, of, with) এর পর Verb আসলে তার সাথে ing যুক্ত হয়। তবে with a view to, look forward to, get used to-এর পর verb+ing হয়।',
        formula: 'Preposition (except normal to) + Verb + ing',
        examples: [
          { en: 'I look forward to meeting you soon.', bn: 'আমি শীঘ্রই তোমার সাথে দেখা করার অপেক্ষায় আছি।' },
          { en: 'He succeeded by working hard.', bn: 'সে কঠোর পরিশ্রম করে সফল হয়েছিল।' },
        ],
        commonMistake: {
          wrong: 'He came here with a view to meet me.',
          right: 'He came here with a view to meeting me.',
          note: '"with a view to" একটি বিশেষ phrase যার পরে verb+ing বসে।',
        },
      },
      {
        ruleNo: 4,
        title: 'It is high time / It is time Rule',
        explanationBn: 'It is time বা It is high time-এর পর যদি Subject আসে, তবে পরবর্তী Verb-টি Past Indefinite Form (V2)-এ রূপান্তর করতে হয়।',
        formula: 'It is high time + Subject + V2 (Past Form) + Extension',
        examples: [
          { en: 'It is high time we changed our bad habits.', bn: 'আমাদের খারাপ অভ্যাসগুলো পরিবর্তন করার উপযুক্ত সময় এখনই।' },
          { en: 'It is time we started preparing for the SSC exam.', bn: 'আমাদের এসএসসি পরীক্ষার প্রস্তুতি শুরু করার এখনই সময়।' },
        ],
        commonMistake: {
          wrong: 'It is high time we change our bad habits.',
          right: 'It is high time we changed our bad habits.',
          note: 'It is high time এর পর Subject থাকলে Verb-এর past form (changed) বসাতে হবে।',
        },
      },
    ],
    exercises: [
      {
        id: 1,
        instruction: 'Fill in the blank with the right form of verb:',
        question: 'One of the students ____ (be) awarded the first prize yesterday.',
        options: ['is', 'are', 'was', 'were'],
        correctAnswer: 'was',
        explanation: '"One of the + Plural Noun"-এর ক্ষেত্রে Verb সর্বদা Singular হয়। বাক্যটিতে yesterday থাকায় Past Tense-এর singular verb "was" সঠিক।',
      },
      {
        id: 2,
        instruction: 'Choose the correct form of the bracketed verb:',
        question: 'If you study diligently, you ____ (pass) the exam with GPA-5.',
        options: ['will pass', 'would pass', 'passed', 'had passed'],
        correctAnswer: 'will pass',
        explanation: '1st Conditional Rule: If + Present Indefinite হলে অপর অংশে Future Indefinite (Subject + will/can/may + V1) বসে।',
      },
      {
        id: 3,
        instruction: 'Correct the verb in the sentence:',
        question: 'He talked as if he ____ (know) everything.',
        options: ['knows', 'knew', 'has known', 'will know'],
        correctAnswer: 'knew',
        explanation: 'As if / As though-এর প্রথম অংশ Present Indefinite হলে পরের অংশে Past Indefinite (V2) বসে।',
      },
    ],
  },
  {
    id: 'voice-change',
    titleEn: 'Voice Change (Active to Passive)',
    titleBn: 'বাচ্য পরিবর্তন (Voice Change)',
    classes: ['Class 7', 'Class 8', 'Class 9', 'Class 10'],
    summaryBn: 'Active থেকে Passive Voice রূপান্তরের সহজ নিয়মাবলি, Tense পরিবর্তন ও বিশেষ ব্যতিক্রমসমূহ।',
    rules: [
      {
        ruleNo: 1,
        title: 'General 5-Step Formula',
        explanationBn: 'Active থেকে Passive করতে: ১. Object হবে Subject, ২. Tense অনুযায়ী Auxiliary Verb, ৩. মূল Verb-এর Past Participle (V3), ৪. সাধারণত "by" প্রিপজিশন, ৫. Subject হবে Object।',
        formula: 'Active Object as Sub + Aux Verb + V3 + by + Active Sub as Obj',
        examples: [
          { en: 'Active: Samad Sir teaches us English.', bn: 'Passive: We are taught English by Samad Sir.' },
          { en: 'Active: Bangladesh won the match.', bn: 'Passive: The match was won by Bangladesh.' },
        ],
        commonMistake: {
          wrong: 'Active: He wrote a letter. -> Passive: A letter wrote by him.',
          right: 'Passive: A letter was written by him.',
          note: 'Passive-এ সবসময় Tense অনুযায়ী Auxiliary Verb (was) ও V3 (written) লাগবেই।',
        },
      },
      {
        ruleNo: 2,
        title: 'Imperative Sentence Voice Change',
        explanationBn: 'আদেশ, নিষেধ বা অনুরোধমূলক বাক্যকে Passive করতে "Let" দিয়ে শুরু হয়।',
        formula: 'Let + Object + be + V3 (নেতিবাচক হলে: Let not + Obj + be + V3)',
        examples: [
          { en: 'Active: Do the work immediately.', bn: 'Passive: Let the work be done immediately.' },
          { en: 'Active: Do not close the window.', bn: 'Passive: Let not the window be closed.' },
        ],
        commonMistake: {
          wrong: 'Let the work done.',
          right: 'Let the work be done.',
          note: 'Let-এর পরে Object-এর সাথে "be" বসানো আবশ্যক।',
        },
      },
    ],
    exercises: [
      {
        id: 1,
        instruction: 'Convert into Passive Voice:',
        question: 'The students are playing football in the field.',
        options: [
          'Football is played by the students in the field.',
          'Football was being played by the students in the field.',
          'Football is being played by the students in the field.',
          'Football has been played by the students in the field.',
        ],
        correctAnswer: 'Football is being played by the students in the field.',
        explanation: 'Present Continuous Tense-এর Passive রূপ: Subject + am/is/are + being + V3 + by + Object। Football singular হওয়ায় "is being played" সঠিক।',
      },
      {
        id: 2,
        instruction: 'Convert into Passive Voice:',
        question: 'Open the door.',
        options: [
          'The door should opened.',
          'Let the door be opened.',
          'Let open the door.',
          'You are opened the door.',
        ],
        correctAnswer: 'Let the door be opened.',
        explanation: 'Imperative Sentence-এর নিয়ম: Let + Object (the door) + be + V3 (opened)।',
      },
    ],
  },
  {
    id: 'narration',
    titleEn: 'Direct to Indirect Speech (Narration)',
    titleBn: 'উক্তি পরিবর্তন (Narration)',
    classes: ['Class 8', 'Class 9', 'Class 10'],
    summaryBn: 'Reporting Verb, Tense Shift, Pronoun পরিবর্তন ও নৈকট্যসূচক শব্দের দূরত্বসূচক রূপান্তর।',
    rules: [
      {
        ruleNo: 1,
        title: 'Assertive Sentence Narration & Tense Shift',
        explanationBn: 'Reporting verb "said to" থাকলে Indirect-এ "told" হয় এবং কমা উঠে Conjunction "that" বসে। Present রূপ যথাক্রমে সংশ্লিষ্ট Past রূপে পরিবর্তিত হয়।',
        formula: 'Present Indefinite -> Past Indefinite | Present Continuous -> Past Continuous',
        examples: [
          { en: 'Direct: Rafiq said, "I am doing my homework."', bn: 'Indirect: Rafiq said that he was doing his homework.' },
          { en: 'Direct: Mother said to me, "I have cooked biryani."', bn: 'Indirect: Mother told me that she had cooked biryani.' },
        ],
        commonMistake: {
          wrong: 'Rafiq said that I was doing my homework.',
          right: 'Rafiq said that he was doing his homework.',
          note: 'Direct speech-এর 1st person pronoun (I/my) Reporting verb-এর Subject (Rafiq = he/his) অনুযায়ী পরিবর্তিত হয়।',
        },
      },
      {
        ruleNo: 2,
        title: 'Interrogative Sentence Narration',
        explanationBn: 'Reporting verb "said to"-এর স্থলে "asked" বসে। প্রশ্নটি Auxiliary দিয়ে শুরু হলে "if" বা "whether" বসে; আর WH-question থাকলে সেই WH-শব্দটিই বসে। ইনডাইরেক্ট বাক্যটি অবশ্যই Assertive হয়।',
        formula: 'Subject + asked + (if / WH-word) + Subject + Verb + Extension',
        examples: [
          { en: 'Direct: The teacher said to me, "Are you preparing well?"', bn: 'Indirect: The teacher asked me if I was preparing well.' },
          { en: 'Direct: He said to her, "Where do you live?"', bn: 'Indirect: He asked her where she lived.' },
        ],
      },
    ],
    exercises: [
      {
        id: 1,
        instruction: 'Change the speech into indirect:',
        question: 'He said to me, "Where are you going now?"',
        options: [
          'He told me where was I going then.',
          'He asked me where I was going then.',
          'He asked me that where I was going now.',
          'He asked me if I was going then.',
        ],
        correctAnswer: 'He asked me where I was going now.',
        explanation: 'Interrogative বাক্যে asked + WH-word (where) + Assertive order (I was going) + now পরিবর্তিত হয়ে then হয়।',
      },
    ],
  },
  {
    id: 'tag-questions',
    titleEn: 'Tag Questions',
    titleBn: 'ট্যাগ কোশ্চেন (Tag Questions)',
    classes: ['Class 8', 'Class 9', 'Class 10'],
    summaryBn: 'কথা বলার শেষে শ্রোতার সমর্থন যাচাইয়ের সংক্ষিপ্ত প্রশ্ন। Affirmative হলে Negative tag এবং Negative হলে Affirmative tag।',
    rules: [
      {
        ruleNo: 1,
        title: 'General Rule (Positive Statement -> Negative Tag)',
        explanationBn: 'মূল বাক্যটি যদি হ্যাঁ-বোধক (Affirmative) হয়, তবে Tag হবে না-বোধক (Negative ও সংক্ষিপ্ত রূপ)। Pronoun সবসময় Subject-এর ভিত্তিতে বসে।',
        formula: 'Statement (+) , Auxiliary verb + n\'t + Subject Pronoun ?',
        examples: [
          { en: 'The students are learning with Samad Sir, aren\'t they?', bn: 'শিক্ষার্থীরা সামাদ স্যারের সাথে শিখছে, তাই নয় কি?' },
          { en: 'Tanvir plays cricket very well, doesn\'t he?', bn: 'তানভীর খুব ভালো ক্রিকেট খেলে, তাই না?' },
        ],
      },
      {
        ruleNo: 2,
        title: 'Special Rules (I am, Let\'s, Everybody, Nobody)',
        explanationBn: '১. "I am" থাকলে Tag হয় "aren\'t I?" বা "ain\'t I?"। ২. "Let us / Let\'s" থাকলে Tag হবে "shall we?"। ৩. "Nobody / None" থাকলে Tag হবে হ্যাঁ-বোধক এবং pronoun হবে "they"।',
        formula: 'I am... -> aren\'t I? | Let\'s... -> shall we? | Nobody... -> do/did they?',
        examples: [
          { en: 'I am a diligent student, aren\'t I?', bn: 'আমি একজন পরিশ্রমী ছাত্র, তাই নয় কি?' },
          { en: 'Let\'s plant more trees in our school, shall we?', bn: 'চলো আমাদের বিদ্যালয়ে আরও গাছ লাগাই, কেমন?' },
          { en: 'Nobody phoned me, did they?', bn: 'কেউ আমাকে ফোন করেনি, করেছিল কি?' },
        ],
      },
    ],
    exercises: [
      {
        id: 1,
        instruction: 'Add the correct tag question:',
        question: 'There is little water in the pond, ____?',
        options: ["isn't there", 'is there', "aren't there", 'was there'],
        correctAnswer: 'is there',
        explanation: '"Little", "few", "hardly", "scarcely", "seldom" ইত্যাদি শব্দগুলো অর্থগতভাবে নেতিবাচক (Negative)। তাই এর Tag Question হ্যাঁ-বোধক (is there?) হবে।',
      },
    ],
  },
  {
    id: 'appropriate-prepositions',
    titleEn: 'Appropriate Prepositions',
    titleBn: 'এপ্রোপ্রিয়েট প্রিপজিশন (Appropriate Prepositions)',
    classes: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
    summaryBn: 'পরীক্ষায় সবচেয়ে বেশি আসা ১০০টি প্রয়োজনীয় উপযুক্ত প্রিপজিশন এবং অর্থসহ বাক্যে প্রয়োগ।',
    rules: [
      {
        ruleNo: 1,
        title: 'Frequent Prepositions for Board Exams',
        explanationBn: 'কিছু শব্দ সুনির্দিষ্ট Preposition গ্রহণ করে যা মুখস্থ ও বারবার অনুশীলনের মাধ্যমে আয়ত্ত করতে হয়।',
        formula: 'Adjective / Verb + Specific Preposition',
        examples: [
          { en: 'Abide by (মেনে চলা): We must abide by the rules of the school.', bn: 'আমাদের স্কুলের নিয়ম মেনে চলতে হবে।' },
          { en: 'Good at (দক্ষ): Fahim is exceptionally good at English grammar.', bn: 'ফাহিম ইংরেজি গ্রামারে অসাধারণ দক্ষ।' },
          { en: 'Accustomed to (অভ্যস্ত): He is accustomed to hard work.', bn: 'সে কঠোর পরিশ্রমে অভ্যস্ত।' },
          { en: 'Devoted to (উৎসর্গীকৃত): The teacher is devoted to his noble profession.', bn: 'শিক্ষক তার মহান পেশায় নিবেদিতপ্রাণ।' },
        ],
      },
    ],
    exercises: [
      {
        id: 1,
        instruction: 'Choose the appropriate preposition:',
        question: 'Smoking is injurious ____ health.',
        options: ['for', 'to', 'with', 'in'],
        correctAnswer: 'to',
        explanation: '"Injurious"-এর সাথে সবসময় "to" বসে। অর্থ: ক্ষতিকর। Injurious to health = স্বাস্থ্যের জন্য ক্ষতিকর।',
      },
    ],
  },
];

export const BIOLOGY_TOPICS: BiologyTopic[] = [
  {
    id: 'cell-organelles',
    titleEn: 'Cell & Cell Organelles',
    titleBn: 'কোষ ও কোষের অঙ্গাণুসমূহ',
    classes: ['Class 9', 'Class 10'],
    tagline: 'জীবদেহের গঠন ও কাজের একক - উদ্ভিদ ও প্রাণীকোষের তুলনামূলক সচিত্র আলোচনা',
    explanationBn: 'কোষ হলো সকল জীবদেহের গঠন ও কাজের মৌলিক একক। একটি আদর্শ উদ্ভিদকোষে কোষপ্রাচীর, প্লাস্টিড ও বড় কোষগহ্বর থাকে, যা প্রাণীকোষে সাধারণত অনুপস্থিত। কোষের যাবতীয় জৈবনিক কর্মকাণ্ড সাইটোপ্লাজমীয় অঙ্গাণুসমূহ দ্বারা পরিচালিত হয়।',
    diagramId: 'cell',
    keyDefinitions: [
      { termEn: 'Cell (কোষ)', termBn: 'কোষ', defBn: 'জীবদেহের গঠন ও কাজের একক যা অর্ধভেদ্য পর্দা দ্বারা আবৃত এবং অন্য কোনো সজীব মাধ্যম ছাড়াই আত্মপ্রজননে সক্ষম।' },
      { termEn: 'Mitochondria', termBn: 'মাইটোকন্ড্রিয়া', defBn: 'দ্বিস্তরবিশিষ্ট অঙ্গাণু যার ভেতরে শ্বসন প্রক্রিয়ায় শক্তি (ATP) উৎপন্ন হয়। একে কোষের শক্তিঘর বলা হয়।' },
      { termEn: 'Chloroplast', termBn: 'ক্লোরোপ্লাস্ট', defBn: 'সবুজ বর্ণের প্লাস্টিড যাতে ক্লোরোফিল থাকে এবং যা আলোকশক্তি শোষণ করে সালোকসংশ্লেষণ প্রক্রিয়ায় খাদ্য তৈরি করে।' },
      { termEn: 'Nucleus', termBn: 'নিউক্লিয়াস', defBn: 'কোষের প্রাণকেন্দ্র যা ক্রোমাটিন জালিকা বহন করে এবং কোষের সকল জৈব রাসায়নিক কার্যক্রম নিয়ন্ত্রণ করে।' },
    ],
    analogies: [
      { concept: 'Mitochondria (মাইটোকন্ড্রিয়া)', analogyBn: 'একটি শহরের বিদ্যুৎ উৎপাদন কেন্দ্রের (Power Plant) মতো, যা শহরের সকল কলকারখানায় বিদ্যুৎ সরবরাহ করে।' },
      { concept: 'Nucleus (নিউক্লিয়াস)', analogyBn: 'একটি বিদ্যালয়ের প্রধান শিক্ষকের কার্যালয় বা একটি কারখানার প্রধান নির্বাহী কর্মকর্তার মতো, যেখান থেকে সব নির্দেশনা আসে।' },
    ],
    flashcards: [
      { front: 'কোষের শক্তিঘর (Power House of Cell) কাকে বলা হয়?', back: 'মাইটোকন্ড্রিয়া (Mitochondria) - এটি খাদ্য জারণ করে ATP তৈরি করে।' },
      { front: 'উদ্ভিদ ও প্রাণীকোষের প্রধান পার্থক্য কোনটি?', back: 'উদ্ভিদকোষে সেলুলোজ নির্মিত জড় কোষপ্রাচীর ও প্লাস্টিড থাকে, যা প্রাণীকোষে থাকে না।' },
      { front: 'কোষের প্রোটিন কারখানা কোনটি?', back: 'রাইবোসোম (Ribosome) - এটি প্রোটিন সংশ্লেষণ করে।' },
    ],
    examTipsBn: [
      'উদ্ভিদকোষ ও প্রাণীকোষের অন্তত ৪টি তুলনামূলক পার্থক্য ছক আকারে লিখবেন।',
      'মাইটোকন্ড্রিয়ার চিত্র আঁকার সময় কৃষ্টি (Cristae) ও ম্যাট্রিক্স স্পষ্টভাবে চিহ্নিত করবেন।',
    ],
  },
  {
    id: 'circulatory-system',
    titleEn: 'Human Heart & Circulatory System',
    titleBn: 'রক্ত সংবহন তন্ত্র ও মানুষের হৃৎপিণ্ড',
    classes: ['Class 9', 'Class 10'],
    tagline: 'রক্তের গঠন, চার প্রকোষ্ঠের হৃৎপিণ্ড এবং দ্বৈত রক্ত সংবহন চক্র',
    explanationBn: 'মানুষের হৃৎপিণ্ড একটি চার প্রকোষ্ঠবিশিষ্ট পেশিবহুল পাম্প অঙ্গ। এটি ডান অলিন্দ ও ডান নিলয়ের মাধ্যমে কার্বন ডাই-অক্সাইডযুক্ত রক্ত ফুসফুসে পাঠায় এবং ফুসফুস থেকে অক্সিজেনযুক্ত রক্ত গ্রহণ করে বাম অলিন্দ ও বাম নিলয়ের মাধ্যমে মহাধমনী দিয়ে সারা দেহে ছড়িয়ে দেয়।',
    diagramId: 'heart',
    keyDefinitions: [
      { termEn: 'Heart (হৃৎপিণ্ড)', termBn: 'হৃৎপিণ্ড', defBn: 'বক্ষগহ্বরের মাঝখানে দুই ফুসফুসের মাঝে পেরিকার্ডিয়াম পর্দা দ্বারা আবৃত অনৈচ্ছিক পেশির পাম্প যন্ত্র।' },
      { termEn: 'Artery (ধমনী)', termBn: 'ধমনী', defBn: 'যেসব রক্তনালি সাধারণত অক্সিজেনসমৃদ্ধ রক্ত হৃৎপিণ্ড থেকে দেহের বিভিন্ন অংশে বহন করে (ব্যতিক্রম: পালমোনারি ধমনী)।' },
      { termEn: 'Vein (শিরা)', termBn: 'শিরা', defBn: 'যেসব রক্তনালি দেহের বিভিন্ন অংশ থেকে কার্বন ডাই-অক্সাইডযুক্ত রক্ত হৃৎপিণ্ডে ফিরিয়ে আনে (ব্যতিক্রম: পালমোনারি শিরা)।' },
      { termEn: 'Platelets (অনুচক্রিকা)', termBn: 'অনুচক্রিকা', defBn: 'রক্তের অনিয়মিত আকারের কোষীয় উপাদান যা রক্ত তঞ্চন বা রক্ত জমাট বাঁধতে সহায়তা করে।' },
    ],
    analogies: [
      { concept: 'হৃৎপিণ্ড ও রক্তনালি', analogyBn: 'একটি বাড়ির ওয়াটার মোটর এবং পানির পাইপলাইনের মতো, যা প্রতিটি রুমে পানি পৌঁছে দেয়।' },
    ],
    flashcards: [
      { front: 'মানুষের হৃৎপিণ্ডে কপাটিকাগুলোর (Valves) কাজ কী?', back: 'রক্তের একমুখী প্রবাহ বজায় রাখা, যেন রক্ত বিপরীত দিকে ফিরে যেতে না পারে।' },
      { front: 'লোহিত রক্তকণিকায় কোন রঞ্জক পদার্থ থাকে?', back: 'হিমোগ্লোবিন (Hemoglobin) - এটি অক্সিজেনের সাথে যুক্ত হয়ে অক্সিহিমোগ্লোবিন গঠন করে।' },
    ],
    examTipsBn: [
      'পালমোনারি ধমনী ও পালমোনারি শিরার ব্যতিক্রমী বৈশিষ্ট্য পরীক্ষায় প্রায়ই বহুনির্বাচনীতে আসে।',
      'অলিন্দদ্বয়ের সংকোচন (Systole) ও নিলয়ের প্রসারণ (Diastole) সময়কাল মনে রাখা দরকার।',
    ],
  },
  {
    id: 'respiratory-system',
    titleEn: 'Human Respiratory System & Alveoli',
    titleBn: 'শ্বসনতন্ত্র, ফুসফুস ও অ্যালভিওলাই',
    classes: ['Class 9', 'Class 10'],
    tagline: 'নাসারন্ধ্র থেকে ফুসফুসের ক্ষুদ্রাতিক্ষুদ্র অ্যালভিওলাইতে গ্যাস বিনিময়',
    explanationBn: 'শ্বসন প্রক্রিয়ার মাধ্যমে আমরা অক্সিজেন গ্রহণ করি এবং কোষীয় শ্বসনে উৎপন্ন বিষাক্ত কার্বন ডাই-অক্সাইড দেহ থেকে বের করে দিই। ফুসফুসের প্রধান কার্যকরী একক হলো অ্যালভিওলাই, যার চারপাশের কৈশিক জালিকার মাধ্যমে রক্তের সাথে সরাসরি গ্যাসীয় বিনিময় ঘটে।',
    diagramId: 'respiratory',
    keyDefinitions: [
      { termEn: 'Alveoli (অ্যালভিওলাই)', termBn: 'অ্যালভিওলাই', defBn: 'ফুসফুসে বিদ্যমান অতি ক্ষুদ্র বায়ুথলি যা স্কোয়ামাস এপিথেলিয়াম দ্বারা গঠিত এবং যেখানে রক্ত ও বায়ুর মধ্যে গ্যাস বিনিময় হয়।' },
      { termEn: 'Cellular Respiration', termBn: 'কোষীয় শ্বসন', defBn: 'যে জৈব রাসায়নিক প্রক্রিয়ায় কোষস্থ খাদ্য অক্সিজেনের উপস্থিতিতে বা অনুপস্থিতিতে জারিত হয়ে শক্তি উৎপন্ন করে।' },
    ],
    analogies: [
      { concept: 'ফুসফুস ও অ্যালভিওলাই', analogyBn: 'এক থোকা আঙুরের মতো, যার প্রতিটা ক্ষুদ্র আঙুর হলো এক একটি অ্যালভিওলাই যা পৃষ্ঠের ক্ষেত্রফল বহুগুণ বাড়িয়ে দেয়।' },
    ],
    flashcards: [
      { front: 'ফুসফুসের আবরণীর নাম কী?', back: 'প্লুরা (Pleura) - এর দুটি স্তর থাকে এবং মাঝে প্লুরাল রস থাকে।' },
      { front: 'অ্যালভিওলাইতে কোন প্রক্রিয়ায় গ্যাসীয় আদান-প্রদান ঘটে?', back: 'ব্যাপন প্রক্রিয়া (Diffusion Process) - উচ্চ চাপ থেকে নিম্ন চাপের দিকে।' },
    ],
    examTipsBn: [
      'শ্বসনতন্ত্রের ক্রমটি মনে রাখুন: নাসারন্ধ্র -> গলবিল -> স্বরযন্ত্র -> ট্রাকিয়া -> ব্রঙ্কাস -> ব্রঙ্কিওল -> অ্যালভিওলাই।',
    ],
  },
  {
    id: 'photosynthesis',
    titleEn: 'Photosynthesis (সালোকসংশ্লেষণ)',
    titleBn: 'সালোকসংশ্লেষণ ও খাদ্য উৎপাদন',
    classes: ['Class 9', 'Class 10'],
    tagline: 'সূর্যালোক, ক্লোরোফিল, পানি ও কার্বন ডাই-অক্সাইড দিয়ে শর্করা তৈরি',
    explanationBn: 'সবুজ উদ্ভিদ যে প্রক্রিয়ায় সূর্যালোকের উপস্থিতিতে পানি ও কার্বন ডাই-অক্সাইড ব্যবহার করে কার্বোহাইড্রেট বা শর্করা তৈরি করে এবং উপজাত হিসেবে অক্সিজেন নির্গত করে, তাকে সালোকসংশ্লেষণ বলে।',
    diagramId: 'photosynthesis',
    keyDefinitions: [
      { termEn: 'Photosynthesis Equation', termBn: 'সালোকসংশ্লেষণের সমীকরণ', defBn: '6CO₂ + 12H₂O + আলো/ক্লোরোফিল -> C₆H₁₂O₆ (গ্লুকোজ) + 6H₂O + 6O₂' },
      { termEn: 'Light Dependent Phase', termBn: 'আলোক নির্ভর পর্যায়', defBn: 'থাইলাকয়েডে সূর্যালোক দ্বারা পানি ভেঙে অক্সিজেন ও উচ্চশক্তিসম্পন্ন ATP ও NADPH₂ উৎপন্ন হওয়া।' },
    ],
    analogies: [
      { concept: 'সালোকসংশ্লেষণ', analogyBn: 'একটি সৌরবিদ্যুৎ চালিত রান্নাঘরের মতো, যেখানে মূল কাঁচামাল পানি ও বাতাস, চালক সূর্যালোক এবং উৎপাদিত খাবার গ্লুকোজ।' },
    ],
    flashcards: [
      { front: 'সালোকসংশ্লেষণে পানির ফটোলাইসিস কোথায় ঘটে?', back: 'ক্লোরোপ্লাস্টের থাইলাকয়েড মেমব্রেনে (আলোক নির্ভর পর্যায়ে)।' },
      { front: 'সালোকসংশ্লেষণের জন্য কোন কোন বর্ণালীর আলো সবচেয়ে কার্যকর?', back: 'লাল ও নীল আলোতে সালোকসংশ্লেষণের হার সবচেয়ে বেশি।' },
    ],
    examTipsBn: [
      'সমীকরণটি লেখার সময় অনুপাত এবং আলো ও ক্লোরোফিল তীরের উপরে-নিচে উল্লেখ করতে ভুলবেন না।',
    ],
  },
  {
    id: 'genetics-dna-rna',
    titleEn: 'Genetics, DNA & RNA',
    titleBn: 'জিনতত্ত্ব, ডিএনএ এবং আরএনএ',
    classes: ['Class 9', 'Class 10'],
    tagline: 'বংশগতির আণবিক ভিত্তি - ডাবল হেলিক্স ও ক্ষারক জোড়ার রহস্য',
    explanationBn: 'ডিএনএ (Deoxyribonucleic Acid) হলো সকল জীবদেহের বংশগতির প্রধান উপাদান যা পিতা-মাতার বৈশিষ্ট্য সন্তানে স্থানান্তর করে। ওয়াটসন ও ক্রিক ১৯৫৩ সালে ডিএনএ-এর দ্বি-সূত্রী প্যাঁচানো সিঁড়ির মতো (Double Helix) গঠন আবিষ্কার করেন।',
    diagramId: 'dna',
    keyDefinitions: [
      { termEn: 'DNA (ডিএনএ)', termBn: 'ডিঅক্সিরাইবোনিউক্লিক অ্যাসিড', defBn: 'দ্বিসূত্রক পলিনিউক্লিওটাইড শৃঙ্খল যা জিনগত তথ্য সংকেত আকারে ধারণ করে।' },
      { termEn: 'Gene (জিন)', termBn: 'জিন', defBn: 'ডিএনএ অণুর নির্দিষ্ট অংশ যা কোনো নির্দিষ্ট প্রোটিন বা শারীরিক বৈশিষ্ট্যের জন্য দায়ী।' },
      { termEn: 'Nitrogenous Bases', termBn: 'ক্ষারকসমূহ', defBn: 'অ্যাডেনিন (A), গুয়ানিন (G), সাইটোসিন (C), থাইমিন (T)। ডিএনএ-তে A জোড় বাঁধে T-এর সাথে এবং C জোড় বাঁধে G-এর সাথে।' },
    ],
    analogies: [
      { concept: 'DNA Double Helix', analogyBn: 'একটি প্যাঁচানো দড়ির মইয়ের মতো, যার দুই পাশের খুঁটি চিনি ও ফসফেট এবং সিঁড়ির ধাপগুলো ক্ষারক জোড়া।' },
    ],
    flashcards: [
      { front: 'ডিএনএ ও আরএনএ-এর মূল পার্থক্য কী?', back: 'ডিএনএ দ্বিসূত্রক ও থাইমিন থাকে; আরএনএ একসূত্রক এবং থাইমিনের পরিবর্তে ইউরাসিল (U) থাকে।' },
      { front: 'অ্যাডেনিন ও থাইমিন কয়টি হাইড্রোজেন বন্ধন দিয়ে যুক্ত?', back: '২টি হাইড্রোজেন বন্ধন (A = T)। অপরদিকে C ও G ৩টি হাইড্রোজেন বন্ধন (C ≡ G) দিয়ে যুক্ত।' },
    ],
    examTipsBn: [
      'ক্ষারক জোড়ার নীতি (Complementary base pairing) পরীক্ষায় ব্যাখ্যামূলক প্রশ্নে বেশি আসে।',
    ],
  },
];

export const SCIENCE_TOPICS: ScienceTopic[] = [
  {
    id: 'force-and-motion',
    titleEn: 'Force and Motion',
    titleBn: 'বল ও গতি (Force and Motion)',
    classes: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
    explanationBn: 'গতির সমীকরণ, নিউটনের গতির তিনটি সূত্র এবং ঘর্ষণ বলের ধারণা। বল প্রয়োগ না করলে স্থির বস্তু চিরকাল স্থির থাকে এবং গতিশীল বস্তু সুষম দ্রুতিতে সোজা পথে চলতে থাকে।',
    keyPoints: [
      'নিউটনের ১ম সূত্র: জড়তার সূত্র (Law of Inertia)',
      'নিউটনের ২য় সূত্র: বল F = m × a (ভর × ত্বরণ)',
      'নিউটনের ৩য় সূত্র: প্রত্যেক ক্রিয়ারই সমান ও বিপরীত প্রতিক্রিয়া আছে',
      'ঘর্ষণ বল গতিকে বাধাগ্রস্ত করে কিন্তু হাঁটা ও যানবাহন নিয়ন্ত্রণে অপরিহার্য',
    ],
    realLifeApplicationBn: 'বাস হঠাৎ ব্রেক কষলে যাত্রীদের সামনের দিকে ঝুঁকে পড়া হলো গতি জড়তার বাস্তব উদাহরণ।',
    flashcards: [
      { front: 'বলের এসআই (SI) একক কী?', back: 'নিউটন (N)। ১ নিউটন = ১ কেজি ভরের বস্তুতে ১ মি/সে² ত্বরণ সৃষ্টিকারী বল।' },
      { front: 'ত্বরণ (Acceleration) কাকে বলে?', back: 'সময়ের সাথে বস্তুর অসম বেগের পরিবর্তনের হারকে ত্বরণ বলে। এর একক m/s²।' },
    ],
  },
  {
    id: 'light-and-vision',
    titleEn: 'Light & Vision',
    titleBn: 'আলো ও দৃষ্টির রহস্য',
    classes: ['Class 6', 'Class 7', 'Class 8'],
    explanationBn: 'আলোর প্রতিফলন, প্রতিসরণ এবং মানব চোখের দর্শন প্রক্রিয়া। দর্পণ ও লেন্সের মাধ্যমে প্রতিবিম্ব গঠন।',
    keyPoints: [
      'প্রতিফলনের নিয়ম: আপতন কোণ = প্রতিফলন কোণ (i = r)',
      'প্রতিসরণ: আলো এক স্বচ্ছ মাধ্যম থেকে অন্য মাধ্যমে যাওয়ার সময় দিক পরিবর্তন করে',
      'চোখের রেটিনায় বস্তুর উল্টো প্রতিবিম্ব তৈরি হয়, যা অপটিক স্নায়ুর মাধ্যমে মস্তিষ্কে সোজা হয়ে অনুভূত হয়',
    ],
    realLifeApplicationBn: 'পানির গ্লাসে পেন্সিল রাখলে বাঁকা দেখানোর কারণ হলো আলোর প্রতিসরণ (Refraction)।',
    flashcards: [
      { front: 'দৃষ্টির ক্ষীণতা বা মায়োপিয়া দূর করতে কোন লেন্স ব্যবহার করা হয়?', back: 'অবতল লেন্স (Concave Lens)।' },
    ],
  },
  {
    id: 'acids-bases-salts',
    titleEn: 'Acids, Bases & Salts',
    titleBn: 'অম্ল, ক্ষারক ও লবণ',
    classes: ['Class 8', 'Class 9', 'Class 10'],
    explanationBn: 'দৈনন্দিন জীবনে অ্যাসিড ও ক্ষারকের ব্যবহার, লিটমাস টেস্ট, পিএইচ (pH) স্কেল এবং প্রশমন বিক্রিয়া।',
    keyPoints: [
      'অ্যাসিড নীল লিটমাসকে লাল করে এবং এর স্বাদ টক',
      'ক্ষারক লাল লিটমাসকে নীল করে এবং স্পর্শে পিচ্ছিল লাগে',
      'pH স্কেলে ৭ হলো নিরপেক্ষ (বিশুদ্ধ পানি), ৭-এর নিচে অ্যাসিড এবং ৭-এর উপরে ক্ষারীয়',
      'অ্যাসিড + ক্ষারক -> লবণ + পানি (প্রশমন বিক্রিয়া)',
    ],
    realLifeApplicationBn: 'পিপড়ার কামড়ে ফরমিক অ্যাসিড থাকে; চুন বা সাবান লাগালে প্রশমিত হয়ে জ্বালাপোড়া কমে যায়।',
    flashcards: [
      { front: 'মানুষের রক্তের স্বাভাবিক pH কত?', back: 'প্রায় ৭.৪ (সামান্য ক্ষারীয়)।' },
    ],
  },
];

export const ICT_TOPICS: IctTopic[] = [
  {
    id: 'networks-and-internet',
    titleEn: 'Computer Networks & Internet',
    titleBn: 'কম্পিউটার নেটওয়ার্ক ও ইন্টারনেট',
    classes: ['Class 8', 'Class 9', 'Class 10'],
    explanationBn: 'কম্পিউটারগুলো যখন তথ্য আদান-প্রদানের উদ্দেশ্যে পরস্পরের সাথে যুক্ত হয় তখন তাকে নেটওয়ার্ক বলে। ল্যান (LAN), ম্যান (MAN), ওয়ান (WAN) এবং রাউটার ও সুইচের ভূমিকা।',
    keyPoints: [
      'LAN (Local Area Network): বিদ্যালয় বা একটি ভবনের নেটওয়ার্ক',
      'WAN (Wide Area Network): বিশ্বব্যাপী বিস্তৃত নেটওয়ার্ক, ইন্টারনেট যার প্রকৃষ্ট উদাহরণ',
      'রাউটার (Router): দুটি ভিন্ন নেটওয়ার্কের মধ্যে ডেটা প্যাকেট আদান-প্রদান করে',
      'IP Address: ইন্টারনেটে প্রতিটি ডিভাইসের নির্দিষ্ট ডিজিটাল ঠিকানা',
    ],
    practicalTipsBn: 'বাসার ওয়াইফাই রাউটারে সবসময় শক্তিশালী পাসওয়ার্ড (WPA2/WPA3 এনক্রিপশন) ব্যবহার করুন।',
    flashcards: [
      { front: 'IP-এর পূর্ণরূপ কী?', back: 'Internet Protocol (ইন্টারনেট প্রোটোকল)।' },
      { front: 'ইন্টারনেটের জনক কাকে বলা হয়?', back: 'ভিন্টন জি সার্ফ (Vinton Gray Cerf)।' },
    ],
  },
  {
    id: 'cyber-security',
    titleEn: 'Cyber Security & Digital Safety',
    titleBn: 'সাইবার নিরাপত্তা ও ডিজিটাল সুরক্ষা',
    classes: ['Class 7', 'Class 8', 'Class 9', 'Class 10'],
    explanationBn: 'ইন্টারনেট ব্যবহারের সময় ব্যক্তিগত তথ্যের গোপনীয়তা রক্ষা, ম্যালওয়্যার/ভাইরাস প্রতিরোধ এবং ফিশিং প্রতারণা থেকে বাঁচার উপায়।',
    keyPoints: [
      'টু-ফ্যাক্টর অথেন্টিকেশন (2FA) চালু রাখা বাধ্যতামূলক',
      'অপরিচিত কোনো লিংকে ক্লিক না করা (Phishing Attack থেকে বাঁচতে)',
      'কপিরাইট আইন ও তথ্য অধিকার আইন সম্পর্কে সচেতন হওয়া',
      'পাবলিক ওয়াইফাই ব্যবহারের সময় অনলাইন ব্যাংকিং এড়িয়ে চলা',
    ],
    practicalTipsBn: 'লগইন করার সময় ওয়েবসাইটের ইউআরএলে "https://" এবং তালার চিহ্ন আছে কিনা পরীক্ষা করে নিন।',
    flashcards: [
      { front: 'ম্যালওয়্যার (Malware) শব্দের অর্থ কী?', back: 'Malicious Software - যা ক্ষতিকর কম্পিউটার প্রোগ্রামের সাধারণ নাম।' },
    ],
  },
  {
    id: 'algorithms-flowcharts',
    titleEn: 'Algorithms & Flowcharts',
    titleBn: 'অ্যালগরিদম ও ফ্লোচার্ট',
    classes: ['Class 9', 'Class 10'],
    explanationBn: 'যেকোনো সমস্যার ধাপে ধাপে সমাধান করার পদ্ধতিকে অ্যালগরিদম বলে এবং সেই সমাধানের চিত্ররূপ হলো ফ্লোচার্ট।',
    keyPoints: [
      'অ্যালগরিদম: সহজ ভাষায় ধাপে ধাপে নির্দেশিকা (Step 1, Step 2...)',
      'ডিম্বাকৃতি প্রতীক (Oval): শুরু ও শেষ নির্দেশ করে',
      'সামান্তরিক (Parallelogram): ইনপুট ও আউটপুট নির্দেশ করে',
      'আয়তক্ষেত্র (Rectangle): প্রক্রিয়াকরণ বা হিসাব-নিকাশ নির্দেশ করে',
      'হীরক বা ডায়মন্ড (Diamond): সিদ্ধান্ত গ্রহণ (Yes/No) নির্দেশ করে',
    ],
    practicalTipsBn: 'প্রোগ্রাম কোডিং শুরু করার আগে সবসময় খাতায় ফ্লোচার্ট এঁকে নিলে ভুল হওয়ার সম্ভাবনা শূন্যের কোঠায় নেমে আসে।',
    flashcards: [
      { front: 'ফ্লোচার্টে সিদ্ধান্ত গ্রহণের প্রতীক কোনটি?', back: 'হীরক বা ডায়মন্ড প্রতীক (Rhombus/Diamond)।' },
    ],
  },
];
