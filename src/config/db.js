import mongoose from "mongoose";

const baseUrl = process.env.MONGODB || "0.0.0.0:27017";

export const connectionToDb = async () => {
  try {
    await mongoose.connect(`mongodb://${baseUrl}/postaway`);
    console.log("MongoDB connected using mongoose");
  } catch (error) {
    console.log(error);
  }
};
