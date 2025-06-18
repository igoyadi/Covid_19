// src/components/CovidAreaChart.jsx
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

const CovidAreaChart = ({ chartData = [], country = "Unknown" }) => {
  const { theme } = useTheme();
  return (
    <div className={`${
      theme === "dark" ? "bg-gray-800" : "bg-white"
    } rounded-xl  p-6`} style={{width: '100% ',height: '100%'}}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#E49B0F" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FFFDD0" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorRecovered" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#478778" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#96DED1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorDeaths" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF0000" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FAA0A0" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10 }}
            stroke={theme === "dark" ? "#9ca3af" : "#6b7280"}
          />
          <YAxis
            stroke={theme === "dark" ? "#9ca3af" : "#6b7280"}
            tick={{ fontSize: 10 }}
          />

          <CartesianGrid
            strokeDasharray="3 3"
            stroke={theme === "dark" ? "#374151" : "#e5e7eb"}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="cases"
            stroke="#E49B0F"
            fillOpacity={1}
            fill="url(#colorCases)"
          />
          <Area
            type="monotone"
            dataKey="recovered"
            stroke="#478778"
            fillOpacity={1}
            fill="url(#colorRecovered)"
          />
          <Area
            type="monotone"
            dataKey="deaths"
            stroke="#FF0000"
            fillOpacity={1}
            fill="url(#colorDeaths)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CovidAreaChart;
