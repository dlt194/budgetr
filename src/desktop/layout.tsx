import { ReactNode } from "react";
import { createClient } from "@/utils/supabase/server";
import NavLinks from "@/components/NavLinks";
import Header from "@/components/Header";
import AddExpenseCard from "@/components/cards/AddExpenseCard";

export default async function DesktopLayout({
  children,
  variant,
}: {
  children: ReactNode;
  variant: "mobile" | "desktop";
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div
      className={
        user
          ? // Sidebar + content grid
            "grid h-screen grid-cols-[16rem_1fr] grid-rows-[auto_1fr] bg-white"
          : // No-auth: single column (no sidebar/header)
            "flex h-screen flex-col bg-white"
      }
    >
      {user && (
        <>
          {/* Sidebar (left, spans both rows) */}
          <aside className="col-start-1 row-span-2 border-r bg-gray-100 p-4">
            <div className="flex items-center gap-3 pb-2">
              <div className="h-12 w-12 rounded-xl bg-blue-600/10 grid place-items-center">
                <span className="text-blue-700 text-xl font-bold">B</span>
              </div>
              <h1 className="text-xl font-semibold text-slate-800">Budgetr</h1>
            </div>

            <nav className="flex flex-col gap-2">
              <NavLinks />

              <div className="mt-auto flex items-center gap-2 px-3 py-2">
                <AddExpenseCard variant={variant} />
              </div>
            </nav>
          </aside>

          {/* Header (top bar over content column) */}
          <header className="col-start-2 row-start-1 border-b bg-white">
            <div className="mx-auto flex items-center justify-end px-6 py-3">
              {/* Pass only serializable data to the client component */}
              <Header user={user} />
            </div>
          </header>

          {/* Main content (scrolls) */}
          <main className="col-start-2 row-start-2 overflow-y-auto p-6">
            {children}
          </main>
        </>
      )}

      {!user && (
        // Public/unauthenticated layout
        <main className="flex-1 overflow-y-auto">{children}</main>
      )}
    </div>
  );
}
