import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Brain, Gamepad2, Globe2, LineChart, Users, Star, Trophy, ArrowUpRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-background">
      {/* Decorative Space Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full space-glow-blue opacity-50 blur-[80px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full space-glow-purple opacity-40 blur-[100px] pointer-events-none animate-pulse-slow"></div>

      {/* Header */}
      <header className="px-6 lg:px-14 h-20 flex items-center border-b border-white/5 backdrop-blur-xl bg-background/40 sticky top-0 z-50">
        <Link className="flex items-center justify-center group" href="#">
          <div className="bg-indigo-600/10 p-2 rounded-xl border border-indigo-500/20 group-hover:border-indigo-500/40 transition-all">
            <Globe2 className="h-7 w-7 text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <span className="ml-3 text-2xl font-extrabold tracking-tight text-white">
            Gram<span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">Learn</span>
          </span>
        </Link>
        <nav className="ml-auto flex gap-6 sm:gap-8 items-center">
          <Link className="text-sm font-semibold text-slate-300 hover:text-white transition-colors" href="#features">
            Features
          </Link>
          <Link className="text-sm font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1 group" href="/login?role=teacher">
            Teacher Portal
            <ArrowUpRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </Link>
          <Link href="/login">
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-6 py-5 font-bold shadow-lg shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95">
              Start Learning
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="w-full py-24 md:py-36 lg:py-48 flex items-center justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-10 text-center">
              <div className="space-y-6 max-w-4xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs font-bold text-indigo-300 border-indigo-500/20 animate-bounce">
                  <Star className="h-3.5 w-3.5 fill-indigo-400 text-indigo-400" />
                  India's Educational Digital Bridge
                </div>
                <h1 className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl/none text-white leading-tight">
                  Learning Should Have<br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 text-glow">
                    No Boundaries.
                  </span>
                </h1>
                <p className="mx-auto max-w-[800px] text-slate-400 md:text-xl/relaxed lg:text-2xl/relaxed font-medium">
                  An interactive, gamified digital learning platform designed to make quality school education engaging, accessible, and rewarding for students in rural India.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login">
                  <Button size="lg" className="rounded-full px-10 py-7 text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-xl shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all">
                    Start Learning Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/login?role=teacher">
                  <Button size="lg" variant="outline" className="rounded-full px-10 py-7 text-lg font-bold border-white/10 text-slate-200 hover:bg-white/5 hover:text-white backdrop-blur-md transition-all">
                    Teacher Portal
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="w-full py-24 border-t border-white/5 bg-background/20 relative">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl text-white">
                Bridging the Educational Gap
              </h2>
              <p className="max-w-[700px] text-slate-400 md:text-lg font-medium">
                Rural students deserve the same opportunities. We target key challenges with modern tools.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-8 glass-card rounded-3xl glass-card-hover border-red-500/10">
                <div className="p-4 bg-red-500/10 rounded-2xl mb-6 border border-red-500/20">
                  <Users className="h-8 w-8 text-red-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Teacher Accessibility</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Connecting remote classrooms with structured curriculum support and digital modules.</p>
              </div>
              <div className="flex flex-col items-center text-center p-8 glass-card rounded-3xl glass-card-hover border-orange-500/10">
                <div className="p-4 bg-orange-500/10 rounded-2xl mb-6 border border-orange-500/20">
                  <BookOpen className="h-8 w-8 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Resource Scarcity</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Providing visual, animated, and simplified learning materials tailored for regional contexts.</p>
              </div>
              <div className="flex flex-col items-center text-center p-8 glass-card rounded-3xl glass-card-hover border-cyan-500/10">
                <div className="p-4 bg-cyan-500/10 rounded-2xl mb-6 border border-cyan-500/20">
                  <Globe2 className="h-8 w-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Digital Divide</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Optimized client architecture designed to save mobile data and run smoothly on budget smartphones.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution & Features Section */}
        <section id="features" className="w-full py-24 border-t border-white/5 bg-background/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-20">
              <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl text-white">
                The GramLearn Solution
              </h2>
              <p className="max-w-[700px] text-slate-400 md:text-lg font-medium">
                Learn, Play, Practice, Earn, Compete, and Improve.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Gamepad2, title: "Gamified Learning", desc: "Earn XP, unlock trophies, and track your streak as you complete lessons and interactive challenges.", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
                { icon: Brain, title: "AI Learning Assistant", desc: "Get personalized explanations, localized rural analogies, and prompt quiz creation from your AI tutor.", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
                { icon: LineChart, title: "Progress Visualization", desc: "Track subject completions, level thresholds, leaderboard standings, and check class analytics.", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
              ].map((feature, i) => (
                <div key={i} className="group relative overflow-hidden rounded-3xl glass-card p-8 glass-card-hover border-white/5">
                  <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                    <feature.icon className="h-36 w-36 text-white" />
                  </div>
                  <div className={`inline-flex p-4 rounded-2xl mb-6 border ${feature.color}`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-indigo-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-8 border-t border-white/5 bg-background/60 backdrop-blur-md">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between text-slate-400">
          <p className="text-sm font-medium">© 2026 GramLearn (SIH 25048). Built for digital education in India.</p>
          <div className="flex gap-6 mt-4 md:mt-0 font-semibold">
            <Link className="text-sm hover:text-white transition-colors" href="#">Terms</Link>
            <Link className="text-sm hover:text-white transition-colors" href="#">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
