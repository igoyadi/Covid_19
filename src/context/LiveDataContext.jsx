// src/context/LiveDataContext.js
import React, { createContext, useState, useContext } from "react";

// Create context
const LiveDataContext = createContext();

// Create provider
export const LiveDataProvider = ({ children }) => {
  const [liveData, setLiveData] = useState(true); // or [] if it's an array

  return (
    <LiveDataContext.Provider value={{ liveData, setLiveData }}>
      {children}
    </LiveDataContext.Provider>
  );
};

// Custom hook for easy access
export const useLiveData = () => useContext(LiveDataContext);
