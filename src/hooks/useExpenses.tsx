"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export type Expense = {
  id: string;
  title: string;
  expected_cost: number;
  actual_cost: number | null;
  date: string; // YYYY-MM-DD from Supabase
  household_id: string | null;
  user_id: string;
  type: "personal" | "household";
  created_at: string;
};

export function useExpenses(initialData: Expense[] = []) {
  const [expenses, setExpenses] = useState<Expense[]>(initialData);
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel("expenses-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "expenses" },
        (payload) => {
          setExpenses((current) => {
            if (payload.eventType === "INSERT") {
              return [payload.new as Expense, ...current];
            }
            if (payload.eventType === "UPDATE") {
              return current.map((exp) =>
                exp.id === (payload.new as Expense).id
                  ? (payload.new as Expense)
                  : exp
              );
            }
            if (payload.eventType === "DELETE") {
              return current.filter(
                (exp) => exp.id !== (payload.old as Expense).id
              );
            }
            return current;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return expenses;
}
