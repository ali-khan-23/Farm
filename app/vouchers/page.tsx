"use client";
import React, { useState } from "react";
import Image from "next/image";
import "./Vouchers.css";

const bgImage = "/classic.jpg"; // ✅ public folder image

const Vouchers = () => {
  const [vouchers, setVouchers] = useState([
    { id: 1, month: "January", title: "Winter Start Offer", code: "JAN10", discount: 10, expiry: "2025-01-31", status: "Paid" },
    { id: 2, month: "February", title: "Valentine Deal", code: "FEB14", discount: 14, expiry: "2025-02-28", status: "Unused" },
    { id: 3, month: "March", title: "Spring Sale", code: "MAR20", discount: 20, expiry: "2025-03-31", status: "Paid" },
    { id: 4, month: "April", title: "Eid Special", code: "APR25", discount: 25, expiry: "2025-04-30", status: "Unused" },
    { id: 5, month: "May", title: "Summer Starter", code: "MAY15", discount: 15, expiry: "2025-05-31", status: "Paid" },
    { id: 6, month: "June", title: "Mid-Year Offer", code: "JUN18", discount: 18, expiry: "2025-06-30", status: "Paid" },
    { id: 7, month: "July", title: "Independence Deal", code: "JUL23", discount: 23, expiry: "2025-07-31", status: "Unused" },
    { id: 8, month: "August", title: "Monsoon Discount", code: "AUG12", discount: 12, expiry: "2025-08-31", status: "Paid" },
    { id: 9, month: "September", title: "Back to School", code: "SEP22", discount: 22, expiry: "2025-09-30", status: "Paid" },
    { id: 10, month: "October", title: "Autumn Fest", code: "OCT30", discount: 30, expiry: "2025-10-31", status: "Unused" },
    { id: 11, month: "November", title: "Black Friday", code: "NOV40", discount: 40, expiry: "2025-11-30", status: "Paid" },
    { id: 12, month: "December", title: "Christmas & New Year", code: "DEC35", discount: 35, expiry: "2025-12-31", status: "Paid" },
  ]);

  const role = typeof window !== "undefined" ? localStorage.getItem("role") : "user";

  const [newVoucher, setNewVoucher] = useState({
    month: "",
    title: "",
    code: "",
    discount: "",
    expiry: "",
    status: "Unused",
  });

  const [editId, setEditId] = useState<number | null>(null);

  const handleAdd = () => {
    if (!newVoucher.month || !newVoucher.title || !newVoucher.code || !newVoucher.discount || !newVoucher.expiry) {
      alert("Please fill all fields");
      return;
    }
    setVouchers([...vouchers, { ...newVoucher, id: Date.now() }]);
    setNewVoucher({ month: "", title: "", code: "", discount: "", expiry: "", status: "Unused" });
  };

  const handleDelete = (id: number) => {
    setVouchers(vouchers.filter((v) => v.id !== id));
  };

  const handleSaveEdit = () => {
    setVouchers(vouchers.map((v) => (v.id === editId ? { ...newVoucher, id: editId } : v)));
    setEditId(null);
    setNewVoucher({ month: "", title: "", code: "", discount: "", expiry: "", status: "Unused" });
  };

  const handleEdit = (voucher: any) => {
    setEditId(voucher.id);
    setNewVoucher(voucher);
  };

  return (
    <div className="voucher-page" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="voucher-overlay">
        <h1 className="voucher-title">🎟️ My Vouchers</h1>

        {role === "admin" && (
          <div className="add-form">
            <h3>{editId ? "Edit Voucher" : "Add New Voucher"}</h3>
            <input
              type="text"
              placeholder="Month"
              value={newVoucher.month}
              onChange={(e) => setNewVoucher({ ...newVoucher, month: e.target.value })}
            />
            <input
              type="text"
              placeholder="Title"
              value={newVoucher.title}
              onChange={(e) => setNewVoucher({ ...newVoucher, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Code"
              value={newVoucher.code}
              onChange={(e) => setNewVoucher({ ...newVoucher, code: e.target.value })}
            />
            <input
              type="number"
              placeholder="Discount %"
              value={newVoucher.discount}
              onChange={(e) => setNewVoucher({ ...newVoucher, discount: e.target.value })}
            />
            <input
              type="date"
              placeholder="Expiry"
              value={newVoucher.expiry}
              onChange={(e) => setNewVoucher({ ...newVoucher, expiry: e.target.value })}
            />
            <select
              value={newVoucher.status}
              onChange={(e) => setNewVoucher({ ...newVoucher, status: e.target.value })}
            >
              <option value="Paid">Paid</option>
              <option value="Unused">Unused</option>
            </select>

            {editId ? (
              <button onClick={handleSaveEdit}>💾 Save</button>
            ) : (
              <button onClick={handleAdd}>➕ Add</button>
            )}
          </div>
        )}

        <div className="voucher-grid">
          {vouchers.map((voucher) => (
            <div key={voucher.id} className="voucher-card">
              <h2>{voucher.month}</h2>
              <p><strong>{voucher.title}</strong></p>
              <p><strong>Code:</strong> {voucher.code}</p>
              <p><strong>Discount:</strong> {voucher.discount}%</p>
              <p className={voucher.status === "Paid" ? "paid" : "unused"}>
                {voucher.status}
              </p>

              {role === "admin" && (
                <div className="voucher-actions">
                  <button onClick={() => handleEdit(voucher)}>✏️ Edit</button>
                  <button onClick={() => handleDelete(voucher.id)}>🗑 Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vouchers;
