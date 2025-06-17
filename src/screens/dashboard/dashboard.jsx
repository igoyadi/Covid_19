import {
  Card,
  CovidBarChart,
} from "../../component/index";
import { useTheme } from "../../context/ThemeContext";
import React, { useState, useEffect } from "react";
import ApiService from "../../service/api";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Shield,
  Globe,
  AlertCircle,
} from "lucide-react";
import CountryList from "./country_list";
import DetailsPanel from "./detail_panel";
import { useLiveData } from "../../context/LiveDataContext";

const Dashboard = (refresh) => {
  const { theme } = useTheme();
  const { liveData } = useLiveData();
  const api = ApiService(liveData);
  const [countries, setCountries] = useState([]); //imp
  const [states, setStates] = useState([]); //imp
  const [selectedCountry, setSelectedCountry] = useState(); //imp
  const [selectedState, setSelectedState] = useState(null);
  const [pieData, setpieData] = useState(null); //imp
  const [loading, setLoading] = useState(true); //imp
  const [error, setError] = useState(null);
  // const [view, setView] = useState("chart"); //imp
  const [globalData, setGlobalData] = useState(null); //imp
  const [historicalData, setHistoricalData] = useState([]); //imp
  const [graphData, setGraphData] = useState([]);


  const fetchStateData = async (countryCode, countryName) => {
    try {
      let stateData = [];
      // Try to fetch real state data
      if (countryCode === 'US' || countryName === 'USA' || countryName === 'India') {
        const data = await api.fetchCovidDataByCountry(countryName)
        stateData = data.map(state => ({
          state: state.state,
          country: countryName,
          totalCases: state.cases,
          activeCases: state.active,
          recovered: state.recovered || 0,
          deaths: state.deaths,
          todayCases: state.todayCases,
          todayDeaths: state.todayDeaths,
          tests: state.tests,
          population: state.population,
          testsPerOneMillion: state.testsPerOneMillion,
          deathsPerOneMillion: state.deathsPerOneMillion,
          casesPerOneMillion: state.casesPerOneMillion
        }));
      } else {
        // For other countries, use empty array or mock data
        stateData = [];
      }
      
      setStates(stateData);
    } catch (error) {
      console.error('Error fetching state data:', error);
      stateData = [];
    }
  };

  const loadGlobalData = async () => {
    setLoading(true);
    try {
      const data = await api.fetchGlobalCovidData();
      console.log(data, "data");
      setGlobalData({
        cases: data.cases,
        recovered: data.recovered,
        deaths: data.deaths,
        active: data.active,
        updated: data.updated,
      });
      setGlobalData(data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };
  const loadGraphData = async (country) => {
    setLoading(true);
    try {
      console.log("############################")
      const data = await api.fetchCovidDataMapCountry(country);
      console.log(data, "data");
      setGlobalData({
        cases: data.cases,
        recovered: data.recovered,
        deaths: data.deaths,
        active: data.active,
        updated: data.updated,
      });
      // setGraphData(data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  const loadCountriesData = async () => {
    setLoading(true);
    try {
      const data = await api.fetchAllCountriesData();
      const formattedCountries = data.map((country) => ({
        country: country.country,
        countryCode: country.countryInfo.iso2,
        totalCases: country.cases,
        activeCases: country.active,
        recovered: country.recovered,
        deaths: country.deaths,
        todayCases: country.todayCases,
        todayDeaths: country.todayDeaths,
        todayRecovered: country.todayRecovered,
        critical: country.critical,
        tests: country.tests,
        population: country.population,
        flag: country.countryInfo.flag,
        continent: country.continent,
        casesPerOneMillion: country.casesPerOneMillion,
        deathsPerOneMillion: country.deathsPerOneMillion,
        testsPerOneMillion: country.testsPerOneMillion,
        activePerOneMillion: country.activePerOneMillion,
        recoveredPerOneMillion: country.recoveredPerOneMillion,
        criticalPerOneMillion: country.criticalPerOneMillion,
      }));
      setCountries(formattedCountries);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  const loadCountryData = async (country) => {
    setLoading(true);
    try {
      const data = await api.fetchCountryData(country);
      console.log(data, "piedata");
      setpieData({
        recovered: data.recovered,
        active: data.active,
        deaths: data.deaths,
        cases: data.cases,
      });
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  const loadHistoricalData = async (country) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.fetchHistoricalDataByCountry(country);
      if (!data?.timeline) {
        throw new Error("Invalid data format received");
      }
      const { cases, deaths, recovered } = data.timeline;
      const formattedData = Object.keys(cases).map((date) => ({
        date: new Date(date).toLocaleDateString("en-CA"),
        cases: cases[date],
        deaths: deaths[date],
        recovered: recovered[date],
      }));
      console.log(formattedData, "formattedData");
      setHistoricalData(formattedData);
    } catch (err) {
      console.error(`Failed to load historical data for ${country}:`, err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGlobalData();
    loadCountriesData();
  }, [liveData,refresh]);

  useEffect(() => {
    if(selectedCountry){
      loadHistoricalData(selectedCountry?.country);
      loadCountryData(selectedCountry?.country);
      
      const countriesWithStates = ['USA','India'];
      if (countriesWithStates.includes(selectedCountry.country) || selectedCountry.countryCode) {
        loadGraphData(selectedCountry.country)
        fetchStateData(selectedCountry.countryCode, selectedCountry.country);
      } else {
        setStates([]);
      }
    }
    
  }, [selectedCountry,liveData]);

  


  const topCountries = [...countries]
    .sort((a, b) => b.totalCases - a.totalCases)
    .slice(0, 5);

  const formatNumber = (num) => {
    return num ? num.toLocaleString() : "0";
  };

  

  return (
    <>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-gray-50 text-gray-900"
        }`}
      >
        {/* {error && (
      <div className="max-w-7xl mx-auto px-4 mt-4">
        <div className={`flex items-center p-4 rounded-lg ${theme === "dark" ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800'}`}>
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>{error}</span>
        </div>
      </div>
    )} */}

        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {globalData && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Globe className="w-6 h-6 mr-2" />
                Global Statistics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card
                  title="Total Cases"
                  value={formatNumber(globalData.cases)}
                  icon={Activity}
                />
                <Card
                  title="Active Case"
                  value={formatNumber(globalData.active)}
                  icon={TrendingUp}
                />
                <Card
                  title="Recovered"
                  value={formatNumber(globalData.recovered)}
                  icon={Shield}
                />
                <Card
                  title="Deaths"
                  value={formatNumber(globalData.deaths)}
                  icon={TrendingDown}
                />
              </div>
              {globalData.updated && (
                <p className="text-sm text-gray-500 mt-4 text-center">
                  Last updated: {new Date(globalData.updated).toLocaleString()}
                </p>
              )}
            </div>
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <CountryList
                countries={countries}
                loading={loading}
                selectedCountry={selectedCountry}
                formatNumber={formatNumber}
                states={states}
                setSelectedCountry={setSelectedCountry}
                setSelectedState={setSelectedState}
                selectedState={selectedState}
              />
            </div>
            {/* Details Panel */}
            <div className="lg:col-span-2">
              {selectedCountry || selectedState ? (
                <DetailsPanel
                  theme={theme}
                  graphData={graphData}
                  selectedCountry={selectedCountry}
                  selectedState={selectedState}
                  pieData={pieData}
                  historicalData={historicalData}
                  states={states}
                  formatNumber={formatNumber}
                />
              ) : (
                <div
                  className={`${
                    theme === "dark" ? "bg-gray-800" : "bg-white"
                  } rounded-xl shadow-lg p-6`}
                >
                  <h2 className="text-2xl font-bold mb-6">
                    Top 5 Affected Countries
                  </h2>
                  <div className="h-[400px] w-full">
                    <CovidBarChart countriesData={topCountries} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  ); // Render logic exists in your provided code and remains unchanged.
};

export default Dashboard;
