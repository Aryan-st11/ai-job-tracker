import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  company: String,
  role: String,
  description: String,
  skills: [String],
  status: String,
  dateApplied: Date,
  userId: String
});

export const Application = mongoose.model("Application", applicationSchema);