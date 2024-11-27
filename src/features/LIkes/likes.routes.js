import express from "express";
import { togglePostLike, allLikesPost } from "./likes.controller.js";

const likeRouter = express.Router();

likeRouter.route("/:postId").get(allLikesPost);
likeRouter.route("/toggle/:postId").post(togglePostLike);

export default likeRouter;
