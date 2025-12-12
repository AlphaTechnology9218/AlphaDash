import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

export async function connectDB() {
  if (!uri) {
    throw new Error("MONGODB_URI não definida. Configure no arquivo .env");
  }

  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(uri);
}

