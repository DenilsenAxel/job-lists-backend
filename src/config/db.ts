import * as Mongoose from "mongoose";

export const connectDB = async () => {
  await Mongoose.connect(process.env.MONGO_URI!);
  console.log("Connected to MongoDB!");
};
