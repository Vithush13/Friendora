import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB connected: ${con.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDatabase;
