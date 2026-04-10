import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", (req, res) => {
  res.send("Auth route working ✅");
});
export default router;