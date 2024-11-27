import mongoose from "mongoose";

export const likeSchema = mongoose.Schema({
  userId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  postId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});
