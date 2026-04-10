import { Router } from "express";
import { Application } from "../models/application.model.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// 🔐 APPLY AUTH TO ALL ROUTES
router.use(authMiddleware);

// ✅ CREATE APPLICATION
router.post("/", async (req: any, res) => {
  try {
    const app = await Application.create({
      ...req.body,
      userId: req.user.id, // ✅ from token
    });

    res.status(201).json(app);
  } catch (error) {
    res.status(500).json({ error: "Failed to create application" });
  }
});

// ✅ GET USER APPLICATIONS ONLY
router.get("/", async (req: any, res) => {
  try {
    const apps = await Application.find({
      userId: req.user.id, // 🔥 IMPORTANT FILTER
    });

    res.json(apps);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

// ✅ UPDATE APPLICATION
router.put("/:id", async (req, res) => {
  try {
    const updated = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update application" });
  }
});

// ✅ DELETE APPLICATION
router.delete("/:id", async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.json({ message: "Application deleted ✅" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete application" });
  }
});

export default router;