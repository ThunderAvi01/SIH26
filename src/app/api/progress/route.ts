import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import StudentProfile from "@/models/StudentProfile";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "STUDENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { xpEarned, activityType } = await req.json();
    if (!xpEarned || typeof xpEarned !== "number") {
      return NextResponse.json({ error: "Invalid XP value" }, { status: 400 });
    }

    await connectToDatabase();

    const student = await StudentProfile.findOne({ user: session.user.id });
    if (!student) {
      return NextResponse.json({ error: "Student profile not found" }, { status: 404 });
    }

    // Update XP and Coins
    student.xp += xpEarned;
    // 1 coin for every 10 XP
    student.coins += Math.floor(xpEarned / 10);

    // Level thresholds
    const xpThresholds = [0, 100, 300, 600, 1000];
    let newLevel = 1;
    for (let i = 0; i < xpThresholds.length; i++) {
      if (student.xp >= xpThresholds[i]) {
        newLevel = i + 1;
      }
    }
    
    student.level = newLevel;
    student.lastActive = new Date();
    await student.save();

    return NextResponse.json({
      success: true,
      xp: student.xp,
      level: student.level,
      coins: student.coins,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
