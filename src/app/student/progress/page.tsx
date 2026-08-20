"use client";

import { GraduationCap, Star, Flame, Compass } from "lucide-react";
import { useDataSaver } from "@/context/DataContext";

export default function ProgressPage() {
  const { studentProfile } = useDataSaver();

  const stats = [
    { label: "Total XP", value: `${studentProfile?.xp || 0} XP`, icon: Star, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
    { label: "Current Level", value: `Level ${studentProfile?.level || 1}`, icon: GraduationCap, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    { label: "Daily Streak", value: `${studentProfile?.streak || 0} Days`, icon: Flame, color: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
    { label: "Total Coins", value: `${studentProfile?.coins || 0} Coins`, icon: Compass, color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" }
  ];

  const subjects = [
    { name: "Mathematics", completion: 78, color: "from-blue-500 to-indigo-500 shadow-blue-500/20" },
    { name: "Science", completion: 42, color: "from-green-500 to-emerald-500 shadow-emerald-500/20" },
    { name: "English", completion: 65, color: "from-purple-500 to-indigo-500 shadow-purple-500/20" },
    { name: "General Knowledge", completion: 91, color: "from-yellow-500 to-amber-500 shadow-amber-500/20" }
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
        <h1 className="text-3xl font-black text-white text-glow">Your Progress</h1>
        <p className="text-slate-400 mt-1 font-medium">Track your learning achievements and stats</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className={`glass-card border rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:scale-103 transition-transform duration-300 ${stat.color}`}>
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{stat.label}</span>
              <stat.icon className="h-5 w-5 opacity-80" />
            </div>
            <p className="text-2xl font-black text-white mt-4 tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Subject Progress */}
        <div className="md:col-span-2 glass-card border border-white/5 rounded-3xl p-6 shadow-xl space-y-6">
          <h2 className="text-xl font-bold text-white">Subject-wise Completion</h2>
          <div className="space-y-5">
            {subjects.map((sub, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span>{sub.name}</span>
                  <span>{sub.completion}%</span>
                </div>
                <div className="w-full bg-slate-950/60 h-3.5 rounded-full overflow-hidden p-0.5 border border-white/5">
                  <div className={`h-2 rounded-full bg-gradient-to-r ${sub.color} shadow-md transition-all duration-1000`} style={{ width: `${sub.completion}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Streak Tracker Info Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-600/40 via-red-900/20 to-slate-950/80 rounded-3xl p-6 text-white border border-orange-500/20 shadow-xl flex flex-col justify-between group">
          <div className="absolute inset-0 bg-grid-white/[0.01] pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full blur-xl pointer-events-none"></div>
          
          <div className="space-y-2 relative z-10">
            <h2 className="text-xl font-black text-glow">Keep the Fire Burning!</h2>
            <p className="text-orange-200 text-xs leading-relaxed font-semibold">You are on a {studentProfile?.streak || 0}-day streak. Log in tomorrow to increase your streak and earn double XP bonuses!</p>
          </div>
          <div className="flex justify-center py-6 relative z-10">
            <Flame className="h-24 w-24 fill-orange-500/10 stroke-orange-400 animate-pulse-slow drop-shadow-[0_0_12px_rgba(251,146,60,0.4)]" />
          </div>
        </div>
      </div>

      {/* Badges Showcase */}
      <div className="glass-card border border-white/5 rounded-3xl p-6 shadow-xl space-y-6">
        <h2 className="text-xl font-bold text-white">Unlocked Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {badges.map((badge, idx) => (
            <div
              key={idx}
              className={`border rounded-2xl p-4 text-center space-y-3.5 transition-all duration-300 ${
                badge.unlocked 
                  ? "bg-slate-900/60 border-indigo-500/20 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-1" 
                  : "bg-slate-950/40 border-white/5 opacity-30 grayscale cursor-not-allowed"
              }`}
            >
              <span className="text-4xl block select-none filter drop-shadow-md">{badge.icon}</span>
              <div>
                <h3 className="font-bold text-white text-xs mb-1">{badge.title}</h3>
                <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
