import {
  userLoginRepo,
  userRegisterationRepo,
  getUserDetails,
  getAllUsers,
  updateUser,
} from "./user.repository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { customErrorHandler } from "../../middlewares/errorHandler.js";
import {
  createSession,
  logoutFromallDevices,
} from "../Session/session.repository.js";

export const userRegisteration = async (req, res, next) => {
  let { password } = req.body;
  password = await bcrypt.hash(password, 12);
  const resp = await userRegisterationRepo({ ...req.body, password });
  if (resp.success) {
    res.status(201).json({
      success: true,
      msg: "user registration successful",
      res: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};
export const userLogin = async (req, res, next) => {
  const resp = await userLoginRepo(req.body);
  if (resp.success) {
    const token = jwt.sign(
      { _id: resp.res._id, user: resp.res },
      process.env.HASHKEY,
      {
        expiresIn: "1h",
      }
    );
    await createSession(resp.res._id, token);
    res
      .cookie("jwtToken", token, { maxAge: 1 * 60 * 60 * 1000, httpOnly: true })
      .json({ success: true, msg: "user login successful", token });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};

// Get  a User based on its Id
export const getUser = async (req, res) => {
  const userId = req.params.userId;
  const session = req.session;
  console.log(session);

  const resp = await getUserDetails(userId);
  if (resp.success) {
    res.status(200).json({
      success: true,
      msg: "user fetched successful",
      res: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};

// GET all users
export const getallUsersDetails = async (req, res) => {
  const resp = await getAllUsers();
  if (resp.success) {
    res.status(200).json({
      success: true,
      msg: "All users fetched successful",
      res: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};

// UPdate a User
export const updateUserDetails = async (req, res) => {
  const userId = req.params.userId;
  const resp = await updateUser(userId, req.body);
  if (resp.success) {
    res.status(200).json({
      success: true,
      msg: " users updated successfully",
      res: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};

export const userLogout = (req, res, next) => {
  res.clearCookie("jwtToken").json({ success: true, msg: "logout successful" });
};

export const logoutAllDevices = (req, res, next) => {
  const userId = req._id;
  const result = logoutFromallDevices(userId);
  if (result) {
    res
      .clearCookie("jwtToken")
      .json({ success: true, msg: "logout from all devices successful" });
  }
};
