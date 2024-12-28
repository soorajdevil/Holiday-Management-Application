import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

export const fetchHolidays = async (country, year) => {
  const response = await axios.get(`${API_BASE_URL}/holidays/`, { params: { country, year } });
  return response.data;
};

export const searchHolidays = async (country, year, query) => {
  const response = await axios.get(`${API_BASE_URL}/holidays/search/`, { params: { country, year, query } });
  return response.data;
};
