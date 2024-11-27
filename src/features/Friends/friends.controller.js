import {
  togglingFriends,
  getFriends,
  friendResponse,
  pendingRequests,
} from "./friends.repository.js";
import { customErrorHandler } from "../../middlewares/errorHandler.js";

export const togglingFriendReq = async (req, res, next) => {
  const userId = req._id;
  const friendId = req.params.friendId;
  const resp = await togglingFriends(userId, friendId);
  if (resp.success) {
    res.status(200).json({
      success: true,
      msg: "You clicked friend request button",
      res: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};

// Sendign a response to a request
export const responseRequest = async (req, res, next) => {
  const userId = req._id;
  const friendId = req.params.friendId;
  const { response } = req.body;
  const resp = await friendResponse(friendId, userId, response);
  if (resp.success) {
    res.status(200).json({
      success: true,
      msg: "Your responded to friend request",
      res: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};

// getting pending requests
export const pendingFriendReq = async (req, res, next) => {
  const userId = req._id;
  const resp = await pendingRequests(userId);
  if (resp.success) {
    res.status(200).json({
      success: true,
      msg: "Here are all the pending requests",
      res: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};

// Getting friends of a user
export const getUserFriends = async (req, res, next) => {
  const userId = req._id;
  const resp = await getFriends(userId);
  if (resp.success) {
    res.status(200).json({
      success: true,
      msg: "All of your friends fetched",
      res: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};
