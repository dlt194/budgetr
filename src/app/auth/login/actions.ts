
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  // optional redirect param passed from login page
  const redirectTo = formData.get("redirect") as string | null;

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error(error.message);
    redirect("/error");
  }

  revalidatePath("/", "layout");

  if (redirectTo) {
    redirect(redirectTo);
  } else {
    redirect("/dashboard");
  }
}
