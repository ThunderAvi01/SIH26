"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Globe2, User, Mail, Lock, MapPin, Hash, Sparkles } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<"STUDENT" | "TEACHER">("STUDENT");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Common inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");

  // Student inputs
  const [age, setAge] = useState("");
  const [classGrade, setClassGrade] = useState("8A");
  const [preferredLanguage, setPreferredLanguage] = useState("Hindi");

  // Teacher inputs
  const [school, setSchool] = useState("");
  const [subject, setSubject] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      role,
      name,
      email: email.toLowerCase().trim(),
      password,
      state,
      district,
      ...(role === "STUDENT" ? { age, classGrade, preferredLanguage } : { school, subject })
    };

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Automatically log in after registration
      const loginRes = await signIn("credentials", {
        email: email.toLowerCase().trim(),
        password,
        redirect: false
      });

      if (loginRes?.error) {
        router.push("/login");
      } else {
        router.push(role === "STUDENT" ? "/student/dashboard" : "/teacher/dashboard");
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-background px-4 py-16">
      {/* Background space glows */}
      <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] rounded-full space-glow-blue opacity-25 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full space-glow-purple opacity-20 blur-[100px] pointer-events-none"></div>

      <div className="max-w-xl w-full glass-card rounded-3xl p-8 relative z-10 shadow-2xl border-white/10">
        <div className="flex flex-col items-center mb-6">
          <Link href="/" className="inline-flex bg-indigo-500/10 p-3.5 rounded-2xl border border-indigo-500/20 mb-4 hover:scale-115 transition-transform duration-300">
            <Globe2 className="h-10 w-10 text-indigo-400" />
          </Link>
          <h2 className="text-3xl font-black text-white text-glow mb-1">Create Account</h2>
          <p className="text-slate-400 text-sm font-medium">Join the GramLearn educational network</p>
        </div>

        {/* Role Toggle */}
        <div className="flex gap-2 p-1.5 bg-slate-900/60 border border-white/5 rounded-2xl mb-8">
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

        {/* Google sign-in alternative */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/student/dashboard" })}
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

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-3 h-5 w-5 text-slate-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 bg-slate-950/40 border border-white/10 rounded-2xl outline-none text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-semibold"
                  placeholder="Rahul Kumar"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3 h-5 w-5 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 bg-slate-950/40 border border-white/10 rounded-2xl outline-none text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-semibold"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3 h-5 w-5 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 bg-slate-950/40 border border-white/10 rounded-2xl outline-none text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-semibold"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">State</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-3 h-5 w-5 text-slate-500" />
                <input
                  type="text"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 bg-slate-950/40 border border-white/10 rounded-2xl outline-none text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-semibold"
                  placeholder="Rajasthan"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">District</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-3 h-5 w-5 text-slate-500" />
                <input
                  type="text"
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 bg-slate-950/40 border border-white/10 rounded-2xl outline-none text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-semibold"
                  placeholder="Jaipur"
                />
              </div>
            </div>

            {role === "STUDENT" ? (
              <>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Age</label>
                  <div className="relative">
                    <Hash className="absolute left-4 top-3 h-5 w-5 text-slate-500" />
                    <input
                      type="number"
                      required
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full pl-12 pr-4 py-2.5 bg-slate-950/40 border border-white/10 rounded-2xl outline-none text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-semibold"
                      placeholder="14"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Class/Grade</label>
                  <select
                    value={classGrade}
                    onChange={(e) => setClassGrade(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-white/10 rounded-2xl outline-none text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-semibold select-custom"
                  >
                    <option value="6">Class 6</option>
                    <option value="7">Class 7</option>
                    <option value="8A">Class 8A</option>
                    <option value="8B">Class 8B</option>
                    <option value="9">Class 9</option>
                    <option value="10">Class 10</option>
                  </select>
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Preferred Language</label>
                  <select
                    value={preferredLanguage}
                    onChange={(e) => setPreferredLanguage(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-white/10 rounded-2xl outline-none text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-semibold select-custom"
                  >
                    <option value="Hindi">Hindi</option>
                    <option value="English">English</option>
                    <option value="Bengali">Bengali</option>
                    <option value="Tamil">Tamil</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">School Name</label>
                  <input
                    type="text"
                    required
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950/40 border border-white/10 rounded-2xl outline-none text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-semibold"
                    placeholder="Jaipur High School"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Primary Subject</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950/40 border border-white/10 rounded-2xl outline-none text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-semibold"
                    placeholder="Mathematics"
                  />
                </div>
              </>
            )}
          </div>

          {error && (
            <div className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-bold text-center">
              {error}
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl py-6 font-bold mt-6 shadow-xl shadow-indigo-600/20 active:scale-98 transition-all">
            {loading ? "Creating account..." : "Register Now"}
          </Button>
        </form>

        <div className="mt-6 text-center text-xs font-bold text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-400 hover:text-indigo-300 hover:underline">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}
