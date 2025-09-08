import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

const COLORS = ["#2563eb", "#60a5fa"]; // blue shades

export default async function Dashboard() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/auth/login");
  }

  // TODO: Replace with actual DB queries for current month
  // Dummy data for demonstration
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
          <h2 className="text-sm text-gray-500">Expected Expenditure</h2>
          <p className="text-xl font-bold">${expectedTotal}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h2 className="text-sm text-gray-500">Total Expenditure</h2>
          <p className="text-xl font-bold">${actualTotal}</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white shadow rounded-xl p-4 h-64">
        <h3 className="text-sm font-semibold mb-2">Expected vs Actual</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-white shadow rounded-xl p-4 h-80">
        <h3 className="text-sm font-semibold mb-2">
          Expected vs Actual by Category
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={expenses}>
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="expected" fill="#2563eb" />
            <Bar dataKey="actual" fill="#60a5fa" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
