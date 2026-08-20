"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, CheckCircle2, PlayCircle, Star, Trophy } from "lucide-react";
import Link from "next/link";
import { useDataSaver } from "@/context/DataContext";

export default function StudentDashboard() {
  const { studentProfile } = useDataSaver();
  const currentLevel = studentProfile?.level || 1;
  const levelTitles = ["Novice", "Explorer", "Scholar", "Champion", "Grandmaster"];
  const levelTitle = levelTitles[Math.min(currentLevel - 1, levelTitles.length - 1)];
  const dailyGoalXP = 100;
  const currentXP = studentProfile?.xp || 0;
  const progressPercent = Math.min(Math.round((currentXP / dailyGoalXP) * 100), 100);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 md:pb-0">
      
      {/* Welcome & Level Header Banner */}
      <div className="relative overflow-hidden flex flex-col md:flex-row gap-6 items-start md:items-center justify-between bg-gradient-to-r from-indigo-950/80 via-purple-900/50 to-slate-900/80 rounded-3xl p-8 text-white border border-white/5 shadow-2xl">
        <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none"></div>
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-indigo-500/10 blur-2xl"></div>
        
        <div className="space-y-2 relative z-10">
          <h1 className="text-3xl font-black text-glow">
            Good evening, {studentProfile ? studentProfile.name.split(" ")[0] : "Student"} 👋
          </h1>
          <p className="text-slate-300 text-lg font-medium">Ready for today's learning adventure?</p>
        </div>
        
        <div className="relative z-10 bg-white/5 backdrop-blur-md border border-white/10 p-4.5 rounded-2xl flex items-center gap-4.5">
          <div className="bg-indigo-600/20 text-indigo-400 p-3.5 rounded-xl border border-indigo-500/30">
            <Trophy className="h-7 w-7" />
          </div>
          <div>
            <p className="text-indigo-300/80 text-xs font-black uppercase tracking-wider">Level {currentLevel}</p>
            <p className="text-xl font-black text-white">{levelTitle}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Daily Goal Card */}
        <div className="md:col-span-1 glass-card rounded-3xl p-6 shadow-xl border-white/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-white">Daily Goal</h2>
              <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-3.5 py-1 rounded-full text-xs font-bold">
                {currentXP} / {dailyGoalXP} XP
              </span>
            </div>
            
            <div className="w-full bg-slate-950/60 rounded-full h-4.5 mb-3 overflow-hidden p-0.5 border border-white/5">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-3 rounded-full transition-all duration-1000 ease-out shadow-md shadow-indigo-500/30" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-400 text-center font-semibold mt-2.5">
              {currentXP >= dailyGoalXP 
                ? "🎉 Daily goal completed! Keep going!" 
                : `Earn ${dailyGoalXP - currentXP} more XP to reach your daily goal!`}
            </p>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/5">
            <h3 className="text-xs font-bold text-slate-500 mb-3.5 uppercase tracking-wider">Recent Badges</h3>
            <div className="flex gap-2.5">
              <div title="First Lesson" className="h-12 w-12 bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-400 shadow-sm border border-yellow-500/20">
                <Star className="h-5 w-5 fill-yellow-400/20" />
              </div>
              <div title="Perfect Quiz" className="h-12 w-12 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400 shadow-sm border border-indigo-500/20">
                <CheckCircle2 className="h-5 w-5 fill-indigo-400/20" />
              </div>
            </div>
          </div>
        </div>

        {/* Continue Learning & Recommendations */}
        <div className="md:col-span-2 space-y-6">
          <div className="glass-card rounded-3xl p-8 border-white/5 relative overflow-hidden group glass-card-hover">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
              <BookOpen className="h-36 w-36 text-white" />
            </div>
            
            <span className="text-xs font-black uppercase tracking-wider text-indigo-400 mb-2.5 block">Continue Learning</span>
            <h2 className="text-2xl font-black text-white mb-1.5">Mathematics</h2>
            <p className="text-slate-400 text-sm font-semibold mb-6 flex items-center gap-2">
              Algebra <ArrowRight className="h-4 w-4 text-slate-500" /> Linear Equations
            </p>
            
            <Link href="/student/learn/math/linear-equations">
              <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-full px-8 py-5 shadow-lg shadow-indigo-600/20">
                <PlayCircle className="mr-2 h-5 w-5" /> Continue Lesson
              </Button>
            </Link>
          </div>

          {/* Recommended Section */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Recommended for you</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-card rounded-2xl p-5 border-white/5 hover:border-orange-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/5 cursor-pointer">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-orange-400 font-bold text-xs bg-orange-500/10 border border-orange-500/20 px-2.5 py-0.5 rounded-lg">Practice</span>
                  <span className="text-orange-400 text-xs font-bold">+20 XP</span>
                </div>
                <h3 className="font-bold text-white mb-1.5">Fractions Quiz</h3>
                <p className="text-xs text-slate-400 leading-relaxed">Boost your math comprehension with equivalent fraction exercises.</p>
              </div>

              <div className="glass-card rounded-2xl p-5 border-white/5 hover:border-cyan-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/5 cursor-pointer">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-cyan-400 font-bold text-xs bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-lg">New Game</span>
                  <span className="text-cyan-400 text-xs font-bold">+50 XP</span>
                </div>
                <h3 className="font-bold text-white mb-1.5">Solar System Explorer</h3>
                <p className="text-xs text-slate-400 leading-relaxed">Blast off into space to discover astronomical and gravitational metrics.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
