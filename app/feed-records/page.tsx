"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/navbar";
import "./FeedRecords.css";
import { motion } from "framer-motion";

const FeedRecords = () => {
  const [feedRecords, setFeedRecords] = useState<any[]>([]);
  const [newRecord, setNewRecord] = useState({
    animalId: "",
    feedType: "",
    quantity: "",
    date: "",
    notes: "",
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  const handleAddRecord = () => {
    if (!newRecord.animalId || !newRecord.feedType || !newRecord.quantity) {
      alert("Please fill in Animal ID, Feed Type, and Quantity!");
      return;
    }
    setFeedRecords([...feedRecords, newRecord]);
    setNewRecord({
      animalId: "",
      feedType: "",
      quantity: "",
      date: "",
      notes: "",
    });
  };

  const handleDelete = (index: number) => {
    setFeedRecords(feedRecords.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditData(feedRecords[index]);
  };

  const handleSaveEdit = (index: number) => {
    const updated = [...feedRecords];
    updated[index] = editData;
    setFeedRecords(updated);
    setEditingIndex(null);
  };

  return (
    <div className="feed-page">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🌾 Feed Records
        </motion.h2>

        {role === "admin" && (
          <div className="add-form">
            <input
              type="text"
              placeholder="Animal ID"
              value={newRecord.animalId}
              onChange={(e) =>
                setNewRecord({ ...newRecord, animalId: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Feed Type"
              value={newRecord.feedType}
              onChange={(e) =>
                setNewRecord({ ...newRecord, feedType: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Quantity (kg)"
              value={newRecord.quantity}
              onChange={(e) =>
                setNewRecord({ ...newRecord, quantity: e.target.value })
              }
            />
            <input
              type="date"
              value={newRecord.date}
              onChange={(e) =>
                setNewRecord({ ...newRecord, date: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Notes"
              value={newRecord.notes}
              onChange={(e) =>
                setNewRecord({ ...newRecord, notes: e.target.value })
              }
            />
            <button onClick={handleAddRecord}>Add Record</button>
          </div>
        )}

        <table className="records-table">
          <thead>
            <tr>
              <th>Animal ID</th>
              <th>Feed Type</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Notes</th>
              {role === "admin" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {feedRecords.length > 0 ? (
              feedRecords.map((rec, i) => (
                <tr key={i}>
                  {["animalId", "feedType", "quantity", "date", "notes"].map(
                    (key) => (
                      <td key={key}>
                        {editingIndex === i ? (
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
                          (rec as any)[key]
                        )}
                      </td>
                    )
                  )}
                  {role === "admin" && (
                    <td>
                      {editingIndex === i ? (
                        <button onClick={() => handleSaveEdit(i)}>Save</button>
                      ) : (
                        <button onClick={() => handleEdit(i)}>Edit</button>
                      )}
                      <button onClick={() => handleDelete(i)}>Delete</button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={role === "admin" ? 6 : 5}>No feed records</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedRecords;
