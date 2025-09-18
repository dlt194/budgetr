export interface Expense {
  id: string;
  title: string;
  expected_cost: number;
  actual_cost: number | null;
  date: string; // ISO string
  type: "personal" | "household";
  household_id?: string | null;
  user_id?: string;
}
