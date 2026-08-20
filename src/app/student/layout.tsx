"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Gamepad2, LayoutDashboard, LineChart, LogOut, Settings, Trophy, Sparkles, Flame, Star } from "lucide-react";
import { signOut } from "next-auth/react";
import { useDataSaver } from "@/context/DataContext";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { dataSaverMode, toggleDataSaverMode, dataUsage, studentProfile, fetchProfile } = useDataSaver();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const navigation = [
    { name: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
    { name: "Learn", href: "/student/learn", icon: BookOpen },
    { name: "Game Zone", href: "/student/games", icon: Gamepad2 },
    { name: "AI Tutor", href: "/student/ai-tutor", icon: Sparkles },
    { name: "Leaderboard", href: "/student/leaderboard", icon: Trophy },
    { name: "Progress", href: "/student/progress", icon: LineChart },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex w-64 flex-col glass-panel border-r border-white/5 z-20">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="bg-indigo-600/20 p-2.5 rounded-xl border border-indigo-500/30">
            <Trophy className="h-6 w-6 text-indigo-400" />
          </div>
          <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 text-glow">
            GramLearn
          </span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto mt-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3.5 px-4.5 py-3 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "bg-indigo-600/25 border border-indigo-500/35 text-white font-bold shadow-md shadow-indigo-600/10"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-200 font-semibold border border-transparent"
                }`}
              >
                <item.icon className={`h-5 w-5 transition-transform duration-300 ${isActive ? "text-indigo-400 scale-110" : "text-slate-400"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-1.5 mt-auto">
          <Link href="/student/settings" className="flex items-center gap-3.5 px-4.5 py-3 text-slate-400 hover:bg-white/5 hover:text-slate-200 rounded-2xl font-semibold border border-transparent transition-all">
            <Settings className="h-5 w-5" />
            Settings
          </Link>
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full flex items-center gap-3.5 px-4.5 py-3 text-red-400 hover:bg-red-500/10 rounded-2xl font-semibold border border-transparent transition-all"
          >
            <LogOut className="h-5 w-5" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Decorative Space Glows */}
        <div className="absolute top-[10%] right-[10%] w-[300px] h-[300px] rounded-full space-glow-blue opacity-10 blur-[80px] pointer-events-none z-0"></div>

        {/* Topbar for mobile, or just top stats bar for desktop */}
        <header className="h-20 bg-slate-950/40 border-b border-white/5 flex items-center justify-end px-6 md:px-8 backdrop-blur-xl z-10 gap-3 md:gap-4 relative">
          
          {/* Data Saver Mode */}
          <button
            onClick={toggleDataSaverMode}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-bold transition-all duration-300 ${
              dataSaverMode
                ? "bg-orange-500 text-white border-orange-600 shadow-lg shadow-orange-500/20"
                : "bg-slate-900/60 text-slate-300 hover:bg-slate-900 border-white/5"
            }`}
            title="Toggles animations, image quality, and video resolutions to save mobile data"
          >
            {dataSaverMode ? "🚀 Data Saver: ON" : "📶 Data Saver: OFF"} ({Math.round(dataUsage)} KB)
          </button>

          {/* Streak pill */}
          <div className="flex items-center gap-2 bg-orange-500/10 px-4.5 py-2.5 rounded-full border border-orange-500/20 shadow-md shadow-orange-500/5">
            <Flame className="h-4.5 w-4.5 text-orange-400 fill-orange-400/20" />
            <span className="text-orange-400 font-bold text-xs">
              {studentProfile ? `${studentProfile.streak} Day Streak` : "0 Day Streak"}
            </span>
          </div>

          {/* XP Pill */}
          <div className="flex items-center gap-2 bg-indigo-500/10 px-4.5 py-2.5 rounded-full border border-indigo-500/20 shadow-md shadow-indigo-500/5">
            <Star className="h-4.5 w-4.5 text-indigo-400 fill-indigo-400/20" />
            <span className="text-indigo-400 font-bold text-xs">
              {studentProfile ? `${studentProfile.xp} XP` : "0 XP"}
            </span>
          </div>

          {/* Avatar initial */}
          <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20 border border-white/10 select-none">
            {studentProfile ? studentProfile.name.charAt(0).toUpperCase() : "S"}
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 relative z-10 bg-slate-950/20 pb-24 md:pb-8">
          {children}
        </div>
      </main>
      
      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-950/80 border-t border-white/5 backdrop-blur-xl flex justify-around p-2.5 z-40">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center p-2 rounded-2xl transition-all duration-300 ${
                isActive ? "text-indigo-400" : "text-slate-400"
              }`}
            >
              <item.icon className="h-5.5 w-5.5 mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
