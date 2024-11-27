import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import { customErrorHandler } from "../../middlewares/errorHandler.js";
import {
  compareHashedPassword,
  hashPassword,
} from "../../utils/hashPassword.js";

export const UserModel = mongoose.model("User", userSchema);

export const userRegisterationRepo = async (userData) => {
  try {
    const newUser = new UserModel(userData);
    await newUser.save();
    return { success: true, res: newUser };
  } catch (error) {
    // throw new Error("email duplicate");
    return { success: false, error: { statusCode: 400, msg: error } };
  }
};
export const userLoginRepo = async (userData) => {
  try {
    const { email, password } = userData;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return {
        success: false,
        error: { statusCode: 404, msg: "user not found" },
      };
    } else {
      let passwordValidation = await compareHashedPassword(
        password,
        user.password
      );
      if (passwordValidation) {
        return { success: true, res: user };
      } else {
        return {
          success: false,
          error: { statusCode: 400, msg: "invalid credentials" },
        };
      }
    }
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};

// Get user Details
export const getUserDetails = async (userId) => {
  try {
    const user = await UserModel.findById(userId);
    return { success: true, res: user };
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};

// Get all Users
export const getAllUsers = async () => {
  try {
    const users = await UserModel.find();
    return { success: true, res: users };
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};

// Update a User
export const updateUser = async (userId, userData) => {
  try {
    const updateduser = await UserModel.findByIdAndUpdate(userId, userData, {
      new: true,
      runValidators: true,
    });
    return { success: true, res: updateduser };
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};
