import {
  addComment,
  updateComment,
  deleteComment,
  allComments,
} from "./comments.repository.js";
import { customErrorHandler } from "../../middlewares/errorHandler.js";
// To add a comment to the post
export const addCommentPost = async (req, res, next) => {
  const userId = req._id;
  const postId = req.params.postId;
  const resp = await addComment(userId, postId, req.body);

  if (resp.success) {
    res.status(201).json({
      success: true,
      msg: "Comment Created successfully",
      res: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};

// To update a comment to the post
export const updateCommentPost = async (req, res, next) => {
  const userId = req._id;
  const comtId = req.params.commentId;
  const resp = await updateComment(userId, comtId, req.body);
  console.log(resp);

  if (resp.success) {
    res.status(201).json({
      success: true,
      msg: "Comment Updated successfully",
      res: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};

// To Delete a comment of the post
export const deleteCommentPost = async (req, res, next) => {
  const userId = req._id;
  const comtId = req.params.commentId;
  const resp = await deleteComment(userId, comtId);
  if (resp.success) {
    res.status(200).json({
      success: true,
      msg: "Comment Deleted successfully",
      res: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};

// Get all comments of a post
export const allCommentPost = async (req, res, next) => {
  const postId = req.params.postId;
  const resp = await allComments(postId);

  if (resp.success) {
    res.status(200).json({
      success: true,
      msg: "All comments fetched successfully",
      res: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};
