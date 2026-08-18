import mongoose, { Schema, model, models } from "mongoose";

const LessonSchema = new Schema(
  {
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    description: { type: String },
    order: { type: Number, required: true },
    
    // Content types
    videoUrl: { type: String },
    textContent: { type: String },
    visualAidUrl: { type: String }, // For concept visualization
    
    xpReward: { type: Number, default: 20 },
  },
  { timestamps: true }
);

const Lesson = models.Lesson || model("Lesson", LessonSchema);
export default Lesson;
