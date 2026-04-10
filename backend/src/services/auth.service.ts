import bcrypt from "bcrypt";
import { User } from "../models/user.model";
import { generateToken } from "../utils/jwt";

// ✅ REGISTER USER
export const registerUser = async (userData: any) => {
  const { firstName, lastName, phone, email, password } = userData;

  // 🧠 Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("USER_EXISTS");
  }

  // 🔐 Hash password
  const hashed = await bcrypt.hash(password, 10);

  // 🗄️ Create user
  const user = await User.create({
    firstName,
    lastName,
    phone,
    email,
    password: hashed,
  });

  return {
    token: generateToken(user._id.toString()),
  };
};

// ✅ LOGIN USER
export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("INVALID_PASSWORD");
  }

  return {
    token: generateToken(user._id.toString()),
  };
};