import { useState } from "react";
import API from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // ✅ ADD THIS

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields ⚠️");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", res.data);

      const token = res.data.token || res.data.accessToken;

      if (!token) {
        alert("No token received ❌");
        return;
      }

      // ✅ Save token
      localStorage.setItem("token", token);

      // 🚀 FIXED NAVIGATION
      navigate("/"); // ✅ correct route

    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.error || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-80">

        <h2 className="text-xl mb-4 font-bold text-center">
          Login 🚀
        </h2>

        <input
          className="w-full border p-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-3 text-sm text-center">
          New user?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}