"use client";

import { useState, useEffect } from "react";
import { Gamepad2, Play, Trophy, Clock, Zap, Star, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDataSaver } from "@/context/DataContext";

export default function GameZonePage() {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const { fetchProfile } = useDataSaver();
  
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
  const [hasSubmittedProgress, setHasSubmittedProgress] = useState(false);

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
    setHasSubmittedProgress(false);
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

  useEffect(() => {
    if (!isGameOver || score === 0 || hasSubmittedProgress) return;
    const xp = Math.round(score / 2);
    if (xp > 0) {
      setHasSubmittedProgress(true);
      fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ xpEarned: xp, activityType: "GAME" }),
      })
        .then((res) => {
          if (res.ok) {
            fetchProfile();
          } else {
            setHasSubmittedProgress(false);
          }
        })
        .catch((err) => {
          console.error("Error saving game progress:", err);
          setHasSubmittedProgress(false);
        });
    } else {
      setHasSubmittedProgress(true);
    }
  }, [isGameOver, score, fetchProfile, hasSubmittedProgress]);

  const gamesList = [
    {
      id: "number-challenge",
      title: "Number Challenge",
      desc: "Solve fast-paced equations to test your mental arithmetic speed!",
      subject: "Mathematics",
      difficulty: "Medium",
      xpReward: "+50 XP",
      playable: true,
      color: "bg-blue-500/10 text-blue-400 border-blue-500/20"
    },
    {
      id: "solar-system",
      title: "Solar System Quiz Game",
      desc: "Navigate space and answer physics & astronomy questions to reach home.",
      subject: "Science",
      difficulty: "Hard",
      xpReward: "+60 XP",
      playable: false,
      color: "bg-green-500/10 text-green-400 border-green-500/20"
    },
    {
      id: "vocabulary-quest",
      title: "Vocabulary Quest",
      desc: "Fight spelling monsters by building correct words and sentences.",
      subject: "English",
      difficulty: "Easy",
      xpReward: "+40 XP",
      playable: false,
      color: "bg-purple-500/10 text-purple-400 border-purple-500/20"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 md:pb-0">
      <div>
        <h1 className="text-3xl font-black text-white text-glow">Game Zone</h1>
        <p className="text-slate-400 mt-1 font-medium">Learn concepts by playing interactive games</p>
      </div>

      {!activeGame ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {gamesList.map((game) => (
            <div key={game.id} className="glass-card rounded-3xl p-6 shadow-xl border-white/5 flex flex-col justify-between glass-card-hover group">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${game.color}`}>{game.subject}</span>
                  <span className="text-xs font-bold text-slate-500">{game.difficulty}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{game.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6 font-medium">{game.desc}</p>
              </div>

              <div className="flex items-center justify-between pt-4.5 border-t border-white/5">
                <span className="text-xs font-black text-indigo-400 flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-indigo-400/20" /> {game.xpReward}
                </span>
                {game.playable ? (
                  <Button onClick={() => setActiveGame(game.id)} className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold px-5 active:scale-95 transition-transform">
                    <Play className="h-4 w-4 mr-2 fill-white" /> Play Now
                  </Button>
                ) : (
                  <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Coming Soon</span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-3xl p-8 shadow-xl border-white/5 relative overflow-hidden">
          {/* Decorative glows */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"></div>

          {/* Game Header */}
          <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4.5 relative z-10">
            <h2 className="text-2xl font-black text-white text-glow">Number Challenge</h2>
            <Button variant="ghost" onClick={() => setActiveGame(null)} className="text-indigo-400 font-bold hover:bg-indigo-500/10 rounded-full px-5 py-2.5">
              Exit Game
            </Button>
          </div>

          {/* Game Body */}
          <div className="relative z-10">
            {!gameStarted ? (
              <div className="text-center py-12 space-y-6">
                <div className="inline-flex bg-indigo-500/10 p-6 rounded-full text-indigo-400 mb-4 animate-bounce border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
                  <Gamepad2 className="h-16 w-16" />
                </div>
                <h3 className="text-2xl font-black text-white">Ready to play?</h3>
                <p className="text-slate-400 max-w-md mx-auto text-sm leading-relaxed font-semibold">You will have 30 seconds to solve as many arithmetic equations as possible. Correct answers give 10 points!</p>
                <Button onClick={startNumberChallenge} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-50 hover:to-purple-50 text-white font-bold rounded-full px-12 py-6 text-lg shadow-lg shadow-indigo-600/20 active:scale-95 transition-transform">
                  Start Game
                </Button>
              </div>
            ) : isGameOver ? (
              <div className="text-center py-12 space-y-6">
                <div className="inline-flex bg-yellow-500/10 p-6 rounded-full text-yellow-400 mb-4 border border-yellow-500/20">
                  <Trophy className="h-16 w-16" />
                </div>
                <h3 className="text-3xl font-black text-white">Time's Up!</h3>
                <p className="text-slate-400 text-sm font-semibold">Your final score: <strong className="text-indigo-400 text-2xl font-black ml-1.5">{score} points</strong></p>
                
                <div className="bg-indigo-500/10 rounded-2xl p-4 max-w-xs mx-auto border border-indigo-500/20 shadow-md shadow-indigo-500/5">
                  <p className="text-indigo-300 font-bold flex items-center justify-center gap-1.5">
                    <Star className="h-4.5 w-4.5 fill-indigo-400/20" /> Earned +{Math.round(score / 2)} XP!
                  </p>
                </div>

                <div className="flex gap-4 justify-center">
                  <Button onClick={startNumberChallenge} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full px-8 py-5 shadow-lg shadow-indigo-600/15">
                    <RefreshCw className="h-4 w-4 mr-2" /> Play Again
                  </Button>
                  <Button variant="outline" onClick={() => setActiveGame(null)} className="border-white/10 text-slate-200 hover:bg-white/5 hover:text-white rounded-full px-8 py-5">
                    Back to Zone
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-8 max-w-md mx-auto">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-4 py-2 rounded-full shadow-sm">
                    <Clock className="h-4.5 w-4.5" /> {timeLeft}s
                  </span>
                  <span className="flex items-center gap-2 font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full shadow-sm">
                    <Zap className="h-4.5 w-4.5" /> Score: {score}
                  </span>
                </div>

                <div className="bg-slate-950/60 border border-white/5 rounded-3xl p-8 text-center text-5xl font-black text-white text-glow shadow-inner select-none animate-float">
                  {num1} <span className="text-indigo-400">{operator === "*" ? "×" : operator}</span> {num2} = ?
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option)}
                      className="bg-slate-950/40 border border-white/10 hover:border-indigo-500/60 rounded-2xl p-5 text-2xl font-black text-slate-300 hover:text-white transition-all duration-300 shadow-md flex items-center justify-center cursor-pointer active:scale-95"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
