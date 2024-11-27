import mongoose from "mongoose";
import { commentSchema } from "./comments.schema.js";
import { postModel } from "../Posts/post.repository.js";

const commentModel = mongoose.model("Comment", commentSchema);

// Add comment to the post
export const addComment = async (userId, postId, comment) => {
  try {
    const newcomment = await new commentModel({
      userId: userId,
      postId: postId,
      ...comment,
    }).save();
    return { success: true, res: newcomment };
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};

// Update a comment
export const updateComment = async (userId, commentId, comment) => {
  try {
    const newcomment = await commentModel.findById(commentId);
    if (!comment) {
      return {
        success: false,
        error: { statusCode: 404, msg: "comment not found" },
      };
    }
    const post = await postModel.findById(newcomment.postId);
    const postOwner = post.user == userId;

    const commentOwner = newcomment.userId == userId;
    if (postOwner || commentOwner) {
      const updatedcmt = await commentModel.findOneAndUpdate(
        { _id: commentId },
        comment,
        { new: true }
      );
      return { success: true, res: updatedcmt };
    } else {
      return {
        success: false,
        error: {
          statusCode: 404,
          msg: "You are not authorized to update comment",
        },
      };
    }
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};

// Delete a comment
export const deleteComment = async (userId, commentId) => {
  try {
    const comment = await commentModel.findById(commentId);
    if (!comment) {
      return {
        success: false,
        error: { statusCode: 404, msg: "comment not found" },
      };
    }
    const post = await postModel.findById(comment.postId);
    const postOwner = post.user == userId;

    const commentOwner = comment.userId == userId;
    if (postOwner || commentOwner) {
      const deleteCmt = await commentModel.findOneAndDelete({ _id: commentId });
      return { success: true, res: deleteCmt };
    } else {
      return {
        success: false,
        error: {
          statusCode: 404,
          msg: "You are not authorized to Delete comment",
        },
      };
    }
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};

// Get all comments of a post
export const allComments = async (postId) => {
  try {
    const comments = await commentModel.find({ postId: postId });
    return { success: true, res: comments };
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};
