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
          <h1 className="text-3xl font-black text-white text-glow">Content Hub</h1>
          <p className="text-slate-400 mt-1 font-medium">Create lesson modules, visual interactive tools, or quizzes</p>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex bg-slate-900/60 p-1.5 border border-white/5 rounded-2xl max-w-xs">
        <button
          onClick={() => setActiveTab("create")}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 ${
            activeTab === "create" 
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/15" 
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Create New
        </button>
        <button
          onClick={() => setActiveTab("manage")}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 ${
            activeTab === "manage" 
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/15" 
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Manage Published
        </button>
      </div>

      {activeTab === "create" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Form Side */}
          <div className="lg:col-span-2 glass-card border border-white/5 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex gap-2 p-1.5 bg-slate-950/60 border border-white/5 rounded-2xl max-w-xs">
              <button
                onClick={() => setContentType("lesson")}
                className={`flex-1 py-2 text-xs font-black uppercase rounded-xl transition-all ${
                  contentType === "lesson" 
                    ? "bg-indigo-600 text-white shadow-md" 
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Lesson
              </button>
              <button
                onClick={() => setContentType("quiz")}
                className={`flex-1 py-2 text-xs font-black uppercase rounded-xl transition-all ${
                  contentType === "quiz" 
                    ? "bg-indigo-600 text-white shadow-md" 
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Assessments
              </button>
            </div>

            {contentType === "lesson" ? (
              <form onSubmit={handlePublish} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Lesson Title</label>
                    <input
                      type="text"
                      required
                      value={lessonTitle}
                      onChange={(e) => setLessonTitle(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-950/40 border border-white/10 rounded-2xl outline-none text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-semibold text-sm"
                      placeholder="e.g., Understanding Fractions"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Subject</label>
                    <select
                      value={lessonSubject}
                      onChange={(e) => setLessonSubject(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-white/10 rounded-2xl outline-none text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-semibold text-sm select-custom"
                    >
                      <option>Mathematics</option>
                      <option>Science</option>
                      <option>English</option>
                      <option>Social Studies</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Video Explainer URL (Optional)</label>
                  <input
                    type="url"
                    value={lessonVideo}
                    onChange={(e) => setLessonVideo(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950/40 border border-white/10 rounded-2xl outline-none text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-semibold text-sm"
                    placeholder="e.g., https://www.youtube.com/watch?v=..."
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Text Summary & Audio Explanation script</label>
                  <textarea
                    rows={6}
                    value={lessonText}
                    onChange={(e) => setLessonText(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950/40 border border-white/10 rounded-2xl outline-none text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-semibold text-sm"
                    placeholder="Write a simple description here. This content is cached offline for data saving."
                  />
                </div>

                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-500 border border-indigo-500/25 text-white rounded-full font-bold px-8 py-5 shadow-lg shadow-indigo-600/10 active:scale-95 transition-transform">
                  Publish Lesson
                </Button>
              </form>
            ) : (
              <form onSubmit={handlePublish} className="space-y-6">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Quiz Title</label>
                  <input
                    type="text"
                    required
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950/40 border border-white/10 rounded-2xl outline-none text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-semibold text-sm"
                    placeholder="e.g., Fractions Quiz"
                  />
                </div>

                <div className="space-y-6">
                  {quizQuestions.map((q, qIdx) => (
                    <div key={qIdx} className="border border-white/5 rounded-3xl p-5 bg-slate-950/40 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-black text-indigo-400 text-xs uppercase tracking-wider">Question {qIdx + 1}</span>
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Question Text</label>
                        <input
                          type="text"
                          required
                          value={q.questionText}
                          onChange={(e) => handleQuestionChange(qIdx, "questionText", e.target.value)}
                          className="w-full px-4 py-2.5 bg-slate-950/60 border border-white/10 rounded-xl outline-none text-white text-sm font-semibold"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3.5">
                        {q.options.map((opt, oIdx) => (
                          <div key={oIdx} className="space-y-1.5">
                            <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider">Option {oIdx + 1}</label>
                            <input
                              type="text"
                              required
                              value={opt}
                              onChange={(e) => handleQuestionChange(qIdx, "option", e.target.value, oIdx)}
                              className="w-full px-4 py-2 bg-slate-950/60 border border-white/10 rounded-xl outline-none text-white text-xs font-semibold"
                            />
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-3.5">
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Correct Answer</label>
                          <input
                            type="text"
                            required
                            value={q.correctAnswer}
                            onChange={(e) => handleQuestionChange(qIdx, "correctAnswer", e.target.value)}
                            className="w-full px-4 py-2 bg-slate-950/60 border border-white/10 rounded-xl outline-none text-white text-xs font-semibold"
                            placeholder="Must match one option exactly"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Explanation</label>
                          <input
                            type="text"
                            value={q.explanation}
                            onChange={(e) => handleQuestionChange(qIdx, "explanation", e.target.value)}
                            className="w-full px-4 py-2 bg-slate-950/60 border border-white/10 rounded-xl outline-none text-white text-xs font-semibold"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" onClick={handleAddQuestion} className="border-white/10 text-slate-200 hover:bg-white/5 rounded-full font-bold px-6 py-5">
                    Add Question
                  </Button>
                  <Button type="submit" className="bg-indigo-600 hover:bg-indigo-500 border border-indigo-500/25 text-white rounded-full font-bold px-8 py-5 shadow-lg shadow-indigo-600/10 active:scale-95 transition-transform">
                    Publish Quiz
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* AI Helper Sidebar */}
          <div className="lg:col-span-1 bg-gradient-to-br from-indigo-950/60 via-purple-950/40 to-slate-950/60 border border-white/5 rounded-3xl p-6 shadow-xl space-y-5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none"></div>

            <div className="flex items-center gap-2.5 text-indigo-400 font-extrabold text-lg">
              <Sparkles className="h-5 w-5 animate-pulse" /> AI Assistant
            </div>
            <p className="text-slate-300 text-xs leading-relaxed font-semibold">
              Don't want to type quizzes manually? Let the AI assistant generate quiz questions automatically based on standard rural class-8 curriculum.
            </p>
            <Button
              onClick={triggerAIAssistant}
              disabled={aiLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 border border-indigo-500/25 text-white rounded-2xl py-6 font-bold shadow-lg shadow-indigo-600/10 active:scale-95 transition-transform"
            >
              {aiLoading ? "Generating Quiz..." : "Auto-Generate Quiz"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="glass-card border border-white/5 rounded-3xl p-6 shadow-xl space-y-6">
          <h2 className="text-xl font-bold text-white">Published Content List</h2>
          <div className="divide-y divide-white/5">
            {[
              { type: "lesson", title: "Introduction to Fractions", subject: "Mathematics", date: "Aug 18, 2026", icon: BookOpen },
              { type: "quiz", title: "Adding Fractions assessment", subject: "Mathematics", date: "Aug 17, 2026", icon: FileText },
              { type: "lesson", title: "Understanding Plant Photosynthesis", subject: "Science", date: "Aug 16, 2026", icon: Video }
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center py-4">
                <div className="flex items-center gap-3">
                  <div className="bg-slate-900 border border-white/10 p-2.5 rounded-xl text-slate-400">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm md:text-base">{item.title}</h3>
                    <p className="text-[11px] text-slate-500 font-semibold mt-0.5">{item.subject} • Published on {item.date}</p>
                  </div>
                </div>
                <span className="text-[10px] font-black text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
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
