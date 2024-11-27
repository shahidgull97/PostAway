import mongoose from "mongoose";
export const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  token: String, // Store the JWT here
  createdAt: { type: Date, default: Date.now, expires: "30d" }, // Auto-delete after 30 days
});
