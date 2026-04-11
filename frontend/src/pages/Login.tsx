import { useState } from "react";
import API from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // 🔥

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

      const token = res.data.token || res.data.accessToken;

      if (!token) {
        alert("No token received ❌");
        return;
      }

      // 🔥 REAL FIX
      login(token);

      // 🚀 smooth navigation
      navigate("/");

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
          className="w-full border p-2 mb-3 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 mb-3 rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-3 text-sm text-center">
          New user?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}