"use client";

import { useExpenses, type Expense } from "@/hooks/useExpenses";
import ExpenseCard from "@/components/cards/ExpenseCard";

interface ExpensesListProps {
  initialExpenses: Expense[];
}

export default function ExpensesList({ initialExpenses }: ExpensesListProps) {
  const expenses = useExpenses(initialExpenses);

  return (
    <>
      {expenses.map((expense) => (
        <ExpenseCard key={expense.id} expense={expense} />
      ))}
    </>
  );
}
