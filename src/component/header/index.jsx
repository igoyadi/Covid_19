import React from "react";
import { Moon, Sun, RefreshCw } from "lucide-react";
import { useLiveData } from "../../context/LiveDataContext";

const Header = ({ theme, toggleTheme, setRefresh, refresh, setHome, home }) => {
  const { liveData, setLiveData } = useLiveData();
  return (
    <header
      className={`${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      } shadow-lg sticky top-0 z-50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h1
            onClick={() => setHome(!home)}
            className={`text-lg sm:text-xl font-semibold transition duration-150 cursor-pointer ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            COVID-19 Global Dashboard
          </h1>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
            {/* Live/Mock Toggle */}
            <button
              onClick={() => setLiveData(!liveData)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                true ? "bg-green-500 text-white" : "bg-gray-500 text-white"
              }`}
              title="Toggle between real and mock data"
            >
              {liveData ? "Live Data" : "Mock Data"}
            </button>

            {/* Refresh Button */}
            <button
              onClick={() => setRefresh(!refresh)}
              className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-5 h-5 `} />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                theme === "dark"
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              title="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
