"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Globe2, Mail, Lock } from "lucide-react";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get("role") === "teacher" ? "TEACHER" : "STUDENT";
  
  const [role, setRole] = useState(defaultRole);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email: email.toLowerCase().trim(), // Make lowercase to prevent casing errors
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push(role === "STUDENT" ? "/student/dashboard" : "/teacher/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="max-w-md w-full glass-card rounded-3xl p-8 relative z-10 shadow-2xl border-white/10">
      <div className="flex flex-col items-center mb-8">
        <Link href="/" className="inline-flex bg-indigo-500/10 p-3.5 rounded-2xl border border-indigo-500/20 mb-4 hover:scale-115 transition-transform duration-300">
          <Globe2 className="h-10 w-10 text-indigo-400" />
        </Link>
        <h2 className="text-3xl font-black text-white text-glow mb-1">Welcome Back</h2>
        <p className="text-slate-400 text-sm font-medium">Sign in to your GramLearn portal</p>
      </div>

      {/* Role Toggle Tabs */}
      <div className="flex gap-2 p-1.5 bg-slate-900/60 border border-white/5 rounded-2xl mb-6">
        <button
          type="button"
          onClick={() => setRole("STUDENT")}
          className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${
            role === "STUDENT"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          🎓 Student
        </button>
        <button
          type="button"
          onClick={() => setRole("TEACHER")}
          className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${
            role === "TEACHER"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          🏫 Teacher
        </button>
      </div>

      {/* Google Sign-in */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: role === "STUDENT" ? "/student/dashboard" : "/teacher/dashboard" })}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all duration-300 text-slate-200 font-bold text-sm cursor-pointer active:scale-98"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Continue with Google
        </button>
        <div className="flex items-center my-5">
          <div className="flex-grow border-t border-white/5"></div>
          <span className="mx-4 text-xs font-bold uppercase tracking-wider text-slate-500">or use credentials</span>
          <div className="flex-grow border-t border-white/5"></div>
        </div>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-950/40 border border-white/10 rounded-2xl outline-none text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-semibold"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-950/40 border border-white/10 rounded-2xl outline-none text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-semibold"
              placeholder="••••••••"
            />
          </div>
        </div>
        
        {error && (
          <div className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-bold text-center animate-shake">
            {error}
          </div>
        )}
        
        <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl py-6 font-bold mt-6 shadow-xl shadow-indigo-600/20 active:scale-98 transition-all">
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="mt-6 text-center text-xs font-bold text-slate-400">
        Don't have an account?{" "}
        <Link href="/register" className="text-indigo-400 hover:text-indigo-300 hover:underline">
          Register here
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-background px-4 py-12">
      {/* Background Space Glows */}
      <div className="absolute top-[20%] left-[20%] w-[350px] h-[350px] rounded-full space-glow-blue opacity-30 blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[20%] w-[350px] h-[350px] rounded-full space-glow-purple opacity-25 blur-[80px] pointer-events-none"></div>

      <Suspense fallback={
        <div className="glass-card rounded-3xl p-8 max-w-md w-full flex flex-col items-center justify-center border-white/10 min-h-[400px]">
          <div className="text-indigo-400 font-extrabold text-lg animate-pulse">Loading portal...</div>
        </div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}
