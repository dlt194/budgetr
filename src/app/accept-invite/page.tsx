"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";

export default function AcceptInvitePage() {
  const router = useRouter();
  const params = useSearchParams();
  const supabase = createClient();

  const householdId = params.get("household");
  const inviteEmail = params.get("email");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        // Redirect to login, keep invite params in query
        const redirectUrl = `/auth/login?redirect=/accept-invite?household=${householdId}&email=${inviteEmail}`;
        router.push(redirectUrl);
        return;
      }

      setUserId(user.id);
      setUserEmail(user.email);

      if (inviteEmail && user.email !== inviteEmail) {
        setMessage(
          `This invite was sent to ${inviteEmail}, but you are signed in as ${user.email}.`
        );
        return;
      }

      setMessage("You are signed in, ready to join this household.");
    };

    checkUser();
  }, [supabase, inviteEmail, householdId, router]);

  const handleAccept = async () => {
    if (!householdId || !userId) {
      setMessage("Missing household ID or user.");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("memberships")
      .insert([{ household_id: householdId, user_id: userId, role: "member" }]);

    setLoading(false);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("✅ You have joined the household!");
      router.push("/dashboard");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-bold">Accept Invite</h1>
      <p>{message}</p>
      {householdId && userId && (
        <Button onClick={handleAccept} disabled={loading}>
          {loading ? "Joining..." : "Join Household"}
        </Button>
      )}
    </div>
  );
}
