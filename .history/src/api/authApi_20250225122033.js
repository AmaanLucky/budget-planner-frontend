import axios from "axios";

const API_BASE_URL = "http://localhost:5001/auth"; // ✅ Adjust based on backend

// ✅ User Signup
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    console.log("✅ Signup Successful:", response.data);
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

    if (!response.data || !response.data.token) {
      console.error("❌ No token received in response:", response.data);
      return null;
    }

    console.log("✅ Login Successful. Token:", response.data.token);
    return response.data; // ✅ Return the whole response object, including token
  } catch (error) {
    console.error("❌ Login Error:", error.response?.data || error.message);
    return null;
  }
};

// ✅ Verify Token with Backend
export const verifyToken = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("❌ No token found in localStorage");
    return null;
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/verify`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("✅ Token Verified:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Token verification failed:", error.response?.data || error.message);
    return null;
  }
};

// ✅ Get Authorization Header
export const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  console.log("🔹 Sending Token:", token ? `Bearer ${token}` : "No Token Found"); // ✅ Debugging
  return token ? { Authorization: `Bearer ${token}` } : {};
};
