"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Clock, Award, AlertCircle, RefreshCw, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 shadow-xl border border-slate-100 text-center space-y-6">
        <div className="inline-flex bg-indigo-100 text-indigo-600 p-4 rounded-full">
          <Award className="h-12 w-12" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">Quiz Completed!</h1>
        <p className="text-gray-500">Great effort! You're making progress.</p>

        <div className="grid grid-cols-3 gap-4 py-6 border-y border-slate-100">
          <div>
            <p className="text-2xl font-bold text-slate-800">{correctCount} / {questions.length}</p>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Score</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800">{accuracy}%</p>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Accuracy</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">+{xpEarned} XP</p>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">XP Earned</p>
          </div>
        </div>

        {accuracy < 70 && (
          <div className="bg-orange-50 border border-orange-100 p-4 rounded-2xl flex items-start gap-3 text-left">
            <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-orange-800">Recommended Practice</h3>
              <p className="text-sm text-orange-700">We recommend practicing adding fractions and finding equivalent fractions.</p>
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <Button onClick={() => router.push("/student/learn")} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full py-6">
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
            }} 
            className="flex-1 border-indigo-200 text-indigo-700 rounded-full py-6"
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
      <div className="flex justify-between items-center bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
        <span className="text-slate-500 font-bold">Question {currentIdx + 1} of {questions.length}</span>
        <span className="flex items-center gap-1.5 font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
          <Clock className="h-4 w-4" /> {timer}s
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
        <div 
          className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentIdx) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
        <h2 className="text-xl font-bold text-slate-800 leading-snug">{currentQuestion.questionText}</h2>
        
        <div className="grid grid-cols-1 gap-3">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOption === option;
            const isCorrect = option === currentQuestion.correctAnswer;
            
            let btnClass = "border-slate-200 text-slate-700 hover:border-indigo-300";
            if (submitted) {
              if (isCorrect) btnClass = "bg-green-500 border-green-500 text-white";
              else if (isSelected) btnClass = "bg-red-500 border-red-500 text-white";
              else btnClass = "opacity-60 border-slate-100 text-slate-400";
            } else if (isSelected) {
              btnClass = "bg-indigo-600 border-indigo-600 text-white";
            }

            return (
              <button
                key={idx}
                disabled={submitted}
                onClick={() => handleOptionSelect(option)}
                className={`p-4 rounded-2xl border text-left font-bold transition-all flex items-center justify-between ${btnClass}`}
              >
                <span>{option}</span>
                {submitted && isCorrect && <CheckCircle className="h-5 w-5 text-white" />}
                {submitted && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-white" />}
              </button>
            );
          })}
        </div>

        {submitted && (
          <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-2 animate-fade-in">
            <h3 className="font-bold text-slate-700">Explanation</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{currentQuestion.explanation}</p>
          </div>
        )}

        <div className="pt-4 flex justify-end">
          {!submitted ? (
            <Button
              disabled={!selectedOption}
              onClick={handleSubmitAnswer}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full px-8 py-5"
            >
              Check Answer
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full px-8 py-5"
            >
              Next Question
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
