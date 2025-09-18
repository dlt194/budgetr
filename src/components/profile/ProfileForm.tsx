"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";

export default function ProfileForm({ user }: { user: User }) {
  const supabase = createClient();

  const [email, setEmail] = useState(user.email ?? "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState(
    (user.user_metadata as { display_name?: string })?.display_name ?? ""
  );

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    setError("");
    setMessage("");

    if (password && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // updates now strongly typed
    const updates: {
      email?: string;
      password?: string;
      data?: Record<string, unknown>;
    } = {};

    if (email && email !== user.email) updates.email = email;
    if (password) updates.password = password;

    if (displayName) {
      updates.data = {
        display_name: displayName,
      };
    }

    const { error } = await supabase.auth.updateUser(updates);
    if (error) setError(error.message);
    else setMessage("Profile updated!");
  };

  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  }, [password, confirmPassword]);

  return (
    <div className="space-y-4">
      <div>
        <Label className="mb-2">Email</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <Label className="mb-2">New Password</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <Label className="mb-2">Confirm New Password</Label>
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div>
        <Label className="mb-2">Display Name</Label>
        <Input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <Button asChild variant="outline">
          <Link href="/dashboard">Return to Dashboard</Link>
        </Button>
        <Button onClick={handleUpdate}>Save Changes</Button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {message && <p className="text-sm text-green-600">{message}</p>}
    </div>
  );
}
