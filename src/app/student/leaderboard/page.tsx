"use client";

import { useState } from "react";
import { Trophy, MapPin, School, Globe } from "lucide-react";

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
        <h1 className="text-3xl font-bold text-slate-900">Leaderboard</h1>
        <p className="text-gray-500 mt-1">See where you stand and compete with others!</p>
      </div>

      {/* Tab Switcher */}
      <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100">
        {[
          { id: "global", label: "Global", icon: Globe },
          { id: "school", label: "School", icon: School },
          { id: "district", label: "District", icon: MapPin }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === tab.id ? "bg-indigo-600 text-white shadow-md" : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4 items-end pt-8 pb-4">
        {/* 2nd Place */}
        <div className="flex flex-col items-center space-y-2">
          <div className="relative">
            <div className="h-16 w-16 bg-slate-100 rounded-full border-2 border-slate-300 flex items-center justify-center font-bold text-slate-700 text-lg shadow-md">
              {students[1].avatar}
            </div>
            <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-slate-300 text-slate-800 font-extrabold text-xs px-2 py-0.5 rounded-full shadow-sm">2</span>
          </div>
          <div className="text-center">
            <p className="font-bold text-sm text-slate-800 truncate max-w-[80px]">{students[1].name}</p>
            <p className="text-xs text-indigo-600 font-bold">{students[1].xp} XP</p>
          </div>
          <div className="bg-slate-200 w-full h-24 rounded-t-2xl shadow-inner"></div>
        </div>

        {/* 1st Place */}
        <div className="flex flex-col items-center space-y-2">
          <div className="relative">
            <div className="h-20 w-20 bg-yellow-50 rounded-full border-4 border-yellow-400 flex items-center justify-center font-bold text-yellow-700 text-xl shadow-lg ring-4 ring-yellow-400/20">
              {students[0].avatar}
            </div>
            <Trophy className="absolute -top-8 left-1/2 transform -translate-x-1/2 h-8 w-8 text-yellow-500 drop-shadow-md animate-bounce" />
            <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-950 font-extrabold text-xs px-2.5 py-0.5 rounded-full shadow-sm">1</span>
          </div>
          <div className="text-center">
            <p className="font-extrabold text-slate-800 truncate max-w-[100px]">{students[0].name}</p>
            <p className="text-sm text-indigo-600 font-extrabold">{students[0].xp} XP</p>
          </div>
          <div className="bg-yellow-400 w-full h-32 rounded-t-2xl shadow-md border-t-4 border-yellow-300"></div>
        </div>

        {/* 3rd Place */}
        <div className="flex flex-col items-center space-y-2">
          <div className="relative">
            <div className="h-14 w-14 bg-orange-50 rounded-full border-2 border-orange-300 flex items-center justify-center font-bold text-orange-700 text-lg shadow-md">
              {students[2].avatar}
            </div>
            <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-300 text-orange-800 font-extrabold text-xs px-2 py-0.5 rounded-full shadow-sm">3</span>
          </div>
          <div className="text-center">
            <p className="font-bold text-sm text-slate-800 truncate max-w-[80px]">{students[2].name}</p>
            <p className="text-xs text-indigo-600 font-bold">{students[2].xp} XP</p>
          </div>
          <div className="bg-orange-200 w-full h-16 rounded-t-2xl shadow-inner"></div>
        </div>
      </div>

      {/* Leaderboard Table List */}
      <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
        <div className="divide-y divide-slate-100">
          {students.map((student) => (
            <div
              key={student.rank}
              className={`flex items-center justify-between p-5 transition-colors ${
                student.isSelf ? "bg-indigo-50/50 border-y border-indigo-100/50" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <span className={`w-6 font-extrabold text-center ${
                  student.rank === 1 ? "text-yellow-500" : student.rank === 2 ? "text-slate-400" : student.rank === 3 ? "text-orange-500" : "text-slate-400"
                }`}>
                  #{student.rank}
                </span>
                <div className="h-10 w-10 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-700">
                  {student.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 flex items-center gap-1.5">
                    {student.name}
                    {student.isSelf && <span className="bg-indigo-100 text-indigo-700 text-[10px] px-2 py-0.5 rounded-full font-extrabold">YOU</span>}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">{student.school}</p>
                </div>
              </div>

              <span className="font-extrabold text-indigo-600">{student.xp} XP</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
