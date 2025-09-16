import Link from "next/link";
import { BarChart2, ReceiptPoundSterling } from "lucide-react";

export const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart2 },
  { href: "/expenses", label: "Expenses", icon: ReceiptPoundSterling },
];

export default function NavLinks() {
  return (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex items-center gap-2 px-3 py-2 hover:text-blue-600"
        >
          <item.icon size={20} />
          <span className="">{item.label}</span>
        </Link>
      ))}
    </>
  );
}
