// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/auth';

export const register = async (username, password) => {
  try {
    await axios.post(`${API_URL}/register`, { username, password });
  } catch (error) {
    throw error;
  }
};

// Include login function from previous example
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};
