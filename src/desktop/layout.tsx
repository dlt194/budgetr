import { ReactNode } from "react";
import { createClient } from "@/utils/supabase/server";
import NavLinks from "@/components/NavLinks";
import Header from "@/components/Header";

export default async function DesktopLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  return (
    <div className="flex h-screen">
      {data.user && (
        <div className="absolute top-4 right-4">
          <Header data={data} />
        </div>
      )}
      {/* Sidebar */}
      {data.user && (
        <aside className="w-64 bg-gray-100 p-4 border-r">
          <h2 className="text-xl font-bold mb-6">Budgetr</h2>
          <nav className="flex flex-col gap-2">
            <NavLinks />
          </nav>
        </aside>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}
