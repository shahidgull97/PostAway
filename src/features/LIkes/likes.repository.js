import mongoose from "mongoose";
import { likeSchema } from "./llkes.schema.js";
import { postModel } from "../Posts/post.repository.js";

const likesModel = mongoose.model("Like", likeSchema);

// Toggle a like
export const toggleLike = async (userId, postId) => {
  try {
    const post = await postModel.findById(postId);
    const like = await likesModel.findOne({ userId: userId, postId: postId });
    if (!like) {
      const newLike = await new likesModel({ userId, postId }).save();
      const populatedLike = await likesModel
        .findById(newLike._id)
        .populate("userId", "name email _id");
      post.likes += 1;
      await post.save();
      return { success: true, res: populatedLike };
    } else {
      const Id = like._id;
      const deleteLike = await likesModel.deleteOne({ _id: Id });
      post.likes -= 1;
      await post.save();
      return { success: true, res: deleteLike };
    }
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};

// GEt all likes of a post
export const allLikes = async (postId) => {
  try {
    const likes = await likesModel.find({ postId: postId });
    return { success: true, res: likes };
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};
