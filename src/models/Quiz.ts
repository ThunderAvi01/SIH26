import mongoose, { Schema, model, models } from "mongoose";

const QuestionSchema = new Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
  explanation: { type: String },
  type: { type: String, enum: ["MCQ", "TRUE_FALSE"], default: "MCQ" },
});

const QuizSchema = new Schema(
  {
    lessonId: { type: Schema.Types.ObjectId, ref: "Lesson" }, // Optional, can be standalone
    title: { type: String, required: true },
    description: { type: String },
    questions: [QuestionSchema],
    xpReward: { type: Number, default: 50 },
    difficulty: { type: String, enum: ["EASY", "MEDIUM", "HARD"], default: "MEDIUM" },
  },
  { timestamps: true }
);

const Quiz = models.Quiz || model("Quiz", QuizSchema);
export default Quiz;
