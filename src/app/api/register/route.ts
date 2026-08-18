import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import StudentProfile from "@/models/StudentProfile";
import TeacherProfile from "@/models/TeacherProfile";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { email, password, role, name, state, district } = body;

    if (!email || !password || !role || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      role
    });

    if (role === "STUDENT") {
      const { age, classGrade, preferredLanguage } = body;
      await StudentProfile.create({
        user: user._id,
        name,
        age: Number(age) || 14,
        classGrade: classGrade || "8A",
        state: state || "",
        district: district || "",
        preferredLanguage: preferredLanguage || "Hindi"
      });
    } else if (role === "TEACHER") {
      const { school, subject } = body;
      await TeacherProfile.create({
        user: user._id,
        name,
        school: school || "",
        subject: subject || "",
        state: state || "",
        district: district || ""
      });
    }

    return NextResponse.json({ success: true, message: "User registered successfully!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
