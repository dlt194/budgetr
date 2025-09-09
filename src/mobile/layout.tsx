import { ReactNode } from "react";
import { createClient } from "@/utils/supabase/server";
import { navItems } from "@/components/NavLinks";
import Link from "next/link";
import Header from "@/components/Header";
import { Plus } from "lucide-react";

export default async function MobileLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col h-screen ">
      {data.user && (
        <div className="flex justify-between items-center p-4 pb-0 ">
          <h1 className="text-2xl font-bold">Budgetr</h1>
          <Header data={data} />
        </div>
      )}
      {/* Content */}
      <main className="flex-1 overflow-y-auto">{children}</main>

      {/* Bottom nav */}
      {data.user && (
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
          <Link
            href="/expenses/new"
            className="absolute -top-5 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition"
          >
            <Plus size={24} />
          </Link>

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
