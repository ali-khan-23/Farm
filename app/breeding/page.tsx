"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/navbar";
import "./Breeding.css";
import { motion } from "framer-motion";

const Breeding = () => {
  const [breedingRecords, setBreedingRecords] = useState<any[]>([]);
  const [newRecord, setNewRecord] = useState({
    cowId: "",
    bullId: "",
    date: "",
    expectedDueDate: "",
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
    if (!newRecord.cowId || !newRecord.bullId || !newRecord.date) {
      alert("Please fill in Cow ID, Bull ID, and Date!");
      return;
    }
    setBreedingRecords([...breedingRecords, newRecord]);
    setNewRecord({
      cowId: "",
      bullId: "",
      date: "",
      expectedDueDate: "",
      notes: "",
    });
  };

  const handleDelete = (index: number) => {
    setBreedingRecords(breedingRecords.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditData(breedingRecords[index]);
  };

  const handleSaveEdit = (index: number) => {
    const updated = [...breedingRecords];
    updated[index] = editData;
    setBreedingRecords(updated);
    setEditingIndex(null);
  };

  return (
    <div className="breeding-page">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🧬 Breeding Records
        </motion.h2>

        {role === "admin" && (
          <div className="add-form">
            <input
              type="text"
              placeholder="Cow ID"
              value={newRecord.cowId}
              onChange={(e) =>
                setNewRecord({ ...newRecord, cowId: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Bull ID"
              value={newRecord.bullId}
              onChange={(e) =>
                setNewRecord({ ...newRecord, bullId: e.target.value })
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
              type="date"
              placeholder="Expected Due Date"
              value={newRecord.expectedDueDate}
              onChange={(e) =>
                setNewRecord({
                  ...newRecord,
                  expectedDueDate: e.target.value,
                })
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
              <th>Cow ID</th>
              <th>Bull ID</th>
              <th>Date</th>
              <th>Expected Due Date</th>
              <th>Notes</th>
              {role === "admin" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {breedingRecords.length > 0 ? (
              breedingRecords.map((rec, i) => (
                <tr key={i}>
                  {["cowId", "bullId", "date", "expectedDueDate", "notes"].map(
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
                <td colSpan={role === "admin" ? 6 : 5}>No breeding records</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Breeding;
