"use client";

import React, { useState } from "react";
import axios from "axios";
import "./BuyAnimal.css";

export default function BuyAnimal() {
  const [form, setForm] = useState({
    buyerName: "",
    contact: "",
    animalId: "",
    animalType: "",
    quantity: "",
    date: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/buyanimal", form);
      alert("✅ Request submitted successfully");
      setForm({
        buyerName: "",
        contact: "",
        animalId: "",
        animalType: "",
        quantity: "",
        date: "",
        notes: "",
      });
    } catch (err) {
      console.error("Error saving buy request", err);
      alert("❌ Error saving request");
    }
  };

  return (
    <>
     
      <div
        className="buy-page"
        style={{ backgroundImage: "url('/cow.jpg')" }} // ✅ Use your public folder image
      >
        <div className="overlay"></div>
        <div className="buy-card fade-in">
          <h2>Buy Animal Request Form</h2>

          <form onSubmit={handleSubmit} className="buy-form-vertical">
            <label>Buyer Name</label>
            <input
              type="text"
              name="buyerName"
              value={form.buyerName}
              onChange={handleChange}
              required
            />

            <label>Contact</label>
            <input
              type="text"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              required
            />

            <label>Animal ID</label>
            <input
              type="text"
              name="animalId"
              value={form.animalId}
              onChange={handleChange}
              required
            />

            <label>Animal Type</label>
            <input
              type="text"
              name="animalType"
              value={form.animalType}
              onChange={handleChange}
              required
            />

            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              required
            />

            <label>Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />

            <label>Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
            ></textarea>

            <button type="submit">Submit Request</button>
          </form>
        </div>
      </div>
    </>
  );
}
