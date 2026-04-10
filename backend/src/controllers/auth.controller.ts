import { Request, Response } from "express";
import * as authService from "../services/auth.service";

// ✅ REGISTER
export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, phone, email, password } = req.body;

    if (!firstName || !lastName || !phone || !email || !password) {
      return res.status(400).json({
        error: "All fields are required ❌",
      });
    }

    const data = await authService.registerUser(req.body);

    res.status(201).json(data);

  } catch (err: any) {
    console.error("🔥 Register Error:", err.message);

    if (err.message === "USER_EXISTS") {
      return res.status(400).json({
        error: "User already registered ⚠️",
      });
    }

    res.status(500).json({
      error: "Registration failed ❌",
    });
  }
};

// ✅ LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password required ❌",
      });
    }

    const data = await authService.loginUser(email, password);

    res.json(data);

  } catch (err: any) {
    console.error("🔥 Login Error:", err.message);

    if (err.message === "USER_NOT_FOUND") {
      return res.status(404).json({
        error: "User not found ❌",
      });
    }

    if (err.message === "INVALID_PASSWORD") {
      return res.status(401).json({
        error: "Incorrect password ❌",
      });
    }

    res.status(500).json({
      error: "Login failed ❌",
    });
  }
};