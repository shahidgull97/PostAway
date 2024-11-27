import mongoose from "mongoose";

export const postSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  caption: { type: String },
  imageUrl: { type: String, required: true },
  status: { type: String, enum: ["published", "draft", "archieve"] },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
});
