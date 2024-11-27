import express from "express";
import {
  addCommentPost,
  updateCommentPost,
  deleteCommentPost,
  allCommentPost,
} from "./comments.controller.js";

const commentRouter = express.Router();

commentRouter.route("/:postId").get(allCommentPost);
commentRouter.route("/:postId").post(addCommentPost);
commentRouter.route("/:commentId").put(updateCommentPost);
commentRouter.route("/:commentId").delete(deleteCommentPost);

export default commentRouter;
