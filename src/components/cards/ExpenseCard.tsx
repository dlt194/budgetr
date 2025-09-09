import React from "react";

interface Expense {
  id: number;
  title: string;
  expected: number;
  actual: number | null;
  date: string;
  type: string;
}

const ExpenseCard = ({ expense }: { expense: Expense }) => {
  return (
    <div className="rounded-lg border-gray-400 overflow-hidden shadow-sm flex flex-col bg-white mb-2">
      {/* Header with pill */}

      {/* Content */}
      <div className="px-6 py-4 mb-auto">
        <h2 className="font-semibold text-lg mb-2">{expense.title}</h2>

        <div className="text-gray-600 text-sm space-y-1">
          <p>
            <span className="font-medium">Expected:</span> £{expense.expected}
          </p>
          <p>
            <span className="font-medium">Actual:</span>{" "}
            {expense.actual ? `£${expense.actual}` : "Not entered"}
          </p>
          <p>
            <span className="font-medium">Expected Date:</span>{" "}
            {new Date(expense.date).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between px-6 py-3 bg-gray-100">
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            expense.type === "household"
              ? "bg-blue-100 text-blue-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {expense.type === "household" ? "Household" : "Personal"}
        </span>
        <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
          Edit
        </button>
      </div>
    </div>
  );
};

export default ExpenseCard;
