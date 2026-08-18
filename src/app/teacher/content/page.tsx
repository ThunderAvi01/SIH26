"use client";

import { useState } from "react";
import { FileText, Sparkles, BookOpen, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContentCreationPage() {
  const [activeTab, setActiveTab] = useState<"create" | "manage">("create");
  const [contentType, setContentType] = useState<"lesson" | "quiz">("lesson");
  
  // Lesson Creation State
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDesc, setLessonDesc] = useState("");
  const [lessonSubject, setLessonSubject] = useState("Mathematics");
  const [lessonVideo, setLessonVideo] = useState("");
  const [lessonText, setLessonText] = useState("");
  
  // Quiz Creation State
  const [quizTitle, setQuizTitle] = useState("");
  const [quizQuestions, setQuizQuestions] = useState([
    { questionText: "", options: ["", "", "", ""], correctAnswer: "", explanation: "" }
  ]);

  // AI Assistant trigger mock
  const [aiLoading, setAiLoading] = useState(false);

  const triggerAIAssistant = async () => {
    setAiLoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: "Generate a quiz on Fractions.", type: "quiz" })
      });

      if (!res.ok) throw new Error("API failed");
      const quizQuestions = await res.json();
      
      setQuizTitle("Fractions Mastery Quiz");
      setQuizQuestions(quizQuestions);
    } catch (e) {
      // Mock generated quiz fallback
      setTimeout(() => {
        setQuizTitle("Fractions Mastery Quiz (Offline)");
        setQuizQuestions([
          {
            questionText: "If you have 3/4 of a chocolate bar and give 1/4 to a friend, how much do you have left?",
            options: ["1/4", "1/2", "3/4", "1 whole"],
            correctAnswer: "1/2",
            explanation: "Subtracting fractions with the same denominator: 3/4 - 1/4 = 2/4. Simplifying 2/4 gives 1/2."
          },
          {
            questionText: "Which of the following is equivalent to 1/3?",
            options: ["2/6", "3/6", "2/9", "4/9"],
            correctAnswer: "2/6",
            explanation: "Multiplying numerator and denominator of 1/3 by 2 gives 2/6."
          }
        ]);
      }, 1000);
    } finally {
      setAiLoading(false);
    }
  };

  const handleAddQuestion = () => {
    setQuizQuestions([
      ...quizQuestions,
      { questionText: "", options: ["", "", "", ""], correctAnswer: "", explanation: "" }
    ]);
  };

  const handleQuestionChange = (index: number, field: string, value: any, optionIdx?: number) => {
    const updated = [...quizQuestions];
    if (field === "option" && optionIdx !== undefined) {
      updated[index].options[optionIdx] = value;
    } else {
      (updated[index] as any)[field] = value;
    }
    setQuizQuestions(updated);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Content successfully published to students!");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 md:pb-0">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Content Hub</h1>
          <p className="text-gray-500 mt-1">Create lesson modules, visual interactive tools, or quizzes</p>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100 max-w-xs">
        <button
          onClick={() => setActiveTab("create")}
          className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${
            activeTab === "create" ? "bg-indigo-600 text-white shadow-md" : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Create New
        </button>
        <button
          onClick={() => setActiveTab("manage")}
          className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${
            activeTab === "manage" ? "bg-indigo-600 text-white shadow-md" : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Manage Published
        </button>
      </div>

      {activeTab === "create" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Form Side */}
          <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex gap-2 p-1 bg-slate-100 rounded-xl max-w-xs">
              <button
                onClick={() => setContentType("lesson")}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
                  contentType === "lesson" ? "bg-white shadow-sm text-indigo-600" : "text-gray-500"
                }`}
              >
                Interactive Lesson
              </button>
              <button
                onClick={() => setContentType("quiz")}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
                  contentType === "quiz" ? "bg-white shadow-sm text-indigo-600" : "text-gray-500"
                }`}
              >
                Assessments/Quiz
              </button>
            </div>

            {contentType === "lesson" ? (
              <form onSubmit={handlePublish} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Lesson Title</label>
                    <input
                      type="text"
                      required
                      value={lessonTitle}
                      onChange={(e) => setLessonTitle(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="e.g., Understanding Fractions"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Subject</label>
                    <select
                      value={lessonSubject}
                      onChange={(e) => setLessonSubject(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white font-bold"
                    >
                      <option>Mathematics</option>
                      <option>Science</option>
                      <option>English</option>
                      <option>Social Studies</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Video Explainer URL (Optional)</label>
                  <input
                    type="url"
                    value={lessonVideo}
                    onChange={(e) => setLessonVideo(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="e.g., https://www.youtube.com/watch?v=..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Text Summary & Audio Explanation script</label>
                  <textarea
                    rows={6}
                    value={lessonText}
                    onChange={(e) => setLessonText(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="Write a simple description here. This content is cached offline for data saving."
                  />
                </div>

                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 py-5">
                  Publish Lesson
                </Button>
              </form>
            ) : (
              <form onSubmit={handlePublish} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Quiz Title</label>
                  <input
                    type="text"
                    required
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="e.g., Fractions Quiz"
                  />
                </div>

                <div className="space-y-6">
                  {quizQuestions.map((q, qIdx) => (
                    <div key={qIdx} className="border border-slate-100 rounded-2xl p-5 bg-slate-50/50 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-indigo-600 text-sm">Question {qIdx + 1}</span>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Question Text</label>
                        <input
                          type="text"
                          required
                          value={q.questionText}
                          onChange={(e) => handleQuestionChange(qIdx, "questionText", e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {q.options.map((opt, oIdx) => (
                          <div key={oIdx}>
                            <label className="block text-[10px] font-bold text-slate-400 mb-1">Option {oIdx + 1}</label>
                            <input
                              type="text"
                              required
                              value={opt}
                              onChange={(e) => handleQuestionChange(qIdx, "option", e.target.value, oIdx)}
                              className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg outline-none"
                            />
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1">Correct Answer</label>
                          <input
                            type="text"
                            required
                            value={q.correctAnswer}
                            onChange={(e) => handleQuestionChange(qIdx, "correctAnswer", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg outline-none"
                            placeholder="Must match one option exactly"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1">Explanation</label>
                          <input
                            type="text"
                            value={q.explanation}
                            onChange={(e) => handleQuestionChange(qIdx, "explanation", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={handleAddQuestion} className="rounded-full">
                    Add Question
                  </Button>
                  <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8">
                    Publish Quiz
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* AI Helper Sidebar */}
          <div className="lg:col-span-1 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-indigo-700 font-extrabold text-lg">
              <Sparkles className="h-5 w-5 animate-pulse" /> AI Assistant
            </div>
            <p className="text-sm text-indigo-950/80 leading-relaxed">
              Don't want to type quizzes manually? Let the AI assistant generate quiz questions automatically based on standard rural class-8 curriculum.
            </p>
            <Button
              onClick={triggerAIAssistant}
              disabled={aiLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-6 font-bold"
            >
              {aiLoading ? "Generating Quiz..." : "Auto-Generate Quiz"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-800">Published Content List</h2>
          <div className="divide-y divide-slate-100">
            {[
              { type: "lesson", title: "Introduction to Fractions", subject: "Mathematics", date: "Aug 18, 2026", icon: BookOpen },
              { type: "quiz", title: "Adding Fractions assessment", subject: "Mathematics", date: "Aug 17, 2026", icon: FileText },
              { type: "lesson", title: "Understanding Plant Photosynthesis", subject: "Science", date: "Aug 16, 2026", icon: Video }
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center py-4">
                <div className="flex items-center gap-3">
                  <div className="bg-slate-100 p-2 rounded-xl text-slate-600">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{item.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{item.subject} • Published on {item.date}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full uppercase">
                  {item.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
