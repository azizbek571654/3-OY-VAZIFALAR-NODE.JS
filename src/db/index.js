import mongoose from "mongoose";


export const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected ✅ 😲");
  } catch (error) {
    console.log("connected failed");
    console.log(error);
    process.exit(1);
  }
};
