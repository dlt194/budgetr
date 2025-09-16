import { createClient } from "@/utils/supabase/server";
import ExpensesPie from "@/components/charts/ExpensesPie";
import ExpensesBar from "@/components/charts/ExpensesBar";

export default async function DashboardPage() {
  // TODO: Replace with Supabase queries
  const expectedTotal = 2000;
  const actualTotal = 1800;

  const expenses = [
    { title: "Rent", expected: 1000, actual: 1000 },
    { title: "Groceries", expected: 400, actual: 350 },
    { title: "Transport", expected: 200, actual: 250 },
    { title: "Other", expected: 400, actual: 200 },
  ];

  const pieData = [
    { name: "Expected", value: expectedTotal },
    { name: "Actual", value: actualTotal },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h2 className="text-sm text-gray-500">Expected Spend</h2>
          <p className="text-xl font-bold">£{expectedTotal}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h2 className="text-sm text-gray-500">Actual Spend</h2>
          <p className="text-xl font-bold">£{actualTotal}</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white shadow rounded-xl p-4 h-64">
        <h3 className="text-sm font-semibold mb-2">Expected vs Actual</h3>
        <ExpensesPie data={pieData} />
      </div>

      {/* Bar Chart */}
      <div className="bg-white shadow rounded-xl p-4 h-80">
        <h3 className="text-sm font-semibold mb-2">
          Expected vs Actual by Category
        </h3>
        <ExpensesBar data={expenses} />
      </div>
    </div>
  );
}
