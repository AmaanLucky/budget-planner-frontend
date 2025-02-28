import axios from "axios";

const API_BASE_URL = "http://localhost:5001/expenses"; 

// ✅ Get Token from Local Storage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {}; // Attach token if available
};

// ✅ Fetch Expenses
export const getExpenses = async () => {
  try {
    console.log("Fetching expenses from:", API_BASE_URL);
    const response = await axios.get(API_BASE_URL, { headers: getAuthHeaders() });
    console.log("✅ Expenses fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching expenses:", error.response?.data || error.message);
    return [];
  }
};

// ✅ Add Expense
export const addExpense = async (expense) => {
  try {
    console.log("➡️ Sending Expense:", expense);
    const response = await axios.post(
      `${API_BASE_URL}/add`,
      expense,
      { headers: { "Content-Type": "application/json", ...getAuthHeaders() } }
    );
    console.log("✅ Expense Added:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error adding expense:", error.response?.data || error.message);
    return null;
  }
};

// ✅ Delete Expense
export const deleteExpense = async (expenseId) => {
  try {
    await axios.delete(`${API_BASE_URL}/${expenseId}`, { headers: getAuthHeaders() });
    return true;
  } catch (error) {
    console.error("❌ Error deleting expense:", error.response?.data || error.message);
    return false;
  }
};