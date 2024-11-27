import mongoose from "mongoose";

export const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, // OTP expires after 10 minutes
  },
  attempts: {
    type: Number,
    default: 0,
    max: 3, // Max 3 verification attempts
  },
});
