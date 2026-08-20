"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Clock, Award, AlertCircle, RefreshCw, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDataSaver } from "@/context/DataContext";

interface Question {
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const chapterId = params.chapterId as string;
  const { fetchProfile } = useDataSaver();

  // Sample data loaded dynamically
  const questions: Question[] = [
    {
      questionText: "What is 1/2 + 1/4?",
      options: ["2/6", "3/4", "1/6", "2/4"],
      correctAnswer: "3/4",
      explanation: "To add fractions with different denominators, find the common denominator. The least common multiple of 2 and 4 is 4. 1/2 becomes 2/4. Then, 2/4 + 1/4 = 3/4."
    },
    {
      questionText: "Which fraction is equivalent to 2/3?",
      options: ["4/6", "3/2", "2/6", "6/8"],
      correctAnswer: "4/6",
      explanation: "If you multiply the numerator and the denominator of 2/3 by the same number (in this case, 2), you get an equivalent fraction: (2*2)/(3*2) = 4/6."
    },
    {
      questionText: "If a shape is divided into 5 equal parts and 2 are shaded, what is the fraction of shaded parts?",
      options: ["3/5", "5/2", "2/5", "1/5"],
      correctAnswer: "2/5",
      explanation: "The numerator represents the parts shaded (2) and the denominator represents the total equal parts (5), making it 2/5."
    }
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [timer, setTimer] = useState(60);
  const [quizFinished, setQuizFinished] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [hasSubmittedProgress, setHasSubmittedProgress] = useState(false);

  useEffect(() => {
    if (quizFinished) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setQuizFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [quizFinished]);

  useEffect(() => {
    if (!quizFinished || hasSubmittedProgress) return;

    const correctCount = answers.filter(Boolean).length;
    const xp = correctCount * 25; // 25 XP per correct answer
    setXpEarned(xp);

    if (xp > 0) {
      setHasSubmittedProgress(true);
      fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ xpEarned: xp, activityType: "QUIZ" }),
      })
        .then((res) => {
          if (res.ok) {
            fetchProfile();
          } else {
            setHasSubmittedProgress(false);
          }
        })
        .catch((err) => {
          console.error("Error saving quiz progress:", err);
          setHasSubmittedProgress(false);
        });
    } else {
      setHasSubmittedProgress(true);
    }
  }, [quizFinished, answers, fetchProfile, hasSubmittedProgress]);


  const handleNext = () => {
    setSelectedOption(null);
    setSubmitted(false);
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Calculate XP and finish
      const correctCount = answers.filter(Boolean).length;
      const xp = correctCount * 25; // 25 XP per correct answer
      setXpEarned(xp);
      setQuizFinished(true);
    }
  };

  const handleOptionSelect = (option: string) => {
    if (submitted) return;
    setSelectedOption(option);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || submitted) return;
    const correct = selectedOption === questions[currentIdx].correctAnswer;
    setAnswers([...answers, correct]);
    setSubmitted(true);
  };

  if (quizFinished) {
    const correctCount = answers.filter(Boolean).length;
    const accuracy = Math.round((correctCount / questions.length) * 100);

    return (
      <div className="max-w-xl mx-auto glass-card rounded-3xl p-8 shadow-2xl border-white/5 text-center space-y-6 relative overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"></div>

        <div className="inline-flex bg-indigo-500/10 text-indigo-400 p-4 rounded-full border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
          <Award className="h-12 w-12" />
        </div>
        <h1 className="text-3xl font-black text-white text-glow">Quiz Completed!</h1>
        <p className="text-slate-400 font-semibold text-sm">Great effort! You're making progress.</p>

        <div className="grid grid-cols-3 gap-4 py-6 border-y border-white/5">
          <div className="bg-slate-950/40 p-3 rounded-2xl border border-white/5">
            <p className="text-2xl font-black text-white">{correctCount} / {questions.length}</p>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-wider mt-1">Score</p>
          </div>
          <div className="bg-slate-950/40 p-3 rounded-2xl border border-white/5">
            <p className="text-2xl font-black text-white">{accuracy}%</p>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-wider mt-1">Accuracy</p>
          </div>
          <div className="bg-emerald-500/10 p-3 rounded-2xl border border-emerald-500/20">
            <p className="text-2xl font-black text-emerald-400">+{xpEarned} XP</p>
            <p className="text-[10px] text-emerald-500/80 font-black uppercase tracking-wider mt-1">XP Earned</p>
          </div>
        </div>

        {accuracy < 70 && (
          <div className="bg-orange-500/10 border border-orange-500/20 p-4.5 rounded-2xl flex items-start gap-3.5 text-left">
            <AlertCircle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-orange-300 text-sm">Recommended Practice</h3>
              <p className="text-xs text-orange-400/90 leading-relaxed font-semibold mt-0.5">We recommend practicing adding fractions and finding equivalent fractions.</p>
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <Button onClick={() => router.push("/student/learn")} className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-full py-6 font-bold shadow-lg shadow-indigo-600/15">
            Back to Lessons
          </Button>
          <Button 
            variant="outline" 
            onClick={() => {
              setCurrentIdx(0);
              setSelectedOption(null);
              setSubmitted(false);
              setAnswers([]);
              setTimer(60);
              setQuizFinished(false);
              setHasSubmittedProgress(false);
            }} 
            className="flex-1 border-white/10 text-slate-200 hover:bg-white/5 rounded-full py-6 font-bold"
          >
            <RefreshCw className="h-4 w-4 mr-2" /> Try Again
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIdx];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-slate-900/60 rounded-2xl p-4 shadow-xl border border-white/5 relative overflow-hidden">
        <span className="text-slate-300 font-bold text-sm">Question {currentIdx + 1} of {questions.length}</span>
        <span className="flex items-center gap-1.5 font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3.5 py-1.5 rounded-full text-xs">
          <Clock className="h-4 w-4" /> {timer}s
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-950/60 h-3.5 rounded-full overflow-hidden p-0.5 border border-white/5">
        <div 
          className="bg-indigo-600 h-2 rounded-full transition-all duration-300 shadow-md shadow-indigo-500/30"
          style={{ width: `${((currentIdx) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question Card */}
      <div className="glass-card rounded-3xl p-6 md:p-8 shadow-xl border-white/5 space-y-6 relative">
        <h2 className="text-xl font-bold text-white leading-snug">{currentQuestion.questionText}</h2>
        
        <div className="grid grid-cols-1 gap-3.5">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOption === option;
            const isCorrect = option === currentQuestion.correctAnswer;
            
            let btnClass = "bg-slate-950/40 border-white/10 text-slate-300 hover:border-indigo-500/40";
            if (submitted) {
              if (isCorrect) btnClass = "bg-emerald-500/20 border-emerald-500/40 text-emerald-400 shadow-lg shadow-emerald-500/5";
              else if (isSelected) btnClass = "bg-red-500/20 border-red-500/40 text-red-400 shadow-lg shadow-red-500/5";
              else btnClass = "opacity-40 border-white/5 text-slate-500 cursor-not-allowed";
            } else if (isSelected) {
              btnClass = "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/15";
            }

            return (
              <button
                key={idx}
                disabled={submitted}
                onClick={() => handleOptionSelect(option)}
                className={`p-4.5 rounded-2xl border text-left font-bold transition-all duration-300 flex items-center justify-between cursor-pointer ${btnClass}`}
              >
                <span>{option}</span>
                {submitted && isCorrect && <CheckCircle className="h-5.5 w-5.5 text-emerald-400 fill-emerald-400/10" />}
                {submitted && isSelected && !isCorrect && <XCircle className="h-5.5 w-5.5 text-red-400 fill-red-400/10" />}
              </button>
            );
          })}
        </div>

        {submitted && (
          <div className="bg-slate-950/60 border border-white/5 p-5 rounded-2xl space-y-1.5 animate-fade-in">
            <h3 className="font-bold text-indigo-400 text-sm">Explanation</h3>
            <p className="text-slate-300 text-xs leading-relaxed font-semibold">{currentQuestion.explanation}</p>
          </div>
        )}

        <div className="pt-4 flex justify-end">
          {!submitted ? (
            <Button
              disabled={!selectedOption}
              onClick={handleSubmitAnswer}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full px-8 py-5 border border-indigo-500/20 active:scale-95 shadow-lg shadow-indigo-600/10"
            >
              Check Answer
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full px-8 py-5 border border-indigo-500/20 active:scale-95 shadow-lg shadow-indigo-600/10"
            >
              Next Question
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
