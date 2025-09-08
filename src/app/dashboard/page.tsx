import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "../lib/supabaseServer";

export default async function Dashboard() {
  const supabase = createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Welcome, {session.user.email}</h1>
    </div>
  );
}
