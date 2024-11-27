import mongoose from "mongoose";
import { friendshipSchema } from "./friends.schema.js";
import { UserModel } from "../User/user.repository.js";

const friendsModel = mongoose.model("Friend", friendshipSchema);

// Toggling of FriendShip, (sending a friend reques and cancelling it)

export const togglingFriends = async (senderId, recipientId) => {
  try {
    // check if sender and recipient are same
    if (senderId == recipientId) {
      return {
        success: false,
        error: {
          statuscode: 400,
          msg: "cannont send friend request to my self",
        },
      };
    }
    //   Check if target exists
    const targetUser = await UserModel.findById(recipientId);
    if (!targetUser) {
      return {
        success: false,
        error: { statuscode: 404, msg: "Recipient user not found" },
      };
    }
    //   check if friend request already exists
    const friendReq = await friendsModel.findOne({
      $or: [
        { sender: senderId, recipient: recipientId },
        { sender: recipientId, recipient: senderId },
        { status: "pending" },
      ],
    });
    if (friendReq) {
      await friendReq.deleteOne();
      return {
        success: true,
        res: "Your friend request has been deleted",
      };
    }

    //   Check if users are alraedy friends
    const areFriends = await UserModel.findOne({
      _id: senderId,
      friends: recipientId,
    });
    if (areFriends) {
      return {
        success: true,
        res: "You are already friends with this person",
      };
    }

    //   Send Friend Request
    const friendRequest = await new friendsModel({
      sender: senderId,
      recipient: recipientId,
    }).save();
    return { success: true, res: friendRequest };
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};

// Respond to friend Request
export const friendResponse = async (requestId, currentUserID, response) => {
  try {
    // Accepting a request
    //   check if friend request exists
    //   Here requestId is the id of the friend request sent earlier
    const checkReq = await friendsModel.findOne({
      _id: requestId,
      recipient: currentUserID,
      status: "pending",
    });
    if (!checkReq) {
      return {
        success: false,
        error: { statusCode: 404, msg: "No friend request exists" },
      };
    }

    if (response === "accepted") {
      //   updata status of the reques
      checkReq.status = "accepted";
      await checkReq.save();
      //   Add users to each others friend lists
      await UserModel.findByIdAndUpdate(checkReq.sender, {
        $addToSet: { friends: checkReq.recipient },
        $inc: { friendCount: 1 },
      });

      await UserModel.findByIdAndUpdate(checkReq.recipient, {
        $addToSet: { friends: checkReq.sender },
        $inc: { friendCount: 1 },
      });
      return { success: true, res: "Friend Request Accepted" };
    } else {
      checkReq.status = "rejected";
      await checkReq.save();
      checkReq.deleteOne();
      return { success: true, res: "Friend Request Rejected" };
    }
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};

// Get pending requests
export const pendingRequests = async (currentUserID) => {
  try {
    const pendingReq = await friendsModel.find({
      recipient: currentUserID,
      status: "pending",
    });
    if (pendingReq.length == 0) {
      return {
        success: false,
        error: { statusCode: 404, msg: "No friend request pending" },
      };
    } else {
      return { success: true, res: pendingReq };
    }
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};

// GEt friends of a user
export const getFriends = async (currentUserID) => {
  try {
    const user = await UserModel.findById(currentUserID).populate(
      "friends",
      "_id name email"
    );
    const userFriends = user.friends;
    return { success: true, res: userFriends };
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};
