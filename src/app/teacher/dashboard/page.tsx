"use client";

import { Users, BookOpen, AlertCircle, FileText, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function TeacherDashboard() {
  const stats = [
    { label: "Total Students", value: "42", icon: Users, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
    { label: "Active Today", value: "35", icon: CheckCircle, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    { label: "Class Average", value: "76%", icon: BookOpen, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
    { label: "Assignments Pending", value: "3", icon: FileText, color: "text-orange-400 bg-orange-500/10 border-orange-500/20" }
  ];

  const alerts = [
    { type: "struggling", text: "12 students are struggling with Fractions.", severity: "high" },
    { type: "topic", text: "Topic 'Fractions' has the lowest average score (48%).", severity: "medium" },
    { type: "milestone", text: "Class 8A achieved 83% completion in Mathematics!", severity: "low" }
  ];

  const studentsList = [
    { name: "Rahul Kumar", progress: 85, score: 92, status: "Active" },
    { name: "Pooja Sharma", progress: 70, score: 55, status: "Struggling" },
    { name: "Amit Patel", progress: 95, score: 98, status: "Active" },
    { name: "Vikram Sen", progress: 40, score: 48, status: "Struggling" }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 md:pb-0">
      <div>
        <h1 className="text-3xl font-black text-white text-glow">Teacher Dashboard</h1>
        <p className="text-slate-400 mt-1 font-medium">Monitor classroom performance and manage educational content</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className={`glass-card border rounded-3xl p-6 shadow-lg flex items-center gap-4 hover:scale-103 transition-transform duration-300 ${stat.color}`}>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">{stat.label}</p>
              <p className="text-2xl font-black text-white mt-0.5 tracking-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Insights Panel */}
        <div className="md:col-span-1 glass-card border border-white/5 rounded-3xl p-6 shadow-xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none"></div>

          <h2 className="text-xl font-bold text-white flex items-center gap-2.5 relative z-10">
            <AlertCircle className="h-5 w-5 text-indigo-400" /> Key Insights
          </h2>
          
          <div className="space-y-4 relative z-10">
            {alerts.map((alert, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border flex items-start gap-3.5 ${
                  alert.severity === "high"
                    ? "bg-red-500/10 border-red-500/25 text-red-200"
                    : alert.severity === "medium"
                    ? "bg-orange-500/10 border-orange-500/25 text-orange-200"
                    : "bg-green-500/10 border-green-500/25 text-green-200"
                }`}
              >
                <div className="mt-0.5">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                </div>
                <p className="text-xs font-semibold leading-relaxed">{alert.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Student Progress Overview */}
        <div className="md:col-span-2 glass-card border border-white/5 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Student Progress Overview</h2>
            <Link href="/teacher/students" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors flex items-center gap-1 text-xs uppercase tracking-wider">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <th className="pb-3.5">Student Name</th>
                  <th className="pb-3.5">Course Completion</th>
                  <th className="pb-3.5">Avg Quiz Score</th>
                  <th className="pb-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs md:text-sm font-semibold text-slate-300">
                {studentsList.map((student, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.01]">
                    <td className="py-4 font-bold text-white">{student.name}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-slate-950/60 h-3 rounded-full overflow-hidden p-0.5 border border-white/5">
                          <div className="bg-indigo-600 h-2 rounded-full shadow-md shadow-indigo-500/20" style={{ width: `${student.progress}%` }}></div>
                        </div>
                        <span className="font-bold text-slate-400 text-xs">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="py-4 font-bold text-slate-200">{student.score}%</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${
                        student.status === "Active" 
                          ? "bg-green-500/10 border-green-500/20 text-green-400" 
                          : "bg-red-500/10 border-red-500/20 text-red-400"
                      }`}>
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
