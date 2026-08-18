"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Gamepad2, LayoutDashboard, LineChart, LogOut, Settings, Trophy, Sparkles } from "lucide-react";
import { signOut } from "next-auth/react";
import { useDataSaver } from "@/context/DataContext";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { dataSaverMode, toggleDataSaverMode, dataUsage } = useDataSaver();

  const navigation = [
    { name: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
    { name: "Learn", href: "/student/learn", icon: BookOpen },
    { name: "Game Zone", href: "/student/games", icon: Gamepad2 },
    { name: "AI Tutor", href: "/student/ai-tutor", icon: Sparkles },
    { name: "Leaderboard", href: "/student/leaderboard", icon: Trophy },
    { name: "Progress", href: "/student/progress", icon: LineChart },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r">
        <div className="p-6 border-b flex items-center gap-2">
          <div className="bg-indigo-100 p-2 rounded-xl">
            <Trophy className="h-6 w-6 text-indigo-600" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-green-500">
            GramLearn
          </span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 font-bold"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium"
                }`}
              >
                <item.icon className={`h-5 w-5 ${isActive ? "text-indigo-600" : ""}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t space-y-2">
          <Link href="/student/settings" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition-all">
            <Settings className="h-5 w-5" />
            Settings
          </Link>
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-medium transition-all"
          >
            <LogOut className="h-5 w-5" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar for mobile, or just top stats bar for desktop */}
        <header className="h-16 bg-white border-b flex items-center justify-end px-6 shadow-sm z-10 gap-4">
          <button
            onClick={toggleDataSaverMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all ${
              dataSaverMode
                ? "bg-orange-500 text-white border-orange-600 shadow-sm"
                : "bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200"
            }`}
            title="Toggles animations, image quality, and video resolutions to save mobile data"
          >
            {dataSaverMode ? "🚀 Data Saver: ON" : "📶 Data Saver: OFF"} ({Math.round(dataUsage)} KB)
          </button>
          <div className="flex items-center gap-4 bg-orange-50 px-4 py-2 rounded-full border border-orange-100">
            <span className="text-orange-600 font-bold flex items-center gap-1">
              🔥 7 Day Streak
            </span>
          </div>
          <div className="flex items-center gap-4 bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100">
            <span className="text-indigo-600 font-bold flex items-center gap-1">
              ⭐ 450 XP
            </span>
          </div>
          <div className="h-10 w-10 bg-indigo-200 rounded-full flex items-center justify-center font-bold text-indigo-800 shadow-inner">
            R
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
      
      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-2 z-50">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center p-2 rounded-lg ${
                isActive ? "text-indigo-600" : "text-gray-400"
              }`}
            >
              <item.icon className="h-6 w-6 mb-1" />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
