// src/components/CovidPieChart.jsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CovidPieChart = ({ covidData }) => {
  const { recovered, active, deaths, cases } = covidData;

  const data = [
    { name: "Recovered", value: recovered, fill: "url(#gradRecovered)" },
    { name: "Active", value: active, fill: "url(#gradActive)" },
    { name: "Deaths", value: deaths, fill: "url(#gradDeaths)" },
  ];

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          {/* SVG gradient definitions */}
          <defs>
            <linearGradient id="gradRecovered" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#478778" />
              <stop offset="100%" stopColor="#96DED1" />
            </linearGradient>
            <linearGradient id="gradActive" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E49B0F" />
              <stop offset="100%" stopColor="#FFFDD0" />
            </linearGradient>
            <linearGradient id="gradDeaths" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF0000" />
              <stop offset="100%" stopColor="#FAA0A0" />
            </linearGradient>
          </defs>

          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}        
            outerRadius={130}
            paddingAngle={5}         
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(0)}%)`
            }
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>

          <Tooltip formatter={(value) => new Intl.NumberFormat().format(value)} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CovidPieChart;
