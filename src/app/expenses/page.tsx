import ExpenseCard from "@/components/cards/ExpenseCard";

export default async function ExpensesPage() {
  const expenses = [
    {
      id: 1,
      title: "Mortgage",
      expected: 1000,
      actual: 1000,
      date: "10/09/2025",
      type: "household",
    },
    {
      id: 2,
      title: "Groceries",
      expected: 400,
      actual: 350,
      date: "10/09/2025",
      type: "household",
    },
    {
      id: 3,
      title: "Transport",
      expected: 200,
      actual: 250,
      date: "10/09/2025",
      type: "personal",
    },
    {
      id: 4,
      title: "Other",
      expected: 400,
      actual: 200,
      date: "10/09/2025",
      type: "personal",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {expenses.map((expense, index) => (
        <ExpenseCard key={index} expense={expense} />
      ))}
    </div>
  );
}
