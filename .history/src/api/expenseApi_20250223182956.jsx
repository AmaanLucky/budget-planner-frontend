import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/expenses"; // Ensure backend is running

// Fetch all expenses
export const getExpenses = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return [];
  }
};

// Add a new expense
export const addExpense = async (expense) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/add`, expense); // Uses /add
    return response.data;
  } catch (error) {
    console.error("Error adding expense:", error);
    return null;
  }
};

// Delete an expense
export const deleteExpense = async (expenseId) => {
  try {
    await axios.delete(`${API_BASE_URL}/${expenseId}`); // Matches /:id route
    return true;
  } catch (error) {
    console.error("Error deleting expense:", error);
    return false;
  }
};

// Update an expense
export const updateExpense = async (expenseId, updatedExpense) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${expenseId}`, updatedExpense); // Uses /:id
    return response.data;
  } catch (error) {
    console.error("Error updating expense:", error);
    return null;
  }
};