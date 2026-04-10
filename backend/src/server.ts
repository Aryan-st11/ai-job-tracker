import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// ✅ ADD THIS — fail fast if MONGO_URI is missing
if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in environment variables");
  process.exit(1);
}

const startServer = async () => {
  try {
    // ✅ Debug check (remove later in production)
  console.log("🔑 ENV CHECK:", process.env.OPENAI_API_KEY);

    // ✅ Connect DB
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("🗄️ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Startup failed:", err);
    process.exit(1);
  }
};

startServer();