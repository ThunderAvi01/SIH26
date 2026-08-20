"use client";

import { useState } from "react";
import { Trophy, MapPin, School, Globe, Star } from "lucide-react";

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<"global" | "school" | "district">("global");

  const students = [
    { rank: 1, name: "Aarav Sharma", xp: 1250, school: "Govt High School, Jaipur", district: "Jaipur", avatar: "A" },
    { rank: 2, name: "Priya Patel", xp: 1100, school: "Adarsh Vidyalaya, Jaipur", district: "Jaipur", avatar: "P" },
    { rank: 3, name: "Rahul Kumar", xp: 950, school: "Rural Model School, Jaipur", district: "Jaipur", avatar: "R", isSelf: true },
    { rank: 4, name: "Amit Singh", xp: 820, school: "Govt High School, Jaipur", district: "Jaipur", avatar: "A" },
    { rank: 5, name: "Sneha Reddy", xp: 780, school: "Vikas Academy, Jaipur", district: "Jaipur", avatar: "S" },
    { rank: 6, name: "Vikram Sen", xp: 690, school: "Rural Model School, Jaipur", district: "Jaipur", avatar: "V" }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20 md:pb-0">
      <div>
        <h1 className="text-3xl font-black text-white text-glow">Leaderboard</h1>
        <p className="text-slate-400 mt-1 font-medium">See where you stand and compete with others!</p>
      </div>

      {/* Tab Switcher */}
      <div className="flex bg-slate-900/60 p-1.5 border border-white/5 rounded-2xl">
        {[
          { id: "global", label: "Global", icon: Globe },
          { id: "school", label: "School", icon: School },
          { id: "district", label: "District", icon: MapPin }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === tab.id 
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/15" 
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Top 3 Podium (3D Style) */}
      <div className="grid grid-cols-3 gap-4 items-end pt-12 pb-6 px-4">
        {/* 2nd Place */}
        <div className="flex flex-col items-center space-y-3">
          <div className="relative">
            <div className="h-16 w-16 bg-slate-800 rounded-full border-2 border-slate-400 flex items-center justify-center font-bold text-slate-200 text-lg shadow-lg relative">
              {students[1].avatar}
            </div>
            <span className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-slate-400 border border-slate-300 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full shadow-md">
              2nd
            </span>
          </div>
          <div className="text-center select-none">
            <p className="font-bold text-xs text-white truncate max-w-[80px]">{students[1].name}</p>
            <p className="text-[10px] text-indigo-400 font-extrabold flex items-center justify-center gap-1">
              <Star className="h-3 w-3 fill-indigo-400/20" /> {students[1].xp} XP
            </p>
          </div>
          <div className="bg-gradient-to-b from-slate-700/40 to-slate-950/80 w-full h-24 rounded-t-3xl border-t border-x border-slate-500/20 shadow-2xl relative">
            <div className="absolute inset-0 bg-grid-white/[0.01] pointer-events-none rounded-t-3xl"></div>
          </div>
        </div>

        {/* 1st Place */}
        <div className="flex flex-col items-center space-y-3">
          <div className="relative">
            <div className="h-20 w-20 bg-slate-800 rounded-full border-4 border-yellow-500 flex items-center justify-center font-bold text-yellow-500 text-xl shadow-2xl ring-4 ring-yellow-500/10 relative">
              {students[0].avatar}
            </div>
            <Trophy className="absolute -top-9 left-1/2 transform -translate-x-1/2 h-8 w-8 text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)] animate-bounce" />
            <span className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-yellow-500 border border-yellow-400 text-yellow-950 font-black text-[10px] px-2.5 py-0.5 rounded-full shadow-md">
              1st
            </span>
          </div>
          <div className="text-center select-none">
            <p className="font-black text-sm text-white truncate max-w-[100px] text-glow">{students[0].name}</p>
            <p className="text-xs text-yellow-400 font-extrabold flex items-center justify-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400/20" /> {students[0].xp} XP
            </p>
          </div>
          <div className="bg-gradient-to-b from-yellow-500/20 to-slate-950/80 w-full h-32 rounded-t-3xl border-t border-x border-yellow-500/30 shadow-2xl relative">
            <div className="absolute inset-0 bg-grid-white/[0.01] pointer-events-none rounded-t-3xl"></div>
          </div>
        </div>

        {/* 3rd Place */}
        <div className="flex flex-col items-center space-y-3">
          <div className="relative">
            <div className="h-14 w-14 bg-slate-800 rounded-full border-2 border-orange-500/70 flex items-center justify-center font-bold text-orange-400 text-lg shadow-lg relative">
              {students[2].avatar}
            </div>
            <span className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-orange-600 border border-orange-500 text-orange-955 font-black text-[10px] px-2.5 py-0.5 rounded-full shadow-md">
              3rd
            </span>
          </div>
          <div className="text-center select-none">
            <p className="font-bold text-xs text-white truncate max-w-[80px]">{students[2].name}</p>
            <p className="text-[10px] text-indigo-400 font-extrabold flex items-center justify-center gap-1">
              <Star className="h-3 w-3 fill-indigo-400/20" /> {students[2].xp} XP
            </p>
          </div>
          <div className="bg-gradient-to-b from-orange-500/10 to-slate-950/80 w-full h-16 rounded-t-3xl border-t border-x border-orange-500/20 shadow-2xl relative">
            <div className="absolute inset-0 bg-grid-white/[0.01] pointer-events-none rounded-t-3xl"></div>
          </div>
        </div>
      </div>

      {/* Leaderboard Table List */}
      <div className="glass-card rounded-3xl overflow-hidden shadow-2xl border-white/5">
        <div className="divide-y divide-white/5">
          {students.map((student) => (
            <div
              key={student.rank}
              className={`flex items-center justify-between p-5 transition-all duration-300 ${
                student.isSelf 
                  ? "bg-indigo-500/10 border-y border-indigo-500/20 shadow-inner" 
                  : "hover:bg-white/[0.02]"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className={`w-8 font-black text-xs text-center ${
                  student.rank === 1 
                    ? "text-yellow-400 text-glow" 
                    : student.rank === 2 
                    ? "text-slate-300" 
                    : student.rank === 3 
                    ? "text-orange-400" 
                    : "text-slate-500"
                }`}>
                  #{student.rank}
                </span>
                <div className="h-10 w-10 bg-slate-900 border border-white/10 rounded-xl flex items-center justify-center font-bold text-slate-300">
                  {student.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-white flex items-center gap-2 text-sm md:text-base">
                    {student.name}
                    {student.isSelf && <span className="bg-indigo-500/20 text-indigo-400 text-[9px] px-2.5 py-0.5 rounded-full font-black border border-indigo-500/20">YOU</span>}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-semibold">{student.school}</p>
                </div>
              </div>

              <span className={`font-black text-sm md:text-base ${student.isSelf ? "text-indigo-400 text-glow" : "text-slate-300"}`}>
                {student.xp} XP
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
