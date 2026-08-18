import mongoose, { Schema, model, models } from "mongoose";

const CourseSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    subject: { type: String, required: true },
    classGrade: { type: String, required: true },
    thumbnail: { type: String },
    teacherId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Course = models.Course || model("Course", CourseSchema);
export default Course;
