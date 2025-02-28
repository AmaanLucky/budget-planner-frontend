import axios from "axios";

const API_BASE_URL = "http://localhost:5001/auth";

// ✅ Signup API
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    console.error("❌ Signup Error:", error.response?.data || error.message);
    return null;
  }
};

// ✅ Login API
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("❌ Login Error:", error.response?.data || error.message);
    return null;
  }
};