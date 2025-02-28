import axios from "axios";

const API_BASE_URL = "http://localhost:5001/expenses"; // 🔹 Ensure backend is running

// 🔹 Function to get token from localStorage
const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// ✅ Fetch all expenses (Only for logged-in user)
export const getExpenses = async () => {
    try {
        const response = await axios.get(API_BASE_URL, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching expenses:", error.response?.data || error.message);
        return [];
    }
};

// ✅ Add a new expense
export const addExpense = async (expense) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/add`, expense, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        console.error("❌ Error adding expense:", error.response?.data || error.message);
        return null;
    }
};

// ✅ Delete an expense
export const deleteExpense = async (expenseId) => {
    try {
        await axios.delete(`${API_BASE_URL}/${expenseId}`, { headers: getAuthHeader() });
        return true;
    } catch (error) {
        console.error("❌ Error deleting expense:", error.response?.data || error.message);
        return false;
    }
};

// ✅ Update an expense
export const updateExpense = async (expenseId, updatedExpense) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${expenseId}`, updatedExpense, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        console.error("❌ Error updating expense:", error.response?.data || error.message);
        return null;
    }
};