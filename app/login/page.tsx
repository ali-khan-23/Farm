"use client";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation"; // ✅ Next.js router for navigation
import "../login/login.css"; // ✅ your CSS file

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ You can replace this fake check with real backend API call later
    if (email === "admin@farm.com" && password === "123456") {
      // Save fake token to simulate authentication
      localStorage.setItem("token", "fake-jwt-token");

      // ✅ Navigate to dashboard
      router.push("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div
      className="auth-container"
      style={{
        backgroundImage: "url('/cows.jpg')", // ✅ background from /public
      }}
    >
      <div className="overlay"></div>
      <h2 className="farmfusion-title">FarmFusion</h2>

      <form onSubmit={handleLogin} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit">Login</button>

        <p>
          Don’t have an account?{" "}
          <a href="/register" className="register-link">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
