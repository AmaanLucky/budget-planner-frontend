import axios from "axios";

const API_BASE_URL = "https://budget-planner-backend-07kq.onrender.com/expenses";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found! Unauthorized request.");
    return null;
  }
  return { Authorization: `Bearer ${token}` };
};


export const getExpenses = async () => {
  try {
    const headers = getAuthHeader();
    if (!headers) return []; 

    const response = await axios.get(API_BASE_URL, { headers });
    return response.data;
  } catch (error) {
    handleAuthError(error);
    return [];
  }
};

export const addExpense = async (expense) => {
  try {
    const headers = getAuthHeader();
    if (!headers) return null;

    const response = await axios.post(`${API_BASE_URL}/add`, expense, { headers });
    return response.data;
  } catch (error) {
    handleAuthError(error);
    return null;
  }
};

export const deleteExpense = async (expenseId) => {
  try {
    const headers = getAuthHeader();
    if (!headers) return false;

    await axios.delete(`${API_BASE_URL}/${expenseId}`, { headers });
    return true;
  } catch (error) {
    handleAuthError(error);
    return false;
  }
};

export const updateExpense = async (expenseId, updatedExpense) => {
  try {
    const headers = getAuthHeader();
    if (!headers) return null;

    const response = await axios.put(`${API_BASE_URL}/${expenseId}`, updatedExpense, { headers });
    return response.data;
  } catch (error) {
    handleAuthError(error);
    return null;
  }
};

const handleAuthError = (error) => {
  console.error("API Error:", error.response?.data || error.message);

  if (error.response?.status === 401) {
    console.warn("Unauthorized! Logging out...");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload(); 
  }
};
