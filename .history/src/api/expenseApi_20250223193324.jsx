import axios from "axios";

const API_BASE_URL = "http://localhost:5001/expenses"; // Ensure backend is running

// ✅ Fetch all expenses
export const getExpenses = async () => {
  try {
    console.log("Fetching expenses from:", API_BASE_URL);
    const response = await axios.get(API_BASE_URL);
    console.log("Expenses fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching expenses:", error.message);
    return [];
  }
};

// ✅ Add a new expense

export const addExpense = async (expense) => {
    try {
      console.log("Sending Expense:", expense); // Debugging
      const response = await axios.post(
        "http://localhost:5001/expenses/add",
        expense,
        { headers: { "Content-Type": "application/json" } } // Ensure JSON format
      );
      console.log("✅ Expense Added:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error adding expense:", error.response?.data || error.message);
      return null;
    }
  };

// ✅ Delete an expense
export const deleteExpense = async (expenseId) => {
  try {
    await axios.delete(`${API_BASE_URL}/${expenseId}`); // Matches /:id route
    return true;
  } catch (error) {
    console.error("Error deleting expense:", error.message);
    return false;
  }
};

// ✅ Update an expense
export const updateExpense = async (expenseId, updatedExpense) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${expenseId}`, updatedExpense); // Uses /:id
    return response.data;
  } catch (error) {
    console.error("Error updating expense:", error.message);
    return null;
  }
};