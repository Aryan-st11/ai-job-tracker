import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import appRoutes from "./routes/application.routes.js";
import aiRoutes from "./routes/ai.routes.js";

const app = express();
app.use((req, res, next) => {
  console.log("👉 Incoming:", req.method, req.url);
  next();
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Backend is running");
});

// ✅ ALL ROUTES HERE
app.use("/auth", authRoutes);
app.use("/applications", appRoutes);
app.use("/ai", aiRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Route not found ❌" });
});

// error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error("🔥 Error:", err.message);
  res.status(500).json({ error: "Something went wrong" });
});

export default app;