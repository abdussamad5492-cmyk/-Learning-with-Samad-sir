# Smart Learning with Samad Sir (স্মার্ট লার্নিং উইথ সামাদ স্যার)

> **Tagline:** Learn Smart. Think Deeply. Succeed Together.  
> **Target Audience:** Bangladeshi secondary school students (Classes 6–10) & educators (English, Biology, General Science, ICT).  
> **Primary Devices:** Android smartphones, tablets, and laptops.  
> **Languages:** বাংলা (Bangla) & English (Bilingual bridge).

---

## 🌟 Overview

**Smart Learning with Samad Sir** is a full-stack, mobile-first, AI-powered educational web application designed specifically for Bangladeshi secondary school curriculum (Classes 6–10).

It bridges conceptual understanding through simple Bangla explanations, authentic English examples, interactive SVG diagrams with tap-to-inspect hotspots, instant-feedback grammar drills, an interactive AI quiz generator, a 10-point NCTB lesson planner for teachers, and real-time learning progress tracking.

---

## 🚀 Key Features

### 1. 🏠 Interactive Home Dashboard
- Student class selector (Classes 6, 7, 8, 9, 10).
- Bilingual language switch (বাংলা / English).
- 4 Subject portals: English 2nd Paper, Biology, General Science, ICT.
- Shuffling Daily Learning Tip (Grammar traps, science facts, study routines).
- Real-time recent learning activity feed (backed by browser local storage).

### 2. 🤖 Feature A: AI Personal Tutor
- Conversational tutor powered by Gemini 3.8 (`gemini-3.8-flash` via `@google/genai`).
- 8 pedagogical response modes:
  1. সহজ ভাষায় ব্যাখ্যা (Explain simply)
  2. বিস্তারিত ব্যাখ্যা (Detailed)
  3. বাস্তব উদাহরণ সহ (With real-life examples & analogies)
  4. রিভিশন নোটস (Revision notes)
  5. অনুশীলন কুইজ (Practice quiz)
  6. বাংলায় ব্যাখ্যা (In Bangla)
  7. In English
  8. উভয় ভাষায় (Bilingual)
- 7-point structured pedagogical response format (Topic, Simple explanation, Core rules, Examples with translation, Common mistakes, 2-minute drill, Summary).
- Text-to-speech audio reader and 1-click clipboard copy.

### 3. ✍️ Feature B: English Grammar Lab
- Comprehensive coverage of 12 core secondary grammar topics:
  - Right Forms of Verbs (Subject-Verb agreement, Modals, Preposition+ing, It is high time)
  - Voice Change (Active to Passive, Imperative)
  - Narration (Direct to Indirect speech & Tense shifts)
  - Tag Questions (Rules, negative statements, special cases)
  - Appropriate Prepositions, Connectors, Articles, and more.
- Formula boxes, bilingual examples, and student mistake warnings.
- Instant-feedback interactive drills with detailed Bangla explanations.
- "AI নতুন প্রশ্ন তৈরি করুন" button to generate fresh dynamic grammar drills on demand.

### 4. 🧬 Feature C: Biology Learning Lab
- Visual and conceptual interactive learning for Classes 9–10:
  - Cell & Cell Organelles (Plant & Animal cell)
  - Human Heart & 4-Chamber Double Circulation
  - Human Respiratory System & Alveoli gas exchange
  - DNA Double Helix & Base-pairing rules (A=T, G≡C)
  - Photosynthesis Equation & Light/Dark phases
- **Interactive SVG Diagrams**: Clickable pulsing pins revealing anatomy, functions, and exam tips.
- Real-life analogies (e.g. Mitochondria as a municipal power plant).
- Interactive flip flashcards for key definitions and terminology.

### 5. 🎯 Feature D: AI Quiz Generator & Assessment
- Custom quiz builder: Class (6-10), Subject, Topic, Question Count (5, 10, 15), Difficulty (Easy, Medium, Hard), Type (MCQ, True/False, Mixed), Language.
- Step-by-step (1-by-1) and full-list viewing modes.
- Accurate automated scoring and post-submission review screen.
- Detailed explanations for each question.
- 1-click copy or print for physical test papers.
- Automatically saves results to Learning Progress.

### 6. 👨‍🏫 Feature E: AI Teacher Assistant (Lesson Planner)
- Dedicated workspace for Bangladeshi educators to generate:
  - **10-Point NCTB Lesson Plans** (Title, Class, Duration, Outcomes, Materials, 5m Warm-up, 25m Activities, 7m Assessment, Homework, Teacher Reflection)
  - **Creative Questions (CQ)** / সৃজনশীল কাঠামো (ক-জ্ঞান, খ-অনুধাবন, গ-প্রয়োগ, ঘ-উচ্চতর দক্ষতা)
  - **Classroom Worksheets & Handouts**
  - **10 MCQs with Answer Key**
  - **Remedial Learning Plans** for struggling students
- In-place editing, markdown rendering, 1-click text file download, and print-ready stylesheet.

### 7. 📈 Feature F: My Learning Progress
- Real tracking from browser local storage:
  - Total quizzes completed & overall percentage
  - Identified weak topics based on missed questions
  - Actionable revision advice from Samad Sir
  - Complete history log with dates and score badges.

### 8. 🔬 Feature G: General Science & ICT Labs
- General Science: Force & Motion (Newton's laws), Light & Vision, Acids/Bases/Salts.
- ICT: Computer Networks (LAN, WAN, Routers), Cybersecurity (2FA, Phishing), Algorithms & Flowcharts.
- Interactive flashcards and direct "Ask Samad Sir" buttons.

---

## 🛠️ Technology Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS, Lucide Icons.
- **Backend:** Express API server (`server.ts`) with `@google/genai` TypeScript SDK.
- **AI Model:** `gemini-3.8-flash` (free-tier compatible, fast latency).
- **Architecture:** Full-stack with server-side proxy routes (`/api/*`). The client never exposes API keys.
- **Data Persistence:** LocalStorage for progress and preferences.
- **Offline Resilience:** Curated fallback datasets ensure every module is functional even when offline or before an API key is connected.

---

## 🔑 Environment Variables & Setup

AI Studio automatically injects `GEMINI_API_KEY` at runtime via the Secrets panel.

In `.env.example`:
```env
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
APP_URL="YOUR_APPLET_URL"
```

To run locally or in production:
```bash
# 1. Install dependencies
npm install

# 2. Start full-stack development server
npm run dev

# 3. Build for production
npm run build

# 4. Start production server
npm start
```
