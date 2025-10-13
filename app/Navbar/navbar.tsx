"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import "./Navbar.css";

export default function Navbar() {
  const router = useRouter();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    router.push("/login");
  };

  return (
    <nav className="navbar">
      {/* Left Section */}
      <div className="navbar-left">
        <h2 className="brand-name">FarmFusion</h2>

        <div className="navbar-links">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/cattle-list">Cattle</Link>
          <Link href="/animal">My Animals</Link>
          <Link href="/status-list">Animals Progress</Link>
          <Link href="/breeding-records">Breeding</Link>
          <Link href="/feed-records">Feed Records</Link>
          <Link href="/buy-animal">Buy Animal</Link>
          <Link href="/my-installments">My Installments</Link>
          <Link href="/vouchers">Vouchers</Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="navbar-right">
        {token ? (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        ) : (
          <Link href="/login" className="login-link">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
