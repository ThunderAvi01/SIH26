# GramLearn - SIH 25048

**A Digital Gamified Learning Platform for Rural Students**

GramLearn is a production-ready, full-stack, highly interactive educational platform designed specifically for students in rural and underserved areas of India. It addresses key challenges like limited internet connectivity, low-end smartphones, language barriers, and lack of personalized education.

---

## 🌟 Key Features

1. **Gamified Student Hub:** Students earn XP, gain levels (Explorer, Scholar, Master), maintain streaks, and win virtual coins to purchase profile customizations.
2. **Concept Visualization:** Interactive graphical modules (e.g., Fraction Visualizer) that allow students to manipulate objects rather than just read texts.
3. **Data Saver Mode:** Toggle animations, compress layouts, and lazy-load video streams to fit low-bandwidth rural mobile plans.
4. **AI Tutor Companion:** Interactive chat tutor that explains complex concepts simply, gives real-life examples, and generates follow-up quizzes dynamically.
5. **Classroom Analytics:** Detailed teacher dashboard to monitor students, track completion rates, and assign lessons/quizzes.
6. **Teacher AI Helper:** Instantly auto-generate quizzes and classroom tasks using curriculum-aligned AI assistance.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS, Lucide Icons, Framer Motion
- **Backend:** Next.js API route handlers, Node.js environment
- **Database:** MongoDB Atlas, Mongoose schemas
- **Auth:** NextAuth.js (Credentials/Session-based)

---

## 🗂️ Project Structure

```
SIH26/
├── src/
│   ├── app/
│   │   ├── api/             # REST API routes (Auth, Progress, Seed)
│   │   ├── student/         # Student Portal (Dashboard, Games, Leaderboard)
│   │   ├── teacher/         # Teacher Portal (Classroom, Content Hub)
│   │   ├── login/           # Custom sign-in flow
│   │   ├── page.tsx         # Responsive Landing Page
│   │   └── layout.tsx       # Root layout & providers
│   ├── components/          # Reusable UI component libraries
│   ├── context/             # Data Saver state provider
│   ├── models/              # Mongoose DB schema definitions
│   └── lib/                 # DB connection and NextAuth options
├── .env.example             # Template for configuration
└── README.md                # Platform documentation
```

---

## ⚙️ Setup and Installation

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org) installed and a running [MongoDB](https://www.mongodb.com) database (local or Atlas cluster).

### 2. Configure Environment variables
Duplicate `.env.example` to `.env.local` and fill in your connection details:
```bash
cp .env.example .env.local
```

### 3. Install dependencies
```bash
npm install
```

### 4. Running Locally
Launch the Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to access the landing page.

---

## 👥 Demo Experience & Credentials

We have provided a built-in seed API endpoint to instantly populate the database with realistic student profiles, teachers, and progression metrics.

1. Navigate to: `http://localhost:3000/api/seed` in your browser.
2. You will receive a success response indicating that 10 students and 3 teachers have been seeded.
3. Login using the credentials below:

#### Student Profile:
- **Email:** `student@demo.com`
- **Password:** `Student@123`

#### Teacher Profile:
- **Email:** `teacher@demo.com`
- **Password:** `Teacher@123`
