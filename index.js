import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./src/features/User/user.routes.js";
import postRouter from "./src/features/Posts/post.routes.js";
import { auth } from "./src/middlewares/jwtAuth.js";
import commentRouter from "./src/features/Comments/comments.routes.js";
import { appLevelErrorHandlerMiddleware } from "./src/middlewares/errorHandler.js";
import likeRouter from "./src/features/LIkes/likes.routes.js";
import friendRouter from "./src/features/Friends/friends.router.js";
import otpRouter from "./src/features/OTP/otp.routes.js";
const app = express();
app.use(cookieParser());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/posts", auth, postRouter);
app.use("/api/comments", auth, commentRouter);
app.use("/api/likes", auth, likeRouter);
app.use("/api/friends", auth, friendRouter);
app.use("/api/otp/", otpRouter);

app.use(appLevelErrorHandlerMiddleware);
export default app;
