"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { logout } from "@/app/auth/logout/actions";

import type { User } from "@supabase/supabase-js";
import Link from "next/link";

interface HeaderProps {
  user: User | null;
}

export default function Header({ user }: HeaderProps) {
  const firstLetter = (
    user?.user_metadata?.display_name?.[0] ??
    user?.email?.[0] ??
    ""
  ).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback className="bg-gray-100 text-gray-600">
            {firstLetter}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>
          {user?.user_metadata?.display_name || user?.email}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">My Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => logout()}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
