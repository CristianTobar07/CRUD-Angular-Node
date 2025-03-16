import mongoose from "mongoose";

export const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
