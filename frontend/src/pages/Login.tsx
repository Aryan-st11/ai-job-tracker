import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    const res = await API.post("/auth/login", {
      email,
      password,
    });

    console.log("LOGIN RESPONSE:", res.data); // 🧠 debug

    const token = res.data.token || res.data.accessToken;

    if (!token) {
      alert("No token received ❌");
      return;
    }

    // ✅ Save token
    localStorage.setItem("token", token);

    // ✅ Force refresh so auth works properly
    window.location.href = "/";

  } catch (err: any) {
    console.error(err);
    alert(err?.response?.data?.error || "Login failed ❌");
  }
};

  return (
    <div className="h-screen flex items-center justify-center">

      <div className="bg-white p-6 rounded shadow w-80">

        <h2 className="text-xl mb-4 font-bold">Login</h2>

        <input
          className="w-full border p-2 mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 mb-3"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2"
        >
          Login
        </button>

        <p className="mt-3 text-sm">
          New user? <a href="/register" className="text-blue-600">Register</a>
        </p>

      </div>
    </div>
  );
}