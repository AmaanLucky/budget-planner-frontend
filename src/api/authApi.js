import axios from "axios";

const API_BASE_URL = "https://budget-planner-backend-07kq.onrender.com/auth";

export const createTestUser = async () => {
  try {
    const testUserData = {
      name: "Test User",
      email: "example@gmail.com",
      password: "Password@123"
    };
    const response = await axios.post(`${API_BASE_URL}/signup`, testUserData);
    return response.data;
  } 
  catch (error) {
    if (error.response?.status === 400 && error.response?.data?.error === "User already exists") {
      console.log("Test user already exists");
      return null;
    }
    console.error("Error creating test user:", error.response?.data || error.message);
    return null;
  }
};

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    console.error("Signup Error:", error.response?.data || error.message);
    return null;
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.data || !response.data.token) {
      console.error("No token received in response:", response.data);
      return null;
    }
    return response.data; 
  } catch (error) {
    console.error("Full error object:", error);
    return null;
  }
};

export const demoLogin = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/demo-login`, {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.data || !response.data.token) {
      console.error("No token received in demo login response:", response.data);
      return null;
    }
    return response.data; 
  } catch (error) {
    console.error("Demo login failed:", error.response?.data || error.message);
    return null;
  }
};

export const verifyToken = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found in localStorage");
    return null;
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/verify`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Token verification failed:", error.response?.data || error.message);
    return null;
  }
};

export const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
