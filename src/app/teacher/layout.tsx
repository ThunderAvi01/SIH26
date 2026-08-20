"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, LayoutDashboard, LogOut, Settings, Users, FileText } from "lucide-react";
import { signOut } from "next-auth/react";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/teacher/dashboard", icon: LayoutDashboard },
    { name: "Classroom", href: "/teacher/students", icon: Users },
    { name: "Create Content", href: "/teacher/content", icon: FileText },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex w-64 flex-col glass-panel border-r border-white/5 z-20">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="bg-indigo-600/20 p-2.5 rounded-xl border border-indigo-500/30">
            <Users className="h-6 w-6 text-indigo-400" />
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
          <Link href="/teacher/settings" className="flex items-center gap-3.5 px-4.5 py-3 text-slate-400 hover:bg-white/5 hover:text-slate-200 rounded-2xl font-semibold border border-transparent transition-all">
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

        {/* Header */}
        <header className="h-20 bg-slate-950/40 border-b border-white/5 flex items-center justify-between px-6 md:px-8 backdrop-blur-xl z-10 relative">
          <span className="text-xs font-black text-indigo-400 bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20 shadow-md">
            🏫 Jaipur Rural High School
          </span>
          <div className="flex items-center gap-3.5">
            <span className="text-xs font-black text-slate-300 uppercase tracking-wider">Teacher Portal</span>
            <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20 border border-white/10 select-none">
              T
            </div>
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
