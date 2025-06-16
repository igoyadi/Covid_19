// src/components/customise_card/Card.jsx
import React from "react";
import { useTheme } from "../../context/ThemeContext"; // ✅ Add this

const Card = ({ title, value, icon: Icon }) => {
  const { theme } = useTheme(); // ✅ Access theme from context

  return (
    <>
      <div
        className={`${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-blue-500">{value}</p>
          </div>
          {Icon && <Icon className="w-10 h-10 text-blue-500 opacity-50" />}
        </div>
      </div>
    </>
  );
};

export default Card;
