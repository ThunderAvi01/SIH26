"use client";

import { GraduationCap, Star, Flame, Compass } from "lucide-react";

export default function ProgressPage() {
  const stats = [
    { label: "Total XP", value: "450 XP", icon: Star, color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
    { label: "Current Level", value: "Level 2", icon: GraduationCap, color: "text-green-600 bg-green-50 border-green-100" },
    { label: "Daily Streak", value: "7 Days", icon: Flame, color: "text-orange-600 bg-orange-50 border-orange-100" },
    { label: "Total Coins", value: "120 Coins", icon: Compass, color: "text-yellow-600 bg-yellow-50 border-yellow-100" }
  ];

  const subjects = [
    { name: "Mathematics", completion: 78, color: "bg-blue-500" },
    { name: "Science", completion: 42, color: "bg-green-500" },
    { name: "English", completion: 65, color: "bg-purple-500" },
    { name: "General Knowledge", completion: 91, color: "bg-yellow-500" }
  ];

  const badges = [
    { title: "First Lesson", desc: "Completed your first lesson on GramLearn.", icon: "⭐", unlocked: true },
    { title: "Quiz Master", desc: "Scored 100% on any quiz.", icon: "🏆", unlocked: true },
    { title: "7 Day Streak", desc: "Active learning for 7 days in a row.", icon: "🔥", unlocked: true },
    { title: "Science Hero", desc: "Finished all Science quizzes.", icon: "🧬", unlocked: false },
    { title: "Speed Demon", desc: "Answered game question in under 1s.", icon: "⚡", unlocked: false }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 md:pb-0">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Your Progress</h1>
        <p className="text-gray-500 mt-1">Track your learning achievements and stats</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className={`bg-white border rounded-2xl p-5 shadow-sm flex flex-col justify-between ${stat.color}`}>
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{stat.label}</span>
              <stat.icon className="h-5 w-5 opacity-70" />
            </div>
            <p className="text-2xl font-extrabold text-slate-800 mt-4">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Subject Progress */}
        <div className="md:col-span-2 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-800">Subject-wise Completion</h2>
          <div className="space-y-4">
            {subjects.map((sub, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-sm font-bold text-slate-700">
                  <span>{sub.name}</span>
                  <span>{sub.completion}%</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div className={`h-3 rounded-full ${sub.color}`} style={{ width: `${sub.completion}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Streak Tracker Info */}
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-6 text-white shadow-lg flex flex-col justify-between">
          <div className="space-y-2">
            <h2 className="text-xl font-extrabold">Keep the Fire Burning!</h2>
            <p className="text-orange-100 text-sm leading-relaxed">You are on a 7-day streak. Log in tomorrow to increase your streak and earn double XP bonuses!</p>
          </div>
          <div className="flex justify-center py-6">
            <Flame className="h-24 w-24 fill-white/20 stroke-white animate-pulse" />
          </div>
        </div>
      </div>

      {/* Badges Showcase */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-800">Unlocked Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {badges.map((badge, idx) => (
            <div
              key={idx}
              className={`border rounded-2xl p-4 text-center space-y-3 transition-all ${
                badge.unlocked 
                  ? "bg-slate-50 border-indigo-100 hover:shadow-sm" 
                  : "bg-slate-50/50 border-slate-100 opacity-40 grayscale"
              }`}
            >
              <span className="text-4xl block">{badge.icon}</span>
              <h3 className="font-bold text-slate-800 text-sm">{badge.title}</h3>
              <p className="text-[10px] text-slate-500 leading-tight">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
