import { createClient } from "@/utils/supabase/server";
import DashboardRealtime from "@/components/DashboardRealtime";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: expenses, error } = await supabase
    .from("expenses")
    .select("id, title, date, expected_cost, actual_cost, type");

  if (error) {
    console.error(error.message);
    return <p className="p-6 text-red-500">Failed to load dashboard data.</p>;
  }

  return (
    <div className="p-6">
      <DashboardRealtime initialExpenses={expenses ?? []} />
    </div>
  );
}
