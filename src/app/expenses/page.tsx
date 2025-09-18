import ExpensesList from "@/components/ExpensesList";
import { createClient } from "@/utils/supabase/server";

interface ExpensesPageProps {
  variant: "mobile" | "desktop";
}

export default async function ExpensesPage({ variant }: ExpensesPageProps) {
  const supabase = await createClient();

  // Initial server-side fetch (RLS applied)
  const { data: initialExpenses } = await supabase
    .from("expenses")
    .select("*")
    .order("date", { ascending: false });

  return (
    <div className="p-6 space-y-6">
      {/* Pass initial data into the client-side list */}
      <ExpensesList initialExpenses={initialExpenses || []} variant={variant} />
    </div>
  );
}
