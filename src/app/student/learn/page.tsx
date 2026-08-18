"use client";

import Link from "next/link";
import { BookOpen, Video, Eye, Award, CheckCircle } from "lucide-react";

export default function LearnPage() {
  const subjects = [
    {
      id: "math",
      title: "Mathematics",
      color: "from-blue-500 to-indigo-600",
      accent: "bg-blue-50 text-blue-700 border-blue-100",
      chapters: [
        { id: "linear-equations", title: "Linear Equations", lessons: 4, quizzes: 1, completed: true },
        { id: "fractions", title: "Understanding Fractions", lessons: 3, quizzes: 1, completed: false },
        { id: "geometry", title: "Basic Geometry", lessons: 5, quizzes: 2, completed: false }
      ]
    },
    {
      id: "science",
      title: "Science",
      color: "from-green-500 to-emerald-600",
      accent: "bg-green-50 text-green-700 border-green-100",
      chapters: [
        { id: "photosynthesis", title: "Photosynthesis & Plants", lessons: 3, quizzes: 1, completed: false },
        { id: "human-body", title: "The Human Digestive System", lessons: 4, quizzes: 2, completed: false }
      ]
    },
    {
      id: "english",
      title: "English",
      color: "from-purple-500 to-indigo-600",
      accent: "bg-purple-50 text-purple-700 border-purple-100",
      chapters: [
        { id: "sentence-builder", title: "Sentence Construction", lessons: 3, quizzes: 1, completed: false },
        { id: "vocabulary", title: "Adjectives & Adverbs", lessons: 5, quizzes: 1, completed: false }
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 md:pb-0">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Learning Center</h1>
        <p className="text-gray-500 mt-1">Select a subject to begin your adventure</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {subjects.map((subject) => (
          <div key={subject.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className={`p-6 -mx-6 -mt-6 bg-gradient-to-r ${subject.color} text-white mb-6`}>
              <h2 className="text-2xl font-bold">{subject.title}</h2>
              <p className="text-white/80 text-sm mt-1">{subject.chapters.length} Chapters available</p>
            </div>

            {/* Chapters list */}
            <div className="space-y-4">
              {subject.chapters.map((chapter) => (
                <div key={chapter.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-colors">
                  <div className="flex items-center gap-3">
                    {chapter.completed ? (
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    ) : (
                      <div className="h-6 w-6 rounded-full border-2 border-slate-300 flex-shrink-0" />
                    )}
                    <div>
                      <h3 className="font-bold text-slate-800">{chapter.title}</h3>
                      <div className="flex gap-4 text-xs text-slate-500 mt-1">
                        <span className="flex items-center gap-1"><Video className="h-3 w-3" /> {chapter.lessons} Lessons</span>
                        <span className="flex items-center gap-1"><Award className="h-3 w-3" /> {chapter.quizzes} Quizzes</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-0 flex gap-2 w-full sm:w-auto">
                    <Link href={`/student/learn/${subject.id}/${chapter.id}`} className="flex-1 sm:flex-none">
                      <button className="w-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-bold px-5 py-2.5 rounded-full text-sm transition-colors flex items-center justify-center gap-1.5">
                        <Eye className="h-4 w-4" /> Visual Lesson
                      </button>
                    </Link>
                    <Link href={`/student/quiz/${chapter.id}`} className="flex-1 sm:flex-none">
                      <button className="w-full bg-indigo-600 text-white hover:bg-indigo-700 font-bold px-5 py-2.5 rounded-full text-sm transition-colors flex items-center justify-center gap-1.5">
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
