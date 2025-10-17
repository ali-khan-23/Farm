"use client";
import React, { useEffect, useState } from "react";
import "./AnimalProgress.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface AnimalRecord {
  id: number;
  name: string;
  type: string;
  weight: number;
  milkProduction: number;
  healthScore: number;
  date: string;
}

const AnimalProgress: React.FC = () => {
  const [data, setData] = useState<AnimalRecord[]>([]);

  useEffect(() => {
    // 🐮 Dummy data (replace with API later)
    const dummyData: AnimalRecord[] = [
      {
        id: 1,
        name: "Bella",
        type: "Cow",
        weight: 420,
        milkProduction: 18,
        healthScore: 92,
        date: "2025-10-01",
      },
      {
        id: 2,
        name: "Rosie",
        type: "Cow",
        weight: 435,
        milkProduction: 20,
        healthScore: 95,
        date: "2025-10-02",
      },
      {
        id: 3,
        name: "Milo",
        type: "Buffalo",
        weight: 510,
        milkProduction: 22,
        healthScore: 88,
        date: "2025-10-03",
      },
      {
        id: 4,
        name: "Daisy",
        type: "Cow",
        weight: 445,
        milkProduction: 21,
        healthScore: 90,
        date: "2025-10-04",
      },
    ];

    setData(dummyData);
  }, []);

  return (
    <div className="animal-progress-page">
      <div className="animal-progress-card fade-in">
        <h2>Animal Progress Overview</h2>
        <p className="subheading">Daily performance of your livestock</p>

        <div className="chart-section">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="weight" stroke="#228B22" strokeWidth={2} />
              <Line type="monotone" dataKey="milkProduction" stroke="#2e8b57" strokeWidth={2} />
              <Line type="monotone" dataKey="healthScore" stroke="#ff9900" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <table className="animal-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Weight (kg)</th>
              <th>Milk (L/day)</th>
              <th>Health</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((animal) => (
              <tr key={animal.id}>
                <td>{animal.id}</td>
                <td>{animal.name}</td>
                <td>{animal.type}</td>
                <td>{animal.weight}</td>
                <td>{animal.milkProduction}</td>
                <td>{animal.healthScore}</td>
                <td>{animal.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnimalProgress;
