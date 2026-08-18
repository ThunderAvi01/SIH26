"use client";

import { Users, BookOpen, AlertCircle, FileText, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function TeacherDashboard() {
  const stats = [
    { label: "Total Students", value: "42", icon: Users, color: "text-indigo-600 bg-indigo-50" },
    { label: "Active Today", value: "35", icon: CheckCircle, color: "text-green-600 bg-green-50" },
    { label: "Class Average", value: "76%", icon: BookOpen, color: "text-blue-600 bg-blue-50" },
    { label: "Assignments Pending", value: "3", icon: FileText, color: "text-orange-600 bg-orange-50" }
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
        <h1 className="text-3xl font-bold text-slate-900">Teacher Dashboard</h1>
        <p className="text-gray-500 mt-1">Monitor classroom performance and manage educational content</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex items-center gap-4">
            <div className={`p-3.5 rounded-2xl ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-extrabold text-slate-800 mt-0.5">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Alerts Panel */}
        <div className="md:col-span-1 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-indigo-600" /> Key Insights
          </h2>
          
          <div className="space-y-4">
            {alerts.map((alert, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border flex items-start gap-3 ${
                  alert.severity === "high"
                    ? "bg-red-50 border-red-100 text-red-900"
                    : alert.severity === "medium"
                    ? "bg-orange-50 border-orange-100 text-orange-950"
                    : "bg-green-50 border-green-100 text-green-950"
                }`}
              >
                <div className="mt-0.5">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                </div>
                <p className="text-sm font-semibold leading-relaxed">{alert.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Student Progress Overview */}
        <div className="md:col-span-2 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800">Student Progress Overview</h2>
            <Link href="/teacher/students" className="text-indigo-600 font-bold hover:underline flex items-center gap-1 text-sm">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-xs font-bold uppercase">
                  <th className="pb-3">Student Name</th>
                  <th className="pb-3">Course Completion</th>
                  <th className="pb-3">Avg Quiz Score</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm">
                {studentsList.map((student, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-4 font-bold text-slate-800">{student.name}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${student.progress}%` }}></div>
                        </div>
                        <span className="font-bold text-slate-600">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="py-4 font-bold text-slate-700">{student.score}%</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        student.status === "Active" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-red-100 text-red-700"
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
