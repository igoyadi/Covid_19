import axios from 'axios';

// import MockApiService from './mockApi';
const BASEURL = "https://covid19-backend-jq92.onrender.com"
const MockApiService = {
  async fetchCovidDataMapCountry(country) {
    try {
      const response = await axios.get(`${BASEURL}/api/map/${country}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch COVID-19 data for ${country}:`, error.message);
      throw error;
    }
  },
  async fetchCovidDataByCountry(country) {
    try {
      const response = await fetch(`${BASEURL}/api/states/${country}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to fetch COVID-19 data for ${country}:`, error.message);
      throw error;
    }
  },
  

    async fetchGlobalCovidData() {
        try {
          console.log("mockdata")
          const response = await axios.get(`${BASEURL}/api/global`);
          const data = response.data;
          return data;
        } catch (error) {
          console.error('Error fetching global COVID-19 data:', error.message);
        }
      },
      async fetchAllCountriesData() {
        try {
          const response = await axios.get(
          `${BASEURL}/api/countries`
          );
          return response.data;
        } catch (error) {
          console.error('Error fetching countries COVID-19 data:', error.message);
          throw error;
        }
      },
      async fetchHistoricalDataByCountry(country) {
        try {
          const response = await axios.get(
            `${BASEURL}/api/historical/${country}?lastdays=60`
          );
          return response.data;
        } catch (error) {
          console.error(`Error fetching historical data for ${country}:`, error.message);
          throw error;
        }
      },
      async fetchCountryData(country) {
        try {
          const response = await axios.get(`${BASEURL}/api/countries/${country}`);
          return response.data;
        } catch (error) {
          console.error(`Failed to fetch data for ${country}:`, error.message);
          throw error;
        }
      }
    
  
  
  
};

export default MockApiService;
