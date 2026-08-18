import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import StudentProfile from "@/models/StudentProfile";
import TeacherProfile from "@/models/TeacherProfile";
import bcrypt from "bcrypt";

export async function GET() {
  try {
    await connectToDatabase();

    // 1. Clean up existing data
    await User.deleteMany({});
    await StudentProfile.deleteMany({});
    await TeacherProfile.deleteMany({});

    // 2. Hash passwords
    const studentPassword = await bcrypt.hash("Student@123", 10);
    const teacherPassword = await bcrypt.hash("Teacher@123", 10);

    // 3. Create Seed Students
    const studentsData = [
      { email: "student@demo.com", name: "Rahul Kumar", age: 14, grade: "8A" },
      { email: "priya@demo.com", name: "Priya Patel", age: 13, grade: "8A" },
      { email: "aarav@demo.com", name: "Aarav Sharma", age: 14, grade: "8B" },
      { email: "sneha@demo.com", name: "Sneha Reddy", age: 14, grade: "8A" },
      { email: "vikram@demo.com", name: "Vikram Sen", age: 13, grade: "8B" },
      { email: "amit@demo.com", name: "Amit Singh", age: 14, grade: "8B" },
      { email: "pooja@demo.com", name: "Pooja Sharma", age: 13, grade: "8A" },
      { email: "rohit@demo.com", name: "Rohit Verma", age: 14, grade: "8B" },
      { email: "ananya@demo.com", name: "Ananya Das", age: 13, grade: "8A" },
      { email: "karan@demo.com", name: "Karan Johar", age: 14, grade: "8B" },
    ];

    const seededStudents = [];
    for (const s of studentsData) {
      const user = await User.create({
        email: s.email,
        password: studentPassword,
        role: "STUDENT"
      });

      await StudentProfile.create({
        user: user._id,
        name: s.name,
        age: s.age,
        classGrade: s.grade,
        state: "Rajasthan",
        district: "Jaipur",
        preferredLanguage: "Hindi",
        xp: Math.floor(Math.random() * 800) + 100,
        level: 2,
        coins: Math.floor(Math.random() * 200) + 50,
        streak: Math.floor(Math.random() * 10) + 1
      });

      seededStudents.push({ email: s.email, name: s.name });
    }

    // 4. Create Seed Teachers
    const teachersData = [
      { email: "teacher@demo.com", name: "Dr. Alok Verma", school: "Jaipur Rural High School", subject: "Mathematics" },
      { email: "science_teacher@demo.com", name: "Mrs. Sunita Roy", school: "Jaipur Rural High School", subject: "Science" },
      { email: "english_teacher@demo.com", name: "Mr. Rajan Dey", school: "Jaipur Rural High School", subject: "English" }
    ];

    const seededTeachers = [];
    for (const t of teachersData) {
      const user = await User.create({
        email: t.email,
        password: teacherPassword,
        role: "TEACHER"
      });

      await TeacherProfile.create({
        user: user._id,
        name: t.name,
        school: t.school,
        subject: t.subject,
        state: "Rajasthan",
        district: "Jaipur"
      });

      seededTeachers.push({ email: t.email, name: t.name });
    }

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully!",
      studentsCount: seededStudents.length,
      teachersCount: seededTeachers.length,
      credentials: {
        student: { email: "student@demo.com", password: "Student@123" },
        teacher: { email: "teacher@demo.com", password: "Teacher@123" }
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
