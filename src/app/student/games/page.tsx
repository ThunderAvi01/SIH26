"use client";

import { useState, useEffect } from "react";
import { Gamepad2, Play, Trophy, Clock, Zap, Star, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GameZonePage() {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  
  // Game states for "Number Challenge"
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState("+");
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const generateQuestion = () => {
    const operators = ["+", "-", "*"];
    const op = operators[Math.floor(Math.random() * operators.length)];
    let n1 = 0;
    let n2 = 0;
    let ans = 0;

    if (op === "+") {
      n1 = Math.floor(Math.random() * 20) + 1;
      n2 = Math.floor(Math.random() * 20) + 1;
      ans = n1 + n2;
    } else if (op === "-") {
      n1 = Math.floor(Math.random() * 20) + 10;
      n2 = Math.floor(Math.random() * n1) + 1;
      ans = n1 - n2;
    } else {
      n1 = Math.floor(Math.random() * 10) + 1;
      n2 = Math.floor(Math.random() * 10) + 1;
      ans = n1 * n2;
    }

    setNum1(n1);
    setNum2(n2);
    setOperator(op);
    setCorrectAnswer(ans);

    // Generate options
    const opts = new Set<number>();
    opts.add(ans);
    while (opts.size < 4) {
      const offset = Math.floor(Math.random() * 10) - 5;
      if (offset !== 0) {
        const wrongAns = ans + offset;
        if (wrongAns >= 0) opts.add(wrongAns);
      }
    }
    setOptions(Array.from(opts).sort(() => Math.random() - 0.5));
  };

  const handleAnswer = (selected: number) => {
    if (selected === correctAnswer) {
      setScore((prev) => prev + 10);
      generateQuestion();
    } else {
      generateQuestion();
    }
  };

  const startNumberChallenge = () => {
    setScore(0);
    setTimeLeft(30);
    setIsGameOver(false);
    setGameStarted(true);
    generateQuestion();
  };

  useEffect(() => {
    if (!gameStarted || isGameOver) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameStarted, isGameOver]);

  const gamesList = [
    {
      id: "number-challenge",
      title: "Number Challenge",
      desc: "Solve fast-paced calculations to test your mental math speed!",
      subject: "Mathematics",
      difficulty: "Medium",
      xpReward: "+50 XP",
      playable: true
    },
    {
      id: "solar-system",
      title: "Solar System Quiz Game",
      desc: "Navigate space and answer physics & astronomy questions to reach home.",
      subject: "Science",
      difficulty: "Hard",
      xpReward: "+60 XP",
      playable: false
    },
    {
      id: "vocabulary-quest",
      title: "Vocabulary Quest",
      desc: "Fight spelling monsters by building correct words and sentences.",
      subject: "English",
      difficulty: "Easy",
      xpReward: "+40 XP",
      playable: false
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 md:pb-0">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Game Zone</h1>
        <p className="text-gray-500 mt-1 font-medium">Learn concepts by playing interactive games</p>
      </div>

      {!activeGame ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gamesList.map((game) => (
            <div key={game.id} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">{game.subject}</span>
                  <span className="text-xs font-bold text-slate-400">{game.difficulty}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{game.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">{game.desc}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <span className="text-sm font-bold text-indigo-600 flex items-center gap-1">
                  <Star className="h-4 w-4 fill-indigo-100" /> {game.xpReward}
                </span>
                {game.playable ? (
                  <Button onClick={() => setActiveGame(game.id)} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full">
                    <Play className="h-4 w-4 mr-2" /> Play Now
                  </Button>
                ) : (
                  <span className="text-xs font-bold text-slate-400 uppercase">Coming Soon</span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-md">
          {/* Game Header */}
          <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
            <h2 className="text-2xl font-bold text-slate-800">Number Challenge</h2>
            <Button variant="ghost" onClick={() => setActiveGame(null)} className="text-indigo-600 font-bold hover:bg-indigo-50 rounded-full">
              Exit Game
            </Button>
          </div>

          {/* Game Body */}
          {!gameStarted ? (
            <div className="text-center py-12 space-y-6">
              <div className="inline-flex bg-indigo-50 p-6 rounded-full text-indigo-600 mb-4 animate-bounce">
                <Gamepad2 className="h-16 w-16" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Ready to play?</h3>
              <p className="text-gray-500 max-w-md mx-auto">You will have 30 seconds to solve as many arithmetic equations as possible. Correct answers give 10 points!</p>
              <Button onClick={startNumberChallenge} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full px-12 py-6 text-lg">
                Start Game
              </Button>
            </div>
          ) : isGameOver ? (
            <div className="text-center py-12 space-y-6">
              <div className="inline-flex bg-yellow-50 p-6 rounded-full text-yellow-600 mb-4">
                <Trophy className="h-16 w-16" />
              </div>
              <h3 className="text-3xl font-extrabold text-slate-800">Time's Up!</h3>
              <p className="text-gray-500">Your final score: <strong className="text-indigo-600 text-xl">{score} points</strong></p>
              
              <div className="bg-indigo-50 rounded-2xl p-4 max-w-xs mx-auto border border-indigo-100">
                <p className="text-indigo-900 font-bold">✨ Earned +{Math.round(score / 2)} XP!</p>
              </div>

              <div className="flex gap-4 justify-center">
                <Button onClick={startNumberChallenge} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full px-8">
                  <RefreshCw className="h-4 w-4 mr-2" /> Play Again
                </Button>
                <Button variant="outline" onClick={() => setActiveGame(null)} className="border-indigo-200 text-indigo-700 rounded-full px-8">
                  Back to Zone
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-8 max-w-md mx-auto">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5 font-bold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full">
                  <Clock className="h-4 w-4" /> {timeLeft}s
                </span>
                <span className="flex items-center gap-1.5 font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full">
                  <Zap className="h-4 w-4" /> Score: {score}
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 text-center text-5xl font-extrabold text-slate-800">
                {num1} {operator} {num2} = ?
              </div>

              <div className="grid grid-cols-2 gap-4">
                {options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option)}
                    className="bg-white border-2 border-slate-200 hover:border-indigo-500 rounded-2xl p-5 text-2xl font-extrabold text-slate-700 hover:text-indigo-600 transition-all shadow-sm flex items-center justify-center cursor-pointer"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
