import "./App.css";
import { Header } from "./component";
import { useTheme } from "./context/ThemeContext";
import Dashboard from "./screens/dashboard/dashboard";
function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <div className="min-h-screen w-full bg-white text-black dark:bg-gray-900 dark:text-white">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Dashboard />
      </div>
    </>
  );
}

export default App;
