import axios from "axios";

const API_BASE_URL = "http://localhost:5001/expenses";

// ✅ Function to get the Auth Token
const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

// ✅ Fetch all expenses for the logged-in user
export const getExpenses = async () => {
    try {
        const response = await axios.get(API_BASE_URL, getAuthHeader());
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching expenses:", error);
        return [];
    }
};

// ✅ Add a new expense (linked to the user)
export const addExpense = async (expense) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/add`, expense, getAuthHeader());
        return response.data;
    } catch (error) {
        console.error("❌ Error adding expense:", error.response?.data || error.message);
        return null;
    }
};

// ✅ Delete an expense (only if it belongs to the user)
export const deleteExpense = async (expenseId) => {
    try {
        await axios.delete(`${API_BASE_URL}/${expenseId}`, getAuthHeader());
        return true;
    } catch (error) {
        console.error("❌ Error deleting expense:", error.message);
        return false;
    }
};
