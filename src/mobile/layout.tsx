import { ReactNode } from "react";
import { createClient } from "@/utils/supabase/server";
import { navItems } from "@/components/NavLinks";
import Link from "next/link";
import Header from "@/components/Header";
import AddNewCard from "@/components/cards/AddNewCard";

export default async function MobileLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col h-screen ">
      {user && (
        <div className="flex justify-between items-center p-4 pb-0 ">
          <h1 className="text-2xl font-bold">Budgetr</h1>
          <Header user={user} />
        </div>
      )}
      {/* Content */}
      <main className="flex-1 overflow-y-auto">{children}</main>

      {/* Bottom nav */}
      {user && (
        <nav className="relative h-14 border-t bg-white flex justify-around items-center">
          {/* Left nav item */}
          {navItems.slice(0, 1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center text-sm"
            >
              <item.icon size={20} />
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}

          {/* Floating add button */}
          <AddNewCard />

          {/* Right nav item */}
          {navItems.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center text-sm"
            >
              <item.icon size={20} />
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
