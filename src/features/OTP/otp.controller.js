import { sendOtp, verifyOtp, resetPassword } from "./otp.repository.js";
import { customErrorHandler } from "../../middlewares/errorHandler.js";

export const sendUserOtp = async (req, res, next) => {
  const { email } = req.body;
  const resp = await sendOtp(email);
  if (resp.success) {
    res.status(200).json({
      success: true,
      msg: "Otp sent successfully",
      res: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};

// verify OTP
export const verifyUserOTP = async (req, res, next) => {
  const { email, otp } = req.body;
  const resp = await verifyOtp(email, otp);
  if (resp.success) {
    res.status(200).json({
      success: true,
      msg: "Otp verified successfully",
      res: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};

// Reset Password
export const passwordReset = async (req, res, next) => {
  const { email, newpassword } = req.body;
  const resp = await resetPassword(email, newpassword);
  if (resp.success) {
    res.status(200).json({
      success: true,
      msg: "Password reset successfully",
      res: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};
