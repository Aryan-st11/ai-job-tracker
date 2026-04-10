import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import appRoutes from "./routes/application.routes.js";
import aiRoutes from "./routes/ai.routes.js";

const app = express();

// ✅ REPLACE app.use(cors()) with this:
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL || "",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked: ${origin}`));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Backend is running");
});

app.use("/auth", authRoutes);
app.use("/applications", appRoutes);
app.use("/ai", aiRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found ❌" });
});

app.use((err: any, req: any, res: any, next: any) => {
  console.error("🔥 Error:", err.message);
  res.status(500).json({ error: "Something went wrong" });
});

export default app;