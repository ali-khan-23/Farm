"use client";
import React, { useState } from "react";
import "./Installments.css";

const dummyInstallments = [
  {
    _id: "1",
    animal: { name: "Cow A" },
    amount: 5000,
    status: "paid",
    date: "2025-09-01",
  },
  {
    _id: "2",
    animal: { name: "Cow B" },
    amount: 3000,
    status: "pending",
    date: "2025-09-15",
  },
  {
    _id: "3",
    animal: { name: "Buffalo C" },
    amount: 4000,
    status: "overdue",
    date: "2025-09-20",
  },
];

const MyInstallments = () => {
  const [installments, setInstallments] = useState(dummyInstallments);
  const [searchTerm, setSearchTerm] = useState("");
  const [newInstallment, setNewInstallment] = useState({
    animal: { name: "" },
    amount: "",
    status: "pending",
    date: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const role = typeof window !== "undefined" ? localStorage.getItem("role") : "user";

  const filtered = installments.filter((inst) =>
    Object.values(inst)
      .map((v) => (typeof v === "object" ? v.name : v))
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    if (!newInstallment.animal.name || !newInstallment.amount || !newInstallment.date) {
      alert("Please fill all fields");
      return;
    }
    setInstallments([
      ...installments,
      { ...newInstallment, _id: Date.now().toString() },
    ]);
    setNewInstallment({ animal: { name: "" }, amount: "", status: "pending", date: "" });
  };

  const handleDelete = (id: string) => {
    setInstallments(installments.filter((i) => i._id !== id));
  };

  const handleEdit = (inst: any) => {
    setEditingId(inst._id);
    setNewInstallment({
      animal: { name: inst.animal.name },
      amount: inst.amount,
      status: inst.status,
      date: inst.date,
    });
  };

  const handleSaveEdit = () => {
    setInstallments(
      installments.map((i) =>
        i._id === editingId ? { ...i, ...newInstallment } : i
      )
    );
    setEditingId(null);
    setNewInstallment({ animal: { name: "" }, amount: "", status: "pending", date: "" });
  };

  return (
    <div className="installments-page">
      <div className="installments-card">
        <h2 className="installments-title">📑 My Installments</h2>

        <input
          type="text"
          placeholder="Search installments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        {role === "admin" && (
          <div className="add-form">
            <h3>{editingId ? "Edit Installment" : "Add Installment"}</h3>
            <input
              type="text"
              placeholder="Animal Name"
              value={newInstallment.animal.name}
              onChange={(e) =>
                setNewInstallment({
                  ...newInstallment,
                  animal: { name: e.target.value },
                })
              }
            />
            <input
              type="number"
              placeholder="Amount"
              value={newInstallment.amount}
              onChange={(e) =>
                setNewInstallment({ ...newInstallment, amount: e.target.value })
              }
            />
            <select
              value={newInstallment.status}
              onChange={(e) =>
                setNewInstallment({ ...newInstallment, status: e.target.value })
              }
            >
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
            <input
              type="date"
              value={newInstallment.date}
              onChange={(e) =>
                setNewInstallment({ ...newInstallment, date: e.target.value })
              }
            />
            {editingId ? (
              <button onClick={handleSaveEdit}>💾 Save</button>
            ) : (
              <button onClick={handleAdd}>➕ Add</button>
            )}
          </div>
        )}

        <table className="installments-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Animal</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              {role === "admin" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((inst, index) => (
                <tr key={inst._id}>
                  <td>{index + 1}</td>
                  <td>{inst.animal.name}</td>
                  <td>💵 {inst.amount}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        inst.status === "paid"
                          ? "status-paid"
                          : inst.status === "pending"
                          ? "status-pending"
                          : "status-overdue"
                      }`}
                    >
                      {inst.status}
                    </span>
                  </td>
                  <td>{new Date(inst.date).toLocaleDateString()}</td>
                  {role === "admin" && (
                    <td>
                      <button onClick={() => handleEdit(inst)}>✏️ Edit</button>
                      <button onClick={() => handleDelete(inst._id)}>🗑 Delete</button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={role === "admin" ? 6 : 5} style={{ textAlign: "center" }}>
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyInstallments;
