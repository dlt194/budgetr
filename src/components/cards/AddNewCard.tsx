"use client";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
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

const AddNewCard = () => {
  const [error, setError] = useState<string>();
  const [name, setName] = useState("");
  const [date, setDate] = useState<Date>();
  const [budgeted, setBudgeted] = useState<number>(0);
  const [budgetedDisplay, setBudgetedDisplay] = useState<string>("");
  const [type, setType] = useState<string>("personal");

  const supabase = createClient();

  const handleBudgetedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    // strip "£" and commas for parsing
    const numeric = parseFloat(raw.replace("£", "").replace(/,/g, ""));

    if (!isNaN(numeric)) {
      setBudgeted(numeric);
    } else {
      setBudgeted(0);
    }

    // always show "£"
    setBudgetedDisplay(raw.startsWith("£") ? raw : `£${raw}`);
  };

  const handleSave = async () => {
    if (!name || !date || !budgeted) {
      setError("Please fill in all required fields");
      return;
    }

    // Household_id can be null (personal)
    const householdId = type === "household" ? "TODO-HOUSEHOLD-ID" : null;

    const { error } = await supabase.from("expenses").insert([
      {
        title: name,
        expected_cost: budgeted,
        actual_cost: null, // you can add actual later
        date: date.toISOString().split("T")[0], // YYYY-MM-DD
        household_id: householdId,
        // user_id is set automatically with auth.uid()
      },
    ]);

    if (error) {
      setError(error.message);
    } else {
      setError(undefined);
      setName("");
      setDate(undefined);
      setBudgeted(0);
      setBudgetedDisplay("");
      setType("personal");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="absolute -top-5 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition">
        <Plus size={24} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>New Expense</AlertDialogTitle>
        </AlertDialogHeader>
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
            onChange={handleBudgetedChange}
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

export default AddNewCard;
