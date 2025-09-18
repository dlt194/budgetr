"use client";

import ExpensesPie from "@/components/charts/ExpensesPie";
import ExpensesBar from "@/components/charts/ExpensesBar";
import { useExpenseTotals } from "@/hooks/useExpenseTotals";
import { Expense } from "@/types/Expense";

interface DashboardRealtimeProps {
  initialExpenses: Expense[];
}

export default function DashboardRealtime({
  initialExpenses,
}: DashboardRealtimeProps) {
  const totals = useExpenseTotals(initialExpenses);

  const pieData = [
    { name: "Expected", value: totals.expectedTotal },
    { name: "Actual", value: totals.actualTotal },
  ];

  const barData = [
    {
      title: "Personal",
      expected: totals.byType.personal.expected,
      actual: totals.byType.personal.actual,
    },
    {
      title: "Household",
      expected: totals.byType.household.expected,
      actual: totals.byType.household.actual,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h2 className="text-sm text-gray-500">Expected Spend</h2>
          <p className="text-xl font-bold">£{totals.expectedTotal}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h2 className="text-sm text-gray-500">Actual Spend</h2>
          <p className="text-xl font-bold">£{totals.actualTotal}</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white shadow rounded-xl p-4 h-64">
        <h3 className="text-sm font-semibold mb-2">Expected vs Actual</h3>
        <ExpensesPie data={pieData} />
      </div>

      {/* Bar Chart */}
      <div className="bg-white shadow rounded-xl p-4 h-80">
        <h3 className="text-sm font-semibold mb-2">Personal vs Household</h3>
        <ExpensesBar data={barData} />
      </div>
    </div>
  );
}
