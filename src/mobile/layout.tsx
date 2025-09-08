import { ReactNode } from "react";
import { createClient } from "@/utils/supabase/server";
import { navItems } from "@/components/NavLinks";
import Link from "next/link";
import Header from "@/components/Header";

export default async function MobileLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col h-screen">
      {data.user && (
        <div className="flex justify-end items-center p-4">
          <Header data={data} />
        </div>
      )}
      {/* Content */}
      <main className="flex-1 overflow-y-auto p-4">{children}</main>

      {/* Bottom nav */}
      {data.user && (
        <nav className="h-14 border-t bg-white flex justify-around items-center">
          {navItems.map((item) => (
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
