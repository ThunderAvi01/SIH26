"use client";

import { useState } from "react";
import { Plus, Search, Trash2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ClassManagementPage() {
  const [students, setStudents] = useState([
    { id: 1, name: "Rahul Kumar", email: "rahul@demo.com", grade: "8A", xp: 950, accuracy: 92, progress: 85 },
    { id: 2, name: "Priya Patel", email: "priya@demo.com", grade: "8A", xp: 1100, accuracy: 88, progress: 70 },
    { id: 3, name: "Aarav Sharma", email: "aarav@demo.com", grade: "8B", xp: 1250, accuracy: 95, progress: 95 },
    { id: 4, name: "Sneha Reddy", email: "sneha@demo.com", grade: "8A", xp: 780, accuracy: 82, progress: 60 },
    { id: 5, name: "Vikram Sen", email: "vikram@demo.com", grade: "8B", xp: 690, accuracy: 76, progress: 40 }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentEmail, setNewStudentEmail] = useState("");
  const [newStudentGrade, setNewStudentGrade] = useState("8A");
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName || !newStudentEmail) return;

    const newStudent = {
      id: Date.now(),
      name: newStudentName,
      email: newStudentEmail,
      grade: newStudentGrade,
      xp: 0,
      accuracy: 0,
      progress: 0
    };

    setStudents([...students, newStudent]);
    setNewStudentName("");
    setNewStudentEmail("");
    setShowAddForm(false);
  };

  const handleRemoveStudent = (id: number) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 md:pb-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white text-glow">Classroom Management</h1>
          <p className="text-slate-400 mt-1 font-medium">Add, remove, and track student profiles in your classes</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-indigo-600 hover:bg-indigo-500 border border-indigo-500/25 text-white rounded-full font-bold px-6 shadow-lg shadow-indigo-600/10 active:scale-95 transition-transform">
          <Plus className="h-4 w-4 mr-2" /> Add Student
        </Button>
      </div>

      {/* Add Student Form */}
      {showAddForm && (
        <form onSubmit={handleAddStudent} className="glass-card border-white/5 rounded-3xl p-6 shadow-2xl max-w-xl space-y-5 animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none"></div>

          <h2 className="text-lg font-bold text-white relative z-10">Add New Student</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Student Name</label>
              <input
                type="text"
                required
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950/40 border border-white/10 rounded-2xl outline-none text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-semibold text-sm"
                placeholder="Rahul Kumar"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Email Address</label>
              <input
                type="email"
                required
                value={newStudentEmail}
                onChange={(e) => setNewStudentEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950/40 border border-white/10 rounded-2xl outline-none text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-semibold text-sm"
                placeholder="rahul@example.com"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Class/Grade</label>
              <select
                value={newStudentGrade}
                onChange={(e) => setNewStudentGrade(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-white/10 rounded-2xl outline-none text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-semibold text-sm select-custom"
              >
                <option value="8A">Class 8A</option>
                <option value="8B">Class 8B</option>
                <option value="9A">Class 9A</option>
                <option value="9B">Class 9B</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-2 relative z-10">
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-500 border border-indigo-500/25 text-white rounded-full font-bold px-6">
              Confirm Add
            </Button>
            <Button type="button" variant="outline" onClick={() => setShowAddForm(false)} className="border-white/10 text-slate-200 hover:bg-white/5 rounded-full px-6">
              Cancel
            </Button>
          </div>
        </form>
      )}

      {/* Search and Filters */}
      <div className="flex items-center gap-3 bg-slate-900/60 border border-white/5 rounded-full px-5 py-3.5 shadow-xl max-w-md">
        <Search className="h-5 w-5 text-slate-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search students by name or email..."
          className="flex-1 focus:outline-none bg-transparent text-white text-sm font-semibold"
        />
      </div>

      {/* Students List Table */}
      <div className="glass-card border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-slate-900/40 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="p-5">Name</th>
                <th className="p-5">Grade</th>
                <th className="p-5">XP Earned</th>
                <th className="p-5">Avg Accuracy</th>
                <th className="p-5">Progress</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs md:text-sm font-semibold text-slate-300">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-white/[0.01]">
                  <td className="p-5">
                    <div className="flex items-center gap-3.5">
                      <div className="h-10 w-10 bg-slate-900 border border-white/10 rounded-xl flex items-center justify-center font-bold text-indigo-400">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-white">{student.name}</p>
                        <p className="text-[11px] text-slate-500 font-semibold flex items-center gap-1.5 mt-0.5">
                          <Mail className="h-3.5 w-3.5" /> {student.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5 font-bold text-slate-400">{student.grade}</td>
                  <td className="p-5 font-bold text-indigo-400">{student.xp} XP</td>
                  <td className="p-5 font-bold text-slate-200">{student.accuracy}%</td>
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-slate-950/60 h-3 rounded-full overflow-hidden p-0.5 border border-white/5">
                        <div className="bg-emerald-500 h-2 rounded-full shadow-md shadow-emerald-500/20" style={{ width: `${student.progress}%` }}></div>
                      </div>
                      <span className="font-bold text-slate-400 text-xs">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="p-5 text-right">
                    <button
                      onClick={() => handleRemoveStudent(student.id)}
                      className="text-red-400 hover:text-red-300 p-2.5 rounded-xl hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all cursor-pointer active:scale-95"
                      title="Remove Student"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
