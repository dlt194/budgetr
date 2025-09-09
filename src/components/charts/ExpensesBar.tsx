"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ExpensesBar({
  data,
}: {
  data: { title: string; expected: number; actual: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height="100%" className="pb-2">
      <BarChart data={data}>
        <XAxis dataKey="title" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="expected" fill="#2563eb" />
        <Bar dataKey="actual" fill="#60a5fa" />
      </BarChart>
    </ResponsiveContainer>
  );
}
