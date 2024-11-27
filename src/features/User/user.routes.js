import express from "express";
import {
  userRegisteration,
  userLogin,
  userLogout,
  getUser,
  getallUsersDetails,
  updateUserDetails,
  logoutAllDevices,
} from "./user.cotroller.js";
import { auth } from "../../middlewares/jwtAuth.js";

const router = express.Router();

router.route("/signup").post(userRegisteration);
router.route("/signin").post(userLogin);
router.route("/logout").post(auth, userLogout);
router.route("/get-details/:userId").get(auth, getUser);
router.route("/get-all-details").get(auth, getallUsersDetails);
router.route("/update-details/:userId").put(auth, updateUserDetails);
router.route("/logout-all-devices").post(auth, logoutAllDevices);

export default router;
