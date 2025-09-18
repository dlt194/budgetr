"use client";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Pencil } from "lucide-react";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createClient } from "@/utils/supabase/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface EditExpenseCardProps {
  expenseId: string | undefined;
  variant: "mobile" | "desktop";
}
const EditExpenseCard = ({ expenseId, variant }: EditExpenseCardProps) => {
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const [name, setName] = useState("");
  const [date, setDate] = useState<Date>();
  const [budgeted, setBudgeted] = useState<number>(0);
  const [budgetedDisplay, setBudgetedDisplay] = useState<string>("");
  const [actual, setActual] = useState<number | null>(null);
  const [actualDisplay, setActualDisplay] = useState<string>("");
  const [type, setType] = useState<string>("personal");

  const supabase = createClient();

  // Fetch expense details
  useEffect(() => {
    const fetchExpense = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("id", expenseId)
        .single();

      if (error) {
        setError(error.message);
      } else if (data) {
        setName(data.title);
        setDate(new Date(data.date));
        setBudgeted(data.expected_cost);
        setBudgetedDisplay(`£${data.expected_cost}`);
        setActual(data.actual_cost);
        setActualDisplay(
          data.actual_cost !== null ? `£${data.actual_cost}` : ""
        );
        setType(data.type);
      }
      setLoading(false);
    };

    fetchExpense();
  }, [expenseId, supabase]);

  const handleCurrencyChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setterNum: (val: number) => void,
    setterStr: (val: string) => void
  ) => {
    const raw = e.target.value;
    const numeric = parseFloat(raw.replace("£", "").replace(/,/g, ""));

    if (!isNaN(numeric)) {
      setterNum(numeric);
    } else {
      setterNum(0);
    }

    setterStr(raw.startsWith("£") ? raw : `£${raw}`);
  };

  const handleSave = async () => {
    if (!expenseId) {
      setError("No expense ID provided");
      return;
    }

    if (!name || !date || !budgeted) {
      setError("Please fill in all required fields");
      return;
    }

    const householdId = type === "household" ? "TODO-HOUSEHOLD-ID" : null;

    const { error } = await supabase
      .from("expenses")
      .update({
        title: name,
        expected_cost: budgeted,
        actual_cost: actual,
        date: date.toISOString().split("T")[0],
        household_id: householdId,
      })
      .eq("id", expenseId);

    if (error) {
      setError(error.message);
    } else {
      setError(undefined);
    }
  };

  return (
    <AlertDialog>
      {variant === "mobile" ? (
        // Mobile: floating circle button
        <AlertDialogTrigger className="bg-blue-600 text-white hover:bg-blue-700 transition px-2 py-1 rounded-lg font-semibold">
          <Pencil size={20} />
        </AlertDialogTrigger>
      ) : (
        // Desktop: larger, desktop friendly button
        <AlertDialogTrigger asChild>
          <Button className="bg-blue-600 text-white hover:bg-blue-700 transition px-6 py-3 rounded-lg font-semibold">
            <Pencil className="mr-2" size={20} />
            Add Expense
          </Button>
        </AlertDialogTrigger>
      )}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Expense</AlertDialogTitle>
        </AlertDialogHeader>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-col gap-3">
            {/* Expense Name */}
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* Date */}
            <Label htmlFor="date">Date of Expense</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-empty={!date}
                  className="w-[280px] justify-start text-left font-normal"
                >
                  <CalendarIcon />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} />
              </PopoverContent>
            </Popover>

            {/* Budgeted Amount */}
            <Label htmlFor="budgeted">Budgeted Amount</Label>
            <Input
              id="budgeted"
              type="text"
              placeholder="£0.00"
              value={budgetedDisplay}
              onChange={(e) =>
                handleCurrencyChange(e, setBudgeted, setBudgetedDisplay)
              }
            />

            {/* Actual Amount */}
            <Label htmlFor="actual">Actual Amount</Label>
            <Input
              id="actual"
              type="text"
              placeholder="£0.00"
              value={actualDisplay}
              onChange={(e) =>
                handleCurrencyChange(
                  e,
                  (val) => setActual(val),
                  setActualDisplay
                )
              }
            />

            {/* Type */}
            <Label>Household or Personal</Label>
            <RadioGroup value={type} onValueChange={setType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="household" id="household" />
                <Label htmlFor="household">Household</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="personal" id="personal" />
                <Label htmlFor="personal">Personal</Label>
              </div>
            </RadioGroup>

            {error && <p className="text-red-500">{error}</p>}
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-blue-600 text-white hover:bg-blue-700 transition"
            onClick={handleSave}
          >
            Save
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditExpenseCard;
