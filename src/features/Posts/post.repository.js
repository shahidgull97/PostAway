import mongoose from "mongoose";
import { postSchema } from "./post.schema.js";

export const postModel = mongoose.model("Post", postSchema);

// Creating a post
export const createPost = async (userId, data) => {
  try {
    const post = await new postModel({ user: userId, ...data }).save();
    return { success: true, res: post };
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};

// updating a post
export const updatePost = async (userId, postId, data) => {
  try {
    const updatedPost = await postModel.findOneAndUpdate(
      { _id: postId, user: userId },
      data,
      {
        new: true,
      }
    );
    if (updatePost) {
      return { success: true, res: updatedPost };
    } else {
      return {
        success: false,
        error: { statusCode: 404, msg: "No post found to update" },
      };
    }
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};

// Deleting a post
export const deletePost = async (userId, postId) => {
  try {
    const deletedPost = await postModel.deleteOne({
      _id: postId,
      user: userId,
    });
    if (deletePost) {
      return { success: true, res: deletedPost };
    } else {
      return {
        success: false,
        error: { statusCode: 404, msg: "No posts to delete" },
      };
    }
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};

// Get all posts
export const getAllPosts = async () => {
  try {
    const posts = await postModel.find();
    return { success: true, res: posts };
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};

// Get a specific post by Id
export const getPostDetails = async (postId) => {
  try {
    const post = await postModel.findById(postId);
    if (post) {
      return { success: true, res: post };
    } else {
      return {
        success: false,
        error: { statusCode: 404, msg: "No post found for this Id" },
      };
    }
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};

// Get posts of a particular user
export const getUserPosts = async (userId) => {
  try {
    const userPosts = await postModel.find({ user: userId });
    if (userPosts) {
      return { success: true, res: userPosts };
    } else {
      return {
        success: false,
        error: { statusCode: 404, msg: "No post found for this user" },
      };
    }
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};
