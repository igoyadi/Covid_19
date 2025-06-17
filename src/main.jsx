import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext";
import { LiveDataProvider } from "./context/LiveDataContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <LiveDataProvider>
        <App />
      </LiveDataProvider>
    </ThemeProvider>
  </StrictMode>
);
