"use server";

import { createClient } from "@/utils/supabase/server";

export async function createHousehold(name: string) {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be logged in to create a household.");
  }

  // Insert household
  const { data: household, error: hError } = await supabase
    .from("households")
    .insert([{ name }])
    .select()
    .single();

  if (hError) throw hError;

  // Insert membership
  const { error: mError } = await supabase
    .from("memberships")
    .insert([{ household_id: household.id, user_id: user.id, role: "owner" }]);

  if (mError) throw mError;

  return household;
}
