"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/navbar";
import "./CattleList.css";
import { motion } from "framer-motion";
import Link from "next/link";

const CattleList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState<string | null>(null);

  // ✅ Start with sample data directly (no import needed)
  const [cattles, setCattles] = useState([
    {
      id: 1,
      name: "Brown Cow",
      type: "Cow",
      gender: "Female",
      age: "4 years",
      weight: "380",
      price: "75000 PKR",
      image: "/cows.jpg",
    },
    {
      id: 2,
      name: "White Buffalo",
      type: "Buffalo",
      gender: "Male",
      age: "3 years",
      weight: "450",
      price: "92000 PKR",
      image: "/buffalo.jpg",
    },
  ]);

  const [newCattle, setNewCattle] = useState({
    name: "",
    type: "",
    gender: "",
    age: "",
    weight: "",
    price: "",
    image: "",
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>({});

  // ✅ Get user role from localStorage (safe for Next.js)
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  // ✅ Filter by search term
  const filteredCattles = cattles.filter(
    (cattle) =>
      cattle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cattle.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cattle.gender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Add new animal
  const handleAddCattle = () => {
    if (!newCattle.name || !newCattle.type || !newCattle.price)
      return alert("Please fill all fields!");
    const newEntry = { ...newCattle, id: cattles.length + 1 };
    setCattles([...cattles, newEntry]);
    setNewCattle({
      name: "",
      type: "",
      gender: "",
      age: "",
      weight: "",
      price: "",
      image: "",
    });
  };

  // ✅ Delete animal
  const handleDelete = (id: number) => {
    setCattles(cattles.filter((cattle) => cattle.id !== id));
  };

  // ✅ Edit animal
  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditData(cattles[index]);
  };

  const handleSaveEdit = (index: number) => {
    const updated = [...cattles];
    updated[index] = editData;
    setCattles(updated);
    setEditingIndex(null);
  };

  return (
    <div className="cattle-page">
      <div className="overlay"></div>
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Animals Available In Cattle
        </motion.h2>

        {/* ✅ Search */}
        <motion.input
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          type="text"
          placeholder="Search by name, type, or gender..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        {/* ✅ Admin Add Form */}
        {role === "admin" && (
          <div className="add-form">
            <h3>Add New Animal</h3>
            {Object.keys(newCattle).map((key) => (
              <input
                key={key}
                type="text"
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={(newCattle as any)[key]}
                onChange={(e) =>
                  setNewCattle({ ...newCattle, [key]: e.target.value })
                }
              />
            ))}
            <button onClick={handleAddCattle}>Add Animal</button>
          </div>
        )}

        {/* ✅ Table */}
        <motion.table
          className="cattle-table"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Type</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Weight (kg)</th>
              <th>Price (PKR)</th>
              <th>Buy</th>
              {role === "admin" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredCattles.length > 0 ? (
              filteredCattles.map((cattle, index) => (
                <motion.tr
                  key={cattle.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td>
                    <img
                      src={cattle.image}
                      alt={cattle.name}
                      style={{ width: "60px", borderRadius: "6px" }}
                    />
                  </td>
                  {["name", "type", "gender", "age", "weight", "price"].map(
                    (key) => (
                      <td key={key}>
                        {editingIndex === index ? (
                          <input
                            value={(editData as any)[key]}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                [key]: e.target.value,
                              })
                            }
                          />
                        ) : (
                          (cattle as any)[key]
                        )}
                      </td>
                    )
                  )}
                  <td>
                    <Link href={`/cattle/${cattle.id}`} className="buy-btn">
                      Buy Now
                    </Link>
                  </td>
                  {role === "admin" && (
                    <td>
                      {editingIndex === index ? (
                        <button onClick={() => handleSaveEdit(index)}>
                          Save
                        </button>
                      ) : (
                        <button onClick={() => handleEdit(index)}>Edit</button>
                      )}
                      <button onClick={() => handleDelete(cattle.id)}>
                        Delete
                      </button>
                    </td>
                  )}
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={role === "admin" ? 9 : 8} style={{ textAlign: "center" }}>
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </motion.table>
      </div>
    </div>
  );
};

export default CattleList;
