import mongoose from "mongoose";
import { config } from "./index";

const db = config.db as string;
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(db);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    throw Error(error.message);
  }
};
