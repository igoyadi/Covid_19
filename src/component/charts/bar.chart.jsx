// src/components/TopCountriesBarChart.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

const CovidBarChart = ({ countriesData = [] ,state=false }) => {
    const { theme} = useTheme();
  return (
    <div className={`${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      } rounded-xl shadow-lg p-6`} style={{width: '100% ',height: '100%'}}>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={countriesData}
        //   margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={theme === "dark" ? "#374151" : "#e5e7eb"}
          />
          <XAxis
            dataKey={state?"state":"country"}
            stroke={theme === "dark" ? "#9ca3af" : "#6b7280"}
          />
          <YAxis stroke={theme === "dark" ? "#9ca3af" : "#6b7280"} />
          <Tooltip
            contentStyle={{
              backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            formatter={(value) => value}
          />
          <Legend />
          <Bar dataKey="active" fill="#8884d8" name="Active" />
          <Bar dataKey="recovered" fill="#00C49F" name="Recovered" />
          <Bar dataKey="deaths" fill="#FF4D4D" name="Deaths" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CovidBarChart;
