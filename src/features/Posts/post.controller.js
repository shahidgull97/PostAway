import {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPostDetails,
  getUserPosts,
} from "./post.repository.js";
import { customErrorHandler } from "../../middlewares/errorHandler.js";
export const postCreation = async (req, res, next) => {
  const userId = req._id;
  const resp = await createPost(userId, req.body);
  if (resp.success) {
    res.status(201).json({
      success: true,
      msg: "Post Created successfully",
      res: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};

// Update a post
export const postUpdate = async (req, res, next) => {
  const userId = req._id;
  const postId = req.params.postId;
  const resp = await updatePost(userId, postId, req.body);
  if (resp.success) {
    res.status(201).json({
      success: true,
      msg: "Post Updated successfully",
      res: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};

// Deleting a post
export const postDelete = async (req, res, next) => {
  const userId = req._id;
  const postId = req.params.postId;
  const resp = await deletePost(userId, postId);
  if (resp.success) {
    res.status(200).json({
      success: true,
      msg: "Post Deleted successfully",
      res: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};

// Get all Posts controller
export const allPosts = async (req, res, next) => {
  const resp = await getAllPosts();
  if (resp.success) {
    res.status(200).json({
      success: true,
      msg: "All Posts fetched successfully",
      res: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};

// Get a specific post by Id
export const getPostById = async (req, res, next) => {
  const postId = req.params.postId;
  const resp = await getPostDetails(postId);
  if (resp.success) {
    res.status(200).json({
      success: true,
      msg: "Post fetched successfully",
      res: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};

// Get posts of a User
export const userPosts = async (req, res, next) => {
  const userId = req._id;
  const resp = await getUserPosts(userId);
  if (resp.success) {
    res.status(200).json({
      success: true,
      msg: "User Posts fetched successfully",
      res: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};
