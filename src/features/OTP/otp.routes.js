import express from "express";
import { sendUserOtp, verifyUserOTP, passwordReset } from "./otp.controller.js";
const otpRouter = express.Router();

otpRouter.route("/send").post(sendUserOtp);
otpRouter.route("/verify").post(verifyUserOTP);
otpRouter.route("/reset-password").post(passwordReset);

export default otpRouter;
