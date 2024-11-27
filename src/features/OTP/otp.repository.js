import mongoose from "mongoose";
import { otpSchema } from "./otp.schema.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { UserModel } from "../User/user.repository.js";
const otpModel = mongoose.model("OTP", otpSchema);

// Send otp function
export const sendOtp = async (email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    //   generate otp
    const generateOTP = () => {
      return crypto.randomInt(100000, 999999).toString();
    };
    //   check if mail exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return {
        success: false,
        error: { statusCode: 404, msg: "User not found" },
      };
    }
    const otp = generateOTP();

    await otpModel.deleteMany({ email });

    const newOtp = new otpModel({
      email,
      otp: await bcrypt.hash(otp, 10),
      attempts: 0,
    });
    await newOtp.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      html: `
                <h1>Password Reset</h1>
                <p>Your One-Time Password (OTP) for password reset is:</p>
                <h2>${otp}</h2>
                <p>This OTP is valid for 10 minutes. Do not share this with anyone.</p>
                <p>If you did not request a password reset, please ignore this email.</p>
              `,
    };
    await transporter.sendMail(mailOptions);
    return { success: true, res: "Check your mail for otp" };
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};

// verify otp
export const verifyOtp = async (email, otp) => {
  try {
    const otpDocument = await otpModel.findOne({ email });
    if (!otpDocument) {
      return {
        success: false,
        error: { statusCode: 404, msg: "OTP expired or not found" },
      };
    }
    if (otpDocument.attempts >= 3) {
      await otpModel.deleteOne({ email });
      return {
        success: false,
        error: {
          statusCode: 404,
          msg: "Max attempts reached. Request a new OTP",
        },
      };
    }

    //   verify otp
    const isValidOtp = await bcrypt.compare(otp, otpDocument.otp);
    if (!isValidOtp) {
      // Increment attempts
      otpDocument.attempts += 1;
      await otpDocument.save();
    }
    return {
      success: true,
      res: isValidOtp,
    };
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};

// Reset password

export const resetPassword = async (email, newpassword) => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return {
        success: false,
        error: { statusCode: 404, msg: "User not found" },
      };
    }
    const hashPassword = await bcrypt.hash(newpassword, 12);
    user.password = hashPassword;
    await user.save();

    await otpModel.deleteOne({ email });

    return { success: true, res: "Password Changed succefully" };
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};
