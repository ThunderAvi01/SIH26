import mongoose, { Schema, model, models } from "mongoose";

const TeacherProfileSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    name: { type: String, required: true },
    school: { type: String, required: true },
    subject: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
  },
  { timestamps: true }
);

const TeacherProfile = models.TeacherProfile || model("TeacherProfile", TeacherProfileSchema);
export default TeacherProfile;
