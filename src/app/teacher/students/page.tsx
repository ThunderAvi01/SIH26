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
          <h1 className="text-3xl font-bold text-slate-900">Classroom Management</h1>
          <p className="text-gray-500 mt-1">Add, remove, and track student profiles in your classes</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full">
          <Plus className="h-4 w-4 mr-2" /> Add Student
        </Button>
      </div>

      {/* Add Student Form */}
      {showAddForm && (
        <form onSubmit={handleAddStudent} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-md max-w-xl space-y-4 animate-fade-in">
          <h2 className="text-lg font-bold text-slate-800">Add New Student</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
              <input
                type="text"
                required
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="Rahul Kumar"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={newStudentEmail}
                onChange={(e) => setNewStudentEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="rahul@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class/Grade</label>
              <select
                value={newStudentGrade}
                onChange={(e) => setNewStudentGrade(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white"
              >
                <option value="8A">Class 8A</option>
                <option value="8B">Class 8B</option>
                <option value="9A">Class 9A</option>
                <option value="9B">Class 9B</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full">
              Confirm Add
            </Button>
            <Button type="button" variant="outline" onClick={() => setShowAddForm(false)} className="rounded-full">
              Cancel
            </Button>
          </div>
        </form>
      )}

      {/* Search and Filters */}
      <div className="flex items-center gap-3 bg-white border border-slate-100 rounded-full px-5 py-3 shadow-sm max-w-md">
        <Search className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search students by name or email..."
          className="flex-1 focus:outline-none bg-transparent"
        />
      </div>

      {/* Students List Table */}
      <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 text-xs font-bold uppercase">
                <th className="p-5">Name</th>
                <th className="p-5">Grade</th>
                <th className="p-5">XP Earned</th>
                <th className="p-5">Avg Accuracy</th>
                <th className="p-5">Progress</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/50">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center font-bold text-indigo-700">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{student.name}</p>
                        <p className="text-xs text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                          <Mail className="h-3 w-3" /> {student.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5 font-bold text-slate-600">{student.grade}</td>
                  <td className="p-5 font-bold text-indigo-600">{student.xp} XP</td>
                  <td className="p-5 font-bold text-slate-700">{student.accuracy}%</td>
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${student.progress}%` }}></div>
                      </div>
                      <span className="font-bold text-slate-600">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="p-5 text-right">
                    <button
                      onClick={() => handleRemoveStudent(student.id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-xl hover:bg-red-50 transition-colors"
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
