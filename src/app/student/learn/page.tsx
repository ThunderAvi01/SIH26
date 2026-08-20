"use client";

import Link from "next/link";
import { BookOpen, Video, Eye, Award, CheckCircle } from "lucide-react";

export default function LearnPage() {
  const subjects = [
    {
      id: "math",
      title: "Mathematics",
      color: "from-blue-500/20 to-indigo-600/20 border-blue-500/30 text-blue-400",
      accent: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      chapters: [
        { id: "linear-equations", title: "Linear Equations", lessons: 4, quizzes: 1, completed: true },
        { id: "fractions", title: "Understanding Fractions", lessons: 3, quizzes: 1, completed: false },
        { id: "geometry", title: "Basic Geometry", lessons: 5, quizzes: 2, completed: false }
      ]
    },
    {
      id: "science",
      title: "Science",
      color: "from-green-500/20 to-emerald-600/20 border-green-500/30 text-emerald-400",
      accent: "bg-green-500/10 text-green-400 border-green-500/20",
      chapters: [
        { id: "photosynthesis", title: "Photosynthesis & Plants", lessons: 3, quizzes: 1, completed: false },
        { id: "human-body", title: "The Human Digestive System", lessons: 4, quizzes: 2, completed: false }
      ]
    },
    {
      id: "english",
      title: "English",
      color: "from-purple-500/20 to-indigo-600/20 border-purple-500/30 text-purple-400",
      accent: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      chapters: [
        { id: "sentence-builder", title: "Sentence Construction", lessons: 3, quizzes: 1, completed: false },
        { id: "vocabulary", title: "Adjectives & Adverbs", lessons: 5, quizzes: 1, completed: false }
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 md:pb-0">
      <div>
        <h1 className="text-3xl font-black text-white text-glow">Learning Center</h1>
        <p className="text-slate-400 mt-1 font-medium">Select a subject to begin your adventure</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {subjects.map((subject) => (
          <div key={subject.id} className="glass-card rounded-3xl p-6 shadow-xl border-white/5 overflow-hidden">
            {/* Header banner */}
            <div className={`p-6 -mx-6 -mt-6 bg-gradient-to-r ${subject.color} border-b text-white mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3`}>
              <div>
                <h2 className="text-2xl font-black tracking-tight">{subject.title}</h2>
                <p className="text-slate-300 text-xs font-semibold mt-1">{subject.chapters.length} Chapters available</p>
              </div>
              <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase border ${subject.accent}`}>
                Core Subject
              </span>
            </div>

            {/* Chapters list */}
            <div className="space-y-4">
              {subject.chapters.map((chapter) => (
                <div key={chapter.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4.5 rounded-2xl bg-slate-950/40 border border-white/5 hover:border-indigo-500/30 transition-all duration-300 group">
                  <div className="flex items-center gap-4">
                    {chapter.completed ? (
                      <CheckCircle className="h-6 w-6 text-emerald-400 flex-shrink-0 fill-emerald-400/10" />
                    ) : (
                      <div className="h-6 w-6 rounded-full border-2 border-slate-700 flex-shrink-0 group-hover:border-slate-500 transition-colors" />
                    )}
                    <div>
                      <h3 className="font-bold text-white group-hover:text-indigo-400 transition-colors">{chapter.title}</h3>
                      <div className="flex gap-4 text-xs text-slate-400 mt-1 font-semibold">
                        <span className="flex items-center gap-1.5"><Video className="h-3.5 w-3.5" /> {chapter.lessons} Lessons</span>
                        <span className="flex items-center gap-1.5"><Award className="h-3.5 w-3.5" /> {chapter.quizzes} Quizzes</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-0 flex gap-3.5 w-full sm:w-auto">
                    <Link href={`/student/learn/${subject.id}/${chapter.id}`} className="flex-1 sm:flex-none">
                      <button className="w-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 font-bold px-6.5 py-3 rounded-full text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5">
                        <Eye className="h-4 w-4" /> Visual Lesson
                      </button>
                    </Link>
                    <Link href={`/student/quiz/${chapter.id}`} className="flex-1 sm:flex-none">
                      <button className="w-full bg-indigo-600 hover:bg-indigo-500 border border-indigo-500/25 text-white font-bold px-6.5 py-3 rounded-full text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/10">
                        Start Quiz
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
