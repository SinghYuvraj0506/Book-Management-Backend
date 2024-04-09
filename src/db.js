import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";

const connectToDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
    console.log(
      "DB Connected Successfully, DB HOST:",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.log("MongoDB Connection Failed:",error)
  }
};


export default connectToDB;
