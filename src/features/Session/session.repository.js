import mongoose from "mongoose";
import { sessionSchema } from "./session.schema.js";

export const SessionModel = mongoose.model("Session", sessionSchema);

export const createSession = async (userId, token) => {
  try {
    const newSession = new SessionModel({ userId, token });
    newSession.save();
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};
export const logoutFromallDevices = async (userId) => {
  try {
    const logout = await SessionModel.deleteMany({ userId });
    if (logout) {
      return true;
    }
    return false;
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};
