import Link from "next/link";
import { BarChart2, Users } from "lucide-react";

export const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart2 },
  { href: "/households", label: "Households", icon: Users },
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
          <item.icon size={18} />
          <span>{item.label}</span>
        </Link>
      ))}
    </>
  );
}
