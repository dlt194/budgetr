"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Expense } from "@/types/Expense";

export interface ExpenseTotals {
  expectedTotal: number;
  actualTotal: number;
  byType: {
    personal: { expected: number; actual: number };
    household: { expected: number; actual: number };
  };
}

export function useExpenseTotals(initialExpenses: Expense[] = []) {
  const [totals, setTotals] = useState<ExpenseTotals>(() =>
    calculateTotals(initialExpenses)
  );
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel("expenses-dashboard")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "expenses" },
        async () => {
          const { data, error } = await supabase
            .from("expenses")
            .select("expected_cost, actual_cost, type");

          if (error) return console.error(error);
          setTotals(calculateTotals((data ?? []) as Expense[]));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return totals;
}

function calculateTotals(expenses: Expense[]): ExpenseTotals {
  const expectedTotal = expenses.reduce(
    (sum, e) => sum + (e.expected_cost ?? 0),
    0
  );
  const actualTotal = expenses.reduce(
    (sum, e) => sum + (e.actual_cost ?? 0),
    0
  );

  const grouped = expenses.reduce(
    (acc, e) => {
      const key = e.type as "personal" | "household";
      acc[key].expected += e.expected_cost ?? 0;
      acc[key].actual += e.actual_cost ?? 0;
      return acc;
    },
    {
      personal: { expected: 0, actual: 0 },
      household: { expected: 0, actual: 0 },
    }
  );

  return { expectedTotal, actualTotal, byType: grouped };
}
