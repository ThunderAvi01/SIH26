"use client";

import { useState, useParams } from "react";
import { ArrowLeft, Volume2, HelpCircle, Check, Info, Video } from "lucide-react";
import Link from "next/link";
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
    <div className="max-w-5xl mx-auto space-y-6 pb-24">
      {/* Back Button */}
      <Link href="/student/learn" className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:underline">
        <ArrowLeft className="h-4 w-4" /> Back to Lessons
      </Link>

      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-500">{subject}</span>
          <h1 className="text-2xl font-bold text-slate-800 capitalize">{chapter?.replace("-", " ")}</h1>
        </div>
        <button 
          onClick={speakExplanation} 
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm ${
            isPlayingAudio ? "bg-red-500 text-white" : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
          }`}
        >
          <Volume2 className="h-4 w-4" /> {isPlayingAudio ? "Stop Listening" : "Listen to Concept"}
        </button>
      </div>

      {/* Tab Switcher */}
      <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 max-w-md">
        {(["video", "visualize", "read"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all capitalize ${
              activeTab === tab ? "bg-indigo-600 text-white shadow-md" : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 min-h-[400px]">
        {activeTab === "video" && (
          <div className="space-y-6">
            <div className="aspect-video w-full bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center relative border border-slate-200">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/n0FZhQ_GkKw"
                title="Lesson Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Video Lesson: Introduction to Fractions</h2>
              <p className="text-gray-500 mt-2">Watch this short visual guide to understand the fundamentals.</p>
            </div>
          </div>
        )}

        {activeTab === "visualize" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Column: Controls */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-800">Visual Fraction Builder</h2>
              <p className="text-gray-600">Drag or click the buttons below to change the numerator and denominator, and watch the diagram update instantly.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-2 uppercase">Numerator (Parts we have): {numerator}</label>
                  <div className="flex gap-2 flex-wrap">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <button
                        key={num}
                        disabled={num > denominator}
                        onClick={() => setNumerator(num)}
                        className={`h-10 w-10 rounded-lg font-bold border transition-all ${
                          numerator === num ? "bg-indigo-600 text-white border-indigo-600" : "bg-slate-50 hover:bg-slate-100 disabled:opacity-50"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-2 uppercase">Denominator (Total equal parts): {denominator}</label>
                  <div className="flex gap-2 flex-wrap">
                    {[2, 3, 4, 5, 6, 8].map((den) => (
                      <button
                        key={den}
                        onClick={() => {
                          setDenominator(den);
                          if (numerator > den) setNumerator(den);
                        }}
                        className={`h-10 w-10 rounded-lg font-bold border transition-all ${
                          denominator === den ? "bg-indigo-600 text-white border-indigo-600" : "bg-slate-50 hover:bg-slate-100"
                        }`}
                      >
                        {den}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl flex items-start gap-3">
                <Info className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-indigo-900 leading-relaxed">
                  Currently showing <strong className="text-indigo-600">{numerator}/{denominator}</strong>. The shape represents 1 whole unit divided into {denominator} equal parts, with {numerator} parts shaded in.
                </p>
              </div>
            </div>

            {/* Right Column: Visualization Display */}
            <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100">
              {/* Circle Visualization */}
              <div className="relative w-64 h-64 rounded-full border-4 border-slate-300 overflow-hidden bg-white shadow-inner flex items-center justify-center">
                {/* Visual slices using SVG */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Base Circle */}
                  <circle cx="50" cy="50" r="48" fill="white" stroke="#e2e8f0" strokeWidth="1" />
                  
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
                        fill={isShaded ? "#4f46e5" : "none"}
                        stroke="#94a3b8"
                        strokeWidth="0.5"
                        className="transition-colors duration-300"
                      />
                    );
                  })}
                </svg>
              </div>
              <div className="mt-6 text-center">
                <span className="text-3xl font-extrabold text-slate-800 border-b-2 border-slate-800 px-3 pb-1">{numerator}</span>
                <span className="text-3xl font-extrabold text-slate-800 block mt-1">{denominator}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "read" && (
          <div className="prose max-w-none space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Textbook Summary</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                In mathematics, a <strong>fraction</strong> is a number that represents a part of a whole. It consists of a numerator (the number above the line) and a non-zero denominator (the number below the line).
              </p>
              <p>
                For example, in the fraction <strong>3/4</strong>:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Numerator (3):</strong> Indicates that we are referring to 3 equal parts.</li>
                <li><strong>Denominator (4):</strong> Indicates that the whole object is divided into 4 equal parts in total.</li>
              </ul>
              <p>
                Understanding fractions visually helps in solving real-world sharing problems and sets the foundation for division and proportions.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Quick Check Section */}
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-3xl p-6 border border-emerald-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-emerald-100 text-emerald-700 p-2 rounded-xl">
            <HelpCircle className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Quick Check</h2>
        </div>

        <div className="space-y-4">
          <p className="font-semibold text-slate-800 text-lg">If a pizza is cut into 8 equal slices and you eat 3, what fraction of the pizza is remaining?</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                className={`p-4 rounded-2xl border text-left font-bold transition-all ${
                  selectedAnswer === option.id 
                    ? "bg-indigo-600 border-indigo-600 text-white" 
                    : "bg-white border-slate-200 text-slate-700 hover:border-indigo-300"
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
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8 py-5 mt-4 font-bold"
            >
              Submit Answer
            </Button>
          ) : (
            <div className="mt-4 p-4 bg-white rounded-2xl border border-slate-100 flex items-start gap-3 animate-fade-in">
              {isCorrect ? (
                <div className="bg-emerald-100 p-2 rounded-full text-emerald-600">
                  <Check className="h-5 w-5" />
                </div>
              ) : (
                <div className="bg-red-100 p-2 rounded-full text-red-600">
                  X
                </div>
              )}
              <div>
                <p className={`font-bold ${isCorrect ? "text-emerald-700" : "text-red-700"}`}>
                  {isCorrect ? "Correct! +20 XP Earned" : "Incorrect. Try again next time!"}
                </p>
                <p className="text-sm text-gray-500 mt-1">
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
