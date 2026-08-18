"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, CheckCircle2, PlayCircle, Star, Trophy } from "lucide-react";
import Link from "next/link";

export default function StudentDashboard() {
  const currentLevel = 2;
  const levelTitle = "Explorer";
  const dailyGoalXP = 30;
  const currentXP = 18;
  const progressPercent = Math.round((currentXP / dailyGoalXP) * 100);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 md:pb-0">
      
      {/* Welcome & Level Header */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Good evening, Rahul 👋</h1>
          <p className="text-indigo-100 text-lg">Ready for today's learning adventure?</p>
        </div>
        <div className="bg-white/20 backdrop-blur-md border border-white/30 p-4 rounded-2xl flex items-center gap-4">
          <div className="bg-white text-indigo-600 p-3 rounded-xl shadow-sm">
            <Trophy className="h-8 w-8" />
          </div>
          <div>
            <p className="text-indigo-50 text-sm font-medium uppercase tracking-wider">Level {currentLevel}</p>
            <p className="text-xl font-bold">{levelTitle}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Daily Goal Card */}
        <div className="md:col-span-1 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-800">Daily Goal</h2>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                {currentXP} / {dailyGoalXP} XP
              </span>
            </div>
            
            <div className="w-full bg-slate-100 rounded-full h-4 mb-2 overflow-hidden">
              <div 
                className="bg-green-500 h-4 rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 text-center mt-2">Earn 12 more XP to reach your daily goal!</p>
          </div>
          
          <div className="mt-6 pt-6 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">Recent Badges</h3>
            <div className="flex gap-2">
              <div title="First Lesson" className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 shadow-sm border border-yellow-200">
                <Star className="h-6 w-6" />
              </div>
              <div title="Perfect Quiz" className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shadow-sm border border-blue-200">
                <CheckCircle2 className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Continue Learning */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <BookOpen className="h-32 w-32 text-indigo-600" />
            </div>
            
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 mb-2 block">Continue Learning</span>
            <h2 className="text-2xl font-bold text-slate-800 mb-1">Mathematics</h2>
            <p className="text-slate-500 mb-6 flex items-center gap-2">
              Algebra <ArrowRight className="h-4 w-4" /> Linear Equations
            </p>
            
            <Link href="/student/learn/math/linear-equations">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 shadow-md">
                <PlayCircle className="mr-2 h-5 w-5" /> Continue Lesson
              </Button>
            </Link>
          </div>

          {/* Recommended Section */}
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-4">Recommended for you</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 hover:shadow-sm transition-shadow cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-orange-600 font-bold text-sm bg-orange-100 px-2 py-1 rounded-md">Practice</span>
                  <span className="text-orange-500 text-xs font-bold">+20 XP</span>
                </div>
                <h3 className="font-bold text-slate-800 mb-1">Fractions Quiz</h3>
                <p className="text-sm text-slate-600">You need a bit more practice here.</p>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 hover:shadow-sm transition-shadow cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-blue-600 font-bold text-sm bg-blue-100 px-2 py-1 rounded-md">New Game</span>
                  <span className="text-blue-500 text-xs font-bold">+50 XP</span>
                </div>
                <h3 className="font-bold text-slate-800 mb-1">Solar System Explorer</h3>
                <p className="text-sm text-slate-600">Try our new interactive science game.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
