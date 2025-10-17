"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  FaListAlt,
  FaChartLine,
  FaMoneyCheckAlt,
  FaGift,
  FaLeaf,
  FaHeart,
  FaShoppingBag,
  FaCanadianMapleLeaf,
} from "react-icons/fa";
import "./dashboard.css";
import Image from "next/image";

export default function UserDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user/stats")
      .then((res) => {
        const data = res.data;
        setStats([
          { title: "My Animals", value: data.myAnimals || 3, icon: <FaListAlt />, color: "#007bff", path: "/animal" },
          { title: "Animal Progress", value: data.animalProgress || 3, icon: <FaChartLine />, color: "#28a745", path: "/status-list" },
          { title: "My Installments", value: data.installments || 3, icon: <FaMoneyCheckAlt />, color: "#ffc107", path: "/my-installments" },
          { title: "My Vouchers", value: data.vouchers || 12, icon: <FaGift />, color: "#fd7e14", path: "/vouchers" },
          { title: "Breeding", value: data.breeding || 5, icon: <FaHeart />, color: "#e83e8c", path: "/breeding" },
          { title: "Feed Records", value: data.feed || 5, icon: <FaLeaf />, color: "#20c997", path: "/feed-records" },
          { title: "Buy Now", value: data.buyNow || 20, icon: <FaShoppingBag />, color: "#6610f2", path: "/buy-animal" },
        ]);
      })
      .catch(() => {
        setStats([
          { title: "My Animals", value: 3, icon: <FaListAlt />, color: "#007bff", path: "/myanimals" },
          { title: "Cattle", value: 21, icon: <FaCanadianMapleLeaf />, color: "#007bff", path: "/cattle" },
          { title: "Animal Progress", value: 3, icon: <FaChartLine />, color: "#28a745", path: "/animalprogress" },
          { title: "My Installments", value: 3, icon: <FaMoneyCheckAlt />, color: "#ffc107", path: "/myinstallments" },
          { title: "My Vouchers", value: 12, icon: <FaGift />, color: "#fd7e14", path: "/vouchers" },
          { title: "Breeding", value: 6, icon: <FaHeart />, color: "#e83e8c", path: "/breeding" },
          { title: "Feed Records", value: 4, icon: <FaLeaf />, color: "#20c997", path: "/feed-records" },
          { title: "Buy Now", icon: <FaShoppingBag />, color: "#6610f2", path: "/buy-animal" },
        ]);
      });
  }, []);

  return (
    <div
      className="user-dashboard-container"
      style={{ backgroundImage: "url('/cattle.jpg')" }}
    >
      <div className="user-overlay"></div>
      <h2 className="user-dashboard-title">Welcome to Your Dashboard</h2>
      <div className="user-card-grid">
        {stats.map((item, index) => (
          <div
            key={index}
            onClick={() => router.push(item.path)}
            className="user-dashboard-link"
          >
            <div
              className="user-dashboard-card"
              style={{
                background: `linear-gradient(135deg, ${item.color}, #000000)`,
              }}
            >
              <div className="user-card-icon">{item.icon}</div>
              <div className="user-card-info">
                <h3>{item.title}</h3>
                <p className="count-white">{item.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
