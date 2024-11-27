import express from "express";
import {
  getUserFriends,
  pendingFriendReq,
  responseRequest,
  togglingFriendReq,
} from "./friends.controller.js";

const friendRouter = express.Router();

friendRouter.route("/get-friends").get(getUserFriends);
friendRouter.route("/get-pending-requests").get(pendingFriendReq);
friendRouter.route("/toggle-friendship/:friendId").post(togglingFriendReq);
friendRouter.route("/response-to-request/:friendId").post(responseRequest);

export default friendRouter;
