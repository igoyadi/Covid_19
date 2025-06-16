import React, { useState } from "react";
import { MapPin } from "lucide-react";
import {
  Card,
  CovidAreaChart,
  CovidPieChart,
  CovidBarChart,
  Map,
} from "../../component";

const DetailsPanel = ({
  theme,
  selectedCountry,
  selectedState,
  pieData,
  historicalData,
  states,
  formatNumber,
}) => {
  const region = selectedState || selectedCountry;
  const [view, setView] = useState("chart");
  const graphData = {
    "IN-UP": 1200,
    "IN-MH": 980,
    "IN-TN": 760,
    "IN-KA": 640,
    "IN-DL": 520,
    "IN-GJ": 410,
    "IN-RJ": 320,
    "IN-WB": 250,
    "IN-BR": 190,
    "IN-PB": 120,
  };
  const values = Object.values(graphData);
  const maxvalue = Math.max(...values);
  const minvalue = Math.min(...values);

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      } rounded-xl shadow-lg p-4 sm:p-6`}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold flex items-center space-x-3">
          {selectedState ? (
            <>
              <MapPin className="w-6 h-6" />
              <span>
                {selectedState.state}, {selectedState.country}
              </span>
            </>
          ) : (
            <>
              {selectedCountry?.flag && (
                <img
                  src={selectedCountry.flag}
                  alt={selectedCountry.country}
                  className="w-8 h-6 sm:w-10 sm:h-8 object-cover rounded"
                />
              )}
              <span>{selectedCountry?.country}</span>
            </>
          )}
        </h2>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          {["chart", "table", "map"].map((mode) => (
            <button
              key={mode}
              onClick={() => setView(mode)}
              className={`px-4 py-2 rounded-lg text-sm sm:text-base ${
                view === mode
                  ? "bg-blue-500 text-white"
                  : theme === "dark"
                  ? "bg-gray-700"
                  : "bg-gray-200"
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card title="Total Cases" value={formatNumber(region?.totalCases)} />
        <Card title="Active Case" value={formatNumber(region?.activeCases)} />
        <Card title="Recovered" value={formatNumber(region?.recovered)} />
        <Card title="Deaths" value={formatNumber(region?.deaths)} />
      </div>

      {/* View: Chart */}
      {view === "chart" && (
        <div className="space-y-6">
          {!selectedState && historicalData.length > 0 && (
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4">30-Day Trend</h3>
              <div className="h-[300px] sm:h-[400px] w-full">
                <CovidAreaChart chartData={historicalData} country={region} />
              </div>
            </div>
          )}

          {pieData && (
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4">Case Distribution</h3>
              <CovidPieChart covidData={pieData} />
            </div>
          )}

          {!selectedState && states.length > 0 && (
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4">
                Top States/Provinces by Cases
              </h3>
              <div className="h-[300px] sm:h-[400px] w-full">
                <CovidBarChart
                  state={true}
                  countriesData={states
                    .slice(0, 10)
                    .sort((a, b) => b.totalCases - a.totalCases)}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {view === "map" && (
        <div className="space-y-6">
          <Map
            graphData={graphData}
            maxvalue={maxvalue}
            minvalue={minvalue}
            country={selectedCountry.country}
          />
        </div>
      )}

      {/* View: Table */}
      {view === "table" && region && (
        <div className="overflow-x-auto mt-6">
          <table className="w-full text-sm">
            <thead>
              <tr
                className={`${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <th className="px-4 py-3 text-left">Metric</th>
                <th className="px-4 py-3 text-right">Value</th>
                {!selectedState && (
                  <th className="px-4 py-3 text-right">Per Million</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                {
                  label: "Total Cases",
                  value: region.totalCases,
                  pm: selectedCountry?.casesPerOneMillion,
                },
                {
                  label: "Active Cases",
                  value: region.activeCases,
                  pm: selectedCountry?.activePerOneMillion,
                },
                {
                  label: "Recovered",
                  value: region.recovered,
                  pm: selectedCountry?.recoveredPerOneMillion,
                },
                {
                  label: "Deaths",
                  value: region.deaths,
                  pm: selectedCountry?.deathsPerOneMillion,
                },
                ...(selectedCountry?.critical
                  ? [
                      {
                        label: "Critical",
                        value: selectedCountry.critical,
                        pm: selectedCountry?.criticalPerOneMillion,
                      },
                    ]
                  : []),
                ...(region?.tests
                  ? [
                      {
                        label: "Tests",
                        value: region.tests,
                        pm: selectedCountry?.testsPerOneMillion,
                      },
                    ]
                  : []),
                ...(region?.population
                  ? [
                      {
                        label: "Population",
                        value: region.population,
                      },
                    ]
                  : []),
                ...(selectedCountry?.continent
                  ? [
                      {
                        label: "Continent",
                        value: selectedCountry.continent,
                      },
                    ]
                  : []),
              ].map((row, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-3 whitespace-nowrap">{row.label}</td>
                  <td className="px-4 py-3 text-right font-medium">
                    {formatNumber(row.value)}
                  </td>
                  {!selectedState && (
                    <td className="px-4 py-3 text-right text-gray-500">
                      {row.pm ? formatNumber(row.pm) : "-"}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DetailsPanel;
