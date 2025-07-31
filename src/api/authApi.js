import axios from "axios";

const API_BASE_URL = "https://budget-planner-backend-07kq.onrender.com/auth";


export const createTestUser = async () => {
  try {
    const testUserData = {
      name: "Test User",
      email: "example@gmail.com",
      password: "Password@123"
    };
    
    console.log(" Creating test user...");
    const response = await axios.post(`${API_BASE_URL}/signup`, testUserData);
    console.log("Test user created:", response.data);
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
    console.log("Sending signup request:", userData);
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    console.log("Signup Successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Signup Error:", error.response?.data || error.message);
    return null;
  }
};

export const login = async (credentials) => {
  try {
    console.log("Sending login request:", credentials);
    console.log("Request URL:", `${API_BASE_URL}/login`);
    console.log("Request headers:", { 'Content-Type': 'application/json' });
    
    const response = await axios.post(`${API_BASE_URL}/login`, credentials, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("Login response:", response.data);

    if (!response.data || !response.data.token) {
      console.error("No token received in response:", response.data);
      return null;
    }

    console.log("Login Successful. Token:", response.data.token);
    return response.data; 
  } catch (error) {
    console.error("Login Error Details:");
    console.error("Error message:", error.message);
    console.error("Response status:", error.response?.status);
    console.error("Response status text:", error.response?.statusText);
    console.error("Response data:", error.response?.data);
      console.error("Request config:", error.config);
    console.error("Full error object:", error);
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
    console.log("Token Verified:", response.data);
    return response.data;
  } catch (error) {
    console.error("Token verification failed:", error.response?.data || error.message);
    return null;
  }
};

export const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  console.log("Sending Token:", token ? `Bearer ${token}` : "No Token Found");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
