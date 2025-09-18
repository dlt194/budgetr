"use client";

import { useEffect, useState, FormEvent } from "react";
import { createClient } from "@/utils/supabase/client";
import { createHousehold } from "@/actions/households";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Household {
  id: string;
  name: string;
}

interface Member {
  id: string;
  user_id: string;
  role: string;
  users: {
    email: string;
  };
}

export default function HouseholdManager() {
  const supabase = createClient();

  const [household, setHousehold] = useState<Household | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [currentRole, setCurrentRole] = useState<string | null>(null);
  const [newHouseholdName, setNewHouseholdName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [message, setMessage] = useState("");

  // Load household + members
  const loadHouseholdAndMembers = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    setCurrentUserId(user.id);

    const { data: membership, error } = await supabase
      .from("memberships")
      .select("household_id, role, households(id, name)")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error || !membership) {
      setHousehold(null);
      setMembers([]);
      setCurrentRole(null);
      return;
    }

    setHousehold(membership.households);
    setCurrentRole(membership.role);

    const { data: memberData } = await supabase
      .from("memberships")
      .select("id, user_id, role, users(email)")
      .eq("household_id", membership.household_id);

    if (memberData) setMembers(memberData as Member[]);
  };

  useEffect(() => {
    loadHouseholdAndMembers();
  }, []);

  // Setup realtime subscription
  useEffect(() => {
    if (!household) return;

    const channel = supabase
      .channel("household-members")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "memberships",
          filter: `household_id=eq.${household.id}`,
        },
        () => {
          loadHouseholdAndMembers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [household, supabase]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const household = await createHousehold(newHouseholdName);
      setHousehold(household);
      setMessage("");
    } catch (err) {
      if (err instanceof Error) setMessage(err.message);
    }
  };

  const handleInvite = async () => {
    if (!inviteEmail || !household) return;

    await supabase.functions.invoke("send-invite", {
      body: { email: inviteEmail, householdId: household.id },
    });

    setInviteEmail("");
    setMessage(`Invite sent to ${inviteEmail}`);
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!household) return;

    const { error } = await supabase
      .from("memberships")
      .delete()
      .eq("id", memberId)
      .eq("household_id", household.id);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Member removed");
    }
  };

  if (!household) {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Household name"
          value={newHouseholdName}
          onChange={(e) => setNewHouseholdName(e.target.value)}
          required
        />
        <Button type="submit">Create Household</Button>
        {message && <p className="text-sm text-red-600">{message}</p>}
      </form>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Household: {household.name}</h2>

      <div>
        <h3 className="font-medium">Members</h3>
        <ul className="list-disc ml-6 space-y-1">
          {members.map((m) => (
            <li key={m.id} className="flex items-center justify-between">
              <span>
                {m.users.email} – <span className="italic">{m.role}</span>
              </span>
              {currentRole === "owner" && m.user_id !== currentUserId && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveMember(m.id)}
                >
                  Remove
                </Button>
              )}
            </li>
          ))}
        </ul>
      </div>

      {currentRole === "owner" && (
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Invite by email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
          />
          <Button onClick={handleInvite}>Invite</Button>
        </div>
      )}

      {message && <p className="text-sm text-green-600">{message}</p>}
    </div>
  );
}
