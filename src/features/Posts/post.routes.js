import express from "express";
import {
  postCreation,
  postDelete,
  postUpdate,
  allPosts,
  getPostById,
  userPosts,
} from "./post.controller.js";

const postRouter = express.Router();

postRouter.route("/all").get(allPosts);
postRouter.route("/:postId").get(getPostById);
postRouter.route("/user/:userId").get(userPosts);
postRouter.route("").post(postCreation);
postRouter.route("/:postId").delete(postDelete);
postRouter.route("/:postId").put(postUpdate);

export default postRouter;
