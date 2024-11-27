import { toggleLike, allLikes } from "./likes.repository.js";
import { customErrorHandler } from "../../middlewares/errorHandler.js";

export const togglePostLike = async (req, res, next) => {
  const userId = req._id;
  const postId = req.params.postId;
  const resp = await toggleLike(userId, postId);
  if (resp.success) {
    res.status(200).json({
      success: true,
      msg: "You clicked like button",
      res: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};

// Get all likes of a post
export const allLikesPost = async (req, res, next) => {
  const postId = req.params.postId;
  const resp = await allLikes(postId);
  if (resp.success) {
    res.status(200).json({
      success: true,
      msg: "All likes of a post fetched succefully",
      res: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};
