import PropTypes from "prop-types";
import { FaUtensils, FaBus, FaShoppingCart, FaMoneyBillWave, FaTag, FaQuestion } from "react-icons/fa";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Papa from "papaparse";

// ✅ Define category icons
const categoryIcons = {
  Food: <FaUtensils className="text-green-400 dark:text-green-300" />, 
  Transport: <FaBus className="text-blue-400 dark:text-blue-300" />, 
  Shopping: <FaShoppingCart className="text-purple-400 dark:text-purple-300" />, 
  Bills: <FaMoneyBillWave className="text-yellow-400 dark:text-yellow-300" />, 
  Other: <FaTag className="text-gray-400 dark:text-gray-300" />,
};

const getExpenseIcon = (expense) => {
  return categoryIcons[expense.category] || <FaQuestion className="text-gray-400 dark:text-gray-300" />;
};

const ExpenseList = ({ expenses = [], onDeleteExpense, darkMode }) => {
  const groupedExpenses = expenses.reduce((acc, expense) => {
    const category = expense.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = { total: 0, items: [] };
    }
    acc[category].items.push(expense);
    acc[category].total += expense.amount;
    return acc;
  }, {});

  const overallTotal = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  // ✅ Export as CSV
  const exportCSV = () => {
    const csvData = Object.entries(groupedExpenses).flatMap(([category, data]) => (
      data.items.map(expense => ({
        Category: category,
        Title: expense.title,
        Amount: expense.amount,
      }))
    ));
    csvData.push({ Category: "Total", Title: "", Amount: overallTotal });
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "expenses.csv");
  };

  // ✅ Export as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Expense List", 14, 10);
    Object.entries(groupedExpenses).forEach(([category, data], index) => {
      doc.text(`${category} (Total: $${data.total.toFixed(2)})`, 14, 20 + index * 10);
      autoTable(doc, {
        startY: 25 + index * 10,
        head: [["Title", "Amount ($)"]],
        body: data.items.map(exp => [exp.title, exp.amount.toFixed(2)]),
      });
    });
    const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY : 30;
    doc.text(`Overall Total: $${overallTotal.toFixed(2)}`, 14, finalY + 10);
    doc.save("expenses.pdf");
  };

  return (
    <div className={`mt-6 p-4 rounded-lg shadow-md transition-all duration-300 ease-in-out ${
      darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-800 border-gray-200"
    }`}>
      <h2 className="text-lg font-bold mb-4">Expense List</h2>

      {Object.keys(groupedExpenses).length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300 text-center mt-2">
          No expenses added yet.
        </p>
      ) : (
        <ul className="mt-2 space-y-4">
          {Object.entries(groupedExpenses).map(([category, data]) => (
            <li key={category} className="border-b pb-2 border-gray-300 dark:border-gray-600">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {categoryIcons[category] || <FaQuestion className="text-gray-400 dark:text-gray-300" />}
                  <span className="font-medium text-lg">{category}</span>
                </div>
                <span className="font-semibold text-lg text-gray-700 dark:text-gray-300">${data.total.toFixed(2)}</span>
              </div>
              <ul className="pl-6 space-y-2">
                {data.items.map((expense) => (
                  <li key={expense._id} className="grid grid-cols-3 items-center py-2 px-2 gap-4">
                    <div className="flex items-center space-x-2">
                      {getExpenseIcon(expense)}
                      <span className="font-medium">{expense.title}</span>
                    </div>
                    <div className="text-right font-semibold min-w-[100px]">
                      <span className={darkMode ? "text-gray-200" : "text-gray-700"}>
                        ${expense.amount.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-right">
                      <button
                        onClick={() => onDeleteExpense(expense._id)}
                        className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                      >
                        ❌
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          <li className="font-bold text-lg text-right mt-4">Overall Total: ${overallTotal.toFixed(2)}</li>
        </ul>
      )}

      <div className="flex gap-4 mt-10 mb-10">
        <button onClick={exportCSV} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all">
          Export CSV
        </button>
        <button onClick={exportPDF} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all">
          Export PDF
        </button>
      </div>
    </div>
  );
};

ExpenseList.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      category: PropTypes.string,
    })
  ).isRequired,
  onDeleteExpense: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default ExpenseList;
