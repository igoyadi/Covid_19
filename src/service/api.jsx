import axios from 'axios';
import MockApiService from './mockapi';

const ApiService = (liveData) => ({
  async fetchCovidDataMapCountry(country) {
    if (liveData) {
      return MockApiService.fetchCovidDataMapCountry(country);
    }

    try {
      // const response = await axios.get('https://disease.sh/v3/covid-19/states');
      return [];
    } catch (error) {
      console.error(`Failed to fetch COVID-19 data for ${country}:`, error.message);
      throw error;
    }
  },
  async fetchCovidDataByCountry(country) {
    if (liveData) {
      return MockApiService.fetchCovidDataByCountry(country);
    }

    try {
      const response = await axios.get('https://disease.sh/v3/covid-19/states');
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch COVID-19 data for ${country}:`, error.message);
      throw error;
    }
  },

  async fetchGlobalCovidData() {
    if (liveData) {
      return MockApiService.fetchGlobalCovidData();
    }

    try {
      const response = await axios.get('https://disease.sh/v3/covid-19/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching global COVID-19 data:', error.message);
      throw error;
    }
  },

  async fetchAllCountriesData() {
    if (liveData) {
      return MockApiService.fetchAllCountriesData();
    }

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
    if (liveData) {
      return MockApiService.fetchHistoricalDataByCountry(country);
    }

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
    if (liveData) {
      return MockApiService.fetchCountryData(country);
    }

    try {
      const response = await axios.get(`https://disease.sh/v3/covid-19/countries/${country}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch data for ${country}:`, error.message);
      throw error;
    }
  }
});

export default ApiService;
