import mongoose, { Schema, model, models } from "mongoose";

const StudentProfileSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    classGrade: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    preferredLanguage: { type: String, required: true },
    
    // Gamification properties
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    coins: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    lastActive: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const StudentProfile = models.StudentProfile || model("StudentProfile", StudentProfileSchema);
export default StudentProfile;
