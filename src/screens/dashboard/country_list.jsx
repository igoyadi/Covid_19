import React, { useState } from "react";
import { MapPin, ChevronDown, ChevronUp, Search } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const CountryList = ({
  countries,
  loading,
  selectedCountry,
  formatNumber,
  states,
  setSelectedCountry,
  setSelectedState,
  selectedState,
}) => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [showStates, setShowStates] = useState({});

  const filteredCountries = countries.filter((country) =>
    country.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleStates = (countryName) => {
    setShowStates((prev) => ({
      ...prev,
      [countryName]: !prev[countryName],
    }));
  };

  return (
    <div
      className={`$${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      } rounded-xl shadow-lg p-4 sm:p-6`}
    >
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="text-gray-400 w-5 h-5" />
        </div>
        <input
          type="text"
          placeholder="Search country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full pl-10 pr-4 py-3 rounded-lg ${
            theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100"
          } focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base`}
        />
      </div>

      <h2 className="text-lg sm:text-xl font-bold mb-4">Countries & States</h2>

      <div className="space-y-2 max-h-[60vh] overflow-y-auto">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-pulse">Loading data...</div>
          </div>
        ) : (
          filteredCountries.map((country) => (
            <div key={country.country}>
              <div
                className={`p-3 sm:p-4 rounded-lg cursor-pointer transition-all ${
                  selectedCountry?.country === country.country && !selectedState
                    ? "bg-blue-500 text-white"
                    : theme === "dark"
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <div
                  onClick={() => {
                    setSelectedCountry(country);
                    setSelectedState(null);
                    toggleStates(country.country);
                  }}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0"
                >
                  <div className="flex items-center space-x-3">
                    {country.flag && (
                      <img
                        src={country.flag}
                        alt={country.country}
                        className="w-6 h-4 sm:w-8 sm:h-6 object-cover rounded"
                      />
                    )}
                    <span className="font-medium text-sm sm:text-base">
                      {country.country}
                    </span>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end space-x-2">
                    <span className="text-xs sm:text-sm">
                      {formatNumber(country.totalCases)}
                    </span>
                    {states.length > 0 &&
                      selectedCountry?.country === country.country &&
                      (showStates[country.country] ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </div>
                </div>
              </div>

              {showStates[country.country] &&
                selectedCountry?.country === country.country &&
                states.length > 0 && (
                  <div className="ml-3 sm:ml-4 mt-1 space-y-1">
                    {states.map((state) => (
                      <div
                        key={state.state}
                        onClick={() => setSelectedState(state)}
                        className={`p-2 sm:p-3 rounded-lg cursor-pointer transition-all text-xs sm:text-sm ${
                          selectedState?.state === state.state
                            ? "bg-purple-500 text-white"
                            : theme === "dark"
                            ? "bg-gray-600 hover:bg-gray-500"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span>{state.state}</span>
                          </div>
                          <span className="text-[10px] sm:text-xs">
                            {formatNumber(state.totalCases)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CountryList;
