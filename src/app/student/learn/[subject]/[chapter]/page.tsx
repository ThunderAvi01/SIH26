"use client";

import { useState } from "react";
import { ArrowLeft, Volume2, HelpCircle, Check, Info } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LessonDetailsPage() {
  const params = useParams();
  const subject = params.subject as string;
  const chapter = params.chapter as string;

  const [activeTab, setActiveTab] = useState<"video" | "visualize" | "read">("visualize");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  
  // Quick Check State
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Fraction interactive state
  const [numerator, setNumerator] = useState(3);
  const [denominator, setDenominator] = useState(4);

  // Speech Synthesis helper
  const speakExplanation = () => {
    if ("speechSynthesis" in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
        return;
      }
      const text = "A fraction represents a part of a whole. The top number, called the numerator, shows how many parts we have. The bottom number, called the denominator, shows how many equal parts the whole is divided into.";
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsPlayingAudio(false);
      setIsPlayingAudio(true);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported in this browser.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-24 relative">
      {/* Back Button */}
      <Link href="/student/learn" className="inline-flex items-center gap-2 text-indigo-400 font-bold hover:text-indigo-300 transition-colors group">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Lessons
      </Link>

      {/* Header */}
      <div className="glass-card rounded-3xl p-6 shadow-xl border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-indigo-400">{subject}</span>
          <h1 className="text-2xl font-black text-white capitalize text-glow">{chapter?.replace("-", " ")}</h1>
        </div>
        <button 
          onClick={speakExplanation} 
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 border shadow-md ${
            isPlayingAudio 
              ? "bg-red-500 hover:bg-red-600 text-white border-red-600 shadow-red-500/20" 
              : "bg-indigo-600/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-600/20 shadow-indigo-600/5"
          }`}
        >
          <Volume2 className="h-4 w-4" /> {isPlayingAudio ? "Stop Listening" : "Listen to Concept"}
        </button>
      </div>

      {/* Tab Switcher */}
      <div className="flex bg-slate-900/60 p-1.5 rounded-2xl border border-white/5 max-w-md">
        {(["video", "visualize", "read"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 ${
              activeTab === tab 
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/15" 
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="glass-card rounded-3xl p-6 md:p-8 shadow-xl border-white/5 min-h-[400px]">
        {activeTab === "video" && (
          <div className="space-y-6">
            <div className="aspect-video w-full bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center relative border border-white/5 shadow-inner">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/n0FZhQ_GkKw"
                title="Lesson Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Video Lesson: Introduction to Fractions</h2>
              <p className="text-slate-400 mt-2 text-sm">Watch this short visual guide to understand the fundamentals.</p>
            </div>
          </div>
        )}

        {activeTab === "visualize" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Column: Controls */}
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-white">Visual Fraction Builder</h2>
              <p className="text-slate-400 text-sm leading-relaxed">Drag or click the buttons below to change the numerator and denominator, and watch the diagram update instantly.</p>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Numerator (Parts we have): {numerator}</label>
                  <div className="flex gap-2 flex-wrap">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <button
                        key={num}
                        disabled={num > denominator}
                        onClick={() => setNumerator(num)}
                        className={`h-11 w-11 rounded-xl font-bold text-sm border transition-all duration-300 ${
                          numerator === num 
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/10" 
                            : "bg-slate-900/60 text-slate-300 border-white/5 hover:bg-slate-900 disabled:opacity-30 disabled:hover:bg-slate-900/60"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Denominator (Total equal parts): {denominator}</label>
                  <div className="flex gap-2 flex-wrap">
                    {[2, 3, 4, 5, 6, 8].map((den) => (
                      <button
                        key={den}
                        onClick={() => {
                          setDenominator(den);
                          if (numerator > den) setNumerator(den);
                        }}
                        className={`h-11 w-11 rounded-xl font-bold text-sm border transition-all duration-300 ${
                          denominator === den 
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/10" 
                            : "bg-slate-900/60 text-slate-300 border-white/5 hover:bg-slate-900"
                        }`}
                      >
                        {den}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-2xl flex items-start gap-3">
                <Info className="h-5 w-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-indigo-200 leading-relaxed font-semibold">
                  Currently showing <strong className="text-indigo-400">{numerator}/{denominator}</strong>. The shape represents 1 whole unit divided into {denominator} equal parts, with {numerator} parts shaded in.
                </p>
              </div>
            </div>

            {/* Right Column: Visualization Display */}
            <div className="flex flex-col items-center justify-center p-8 bg-slate-950/40 rounded-3xl border border-white/5 shadow-inner relative">
              {/* Decorative Glow */}
              <div className="absolute w-48 h-48 rounded-full bg-indigo-500/5 blur-2xl pointer-events-none"></div>

              {/* Circle Visualization */}
              <div className="relative w-64 h-64 rounded-full border-4 border-slate-700 overflow-hidden bg-slate-900/60 shadow-xl flex items-center justify-center">
                {/* Visual slices using SVG */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Base Circle */}
                  <circle cx="50" cy="50" r="48" fill="rgba(15, 23, 42, 0.4)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  
                  {/* Generated Slices */}
                  {Array.from({ length: denominator }).map((_, i) => {
                    const angle = 360 / denominator;
                    const startAngle = i * angle;
                    const endAngle = (i + 1) * angle;
                    const isShaded = i < numerator;
                    
                    // Convert polar to cartesian coordinates
                    const rad = (val: number) => (val * Math.PI) / 180;
                    const x1 = 50 + 48 * Math.cos(rad(startAngle));
                    const y1 = 50 + 48 * Math.sin(rad(startAngle));
                    const x2 = 50 + 48 * Math.cos(rad(endAngle));
                    const y2 = 50 + 48 * Math.sin(rad(endAngle));
                    
                    const largeArcFlag = angle > 180 ? 1 : 0;
                    const pathData = `M 50 50 L ${x1} ${y1} A 48 48 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

                    return (
                      <path
                        key={i}
                        d={pathData}
                        fill={isShaded ? "url(#indigoGradient)" : "none"}
                        stroke="rgba(255,255,255,0.15)"
                        strokeWidth="0.7"
                        className="transition-all duration-300"
                      />
                    );
                  })}
                  
                  {/* SVG Gradient Definition */}
                  <defs>
                    <linearGradient id="indigoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4f46e5" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="mt-6 text-center select-none flex flex-col items-center">
                <span className="text-4xl font-black text-white border-b-2 border-slate-500 px-3 pb-1">{numerator}</span>
                <span className="text-4xl font-black text-slate-400 block mt-1">{denominator}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "read" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-white">Textbook Summary</h2>
            <div className="space-y-4 text-slate-300 leading-relaxed text-sm">
              <p>
                In mathematics, a <strong className="text-white">fraction</strong> is a number that represents a part of a whole. It consists of a numerator (the number above the line) and a non-zero denominator (the number below the line).
              </p>
              <p>
                For example, in the fraction <strong className="text-indigo-400">3/4</strong>:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-medium">
                <li><strong className="text-white">Numerator (3):</strong> Indicates that we are referring to 3 equal parts.</li>
                <li><strong className="text-white">Denominator (4):</strong> Indicates that the whole object is divided into 4 equal parts in total.</li>
              </ul>
              <p>
                Understanding fractions visually helps in solving real-world sharing problems and sets the foundation for division, ratios, and percentages.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Quick Check Section */}
      <div className="glass-card rounded-3xl p-6 border-emerald-500/20 shadow-xl bg-gradient-to-r from-emerald-950/10 via-slate-900/40 to-emerald-950/10 relative overflow-hidden">
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="flex items-center gap-3.5 mb-5 relative z-10">
          <div className="bg-emerald-500/10 text-emerald-400 p-2.5 rounded-xl border border-emerald-500/25">
            <HelpCircle className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Quick Check</h2>
        </div>

        <div className="space-y-5 relative z-10">
          <p className="font-bold text-white text-lg leading-snug">If a pizza is cut into 8 equal slices and you eat 3, what fraction of the pizza is remaining?</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {[
              { id: 1, text: "3/8", correct: false },
              { id: 2, text: "5/8", correct: true },
              { id: 3, text: "8/5", correct: false },
              { id: 4, text: "1/2", correct: false }
            ].map((option) => (
              <button
                key={option.id}
                disabled={quizSubmitted}
                onClick={() => setSelectedAnswer(option.id)}
                className={`p-4 rounded-2xl border text-left font-bold transition-all duration-300 ${
                  selectedAnswer === option.id 
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/15" 
                    : "bg-slate-950/40 border-white/5 text-slate-300 hover:border-indigo-500/40"
                } disabled:opacity-80`}
              >
                {option.text}
              </button>
            ))}
          </div>

          {!quizSubmitted ? (
            <Button
              disabled={selectedAnswer === null}
              onClick={() => {
                setQuizSubmitted(true);
                setIsCorrect(selectedAnswer === 2);
              }}
              className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-8 py-5 mt-4 font-bold border border-emerald-500/20 active:scale-98 transition-all shadow-lg shadow-emerald-600/10"
            >
              Submit Answer
            </Button>
          ) : (
            <div className="mt-5 p-5 bg-slate-950/60 rounded-2xl border border-white/5 flex items-start gap-4 animate-fade-in">
              {isCorrect ? (
                <div className="bg-emerald-500/10 p-2.5 rounded-full text-emerald-400 border border-emerald-500/20">
                  <Check className="h-5 w-5" />
                </div>
              ) : (
                <div className="bg-red-500/10 p-2.5 rounded-full text-red-400 border border-red-500/20 font-bold text-sm w-10 h-10 flex items-center justify-center">
                  X
                </div>
              )}
              <div>
                <p className={`font-bold text-lg ${isCorrect ? "text-emerald-400 text-glow" : "text-red-400"}`}>
                  {isCorrect ? "Correct! +20 XP Earned" : "Incorrect. Try again next time!"}
                </p>
                <p className="text-slate-400 text-xs mt-1.5 leading-relaxed font-semibold">
                  Explanation: If you eat 3 slices out of 8, there are 8 - 3 = 5 slices left. Therefore, 5/8 of the pizza is remaining.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
