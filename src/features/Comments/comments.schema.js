import mongoose from "mongoose";

export const commentSchema = mongoose.Schema({
  comment: { type: String, required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
