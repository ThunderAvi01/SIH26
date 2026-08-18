import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Brain, Gamepad2, Globe2, LineChart, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-6 lg:px-14 h-16 flex items-center border-b backdrop-blur-md bg-white/50 sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="#">
          <Globe2 className="h-8 w-8 text-indigo-600" />
          <span className="ml-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-green-500">
            GramLearn
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:text-indigo-600 transition-colors" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-indigo-600 transition-colors" href="/login?role=teacher">
            Teacher Portal
          </Link>
          <Link href="/login">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6">
              Start Learning
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-48 bg-gradient-to-br from-indigo-50 via-white to-green-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4 max-w-4xl">
                <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl/none text-slate-900">
                  Learning Should Have <span className="text-indigo-600">No Boundaries.</span>
                </h1>
                <p className="mx-auto max-w-[800px] text-gray-600 md:text-xl/relaxed lg:text-2xl/relaxed font-medium">
                  An interactive digital learning platform designed to make quality education accessible, engaging, and rewarding for every student in rural India.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login">
                  <Button size="lg" className="rounded-full px-8 text-lg bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200">
                    Start Learning Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/login?role=teacher">
                  <Button size="lg" variant="outline" className="rounded-full px-8 text-lg border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                    Teacher Portal
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="w-full py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Bridging the Educational Gap</h2>
              <p className="max-w-[700px] text-gray-500 md:text-lg">
                Rural students often face challenges that limit their potential. We are here to change that.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 bg-red-50 rounded-2xl">
                <div className="p-4 bg-red-100 rounded-full mb-4">
                  <Users className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Teacher Accessibility</h3>
                <p className="text-gray-600">Limited access to quality teachers and personalized attention in remote areas.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-orange-50 rounded-2xl">
                <div className="p-4 bg-orange-100 rounded-full mb-4">
                  <BookOpen className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Resource Scarcity</h3>
                <p className="text-gray-600">Lack of engaging, interactive, and visual learning materials in regional languages.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-2xl">
                <div className="p-4 bg-blue-100 rounded-full mb-4">
                  <Globe2 className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Digital Divide</h3>
                <p className="text-gray-600">Poor internet connectivity and access to only low-end smartphones.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution & Features Section */}
        <section id="features" className="w-full py-20 bg-slate-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-slate-900">The GramLearn Solution</h2>
              <p className="max-w-[700px] text-gray-500 md:text-lg">
                Learn, Play, Practice, Earn, Compete, and Improve.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Gamepad2, title: "Gamified Learning", desc: "Earn XP, unlock badges, and level up as you complete lessons and quizzes.", color: "bg-purple-100 text-purple-600" },
                { icon: Brain, title: "AI Learning Assistant", desc: "Get personalized help, simple explanations, and interactive examples from your AI Tutor.", color: "bg-blue-100 text-blue-600" },
                { icon: LineChart, title: "Concept Visualization", desc: "Understand complex topics visually through interactive diagrams and animations.", color: "bg-green-100 text-green-600" },
              ].map((feature, i) => (
                <div key={i} className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm hover:shadow-lg transition-all border border-slate-100">
                  <div className={`inline-flex p-3 rounded-xl mb-4 ${feature.color}`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600 transition-colors">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-6 bg-slate-900 text-slate-400">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm">© 2026 GramLearn (SIH 25048). Built for India.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link className="text-sm hover:text-white" href="#">Terms</Link>
            <Link className="text-sm hover:text-white" href="#">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
