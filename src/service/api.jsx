import axios from 'axios';

// import MockApiService from './mockApi';

const ApiService = {
  async fetchCovidDataByCountry(country) {
    try {
      const response = await fetch(`https://disease.sh/v3/covid-19/states`);
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
          const response = await axios.get('https://disease.sh/v3/covid-19/all');
          const data = response.data;
          return data;
        } catch (error) {
          console.error('Error fetching global COVID-19 data:', error.message);
        }
      },
      async fetchAllCountriesData() {
        try {
          const response = await axios.get(
            'https://disease.sh/v3/covid-19/countries?yesterday=false&twoDaysAgo=false&sort=cases&allowNull=false'
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
            `https://disease.sh/v3/covid-19/historical/${country}?lastdays=60`
          );
          return response.data;
        } catch (error) {
          console.error(`Error fetching historical data for ${country}:`, error.message);
          throw error;
        }
      },
      async fetchCountryData(country) {
        try {
          const response = await axios.get(`https://disease.sh/v3/covid-19/countries/${country}`);
          return response.data;
        } catch (error) {
          console.error(`Failed to fetch data for ${country}:`, error.message);
          throw error;
        }
      }
    
  
  
  
};

export default ApiService;
