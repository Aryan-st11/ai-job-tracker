import dotenv from "dotenv";

// ✅ Always load env FIRST
dotenv.config({ path: "./.env" });

import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // ✅ Debug check (remove later in production)
  console.log("🔑 ENV CHECK:", process.env.OPENAI_API_KEY);

    // ✅ Connect DB
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("🗄️ MongoDB Connected");

    // ✅ Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("❌ Startup failed:", err);
    process.exit(1); // 👈 kills app if DB fails
  }
};

startServer();