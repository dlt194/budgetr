import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import ProfileForm from "@/components/profile/ProfileForm";
import HouseholdManager from "@/components/profile/HouseholdManager";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">My Profile</h1>

      {/* Profile update form */}
      <ProfileForm user={user} />

      {/* Household management */}
      <HouseholdManager user={user} />
    </div>
  );
}
