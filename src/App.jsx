import { useState } from "react";
import "./App.css";
import { Header } from "./component";
import { useTheme } from "./context/ThemeContext";
import Dashboard from "./screens/dashboard/dashboard";
function App() {
  const { theme, toggleTheme } = useTheme();
  const [refresh,setRefresh]=useState(false);
  
  return (
    <>
      <div className="min-h-screen w-full bg-white text-black dark:bg-gray-900 dark:text-white">
        <Header theme={theme} toggleTheme={toggleTheme} setRefresh={setRefresh} refresh={refresh} />
        <Dashboard refresh={refresh} />
      </div>
    </>
  );
}

export default App;
