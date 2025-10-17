"use client";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "./Animal.css";

const MyAnimals = () => {
  // ✅ Dummy animals (fallback)
  const dummyAnimals = useMemo(
    () => [
      { id: "d1", name: "Brown Cow", type: "Cow", price: "120,000 PKR", date: "2025-01-15", isDummy: true },
      { id: "d2", name: "Black Goat", type: "Goat", price: "25,000 PKR", date: "2025-02-02", isDummy: true },
      { id: "d3", name: "White Sheep", type: "Sheep", price: "35,000 PKR", date: "2025-03-20", isDummy: true },
    ],
    []
  );

  const [animals, setAnimals] = useState(dummyAnimals);
  const [search, setSearch] = useState("");
  const [newAnimal, setNewAnimal] = useState({ name: "", type: "", price: "", date: "" });

  const role = typeof window !== "undefined" ? localStorage.getItem("role") : null;
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // ✅ Fetch animals from backend
  useEffect(() => {
    if (!token) return;
    axios
      .get("/api/animals", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setAnimals([...dummyAnimals, ...res.data]);
      })
      .catch((err) => console.error("Error fetching animals:", err));
  }, [token, dummyAnimals]);

  // ✅ Filter animals
  const filteredAnimals = animals.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.type.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Add new animal (Admin only)
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/animals", newAnimal, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnimals((prev) => [...prev.filter((a) => a.isDummy), res.data, ...prev.filter((a) => !a.isDummy)]);
      setNewAnimal({ name: "", type: "", price: "", date: "" });
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  return (
    <div
      className="animal-page"
      style={{
        backgroundImage: "url('/start.jpg')", // ✅ Using public folder image
      }}
    >
      <div className="animal-container">
        <h2 className="animal-title">🐄 My Animals</h2>

        <input
          type="text"
          placeholder="🔍 Search by name or type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />

        {role === "admin" && (
          <form onSubmit={handleAdd} className="animal-form">
            <input
              type="text"
              placeholder="Animal Name"
              value={newAnimal.name}
              onChange={(e) => setNewAnimal({ ...newAnimal, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Type"
              value={newAnimal.type}
              onChange={(e) => setNewAnimal({ ...newAnimal, type: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Price"
              value={newAnimal.price}
              onChange={(e) => setNewAnimal({ ...newAnimal, price: e.target.value })}
              required
            />
            <input
              type="date"
              value={newAnimal.date}
              onChange={(e) => setNewAnimal({ ...newAnimal, date: e.target.value })}
              required
            />
            <button type="submit">➕ Add Animal</button>
          </form>
        )}

        <div className="animal-table-wrapper">
          <table className="animal-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Animal Name</th>
                <th>Type</th>
                <th>Price</th>
                <th>Purchase Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredAnimals.map((animal, index) => (
                <tr key={animal._id || animal.id} className={index % 2 === 0 ? "even" : "odd"}>
                  <td>{index + 1}</td>
                  <td>{animal.name}</td>
                  <td>{animal.type}</td>
                  <td>{animal.price}</td>
                  <td>{animal.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyAnimals;
