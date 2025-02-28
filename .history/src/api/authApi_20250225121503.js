import axios from "axios";

const API_BASE_URL = "http://localhost:5001/auth"; // ✅ Adjust based on backend

// ✅ User Signup
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    console.error("❌ Signup Error:", error.response?.data || error.message);
    return null;
  }
};

// ✅ User Login
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("❌ Login Error:", error.response?.data || error.message);
    return null;
  }
};

// ✅ Verify Token with Backend
export const verifyToken = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/verify`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data; // Returns user data if valid
  } catch (error) {
    console.error("❌ Token verification failed:", error.response?.data || error.message);
    return null;
  }
};

export const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  console.log("🔹 Sending Token:", token); // ✅ Debugging
  return token ? { Authorization: `Bearer ${token}` } : {};
};